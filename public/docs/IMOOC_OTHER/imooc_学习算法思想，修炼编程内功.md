---
typora-copy-images-to: ipic
title: 学习算法思想，修炼编程内功

categories:
  - 慕课网
tag:
  - js
---

# 学习算法思想，修炼编程内功

## 1 当我们谈论算法的时候，我们在谈论什么

### 1.1 我们究竟为什么要学习算法

**大公司都面试算法**

+ 面试应对自如，得到一个更好的职业机会，站在一个更高的平台上，无可厚非。

**算法无处不在**

+ IDE：理解语法、系统分配、报告错误、优化代码...
+ 搜索引擎：搜索算法 + 排序算法
+ Siri
+ 推荐算法：Google、NETFLIX...
+ 动画制作: 灯光效果、材质效果...
+ 游戏：迷宫、扫雷、消除
+ alpha GO
+ 图像识别
+ AI
+ PhotoShop: 魔棒功能...
+ 文件压缩算法
+ 数据库
+ 性能优化：iwatch 优化 - Auto Launch

**学好算法，才能创造出更有意义的东西**


### 1.2 课程介绍

#### 学习要求

+ 语言：[C++/java](https://github.com/liuyubobobo/Play-with-Algorithms)（算法其实是语言无关的）
+ 拥有自己的编译环境
+ 掌握最基础的语言知识
+ 了解数组、链表、堆、栈等数据结构
+ 对基本算法之时有常识性的了解：如递归、遍历、算法复杂度

#### 学习路径
线性排序 -> 树形结构 -> 图形结构

#### 白板编程
> 不给你编译器，诶你一个白板，直接在上面写代码，考察算法思想的基本功。

#### 数据结构的重要性
> I will, in fact, claim that the difference between a bad programmer and a good one is whether he considers his code or his data structures more important. Bad programmers worry about the code. Good programmers worry about data structures and their relationships. —— Linus Torvalds



《Algorithms + Data Structures = Programs》



#### 无法覆盖所有的数据结构和算法

堆：斐波那契堆？
树：线段树
图：网络流

#### 算法思想

+ 分冶算法 - 归并排序、快速排序...
+ 贪心算法 - 最小生成树...
+ 动态规划 - 最短路径...
+ 递归搜索 - 树形结构...

#### 面试问题

+ 评论区
+ Github

#### 每个细分领域都是算法

+ 图形学
+ 图像学
+ 机器学习
+ 人工智能
+ 数据挖掘
+ 操作系统
+ 编译原理
+ 网络安全
+ 虚拟现实
+ 高新能计算

#### 让我们一起体会算法之美

>  Computer programming is an art, because it applies accumulated knowledge to the world, because it requires skill and ingenuity, and especially because it produces objects of beauty. A programmer who subconsciously views himself as an artist will enjoy what he does and will do it better. —— Donald Knuth



## 2 排序基础

## 2.1 排序基础

> 为什么要学习 O(n^2) 的排序算法？

+ 基础
+ 编码简单，易于实现，是一些简单情景的首选
+ 在一些特殊情况下，简单的排序算法更有效
+ 简单的排序算法思想衍生出复杂的排序算法
+ 作为自过程，改进更复杂的排序算法

### 选择排序(selection sort)

信息|说明
:---|:---
原理|两层遍历，外层遍历整个数组，内层遍历通过交换位置来依次修正每个位置的错误原素。
时间复杂度|O(n^2)



![](http://cdn.mengqingshen.com/select-sort-0.gif)

### 代码

#### C++

```c++
#include <iostream>

/* 兼容老标准 */
#include <algorithm>


using namespace std;

void selectSort(int arr[], int n) {
  for (int i = 0; i < n; i++) {

    // 选择 [i, n) 区间中的最小值(假设 i 是最小值，遍历 [i + 1, n)，如果有比 i 小的就置换位置）
    int minIndex = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        swap(arr[j], arr[minIndex]);
      }
    }
  }
}

int main() {
  int a[10] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
  selectSort(a, 10);

  for (int i = 0; i < 10; i++) {
    cout << a[i] << " ";
  }
  cout << endl;

  return 0;
}
```



#### JavaScript

```javascript
function selectSort (arr) {
  const n = arr.length
  for (let i = 0; i < len; i++) {
    const minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        const tmp = arr[minIndex]
        arr[minIndex] = arr[j]
        arr[j] = arr[minIndex]
      }
    }
  }
}
```



## 2.2 使用模版（范型）编写算法

### 代码

#### C++

```shell
.
├── main.cpp
├── makefile
└── student.h
```



*makefile*

```she
SRCS = main.cpp # 源文件
PROG = demo # 最终打包的应用程序名
CC = g++ # 编译工具
CFLAGS = -g # 编译参数
INSTALL_ROOT = /usr/local # 安装路径
DEBUG = 1

OBJS = $(SRCS:.cpp=.o) # 把源文件列表中美歌文件名的 .c 替换为 .o

ifdef DEBUG
CLAAGS = -O -g
else
CFLAGS = -O
endif

$(PROG): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

main.o: student.h
clean:
	rm -f $(OBJS) $(PROG)
install:
	cp $(PROG) $(INSTALL_ROOT)/bin
```



*Student.h*

```c++
#ifndef SELECTIONSORT_STUDENT_H
#define SELECTIONSORT_STUDENT_H

#include <iostream>
#include <string>

using namespace std;

struct Student {
  string name;
  int score;
  bool operator<(const Student &otherStudent) {
    return score != otherStudent.score ?  score < otherStudent.score : name < otherStudent.name;
  }

  friend ostream& operator<<(ostream &os, const Student &student) {
    os << "Student: " << student.name << " " << student.score << endl;

    return os;
  }
};
#endif // SELECTIONSORT_STUDENT_H
```



*main.cpp*

```c++
#include <iostream>

/* 兼容老标准 */
#include <algorithm>

#include "student.h"


using namespace std;


// 采用范型使排序更加通用
template<typename T>
void selectSort(T arr[], int n) {
  for (int i = 0; i < n; i++) {
    int minIndex = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        swap(arr[j], arr[minIndex]);
      }
    }
  }
}

int main() {

  // 整数排序
  int a[10] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
  selectSort(a, 10);

  for (int i = 0; i < 10; i++) {
    cout << a[i] << " ";
  }
  cout << endl;

  // 浮点数排序
  float b[4] = {4.4, 3.3, 2.2, 1.1};
  selectSort(b, 4);
  for (int i = 0; i < 4; i++) {
    cout << b[i] << " ";
  }
  cout << endl;

  
  // 字符串排序
  string c[4] = {"D", "C", "B", "A"};
  selectSort(c, 4);
  for (int i = 0; i < 4; i++) {
    cout << c[i] << " ";
  }
  cout << endl;

  // 自定义对象排序
  Student d[4] = {{ "D", 90 }, { "C", 100 }, { "B", 95 }, { "A", 95 }};
  selectSort(d, 4);
  for ( int i = 0; i < 4; i++) {
    cout << d[i];
  }
  cout << endl;

  return 0;
}
```



### 2.3 随机生成算法测试用例

