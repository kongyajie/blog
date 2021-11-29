# JavaScript系列之5-小测验

JS练习册
## 一、JS对象
### `var a = {}` a上有哪些方法？

## 二、JS原型原型链
### `{}` `new Object()` `Object.create()` 区别

## 三、JS异步

```js
console.log('script start')
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 start')
}
async1()
setTimeout(() => {
  console.log('timeout')
}, 0)
Promise.resolve().then(() => {
  console.log('promise1')
}).then(() => {
  console.log('promise1 then')
})
console.log('script end')
```

## 四、JS执行机制
- 执行上下文
- 作用域/作用域链
- 闭包
- 
- outer指针
- this指向
- 箭头函数


argument 是类数组结构有什么特点？


【前50题中值得注意的题】：8、14、17、20、21、29、37、38、40、43、46、48、49

## 总体测验

[测试题](https://juejin.cn/post/6844903782229213197)
[javascript-questions](https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md)
