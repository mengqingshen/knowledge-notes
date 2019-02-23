---
title: React Native 布局指南
categories:
  - 极客学院_ReactNative
---

**视频地址：**http://www.jikexueyuan.com/course/1489.html

**背景：**`React Native` 使你能够使用基于 `JavaScript` 和 `React` 构建世界一流的应用程序。 `React Native` 把重点放在所有开发人员关心的平台的开发效率上——开发者只需学习一种语言就能轻易为任何平台高效地编写代码。 通过该课程，学员可以理解 `Flexbox`， 并基本掌握 `React Native` 的样式和布局开发。 

## 1 Flexbox 布局详解
**课程说明：** Flexbox 布局的基本原理和方法

**说明：**`Flexbox`是`css3`里边引入的布局模型－弹性盒子模型，旨在通过弹性的方式来对齐和分布容器中内容的空间，使其能够适应不同屏幕的高度。`React Native`中`Flexbox`是这个规范的一个子集。

![Alt text](http://cdn.mengqingshen.com/img/1473689485972.png)

### 1.1 Flexbox解决了什么问题？
+ 浮动布局
+ 不同宽度屏幕的适配
+ 宽度自动分配
+ 水平垂直居中

![Alt text](http://cdn.mengqingshen.com/img/1473689609237.png)

### 1.2 Flexbox 属性

#### 12.1 容器属性
容器属性|值|说明
-|-
flexDirection|enum(`row`, `colum`)|主轴的方向,默认为`row`
flexWrap|enum(`wrap`, `nowrap`)|默认为`nowrap`，所有item都在一行或一列；`wrap`则使一行或一列容不下时进行折行处理
alignItems|enum(`flext-start`、`flex-end`、`center`、`stretch`)|在`cross axis`方向上对剩余空间的处理方式
justifyContent|enum(`flex-start`、`flex-end`、`center`、`space-between`、`space-around`)|在`main axis`方向上对剩余空间的处理方式

***
**（1）flexDirection**
![Alt text](http://cdn.mengqingshen.com/img/1473689934368.png)
***
**（2）flexWrap**
![Alt text](http://cdn.mengqingshen.com/img/1473690320187.png)

***
**（3）alignItems**
![Alt text](http://cdn.mengqingshen.com/img/1473690365231.png)
***
**（4）justifyContent**
![Alt text](http://cdn.mengqingshen.com/img/1473690550451.png)

#### 1.2.2 容器属性
元素属性|类型|说明
-|-|-
flex|number|item 在 `main axis`方向上占用空间大小
alignSelf|enum(`flext-start`、`flex-end`、`center`、`stretch`)|针对单一的item 在`cross axis`方向上的`alignItems`

**（1）flex**
![Alt text](http://cdn.mengqingshen.com/img/1473690728595.png)

**（2）alignSelf**

## 2 样式布局基础
**课程背景：**`React Native` 的样式布局基础，包括如何添加和使用样式，以及介绍作为 Css 子集的基本盒模型布局方式

### 2.1 声明和使用样式
##### 2.1.1 声明
通过 `StyleSheet`声明样式
```javascript
var styles = StyleSheet.create({
	base: {
		width: 38,
		height: 38
	},
	background: {
		backgroundColor: '#222'
	},
	active: {
		borderWidth: 2,
		borderColor: '#0f0'
	}
});
```

#### 2.1.2 使用
通过 `Style`属性来使用样式
```javascript
// 引用单个 style
<Text style={styles.base} />
<Text style={styles.background} />

// 引用多个(以数组形式)
<View style={[
	styles.base,
	styles.background
]} />

// 直接使用
<View style={{
	width: 100,
	height: 100
}} />
```

### 2.2 布局单位
+ 设置高度或者宽度时不用带单位，默认使用 `pt` 为单位
+ 不能使用百分比来设置宽度或高度
+ 可通过 `Dimensions` 模块来获取窗口宽高
+ 可通过`PixelRatio`模块来获取像素密度

**使用 Dimensions模块来获取宽高**
```javascript
var Dimensions = require('Dimensions');
var {
	width,
	height
} = Dimensions.get('window')
```

**通过 PixelRatio 对象来获取像素密度**
```javascript
var pixelRation = PixelRatio.get();
```

### 2.3 盒子模型
`w3c盒模型`的子集
![Alt text](http://cdn.mengqingshen.com/img/1473742982007.png)

### 2.4 定位模式
**说明：**支持`absolute`和`relative`定位

**注意：**和 css 的标准不同的是，父元素容器不用设置 `position : absolute|relative`

**absolute定位**
```javascript
<View style={{
	flex: 1,
	height: 100,
	backgroundColor: '#333'}}>
	<View style={[styles.circle, {
		position: 'absolute',
		top: 50,
		left: 180
	}]}>
</View>
```

**relative定位**
```javascript
<View style={{
	flex: 1,
	height: 100,
	backgroundColor: '#333'}}>
	<View style={[styles.circle, {
		position: 'relative',
		top: 50,
		left: 50,
		marginLeft: 50}]}>
</View>
```
### 2.5 css 属性
+ transform
+ border style
+ font style
+ shadow
+ background
+ overflow
+ opacity

## 3  图像 Image 组件介绍

**说明：**`Image`组件通过`source`来指定资源，资源可以是本地的资源，也可以是网络上的资源

### 3.1 引入图片
### 网络图片
**说明：**通过设置 `source`的`uri`

**注意：**网络引入的必须设置其宽高
```javascript
<Image
	style={styles.logo}
	source={{uri='http://facebook.github.io/react/img/logo_og.png'}}
/>
```

### 本地图片
**（1）使用静态资源，先将静态资源引入项目，重新编译**
![Alt text](http://cdn.mengqingshen.com/img/1473757025709.png)

**（2）通过 `require('image!name')`的方式引入**
```javascript
<Image style={styles.icon}
	source={require('image!myIcon')} />
```

### 3.2 resizeMode
**说明：**通过`resizeMode`改变图片显示效果，类似`css`的背景模式

属性|类型|说明
-|-|-
resizeMode|enum(`cover`, `contain`, `stretch`)|改变图片显示效果，类似`css`的背景模式

![Alt text](http://cdn.mengqingshen.com/img/1473757592882.png)

### 3.3 Image 嵌套其它组件
**说明：**不同于`html`中的`Image`元素，`Reactive Native`中的`Image`可嵌套其它元素

```javascript
<Image style={{
	flex: 1,
	height: 100,
	justifyContent: 'center',
	alignItems: 'center'}}
	source={{uri: '...'}}>
	<Text style={{color: red}}>Image Description</Text>
</Image>
```
## 4  文字 Text 组件介绍

### 4.1 Text 元素
**说明：**和`React Web`不同的是,在`React Native`中，文本元素必须要用`Text`组件包含起来，否则会出现报错

```javascript
<Text>Some Text</Text>
```

### 4.2 Text 元素属性
文本元素支持的 css 属性|类型
-|-
`fontFamily`|string
`fontSize`|number
`fontStyle`|enum(`normal`, `italic`)
`fontWeight`|enum(`normal`, `bold`, `100...900`)
`letterSpacing`|number
`lineHeight`|number
`textAlign`|enum(`auto`, `left`, `right`, `center`)
`writingDirection`|enum(`auto`, `ltr`, `rtl`)
`overflow`|enum(`visible`, `hidden`)

### 4.3 Text 嵌套和Text 样式继承
**说明：**文本元素可以嵌套文本元素，内部使用`NAAttributedString`

**注意：**不同于 web 的 css 标准，`React Native`中文本元素不能继承上级`View`的样式，不过`Text`内部可实现局部继承，如下组件中，`and red`是`bold`家`red`

```javascript
<Text style={{fontWeight: 'bold'}}>
	I am bold
	<Text style={{color: 'red'}}>
		and red
	</Text>
</Text>
```
### 4.4 numberOfLines 属性
**说明：**文字可以通过`numberOfLines`属性设置文本长度限制

```javascript
<Text numberOfLines={5}>
	<Text>文本元素{'\n'}</Text>
	<Text>{'\n'}In this...</Text>
</Text>
```

