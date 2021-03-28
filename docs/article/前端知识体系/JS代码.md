# JS代码

## 判断是否为数组
- `Array.isArray(arr)`
- `Object.prototype.toString.call(arr) === '[object Array]'`
- `arr instanceof Array`
- `arr.constructor === 'Array'`

## 判断 isPlainObject（纯粹的对象：通过 "{}" 或者 "new Object" 创建的）
```js
let dataObject = {};
console.log(Object.keys(dataObject).length == 0); // true
```

## 对象冻结
- Object.freeze() 方法用于冻结对象，禁止对于该对象的属性进行修改
- Object.isFrozen() 判断对象是否冻结
```js
function freeze(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, value) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      freeze(obj[key]);
    }
  });
  return obj;
}
```
## 深拷贝
1. 考虑数组
2. 考虑嵌套
3. 考虑无限循环（Map vs WeakMap）
4. 性能优化（for while）
5. 其他类型（function、RegExp、Date等）
```js
/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 * @returns 拷贝后的结果
 */
function deepClone(obj, map = new WeakMap()) {
    // obj 是 null ，或者不是对象和数组，直接返回
    if (typeof obj !== 'object' || obj == null) return obj;

    // 防止循环引用
    if (map.has(obj)) {
        return map.get(obj);
    }

    // 拷贝
    let result = {};
    if (obj instanceof Array) { // 考虑数组
        result = [];
    }

    map.set(obj, result);

    for (let key in obj) {
        // 保证 key 不是原型的属性
        if (obj.hasOwnProperty(key)) {
            // 递归调用
            result[key] = deepClone(obj[key], map);
        }
    }

    // 返回结果
    return result;
}

const target = {
    field: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2,4,8]
};
target.target = target;

let result = deepClone(target);
console.log(result);
```

## 实现一个call,apply,bind

## 实现一个new

## 实现一个symbol

## 节流、防抖

## promise使用及实现、promise并行执行和顺序执行；
## 实现Promise/PromiseALL

## 数组乱序

- 1.Fisher–Yates算法：就是将数组从后向前遍历，然后将当前元素与随机位置的元素进行交换
```js

- 
function shuffle(arr) {
    let m = arr.length;
    while (m > 1){
        let index = Math.floor(Math.random() * m--);
        [arr[m] , arr[index]] = [arr[index] , arr[m]]
    }
    return arr;
}

```

- 2.直接利用sort进行排序，有漏洞，大部分元素位置没有移动
```js
function shuffle(arr) {
  return arr.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
}
```

[参考](https://juejin.cn/post/6844903863812620296)
