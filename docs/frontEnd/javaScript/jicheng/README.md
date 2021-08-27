---
title: 继承
# sidebar: auto
---

<!-- # 继承 -->

### 基于原型链继承

>  基本思想就是通过原型继承多个引用类型的**属性**和**方法**。

```js {10-11}
function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function() {
    return this.property;
};
function SubType() {
    this.subproperty = false;
}
// 继承 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
    return this.subproperty;
};
let instance = new SubType();
console.log(instance.getSuperValue()); // true 
```

- `SubType` 通过创建 `SuperType` 的实例并将其赋值给自己的原型 `SubTtype. prototype` 实现了对 `SuperType` 的继承。
- 这个赋值重写了 `SubType` 最初的原型，将其替换为 `SuperType` 的实例。
- 这意味着 `SuperType` 实例可以访问的所有属性和方法也会存在于 `SubType. prototype`。

#### 优点

> 1. **父类方法可以复用**

#### 缺点

> 1. **原型中包含的引用值会在所有实例间共享** （父类的所有`引用属性`会被所有子类共享，更改一个子类的引用属性，其他子类也会受影响）
>
>    ```js
>    function SuperType() {
>        this.colors = ["red", "blue", "green"];
>    }
>    function SubType() {}
>    // 继承 SuperType
>    SubType.prototype = new SuperType();
>    let instance1 = new SubType();
>    instance1.colors.push("black");
>    console.log(instance1.colors); // "red,blue,green,black"
>    let instance2 = new SubType();
>    console.log(instance2.colors); // "red,blue,green,black"
>    ```
>
>    在这个例子中，`SuperType` 构造函数定义了一个 `colors` 属性，其中包含一个数组（引用值）。每 个 `SuperType` 的实例都会有自己的 `colors` 属性，包含自己的数组。但是，当 `SubType` 通过原型继承 `SuperType` 后，`SubType.prototype` 变成了 `SuperType` 的一个实例，因而也获得了自己的 `colors` 属性。这类似于创建了 `SubType.prototype.colors` 属性。最终结果是，`SubType` 的所有实例都会 共享这个 `colors` 属性。
>
> 2. **子类型在实例化时不能给父类型的构造函数传参**



### 基于构造函数继承

> 基本思路很简单：在子类构造函数中调用父类构造函数。

```js {5-6}
function SuperType() {
    this.colors = ["red", "blue", "green"];
}
function SubType() {
    // 继承 SuperType
    SuperType.call(this);
}
let instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
let instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green" 
```

- 通过使用 `call()`（或 `apply()`）方法，`SuperType` 构造函数在为 `SubType` 的实例创建的新对象的上下文中执行了。
- 这相当于新的 `SubType` 对象上运行了 `SuperType()`函数中的所有初始化代码。结果就是每个实例都会有自己的 `colors` 属性。

#### 优点

> 1. **可以在子类构造函数中向父类构造函数传参**
>
> 2. **父类的引用属性不会被共享**

#### 缺点

> 1. **必须在构造函数中定义方法**
> 2. **子类也不能访问父类原型上定义的方法**（即不能访问`SuperType.prototype`上定义的方法）



### 组合继承

> 基本的思路：使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。
>
> （这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。）

```js {9-10,13-14}
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
};
function SubType(name, age){
    // 继承属性
    SuperType.call(this, name); // 第二次调用 SuperType()
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType(); // 第一次调用 SuperType()
SubType.prototype.sayAge = function() {
    console.log(this.age);
};

let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
instance1.sayName(); // "Nicholas";
instance1.sayAge(); // 29

let instance2 = new SubType("Greg", 27);
console.log(instance2.colors); // "red,blue,green"
instance2.sayName(); // "Greg";
instance2.sayAge(); // 27 
```

#### 优点

1. **融合了原型链继承和构造函数继承的优点**

#### 缺点

1. **父类的构造函数被调用了两次**（代码执行（第一次调用 `SuperType` 构造函数）后 `SubType.prototype` 上会有两个属性：`name` 和 `colors`。它们都是 `SuperType` 的实例属性，但现在成为了 `SubType` 的原型属性。在调用 `SubType` 构造函数时，也会调用 `SuperType` 构造函数（第二次调用），这一次会在新对象上创建实例属 性 `name` 和 `colors`。这两个实例属性会遮蔽原型上同名的属性。）



### 原型式继承

> 创建一个临时构造函数，将传入的对象赋值给这个构造函数的原型，然后返回这个临时类型的一个实例。

```js
function object(o) {
    // 创建临时构造函数
    function F() {}
    // 将传入的对象赋值给这个构造函数的原型（F 的实例都将继承 o 上的方法）
    F.prototype = o;
    // 返回实例
    return new F();
} 
```

本质上，`object()`是对传入的对象执行了一次浅复制。

<u>ECMAScript 5 通过增加 `Object.create()`方法将原型式继承的概念规范化了。</u>

这个方法接收两个参数：作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选）。在只有一个参数时， `Object.create()`与这里的 `object()`方法效果相同。

`Object.create()`的第二个参数与 `Object.defineProperties()`的第二个参数一样：每个新增属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性。如：

```js
let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = Object.create(person, {
    name: {
        value: "Greg"
    }
});
console.log(anotherPerson.name); // "Greg" 
```

<u>**原型式继承**非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但要记住， **属性中包含的引用值始终会在相关对象间共享**，跟使用原型模式是一样的。</u>



### 寄生式继承

> 寄生式继承背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。

基本的寄生继承模式：

```js
function createAnother(original){
    let clone = object(original); // 通过调用函数创建一个新对象
    clone.sayHi = function() { // 以某种方式增强这个对象
        console.log("hi");
    };
    return clone; // 返回这个对象
} 
```

用法：

```js
let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi(); // "hi" 
```

#### 缺点

1. **通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似**。





### 寄生式组合继承

> 基本思路：不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本。
>
> 说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。

寄生式组合继承通过盗用构造函数继承属性，但使用混合式原型链继承方法。

```js
function inheritPrototype(subType, superType) {
    let prototype = object(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 赋值对象
} 
```

1. 创建父类原型的一个副本
2. 给返回的 `prototype` 对象设置 `constructor` 属性，解决由于重写原型导致默认 `constructor` 丢失的问题
3. 将新创建的对象赋值给子类型的原型

```js {13}
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
};
function SubType(name, age) {
    SuperType.call(this, name); 
    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
    console.log(this.age);
}; 
```

这里只调用了一次 `SuperType` 构造函数，避免了 `SubType.prototype` 上不必要也用不到的属性， 因此可以说这个例子的效率更高。而且，原型链仍然保持不变，因此 `instanceof` 操作符和 `isPrototypeOf()`方法正常有效。<u>寄生式组合继承可以算是引用类型继承的最佳模式</u>。