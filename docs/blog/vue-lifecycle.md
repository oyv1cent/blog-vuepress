# Vue生命周期

关于vue的生命周期，其实在[官方文档](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)上已经有详细的图解了，也有一篇非常好的[文章](https://segmentfault.com/a/1190000008010666)可以推荐。

> 理解Vue的生命周期，有利于我们在合适的时候做合适的事情。

这篇文章我会融合所看过的Vue源码以及所理解的生命周期来介绍每一个生命周期的钩子函数所做到的事情；读完这篇文章后，也就不会在面试官考你Vue的生命周期，你却只是背出这几个钩子函数而说不出其他加分的知识。

生命周期图：
![生命周期图](https://cn.vuejs.org/images/lifecycle.png)

运行下面代码感受一下：

```js
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/vue/2.1.3/vue.js"></script>
</head>
<body>

<div id="app">
     <p>{{ message }}</p>
</div>

<script type="text/javascript">

  var app = new Vue({
      el: '#app',
      data: {
          message : "xuxiao is boy"
      },
       beforeCreate: function () {
                console.group('beforeCreate 创建前状态===============》');
               console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
               console.log("%c%s", "color:red","data   : " + this.$data); //undefined
               console.log("%c%s", "color:red","message: " + this.message)  
        },
        created: function () {
            console.group('created 创建完毕状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el); //undefined
               console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
               console.log("%c%s", "color:red","message: " + this.message); //已被初始化
        },
        beforeMount: function () {
            console.group('beforeMount 挂载前状态===============》');
            console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
            console.log(this.$el);
               console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
               console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
        },
        mounted: function () {
            console.group('mounted 挂载结束状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
            console.log(this.$el);    
               console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
               console.log("%c%s", "color:red","message: " + this.message); //已被初始化
        },
        beforeUpdate: function () {
            console.group('beforeUpdate 更新前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);   
               console.log("%c%s", "color:red","data   : " + this.$data);
               console.log("%c%s", "color:red","message: " + this.message);
        },
        updated: function () {
            console.group('updated 更新完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);
               console.log("%c%s", "color:red","data   : " + this.$data);
               console.log("%c%s", "color:red","message: " + this.message);
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);    
               console.log("%c%s", "color:red","data   : " + this.$data);
               console.log("%c%s", "color:red","message: " + this.message);
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            console.log("%c%s", "color:red","el     : " + this.$el);
            console.log(this.$el);  
               console.log("%c%s", "color:red","data   : " + this.$data);
               console.log("%c%s", "color:red","message: " + this.message)
        }
    })
</script>
</body>
</html>
```
## beforeCreate

> 这是在new Vue()后，一个新的Vue实例开始了它的生命旅途。

在beforeCreate这个钩子函数里，data属性还是undefined；

此时实例上的数据并没有被观测，也就是说在这里去改变数据的值，是不会被响应的。（除非是异步的操作，比如vm.$nextTick）

在beforeCreate前，所有的option都存在于vm.$options，在beforeCreate之后，会将$options里的data、props、methods等挂在vm上。

应用：加个loading事件。
## created

当$options的值都挂在vm上后，$data就有值了；同时这些数据是被observe了的，就是通过Object.defineProperty执行了观察者模式，也就是说此时实现了数据的双向绑定。

在created这个钩子函数里，组件实例已经完成了创建，内部的属性也已经被绑定了，完成了事件回调的配置，但模板还未编译，Virtual Dom还未生成。

应用： 我一般会将数据的异步获取、转换、计算，结束loading事件，自执行的函数放在这个钩子函数里执行，此时可以调用Methods里面的函数。
## beforeMount

在beforeMount前，Vue将data内的数据，解析了模板内的vue语法后，通过createDocumentFragment的方式创造出了虚拟Dom。

此时的virtual Dom编译生成了，但还未挂载于真实Dom，同时相关的 render 函数首次被调用。

挂载其实就是把虚拟Dom替换到了真实的Dom上。

应用： 此时可以通过render函数看到VNode, 不要在这里变更$data内的数据。
## Mounted

在虚拟Dom挂载过后，Vue就像一个长大了可以干活了的工人，此时可以对真实Dom上的发生的事件作出响应。

应用：执行html渲染后所想执行的函数，比如插件chart.js需要初始化配置可以在这里执行，在这里可以对真实Dom进行操纵。
上面四个钩子函数的执行结果：
![](https://sfault-image.b0.upaiyun.com/130/248/1302481017-586cddaf83195_articlex)
## beforeUpdate

beforeUpdate就是在更新之前所调用的钩子函数，在此之后会重新渲染虚拟Dom。

应用: 如果需要更改被更新的数据，在这里更改，这样就不会重复渲染。

## Updated

此时的Dom已经被更新了，在这里可执行依赖于Dom的操作。

应用：避免在此更改所需被更改的数据。

## beforeDestory
在实例销毁前调用。

应用：移除组件实例前，可以调用来触发，比如提示用户是否移除该实例。

## Destoryed

该实例内的$data不再被观测（即不再响应数据变化），所有的事件监听器也会被移除，所有的子实例也会被执行同样的销毁行为。

应用：移除一些组件内的setInterval等,提示用户该实例已确认被移除。

![](https://sfault-image.b0.upaiyun.com/396/155/3961550519-586ce0cb13de2_articlex)

## 最后

由于是参考的[文章](https://segmentfault.com/a/1190000008010666)，所以源码和结果也是直接copy的。

在关于beforeUpdate和Updated比较的方式并不合适，导致console打印出一样的东西，看不出这两个之间的区别。

改进：
```js
beforeUpdate: function () {
    console.group('beforeUpdate 更新前状态===============》');
    console.log("%c%s", "color:red","el     : " + this.$el.innerHTML);// el     : <p>xuxiao is1 boy</p>
    console.log(this.$el);
       console.log("%c%s", "color:red","data   : " + this.$data);
       console.log("%c%s", "color:red","message: " + this.message);
},
updated: function () {
    console.group('updated 更新完成状态===============》');
    console.log("%c%s", "color:red","el     : " + this.$el.innerHTML);// el     : <p>new message</p>
    console.log(this.$el);
       console.log("%c%s", "color:red","data   : " + this.$data);
       console.log("%c%s", "color:red","message: " + this.message);
},
```
