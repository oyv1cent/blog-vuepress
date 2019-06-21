#  js的模块化

## 无模块化

最初的js被设计用于验证表单，后面用于页面的一些简单交互。所以在前端复杂度不高的时期，往往是一个HTML里用script标签引入一个js文件就够了。
随着前端被赋予更多的能力，js代码量也越来越多，文件也越来越大了，不利于可读性和维护，于是就将通过写多个script标签来按顺序引入js文件。

相比于一个几万行代码的js文件，使用多个js文件实现了最基础的模块化，但也有污染全局作用域以及不按顺序引入就会出现依赖问题的缺陷。

## Commonjs

Commonjs是Js模块化的规范，最初是应用于node服务器端，webpack也是对commonJS原生支持。

Commonjs通过module.exports对外曝露接口，使用require来引入。

这解决了多个js文件的缺陷，维护了全局作用域也不再有顺序依赖的问题。但这个规范是应用于node端的，因为他是同步加载模块，node端可以同步读取硬盘上的文件，而浏览器端是依靠网络异步加载模块的，所以这个不适用于浏览器端。

## AMD规范与CMD规范

AMD规范以及CMD规范的出现是为了解决commonjs的同步加载模块问题，使用异步加载模块从而达到浏览器端模块化开发的目的。

AMD是Requirejs，CMD是Seajs，对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。

> CMD 推崇依赖就近，AMD 推崇依赖前置

```js
   // CMD
   define(function(require, exports, module) {
   var a = require('./a')   a.doSomething()
   // 此处略去 100 行   var b = require('./b')
   // 依赖可以就近书写   b.doSomething()
   // ...
   })
   // AMD 默认推荐的是
   define(['./a', './b'], function(a, b) {
   // 依赖必须一开始就写好
   a.doSomething()
   // 此处略去 100 行
   b.doSomething()
   ...
   })
```

## ES6模块化
