---
title: 第4章 Flutter必备Dart基础：Dart快速入门
categories:
    - Flutter从入门到进阶_实战携程网App
tag:
    - Flutter
---



## 概述

+ 强类型语言，静态类型（比如 Java、C# 等）
+ 面向对象的语言，OOP（比如 Python、C++、Objective-C、Java、Kotlin、Swift、C#、Ruby 与 PHP 等）
+ JIT（即时编译，开发期间，更快编译，更快的重载） & AOT（事前编译，release 期间，更快更流畅）

![Dart知识体系图](http://assets.processon.com/chart_image/5ec4048e0791290fe072a39c.png)



## 数字、类型转换

```dart
// int 和 float 的父类
num num1 = -1.0;
num num2 = 2;

// 整数
int int1 = 3;

// 双精度
double d1 = 1.68;
print('num: $num1 num: $num2 int: int:$int1 double:$d1'); // num: -1.0 num: 2 int: int:3 double:1.68

// 求绝对值
print(num1.abs()); // 1.0

// 转换成 int
print(num1.toInt()); // -1

// 转换成 double
print(num1.toDouble()); // -1.0
```

## 字符串

```dart
// 定义
String str1 = '单引号', str2 = "双引号";

// 拼接 1
String str3 = 'str1:$str1 str2:$str2';

// 拼接 2
String str4 = 'str1:' + str1 + ' str2' + str2;
String str5 = '常用数据类型，请控制台输出';
print(str3); // 用数据类
print(str4); // str1:单引号 str2双引号

// 常用方法
print(str5.substring(1, 5)); // 用数据类
print(str5.indexOf('类型')); // 4
```

## 布尔

```dart
bool success = true, fail = false;
print(success); // true
print(fail); // false
print(success || fail); // true
print(success && fail); // false
```

## List

```dart
// 初始化
List list = [1, 2, 3, '集合']; // (不指定元素类型，此时 list1 是 List<dynamic>，即元素为动态数据类型)
print(list); // [1, 2, 3, 集合]
List<int> list2 = []; // (通过范型指定元素类型)

// 类型转换
// list2 = list; // 出错: type 'List<dynamic>' is not a subtype of type 'List<int>'

// 添加元素
List list3 = [];
list3.add('list3'); // (添加单个元素)
list3.addAll(list); // (添加集合的所有元素)
print(list3); // [list3, 1, 2, 3, 集合]

// 生成函数
List list4 = List.generate(3, (index) => index * 2);
print(list4); // [0, 2, 4]

// 遍历
for(int i = 0; i < list.length; i++) {
  print(list[i]); // 1 2 3 集合
}
for(var o in list) {
  print(o); // 1 2 3 集合
}
list.forEach((val){
  print(val); // 1 2 3 集合
});
```



## Map

## 科普小姿势

## 标准构造方法、初始化列表

## 命名构造方法

## 工厂构造方法

## 10 带你揭开Flutter中的面向对象（命名工厂构造方法）

## 11 带你揭开Flutter中的面向对象（get和set、静态方法）

## 12 带你揭开Flutter中的面向对象（抽象类和方法）

## 13 带你揭开Flutter中的面向对象（mixin）

## 14 带你解锁Flutter中常用的Dart方法类型

## 15 带你了解Dart范型在Flutter中的应用

## 16 有哪些可以用在Flutter上的编程技巧

## 17 小节