---
title: 17 可选链式调用
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

>**是什么：**是一种可以在当前值可能为`nil`的可选值上调用属性、方法及下标脚本的过程
>**使用场景**：请求或调用的目标当前可能为空(`nil`)，这时使用`!`在一个连续调用的过程中有报错的可能。这时可以用作用域链的方式。
>**特点：**
>1. 如果可选的目标有值，调用成功；否则一律返回`nil`。
>2. 多次请求或调用可以被链接在一起形成一个链，如果任何一个节点为`nil`，将导致整个链实效。
>3. 不论你调用的属性、方法、下标脚本等返回的值是不是可选值，返回结果都是一个可选值。
>
>**适用类型：**任意类型


## 17.1	可选链可替代强制解析
>**说明：**在调用的属性、方法或下标脚本的可选值后面放一个`?`
>**比较（与`!`）：**当可选值为`nil`时

|强制解析|可选链|
|-----------|---------|
|引发运行时错误|可选链即刻实效|

```swift
//人
class Person{
    //无论该属性是否设置为可选型，都可以通过可选链的方式（?）访问
    var residence:Residence?
}
//住宅
class Residence{
    var numberOfRooms = 1
}

//实例化一个人的实例，拥有一个默认值为nil的可选型属性
let john = Person()

//let roomCount = join.residence!.numberOfRooms//join.residence使用感叹号将导致运行时错误

/**
*join.residence?.numberOfRooms：始终返回一个可选型（不会像!，当join.residence为nil时报错）
*/
if let roomCount = john.residence?.numberOfRooms {
    println("John's residence has \(roomCount) room(s).")
}else{
    println("Unable to retrieve the number of rooms.")//residence的值为nil
}

```

## 17.2	为可选链定义模型类
>**和定义普通类区别：**期望用可选链调用的属性应当定义为可选型

## 17.3	通过可选链调用属性
>**方式：**调用时在属性后面添加后缀`?`

## 17.4	通过可选链调用方法
>**方式：**调用时在方法名后面添加后缀`?`

## 17.5	使用可选链调用下标脚本
>**方式：**在下标脚本括号的前面添加`?`

## 17.6	连接多层可选链式调用
>**说明：**可以通过连接多个可选链式调用在更深的模型层级中访问属性、方法以及下标。
+ 如果你访问的值不是可选的，可选链式调用将会返回可选值
+ 如果你访问的值就是可选的，可选链式调用不会让可选返回值变得“更可选”

## 17.7	链接可选返回值的方法 
**说明：**除了获得可选类型属性值，还可以通过可选链调用一个返回可选类型值的方法并按需链接该方法的返回值。
**方式：**在调用方法的括号的后面添加`?`
#综合案例：

```swift
//人
class Person{
    //无论该属性是否设置为可选型，都可以通过可选链的方式（?）访问
    var residence:Residence?
}
//房间
class Room{
    let name:String
    init(name:String){
        self.name = name
    }
}
//住宅
class Residence{
    //存储房间的数组
    var rooms = [Room]()
    
    //计算属性（返回房间数）
    var numberOfRooms:Int {
        return rooms.count;
    }
    //下标脚本（使能通过下标直接访问房间）
    subscript(i:Int)->Room{
        return rooms[i]
    }
    /*
    *打印房间数目
    *有一个隐式的返回值类型void，使用可选链的方式调用返回void?(可选型)
    */
    func printNumberOfRooms(){
        println("The number of rooms is \(numberOfRooms)")
    }
}

//地址
class Address{
    var buildingName:String?//大厦名称
    var buildingNumber:String?//楼牌号
    var street:String?//大街
    //获得大厦的名称或楼牌号
    func buildingIdentifier() -> String?{
        if (buildingName != nil) {
            return buildingName
        }else if(buildingNumber != nil) {
            return buildingNumber
        }else{
            return nil
        }
    }
}
//实例化一个人的实例，拥有一个默认值为nil的可选型属性
let john = Person()

//通过可选链调用属性:下面的写法有问题，不知道为什么
if let roomCount = john.residence?.numberOfRooms {
    println("John's residence has \(roomCount) rooms.")
}else{
    println("Unable to retrieve the number of rooms.")//residence的值为nil
}

//通过可选链调用方法:下面的写法报错了，不明白为什么
if john.residence?.printNumberOfRooms?(){
    println("It was possible to print the number of rooms.")
}else{
    println("It was possible to print the number of rooms.")//john的residence不存在
}

//通过可选链调用下标脚本
if let firstRoomName = join.residence?[0].name{
    println("The first room name is \(firstRoomName).")
}else{
    println("Unable to retrieve the fit=rst room name.")
}

let johnsHouse = Residence()
johnsHouse.rooms += Room(name:"Living Room")
johnsHouse.rooms += Room(name:"Kitchen")
john.residence = johnsHouse

if let firstRoomName = john.residence?[0].name{
    println("The first room name is \(firstRoomName).")
}else{
    println("Unable to retrieve the first room name.")
}

//连接多层链接
let johnsAddress = Address()
johnsAddress.buildingName = "The Larches"
johnsAddress.street = "Laurel Street"
john.residence!.address = johnsAddress

if let johnsStreet = john.residence?.address?.street{
    println("John's street name is \(johnsStreet).")
}else{
    println("Unable to retrieve the address.")
}
//链接可选返回值的方法
if let buildingIdentifier = john.residence?.address?.buildingIdentifier(){
    println("John's building idetifier is \(buildingIdentifier)")
}

if let upper = john.residence?.address?.buildingIdentifier()?.uppercaseString{
    println("John's uppercase building identifier is \(upper)")
}
```