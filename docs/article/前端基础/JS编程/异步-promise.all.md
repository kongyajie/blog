# 异步-promise.all

`Promise.all` 是支持链式调用的，本质上就是返回了一个 `Promise` 实例，通过 `resolve` 和` reject` 来改变实例状态。

```js
Promise.myAll = function(promiseArr) {
  return new Promise((resolve, reject) => {
    const ans = [];
    let index = 0;
    for (let i = 0; i < promiseArr.length; i++) {
      promiseArr[i]
      .then(res => {
        ans[i] = res;
        index++;
        if (index === promiseArr.length) {
          resolve(ans);
        }
      })
      .catch(err => reject(err));
    }
  })
}

```