---
title: 18 Decorator(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js
date: 2016-10-22 19:34
---

**修饰器：**一个函数，用来修改 `类` 或 `类的方法` 的行为

**兼容性：** `ES7` 提案，Babel 转码器已经支持

**说明：** 作为修饰器的函数时在编译时运行的

**扩展：** 修饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 `JavaScript` 代码静态分析的重要工具。

**推荐：** 推荐几个 Decorator 库

+ [core-decorators](https://github.com/jayphelps/core-decorators.js)

## 18.1 类的修饰
### 定义类修饰器
**说明：**用来影响被修饰的类的行为

**参数（1）：** 要修饰的类

**注意：** 使用这个修饰器时，代表被修饰的类的那个参数不需要显式传递，如果要传递其它参数，需要z爱修饰器外面再封装一层函数。



*Demo1: 为类添加一个静态属性（不传递额外的参数）*
```javascript
/**
* 作为类修饰器的函数
* @param {class} target 被修饰的类
*/
function testable(target) {
  // 为类添加一个 静态属性
  target.isTestable = true;
}

// 使用上面定义的修饰器
@testable
class MyTestableClass {}

console.log(MyTestableClass.isTestable) // true
```

*Demo2: 为类添加一个实例属性（不传递额外的参数）*
```javascript
/**
* 作为修饰器的函数
* @param {class} 被修饰的类
*/
function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
```

*Demo3: 通过修饰器实现针对 类 的 MIxin（传递额外的参数）
*mininx.js：MInxin 模块*
```javascript
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}
```

*main.js： 使用 MIxin 模块*
```javascript
// main.js
import { mixins } from './mixins'

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'
```

## 18.2 方法（类的成员）的修饰
### 18.2.1 基本
**说明：**用来影响类的成员的行为

**实参（3）：** 可以接受3个参数

| 参数         | 说明              |
| ---------- | --------------- |
| target     | 所要修饰的目标对象       |
| name       | 所要修饰的类的成员名（属性名） |
| descriptor | 该属性的描述对象        |

*Demo1: 使指定属性不可遍历*
```javascript
class Person {
  @nonenumerable
  get kidCount() { return this.children.length; }
}

/*
* 作为修饰器的函数：会使目标属性不可遍历
*/
function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}
```

*Demo2: 使目标方法打日志*
```javascript
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return oldValue.apply(null, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);
```

### 18.2.2 同时使用多个修饰器
**作用顺序：**如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

*Demo: 一个方法上应用多个修饰器*
```javascript
function dec(id){
    console.log('evaluated', id);
    return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

## 18.3 为什么修饰器不能用于函数
**说明：**修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。

**注意：**这里的函数特指通过 `函数声明` 方式定义的函数，这种函数由于存在提升，是的运行时回发生找不到应用的修饰器的情况。类不会提升，因此没有这方面的问题。

*Demo1: 统计函数的执行次数（发生提升现象导致找不到修饰器）*
```javascript
var counter = 0;

// 修饰器 
var add = function () {
  counter++;
};

// 应用
@add
function foo() {
}
```

*等价形式*
```javascript
var counter;
var add;

@add
function foo() {
}

counter = 0;

add = function () {
  counter++;
};
```

*Demo2: 使函数直读-不可被修改（发生提升现象导致找不到修饰器）*
```javascript
var readOnly = require("some-decorator");

@readOnly
function foo() {
}
```

*等价形式*
```javascript
var readOnly;

@readOnly
function foo() {
}

readOnly = require("some-decorator");
```

## 18.4 core-decorators.js
**说明：**一个第三方模块，提供了几个常见的修饰器
**GitHub：**https://github.com/jayphelps/core-decorators.js

| 常用修饰器                          | 说明                                       |
| ------------------------------ | ---------------------------------------- |
| `@autobind`                    | 使得方法中的 `this` 对象，绑定原始对象                  |
| `@readonly`                    | 使得属性或方法不可写                               |
| `@override`                    | 检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错          |
| `@deprecate`(别名 `@deprecated`) | 在控制台显示一条警告，表示该方法将废除                      |
| `@suppressWarnings`            | 抑制 `decorated` 修饰器导致的 `console.warn()` 调用。但是，异步代码发出的调用除外。 |

*Demo1: @autobind*
```javascript
import { autobind } from 'core-decorators';

class Person {
  @autobind
  getPerson() {
    return this;
  }
}

let person = new Person();
let getPerson = person.getPerson;

getPerson() === person;
// true
```
*Demo2: @readonly*
```javascript
import { readonly } from 'core-decorators';

class Meal {
  @readonly
  entree = 'steak';
}

var dinner = new Meal();
dinner.entree = 'salmon';
// Cannot assign to read only property 'entree' of [object Object]
```
*Demo3: @override*
```javascript
import { override } from 'core-decorators';

class Parent {
  speak(first, second) {}
}

class Child extends Parent {
  @override
  speak() {}
  // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
}

// or

class Child extends Parent {
  @override
  speaks() {}
  // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
  //
  //   Did you mean "speak"?
}
```
*Demo4: @deprecate*
```javascript
import { deprecate } from 'core-decorators';

class Person {
  @deprecate
  facepalm() {}

  @deprecate('We stopped facepalming')
  facepalmHard() {}

  @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
  facepalmHarder() {}
}

let person = new Person();

person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.

person.facepalmHard();
// DEPRECATION Person#facepalmHard: We stopped facepalming

person.facepalmHarder();
// DEPRECATION Person#facepalmHarder: We stopped facepalming
//
//     See http://knowyourmeme.com/memes/facepalm for more details.
//
```
*Demo5: @suppressWarnings*
```javascript
import { suppressWarnings } from 'core-decorators';

class Person {
  @deprecated
  facepalm() {}

  @suppressWarnings
  facepalmWithoutWarning() {
    this.facepalm();
  }
}

let person = new Person();

person.facepalmWithoutWarning();
// no warning is logged
```

## 18.5 使用修饰器实现自动发布事件
**说明：**定义一个修饰器，被这个修饰器修饰的方法被调用时会自动发出一个事件。

*publish.js：定义修饰器模块*
```javascript
import postal from "postal/lib/postal.lodash";

/**
* 使方法自动发送事件的修饰器
* @param {string} topic 事件要包含的数据
* @param {string} channel 发送到哪个频道
*/
export default function publish(topic, channel) {
  return function(target, name, descriptor) {
    const fn = descriptor.value;

	// 用封装后的方法替换掉原来的方法
    descriptor.value = function() {
      let value = fn.apply(this, arguments);
      // 发送事件
      postal.channel(channel || target.channel || "/").publish(topic, value);
    };
  };
}
```

*main.js：应用修饰器模块*
```javascript
import publish from "path/to/decorators/publish";

class FooComponent {
  @publish("foo.some.message", "component")
  someMethod() {
    return {
      my: "data"
    };
  }
  @publish("foo.some.other")
  anotherMethod() {
    // ...
  }
}

let foo = new FooComponent();

foo.someMethod() // 在"component"频道发布"foo.some.message"事件，附带的数据是{ my: "data" }
foo.anotherMethod() // 在"/"频道发布"foo.some.other"事件，不附带数据

```

## 18.6 Mixin
`这本书之前的章节中已经出现了两次 Mixin 了，核心实现要么是 Object.assign ，要么是 Object.defineProperty ，这次则是进一步通过修饰器封装，作者对 Mixin 是真爱啊！`

**Mixin模式：**就是对象继承的一种替代方案，中文译为 `混入（mix in）`，意为在一个对象之中混入另外一个对象的方法。
**说明：**在修饰器的基础上，可以实现 `Mixin` 模式。下面给出两种形式
1. 基于修饰器
2. 基于类的继承机制

### 18.6.1 基于修饰器
**说明：**核心是通过 `Object.assign` ，将要混入方法的引用赋值给目标类的 `prototype`
**缺点：**这种混入方式修改了目标类的 `prototype` ，侵入性强，同名方法会被覆盖

*Demo: 针对目标类混入一个方法*
*mixins.js：定义修饰器，该修饰器具备将一个对象的所有属性混入到另一个对象（包括类）的能力*
```javascript
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}
```
*min.js: 使用修饰器混入一个方法*
```javascript
import { mixins } from './mixins';

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // "foo"
```

### 18.6.2 基于继承机制
**说明：**其实就是在原定的继承链中插入一个类
**比之修饰器：**有两个好处
1. 不会修改子类的 `prototype`
2. 子类可以通过 `super` 调用父类方法，父类方法即使被屏蔽也还能访问到

*Demo1: 混入一个函数*
```javascript
/*
* 返回一个继承了制定类的新类
*/
let MyMixin = (superclass) => class extends superclass {
  foo() {
    console.log('foo from MyMixin');
  }
};

// 继承过程中使用混入
class MyClass extends MyMixin(MyBaseClass) {
  /* ... */
}

let c = new MyClass();
c.foo(); // "foo from MyMixin"
```

*Demo2: 多次混入*
```javascript
let Mixin1 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin1');
    if (super.foo) super.foo();
  }
};

let Mixin2 = (superclass) => class extends superclass {
  foo() {
    console.log('foo from Mixin2');
    if (super.foo) super.foo();
  }
};

class S {
  foo() {
    console.log('foo from S');
  }
}

class C extends Mixin1(Mixin2(S)) {
  foo() {
    console.log('foo from C');
    super.foo();
  }
}

new C().foo()
// foo from C
// foo from Mixin1
// foo from Mixin2
// foo from S
```

## 18.7 Trait
**说明：**一种修饰器，效果与 `Mixin` 类似，但是提供更多功能，比如
+ 防止同名方法的冲突
+ 排除混入某些方法（`excludes`）
+ 为混入的方法起别名等等（`alias`）

**第三方实现：** [traits-decorator](https://github.com/CocktailJS/traits-decorator)

*Demo1: 混入 TFoo 和 TBar 到 MyClass （traits-decorator）*
```javascript
import { traits } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') }
};

// 将 TFoo 和 TBar 的成员混入到 MyClass
@traits(TFoo, TBar)
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar
```

*Demo2: 混入同名方法导致抱错（traits-decorator）*
```javascript
import { traits } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};

@traits(TFoo, TBar)
class MyClass { }
// 报错
// throw new Error('Method named: ' + methodName + ' is defined twice.');
//        ^
// Error: Method named: foo is defined twice.
```

*Demo3: 混入时排除TBar的foo方法，避免抱错（traits-decorator）*
```javascript
import { traits, excludes } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};

// 使用绑定运算符（::）在TBar上排除foo方法，混入时就不会报错了
@traits(TFoo, TBar::excludes('foo'))
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.bar() // bar
```

*Demo4: 混入时为 TBar 的 foo 方法起别名，避免抱错（traits-decorator）*
```javascript
import { traits, alias } from 'traits-decorator';

class TFoo {
  foo() { console.log('foo') }
}

const TBar = {
  bar() { console.log('bar') },
  foo() { console.log('foo') }
};

@traits(TFoo, TBar::alias({foo: 'aliasFoo'}))
class MyClass { }

let obj = new MyClass();
obj.foo() // foo
obj.aliasFoo() // foo
obj.bar() // bar
```

*Demo5: alias 和 excludes 可以链式使用*
```javascript
// 排除了TExample的foo方法和bar方法，为baz方法起了别名exampleBaz
@traits(TExample::excludes('foo','bar')::alias({baz:'exampleBaz'}))
class MyClass {
}
```

*Demo6: as 方法*
```javascript
@traits(TExample::as({excludes:['foo', 'bar'], alias: {baz: 'exampleBaz'}}))
class MyClass {
}
```

## 18.8 Babel 转码器的支持
**扩展：**Babel的官方网站提供一个[在线转码器](https://babeljs.io/repl/)，只要勾选Experimental，就能支持Decorator的在线转码。

### 18.8.1 使 Babel 转码器支持 Decorator
（1） 安装依赖
**说明：** 要使 `babel` 支持 `Decorator`，需要额外满足以下条件之一
+ 额外安装 `babel-plugin-transform-decorators`
+ 安装 `babel-preset-stage-0`


```bash
$ npm install babel-core babel-plugin-transform-decorators
```

（2） 配置文件
*.babelrc*
```javascript
{
  "plugins": ["transform-decorators"]
}
```

### 18.8.2 脚本中使用 babel 转码器
```javascript
babel.transform("code", {plugins: ["transform-decorators"]})
```


