---
title: 走进 Axure 变量
categories:
  - Axure 从入门到精通
tag:
  - Axure
toc: true
---

[视频地址](http://www.jikexueyuan.com/course/1737.html)
> Axure 变量分为全局变量和局部变量，Axure 本身也内置了一些变量，也允许我们自己定义全局变量或者局部变量供我们自己使用，变量在交互效果上使用的很频繁，结合变量的使用，我们可以制作出软件丰富效果，让用户体验到最真实的感受。   

# 1 Axure 全局变量和局部变量的使用
全局变量能够在所有 case 中使用，局部变量的作用域仅限于一个 case。
## 全局变量
+ 全局变量管理面板
*(Menu)Project > Global Variables*

+ 写全局变量值
*Case Editor > Variables > Set Variable Value*

+ 读全局变量值
*Case Editor > Widgets > Set Text*

## 局部变量
+ 读写局部变量
*fx > Text Editor > Local Variables*

# 2 Axure 内置变量/函数的介绍
 `Text Editor > Insert Variables or Functions…`   

![](http://o7m5xjmtl.bkt.clouddn.com/A511D5F4-2E82-4B03-94AB-5987A15F7FBB.png)

# 3 变量值在页面间传递
利用全局变量来实现。

(1) `Projects > Global Variables…` ： 创建全局变量，来存储需要传递的值；
(2) `Case Editor > Variables > Set Variable Value > Select the variables to set Set Variable to value > fx` ： 进入到 Text Editor；
(3) 在 Text Editor 中定义局部变量，值为 text on widget，并将读取这个局部变量的值赋值给要传递的全局变量；
(4) 添加跳转的 case；
(5) 在跳转的目标页面，添加 case (比如 OnPageLoad)， `Widgets > Set Text` ， 在 Text Editor 中通过全局变量读取要传递的值，显示到相应的部件。

![](http://o7m5xjmtl.bkt.clouddn.com/303C5DB6-BA10-4B9B-90A6-6D480C195F0A.png)   ![](http://o7m5xjmtl.bkt.clouddn.com/A1507933-BDF0-44AD-A1A2-A1FF34395E6A.png)


# 4 实例：制作简易计算器 
(1) 绘制界面

![](http://o7m5xjmtl.bkt.clouddn.com/28E8B002-E7BA-4028-B05F-475489C9048E.png)

(2) 定义全局变量

![](http://o7m5xjmtl.bkt.clouddn.com/638802C2-7D71-4991-BC80-D20178153FF1.png)

(3) 为所有按钮注册点击的 case
为了加快效率，可以先为一个按钮注册好 case ，复制(command + c，如果要复制该事件下的所有case ，可以直接复制上级的事件)，然后粘贴给其它相似部件（选中其它部件 > command + v），最后不同的部分再修改一下。

+ 点击数字按钮 `0~9`
![](http://o7m5xjmtl.bkt.clouddn.com/2BE755E6-AB63-4E30-B309-EE7563A3F471.png)

+ 点击小数点 `.`
![](http://o7m5xjmtl.bkt.clouddn.com/A149D3BF-1189-4A50-8E7B-4E3AC87DF148.png)

+ 点击 `+`
![](http://o7m5xjmtl.bkt.clouddn.com/A05AD2FE-8FA8-474C-8972-DDDE0891774D.png)

+ 点击 `-`
![](http://o7m5xjmtl.bkt.clouddn.com/A623C461-E0BF-4FC9-AB6C-564862F956FE.png)

+ 点击 `x`
![](http://o7m5xjmtl.bkt.clouddn.com/960F0817-B4AB-4DAF-9F39-8E6A93721389.png)

+ 点击 `/`
![](http://o7m5xjmtl.bkt.clouddn.com/E6AB0C49-14B5-4C00-ACA2-E36B5A10A922.png)

+ 点击 `清屏`
![](http://o7m5xjmtl.bkt.clouddn.com/FFDC843B-31D3-4CAC-AE8F-66958CA10DCF.png)

+ 点击 `全清`
![](http://o7m5xjmtl.bkt.clouddn.com/6EEF907A-8452-4414-A02B-CB3E80697C41.png)

