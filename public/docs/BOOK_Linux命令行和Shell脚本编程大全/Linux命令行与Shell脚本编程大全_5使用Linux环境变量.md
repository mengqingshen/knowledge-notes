---
title: 5 使用Linux环境变量
categories: [Linux命令行和Shell脚本编程大全]
tag:
  - shell
date: 2015-07-09 21:33
---

## 7 可变数组
**说明：**环境变量的值可以是一个数组。

**声明：**把值放在括号里，值与值之间用空格隔开。

**删除数组中的某个值或整个数组：**`unset`

```bash
#声明数组
mytest = (one two three four five)

#只能显示第一个值
echo $mytest	#one

#显示下标为2的元素
echo ${mytest[2]}	#three

#显示整个数组的变量
echo ${mytest[*]}	#one two three four five

#设置某个元素
mytest[2]=seven

#删除数组中的某个值
unset mytest[2]
echo ${mytest[*]}	#one two four five
echo ${mytest[2]}	#虽然删除了，但使用被删除的元素的索引仍然能访问到，只不过该位置值是空的

#删除整个数组
unset mytest
```


