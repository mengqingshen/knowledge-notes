---
title: 19 类型转换
categories:
  - The Swift Program Language 2
tag:
  - swift语言

---

>**说明：**`类型转换`可以判断实例的类型，也可以将实例看做是其父类或者子类的实例。
>**操作符：**`is`和`as`
>+ 检查值的类型：`is`
>+ 转换类型：`as`

## 19.1	定义一个类层次作为例子

```swift
//多媒体文件
class MediaItem {
    var name:String
    init(name:String){
        self.name = name
    }
}
//电影
class Movie:MediaItem{
    var director:String
    init(name:String, director:String){
        self.director = director
        super.init(name: name)
    }
}
//歌曲
class Song:MediaItem{
    var artist:String
    init(name: String,artist:String) {
        self.artist = artist
        super.init(name: name)
    }
}

//存储多媒体文件的数组（迭代该数组取出的每一项类型都会是MediaItem）
let library = [
    Movie(name: "Casablance", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles"),
    Song(name: "The One And The Only", artist: "Chesney Jawkes"),
    Song(name: "Never Gonna Give You up", artist: "Rick Astley")
]
```

## 19.2	检查类型
>**说明：**`类型检查操作符(is)`，用来检查一个实例是否属于`特定子类型`。若实例属于那个子类型，类型检查操作符返回 `true`，否则返回 `false`。

```swift
//计算电影和歌曲类型分别的有多少个
var movieCount = 0
var songCount = 0
for item in library{
    //通过is判断一个实例具体是某种类型的哪种子类型
    if item is Movie{
        ++movieCount
    }else if item is Song{
        ++songCount
    }
}
println("Media library contains \(movieCount) movies and \(songCount) songs")
```

## 19.3	向下转型
>**两种方式：**可选形式和强制形式
>**注意：**类型转换不影响原本被转换的实例

|****|可选形式|强制形式|
|-|-|-|
|类型转换操作符|`as?`|`as`|
|适用场景|试图向下转型为一个不确定的类型|向下转成一个确定的类型|
|返回值|返回试图向下转成的的类型的可选值|返回目标类型|

```swift
//向下转型(不改变原本实例，指示获得转变后的实例来使用)
for item in library{
    if let movie = item as? Movie{
        println("Movie:'\(movie.name)',dir.\(movie.director)")
    }else if let song = item as? Song{
        println("Song:'\(song.name)',by \(song.artist)")
    }
}
```

## 19.4	`Any`和`AnyObject`的类型转换
>**Swift为不确定类型提供了两种特殊类型别名：**
>+ `AnyObject`：可以代表任何`class`类型的实例
>+ `Any`：可以表示任何类型，除了方法类型
>
>**注意：**只有当你明确的需要它的行为和功能时才使用`Any`和`AnyObject`

### 19.4.1	`AnyObject`类型
>**用途：**在工作中使用 `Cocoa APIs` 时，我们经常会接收到一个 `[AnyObject]` 类型的数组，或者说“一个任意类型对象的数组”。这是因为 `Objective-C` 没有明确的类型化数组。
>**说明：**从 `Xcode 7` 和 `Swift 2.0` 开始，由于 `Objective-C` 引入了轻量泛型，集合类型已经可以类型化了，在 `Swift` 中使用 `Cocoa API` 也越来越少遇到 `AnyObjec` 类型了。
>**技巧：**可以使用强制形式的类型转换`as`来下转数组中的每一项到比 `AnyObject` 更明确的类型

```swift
//AnyObject:可以代表任何class类型的实例
let someObjects:[AnyObject] = [
    Movie(name: "2001:A Space Obyssey", director: "Stanley Kubrick"),
    Movie(name: "Moon", director: "Duncan Jones"),
    Movie(name: "Alien", director: "Ridley Scott")
]
//方式一
for object in someObjects{
    let movie = object as Movie
    println("Movie:'\(movie.name)',dir.Stanley Kubrick")
}
//方式二（更简洁）
for movie in someObjects as [Movie]{
    println("Movie:'\(movie.name)',dir.\(movie.director)")
}
```

### 19.4.2	`Any`类型
**注意：**在`switch`语句的`case`中使用`as`而不是`as?`是安全的，不会导致运行时错误

```swift
//Any类型
var things = [Any]()
things.append(0)
things.append(0.0)
things.append(42)
things.append(3.141592654)
things.append("hello")
things.append(Movie(name: "Ghostbusters", director: "Ivan Reitman"))
things.append({(name:String) -> String in "Hello,\(name)"})

for thing in things {
    switch thing {
    case 0 as Int:
        println("zero as an Int")
    case 0 as Double:
        println("zero as a Double")
    case let someInt as Int:
        println("an integer value of \(someInt)")
    case let someDouble as Double where someDouble > 0:
        println("a positive double value of \(someDouble)")
    case is Double:
        println("some other double value that I don't want to print")
    case let someString as String:
        println("a string value of \"\(someString)\"")
    case let (x, y) as (Double, Double):
        println("an (x, y) point at \(x), \(y)")
    case let movie as Movie:
        println("a movie called '\(movie.name)', dir. \(movie.director)")
    case let stringConverter as String -> String:
        println(stringConverter("Michael"))
    default:
        println("something else")
    }
}
```