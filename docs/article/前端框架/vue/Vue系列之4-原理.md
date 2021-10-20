# Vue系列之4-原理

## 前言

- 前端三大框架对比 

| 框架 | 发布年份 | 出自 | star数 | 特性 |
| --- | --- | --- | --- | --- |
| Angular | 2010年 | Google | 73.7k | 双向数据绑定 |
| React | 2013年 | Facebook | 169k | VirtualDOM、Redux |
| Vue | 2014年 | 尤雨溪EvanYou | 184k | 更轻量、易于上手、中文文档友好 |

- 框架趋同/互相借鉴
    - Vue借鉴knockout模板引擎、借鉴Angular双向数据绑定、借鉴React虚拟dom/redux/JSX
    - 跨端开发（Ionic/ReactNative/Weex）
    - 桌面开发（electron支持vue/react）
    - 总之，你有我有全都有，大家好才是真的好

- 类vue的开发模式（新赛道）：小程序、uniapp

阅读本文后你将了解到：
- Vue是什么？解决了什么问题？
- MVVM架构
- 三要素（响应式、模板编译、vdom/diff算法）
- 组件渲染/更新过程

PS：本文内容主要针对Vue2，涉及少量vue3.0内容

## 一、Vue是什么？

**vue是什么？**
> Vue (读音 /vjuː/，类似于 **view**) 是一套用于**构建用户界面的渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与**现代化的工具链以及各种支持类库**结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

- 轻量级渐进式框架（便于与第三方库或既有项目整合）
- 生态丰富（vue-cli、vue-router、vuex、社区UI组件库...）
- 易于上手（入门简单、中文文档友好）

**vue解决了什么问题？**
- **HTML**：从0到1
- **CSS**：提供装饰
- **JavaScript(DOM)**：支持页面动态化（例如倒计时）
- **jQuery**：解决浏览器兼容问题、优雅API（解放前端，造轮子）
- **Vue**：**数据驱动视图**，让开发者从DOM操作中解放（如倒计时，自加器）

**疑问：数据驱动视图是怎么做到的？（数据变化 -> 视图更新）**

### 1、如何理解MVVM

> MVVM是一种软件架构模式，MVVM是MVP的变体，MVP模式和MVVM模式都是MVC模式的变体。[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

> 软件构架对代码进行解耦分层，各层互不影响，有效降低了开发复杂度。我们可以通过调整MVC三者之前的通信模式，来达到一定的架构目的。


MVVM对视图更新模式的影响
- 静态渲染：更新需要进行DOM操作，如ASP/JSP/PHP，适合业务简单的场景
- 数据驱动视图：通过数据即可更新视图，如Vue/React/Angular，适合业务复杂的场景

MVVM包含3部分：
- **View**：用户看到屏幕的结构、布局和外观，也称UI
- **ViewModel**：是一个绑定器，能和 `View` 和 `Model` 层进行通信
- **Model**：是数据和逻辑

### 2、MVVM在Vue中的体现
 
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3e0fecfffa34c1f9e8d34572f52e7e2~tplv-k3u1fbpfcp-watermark.image)

示例：

```html
<template>
    <div id="app">
      <h1>{{ message }}</h1>
      <button @click="reverse">reverse</button>
    </div>
</template
```

```js
var app = new Vue({
    el: "#app",
    data: {
      message: "Hello Vue123!!"
    },
    methods: {
      reverse() {
        this.message = this.message.split("").reverse().join("");
      }
    }
});
```

- View: template模板
- Model: data数据
- ViewModel: Vue实例

PS：Vue没有严格遵循 MVVM 模式：严格的MVVM要求View不能和Model直接通信，而Vue在组件中提供了$refs这个属性，让Model可以直接操作View，违反了这一规定。

**疑问：vue是如何实现MVVM的？**

### 3、Vue三要素

- 响应式：vue如何监听到 data 的每个属性变化？
- 模板引擎：vue的模板如何被解析？
- 渲染：vue如何进行高效渲染？

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa6b219179c14b13abd1d436703e2099~tplv-k3u1fbpfcp-watermark.image)

## 二、Vue三要素-响应式
> 响应式：组件 data 的数据一旦变化，立刻触发视图的更新。
响应式如何实现？

### Object.defineProperty（IE9+）
```js
let obj = {};
let value = null;
Object.defineProperty(obj, 'a', {
    get: () => {
        console.log('trigger get');
        // 收集依赖 todo...
        return value;
    },
    set: (val) => {
        console.log('trigger set');
        if (val !== value) {
            value = val;
            // 数据变更，需要重新渲染 todo...
        }
        
    }
})
console.log(obj.a);
obj.a = 1;
```

缺点
- 深度监听需要递归到底，一次性计算量大
- 无法监听新增属性/删除属性（Vue.$set）
- 无法原生监听数组，需要特殊处理

### proxy（Vue3.0，IE11+）

```js
let obj = {}
let reactiveObj = new Proxy(obj, {
    get: function(obj, prop) {
        console.log('trigger get');
        // 收集依赖 todo...
        return obj[prop];
    },
    set: function(obj, prop, value) {
        console.log('trigger set');
        obj[prop] = value;
        if (obj[prop] !== value) {
            // 数据变更，需要重新渲染 todo...
        }
    }
})
```
缺点：
- 有兼容性的问题，caniuse 95%
- 它会修改JavaScript的一些底层代码的执行方式，所以它是无法被完全polyfill的

响应式带来的问题：
- jQuery可以自行控制DOM操作的时机，手动调整，而响应式的DOM操作则在内部进行；
- DOM 操作非常耗费性能

**疑问：如何有效控制DOM操作？**

## 三、Vue三要素-渲染：虚拟DOM（Virtual DOM）
> Vue是数据驱动视图，如何有效控制DOM操作？
    
- 解决方案：`vdom`
    - JS执行速度快
    - 用JS模拟DOM结构，计算出最小的变更，操作DOM
- `vdom` 是优化方案，不是响应式必须
    - `vdom` 是实现 `vue` 和 `react` 的重要基石
    - `diff算法` 是 `vdom` 中最核心、最关键的部分
- 用JS模拟DOM结构：`vnode`

```html
<div id="div1" class="container">
    <p>vdom</p>
    <ul style="font-size: 20px;">
        <li>a</li>
    </ul>
</div>
```
```js
{
    tag: 'div',
    props: {
        classname: 'container',
        id: 'div1'
    },
    children: [
        {
            tag: 'p',
            children: 'vdom'
        },
        {
            tag: 'ul',
            props: { style: 'font-size: 20px;' },
            children: [
                {
                    tag: 'li',
                    children: 'a'
                }
            ]
        }
    ]
}
```
    
- `vdom` 小结：数据驱动视图的模式下，有效控制DOM操作
    - `vnode`：用JS模拟DOM结构
    - `diff算法`：新旧vnode对比，得出最小更新范围，最后更新DOM

## 四、diff算法-vdom核心部分
> diff 算法是一种通过同层的树节点进行比较的高效算法，避免了对树进行逐层搜索遍历，所以时间复杂度只有 O(n)

### 概述：
- diff即对比，是一个广泛的概念（非独创），如linux diff命令，git diff等
- 两个js对象也可以做diff
- 两棵树做diff，如这里的vdom diff

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/286a4362483c4cafb3fb8615cefe94bc~tplv-k3u1fbpfcp-watermark.image)
    
### 树diff的时间复杂度O(n^3)
- 1、遍历tree1，2、遍历tree2，3、排序
- 1000个节点，要计算1亿次，算法不可用

### 优化时间复杂度到O(n)
- 只比较同一层级，不跨级比较
- tag不相同，则直接删掉重建，不再深度比较
- tag和key，两者都相同，则认为是相同节点，更新dom，并继续比较节点的子元素

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39a203ea582649f5aba9bf27f86aada7~tplv-k3u1fbpfcp-watermark.image)
    
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68ef124893964d349a15fa4f32759b2d~tplv-k3u1fbpfcp-watermark.image)

### diff算法流程
1、首次渲染，取vnode进行渲染即可

2、数据更新后，将vnode和oldVnode进行对比
- 从根节点开始遍历，判断当前的旧节点和新节点是否同一节点（sel和key相同）
- 若不是同一节点，则删掉重建；
- 若是同一节点，则更新当前节点dom，继续处理子元素children
    
3、**子元素children的对比算法**（尽可能多地复用真实DOM,尽可能少的添加删除真实DOM）
思路：添加4个指针，分别指向新旧children的开始和结束比较的过程中，循环从两边向中间收拢；
- 第一步：分别进行开始开始、结束结束、开始结束、结束开始对比，若匹配成功，则指针向中间收拢；
- 第二步：若第一步未匹配，则在旧children中遍历查找是否匹配新children的开始节点，若匹配成功，则移动旧节点到对应位置；
- 第三步：循环结束后，根据新老节点的数目不同做相应的添加或者删除节点操作

各场景图示（这里看动画 👉  [diff算法图解动画](https://www.bilibili.com/video/BV1b5411V7i3?from=search&seid=4125072074822008044)）

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0d8dca6afe24cd795af2edc2be7e049~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5295957102da4ba2b13eb6c8c65b4f73~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ee3dec92df84644982cfb237166e12c~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e62d8912026f4bbf9f1975de26b8de73~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad12f271b8484572b14e32048fbba20f~tplv-k3u1fbpfcp-watermark.image)

删除节点
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f94f32ebd3040c9bec27350e554f8cf~tplv-k3u1fbpfcp-watermark.image)

新增节点
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bdb95ad733f414f9542a5ebb4ec9175~tplv-k3u1fbpfcp-watermark.image)

未设置key
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/027885ad98f7446d8eefa107c481c6a7~tplv-k3u1fbpfcp-watermark.image)

设置key
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50d9e7701ad14f779de617fb3368fc3c~tplv-k3u1fbpfcp-watermark.image)

需要说明的是，节点的更新有三种开销：

- 第一种是不能复用节点时，重建节点，更新dom
- 第二种是能复用节点时，直接更新dom
- 第三种是能复用节点，但需移动dom，然后更新

数组加key即符合第三种情况。

## 五、Vue三要素-模板编译
- 概览
    - 前置知识：JS的with语法
        - 改变{}内自由变量的查找规则，当做obj属性来查找
        - 如果找不到匹配的obj属性，就会报错
        - with要慎用，它打破了作用域规则，易读性变差
    - vue模板(不是html，有指令、插值、JS表达式)到底是什么？
    - vue如何处理模板？组件渲染和更新过程？
- 步骤：
    1. **vue-template-complier将模板`<template>`编译为 render 函数**
    2. **执行 render 函数生成 vnode**
    3. 基于 vnode 再执行 patch 和 diff，进行渲染和更新
    4. 修改数据后，会生成新的vnode
    
- vue模板被编译成什么（ `vue-template-compiler` ）

`<p>{{message}}</p>`

`with(this){return _c('p', [_v(_s(message))])}`

类似于：

```js
render: function (createElement) {
    return createElement(
      'p',   // 标签名称
      this.message.toString() // 子节点数组
    )
},
```

- 其他注意点：
    - 使用webpack vue-loader，会在开发环境编译模板
    - vue组件可以用render代替template，react默认使用render写法

## 六、Vue的组件渲染/更新过程

- 初次渲染过程
    1. 解析模板为render函数（或在开发环境已完成，vue-loader）
    2. （页面渲染时）执行render函数，生成vnode，patch(elem,vnode)
    3. 触发响应式，监听data属性getter setter
- 更新过程
    1. 修改data，触发setter（此前在getter中已被监听）
    2. 重新执行render函数，生成newVnode
    3. 对比新旧vnode，patch(vnode,newVnode)，更新到dom上

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/981c630c3aa8411d888a6c2442a88baa~tplv-k3u1fbpfcp-watermark.image)

## 七、Vue3.0的性能优化
> 性能比vue2.x快1.2～2倍

- **静态标记**：diff方法优化vue2.x中的虚拟dom是进行全量的对比。而vue3.0新增了静态标记。在与上次虚拟节点进行对比的时候，只对比带有patch flag的节点，并且可以通过flag的信息得知当前节点要对比的具体内容。

- **静态提升**：vue2.x中无论元素是否参与更新，每次都会重新创建，然后再渲染。vue3.0中对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可。

- **事件侦听器缓存**：默认情况下，如onClick事件会被视为动态绑定，所以每次都会追踪它的变化，但是因为是同一个函数，所以不用追踪变化，直接缓存起来复用即可。


## 回顾
- Vue是什么？解决了什么问题？
- MVVM架构
- 三要素（响应式、模板编译、vdom/diff算法）
- 组件渲染/更新过程
- 异步渲染
    - $nextTick
    - 汇总data的修改，一次性更新视图
    - 减少DOM操作次数，提高性能

## 参考
- [vue的diff算法执行过程解析](https://www.infoq.cn/article/udlcpkh4iqb0cr5wgy7f)
- [diff算法图解动画](https://www.bilibili.com/video/BV1b5411V7i3?from=search&seid=4125072074822008044)
- [Vue3.0是如何变快的](https://developer.51cto.com/art/202010/628347.htm)

