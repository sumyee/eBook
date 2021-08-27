---
title: 关键渲染路径
sidebar: auto
---

# 关键渲染路径

浏览器将<u>HTML</u>，<u>CSS</u>，<u>JavaScript</u>转换为屏幕上所呈现的实际像素，这期间所经历的一系列步骤，叫做**关键渲染路径**（Critical Rendering Path）。

关键渲染路径的具体步骤：

![image.png](https://i.loli.net/2021/08/06/Sic9roJMzpl14vq.png)

1. 浏览器获取`HTML`并开始构建`DOM`（文档对象模型 - Document Object Model）
2. 获取`CSS`并构建`CSSOM`（CSS对象模型 - CSS Object Model）
3. 然后将`DOM`与`CSSOM`结合，创建渲染树（Render Tree）
4. 然后找到所有内容都处于网页的哪个位置，也就是布局（Layout）
5. 最后，浏览器开始在屏幕上绘制像素

## 1. 构建DOM

构建DOM的具体步骤：![image.png](https://i.loli.net/2021/08/06/N9uQS1VvcnXxao7.png)

1. 第一步（**转换**）：浏览器从磁盘或网络读取HTML的原始字节，并根据文件的指定编码（例如 UTF-8）将它们转换成字符

   ![image.png](https://i.loli.net/2021/08/06/I8Kf5P9sWqwzyil.png)

2. 第二步（**Token化**）：将字符串转换成Token，例如：`<html>`、`<body>`等。Token中会标识出当前Token是“开始标签”或是“结束标签”亦或是“文本”等信息。

   将字符串转换成Token：

   ![image.png](https://i.loli.net/2021/08/06/mDtkI7Kj8hGQfL5.png)

   节点之间的关系：

   ![image.png](https://i.loli.net/2021/08/06/k5Kz9ZjqQ7DVHPy.png)

3. 第三步（**生成节点对象并构建DOM**）：事实上，构建DOM的过程中，不是等所有Token都转换完成后再去生成节点对象，而是一边生成Token一边消耗Token来生成节点对象。换句话说，每个Token被生成后，会立刻消耗这个Token创建出节点对象。

   > *带有结束标签标识的Token不会创建节点对象*

   节点对象包含了这个节点的所有属性。例如`<img src="xxx.png" />`标签最终生成出的节点对象中会保存图片地址等信息。

   随后通过“开始标签”与“结束标签”来识别并关联节点之间的关系。最终，当所有Token都生成并消耗完毕后，我们就得到了一颗完整的DOM树。

   从Token生成DOM的过程：

   ![image.png](https://i.loli.net/2021/08/06/O5vwWhjclXpA8rV.png)

   图中每一个虚线上有一个小数字，表示构建DOM的具体步骤。

   1. 首先生成出`html`Token，并消耗Token创建出html节点对象。
   2. 然后生成`head`Token并消耗Token创建出head节点对象，并将它关联到html节点对象的子节点中。
   3. 随后生成`title`Token并消耗Token创建出title节点对象并将它关联到head节点对象的子节点中。
   4. 最后生成`body`Token并消耗Token创建body节点对象并将它关联到html的子节点中。
   5. 当所有Token都消耗完毕后，我们就得到了一颗完整的DOM树。



## 2. 构建CSSOM

构建CSSOM的过程与构建DOM的过程非常相似，当浏览器接收到一段CSS，浏览器首先要做的是识别出Token，然后构建节点并生成CSSOM。

构建CSSOM的具体过程：

![image.png](https://i.loli.net/2021/08/06/XlK5VsZP8nMhfLu.png)



```css
body {font-size: 16px;}
p {color: red;}
p span {display:none;}
span {font-size: 14px;}
img {float: right;}
```

上面这段CSS最终经过一系列步骤后生成的CSSOM：

![image.png](https://i.loli.net/2021/08/06/VR9TQ8rw7WCo4EB.png)

从图中还可以看出，`body`节点的子节点继承了`body`的样式规则（16px的字号）。这就是层叠规则以及CSS为什么叫<u>CSS（层叠样式表）</u>。

> - HTML可以逐步解析，它不需要等待所有DOM都构建完毕后再去构建CSSOM，而是在解析HTML构建DOM时，若遇见CSS会立刻构建CSSOM，它们可以同时进行。
>
> - 但CSS不行，不完整的CSS是无法使用的，因为CSS的每个属性都可以改变CSSOM，所以会存在这样一个问题：假设前面几个字节的CSS将字体大小设置为16px，后面又将字体大小设置为14px，那么如果不把整个CSSOM构建完整，最终得到的CSSOM其实是不准确的。
>
> - 所以必须等CSSOM构建完毕才能进入到下一个阶段，哪怕DOM已经构建完，它也得等CSSOM，然后才能进入下一个阶段。

**所以，CSS的加载速度与构建CSSOM的速度将直接影响<u>首屏渲染速度，</u>因此在默认情况下CSS被视为阻塞渲染的资源。**



## 3. 构建渲染树

```html
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Demos</title>
        <style>
            body {font-size: 16px;}
            p {color: red;}
            p span {display:none;}
            span {font-size: 14px;}
            img {float: right;}
        </style>
    </head>
    <body>
        <p>Hello <span>berwin</span></p>
        <span>Berwin</span>
        <img src="https://p1.ssl.qhimg.com/t0195d63bab739ec084.png" />
    </body>
</html>
```

这段代码最终构建成渲染树：

![image.png](https://i.loli.net/2021/08/06/jaXBDWNPk8TFfCc.png)

1. 从 DOM 树的根节点开始遍历每个可见节点。
2. 有些节点不可见（例如脚本Token、元Token等），因为它们不会体现在渲染输出中，所以会被忽略。
3. 某些节点被CSS隐藏，因此在渲染树中也会被忽略。例如：上图中的`p > span`节点就不会出现在渲染树中，因为该节点上设置了`display: none`属性。
4. 对于每个可见节点，为其找到适配的 CSSOM 规则并应用它们。

最终渲染出的结果：

![image.png](https://i.loli.net/2021/08/06/ODRKv5IYqEFuyQV.png)

## 4. 布局

布局流程的输出是一个“盒模型”，它会精确地捕获每个元素在视口内的确切位置和尺寸，所有相对测量值都将转换为屏幕上的绝对像素。

![image.png](https://i.loli.net/2021/08/06/sAFXNO2eRhik1CW.png)

## 5. 绘制

布局完成后，浏览器会立即发出“Paint Setup”和“Paint”事件，将渲染树转换成屏幕上的像素。

![image.png](https://i.loli.net/2021/08/06/bVeR5FhH3qJslM9.png)

## 6. JS与关键渲染路径

**JavaScript的加载、解析与执行会阻塞DOM的构建**，也就是说，在构建DOM时，HTML解析器若遇到了JavaScript，那么它会暂停构建DOM，将控制权移交给JavaScript引擎，等JavaScript引擎运行完毕，浏览器再从中断的地方恢复DOM构建。

因为JavaScript可以修改网页的内容，它可以更改DOM，如果不阻塞，那么这边在构建DOM，那边JavaScript在改DOM，如何保障最终得到的DOM是否正确？而且在JS中前一秒获取到的DOM和后一秒获取到的DOM不一样是什么鬼？它会产生一系列问题，所以JS是阻塞的，它会阻塞DOM的构建流程，所以在JS中无法获取JS后面的元素，因为DOM还没构建到那。

<u>JavaScript对关键渲染路径的影响不只是阻塞DOM的构建，它会导致***CSSOM也阻塞DOM的构建***。</u>

原本DOM和CSSOM的构建是互不影响，井水不犯河水，但是一旦引入了JavaScript，CSSOM也开始阻塞DOM的构建，只有CSSOM构建完毕后，DOM再恢复DOM构建。

假设构建DOM需要一秒，构建CSSOM需要一秒，那么正常情况下只需要一秒钟DOM和CSSOM就会同时构建完毕然后进入到下一个阶段。但是如果引入了JavaScript，那么JavaScript会阻塞DOM的构建并等待CSSOM的下载和构建，一秒钟之后，假设执行JavaScript需要0.00000001秒，那么从中断的地方恢复DOM的构建后，还需要一秒钟的时间才能完成DOM的构建，总共花费了2秒钟才进入到下一个阶段。

JS阻塞构建DOM并等待CSSOM：

![image.png](https://i.loli.net/2021/08/06/elWCXktu3I6NhZQ.png)



例如下面不加载JS的代码：

```html
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Test</title>
        <link rel="stylesheet" href="https://static.xx.fbcdn.net/rsrc.php/v3/y6/l/1,cross/9Ia-Y9BtgQu.css">
    </head>
    <body>
        aa
    </body>
</html>
```

上面这段代码的执行性能结果：

![image.png](https://i.loli.net/2021/08/06/CaFzmrq2XkItu5U.png)

（CSS不阻塞DOM）

DOMContentLoaded 事件在116ms左右触发。

在代码中添加JavaScript：

```html
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Test</title>
        <link rel="stylesheet" href="https://static.xx.fbcdn.net/rsrc.php/v3/y6/l/1,cross/9Ia-Y9BtgQu.css">
    </head>
    <body>
        aa
        <script>
            console.log(1)
        </script>
    </body>
</html>
```

DOMContentLoaded 事件在1.21s触发：

![image.png](https://i.loli.net/2021/08/06/TQo8EtApU7D5v9i.png)

（CSS阻塞DOM）

## 7. 总结

关键渲染路径（Critical Rendering Path）是指浏览器将HTML，CSS，JavaScript转换为屏幕上所呈现的实际像素这期间所经历的一系列步骤。

关键渲染路径共分五个步骤。<u>构建DOM -> 构建CSSOM -> 构建渲染树 -> 布局 -> 绘制</u>。

**CSSOM会阻塞渲染，只有当CSSOM构建完毕后才会进入下一个阶段构建渲染树。**

通常情况下`DOM`和`CSSOM`是并行构建的，但是当浏览器遇到一个`script`标签时，`DOM`构建将暂停，直至脚本完成执行。但由于`JavaScript`可以修改`CSSOM`，所以需要等`CSSOM`构建完毕后再执行`JS`。