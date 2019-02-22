---
title: 14 Generator 函数(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js

date: 2016-10-08 14:19
---

## 14.1 简介
### 14.1.1 基本概念
----
#### Generator 函数

**是什么：**可以从以下几个角度理解

+ **状态机：**`Generator`函数是一个状态机，封装了多个内部状态
+ **遍历器对象生成函数：**执行`Generator`函数会返回一个遍历器对象，通过返回的遍历器对象，可以依次遍历`Generator`函数内部的每一个状态

**定义：**`Generator`函数是一个普通函数，但有两个特征

+ `function`关键字与函数名之间有一个`*`
+ 函数体内部使用`yield`语句，定义不同的内部状态

**调用：**调用方法与普通函数一样，也是在函数名后面加上`()`， 调用后返回一个`便利器对象`（一个有着`value`和`done`两个属性的对象）

```javascript
function * foo(x, y) { ··· }

function *foo(x, y) { ··· }

function* foo(x, y) { ··· }// 推荐
function*foo(x, y) { ··· }
```
----
#### 返回的便利器对象的 next() 方法
**说明：**调用`遍历器对象`的`next`方法，使得指针移向下一个状态

| 参数   | 说明                       | 必需   |
| ---- | ------------------------ | ---- |
| 1    | 该参数就会被当作上一个`yield`语句的返回值 | 否    |

**原理：**`Generator`函数是分段执行的，`yield`语句是暂停执行的标记，而`next`方法可以恢复执行

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```
----
#### yield 语句
**说明：**是`Genertor`函数返回的`便利器对象`的暂停标志，每次调用`next`函数，运行逻辑如下

1. 遇到`yield`语句，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

2. 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`语句。

3. 如果没有再遇到新的`yield`语句，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

4. 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

**语法：**

+ `yield`语句如果用在一个表达式之中，必须放在`()`里面（用作函数参数或赋值表达式的右边，可以不加`()`）
+ 通过`yeild`调用`Genertor`函数需要在中间加上`*`

**限制：**`yield`语句不能用在普通函数中，否则会报错
**注意：**`yield`语句后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行
**技巧：**`Generator`函数可以不用`yield`语句，这时就变成了一个单纯的暂缓执行函数

```javascript
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}
// 1, 2, 3, 4, 5, 6
```
----
#### yeild 和 return
**说明：**在`Genertor`函数中可以同时使用`yeild`和`return`
**相同点：**都能返回紧跟在语句后面的那个表达式的值
**不同点：**

+ 一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield`语句
+ 每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能（遇到`return`，遍历器对象的遍历就到头了）
----

#### 与`Iterator`接口的关系 
**说明：**可以把`Generator`赋值给对象的`Symbol.iterator`属性，从而使得该对象具有`Iterator`接口
**注意：**调用`Genertor`函数返回的便利器对象自身也有`Symbol.iterator`属性，指向便利器对象自身

*Demo1: `Generator`函数赋值给`Symbol.iterator`属性*

```javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

*Demo2*

```javascript
function* gen(){
  // some code
}

var g = gen();

// 指向便利器对象自身
g[Symbol.iterator]() === g
// true
```

## 14.2 next方法的参数
| 参数   | 说明                       | 必需   |
| ---- | ------------------------ | ---- |
| 1    | 该参数就会被当作上一个`yield`语句的返回值 | 否    |

**用途：**可以在`Generator`函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为

**注意：**由于`next`方法的参数表示上一个`yield`语句的返回值，所以第一次使用`next`方法时，不能带有参数

*Demo1: 演示 next 参数的运行逻辑*

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

*Demo2: 想要第一次调用`next`方法时，就能够输入值，可以在`Generator`函数外面再包一层*

```javascript
/**
* 对 generatorFunction 进行包装，预先执行一次 next()
* @param {function *} generatorFunction 被包装的 Generator 函数
* @return {function} 包装后的函数
*/
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

// 包装
const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

// 调用包装后的函数，返回便利器对象（已经被执行过一次 next()）
wrapped().next('hello!')
// First input: hello!
```

## 14.3 for...of循环
**说明：**不需要调用`next`方法，`for...of`循环可以自动遍历`Generator`函数生成的`Iterator`对象
**注意：**和直接调用`next`方法不同，`return`的值不会被遍历
**扩展：**除了`for...of`循环以外，还有以下运算可以利用`Generator`函数

+ 扩展运算符
+ 解构赋值
+ `Array.from`方法

*Demo1: `return`的值不会被遍历*

```javascript
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

*Demo2: 斐波那契数列*

```javascript
/**
* 使用 Genertor 函数实现斐波那契数列
*/
function* fibonacci() {
	let [prev, curr] = [0, 1];
	for (;;) {
		[prev, curr] = [curr, prev + curr];
		yeild curr;
	}
}

// 输出 1000 以内的负波那契数列
for (let n of fibonacci()) {
	if (n > 1000) {
		break;
	}
	console.log(n);
} 
```

*Demo3: 用 Genertor 函数包装对象属性的遍历（并没有为对象部署 `Iterator` 接口 ）*

```javascript
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

*Demo4: 将`Generator`函数加到对象的`Symbol.iterator`属性上面（成功部署了 `Iterator` 接口）*

```javascript
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

// 将 Generator 函数赋值给对象的 Symbol.iterator 属性
jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

## 14.4 Generator.prototype.throw()
**说明：**`Generator`函数返回的`遍历器对象`，都有这个实例方法，可以在函数体外抛出错误，然后在`Generator`函数体内捕获

+ `throw`方法被捕获以后，会附带执行下一条`yield`语句（就是说，会附带执行一次`next`方法）
+ 一旦`Generator`执行过程中抛出错误，且没有被内部捕获，`JavaScript`引擎认为这个`Generator`已经运行结束了。如果此后还调用`next`方法，将返回一个`value`属性等于`undefined`、`done`属性等于`true`的对象

| 参数   | 类型    | 说明                                | 必需   |
| ---- | ----- | --------------------------------- | ---- |
| 1    | `any` | 该参数会被`catch`语句接收，建议抛出`Error`对象的实例 | 否    |

**注意：**不要混淆`遍历器对象的throw方法`和`全局的throw命令`

+ 后者只能被函数体外的`catch`语句捕获
+ `throw`命令与`Generator.prototype.throw()`是无关的，两者互不影响

```javascript
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // b(顺便出发了一次 next)
g.next() // c
```

## 14.5 Generator.prototype.return()
**说明：**可以返回给定的值，并且终结遍历`Generator`函数

| 参数   | 说明                                      | 必需                                 |
| ---- | --------------------------------------- | ---------------------------------- |
| 1    | 该参数将作为`return()`方法的返回的对象中的`value`属性值被返回 | 否，不提供参数，则返回值的`value`属性为`undefined` |

**注意：**如果`Generator`函数内部有`try...finally`代码块，那么`return`方法会推迟到`finally`代码块执行完再执行。

```javascript
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers()
g.next() // { done: false, value: 1 }
g.next() // { done: false, value: 2 }
g.return(7) // { done: false, value: 4 }
g.next() // { done: false, value: 5 }
g.next() // { done: true, value: 7 }
```

## 14.6 yield*语句
**说明：**如果yield命令后面跟的是一个遍历器对象（包括`Generator()`函数返回的）需要在`yield`命令后面加上星号，表明它返回的是一个遍历器对象

+ 运行结果就是使用一个遍历器，遍历了多个`Generator`函数，有递归的效果。
+ 任何数据结构只要有`Iterator`接口，就可以被`yield*`遍历

**返回值：**如果`yield*`后面是对`Generotor`函数的调用，则该`Generator`函数的返回值就是整个`yeild* 语句`的返回值

**注意：**在`Generater`函数内部，按照普通方式调用另一个`Generator`函数，默认情况下是没有效果的

*Demo1: 基本使用*

```javascript
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  yield* foo();// 后面跟一个 Generator 函数的返回值
  //  for (let v of foo()) {
  //    yield v;
  //  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

*Demo2: 取出嵌套数组的所有成员*

```javascript
/**
* 递归遍历数组的所有元素
*/
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e
```

*Demo3: 使用`yield*`语句遍历完全二叉树*
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-10-09%20%E4%B8%8B%E5%8D%884.38.35.png)


```javascript
/**
* 二叉树的节点构造函数
* @param{Object} left 左树
* @param{any} label 当前节点
* @param{Object} right 右树
*/
function Tree(left, label, right) {
	this.left = left;
	this.label = label;
	this.right = right;
}

/**
* 中序遍历函数
* @param{array} t 第一个节点（按照中序遍历规则）
*/
function* inorder(t) {
	if (t) {
		yield* inorder(t.left);// 递归遍历左树
		yield t.label;// 产出当前节点
		yeild* inorder(t.right);// 递归遍历右树
	}
}

/**
* 递归构建二叉树结构
* @param{Array} arry 特定结构（中序二叉树）的数组
* @return{any} 节点
*/
function make(array) {
	// 判断是否为叶结点
	if (array.length == 1) {
		return new Tree(null, array[0], null);
	}
	return new Tree(make(array[0]), array[1], make(array[2]));
}

// 初始化二叉树
let tree = make([
	[
		['a'],
		'b',
		['c']
	],
	'd',
	[
		['e'],
		'f',
		['g']
	]
]);

// 遍历二叉树（将二叉树的所有节点铺开）
var result = [];
for (let node of inorder(tree)) {
	result.push(node);
}
result // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

## 14.7 作为对象属性的Generator函数
### 完整形式

```javascript
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};
```

### 简写形式

```javascript
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
```
## 14.8 Generator函数的this
**说明：**执行`Generator`函数总是返回一个遍历器对象，这个便利器对象就`Generator`函数的实例，但不同于通过`new`创建的实例，`Generator`函数中的`this`不指向这个遍历器对象

**注意：**虽然返回的遍历器对象是 `Generator` 函数的实例，但和普通函数有以下不同点

+ `Generator`函数也不能跟`new`命令一起用
+ 虽然在`Generator`函数内部的`this`指向返回的便利器对象，但无法通过`this`向这个对象添加实例成员

*Demo1: 返回的遍历器是`Generator`函数的实例*

```javascript
// Generator 函数
function* g() {}

// 在 Generator 函数的protorype 上添加方法
g.prototype.hello = function () {
  return 'hi!';
};

// 执行 Generator 方法
let obj = g();

// 便利器对象是 Generator 的实例
obj instanceof g // true

// 并且继承了 prototype 上的方法
obj.hello() // 'hi!'
```

*Demo2: 生成一个空对象，使用`bind`方法绑定`Generator`函数内部的`this`*
*缺点：*绑定了 `Generator` 函数中的 `this` 的对象和返回的便利器对象不是同一个对象

```javascript
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};

// 执行 Generator 函数时，将 this 绑定到 obj
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3
```

*Demo3: 封装 Generator 函数，优点是*
*1. 能使用 `new`*
*2. 使返回的遍历器对象能访问绑定在 `this`上的实例成员*

```javascript
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

## 14.9 状态机与协程
### 14.9.1 Generator 与 状态机
**说明：**`Generator`是实现状态机的最佳结构

*Demo: clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态*

```javascript
var clock = function*() {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
```
### 14.9.2 Generator 与协程
**说明：**`Generator`函数是对`协程`的实现，但属于不完全实现。
**用途：**如果将`Generator`函数当作协程，完全可以将多个需要互相协作的任务写成`Generator`函数，它们之间使用`yield`语句交换控制权。

## 14.10 应用
### 14.10.1 异步操作的同步化表达 
**说明：**`Generator`函数的一个重要实际意义就是用来处理异步操作，改写回调函数

*Demo1: 所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰*

```javascript
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()
```

*Demo2: 通过Generator函数部署Ajax操作*

```javascript
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
	// 3. 将请求返回的信息传递进去
    it.next(response);
  });
}

// 1. 获取便利器对象
var it = main();
// 2. 触发请求
it.next();
```

*Demo3: 通过`Generator`函数逐行读取文本文件*

```javascript
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while(!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}

```

### 14.10.2 控制流管理

*Demo1: 使用 Generator 批量执行任务（只能用于所有步骤都是同步操作的情况，不能有异步操作的步骤）*

```javascript
// 封装了一个任务的多个步骤
let steps = [step1Func, step2Func, step3Func];

// Generator函数依次执行这些步骤
function* longRunningTask(value1) {
  try {
	for (var i=0; i< steps.length; i++){
	  var step = steps[i];
	  yield step();
	}
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}

scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
```

### 14.10.3 部署Iterator接口
**说明：**利用`Generator`函数，可以在任意对象上部署`Iterator`接口

```javascript
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };[]

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```

### 14.10.4 作为数据结构
**说明：**`Generator`可以看作是数据结构，更确切地说，可以看作是一个数组结构

*Demo: 像处理数组那样，处理这三个返回的函数*

```javascript
function *doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}

for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
```



