---
title: 3 字符串和字符
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

>**说明：**有序的`Character`类型的值的集合，通过`String类`来表示。
>+ 每一个字符串都是由编码无关的`Unicide`字符组成
>+ 可以通过內插的方式将字符串插入到常量、变量、字面量表达式中

>**扩展：**和Cocoa中的Foundation框架中的`NSString类`进行了无缝对接
>+ 可以将创建的任何字符串的值转换成`NSString`
>+ 可以调用任意的`NSString`API
>+ 可以在任意要求传入`NSString`实例作为参数的API中用`String类`的值代替

## 3.1	字符串字面量
>**格式：**`"固定顺序的文本字符集"`
>**应用：**为常量或变量提供初始值

```swift
let someString = "Some string literal value"
```
## 3.2	初始化空字符串
>**说明：**2种形式
>1. 将空的字符串字面量赋值给变量
>2. 初始化一个新的`String`实例

>**判空：**可以通过字符串实例的`isEmpty`属性(Boolean)来判断字符串是否为空。

```swift
// 形式1
var emptyString = ""

// 形式2
var anotherEmptyString = String()

// 判空
if emptyString.isEmpty {
    print("Nothing to see here")
}
```
## 3.3	字符串可变性
>**说明：**和Swift中其它值类型一样，可变性取决于定义为常量还是变量
>+ 常量：不可改变
>+ 变量：可以改变

>**扩展：**在O-C和Cocoa中，字符串的可变性取决于使用`NSString类`还是`NSMutableString类`。

```swift
// 定义为变量
var variableString = "Hourse"
// 所以可以修改
variableString += " add carriage"
```
## 3.4	字符串是值类型
>**说明：**意味着在以下操作中通过拷贝来传递值
>+ 常量、变量赋值操作
>+ 在函数、方法中传参

>**意义：**确保传递的字符串不会被意外修改。
>**扩展：**为了保证性能，Swift编译器只会在绝对必要的情况下才进行复制。
## 3.5	使用字符
>**说明：**`Character`
>+ 字符类型的常量和字符串相似，不同点在于自能包含一个字符。
>+ 用字符常量初始化字符类型必须指定常量或变量为`Character`，否则默认为字符串类型。

```swift
let exclamatuinMark: Character = "!"
```
### 3.5.1	字符串的Chracters属性
>**说明：**可以通过该属性遍历字符串对应的字符数组。

```swift
// 遍历字符串中的字符
for character in "Dog".characters {
    print(character)
}
```
### 3.5.2	字符数组转换为字符串

```swift
// 声明字符数组
let catCharacters: [Character] = ["C", "a", "t"]
// 将字符数组转换为字符串
let catString = String(catCharacters)
print(catString)// "Cat"
```
## 3.6	连接字符串和字符
>**说明：**两种方式
>+ `+`、`+=`：字符串拼接
>+ `append方法`
###append方法
>**说明：**将一个字符附加到字符串变量的尾部
>**原型：**`String类实例方法`

```swift
>/**
>* @param {Character} c 字符
>*/
>void append(c: Character)
```
>**注意：**参数只能是`Character`常量或变量，不能是字面量(因为存在歧义)

```swift
let str1 = "hello"
let str2 = " there"

//+
var welcome = str1 + str2// hello there

//+=
var instruction = "look over"
instruction += str2// look over there

//append
let exclamationMark: Character = "!"
instruction.append(exclamationMark)
```
## 3.7	字符串插值
>**用途：**构建新的字符串。
>**语法：**`\(表达式)`

```swift
let multiplier = 3
// 通过插值构建新的字符串
let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
```
## 3.8	Unicode
### 3.8.1	Unicode标量
>**Unicode码位：**格式为`U+[1到8位16进制数字]`
+ **Unicode标量码位：**是对应字符或者修饰符的唯一的21位数字，每个`Unicode标量`都对应着一个`Unicode码位`，但反过来不成立。
+ **Unicode代理项码位：**Unicode码位中不属于Unicode标量的部分。

|U+0000~U+D7FF|U+D800~U+DFFF|U+E000~U+10FFF|
|-|-|-|
|Unicode标量|unicode代理项|Unicode标量|
>**应用：**Swift的`String`类型是基于Unicode标量建立的。

### 3.8.2	字符串字面量的特殊字符
>**说明：**分两类
>+  转义字符
>+ Unicode标量

|特殊字符|含义|
|-|-|
|`\0`|空字符|
|`\\`|反斜线|
|`\t`|水平制表符|
|`\n`|换行符|
|`\r`|回车符|
|`\"`|双引号|
|`\'`|单引号|
|`\u{1到8位16进制数}`| Unicode标量|

```swift
// \"
let wiseWords = "\"Imagination is more importent than knowledge\" - Einstein"

// Unocode标量
let dollarSign = "\u{24}"
```
### 3.8.3	可扩展的字形群集
>**说明：**有些字符由多个部分组成，每个部分都可以用一个Unicode标量表示。组合起来就形成了一个新字符。

```swift
// é
let eAcute: Character = "\u{E9}"// é
let combinedEAcute: Character = "\u{65}\u{301}"// é

// 한
let precomposed: Character = "\u{D55C}"// 한
let decomposed: Character = "\u{1112}\u{1161}\u{11AB}"// 한

// é⃝
let encosedEAcute: Character = "\u{E9}\u{20DD}"// é⃝

// 🇺🇸
let regionalIndicatorForUS: Character = "\u{1F1FA}\u{1F1F8}"// 🇺🇸
```
## 3.9	计算字符数量
###characters.count属性
>**说明：**`String`类实例成员`characters`提供的记录字符总数的属性。
>**性能问题：**字符串中可能包含可扩展字符群，只有遍历`Unicode`标量确定字符群表示的字符后才能确定字符串的长度
>**扩展：**`NSString`的`length`属性不同于swift的`String`的`count`属性。前者利用`UTF-16`表示的16位代码单元数字。

```swift
let unusualMenagerie = "Koala, Snail, Penguin, Dromedary"
// 获得字符串中字符的数量
print("unusualMenagerie has \(unusualMenagerie.characters.count)")// 32

// 使用可扩展的群组作为Character拼接到字符串时，字符串的字符数量并不一定会改变
var word = "cafe"
print("the number of characters in \(word) is \(word.characters.count)")// 4

word += "\u{301}"// café
print("the number of characters in \(word) is \(word.characters.count)")// 4
```
## 3.10	访问和修改字符串
>**说明：**两种方式
>+ 字符串的属性和方法
>+ 下标语法
### 3.10.1	字符串索引
####相关属性(2个)

|字符串实例属性|说明|空字符串相应属性值|
|-|-|-|
|startIndex|第一个`Character`的下标|0|
|endIndex|最后一个`Character`的下标 + 1|0|
####predecessor方法
>**说明：**通过当前下标获得前一个下标
>**原型：**`Index类型的成员方法`

```swift
>/**
>* @return  {String.CharacterView.Index} 下标索引
>*/
>func predecessor -> String.CharacterView.Index
```
####successor方法
>**说明：**通过当前索引获得后面一个索引。
>**原型：**`Index类型的成员方法`

```swift
>/**
>* @return  {String.CharacterView.Index} 下标索引
>*/
>func successor -> String.CharacterView.Index
```
####indices属性
>**说明：**包含全部索引的`Range`
>**类型：**`Range <Index>`
>**原型：**`String>characters的成员属性`

####advancedBy方法
>**说明：**以当前位置为参照，获得相隔指定数量个下标的位置处的下标。
>**原型：**`String.CharacterView.Index类型的成员方法`

```swift
>/**
>* @param {Int} n 距离（正数代表向右移动，负数代表向左移动）
>* @return {Index} 下标
>*/
>func advancedBy(n: Int) -> String.CharacterView.Index
```

```swift
let greeting = "Gunten Tag!"
// 访问第一个字符
greeting[greeting.startIndex]// G

// 访问最后一个字符
greeting[greeting.endIndex.predecessor()]// !

// 访问第二个字符
greeting[greeting.startIndex.successor()]// u

// 访问最后一个字符
greeting[greeting.endIndex.advancedBy(-1)] // !

// indices属性
for index in greeting.characters.indices {
    print("\(greeting[index])", terminator: "")
}
```
### 3.10.2	插入和删除
####insert函数
>**说明：**在一个字符串的指定索引插入一个字符串。
>**原型：**`String类型的实例方法`

```swift
>/**
>* @param {Character} newElement 要插入的字符
>* @param {Index} atIndex 插入的位置
>*/
>func insert(newElement: Character, atIndex: Index) -> void
```
####insertContentsOf函数
>**说明：**在一个字符串的指定索引插入一个字符串。
>**原型：**`String类型的实例方法`

```swift
>/**
>* @param {CollectionType} newElements 插入的集合
>* @param {Index} at 插入位置
>*/
>func insertContentsOf(newElements: CollectionType, at: Index) -> void
```
####removeAtIndex函数
>**说明：**在一个字符串中的指定索引删除一个字符
>**原型：**`String类型的实例方法`

```swift
>/**
>* @param  {Index} i 要删除的字符对应的索引
>* @return {Character} 删除的字符
>*/
>func removeAtIndex(i: Index) -> Character
```
####removeRange函数
>**说明：**在一个字符串的指定索引删除一个字串
>**原型：**`String类型的实例方法`

```swift
>func removeRange(subRange: Range<Index>) -> void
```

```swift
var welcome = "hello"

// 在字符串尾部插入一个字符
welcome.insert("!", atIndex: welcome.endIndex)// hello

// 在字符串倒数第二个位置插入另一个字符串
welcome.insertContentsOf(" there".characters, at: welcome.endIndex.predecessor())// hello!

// 删除指定索引处的字符
welcome.removeAtIndex(welcome.endIndex.predecessor())// hello there!

// 删除子串
let range = welcome.endIndex.advancedBy(-6)..<welcome.endIndex// 5..<11
welcome.removeRange(range)// hello
```
## 3.11	比较字符串
### 3.11.1	字符串/字符相等
>**说明：**使用`!=`和`==`
>+ 如果两个字符串（或字符）的可扩展字形群集是标准相等（Unicode标量不同，语言外观相同）的，那就认为它们是相等的

```swift
// 比较普通两个字符串
let quotation = "we're a lot alike, you and I."
let sameQuotation = "we're a lot alike, you and I."

if quotation == sameQuotation {
    print("There two strings are considered equal")
}

// 比较两个Unicode标量不同但外观相同的字符串
let eAcuteQuestion = "Voulez-vous un caf\u{E9}?"

let combinedEAcuteQuestion = "Voulez-vous uncaf\u{65}\u{301}?"

if eAcuteQuestion == combinedEAcuteQuestion {
    print("These twostrings are considered equal")
}
```
### 33.11.2		前缀/后缀相等
####hasPrefix函数
>**说明：**判断字符串是否包含某种前缀。
>**原型：**`String类型的实例方法`

```swift
>/**
>* @param {String} prefix 前缀
>* @return {Boolean} true : 包含前缀；false : 不包含前缀
>*/
>func hasPrefix(prefix: String) -> Boolean
```

####hasSuffix函数
>**说明：**判断字符串是否包含某种后缀。
>**原型：**`String类型的实例方法`

```swift
>/**
>* @param {String} suffix 前缀
>* @return {Boolean} true : 包含后缀；false : 不包含后缀
>*/
>func hasSuffix(prefix: String) -> Boolean
```

```swift
// 场景位置
let romeoAndJuliet = [
    "Act 1 Scene 1: Verona, A public place",
    "Act 1 Scene 2: Capulet's mansion",
    "Act 1 Scene 3: A room in Capulet's room",
    "Act 2 Scene 1: Outside Capulet's mansion",
    "Act 2 Scene 2: Capulet's orchard",
    "Act 2 Scene 3: Ouside Friar Lawrence's cell"
]

var act1SceneCount = 0// 场景一数量
// 根据前缀删选数据项
for scene in romeoAndJuliet {
    if scene.hasPrefix("Act 1 ") {
        ++act1SceneCount
    }
}
print("There are \(act1SceneCount) scenes in Act 1")
```
## 3.12	字符串的Unicode表示形式
>**编码方式和字符集：**事实上，计算机存储任何数据（包括文本文件）都是以`二进制方式`存储的，但字符如何对应到二进制数据，或者说二进制数据如何解读成字符是由`编码方式`和`字符集`决定的。每种`字符集`都对应一种或多种`编码方式`。
>**说明：**当字符串被保存到文本文件时，会按照某种编码方式存储。而Unicode标量对应的编码方式包括以下三种。

|Unicode字符集对应的编码方式|代码单元大小（bit）|对应的String的成员属性|
|-|-|-|
|**UTF-8**|8|utf8|
|**UTF-16**|16|utf16|
|**UTF-32(Unicode标量集合)**|32|unicodeScalars|
###举个例子：`Dog‼🐶`

|code unit(十进制)|D|o|g|!!|🐶|
|-|-|-|-|
|**UTF-8编码**|68|111|103|226 128 188|240 159 144 182|
|**UTF-16编码**|68|111|103|8252|55357 56374|
|**UTF-32(Unicode标量)**|68|111|103|8252|128054|

```swift

```

