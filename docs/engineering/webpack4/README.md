---
title: webpack(4) 笔记
sidebar: auto
---

# webpack(4) 笔记

::: tip 概念

[webpack](https://v4.webpack.docschina.org/concepts/) 是一个现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图会映射项目所需的每个模块，并生成一个或多个 bundle。

- 从 wepack V4.0.0 开始， webpack 是开箱即用的
:::
- **loader**： 模块转换器，用于对模块的源代码进行转换。（[webpack loader 从右到左 / 从底到顶执行](https://webpack.docschina.org/concepts/loaders/#configuration)））
- **plugins(插件)**：  扩展插件，在 webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

> 打包后文件 -> 自执行函数

## 基础配置

### 初始化项目
```bash
npm install webpack webpack-cli -D
```

### entry
> - 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 **依赖图(dependency graph)** 的开始。
> - 进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
> - 默认值是 `./src/index.js`

`entry` 的值可以是一个字符串，一个数组或是一个对象。

- **字符串**：以对应的文件为入口

- **数组**：表示有多个主入口。多个依赖文件一起注入时用。

- **对象**：多页面配置

```js
module.exports = {
    entry: './src/index.js' //webpack的默认配置
}
```

### output

> **output** 属性告诉 webpack 在哪里输出它所创建的 *bundle*，以及如何命名这些文件。主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中。

```js
module.exports = {
    entry: './src/index.js', //webpack的默认配置
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出的路径（绝对路径）
        filename: 'bundle.[hash].js', // 输出的文件 /[name].bundle.js
        publicPath: '/', //通常是CDN地址
    }
}
```

可以使用以下替换模板字符串（通过 webpack 内部的[`TemplatedPathPlugin`][`TemplatedPathPlugin`](https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js)）：

| **模板**    | 描述                                        |
| ----------- | ------------------------------------------- |
| [hash]      | 模块标识符(module identifier)的 hash        |
| [chunkhash] | chunk 内容的 hash                           |
| [name]      | 模块名称                                    |
| [id]        | 模块标识符(module identifier)               |
| [query]     | 模块的 query，例如，文件名 `?` 后面的字符串 |
| [function]  | 函数，它可以返回文件名[string]              |

`[hash]` 和 `[chunkhash]` 的长度可以使用 `[hash:16]`（默认为20）来指定。或者，通过指定[`output.hashDigestLength`](https://v4.webpack.docschina.org/configuration/output/#output-hashdigestlength) 在全局配置长度。

如果将这个选项设为一个函数，函数将返回一个包含上面表格中替换信息的对象。

> 在使用 [`ExtractTextWebpackPlugin`](https://v4.webpack.docschina.org/plugins/extract-text-webpack-plugin) 时，可以用 `[contenthash]` 来获取提取文件的 hash（既不是 `[hash]` 也不是 `[chunkhash]`）。

### mode

> 可选项： `development`、`production` 、 `none` 
>
> **webpack** 根据对应**mode**在相应环境下优化。其默认值为 `production`。

```js
module.exports = {
  mode: 'production'
};
```

### devtool

> 配置生成 `source map`。
>
> 将编译后的代码映射回原始源代码，不同的值会明显影响到构建和重新构建的速度。

```js
//webpack.config.js
module.exports = {
    devtool: 'cheap-module-eval-source-map' //开发环境下使用
}
```

| **模式**                | 解释                                                         |
| :---------------------- | ------------------------------------------------------------ |
| eval                    | 每个 module 会封装到 eval 里包裹起来执行，并且会在末尾追加注释 `//@ sourceURL`. |
| source-map              | 生成一个 SourceMap 文件.                                     |
| hidden-source-map       | 和 source-map 一样，但不会在 bundle 末尾追加注释.            |
| inline-source-map       | 生成一个 DataUrl 形式的 SourceMap 文件.                      |
| eval-source-map         | 每个 module 会通过 eval() 来执行，并且生成一个 DataUrl 形式的 SourceMap . |
| cheap-source-map        | 生成一个没有列信息（column-mappings）的 SourceMaps 文件，不包含 loader 的 sourcemap（譬如 babel 的 sourcemap） |
| cheap-module-source-map | 生成一个没有列信息（column-mappings）的 SourceMaps 文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。 |

开发环境推荐：`cheap-module-eval-source-map`

生产环境推荐：`cheap-module-source-map` 

### HTML 插件

#### html-webpack-plugin

> 自动生成 HTML 文件，并插入输出结果。

```bash
npm install html-webpack-plugin -D 
```

修改 `webpack.config.js` 文件。

```js
//首先引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //...
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // hash: true //是否加上hash，默认是 false
        })
    ]
}
```



#### webpack-dev-server

> 在浏览器中实时查看效果

```bash
npm install webpack-dev-server -D
```

修改 `webpack.config.js` 文件。

```js
//webpack.config.js
module.exports = {
    //...
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    }
}
```

### 处理样式文件

> 处理 css

```bash
npm install style-loader less less-loader css-loader postcss-loader autoprefixer -D
```

```js
//webpack.config.js
module.exports = {
    // ...
    module:  {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: 'style-loader', // 将样式 <style> 插入到 head 标签中
                        options: {
                            insertAt: 'top', // 插入到 head 的顶部，防止覆盖 head 里原有style
                        }
                    },
                    'css-loader', // 处理 css。负责处理 @import 等语句
                    {
                        // 进一步处理 css 文件，压缩 CSS 等 
                        // 配合 autoprefixer 自动生成浏览器兼容性前缀
                        loader: 'postcss-loader', 
                        // options -> 创建 postcss.config.js 配置文件
                    },
                    'less-loader', // 处理编译 .less 文件,将其转为 css
                ]
            }
        ]
    }
}
```

在项目根目录中创建 `postcss.config.js`

```js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

在项目根目录添加 `.browserslistrc` 文件；或者在`package.json`文件中添加 `browserslist`

```json
// package.json ( 与 devDependencies 同级 ) 
"browserslist": [
    "defaults",
    "not ie <= 8",
    "last 2 versions",
    "> 1%",
    "iOS >= 7",
    "Android >= 4.0"
]
```

#### mini-css-extract-plugin

> 抽离 css 样式，将 css 提取到不同的文件中，以 link 标签嵌入页面。

```bash
npm install mini-css-extract-plugin -D
```

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css', // 抽离出来的文件名称 默认 [name].css
            // 如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，
            // 在这里指定一下publicPath 
            // publicPath:'../'
        })],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, // 这里替换了之前的 style-loader
                    "css-loader"
                ],
            },
        ],
    },
};
```

#### optimize-css-assets-webpack-plugin

> 压缩抽离的css文件
>
> *(在 **webpack5** 中，改用了 `css-minimizer-webpack-plugin`)*

```bash
npm install optimize-css-assets-webpack-plugin -D
```

```js
//webpack.config.js
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    //....
    plugins: [
        new OptimizeCssPlugin()
    ],
}
```

