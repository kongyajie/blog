# 函数-手写call apply bind

## call

于call唯一不同的是，call()方法接受的是一个参数列表

```js
Function.prototype.call = function(context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error');
  }
  const fn = Symbol('fn'); // 1、创建一个唯一key
  context[fn] = this; // 2、在context上挂载一个属性等于this，因为这里的this就是调用call的函数，因此实际上是给context添加了一个函数方法
  const res = context[fn](...args); // 3、调用2中在context上添加的的函数，并传入参数，得到结果
  delete context[fn]; // 4、在context上删除这个函数
  return res; // 5、返回结果
}

```

## apply

第一个参数是绑定的this，默认为window，第二个参数是数组或类数组

```js
Function.prototype.apply = function(context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error');
  }
  const fn = Symbol('fn');
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];
  return res;
}

```

## bind

```js
Function.prototype.bind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error("Type Error");
  }
  // 保存this的值
  var self = this;

  return function F() {
    // 考虑new的情况
    if(this instanceof F) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, [...args, ...arguments])
  }
}

```