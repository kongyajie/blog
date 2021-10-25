# JS执行机制

JavaScript 的执行机制：**先编译，再执行**。

## 一、全局执行上下文

开发人员可以通过 functions/modules/packages 等管理代码复杂度，**执行上下文**则是JavaScript引擎用来管理解释和执行代码用的。

JS引擎运行代码时，首先会创建 **全局执行上下文（Global Execution Context）**

每个执行上下文都有两个独立的阶段：
- creation phrase 创建阶段
- exclusion phrase 执行阶段
它们有各自的职责。

**创建阶段**
1. 创建一个 `gloabl` 对象
2. 创建一个 `this` 对象
3. 在内存中给变量和函数分配内存空间
4. 给变量声明赋值为 undefined ，同时将函数声明载入内存（**变量提升**）

**执行阶段**
1. 从上到下，一行一行顺序执行

具体看一个例子：

```js
var name = 'aaron'
var age = 31
function getUser() {

}
```

这里代码运行时，会先进入创建阶段：
1. 创建一个 global 对象 ， 在浏览器console中打印 `globalThis` 是 `window` 对象
2. 创建一个 this 对象  ，在浏览器console中打印 `this` 也是 `window` 对象
3. 在**环境变量**中创建name 和 age两个属性，并使用 undefined 对其初始化 
4. 将 getUser 的函数定义存储到堆（HEAP）中，并在环境变量中创建一个 getUser 的属性，指向堆中函数的位置
5. 接下来，JS引擎会把声明以外的代码编译为**字节码**

好了，现在有了执行上下文和可执行代码，那么接下来就到了执行阶段了。

进入执行阶段：
1. 第一行 `var name = 'aaron'` ，给 `name` 赋值 `aaron`
2. 第二行 `var age = 31`，给 `age` 赋值 `31`
3. 执行结束

以上，我们介绍了全局执行上下文的运行过程。你也可以通过[可视化工具](https://ui.dev/javascript-visualizer/)观察整个流程。

在实际的代码中，我们经常会调用函数，而调用函数会产生**函数执行上下文**，下面让我们看看函数执行上下文的运行过程。

## 二、函数执行上下文

函数执行上下文的运行也分为两个阶段，唯一的区别是**创建阶段的第一步**：

- 创建阶段
1. **创建一个 `arguments` 对象**
2. 创建一个 `this` 对象
3. 在内存中创建变量和函数的空间
2. 给变量声明赋值为 undefined ，同时将函数声明载入内存（**变量提升**）

- 执行阶段
1. 从上到下，一行一行顺序执行

```js
function getUser() {
  console.log(name) // undefined
  console.log(age) // undefined
  var name = 'Aaron'
  var age = 31
}
getUser()
```

函数执行上下文的运行过程可以类比上面的全局执行上下文运行过程，就不展开了。

函数调用往往不只一层，函数调用函数也是很常见的，因此引出了函数上下文栈的概念。

## 三、执行上下文栈

JS运行时，维护了一个**执行上下文栈**。

这个栈最初只有一个全局执行上下文，当函数调用时，JS引擎会创建函数执行上下文，并推入执行上下文栈。当函数执行完后，这个函数执行上下文会被弹出。

看一个例子：

```js
function a () {
  function b() {
    function c() {

    }
    c()
  }
  b()
}
a()
```
你可以通过[可视化工具](https://ui.dev/javascript-visualizer/)观察执行上下文栈的流程

再看一个例子：

```js
var lastName = 'Kong'
function getName(lastName) {
  var firstName = 'Aaron'
  return firstName + lastName;
}
getName(lastName);
```

注意：getName 的函数执行上下文中，在创建阶段 lastName 即被当做 argument 传入，且被赋值

## 四、作用域和作用域链

执行上下文栈，引出了一个新的概念 **作用域** 和 **作用域链** 。

**作用域** 可以看成是变量的有效范围

**作用域链查找** 可以看成是查找变量时的链条，当前函数作用域内没有找到变量的定义时，就会采用冒泡的方式，向上一级查找，上一级没有接着上一级找，直到最顶层 window

```js
function foo() {
  var bar = 'Declared in foo'
}
foo();

console.log(bar)
```

在执行 `console.log(bar)` 时，foo 已经被弹出，因此会报错 `bar is not defined`

```js
var name = 'Aaron'
function logName() {
  console.log(name)
}
logName();
```

当在函数执行上下文中查找不到 name 时，会向执行上下文栈中的上一级去查找，也就是全局执行上下文，发现变量 `name = 'Aaron'`

## 五、闭包

**闭包**其实只是一个绑定了执行环境的函数，

**闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量**

```js
function makeAdder(x) {
  return function inner(y) {
    return x + y;
  }
}
var adder = makeAdder(1)
adder(2)
```

闭包何时会被释放？

## 完整示例分析

```js

```


## 六、this关键字

**`this` 的由来：你可以使用不同的上下文来复用函数，换句话说，`this`关键字让你可以决定在函数或者方法被调用时使用哪个对象来处理。**

> this的指向决定于**函数在哪里被调用**，所以要搞清楚this的指向，也就先要知道它是被谁调用的。

总共有下面5种情况：
- Implicit Binding （隐式绑定-大概占80%的情况）
- Explicit Binding （显示绑定）
- new Binding （new绑定）
- Lexical Binding （词法绑定）
- window Binding （window绑定）

### 1、隐式绑定
原则: `关注点左边的对象(left of the dot)`

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  greet() {
    alert(`Hello, my name is ${this.name}`)
  }
}
user.greet();
```

左边没有点的情况下呢？继续往下看
### 2、显示绑定
> “call” is a method on every function that allows you to invoke the function specifying in what context the function will be invoked.

```javascript
function greet() {
  alert(`Hello, my name is ${this.name}`)
}

const user = {
  name: 'Tyler',
  age: 27,
}
greet.call(user);
```

原则：`关注call调用时的第一个参数`

> `apply` 和 `call` 的目的是一样的，除了传参方式不同外。
> `bind` 和 `call` 基本一样，只是它并不立即执行函数，而是返回一个新的函数，以便再未来使用。

### 3、new绑定

> `new` 一个函数时，js引擎会创建一个对象 this，然后返回出来，因此这里的 `this` 会指向接受这个返回值的变量。

```javascript
function User (name, age) {
  /*
    Under the hood, JavaScript creates a new object
    called `this` which delegates to the User's prototype
    on failed lookups. If a function is called with the
    new keyword, then it's this new object that interpreter
    created that the this keyword is referencing.
  */

  this.name = name
  this.age = age
}

const me = new User('Tyler', 27)
```

### 4、词法绑定

```javascript
const user = {
  name: 'Tyler',
  age: 27,
  languages: ['JavaScript', 'Ruby', 'Python'],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`

    const langs = this.languages.reduce((str, lang, i) => {
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`
      }

      return `${str} ${lang},`
    }, "")

    alert(hello + langs)
  }
}
```

> this is determined “lexically”. Arrow functions don’t have their own this. Instead, just like with variable lookups, the JavaScript interpreter will look to the enclosing (parent) scope to determine what this is referencing.

### 5、window 绑定

```javascript
function sayAge () {
  console.log(`My age is ${this.age}`)
}

const user = {
  name: 'Tyler',
  age: 27
}

sayAge() // My age is undefined
```

>  If none of the other rules are met, then JavaScript will default the this keyword to reference the window object.


### this指向小结

> So putting all of our rules into practice, whenever I see the this keyword inside of a function, these are the steps I take in order to figure out what it’s referencing.
> 1. Look to where the function was invoked.
> 2. Is there an object to the left of the dot? If so, that’s what the “this” keyword is referencing. If not, continue to #3.
> 3. Was the function invoked with “call”, “apply”, or “bind”? If so, it’ll explicitly state what the “this” keyword is referencing. If not, continue to #4.
> 4. Was the function invoked using the “new” keyword? If so, the “this” keyword is referencing the newly created object that was made by the JavaScript interpreter. If not, continue to #5.
> 5. Is “this” inside of an arrow function? If so, its reference may be found lexically in the enclosing (parent) scope. If not, continue to #6.
> 6. Are you in “strict mode”? If yes, the “this” keyword is undefined. If not, continue to #7.
> 7. JavaScript is weird. “this” is referencing the “window” object.

## arrow function

1. 不能作为构造函数使用 new 来创建对象
2. 没有 prototype 属性

## call/apply/bind

## 参考资料
- [javascript-visualizer](https://ui.dev/javascript-visualizer/)