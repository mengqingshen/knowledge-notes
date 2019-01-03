---
title: JavaScript 正则表达式
categories: [慕课网学习笔记]

tag:
    - js
    - 正则表达式
---

**视频地址：**http://www.imooc.com/learn/706
**推荐在线练习工具：**https://regexper.com/
# 1 课程简介
课程目标

+ 了解正则表达式语法
+ 在IDE中使用正则表达式处理规则复杂的字符串查找、替换需求
+ 在 JavaScript 程序设计中使用正则表达式处理字符串

## 1.1 正则表达式简介及工具使用
### 1.1.1 什么是正则表达式
`Regular Expression` 使用单个字符串来描述、匹配一系列符合某个句法规则的字符串。就是按照某种规则去匹配符合条件的字符串。

### 1.1.2 正则表达式工具－REGEXPER
 **REGEXPER：**[正则表达式在线工具](https://regexper.com)，可以以非常形象的方式展现具体正则表达式的含义。

＃举例：匹配邮箱
`^(a-zA-Z0-9_-)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$`

![Alt text](http://cdn.mengqingshen.com/img/1471072343598.png)

# 2 认识正则表达式
## 2.1 RegExp对象
### 2.1.1 基本用法
`JavaScript`通过内置对象 `RegExp`支持正则表达式。有两种方法实例化`RegExp`对象

+ 字面量

```javascript
var reg = /\bis\b/g;

// "He IS a boy.This IS a dog. Where IS she?"
'He is a boy.This is a dog. Where is she?'.replace(reg, 'IS')
```

+ 构造函数


注意：字符串本身能识别类似`\b`形式的转义字符，为了避免字符串误解，传递给`RegExp`构造函数的第一个参数中的`\`都需要转义为`\\`。

```javascript
var reg = new RegExp('\\bis\\b', 'g');
// "He IS a boy.This IS a dog. Where IS she?"
'He is a boy.This is a dog. Where is she?'.replace(reg, 'IS')
```

### 2.1.2 修饰符

修饰符|说明
---|---
g|global。 全文搜索。默认搜索到第一个匹配停止
i|ignore case。忽略大小写。默认大小写敏感
m|multiple lines。 多行搜索，在存在`\n`的字符串中会影响表达式中`^`和`$`的行为。

## 2.2 元字符
 说明：正则表达式由两种基本字符类型组成

字符类型|说明|举例
---|---|---
原意文本字符|按照字符本身匹配|abc|
元字符|在正则表达式中有特殊含义的非字母字符|`. * + ? $ ^ \| \ () {} []`

元字符中的转义字符|含义
---|---
\t|水平制表符![Alt text](http://cdn.mengqingshen.com/img/1471075632133.png)
\v|垂直制表符![Alt text](http://cdn.mengqingshen.com/img/1471075663582.png)
\n|换行符![Alt text](http://cdn.mengqingshen.com/img/1471075688304.png)
\r|回车符![Alt text](http://cdn.mengqingshen.com/img/1471075717069.png)
\0|空字符![Alt text](http://cdn.mengqingshen.com/img/1471075742302.png)
\f|换页符![Alt text](http://cdn.mengqingshen.com/img/1471075759837.png)
\cX|与X对应的控制字符（ctrl + X）![Alt text](http://cdn.mengqingshen.com/img/1471075779742.png)

## 2.3 字符类
### 2.3.1 基础
`[]`
 **说明：**我们可以使用元字符`[]`来构建一个简单的类。所谓类是指符合某些特性的对象，一个泛指，而不是特指某个字符。

**举例**
`[abc]`，把字符`a`或`b`或`c`归为一类，表达式可以匹配这类的字符。
![Alt text](http://cdn.mengqingshen.com/img/1471076119291.png)

```javascript
// "X1X2X3d4"
'a1b2c3d4'.replace(/[abc]/g, 'X')
```
### 2.3.2 字符类取反
 **说明：**在`[]`中使用元字符`^`创建`反向类／负向类`,意思是不属于某类的内容。

**举例**
表达式`[^abc]`，表示*不是字符a或b或c*的内容

```javascript
// "aXbXcXXX"
'a1b2c3d4'.replace(/[^abc]/g, 'X')
```
## 2.4 范围类
正则表达式还提供了`范围类`。例如，可以使用`[a-z]`来连接两个字符表示*从 a 到 z 的任意字符*，这是个闭区间，也就是包涵 a 和 z 本身。
![Alt text](http://cdn.mengqingshen.com/img/1471076736409.png)

```javascript
'a1b2c3d4Hello'.replace(/[a-z]/g, 'X')
"X1X2X3X4HXXXX"
```

 注意：形式为`[字符1-字符2]`的正则中的`-`都会被识别为`范围类`，若真的想使用`-`本身，要么在`[]`外部使用，要么类似`[字符1-字符2-]`，其中最后一个`-`会本当做原意文本字符。

## 2.5 预定义类及边界
### 2.5.1 预定义类
正则表达式提供`预定义类`来匹配常见的字符类

字符|等价类|含义
---|---|---
.|`[^\r\n]`|除回车符和换行符之外的所有字符
\d|`[0-9]`|数字字符
\D|`[^0-9]`|非数字字符
\s|`[\t\n\x0B\f\r]`|空白符
\S|`[^\t\n\x\0B\f\r]`|非空白符
\w|`[a-zA-Z_0-9]`|单词字符（字母、数字、下划线）
\W|`[^a-zA-Z_0-9]`|非单词字符

### 2.5.2 边界
正则表达式还提供了几个常用的边界匹配字符

字符|含义
---|---
^|一行的开始
$|一行的结尾
\b|单词边界
\B|非单词边界

```javascript
'@123@abc'.replace(/^@./g, 'X')
"X23@abc"
```

注意：m 修饰符将会影响 $ 和 ^ 的行为

```javascript
var mulStr = '@123\n@456\n@789'
// 使用 m 修饰符：\n 被当做多行的分隔
mulStr.replace(/^@\d/gm, 'X')
"X23
X56
X89"

// 不使用 m 修饰符：\n 不会被当做多行的分隔
mulStr.replace(/^@\d/g, 'X')
"X23
@456
@789"
```
## 2.6 量词

量词|含义
---|---
?|最多出现一次（0次或1次）
+|至少出现一次（1次或多次）
*|出现0次或多次（任意次）
{n}|出现 n 次
{n,m}|出现 n 到 m 次
{n,}|至少出现 n 次

**举例**
`\d{20}\w\d?\w+\d*\d{3}\w{3,5}\d{3,}`
![Alt text](http://cdn.mengqingshen.com/img/1471090337589.png)

 技巧：最多出现 n 次可以这样表示`{0, n}`
## 2.7 贪婪模式与非贪婪模式

模式|说明|方式
---|---|---
贪婪模式|尽可能多地匹配字符|默认
非贪婪模式|尽可能少地匹配字符，也就是说一旦成功匹配就不再继续尝试|在量词后使用`?`即可

```javascript
// 贪婪模式
'123456789'.match(/\d{3,5}/g)
// ["12345", "6789"]

// 非贪婪模式
'123456789'.match(/\d{3,5}?/g)
// ["123", "456", "789"]
```

## 2.8 分组
### 2.8.1 基础
使用`()`可以达到分组的功能，使量词作用于分组。

**例子**
![Alt text](http://cdn.mengqingshen.com/img/1471097284500.png)

```javascript
'a1b2c3d4'.match(/([a-z]\d){3}/g)
// ["a1b2c3"]
```

### 2.8.2 或
使用`|`可以达到或的效果。

**例子**
`/Byr(on|Ca)sper/g`：
![Alt text](http://cdn.mengqingshen.com/img/1471097817285.png)

`/Byron|Casper/g`：
![Alt text](http://cdn.mengqingshen.com/img/1471097772183.png)

```javascript
// 有分组
'ByronsperByrCasper'.match(/Byr(on|Ca)sper/g)
// ["Byronsper", "ByrCasper"]

// 无分组
'ByronsperByrCasper'.match(/Byron|Casper/g)
// ["Byron", "Casper"]
```

### 2.8.3 反向引用

**例子**
2016-8-13 => 8/13/2016

`/(\d+)-(\d+)-(\d+)/g`：
![Alt text](http://cdn.mengqingshen.com/img/1471098062069.png)

```javascript
'2016-8-13'.replace(/(\d+)-(\d+)-(\d+)/g, '$2/$3/$1')
// "8/13/2016"
```

### 2.8.4 忽略分组
不希望捕获某些分组，只需要在分组內加上`?:`就可以
`(?:Byron).(ok)`：
![Alt text](http://cdn.mengqingshen.com/img/1471098192119.png)

## 2.9 前瞻
 **说明：**正则表达式从文本头部向尾部解析，文本尾部方向，称为`前`。`前瞻`就是在正则表达式匹配到规则的时候，向前检查是否符合断言，`后顾/后瞻`方向和`前瞻`相反。符合和不符合特定断言称为`肯定/正向`匹配和`否定/负向`匹配。
 **注意**
 
 + `JS`不支持`后瞻/后顾`
 + `断言`部分的正则表达式只是用来断言，匹配的结果不会包括`断言`匹配到的部分


名称|正则|含义
---|---|---
正向前瞻|`exp(?=assert)`|字符串匹配到`exp`部分还不够，后面的部分必需同时配`assert`
负向前瞻|`exp(?!assert)`|字符串匹配到`exp`部分还不够，后面的部分必需同时不能匹配`assert`
正向后顾（JS不支持）|`exp(?<=assert)`|字符串匹配到`exp`部分还不够，前面面的部分必需同时配`assert`
负向后顾（JS不支持）|`exp(?<!assert)`|字符串匹配到`exp`部分还不够，前面的部分必需同时不能匹配`assert`

```javascript
'a2*34v8'.match(/\w(?=\d)/g)
// ["a", "3", "v"]
```

## 2.10 对象属性
`RegExp`对象常用属性

属性|说明
---|---
global|是否全文搜索，默认`false`
ignoreCase|是否大小写敏感，默认使`false`
multiline|多行搜索，默认值是`false`
laseIndex|是当前表达式匹配内容的最后一个字符的下一个位置，也就是下一次搜索开始的位置，在没有使用`g`修饰符时，该值始终为0
source|正则表达式的文本字符串

```javascript
var reg = /\bis\b/gi
'I do because I love.This is fun. IS NOT IT?'.match(reg)
// ["is", "IS"]

reg.global
// true
reg.ignoreCase
// true
reg.multiline
// false
reg.lastIndex
// 0
reg.source
// "\bis\b"
```

## 2.11 test 和 exec方法
### 2.11.1 RegExp.prototype.test(str)
 **功能：**用于测试字符串参数中是否存在匹配正则表达式模式的字符串
 **返回值：**存在返回 true, 不存在返回 false

```javascript
const reg1 = /\w/
const reg2 = /\w/g

reg1.test('abc')
// true

// 添加 g 修饰符会干扰 test 函数，因为每次匹配的起点（lastIndex）会不断向后移动，最后一次匹配返回的结果一定是是false
while(reg2.test('abc')) {
  console.log(reg2.lastIndex)
}
// 1
// 2
// 3
```

### 2.11.2 RegExp.prototype.exec(str)

**非全局调用（不使用`g`修饰符）**
 **返回值：**调用非全局的 `RegExp`对象的 `exec`时，返回数组
 
 + 第1个元素：与正则表达式相匹配的文本
 + 第2个元素：与`RegExpObject`的第1个子表达式相匹配的文本（如果有的话）
 + 第3个元素：与`RegExpObject`的第2个子表达式相匹配的文本（如果有的话）
 ...



```javascript
const reg = /\d(\w)(\w)\d/

const result = reg.exec('1az2bb3cv4d5eee')

result// ["1az2", "a", "z"]
```

**全局调用（使用`g`修饰符）**
 **功能：**使用正则表达式模式对字符串执行搜索，并将更新全局 (使用g)`RegExp`对象的属性以反应匹配结果
 **返回值：**如果没有匹配的文本则返回`null`，否则返回一个结果数组：
 
 + index：声明匹配文本的第一个字符的位置
 + input：存放被检索的字符串

```javascript
const reg = /\d(\w)(\w)\d/g

let result, str = '1az2bb3cv4d5eee'

while(result = reg.exec(str)) {
  console.log(reg.lastIndex)
  console.log(result.index)
  console.log(result)
}
```
```javascript
// 6
// ["3cv4", "c", "v"]
// 4
// 0

// ["1az2", "a", "z"]
// 10
// 6
// ["3cv4", "c", "v"]
```

```bash
let check = "((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?";
```

## 2.12 字符串对象方法
### 2.12.1 String.prototype.search
**功能：**用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串
**参数（1）：**`Regexp`对象（如果是其它类型，将会被当做正则表达式字符串处理）
**返回值：**返回第一个匹配到的结果的 index， 查找不到返回 -1
**注意：**该方法将忽略修饰符`g`，不执行全文匹配，并且总是从字符串的开始进行检索

```javascript
let result, str = '1az2bb3cv4d51eee'

// 正则表达式
str.search(/v4/)// 8

// 字符串
str.search('1')// 0

// 数字，会被转为字符串
str.search(1)// 0
```

### 2.12.2 String.prototype.match
 **功能：**将检索字符串，以找到一个或多个与 regexp 匹配的文本
 **参数（1）：**`RegExp`对象（如果是其它类型，将会被当做正则表达式字符串处理，内部仍旧会处理为一个 `RegExp`对象）
 **返回值：**如果没有找到任何匹配的文本，将返回 `null`；否则将返回一个数组，其中存放了与它找到的匹配文本有关的信息

＃非全局调用

返回数组的元素下标|说明
---|---
0|匹配的文本
其它|与正则表达式的子表达式匹配的文本

返回数组的对象属性|说明
---|---
index|声明匹配文本的起始字符在字符串的位置
input|声明对 stringObject 的引用

```javascript
'1az2bb3cv4d51eee6f7'.match(/\d(\w)\d/)// ["4d5", "d"]
```

＃全局调用
如果 `RegExp`具有标志`g`则 `match`方法将执行全文搜索，找到字符串中的所有匹配子字符串。返回的数组没有 `index` 属性或`input`属性

返回数组的元素下标|说明
---|---
all|所有匹配的子串

```javascript
'1az2bb3cv4d51eee6f7'.match(/\d(\w)\d/g)// ["4d5", "6f7"]
```

**注意：** 如果`RegExp`没有标志`g`，那么`match`方法只能在字符串中执行一次匹配

### 2.12.3 String.prototype.split
 **功能：**我们经常使用`split`方法把字符串分割为字符数组，在一些复杂的分割情况下我们可以使用正则表达式解决
 **参数（1）：**`RegExp`对象（如果是其它类型，将会被当做正则表达式字符串处理，内部仍旧会处理为一个 `RegExp`对象）

```javascript
'a,b,c,d'.split(',')// ["a", "b", "c", "d"]
'a1b2c3d'.split(/\d/)// ["a", "b", "c", "d"]
```

### 2.12.4 String.prototype.replace
 **功能：**将匹配到的字符串中的字串替换为指定字符串并返回
 **参数（2）：**
 
 + String.prototype.replace(str, replaceStr)
 + String.prototype.replace(reg, replaceStr)
 + String.prototype.replace(reg, `function`)

`function`会在每次匹配替换的时候调用，有4个参数

参数|说明
---|---
1|匹配字符串
2|正则表达式分组内容，没有分组则没有该参数
3|匹配项在字符串中的 index
4|原字符串

```javascript
/* str, replaceStr */
'a1b1c1d'.replace('1', '2')// "a2b1c1d"

/* reg, replaceStr */
'a1b1c1d'.replace(/1/g, '2')// "a2b2c2d"

/* reg, function */
// 不带分组
'a1b1c1d'.replace(/\d/g, function (match, index, origin) {
  return parseInt(match) + 1
})// "a2b2c2d"

// 带分组
'a1b2c3d4e5'.replace(/(\d)(\w)(\d)/g, function (match, group1, group2, group3, index, origin) {
  return group1 + group3
})// "a12c34e5"
```



