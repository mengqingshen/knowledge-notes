---
title: 13 Iterator和for...of循环(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js

date: 2016-10-07 15:46
---

## 13.1 Iterator（遍历器）的概念
**是什么：**它是一种接口，为各种不同的数据结构(`Array、Object、Map、Set`)提供统一的访问机制
**有啥用：**
+ 为各种数据结构，提供一个统一的、简便的访问`接口`
+ 使得数据结构的成员能够按某种次序排列
+ `ES6`创造了一种新的遍历命令`for...of`循环，`Iterator`接口主要供`for...of`消费

**原理：**`Iterator`的遍历过程
1. 创建一个指针对象，指向当前数据结构的起始位置
2. 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员
3. 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员
4. 不断调用指针对象的`next`方法，直到它指向数据结构的结束位置

### 13.2.1 模拟`next`方法
**说明：**自定义一个便利器生成函数，来说明 `next()` 的工作原理


| next() 返回的对象的属性 | 类型      | 说明                       |
| --------------- | ------- | ------------------------ |
| value           | any     | 当前位置的成员，遍历完毕时为 undefined |
| done            | boolean | 表示遍历是否结束                 |


```javascript
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

/**
* 一个遍历器生成函数，返回一个遍历器对象
*/
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

### 13.2.1 用 TypeScript 描述相关概念
+ `Iterable`: 遍历器接口
+ `Iterator`: 遍历器对象
+ `next()`返回值

```javascript
//  便利器接口
interface Iterable {
  [Symbol.iterator]() : Iterator,
}

// 遍历器对象
interface Iterator {
  next(value?: any) : IterationResult,
}

// next() 返回值
interface IterationResult {
  value: any,
  done: boolean,
}
```

## 13.2 数据结构的默认Iterator接口
**说明：**有些数据结构原生具备`Iterator`接口，比如
+ `Array`
+ `String`
+ `Map`
+ `Set`
+ 某些特殊的类数组对象（`DOM NodeList`、`arguments`）

**对象为什么没有默认部署`Iterator`接口：**遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。严格地说，对象部署遍历器接口并不是很必要，因为对象的哪个属性先遍历，哪个属性后遍历是不确定的

### 13.2.1 Symbol.iterator
**类型：**一个预定义好的、类型为`Symbol`的特殊值
**说明：**默认的`Iterator`接口部署在数据结构的`Symbol.iterator`属性
+ 一个数据结构只要具有`Symbol.iterator`属性，就可以认为是`可遍历的`（iterable）
+ 调用`Symbol.iterator`方法，就会得到当前数据结构默认的遍历器生成函数

**注意：**如果`Symbol.iterator`方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错

### 13.2.2 对象上部署`Iterable`接口
**说明：**必须在`Symbol.iterator`的属性上部署遍历器生成方法（`原型链`上的对象具有该方法也可）

*Demo1: 在 class 中部署（将当前实例作为`便利器对象`返回）*

```javascript
/**
* 在这个类上部署 Iterable 接口
* 该类用来定义一个数字区间
*/
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    } else {
      return {done: true, value: undefined};
    }
  }
}

/**
* 给上面定义的区间类包装一个工厂方法
*/
function range(start, stop) {
  return new RangeIterator(start, stop);
}

// 遍历一个区间实例
for (var value of range(0, 3)) {
  console.log(value);
}
```

*Demo2: 实现链表（在构造函数的原型链上部署`Symbol.iterator`方法）*
```javascript
// 构造器
function Obj(value) {
  this.value = value;
  this.next = null;
}

// 在原型上提供 Symbol.iterator 的实现
Obj.prototype[Symbol.iterator] = function() {
  var iterator = {
    next: next
  };

  // 遍历时，this 指向调用 Symbol.iterator 的是和该原型关联的实例
  var current = this;

  function next() {
    if (current) {
      var value = current.value;
      current = current.next;// 如果提供了 next 属性，current 会改为指向那个 next
      return {
        done: false,
        value: value
      };
    } else {
      return {
        done: true
      };
    }
  }
  return iterator;
}

// 头节点
var one = new Obj(1);
var two = new Obj(2);

// 尾节点
var three = new Obj(3);

one.next = two;
two.next = three;

// 遍历链表
for (var i of one){
  console.log(i);
}
// 1
// 2
// 3
```

*Demo3: 在对象字面量中部署*
```javascript
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};
```

### 13.2.3 类似数组的对象部署 Iterator 接口
**说明：**对于`类数组对象`（存在`数值键名`和`length`属性），部署`Iterator`接口，有一个简便方法，就是`Symbol.iterator`方法直接引用数组的`Iterator`接口
**注意：**普通对象部署数组的`Symbol.iterator`方法，并无效果

*Demo: 类数组对象调用数组的`Symbol.iterator`方法*
```javascript
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}

// 也可以使用while循环遍历
var $iterator = iterable[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
  var x = $result.value;
  // ...
  $result = $iterator.next();
}
```

## 13.3 调用Iterator接口的场合
**说明：**总结下默认调用`Iterator`接口的场景
+ 解构赋值
+ 扩展运算符
+ `yield*`后面跟的是一个可遍历的结构
+ 其它（遍历数组）
1. `for...of`
2. `Array.from()`
3. `Map(), Set(), WeakMap(), WeakSet()`（比如new Map([['a',1],['b',2]])）
4. `Promise.all()`
5. `Promise.race()`

*Demo1: 解构赋值*
```javascript
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
```

*Demo2: 扩展运算符*
```javascript
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

*Demo3: `yield*`后面跟的是一个可遍历的结构*
```javascript
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

## 13.4 字符串的Iterator接口
*Demo1: 字符串是一个类似数组的对象，也原生具有Iterator接口*
```javascript
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
```

*Demo2: 覆盖原生的`Symbol.iterator`方法，达到修改遍历器行为的目的*
```javascript
var str = new String("hi");

[...str] // ["h", "i"]

str[Symbol.iterator] = function() {
  return {
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};

[...str] // ["bye"]
str // "hi"
```

## 13.5 Iterator接口与Generator函数
**说明：**Generator函数是`Symbol.iterator`方法的最简单实现，几乎不用部署任何代码，只要用`yield`命令给出每一步的返回值即可

```javascript
var myIterable = {};

myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// hello
// world
```

## 13.6 遍历器对象的return()，throw()
**说明：**遍历器对象有3个可以实现的方法

| 方法         | 说明                                       | 必需   |
| ---------- | ---------------------------------------- | ---- |
| `next()`   | 切换到下一个要遍历的指针                             | 是    |
| `return()` | 如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句或`continue`语句），就会调用`return`方法 | 否    |
| `throw()`  | 主要是配合`Generator`函数使用，一般的遍历器对象用不到这个方法     | 否    |

### return()
**用途：**如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return`方法

```javascript
function readLinesSync(file) {
  return {
    next() {
      if (file.isAtEndOfFile()) {
        file.close();
        return { done: true };
      }
    },
    // 如果让文件的遍历提前返回，就会触发执行return方法
    return() {
      file.close();
      return { done: true };
    },
  };
}
```

## 13.7 for...of循环
**说明：**一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有`iterator`接口，就可以用`for...of`循环遍历它的成员

### 13.7.1 数组
**说明：**和`for...in`相比
+ `for...of`循环读取键值（`for...in`循环读取键名）
+ `for...of`循环只返回具有数字索引的属性（`for...in`循环会也返回除此之外的其它属性）

**技巧：**如果要通过`for...of`循环，获取数组的索引，可以借助数组实例的`entries`方法和`keys`方法

*Demo: `for...of`   vs.  `for...in`*
```javascript
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
```

### 13.7.2 Set 和 Map 结构
**遍历的顺序：** 遍历的顺序是按照各个成员被添加进数据结构的顺序
**遍历时的返回值：**`Map`和`Set`不同

| 返回值   | 类型      | 说明             |
| ----- | ------- | -------------- |
| `Set` | `any`   | `value`        |
| `Map` | `Array` | `[key, value]` |

```javascript
let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
  console.log(pair);
}
// ['a', 1]
// ['b', 2]

for (let [key, value] of map) {
  console.log(key + ' : ' + value);
}
// a : 1
// b : 2
```

### 13.7.3 计算生成的数据结构
**说明：**`数组`、`Set`、`Map`都部署了`keys()`、`values()`、`entries()`，调用后都返回遍历器对象（计算生成的数据结构）

```javascript
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

### 13.7.3 类数组对象
**限制：**必须是实现了`Iterator`接口的类数组对象，比如
+ `String`
+ `DOM NodeList`对象
+ `arguments`对象
+ ...

**技巧：**为了可以被`for...of`遍历，可以使用`Array.from`方法将没有实现`Iterator`接口的类数组对象转为数组

*Demo: `for...of`循环用于`字符串`、`DOM NodeList对象`、`arguments对象`的例子*
```javascript
// 字符串
let str = "hello";

for (let s of str) {
  console.log(s); // h e l l o
}

// DOM NodeList对象
let paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'
```

### 13.7.4 对象
**说明：**对于普通的对象，`for...of`结构不能直接使用，会报错，必须部署`iterator`接口后才能使用

#### 13.7.4.1 不部署 Iterator 接口
**说明：**这种情况下可以通过以下方式遍历对象
+ `for...in`循环（遍历键名）
+ `Object.keys()`配合`for...of`
+ 使用`Generator`函数将对象重新包装一下

*Demo1: `for...in`循环（遍历键名）*
```javascript
var es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

for (e in es6) {
  console.log(e);
}
// edition
// committee
// standard
```

*Demo2: `Object.keys()`配合`for...of`*
```javascript
for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}
```

*Demo3: 使用`Generator`函数将对象重新包装一下*
```javascript
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of entries(obj)) {
  console.log(key, "->", value);
}
// a -> 1
// b -> 2
// c -> 3
```
#### 13.7.4.2 部署 Iterator 接口
**说明：**一个方便的方法是将数组的`Symbol.iterator`属性，直接赋值给其他对象的`Symbol.iterator`属性

*Demo: 让`for...of`环遍历`jQuery`对象*
```javascript
jQuery.prototype[Symbol.iterator] =
  Array.prototype[Symbol.iterator];
```

### 13.7.5 与其他遍历语法的比较
**说明：**`JavaScript`提供多种遍历语法，以数组为例
+ `for`循环
+ `for...in`循环
+ `forEach`方法

#### 13.7.5.1 其它遍历语法
#### `for`循环
**缺点：**写法比较麻烦
```javascript
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
```

#### `for...in`循环
**缺点：**`for...in`循环主要是为遍历对象而设计的，不适用于遍历数组
+ 数组的键名是数字，但是`for...in`循环是以字符串作为键名，比如“0”、“1”、“2”等等
+ 不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键
+ 某些情况下，`for...in`循环会以任意顺序遍历键名

```javascript
for (var index in myArray) {
  console.log(myArray[index]);
}
```

#### `forEach`方法
**缺点：**无法中途跳出`forEach`循环，`break`命令或`return`命令都不能奏效

```javascript
myArray.forEach(function (value) {
  console.log(value);
});
```

#### 13.7.5.2 for...of 循环的优点
**说明：**相比上面几种做法，有一些显著的优点
+ 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
+ 不同用于`forEach`方法，它可以与`break`、`continue`和`return`配合使用
+ 提供了遍历所有数据结构的统一操作接口

```javascript
for (var n of fibonacci) {
  if (n > 1000)
    break;
  console.log(n);
}
```

