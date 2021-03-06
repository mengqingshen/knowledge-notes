---
title: 2 基本运算符
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---


|基本运算|正负|自加/减|自返运算|
|-|-|-|-|
|a+b|+a|a++/++a|a+=b|
|a-b|-b|`b--/--b`|a-=b|
|a*b|||a*=b|
|a/b|||a/=b|
|a%b|||a%=b|
[toc]

## 2.1 术语
+ 运算符

|按照操作数数量分类|说明|举例|
|-|-|-|
|一元运算符|分为前值运算符和后值运算符|`!`、`++`、`--`等|
|二元运算符|在两个操作数之间|大部分运算符都属于二元运算符|
|三元运算符|和C语言一样只有一个三目运算符|`a ? b : c`|
+ 操作数：受运算影响的值叫做操作数

## 2.2 赋值运算符
>**说明：**用来跟新或初始化变量或常量。
>+ 右边如果是元组，会被分解成多个常量或变量
>+ 不返回值（不同于c和o-c）

```swift
let (x, y) = (1, 2)
```

## 2.3 算术运算符

### 2.3.1 四则运算
>**说明：**其中`+`允许操作数为字符串，此时不再是四则运算中的加法运算，而是用来拼接字符串。

|四则运算符|说明|操作数类型|
|-|-|-|
|+|加法或连接符|数值类型或字符串|
|-|减法|数值类型|
|*|乘法|数值类型|
|/|除法|数值类型（两个操作数都是整数则结果取整(`Int`)，否则为`Double`）|


### 2.3.2 求余运算符
>**说明：**在其它语言中也叫做取膜运算。
>**规则：**`余数 = a % b`，其中`a = (|b| x 倍数) + 余数`
>+ `b`的符号将会被忽略，也就是说 `a % b`和`a % -b`相同

### 2.3.3 浮点数求余运算
>**说明：**不同于`c`和`o-c`，`Swift`中可以对浮点数进行求余。

```swift
8 % 2.5// 0.5
```

### 2.3.4 自增和自减运算
>**操作对象：**整型和浮点型
>**技巧：**先修改后返回更符合我们的逻辑，因此除非需要`i++（i--）`的特性，否则推荐使用`++i(--i)`

|相对操作数的位置|自增|自减|返回值|
|-|-|-|-|
|前置|`++i`|`--i`|先自增，后返回|
|后置|`i++`|`i++`|先返回，后自增|

```swift
var a = 0
let b = ++a// a 1, b 1
let c = a++// a 2, c 1
```

### 2.3.5 一元负号运算符
>**符号：**`-`
>**说明：**写在操作数之前，中间没有空格

```swift
let three = 3
let minusThree = -three
let plusThree = -minusThree
```

### 2.3.6 一元正号运算符
>**说明：**不做任何改变地返回操作数的值
>**用途：**和负数一起使用时为整数添加`+`符号使代码看起来更加对称。

## 2.4 复合赋值

|自返运算(复合赋值)|
|-|
|a+=2|
|a-=2|
|a*=2|
|a/=2|
|a%=2|

```swift
var a = 1
a += 2// a 3
```

## 2.5 比较运算符
>**应用：**多用于`if`语句

|运算符|说明|
|-|-|
|a == b|等于|
|a != b|不等于|
|a > b|大于|
|a < b|小于|
|a === b|两个引用指向同一个对象实例|
|a !== b|两个引用不指向同一个对象实例|

```swift
let name = "word"
if name == "wword" {
    print("hello world")
}
else {
    print("I'm sorry \(name), but I don't recognize you")
}
```

## 2.6 三目运算符
>**语法：**`问题 ? 答案1 : 答案2`
>**技巧：**过度使用三目运算符会使简洁的代码变得难懂。

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
```

## 2.7 空合运算符
>**语法：**`a ?? b`
>**说明：**对可选类型`a`进行空判断，如果`a`包含一个值就进行解封，否则就返回一个默认值`b`。
+ `a ?? b`等价于`a != nil ? a! : b`
+ 表达式`a`必须是`Optional`类型
+ 默认值`b`的类型必须要和`a`存储的类型保持一致
+ 短路求值：如果`a`不是`nil`，则`b`不会被估值

```swift
let defaultColorName = "red"
var userDefinedColorName: String?// nil

var colorNameToUse = userDefinedColorName ?? defaultColorName// red
```

## 2.8 区间运算符
>**说明：**分两种
>+ 闭区间运算符（`a...b`）：包含a和b
>+ 半开区间运算符（`a..<b`）：包含a不包含b

>**应用：**在迭代一个区间的所有值时非常有用，比如在`for-in`循环中。

```swift
let names = ["Anna", "Alex", "Brain", "Jack"]
let count = names.count

for i in 0..<count {
    print("第 \(i + 1) 个人叫 \(names[i])")
}
```

## 2.9 逻辑运算符
>**说明：**一共3个

|逻辑运算符|说明|是否短路|结合性|
|-|-|-|
|`!a`|逻辑非||
|`a && b`|逻辑与|是|左结合|
|`a｜｜b`|逻辑或|是|左结合|

>**提高可读性：**
>+ 多个逻辑运算符组合运算时使用括号来明确优先级
>+ 小心地选择布尔常量或变量

```swift
if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
    print("Welcome!")
}
else {
    print("ACCESS DENIED")
}
```