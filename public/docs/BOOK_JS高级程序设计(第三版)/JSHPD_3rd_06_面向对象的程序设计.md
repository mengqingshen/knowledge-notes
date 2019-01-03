---
title: 06 面向对象的程序设计
categories: [JS高级程序设计(第三版)]

tag:
    - js
date: 2014-08-29 17:55:08
---

# 1 理解对象
## 1.1 属性类型

### 数据属性(ecma-262第五版)
用于实现JavaScript引擎，JavaScript不能直接访问

**[[Configurable]]**: true（默认）或false, 限制以下行为

```js
☑︎ 通过delete删除属性从而重新定义属性；
☑︎ 修改属性的特性；
☑︎ 把属性修改为访问其属性.
```

**[[Enumerable]]**: true(默认)或false，限制以下行为

```js
☑︎ 通过for-in循环返回属性；
```

**[[Writable]]**: true(默认)或false, 限制以下行为

```js
☑︎ 修改属性的值；
```

**[[Value]]**: undefined（默认）或属性的数据值

### 修改数据属性 Object.defineProperty()

调用该方法时，如果不指定，configurable、enumerable 和 writable 特性的默认值都是 false。

```
兼容性
☑︎ IE8最早实现 Object.defineProperty()，但实现不彻底。
```

**案例一**: 设置属性只读[[Writable]]

```js
var persion = {};
/*
*ECMAScript 5提供了Object.defineProperty()方法来修改属性默认的特性。
*param1{Object} 属性所在对象
*param2{String} 属性的名字
*param3{JSON} 描述符对象 
*/
Object.defineProperty(persion, "name", {
    writable:false,
    value:"Nicholas"
});
alert(persion.name);//"Nicholas"
/*
*非严格模式下赋值操作被忽略；
*严格模式下抛出错误。
*/
persion.name = "Greg";//
alert(persion.name);//"Nicholas"

    案例二：设置不可设置[[Configurable]]
var persion = {};
Object.defineProperty(persion, "name", {
    configurable:    false,
    value:    "Nicholas"
});
alert(persion.name);//"Nicholas"
/*
*1.    不能从对象中删除属性
*非严格模式下什么也不会发生；
*严格模式下会导致错误。
*/
delete persion.name;
alert(persion.name)://"Nicholas"
/*
*2.    一旦把属性定义为不可配置的，就不能在把它变为可配置的
*/
Object.defineProperty(persion, "name", {
    configurable:    true,
    value:    "Nicholas"
});
```


### 访问器属性

读取访问器属性时调用 `getter` 函数，写入访问器属性时调用 `setter` 函数

**[[Configurable]]**: true(对象上的属性默认)或false

```js
☑︎ 通过delete删除属性从而让定义属性；
☑︎ 修改属性的特性；
☑︎ 把属性修改为数据属性。
```

**[[Enumerable]]**: true(对象上的属性默认)或false

```js
通过for-in循环返回属性。
```

**[[Get]]**: 读取属性是调用的函数，默认undefined
**[[Set]]**: 在写入属性时调用的函数，默认undefined

**修改**

方式一：Object.defineProperty()（ECMAScript 5）

```js
IE8(部分实现) IE9+  Firefox4+ Safari 5+ Opera12+  Chrome
```

```js
var book = {
//前面加下划线用于表示这是一个只能通过对象方法访问的属性
_year:    2004,
edition:    1
};
/*严格模式下
*只指定getter函数的属性而不指定setter函数会抛出错误；
*只指定setter函数的属性而不指定getter函数会抛出错误；
*非严格模式下
*只指定getter函数的属性而不指定setter函数被忽略；
*只指定setter函数的属性而不指定getter函数会返回undefined；   
*/
Object.defineProperty(book, 'year', {
get: function(){
    return this._year;
},
set:function(newValue){
    if(newValue > 2004){
        this._year = newValue;
        this.edition += newValue - 2004;
    }
}
});
book.year = 2005;//or book._year = 2005;
alert(book.edition);    //2
```

方式二：两个非标准的遗留的方法(最初由firefox引入)

```js
_defineGetter_()
_defineSetter_()
```

```js
Firefox Safari 3  Chrome1 Opera9.5
```

```js
var book ={
_year:    2004,
edition:    1
};
//定义访问器的旧有方法
book._defineGetter_('year', function(){
return this._year;
});
book._defineSetter_('year', function(newValue){
if(newVlue > 2004){
    this._year = newValue;
    this.edition += newValue - 2004;
}
});
book.year = 2005;
alert(book.edition);//2
```

## 1.2 定义多个属性(ECMAScript5)

```js
IE9+  Firefox 4+  Safari 5+ Opera 12+ Chrome
```

```js
var book = {};
Object.defineProperties(book, {
    _year:    {
        value:    2004
    },
    edition:    {
        value:    1
    },
    year:    {
        get:    function(){
            return this._year;
        },
        set:    function(newValue){
            if(newValue > 2004){
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
```

## 1.3 读取实例对象属性的特性 Object.getOwnPropertyDescriptor()

```js
IE9+  Firefox 4+  Safari 5+ Opera 12+ Chrome
```

```js
var book ={};
Object.defineProperties(book, {
    _year:    {
        value:    2004
    },
    edition:    {
        value:    1
    },
    year:    {
        get:    function(){
            return this._year;
        },
        set:    function(newValue){
            if(newValue){
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
var descriptor = Object.getOwnPropertyDescriptor(book, 'year');
alert(descriptor.value);    //undefined
alert(descriptor.enumerable);    //false
alert(typeof descriptor.get);    //"function"
```

# 2 创建对象
## 2.1 工厂模式
```js
function createPersion(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = jon;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}
var persion1 = createPersion('Nicolas', 29, 'Software Engineer');
var persion2 = createPersion('Gerg', 27, 'Doctor');   
```

## 2.2 构造函数模式

```js
不显示创建对象
直接将属性和方法赋给this对象
没有return语句
按照惯例应该大写字母开头
```

**过程**

1. 创建一个对象
2. 将构造函数的作用于赋给新对象（this就指向这个新对象）
3. 执行构造函数中的代码
4. 返回新对象

```js
function Persion(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}
var persion1 = Persion('Nicolas', 29, 'Software Engineer');
var persion2 = Persion('Gerg', 27, 'Doctor');   
```

**将构造函数当作函数**

```js
function Persion(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}
//1.当作构造函数使用
var persion = Persion('Nicolas', 29, 'Software Engineer');
//2.作为普通函数调用
Person('Gerg', 27, 'Doctor');//添加到window(直接调用this会指向window对象)
//3.在另一个对象的作用域中调用
var o =  new Object();
Person.call(0, 'Kristen', 25, 'Nurse');
o.sayName();    //'Kristen'
```

缺点：每个方法在每个实例上都要重复创建一遍！

## 2.3 原型模式
每个函数都有一个 prototype (原型)属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。所有对象实例共享它所包含的属性和方法。

```js
//构造函数
function Persion(){}
//添加到Persion.prototype
Persion.prototype.name = 'Nicholas';
Persion.prototype.age = 29;
Persion.prototype.job = 'Software Engineer';
Persion.prototype.sayName = function(){
    alert(this.name;);
};
//检验prototype特性
var person1 = new Persion();
persion1.sayName();//'Nicholas'
var person2 = new Persion();
persion2.sayName();//'Nicholas'
alert(persion1.sayName == persion2.sayName);    //true
```

### 理解原型对象

**prototype、constractor、_proto_**

![EA780712-C5EF-42E1-AA40-DE5447B24F84](http://cdn.mengqingshen.com/2017-04-09-EA780712-C5EF-42E1-AA40-DE5447B24F84.png)

```js
//实例对象访问其构造函数的prototype中的属性（非标准）
alert(persion1._proto_.name);    //'Nicolas'
//构造函数访问其prototype对象的属性
alert(Persion.prototype.name);    //'Nicolas'   
//原型对象访问构造函数
var persion3 = new Persion.prototype.constructor();    //or var persion3 = new Persion();
```

**isPrototypeOf()**

```js
//判断persion1这个实例的原型是否是Persion.prototype
alert(Persion.prototype.isPrototypeOf(persion1));    //true

Object.getPrototypeOf()
【ECMAScript 5】
IE9+  Firefox3.5+ Safari 5+ Opera 12+ Chrome
//获取一个对象的原型
alert(Object.getPrototypeOf(persion1) == Persion.prototype);     //true 
```

**hasOwnProperty()**
继承自Object,用于检测一个属性存在于实例中还是原型中。


### 原型与in操作符

```
☑︎ 通过对象能够访问给定属性（实例或原型中的）时返回true
☑︎ for-in循环
```

**in和hasOwnProperty()联合使用**

```js
/*
*检验是否是原型中的属性的方法
*param{Object} object 监测的对象
*param{String} name 监测的属性的名字
*return{Boolean} 原型的属性返回true，否则返回false
*/
function hasPrototypeProperty(object, name){
 return !object.hasOwnProperty(name) && (name in object);
}
function Persion(){
}

Persion.prototype.name = ''Nicholas;
Persion.prototype.age = 29;
Persion.prototype.job = 'Software Engineer';
Persion.prototype.sayName = function(){
 alert(this.name);
};
var persion = new Persion();
alert(hasPrototypeProperty(persion, 'name'));    //true
```

**IE BUG **

存在于早期版本中，即屏蔽不可枚举属性(比如toString)的实例属性不会出现在for-in循环中。

```js
var o = {
 toString:function(){
     return 'My Object';
 }
};
for(var prop in o){
 if(prop == 'toString'){
     alert('Found toString');    //在IE中不会显示
 }
}
```

**替代for-in**

```js
ie9+  Firefox 4+  Safari 5+ Opera12+  Chrome
```

Object.keys()
`ECMAScript 5`
取得对象上所可枚举的实例属性名。

```
param{Object} 要枚举的对象
return{Array} 包含所有可枚举属性的字符串数组
```

Object.getOwnPropertyNames()
取得对象上所(无论是否可枚举)实例属性名。

```
param{Object} 要枚举的对象
return{Array} 包含所有可枚举属性的字符串数组
```

```js
var keys = Object.getOwnPropertyNames(Persion.prototype);
alert(keys);    //'constructor, name, age, job, sayName'
```

### 更简单的原型语法
避免每次为原型添加属性都重复一遍 Person.prototype.

```
☑︎ 本质上完全重写了默认的 prototype 对象，导致 constructor 属性指向 Object 构造函数而不是 Persion 函数（可修复）；
☑︎ 同时 constructor 属性变成可枚举（可修复）；
☑︎ 实例最初指向原型的[[Prototype]]指针不再起作用（不可修复）。

```

**忽略副作用**

```js
Persion.prototype = {
name:'Nicholas',
age:29,
job:'Software Engineer',
sayName:function(){
    alert(this.name);
}
};
var friend = new Person();
alert(frinend instanceof Object);    //true
alert(friend instanceof Person);    //true
alert(friend.constructor == Person);    //false
alert(friend.constructor == Object);    //true
```

**修复副作用**（原型的constructor属性不再指向Person的问题）

```js
Persion.prototype = {
    constructor:Persion,    //如果constructor的值很重要，就设置合适的值，不过会造成[[Enumerable]]由默认的false变为true
    name:'Nicholas',
    age:29,
    job:'Software Engineer',
    sayName:function(){
        alert(this.name);
    }
};
```

**修复副作用**（constructor编程可枚举的问题）：

```js
function Person(){}
Persion.prototype = {
    name:'Nicholas',
    age:29,
    job:'Software Engineer',
    sayName:function(){
        alert(this.name);
    }
};
//重新构造函数，值适用于ECMAScript 5兼容的浏览器
Object.defineProperty(Person.prototype, 'constructor', {
    enumerable:false,
    value:Person
});
```

### 原型的动态性

```
☑︎ 对于重写原型之前创建的实例，引用的仍然是之前的原型。

☑︎ 对于重写原型之后创建的实例，重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系；它们引用的原型不再是最初的原型。
```

```js
function Person(){}
var friend = new Person();
Persion.prototype = {
    contructor:Person,
    name:'Nicholas',
    age:29,
    job:'Software Engineer',
    sayName:function(){
        alert(this.name);
    }
};
friend.sayName();    //error
```

![B41C999C-6783-4FEA-A757-EAFD81FC6F68](http://cdn.mengqingshen.com/2017-04-09-B41C999C-6783-4FEA-A757-EAFD81FC6F68.png)

### 原生对象的原型

所有原生引用类型（Object、Array、String，等等）都在其构造函数的原型上定义了方法。

**取得默认方法**

```js
alert(typeof Array.prototype.sort);    //'function'
alert(typeof String.prototype.substring );    //'function'
```

**定义新方法**

```js
String.prototype.startWith = function(text){
    return this.indexOf(text) == 0;
};

var msg = 'Hello World!';
alert(msg.startWith('Hello'));    //true
```

### 原型对象的问题
实例一般都是要有属于自己的属性，不同实例的属性值如果不一样就不能放到原型中。

## 2.4 组合使用构造函数模式和原型模式(推荐)

```
构造函数模式用于定义实例属性；
原型模式用于定义方法和共享的属性。
```

```js
function Persion(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends =  ['Shelby', 'Court'];
}
Persion.prototype = {
    constructor:    Person;
    sayName:    function(){
        alert(this.name);
    }
};
var person1 = new Person('Nicolas', 29, 'Software Engineer');
var person2 = new Person('Greg', 27, 'Doctor');
person1.friends.push('Van');
alert(person1.friends);    //'Shelby, Cont, Van'
alert(person2.friends);    //'Shelby, Count'
```

## 2.5 动态原型模式
将所有信息都封装在构造函数中；通过检查某个方法是否有效来决定是否需要初始化原型。

**注意**: 该模式下不能使用对象字面量重写原型，否则某些实例已经创建的情况下重写原型会切断现有实例与新原型之间的联系。

```js
function Person(name, age, job){
    //属性
    this.name = name;
    this.age = age;
    this.job = job;
    //检查原型中该方法是否已经创建
    if(typeof this.sayName != 'function'){
        Person.prototype.sayName = function(){
            alert(this.name);
        };
    }
}
var friend = new Person('Nicolas',. 29, 'Software Engineer');
friend.sayName();
```

## 2.6 寄生构造函数模式

```
缺陷
☑︎ 返回的对象与构造函数及其原型之间没有关系；
☑︎ 无法通过 instanceof 操作符确定对象类型。
```

```js
function SpecialArray(){
    //创建数组
    var values = new Array();
    //添加值
    values.push.apply();
    
    //添加方法
    values.toPipedString = function(){
        return this.join('|');
    };
    //返回数组
    return values;
}
var colors = new SpecialArray('red', 'blue', 'green');
alert(colors.toPipedString());    //'red|blue|green'
```

## 2.7 稳妥构造函数模式

```
☑︎ 没有公共属性；
☑︎ 方法不应用this；
☑︎ 新创建对象的实例方法不引用this
☑︎ 不使用new操作符调用构造函数
☑︎ 无法直接访问对象的属性
☑︎ 创建的实例与构造函数之间没有联系

```

```js
function Persion(name, age, job){
    //创建要返回的对象
    var o = new Object();
    //可以在这里定义私有变量和函数
    //添加方法
    o.sayName = function(){
        alert(name);
    };
    //返回对象
    return o;
}
var friend = Person('Nicholas', 29, 'Software Engineer');
friend.sayName();    //'Nicholas'
```

# 3 继承
继承分两类

+ 接口继承（JS没有函数签名，因此无法实现）
+ 实现继承

## 3.1 原型链
实现原型链的一种基本模式：

![C71C6BF1-7718-4DB5-AF08-8B9187226DF0](http://cdn.mengqingshen.com/2017-04-09-C71C6BF1-7718-4DB5-AF08-8B9187226DF0.png)

```js
//父对象
function SuperType(){
    this.property = true;
}
//在父对象的prototype上添加方法
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
//子对象
function SubType(){
    this.subproperty = false;
};
//通过将父对象实例赋给自对象的原型实现继承
SubType.prototype = new SuperType();
//在子对象的原型上添加方法
SubType.prototype.getSubValue = function(){
    return this.subproperty;
};

var instance = new SubType();
/*
*1.    搜索实例;
*2.    搜索SubType.prototype;
*3.    搜索SuperType.prototype
*/
alert(instance.getSuperValue());    //true
```

**别忘记默认的原型**
所有引用类型的默认原型都是 Object 的实例。

![A2600352-8D8D-4654-A551-CD32ED745F2E](http://cdn.mengqingshen.com/2017-04-09-A2600352-8D8D-4654-A551-CD32ED745F2E.png)

**确定原型和实例的关系**
+ instanceof
  如果实例的原型链中出现过指定的构造函数，结果就会返回true。

```js
alert(instance instanceof Object);    //true
alert(instance instanceof SuperType);    //true 
alert(instance instanceof SubType);    //true  
```

+ isPrototyptof()
  效果同instanceof。

```js
alert(Object.prototype.isPrototypeOf(instance));    //true
alert(SuperType.prototype.isPrototypeOf(instance));    //true 
alert(SubType.prototype.isPrototypeOf(instance));    //true  
```

**谨慎地定义方法**
```
注意：
☑︎ 如果要替换原型，实例替换默认的 prototype 后才能在 prototype 中定义新的方法；
☑︎ 通过原型链实现继承时，不能通过字面量创建原型方法；
```

```js
//父对象
function SuperType(){
    this.property = true;
}
//在父对象的prototype上添加方法
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
//子对象
function SubType(){
    this.subproperty = false;
};
//通过将父对象实例赋给自对象的原型实现继承
SubType.prototype = new SuperType();
//使用字面量添加新方法，会导致上一行代码无效
SubType.prototype = {
    getSubValue: function(){
        return this.subproperty;
    },
    someOtherMethod: function(){
        return false;
    }
};

var instance = new SubType();
alert(instance.getSuperValue());    //error
```

**原型链的问题**

```
☑︎ 包含引用类型的原型属性会被所有实例共享；
☑︎ 在创建子类型的实例时，不能向超类型的构造函数中传递参数。
```

## 3.2 借用构造函数
通过call()方法（或apply()方法）,在（未来将要）新创建的SubType实例的环境下调用SuperType构造函数。

```js
//创建构造函数
function SuperType(){
    this.colors = ['red', 'blue', 'green']; 
}
function SubType(){
    //继承了SuperType
    SuperType.call(this);
}
var instance1 = new SubType();
instance1.color.push('black');
alert(instance1.colors);    //'red, blue, green, black'
var instance2 = new SubType();
instance2.color.push('black');
alert(instance1.colors);    //'red, blue, green'
```

传递参数

```js
function SuperType(name){
    this.name = name;
}
function SubType(){
    //继承了SuperType,同时还传递了参数
    SyperType.call(this, 'Nicholas');

    //实例属性
    this.age = 29;
}
var instance = new SubType();
alert(instance.name);    //'Nicholas'
alert(instance.age);    //29
```

```js
☑︎ 借用构造函数的问题
☑︎ 方法都在构造函数中定义；
☑︎ 所有类型只能使用构造函数模式。
```

## 3.3 组合继承(推荐)

```
☑︎ 避免了原型链和借用构造函数的缺点，融合了它们的优点；
☑︎ instancefo和isPrototypeOf()能用于识别基于组合继承创建的对象；
☑︎ 无论什么情况下都会调用两次超类构造函数（缺点）
☑︎ 产生了多余的属性
```

```js
function SuperType(name){
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    //继承属性
    SuperType.call(this, name);
    this.age = age;
}
//第一次：创建子类原型时
SubType.prototype = new SuperType();//原型中有多余属性

SubType.prototype.sayAge = function(){
    alert(this.age);
};
//第二次：在子类型构造函数内部调用超类构造函数，完成初始化
var instance1 = new SubType('Nicholas', 29);
instance1.colors.push('black');
alert(instance1.colors);    //'red, blue, green, black'
instance1.sayName();    //'Nicholas'
instance1.sayAge();    //27
```

## 3.4 原型式继承
不使用构造函数，借助原型基于已有的对象创建新对象，同时不必因此创建自定义类型。

```js
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
```

### Object.create()
`ECMAScripe 5`
原型继承被规范化为此方法

```
param {Object} 新对象原型
param {Object} 添加新的属性(必需带描述)（会覆盖prototype上的同名属性）
return {Object} 创建的新对象
```

```js
//作为Objetc.create()第一个参数的对象
var person = {
    name:'Nicholas',
    friends:['Shelby', 'Count', 'Van']
};
var anotherPerson = Object.create(person, {
    name:{
        value:'Greg'
    }
});
alert(anotherPerson.name);    //'Gerg'

```

```
IE9+  Firefox4+ Safari 5+ Opera12+  Chrome
```

## 3.5 寄生式继承
寄生式（parasitic）继承是与原型式继承紧密相关的一种思路，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象。

```js
//该方法用于返回一个对象（只要返回一个对象就符合模式要求）
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
function createAnother(original){
    var clone = object(original);
    clone.sayHi = function(){
        alert('hi');
    };
}
var person = {
    name:'Nicholas',
    friends:['Shelby', 'Court', 'Van']
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi();    //'hi'
```

## 3.6 寄生组合式继承（最理想）
```js
☑︎ 只调用一次超类构造函数；
☑︎ 避免在超类原型上创建不必要的多余的属性；
☑︎ 与此同时，原型链保持不变。
```

```js
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
```

```js
/*
*使用寄生式继承来继承超类型的原型
*@param {function} subType 子类型的构造函数
*@param {function} superType 超类型的构造函数
*/
function inheritPrototype(subType, superType){
    //第一步：创建超类型原型的一个副本
    var prototype = object(superType.prototype);    //创建对象
    
    //第二步：添加constructor属性
    portotype.constructor = subType;    //增强对象
    
    //第三步：将创建的对象（副本）赋值给子类型的原型
    subType.prototype = prototype;    //指定对象
}
function SuperType(name){
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
//调用函数为子类型原型赋值
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
};
```

![45B71140-EF40-45B3-A64D-2695A6089203](http://cdn.mengqingshen.com/2017-04-09-45B71140-EF40-45B3-A64D-2695A6089203.png)

