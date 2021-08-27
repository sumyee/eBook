---
title: 手写代码
sidebar: auto
---

<!-- > 目录
> [[toc]] -->

## throttle

::: tip 节流
持续触发事件，每隔一段时间，只执行一次事件。
:::

- 时间戳版：最后一次触发的时间少于 `wait`，则导致最后一次触发并没有执行函数
- 定时器版：首次触发事件的时候不会执行函数
- 结合版：
  - 首次触发事件立即执行
  - 停止触发事件后依然再执行一次事件

<details>
<summary>展开查看</summary>

@[code js](./code/throttle.js)
</details>

---

## debounce

::: tip 防抖
触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时
:::

@[code js](./code/debounce.js)
---

## new

@[code js](./code/new.js)
---

## instanceof

@[code js](./code/instanceOf.js)
---

## Object.create

@[code js](./code/create.js)
---

## deepClone

@[code js](./code/deepClone.js)
---

<!-- Array -->
## Array

### call
@[code js](./code/Array/call.js)

### apply
@[code js](./code/Array/apply.js)

### bind
@[code js](./code/Array/bind.js)

### forEach
@[code js](./code/Array/forEach.js)

### map
@[code js](./code/Array/map.js)

### some
@[code js](./code/Array/some.js)

### every
@[code js](./code/Array/every.js)

### filter
@[code js](./code/Array/filter.js)

### flatten
@[code js](./code/Array/flatten.js)

## Promise
@[code js](./code/promise.js)

## 柯里化
@[code js](./code/currying.js)

## JSONP
:::tip 原理

利用`<script>` 标签没有跨域限制的性质，网页可以得到其他源产生的 JSON 数据，为什么不用`<img>` `<link>` 呢，因为只有 `script` 标签可以指定 `Content-Type : text/javaScript`，其他返回的只有数据，而不是脚本，并不会执行。

:::

优点：

- 兼容性好，操作简单。

缺点：

- 仅仅只支持 get 请求。
- get 请求携带参数受限，大小 4kb 左右。
- 不够安全，可能会遭受 xss 攻击。

@[code js](./code/jsonp.js)

## async [](https://juejin.cn/post/6844904102053281806)

<details>
<summary>展开查看</summary>

@[code js](./code/asyncToGenerator.js)
</details>