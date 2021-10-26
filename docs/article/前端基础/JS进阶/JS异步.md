# JS异步

- callback
- promise
- generator
- async/await

## call

## Promise

产生回调地狱的原因：
1. 多层嵌套的问题；
2. 每种任务的处理结果存在两种可能性（成功或失败），那么需要在每种任务执行结束后分别处理这两种可能性。

Promise 通过回调函数延迟绑定、回调函数返回值穿透和错误“冒泡”技术解决了上面的两个问题。

我们还分析了 Promise 之所以要使用微任务是由 Promise 回调函数延迟绑定技术导致的。

思考题：
1. Promise 中为什么要引入微任务？
2. Promise 中是如何实现回调函数返回值穿透的？
3. Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获异常的函数？

搞清楚了这三道题目，你也就搞清楚了 Promise。

## generator

## async/await
