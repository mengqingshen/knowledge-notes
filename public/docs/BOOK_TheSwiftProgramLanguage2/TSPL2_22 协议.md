---
title: 22 协议
categories:
  - The Swift Program Language 2
tag:
  - swift语言

---


## 22.1	协议的语法
>**说明：**协议的定义方式与`类`,`结构体`,`枚举`的定义非常相似。
>+ 要使类遵循某个协议,需要在`类型名称后`加上`协议名称`,中间以`:` 分隔,作为类型定义的一部分
>+ 遵循多个 协议时,各协议之间用逗号`,` 分隔
>+ 如果类在遵循协议的同时拥有父类,应该将`父类名`放在`协议名之前`,以`,`分隔

```swift
// 定义协议
protocol SomeProtocol {
	// 协议内容
}

// 实现协议
struct SomeStructure: FirstProtocol, AnotherProtocol {
	// 结构体内容
}

// 继承类并实现协议
class SomeClass: SomeSuperClass, FirstProtocol, AnotherProtocol {
	// 类的内容
}
```

## 22.2	对属性的规定
>**说明：**表现在`4`个方面
>+ 名称
>+ 类型
>+ 可读还是可写
>+ 实例属性还是类属性

>**注意：**不指定是`存储型属性`还是`计算型属性`

```swift
// 定义协议
protocol FullyNamed {
    // 只读属性
    var fullName: String { get }
}

// 实现协议
class Starship: FullyNamed {
    var prefix: String?
    var name: String
    init(name: String, prefix: String? = nil) {
        self.name = name
        self.prefix = prefix
    }
    // 只读计算属性
    var fullName: String {
        return (prefix != nil ? prefix! + " " : "") + name
    }
}

// 创建实例
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
```

### 22.2.1	可读&可写
>**说明：**在协议中指定属性规则是都使用`var`（不使用`let`）

|可读&可写|协议|实现|
|-|-|-|
|可读|`{get}`|可以只读，可以可读可写|
|可写|`{get set}`|不能是`常量`或`只读计算属性`|

```swift
// 定义协议
protocol SomeProtocol {
	// 可读可写
    var mustBeSettable : Int { get set }
    // 只读
    var doesNotNeedToBeSettable: Int { get }
}
```

### 22.2.2	实例属性&类属性
>**说明：**

|实例属性&类属性|协议|实现|
|-|-|-|
|实例属性|默认|默认|
|类属性|`static`|`static`或`class`|

```swift
// 定义协议
protocol AnotherProtocol {
	// 类属性
    static var someTypeProperty: Int { get set }
}
```

## 22.3	对方法的规定
>**说明：**协议可以要求采纳协议的类型实现某些指定的`实例方法`或`类方法`。
>**语法：**像普通方法一样放在协议的定义中，但是不需要`{}`和方法体
>+ 可以在协议中定义具有`可变参数`的方法，和普通方法的定义方式相同
>+ `不支持`为协议中的方法的参数提供默认值
>+ 在协议中定义类方法的时候，总是使用 `static` 关键字作为前缀；当类类型采纳协议时，除了 `static` 关键字，还可以使用 `class` 关键字作为前缀

```swift
// 定义协议
protocol SomeProtocol {
    // 类方法
    static func someTypeMethod()
}

// 定义协议
protocol RandomNumberGenerator {
    // 实例方法
    func random() -> Double
}

// 线性同余随机数生成器
class LinearCongruentialGenerator: RandomNumberGenerator {
    // 存储上一次生成的随机数
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    // 获取随机数
    func random() -> Double {
        lastRandom = ((lastRandom * a + c) % m)
        return lastRandom / m
    }
}
// 创建实例
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")// 0.37464991998171”

```

## 22.4	对Mutating方法的规定
>**说明：**如果你在`协议中`定义了一个`实例方法`，该方法会改变采纳该协议的类型的`实例`，那么在定义协议时需要在方法前加 `mutating`

|实现者|协议|实现|
|-|-|-|
|类类型|`mutating`|不用写 `mutating` 关键字|
|值类型|`mutating`|必须写` mutating` 关键字|

```swift
// 协议
protocol Togglable {
    // 当它被调用时，将改变实例属性，从而切换采纳该协议类型的实例的状态
    mutating func toggle()
}

// 实现协议：开关
enum OnOffSwitch: Togglable {
    case Off, On
    // 实现协议定义的 mutating 方法
    mutating func toggle() {
        switch self {
        case Off:
            self = On
        case On:
            self = Off
        }
    }
}
// 创建实例
var lightSwitch = OnOffSwitch.Off
// 调用 mutating 方法
lightSwitch.toggle()
```

## 22.5	对构造器的规定
>**说明：**协议可以要求采纳协议的类型实现指定的构造器
>**语法：**你可以像编写普通构造器那样，在协议的定义里`写下构造器的声明`，但`不需要写{}和构造器的实体`

### 22.5.1	构造器要求在类中的实现
>**说明：**使用`required` 修饰符（除非在`final`类中），可以是`指定构造器`或`便利构造器`
>+ 如果一个子类`重写`了父类的指定构造器，并且该构造器`满足了某个协议`的要求，那么该构造器的实现需要同时标注 `required` 和 `override` 修饰符
>+ 如果类已经被标记为 `final`，那么不需要在协议构造器的实现中使用 `required` 修饰符，因为`final` 类不能有子类

>**注意：**使用 `required` 修饰符可以确保所有子类也必须提供此构造器实现，从而也能符合协议。

```swift
// 协议
protocol SomeProtocol {
    // 构造器要求
    init()
}

// 父类：没有实现协议
class SomeSuperClass {
    init() {
        // 这里是构造器的实现部分
    }
}

// 子类：既继承了父类，也实现了协议
class SomeSubClass: SomeSuperClass, SomeProtocol {
    // 因为继承自父类，需要加上 override
    required override init() {
        // 这里是构造器的实现部分
    }
}
```

### 22.5.2	可失败构造器要求
>**说明：**协议还可以为采纳协议的类型定义`可失败构造器要求`

|构造器|协议|实现|
|-|-|-|
|可失败构造器|`init?`|`init?`或`init`|
|非可失败构造器|`init`|`init`或`init!`|

## 22.6	协议作为类型
>**说明：**尽管协议本身并未实现任何功能，但是协议可以被当做一个成熟的类型来使用。
>+ 作为函数、方法或构造器中的`参数类型`或`返回值类型`
>+ 作为`常量`、`变量`或`属性`的类型
>+ 作为数组、字典或其他`容器中的元素类型`

>**注意：**作为一种类型，协议类型的名称应与其他类型的写法相同（`大写字母开头的驼峰式写法`）

```swift
// 协议
protocol RandomNumberGenerator {
    func random() -> Double
}

// 实现
class LinearCongruentialGenerator: RandomNumberGenerator {
    // 存储上一次生成的随机数
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    // 获取随机数
    func random() -> Double {
        lastRandom = ((lastRandom * a + c) % m)
        return lastRandom / m
    }
}

// 骰子
class Dice {
    // 骰子的面
    let sides: Int
    // 使用协议类型声明常量
    let generator: RandomNumberGenerator
    
    // 使用协议类型作为参数（需要传递一个实现了该协议枚举、结构体或类的实例）
    init(sides: Int, generator: RandomNumberGenerator) {
        self.sides = sides
        self.generator = generator
    }
    
    // 掷骰子
    func roll() -> Int {
        return Int(generator.random() * Double(sides)) + 1
    }
}
// 创建骰子实例
var d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())

// 掷骰子5次
for _ in 1...5 {
    print("Random dice roll is \(d6.roll())")
}
```

## 22.7	委托（代理）模式
>**描述：**委托是一种`设计模式`，它允许`类或结构体`将一些需要它们负责的功能委托给其他类型的实例。
>**说明：**委托模式的实现很简单
>+ 定义协议来封装那些需要被委托的功能，这样就能确保采纳协议的类型能提供这些功能
>+ 委托模式可以用来响应特定的动作，或者接收外部数据源提供的数据，而无需关心外部数据源的类型。

>**案例：**`游戏`将监控这一功能委托给`游戏监控器`。

```swift
// 协议
protocol RandomNumberGenerator {
    func random() -> Double
}

// 实现
class LinearCongruentialGenerator: RandomNumberGenerator {
    // 存储上一次生成的随机数
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    // 获取随机数
    func random() -> Double {
        lastRandom = ((lastRandom * a + c) % m)
        return lastRandom / m
    }
}

// 骰子
class Dice {
    // 骰子的面
    let sides: Int
    // 使用协议类型声明常量
    let generator: RandomNumberGenerator
    
    // 使用协议类型作为参数（需要传递一个实现了该协议枚举、结构体或类的实例）
    init(sides: Int, generator: RandomNumberGenerator) {
        self.sides = sides
        self.generator = generator
    }
    
    // 掷骰子
    func roll() -> Int {
        return Int(generator.random() * Double(sides)) + 1
    }
}

// 协议：掷骰子游戏
protocol DiceGame {
    // 骰子
    var dice: Dice { get }
    // 进行游戏
    func play()
}

// 协议：追踪 DiceGame
protocol DiceGameDelegate {
    // 游戏开始
    func gameDidStart(game: DiceGame)
    // 游戏进行
    func game(game: DiceGame, didStartNewTurnWithDiceRoll diceRoll:Int)
    // 游戏结束
    func gameDidEnd(game: DiceGame)
}

// 实现：蛇梯棋游戏
class SnakesAndLadders: DiceGame {
    let finalSquare = 25
    // 实现属性（要求只读，可以声明为 let ）
    let dice = Dice(sides: 6, generator: LinearCongruentialGenerator())
    var square = 0
    var board: [Int]
    init() {
        board = [Int](count: finalSquare + 1, repeatedValue: 0)
        board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
        board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
    }
    // 游戏监控器
    var delegate: DiceGameDelegate?
    // 实现方法
    func play() {
        square = 0
        // 开始游戏
        delegate?.gameDidStart(self)
        gameLoop: while square != finalSquare {
            let diceRoll = dice.roll()
            delegate?.game(self, didStartNewTurnWithDiceRoll: diceRoll)
            switch square + diceRoll {
            case finalSquare:
                break gameLoop
            case let newSquare where newSquare > finalSquare:
                continue gameLoop
            default:
                square += diceRoll
                square += board[square]
            }
        }
        // 结束游戏
        delegate?.gameDidEnd(self)
    }
}

// 实现：游戏监控器
class DiceGameTracker: DiceGameDelegate {
    var numberOfTurns = 0
    // 游戏开始时被调用
    func gameDidStart(game: DiceGame) {
        numberOfTurns = 0
        if game is SnakesAndLadders {
            print("Started a new game of Snakes and Ladders")
        }
        print("The game is using a \(game.dice.sides)-sided dice")
    }
    // 游戏进行时被调用
    func game(game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int) {
        ++numberOfTurns
        print("Rolled a \(diceRoll)")
    }
    // 游戏结束时被调用
    func gameDidEnd(game: DiceGame) {
        print("The game lasted for \(numberOfTurns) turns")
    }
}

// 监控器实例
let tracker = DiceGameTracker()
// 游戏实例
let game = SnakesAndLadders()
// 将监控器实例提供给游戏实例(不是必需的)
game.delegate = tracker
// 游戏开始
game.play()
```

## 22.8	在扩展中添加协议成员
>**说明：**即便无法修改源代码，依然可以通过扩展令已有类型采纳并符合协议。
>**原理：**通过扩展令已有类型采纳并符合协议时，该类型的所有实例也会随之获得协议中定义的各项功能。

```swift
// 协议：要求提供一个能描述自身的计算属性
protocol TextRepresentable {
    var textualDescription: String {get}
}

// 骰子
class Dice {
    // 骰子的面
    let sides: Int
    init(sides: Int) {
        self.sides = sides
    }
}
//  通过extension使骰子实现协议
extension Dice: TextRepresentable {
    var textualDescription: String {
        return "A \(sides)-sided dice"
    }
}
// 创建实例
let d12 = Dice(sides: 12)
print(d12.textualDescription)
```

## 22.9	通过扩展补充协议声明
>**说明：**可以通过扩展`空的扩展体`补充协议声明。需要两个前提
>+ `已经实现了`协议中所有要求
>+ `没有声明`为遵循该协议

```swift
// 协议：要求提供一个能描述自身的计算属性
protocol TextRepresentable {
    var textualDescription: String {get}
}

// 结构体（没有声明实现的协议）
struct Hamster {
    var name: String
    var textualDescription: String {
        return "A hamster named \(name)"
    }
}

// 通过扩展补充协议声明
extension Hamster: TextRepresentable {}

// 创建实例
let simonTheHamster = Hamster(name: "Simon")

// 作为 TextRepresentable 类型使用
let somethingTextRepresentable: TextRepresentable = simonTheHamster
print(somethingTextRepresentable.textualDescription) 
```

## 22.10	集合中的协议类型
>**说明：**协议类型可以在集合使用,表示`集合中的元素均为协议类型`
>**注意：**被当作协议类型使用后，只能使用和访问协议指定的功能（丢失具体类型的特色能力）。

```swift
// 协议类型数组
let things: [TextRepresentable] = [game, d12, simonTheHamster]
// 遍历
for thing in things {
    print(thing.textualDescription)
}
```

## 22.11	协议的继承
>**说明：**协议能够继承一个或多个其他协议，可以在继承的协议的基础上增加新的要求。和类的继承类似
>**语法：**多个被继承的协议间用`,`分隔

```swift
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
    // 这里是协议的定义部分
}
```

```swift
// 父类协议
protocol TextRepresentable {
    var textualDescription: String {get}
}

// 子类协议
protocol PrettyTextRepresentable: TextRepresentable {
    // 额外要求采纳协议的类型提供一个返回值为 String 类型的 prettyTextualDescription 属性
    var prettyTextualDescription: String { get }
}

// 通过扩展让已有类实现子类协议（要同时实现父类协议）
extension SnakesAndLadders: PrettyTextRepresentable {
    var prettyTextualDescription: String {
        var output = textualDescription + ":\n"
        for index in 1...finalSquare {
            switch board[index] {
            case let ladder where ladder > 0:
                output += "▲ "
            case let snake where snake < 0:
                output += "▼ "
            default:
                output += "○ "
            }
        }
        return output
    }
}

// 已有的实例也会获取到这种实现
print(game.prettyTextualDescription)
```

## 22.12	类类型专属协议
>**说明：**以在`协议的继承列表`中，通过添加 `class` 关键字来限制协议只能被`类`类型采纳，而`结构体`或`枚举`不能采纳该协议
>**语法：**`class` 关键字必须`第一个出现在协议的继承列表中`(在其他继承的协议之前)
>**应用：**当协议定义的要求需要采纳协议的类型必须是`引用`语义而非`值`语义时，应该采用类类型专属协议。

```swift
protocol SomeClassOnlyProtocol: class, SomeInheritedProtocol {
    // 这里是类类型专属协议的定义部分
}
```

## 22.13	协议合成
>**说明：**有时候需要同时采纳多个协议，你可以将多个协议采用 `protocol<SomeProtocol, AnotherProtocol>` 这样的格式进行组合，作为一种`临时协议`存在，这个过程称为 `协议合成`。
>**语法：**可以在 `protocol<>` 中罗列任意多个你想要采纳的协议，以`,`分隔。
>**注意：**协议合成并不会生成新的、永久的协议类型，而是将多个协议中的要求合成到一个`只在局部作用域有效`的`临时协议`中。

```swift
// 协议1
protocol Named {
    var name: String { get }
}
// 协议2
protocol Aged {
    var age: Int { get }
}

// 实现两个协议
struct Person: Named, Aged {
    var name: String
    var age: Int
}

/**
* 协议合成
* @param {protocol<Named, Aged>} celebrator 实现了两种协议的类型的实例
*/
func wishHappyBirthday(celebrator: protocol<Named, Aged>) {
    print("Happy birthday \(celebrator.name) - you're \(celebrator.age)!")
}

// 创建实例
let birthdayPerson = Person(name: "Malcolm", age: 21)

// 传递符合两种协议的实例给函数
wishHappyBirthday(birthdayPerson)
```

## 22.14	检验协议的一致性
>**说明：**其实就是检验`是否符合某协议`，或者转换到指定的协议类型。检查和转换到某个协议类型在语法上和`类型的检查和转换`完全相同

|操作符|用途|返回值|备注|
|-|-|-|-|
|`is`|用来检查实例是否符合某个协议|符合则返回 `true`，否则返回 `false`||
|`as?`|返回指定协议的可选值|，当实例符合某个协议时，返回类型为协议类型的可选值，否则返回 `nil`||
|`as!`|将实例强制向下转换到某个协议类型|指定的协议类型|如果强转失败，会引发运行时错误|

```swift
// 协议
protocol HasArea {
    var area: Double { get }
}

// 实现1
class Circle: HasArea {
    let pi = 3.1415927
    var radius: Double
    var area: Double { return pi * radius * radius }
    init(radius: Double) { self.radius = radius }
}

// 实现2
class Country: HasArea {
    var area: Double
    init(area: Double) { self.area = area }
}

// 不实现
class Animal {
    var legs: Int
    init(legs: Int) { self.legs = legs }
}

// 对应实例
let objects: [AnyObject] = [
    Circle(radius: 2.0),
    Country(area: 243_610),
    Animal(legs: 4)
]

// 遍历，使用 as?
for object in objects {
    if let objectWithArea = object as? HasArea {
        print("Area is \(objectWithArea.area)")
    } else {
        print("Something that doesn't have an area")
    }
}
```

## 22.15	对可选协议的规定
>**说明：**协议可以定义可选要求，采纳协议的类型可以选择是否实现这些要求。
>**语法：**在协议中使用 `optional `关键字作为前缀来定义可选要求。
> + 使用可选要求时，它们的类型会自动变成可选的
> + 需要`import Foundation`

> **限制：**
>+ **定义协议：**可选的协议要求只能用在标记 `@objc` 特性的协议中
>+ **采纳协议：**标记 `@objc` 特性的协议只能被`继承自 Objective-C 类的类`或者` @objc 类`采纳

```swift
import Foundation
/**
* @objc
* 协议：只能被 [继承自 Objective-C 类的类] 或者 [@objc 类]采纳
*/
objc protocol CounterDataSource {
    optional func incrementForCount(count: Int) -> Int
    optional var fixedIncrement: Int { get }
}

// 类
class Counter {
    var count = 0
    var dataSource: CounterDataSource?
    func increment() {
        if let amount = dataSource?.incrementForCount?(count) {
            count += amount
        } else if let amount = dataSource?.fixedIncrement {
            count += amount
        }
    }
}

/**
* 采纳协议
* 继承了 NSObject，所以可以采纳 CounterDataSource
*/
class ThreeSource: NSObject, CounterDataSource {
    let fixedIncrement = 3
}

var counter = Counter()
counter.dataSource = ThreeSource()
for _ in 1...4 {
    counter.increment()
    print(counter.count)
}

```

## 22.16	协议扩展
>**说明：**协议可以通过`扩展`来为`采纳协议的类型`提供属性、方法以及下标脚本的实现。
>**优点：**扩展协议不但扩展了要求，同时提供了实现。因而`无需`在每个采纳协议的类型中都重复同样的实现，也`无需`使用全局函数。

```swift
// 定义协议
protocol RandomNumberGenerator {
    // 实例方法
    func random() -> Double
}

// 采纳协议：线性同余随机数生成器
class LinearCongruentialGenerator: RandomNumberGenerator {
    // 存储上一次生成的随机数
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    // 获取随机数
    func random() -> Double {
        lastRandom = ((lastRandom * a + c) % m)
        return lastRandom / m
    }
}

// 扩展协议（同时提供了实现）
extension RandomNumberGenerator {
    func randomBool() -> Bool {
        return random() > 0.5
    }
}

// 采纳了协议的类型的实例
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")
// 打印 “Here's a random number: 0.37464991998171”
print("And here's a random Boolean: \(generator.randomBool())")
```

### 22.16.1	提供默认实现
>**说明：**可以通过`协议扩展`来为协议要求的属性、方法以及下标脚本提供`默认的实现`。
>**注意：**如果采纳协议的类型为这些要求提供了自己的实现，那么这些`自定义实现将会替代扩展中的默认实现`被使用。

```swift
// 扩展协议
extension PrettyTextRepresentable  {
	// 为协议提供一个默认的属性
    var prettyTextualDescription: String {
        return textualDescription
    }
}
```

### 22.16.2	为协议扩展添加限制条件
>**说明：**在`扩展协议`的时候，可以`指定一些限制条件`，只有采纳协议的类型满足这些限制条件时，才能获得协议扩展提供的`默认实现`。
>**语法：**这些限制条件写在`协议名之后`，使用 `where` 子句来描述.

```swift
// 协议：要求提供一个能描述自身的计算属性
protocol TextRepresentable {
    var textualDescription: String {get}
}

// 结构体（没有声明实现的协议）
struct Hamster {
    var name: String
    var textualDescription: String {
        return "A hamster named \(name)"
    }
}

// 通过扩展补充协议声明
extension Hamster: TextRepresentable {}

// 通过扩展采纳协议
extension CollectionType where Generator.Element: TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joinWithSeparator(", ") + "]"
    }
}

let murrayTheHamster = Hamster(name: "Murray")
let morganTheHamster = Hamster(name: "Morgan")
let mauriceTheHamster = Hamster(name: "Maurice")
let hamsters = [murrayTheHamster, morganTheHamster, mauriceTheHamster]

print(hamsters.textualDescription)

```