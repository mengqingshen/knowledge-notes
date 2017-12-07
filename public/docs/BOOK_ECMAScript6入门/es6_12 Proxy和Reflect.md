---
title: 12 Proxy和Reflect(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js
toc: true
date: 2016-10-06 20:49
---

## 12.1 Proxy概述
**说明：**在目标对象之前架设一层`拦截`，外界对该`对象`或`函数`的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
**注意：**要使得Proxy起作用，必须针对`Proxy实例`进行操作，而不是针对目标对象进行操作。

### Proxy构造函数
`new Proxy(target, handler)`

参数|类型|说明
-|-|-
`target`|object|表示所要拦截的目标对象
`handler`|object|用来定制拦截行为
**说明：**`ES6`原生提供`Proxy构造函数`，用来生成`Proxy实例`
+ 如果 `handler` 没有设置任何拦截（空对象`{}`），那就等同于直接通向原对象
+ `Proxy` 实例也可以作为其他对象的原型对象（只有沿着原型链遍历到该`proptotype`的时候，拦截才会生效）
+ 同一个拦截器函数，可以设置拦截多个操作（`get`、`apply`、`construct`等），对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果

```javascript
var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1
new fproxy(1,2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo // "Hello, foo"
```

序号|`Proxy`支持的拦截操作一览(13个)|说明|适用target类型
-|-|-|-
1|`get(target, propKey, receiver)`|拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`|`object`、`function`
2|`set(target, propKey, value, receiver)`|拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值|`object`、`function`
3|`has(target, propKey)`|拦截`propKey in proxy`的操作，以及对象的`hasOwnProperty`方法，返回一个布尔值|`object`、`function`
4|`deleteProperty(target, propKey)`|拦截`delete proxy[propKey]`的操作，返回一个布尔值|`object`、`function`
5|`ownKeys(target)`|拦截`Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)`，返回一个数组|`object`、`function`
6|`getOwnPropertyDescriptor(target, propKey)`|拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象|`object`、`function`
7|`defineProperty(target, propKey, propDesc)`|拦截`Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)`，返回一个布尔值|`object`、`function`
8|`preventExtensions(target)`|拦截`Object.preventExtensions(proxy)`，返回一个布尔值|`object`、`function`
9|`getPrototypeOf(target)`|拦截`Object.getPrototypeOf(proxy)`，返回一个对象|`object`、`function`
10|`isExtensible(target)`|拦截`Object.isExtensible(proxy)`，返回一个布尔值|`object`、`function`
11|`setPrototypeOf(target, proto)`|拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值|`object`、`function`
12|`apply(target, object, args)`|拦截`Proxy实例`作为函数调用的操作，比如`proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)`。|`function`
13|`construct(target, args)`|拦截Proxy实例作为构造函数调用的操作，比如`new proxy(...args)`|`function`


## 12.2 Proxy实例的方法
**说明：**拦截操作详细介绍

### 12.2.1 get(target, propKey, receiver)
**功能：**拦截对象属性的读取
+ 可以继承（比如，如果拦截操作定义在`Prototype`对象上面，所以如果读取对象继承的属性时，拦截会生效）

*Demo1：可以继承*
```javascript
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET '+propertyKey);
    return target[propertyKey];
  }
});

// 以 proxy 示例作为 protorype
let obj = Object.create(proto);
obj.xxx // "GET xxx"
```

*Demo2：实现数组读取负数的索引*

```javascript
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
arr[-1] // c
```

*Demo3：实现函数的链式操作*
不同于原书的例子，这里没有使用立即执行函数进行包裹，才疏学浅，没看出来这里用立即执行函数包裹下会有啥价值...
```javascript
/* 封装管道操作 */
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

/* 定义三个要被链式调用的箭头函数 */
var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

/* 对上面三个箭头函数进行链式调用 */
pipe(3).double.pow.reverseInt.get; // 63
// （1）pipe(3):创建好 proxy 并返回
// （2）pipe(3).double.pow.reverseInt：依次将三个箭头函数存储到活动对象中的 funcStack，每次都会返回 proxy
// （3）pipe(3).double.pow.reverseInt.get：通过数组的 reduce 完成对 funcStack 中的函数的链式调用
```

*Demo4：实现一个生成各种DOM节点的通用函数*
```javascript
/**
 * 生成各种 dom 节点的通用函数
 */
const dom = new Proxy({}, {
	get(target, property) {
		/**
		 * 创建 dom 节点
		 * @param  {Object}    attrs    节点的属性
		 * @param  {...Array} children  子节点
		 * @return {HTMLElement}   新创建的节点
		 */
		return function(attrs = {}, ...children) {
			// 创建节点
			const el = document.createElement(property);
			// 依次节点属性
			for (let prop of Object.keys(attrs)) {
				el.setAttribute(prop, attrs[prop]);
			}
			// 依次添加子节点
			for (let child of children) {
				if (typeof child === 'string') {
					child = document.createTextNode(child);
				}
				el.appendChild(child);
			}
			return el;
		}
	}
});

// 创建节点
const el = dom.div({},
	'Hello, my name is ',
	dom.a({ href: '//example.com' }, 'Mark'),
	'. I like:',
	dom.ul({},
		dom.li({}, 'The web'),
		dom.li({}, 'Food'),
		dom.li({}, '...actually that\'s it')
	)
);

// 添加到文档流
document.querySelector('#demo').appendChild(el);

```
### 12.2.2 set(target, propKey, value, receiver)
**功能：**拦截某个属性的赋值操作

*Demo1：保证属性赋值符合要求*
```javascript
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

*Demo2：结合get和set方法，防止这些内部属性（属性名第一个字符使用`_`开头）被外部读写*

```javascript
var handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = {};
var proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property
```

### 12.2.3 has(target, propKey)
**功能：**拦截`HasProperty`操作，判断对象是否具有某个属性（无论自身还是继承来的）时，这个方法会生效。典型的操作就是`in`运算符
+ 如果原对象不可配置或者禁止扩展，这时`has`拦截会报错
+ 只对`in`循环生效，对`for...in`循环不生效


*Demo1：使用`has`方法隐藏某些属性，不被`in`运算符发现*
```javascript
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

*Demo2：如果原对象`不可配置`或者`禁止扩展`，这时`has`拦截会报错*
```javascript
var obj = { a: 10 };
Object.preventExtensions(obj);
var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

'a' in p // TypeError is thrown
```

### 12.2.4 deleteProperty(target, propKey)
**功能：**拦截`delete`操作
**注意：**如果这个方法`抛出错误`或者`返回false`，当前属性就无法被`delete`命令删除

*Demo：删除内部属性（第一个字符为`_`的属性）会报错*
```javascript
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
```

### 12.2.5 ownKeys(target)
**功能：**拦截`Object.keys()`操作

*Demo：拦截内部属性（第一个字符为`_`）*
```javascript
let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"
```

### 12.2.6 getOwnPropertyDescriptor(target, propKey)
**功能：**拦截`Object.getOwnPropertyDescriptor`，返回一个`属性描述对象`或者`undefined`

*Demo：对于内部属性（第一个字符为`_`的属性名）会返回`undefined`*
```javascript
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
```

### 12.2.7 defineProperty(target, propKey, propDesc)
**功能：**拦截了`Object.defineProperty`操作
**注意：**返回false，导致添加新属性会抛出错误

```javascript
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar'
// TypeError: proxy defineProperty handler returned false for property '"foo"'
```

### 12.2.8 preventExtensions(target)
**功能：**拦截`Object.preventExtensions()`。该方法必须返回一个布尔值
**限制：**只有当`Object.isExtensible(proxy)`为`false`（即不可扩展）时，`proxy.preventExtensions`才能返回`true`，否则会报错
**技巧：**为了防止出现`限制`中提到的问题，通常要在`proxy.preventExtensions`方法里面，调用一次`Object.preventExtensions`

```javascript
var p = new Proxy({}, {
  preventExtensions: function(target) {
    console.log("called");
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(p)
// "called"
// true
```

### 12.2.9 getPrototypeOf(target)
**功能：**拦截以下一些操作
+ `Object.getPrototypeOf()`
+ `Object.prototype.__proto__`
+ `Object.prototype.isPrototypeOf()`
+ `Object.getPrototypeOf()`
+ `Reflect.getPrototypeOf()`
+ `instanceof`运算符

```javascript
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
```

### 12.2.10 isExtensible(target)
**功能：**拦截`Object.isExtensible`操作
**限制：**这个方法有一个强限制，如果不能满足下面的条件，就会抛出错误

```javascript
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true
```

### 12.2.11 setPrototypeOf(target, proto)
**功能：**拦截`Object.setPrototypeOf`方法

*Demo：只要修改`target`的原型对象，就会报错*
```javascript
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
proxy.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
```

### 12.2.12 apply(target, ctx, args)
**功能：**拦截`函数的调用`、`call`和`apply`操作
**注意：**直接调用`Reflect.apply`方法，也会被拦截

参数|类型|说明
-|-|-
target|`function`|目标函数
ctx|`object`|函数的上下文
atgs|`array`|目标对象的参数数组

```javascript
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
Reflect.apply(proxy, null, [9, 10]) // 38（直接调用Reflect.apply方法，也会被拦截）
```

### 12.2.13 construct(target, args)
**功能：**用于拦截`new`命令
**注意：**`construct`方法返回的必须是一个对象，否则会报错
参数|说明
-|-
target|目标对象
args|构建函数的参数对象

```javascript
var p = new Proxy(function() {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

new p(1).value
// "called: 1"
// 10
```

## 12.3 Proxy.revocable()
**功能：**返回一个对象，该对象有两个属性

属性|类型|说明
-|-|-
proxy|`object`|`Proxy`实例
revoke|`function`|执行该函数会取消`Proxy`实例

```javascript
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

// 使 proxy 实例实效
revoke();
proxy.foo // TypeError: Revoked
```


## 12.4 Reflect概述
**说明：**只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法，设计该对象的目的是
+ 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上
+ 修改某些`Object`方法的返回结果，让其变得更合理
+ 将`Object`对象的一些明显属于语言内部的方法，放到`Reflect`对象上
+ 让`Object`操作都变成函数行为

**用途：**不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为

*Demo1：拦截操作（`get、delete、has`），内部都调用对应的`Reflect`方法*
```javascript
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```


*Demo2：有了`Reflect`对象以后，很多操作会更易读*
```javascript
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

## 12.5 Reflect对象的方法
**注意：**以下方法返回一个布尔值，表示操作是否成功。它们对应的Object方法，失败时都会抛出错误。
+ Reflect.set()
+ Reflect.defineProperty()
+ Reflect.freeze()
+ Reflect.seal()
+ Reflect.preventExtensions()