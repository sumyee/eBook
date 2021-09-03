---
title: '类型'
sidebar: auto
---

## 数据类型

最新的 ECMAScript 标准定义了 8 种数据类型：

有7种基本类型：[string](https://developer.mozilla.org/zh-CN/docs/Glossary/String)，[number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)，[bigint](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)，[boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)，[null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)，[undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined)，[symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol) ([ECMAScript](https://developer.mozilla.org/zh-CN/docs/Glossary/ECMAScript) 2016新增)

1种引用类型：[Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)

###### 变量在内存中的具体存储形式

**基本类型**是保存在**栈内存**中的简单数据段，它们的值都有固定的大小，保存在栈空间，通过按值访问。

**引用类型**是保存在**堆内存**中的对象，值大小不固定，<u>栈内存中存放的该对象的访问地址</u>指向堆内存中的对象，JavaScript不允许直接访问堆内存中的位置，因此操作对象时，实际操作对象的引用。

## typeof

`typeof`可以准确判断除了`null`以外的基本类型

```js {2}
// JavaScript 诞生以来便如此
typeof null === 'object'
// 数值
typeof 1 === 'number';
typeof NaN === 'number'; // 尽管它是 "Not-A-Number" (非数值) 的缩写
typeof Number(1) === 'number'; // Number 会尝试把参数解析成数值
// 字符串
typeof '' === 'string';
typeof (typeof 1) === 'string'; // typeof 总是返回一个字符串
typeof String(1) === 'string'; // String 将任意值转换为字符串，比 toString 更安全
// 布尔值
typeof true === 'boolean';
typeof Boolean(1) === 'boolean'; // Boolean() 会基于参数是真值还是虚值进行转换
typeof !!(1) === 'boolean'; // 两次调用 ! (逻辑非) 操作符相当于 Boolean()
// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';
// Undefined
typeof undefined === 'undefined';
// 对象
typeof {a: 1} === 'object';
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';
typeof /regex/ === 'object';
typeof function() {} === 'function';
typeof class C {} === 'function'
```

## instanceof

**`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

（判断某个变量是否为某一对象的实例）

```js
'string' instanceof String  // false
true instanceof Boolean // false
1 instanceof Number  // false
undefined instanceof Object // false
null instanceof Object  // false

x instanceof Object // 报错 x is not defined
{} instanceof Object  // true
new String('string') instanceof String // true
new Boolean(true) instanceof Boolean // true
new Number(10) instanceof Number // true
[] instanceof Array // true
new Array() instanceof Array // true
new Date() instanceof Date // true
new RegExp('') instanceof RegExp // true
/hello/ instanceof RegExp // true
```



## 类型转换