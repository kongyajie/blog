# JS异常处理

## JS

### try catch
`try catch`（遇到异步就不好用了）

### window.onerror
- `window.onerror`（同步任务、异步任务都可捕获，但网络异常的错误无法捕获）

### 监听error事件
- `window.addEventListener('error',() => {})` （无法捕获 promise 错误，单独加catch可以，但比较麻烦）

### unhandledrejection 事件监听

```js
window.addEventListener("unhandledrejection", e => {
 console.log('unhandledrejection',e)
});

```
## vue
- vue.config.errorHandler

## react
- Error Boundary 组件包裹

## 参考
- [从 0 到 1 搭建前端异常监控系统](https://segmentfault.com/a/1190000022607559)