---
title: 07 函数表达式
categories: [JS高级程序设计(第三版)]

tag:
    - js
date: 2014-09-04 16:24:50
---

**定义函数的两种方式**
（1）函数声明

+ 函数声明提升（执行代码之前会先读取函数声明，因此可以把函数声明放在调用它的语句后面）；
+ 不能出现在判断、循环等位置。

```javascript
function functionName(arg0, arg1,arg2){
    //函数体
}
//非标准的name属性
//只在Firefox、Safari、Chrome和Opera有效
alert(functionName.name);    //'functionName'
```
（2）函数表达式

```javascript
//匿名函数（拉姆达函数）
var functionName = function(arg0, arg1, arg1){
    //函数体
};

```
## 7.1 递归
**不健壮的递归**

```javascript
function factorial(num){
    if(num <= 1){
        return 1;
    }else{
        return num * factorial(num - 1);    //这里存在隐患
    }
}
//下面使其出错
var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4));    //出错！
```

**通过arguments.callee规避错误(非严格模式下)**

```javascript
function factorial(num){
    if(num <= 1){
        return 1;
    }else{
        // arguments.callee是一个指向正在执行的函数的指针
        return num * arguments.callee(num - 1);    //这里存在隐患
    }
}
//下面使其出错
var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4));    //不再出错！
```

**通过命名函数表达式（严格或非严格模式都正常工作）**

```javascript
var factoriall = (function f(num){
    if(num <= 1){
        return 1;
    }else{
        return num * f(num - 1);
    }
});
```

## 7.2 闭包
**说明：**指有权访问另一个函数作用域中的变量的函数。

### 普通函数    :    不访问其他作用域的变量的函数
作用域中引用的变量对象|产生|消亡|作用域链中的位置|包含属性
---|---|---|---|---
全局变量对象|创建compare()函数时，会创建一个预先包含全局变量对象的作用域链|关闭网页|1|`this`、`result`和`compare`
本地活动对象|第一次调用`cpmpare()`时，为函数创建一个执行环境，然后通过赋值函数的`[[Scope]]`属性中的对象构建起执行环境的作用域链。此后，   活动对象被创建并推入作用域链前端|函数执行完毕后|0|`this`、`arguments`、`value1`和`value2`

```javascript
/**
* 比较函数
* @param {string|number} value1 用来比较的第一个值
* @param {string|number} value2 用来比较的第二个值
* @return {number} 1、-1、0
*/
function cpmpare(value1, value2){
        if(value1 < value2){
            return -1;
        }else if(value1 > value2){
            return 1;
        }else{
            return 0;
        }
}
var result = cpmpare(5, 10);
```
![Alt text](http://cdn.mengqingshen.com/img/a470427e-ea7b-4102-bc99-e6799b430085.png)

#### 创建闭包：创建闭包的常见方式就是在一个函数内部创建另一个函数。
**问题：**会携带外部函数的作用域，因此占用更多内存。

```javascript
/**
* 创建一个用来比较对象大小的比较函数
* @param {prototypeName}  - prototyName
* @return {function} 比较函数
*/
function createComparisionFunction(propertytotyName){
    return function(objec1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if(value1 < value2){
            return -1;
        }else if(value1 > value2){
            return 1;
        }else{
            return 0;
        }
    };
}
//创建函数
//返回后，作用域链被初始化，包含外部函数createComarisonFunction()的活动对象和全局变量你对象
var compare = createComarisonFunction('name');
//调用函数
var result = compare({name:'Nicholas'}, {name:'Greg'});
```

闭包作用域链中引用的变量对象|产生|消亡|作用域链中的位置|包含属性
---|---|---|---|---
全局变量对象|外部函数被执行后|关闭网页|2|`this`、`compare`、`result`和`ComparisionFunction`  
外部函数的本地活动对象|外部函数被执行后|闭包失去引用|1|`prototyName`   
本地活动对象|闭包被调用时|闭包执行完毕|0|`this`、`arguments`、`value1`、`value2`

![](http://cdn.mengqingshen.com/img/6776dbda-034b-47d6-82a3-73c3f81364fb.png)
#### 7.2.1 闭包与变量
**闭包局限性：**闭包只能取得任何变量的最后一个值。

```javascript
function createFunctions(){
    var result = new Array();
    for(var i=0; i<10; i++){
        result[i] = function(){
            return i;
        };
    }
    return result;
}
```

**避开局限性：**通过立即执行匿名函数创建函数避开局限性

```javascript
function createFunctions(){
    var result = new Array();
    for(var i=0; i<10; i++){
        result[i] = function(num){
            return num;
        }(i);
    }
    return result;
}
```

### 7.2.2 关于this对象
**闭包的问题 :** 内部函数只在活动对象中搜索this和arguments属性。

```javascript
var name = 'The Window';
var object = {
    name:'My Object',
    getNameFunc:function(){
        return function(){
            return this.name;
        };
    }:
};
alert(object.getNameFunc()());    //'The Window'(非严格模式)
```

**解决办法：**把外部作用域中的this对象保存在一个闭包能够访问的变量里。

```javascript
var name = 'The Window';
var object = {
    name:'My Object',
    getNameFunc:function(){
        var that = this;
        return function(){
            return that.name;
        };
    }:
};
alert(object.getNameFunc()());    //' My Object'
```

### 7.2.3 内存泄露
**IE9- :** 对`JScript`对象和`COM`对象使用不同的垃圾收集例程，如果闭包的作用域链中保存着一个`HTML`元素，意味着该元素无法被销毁。

**闭包引用外部函数活动对象导致内存泄漏**

```javascript
function assignHandler(){
    var element = document.getElementById('someElement');
    element.onclick = function(){
        alert(element.id);
    };
}
```

### 7.3 模仿块级作用域
**将函数声明转换为函数表达式：**只要函数执行完毕，就可以立即销毁其作用域链。

```javascript
function outputNumbers(count){
    (function(){
        for(var i=0; i<count; i++){
            alert(i);
        }
    })();
    alert(i);    //导致一个错误
}
```

## 7.4 私有变量
**特权方法（privileged method）:**有权访问私有变量和私有函数的公有方法。

*构造函数中定义特权方法：缺点是为每个实例都重新创建一遍方法。*

```javascript
function Person(name){
    this.getName = function(){
        return name;
    };
    this.setName = function(){
        name = value;
    };
}
var person = new Person('Nicholas');
alert(person.getName());    //'Nicholas'
person.setName('Greg');
alert(person.getName());    //'Greg'
```

### 7.4.1 静态私有变量
**静态：**因为变量所在的活动对象在构造函数被载入的时候，就被添加到构造函数的作用域链中，因此会被所有实例共享。
**私有:** 因为变量只存在于作用域链中，无法直接访问，只能通过特定方法访问。

```javascript
(function(){
    //静态的由所有实例共享的私有变量
    var name = '';
    //构造函数
    Person = function(value){
        name =  value;
    };
    
    //公共方法
    Person.prototype.getName = function(){
        return name;
    };
    //公共方法
    Person.prototype.setName = function(value){
        name = value;
    };
})();
//构造函数一旦创建就会复制外部函数的活动对象并插入到自己的作用域链
//因此每个实例的作用域链都共享外部函数的变量
var person1 = new Person('Nicholas');
alert(person1.getName());    //'Nicholas'
person1.setName('Greg');
alert(person1.getName());    //'Greg'
var person2 = new Person('Michael');
alert(person1.getName());    //'Michael'
alert(person2.getName());    //'Michael'
```

### 7.1.2 模块模式: 通过为单例添加私有变量和特权方法使其增强
**单例(对象字面量)**

```javascript
var singleton = {
    name:value,
    method:function(){
        //这里是方法的代码
    }
};
```

**模块模式：为单例添加私有变量和特权方法**
**说明：**因为返回字面对象，所以每个单例都是Object的实例；
**适用：**适用于必需创建一个对象并需要将其初始化，同时还要公开一些能够访问这些私有数据的方法的场合。

```javascript
var singleton = function(){
    //私有变量
    var privateVariable = 10;
       
    //私有函数 
    function privateFunction(){
        return false;
    }
    
    return {
        publicProperty: true,
        publicMethod: function(){
                privateVariable++;
                return privateFunction();
        }
    };
}();
```

### 7.4.3 增强的模块模式

+ 返回特定类型的对象；
+ 需要添加某些属性或方法。

```javascript
var singleton = function(){
    //私有变量和私有函数
    var privateVarivle =   10;
    function privateFunction(){
        return false;
    }
    //创建要返回的对象
    var object = new CustomType();
    //为要返回的对象添加特权/公有属性和方法
    object.publicProperty = true;
    object.publicMethod = function(){
        privateVable++;
        return privateFunction();
    };
    
    //返回这个对象
    return object;
}();
```