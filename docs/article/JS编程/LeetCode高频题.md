## 对象扁平化

```js
function convert(obj) {
    let outputObj = {};
    fn(obj);
    return outputObj;

    function fn(obj, temp_key = '') {
      console.log(temp_key)
        for (let key in obj) {
            if (typeof obj[key] == 'object') {
                fn(obj[key], temp_key + key + '.');
            } else {
                outputObj[temp_key + key] = obj[key]
            }
        }
    }
    
}


var entryObj = {
	a: {
		b: {
			c: {
				dd: 'abcddd'
			}
		},
		d: {
			xx: 'adxx'
		},
		e: 'ae'
	}
}
console.log(JSON.stringify(entryObj))
console.log(JSON.stringify(convert(entryObj)))
```

## 无重复字符的最长子串

```js
function lengthOfLongestSubstring(str) {
    let arr = [];
    let max = 0;
    for(let i = 0; i < str.length; i++) {
        let index = arr.indexOf(str[i]);
        if(index !== -1) {
            arr.splice(0, index+1);
        }
        arr.push(str.charAt(i));
        max = Math.max(arr.length, max);
    }
    return max;
};

let input = "bbbbb";
console.log(lengthOfLongestSubstring(input));

```
[无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/zi-jie-leetcode3wu-zhong-fu-zi-fu-de-zui-chang-zi-/)