# JavaScript

## 1、变量类型和计算

### JS值类型和引用类型
- 存储方式不同（堆/栈）
- 值类型：undefined null number string boolean symbol bigInt
- 引用类型：object array function

### typeof 运算符
- 识别所有值类型
- 识别函数
- 判断是否是引用类型（不可再细分）

### 判断js类型的方法和区别
  - typeof 判断基本类型和函数对象很方便，但无法区分 null 和 object（包括数组）。
  - instanceof 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上，只能检测对象的类型。
  - Object.prototype.toString 默认返回当前对象的 [[Class]]
### 判断数组
- Array.isArray（ES5）
```js
let a = []
Array.isArray(a);
```

- instanceof
```js
let a = [];
a instanceof Array
```

- Object.prototype.toString（可能会被改写）
```js
let a = []
Object.prototype.toString.call(a) === '[object Array]'
```

- constructor（可能会被改写）
```js
let a = []
a.constructor === Array
```
[参考](https://segmentfault.com/a/1190000006150186)

### Symbol
- ES6引入Symbol，是为了解决对象属性名冲突
- Symbol函数前不能使用new命令，因为Symbol是一个原始类型的值，不是对象。
- Symbol函数可以接收一个字符串作为参数，表示对Symbol实例的描述
- Symbol值不能与其他类型的值进行运算，会报错
- 用途1：消除魔法字符串（代码中写死的值）
- 用途2：可以用来表示一个独一无二的变量防止命名冲突
- 用途3：利用 symbol 不会被常规的方法（除了 `Object.getOwnPropertySymbols` 外）遍历到，所以可以用来模拟私有变量

```javascript
// 基本使用
var sym = Symbol('foo');
typeof sym; // 'symbol'
Symbol('foo') === Symbol('foo'); // false

var obj = {[sym]: 1};
obj[sym]; // 1

// Symbol.for()
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true

// Symbol.keyFor()
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

### BigInt
- 目的是解决Number无法精确表示非常大的整数
```js
0n === 0
// ↪ false

0n == 0
// ↪ true
```
[BigInt](https://segmentfault.com/a/1190000019912017?utm_source=tag-newest)

### 浮点数精度问题
- 它存在于任何使用浮点数来表示数字的编程语言中，比如java/c中的使用的float和double
- 问题一：0.1+0.2!=0.3
  - 1、当JavaScript执行比较时，实际比较的是比特位；
  - 2、而JavaScript使用IEEE754浮点数标准表示数字，0.1和0.2因为尾数无限循环而触发3次舍入操作，单独存储0.3这个数字时，仅触发1次舍入，因此会不相等。

- 问题二：9007199254740992 == 9007199254740993 // true
  - 1、`Math.MAX_SAFE_INTEGER`:2^53-1,所有尾数都是1
  - IEEE754标准下，无法精确表示的非常大的整数将自动四舍五入。确切地说，JS 中的Number类型只能安全地表示-9007199254740991 (-(2^53-1)) 和9007199254740991(2^53-1)之间的整数，任何超出此范围的整数值都可能失去精度。
  - 3、`MAX_SAFE_INTEGER` 和 `MAX_VALUE` 之间的数字却并不能被正确地表示

- 问题三：指数偏移量为什么是1023（2^11劈一半+同时首位两个数值有特殊用途-2=>(2^11-2)/2）
[IEEE 754浮点数标准中64位浮点数为什么指数偏移量是1023？](https://segmentfault.com/q/1010000016401244/a-1020000016446375)

- 问题四：为什么最大安全数是 2^53-1
[参考](https://www.zhihu.com/question/29010688)

- 解决方案
  - 1.将数字转成整数
  ```js
  function add(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
    }
  ```
  - 2.三方库（Math.js、Big.js）
  - 3.ES6 Number.EPSILON
  ```js
    Number.EPSILON=(function(){   //解决兼容性问题
      return Number.EPSILON?Number.EPSILON:Math.pow(2,-52);
    })();
    //上面是一个自调用函数，当JS文件刚加载到内存中，就会去判断并返回一个结果，相比if(!Number.EPSILON){
    //   Number.EPSILON=Math.pow(2,-52);
    //}这种代码更节约性能，也更美观。
    function numbersequal(a,b){ 
      return Math.abs(a-b)<Number.EPSILON;
    }
    //接下来再判断   
    var a=0.1+0.2, b=0.3;
    console.log(numbersequal(a,b)); //这里就为true了
  ```

[原码/反码/补码](https://segmentfault.com/a/1190000021511009)
[原码/反码/补码计算器](http://www.atoolbox.net/Tool.php?Id=952)
### 手写JS深拷贝
- 考虑object
- 考虑数组
- 考虑嵌套


### 变量计算-类型转换
1. 除了 ==  null 之外，其他一律用 ===
2. if语句和逻辑判断：变量使用 truly变量 & falsely变量

### 问题解答：
1. typeof 能判断哪些类型
2. 何时使用 === 何时使用 ==
3. 值类型和引用类型的区别
4. 手写深拷贝（判断值类型和引用类型、判断对象和数据、考虑嵌套）

## 2、原型和原型链

![原型链](https://img3.mukewang.com/szimg/605754fc0001ec9a19201080.jpg)

### JS原型相关面试题
- class和继承，结合jQuery的示例来理解
- instanceof，结合原型和原型链图示
- 原型和原型链，结合图示

## 3、作用域和闭包
### 作用域
- 作用域是指有效(有作用)的范围
- 作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限
- JavaScript 采用词法作用域（Lexical scoping），也就是静态作用域
### 静态作用域 vs 动态作用域
- 词法作用域：函数的作用域在函数定义时就决定了
- 动态作用域：函数的作用域在函数调用时才决定

```js
var value = 1;
function foo() {
  console.log(value);
}
function bar() {
  var value = 2;
  foo();
}
bar();
// 结果是？？？
```

### 闭包
- 什么是闭包
  - 闭包就是能够读取其他函数内部变量的函数
- 闭包的用途
  - 可以读取函数内部的变量
  - 让这些变量的值始终保持在内存中

[参考](https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

### JS严格模式：
- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的Javascript做好铺垫。
### 箭头函数
箭头函数有几个使用注意点。
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。（词法作用域）
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。（箭头函数会把arguments当做一个普通变量，顺着作用域链由内而外地查询-词法作用域）
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

### JS垃圾回收
- 什么是垃圾
  - 没有被引用的对象就是垃圾
- 如何捡垃圾
  - 标记-清除算法（Mark-Sweep GC）
    - 1、标记阶段:从根集合出发，将所有活动对象及其子对象打上标记
    - 2、清除阶段：遍历堆，将非活动对象（未打上标记）的连接到空闲链表上
    - 优点：实现简单， 容易和其他算法组合
    - 缺点：碎片化， 会导致无数小分块散落在堆的各处
  - 引用计数（Reference Counting）
    - 引用计数，就是记录每个对象被引用的次数，每次新建对象、赋值引用和删除引用的同时更新计数器，如果计数器值为0则直接回收内存。
    - 优点：可即刻回收垃圾
    - 缺点：计数器的增减处理繁重、占用很多位
[参考](https://segmentfault.com/a/1190000018605776)

### 内存泄露
- 1.闭包引起的内存泄漏
- 2.没有清理的DOM元素引用
- 3.没有清理的定时器/事件监听

## 4、异步

### Promise总结
- 三种状态和变化
  - pending/resolved/rejected
  - pending->resolved 或 pending->rejected
  - 变化不可逆

- 状态的表现
  - pending状态不会触发then和catch
  - resolved状态，会触发后续的then回调函数
  - rejected状态，会触发后续的catch回调函数

- then 和 catch 对状态的影响（重要）：
  - 只要没报错，then/catch都返回resolved Promise
  - 有报错，都返回rejected Promise
- then 和 catch 的链式调用（常考）

### await/async 和 Promise 的关系
- 执行aynsc函数，返回的是Promise对象
- await相当于promise的then
- try...catch可捕获异常，代替了promise的catch

### 什么场合用async/await，什么场合用Promise？
- 需要用到Promise各种便捷的方法（比如.race()之类）的时候，一定用Promise。
- 并行的请求最好用Promise。
- 不需要并行的场合，如果要传递参数，最好用Promise。
- 其他ajax场合，看你喜好try...catch...还是.catch()，以决定使用哪一方。

### 异步的本质
- async/await 是消灭异步回调的终极武器
- JS还是单线程，还是得有异步，还是得基于 event loop
- async/await 只是一个语法糖，但这颗糖真香！

### 宏任务和微任务

- eventloop 和 DOM渲染：
  - 1、Call Stack空闲 
  - 2、执行当前的微任务
  - 3、尝试DOM渲染 
  - 3、触发eventLoop机制

- 什么是宏任务/微任务？
  - 宏任务：SetTimeout、setInterval、Ajax、Dom事件；W3C规范
  - 微任务：Promise async/await；ES规范

- 微任务的执行时机别宏任务要早
  - 宏任务：DOM渲染后触发，如 setTimeout
  - 微任务：DOM渲染前触发，如 Promise

### JS异步面试题
- 描述event loop机制
  - 自行回顾event loop的过程
  - 和DOM渲染的关系
  - 微任务和宏任务在event loop过程中的不同处理
- 什么是宏任务和微任务，两者区别
  - 宏任务：setTimeout、setInterval、Ajax、DOM事件
  - 微任务：Promise、async/await
  - 微任务执行时机比宏任务要早
- Promise 的三种状态，如何变化
  - pending、resolved、rejected
  - pending->resolved,pending->rejected
  - 变化不可逆
- promise then 和 catch的连接
```js
// 第一题
Promise.resolve().then() => {
  console.log(1)
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})

// 第二题
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('error1');
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})

// 第三题
Promise.resolve().then(() => {
  console.log(1)
  throw new Error('error1');
}).catch(() => {
  console.log(2)
}).catch(() => {
  console.log(3)
})
```
- async/await语法

```js
async function fn() {
  return 100
}
(async function() {
  const a = fn()
  console.log('a', a);
  const b = await fn()
  console.log('b', b);
})()

(async function() {
  console.log('start');
  const a = await 100
  console.log('a', a)
  const b = await Promise.resolve(200)
  console.log('b', b)
  const c = await Promise.reject(300)
  console.log('c', c)
  console.log('end')
})()
```

- Promise 和 setTimeout顺序
```js
console.log(100)
setTimeout(() => {
  console.log(200)
})
Promise.resolve().then(() => {
  console.log(300)
})
console.log(400)
```

- async/await顺序
```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')

setTimeout(function() {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve();
}).then(function () {
  console.log('promise2')
})

console.log('script end');

// 1.执行同步任务
// 2.执行微任务
// 3.尝试触发DOM渲染
// 4.触发eventLoop，执行宏任务
```

### 查漏补缺

数组方法
- concat()	连接两个或更多的数组，并返回结果。
- copyWithin()	从数组的指定位置拷贝元素到数组的另一个指定位置中。
- entries()	返回数组的可迭代对象。
- every()	检测数值元素的每个元素是否都符合条件。
- fill()	使用一个固定值来填充数组。
- filter()	检测数值元素，并返回符合条件所有元素的数组。
- find()	返回符合传入测试（函数）条件的数组元素。
- findIndex()	返回符合传入测试（函数）条件的数组元素索引。
- forEach()	数组每个元素都执行一次回调函数。
- from()	通过给定的对象中创建一个数组。
- includes()	判断一个数组是否包含一个指定的值。
- indexOf()	搜索数组中的元素，并返回它所在的位置。
- isArray()	判断对象是否为数组。
- join()	把数组的所有元素放入一个字符串。
- keys()	返回数组的可迭代对象，包含原始数组的键(key)。
- lastIndexOf()	搜索数组中的元素，并返回它最后出现的位置。
- map()	通过指定函数处理数组的每个元素，并返回处理后的数组。
- pop()	删除数组的最后一个元素并返回删除的元素。
- push()	向数组的末尾添加一个或更多元素，并返回新的长度。
- reduce()	将数组元素计算为一个值（从左到右）。
- reduceRight()	将数组元素计算为一个值（从右到左）。
- reverse()	反转数组的元素顺序。
- shift()	删除并返回数组的第一个元素。
- slice()	选取数组的一部分，并返回一个新数组。
- some()	检测数组元素中是否有元素符合指定条件。
- sort()	对数组的元素进行排序。
- splice()	从数组中添加或删除元素。
- toString()	把数组转换为字符串，并返回结果。
- unshift()	向数组的开头添加一个或更多元素，并返回新的长度。
- valueOf()	返回数组对象的原始值。


  
## JS真题
### 何为变量提升？
- 1.js 会将变量的声明提升到js顶部执行，本质是js引擎在编译的时候，就将所有的变量声明了，因此执行时所有的变量都已经完成了声明。
- 2.当有多个同名变量声明的时候，函数声明会覆盖其他的声明。如果有多个函数声明，则是由最后的一个函数声明覆盖之前所有的声明。
- 3.let和const都具有变量提升的效果，但是它们都具有临死性死区，从作用域开始，一直到变量的声明语句这整一块，你都不能使用该变量。

### var 和 let const 的区别
  - var声明是全局作用域或函数作用域，而let和const是块作用域。
  - var变量可以在其范围内更新和重新声明； let变量可以被更新但不能重新声明； const变量既不能更新也不能重新声明。
  - 它们都被提升到其作用域的顶端。 但是，虽然使用变量undefined初始化了var变量，但未初始化let和const变量。
  - 尽管可以在不初始化的情况下声明var和let，但是在声明期间必须初始化const。

  > 暂时性死区：ES6规定，let/const 命令会使区块形成封闭的作用域。若在声明之前使用变量，就会报错。
  总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。
  这在语法上，称为 “暂时性死区”（ temporal dead zone，简称 TDZ）。

### typeof 返回哪些类型
  - undefined string number boolean symbol
  - object（注意，typeof null === 'object'）
  - function
### 列举强制类型转换和隐式类型转换
  - 强制：parseInt parseFloat toString
  - 隐式：if 、逻辑运算、 == 、+拼接字符串

### 手写深度比较 isEqual

### split() join()区别
### 数组的 pop push unshift shift

### 数组的API有哪些是纯函数
  - 纯函数：1.不改变原数组；2、返回一个数组。如concat map filter slice
  - 非纯函数：push pop shift unshift forEach some every reduce
  - reduce `arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`

### JS运行机制检测
```js
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function(resolve, reject) {
  console.log(2);
  resolve()
}).then(function() {
  console.log(3)
});
process.nextTick(function () {
  console.log(4)
})
console.log(5)

```
> 第一轮：主线程开始执行，遇到setTimeout，将setTimeout的回调函数丢到宏任务队列中，在往下执行new Promise立即执行，输出2，then的回调函数丢到微任务队列中，再继续执行，遇到process.nextTick，同样将回调函数扔到为任务队列，再继续执行，输出5，当所有同步任务执行完成后看有没有可以执行的微任务，发现有then函数和nextTick两个微任务，先执行哪个呢？process.nextTick指定的异步任务总是发生在所有异步任务之前，因此先执行process.nextTick输出4然后执行then函数输出3，第一轮执行结束。
第二轮：从宏任务队列开始，发现setTimeout回调，输出1执行完毕，因此结果是25431