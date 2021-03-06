# CSS

## 1.如何理解语义化？
- 让人更容易理解（提高代码可维护性）
- 让机器更容易理解（有利于搜索引擎优化SEO、页面爬取、读屏软件）

## 2.块级元素 & 内联元素？
- display:block/table；div h1 h2 ul li ol p 等
- display:inline/inline-block；span a input button 等

## 3.盒模型宽度计算：
- 在 标准盒子模型中，width 和 height 指的是内容区域的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。
- IE盒子模型中，width 和 height 指的是内容区域+border+padding的宽度和高度。

- 标准盒模型content-box：offsetWidth = 内容宽度+内边距+边框（无外边距margin）
- 怪异盒模型border-box： offsetWidth = 内容宽度

## 4.margin重叠问题
- 上下重叠
## margin负值问题
- margin-top 和 margin-left 负值，元素向上、向左移动
- margin-left 负值，右侧元素左移，自身不受影响
- margin-bottom 负值，下方元素上移，自身不受影响


## 5.BFC 理解与应用
- 什么是BFC？ Block format context，块级格式化上下文。好处是它是一块独立渲染区域，内部元素的渲染不会影响边界以外的元素。
- 形成BFC的常见条件？
   - float 不是 none
   - position 是 absolute 或 fixed
   - overflow 不是 visible
   - display 是 flex inline-block 等
- 常见的BFC应用
   - 清除浮动
```css
.clearfix:after {
   content: '';
   display: block;
   clear: both;
}
```

## 6.float布局-圣杯布局和双飞翼布局的目的
- 三栏布局，中间一栏最先加载和渲染（内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于PC网页

## 7.Flex 布局
- flex 实现一个三点的色子
- 常用语法：flex-direction/justice-content/align-items/flex-wrap/align-self
- flex: 1 => flex: 0 1 auto

## 8.CSS定位
### 1.absolute 和 relative 分别依据什么定位？
- relative 依据自身定位
- absolute 依据最近一层的定位元素定位（absolute/relative/fixed直到body）

### 2.居中对齐有哪些实现方式？

- 水平居中 
inline元素：text-align:center
block元素：margin:auto
absolute元素：left:50% + margin-left 负值（left相对于父级用百分比，margin-left相对于当前元素不能用百分比）

- 垂直居中
inline元素：line-height值等于height值
absolute 元素：top:50% + margin-top 负值 （需要知道宽高）
absolute 元素：left:50%, top:50%, translate:transform(-50%, -50%)
absolute 元素：top,left,bottom,right:0 + margin:auto

### 3.line-height 如何继承
1. 具体数值，则继承该值
2. 比例：如2/1.5，则继承该比例
3. 百分比，如200%，则继承计算出来的值

## 9、CSS-响应式
### rem是什么？
- px 绝对长度单位，最常用
- em 相对长度单位，相对于父元素，不常用
- rem 相对长度单位，相对于根元素，常用语响应式布局

### 响应式布局的常见方案？
- rem，基于根元素的相对单位
- @media-query，根据不同屏幕的宽度设置根元素的font-size

## 10、CSS响应式

### rem 的弊端：
- “阶梯”性

### 网页视口尺寸
- window.screen.height // 屏幕高度
- window.innerHeight // 网页视口高度（砍掉浏览器头尾，pc上模拟时无头尾）
- document.body.clientHeight // body高度（内容高度）

### vw/vh
- vh 网页视口高度window.innerHeight的 1/100 
- vw 网页视口宽度window.innerWidth的 1/100
- vmax 取两者最大值；vmin 取两者最小值

## 11、CSS面试总结
- 1. 如何理解语义化？（人、机器的角度）
- 2. 块状元素&内联元素？
- 3. 盒模型宽度计算？（content-box、border-box）
- 4. margin纵向重叠问题？
- 5. margin负值问题？（top/left负值会移动，right/bottom不会移动）
- 6. BFC的理解和应用
- 7. float布局 
- 8. absolute和relative定位
- 9. 居中对齐
- 10. line-height如何继承
- 11. px/em/rem
- 12. 响应式布局方案
- 13. CSS3动画


## 移动端适配和性能优化
[参考](https://blog.csdn.net/frontend_frank/article/details/106110664)

## requestAnimationFrame
- setTimeout setInterval 可能不精确（单线程+宏任务最后执行）