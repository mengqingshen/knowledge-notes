---
title: 25 高级运算符
categories:
  - The Swift Program Language 2
tag:
  - swift语言
toc: true
---


## 25.1	位运算符
>**说明：**`Swift` 支持 `C` 语言中的全部位运算符

|符号|名称|返回值|复合运算符|
|-|-|-|-|
|`~`|按位取反|将每一个0替换成1，每一个1替换成0|`~=`|
|`&`|按位与|对两个操作数相应的位执行逻辑与运算|`&=`|
|`^`|按位亦或|对两个操作数相应的位执行逻辑或操作，都是1时产生0|`^=`|
|`\`|按位或|对两个操作数相应的位执行逻辑或操作，都是1时产生1|`\=`|
|`<<`|按位左移|左移n位的结果（左端溢出，右端补0）|`<<=`|
|`>>`|按位右移|右移n位的结果（右端溢出，左端补0或保存符号位而补1|`>>=`|
>**用途：**通常被用在底层开发中
>+ 图形编程
>+ 设备驱动
>+ 处理外部资源的原始数据（比如对自定义通信协议传输的数据进行编码和解码）


### 25.1.1	按位取反运算符
>**按位取反操作符：**`~`
>**说明：**`按位取反运算符`可以对一个数值的全部比特位进行`取反`
>**语法：**按位取反运算符是一个`前缀运算符`，需要直接放在`运算的数`之前，并且它们之间不能添加任何`空格`

```swift
// 00001111
let initialBits: UInt8 = 0b00001111

// 0b11110000
let invertedBits = ~initialBits
```

### 25.2.2	按位与运算符
>**按位与操作符：**`&`
>**说明：**`按位与运算符`可以对两个数的比特位进行合并。它返回一个新的数，只有当两个数的对应位都为 `1` 的时候，新数的对应位才为 `1`

```swift
// 11111100
let firstSixBits: UInt8 = 0b11111100
// 00111111
let lastSixBits: UInt8  = 0b00111111

// 00111100
let middleFourBits = firstSixBits & lastSixBits// 按位与运算
```

### 25.2.3	按位或运算符
>**按位或运算符：**`|`
>**说明：**`按位或运算符`可以对两个数的比特位进行比较。它返回一个新的数，只要两个数的对应位中有任意一个为 `1` 时，新数的对应位就为 `1`

```swift
// 10110010
let someBits: UInt8 = 0b10110010
// 01011110
let moreBits: UInt8 = 0b01011110

// 11111110
let combinedbits = someBits | moreBits // 按位或运算
```

### 25.2.4	按位亦或运算符
>**按位亦或运算符：**`^`
>**说明：**`按位异或运算符`可以对两个数的比特位进行比较。它返回一个新的数，当两个数的`对应位不相同`时，新数的对应位就为 `1`

```swift
// 00010100
let firstBits: UInt8 = 0b00010100
// 00000101
let otherBits: UInt8 = 0b00000101

// 00010001
let outputBits = firstBits ^ otherBits // 按位亦或运算
```

### 25.2.5	按位左移、右移运算符
>**说明：**`有符号整数`和`无符号整数`的情况有所不同。值得注意的是

|位移操作|无符号整数|有符号整数|
|-|-|-|
|左移`<<`|丢弃溢出，低位用`0`填充|丢弃溢出，低位用`0`填充|
|右移`>>`|丢弃溢出，高位用`0`填充|丢弃溢出，高位用`符号位`填充|

>**注意：**`有符号整数`中的`负数`和其它整数不同，使用的是`二进制补码`的表示形式。
>+ `减法`在底层可以用`加法`实现
>+ 可以使负数的按位左移和右移运算得到跟正数同样的`效果`

>**技巧：**移位运算（无论`有符号整数`还是`无符号整数`）遵守下面定义的规则
>+ 将一个整数`左移`一位，等价于将这个数`乘以 2`
>+ 将一个整数`右移`一位，等价于将这个数`除以 2`

## 25.2	溢出运算符
>**溢出：**默认情况下，当向一个整数赋超过它容量的值时，`Swift`默认会报错。这一意味着，不会真的发生溢出－除非使用`溢出运算符`。
>**说明：**`Swift`提供了`3`个溢出操作符，会让系统在数值溢出的时候采取`阶段操作`。

|溢出运算符|功能|
|-|-|
|`&+`|溢出加法|
|`&-`|溢出减法|
|`&*`|溢出乘法|

```swift
/***** &+ ****/
//  11111111
var unsignedOverflow = UInt8.max// 255
// 100000000 -> 00000000
unsignedOverflow = unsignedOverflow &+ 1// 0

/**** &- ****/
// 00000000
unsignedOverflow = UInt8.min// 0
// 111111111 -> 11111111
unsignedOverflow = unsignedOverflow &- 1// 255

// 10000000
var signedOverflow = Int8.min// -128
// 01111111
signedOverflow = signedOverflow &- 1// 127

```

### 数值溢出
>**说明：**数值溢出分为`上溢`和`下溢`
>**技巧：**对于整数型数值（无论是`有符号`还是`无符号`）
>+ 最大数：上溢1变成最小的数
>+ 最小数：下溢1变成最大的数

## 25.3	优先级和结合性
>**说明：**相比`C语言`和`Object-C`，`Swift`的运算符优先级和结合型规则更加简洁和可预测。


## 25.4	运算符函数
>**运算符重载：**`类`或`结构`可以为现有的操作符提供自定义的实现。

### 25.4.1	中缀运算符
>**说明：**也叫做`双目运算符`出现在两个`目标`之间，比如`+`

```swift
// 结构体（平面向量）
struct Vector2D {
    var x = 0.0, y = 0.0
}

/**
* 重载“加号”，定义 Vector2D 类型实例之间的“加法”
* @param {Vector2D} left 左边的操作数
* @param {Vector2D} right 右边的操作数
* @return {Vector2D} 向量之和
*/
func + (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y + right.y)
}

// 操作数1
let vector = Vector2D(x: 3.0, y: 1.0)
// 操作数2
let anotherVector = Vector2D(x: 2.0, y: 4.0)
// 相加
let combinedVector = vector + anotherVector
```

### 25.4.2	前缀和后缀运算符
>**说明：**`单目运算符`有`前缀`和`后缀`之分。

|单目运算符|说明|重载使用的关键字|
|-|-|-|
|`前缀`|运算符出现在值之前|`prefix`|
|`后缀`|运算符出现在值之后|`postfix`|

```swift
// 结构体（平面向量）
struct Vector2D {
    var x = 0.0, y = 0.0
}

/**
* 获取相反向量
* @param {Vector2D} vector 向量实例
* @return {Vector2D} 相反向量
*/
prefix func - (vector: Vector2D) -> Vector2D {
    return Vector2D(x: -vector.x, y: -vector.y)
}

// (3.0, 4.0)
let positive = Vector2D(x: 3.0, y: 4.0)

// (-3.0, -4.0)
let negative = -positive
```

### 25.4.3	复合赋值运算符
>**说明：**重载`复合赋值运算符`（比如`+=`、`++`、`--`）
>+ 第一个参数必需声明为`inout`类型，因为这个参数的值会在运算符函数内直接被修改

>**注意：**不能对默认的`赋值运算符`和`三目条件运算符 `进行重载。只有组合赋值运算符可以被重载。

```swift
// 结构体（平面向量）
struct Vector2D {
    var x = 0.0, y = 0.0
}

/**
 * 重载"+"
 * @param {Vector2D} left 左边的操作数
 * @param {Vector2D} right 右边的操作数
 * @return {Vector2D} 向量之和
 */
func + (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y + right.y)
}

/**
* 重载 "+="
* @param {Vector2D} inout left 原始向量
* @param {Vector2D} left 增量部分
*/
func += (inout left: Vector2D, right: Vector2D) {
    left = left + right
}

/**
* 重载前缀 "++"
* @param {Vector2D} inout vector 要自增的向量
*/
prefix func ++ (inout vector: Vector2D) -> Vector2D {
    vector += Vector2D(x: 1.0, y: 1.0)
    return vector
}

var toIncrement = Vector2D(x: 3.0, y: 4.0)
let afterIncrement = ++toIncrement

```

### 25.4.4	等价操作符
>**说明：**属于`中缀运算符`（或`双目运算符`），包括`==`和`!=`
>**扩展：**自定义的`类`和`结构体`没有对`等价运算符`进行默认实现，为了使用`等价运算符`能对自定义的类型进行`判等运算`，需要为其提供自定义实现

```swift
// 结构体（平面向量）
struct Vector2D {
    var x = 0.0, y = 0.0
}

/**
 * 重载"＝＝"
 * @param {Vector2D} left 左边的操作数
 * @param {Vector2D} right 右边的操作数
 * @return {Bool} 是否"相等"的结果
 */
func == (left: Vector2D, right: Vector2D) -> Bool {
    return (left.x == right.x) && (left.y == right.y)
}

/**
 * 重载"!="
 * @param {Vector2D} left 左边的操作数
 * @param {Vector2D} right 右边的操作数
 * @return {Bool} 是否"不相等"的结果
 */
func != (left: Vector2D, right: Vector2D) -> Bool {
    return !(left == right)
}

let twoThree = Vector2D(x: 2.0, y: 3.0)
let anotherTwoThree = Vector2D(x: 2.0, y: 3.0)
if twoThree == anotherTwoThree {
    print("These two vectors are equivalent.")
}
```

## 25.5	自定义运算符
>**说明：**除了实现标准运算符，在 `Swift` 中还可以声明和实现自定义运算符。
>**参考：**可以用来自定义运算符的字符列表请参考[运算符]()。
>**语法：**新的运算符要使用 `operator` 关键字在全局作用域内进行定义，同时还要指定 `prefix`、`infix` 或者 `postfix` 修饰符。

```swift
// 结构体（平面向量）
struct Vector2D {
    var x = 0.0, y = 0.0
}

/**
 * 重载"+"
 * @param {Vector2D} left 左边的操作数
 * @param {Vector2D} right 右边的操作数
 * @return {Vector2D} 向量之和
 */
func + (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y + right.y)
}

/**
 * 重载 "+="
 * @param {Vector2D} inout left 原始向量
 * @param {Vector2D} left 增量部分
 */
func += (inout left: Vector2D, right: Vector2D) {
    left = left + right
}

prefix operator +++ {}

/**
 * 自定义"+++"：前缀双自增
 * @param {Vector2D} vector 向量
 * @return {Bool} 计算结果
 */
prefix func +++ (inout vector: Vector2D) -> Vector2D {
    vector += vector
    return vector
}
var toBeDoubled = Vector2D(x: 1.0, y: 4.0)
let afterDoubling = +++toBeDoubled
```

### 自定义中缀运算符的优先级和结合性
>**说明：**自定义的`中缀运算符`也可以指定`优先级`(默认为`100`)和`结合性`(默认为`none`)

|优先级|名称|说明|
|-|-|-|
|`left`|左结合|跟左边的值进行结合|
|`right`|右结合|会跟右边的值进行结合|
|`none`|非结合|不能跟其他相同优先级的运算符写在一起|

>**注意：**在定义前缀与后缀运算符的时候，如果没有指定优先级，则对同一个值同时使用前缀与后缀运算符，后缀运算符会先参与运算。
>**参考：** [Swift 标准库提供的运算符的结合性与优先级](https://developer.apple.com/library/ios/documentation/Swift/Reference/Swift_StandardLibrary_Operators/index.html#//apple_ref/doc/uid/TP40016054)

```swift
// 结构体（平面向量）
struct Vector2D {
    var x = 0.0, y = 0.0
}

/**
* 自定义中缀运算符"+-"
* 结合性：left
* 优先级：140
*/
infix operator +- { associativity left precedence 140 }

/**
* 重写"+-"
* @param {Vector2D} left 左边的操作数
* @param {Vector2D} right 右边的操作数
* @return {Vector2D} 计算结果
*/
func +- (left: Vector2D, right: Vector2D) -> Vector2D {
    return Vector2D(x: left.x + right.x, y: left.y - right.y)
}

let firstVector = Vector2D(x: 1.0, y: 2.0)
let secondVector = Vector2D(x: 3.0, y: 4.0)
let plusMinusVector = firstVector +- secondVector
```