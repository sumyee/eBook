# BFC

## 什么是BFC

`BFC` 即是 `Block Formatting Context`（块级格式化上下文），是一个独立的渲染区域，让处于 `BFC` 内的元素与外部元素相互隔离，使内外元素的定位不会相互影响。

## BFC 的触发条件

> 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 `inline-block`、`table-cells` 和 `table-captions`），以及 `overflow` 值不为 `visible` 的块级盒子，都会为他们的内容创建新的 `BFC`。

存在以下几种方案可创建 **BFC** :

- 浮动元素，`float` 值不为 `none`
- 绝对定位元素，`position` 属性为 `absolute`，`fixed`
- 内联块 (元素具有 `display: inline-block`)
- 表格单元格 (元素具有 `display: table-cell`，HTML表格单元格默认属性)
- 表格标题 (元素具有 `display: table-caption`, HTML表格标题默认属性)
- `overflow`值不为`visible`（`visible`是默认值。内容不会被修剪，会呈现在元素框之外）
- 弹性盒（`flex`或`inline-flex`）
- ***除此之外，根元素，HTML元素本身就是BFC（最大的一个BFC）***

## BFC 布局规则

- 内部盒子会在垂直方向，一个一个地放置
- 盒子垂直方向的距离由`margin`决定，属于同一个 **BFC** 的两个相邻 **Box** 的上下`margin`会发生重叠
- 每个元素的`margin box`的左边，与容器块`border box`的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
- **BFC** 的区域不会与`float`重叠
- **BFC** 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也是如此

## BFC 作用

### 自适应两栏布局

阻止元素被浮动元素覆盖，自适应成两栏布局

```html {19}
<!-- 左边宽度固定，右边的内容自适应宽度（不设置宽度） -->
<div class="left">
    左浮动元素
</div>
<div class="right">
    没有设置浮动，没有设置宽度。但是触发了 BFC
</div>

<style>
    .left {
        float: left;
        width: 100px;
        height: 100px;
        background: #4abf8a;
    }
    .right {
        height: 100px;
        background: #409eff;
        overflow: hidden; /* 触发 BFC */
    }
</style>
```
<div class="left" style="float: left;width: 100px;height: 100px;color: #fff;background: #4abf8a;">
    左浮动元素
</div>
<div class="right" style="height: 100px;color: #fff;background: #409eff;overflow: hidden;">
    没有设置浮动，没有设置宽度。但是触发了 BFC
</div>

### 清除内部浮动

解决浮动元素不占高度的问题（浮动元素未被包裹在父容器）

```html {8}
<div class="parent">
    <div class="child"></div>
</div>

<style>
    .parent {
        border: 1px solid #409eff;
        overflow: hidden;
    }
    .child {
        float: left;
        width; 100px;
        height: 100px;
        background: #4abf8a;
    }
</style>
```

<div class="parent" style="border: 1px solid #409eff;overflow: hidden;">
    <div class="child" style="float: left;width: 100px;height: 100px;background: #4abf8a;"></div>
</div>

### 解决 margin 重叠

为了防止 margin 重叠，可以使多个 box 分属于不同的 BFC

```html {10}
<div class="container">
    <p></p>
</div>
<div class="container">
    <p></p>
</div>

<style>
    .container {
        overflow: hidden;
    }
    p {
        width: 100px;
        height: 100px;
        margin: 10px;
        background: #4abf8a;
    }
</style>
```

<div class="container" style="overflow: hidden;">
    <p style="width: 100px;height: 100px;margin: 10px;background: #4abf8a;"></p>
</div>
<div class="container" style="overflow: hidden;">
    <p style="width: 100px;height: 100px;margin: 10px;background: #4abf8a;"></p>
</div>

### 阻止元素被浮动元素覆盖

```html {18}
<div class="left">
    左浮动元素
</div>
<div class="right">
    没有设置浮动。但是触发了 BFC
</div>

<style>
    .left {
        float: left;
        width: 100px;
        height: 100px;
        background: #4abf8a;
    }
    .right {
        height: 200px;
        background: #409eff;
        overflow: hidden;
    }
</style>
```

<div class="left" style="float: left;width: 100px;height: 100px;color: #fff;background: #4abf8a;">
    左浮动元素
</div>
<div class="right" style="height: 200px;color: #fff;background: #409eff;overflow: hidden;">
    没有设置浮动。但是触发了 BFC
</div>


```
<Badge type="tip" text="v2" vertical="top" />
```
