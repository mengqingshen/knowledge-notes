---
title: 2 let和const命令(ECMAScript6入门)
categories: [ECMAScript6入门]
toc: true
tag:
  - es6
  - js
date: 2016-06-19 17:31
---

# 1 let命令
用来声明变量

+ 只在声明时所在的`代码块`内有效

```javascript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

+ for循环

```javascript
var a = [];
// 每一次循环的 i 其实都是一个新的变量
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

+ 不存在变量提升

```javascript
// 变量一定要在声明后使用，否则报错。
console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError

var foo = 2;
let bar = 2;
```

+ 暂时性死区
**说明：**在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为`暂时性死区（temporal dead zone，简称TDZ）`。
**注意：**`暂时性死区`也意味着`typeof`不再是一个百分之百安全的操作。

```javascript
typeof x; // ReferenceError
let x;
```

+ 不允许重复声明
**说明：**`let`不允许在相同作用域内，重复声明同一个变量。
**注意：**不能在函数内部重新用`let`声明参数

```javascript
function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```

# 2 块级作用域
**说明：**`let`实际上为JavaScript新增了块级作用域。
**注意：**块级作用域的出现，实际上使得获得广泛应用的`立即执行匿名函数`（IIFE）不再必要了。

```javascript
// IIFE写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```


## 2.1 块级作用域与函数声明

**说明：**ES6引入了块级作用域，明确允许在块级作用域之中声明函数。
**注意：**ES6的块级作用域允许声明函数的规则，只在使用`{}`的情况下成立，如果没有使用`{}`，就会报错

环境|在块级作用域中声明函数|声明提升
-|-|-
标准ES5环境|不可以|会
标准ES6环境|可以|不会
浏览器ES5环境|可以|会
浏览器ES6环境|可以|会

**技巧：**考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
```javascript
function f() {
  console.log('I am outside!');
}

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

# 3 const命令
**说明：**const声明一个只读的常量
**注意：**将一个对象声明为常量必须非常小心
**扩展：**如果真的想将对象冻结，应该使用`Object.freeze`方法
```javascript
var constantize = (obj) ={
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) ={
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

+ const一旦声明变量，就必须立即初始化，不能留到以后赋值
+ 一旦声明，常量的值就不能改变
+ 只在声明所在的块级作用域内有效（类似`let`）
+ 不可以重复声明（类似`let`）
+ 不会发生声明提升（类似`let`）
+ 存在暂时性死区（类似`let`）
+ `const`命令只是保证变量名指向的地址不变，并不保证该地址的数据不变

```javascript
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

# 4 全局对象的属性
未声明的全局变量，自动成为全局对象`window`的属性，这被认为是`JavaScript`语言最大的设计败笔之一，ES6改变了这一点：
+ `var`命令和`function`命令声明的全局变量，依旧是全局对象的属性
+ `let`命令、`const`命令、`class`命令声明的全局变量，不属于全局对象的属性（从ES6开始，全局变量将逐步与全局对象的属性脱钩）

```javascript
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```