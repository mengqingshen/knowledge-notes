---
title: 1 ECMAScript 6 简介(ECMAScript6入门)
categories: [ECMAScript6入门]
toc: true
tag:
  - es6
  - js
date: 2016-06-19 13:13
---

# 1 ECMAScript和JavaScript的关系

# 2 ECMAScript的历史

# 3 部署进度

## 3.1 浏览器兼容性
各大浏览器对 `ES6`的支持情况：http://kangax.github.io/compat-table/es6/

## 3.2 ES6环境搭建

### 3.2.1 NPM
Github：https://github.com/creationix/nvm

```bash
# 安装 nvm（安装后需要重启 Terminal）
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash

# 激活 nvm
$ source ~/.nvm/nvm.sh 

# 列举所有可安装的版本
$ nvm ls-remote

# 安装 v6.2.2（目前最新版），`nvm install node`默认也是最新版
$ nvm install v6.2.2

# 切换为 v6.2.2 版本
$ nvm use v6.2.2

# 查看当前 node 实现的 ES6特性
$ node --v8-options | grep harmony
```

### 3.2.2 查看环境对 ES6 的支持度

**浏览器环境**：直接访问http://ruanyf.github.io/es-checker/

**node环境**：安装`ES-Checker`的 node版

```bash
$ npm install -g es-checker
$ es-checker
```

# 4 Babel转码器
## 4.1 安装转码器

```bash
$ npm install --save-dev babel-preset-es2015
$ npm install --save-dev babel-preset-react
$ npm install --save-dev babel-preset-stage-3
```

## 4.2 配置转码规则
 **注意：**所有`Babel`工具和模块都依赖`.babelrc`配置文件

```bash
# 在项目根目录编写 babel 配置文件
$ vim .babelrc
```

```bash
{
	"presets": [
		"es2015",
		"react",
		"stage-3"
	]
}
```

## 4.3 命令行工具

### 4.3.1 将 es6 脚本编译为 es5 版本

*编译前(example.js)*

```javascript
let input = [0, 1, 2, 3, 4, 5];
input.map(item => item + 1);
```

*使用命令行工具编译*

```bash
$ babel example.js 
```

```javascript
"use strict";

var input = [0, 1, 2, 3, 4, 5];
input.map(function (item) {
  return item + 1;
});
```

### 4.3.2 `babel-node`命令
 类似`node`，存在两种模式：`REPL`和`直接运行文件`

```bash
# 进入 REPL 模式
$ babel-node
 (x => x + 2)(1)
 3
```

```bash
$ babel-node example.js 
```

### 4.3.3 `babel-register`模块

 **说明：**babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
 **注意：**只适合开发环境中使用

+ 不属于`babel-cli`，需要单独安装
+ 必需先加载`babel-register`
+ 支持的文件后缀 `.js` `jsx` `.es` `.es6`

*index.js*

```javascript
// 先加载 babel-register，后面的才能自动转换
require("babel-register");

require("./example.js");
```

### 4.3.4 `babel-core`

基本使用

```javascript
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```
例子

```javascript
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
```

### 4.3.5 `babel-polyfill`

 **说明：**`Babel`默认只转换新的`JavaScript`句法（syntax），而不转换新的`API`。除非使用`babel-polyfill`。
 **注意：**`Babel`默认不转码的`API`非常多，详细清单可以查看`babel-plugin-transform-runtime`。

安装到当前环境

```javascript
$ npm install --save babel-polyfill
```

引入`babel-polyfill`

```javascript
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```

### 4.3.6 浏览器环境

****
#### 实时转换

1. 获取`babel`的浏览器版本

```bash
# node_modules/babel-core/browser.js
$ npm install babel-core@5
```
2. 在页面中使用（需要注明`type="text/babel"`）

```vbscript-html
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
	let input = [0, 1, 2, 3, 4, 5];
	input.map(item => item + 1);
</script>
```
****
####  打包为生产环境的代码
 **说明：**配合`browserify`使用
 **注意：**生产环境需要加载已经转码完成的脚本。

```bash
$ npm install browserify -g
$ npm install --save-dev babelify babel-preset-es2015

$ browserify es6.js -o bundle.js -t [ babelify --presets [ es2015 ] ]
```

### 4.3.7 在线转换
https://babeljs.io/repl/

### 4.3.8 与其它工具的配合

#### 4.3.8.1 ESLint

 用于静态检查代码的语法和风格

1. 安装 ESLint

```bash
$ npm install --save-dev eslint babel-eslint
```
2. 配置`.eslintrc`

```bash
{
  "parser": "babel-eslint",
  "rules": {
    ...
  }
}
```
3. 配置`.package.json`

```bash
{
  "name": "my-module",
  "scripts": {
    "lint": "eslint my-files.js"
  },
  "devDependencies": {
    "babel-eslint": "...",
    "eslint": "..."
  }
}
```
#### 4.3.8.2 Mocha
 一个测试框架，如果需要执行使用ES6语法的测试脚本，可以修改`package.json`的`scripts.test`。

```bash
"scripts": {
  "test": "mocha --ui qunit --compilers js:babel-core/register"
}
```

# 5 Traceur转码器

# 6 ECMAScript 7 

