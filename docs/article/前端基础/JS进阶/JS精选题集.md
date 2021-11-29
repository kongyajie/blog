# JS精选题集

## 一、JS类型相关
##### `{}` `new Object()` `Object.create()` 区别

##### argument 类数组结构有什么特点？

## 二、原型与原型链相关
##### `var a = {}` a上有哪些方法？

## 三、异步编程相关

---

异步代码输出顺序：

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

<details><summary><b>答案</b></summary>
<p>

#### 答案：

1. script start
2. async1 start
3. async2 start
4. script end
5. async1 end
6. promise1
7. promise1 then
8. timeout

</p>
</details>

---

## 四、执行机制相关

---

分析输入结果：

```js
for (var i = 1; i < 3; i++) {}
  setTimeout(() => {console.log(i)}, 0)
}
for (let i = 1; i < 3; i++) {}
  setTimeout(() => {console.log(i)}, 0)
}
```

<details><summary><b>答案</b></summary>
<p>

#### 答案： `3 3 3` `1 2 3`

var声明的变量i是全局作用域，因此查找时找到的是全局作用域中的i，即遍历完成之后的i，值为 `3 3 3`
而let声音的变量拥有块级作用域，因此查找时找到的是块级作用域中的i，相互独立，值为 `1 2 3`

</p>
</details>


---

## 五、其他


【前50题中值得注意的题】：8、14、17、20、21、29、37、38、40、43、46、48、49

## 参考资料

[测试题](https://juejin.cn/post/6844903782229213197)
[javascript-questions](https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md)
