---
title: Axure 母版使用
categories:
  - Axure 从入门到精通
tag:
  - Axure
toc: true
---

[视频地址](http://www.jikexueyuan.com/course/1916.html)
> Axure 的母版是一个解决如何避免重复设计的神奇功能。通过它可以实现一次设计，多页面共用的效果，同时也解决了在母版中一次修改，多页面同步更新的效果。这大大提高了原型设计的效率，也更易于管理与维护。   

# 1母版功能的介绍
## 1.1 创建母版的两种方式

### 通过组件转换为母版
(1) 选中所有需要转换为母版的组件
(2) 右键菜单 > Convert toMaster
(3) 为创建的新模板命名
![](http://o7m5xjmtl.bkt.clouddn.com/EA5AC37E-EEB5-4430-A3B2-9C9D49779146.png)

### 通过母版区域新建母版
![](http://o7m5xjmtl.bkt.clouddn.com/8EB98CD1-426F-4BA1-B635-5E0F16CBA2A5.png)


(1) 在 `Masters` 窗口中创建新模板（和在 Pages 中操作非常类似）
![](http://o7m5xjmtl.bkt.clouddn.com/BF264530-5EBC-4381-A994-53BFF92730C8.png)

(2) 点开新创建的模板进行编辑

(3) Add to Pages
![](http://o7m5xjmtl.bkt.clouddn.com/3ED8F639-03CF-4B24-92C4-BF944E8CE382.png)

(4) 勾选要应用到的页面（可以指定放置方式）
![](http://o7m5xjmtl.bkt.clouddn.com/D5EAC58C-5BC0-4A52-922C-EFE3820EC6C3.png)

## 1.2 母版的使用场景
+ 导航菜单设计
+ 页首、页尾设计
+ 网站详情页设计
+ 展示商品的列表信息
+ 未登录的弹出层信息
+ …

# 2母版三种拖放行为的使用
## 任何位置拖放
`鼠标右键 > 去掉勾选 Loack to Master Location`

+ 是否可移动：是
+ 位置是否同步：否
+ 修改是否同步：是

## 锁定到母版中的位置
`鼠标右键 > 勾选 Lock to Master LOcation`

+ 是否可移动：是
+ 位置是否同步：否
+ 修改是否同步：是

## 从母版脱离后
`鼠标右键 > Break Away`

+ 是否可移动：是
+ 位置是否同步：否
+ 修改是否同步：否

> **注意：** 页面引用的母版与原母版失去联系，页面引用的母版组件可以像一般组件进行编辑，常用于创建具有自定义组件的组合。  

# 3 Axure 母版导航设计
## 告诉软件该做什么
+ 导航菜单的分组
![](http://o7m5xjmtl.bkt.clouddn.com/633DBE09-D153-4DCC-A18D-75759D87450F.png)

## 导航菜单的命名
+ 动词+名词组合
+ 让用户感觉是领导者，而不是被领导者