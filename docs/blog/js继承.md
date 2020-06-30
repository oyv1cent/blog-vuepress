# js继承

## 1. 类式继承

```js
function Parent(name) {
   this.name = name;
}

Parent.prototype.sayName = function() {
  console.log('parent name:', this.name);
}

Parent.prototype.doSomthing = function() {
    console.log('parent do something!');
}

function Child(name, parentName) {
    // Point: 这是类式继承的关键，Parent函数在Child函数内执行了一遍，并且将所有与 this 绑定的变量都切换到了 Child 上。
    Parent.call(this, parentName);
    this.name = name;
}

Child.prototype.sayName = function() {
    console.log('child name:', this.name);
}

var child = new Child('son');
child.sayName();      // child name: son
child.doSomthing();   // TypeError: child.doSomthing is not a function
```

缺点：
1. 没有原型，每次创建一个 Child 实例对象时候都需要执行一遍 Parent 函数，无法复用Parent原型链上的方法。

## 2. 原型链继承

```js
function Parent(name) {
    this.name = name;
}
Parent.prototype.sayName = function() {
    console.log('parent name:', this.name);
}
function Child(name) {
    this.name = name;
}

Child.prototype = new Parent('father');
// console.log(Child.prototype.constructor) ==> f Parent()=>{};
// 因此需要使得构造函数指向自己。
Child.prototype.constructor = Child;

Child.prototype.sayName = function() {
    console.log('child name:', this.name);
}

var child = new Child('son');
child.sayName();    // child name: son
```

缺点:
1. 子类型无法给超类型传递参数，在面向对象的继承中，我们总希望通过 var child = new Child('son', 'father'); 让子类去调用父类的构造器来完成继承。而不是通过像这样 new Parent('father') 去调用父类。
2. Child.prototype.sayName 必须写在 Child.prototype = new Parent('father'); 之后，不然就会被覆盖掉。

## 3.组合式继承

将原型链继承与类式继承进行结合，以此解决相互的缺点

```js
function Parent(name) {
    this.name = name;
}

Parent.prototype.sayName = function() {
    console.log('parent name:', this.name);
}
Parent.prototype.doSomething = function() {
    console.log('parent do something!');
}
function Child(name, parentName) {
    Parent.call(this, parentName); // 每次创建子类型的时候都会调用一次
    this.name = name;
}

Child.prototype = new Parent(); // 固定调用一次，这一次的调用有些浪费，因为只需要原型链上的方法
Child.prototype.constructor = Child;
Child.prototype.sayName = function() {
    console.log('child name:', this.name);
}

var child = new Child('son');
child.sayName();       // child name: son
child.doSomething();   // parent do something!
```

缺点：
1. 但组合继承使用过程中会被调用两次：一次是创建子类型的时候，另一次是在子类型构造函数的内部。

## 4.寄生组合式继承

```js
function Parent(name) {
    this.name = name;
}
Parent.prototype.sayName = function() {
    console.log('parent name:', this.name);
}

function Child(name, parentName) {
    Parent.call(this, parentName);  
    this.name = name;    
}

function create(proto) {
    function F(){}
    F.prototype = proto;
    return new F();
}
// 较之于组合式继承的改进在于，只要原型链上的方法，避免了浪费。
Child.prototype = create(Parent.prototype);
// Child.prototype = Object.create(Parent.prototype);
// 可以利用原生API做到create函数的事。
Child.prototype.sayName = function() {
    console.log('child name:', this.name);
}
Child.prototype.constructor = Child;

var parent = new Parent('father');
parent.sayName();    // parent name: father


var child = new Child('son', 'father');
child.sayName();     // child name: son
```

## ES6继承

```js
class Parent {
    constructor(name) {
	this.name = name;
    }
    doSomething() {
	console.log('parent do something!');
    }
    sayName() {
	console.log('parent name:', this.name);
    }
}

class Child extends Parent {
    constructor(name, parentName) {
	super(parentName);
	this.name = name;
    }
    sayName() {
 	console.log('child name:', this.name);
    }
}

const child = new Child('son', 'father');
child.sayName();            // child name: son
child.doSomething();        // parent do something!

const parent = new Parent('father');
parent.sayName();           // parent name: father
```

## 最后

> 作者：有酒 链接：https://zhuanlan.zhihu.com/p/25578222
