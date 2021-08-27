---
title: webpack 概念
sidebar: auto
---

# webpack 概念

::: tip 概念

[webpack](https://v4.webpack.docschina.org/concepts/) 是一个现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图会映射项目所需的每个模块，并生成一个或多个 bundle。

- 从 wepack V4.0.0 开始， webpack 是开箱即用的
:::
- **loader**： 模块转换器，用于对模块的源代码进行转换。([webpack loader 从右到左 / 从底到顶执行](https://webpack.docschina.org/concepts/loaders/#configuration))
- **plugins(插件)**：  扩展插件，在 webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

> 打包后文件 -> 自执行函数

## webpack 构建流程

Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :

1. ***初始化阶段：***

   1. **初始化参数**：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数

   2. **建编译器对象**：用上一步得到的参数创建 `Compiler` 对象

   3. **始化编译环境**：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等

   4. **开始编译**：执行 `compiler` 对象的 `run` 方法

   5. **确定入口**：根据配置中的 `entry` 找出所有的入口文件，调用 `compilition.addEntry` 将入口文件转换为 `dependence` 对象

2. ***构建阶段：***

   1. **编译模块(make)**：根据 `entry` 对应的 `dependence` 创建 `module` 对象，调用 `loader` 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理
   2. **完成模块编译**：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 **依赖关系图**

3. ***生成阶段：***

   1. **输出资源(seal)**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
   2. **写入文件系统(emitAssets)**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

<u>在以上过程中,Webpack 会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件后会执行特定的逻辑,并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。</u>

## module，chunk 和 bundle

> `module`，`chunk` 和 `bundle` 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：
>
> 我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。

1. 对于一份同逻辑的代码，当我们手写下一个一个的文件，它们无论是 ESM 还是 commonJS 或是 AMD，他们都是 **`module`** ；
2. 当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 **`chunk`** 文件，webpack 会对这个 chunk 文件进行一些操作；
3. webpack 处理好 chunk 文件后，最后会输出 **`bundle`** 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行。

![image-20210720160404133](https://i.loli.net/2021/07/20/yCTH2cPgXz1sfp8.png)

## 流程图解
![e748c143c2474494989674e129daaa94_tplv-k3u1fbpfcp-zoom-1.jpg](https://i.loli.net/2021/07/22/YK4uE9Zg3GpQ7Hw.jpg)

## 编写loader的思路

**Loader**：针对每个文件类型，`loader`是支持以数组的形式配置多个的，因此当`Webpack`在转换该文件类型的时候，会按顺序链式调用每一个`loader`，前一个`loader`返回的内容会作为下一个`loader`的入参。因此`loader`的开发需要遵循一些规范，比如返回值必须是标准的`JS`代码字符串，以保证下一个`loader`能够正常工作，同时在开发上需要严格遵循“单一职责”，只关心`loader`的输出以及对应的输出。

`loader`函数中的`this`上下文由`webpack`提供，可以通过`this`对象提供的相关属性，获取当前`loader`需要的各种信息数据，事实上，这个`this`指向了一个叫`loaderContext`的`loader-runner`特有对象。



**Plugin**：`webpack`基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务，从而实现自己想要的功能。`compiler`和`compilation`是`Webpack`两个非常核心的对象，其中`compiler`暴露了和 `Webpack`整个生命周期相关的钩子（[compiler-hooks](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fapi%2Fcompiler-hooks%2F)），而`compilation`则暴露了与模块和依赖有关的粒度更小的事件钩子（[Compilation Hooks](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fapi%2Fcompilation-hooks%2F)）。

`Webpack`的事件机制基于`webpack`自己实现的一套`Tapable`事件流方案（[github](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Ftapable)）

`Plugin`的开发和开发`Loader`一样，需要遵循一些开发上的规范和原则：

- 插件必须是一个函数或者是一个包含 `apply` 方法的对象，这样才能访问`compiler`实例；
- 传给每个插件的 `compiler` 和 `compilation` 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件;
- 异步的事件需要在插件处理完任务时调用回调函数通知 `Webpack` 进入下一个流程，不然会卡住;