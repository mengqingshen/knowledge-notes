---
title: 17 Class(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js
toc: true
date: 2016-10-15 23:17
---

## 17.1 Class基本语法

### 17.1.1 概述
**说明：** `ES6` 提供了更接近传统语言的写法，引入了 `Class` （类）这个概念，作为对象的模板。通过 `class` 关键字，可以定义类。

+ `ES6` 的类，完全可以看作构造函数的另一种写法（类的数据类型就是函数，类本身就指向构造函数）
+ 使用时，对类使用 `new` 命令，跟构造函数的用法完全一致
+ 构造函数的 `prototype` 属性，在 `ES6` 的“类”上面继续存在，类的所有方法都定义在类的 `prototype` 属性上面
+ `prototype` 对象的 `constructor` 属性，直接指向“类”的本身，这与 `ES5` 的行为是一致的
+ 类的属性名，可以采用表达式（和对象字面量相同）
+ 方法之间不需要逗号分隔，加了会报错（和对象字面量不同）

**和构造函数比较：** `ES6` 的 `class` 可以看作只是一个语法糖，它的绝大部分功能，`ES5` 的构造函数都可以做到，新的 `class` 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。不同点是

+ 类的内部所有定义的方法，都是不可枚举的
+ 类不能作为普通方法调用
+ `Class` 声明不会被提升

*Demo: Point 类*
*ES5 写法*

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
}
```

*ES6写法*

```javascript
let methodName = "getArea";
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
  
  // 类的属性名，可以采用表达式
  [methodName]() {
    // ...
  }
}

/* class 的本质就是 ES5 的构造函数 */
typeof Point // "function"

/* prototype 对象的 constructor 属性，直接指向“类”的本身，这与 ES5 的行为是一致的 */
Point === Point.prototype.constructor // true

/* 类的内部所有定义的方法，都是不可枚举的 */
Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString","getArea"]

/* Object.assign方法可以很方便地一次向类添加多个方法 */
Object.assign(Point.prototype, {
  color: '#000',
  toValue(){}
});
```

### 17.1.2 constructor 方法
**说明：**通过 `new` 命令生成对象实例时，自动调用该方法

+ 类必须有 `constructor` 方法，如果没有显式定义，一个空的 `constructor` 方法（`constructor() {}`）会被默认添加
+ `constructor` 方法默认返回实例对象（即 `this`），完全可以指定返回另外一个对象

**注意：**不使用 `new` 是没法调用的，会报错

```javascript
class Foo {
  constructor() {
	// 导致返回的实例对象并不是 this
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

### 17.1.3 创建实例
**说明：**与 `ES5` 完全一样，也是使用 `new` 命令
**注意：**如果忘记加上 `new`，像函数那样调用 `Class` ，将会报错
**技巧：**可以通过实例的 `__proto__` 属性为 `Class` 添加方法（不推荐使用，因为这会改变 `class` 的原始定义，影响到所有实例）

```javascript
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

/* 对象上的实例属性 */
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true

/* prorotype 上的实例属性*/
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

/* 类的所有实例共享一个原型对象，和 ES5 一样 */
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__
//true

/* 可以通过实例的 __proto__ 属性为 Class 添加方法 */
p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```

### 17.1.4 不存在变量提升
**说明：** `ES6` 不会把类的声明提升到代码头部
**目的：**当使用继承特性时，保证子类在父类之后定义

```javascript
new Foo(); // ReferenceError
class Foo {}
```

### 17.1.5 Class 表达式
**说明：**与函数一样，类也可以使用表达式的形式定义
**注意：**`class` 关键字后面的类名只在类定义部分使用，可以不给出，类似函数表达式
**技巧：**采用 `Class` 表达式，可以写出立即执行（实例化）的 `Class`

*Demo1: 不省略 class 后面的类名*

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};

/* 类的名字是 MyClass 而不是 Me，Me 只在 Class 的内部代码可用，指代当前类 */
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```

*Demo2: 省略 class 后面的类名*

```javascript
const MyClass = class { /* ... */ };
```

*Demo3: 立即实例化的 class*

```javascript
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

### 17.1.6 私有方法
**说明：**私有方法是常见需求，但 `ES6` 不提供，只能通过变通方法模拟实现，比如以下3中方式

#### 方式一： 为私有方法名添加`_`前缀
**说明：**告知这是一个只限于内部使用的私有方法
**注意：**只要想调用，在类的外部，还是可以调用到这个方法

```javascript
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
```

#### 方式二：私有方法定义在类之外定义
**说明：**模块（比如`ES6`模块）内部的方法只要不 `export` 出去，只在类中需要使用该方法的地方调用它，从而达到了私有方法的效果。

```javascript
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}

export default Widget;
```

#### 方式三：命名为一个 `Symbol` 值
**说明：**利用 `Symbol` 值的唯一性，将私有方法的名字命名为一个 `Symbol` 值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果

```javascript
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

### 17.1.7 this的指向
**说明：**类的方法内部如果含有 `this`，它默认指向类的实例。
**注意：** `this` 的指向是可以改变的，因此如果有方法使用了 `this` ，则要小心调用以确保 `this` 的指向符合预期。

*Demo：this 指向被不符合预期导致错误*

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

#### 确保 this 的指向
**方法1: 在构造方法中绑定 this**

```javascript
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```

**方法2: 使用箭头函数（推荐）**

```javascript
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```

**方法3: 使用 Proxy，获取方法的时候，自动绑定 this**

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

/**
* 为对象建立 Proxy， 当调用实例方法时强行将 this 指向实例自身
*/
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

### 17.1.8 严格模式
**说明：**类和模块(`Es6 模块`)的内部，默认就是严格模式，所以不需要使用 `use strict` 指定运行模式。

### 17.1.9 name 属性
**说明：**本质上，`ES6` 的类只是 `ES5` 的构造函数的一层包装，所以函数的许多特性都被`Class` 继承，包括 `name` 属性
**值：**紧跟在 `class` 关键字后面的类名

```javascript
class Point {}
Point.name // "Point"
```

## 17.2 Class的继承
### 17.2.1 基本用法
#### extends
**说明：**Class 之间可以通过 `extends` 关键字实现继承
**价值：**这比 `ES5` 的通过修改原型链实现继承，要清晰和方便很多

| 对比        | 说明                                       |
| --------- | ---------------------------------------- |
| `ES5` 的继承 | 先创造子类的实例对象 `this`，然后再将父类的方法添加到 `this` 上面（`Parent.apply(this)`） |
| `ES6` 的继承 | 先创造父类的实例对象 `this`（所以必须先调用super方法），然后再用子类的构造函数修改 `this` |

#### constructor
**说明：**如果子类没有定义 `constructor` 方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有 `constructor` 方法。

```javascript
constructor(...args) {
  super(...args);
}
```

#### super
**说明：**在子类的构造函数中，只有调用 `super` 之后，才可以使用 `this` 关键字，否则会报错。因为子类实例的构建，是基于对父类实例加工，只有 `super` 方法才能返回父类实例。
**注意：** `super` 是一个特殊的关键字，代表父类的实例

+ 当作函数调用时，会执行父类的构造器完成父类实例的创建
+ 当作为对象使用时，作为对父类实例的引用

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
	super(x, y);// 调用父类的constructor(x, y)
    this.color = color;
    this.color = color; // 正确
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}

let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point // true
```

### 17.2.2 类的prototype属性和__proto__属性
**说明：** `Class` 作为构造函数的语法糖，继承是依靠原型链实现的来实现的，`ES6` 的父子类之间存在两条原型链

+ 作为一个对象，子类的原型（__proto__属性）是父类
+ 作为一个构造函数，子类的原型（prototype属性）是父类的实例

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-10-19%20%E4%B8%8B%E5%8D%8811.08.01.png)


```javascript
// 父类
class A {
}

// 子类
class B extends A {
}

// B的实例继承A的实例
B.__proto__ === A // true

// B继承A的静态属性
B.prototype.__proto__ === A.prototype // true
```

### 17.2.3 Extends 的继承目标
**说明：**有 3 种特殊情况

#### （1）子类继承 `Object` 类
**说明：**和普通情况类似，只不过父类换成了 `Object`，平淡无奇
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-10-21%20%E4%B8%8A%E5%8D%8812.16.39.png)

*特性展示*

```javascript
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```


#### （2）不存在任何继承
**说明：**这种类的实例基本可以看作 `Object` 的实例（或者类比对象字面量）

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-10-20%20%E4%B8%8B%E5%8D%8811.41.50.png)

*特性展示*

```javascript
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

#### （3）子类继承 null
**说明：**这种类的实例不继承任何属性和方法

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-10-21%20%E4%B8%8A%E5%8D%8812.22.19.png)

*特性展示*

```javascript
class A extends null {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
```

*等价形式*

```javascript
class C extends null {
  constructor() { return Object.create(null); }
}
```

### 17.2.4 Object.getPrototypeOf()
**说明：** 等价于  `目标.__proto__` 
**技巧：**判断，一个类是否继承了另一个类

*Demo: 判断 ColoePoint 是不是 Point 的子类*

```javascript
Object.getPrototypeOf(ColorPoint) === Point
// true
```

### 17.2.5 super 关键字
**说明：** 有两种用法
1. 作为函数调用时（即 `super(...args)` ），`super` 代表父类的构造函数。
2. 作为对象调用时（即 `super.prop` 或 `super.method()` ），`super` 代表父类。注意，此时 `super` 即可以引用父类实例的属性和方法，也可以引用父类的静态方法。

**注意：** 不同于 `Java` 等，`JS` 的类的静态成员不能通过实例访问到，只能通过类名来访问，使用 `super` 关键字却可以在子类定义中访问到父类的静态方法。
**技巧：**对象（指对象字面量）总是继承其他对象的，所以可以在任意一个对象中，使用 `super` 关键字

*Demo1: 作为对象调用时*

```javascript
class B extends A {
  get m() {
	// 子类通过 super 关键字，调用父类实例的 _p 属性
	return this._p * super._p;
  }
  set m() {
    throw new Error('该属性只读');
  }
}
```

*Demo2: 在对象字面量中使用*

```javascript
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

### 17.2.6 实例的  `__proto__ ` 属性
**说明：**子类实例的 `__proto__` 属性的 `__proto__` 属性，指向父类实例的 `__proto__`属性。也就是说，子类的原型的原型，是父类的原型。

**技巧：**通过子类实例的 `__proto__.__proto__` 属性，可以修改父类实例的行为。注意，这会影响所有父类和子类的实例。

*Demo: ColorPoint 是 Point 的子类*

```javascript
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true

/* 通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为 */
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() // "Ha"
```

## 17.3 原生构造函数的继承
### 17.3.1 原生构造函数
**说明：**指语言内置的构造函数，通常用来生成数据结构。

| ECMAScript 的原生构造函数（9个） |
| ---------------------- |
| Boolean()              |
| Number()               |
| String()               |
| Array()                |
| Date()                 |
| Function()             |
| RegExp()               |
| Error()                |
| Object()               |

### 17.3.2 错误的继承方式
`虽然很想只根据原书做笔记，但个人认为说使用 ES5 无法实现对原生构造函数的继承有些片面。 ES5 实现继承有很多方式，只有某些方式有问题而已，而有问题的地方特指试图通过 call 或 apply 调用父类构造期构建实例属性这种行为。`

**说明：** `ES5` 的实现继承的方式很多，有问题的是以下的方式。核心就两点，问题出在第一点
1. 继承实例成员：通过 `apply` 或 `call` 调用父类的构造函数
2. 继承静态成员：重写子类 `prototype`  ，使子类实例能够通过原型链最终访问到父类原型上的成员

**原因：**当通过 `apply` 或 `call` 调用原生构造函数时，传入的参数（用来绑定 `this` 的对象，也就是子类实例）会被忽略。导致无法继承父类的实例成员。

*Demo: 演示用这种方式实现对 Array 的继承*

```javascript
/**
* 子类构造期
*/
function MyArray() {
  // apply 的参数会被忽略，导致继承实例成员失败
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});

var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;// 没有继承 [[DefineOwnProperty]]，导致 length 不能自动更新
colors[0]  // "red"
```

### 17.3.3 正确的继承方式
**说明：** `ES6` 的 `extends` 关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构

**原理：** `ES6` 是先新建父类的实例对象 `this`，然后再用子类的构造函数修饰 `this`，使得父类的所有行为都可以继承

**技巧：**其实用 `ES5` 模拟 `ES6` 实现继承的原理一样可以实现对原生构造函数的继承。

**注意：** `ES6` 改变了 `Object` 构造函数的行为，一旦发现 `Object` 方法不是通过 `new Object()` 这种形式调用，会忽略参数。

*Demo1: 继承 Array*

```javascript
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```

*Demo2: 带版本管理功能的 Array*

```javascript
class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]
x.push(3);
x // [1, 2, 3]

x.revert();
x // [1, 2]
```

*Demo3:  继承 Error*

```javascript
class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
// Error
//     at MyError.ExtendableError
//     ...

```

*Demo4: 继承 Object*

```javascript
class NewObj extends Object{
  constructor(){
    // 通过 super 调用 Object，传入的参数被忽略
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
console.log(o.attr === true);  // false
```

## 17.4 Class的取值函数（getter）和存值函数（setter）
**说明：** 可以看做 `ES5` 的属性的描述对象上的 `setter` 和 `getter` 的语法糖

+ 在 `Class` 内部可以使用 `get` 和 `set` 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
+ `setter` 和 `getter` 是设置在属性的 `descriptor` 对象上的

*Demo1: 基本使用*

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

*Demo2: setter 和 getter 是设置在属性的  descriptor 对象上的*

```javascript
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html");
"get" in descriptor  // true
"set" in descriptor  // true
```

## 17.5 Class的Generator方法
**说明：**和普通 `Generator` 函数一样，如果某个方法之前加上 `*` ，就表示该方法是一个 `Generator` 函数

+ 类的 `Symbol.iterator` 方法返回一个类的默认遍历器
+ `for...of` 循环等会自动调用对象的 `Symbol.iterator` 这个遍历器

```javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

## 17.6 Class的静态方法
**关键字：** `static`
**说明：**如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为 `静态方法`。

+ 如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法
+ 父类的静态方法，可以被子类继承
+ 父类的静态方法也可以在子类中从 `super` 对象上调用的

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

## 17.7 Class的静态属性和实例属性
### 17.7.1 Class 的静态属性(ES6)
**静态属性：**静态属性指的是 `Class` 本身的属性，即 `ClassName.propname` ，而不是定义在实例对象（ `this` ）上的属性
**注意：** `static` 只能用来定义静态方法，不能定义静态属性

*正确用法*

```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

*错误用法*

```javascript
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}
Foo.prop // undefined
```

### 17.7.2 ES7 相关提案
**说明：**`ES7` 有一个提案，对实例属性和静态属性，都规定了新的写法。目前 `Babel` 转码器支持

#### 类的实例属性
**说明：**类的实例属性可以用等式，写入类的定义之中
**注意：**以前，定义实例属性，只能写在类的 `constructor` 方法里面。
**技巧：**对于那些在 `constructor` 里面已经定义的实例属性，新写法允许直接列出

*Demo1: 基本使用*

```javascript
class MyClass {
  myProp = 42;

  constructor() {
    console.log(this.myProp); // 42
  }
}
```

*Demo2:  在 constructor 里面已经定义的实例属性，新写法允许直接列出*

```javascript
class ReactCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  // 注意，bing不是 ES6 提供的对象字面量里面属性的简写方式
  state;
}
```

#### 类的静态属性
**说明：**类的静态属性只要在上面的实例属性写法前面，加上 `static` 关键字就可以了
**注意：**新写法是显式声明（declarative），而不是赋值处理，语义更好。

*老写法*

```javascript
class Foo {
}
Foo.prop = 1;
```
*新写法*

```javascript
class Foo {
  static prop = 1;
}
```
## 17.8 new.target属性
**说明：** ES6为 `new` 关键字引入了一个 `new.target` 属性，（在构造函数中）返回 `new` 命令作用于的那个构造函数。

+ 需要注意的是，子类继承父类时，`new.target` 会返回子类
+ `Class` 内部调用 `new.target`，返回当前 `Class`

**用途：**如果构造函数不是通过 `new` 命令调用的，`new.target` 会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。
**注意：**在函数外部，使用  `new.target` 会报错。

*Demo1: 确保构造函数只能通过 new 命令调用*
*方式1*

```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}
```
*方式2*

```javascript
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}
```

*验证上面的 DEMO*

```javascript
var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

*Demo2: 不能独立使用、必须继承后才能使用的类*

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

## 17.9 Mixin模式的实现
**说明：**指的是将多个类的接口“混入”（mixin）另一个类
**原理：**类本身其实就是一个特殊的对象，可以通过 `Object.defineProperty()` 为类添加成员（ES6的类的成员只有构造器和方法）

*定义 Mixin 功能的实现*

```javascript
/**
* 将一系列类混合为一个新的类并返回
* @param {Array} mixins 要混合的类的集合
* @return {class} 一个新的类
*/
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }

  return Mix;
}

/**
* 将一个类的成员定义到另一个类
* @param {class} 源
* @param {class} 目标
*/
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

*应用*

```javascript
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```

