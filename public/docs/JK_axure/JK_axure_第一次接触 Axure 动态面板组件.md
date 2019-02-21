---
title: 第一次接触 Axure 动态面板组件
categories:
  - Axure 从入门到精通
tag:
  - Axure

---

[视频地址](http://www.jikexueyuan.com/course/1664.html)

动态面板组件是 Axure 组件里比较重要的组件，也是使用最频繁一个组件，通过动态面板组件，可以制作出各种交互效果，能让我们静态的页面动起来，能反映出用户的真实体验效果。 

# 1 动态面板的使用
(1)  创建一个新的 Dynamic Panel
(2) 编辑状态
方式1: 双击弹出 Dynamic Panel State Manager
![](http://o7m5xjmtl.bkt.clouddn.com/6D5DEDF8-135C-4D0C-88DC-6ECCA2E79CBC.png)

方式2: 在 Outline 中直接编辑
![](http://o7m5xjmtl.bkt.clouddn.com/DA005998-B456-4FED-A522-9B0F2AABBE7E.png)

# 2 动态面板的常用功能
![](http://o7m5xjmtl.bkt.clouddn.com/0AE2CF89-0D1B-4484-AFF4-9F9EBF84C290.png)


## 动态面板的显示与隐藏效果
**场景举例：** 比如填写表单的时候，输入不合法需要显示一条提示信息。
**说明：** 动作 - 显示/隐藏/切换动态面板

*预览效果*
![](http://o7m5xjmtl.bkt.clouddn.com/dynamicpanelshowhide.gif)

*步骤*
(1) 创建新的动态面板

(2) 为动态面板添加状态，并设置默认隐藏
方式1: 右键菜单 > Set Hidden
方式2: 勾选相关设置
![](http://o7m5xjmtl.bkt.clouddn.com/AC881D52-9860-4A4A-AF16-F9E351CC1553.png)

(3) 注册针对动态面板显示/隐藏的事件
![](http://o7m5xjmtl.bkt.clouddn.com/C03DEDEB-9A49-4835-A976-B6CAE7009635.png)

## 动态面板的调整大小以适合内容
 默认情况下，动态面板中的内容如果超出动态面板区域，超出的部分会被隐藏。
通过设置 `右键菜单 > Fit toContent` ，动态面板就会自动根据内容调整自己的大小。

## 动态面板的滚动栏设置
默认情况下，超出动态面板的内容会被隐藏，且不会有滚动条。
通过设置 `右键菜单 > Scrollbars` 就可以让滚动条以某种策略显示出来。有多个策略：
+ Never Show Scrollbars
* Show Scrollbars as Needed
* Show Vertical Scrollbar as Needed
* Show Horizontal Scrollbar as Needed

## 动态面板的固定到浏览器
其实就是 `display: fixed` 效果，步骤如下：

(1) 创建动态面板，并编辑内容
(2)  `右键菜单 > Pin to Browser…`
![](http://o7m5xjmtl.bkt.clouddn.com/FA67DC3E-F018-47F2-9DE2-C55538D3268B.png)

## 100%宽度
其实就是 `width: 100%` 的效果。步骤如下：
(1) 创建动态面板，并编辑内容
(2) `右键菜单 > 100% width(browser only)`

## 从动态面板脱离
动态面板每个状态所包含的内容都可以从动态面板中脱离出来，成为普通内容。步骤如下：
(1) 创建动态面板，并编辑内容
(2) `右键菜单 > Break Away First State` （只能从上往下一个状态一个状态地脱离）

> **注意：** 当动态面板中多有状态的内容都脱离出来之后，动态面板本身将消失！  

## 转换为动态面板
 `右键菜单 > Break Away First State`  
所有组件都可以转换为动态面板中的内容。

## 转换为母版 (Master)
 `右键菜单 > Convert to Master` 
所有组件都可以转换为母版，比如每个页面如果都有一个导航栏，则可以吧这个导航栏设置为母版。以后每个页面的原型都通过这个模板来创建，这样大家一开始就会有一个导航栏。

# 3 实例：淘宝登录页签的切换效果 
+ (事件动作) 切换 Dynamic Panel 的 state:  Widgets >  Set Panel State
* (悬浮样式) 有两种方式实现
方式1: 动态面板
方式2: 事件动作（OnMouseEnter + OnMouseOut）
方式3: 响应式样式（MouseOver)

![](http://o7m5xjmtl.bkt.clouddn.com/1767B199-B6D7-4C03-B096-95672A463E86.png)

![](http://o7m5xjmtl.bkt.clouddn.com/373AE880-B66A-472C-874D-3F2B26AE4BAB.png)  ![](http://o7m5xjmtl.bkt.clouddn.com/DEBA2F16-16FF-4335-824B-4CF4448D3EF5.png)

