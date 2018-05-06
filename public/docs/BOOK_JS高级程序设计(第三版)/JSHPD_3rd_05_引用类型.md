---
title: 05 引用类型
categories: [JS高级程序设计(第三版)]

tag:
    - js
date: 2014-09-01 10:10:46
---

在ECMAScript 中，引用类型是一种数据结构，用于将数据和功能组织在一起。这种数据类型不具备传统的面向对象语言所支持的类和接口等基本结构。引用类型有时候也被称为对象定义，因为他们描述的是一类对象所具有的属性和方法。

# 1 Object类型
# 2 Array类型
## 2.1 特点

+ 每一项可以保存任何类型的数据；
+ 大小可以动态调整
+ length大小可变（最大值4294967295）

## 2.2 两种创建方式
**一：通过构造函数创建**

```js
//不指定大小
var colors1 = new Array();
//指定大小

var colors2 = new Array(20); 
//指定数组项
var color3 = new Array('red', 'blue', 'green');
//省略new 操作符
var color4 = Array(''red', 'blue', 'green');
```

**二：数组字面量**

```js
var colors1 = ['red', 'blue', 'green'];
//字面量的BUG
//这样会创建一个2（IE9+等）或3（IE8-）项的数组
var values = [1 ,2, ];
```

## 2.1 检测数组
### 2.1.1 instanceof

```js
if(value instanceof Array){
//对数组进行某些操作
}
```

**局限性**

+ 不同全局执行环境存在不同版本的Array构造函数。会
+ 到不是Array的结论。

### 2.1.2 Array.isArray()
`ECMAScript 5`

```js
if（Array.isArray(value)）{
//对数组执行某些操作
}

```

`IE9+	Firefox4+	Safari5+	Opera10.5+	Chrome`

## 2.2 转换方法

转换方法|说明
---|---
toLocalString()|调用数组每一项的toLocalString()方法，将返回的每个字符串拼接成一个以逗号分隔的字符串。
toString()|（隐式转换默认调用）调用数组每一项的toString()方法，将返回的每个字符串拼接成一个以逗号分隔的字符串。
valueOf()|返回的还是数组。
join()|指定转换成字符串时使用的分隔符，默认或设为undefined将使用','BUG（传入undefined IE7-会错误地使用'undefined'作为分隔符）

**注意**：某一项为null或undefined时通过上述方法将返回空字符串。


## 2.3 栈方法(数组末尾作为栈顶)

### push()
接受任意数量的参数，逐个添加到数组末尾，并返回修改后数组的长度

```js
param{any} 要添加到数组末尾的值或引用
...
return {Number} 修改后数组的长度
```
### pop()
从数组末尾移除最后一项，减少数组的length值，然后返回移除的项

```
return {any} 移除的项
```


```js
var colors = new Array();    //创建一个数组
var count = colors.push('red', 'green');    //推入两项
alert(count);    //2
count = colors.push(black);    //推入另一项
alert(count);    //3
var item = colors.pop();    //取得最后一项
alert(item);    //'black'
alert(colors.length);    //2
```

## 2.4 队列方法(FIFO)

+ 由后向前移动: shift()和push()配合实现
+ 由前往后移动: pop()和unshift()


### shift()

移除数组中的第一项并返回该项，同时将数组长度减一。

```js
var colors = new Array();
var count = colors.push('red', 'green');    //推入两项
alert(count);    //2
count = colors.push('black');    //推入另一项
alert(count);    //3
var item = colors.shift();    //取得第一项
alert(item);    //'red'
alert(colors.length);    //2
```

### unshift()
在数组前端添加任意个项兵返回新数组的长度。
**BUG**: IE7-的unshift()方法总是返回undefined而不是数组的新长度，IE8兼容模式下返回正确。

```bash
var colors = new Array();
var count = colors.unshift('red', 'green');    //推入两项
alert(count);    //2
count = colors.unshift('black');    //推入另一项
alert(count);    //3
var item = colors.pop();    //取得最后一项
alert(item);    //'green'
alert(colors.length);    //2
```

## 2.5 重排序方法

### reverse()
反转数组项的顺序

```js
var values = [1, 2, 3, 4, 5];
values.reverse();
alert(values);    //5,4,3,2,1
```

### sort()
接受一个比较函数函数来排序，默认按升序排列(调用每个数组项的toString()转型方法转化为字符串然后对字符串排序)

```js
//1.无参数
var values = [0, 1, 5, 10, 15];
values.sort();
alert(values);    //0, 1, 10, 15, 5
//2.传入比较函数
/*
*比较函数接受两个参数
*/
function compare(value1, value2){
//升序
if(value1 < value2){
    return -1;
}else if(value1 > value2){
    return 1;
}else{
    return 0;
}
}
/*
function cpmpare(value1, value2){
return value1 - value2;
}
*/
var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values);    //0, 1, 5, 10, 15
```

## 2.6 操作方法
### concat()
基于当前数组中设为所有项创建一个新数组

**详情**

1. 创建当前数组的一个副本；
2. 将接收到的参数[数组|元素][每一项分别添加|添加]到副本的尾部；
3. 返回新构建的数组。

**特点**：不会影响原始数组

```js
var colors = ['red', 'green', 'blue'];
var colors2 = colors.concat('yellow', ['black', 'brown']);
alert(colors);    //'red, green, blue'
alert(colors2);    //'red, green, blue， black, brown'
```

slice()
接受1或2个参数，返回当前数组的一部分

**情景**

+ `一个参数`：返回指定位置到数组末尾的所有项；
+ `两个参数`：返回起始位置到结束位置（不包含）的项。    
+ `参数有负值`：数组长度+该值 = 位置

**特点**：不会影响原始数组

```js
var colors = ['red', 'green', 'blue', 'yellow', 'purple'];
var colors2 = colors.slice(1);
var colors3 =   colors.slice(1,4);
alert(colors);    //'red, green, blue, yellow, purple'
alert(colors2);     //'green, blue, yellow, purple'
alert(colors3);    //'green, blue, yellow'
```

### splice()
最强大的操作数组的方法

**特点**：影响原始数组，返回删除的项或[]

用途|需要参数个数|参数说明
---|---|---
删除|2|要删除的第一项的位置， 删除的项数
插入|3+|起始位置, 0， 插入的项, ...|
替换|3+个参数|起始位置， 要删除的项数， 插入的项, ...(要删除的项数 = 插入的项数)

```js
var colors = ['red', 'green', 'blue'];
var removed = colors.splice(0, 1);    //删除第一项
alert(colors);    //'green, blue'
alert(removed);    //red, 返回数组中只包含一项
removed = colors.splice(1, 0, 'yellow', 'orange');    //从位置1开始插入两项
alert(colors);    //'green, yellow, orange, blue'
alert(removed);    //[]
removed =  colors.splice(1, 1, 'red', 'purple');    //插入两项，删除一项
alert(colors);    //'green, red, purple, orange, blue‘
alert(removed);    //yellow,返回的数组中只包含一项
```


## 2.7 位置方法(2 )
`ECMAScript 5`

### indexOf()
从前往后查找
**参数**: 要查找的项,[和表示查找起点位置的索引]，**返回**: 查找的项在数组中的位置（没找到返回-1）

### lastIndexOf()
从末尾向前查找,其它同上


`IE9+	Firefox2+	Safari3+	Opera9.5+	Chrome`

## 2.8 迭代方法(5)
 `ECMAScript 5`
### 共同点
**两个参数**

+ 参数一：在每一项上运行的函数
+ 参数二：运行函数的作用域对象（影响 this 的值）

**传入函数中的方法包含三个参数**

+ 参数一：数组项的值
+ 参数二：该项在数组中的索引下标
+ 参数三：数组对象本身

**都不会修改数组中包含的值。**

### 方法

迭代方法|说明
---|---
every()|对数组中的每一项给定函数，每一项都返回true，则返回true
filter()|对数组中的每一项给定函数，返回会返回true的项组成的数组
forEach()|对数组中的每一项给定函数,没有返回值
map()|对数组中的每一项给定函数 ，返回每次函数调用的结果组成的数组
some()|对数组中的每一项给定函数,只要有一项返回true,就返回true


`IE9+	Firefox2+	Safari3+	Opera9.5+	Chrome  `

## 2.9 缩小方法（2个）
`ECMAScript 5`

`IE9+	Firefox2+	Safari3+	Opera9.5+	Chrome  `

### 共同点
**两个参数**

+ 参数一：param {function} 在每一项上调用的函数（4个参数）

回调函数参数|说明
---|---
参数一|前一个值
参数二|当前值
参数三|项的索引
参数四|数组对象

+ 参数二(可选)：作为缩小基础的初始值

### 方法
#### reduce()
从第一项开始迭代数组的所有项，然后构建一个最终返回的值

```js
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev,cur,index,array){
return prev + cur;
});
alert(sum);    //15
```

#### reduceRight() 
从最后一项开始迭代数组的所有项，然后构建一个最终返回的值

```js
var values = [1,2,3,4,5];
var sum = values.reduceRight(function(prev,cur,index,array){
return prev + cur;
});
alert(sum);    //15
```

# 3 Date类型
`new Date([日期的毫秒数或表示日期的字符串或GTM日期参数])`

## 参数情景

+ 一个(String)

+ 一个(Number)
    
+ 多个

第n个参数|代表|范围|默认值|必须
---|---|---|---|---
1|年|（无）|（无）|是
2|月|0-11|（无）|是
3|日|1-31|1|否
4|时|0-23|0|否   
5|分|0-59|0|否   
6|秒|0-59|0|否   
7|毫秒|0-999|0|否   

```js
var nowDate = new Date();    //当前时间
var specifyDate = new Date(1409540631971);
var parseDate = new Date('May 25, 2014');    //后台自动调用Date.parse()将字符串转为毫秒数
var utcDate = new Date(2014, 4, 5, 17, 55, 55);     //将根据本地时区转换为毫秒数（不同于Date.UTC(),后者参照GTC(格林尼治)）
```

**特点**

+ 基于Java的java.util.Date构建；
+ 使用UTC毫秒数保存日期（1970.01.01 +-    285616年）。

## 日期格式转毫秒数
### Date.parse('日期')

```js
var someDate = new Date(Date.parse('May 25, 2004'));
```

ECMAScript-262没有定义支持哪种日期格式，通常因地区而异。

美国地区

日期格式|例子|兼容性
---|---|---
'月/日年'|'6/13/2004';|
'英文月  日, 年'|'January 12, 2004';|
YYYY-MM-DDTHH:mm:ss:sssZ|2004-05-25-T00:00:00|ECMAScript 5

### Date.UTC(n个参数)

```js`
//GMT时间2000年1月1日午夜零时
var y2k = new Date(Date.UTC(2000,0));
//GMT时间2014年9月1日上午10:53
var y2k = new Date(Date.UTC(2014, 8, 1, 10, 53));
```
`
**参数**

第n个参数|代表|范围|默认值|必须
---|---|---|---|---
1|年|（无）|（无）|是
2|月|0-11|（无）|是
3|日|1-31|1|否
4|时|0-23|0|否   
5|分|0-59|0|否   
6|秒|0-59|0|否   
7|毫秒|0-999|0|否  

### Date.now()

```js
new Date.getTime();
```

`''+new Date()` 兼容性更好，推荐

```js
//取得开始时间
//var start = new Date().getTime();
//var start = +new Date();
var start = Date.now();   
doSomething();
//取得停止时间
var stop = Date.now(),
result = stop - start;
```

`IE9+	Fire 3+	Firefox 3+	Safari3+	Opera 10.5	Chrome
`

## 3.1 继承（重写）的方法
**注意**：不同浏览器差异非常大

```js
new Date().toString() // 返回带有时区信息的日期和时间。
new Date().toLocalString() // 按照浏览器设置的地区相适应的格式返回日期和时间，包含AM或PM但不包含时区。
new Date().valueOf() // 返回毫秒数。
```

## 3.2 日期格式化方法（对象）
**注意**：没有哪一个方法能在用户界面显示一致的信息

+ toDateString()
+ toTimeString()
+ toLocalDateString()
+ toLocalTimeString()
+ toUTCString()    
+ toGTMString() (不推荐)

## 3.3 日期/时间组件方法

![](media/14908893260542.jpg)


# 4 RegExp实例属性

## 4.1 RegExp实例属性

## 4.2 RegExp实例方法    

## 4.3 RegExp构造函数属性

## 4.4 模式的局限性

# 5 Function类型（函数是对象，函数名是指针）

**函数声明**

```js
/*
* 特点
* 1.具有局限性，不能定义在if、while、for、try-catch等结构中
* 2.可以定义在被引用后（函数声明提前）
*/
function sum(num1, num2){
    return num1+num2;
}
```

**函数表达式**

```
/*
* 特点
* 1.可以定义在任何位置
*/
var sum = function(num1, num2){
return num1 + num2;
};
Function构造函数
/*
* 最后一个参数是函数体，前面的所有参数枚举出新函数的参数
* 特点：
* 1.存在性能问题，需要解析两次（第一次是解析常规ECMAScript代码；第二次解析传入构造函数的字符串）
* 2.执行环境为window
* 3.可以看作一种函数表达式
*/
var sum = new Function(num1, num2){
return num1 + num2;
};
```

## 5.1 没有重载（深入理解）

## 5.2 函数声明与函数表达式

## 5.3 作为值的函数


```js
/**
* 对数组对象进行排序的比较函数
* @param{string} propertyName 按照哪个属性来排序
* @return{function} 比较函数
*/
function createComparisonFunction(propertyName){
return function(obj1, obj2){
    var value1 = obj1[propertyName];
    var value2 = obj2[propertyName];
    if(value1 < value2){
        return -1;
    }else if(value1 > value2){
        reuturn 1;
    }else{
        return 0;
    }
};
}
var data = [{name:'Zachary', age:28}, {name:'Nicholas', age:29}];
data.sort(createComparisonFunction('name');
alert(data[0].name);    //Nicholas
data.sort(createComparisonFunction('age');
alert(data[0].name);    //Zachary 
```

## 5.4 函数内部属性

### arguments
类数组对象

**arguments.callee**(ECMAScript 5)
指向拥有这个arguments对象的函数                

```js
function factorial(num){
    if(num <= 1){
        return 1;
    }else{
        return num * arguments.callee(num-1);
    }
}
```

**arguments.caller(或者 caller)**(ECMAScript 5)

指向调用者   

``js
function outer(){
    inner();
}
function(){
    //严格模式下导致错误
    alert(arguments.callee.caller);
}
outer();
```

## 5.5 函数属性和方法
### length
函数希望接收的命名参数的个数

```js
function sayName(name){
    alert(name);
}
function sum(num1, num2){
    return num1 + num2;
}
function sayHi(){
    alert('hi');
}
alert(sayName.length);    //1
alert(sum.length);    //2
alert(sayHi.length);    //0
```

### prototype
（不可枚举）指向原型的指针，保存着所有的实例方法
### apply()
每个函数都包含该方法，用于在特定的域中调用。接受两个参数（作用域和参数数组）

```js
function sum(num1, num2){
   return num1 + num2;
}
function callSum1(num1, num2){
    return sum.apply(this, arguments);    //传入arguments对象数组(apply将其当作一个普通数组使用)
}
function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]);    //传入arguments对象
}
alert(callSum1(10, 10));    //20
alert(callSum2(10,10));    //20
```

### call()
和apply()类似，不过传递给函数的参数必须逐个列出来而不是给数组

```js
function sum(num1, num2){
    return num1 + num2;
}
function callSum(num1, num2){
    return sum.call(this, num1, num2);    //传入arguments对象数组(apply将其当作一个普通数组使用)
}
alert(callSum1(10, ));    //20
bind(): （ECMAScript 5）会创建一个函数实例并将this传递给bind()函数
window.color = 'red';
var o  = {color:'blue'};
function sayColor(){
    alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor();    //blue
```

`IE9+	Firefox4+	Safari 5.1+	Opera 12+
	Chrome`

# 6 基本包装类型
**特点**：自动封装与解封装

1. 创建String类型的一个实例；
2. 在实例上调用指定的方法；
3. 销毁这个实例。

```js
//情况一：基本类型调用相应包装类型的方法时自动封装
var s1 = 'some text';
var s2 = s1.substring(2);
//情况二：Object构造函数根据传入的值得类型返回基本包装类型实例
var obj = new Objetc('some text');
alert(obj instanceof String);    //true
//情况三：转型函数，不同于使用new调用包装类型的构造函数
var value = '25';
var number = Number(value);   
alert(typeof number);    //'number'
```

## 6.1 Boolean类型（不推荐使用）
```js
var falseObject = new Boolean(false);
var falseValue = false;
alert(typeof  falseObjetc);    //'objetc'
alert(typeof falseValue);    //false
```

+ toString(): Boolean类型重写该方法，返回字符串'true'和'false'
+ valueOf(): Boolean类型重写该方法，返回基本类型true或false

## 6.2 Number类型
方法|说明
---|---
valueOf()|返回表示基本类型的数值
toString() OR toLocalString()|返回字符串形式的数值
toFixed()|接受一个参数，按照指定的小数位返回数值的字符串表示（IE8存在BUG）
toRxponential()|使用e表示法接收一个参数，指定结果中的小数位数
toPrecision()|返回固定大小格式或指数形式，接受一个参数，表示数值的所有数组位数（不包括指数部分）

```js
var num = 10.005;
alert(num.toFixed(2));    //'10.01'
alert(num.toExponential(2));    //'1.00e+1'
alert(num.toPrecision(2));    //'10'
```

## 6.3 String类型
### length
表示字符串中包含的字符数量

### 字符方法
都接受一个参数：基于0的字符位置

字符方法|说明
---|---
charAt()|以单字符字符串的形式返回给定位置的字符
charCodeAt()|以字符编码的形式返回给定位置的字符的字符编码
stringObj[num]|(ECMAScript 5)使用方括号加数字索引来访问字符串的特定字符

```js
var stringValue = 'hello world';
alert(stringValue.charAt(1));    //'e'
alert(stringVlaue.charCodeAt(1));    //'101'
alert(stringVlaue[1]);
```

### 字符串操作方法

#### concat()
将多个字符串拼接起来，返回拼接得到的新字符串

```js
var stringValue = 'hello';
var result = StringValue.concat('world', '!');
alert(result);    //'hello world!'
alert(stringValue);    //'hello'
```

#### slice(startIndex, [endIndex])
返回从startIndex到endIndex（不包括，如果不指定默认到字符串结尾）；参数为负数与字符串的长度相加    
#### substr(startIndex, subLen)
返回从startIndex开始长度为subLen的子串；第一个参数为负加上字符串的长度，第二个为负转为0（IE8存在BUG）
substring(startIndex, [endIndex]

返回从startIndex到endIndex（不包括，如果不指定默认到字符串结尾），将所有负值转为0

```js
//正值
var stringValue = 'hello world';
alert(stringVlaue.slice(3));    //'lo world'
alert(stringValue.substring(3));    //'lo  world'
alert(stringValue.substr(3));    //'lo  world'
//负值
alert(stringVlaue.slice(3, 7));    //'lo w'
alert(stringValue.substring(3, 7));    //'lo w'
alert(stringValue.substr(3, 7));    //'lo worl'
```

### 字符串位置方法

#### indexOf(item,[startIndex])
`item{string}` 从一个字符串中搜索第一个给定的子字符串，`[startIndex]`指定开始搜索的位置，返回子字符串的位置（没有返回-1）
#### lastIndexOf(item)
从后往前搜索，其它同上

```js
var stringValue = 'hello world';
alert(stringValue.indexOf('o', 6));    //7
alert(stringValue.lastIndexOf('0', 6));    //4
```

### trim()方法
`ECMAScript 5`，创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。

```js
var stringValue = '    hello world    ';
var trimmedStringVakue = stringValue.trim();
alert(stringValue);    //'    hello world    '
alert(trimmedStringValue);    //'hello world'
```

`IE9+	Firefox3.5+	Safari5+	Opera10.5+	Chrome`

**两个非标准的方法**

+ trimLeft()
+ trimRight()

`Firefox3.5+	Safari5+	Chrome8+``

**字符串大小写转换方法**

+ toLowerCase(): 转换成小写
+ toLocalLowerCase(): 转换成小写（只针对特定地区的实现）
+ toUpperCase(): 转换成大些
+ toLocalUpperCase(): 转换成大写（只针对特定地区的实现）

### 字符串的模式匹配方法

#### match([正则表达式|RegExp对象])
本质上与调用EegExp.exec()相同,返回一个数组，数组的第一项是与整个模式匹配的字符串，之后的每一项保存着与正则表达式中的捕获组匹配的字符串。

```js
var text = 'cat, bat, sat, fat';
var pattern =/.at/;
//与pattern.exec(text)相同
var matches = text.match(pattern);
alert(matches.index);    //0
alert(matches[0]);    //'cat'
alert(pattern.lastIndex);    //0
```

#### search([正则表达式|RegExp对象])
返回字符串中第一个匹配项的索引，没有返回-1。该方法始终从字符串开头向后查找模式。

```js
var text = 'cat, bat, sat, fat';
var pos = text.search(/at/);
alert(pos);    //1  
``` 

#### replace([正则表达式|RegExp对象], [字符串|函数])
如果第一个参数是字符串，只会替换第一个字符串；如果要替换所有子字符串就要提供一个正则表达式，并制定全局（g）标志。第二个参数如果是字符串，还可以使用一些特殊的字符序列。

```js
var text = 'cat, bat, satm fat';
var result = text.replace('at', 'ond');
alert(result);    //'cond, bat, sat, fat'
result = text.replace(/at/g, 'ond');
alert(result);    //'cond, bond, sond, fond'
```

第二个字符串是字符串：使用特殊字符

```js
var text = 'cat, bat ,sat, fat';
result = text.replace(/(.at)/g, 'word{$1}');
alert(result);    //word(cat), word(bat) ,word(sat), word(fat)
```

第二个参数是函数
`函数参数（模式的匹配项，第一个捕获组的匹配项，第二个捕获组的匹配项，...）`

```js
function htmlEscape(text){
return text.replace(/[<>"&]/g, function(match, pos, originalText){
    switch(match){
        case '<':
            return '$lt;';
        case '>':
            return '>';
        case '&':
            return '&';
        case '\"':
            return '"';
    }
});
}
alert(htmlEscape('<p class="greeting">Hello world!</p>'));    //<p class=$quot;greeting">Hello world!</p>
```

#### split(stringValue, [arrarLength])
基于指定的分隔符将一个字符串分割成为多个子字符串，并将结果放在一个数组中。可以使用正则表达式（因浏览器而异）
```js
var colorText = 'red, blue, green , yellow';
var colors1 = colorText.split(',');    //['red', 'blue', 'green', 'yellow']
var colors2 = colorText.split(',', 2);    //['red', 'blue']
var colors3 = colorText.split(/[^\,] +/);    //["", ",", ",", ",", ""]
```

#### localCompare()
比较字符串

+ 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大部分情况下是-1）
+ 如果字符串等于字符串参数，返回0；
+ 如果字符串在字母表中应该排在字符串参数之后，返回一个整数（大部分时候是1）.

```js
var stringValue = ''yellow;
alert(stringValue.localeCompare('brick'));    //1
alert(stringValue.localeCompare('yellow'));    //0
alert(stringValue.localeCompare('zoo'));
```

#### fromCharCode()
接收一或多个字符编码，然后将它们转换成一个字符串。与实例方法chaeCodeAt()执行相反的操作。

```js
alert(String.fromCharCode(104, 101, 108, 111));    //'hello'
```
### HTML方法

# 7 单体内置对象
由ECMAScript实现提供的、不依赖数组环境的对象，这些对象在ECMAScript程序执行之前就已经存在了。包括：Object、Array和String.

## 7.1 Global对象
事实上没有所谓全局变量或全局函数，所有不属于任何其他对象的属性和方法，最终都是它的对象和方法。包括`isNaN()`、`isFinnite()`、`parseInt()`以及`parseFloat()`,其它方法如下:

### 1. URL编码方法
encodeURI(): 对整个URI进行编码，用特殊的UTF-8编码替换所有无效的字符。不会对本身属于URI的特殊字符进行编码，例如冒号、正斜杠、问号和井字号。
encodeURIComponent(): 对URI的某一段进行编码，会对它发现的任何非标准字符进行编码。(更常用，应为实践中更多只对查询字符串参数进行编码)

```js
var uri = 'http://www.wrox.com/illegal value.htm#start ';
//'http://www.wrox.com/illegal%20value.htm#start'
alert(encodeURI(uri));
//'http%3A%2F%2Fillegal%20value.htm%23start'
alert(encodeURIComponent(uri));
```

### decodeURI()
解码encodeURI()编码的URI

### decodeURICompoment()
解码encodeURIComponebt()编码的URI

```js
var uri = 'http%3A%2F%2Fillegal%20value.htm%23start';
//http%3A%2F%2Fillegal%20value.htm%23start
alert(decodeURI(uri));
//http://www.wrox.com/illegal value.htm#start
alert(decodeURIComponent(uri));
```

ECMA-262第三版废弃的解码编码方法: escape()、unescape()
**注意**：只能正确编码ASCII字符

### 2. eval()方法
该方法相当于一个完整的ECMAScript解析器

+ 通过eval()执行的代码被认为是包含该次调用的执行环境的一部分，具有与执行环境相同的作用域链；
+ 只在eval()执行的时候创建，没有声明提升；
+ 严格模式下在，外部访问不到eval()中创建的任何变量和函数。

```js
var msg = 'hello world';
eval('alert(msg);');    //'hello world'
```
### 3. GLobal对象的属性
![](media/14908905751619.jpg)


**注意**：ES5明确禁止给undefined、NaN和Infinity赋值

### 4. window对象: 在浏览器中Global对象是作为window对象的一部分来实现的

```js
//没有给函数明确指定this值得情况下，无论是通过将函数添加为对象的方法
//还是调用call()或apply(),this值等于Global对象
var global = function(){
    return this;
}();
```

## 7.2 Math对象
### 1. Math对象的属性
![](media/14908908169382.jpg)

### 2. min()和max()方法
```js
//参数中的最大值
var max = Math.max(3, 54, 32, 16);
alert(max);    //54
var min = Math.min(3, 54, 32, 16);
alert(min);    //3
//数组中的最大值
var values = [1, 2, 3, 4, 5, 6];
max = Math.max.apply(Math, values);
```

### 3. 舍入方法

+ Math.ceil(): 执行向上舍入
+ Math.floor(): 执行向下舍入
+ Math.round(): 四舍五入

### 4. random()方法: 返回介于0-1之间的一个随机数

```js
function selectFrom(lowerValue, upperValue){
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
}
var num = selectFrom(2,10);
alert(sum);    //介于2和10之间（包含）的一个数
```

### 5. 其他方法

