# React系列之5-常见问题

## 组件之间如何通讯？
- 父子组件 props
- 自定义事件
- Redux 和 Context

## JSX本质是什么？
- createElement函数
- 执行后返回vnode

## Context是什么，如何应用？
- 父组件向其所有子孙组件传递信息
- 如一些简单的公共信息：主题色、语言等
- 复杂的公共信息，请用redux


## ShouldComponentUpdate用途
- 性能优化
- 配置“不可变值”一起使用，否则可能出错

## redux单向数据流
画图

## setState场景题
同步/异步/合并修改

## 什么是纯函数
- 返回一个新值，没有副作用
- 如 arr1 = arr.slice();

## React组件生命周期
- 单组件生命周期
- 父子组件生命周期
- 注意scu

## React发起ajax应该在哪个生命周期
- 同vue
- componentDidMount

## 渲染列表，为何使用Key
- 同Vue。必须用key，且不能是index和random
- diff算法中通过tag和key来判断，是否是samenode
- 减少渲染次数，提高渲染性能

## 函数组件和class组件区别
- 纯函数


## 什么是受控组件？
- 表单的值受state控制
- 需要自行监听onChange，更新state
- 对比非受控组件

## 何时使用异步组件？
- 加载大组件
- 路由懒加载

## 多个组件有公共逻辑，该如何抽离
- 高阶组件roc
- Render Props
- mixin已被react废弃

## redux如何进行异步请求
- 使用异步action
- 如redux-thunk

## react-router如何配置懒加载
- lazy
- import
- Suspense

## PureComponent 有何区别
- 实现了浅比较的 SCU
- 优化性能
- 但要结合不可变值使用

## React事件和DOM事件的区别
- 所有事件挂载到 document 上
- event不是原生的，是SyntheticEvent合成事件对象
- dispatchEvent

## React性能优化
- 渲染列表时加key
- 自定义事件、DOM事件及时销毁
- 合理使用异步组件
- 减少函数bind this次数
- 合理使用scu、pureComponent和memo
- 合理使用 Immutable.js
- Webpack优化
- 前端通用的性能优化，如图片懒加载
- 使用 SSR

## React和Vue的区别
相同点：
- 都支持组件化
- 都支持数据驱动视图
- 都使用vdom操作DOM

不同点：
- React使用JSX拥抱JS，Vue使用模板拥抱HTML
- React是函数式编程，Vue声明式编程
- React更多需要自力更生（如scu），Vue把想要的都给你（computed、watch）