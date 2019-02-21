---
title: Axure 团队项目协作和 Axure 使用技巧
categories:
  - Axure 从入门到精通
tag:
  - Axure

---

[视频地址](http://www.jikexueyuan.com/course/2241.html)

> Axure 是一个专业的快速原型设计工具，对于有些需要协作的项目时，可以允许多个团队成员共同编辑同一个项目文件，并且同时保存项目的历史版本，掌握 Axure 的团队协作将大大增加了工作中的项目进度。   


# 1 搭建 Axure 团队项目
本课时讲解如何搭建 Axure 团队项目，多个用户同时编辑同一个项目文件。

*Team > Create Team Project From Current File*
![](http://o7m5xjmtl.bkt.clouddn.com/C36BF0E2-0834-4BF4-9738-08B25C4308A0.png)

**协作方式**
+ Axure Share： 需要在同一个局域网中通过共享文件夹协作
* SVN: 通过版本管理工具 SVN 协作

**签入和签出**
+ 签出:  `签出` 共享项目中的某个文件才能修改，而且团队其它成员无法修改（不签出也可以修改文件，但不会被保留到团队项目中）；
* 签入:  `签入` 共享项目中的某个文件相当于提交了修改，团队其它成员这时才能进行签入操作。


# 2 获取、编辑、提交团队项目
本课时讲解如何获取团队项目、编辑团队项目以及提交团队项目。

(1) 获取团队项目（Team > Get and Open Team Project）或打开本地已经获取过的团队项目的本地副本；
(2)  `签出` 需要修编辑的文件（如果是之前就获取的项目，则需要先更新一下）；
(3) 编辑完成后 `签入` 编辑过的文件。

# 3 Axure 使用技巧
本课时讲解 Axure 的使用技巧，便于我们快速的进行原型设计。

## 辅助线使用

![](http://o7m5xjmtl.bkt.clouddn.com/D4861CFB-704C-487C-8D4C-A79056837FBB.png)
## 元素选择
+ 锁定：用于避免意外改变了某些 widget 的位置（选中一批 widget, 通过拖动改变它们的位置，其中被锁定的 widget 不会发生位移）
![](http://o7m5xjmtl.bkt.clouddn.com/97177FD7-6E2E-433E-A5FE-75A75170F391.png)

+ 组合：用于避免意外选中整体中的部分 widget 拖动了它们（组合在一起的 widget ，选中任何一个拖动，组合会整体位移）
![](http://o7m5xjmtl.bkt.clouddn.com/9112451B-5E1B-49CC-AA5E-520900E22077.png)

* 单击：用于选中被遮盖的 widget，通过不断 `单击` ，会从上往下一个一个切换选中的 widget
![](http://o7m5xjmtl.bkt.clouddn.com/axureclicktoselect.gif)

## 元素对齐设置
![](http://o7m5xjmtl.bkt.clouddn.com/BD78CF30-5B28-45E2-AC23-84B5855F72BC.png)

+ Align:  对齐设置
* Distribute: 分布设置

## 图片裁剪使用
+ 裁剪图像
（1）插入图片 widget
![](http://o7m5xjmtl.bkt.clouddn.com/BCD5C140-15C8-40C6-BDAE-10A381F4A532.png)

（2）右键菜单 > 裁剪（Crop Image）
![](http://o7m5xjmtl.bkt.clouddn.com/8E76F6EA-B214-49F5-9097-D2376779CB9F.png)

（3）调整裁剪区域
![](http://o7m5xjmtl.bkt.clouddn.com/BF5F0A67-B1FB-4557-A726-AEE53140B57E.png)

（4）双击裁剪区域完成裁剪
![](http://o7m5xjmtl.bkt.clouddn.com/362B029D-3DC0-4F1E-9937-D551E3F3EE43.png)

+ 分割图像
（1）插入图片
（2）右键菜单 > 分割图片（Slice Image）
![](http://o7m5xjmtl.bkt.clouddn.com/A20C1FAB-A027-4011-BDF7-78E2D5A7C895.png)
（3）确定分割点，将图片分割为4部分
![](http://o7m5xjmtl.bkt.clouddn.com/0A8505A5-888F-4D1A-9F47-715E085CF422.png)
（4）单击图像，完成分割
![](http://o7m5xjmtl.bkt.clouddn.com/CA0F80EB-EAAF-434D-8068-C249EEBFACFF.png)


## 图形的使用
+ 将普通形状转换并组合为更为丰富的形状
（1）创建一个形状 widget （以矩形为例）

（2）点击旁边的那个圆点
![](http://o7m5xjmtl.bkt.clouddn.com/FB1C47BD-45C7-4434-AB4B-7B07D192EED6.png)

（3）在弹出的图形中选择合适的图形（以箭头为例）
![](http://o7m5xjmtl.bkt.clouddn.com/51CFEBDE-83CF-40F1-AC6A-F80A52A56A2A.png)
（4）完成
![](http://o7m5xjmtl.bkt.clouddn.com/FB15870D-2FD8-4DA4-B973-E6AB37B0B234.png)


## 手绘风格使用
![](http://o7m5xjmtl.bkt.clouddn.com/B2B2B47F-60B8-4F9C-A552-D896FA66BC89.png)     ![](http://o7m5xjmtl.bkt.clouddn.com/CFCBCAF7-61DF-46AC-94DA-1BADE57CC644.png)

## 智能手机图片滑动效果
## 图片文件上传