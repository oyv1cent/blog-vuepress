# Css

## 1. 清除浮动的方法
> 为什么要清除浮动：清除浮动是为了解决子元素浮动而导致父元素高度塌陷的问题。
    
1. 添加子元素/伪元素，加上clear:both属性

2. 父元素触发BFC

参考：[清除浮动](https://juejin.im/post/59e7190bf265da4307025d91)

## 2. 什么是BFC，如何触发BFC，BFC有哪些特性

1. BFC全称 `Block Formatting Context` 即块级格式上下文，它是页面中的一块渲染区域，并且有一套渲染规则。
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

2. 触发条件：
   1. body 根元素
   2. 浮动元素：float 除 none 以外的值
   3. 绝对定位元素：position (absolute、fixed)
   4. display 为 inline-block、table-cells、flex
   5. overflow 除了 visible 以外的值 (hidden、auto、scroll)

3. 特性：
   1. 同一个 BFC ，margin会发生折叠现象
   2. BFC可以清除浮动
   3. BFC 可以阻止元素被浮动元素覆盖（因为BFC是独立渲染区域，会将浮动元素赶出区域）
   
参考：[10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)

## Flex布局

[Flex布局文章](https://zhuanlan.zhihu.com/p/25303493)
   
## Position

1. Static(默认值)

2. relative，在当前位置上进行调整，不影响页面布局

3. absolute，会跳出文档流，相对于最近的非 static 定位祖先元素偏移，来确定元素位置，绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。

4. fixed， 会跳出文档流，相对于屏幕视口（viewport）偏移，元素的位置在屏幕滚动时不会改变，当元素祖先的 transform, perspective 或 filter 属性非 none 时，容器由视口改为该祖先。

5. sticky，一般用于吸顶效果的实现，但兼容性较差，建议自己实现。
