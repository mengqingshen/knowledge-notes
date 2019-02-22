---
title: 16 异步操作和Async函数(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js

date: 2016-10-10 22:55
---


**异步编程：**`JS`语言的执行环境是`单线程`的，因此异步编程对`JS`的可用性非常重要

| 异步编程方式       | 兼容性  |
| ------------ | ---- |
| 回调函数         | 完全兼容 |
| 事件监听         | 完全兼容 |
| 发布/订阅        | 完全兼容 |
| `Promise` 对象 | es6+ |
| `Async` 函数   | es7+ |

## 16.1 基本概念
### 16.1.1 异步
| 异步和同步 | 说明                               |
| ----- | -------------------------------- |
| 异步    | 一个任务不连续分两段执行（第二段在回调中）,中间可以插入其它任务 |
| 同步    | 连续执行，不能插入其他任务                    |

### 16.1.2 回调函数
**说明：**`JS`语言对异步编程的实现，就是回调函数（就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数）
**注意：**执行分成两段，在这两段之间抛出的错误，程序无法捕捉，只能当作参数，传入第二段。所以，`Node.js`约定，回调函数的第一个参数，必须是错误对象`err`（如果没有错误，该参数就是`null`）

*Demo： 读取文件*
*1. 向操作系统发出请求，要求读取文件*
*2. 程序执行其他任务*
*3. 等到操作系统返回文件，再接着执行任务的第二段（处理文件）*

```javascript
fs.readFile('/etc/passwd', function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

### 16.1.3 Promise
**说明：**它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用，解决多重回调函数嵌套导致的`callback hell`问题
**分析：**`Promise` 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了
**缺点：**代码冗余，原来的任务被`Promise` 包装了一下，不管什么操作，一眼看去都是一堆 `then`，原来的语义变得很不清楚

*Demo: 连续读取多个文件*

```javascript
var readFile = require('fs-readfile-promise');

readFile(fileA)
  .then(function(data){
    console.log(data.toString());
  })
  .then(function(){
    return readFile(fileB);
  })
  .then(function(data){
    console.log(data.toString());
  })
  .catch(function(err) {
    console.log(err);
  });
```

## 16.2 Generator函数
### 16.2.1 协程
**说明：**协程是一种多任务的解决方案，有点像函数，又有点像线程。`es6`是通过`Generator`函数实现`协程`的。
**Generator函数：**遇到`yield`命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作


### 16.2.2 Generator函数的概念
**说明：**`Generator`函数是协程在ES6的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

```javascript
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

### 16.2.3 Generator函数的数据交换和错误处理
#### 数据交换

+ `next`方法返回值的`value`属性，是`Generator`函数向外输出数据
+ `next`方法还可以接受参数，这是向`Generator`函数体内输入数据

```javascript
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```

#### 错误处理

+ 通过`throw()`方法在外部抛出内部错误
+ 通过`try...catch`捕获内部错误

```javascript
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}

var g = gen(1);
g.next();
g.throw('出错了');
// 出错了
```

### 16.2.4 异步任务的封装
**分析：**虽然 `Generator` 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）

*Demo: 执行一个真实的异步任务*

```javascript
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

// 1. 返回 Generator 实例
var g = gen();

// 2. 发出请求
var result = g.next();

// 3. 处理请求
result.value.
  then(function(data){
    return data.json();
  }).
  then(function(data){
    g.next(data);
  });
```

## 16.3 Thunk函数
**说明：**并不是`es6/es7`提供的`API`

### 16.3.1 参数的求值策略
#### 传值调用（`call by value`）
**说明：**函数被调用后，在进入函数体之前，就计算参数的表达式的值，再将这个值传入函数

+ 实现比较简单
+ 有可能造成性能损失

**采纳者举例：**`c`语言、`JavaScript`语言

#### 传名调用（`call by name`）
**说明：**直接将作为参数的表达式传入函数体，只在用到它的时候求值
**实现方式：**编译器的`传名调用`实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做`Thunk`函数。
**采纳者举例：**`Haskell`语言

### 16.3.2 Thunk 函数的含义
**说明：**`Thunk`函数是`传名调用`的一种实现策略，用来替换某个表达式。

*Demo：JS 的调用过程是传值调用，下面的例子模拟了传名调用*

*一段平淡无奇的 JS*

```javascript
var x = 4;
function f(m){
  return m * 2;
}

f(x + 5);
```

*和上面等价的传名调用过程*

```javascript
var thunk = function () {
  return x + 5;
};

function f(t){
  return t() * 2;
}
f(thunk);
```

### 16.3.3 JavaScript 语言的 Thunk 函数
**说明：**在`JavaScript`语言中，`Thunk`函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。

*Demo1: 基本应用*
*正常版本的readFile（多参数版本）*

```javascript
fs.readFile(fileName, callback);
```

*Thunk版本的readFile（单参数版本）*

```javascript
var Thunk = function (fileName){
  return function (callback){
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
```

#### 通用 Thunk 函数转换器
**说明：**任何函数，只要参数有回调函数，就可以通过这个通用的 `Thunk` 函数转换器转换为一个 `Thunk` 函数。本质上，就是一个特殊的柯里化过程。

*ES5版本*

```javascript
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};
```

*ES6版本*

```javascript
var Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
```

*应用*

```javascript
function f(a, cb) {
  cb(a);
}

// 转换为 Thunk 函数
let ft = Thunk(f);

let log = console.log.bind(console);
ft(1)(log) // 1
```

### 16.3.4 Thunkify 模块
**说明：**一个第三方的 `Thunk` 函数转换器。

#### 安装

```bash
$ npm install thunkify
```

#### 源码
**说明：**源码主要多了一个检查机制，确保返回的回调函数只运行一次

```javascript
function thunkify(fn){
  return function(){
    var args = new Array(arguments.length);
    var ctx = this;

    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function(done){
      var called;

	  // 对传入的回调函数 done 再包装一层，确保只执行一次，作为参数传入 fn
      args.push(function(){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
	    // 执行 thunk 包装的那个函数，回调函数经过了重新包装
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
```

#### 使用
*Demo1: 读取文件*

```javascript
var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  // ...
});
```

*Demo2: 演示回调只被执行一次*

```javascript
function f(a, b, callback){
  var sum = a + b;
  callback(sum);
  callback(sum);// 经过 thunkify 包装，这个回调被包装过了，只会被执行一次，因此这一次无效
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 2)(print);
// 3
```

### 16.3.5 Generator 函数的流程管理
**说明：**`Thunk`函数

```javascript
var fs = require('fs');

// 获取 Thunk 转换器
var thunkify = require('thunkify');

// 将 readFile 函数包装为 Thunk 函数
var readFile = thunkify(fs.readFile);


var gen = function* (){
  // 读取第一个文件
  var r1 = yield readFile('/etc/fstab');
  console.log(r1.toString());
  // 读取第二个文件
  var r2 = yield readFile('/etc/shells');
  console.log(r2.toString());
};

// 获取便利器
var g = gen();

// 返回新的便利器对象，value 属性的值是执行了 Thunke 函数第一阶段的返回值（仍然是一个函数），这时还没有真正开始读取文件
var r1 = g.next();

// 传入回调，进行 Thunk 函数第二阶段调用，这时开始读取文件
r1.value(function(err, data){
  if (err) throw err;

  // 重复之前的步骤...
  var r2 = g.next(data);
  r2.value(function(err, data){
    if (err) throw err;
    g.next(data);
  });
});
```

### 16.3.6 Thunk函数的自动流程管理
**说明：**如果`Generator`函数处理多个同步操作，自动流程管理就非常简单。但异步的情况就会复杂一些，必须有一种机制，自动控制`Generator`函数的流程，接收和交还程序的执行权。解决方案有两类
（1）回调函数。将异步操作包装成Thunk函数，在回调函数里面交回执行权。
（2）Promise 对象。将异步操作包装成Promise对象，用then方法交回执行权。

*Demo：异步读取文件：Thunk 函数 + Generator函数 + 递归处理*

+ `yield`命令用于将程序的执行权移出`Generator`函数
+ 在回调函数里，将执行权交还给`Generator`函数

```javascript
var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

/**
* 该方法可以递归地将 配合 Thunk 函数的 Generator函数执行分段到底
* @param{function *} 配合 Thunk 函数的 Generator函数
*/
function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;

    // 触发下一阶段的异步操作
    result.value(next);
  }
  next();
}

// 定义 Generator 函数（）
var g = function* (){
  var f1 = yield readFile('fileA');
  var f2 = yield readFile('fileB');
  // ...
  var fn = yield readFile('fileN');
};

// 自动执行 Generator 函数中的每个异步操作
run(g);
```

## 16.4 co模块
**说明：**`co`模块是著名程序员`TJ Holowaychuk`于2013年6月发布的一个小工具，用于`Generator`函数的自动执行。

### 16.4.1 基本用法
#### co函数
**说明：**`Generator`函数只要传入`co`函数，就会自动执行
**返回值：**返回一个`Promise`对象，因此可以用`then`方法添加回调函数
**注意：**`co`的前提条件是，`Generator`函数的`yield`命令后面，只能是`Thunk`函数或`Promise`对象。

```javascript
var co = require('co');

// 异步读取两个文件
var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 自动执行
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});
```

### 16.4.2 co模块的原理
**说明：**就是将两种自动执行器（`Thunk`函数和`Promise`对象），包装成一个模块。使用`co`的前提条件是，`Generator`函数的`yield`命令后面，只能是`Thunk`函数或`Promise`对象。

### 16.4.3 基于Promise对象的自动执行
**说明：**和基于`Thunk`函数的自动执行器的区别，仅仅是利用`Promist.prototype.then`替换了`回调`

*Demo：异步读取文件*

```javascript
var fs = require('fs');

// 用 promise 包转 readFile
var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

// Generator 函数
var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 自动执行器
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;

    // 触发下一阶段的异步操作
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

// 调用自动执行器执行 Generator 函数
run(gen);
```

### 16.4.3 co模块的源码

```javascript
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {

    // 先检查参数gen是否为函数，是，就执行该函数
    if (typeof gen === 'function') gen = gen.call(ctx);
    
    // 确保是 Generator 函数返回的便利器对象，否则就返回，并将Promise对象的状态改为resolved
    if (!gen --|| typeof gen.next !== 'function') return resolve(gen);--

    onFulfilled();

    // 将Generator函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    // 关键的next函数，它会反复调用自身
    function next(ret) {
      // 检查当前是否为 Generator 函数的最后一步，如果是就返回
	  if (ret.done) return resolve(ret.value);

	  // 确保每一步的返回值，是 Promise 对象
	  var value = toPromise.call(ctx, ret.value);

	  // 使用 then 方法，为返回值加上回调函数，然后通过 onFulfilled 函数再次调用 next 函数。
	  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);

	  // 在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为 rejected，从而终止执行
	  return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
	    + 'but the following object was passed: "' + String(ret.value) + '"'));
	}
  });
}
```
## 16.5 async函数
**兼容性：** `ES7`提案阶段，转码器 `Babel` 和 `regenerator` 都已经支持

### 16.5.1 含义
**说明：** `async` 函数是 `Generator` 函数的语法糖，进一步说，`async`函数完全可以看作多个异步操作，包装成的一个`Promise`对象，而`await`命令就是内部`then`命令的语法糖。

**语法：**将 `Generator` 函数的星号 `*` 替换成 `async`，将 `yield` 替换成 `await`

**相比 `Generator`函数的改进**
1. 内置执行器：`async`函数的执行，与普通函数一模一样
2. 更好的语义: `async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果
3. 更广的适用性: `co` 模块约定，`yield` 命令后面只能是 `Thunk` 函数或 `Promise` 对象，而 `async` 函数的 `await` 命令后面，可以是 `Promise` 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）
4. 返回值是 `Promise` :  `async` 函数的返回值是 `Promise` 对象，这比 `Generator` 函数的返回值是 `Iterator` 对象方便多了。你可以用 `then` 方法指定下一步的操作

#### Demo
说明：使用`Generator`异步读取文件

*Generator 版本*

```javascript
var fs = require('fs');

// 用 promise 包转 readFile
var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

// Generator 函数
var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 自动执行器
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;

    // 触发下一阶段的异步操作
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

// 调用自动执行器执行 Generator 函数
run(gen);
```

*async 版本*

```javascript
var asyncReadFile = async function (){
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

var result = asyncReadFile();
```

### 16.5.2 语法
#### 16.5.2.1 返回值
**说明：** `async` 函数返回一个 `Promise` 对象

+ `async` 函数内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数（传递给哪个回调函数取决于 `async` 返回的 `Promise` 对象的状态）
+ 必须等到内部所有 `await` 命令的 `Promise` 对象执行完，才会发生状态改变（就是说，只有 `async` 函数内部的异步操作全部执行完，才会执行 `then` 方法指定的回调函数）
+ `await` 命令后面表达式的返回值如果不是一个 `Promise` 对象，会被转成一个立即  `resolve` 的 `Promise` 对象

#### 16.5.2.2 return 
**说明：**`async` 函数内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数

```javascript
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```

#### 16.5.2.3 返回值（Promise 对象）的状态
**说明：**必须等到内部所有 `await` 命令的 `Promise` 对象执行完，才会发生状态改变
----

##### 状态为 `rejected` 的场景
**说明：**分两种情况，且两种情况都会导致整个 `async` 函数中断执行

+ `async` 函数内部抛出错误（且 `reject` 的参数会被 `catch` 方法的回调函数接收到）
+ 只要有一个 `await` 后面的运算返回的 `Promise` 状态为 `rejected`

**技巧：**这两种情况都可以通过将异常捕获来使 `async` 函数不至于中断，异常捕获方式看后面

*Demo: `async` 函数内部抛出错误*

```javascript
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```
----
##### 状态为 `resolved` 的场景

+ 所有 `await` 后面的运算返回的 `Promise` 状态为 `resolved`

*emphasized text*

```javascript
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
```

#### 16.5.2.4 错误处理
**说明：** `async` 函数的语法规则总体上比较简单，难点是错误处理机制。一共有两类错误，它们都会使 `async` 停止，并使返回的 `Promise` 状态改变为 `rejected`
1. `async` 函数内部抛出错误（且 `reject` 的参数会被 `catch` 方法的回调函数接收到）
2. 只要有一个 `await` 后面的运算返回的 `Promise` 状态为 `rejected`

**处理方式：**有两种方式来处理
1. `try...catch`:  将可能出现异常的 `await` 放在 `try...catch` 结构里面
2. `catch()`: `await` 后面的 `Promise` 对象再跟一个 `catch` 方面，处理前面可能出现的错误

**注意：**错误得到处理，则 `async` 的运行就不会被中断

*Demo1: try...catch*

```javascript
async function main() {
  try {
    var val1 = await firstStep();
    var val2 = await secondStep(val1);
    var val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
```

*Demo2: catch()*

```javascript
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```

### 16.5.3 async 函数的实现
**说明：** 用 `es5-`的方式实现 `async` 函数的功能

*es5版：通过 Generator 和自动执行函数模拟 async *

```javascript
/**
* 自动执行传入的 Generator 函数并返回 Promise 对象 的通用函数
* @param{function} genF 要执行的 Generator 函数
* @return{Promise} Promise 对象（模拟 async 函数返回的 Generator 函数）
*/
function spawn(genF) {
	return new Promise(function(resolve, reject) {
		var gen = genF();
		/**
		* 递归执行
		* @param{function} nextF 包含对便利器对象进行指针移动操作的函数
		* @return{any} return 只是为了结束函数，返回的值没有实际用途		
		*/
		function step(nextF) {
			try {
				var next = nextF();
			}
			catch(e) {
				return reject(e);
			}
			if (next.done) {
				return resolve(next.value);
			}
			// next.value Generator 函数中的 yeild 后面的表达式返回的一个 Promise 对象
			Promise.resolve(next.value).then(
				function (v) {
					step(function() {
						return gen.next(v);
					});
				},
				function (e) {
					step(function() {
						return gen.throw(e);
					});
				}
			);
		}
		
		// 开始递归执行 Generator 函数
		step(function() {
			return gen.next(undefined);
		});
	});
}

// 使用上面封装的函数定义函数，实现 async 函数的效果
function fn(args) {
	return spawn(function*() {
		// ...
	});
}

fn()
```

*es7版*

```javascript
async function fn(args){
  // ...
}
fn()
```

### 16.5.4 async 函数的用法
#### 16.5.4.1 定义 async 函数
**说明：**多重场景下定义 `async` 函数的方式

+ 函数声明
+ 函数表达式
+ 对象的方法
+ 尖头函数

```javascript
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };

// 箭头函数
const foo = async () => {};
```

#### 16.5.4.2 调用 async 函数
**运行逻辑：** `async` 函数返回一个 `Promise` 对象，可以使用 `then` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回 `Promise` 对象（但状态要等所有异步操作完成改变），等到触发的异步操作完成，再接着执行函数体内后面的语句。

```javascript
async function getStockPriceByName(name) {
  var symbol = await getStockSymbol(name);
  var stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
```

### 16.5.5 注意点
（1）最好把 `await` 命令放在 `try...catch` 代码块中或使用 `catch()`，从而保证 `async` 函数会完成所有的异步操作

*Demo1: try...catch 方式*

```javascript
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
```

*Demo2: catch() 方式*

```javascript
async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {[]
    console.log(err);
  };
}
```

（2）多个 `await` 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发（可以使用 `Promise.all()`）,缩短程序的执行时间

*Demo1: Promise.all()*

```javascript
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}
```
*Demo2: 先启动所有异步操作，再对每个 Promise 对象使用 await 监控其状态*

```javascript
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  // 启动所有异步操作
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  // await 仅仅是监控异步操作的结果
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```

（3）`await` 命令只能用在 `async` 函数之中，如果用在普通函数，就会报错

```javascript
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}
```

### 16.5.6 与 Promise、Generator 的比较
**说明：**通过一个案例进行比较
**案例：**某个 `DOM` 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值

#### Promise 实现
**优点：**比回调函数的写法大大改进
**缺点：**代码完全都是 `Promise` 的 `API`（`then` 、 `catch`等等），操作本身的语义反而不容易看出来

```javascript
function chainAnimationsPromise(elem, animations) {

  // 变量ret用来保存上一个动画的返回值
  var ret = null;

  // 新建一个空的Promise
  var p = Promise.resolve();

  // 使用then方法，添加所有动画
  for(var anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    });
  }

  // 返回一个部署了错误捕捉机制的Promise
  return p.catch(function(e) {
    /* 忽略错误，继续执行 */
  }).then(function() {
    return ret;
  });

}
```

#### Generator 实现
**优点：**语义比 `Promise` 写法更清晰
**缺点**

+ 必须有一个任务运行器，自动执行 `Generator` 函数
+ 必须保证 `yield` 语句后面的表达式，必须返回一个 `Promise`

```javascript
function chainAnimationsGenerator(elem, animations) {

  return spawn(function*() {
    var ret = null;
    try {
      for(var anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  });

}
```

#### async 实现
**优点：**实现最简洁，最符合语义

```javascript
async function chainAnimationsAsync(elem, animations) {
  var ret = null;
  try {
    for(var anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}
```

## 16.6 异步遍历器
**背景：** `Iterator`接口提供的 `next()`调用后需要同步地取得 `{value, done}`，但如果执行的是异步操作，无法同步地取得 `{value, done}`。
**目前的解决方法（以 Generator 为例）：** `Generator` 函数里面的异步操作，返回一个 `Thunk` 函数或者 `Promise` 对象，即 `value` 属性是一个 `Thunk` 函数或者 `Promise` 对象，等待以后返回真正的值，而 `done` 属性则还是同步产生的

**异步遍历器：**为异步操作提供原生的遍历器接口，即 `value` 和 `done` 这两个属性都是异步产生
**兼容性：**提案阶段

### 16.6.1 异步遍历的接口
**部署：**部署在 `Symbol.asyncIterator` 属性上
**使用：**异步便利器的 `next()` 返回一个 `Promise` 对象，可以在随后的 `then` 中提供回调获取 `value` 和 `done`

```javascript
// asyncIterator 是一个便利器对象
asyncIterator
  // 返回一个 `Promise` 对象
  .next()
  // 在随后的 `then` 中提供回调获取 `value` 和 `done`
  .then(
    ({ value, done }) => /* ... */
  );
```

### 16.6.2 for await...of
**说明：**用于遍历异步的 `Iterator` 接口

```javascript
// readLines函数返回一个异步遍历器，每次调用它的next方法，就会返回一个Promise对象。await表示等待这个Promise对象resolve，一旦完成，变量line就是Promise对象返回的value值
for await (const line of readLines(filePath)) {
  console.log(line);
}
```

### 16.6.3 异步Generator函数
**说明：**返回一个异步遍历器对象
**语法：** `async` 函数与 `Generator` 函数的结合
**注意：**普通的 `async` 函数返回的是一个 `Promise` 对象，而异步 `Generator` 函数返回的是一个异步 `Iterator` 对象。

```javascript
async function* readLines(path) {
  let file = await fileOpen(path);

  try {
    while (!file.EOF) {
	  // 异步操作前面使用await关键字标明，next方法所在的中断之处使用yield关键字标明
      yield await file.readLine();
    }
  } finally {
    await file.close();
  }
}
```

