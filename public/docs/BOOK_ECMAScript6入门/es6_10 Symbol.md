---
title: 10 Symbol(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js
date: 2016-09-13 11:08
---


## 10.1 概述
**说明：**`ES6`引入了一种新的原始数据类型`Symbol`，表示独一无二的值

**用途：**防止命名冲突

JS的7种数据类型|说明
-|-
`undefined`|未定义
`null`|空
`boolean`|布尔值
`number`|数字
`string`|字符串
`object`|对象
`symbol`|表示独一无二的值


### Symbol()
**说明：**`Symbol`值通过`Symbol`函数生成

（1）参数
+ `Symbol`函数可以接受一个字符串作为参数，表示对`Symbol`实例的描述（主要是为了在控制台显示，或者转为字符串时，比较容易区分）
+ `Symbol`函数的参数只是表示对当前`Symbol`值的描述，因此相同参数的`Symbol`函数的返回值是不相等的

（2）不能使用 `new`
+ `Symbol`函数前不能使用`new`命令，否则会报错
+ 生成的`Symbol`是一个原始类型的值，不是对象（所以不能添加属性基本上，它是一种类似于字符串的数据类型）

（3）不能和其它值运算
+ `Symbol`值不能与其他类型的值进行运算，会报错

（4）类型转换
+ `Symbol`值可以显式转为字符串
+ `Symbol`值也可以转为布尔值，但是不能转为数值

```javascript
/* 没有参数 */
let s = Symbol();

/* 有参数 */
var s1 = Symbol('foo');
var s2 = Symbol('bar');

/* 类型 */
typeof s// "symbol"

/* 可以转换为字符串 */
s1.toString() // "Symbol(foo)"
String(s1) // "Symbol(foo)"

/* 可以转换为boolean值 */
var sym = Symbol();
Boolean(sym) // true
!sym  // false

/* 不能转为数值 */
Number(sym) // TypeError
sym + 2 // TypeError

/* 参数相同，但不相等 */
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false

/* 不能与其他类型的值进行运算 */
var sym = Symbol('My symbol');
"your symbol is " + sym// TypeError: can't convert symbol to string
`your symbol is ${sym}`// TypeError: can't convert symbol to string
```

## 10.2 作为属性名的 Symbol
**说明：**这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖

**注意：**`Symbol`值作为属性名时，该属性还是公开属性，不是私有属性

**用法**：分为三种

```javascript
var mySymbol = Symbol();

// 第一种写法：中括号（不能使用点运算符）
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法：对象字面量中使用中括号（可以是任意类型，包括方法，后者自持 es6 的缩写方式）
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法：通过 Object.defineProperty 方法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

**扩展：**还可以用于定义一组常量，保证这组常量的值都是不相等的
```javascript
const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}
```

## 10.3 实例：消除魔术字符串
**魔术字符串：**在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值

**说明：**风格良好的代码，应该尽量消除`魔术字符串`，该由含义清晰的变量代替，如果用哪一个值并不重要，则适合用`Symbol`值

```javascript
const shapeType = {
  triangle: Symbol()
};
function getArea(shape, options) {
  var area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

## 10.4 属性名的遍历
**注意：**`Symbol`作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`返回

### 10.4.1 遍历`Symbol`属性
#### Object.getOwnPropertySymbols
**说明：**返回一个数组，成员是当前对象的所有用作属性名的`Symbol`值
```javascript
var a = Symbol('a');
var b = Symbol('b');

var obj = {
	[a]: 'Hello',
	[b]: 'World'
};

Object.getOwnPropertySymbols(obj); // [Symbol(a), Symbol(b)]
```

#### Reflect.ownKeys
**说明：**返回所有类型的键名，包括`常规键名`和`Symbo键名`
```javascript
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)// [Symbol(my_key), 'enum', 'nonEnum']
```
### 10.4.2 非私有&只用于内部的属性
**说明：**由于以`Symbol`值作为名称的属性，不会被常规方法遍历得到，这就造成了一种非私有的内部属性的效果

```javascript
var size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

var x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```
## 10.5 Symbol.for()、Symbol.keyFor()

### Symbol.for()
**说明：**它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的`Symbol`值。如果有，就返回这个`Symbol`值，否则就新建并返回一个以该字符串为名称的`Symbol`值。

**注意：**`Symbol.for`为`Symbol`值登记的名字，是全局环境的，可以在不同的`iframe`或`service worker`中取到同一个值。
```javascript
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

s1 === s2 // true

/* Symbol.for为 Symbol 值登记的名字是全局环境的 */
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
// true
```

### Symbol.keyFor()
**说明：**返回一个已登记的`Symbol`类型值的`key`，如果未登记则返回`undefined`

```javascript
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

```
## 10.6 实例：模块的 Singleton 模式
**`Singleton`模式：**指的是调用一个类，任何时候返回的都是同一个实例

### 10.6.1 挂载到 global
**说明：**其中一个办法就是把实例放到顶层对象`global`（nodejs）或`window`（浏览器）。

**缺点：**`global`或`window`上面的任何属性都可以被轻易覆盖。

*单例模块*
```javascript
function A() {
  this.foo = 'hello';
}

if (!global._foo) {
  global._foo = new A();
}

module.exports = global._foo;
```
*覆盖它*
```javascript
var a = require('./mod.js');
global._foo = 123;
```

### 10.6.2 使用Symbol
**说明：**因为开发者在外部不会故意用一个某个`Symbol`值定义变量，因此使用`Symbol`就避免了那种无意的覆盖。

**注意：**如果要避免用户有意的覆盖，可以使用`Symbol()`而不是`Symbol.for()`，但这样在`node`平台会存在隐患，就是用户如果手动清除了`node`的缓存，那么将引用不到这个单例

```javascript
const FOO_KEY = Symbol.for('foo');
// const FOO_KEY = Symbol('foo');// 其它脚本将无法通过global[Symbol.for('foo')]获取该模块获取

function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
```

## 10.7 内置的 Symbol 值
**说明：**除了定义自己使用的`Symbol`值以外，`ES6`还提供了11个内置的`Symbol`值，指向语言内部使用的方法。

内置的`Symbol`值(16个)|指向的`value`类型|说明
-|-|-
`Symbol.hasInstance`|`function`|使用`instanceof`时会调用定义类时以该值命名的方法
`Symbol.isConcatSpreadable`|`boolean`|拼接数组时，对象作为参数传递给`Array.prototype.concat()`时，是否展开
`Symbol.species`|`function`|如果`this.constructor[Symbol.species]`存在，就会使用这个属性作为构造函数，来创造新的实例对象
`Symbol.match`|`function`|当执行`str.match(myObject)`时，如果该属性存在，会调用它，返回该方法的返回值
`Symbol.replace`|`function`|当该对象被`String.prototype.replace`方法调用时，会返回该方法的返回值
`Symbol.search`|`function`|当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值
`Symbol.split`|`function`|当该对象被`String.prototype.split`方法调用时，会返回该方法的返回值
`Symbol.iterator`|`function`|指向该对象的默认遍历器方法
`Symbol.toPrimitive`|`function`|对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值
`Symbol.toStringTag`|`function`|可以用来定制`[object Object]`或`[object Array]`中object后面的那个字符串
`Symbol.unscopables`|`object`|指定了使用`with`关键字时，哪些属性会被`with`环境排除

## 10.7.1 Symbol.hasInstance
**指向的value类型：**`function`

**说明：**使用`instanceof`时会调用定义类时以该值命名的方法

*Demo1*
```javascript
class MyClass {
  // 该类创建的对象属于类由该方法决定
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true
```

*Demo2*
```javascript
class Even {
  // 所有偶数会被判断为都是该类
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false
```

## 10.7.2 Symbol.isConcatSpreadable
**指向的value类型：**`boolean`

**说明：**拼接数组时，对象作为参数传递给`Array.prototype.concat()`时，是否展开

**访问形式：**实例属性

**注意：**默认情况下`value`为`undefined`，此时和值为`true`效果相同

**扩展：**`类数组对象`也可以拼接给数组，不同于数组，其`Symbol.isConcatSpreadable`默认为`false`（不展开）

*方式一：给数组或对象直接指定该属性值：针对数组或类数组对象：*
```javascript
/* 展开（默认） */
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

/* 不展开 */
let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```

*方式二：在定义 class 时定义该属性：针对类数组对象*
```javascript
class A1 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class A2 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = false;
  }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]
```

## 10.7.3 Symbol.species
**指向的value类型：**`function`

**说明：**如果`this.constructor[Symbol.species]`存在，就会使用这个属性作为构造函数，来创造新的实例对象

*默认的`getter`*
```javascript
static get [Symbol.species]() {
  return this;
}
```

## 10.7.4 Symbol.match
**指向的value类型：**`function`

**说明：**当执行`str.match(myObject)`时，如果该属性存在，会调用它，返回该方法的返回值

```javascript
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1
```

## 10.7.5 Symbol.replace
**指向的value类型：**`function`

**说明：**当该对象被`String.prototype.replace`方法调用时，会返回该方法的返回值


## 10.7.6 Symbol.search
**指向的value类型：**`function`

**说明：**当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值

```javascript
class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
```

## 10.7.7 Symbol.split
**指向的value类型：**`function`

**说明：**当该对象被`String.prototype.split`方法调用时，会返回该方法的返回值


## 10.7.8 Symbol.iterator
**指向的value类型：**`function`

**说明：**指向该对象的默认遍历器方法

```javascript
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value);
}
// 1
// 2
```

## 10.7.9 Symbol.toPrimitive
**指向的value类型：**`function`

**说明：**对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值

三种模式|说明
-|-
`Number`|该场合需要转成数值
 `String`|该场合需要转成字符串
`Default`|该场合可以转成数值，也可以转成字符串

```javascript
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
```

## 10.7.10 Symbol.toStringTag
**指向的value类型：**`function`

**说明：**`function`|可以用来定制`[object Object]`或`[object Array]`中object后面的那个字符串

```javascript
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
var x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```

ES6新增内置对象|`Symbol.toStringTag`
-|-
JSON|`JSON`
Math|`Math`
Module对象|`Module`
ArrayBuffer.prototype|`ArrayBuffer`
DataView.prototype|`DataView`
Map.prototype|`Map`
Promise.prototype|`Promise`
Set.prototype|`Set`
%TypedArray%.prototype|`Uint8Array`等
WeakMap.prototype|`WeakMap`
WeakSet.prototype|`WeakSet`
%MapIteratorPrototype%|`Map Iterator`
%SetIteratorPrototype%|`Set Iterator`
%StringIteratorPrototype%|`String Iterator`
Symbol.prototype|`Symbol`
Generator.prototype|`Generator`
GeneratorFunction.prototype|`GeneratorFunction`

## 10.7.11 Symbol.unscopables
**指向的value类型：**`object`

**说明：**指定了使用`with`关键字时，哪些属性会被`with`环境排除

*观察内置对象类型（以`数组`为例）*
```javascript
/* 方式1*/
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   keys: true
// }

/* 方式2 */
Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'keys']
```

### Demo
*没有`unscopables`时*
```javascript
class MyClass {
  foo() { return 1; }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 1
}
```

*有`unscopables`时*
```javascript
class MyClass {
  foo() { return 1; }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 2
}
```