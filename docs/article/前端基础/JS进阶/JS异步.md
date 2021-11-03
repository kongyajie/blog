# JS异步

## 一、异步基础
### 为什么需要异步
JS设计为单线程，同步会阻塞代码的执行，异步不会阻塞代码的执行

### 异步的使用场景
- 网络请求，如Ajax请求
- 定时任务，如setTimeout

### Promise的基本使用
问题：回调地狱
promise的好处：窜行的方式代替回调嵌套

## 二、异步进阶

- callback
- promise
- generator
- async/await

### callback
高阶函数：接受函数作为参数的函数

```js
function sayHello(callback) {
  console.log('Hello');
  return callback()
}
sayHello(() => {
  console.log('callback')
})
```

比如下面的高阶函数例子：

```js
[1,2,3].map(el => el * el);
[1,2,3].filter(el => el > 2);
```

高阶函数中的函数参数被执行，就是回调

异步编程中回调是非常常见的编程范式

但是会有回调地狱的问题，造成阅读困难

我们可以通过将函数进行提取缓解，但依然很难阅读

为了解决这个问题，JS引入 promise

### Promise
promise 有三个状态 pending fulfilled rejected

默认状态是 pending

promise 内部可以通过 resolve() 修改状态为 fulfilled，或 reject() 修改状态为 rejected

修改状态为 fulfilled 会触发 promise.then()
修改状态为 rejected 会触发 promise.catch()

因此我们可以把成功的回调处理函数传入 promise.then()，报错的回调处理函数放入 promise.catch()

```js
const p = new Promise((resolved, rejected) => {
  resolved(1);
})
p.then((result) => {
  console.log(result);
})

```

promise 还支持链式调用，可以简化代码

但是毕竟还是异步的思维，于是ES7引入了 Async/Await ，一步到位

async 放在函数前，表示返回的是一个包裹了返回值的 promise，同时告诉JS引擎内部可能有异步函数调用
await 一定要配合 async 才能使用，不然会报错

有了 async/await 组合，我们可以使用同步的写法来处理异步调用了

错误处理可以用 `try{} catch(){}`

```js
try {

} catch(err) {

}
```
### generator

### async/await


## 问答题：
### EventLoop的机制
> EventLoop 是 JS异步回调的实现机制

eventloop 执行过程：
1. 首先执行同步代码
2. 遇到异步调用，如setTimeout或ajax请求等web api时，则交由浏览器的其他进程或线程处理，继续执行同步代码
3. 异步调用处理完毕后，会将回调加入到回调队列中，等到同步代码执行完毕，会依次从回调队列取出并加入到执行栈中执行


### 为什么是宏任务和微任务，有什么区别？

### Promise 有哪三种状态？如何变化？
#### 三种状态：
- pending resolved rejected
- pending -> resolved 或 pending -> rejected
- 变化不可逆

#### 状态的表现
- resolved 会触发 then 回调函数
- rejected 会触发 catch 回调函数

#### then和catch状态改变规则（重要）
- `Promise.then` 正常返回 `resolved` ，里面有报错则返回 `rejected`
- `Promise.catch` 正常返回 `resolved` ，里面有报错则返回 `rejected`


#### 几个题目
第一题：

```js
Promise.resolve().then(() => {
    console.log(1)
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})

```

第二题：

```js
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('error1')
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
```

第三题：

```js
Promise.resolve().then(() => {
    console.log(1);
    throw new Error('err')
}).catch(() => {
    console.log(2)
}).catch(() => {
    console.log(3)
})
```

## async/await
同步语法，彻底消灭回调函数

### 1、async/await 使用

```js
// async function() {
//   await 
// }
```

### 2、async/await 和 Promise 的关系
- 执行async函数，返回的是一个Promise对象
- await 相当于 promise 的 then
- trye...catch可捕获异常，代替了 promise 的 catch

### 3、async/await是语法糖，异步的本质还是回调函数
- async 函数会同步执行
- await 的后面，都可以看成是 callback 里的内容，即异步

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');
async1();
console.log('script end');

```


### 4、for...of 的应用场景
- forEach for...in 同步
- for...of 支持异步

```js
async function multiple(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num * num);
        }, 1000)
    })
    
}

// forEach 是同步的，因此1秒后，全部输出
[1,2,3].forEach(async n => {
    let res = await multiple(n)
    console.log(res);
})

// for...of 支持异步，1秒输出一个数
for (let i of [1,2,3]) {
    let res = await multiple(i);
    console.log(res)
}
```

## 宏任务和微任务
- 什么是宏任务，什么是微任务
- eventloop 和 DOM渲染
- 宏任务和微任务的区别

## 场景题
### 场景题：promise then和catch的连接
### 场景题：async/await语法
### 场景题：promise 和 setTimeout 的顺序
### 场景题：外加async/await的顺序问题