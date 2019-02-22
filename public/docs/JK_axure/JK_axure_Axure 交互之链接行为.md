---
title: Axure 交互之链接行为
categories:
  - Axure 从入门到精通
tag:
  - Axure
---


[视频地址](http://www.jikexueyuan.com/course/1708.html)
> Axure 链接交互行为是用来通过不同的方式打开我们的页面，可以在当前窗口打开新的页面，也可以在新窗口或者弹出窗口打开新的页面，或者可以在内部框架中打开我们的页面等等不同的方式，链接交互行为可以让我们制作的原型有丰富的交互效果。   

# 1 打开链接和关闭窗口行为
本课时学习打开链接和关闭窗口交互行为，学会使用不同的方式的打开链接页面，学会如何关闭我们的页面。

## 打开链接
![](http://o7m5xjmtl.bkt.clouddn.com/AD1FDD9E-2219-41ED-A369-CB9ADB776F25.png)

+ 在当前窗口打开链接
+ 在新窗口打开链接
+ 在弹出窗口打开链接
+ 在父窗口(referrer)打开链接：父页面通过 `window.open` 打开的子页面，所以子页面可以通过 `document.referrer` 改变父页面的 `location.href`

## 关闭页面
+ Clone Window
![](http://o7m5xjmtl.bkt.clouddn.com/1FC31756-7E12-4EC2-ABD3-EF67EFA87448.png)


# 2 在内部框架(Inline Frame)中打开链接行为 
内部框架其实就是 iframe。
> **注意：** 能使用动态面板，则不用 Inline Frame！  
> 动态面板除了不能引用视频外，完全可以取代 Inline Frame。相比之下，Inline Frame 不够灵活，效率不高，设置相对复杂。  

## 设置 Inline Frame
+ 动作：在 Inline Frame 中打开指定页面
![](http://o7m5xjmtl.bkt.clouddn.com/C6CBB664-C4B1-4E81-9B56-8AD00B8EE36E.png)

+ 设置 Inline Frame 默认打开的页面
(1) 双击 Inline Frame 控件
(2) 在弹出的窗口中单击选中默认页面
![](http://o7m5xjmtl.bkt.clouddn.com/849FB1DD-BABC-462D-BFB0-030B99BD4438.png)

+ 设置 Inline Frame 的滚动条
*右键菜单*
![](http://o7m5xjmtl.bkt.clouddn.com/5C647433-033F-41AC-B57D-FE71CDB34A16.png)

(2) 选择滚动条的逻辑

+ 设置 Inline Frame 显示／隐藏边框
*右键菜单*
![](http://o7m5xjmtl.bkt.clouddn.com/EDABBEF4-899F-4491-81DD-938ACF086CA4.png)

## 总结 Inline Frame 的作用
### 引用并展现资源
+ 引用视频
* 引用本地文件
* 引用网页

### 交互行为
+ 在 Inline Frame 中打开链接
* 在父框架(referrer)中打开链接

# 3 滚动到部件（锚点链接）行为 
本课时学习滚动到部件行为，也称为锚点链接行为，可以滚动到锚点链接指定的位置。

+ 动作：滚动到指定位置
![](http://o7m5xjmtl.bkt.clouddn.com/4206F536-0885-4D72-8D0E-D41D612186B4.png)