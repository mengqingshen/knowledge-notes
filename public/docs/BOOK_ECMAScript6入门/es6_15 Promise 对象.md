---
title: 15 Promise 对象(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js
date: 2016-10-09 20:42
---

## 15.1 Promise的含义
**说明：**`Promise`是`异步编程`的一种解决方案，比传统的解决方案——回调函数和事件，更合理和更强大
**缺点：**

+ 一旦新建它就会立即执行，无法中途取消
+ 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部
+ 当处于`Pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

**扩展：**如果某些事件不断地反复发生，一般来说，使用`stream模式`是比`部署Promise`更好的选择

### Promise对象
**说明：**代表一个异步操作，有3个状态

+ `Pending`：进行中
+ `Resolved`: 已完成
+ `Regected`: 已失败

**特点：**两个特点

+ 对象的状态不受外界影响
+ 一旦状态改变，就不会再变，任何时候都可以得到这个结果

## 15.2 基本用法
### Promise 构造函数
**说明：**`Promise`作为一个构造函数，用来生成`Promise`实例

参数|类型|说明|必需
---|---|---|---
`resolver`|`function`|该函数作为异步操作的处理函数|是

**参数解释：**`resolver`被调用时会传两个参数进来，它们都是函数

+ `resolver`函数: 调用该函数，将`Promise`对象的状态从“未完成”(`Pending`)变为“成功”(`Resolved`)，在异步操作成功时调用，并将`异步操作的结果`，作为参数传递出去
+ `reject`函数：调用该函数，将`Promise`对象的状态从“未完成”(`Pending`)变为“失败”(`Rejected`)，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

### Promise.prototype.then()
**说明：**可以用`then`方法分别指定`Resolved`状态和`Reject`状态的回调函数

*Demo1: 用`Promise`对象实现的`Ajax`操作*

```javascript
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

## 15.3 Promise.prototype.then()
**说明：**为`Promise`实例添加状态改变时的回调函数

参数|类型|说明|必需
---|---|---|---
1|`function`|`Resolved`状态的回调函数|否
2|`function`|是`Rejected`状态的回调函数|否

**返回值：**一个新的`Promise`实例（注意，不是原来那个`Promise`实例）

```javascript
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("Resolved: ", comments),
  err => console.log("Rejected: ", err)
);
```

## 15.4 Promise.prototype.catch()
**说明：**用于指定发生错误时的回调函数，相当于`then`只提供`rejected`状态的回调（`Promise.prototype.then(null, rejection)`）

+ 如果`Promise`状态已经变成`Resolved`，再抛出错误是无效的
+ `Promise`对象的错误具有`冒泡`性质，会一直向后传递（所以链式调用中，位置靠后报错不会被位置靠前的 `catch` 捕获），直到被捕获为止
+ 跟传统的`try/catch`代码块不同的是，如果没有使用`catch`方法指定错误处理的回调函数，`Promise`对象抛出的错误不会传递到外层代码，即不会有任何反应（Chrome浏览器不遵守这条规定，它会抛出错误“ReferenceError: x is not defined”。）

+ `catch`方法之中，还能再抛出错误，如果后面还有`catch`，可以被捕获

参数|类型|说明|必需
---|---|---|---
1|`function`|发生错误时的回调函数|是

**返回值：**一个新的 `promise` 对象
**建议：**一般来说，不要在`then`方法里面定义`Reject`状态的回调函数（即`then`的第二个参数），总是使用`catch`方法

*Demo1: 基本使用*

```javascript
// getJSON方法返回一个Promise对象
// 如果该对象状态变为Resolved，则会调用then方法指定的回调函数(then方法指定的回调函数，如果运行中抛出错误，也会被后面的catch方法捕获)
// 如果异步操作抛出错误，状态就会变为Rejected，就会调用catch方法指定的回调函数，处理这个错误
getJSON("/posts.json")
  .then(function(posts) {
    // ...
  })
  .catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
  });
```

*Demo2: 调用 reject 等同于抛出错误*

```javascript
// 写法一：通过 throw 抛出错误，触发 catch
var promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二: 调用 reject() 触发 catch 
var promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```

*Demo3: Promise对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止*

```javascript
getJSON("/post/1.json")
  .then(function(post) {
    return getJSON(post.commentURL);
  })
  .then(function(comments) {
    // some code
  }).catch(function(error) {
    // 处理前面三个Promise产生的错误
  });
```

*Demo4: catch 中也可以跑出错误*

```javascript
var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
```

## 15.5 Promise.all()
**说明：**用于将多个`Promise`实例，包装成一个新的`Promise`实例，新的`Promise`实例的状态和原本的一批`Promise`实例的状态之间的关系是

+ 只有原本的一批`Promise`实例的状态都变成`fulfilled`，新的`Promise`实例的状态才会变成`fulfilled`，此时原本的一批`Promise`实例的返回值组成一个数组，传递给p的回调函数
+ 只要原本的一批`Promise`实例之中有一个被`rejected`，新的`Promise`实例的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给新的`Promise`实例的回调函数

参数|类型|说明|必需
---|---|---|---
1|`Iterator`|必须具有`Iterator`接口，且返回的每个成员都是`Promise`实例(如果不是，就会先调用`Promise.resolve`方法，将参数转为`Promise`实例)|是

**返回值：**一个新的`Promise`实例

*Demo1: 基本使用*

```javascript
// 生成一个Promise对象的数组
var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON("/post/" + id + ".json");
});

Promise.all(promises)
  .then(function (posts) {
    // ...
  })
  .catch(function(reason){
    // ...
  });
```

*Demo2: 两个异步操作*

```javascript
const databasePromise = connectDatabase();

const booksPromise = databaseProimse
  .then(findAllBooks);

const userPromise = databasePromise
  .then(getCurrentUser);

Promise.all([
  booksPromise,
  userPromise
])
.then(([books, user]) => pickTopRecommentations(books, user));
```

## 15.6 Promise.race()
**说明：**用于将多个`Promise`实例，包装成一个新的`Promise`实例，新的`Promise`实例的状态和原本的一批`Promise`实例的状态之间的关系是

+ 只要原本的一批`Promise`实例之中有一个实例率先改变状态，新的`Promise`实例的状态就跟着改变。那个率先改变的`Promise`实例的返回值，就传递给新的`Promise`实例的回调函数

**参数：**和`Promise.all()`完全一致

*Demo: 如果指定时间内没有获得结果，就将Promise的状态变为reject，否则变为resolve*

```javascript
var p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])
p.then(response => console.log(response))
p.catch(error => console.log(error))
```

## 15.7 Promise.resolve()
**说明：**将现有对象转为`Promise`对象(状态不一定就是`resolved`)
**技巧：**如果希望得到一个`Promise`对象，比较方便的方法就是直接调用`Promise.resolve`方法

参数|类型|说明|必需
---|---|---|---
1|`[Promise/thenable/普通object或基本类型]`|参数分成四种情况，下面详细讨论|否

情形|参数说明|`Promise.resolve()`行为
---|---|---
1)|`Promise`实例|原封不动地返回这个实例
2)|`thenable`对象(具有`then`方法的对象)|将这个对象转为`Promise`对象
3)|普通`object`或基本类型|返回一个新的Promise对象，状态为`Resolved`，并将该参数传递
4)|没有参数|直接返回一个`Resolved`状态的`Promise`对象

**注意：**情形`3)`和`4)`中，状态的改变（变为`Resolved`）发生在本轮`时间循环`结束时

*Demo1: 基本使用*

```javascript
Promise.resolve('foo')
// 等价于
// new Promise(resolve => resolve('foo'))
```

*Demo2 情形2*

```javascript
/**
* 一个thenable对象
*/
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);

p1.then(function(value) {
  console.log(value);  // 42
});
```

*Demo3: 情形3*

```javascript
var p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```

*Demo4: 情形4*

```javascript
// 插入到下一轮事件循环的开头
setTimeout(function () {
  console.log('three');
}, 0);

// 放入放到当前事件循环的末尾
Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

## 15.8 Promise.reject()
**说明：**也会返回一个新的 `Promise`实例，该实例的状态为`rejected`
**参数：**和`Promise.resolved()`完全一致

```javascript
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s){
  console.log(s)
});
// 出错了
```

## 15.9 两个有用的附加方法
**说明：**不是`Promise API`提供的方法，需要自己部署

### done()
**说明：**总是处于回调链的尾端，保证抛出任何可能出现的错误
**参数：**和`Promise.prototype.then()`完全一致

*部署*

```javascript
Promise.prototype.done = function (onFulfilled, onRejected) {
  this
    .then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0);
    });
};
```

*使用*

```javascript
asyncFunc()
  .then(f1)
  .catch(r1)
  .then(f2)
  .done();
```

### finally()
**说明：**总是处于回调链的尾端，用于指定不管`Promise`对象最后状态如何，都会执行的操作

参数|类型|说明|必需
---|---|---|---
1|`function`|该函数不管怎样都必须执行|是


*部署*

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

*使用：服务器使用Promise处理请求，然后使用finally方法关掉服务器*

```javascript
server.listen(0)
  .then(function () {
    // run test
  })
  .finally(server.stop);
```

## 15.10 应用
### 加载图片

```javascript
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

### Generator函数与Promise的结合

```javascript
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

var g = function* () {
  try {
    var foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  var it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

```

