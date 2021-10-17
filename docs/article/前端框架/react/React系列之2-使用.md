# React系列之2-使用

## 前言

本章主要内容：
- 安装
- 基础使用
- 组件
- 高级特性

### create-react-app

### 基本用法

#### JSX语法：
变量表达式/class/style/子元素和组件
* 使用 `className` 代替 `class` ，因为 `class` 是JS中的保留字
* 属性和方法需要使用驼峰写法，比如 `onclick` -> `onClick`
* 使用 `{}` 表示内部为JS表达式

#### 条件判断
* arr.filter过滤

#### 渲染列表
* arr.map返回重组后的数组

#### 事件处理（需注意this指向）
* 使用 `handler = ()=>{}`，或 `handler.bind(this)`
* 键盘事件 `onKeyDown` `onKeyPress` `onKeyUp`

#### 表单（受控组件）
* 表单输入元素
* 组件控制输入后的更新
* 组件内部维护state
* 组件和props（类型检查）
    * 组件传值
        - props（自上而下，父级传入，无法修改）
        - state（对应vue中的data，组件内维护）
* props和state的区别
    * State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。
* 如何选择使用props还是state？
    * 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
    * 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
    * 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。
    * 
#### state和setState
state是不可变值，要保证不会修改state，要牢记一些数组和对象的API方法：

**数组**
- this.state.list.concat(100) // 追加
- [...this.state.list, 100] // 追加
- this.state.slice(0,3) // 截取
- this.state.list.filter(item => item > 100) // 筛选
- copy // 其他操作

**对象**
- Object.assign({}, this.state.obj1, {a:100})
- {...this.state.obj2, a:100}

#### 组件生命周期

### 高级特性
#### 1、函数组件
纯函数组件 vs class组件
- 纯函数，输入props，输出JSX
- 没有实例、没有声明周期、没有state
- 不能扩展其他方法

#### 2、受控和非受控组件
> 费受控组件的使用场景：必须使用DOM元素，setState实现不了的时，比如文件上传 `<input type="file">`，某些富文本编辑器，需要传入 DOM 元素

> 优先使用受控组件，符合React设计原则；必须使用DOM时，使用非受控组件。

ref的使用
- 创建ref： `this.inputRef = React.createRef();`
- 将ref绑定到元素上：`<div ref={this.inputRef}></div>`
- 获取ref：`let dom = this.inputRef.current`

#### 3、portals（传送门，把一个东西传给另一个东西）
> Portal 提供了一种将**子节点渲染到存在于父组件以外**的 DOM 节点的优秀的方案。

我们知道，组件默认会按照既定层次嵌套渲染。也就是说，父组件内的子组件，会被渲染在父组件对应的DOM内。但在某些场景下，可能需要将子组件渲染在父组件的DOM元素之外。比如：
- 父组件z-index值太小
- overview:hidden
- fixed需要放在body第一层级

Portal 使用类似hack的方式达到这一目的，但不会打乱编写时的组件结构。

使用方式如下：

```jsx
ReactDOM.createPortal(
    this.props.children,
    domNode
)`
```

#### 4、context
> Context 就是跨组件层级传递数据，一个生产者 Provider 和若干个消费者 Consumer，和vue中的provider、inject效果一样

- 公共信息（语言、主体）如何传递给每一个组件？
- 用props太繁琐
- 用redux小题大做

#### 5、异步组件
> 性能优化
- import ()
- React.lazy
- React.Suspense

#### 6、性能优化
> 性能优化对于 React 更加重要

**shouldComponentUpdate**
> SCU默认返回true，即React默认重新渲染所有子组件
> 必须配合“不可变值“一起使用

为什么 react SCU的声明周期默认返回true？
- SCU默认返回true：React默认父组件有更新，子组件则无条件也更新

还提供给用户返回false的能力？
 - 简单的项目基本不需要考虑优化问题，需要优化时优化就对了
 
 
 **pureComponent和memo**
> 由于深比较性能较差，所以 `pureComponent` 在 `SCU` 中实现了浅比较，而浅比较已经能满足大部分场景

> class组件使用pureComponent，默认就会在SCU中进行浅比较，以判断是否要更新
```js
class MyList extends React.pureComponent
```

> 函数组件使用memo
```js
function MyComnent(props) {
    /*使用props进行渲染*/
}

function areEqual(prevProps, nextProps) {
    /*比较prevProps和nextProps*/
}

React.memo(MyComponent, areEqual)
```

**immutable.js**

#### 7、组件公共部分抽离
- Mixin（React已弃用）
- 高阶组件 HOC High Order Component
- Render Props

**HOC**
- 高阶组件不是一个功能，而是一种工厂模式
- 模式简单，但会增加组件层级

**Render Props**
- 更高级，更优雅的实现方式
- 代码简洁，学习成本较高

**HOC VS RenderProps**
- 按需使用

## 总结
本章的代码库 [learn-framework-project](https://gitee.com/AaronKong/learn-framework-project) 

## 参考资料