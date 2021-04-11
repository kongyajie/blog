# HTTP协议

## ajax
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

## 跨域：同源策略，跨域解决方案

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

## Cookie localStorage 和 sessionStorage
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

## HTTP
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
  - 目的：缓存可以减少网络请求的次数和时间
  - 强制缓存
    1、初次请求
    2、返回资源，和 Cache-Control
    3、再次请求
    4、返回本地缓存资源
    5、Cache-Control（Expire被替代了）
      - max-age
      - no-cache
      - no-store
      - private
      - public
  - 协商缓存
    1、初次请求
    2、返回资源，和资源标识（Last-modified / Etag）
    3、再次请求，带着资源标识（if-Modified-Since / If-None-Match）
    4、返回304，或返回资源和新的资源标识
    Last-Modified 资源的最后修改时间
    Etag 资源的唯一表示（一个字符串）
    会优先使用 Etag，Last-Modified 只能精确到秒级

  - 刷新操作方式,对缓存的影响，不同的刷新方式,不同的缓存策略:
    1.正常操作 : 地址栏输入url ,跳转链接,前进后退等; 两种缓存都有效 
    2.手动刷新 : F5 ,点击刷新按钮,右击菜单刷新; 仅协商缓存有效
    3.强制刷新 : ctrl +f5  cmd + r;  都无效

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
- 多路复用：建立连接后，可同时发送多个七扭去
- 首部压缩：http请求的头部使用字符串代替键值对
- 支持服务器推送：引入了 server push
