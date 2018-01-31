---
title: 03 基本概念
categories: [JS高级程序设计(第三版)]

tag:
    - js
date: 2014-08-26 14
---

## 3.1 语法

### 3.1.1 区分大小写


### 3.1.2 标识符


- 第一个字母：    字母、_、$
- 其它字母：     字母、_、$、数字
- 驼峰大小写格式（ECMAScript惯例但不强制）

### 3.1.3 注释
### 3.1.4 严格模式

**启用方式**

- 在整个脚本中启用

```js
//在顶部添加
2."use strict"
```

- 指定某些函数在严格模式下执行

```js
function doSomething(){
    "use strict"
    //函数体
}
```
**行为特点**

- 在ECMAScript 5中开始支持严格模式
- 严格模式下ECMAScript3的一些不确定行为将会处理
- 某些不安全的操作会抛出错误

### 3.1.5 语句


**分号结尾**（不推荐省略分号）

- 避免不完整的输入；
- 可以放心地通过删除多余的空格来压缩ECMAScript代码；
- 在某些情况下会增进性能；

**代码块使用{}**(可以省略的情况下也不推荐省略)

- 编码意图更加清晰；
- 降低修改代码时出错的几率；

## 3.2 关键字和保留字

**关键字(26)**

| break  | case  | catch      | continue | debugger* | default  |
| ------ | ----- | ---------- | -------- | --------- | -------- |
| delete | do    | else       | finally  | for       | function |
| if     | in    | instanceof | new      | return    | switch   |
| this   | throw | try        | typeof   | var       | void     |
| while  | with  |            |          |           |          |


**保留字（第三版全部+第五版let、yield）(31)**

| abstract | boolean | byte       | char         | class     | const     |
| -------- | ------- | ---------- | ------------ | --------- | --------- |
| debugger | double  | enum       | export       | extends   | final     |
| float    | goto    | implements | import       | int       | interface |
| long     | native  | package    | private      | protected | public    |
| short    | static  | super      | synchronized | throws    | transient |
| volatile |         |            |              |           |           |

**保留字（第五版 严格模式 8）**

|class |const |enum |extends |super |export |import |
|---|---|---|---|---|---|---|

**保留字（第五版 严格模式 额外施加限制的部分）**

`implements package public interface private protected let static yield `

## 3.3 变量


特点：松散类型（可以保存任何类型的数据）

**使用：**

- 局部变量

```js 
//函数内部定义+var
function test(){
    var message = "hi";//函数退出时销毁
}
```

-  全局变量

```js
/*
2.*函数外部定义+var
3.*/
var message = 'hi';
/*函数内部定义+省略var(不推荐)+赋值
6.*只要调用一次test函数，globalVar就有了定义，就可以在函数外部的任何地方被调用
7.*严格模式下给未经声明的变量赋值会抛出ReferenceError错误
8.*/
function test(){
    globalVar = "hi";
}
```
**注意：**

- 可以使用一条语句定义多个变量，初始化和不初始化均可；

```js
//通过换行和缩进提高可读性
var message = "hi", 
      found = false, 
      age = 29;
```


- 在严格模式下，不能定义名为eval或arguments的变量，否则会导致语法错误

## 3.4 数据类型


**基本数据类型（简单数据类型）（5）**


|Undefined |Null |Boolean |Number |String |
|---|---|---|---|---|

**复杂数据类型（1）**

`Object`

### 3.4.1 typeof操作符

**说明：**检测给定变量的数据类型，返回字符串
**注意：**

- null被认为是一个空对象；
- 函数是特殊的对象，typtof对函数和普通对象进行了区分；
- Sfari 5-、Chrome 7-在对正则表达式调用typeof是返回"function"，其它返回"Object"


**使用：**

```js
var message = "some string";
alert(typeof message);//变量或直接量都可以

```

**返回值：**

| 类型说明    | “typeof”    |
| ------- | ----------- |
| 未声明     | "undefined" |
| 布尔值     | "boolean"   |
| 字符串     | "string"    |
| 数值      | "number"    |
| 对象或null | "object"    |
| 函数      | “function”  |

​    


### 3.4.2 Undefined类型（派生自Null）
**两种情况：**

```js
//1.    声明后默认取得undefined
var message;
//2    下面这个变量没有声明
//var age;

//不同点：两种变量从技术角度看有本质区别
alert(message);//"undefined"
alert(age);//产生错误

//相同点：无论哪种变量都无法执行有意义的操作
alert(typeof message);//"undefined"
alert(typeof age);//"undefined"
```
### 3.4.3 Null类型


**特点：**    只有一个值（null）得数据类型
**null:**   空对象指针

```js
var car = null;
alert(typeof car);//"object"
```
**使用：** 如果定义的变量将来用来引用对象，最好将该变量初始化为null,方便判断该变量是否已经保存了一个对象的引用

```js
if(car != null){
    //执行体
}
```

**null和undefined:**

-  联系：

```js
alert(null == undefined);//true
```

-  区别：无论在什么情况下都没有必要把一个变量的值显式设置为undefined，同样的规则对null不适用。

### 3.4.4 Boolean类型
**两个字面值:    true和false**区分大小写
**各种类型转换为Boolean类型：**

![Alt text](http://o6ul1xz4z.bkt.clouddn.com/1450437407740.png)
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/1450437420236.png)


### 3.4.5 Number 类型
**特点：**使用IEEE754格式来表示整数和浮点数（双精度数值），存在舍入误差

**整数分类：**在进行计算时都被转成十进制计算

- 十进制
- 八进制（在严格模式下不支持）：第一位必须为0
- 十六进制  ：前两位必须是0x

#### 1. 浮点数值（最该精度17位小数）
**写法**

```js
var floatNum1 = 1.1;
var floatNum2 = .1;//表示0.1,不推荐
var floatNum3 = 1.;//表示1.0，会被解析为整数1，不推荐
var floatNum4 = 3e-2;//0.03，科学记数法，小数点后带有6个0以上会被自动转为科学记数法表示
```

#### 2. 数值范围
- 最小数
  Number.MIN_VALUE(5e-324)

- 最大数
  Number.MAX_VALUE(1.7976931348623157e+308)

- 查出范围的值（无法继续参与运算）
  -Infinity(负无穷)    Infinity(正无穷)
  或
  Number.NEGATIVE_INFINITY(负无穷)    Number.POSITIVE_INFINITY(正无穷)    
  检测数值是否有效

```js
var result = NUmber.MAX_VALUE+Number.MAX_VALUE;
alert(isFinate(result));    //false
```

#### 3. NaN（Not a Number）


**特点：**

- 任何涉及NaN的操作都返回NaN;
- NaN和任何值都不想等，包括其本身

```js
alert(NaN == NaN);//false
```

- isNaN(val)    ----检测一个值是否是NaN


#### 4. 数值转换（非数值->数值）

- 任何类型->数值：    Number()
  ![Alt text](http://o6ul1xz4z.bkt.clouddn.com/1450437456592.png)

- 字符串->整数：    parseInt()
- 字符串->浮点数：    parseFloat()


### 3.4.6 String类型

**说面：**    用于表示由零个或多个16位Unicode字符组成的字符序列
**注意：**以单引号开头必需以单引号结尾，双引号亦。

#### 1. 字面直接量
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/1450437474657.png)


#### 2. 字符串的特点
不可变的^#{1,4}\d


#### 3. 转换为字符串

**toString():**  null和undefined以外的所有数据类型都包含该方法

- 非数字调用toString()：    没有参数
- 数字调用toString():    可以传递一个参数，指定输出任意有效进制格式的字符串

```js
var num =10;
alert(num.toString());//"10"
alert(num.toString(2));//"1010"    
alert(num.toString(8));//"12"   
alert(num.toString(10));//"10"   
alert(num.toString(16));//"a"   
```

**String():**不知道要转换的值是不是null和undefined的情况下使用

- 有toString()方法直接调用；
- 值是null，返回“null”;
- 值是undefined，返回"undefined"；

**val+"":**   隐式调用toString()


### 3.4.7 Object 类型
**注意：**ECMA-262不负责定义宿主对象，因此BOM和DOM中的宿主对象可能会也可能不会继承Object。
**Object的每个实例都具有下列属性和方法：**

- Constructor：    保存着用于创建当前对象的函数；
- hasOwnProperty(propertyName):    用于检查传入的对象是否是另一个对象的原型；
- propertyIsEnumerable(propertyName):    用于检查给定的属性能否使用for-in枚举；
- toLocaleString():    返回对象的字符串表示，该字符串与执行环境的地区对应；
- toString():    返回对象的字符串表示
- valueOf():    返回对象的字符串、数值或布尔值表示。通常与toString()方法的返回值相同。

## 3.5 操作符

### 3.5.1 一元操作符

☑ 说明: 只能操作一个值的操作符叫做一元操作符。

#### 递增和递减操作符

☑ 分类

| 分类   | 前置型  | 后置型  |
| ---- | ---- | ---- |
| 递增   | ++i  | i++  |
| 递减   | --i  | i--  |

☑ 操作数类型: 任何类型的值(整数、字符串、布尔值、浮点数值、对象)

| 操作数类型          | 运算前自动转换为                                 |
| -------------- | ---------------------------------------- |
| 字符串(包含有效数字字符)  | 数字值                                      |
| 字符串(不包含有效数字字符) | NaN                                      |
| 布尔值            | 0(false) 或 1(true)                       |
| 浮点数            | 不转换                                      |
| 对象             | 先调用对象的 valueOf() 方法取得返回值，然后应用上述规则进行类型转换(如果 valueOf() 返回的也是个对象也没关系，递归调用下去，直到返回非对象的值) |

**1 前置型**

☑ 说明: 位于要操作的变量之前。

☑ 注意: 执行前置递增或前置递减时，变量的值都是在语句中被求值以前改变的（也就是存在**副效应**）。


```js
var age = 29
// 前置递增
++age // age = age + 1
```

```js
// 前置递减
var age = 29
var anotherAge = --age + 2 // (age = age - 1) + 2

age // 28
anotherAge // 30
```

**2 后置型**

☑ 说明: 位于要操作的变量之后。
☑ 注意: 在包含它们的语句被求值之后才执行。

```js
var num1 = 2
var num2 = 20

num1-- + num2 // 22

num1 // 1
```
等价于

```js
var num1 = 2
var num2 = 20

num1 + num2 // 22
num1 = num1 - 1

num1 // 1
```

**类型转换**

```js
var s1 = '2'
var s2 = 'z'
var b = false
var f = 1.1
var o = {
  valueOf: function() {
    return -1
  }
}
s1++
s1 // 3

s2++
s2 // NaN

b++
b // 1

f--
f // 0.10000000000000009

o--
o // -2
```



#### +、-
☑ 用途: 主要用于基本的算数运算，也可以像前面示例所展示的一样用语转换数据类型。

操作符|说明
---|---
+|一元加操作符(取正)
-|一元减操作符(取负)

☑ 类型转换: 对非数字应用 `+` 或 `-` ，该操作符会像 `Number()` 转换函数一样对这个值进行转换。

操作数类型|转换为
---|---
布尔值|0(false) 或 1(true)
字符串|会按照一组特殊的规则进行解析
对象|先调用她们的 valueOf() 和(或) toString() 方法，再转换得到的值

```js
var s1 = '01'
var s2 = '1.1'
var s3 = 'z'
var b = false
var f = 1.1
var o = {
  valueOf: function () {
    return -1
  }
}

+s1 // 1
+s2 // 1.1
+s3 // NaN
+b // 0
+f // 1.1
+o // -1

-s1 // -1
-s2 // -1.1
-s3 // NaN
-b // 0
-f // -1.1
-o // 1
```