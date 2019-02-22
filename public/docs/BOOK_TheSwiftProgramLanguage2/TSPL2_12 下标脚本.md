---
title: 12 下标脚本
categories:
  - The Swift Program Language 2
tag:
  - swift语言
---

>**用途**：访问对象、集合、序列的快捷方式，可以使用下标脚本的索引设置和获取值，不需要再调用对应的存取方法
>**支持**：类、结构体、枚举
>**特点**:
>1. 同一个目类型可以定义多个附属脚本
>2. 可以通过索引值的类型进行重载
>3. 语法类似实例方法和计算属性的混合

## 12.1	语法
>**关键字**：`subscript`、`set`、`get`
>**说明：**语法类似于`实例方法`语法和`计算型属性`语法的混合。
>+ 显式声明入参和返回值（类似实例方法）
>+ 可以设定为读写或只读，由 `getter` 和` setter` 实现（类似计算属性）

>**setter和getter：**

|****|参数|返回值|
|-|-|-|
|set|0或多个参数类型必须与`get`返回类型相同，如果不指定参数，会提供一个名为`newValue`的默认参数|无|
|get|无|和脚本入参类型相同值|

```swift
//具备读写能力的附属脚本
subscript(index:Int)->Int{
    get{
        //返回与入參匹配的Int类型的值
    }
    set(newValue){
        //执行赋值操作
    }
}
//只读的附属脚本（简写形式）
subscript(index:Int)->Int{
    //返回与入參匹配的Int类型的值
}
```

**案例**：展示传入整数的n倍数（结构体中使用只读下标脚本）

```swift
struct TimesTable {
    let multiplier:Int
    subscript(index:Int)->Int{
        return multiplier * index
    }
}
let threeTimesTable = TimesTable(multiplier: 3)
println("3的6倍是\(threeTimesTable[6])")
```

## 12.2	用法（以字典为例）
>**说明：**字典本身是由结构体实现的，通过下标脚本来对其实例来进行存取操作。
>**特点：**
>1. 字典实例在下标脚本中使用和字典索引相同类型的值
>2. 字典通过附属脚本返回的实际是一个可选值
>3. 从字典实例中删除某个索引下的值也需要给这个索引赋值为`nil`

```swift
var numberOfLogs = ["spider":8, "ant":6, "cat":4]
numberOfLogs["birds"] = 2
```

## 12.3	高级
>**说明：**下面详细说明下标脚本的一些特点
>+ *参数：*下标脚本可以接受任意数量的入参，并且这些入参可以是任意类型
>+ *返回值：*下标脚本的返回值也可以是任意类型
>+ *变量：*下标脚本可以使用变量参数和可变参数
>+ *重载：*一个类或结构体可以根据自身需要提供多个下标脚本实现，使用下标脚本时将通过入参的数量和类型进行区分，自动匹配合适的下标脚本，这就是下标脚本的重载

>**限制：**
>+ *参数：*不能使用输入输出参数，也不能给参数设置默认值

```swift
//矩阵
struct Matrix {
    let rows:Int, columns:Int
    var grid:[Double]
    
    //构造方法：包含两个入參
    init(rows:Int, columns:Int){
        self.rows = rows
        self.columns = columns
        grid = Array(count:rows * columns, repeatedValue:0.0)
    }
    
    //确保入參的row货column不会造成数组越界
    func indexIsVaildForRow(row:Int, column:Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 &&  column < columns
    }
    
    //下标脚本（两个参数）
    subscript(row:Int, column:Int)->Double{
        get{
            assert(indexIsVaildForRow(row, column:column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set{
            assert(indexIsVaildForRow(row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}

//创建结构体实例
var matrix = Matrix(rows: 2, columns: 2)

//利用下标脚本赋值
matrix[0, 1] = 1.5
matrix[1, 0] = 3.2
```