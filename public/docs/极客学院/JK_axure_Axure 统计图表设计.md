---
title: Axure 统计图表设计
categories:
  - Axure 从入门到精通
tag:
  - Axure
toc: true
---

[视频地址](http://www.jikexueyuan.com/course/2214.html)
[HighCharts](http://www.highcharts.com/)
[Echarts](http://echarts.baidu.com/)
> 在设计原型的过程中，经常会涉及到统计图表的设计，会根据不同的场合不同的数据形式，我们会使用不同的形状的图表，有饼状图、柱状图、折线图等等不同形状的图表，设计图表前，我们需要知道每种图表应该使用的场合以及如何快速的设计出想要的图表。   

# 1 统计图表应用场合介绍
以 `HighChart` 提供的统计图表为例，分析统计图表的类型和用途。

## 线性统计图表
![](http://o7m5xjmtl.bkt.clouddn.com/A373BF80-4592-4E5E-B8F9-3B1A49B2FAD8.png)
![](http://o7m5xjmtl.bkt.clouddn.com/F27CA07F-586E-440C-AA71-AAD5AB2309F9.png)
![](http://o7m5xjmtl.bkt.clouddn.com/A1C5C678-1F03-4DA0-AFCB-0CC1B69B3955.png)

+ 用来反映总体趋势情况
+ 用来表达连贯性数据统计
+ 展现折线或者曲线的形式使用
+ 多条折线或者曲线可以进行相互比较


## 区域统计图表
![](http://o7m5xjmtl.bkt.clouddn.com/FA273297-D91D-48F9-B733-0FEDA08383BF.png)
![](http://o7m5xjmtl.bkt.clouddn.com/3371A1A6-93F1-4006-87A7-809516AAA52C.png)

+ 通过区域所占比重进行对比统计
+ 通过区域所占面积情况显示它所拥有的比重
+ 通过区域统计图表显示连续性变化情况

## 柱状和条形统计图表
![](http://o7m5xjmtl.bkt.clouddn.com/BB089600-9C88-40ED-A50D-F629E32F9BC2.png)
![](http://o7m5xjmtl.bkt.clouddn.com/D5D3A853-95C4-4263-9938-AED8EA088326.png)

+ 柱状和条形统计图表常用在对比情况的使用
+ 他们可以显示总体数量，也可以分段显示数量
+ 他们使用频率比较高

## 饼状图统计图表
![](http://o7m5xjmtl.bkt.clouddn.com/493E96BA-2ABC-49E8-A890-CB77C4CD47C2.png)

+ 用来统计各个组成部分的所占比重
+ 使用频率比较高

## 散点图统计图表
![](http://o7m5xjmtl.bkt.clouddn.com/B1766F4C-3107-4CF8-8E19-CBA947C5C0EF.png)

+ 用来统计总体分布情况
+ 通过图表可以得到哪些区域分布密集与疏散情况

## 组合统计图表
![](http://o7m5xjmtl.bkt.clouddn.com/02F0FDCF-A2F3-467C-87FC-6209152F23D5.png)

+ 柱状图和线形图组合应用
+ 柱状图和饼状图组合应用
+ 柱状图、饼状图、线形图组合应用

## 其他统计图表
+ 速度图表
+ 时钟图表
+ 表盘图表
+ …

# 2 Excel 设计统计图表
(1)  在 Excel 中创建表格
![](http://o7m5xjmtl.bkt.clouddn.com/B533B059-FD8F-47BD-96AB-42AD6F4CF162.png)

(2) 框选表格数据信息 > 插入 > 选择一种图表 > 完成
![](http://o7m5xjmtl.bkt.clouddn.com/FF6F20F4-864D-43F9-8A57-20AE73908849.png)

(3) 截图，粘贴到 Axure 的原型中

> **注意：** 这种表格只是静态的图片，没有动态的效果!  

# 3 HighChart 设计统计图表
(1) 创建新新工程，保存为 HIghChart.rp
(2) 发布项目为 HTMl 到本地： `Publish > Generate HTML Files…` 
(3) 将从 [HighCharts 网站](http://www.highcharts.com/download) 下载的文件拷贝到发不到本地的项目所在的文件夹，以便使用 HighCharts
![](http://o7m5xjmtl.bkt.clouddn.com/653A4938-24DE-476F-8CE3-66B3CD33C823.png)
(4) 在 Inline Frame 中打开 HighCharts 图表的 html 文件
![](http://o7m5xjmtl.bkt.clouddn.com/F54CD37F-247E-4748-8100-7E43CCD0D4D8.png)


# 4 实战：90后饭碗统计报告设计 

![](http://o7m5xjmtl.bkt.clouddn.com/66F880BA-E61F-4E5F-82C0-1595D5BE7301.png)
![](http://o7m5xjmtl.bkt.clouddn.com/20E272B2-6A62-4AB5-ACB0-0F252B6F81EB.png)