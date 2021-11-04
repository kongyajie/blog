# HTTP协议

## 一、ajax
###  XMLHttpRequest
```js
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api', true)
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText)
    }
  }
}
xhr.send(null)
```
### 状态码
xhr.readyState
- 0：未初始化，还未调用send方法
- 1：载入，已调用send方法，正发送请求
- 2：载入完成，send方法执行完毕，已接收到全部响应内容
- 3：交互，正在解析响应内容
- 4：完成，响应内容解析完成，可以再客户端调用

xhr.status
- 2xx：请求成功，200
- 3xx：重定向，301永久，302临时，304访问资源未发生变化（可使用缓存）
- 4xx：客户端请求错误，404访问地址找不到，403无权限访问
- 5xx：服务端错误

## 二、跨域：同源策略，跨域解决方案

### 同源策略
- ajax请求时，**浏览器**要求当前页面和server必须同源（安全）
- 同源：协议、域名、端口，三者必须一致
- 加载 img css js 可无视同源策略

### 跨域方式
1：JSONP
- `<script>` 可绕过跨域限制
- 服务器可以任意动态拼接数据返回
- 所以，`<script>` 就可以获得跨域的数据，只要服务端愿意返回

2：CORS（跨院资源共享）-服务器设置 http header
- Access-Control-Allow-Origin: http://api.bob.com
- Access-Control-Allow-Methods: GET, POST, PUT
- Access-Control-Allow-Headers: X-Custom-Header

### 实际项目中ajax的常用插件
- jQuery 
- fetch
- axios

## 三、Cookie localStorage 和 sessionStorage
### cookie
  - 用于浏览器和server进行通讯
  - document.cookie（不同key追加，同key会覆盖）
  - 缺点：
    1.存储太小，最大4kb；
    2.http请求时需要发送到服务端，增加请求数据量
    3.只能用 document.cookie 来修改，太过简陋

### localStorage 和 sessionStorage
  - HTML5专门为存储而设计，最大可存5M
  - API简单易用 setTime getItem
  - 不会随着 http 请求发送出去
  - localStorage 数据会永久存储，除非代码或手动删除
  - sessionStorage 数据只存在于当前会话，浏览器关闭则清空

### 三者的区别：
  - 1.容量
  - 2.API
  - 3.是否跟随http请求发送出去

## 四、HTTP
### http 常见的状态码有哪些
  - 1xx 服务器收到请求
  - 2xx 请求成功，如200-成功
  - 3xx 重定向，如301-永久重定向，302-临时重定向 304-资源已被请求过且未被修改
  - 4xx 客户端错误，如401-Unauthorized当前请求需要用户验证 403 Forbidden 服务器已经收到请求，但拒绝执行，没有权限 404-Not Found 服务器无法根据用户的请求找到资源
  - 5xx 服务端错误，如500-服务器错误 504-网关超时

### http 常见的header有哪些
  - 常见的 Request Headers
    - Accept 浏览器可接收的数据格式
    - Accept-Encoding 浏览器可接收的压缩算法，如gzip
    - Accept-Lan 浏览器可接收的语言，如zh-CH
    - Connection: keep-alive 一次TCP链接重复使用
    - cookie
    - Host
    - User-Agent 浏览器信息（简称UA）
  - 常见的 Response Headers
    - Content-Type 返回数据的格式，如 application/json
    - Content-length 返回数据的大小，多少字节
    - Content-Encoding 返回数据的压缩算法，如gzip
    - Set-Cookie
    - Cache-Control Expires
    - Last-Modified If-Modified-Since
    - Etag If-None-Match
### 什么是 Restful API

- ①　一种新的API设计方法
- ②　与传统API设计的区别 (背)：传统API设计:把每个url当做一个功能；Restful API 设计: 把每个url当做一个唯一的资源
- ③　如何设计成一个资源?：尽量不用url参数;  用/api/list/2  代替  /api/list?pageIndex=2对应的后端: get(‘/api/list/:pageIndex’)用method表示操作类型 ;post只新建,get只获取,其它methods类推

- get获取数据
- post 新建数据
- patch/put 更新数据
- delete 删除数据

### 描述一下 http 的缓存机制（重要）
[浏览器的强缓存与弱缓存
](https://segmentfault.com/a/1190000015245578)

#### 目的
缓存可以减少网络请求的次数和时间
#### 缓存分类
- 强缓存（本地缓存）
- 弱缓存（协商缓存）

#### 请求一个静态资源时的HTTP流程
1. **强缓存阶段**：先在本地查找该资源，如果发现该资源，并且其他限制也没有问题(比如:缓存有效时间)，就命中强缓存，返回200，直接使用强缓存，并且不会发送请求到服务器
2. **弱缓存阶段**：在本地缓存中找到该资源，发送一个http请求到服务器，服务器判断这个资源没有被改动过，则返回304，让浏览器使用该资源。
3. **缓存失败阶段(重新请求)**：当服务器发现该资源被修改过，或者在本地没有找到该缓存资源，服务器则返回该资源的数据。

#### 强缓存
强缓存是利用Expires或者Cache-Control，让原始服务器为文件设置一个过期时间，在多长时间内可以将这些内容视为最新的。

1. 初次请求
2. 返回资源，和 Cache-Control
3. 再次请求
4. 返回本地缓存资源
5. Cache-Control（Expire被替代了）
  - max-age
  - no-cache
  - no-store
  - private
  - public


#### 协商缓存
详细流程：
- 客户端第一次向服务器发起请求,服务器将附加Last-Modified/ETag到所提供的资源上去
- 当再一次请求资源,如果没有命中强缓存,在执行在验证时,将上次请求时服务器返回的Last-Modified/ETag一起传递给服务器。
- 服务器检查该Last-Modified或ETag，并判断出该资源页面自上次客户端请求之后还未被修改，返回响应304和一个空的响应体。

简单流程：
1. 初次请求
2. 返回资源，和资源标识（Last-modified / Etag）
3. 再次请求，带着资源标识（if-Modified-Since / If-None-Match）
4. 返回304，或返回资源和新的资源标识
Last-Modified 资源的最后修改时间
Etag 资源的唯一表示（一个字符串）
会优先使用 Etag，Last-Modified 只能精确到秒级

Etag 主要为了解决 Last-Modified 无法解决的一些问题：
- 一些文件也许内容并不改变(仅仅改变的修改时间)，这个时候我们不希望文件重新加载。（Etag值会触发缓存，Last-Modified不会触发）
- If-Modified-Since能检查到的粒度是秒级的，当修改非常频繁时，- Last-Modified会触发缓存，而Etag的值不会触发，重新加载。
- 某些服务器不能精确的得到文件的最后修改时间。



#### 强缓存和协商缓存的异同
- **获取资源形式相同**：都是从缓存中获取
- **状态码不同**：强缓存返回200（from cache）、协商缓存返回304状态码
- **是否请求不同**：强缓存不发送请求，直接从缓存中取；协商缓存需发送请求到服务端，验证这个文件是否可使用（未改动过）
#### 刷新操作方式,对缓存的影响，不同的刷新方式,不同的缓存策略
1. 正常操作 : 地址栏输入url ,跳转链接,前进后退等; 两种缓存都有效 
2. 手动刷新 : F5 ,点击刷新按钮,右击菜单刷新; 仅协商缓存有效
3. 强制刷新 : ctrl +f5  cmd + r;  都无效

#### 缓存设置

### 简单请求 vs 非简单请求
-（1) 请求方法是以下三种方法之一：
  - HEAD
  - GET
  - POST

-（2）HTTP的头信息不超出以下几种字段：
  - Accept
  - Accept-Language
  - Content-Language
  - Last-Event-ID
  - Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
[cors](https://www.ruanyifeng.com/blog/2016/04/cors.html)

### HTTP2 
- 多路复用：建立连接后，可同时发送多个请求
- 首部压缩：http请求的头部使用字符串代替键值对
- 支持服务器推送：引入了 server push


### 参考
- [HTTP协议入门](https://www.ruanyifeng.com/blog/2016/08/http.html)