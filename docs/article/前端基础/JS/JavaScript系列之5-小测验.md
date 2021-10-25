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

## 总体测验

[测试题](https://juejin.cn/post/6844903782229213197)

## 其他题目

这是一段递归代码，可以通过传入参数 n，让代码递归执行 n 次，也就意味着调用栈的深度能达到 n，当输入一个较大的数时，比如 50000，就会出现栈溢出的问题，那么你能优化下这段代码，以解决栈溢出的问题吗？

```js
function runStack (n) {
  if (n === 0) return 100;
  return runStack( n- 2);
}
runStack(50000)
```

解法一：

```js
function runStack (n) {
  if (n === 0) return 100;
  return setTimeout(function(){runStack( n- 2)},0);
}
runStack(50000)
```

解法二：
```js
function runStack (n) {
  if (n === 0) return 100;
  return runStack.bind(null, n- 2); // 返回自身的一个版本
}
// 蹦床函数，避免递归
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
trampoline(runStack(1000000))
```