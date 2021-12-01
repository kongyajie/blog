# JS精选题集

## 一、JS类型相关
##### `{}` `new Object()` `Object.create()` 区别

##### 输出是什么？
```js
const set = new Set([1, 1, 2, 3, 4]);
console.log(set); // {1,2,3,4}
```

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


【前50题中值得注意的题】：
8、14、17、20、21、29、37、38、40、43、46、48、49
52、54、56、57、58、62

【题型分类】

### 运算符
63 自加操作 

### 语句
79 `for...in` `for...of`
95 js引擎自动加分号
99 语句错误类型: ReferenceError TypeError SyntaxError

### 类型判断
68 `Number(2)` 和 `new Number(2)` 和 `2` ，`Boolean(false)` 和 `new Boolean(false)`  和 `false`，`Symbol('foo')` 和 `Symbol.for('foo')` 

### 字符串String
69 字符串操作 String.prototype.padStart
72 字符串操作 String.raw

### 数组Array
74 Array.prototype.push 返回值为数组size
65 reduce使用
93 数组结构

### 对象Object
76 对象解构
97 Symbol不可枚举，Object.keys for...in 均不可获取

### 函数Function
64 值传递引用传递 
78 闭包
92 箭头函数无原型
98 数组解构和箭头函数

### 原型原型链

### js代码执行机制
82 this

### 异步
71 yield

73 async await
### 模块化
67 import模块提前到编译阶段即执行
89 export default 和 export const name = 'xxx' 可以同时导出出来

## 参考资料

[测试题](https://juejin.cn/post/6844903782229213197)
[javascript-questions](https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md)
