---
title: Axure 中继器使用
categories:
  - Axure 从入门到精通
tag:
  - Axure
---

[视频地址(上)](http://www.jikexueyuan.com/course/2075.html)
[视频地址(下)](http://www.jikexueyuan.com/course/2085.html)

> 在设计原型的过程中，经常会涉及到表格的设计，如何能让表格实现数据的增删改查操作，制作出高保真的原型，而 Axure 的中继器组件便能够让用户体验到操作真实软件的感觉。   

# 1 认识中继器
## 什么是中继器?
中继器部件是用来显示重复的文本、图片和链接。通常使用中继器来显示商品列表信息、联系人信息、用户信息等等。

![](http://o7m5xjmtl.bkt.clouddn.com/314126B7-EF89-48EF-881C-5ABAAB96BFB1.png)

## 中继器的组成
一个中继器组件由两部分组成， `数据集` 和 `项` 。
### 中继器数据集
![](http://o7m5xjmtl.bkt.clouddn.com/03ADC313-35B5-4D37-8EC6-F2D8A62D464A.png)


### 中继器的项
双击中继器组件就会打开 `中继器的项` ， `项` 可以对应 `数据集` 中的一列数据 。默认的 `项` 本质上就是一个 `矩形组件` 而已，可以对它进行任意的修改，设置用其它组件替换。

## 中继器的使用场景
+ 表格信息
+ 文章列表信息
+ 商品图片信息
+ 订单列表信息
+ …


# 2 绑定数据
(1) 创建中继器组件
(2) 在 Properties 的 Repeater 下编辑 `中继器组件的数据集`
![](http://o7m5xjmtl.bkt.clouddn.com/B57F97E8-9C81-4E44-B5D4-E561171D510B.png)

(3) 编辑 `中继器组件的项`
![](http://o7m5xjmtl.bkt.clouddn.com/A23ECC15-EC74-41CA-BE51-EA61026BB84A.png)

(4)  `项` 和 `数据集` 绑定:  在 `OnItemLoad`  事件中为需要填充数据的地方 `Set Text`
![](http://o7m5xjmtl.bkt.clouddn.com/8356C445-BEA3-4F42-B3BE-F172E6F6845E.png)


# 3 新增数据之弹出窗设计
+ 使用动态面板：因为弹出窗既可以用来新增数据，也可以用来编辑数据，存在多种状态
* 包含遮罩和弹窗两部分
* 为了不影响原型的设计操作，应当把用来弹窗的动态面板置于底层，并隐藏

![](http://o7m5xjmtl.bkt.clouddn.com/F040843F-D465-453E-90FE-7C69F313A81A.png)

# 4 新增数据
![](http://o7m5xjmtl.bkt.clouddn.com/7A686189-D84E-426C-BB7A-394FE5C39A21.png)

(1) 为 `保存` 按钮注册 onClick
![](http://o7m5xjmtl.bkt.clouddn.com/F7CE7C18-6303-4C96-88DE-0869B09A2772.png)

(2) 在 case editor 中，`Repeater > Datesets > Add Rows > 选择目标中继器组件 > `
![](http://o7m5xjmtl.bkt.clouddn.com/0B9AF839-09E4-4837-B4B2-FA5FDC53410E.png)

(3) 弹出 Add Rows Reapter 窗口，分别设置每个属性
![](http://o7m5xjmtl.bkt.clouddn.com/F01C566D-F7C0-4721-8B35-8CE79BBD4C37.png)

其中每个属性都在 fx 中完成设置（以员工编号为例）
![](http://o7m5xjmtl.bkt.clouddn.com/060E17C4-D295-4BD9-92D5-8E326DEDDDA5.png)

注意，部门和其它属性不同！
![](http://o7m5xjmtl.bkt.clouddn.com/D9F0DE37-B4F2-4F13-9254-D8A185D762FE.png)

(4) 为两个 `关闭` 按钮注册 onClick
![](http://o7m5xjmtl.bkt.clouddn.com/57B8D041-5627-4484-AE55-86388DD036F8.png)

# 5 删除数据
## 功能说明
![](http://o7m5xjmtl.bkt.clouddn.com/AB147C56-3E4E-41AF-8ADA-E651024B5B96.png)

## 实现步骤
### 行内删除
删除一行数据项。
(1) 为 `中继器项` 中的 `删除` 注册 onClick
(2) 在 `Case Editor` 中， `Repeater > Datasets > Mark Rows` ，标记所在当前行;
(3) 在 `Case Editor` 中， `Repeater > Datasets > Delete Rows` ， 删除中继器中被标记的行。

![](http://o7m5xjmtl.bkt.clouddn.com/40251401-33C6-4B59-AA36-6C6B65975DB2.png)

### 全局删除
删除所有勾选了的数据项。

(1) 全选 和 全不选;
为全选复选框注册 onSelectedChange
![](http://o7m5xjmtl.bkt.clouddn.com/80EDCA17-0EC6-491A-9835-52BEAFAE5C0F.png)

(2) 当行内复选框被勾选时，当前行被标记；当去掉勾选时，删除标记；
为 `中继器项` 中的复选框注册 onSelected 和 onUnselected
![](http://o7m5xjmtl.bkt.clouddn.com/F52530C0-B0DD-4A7B-B504-5CA0C882AAA8.png)

(3)  点击全局删除按钮时，删除所有被标记的行
![](http://o7m5xjmtl.bkt.clouddn.com/84E7B111-8865-4EAC-AF4F-64F86DE6CFB8.png)


# 6 修改数据之弹出窗口初始化
## 功能说明
![](http://o7m5xjmtl.bkt.clouddn.com/auxrerepeatererpedit.gif)

## 实现步骤
为 `中继器项` 中的 `修改` 注册 onClick
![](http://o7m5xjmtl.bkt.clouddn.com/3F5B3635-7381-40F3-A8CC-5AA9B2D0A4B4.png)

![](http://o7m5xjmtl.bkt.clouddn.com/9070CE2C-EBE1-44CD-A220-10D98AF6805B.png)

(1) 将弹出窗显示出来，并放置在最顶层；
(2) 分别将 `中继器数据集` 对应当前行的数据取出来，赋值给表单中对应的 input 或 select。
值时通过本地变量获取的，以 `员工编号为例` :
![](http://o7m5xjmtl.bkt.clouddn.com/588591C7-7926-42D7-8776-2EA471CEA701.png)

# 7 修改数据之保存修改
(1) 新增一个全局变量来区分弹出窗的保存按钮，是 `新增` 还是 `修改` ；

![](http://o7m5xjmtl.bkt.clouddn.com/DBC7FAC3-1B19-4108-AB2E-ABCF6C57026A.png)

(2) 单击 `修改`
![](http://o7m5xjmtl.bkt.clouddn.com/0752BFAC-4C96-43C5-84DF-73A362132B88.png)

![](http://o7m5xjmtl.bkt.clouddn.com/728BCCEE-41B5-443D-AEB9-0C18A0433F82.png)


(3) 单击 `保存`
![](http://o7m5xjmtl.bkt.clouddn.com/0B1A5D6F-CA0D-471D-A229-3861E4274968.png)

![](http://o7m5xjmtl.bkt.clouddn.com/213D12D2-E6C9-4BA3-8A62-A538377E0C4D.png)

# 8 数据搜索
通过使用 Repeater 的过滤器完成检索。

## 8.1 按姓名检索
### 功能说明
(1) 在搜索框输入要搜索的名字
![](http://o7m5xjmtl.bkt.clouddn.com/17039970-C140-419B-A4B8-B1CBDD1E5448.png)

(2) 点击搜索按钮，显示过滤后的结果
![](http://o7m5xjmtl.bkt.clouddn.com/1FAC6A02-DF44-4082-B252-2182B6FFD68F.png)

### 实现步骤
(1) 添加搜索相关组件
![](http://o7m5xjmtl.bkt.clouddn.com/371C70F0-7770-4A51-93E5-13F27CBD4774.png)

(2) 为搜索按钮注册事件
![](http://o7m5xjmtl.bkt.clouddn.com/3F5E84FE-2CFC-421A-AB7A-DBB0C5001AA3.png)

### 要点
**添加过滤器**
![](http://o7m5xjmtl.bkt.clouddn.com/BAF7A68F-2BE8-4F20-9042-80A9FC1AEAB4.png)

![](http://o7m5xjmtl.bkt.clouddn.com/C9018B73-F6F8-45A2-97A3-F8FBE5AF10B3.png)

**移除过滤器**
![](http://o7m5xjmtl.bkt.clouddn.com/F5348A61-3075-4A5B-BFDB-BB2A0DDD21FE.png)

## 8.2 按部门和姓名组合搜索
### 功能说明

![](http://o7m5xjmtl.bkt.clouddn.com/DAC234F0-7CBE-4712-912D-C9B32E6E006F.png)

### 实现步骤
(1) 组合搜索相关组件
![](http://o7m5xjmtl.bkt.clouddn.com/4DE86FA6-42EC-4102-B81F-00496EB48E1B.png)

(2) 为搜索按钮注册事件
![](http://o7m5xjmtl.bkt.clouddn.com/DAADF364-D518-4723-AC98-FBFB556BDBD6.png)

# 9 数据排序
## 功能说明
点击员工编号区域，触发排序。升序和降序交替进行。
![](http://o7m5xjmtl.bkt.clouddn.com/0C899181-2D4E-4F20-A257-CEFC1EB1DECF.png)

## 实现步骤
(1) 在 `员工编号` 旁边添加一个下三角
(2) 为 `员工编号` 添加热区
(3) 注册事件
`Repeaters > Add Sort`
![](http://o7m5xjmtl.bkt.clouddn.com/67DC980D-206D-42BD-AE86-86E355C3ECD3.png)

![](http://o7m5xjmtl.bkt.clouddn.com/040E6B92-6B19-49B6-B5F3-FCD002C9EE03.png)

# 10 分页 
## 效果
![](http://o7m5xjmtl.bkt.clouddn.com/F5C20456-B48F-4AE4-9117-2104665C7286.png)

## 实现步骤
(1)  设置 `中继器组件` 分页显示
![](http://o7m5xjmtl.bkt.clouddn.com/5F3CC574-8AE2-449E-905D-9A0AA17B6FF6.png)

(2)  创建分页相关按钮，注册相关事件
`Repeaters > Set Current Page`
+ 首页
![](http://o7m5xjmtl.bkt.clouddn.com/FFFE95E5-D8E2-4E06-A0CF-3E96653B039B.png)

* 上一页
![](http://o7m5xjmtl.bkt.clouddn.com/ADCB7B12-860F-49C9-9A25-29DAF3757126.png)

* 下一页
![](http://o7m5xjmtl.bkt.clouddn.com/9529515F-246E-4716-A57E-C73660C3FEE5.png)

* 尾页
![](http://o7m5xjmtl.bkt.clouddn.com/541F4892-0352-438D-9E1B-CD8488F743C8.png)

+ 页码
![](http://o7m5xjmtl.bkt.clouddn.com/FFBB3E68-3A96-4E43-B589-2C87EAC6B885.png)

