---
title: 20 类型嵌套
categories:
  - The Swift Program Language 2
tag:
  - swift语言

---

>**说明：**`Swift` 允许你定义嵌套类型，可以在支持的类型中定义嵌套的`枚举`、`类`和`结构体`。可以根据需要定义`多级嵌套`。
>**用途：**方便地定义工具类或结构体来使用。

## 20.1	嵌套类型实践

```swift
/*
* 扑克牌
* 没有自定义构造器的结构体：因此有默认的成员构造器
*/
struct BlackjackCard {
    // 嵌套的 Suit 枚举
    enum Suit: Character {
        case Spades = "♠", Hearts = "♡", Diamonds = "♢", Clubs = "♣"
    }
    
    // 嵌套的 Rank 枚举
    enum Rank: Int {
        case Two = 2, Three, Four, Five, Six, Seven, Eight, Nine, Ten
        case Jack, Queen, King, Ace
        struct Values {
            let first: Int, second: Int?
        }
        var values: Values {
            switch self {
            case .Ace:
                return Values(first: 1, second: 11)
            case .Jack, .Queen, .King:
                return Values(first: 10, second: nil)
            default:
                return Values(first: self.rawValue, second: nil)
            }
        }
    }
    
    // 用嵌套在结构体内部的类型声明属性
    let rank: Rank, suit: Suit
    var description: String {
        var output = "suit is \(suit.rawValue),"
        output += " value is \(rank.values.first)"
        if let second = rank.values.second {
            output += " or \(second)"
        }
        return output
    }
}

// 创建实例（嵌套类型也能用于类型推断）
let theAceOfSpades = BlackjackCard(rank: .Ace, suit: .Spades)
print("theAceOfSpades:\(theAceOfSpades.description)")
```

## 20.2	嵌套类型的引用
>**说明：**在外部引用嵌套类型时，在`嵌套类型的类型名`前加上`其外部类型的类型名`作为前缀。

```swift
// 引用嵌套类型
let heartsSymbol = BlackjackCard.Suit.Hearts.rawValue
```