---
title: 第二章 Flutter学习经验：Flutter快速上手指南
categories:
    - Flutter从入门到进阶_实战携程网App
tag:
    - Flutter
---

## 0 通用

+ 布局：声明式 UI，和 Android 和 iOS 通常的命令式的 UI 变成风格有所不同

```dart
Container(
	decoration: BoxDecoration(color: Colors.grey),
	child: Text(
		'声明式布局',
		style: TextStyle(
			fontSize: 20,
			fontWeight: FontWeight.w600,
			color: Colors.red,
		)
	)
)
```



+ 第三方库：https://pub.dev

  ![image-20191128235924140](/Users/threewood/Library/Application Support/typora-user-images/image-20191128235924140.png)

## 1 Android 开发者如何快速上手 Flutter 开发

+ 语言基础：Dart2（静态强类型），面向对象，类似 Java
+ 开发工具：AndroidStudio（需要安装 Dart 插件）
+ 控件：Android 控件和 Flutter Widget

| Android 控件                       | Flutter Widget       |
| ---------------------------------- | -------------------- |
| View                               | Widget               |
| LinearLayout                       | Colum、Row           |
| RelativeLayout                     | Column + Row + Stack |
| ScrollView、RecyclerView、ListView | ListView             |
| TextView                           | Text                 |
| EditText                           | TextField            |



## 2 iOS 开发者如何快速上手 Flutter 开发

+ 语言基础：Dart2（静态强类型），面向对象，类似 Object-C
+ 开发工具：AndroidStudio, 类似 Xcode（需要安装 Dart 插件）
+ iOS 控件和 Flutter Widget

| iOS 控件                                  | Flutter Widget |
| ----------------------------------------- | -------------- |
| UIView                                    | Widget         |
| UITableView, UICollectionView, ScrollView | ListView       |
| TextView                                  | Text           |
| TextField                                 | TextField      |



## 3 ReactNative 开发者如何快速上手 Flutter 开发

+ 语言基础：Dart2（静态强类型），面向对象，和 JavaScript（弱类型，动态语言） 区别很大

+ 开发工具：AndroidStudio 和 VS Code 都可以

+ 布局：和 Flutter 一样，都是用响应式视图，单 React Native 转换为原生控件，而 Flutter 则是编译为本机代码。相比较而言，Flutter 避免了 JavaScript 桥接导致的性能损失

  

## 4 前端开发者如何快速上手 Flutter 开发

+ 语言基础：Dart2（静态强类型），面向对象，和 JavaScript（弱类型，动态语言） 区别很大
+ 开发工具：AndroidStudio 和 VS Code 都可以
+ 布局：Flutter 的布局方式和我们前段布局常用的 css 有所不同