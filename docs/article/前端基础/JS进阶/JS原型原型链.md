# JS原型和原型链

在介绍原型之前，我们先来看一个例子

> 目标：JS实现一个 Person 类，包含一些属性，和一些方法

## 一、实现一个Person类

### 第一版

方案：使用工厂模式创建类

```js
function Person(name, age) {
  let person = {};
  person.name = name;
  person.age = age;
  person.play = function() {
    console.log('play');
  }
  person.sleep = function() {
    console.log('sleep');
  }
  return person;
}
let aaron = Person('Aaron', 31);
let vera = Person('Vera', 28);
aaron.play();
vera.sleep();
```

不足之处：每次创建对象都重新创建方法

### 第二版

改进思路：提取公共方法，在 `sharedMethods` 中单独管理，需要时引用获取

```js
const sharedMethods = {
  play: function() {
    console.log('play');
  },
  sleep: function() {
    console.log('sleep');
  }
}
function Person(name, age) {
  let person = {};
  person.name = name;
  person.age = age;
  person.play = sharedMethods.play;
  person.sleep = sharedMethods.sleep;
  
  return person;
}
let aaron = Person('Aaron', 31);
let vera = Person('Vera', 28);
aaron.play();
vera.sleep();
```

不足之处：`sharedMethods` 单独管理成本高，而且也没有解决方法多次创建的问题

### 第三版

改进方案：使用 `Object.create` 代理 `sharedMethods` 上的方法

```js
const sharedMethods = {
  play: function() {
    console.log('play');
  },
  sleep: function() {
    console.log('sleep');
  }
}
function Person(name, age) {
  let person = Object.create(sharedMethods);
  person.name = name;
  person.age = age;
  
  return person;
}
let aaron = Person('Aaron', 31);
let vera = Person('Vera', 28);
aaron.play();
vera.sleep();
```

这里 **Object.create** 帮助我们建立了一个指向 `sharedMethods` 的**代理**。

因此 `aaron` 对象虽然上并没有 `play` 方法，但是通过这个代理，可以获取到。解决了方法复用的问题。

**不足之处**：未解决 `sharedMethods` 单独管理成本高


### 第四版

```js
function Person(name, age) {
  let person = Object.create(Person.prototype);
  person.name = name;
  person.age = age;
  
  return person;
}

Person.prototype.play = function() {
  console.log('play');
}
Person.prototype.sleep = function () {
  console.log('sleep');
}

let aaron = Person('Aaron', 31);
let vera = Person('Vera', 28);
aaron.play();
vera.sleep();
```

利用 `javascript` 提供的 `prototype` 属性代替 `sharedMethods` ，来保存这些公用方法。

>  定义： **prototype** 是所有js函数都有的一个属性，我们可以用它来在示例间共享方法


### 第五版

使用 `new` 关键字简化：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.play = function() {
  console.log('play');
}
Person.prototype.sleep = function () {
  console.log('sleep');
}

let aaron = new Person('Aaron', 31);
let vera = new Person('Vera', 28);
aaron.play();
vera.sleep();
```

这里我们在创建对象时使用了 new 关键字 `new Person()`，代替原来的 `Person()`，效果其实是一样的，而且构造函数精简了不少。

new 关键词做了很多事情：

```js
let this = Object.create(Person.prototype) // 1.创建名为this的对象，然后将这个对象代理到 Person.prototype 上，因此this对象拥有它上面的方法
// this.name = name;
// this.age = age;
return this; // 2.返回创建的这个对象
```

为了加深对 `new` 的印象，我们可以自己模拟实现一个 new ：

```js
/**
 * 模拟new （不使用 Object.create）
 * @ctor 构造函数
 * @arg 参数
 **/
function myNew(ctor, ...arg) {
  let obj = {} // 1.创建一个空对象，等同于 let obj = new Object();
  obj.__proto__ = ctor.prototype // 2.将空对象obj的__proto__属性指向构造函数的 prototype 原型属性，来代理到构造函数上的方法
  let res = ctor.call(obj, ...arg) // 3.对以obj为上下文，执行构造函数，并返回结果
  return typeof res === 'object' ? res : obj // 4.若构造函数返回的是一个对象，则返回这个对象，否则返回第一步创建的obj
}

/**
 * 模拟new （使用 Object.create）
 * @ctor 构造函数
 * @arg 参数
 **/
function myNew2(ctor, ...arg) {
  let obj = Object.create(ctor.prototype) // 1. 创建一个空对象，并代理到 ctor.prototype 的方法上，同上面的第1和第2步
  let res = ctor.call(obj, ...arg) // 同上
  return typeof res === 'object' ? res : obj // 同上
}

let p1 = new Array(1,2,3)
let p2 = myNew(Array, 1,2,3)
let p3 = myNew2(Array, 1,2,3)
```

### 第六版

使用  `class` 实现

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  play() {
    console.log('play')
  }
  sleep() {
    console.log('sleep')
  }
}

let aaron = new Person('Aaron', 31);
let vera = new Person('Vera', 28);
aaron.play();
vera.sleep();
```

### 小结

上面的示例中，我们使用了几种不同的方式模拟实现 Person 类。

这也引出了几个JS最核心的基础概念，比如 `prototype` `Object.create` `new` `class`。

下面我们熟悉一下它们。

## 二、一些概念

### prototype

> prototype 是所有JS函数都有的一个属性，我们可以用它在实例间共享属性和方法

### Object.create

> 定义：Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__ 
> 语法：Object.create(proto，[propertiesObject])
> - MDN

简单说，`Object.create(proto)` 方法帮助我们创建了一个新对象，这个对象的 `__proto__` 属性指向 `proto`，然后返回这个对象。

**我们来测试一下：**

```js
var obj = Object.create(null)
obj // {}
obj.__proto__ // undefined
obj.constructor === undefined // true
```

由于 `Object.create` 会先创建一个对象，最后返回它，因此 `obj` 是一个空对象
而由于 `null` 没有任何方法，因此 `obj` 的 `__proto__` 上也没有任何方法，直接为 `undefined`

**再看正常情况下的：**

```js
var o = { a: 1 }
var obj = Object.create(o)
obj // {}
obj.__proto__ // { a: 1 }
obj.a // 1
obj.constructor === Object // true
```

这个示例中，我们以 `o` 作为 `prototype` 原型，赋给了 `obj` 的 `__proto__` 。

* 因此 `obj` 依然还是 `{}` 
* 但 `obj.__proto__` 上拥有了 `o` 的所有属性和方法
* 执行 `obj.a` 时，首先会在 `obj` 对象本身查找，发现没有找到，因此会向 `obj.__proto__` 上查找，发现有这个属性，因此返回 1 
* `obj.constructor` 指向的是创建 `obj` 的构造函数，而在 `Object.create` 内部，创建 `obj` 时构造函数即为 `Object`

我们模拟实现一个 `Object.create()` ：

```js
Object.myCreate = function(proto) {
  let obj = {} // 等同于 let obj = new Object()
  obj.__proto__ = proto
  return obj;
}
var o = { a: 1 }
var obj = Object.myCreate(o)
obj.constructor // Object
```

从第一行代码 `let obj = {}` 中我们发现，创建 `obj` 的时候，构造函数是 `Object` ，因此创建出来的对象，其构造函数就是 `Object`

**上面的示例中，我们是用对象 `o` 作为原型参数，下面我们看看用 `o.__proto__` 会是什么效果：**

```js
var o = { a: 1 }
var obj = Object.create(o.__proto__)
obj // {}
obj.__proto__ // Object.prototype
obj.a // undefined
obj.constructor === Object // true
```

这里，因为我们传入的原型参数是 `o.__proto__` ，其实也就是 `Object` 这个构造函数。

它上面有很多方法，`obj` 都可以调用，但并没有 `a` 属性，因此 `obj.a` 返回了 `undefined`

**最后，我们看看 `Object.create` 的第二个参数 `propertiesObject`**

> Object.create(proto, propertiesObject) 

`propertiesObject` 允许我们添加额外的属性，但是需要遵循 **属性描述符** 的格式，和 `Object.defineProperty` 的[第二个参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)一样：

```js
var o = { a: 1 }
var obj = Object.create(o, {
  b: {
    value: 2
  }
})
obj // { b: 2 }
obj.b = 3
obj // { b: 2 } 
```

上面的例子中，因为默认添加的 `b` 属性是 **不可写** ，**不可枚举**，**不可配置** 的，因此修改 b 的值无效。


```js
var o = { a: 1 }
var obj = Object.create(o, {
  b: {

    // 数据描述符
    // value: 2,
    // writable: true, // 默认为 false
    enumerable: true, // 默认为 false
    configurable: true, // 默认为 false

    // 访问器描述符
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
})
obj // { b: 10 }
obj.b = 3
obj // { b: 10 }
```

同样的，这个例子中，由于 `obj.b` 调用的是 b 属性的 `访问器描述符` ，因此每次都会返回 `10` 。

### new

> 定义：`new 运算符` 创建一个**用户定义的对象类型**的实例或**具有构造函数的内置对象**的实例。 - MDN
> 语法：`new constructor[([arguments])]`

new 关键字是JS中的语法糖，它内部会进行如下几个操作：
1. 创建一个空对象
2. 为这个空对象添加属性 `__proto__` ，并链接到构造函数的原型对象上
3. 执行这个构造函数，并指定步骤1中创建的对象作为 `this` 的上下文
4. 如果构造函数没有返回对象，则返回 `this`，如果有返回对象，则返回这个对象

自己实现一个：

```js
function myNew(ctor, ...arg) {
  var obj = Object.create(ctor.prototype)
  // var obj = {}
  // obj.__proto__ = ctor.prototype
  var res = ctor.call(obj, ...arg)
  return typeof res === 'object' ? res : obj
}
```

通过以上4个步骤，我们就可以用 new 创建对象的实例了。

```js
var a = new Object({a:1});

function Person(name, age) {
    this.name = name   
    this.age = age
}
var p = new Person('Aaron', 31)
```

### class

> **class 声明**创建一个基于原型继承的具有给定名称的新类。

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sayHello() {
    console.log('Hello')
  }
}

var p = new Person('Aaron', 31);
p.__proto__ === Person.prototype // true
```

其实 class 声明是ES6添加的一个语法糖，可以通过这个 [babel在线工具](https://babeljs.io/repl/#?browsers=&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=MYGwhgzhAEAKCmAnCB7AdtA3gKGtY6EALogK7BEqIAUaYAtvADTRgDm8AlFrntEQAsAlhAB0dRtAC80CfF55BI0e3jTWHXgF9eEMAE8AEvBAgU1bjjw6tQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.15.8&externalPlugins=&assumptions=%7B%7D) 查看ES5的实现：

```js
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Person = /*#__PURE__*/function () {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [{
    key: "sayHello",
    value: function sayHello() {
      console.log('Hello');
    }
  }]);

  return Person;
}();
```


## 三、创建对象的几种方式对比
* `{}`
* `new Object()`
* `Object.create()`

```js
var obj1 = Object.create({a:1})
var obj2 = {a:1}
var obj3 = new Object({a:1})
```

`obj2` 和 `obj3` 是等价的，`{a:1}` 是 `new Object({a:1})` 的语法糖。

obj3 new 的内部做了下面几个操作：
1. 创建一个新的对象 `obj`
2. 将这个对象的 `__proto__` 指向构造函数也就是 `Object` 的原型，即 `obj.__proto__ = Object.prototype`
3. 执行这个构造函数，并以第一步创建的对象 `obj` 作为 this 上下文，即 `let res = Object.call(obj, ...arg)`
4. 如果构造函数返回的结果是 `object` 类型的，则返回这个结果，否则返回 `obj`

因此，`obj2` 和 `obj3` 本身均拥有 `a` 属性，这是上面的第三步产生的效果。

而 obj1 则是新建一个空对象，然后将这个对象的 `__proto__` 指向 `{a:1}` 这个对象，所以 `obj1` 本身并没有 `a` 属性，而是在原型链上可以访问到 `{a:1}` 上的 `a` 属性

## 四、Object对象上的属性和方法

### 1、创建相关
- `Object.create(proto，[propertiesObject])` 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
- `Object.assign(target, ...sources)` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

### 2、属性相关
- `Object.defineProperties(obj, props)` 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
- `Object.getOwnPropertyNames(obj)` 方法返回一个由指定对象的所有自身属性的属性名（**包括不可枚举属性但不包括Symbol值作为名称的属性**）组成的数组。
- `Object.getOwnPropertyDescriptors(obj)` 方法用来获取一个对象的所有自身属性的描述符。
- `Object.getOwnPropertySymbols(obj)` 方法返回一个给定对象自身的所有 Symbol 属性的数组。

- `Object.seal(obj)` 方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。
- `Object.isSealed(obj)` 方法判断一个对象是否被密封。

- `Object.preventExtensions(obj)` 方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。
- `Object.isExtensible(obj)` 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

- `Object.freeze()` 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；
- `Object.isFrozen(obj)` 方法判断一个对象是否被冻结。

- `Object.keys(obj)` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
- `obj.hasOwnProperty(prop)` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

- `Object.entries(obj)` 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
- `Object.fromEntries(iterable) ` 方法把键值对列表转换为一个对象。

- `Object.values(obj)` 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

### 3、原型相关
- `Object.setPrototypeOf()` 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。**性能原因建议使用 Object.create 替代**

- `Object.getPrototypeOf(obj)` 方法返回指定对象的原型（内部[[Prototype]]属性的值）。
- `prototypeObj.isPrototypeOf(object)` 方法用于测试一个对象是否存在于另一个对象的原型链上。

### 4、其他
- `Object.is(value1, value2)` 方法判断两个值是否为同一个值。
- `obj.toString()` 方法返回一个表示该对象的字符串。
- `obj.valueOf()` 方法返回指定对象的原始值。

```js
let arr = [];
Object.getPrototypeOf(arr) === Array.prototype // getPrototypeOf
```

### Array上的属性和方法
Todo...

## 五、继承的实现方式

### ES5继承

JS继承的实现一直是个麻烦事儿，我们先用 ES5 来实现以下：

```js
function Animal(name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function(num) {
  console.log(`${this.name} is eating ${num}...`)
}

Animal.prototype.sleep = function() {
  console.log(`${this.name} is sleeping...`)
}

Animal.prototype.play = function()  {
  console.log(`${this.name} is playing...`)
}

// let leo = new Animal('leo', 10)

function Dog(name, energy, breed) {
  Animal.call(this, name, energy) // 1、继承属性
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype) // 2、继承方法（但这里会引起 constructor 异常）

Dog.prototype.bark = function() { // 3、在子类的原型上添加方法
  this.energy -= .1
}

Dog.prototype.constructor = Dog // 4、修复 constructor 异常

```

### ES6继承

现在我们用 ES6 的语法来实现继承：

```js
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }

  eat(num) {
    console.log(`${this.name} is eating ${num}...`)
  }

  sleep() {
    console.log(`${this.name} is sleeping...`)
  }

  play()  {
    console.log(`${this.name} is playing...`)
  }
}

class Dog extends Animal {
  constructor(name, energy, breed) {
    super(name, energy) // 等同于调用了 Animal 的 constructor
    this.breed = breed
  }
  bark() {
    this.energy -= .1
  }
}
```

可以看到 ES6 的实现精简了许多，也和其他面相对象编程语言如 Java 、C++的语法更接近了

### 原型链

**一些概念**

*`prototype` 是构造函数上的属性，用来在不同的实例间共享属性和方法

*`__proto__` 是对象上的属性，指向这个对象的原型

*`constructor` 是对象的构造函数，指向创建这个对象的构造函数

*`instanceof` 是判断一个对象是否为这个构造函数的实例

```js
var obj = new Object()
obj.__proto__ === Object.prototype // true
obj.constructor === Object // true
obj instanceof Object // true
```

**Function Array 和 Object是什么关系？**

```js
Function.prototype.__proto__ === Object.prototype // true
Array.prototype.__proto__ === Object.prototype // true
```

上面的结果说明： **Function 和 Array 都继承自 Object，它们创建的实例都有 Object 原型方法**

**原型链的最初是什么状态？**

`null => Object => Array/Function`


## 总结
首先，我们通过实现一个 Person 类，了解到：
- prototype 原型是如何在实例间共享方法的
- Object.create(prototype) 的效果是创建一个对象，然后将其 `__proto__` 属性代理到 `prototype` 上，这样这个对象就可以调用 prototype 上的方法了
- new 关键字可以简化我们的构造函数，比如 `new Object()` 它主要做了如下几件事：
  1. 创建一个空对象 obj
  2. 设置这个对象的 `__proto__` 为构造函数 `Object.prototype`
  3. 执行这个构造函数，并以 obj 作为this上下文
  4. 第三步返回的若是一个对象，则返回这个对象，否则返回 obj

然后，我们分别对介绍了 `prototype` `Object.create(proto, propertiesObject)` `new` `class` 的使用

接着，我们比较了几种创建对象的方式：`{}` `Object.create({})` `new Object()`

再后来，对 Object 对象上的方法进行了详细的介绍，并分类列出了创建相关的、属性相关、原型相关的方法

最后，我们使用 ES5 和 ES6 的语法分别实现继承，并引出原型链。