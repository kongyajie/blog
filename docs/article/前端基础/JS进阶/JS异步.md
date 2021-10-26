# JS异步

- callback
- promise
- generator
- async/await

## callback
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

## Promise
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
## generator

## async/await
