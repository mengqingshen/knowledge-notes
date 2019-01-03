---
title: 4 变量、作用域和内存问题
categories: [JS高级程序设计(第三版)]

tag:
    - js
date: 2014-10-08 21:26:06
---

# 1 基本类型和引用类型的值
## 1.1 动态的属性
## 2.2 复制变量值

**基本类型: 拷贝值得副本**

```js
var num1 = 5;
var num2 = num1;
```

![9E15E73E-57B9-4A82-9AF6-F619470AB564](http://cdn.mengqingshen.com/2017-04-08-9E15E73E-57B9-4A82-9AF6-F619470AB564.png)



**引用类型：拷贝指针的副本**

![BBD15824-0BDE-4894-8B7C-7104DD7F7F9A](http://cdn.mengqingshen.com/2017-04-08-BBD15824-0BDE-4894-8B7C-7104DD7F7F9A.png)


## 1.3 传递参数
ECMAScript中的所有函数的参数都是按值传递的。

## 1.4 检测类型
# 2 执行环境及作用域
**执行环境**

```js
☑︎ 定义了变量或函数有权访问的其他数据，决定了他们各自的行为；
☑︎ 每个执行环境都有一个与之关联的变量对象；
☑︎ 全局执行环境是最外围的一个执行环境，WEB浏览器中是window对象。
```

**变量对象**

```js
☑︎ 对应的执行环境中定义的所有变量和函数都保存在这个对象。
```

**活动对象**

```js
☑︎ 如果执行环境是函数，会在函数被调用时为其创建活动对象并将其作为变量对象；
☑︎ 活动对象最开始只包含一个变量：anguments
```

**作用域链**

```js
☑︎ 保证对执行环境有权访问的所有变量和函数的有序访问;

☑︎ 标识符的解析是从作用域的前端开始沿着作用域一级一级搜索标识符的过程。
```

```js
var color = 'blue';
function changeColor(){
    if(color === 'blue'){
        color = 'red';
    }else{
        color = ''blue;
    }
}
changeColor();
alert('Color is now ' + color);
```

![9DD6793A-AFF4-4321-8F25-DAF54871B000](http://cdn.mengqingshen.com/2017-04-08-9DD6793A-AFF4-4321-8F25-DAF54871B000.png)

## 2.1 延长作用域链

有些语句可以在作用域链的前端临时增加一个变量对象，该变量对象会在代码执行后被移除。

**try-catch 语句的 catch 块**

```js
会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明（IE8-会将捕获的错误对象添加到catch所在的外部执行环境的变量对象，而不是catch语句的变量对象中。）。
```

**with语句**

会将指定的对象添加到作用域链中（不同于块级作用域）。

```js
function builderUrl(){
    var qs = '?debug=true';
    with(location){
        var url = href + qs;//url会成为外部函数执行环境的一部分（声明提升）
    }
    return url;
}
```



## 2.2 没有块级作用域

```js
if(true){
    var color = 'blue';
}
alert(color);//blue
```

### 变量声明

**情况一**：使用var

被自动添加到最接近的执行环境。

```js
function add(num1, num2){
    var sum = num1 + num2;
    return sum;
}
var result = add(10, 20);    //30
alert(sum);    //导致错误
```

**情况二**：没有使用var关键字（不推荐，严格模式下会导致错误）

自动被添加到全局环境。

```js
function add(num1, num2){
    sum = num1 + num2;
    return sum;
}
var result = add(10, 20);    //30
alert(sum);    //30
```

### 查询标识符

# 3 垃圾收集
## 3.1 标记清除


1. 垃圾收集器在运行；
2. 存储在内存中的所有变量加上标记；
3. 去掉环境中的变量和被环境中的变量引用的变量的标记；
4. 销毁那些带标记的变量并回收他们所占用的内存空间。

兼容性：IE  FF  Opera Chrome  Safari

## 3.2 引用计数（不常用）
跟踪每个值被引用的次数。

**缺陷**

循环引用问题：

```js
function problem(){
    var objectA = new Object();
    var objectB = new Object();
    objectA.obj = objectB;
    objectB.obj = objectA;    
}
```

**注意**：IE8-

```js
☑︎ COM对象: BOM和DOM中的对象使用C++的COM（Component Object Model,组件对象模型）对象实现。
☑︎ 内存泄漏: IE的JS引擎使用引用清除策略，但JS访问的COM对象基于标记清除，因此会发生循环引用问题
```

```js
var element = document.getElementById('some_element');
var myObject = new Object();
//JS对象和COM对象循环应用
myObject.elemet = element;
element.somebject = myObject;
//解决
myObject.element = null;
element.someobject = null;
```

IE9把BOM和DOM对象改为真正的JS对象，解决了以上问题。


## 3.3 性能问题

### 垃圾收集器的触发条件

**IE6**:根据内存分配量，达到任何一个临界值就会触发垃圾收集器。

| 变量     | 对象字面量+数组元素 | 字符串   |
| ------ | ---------- | ----- |
| >=256个 | >=4096个    | >64kb |

生命周期中一直保有那么多的变量将频繁触发垃圾收集器。

**IE7+**:临界值会被动态修正

```js
初始时和IE6临界值相同
回收一次如果能够回收的内存低于15%，临界值加倍；如果高于85%，临界值重置为初始值
```

**手动触发**
IE:`window.CollectGarbage()`

OPera+:`window.opera.collect()`

## 3.4 管理内存
背景：出于安全原因，操作系统分配给 WEB 浏览器的内存低于其它桌面程序。
解决：一旦数据不再有用，最好将其值设置为null。

```js
function createPerson(name){
    var localPerson = new Object();
    localPerson.name = name;
    return localPerson;
}
var globalPerson = createPerson('Nicholas');
globalPerson = null;
```
