---
title: 15 析构过程
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

>**关键字：**`deinit`
>**支持：**类
>**数量：**最多一个
>**参数：**无
>**如何被调用：**类的实例被释放之前自动调用（不允许主动调用）
>**用途：**当实例释放时进行一些额外的处理（比如关闭打开的文件）

## 15.1		析构过程原理
>**语法：**不带`()`也不需要`参数`

```swift
deinit{
	// 手动释放一些资源
}
```
>**父类析构器的调用：**

|子类是否定义了析构函数|具体析构过程|
|-|-|
|是|子类析构函数实现的最后，父类的析构函数被调用|
|否|父类的析构函数被自动调用|
>**访问属性：**可以访问所有请求实例的属性

## 15.2		析构过程操作

```swift
//银行
struct Bank {
    //硬币数量
    static var coinsInBank = 10_000
    
    //分发硬币
    static func vendCoins(var numberOfCoinsToVend:Int)->Int{
        numberOfCoinsToVend = min(numberOfCoinsToVend, coinsInBank)
        coinsInBank -= numberOfCoinsToVend
        return numberOfCoinsToVend
    }
    //获得硬币
    static func receiveCoins(coins:Int){
        coinsInBank += coins
    }
}

//玩家
class Player {
    var coinsInPurse:Int
    //初始化玩家的硬币数量
    init(coins:Int){
        coinsInPurse = Bank.vendCoins(coins)
    }
    //玩家从银行获得硬币
    func winCoins(coins:Int){
        coinsInPurse += Bank.vendCoins(coins)
    }
    //玩家退出时归还所有硬币
    deinit{
        Bank.receiveCoins(coinsInPurse)
    }
}

var playerOne:Player? = Player(coins: 100)//拥有100个硬币的玩家
playerOne!.winCoins(2_000)//赢得2000个硬币
playerOne = nil//玩家退出
```