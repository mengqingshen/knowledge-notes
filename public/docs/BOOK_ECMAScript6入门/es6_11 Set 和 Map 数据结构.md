---
title: 11 Set 和 Map 数据结构(ECMAScript6入门)
categories: [ECMAScript6入门]
tag:
  - es6
  - js
date: 2016-09-30 18:02
---

## 11.1 Set
**说明：**类似于数组，但是成员的值都是唯一的，没有重复的值

### 11.1.1 基本用法
**说明：**向`Set`加入值的时候，Set内部判断两个值是否不同，使用的算法叫做`Same-value equality`，它类似于`===`，主要的区别是`NaN`等于自身，而`===`认为NaN不等于自身

**要点**

+ 通过 `Set` 构造器创建实例（可以传入数组来初始化）
+ 使用 `add` 实例方法添加成员

**技巧：**一种去除数组重复成员的方法`[...new Set(array)]`

*Demo1: 通过 add 为 set 实例添加成员*

```javascript
var s = new Set();

[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

*Demo2: 接受一个数组（或类似数组的对象）作为参数，用来初始化*

```javascript
// 例一
var set = new Set([1, 2, 3, 4, 4]);
[...set]// 去除数组重复成员
// [1, 2, 3, 4]

// 例二
var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
function divs () {
  return [...document.querySelectorAll('div')];
}

var set = new Set(divs());
set.size // 56

// 类似于
divs().forEach(div => set.add(div));
set.size // 56
```

### 11.1.2 Set 实例的属性和方法
#### 11.1.2.1 实例属性

实例属性|类型|说明
---|---|---
Set.prototype.`constructor`|`function`|构造函数，默认就是`Set`函数
Set.prototype.`size`|`number`|`Set`实例的成员总数

#### 11.1.2.2 操作方法
操作方法|说明
---|---
`add(value)`|添加某个值，返回Set结构本身
`delete(value)`|删除某个值，返回一个布尔值，表示删除是否成功
`has(value)`|返回一个布尔值，表示该值是否为Set的成员
`clear()`|清除所有成员，没有返回值

*Demo1: 操作方法的基本使用*

```javascript
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

*Demo2: `Array.from`方法可以将`Set`结构转为数组 *

```javascript
var items = new Set([1, 2, 3, 4, 5]);
var array = Array.from(items);
```

*Demo3: 去除数组重复成员(也可以通过扩展运算符(`...`)*

```javascript
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```
#### 11.1.2.3 遍历方法
**顺序：**`Set`的遍历顺序就是插入顺序
**注意：**由于`Set`结构的键名的键名和键值是同一个值，所以`keys`方法和`values`方法的行为完全一致
**技巧：**`Set`结构的实例默认可遍历，它的默认遍历器生成函数就是它的`values`方法，因此，可以省略`values`方法，直接用`for...of`循环遍历`Set`

遍历相关实例方法|说明
---|---
`keys()`|返回键名的遍历器
`values()`|返回键值的遍历器
`entries()`|返回键值对的遍历器
`forEach()`|使用回调函数遍历每个成员，和数组的`forEach`用法一样

*Demo1: keys()，values()，entries()*

```javascript
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

*Demo2: 省略`values`方法，直接用`for...of`循环遍历`Set`*

```javascript
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```

*Demo3: `forEach`方法*

```javascript
let set = new Set([1, 2, 3]);
set.forEach((value, key) => console.log(value * 2) )
// 2
// 4
// 6
```

*Demo4: 遍历的应用*

+ `...`和`set`结合，去除数组的重复成员

```javascript
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]
```

+ 转换为数组后，`map`和`filter`方法也可以用于`Set`了

```javascript
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// 返回Set结构：{2, 4}
```

+ 集合运算

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

## 11.2 WeakSet
**说明：**`Set`的弱引用版本

+ `WeakSet`的成员只能是`对象`
+ 垃圾回收机制不考虑`WeakSet`对成员的引用
+ `WeakSet`是不可遍历的（因为无法引用`WeakSet`的成员）

**技巧：**`WeakSet`的一个用处，是储存`DOM`节点，而不用担心这些节点从文档移除时，会引发内存泄漏

### 11.2.1 构造器
**说明：**`WeakSet`是一个构造函数，可以使用`new`命令，创建`WeakSet`数据结构

参数|类型|说明|必需
---|---|---|---
1|`iterable接口`|一个数组或类似数组的对象（成员必须是对象）|否


```javascript
var a = [[1,2], [3,4]];
var ws = new WeakSet(a);
```

### 11.2.2 实例方法

实例方法|说明
---|---
WeakSet.prototype.`add(value)`|向`WeakSet`实例添加一个新成员
WeakSet.prototype.`delete(value)`|清除`WeakSet`实例的指定成员
WeakSet.prototype.`has(value)`|返回一个布尔值，表示某个值是否在`WeakSet`实例之中

```javascript
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false
```

## 11.3 Map
**说明：**`ES6`提供了`Map`数据结构。它类似于对象，也是键值对的集合，但是`键`的范围不限于`字符串`，各种类型的值（包括对象）都可以当作键

### 11.3.1 Map 结构的目的和基本用法
**说明：**`Map`结构提供了`值—值`的对应，是一种更完善的`Hash`结构实现。如果你需要`键值对`的数据结构，`Map`比`Object`更合适

#### Map 构造器

参数|类型|说明|必需
---|---|---|---
1|`array`|该数组的成员是一个个表示键值对的数组|否

**注意：**`Map`区分不同键的方式类似`===`

键类型|判断标准
---|---
`引用类型`|`Map`的键跟内存地址绑定的，只要内存地址不一样，就视为两个键
`number、string、boolean`|只要两个值严格相等，就视为一个键（包括`0`和`-0`）
`NaN`|`Map`将其视为同一个键（虽然`NaN`不严格相等于自身）

```javascript
var map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

### 11.3.2 实例的属性和操作方法

实例属性|类型|说明
---|---|---
`size`|`number`|`Map`结构的成员总数

实例方法|说明
---|---
`set(key, value)`|如果key已经有值，则键值会被更新，否则就新生成该键。返回整个`Map`结构，因此可以采用链式写法
`get(key)`|读取`key`对应的键值，如果找不到`key`，返回`undefined`
`has(key)`|返回一个布尔值，表示某个键是否在`Map`数据结构中
`delete(key)`|删除某个键，返回`true`。如果删除失败，返回`false`
`clear()`|清除所有成员，没有返回值

```javascript
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
```

### 11.3.3 遍历方法
**说明：**Map结构本身就可以遍历，默认的遍历器接口为`Map.prototype.entries()`
**注意：**`Map`的遍历顺序就是插入顺序

遍历方法|说明
---|---
`keys()`|返回键名的遍历器
`values()`|返回键值的遍历器
`entries()`|返回所有成员的遍历器
`forEach()`|遍历`Map`的所有成员

*Demo1: 基本使用*

```javascript
let map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
```

*Demo2: Map结构的默认遍历器接口（Symbol.iterator属性），就是entries方法*

```javascript
map[Symbol.iterator] === map.entries
```

*Demo3: 结合使用扩展运算符，将Map结构转为数组结构，实现Map的遍历和过滤*

```javascript
let map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

let map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生Map结构 {1 => 'a', 2 => 'b'}

let map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生Map结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

#### Map.prototype.forEach()
**说明：**和数组的`forEach()`方法用法一致（还可以接受第二个参数，用来绑定`this`）

```javascript
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
```

### 11.3.4 与其他数据结构的互相转换
![Alt text](http://cdn.mengqingshen.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-10-07%20%E4%B8%8B%E5%8D%882.59.57.png)


(1) `Map`转为`数组`：使用扩展运算符

```javascript
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

(2) `数组`转为`Map`（数组的成员为有两个成员的数组）

```javascript
new Map([[true, 7], [{foo: 3}, ['abc']]])
// Map {true => 7, Object {foo: 3} => ['abc']}
```

(3) `Map`转为`对象`(前提是所有`Map`的键都是字符串)

```javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

(4) ` 对象`转为`Map`

```javascript
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// [ [ 'yes', true ], [ 'no', false ] ]
```

(5)  `Map`转为`JSON`：分两种情况

1）转为`对象JSON`（`Map`的键名都是字符串）：`Map` -> `对象` -> `JSON`

```javascript
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```
2）转为`数组JSON`（`Map`的键名有非字符串）：`Map` -> `数组` -> `JSON`

```javascript
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

(6) `JSON`转为`Map`
1）`JSON`->`对象`->`Map`（一般情形）

```javascript
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes":true,"no":false}')
// Map {'yes' => true, 'no' => false}
```

2）`JSON`->`数组`->`Map`字符串的格式（`JSON`可以转换为情景`2`的数组）

```javascript
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## 11.4 WeakMap
**设计目的：**`key`是对象的弱引用（垃圾回收机制不将该引用考虑在内），所以其所对应的对象可能会被自动回收。当`key`被回收后，`WeakMap`自动移除对应的键值对，从而防止内存泄漏。
**用途：**`WeakMap`的专用场合就是，它的键所对应的对象，可能会在将来消失。
**说明：**`WeakMap`与`Map`在API上的区别

+ 没有遍历操作（即没有key()、values()和entries()方法）
+ 没有`size`属性
+ 无法清空（即不支持`clear`方法）
+ 只有四个方法可用：`get()、set()、has()、delete()`


*Demo1: 基本用法*

```javascript
var wm = new WeakMap();
var element = document.querySelector(".element");

wm.set(element, "Original");
wm.get(element) // "Original"

element.parentNode.removeChild(element);
element = null;
wm.get(element) // undefined
```

*Demo2: DOM节点作为键名*

```javascript
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
  myWeakmap.set(myElement, logoData);
}, false);
```

*Demo3: 部署私有属性*
*`Countdown`类的两个内部属性`_counter`和`_action`，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏*

```javascript
let _counter = new WeakMap();
let _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

let c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
```


