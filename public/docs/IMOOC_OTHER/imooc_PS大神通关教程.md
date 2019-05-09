---
title: PS大神通关教程
categories: [慕课网学习笔记]
tag:
    - photoshop
date: 2016-11-09 19:23
---

## 1 ps基础知识
### 1.1 photoshop简介
**扩展：**可以使用`Adobe Bridge`来管理素材和作品。
### 1.2 操作界面与调整
#### 1.2.1 操作界面
![Alt text](http://cdn.mengqingshen.com/imooc/1468047020127.png)

#### 1.2.2 视窗调整
1. 面板和工具栏的打开与关闭
   ![Alt text](http://cdn.mengqingshen.com/imooc/1468047080948.png)

2. 面板和工具栏的位置都可以任意组合、调整、移动

### 1.3 查找与编辑图像
**说明：**打开图片有多种方式
1. 在文件夹中右键通过`ps`打开
2. 在`ps`中通过菜单打开
3. 直接将图片拖进图像视窗

+ 如果图片来自qq等对话框，这种情况下因为图片本身是在临时的文件夹中，所以做后另存为到合适的地方
+ 如果图像视图已经有打开的图片，拖进来的新图片将作为一个新的图层置入。如果想在新的tab中打开，需要拖放到tab区域

### 1.4 点阵图和矢量图
**说明：**`jpg`、`gif`、`psd`都是点阵图。
### 1.5 光与色的基础知识
#### 1.5.1 光线三原色
`红、绿、蓝`
光线的混合是增色的过程，光线越多，颜色越"亮"。

![Alt text](http://cdn.mengqingshen.com/imooc/1468070021784.png)

RGB颜色混合示意图
![Alt text](http://cdn.mengqingshen.com/imooc/1468070454294.png)

**光源色**
太阳、灯泡、烟火等能够发光的物体发出的光线的颜色

**固有色**
物体本身的固有颜色，本质上是物体反射的光的颜色。

#### 1.5.2 颜料三原色
`品红（或成洋红）、黄、青`
颜料的混合是减色的过程，因为颜色越多，反射的颜色就越少，因此就越“暗”。

`C`(青)`M`（品）`Y`（黄）`K`（黑）颜色模式

![Alt text](http://cdn.mengqingshen.com/imooc/1468070649312.png)


### 1.6 颜色混合和数字图像

**RGB（8位颜色）**
每个值的取值范围为`0~255`，可以混合出出`256^3`种颜色。

**16进制数值**

## 2 工具的基础使用
### 2.1 建立新图像文件
![Alt text](http://cdn.mengqingshen.com/imooc/1468072875928.png)

### 2.2 图像的保存
JPEG是流通性最好的格式，单图层、透明度等不支持的信息将不会被保留

### 2.3 图片组织与界面显示
**调整`PS`界面亮度**
`command + F1`：颜色加深
`command + F2`：颜色变浅

**调整画布的底色**
![Alt text](http://cdn.mengqingshen.com/imooc/1468073341584.png)

**调整窗口模式**
![Alt text](http://cdn.mengqingshen.com/imooc/1468073469906.png)

**调整多个 tab 窗口的排列方式**
![Alt text](http://cdn.mengqingshen.com/imooc/1468073538020.png)

### 2.4 图像移动与对齐

#### 2.4.1 图像移动
**移动整体**
注意：如果图层被锁定将不可移动。
![Alt text](http://cdn.mengqingshen.com/imooc/1468121757263.png)

**移动局部：移动工具＋选框工具**
1. 使用选框工具选中局部区域
   ![Alt text](http://cdn.mengqingshen.com/imooc/1468119809901.png)

2. 切换为移动工具，通过方向键移动局部
   ![Alt text](http://cdn.mengqingshen.com/imooc/1468119848222.png)

3. 确认移动到理想位置后，取消选择`command + D`，完成局部图像的位置变动

#### 2.4.2 自动选中图层
**自动选择图层**
![Alt text](http://cdn.mengqingshen.com/imooc/1468122112259.png)
该功能使得当点击相应的图层区域时，该图层会被自动设置为当前编辑的图层；还可以通过框选同时选中多个图层

注意：要框选多个图层，要确保背景为`透明`背景或处在`被锁定`的状态，否则框选操作会变为对背景的移动操作。

#### 2.4.3 变换控件
![Alt text](http://cdn.mengqingshen.com/imooc/1468122518680.png)
会在当前选择的图像元素周围产生`变形工具框`![Alt text](http://cdn.mengqingshen.com/imooc/1468122622961.png)
，可以通过这个框对图像进行`伸缩`操作。

#### 2.4.4 对齐和排列
**用途：**可以用来快速完成表格的制作

![Alt text](http://cdn.mengqingshen.com/imooc/1468123322435.png)

### 2.5 初识选择区
`套索工具`和`选框工具`都有多次选区的计算方式选项：![Alt text](http://cdn.mengqingshen.com/imooc1468123801016.png)

![Alt text](http://cdn.mengqingshen.com/imooc/select-area.gif)

### 2.6 规则选择工具组
**扩散方式**
`alt(option) + 框选`：以开始拖动的位置为中心扩散
`[shift] + 框选`：以开始拖动的位置为左上角开始扩散
`alt(option) + shift + 框选`：以开始拖动的位置为中心，扩散为`正方形`或`正圆`
![Alt text](http://cdn.mengqingshen.com/imooc/1468126702109.png)

**形状**
![Alt text](http://cdn.mengqingshen.com/imooc/1468126520228.png)

**消除锯齿**
![Alt text](http://cdn.mengqingshen.com/imooc/1468126850970.png)

**羽化选区**
弱化选区边缘
![Alt text](http://cdn.mengqingshen.com/imooc/1468127320246.png)


### 2.7 不规则选区的建立
**注意：**使用套索工具药注意两点

+ 选择的区域必须围成一个闭合的区域
+ 围成一个闭合区域后，点击`Enter`才能使之前包围的区域生效并看到预览效果

| 工具      | 用途            | 特点                   |
| ------- | ------------- | -------------------- |
| 套索工具    | 手动构成连接线       | 依赖对鼠标的精确操作，因此最不精确    |
| 多边形套索工具 | 通过构建一系列点，折线连接 | 易操作，建议结合区域放大进行操作，最精确 |
| 磁性套索工具  | 软件自动识别边缘      | 精确度以来图像本身的边缘识别度，效率最高 |

![Alt text](http://cdn.mengqingshen.com/imooc/1468127829208.png)

### 2.8 快速选择工具组
**适用：**适用于要选择的区域的色彩具有极大的相似度的情景，比如选中物体轮廓之外的背景。

**技巧：**和`套索工具`配合可以进一步提高精确度。

![Alt text](http://cdn.mengqingshen.com/imooc/1468135836915.png)
![Alt text](http://cdn.mengqingshen.com/imooc/1468136828281.png)

| 快速选择工具 | 用途                     | 特点                |
| ------ | ---------------------- | ----------------- |
| 快速选择工具 | 智能选中鼠标周围相似的区域          | 这是一个新工具，在较高的版本中才有 |
| 魔棒工具   | 一键选中和鼠标当前所在区域色彩相似的所有区域 | 是一个比较老的工具         |

**对所有图层取样**
勾选了该项，选择的区域会跨所有图层，否则只选择当前选中的图层中的图像

**自动增强**
优化边缘，使更平滑

![Alt text](http://cdn.mengqingshen.com/imooc/1468136451441.png)

### 2.9 选择区的运算
![Alt text](http://cdn.mengqingshen.com/imooc/1468137158907.png)
使用`选框工具`和`套索工具`连续圈住多个区域时，新圈住的选区和已有的选区之间有四种选区运算方式：
1. 新选区：清空原来的选区
2. 添加到选区：将新选区添加到之前的选区
3. 从选区中减去：从原来的选区中减去新选区
4. 与选区交叉：取新旧选区重合的区域

### 2.10 新裁剪工具
**扩展：**黄金分割
[Alt text](http://cdn.mengqingshen.com/imooc/1468137733564.png)

![Alt text](http://cdn.mengqingshen.com/imooc/1468138352987.png)

![Alt text](http://cdn.mengqingshen.com/imooc/1468138938743.png)

`o`：切换辅助线种类
`shift + o`：变换当前辅助线布局的方向

### 2.11 透视裁剪工具
**注意：**该工具只能处理单一图层的图像，多图层必须先将图层合并，或删除多余的图层。
![Alt text](http://cdn.mengqingshen.com/imooc/1468145537384.png)

**裁剪并利用透视原理将图像变形**

![Alt text](http://cdn.mengqingshen.com/imooc/1468157223947.png)
![Alt text](http://cdn.mengqingshen.com/imooc/1468157257468.png)

### 2.12 切片工具组
#### 2.12.1 切片工具
**注意：**被切片的图像保存后是多个图片。
![Alt text](http://cdn.mengqingshen.com/imooc/1468245670680.png)
![Alt text](http://cdn.mengqingshen.com/imooc/1468290923918.png)

**基于参考线的切片**
可以先拖出多个参考线，然后点击`基于参考线的切片`，结合放大可是实现更加精确的切片
#### 2.12.2 切片选择工具
![Alt text](http://cdn.mengqingshen.com/imooc/1468245684622.png)

**切片层次调整**
![Alt text](http://cdn.mengqingshen.com/imooc/1468291220135.png)
切片可以重合，重合的部分可以通过调整层次辅助视觉确认切片区域。

**提升**
![Alt text](http://cdn.mengqingshen.com/imooc/1468292228707.png)

手动切片时，切片后剩余出来的区域默认不是有效的切片区域，左上角图标背景为灰色。使用`切片选择工具`选中改区域后，可以通过`提升`激活该区域为有效切片区域。
![Alt text](http://cdn.mengqingshen.com/imooc/1468292205786.png)

**划分**
![Alt text](http://cdn.mengqingshen.com/imooc/1468292434548.png)

选中某个切片区域后，可以进一步按照一定规则批量划分切片。
![Alt text](http://cdn.mengqingshen.com/imooc/1468292463589.png)

**清除切片**
`视图（菜单）-> 清除切片`

**选中多个切片**
`shift + 点击切片区域`
**排列切片**
可以对块状的多个切片进行排列操作，参考2.4.4
![Alt text](http://cdn.mengqingshen.com/imooc/1468292993802.png)

### 2.13 吸管工具器
![Alt text](http://cdn.mengqingshen.com/imooc/1468335811694.png)
**取样大小**
![Alt text](http://cdn.mengqingshen.com/imooc/1468335848841.png)

+ 取样点：只取取样点的像素的色值
+ 其它：以取样点为中心一定矩形范围内所有像素点色值的平均值

**样本**
![Alt text](http://cdn.mengqingshen.com/imooc/1468336033353.png)
针对多图层取色值的计算规则，其中调整图层指的是
![Alt text](http://cdn.mengqingshen.com/imooc/1468336174015.png)

### 2.14 颜色取样
![Alt text](http://cdn.mengqingshen.com/imooc/1468416010076.png)
**用途：**可以设置多个（最多4个）固定的取样点，当图像发生变化时，可以实时观察到取样点的色值变化。

![Alt text](http://cdn.mengqingshen.com/imooc/1468416269791.png)

### 2.15 标尺工具
**用途：**测量尺寸、角度，调整地平线
![Alt text](http://cdn.mengqingshen.com/imooc/1468417722190.png)

**基本功能**
![Alt text](http://cdn.mengqingshen.com/imooc/1468418579490.png)

**设置标尺单位**
![Alt text](http://cdn.mengqingshen.com/imooc/1468418713983.png)

### 2.16 注释工具
在图像中添加注释，方便多人协作
![Alt text](http://cdn.mengqingshen.com/imooc/1468418822145.png)

**基本用法**
![Alt text](http://cdn.mengqingshen.com/imooc/1468418979883.png)

### 2.17 计数工具
`某些版本的ps并没有计数工具`
帮助数清楚界面中的某些元素的数量
![Alt text](http://cdn.mengqingshen.com/imooc/1468420544495.png)

![Alt text](http://cdn.mengqingshen.com/imooc/1468420611374.png)

### 2.18 污点修复画笔
![Alt text](http://cdn.mengqingshen.com/imooc/1468422406582.png)

![Alt text](http://cdn.mengqingshen.com/imooc/1468422379053.png)


### 2.19 修复画笔

### 2.20 修补工具
**用途：**使用某部分区域的图像修补另外一处区域的图像。
![Alt text](http://cdn.mengqingshen.com/imooc/1468593332202.png)


#### 2.20.1 操作方式
1. 绘制`源`区域
2. 拖动到`目标`区域
   ![Alt text](http://cdn.mengqingshen.com/imooc/pscovertofix.gif)

#### 2.20.2 选项说明
![Alt text](http://cdn.mengqingshen.com/imooc/1468594060214.png)

**修补算法**
![Alt text](http://cdn.mengqingshen.com/imooc/1468594084430.png)

+ 正常：修补后融合效果比较差
+ 内容识别：修补后融合效果比较好

**模式**

+ 源：从`目标`修补`源`
+ 目标：从`源`修补`目标`

### 2.21 内容感知移动工具
**用途：**将一块区域移动或复制到另一块区域，并和环境进行一定程度的融合。
![Alt text](http://cdn.mengqingshen.com/imooc/1468594418315.png)

#### 2.21.1 操作方式
![Alt text](http://cdn.mengqingshen.com/imooc/pssmartmove.gif)

#### 2.21.2 选项说明
![Alt text](http://cdn.mengqingshen.com/imooc/1468595698873.png)

**模式**

+ 移动
+ 扩展（复制）

**适应**：允许ps智能融合的自由度，越松散融合得越好
![Alt text](http://cdn.mengqingshen.com/imooc/1468595756102.png)

### 2.22 红眼工具
**用途：**修复拍照时眼睛的红眼现象。
![Alt text](http://cdn.mengqingshen.com/imooc/1468634318995.png)

#### 2.22.1 操作方式
![Alt text](http://cdn.mengqingshen.com/imooc/psfixredeye.gif)

#### 2.22.2 选项说明
![Alt text](http://cdn.mengqingshen.com/imooc/1468634787938.png)
**瞳孔大小**：瞳孔会比眼睛其他区域更黑，这个值控制修复后的瞳孔区域的大小

**变暗量**：顾名思义，修复后黑的程度

### 2.23 画笔工具
![Alt text](http://cdn.mengqingshen.com/imooc/1468653794723.png)
![Alt text](http://cdn.mengqingshen.com/imooc/1468654299355.png)

**画笔预设选择**
![Alt text](http://cdn.mengqingshen.com/imooc/1468654318725.png)

**模式**
![Alt text](http://cdn.mengqingshen.com/imooc/1468654339255.png)

**使用喷枪效果**：当下用料多少和停留时间成正比
### 2.24 画笔笔尖形状
![Alt text](http://cdn.mengqingshen.com/imooc/1468654652470.png)

![Alt text](http://cdn.mengqingshen.com/imooc/1468654971627.png)

**1. 大小**
![Alt text](http://cdn.mengqingshen.com/imooc/pssetpensize.gif)
**2. 形状**
![Alt text](http://cdn.mengqingshen.com/imooc/pssetpenshape.gif)
**3. 硬度**
![Alt text](http://cdn.mengqingshen.com/imooc/pssetpensolid.gif)
**4. 间距**
![Alt text](http://cdn.mengqingshen.com/imooc/pssetpenmargin.gif)
### 2.25 手绘板与光笔轮、旋转

### 2.26 手绘板的压力倾斜与方位

### 2.27 画笔形状动态
![Alt text](http://cdn.mengqingshen.com/imooc/1468656192496.png)

### 2.28 画笔的散布
![Alt text](http://cdn.mengqingshen.com/imooc/1468656290810.png)

### 2.29 画笔纹理
![Alt text](http://cdn.mengqingshen.com/imooc/1468656360254.png)

### 2.30 双重画笔
**用途：**勾选`双重画笔`后进入第二支画笔的模式，绘制的线条是当前画笔和设置的第二支画笔的交集。
![Alt text](http://cdn.mengqingshen.com/imooc/1468666055693.png)

### 2.31 画笔颜色动态
![Alt text](http://cdn.mengqingshen.com/imooc/1468666328621.png)
**用途**：使绘制图像的颜色会在`前景色`和`背景色`之前随机抖动。

### 2.32 画笔的传递
**用途：**调整油彩或效果的动态建立。

![Alt text](http://cdn.mengqingshen.com/imooc/1468669039209.png)

### 2.33 画笔笔势
**用途：**调整画笔的笔试，勾选的特性会覆盖绘图笔真正的笔势。

**注意：**观察笔势角度的窗口只针对有相应特性的笔出现。
![Alt text](http://cdn.mengqingshen.com/imooc/1468669306279.png)
![Alt text](http://cdn.mengqingshen.com/imooc/pspencialagle.gif)


### 2.34 画笔的其他效果
![Alt text](http://cdn.mengqingshen.com/imooc/1468669763676.png)

+ 杂色：向画笔笔尖添加杂色，画笔硬度越低，效果越明显
+ 湿边：强调画笔描边的边缘
+ 建立：启用喷枪样式的建立效果
+ 平滑：启用鼠标路径平滑处理
+ 保护纹理：应用预设画笔时保留纹理图案，使画笔切换后相关设置仍能保持
### 2.35 铅笔工具
**用途：**相比画笔，铅笔的线条更硬，更清晰。

**技巧：**点击的时候按住`shift`可以自动连接线条。
![Alt text](http://cdn.mengqingshen.com/imooc/1468670118291.png)

### 2.36 颜色替换工具
**用途：**将图像中的特定颜色替换为提取的`目标颜色`
![Alt text](http://cdn.mengqingshen.com/imooc/1468674611537.png)

#### 2.36.1 基本操作
1. `alt + 单击`：提取颜色到前景色
2. 涂抹要改变颜色的区域

#### 2.36.2 选项说明
![Alt text](http://cdn.mengqingshen.com/imooc/1468682688166.png)
**模式**

+ 色相：只替换色相
+ 饱和度：只替换饱和度
+ 颜色：同时替换色相和饱和度
+ 明度：只替换明度

**取样方式**

+ 连续：取样之后，按住鼠标左键涂抹要替换的区域，可以对不同的颜色连续替换为前景色，而不会中断
+ 一次：取样之后，第一个左键点击的区域确定为要替换的颜色，对其它颜色的区域不会替换
+ 背景色板：只对和背景色相同的颜色进行替换

**限制**

+ 不连续：当鼠标左键按下，即便和当前要替换的颜色相同，如果被替换的颜色被隔离在其它区域，也只有当下区域中相同的颜色会被替换
+ 连续：当鼠标按下，画布上所有符合被替换条件的颜色都会被替换
+ 查找边缘：鼠标左键按下后，随着鼠标的移动，符合替换条件但被分隔的颜色区域会一点点被替换
### 2.37 混合器画笔工具
**用途：**模仿用真实原料绘画时，颜料混合、适度、洗毛笔、蘸燃料等过程。
![Alt text](http://cdn.mengqingshen.com/imooc/1468683855494.png)

### 2.38 仿制图章工具
**用途：**用来修复图像，不同于
![Alt text](http://cdn.mengqingshen.com/imooc/1468684986118.png)

#### 2.38.1 基本操作
1. `alt + 鼠标左键单击`，获取修复材料
2. 按住鼠标左键，涂抹要修复的区域
   ![Alt text](http://cdn.mengqingshen.com/imooc/psstampfix.gif)

#### 2.38.2 选项说明
![Alt text](http://cdn.mengqingshen.com/imooc/1468736764369.png)

### 2.39 图案图章工具
**用途：**使用预设的图片修复图像
![Alt text](http://cdn.mengqingshen.com/imooc/1468736916061.png)

![Alt text](http://cdn.mengqingshen.com/imooc/1468737263876.png)

### 2.40 历史记录画笔工具
**用途：**在`画笔工具`的基础上，增加了历史记录（类似版本管理）功能，可以非常方便得将图像的局部恢复为某次历史纪录下的效果。
![Alt text](http://cdn.mengqingshen.com/imooc/1468737433922.png)

#### 2.40.1 基本操作
**局部恢复到某个历史记录**
1. 打开历史纪录面板：`窗口 -> 历史记录`
2. 在`历史记录面板`选中目标历史处
3. 设置及时记录画笔的源：勾选前面的复选框![Alt text](http://cdn.mengqingshen.com/imooc/1468738732946.png)
4. 按住鼠标左键，涂抹要恢复的区域
### 2.41 历史记录艺术画笔
**用途：**可以将图像的细节艺术化，并具备历史记录的能力。
![Alt text](http://cdn.mengqingshen.com/imooc/1468739398664.png)

### 2.42 橡皮擦工具
![Alt text](http://cdn.mengqingshen.com/imooc/1468739560455.png)

**用途：**将图层上的图像擦除

+ 如果设置了历史纪录画笔的源，并勾选了![Alt text](http://cdn.mengqingshen.com/imooc/1468739661411.png)
  ，则擦除操作会将被擦除的部分恢复到指定历史版本

+ 否则被擦除的部分将漏出背景
### 2.43 背景橡皮擦工具
![Alt text](http://cdn.mengqingshen.com/imooc/1468748822200.png)
**用途：**快速去除背景（置透明）
#### 2.43.1 基本用法
![Alt text](http://cdn.mengqingshen.com/imooc/psbgerarse.gif)

#### 2.43.2 选项说明
**保护前景色**
勾选该向后，就不会抹除和前景色板颜色相同的颜色

**取样方式**

+ 连续：鼠标会实时得获取笔头中心处的颜色，进行相关色彩的擦除。适用于图像中有一些渐变色
+ 一次：只在第一下抹去背景时获取要清除的颜色。适用于要擦除的色彩是非常单纯的，没有阴影等渐变的情况
+ 背景色板：适用于图像中腰擦除的部分和其它部分差别比较大，要擦除的色彩非常单纯，边缘非常清晰的场景

### 2.44 魔术橡皮擦工具
**用途：**`魔术棒工具`和`橡皮擦`的结合体，一键清除某些颜色
![Alt text](http://cdn.mengqingshen.com/imooc/1468768298473.png)

### 2.45 渐变工具
**用途：**快速构建渐变色彩

**注意：**如果通过`选框工具`或`套索工具`选中了一片区域，则通过穿过该区域的`渐变线`形成的渐变色彩将被约束在该区域内部
![Alt text](http://cdn.mengqingshen.com/imooc/1468853391535.png)

#### 2.45.1 基本操作
1. 拖一条`渐变线`
2. 根据`选项`在当前区域中生成渐变图像（如果没有框选区域，则当前区域为整个画布）

**渐变线**：起点、终点、角度、长度都会对声称的图像有影响。
![Alt text](http://cdn.mengqingshen.com/imooc/psgradient.gif)

#### 2.45.2 选项说明
![Alt text](http://cdn.mengqingshen.com/imooc/1468939575483.png)
![Alt text](http://cdn.mengqingshen.com/imooc/1468939654486.png)

### 2.46 渐变编辑器
![Alt text](http://cdn.mengqingshen.com/imooc/1468940124636.png)

### 2.47 油漆桶工具
**用途：**可以理解为`魔棒工具`和`油漆桶工具`的组合体
![Alt text](http://cdn.mengqingshen.com/imooc/1469027438135.png)
#### 2.47.1 基本操作
**设置填充区域的源**

+ 前景：这时，可以通过设置![Alt text](http://cdn.mengqingshen.com/imooc/1469027568318.png)改变填充区域的源，鼠标左键点击某一点后，则和被点击处颜色相近（相近范围通过`容差控制`）的区域都会被选择的源填充
+ 图案：和被点击处相近的颜色被图案填充

![Alt text](http://cdn.mengqingshen.com/imooc/1469027817067.png)

### 2.48 模糊与锐化工具
![Alt text](http://cdn.mengqingshen.com/imooc/1469028022754.png)

**技巧：**模糊或锐化的效果实际上是在当前选择的图层上绘制图像，如果选择了![Alt text](http://cdn.mengqingshen.com/imooc/1469028346499.png)
，且当前图层是一个新图层，则可以很方便得获取一个分离出来的模糊或锐化图层。
#### 2.48.1 模糊工具
**用途：**模糊化局部图像的细节

#### 2.48.2 锐化工具
**用途：**锐化图像的细节，是一个比较古老的工具，不太常用。
![Alt text](http://cdn.mengqingshen.com/imooc/1469028153126.png)

**保护细节**
可以使锐化效果更好，防止彩色早点的产生

### 2.49 涂抹工具
![Alt text](http://cdn.mengqingshen.com/imooc/1469028456334.png)

**用途：**相当于`混合器画笔工具`的简化版。使用该工具时，相当于在一幅原料未干的画布上涂抹

![Alt text](http://cdn.mengqingshen.com/imooc/1469028676557.png)

**手指绘画**
勾选![Alt text](http://cdn.mengqingshen.com/imooc/1469028688895.png)
就相当于用手指头蘸着`前景色`在画布上涂抹，起笔处会有蘸的`前景色`
![Alt text](http://cdn.mengqingshen.com/imooc/1469028853915.png)

**强度**

+ 勾选了`手指绘画`：相当于手指蘸的颜料的多少
+ 没有勾选`手指绘画`：相当于画布潮湿的程度
### 2.50 加深和减淡工具
**用途：**将局部图像色调加深或减淡
![Alt text](http://cdn.mengqingshen.com/imooc/1469029442802.png)

### 2.51 海绵工具
**用途：**增加或降低局部图像的饱和度

![Alt text](http://cdn.mengqingshen.com/imooc/1469112726916.png)

![Alt text](http://cdn.mengqingshen.com/imooc/1469113644690.png)

### 2.52 初识路径
**用途：**可以更加自由方便地勾勒具有矢量性质的图形。

#### 2.52.1 基本概念
**路径面板**
`窗口->路径`

**工作路径**
使用`钢笔工具`连续勾勒出的图形。

#### 2.52.2 基本使用
**使用画笔描边路径**
会自动使用`画笔工具`的设置沿着路径绘制。

### 2.53 钢笔工具组
钢笔工具和其它辅助工具
![Alt text](http://cdn.mengqingshen.com/imooc/1469442417105.png)

#### 2.53.1 钢笔工具
##### 2.53.1.1 锚点和片段
创建不带控制杆的锚点：鼠标左键单击
创建带控制杆的锚点：鼠标按住左键＋拖动
![Alt text](http://cdn.mengqingshen.com/imooc/1469444324734.png)
![Alt text](http://cdn.mengqingshen.com/imooc/1469445246468.png)


**箭头状态**
*在片段中添加锚点*
![Alt text](http://cdn.mengqingshen.com/imooc/1469444810169.png)

*删除锚点*
![Alt text](http://cdn.mengqingshen.com/imooc/1469444968665.png)

*闭合路径*
![Alt text](http://cdn.mengqingshen.com/imooc/1469445050273.png)

##### 2.53.1.2 配合快捷键
按住`command`：临时切换为`直接选择工具`
按住`alt`：临时切换为`转换点工具`
#### 2.53.2 直接选择工具
**直接选择工具**

+ 选中锚点：单击将锚点转变为被选中状态
+ 移动锚点位置：按住鼠标左键拖动
+ 改变片段形状和位置：按住鼠标左键拖动
+ 调整锚点的滑杆：按住鼠标左键拖动
  ![Alt text](http://cdn.mengqingshen.com/imooc/1469445513463.png)

#### 2.53.3 转换点工具
**用途：**转换锚点的类型

+ 点击带控制杆的锚点，可以将其转换为带拐角的锚点
+ 拖动带拐点的锚点，可以将其转换为带控制杆的锚点
+ 拖动带控制杆的锚点的控制杆一端，可以产生曲线拐点
+ 拖动片段改变其形态（类似`直接选择工具`）
  ![Alt text](http://cdn.mengqingshen.com/imooc/1469446056075.png)

#### 2.53.3 删除锚点工具
**用途：**可以更加专注得删除锚点，相比使用`钢笔工具`，效率更高。

#### 2.53.4 自由钢笔工具
**用途：**完全通过手动创建工作路径。

#### 2.53.5 路径选择工具
**用途：**选中整个路径
按住`alt`＋拖动路径：复制当前工作路径
### 2.54 规则形状路径
**用途：**通过`钢笔工具组`建立的是不规则的路径，相对的，通下面这些工具可以建立相对规则的路径。
![Alt text](http://cdn.mengqingshen.com/imooc/1469453471520.png)

**扩散方式**
类似`规则选择工具组`
`alt(option) + 框选`：以开始拖动的位置为中心扩散
`[shift] + 框选`：以开始拖动的位置为左上角开始扩散
`alt(option) + shift + 框选`：以开始拖动的位置为中心，扩散为`正方形`或`正圆`等

### 2.55 路径的运算与排列
**路径缩略图**

+ 白色区域：路径内部区域
+ 灰色区域：路径外部区域

**路径面板设置**
设置`路径面板`中显示的工作路径缩略图大小
![Alt text](http://cdn.mengqingshen.com/imooc/1469635953410.png)
![Alt text](http://cdn.mengqingshen.com/imooc/1469636624244.png)

#### 2.55.1 路径运算（路径操作）
![Alt text](http://cdn.mengqingshen.com/imooc/1469636916024.png)
**使用方式**
1. 选择`路径操作方式`
2. 合并形状组件
   ![Alt text](http://cdn.mengqingshen.com/imooc/1469637258924.png)


**路径操作方式**

+ 合并形状：与当前`工作路径`取`并`
  ![Alt text](http://cdn.mengqingshen.com/imooc/1469637477492.png) >>>![Alt text](http://cdn.mengqingshen.com/imooc/1469637394415.png)

+ 减去顶层图形：减去和最顶层工作路径相交的部分
  ![Alt text](http://cdn.mengqingshen.com/imooc/1469637540038.png)>>>![Alt text](http://cdn.mengqingshen.com/imooc/1469637563068.png)

+ 与形状区域相交：与当前`工作路径`的`交`
  ![Alt text](http://cdn.mengqingshen.com/imooc/1469637591447.png)>>>![Alt text](http://cdn.mengqingshen.com/imooc/1469637609630.png)

+ 排除重叠区域：与当前`工作路径`的`补`
  ![Alt text|100x70](http://cdn.mengqingshen.com/imooc/1469637740155.png)>>>![Alt text|80x80](http://cdn.mengqingshen.com/imooc/1469637910752.png)

#### 2.55.2 路径排列
![Alt text](http://cdn.mengqingshen.com/imooc/1469638652245.png)

`alt+command+按住鼠标左键拖动`：复制路径
`command+鼠标左键单击路径区域`：选中路径
`command+按住鼠标左键框选`：选中一个或多个工作路径

**使用方式**
1. 选中路径
2. 特定排列操作

#### 2.55.3 路径对齐方式
![Alt text](http://cdn.mengqingshen.com/imooc/1469639012264.png)

**使用方式**
1. 框选多个工作路径
2. 特定对齐操作

#### 2.55.4 对齐边缘
**用途：**针对`形状`模式下的选项。针对`形状`，`cs6`会尽可能使形状边缘对齐像素边缘，但一些不规则的形状仍然不够理想，这时如果勾选![Alt text](http://cdn.mengqingshen.com/imooc/1469639536882.png)
，则形状会进一步对齐像素边缘，尽可能减少边缘模糊的情况。
![Alt text](http://cdn.mengqingshen.com/imooc/1469639144359.png)
**显示像素网格**：视图->显示->像素网格

*非对齐边缘*
![Alt text](http://cdn.mengqingshen.com/imooc/1469639756099.png)

*对齐边缘*
![Alt text](http://cdn.mengqingshen.com/imooc/1469639802316.png)

### 2.56 自定形状工具
![Alt text](http://cdn.mengqingshen.com/imooc/1469675425922.png)

#### 2.56.1 基础
**要点**
![Alt text](http://cdn.mengqingshen.com/imooc/1469675528055.png)

扩展方式：![Alt text](http://cdn.mengqingshen.com/imooc/1469675565682.png)
选择预设形状：![Alt text](http://cdn.mengqingshen.com/imooc/1469675681348.png)

#### 2.56.2 添加自定义形状到预设
1. 使用`钢笔工具组`等做好新的形状
   ![Alt text](http://cdn.mengqingshen.com/imooc/1469676683267.png)
2. 选中目标工作路径
3. 编辑->定义自定形状...
4. 完成
   ![Alt text](http://cdn.mengqingshen.com/imooc/1469793432646.png)

### 2.57 约束路径拖动
**说明：**`直接选择工具`的一个选项，勾选该选项则拖动`片段`不会导致相邻`片段`和两边的`锚点`的移动
![Alt text](http://cdn.mengqingshen.com/imooc/1469799493142.png)

*不约束路径拖动*
![Alt text](http://cdn.mengqingshen.com/imooc/papathwithcontain.gif)

*约束路径拖动*
![Alt text](http://cdn.mengqingshen.com/imooc/papathwithoutcontain.gif)


### 2.58 路径实例
**说明：**以苹果主体为例

**注意：**如果要连同叶子部分一起绘制，工作区域就会有多个闭合的工作路径存在，这时候最好分开绘制，最后通过`剪切`的方式组合在一起

**方式一（适合老手）：**使用`钢笔工具`直接勾画
![Alt text|200x200](http://cdn.mengqingshen.com/imooc/psdrawpathexample1.gif)

**方式二（适合初学者）：**先添加好所需要的锚点，然后使用`转换点工具`和`直接选择工具`调整
![Alt text|200x200](http://cdn.mengqingshen.com/imooc/psdrawpathexample2.gif)

**方式三：**先使用`规则路径工具组`（切换为![Alt text](http://cdn.mengqingshen.com/imooc/1470008594989.png)模式）获取相似形状，再通过`钢笔工具`修改得到
![Alt text|200x200](http://cdn.mengqingshen.com/imooc/psdrawpathexample3.gif)

**方式四（适合对称形状）：**先通过`椭圆工具`构建合适的椭圆，然后通过`钢笔工具`修改适配一半区域，再`镜像复制`（`ctrl+t`进入变形模式后，将宽度设置为-100%实现左右镜像）得到另一半，最后调整
![Alt text|200x200](http://cdn.mengqingshen.com/imooc/psdrawpathexample4.gif)

### 2.59 段落的设置
`窗口->段落`
![Alt text](http://cdn.mengqingshen.com/imooc/1470639912473.png)


**段头尾法则设置：**`JIS严格`比`JIS宽松`处理的特殊字符更多
![Alt text|500x400](http://cdn.mengqingshen.com/imooc/1470015150754.png)

**间距组合设置**

+ 间距组合1：标点全部使用半角
+ 间距组合2：除行尾的标点外，其它标点都使用全角
+ 间距组合3：大多数字符（包括最后一个字符）使用全角
+ 间距组合4：所有字符都使用全角间距

### 2.60 路径与文字结合设
#### 2.60.1 沿路径写字

1. **创建路径**：使用`路径工具组`创建路径

2. **在路径上编辑文字**：切换到![Alt text](http://cdn.mengqingshen.com/imooc/1473951227631.png)，此时鼠标悬浮在路径上时会变这样
   ![Alt text](http://cdn.mengqingshen.com/imooc/pathtext1.gif)

3. **观察文字的路径**：点击路径，开始编辑文字，会发现ps自动创建了一个和之前创建的路径一样的路径来存放文字
   ![Alt text](http://cdn.mengqingshen.com/imooc/1473993522069.png)
4. **设置文字**：双击图层中的![Alt text](http://cdn.mengqingshen.com/imooc/1473993155403.png)，选中上面编辑的文字

+ 通过工具栏中的![Alt text](http://cdn.mengqingshen.com/imooc/1473993231383.png)切换文字的走向
+ 通过字符面板设置文字![Alt text](http://cdn.mengqingshen.com/imooc/1473993733240.png)

5. **改变文字的起点或终点**：切换为![Alt text](http://cdn.mengqingshen.com/imooc/1473993553342.png)，鼠标悬浮到路径上，变为![Alt text|20x20](http://cdn.mengqingshen.com/imooc/1473994176551.png)这种样子时代表可以移动

+ 限制文字显示的范围![Alt text](http://cdn.mengqingshen.com/imooc/pathtext2.gif)

+ 调换起点和终点![Alt text](http://cdn.mengqingshen.com/imooc/pathtext3.gif)

#### 2.60.2 将文字约束在路径区域内
**说明：**将文本约束在建立的平面形状之中
1. **创建路径1**：切换到`规则路径工具组`![Alt text](http://cdn.mengqingshen.com/imooc/1473994832167.png)，先后创建一个矩形路径
2. **创建路径2**：切换到`不规则路径工具组`![Alt text](http://cdn.mengqingshen.com/imooc/1473994966172.png)

+ 设置好运算模式![Alt text](http://cdn.mengqingshen.com/imooc/1473995040771.png)
+ 创建新路径![Alt text|100x100](http://cdn.mengqingshen.com/imooc/1473996019006.png)


3. **选中两个路径**：切换到`路径选择工具`![Alt text](http://cdn.mengqingshen.com/imooc/1473995176934.png)，框选需要合并运算的路径


4. **进行合并运算**
   ![Alt text](http://cdn.mengqingshen.com/imooc/1473995507471.png)![Alt text|200x200](http://cdn.mengqingshen.com/imooc/1473996044713.png)

5. **粘贴文字**：切换为![Alt text](http://cdn.mengqingshen.com/imooc/1473996145430.png)，点击上面制作的路径区域，粘贴文本即可
   ![Alt text|200x200](http://cdn.mengqingshen.com/imooc/1473996204856.png)


### 2.61 路径实例－表盘
**说明：**尽可能完成的记录制作一个 `psd`作品的过程。

#### 2.61.1 文件的创建
（1）**创建文件**：文件->新建
![Alt text](http://cdn.mengqingshen.com/imooc/1474027650319.png)

（2）**设置单位和标尺**：Photoshop->首选项->单位与标尺
![Alt text](http://cdn.mengqingshen.com/imooc/1474027895232.png)

（3）**设置参考线、网格和切片**：Photoshop->首选项->参考线、网格和切片
![Alt text](http://cdn.mengqingshen.com/imooc/1474029596894.png)

（4）**显示额外内容**

+ 视图->显示额外内容
+ 视图->显示->网格
+ 视图->显示->标尺
+ 视图->显示->对齐到->(参考线，网格)

#### 2.61.2 制作钟表小时形状零件
**说明：**切换为`矩形工具`![Alt text](http://cdn.mengqingshen.com/imooc/1474029728658.png)，工具栏选择![Alt text](http://cdn.mengqingshen.com/imooc/1474029902648.png)
1. 框选一个矩形区域
   ![Alt text](http://cdn.mengqingshen.com/imooc/1474029983309.png)

2. 设置`路径运算方式`
   ![Alt text](http://cdn.mengqingshen.com/imooc/1474029946347.png)

3. 创建一个新的矩形
   ![Alt text](http://cdn.mengqingshen.com/imooc/1474030399812.png)

4. `alt+command+拖拽`复制一个
   ![Alt text](http://cdn.mengqingshen.com/imooc/1474030576117.png)

5. `command+框选路径`，然后执行合并运算
   ![Alt text](http://cdn.mengqingshen.com/imooc/1474030677282.png)

#### 2.61.3 缩小
| 快捷键         | 说明             |
| ----------- | -------------- |
| `command+t` | 使选中的图层进入自由变换模式 |

**说明：**利用变形、复制、旋转完成零件布局

1. 选中前面做的钟表的小时零件，`command + t` 进入可伸缩模式
2. 按住 `alt` ，从四周向中心缩小（不好操作的话，放大视图，继续缩小）
3. `command + 1`，将视图恢复到100%

#### 2.61.4 移动&复制
**说明：**复制出另外11个零件，并以表盘中心为圆心均匀分布
| 快捷键                         | 说明            |
| --------------------------- | ------------- |
| `shift + command +t`        | 重复上次变换        |
| `shift + command + alt + t` | 重复上次变换的同时进行复制 |

1.  切换到`移动工具`![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-27 下午10.45.04.png)，取消`自动选择图层`![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-27 下午10.46.18.png)
2.  选中小零件，按住 `shift` ，向上垂直移动到合适的位置
3.  `command + t` 进入自由变换模式，按住 `alt` ，点击设置旋转中心
4.  设置旋转角度
    ![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-27 下午11.01.48.png)

5.  `回车`确定旋转值，再次 `回车` 确定应用变换
6.  不断`shift +command + alt + t` ，旋转复制出另外11个零件
    ![Alt text](http://cdn.mengqingshen.com/imooc/copyrotate11.gif)

#### 2.61.5 制作圆盘的刻度
1. 建立一个新的图层
2. 切换到 `规则路径工具组` 的 `直线工具`，设置为 `形状`![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-27 下午11.26.40.png)
   ，绘制第一条竖线线
3. 切换到 `移动工具`，可以通过键盘的 `上下左右` 键精细调整其位置
4. 在路径面板中选中这个路径，`ctrl + t` 进入自由变换模式
5. 按住 `alt` 单击设置旋转中心，将旋转角度设置为 6
6. `shift + command + alt +t` 复制一圈出来
   ![Alt text|200x200](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-27 下午11.34.10.png)

7. 复制这个刻度图形所在的图层
   ![Alt text](http://cdn.mengqingshen.com/imooc/layercopy.gif)

8. 对这个复制出来的图层中的形状进行旋转复制，加快绘制其余刻度的速度
   ![Alt text](http://cdn.mengqingshen.com/imooc/copyshape.gif)

选中两个图层，`command + e` 合并
![Alt text](http://cdn.mengqingshen.com/imooc/hebinglayer.gif)


9. 对刻度进行修剪：切换为 `规则路径工具组` 的 `椭圆工具`，设置为![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-27 下午11.46.42.png)

10. 按住 `shift + alt`，以中心为准建立一个圆路径
  ![Alt text](http://cdn.mengqingshen.com/imooc/drawpathtocut.gif)

11. 切换为`路径选择工具`，选中新创建的路径，设置为`减去顶层形状`，然后去到路径面板，`command + x`剪切掉，最后选中之前的表盘路径，`command + v`粘贴上去
   ![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-28 上午12.04.21.png)
   ![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-28 上午12.01.35.png)

12. 切换到 `直接选择工具`，设置运算方式为
   ![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-28 上午12.05.51.png)

13. 进行合并运算
   ![Alt text|200x200](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-28 上午1.50.16.png)


### 2.62 视图移动旋转与缩放
**说明：** 相关的工具有3个，分别是 `抓手工具` 、`旋转视图工具`、`缩放工具` ，它们是作图的辅助工具

#### 2.62.1 抓手工具
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-02 上午12.50.34.png)


**用途：** 用来移动画布。

**扩展：** 配合 `导航器`（窗口 > 导航器）使用更佳。
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-10-29 上午11.59.26.png)

**选项栏**
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-02 上午12.26.33.png)
(1)  滚动所有窗口
![Alt text](http://cdn.mengqingshen.com/imooc/grapandmove.gif)

(2) 实际像素
画布像素和显示器像素1:1显示，计算机不会对图像进行插值运算。此时的图像显示效果是最好的。

(3) 适应屏幕
画布会适应 ps 窗口大小进行缩放，直到宽或高有一个和窗口大小相同，并保证能看到整个图像。

(4) 填充屏幕
画布会根据 ps 窗口大小进行缩放，直到

(5) 打印尺寸
将画布以打印分辨率显示，模拟印刷品的大小。

#### 2.62.2 旋转工具
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-02 上午12.50.43.png)
**选项栏**
一目了然
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-02 上午12.49.49.png)

#### 2.62.3 放缩工具
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-02 上午12.50.53.png)
**选项栏**
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-02 上午1.30.09.png)

(1) 决定鼠标`单击` 画布是 `放大` 还是`缩小`
(2) 如果画布在小窗中显示，可以
(3) 决定是否缩放操作同时影响所有窗口
(4) 决定能否用 `按住鼠标左键` 左右拖动来进行放大或缩小（当不勾选该项时还可以通过鼠标框选的方式进行放大）

### 2.63 颜色的调配
设置 `前景色`(或 `背景色`) 的颜色有下面几种方式

+ 在 `色板` 窗口中点击预定义的颜色
+ 在 `颜色` 窗口中通过 R、G、B 三原色调配 
+ 在 `拾色器` 中更精细地调配颜色

#### 2.63.1 色板窗口
**打开色板窗口：** `窗口 > 色板`
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-03 下午11.31.08.png)


#### 2.63.2 颜色窗口
**打开颜色窗口：** `窗口 > 颜色`
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-03 下午11.31.14.png)

#### 2.63.3 拾色器
**打开拾色器：**单击![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-03 下午11.44.24.png)
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-03 下午11.49.52.png)


### 2.64 三种屏显模式
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-04 上午12.00.42.png)

## 3 图层基础和操作技巧
### 3.1 初识图层

+ 便于对图像中各个元素的管理
+ 操作中可以修复图层的副本，而不用担心修改坏原始图层无法恢复的情况

### 3.2 图层的新建、复制与删除
#### 新建
**方式1: 创建一个全新的空图层**
注意：如果在全新的空图层中使用 `文字工具`，则自动变为一个文字图层！

![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午2.10.35.png)
**方式2: 基于框选的局部区域，创建一个新图层**
（1） 切换到 `框选工具`，在图像上框选
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午2.14.46.png)

（2） `command + j`

#### 复制
**方式1：在图层面板中将图层拖到 `新建图层`**
![Alt text](http://cdn.mengqingshen.com/imooc/layercopy1.gif)

**方式2：选中图层，鼠标右键菜单中选择 `复制图层...`**

**方式3: 选中图层， `command + j`**


#### 删除
**方式1: 选中图层，`delete`**

**方式2: 选中图层，拖放到 `删除图层`**
![Alt text](http://cdn.mengqingshen.com/imooc/layerdelete.gif)

#### 解锁图层
![Alt text](http://cdn.mengqingshen.com/imooc/layerunlock.gif)

#### 清除图层样式
![Alt text](http://cdn.mengqingshen.com/imooc/layerstyledelete.gif)

#### 合并图层
`shift + command + alt + e`： 合并所有可见图层为一个新图层（会新创建一个图层）


### 3.3 选择复制与链接图层
#### 移动与快速复制
（1）选中图层（单个或多个）
（2）切换为 `移动工具`![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午3.40.47.png)
（3）按住鼠标左键 + 拖动（如果同时按住 `alt`，则会创建一个副本并移动它）

#### 图层的快速选择
**说明：**可以同时选中多个图层，对其进行移动等操作。

**注意：**如果切换到 `移动工具` 的时候，没有勾选![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午4.04.07.png)，则 `框选操作` 会变成当前已经选中的图层的 `移动操作`！

**方式1: 在图像中框选**
（1）将背景图层锁定
（2）切换到 `移动工具`，在选项栏中去掉![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午4.04.07.png)
（3）在图像中框选

**方式2: 在图层面板中选择**

+ 单击选中
+ 可以使用 `shift` 或 `command` 快捷键连续选择

#### 链接技巧 
**用途：**如果多个图层经常需要进行一起操作，则可以将多个图层链接到一起。

**建立链接**
（1）选中需要链接的图层
（2）单击 `链接图层`
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午4.14.34.png)

**取消链接**
（1）选中需要取消链接的图层（可以只取消部分图层的链接）
（2）单击 `链接图层`

**图层 > 取消链接图层： 取消所有图层的链接**

**图层 > 选择链接图层： 选择所有链接的图层**

### 3.4 图层的锁定
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午6.34.13.png)
**用途：**在某些方面锁定图层，可以防止误操作。

+ `锁定透明像素`：无论对图层做什么样的修改，图层中透明的像素将保持透明
+ `锁定图像像素`：无论对图层做什么样的修改，非透明的像素将保持不变
+ `锁定位置`：图层将无法被移动
+ `锁定全部`：无法对图层进行任何改变

#### 场景应用
**使用前景色填充图层**
（1）选中图层
（2）`alt + delete`（如果该图层被 `锁定透明像素`，则透明像素部分不会被填充）

### 3.5 图层组
**说明：**  `图层组` 和 `图层` 的关系就类似 `文件夹` 与 `文件`，不同点在于， `photoshop` 可以像处理 `图层` 一样处理 `图层组`(相当于处理 `图层组` 下的每个 `图层`)，比如

+ 应用 `图层样式`；
+ 添加蒙版；
+ 应用滤镜类型；
+ 设置不透明度；
+ 复制副本；
+ 删除；
+ 等。

**注意：**不是所有对 `图层` 的操作都有对应的对 `图层组` 的操作，比如 `滤镜` 就会有一些限制！

![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午8.57.37.png)

### 3.6 图层蒙版
**说明：** 每个图层都可以创建一个或多个 `蒙版`

**蒙版：**和 `图层` 类似，`蒙版`也可以被涂抹和修改。可以这样理解 `蒙版` 对 `图层` 的影响，它会一对一的过滤相应的 `图层` 的每个像素，`蒙版` 越 `黑` 的地方，`图层` 对应的部分就越 `不可见（透明）`，`蒙版` 越白的地方，`图层` 对应的部分就越 `可见（不透明）`。

**注意：** 无论取什么颜色，蒙版的每个像素的颜色只会介于 `#ffffff` 和 `#000000` 之间！

#### 添加蒙版
（1）选中 `图层`（或 `组`）
（2）点击 `添加蒙版`

#### 编辑蒙版
（1）单击选中蒙版
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午9.35.00.png)
（2）然后，在图像上涂抹或擦除就是针对 `蒙版` 而不是图层

#### 删除蒙版
（1）单击选中蒙版
（2）`delete`（或拖到![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-06 下午9.38.39.png)中）

### 3.7 斜面与浮雕
**效果：**给图片增加高光的效果，是图像更有质感。
`可以说是 ps 的图层样式中最复杂的，不太好做笔记，笔记就先略过，需要的时候直接看视频吧！`

### 3.8 描边样式
**说明：** 为图层中非透明的图像边缘建立 `描边`。
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-07 下午9.47.02.png)

#### 3.8.1 选项
**大小：** 描边的粗细。

**填充类型**

+ 颜色
+ 渐变
+ 图案

**位置**

+ 外部
+ 居中
+ 内部

#### 3.8.2 示例
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-07 下午9.50.36.png)

### 3.9 内阴影样式
**效果描述：** 给予平面的图像以镂空的特性，`内阴影` 就是模拟光线照射到镂空结构上时投射在内部时的投影。

**技巧：** `角度` 和 `距离` 也可以直接在图像上通过鼠标拖动调整。

![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-07 下午10.24.51.png)

### 3.10 内发光样式
#### 3.10.1 预处理
**说明：** 为了说明又一个能演示 `内发光` 样式的图像，先对之前的图像进行处理（用前景色填充所有非透明像素）。
（1）设置前景色
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-07 下午11.10.09.png)

（2）选中图层，锁定透明像素
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-07 下午11.10.27.png)

（3）`alt + delete`
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-07 下午11.10.47.png)

![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-07 下午11.16.05.png)

### 3.10.2 光泽样式
**效果描述：** 使图像模拟出光泽的效果。
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 上午9.07.49.png)

### 3.12 三种叠加样式
**效果描述：** 将 `纯色` 、`渐变色` 或 `图案` 叠加到图层，可以设置不透明度。通过混合模式可以实现更丰富的混合效果。
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 上午9.42.08.png)

****
#### 颜色叠加
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 上午9.43.26.png)

****
#### 渐变叠加
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 上午9.44.54.png)

****
#### 图案叠加
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 上午9.45.33.png)


### 3.13 外发光样式
**说明：** 和 `内发光` 选项非常接近。
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 上午9.47.57.png)

### 3.14 投影样式
**效果描述：** 为非透明像素制造 `影子` 的效果，增强立体感。
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 上午11.15.58.png)

### 3.15 建立填充层
**说明：** 其实这个 `填充层` 就是一个带有 `蒙版` 的 `新图层`。
#### 建立填充层并用路径约束图层

****
**方式1（带蒙版）**
（1）在 `图层面板` 中 点击 `创建新的填充或调整图层`
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 下午9.36.12.png)
（2）选择一种填充类型
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 下午9.43.40.png)
（3）对填充层进行进一步处理
（4）切换到 `规则路径工具组` 或 `不规则路径工具组`，在填充层中创建路径
（5）`图层 > 矢量蒙板 > 当前路径`
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 下午10.45.07.png) -> ![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 下午10.45.20.png)

****
**方式2（不带蒙版）**
*如果需要蒙版可以在事后给图层手动添加！*
（1）切换到 `规则路径工具组` 或 `不规则路径工具组`，创建路径
（2）在`路径`所在的 `图层` 面板中，点击 `创建新的填充（或调整图层）`
（3）选择一种填充类型填充 `路径`


### 3.16 色彩调整层基础知识
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 下午11.49.31.png)
**说明：** 会创建一个专门过滤图像的新图层

+ 如果是在 `框选指定区域` 之后创建的，会自动带一个 不可调整的`蒙版`
+ 如果是在 `创建路径` 之后之后创建的，会自动带一个 可调整的`蒙版`（矢量蒙板）

**优点：**使用 `蒙版`、`矢量蒙板` 约束调整的位置、形状和大小，是一种无损的图层色彩调整方法。

**调整指定区域的色彩曲线**
（1）切换为 `框选工具` ，框选一个需要调整色彩的区域
（2）在 `图层面板` 中 点击 `创建新的填充或调整图层`
（3）点击 `曲线..`
（4）在 `曲线` 面板中通过拖动曲线调整框选区域的色彩
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-08 下午11.57.34.png)

**调整路径区域的色彩曲线**
（1）切换为 `规则路径工具组` 或 `不规则路径工具组`，创建路径
（2）在 `图层面板` 中 点击 `创建新的填充或调整图层`
（3）点击 `曲线..`
（4）在 `曲线` 面板中通过拖动曲线调整框选区域的色彩
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-09 上午10.24.33.png)
（5）切换为 `路径选择工具`，调整路径形状
![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-09 上午10.25.55.png)

### 3.17 亮度对比度调整
**说明：** `色彩调整` 的一种，用法和上面介绍的色彩调整一样。

![Alt text](http://cdn.mengqingshen.com/imooc/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-11-09%20%E4%B8%8A%E5%8D%8810.31.14.png)

![Alt text](http://cdn.mengqingshen.com/imooc/屏幕快照 2016-11-09 上午10.35.29.png)


