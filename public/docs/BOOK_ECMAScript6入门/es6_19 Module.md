---
title: 19 Module(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js
date: 2016-09-19 19:14
---

**说明：**`ES6`模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量

+ 不再需要`UMD`模块格式了，将来服务器和浏览器都会支持`ES6`模块格式。目前，通过各种工具库，其实已经做到了这一点。
+ 将来浏览器的新API就能用模块格式提供，不再必要做成全局变量或者navigator对象的属性。
+ 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。


| 两个命令     | 说明          |
| -------- | ----------- |
| `export` | 规定模块的对外接口   |
| `import` | 引入其他模块提供的功能 |

**适用比较：**

| 模块加载方案     | 说明               |
| ---------- | ---------------- |
| CommonJS   | 用于服务器            |
| AMD        | 用于浏览器            |
| es6 module | 浏览器和服务器通用的模块解决方案 |

**注意：**`Node`的默认模块格式是`CommonJS`，目前还没决定怎么支持`ES6`模块。所以，只能通过`Babel`这样的转码器，在`Node`里面使用`ES6`模块。

*script*

```javascript
<script type="module" src="foo.js"></script>
```

*import*

```javascript
// ES6模块
import { stat, exists, readFile } from 'fs';
```

# 1 严格模式 
**说明：**`ES6`的模块自动采用严格模式，不管你有没有在模块头部加上`use strict`;

+ 变量必须声明后再使用
+ 函数的参数不能有同名属性，否则报错
+ 不能使用`with`语句
+ 不能对只读属性赋值，否则报错
+ 不能使用前缀0表示八进制数，否则报错
+ 不能删除不可删除的属性，否则报错
+ 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
+ `eval`不会在它的外层作用域引入变量
+ `eval`和`arguments`不能被重新赋值
+ `arguments`不会自动反映函数参数的变化
+ 不能使用`arguments.callee`
+ 不能使用`arguments.caller`
+ 禁止`this`指向全局对象
+ 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
+ 增加了保留字（比如`protected、static`和`interface`）

# 2 export命令
**说明：**一个模块就是一个独立的文件。该`文件内部的所有变量，外部无法获取`。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量

## 2.1 简单使用
**变量**
*必须是声明表达式*

```javascript
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

**字面量**（推荐）
*类似对象属性的简写方式，不同点在于可以使用 `as` 重命名对外接口*

```javascript
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

/* 使用 as 重命名对外接口 */
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

**函数或类**

```javascript
export function multiply(x, y) {
  return x * y;
};
```

## 2.2 注意点

+ `export`命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系
  *错误写法*

```javascript
// 报错
export 1;

// 报错
var m = 1;
export m;
```

*正确写法*

```javascript
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};
```

+ `export`语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值


```javascript
export var foo = 'bar';

// 上面代码输出变量foo，从外不访问，值为'bar'，500毫秒之后变成'baz'
setTimeout(() => foo = 'baz', 500);
```

+ `export`命令可以出现在模块的任何位置，只要处于模块顶层就可以(如果处于块级作用域内，就会报错)

```javascript
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

# 3 import命令
**说明：**使用`export`命令定义了模块的对外接口以后，其他JS文件就可以通过`import`命令加载这个模块（文件）

## 3.1 基本使用
**说明：**`import`命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名

+ 大括号里面的变量名，必须与被导入模块对外接口的名称相同
+ 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名
+ `import`命令具有提升效果，会提升到整个模块的头部，首先执行
+ 如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起（不推荐，可读性不好）

**扩展：**ES7有一个[提案](https://github.com/leebyron/ecmascript-more-export-from)，简化先输入后输出的写法，拿掉输出时的大括号
**技巧：**`import`语句会执行所加载的模块，可以只执行不输入

```javascript
/* 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名 */
import { lastName as surname } from './profile';


/* 如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起（不推荐，可读性不好）*/
export { es6 as default } from './someModule';
// 等同于
// import { es6 } from './someModule';
// export default es6;

/* es7提案：简化先输入后输出的写法，拿掉输出时的大括号 */
export v from 'mod';// 提案的写法
// 等同于
// export {v} from 'mod';

/* `import`语句会执行所加载的模块，可以只执行不输入 */
import 'lodash';
```

# 4 模块的整体加载
**说明：**除了指定加载某个输出值，还可以使用整体加载，即用星号`*`指定一个对象，所有输出值都加载在这个对象上面。

```javascript
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

# 5 export default 命令
**用途：**为模块指定默认输出

+ 可以在一条`import`语句中，同时输入默认方法和其他变量
+ 因为`export default`命令其实只是输出一个叫做`default`的变量，所以它后面不能跟变量声明语句
+ 一个模块只能有一个默认输出，因此`export deault`命令只能使用一次

**原理：**本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字

```javascript
/* 本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字 */
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

/* 可以在一条`import`语句中，同时输入默认方法和其他变量 */
import customName, { otherMethod } from './export-default';

/* 如果要输出默认的值，只需将值跟在export default之后即可 */
export default 42;
```
# 6 模块的继承
**说明：**模块之间也可以继承
**注意：**`export *`命令会忽略`circle`模块的`default`方法

```javascript
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}
```
# 7 ES6模块加载的实质
**说明：**`ES6`模块的运行机制与`CommonJS`不一样，它遇到模块加载命令`import`时，不会去执行模块，而是只生成一个动态的只读引用。因此，`ES6`模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

+ `ES6`输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错（但如果变量是对象，可以修改添加其内容，类似`const`）
+ 不同的脚本加载同一个模块，得到的都是同样的实例

# 8 循环加载
**说明：**对于`JavaScript`语言来说，目前最常见的两种模块格式`CommonJS`和`ES6`，处理“循环加载”的方法是不一样的，返回的结果也不一样。
## 8.1 CommonJS模块的加载原理
**说明：**`CommonJS`模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

## 8.2 CommonJS模块的循环加载
**说明：**`CommonJS`模块的重要特性是加载时执行，即脚本代码在`require`的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

## 8.3 ES6模块的循环加载
**说明：**`ES6`模块是动态引用，如果使用`import`从一个模块加载变量（即`import foo from 'foo'）`，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。


# 9 跨模块常量
**说明：**其实就是将普通的`const`常量封装到一个公共模块，暴露给其它模块来使用。

```javascript
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

# 10 ES6模块的转码

## 10.1 ES6 module transpiler
**说明：**`ES6 module transpiler`是`square`公司开源的一个转码器，可以将`ES6`模块转为`CommonJS`模块或`AMD`模块的写法，从而在浏览器中使用。

| 参数   | 说明        |
| ---- | --------- |
| -o   | 指定转码后的文件名 |

```bash
# 安装
$ npm install -g es6-module-transpiler

# 转码（案例一）
$ compile-modules convert file1.js file2.js

# 转码（案例二）
$ compile-modules convert -o out.js file1.js
```

## 10.2 SystemJS
**用途：**一个垫片库（`polyfill`），可以在浏览器内加载`ES6`模块、`AMD`模块和`CommonJS`模块，将其转为`ES5`格式
**说明：**它在后台调用的是`Google`的`Traceur`转码器

*app/es6-file.js：定义模块*

```javascript
export class q {
  constructor() {
    this.es6 = 'hello';
  }
}
```

*引用&使用模块*

```javascript
<script src="app/es6-file.js"></script>
<script>
System.import('app/es6-file').then(function(m) {
  console.log(new m.q().es6); // hello
});

</script>
```


