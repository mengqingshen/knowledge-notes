---
title: 5 控制流
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---


## 5.1	for循环
>**说明：**有两种形式
>+ `for-in`
>+ `for initialization; condition; increment`（c语言形式）

### 5.1.1	for-in
>**说明：**可以遍历的集合包括`区间`、`Array`、`Set`、`String中的字符`。
>+ 其中每次循环都会被赋值的常量不需要声明
>+ 可以使用`_`忽略每个数据项中具体的值
>+ 字典内部是无序的，不经处理不能保证遍历顺序

```swift
// 区间
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}

// 数组
let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    print("Hello, \(name)!")
}

// 字典
let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
for (animalName, _) in numberOfLegs {
    print("\(animalName)s")
}
```

### 5.1.2	C语言形式
>**语法：**标准C样式。

```swift
>for initialization; condition; increment {
>    statements
>}
```

```swift
for var index = 0; index < 3; ++index {
    print("index is \(index)")
}
```

## 5.2	while循环
>**说明：**分两类
>+ `while`
>+ `repeat-while`

### 5.2.1	while
>**说明：**每次在循环开始时计算条件是否符合。

```swift
while condition {  
    statements
}
```


### 5.2.2	repeat-while
>**说明：**和`while`的区别是在判断循环条件之前，先执行一次循环的代码块，然后重复循环直到条件为`false`。

```swift
>repeat {
    statements
} while condition
```

## 5.3	条件语句
>**说明：**`if`、`switch`
>+ `if`：当条件较为简单且可能的情况很少时使用
>+ `switch`：当条件较复杂、可能情况较多且需要模式匹配的情景使用


### 5.3.1	if
>**语法：**`if-[else]`、`if-else if-...-[else]`

```swift
if condition1 {
    // 处理
}
else if condition2 {
    // 处理
}
else {
    // 处理
}
```

```swift
var temperatureInFahrenheit = 90
if temperatureInFahrenheit <= 32 {
    print("It's very cold. Consider wearing a scarf.")
} else if temperatureInFahrenheit >= 86 {
    print("It's really warm. Don't forget to wear sunscreen.")
} else {
    print("It's not that cold. Wear a t-shirt.")
}
```

### 5.3.2	switch
>**语法：**类似C语言

```swift
switch some value to consider {
	case value 1:
	    respond to value 1
	case value 2, value 3:
	    respond to value 2 or 3
	default:
	    otherwise, do something else
}
```
>**说明：**和C语言的`switch`相比更加强悍。
>**更安全：**
>1. 每个`case`分支都必须包含至少一条语句
>2. `case`和`default`必须包含所有可能的情况，否则报错
>3. 当匹配的`case`分支中的代码执行完毕，`switch`终止（不需要手动`break`）

>**更强大：**
>1.  `case`可以包含多个模式，用`,`分隔
>2. `case`分支的模式可以是：`区间`、`元组`
>3. 允许多个`case`匹配到一个值，但执行时只有最前面的被匹配到的分支会执行
>4.  值绑定
>5. `where`


#### `case`多个模式
>**用途：**多个值匹配到一种`case`中。

```swift
let someCharacter: Character = "e"
switch someCharacter {
    // 原音字符
    case "a", "e", "i", "o", "u":
        print("\(someCharacter) is a vowel")
    // 辅音字符
    case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
"n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
        print("\(someCharacter) is a consonant")
    // 不匹配24个英文字符
    default:
        print("\(someCharacter) is not a vowel or a consonant")
}
```


#### 区间

```swift
let approximateCount = 62
let countedThings = "moons orbiting saturn"
var naturalCount: String
switch approximateCount {
    case 0:
        naturalCount = "no"
    case 1..<5:
        naturalCount = "a few"
    case 5..<12:
        naturalCount = "several"
    case 12..<100:
        naturalCount = "dozens of"
    case 100..<1000:
        naturalCount = "hundreds of"
    default:
        naturalCount = "many"
}
print("There are \(naturalCount) \(countedThings).")
```


#### 元组

```swift
let yetAnotherPoint = (1, -1)
switch yetAnotherPoint {
case let (x, y) where x == y:
    print("(\(x), \(y)) is on the line x == y")
case let (x, y) where x == -y:
    print("(\(x), \(y)) is on the line x == -y")
case let (x, y):
    print("(\(x), \(y)) is just some arbitrary point")
}
```


#### 值绑定
>**说明：**在`case` 分支的模式将匹配的值绑定到一个临时的常量或变量，然后就可以在分之内使用这些常量或变量。

```swift
let anotherPoint = (2, 0)
switch anotherPoint {
	case (let x, 0):
	    print("on the x-axis with an x value of \(x)")
	case (0, let y):
	    print("on the y-axis with a y value of \(y)")
	case let (x, y):
	    print("somewhere else at (\(x), \(y))")
}
```

#### `where`表达式
>**说明：**`case` 分支的模式可以使用where语句来判断额外的条件。

```swift
let yetAnotherPoint = (1, -1)
switch yetAnotherPoint {
case let (x, y) where x == y:
    print("(\(x), \(y)) is on the line x == y")
case let (x, y) where x == -y:
    print("(\(x), \(y)) is on the line x == -y")
case let (x, y):
    print("(\(x), \(y)) is just some arbitrary point")
}
```

## 5.4	控制转移语句
>**说明：**Swift 有`5`种控制转移语句
>+ `continue`
>+ `break`
>+ `fallthrough`
>+ `return`
>+ `throw`

### 5.4.1	continue
>**说明：**告诉一个循环体立刻停止本次循环迭代，重新开始下次循环迭代。

```swift
let puzzleInput = "great minds think alike"
var puzzleOutput = ""
for character in puzzleInput.characters {
    switch character {
    case "a", "e", "i", "o", "u", " ":
        continue
    default:
        puzzleOutput.append(character)
    }
}
print(puzzleOutput)
```

### 5.4.2	break
>**说明：**立刻结束整个控制流的执行。

#### switch语句中的break
>**背景：**`switch`的完备性使所有值的情况都要求有对应的分支（但是有的分支內并不需要执行任何代码）
>**说明：**立即结束`switch`代码块
>**用途：**用来匹配或者忽略一个或多个分支

```swift
let numberSymbol: Character = "三"  // 简体中文里的数字 3
var possibleIntegerValue: Int?
switch numberSymbol {
case "1", "١", "一", "๑":
    possibleIntegerValue = 1
case "2", "٢", "二", "๒":
    possibleIntegerValue = 2
case "3", "٣", "三", "๓":
    possibleIntegerValue = 3
case "4", "٤", "四", "๔":
    possibleIntegerValue = 4
default:
    break
}
if let integerValue = possibleIntegerValue {
    print("The integer value of \(numberSymbol) is \(integerValue).")
} else {
    print("An integer value could not be found for \(numberSymbol).")
}
```

### 5.4.3	fallthrough
>**说明：**使代码执行继续到下一个 `case` 中的执行代码

```swift
let integerToDescribe = 5
var description = "The number \(integerToDescribe) is"
switch integerToDescribe {
case 2, 3, 5, 7, 11, 13, 17, 19:
    description += " a prime number, and also"
    fallthrough
default:
    description += " an integer."
}
```

### 5.4.4	标签
>**说明：**配合`continue`或 `break`实现跳转。适用的语句包括
>+ `while`、`repeat-while`
>+ `for`
>+ `switch`

>**语法：**以`while`为例子

```swift
label name: while condition {
    statements
}
```

```swift
//寻找二维数组中的特殊值
var board = Array<Array<Int>>()//声明二维数组
//初始化二维数组
for i in 0...10{
    board.append(Array(count:10,repeatedValue:0))
}
//随机给二维数组中某个元素赋值1
let randx = Int(arc4random()%10)
let randy = Int(arc4random()%10)
board[randx][randy] = 1
//找到这个值为1的元素的位置
var i = 0 , j = 0
mainloop:for i = 0 ; i < 10 ; i++ {
    for j = 0 ; j < 10 ; j++ {
        if board[i][j] == 1{
            break mainloop
        }
    }
}
println("board[\(i)][\(j)] = 1")
```

## 5.5	提前退出
>**说明：**条件为真时，执行`guard`语句后的代码；不为真则执行`else`分句中的代码。
>+ 一个`guard`语句总是有一个`else`分句
>+ `else`分支必须通过`return`、`break`、`continue`、`throw`，或者调用一个不返回的方法或函数（比如`fatalError`函数）来退出`guard`所在的代码段。

>**用途：**相比于可以实现同样功能的if语句，按需使用`guard`语句会提升我们代码的可靠性和可读性。

```swift
func greet(person: [String: String]) {
    guard let name = person["name"] else {
        return
    }

    print("Hello \(name)")

    guard let location = person["location"] else {
        print("I hope the weather is nice near you.")
        return
    }

    print("I hope the weather is nice in \(location).")
}

greet(["name": "John"])
greet(["name": "Jane", "location": "Cupertino"])
```

## 5.6	检测API是否可用
>**用途：**确保我们不会不小心地使用对于当前部署目标不可用的 API。
>**语法：**最后一个参数`*`是必须写的，用于处理未来潜在的平台。

```swift
if #available(platform name version, ..., *) {
    // 验证的API可用
} else {
    // 不可用
}
```

>**说明：**平台名字可以是`iOS`，`OSX`或`watchOS`，除了特定的主板本号像 `iOS 8`，我们可以指定较小的版本号像 `iOS 8.3` 以及 `OS X v10.10.3`。
>1. 编译器使用从可用性条件语句中获取的信息去验证在代码块中调用的 `API` 是否都可用
>2. 根据步骤`1`，在一个`if`或`guard`语句中去有条件的执行一段代码

```swift
if #available(iOS 9, OSX 10.10, *) {
    // 在 iOS 使用 iOS 9 的 API, 在 OS X 使用 OS X v10.10 的 API
} else {
    // 使用先前版本的 iOS 和 OS X 的 API
}
```
