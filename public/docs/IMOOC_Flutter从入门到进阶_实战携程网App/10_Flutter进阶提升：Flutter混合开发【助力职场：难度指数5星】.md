---
title: 第 10 章 Flutter进阶提升：Flutter混合开发【助力职场：难度指数5星】
categories:
    - Flutter从入门到进阶_实战携程网App
tag:
    - Flutter
---

## 1 自测小作业（带着12个问题去学习）

1. Flutter混合开发都有哪些步骤？
2. 创建一个Flutter module都有哪些方式？
3.  简述为现有的Android项目集成Flutter都需要哪些步骤？
4. 简述为现有的iOS项目集成Flutter都需要哪些步骤？
5.  请对比纯Flutter和混合Flutter项目在调试上有哪些异同？
6. 要运行集成了Flutter的Android项目是应该在Android Studio的Android模式下运行还是应该在Flutter模式下运行？
7. 如何打包一个集成了Flutter的Android项目？有哪些步骤？
8. 简述Flutter和Native通信都有哪几种方式？并说明每种方式的使用场景？
9. 描述Channel是如何工作的？
10. Flutter如何调用Native代码？
11. Native如何调用Flutter代码？
12. 如何将Flutter作为页面的一部分集成到现有页面？

## 2 Flutter混合开发流程与创建Flutter module【搞懂流程，不碰壁】

### 情景

+ Flutter 作为独立页面嵌入原生

![image-20210225093655274](http://cdn.mengqingshen.com/2021-02-25-013655.png) 

+ Flutter 作为页面的一部分嵌入

![image-20210225093934249](http://cdn.mengqingshen.com/2021-02-25-013934.png)



### 集成步骤

1. 创建 Flutter module
2. 添加 Flutter module 依赖
3. 在 Java/Object-c 中调用 Flutter module
4. 编写 Dart 代码
5. 运行项目
6. 热重启/重新加载
7. 调试 Dart 代码
8. 发布应用

### 创建 Flutter module

```shell
$ flutter create -t module flutter_module
$ tree -L 3
.
└── flutter_module
    ├── README.md
    ├── flutter_module.iml
    ├── flutter_module_android.iml
    ├── lib
    │   └── main.dart
    ├── pubspec.lock
    ├── pubspec.yaml
    └── test
        └── widget_test.dart
```

<img src="/Users/threewood/Library/Application Support/typora-user-images/image-20210227081359358.png" alt="image-20210227081359358" style="zoom:25%;" />

## 3 Flutter Android混合开发实战-集成与调用【Android技术与Flutter融合】

