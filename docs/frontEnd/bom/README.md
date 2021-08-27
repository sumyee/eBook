---
title: BOM
sidebar: auto
---



```js
// 网页可见区域宽：
document.body.clientWidth 
// 网页可见区域高：
document.body.clientHeight 
// 网页可见区域宽：
document.body.offsetWidth // (包括边线的宽) 
// 网页可见区域高：
document.body.offsetHeight // (包括边线的宽) 
// 网页正文全文宽：
document.body.scrollWidth 
// 网页正文全文高：
document.body.scrollHeight 
// 网页被卷去的高：
document.body.scrollTop 
// 网页被卷去的左：
document.body.scrollLeft 
// 网页正文部分上：
window.screenTop 
// 网页正文部分左：
window.screenLeft 
// 屏幕分辨率的高：
window.screen.height 
// 屏幕分辨率的宽：
window.screen.width 
// 屏幕可用工作区高度：
window.screen.availHeight 
// 屏幕可用工作区宽度：
window.screen.availWidth 

// HTML精确定位:scrollLeft,scrollWidth,clientWidth,offsetWidth 
scrollHeight // 获取对象的滚动高度。 
scrollLeft // 设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离 
scrollTop // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 
scrollWidth // 获取对象的滚动宽度 
offsetHeight // 获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度 
offsetLeft // 获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置 
offsetTop // 获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 
event.clientX // 相对文档的水平座标 
event.clientY // 相对文档的垂直座标 
event.offsetX // 相对容器的水平坐标 
event.offsetY // 相对容器的垂直坐标 
document.documentElement.scrollTop // 垂直方向滚动的值 
// 相对文档的水平座标+垂直方向滚动的量 
event.clientX + document.documentElement.scrollTop
```



## 屏幕

### 屏幕尺寸

> 屏幕尺寸是屏幕的宽度和高度：显示器或移动屏幕。`window.screen`是保存屏幕尺寸信息的对象。

- **screen.width**：屏幕的宽。
- **screen.height**：屏幕的高。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1107d8d8506d47cd9f0dcc2c07f1a0d9~tplv-k3u1fbpfcp-watermark.awebp)



### 可用屏幕尺寸

> 可用的屏幕大小由活动屏幕的宽度和高度组成，没有操作系统工具栏。

- **screen.availWidth**：可利用的宽，等于屏幕的宽。
- **screen.availHeight**：可利用的高，等于屏幕的高减去 mac 顶部栏或 windows 底部栏。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2923c1ce69248f1ab6a02b5ad0c02d0~tplv-k3u1fbpfcp-watermark.awebp)



### 屏幕距离

- **screenTop**：浏览器窗口左上角到屏幕上边缘的距离。
- **screenLeft**：浏览器窗口左上角到屏幕左边缘的距离。

`Firefox` 浏览器不支持上述属性，但是可以使用👇:

- **screenX**：等于 screenLeft。
- **screenY**：等于 screenTop。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/651192c54f874591bd8864cc5c62dd2a~tplv-k3u1fbpfcp-watermark.awebp)



### 附录

1. **chrome/Opera**:保存的是浏览器窗口左上角相对于屏幕的距离

- 全屏时`四个值`均为0

1. **Firefox/Safari**:保存的是浏览器窗口左上角相对于屏幕的距离

- 当浏览器窗口全屏化时指的是整个浏览器与屏幕左上角的距离，因为在全屏化的时候浏览器边缘8px的边框不显示，所以`screenX`和`screenY`为-8

1. **IE**:保存的是`浏览器窗口文档显示区域`的左上角相对于屏幕左上角的位置。

- 网页顶部到屏幕顶部的距离：window.screenTop（浏览器全屏为工具栏的高度）
- 网页左边到屏幕左边的距离：window.screenLeft（浏览器全屏为0）

1. **ie9+**

- 浏览器窗口全屏化时`screenX`和`screenY`为-8

```js
var leftPos = (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX;
```

## window窗口

### 窗口外部尺寸

> 窗口的外部大小由整个浏览器窗口的宽度和高度组成，包含地址栏，选项卡栏和其他浏览器面板。

- window.outerWidth：浏览器窗口的宽。
- window.outerHeight：浏览器窗口的高。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63dcd2ec483344b6b4658939538c44c5~tplv-k3u1fbpfcp-watermark.awebp)

> 1. 在Chrome和Opera中，当浏览器窗口全屏化时，`outerWidth`和`outerHeight`指的是可以看到的`浏览器部分`所占据的空间。
>
> 2. 在FireFox、Safari、IE9和IE10中，当浏览器窗口全屏化时，`outerWidth`和`outerHeight`指的不仅是可以看到的浏览器所占据的空间，还包括其未显示部分。当浏览器窗口退出全屏化时，其四周会有8px的`边框`。而当浏览器窗口全屏化时，边框虽然未被显示，但仍然是计算在`outerWidth`和`outerHeight`内。
>
> 3. IE7、8不支持。

### 窗口内部尺寸

> 窗口的内部大小（也称为视口大小）由显示网页的视口的宽度和高度组成，包含滚动条。

- **window.innerWidth**：视口的宽。
- **window.innerHeight**：视口的高。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/537ec6617dc24480869890c70c03a2a9~tplv-k3u1fbpfcp-watermark.awebp)

## 客户区

> 元素的客户区大小（client dimension），指的是元素内容及其内边距所占据的空间大小

- **clientWidth**：内容可视区的宽度。
- **clientHeight**：内容可视区的高度。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0e68083ce3d4a0cb3749ff590641fbf~tplv-k3u1fbpfcp-watermark.awebp)

> 1. 如果有滚动条clientWidth = 元素宽 + padding（左右） - 滚动条
>
> 2. 如果没有滚动条clientWidth = 元素宽 + padding（左右）
>
> 3. 获取页面大小:let pageWidth = document.documentElement.clientWidth || document.body.clientWidth（ie7之前的版本）;

## 网页大小

> 网页大小由呈现的页面内容的宽度和高度组成。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c40700cd4554305ad2ffdc6ecc76ad6~tplv-k3u1fbpfcp-watermark.awebp)

- **scrollWidth**：实际内容的宽度。没有垂直滚动条时与clientWidth相同。否则是等于实际内容的宽度 + padding。scrollWidth也包括 ::before 和 ::after这样的伪元素。
- **scrollHeight**：实际内容的高度。没有垂直滚动条时与clientHeight相同。否则是等于实际内容的高度 + padding。scrollHeight也包括 ::before 和 ::after这样的伪元素。

### 滚动距离

- **scrollLeft**：元素最左端和窗口中可见内容的最左端之间的距离。即当前左滚的距离
- **scrollTop**：元素最顶端和窗口中可见内容的最顶端之间的距离。即当前上滚的距离

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/445b27b77fc440478e72b5f51cdbaeb3~tplv-k3u1fbpfcp-watermark.awebp)

> 1. 如果有滚动条scrollLeft = 隐藏内容宽度 + border
> 2. 如果没有滚动条scrollLeft = 0

### 附录

关于scrollX, pageXOffset, scrollLeft，一般使用如下：

1. window.scrollX;
2. window.pageXOffset;
3. document.documenetElement.scrollLeft

如果你想获取文档距离左边滚动的像素大小，你可以采用以下方法：

- window对象的pageXOffset属性总是可以返回滚动的长度，不管doctype是什么类型的，所有浏览器都支持这个属性，除了IE8及其更低版本的IE浏览器。
- window对象的scrollX属性总是可以返回滚动的长度，不管doctype是什么类型，Firefox, Chrome和Safari都支持该属性。
- 如果文档中没有指明文档类型，在IE, Firefox, Opera, Chrome和Safari中，通过body的scrollLeft可以获取滚动的数值。
- 如果有指明文档类型，那么在IE, Firefox和Opera中，可以通过html的scrollLeft属性获取滚动的数值，但是在Chrome和Safari中的值总是为0.
- 如果没有指明文档类型，那么html的scrollLeft属性总是返回0.

综合以上的信息，我们可以得出获取滚动条滚动数值的方法如下：

```js
var scrollLeft =  window.scrollX != undefined ? window.scrollX : window.pageXOffset;
scrollLeft = scrollLeft != undefined ? scrollLeft : (document.documentElement || document.body).scrollLeft;
```

## 偏移量

> 偏移量包括元素在屏幕上占用的所有可见的空间。元素的可见大小由其高度、宽度决定，包括所有内边距、滚动条和边框大小（注意，不包括外边距）。

- **offsetHeight**：元素在垂直方向上占用的空间大小，包括元素的高度、（可见的）

水平滚动条的高度、上边框高度和下边框高度。

- **offsetWidth**：元素在水平方向上占用的空间大小。包括元素的宽度、（可见的）垂

直滚动条的宽度、左边框宽度和右边框宽度。

- **offsetLeft**：当前元素内容区域（包括border）左边缘到 offsetParent 内容区域（不包括border）左边缘的距离。
- **offsetTop**：当前元素内容区域（包括border）顶部到 offsetParent 内容区域（不包括border）顶部的距离。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bf95016785c43b5896fece6a22032cd~tplv-k3u1fbpfcp-watermark.awebp)

> offsetWidth = 元素宽 + padding（左右）+ border（左右）+ 滚动条宽度

## 关于offsetParent

> `HTMLElement.offsetParent`是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。如果没有定位的元素，则`offsetParent`为最近的`table`,`table cell`或根元素（标准模式下为`html`；quirks模式下为`body`）。当元素的`style.display`设置为"none"时，`offsetParent`返回`null`。`offsetParent`很有用，因为`offsetTop`和`offsetLeft`都是相对于其内边距边界的

下面来探究几种可能的情况：

1. 元素自身有fixed定位，父元素不存在定位，则offsetParent的结果为null（firefox中为：body，其他浏览器返回为null）
2. 元素自身无fixed定位，且父元素也不存在定位，offsetParent为元素
3. 元素自身无fixed定位，且父元素存在定位，offsetParent为离自身最近且经过定位的父元素
4. 当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。
5. 元素的offsetParent是null

> 下面是在chrome中的测试结果，编号与上述对应

```html
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="test1" style="position: fixed"></div>
        <div id="test2"></div>
        <div id="div0" style="position: absolute">
            <div id="div1" style="position: absolute">
                <div id="test3"></div>
            </div>
        </div>
        <div id="test4" style="display: none"></div>
        <script>
            console.log(document.getElementById('test1').offsetParent); //【1】:null
            console.log(document.getElementById('test2').offsetParent); // 【2】:<body>
            console.log(document.getElementById('test3').offsetParent); // 【3】:<div id="div1">
            console.log(document.getElementById('test4').offsetParent); // 【4】null
            console.log(document.body.offsetParent); // 【5】null
        </script>
    </body>
</html>
```

简单🌰：

```html
<main style="position: relative" id="main">
    <article>
        <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
    </article>
</main>
<script>
    alert(example.offsetParent.id); // main
    alert(example.offsetLeft); // 180
    alert(example.offsetTop); // 180
</script>
```

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7a544fb8f62464eaf3574294c42b68c~tplv-k3u1fbpfcp-watermark.awebp)

## 演示

举一个🌰作为演示

```html
<div id="example">
    ...Text...
</div>
<style>
    #example {
        width: 300px;
        height: 200px;
        border: 25px solid #E8C48F;
        padding: 20px;
        overflow: auto;
    }
</style>
```

这里的div元素，具有border, padding和滚动条（margin不属于元素的部分，这里不给），该元素如下所示👇： ![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13d0062a622d46a28a7515ed53ca46d3~tplv-k3u1fbpfcp-watermark.awebp)

> 如果没有滚动条内容宽度为300,但是如果滚动条为16px宽（设备和浏览器之间的宽度可能有所不同），则仅保留300 - 16 = 284px宽度，因此我们应将其考虑在内。

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b804bf0cb9b94ec289e353299f5b21ad~tplv-k3u1fbpfcp-watermark.awebp)

关于元素大小和偏移的详细标注如下： ![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b884fab0d6fb4b6c9c0613c1f8502379~tplv-k3u1fbpfcp-watermark.awebp)

### 偏移量

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89cc6c4f72c64c1cb35d5dfefb825e2a~tplv-k3u1fbpfcp-watermark.awebp)

- `offsetWidth = 390`:内部CSS宽度（300px）+ padding（2 * 20px）+ border（2 * 25px）。
- `offsetHeight = 290`:外部高度。

### 客户区

在这个示例中我们可以用`clientTop`和`clientLeft`来测量元素border： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06386ddecfc240a0975cb691b32d0540~tplv-k3u1fbpfcp-watermark.awebp)

- `clientLeft = 25`：左边框宽度
- `clientTop = 25`：顶部边框宽度

> 文档从右到左（操作系统为阿拉伯语或希伯来语）时。滚动条不在右侧，而是在左侧，这个时候clientLeft还包括滚动条宽度。（这种情况比较少见，可以忽略）

前面说到clientWidth/Height提供内容可视区的大小，包括内容宽度和border，但没有滚动条： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c80111d512da43889447249fe1f73296~tplv-k3u1fbpfcp-watermark.awebp)

- `clientHeight = 240`:没有水平滚动条，因此它恰好是边框内部内容的总和：`CSS高度200px + 顶部和底部padding（2 * 20px）`。或者`offsetHeight290 -  border（2 * 25px）`
- `clientWidth = 324`:内容高度为284px + 左右padding 40px。或者`offsetWidth390px - border（2 * 25px）- 滚动条宽度16`

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e8e2edc80b946889db22d77efae8ce9~tplv-k3u1fbpfcp-watermark.awebp) 当没有`padding`时，我们可以`clientWidth/clientHeight`用来获取内容区域的大小。

### 滚动

`scrollWidth/Height`属性类似于`clientWidth/clientHeight`，但是它们还包括滚动（隐藏）的部分： ![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7bceb12bdae47fca535db11762d2af0~tplv-k3u1fbpfcp-watermark.awebp)

- `scrollHeight = 723`:是内容区域的整个内部高度，包括滚动部分。
- `scrollWidth = 324`:是整个内部宽度，这里我们没有水平滚动，所以等于`clientWidth`。

