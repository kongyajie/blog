## Vue3.0初体验

### 1. 启动时，使用了createApp 创建 vue实例

```html
<div id="counter">
  Counter: {{ counter }}
</div>
```

```js
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#counter')
```


前端Cloud IDE

- **CodeSandbox**
- [StackBlitz](https://stackblitz.com/)
- Codepen
- Jsfiddle
- Jsbin


