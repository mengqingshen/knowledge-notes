---
title: 5 样式(React Native开发指南)
categories:
  - React Native开发指南
tag:
  - ReactNative
---

**扩展：**如果想在`React Native`和`Web`应用之间共享样式,GitHub上的这个`React Style`项目[https:// github.com/js-next/react-style](https:// github.com/js-next/react-style)提供了一种在 Web 上使用 `React Native` 样式的解决方案。

## 5.1 声明和操作样式
**传统 CSS 样式表的痛点：**所有的 `CSS` 规则和类名都在全局作用域里,如果不注意,一个组件样 式很容易会影响到其他组件
**ReactNative的 css：**实现了`CSS`可用样式的一个子集,在不损失高度表达能力的前提下能够保持 样式接口的简洁性
+ `position` 属性是完全不同的
+ 采用基于`JavaScript`的样式对象来代替传统样式表


### 5.1.1 内联样式
**说明：**从语法上来看,内联样式是`React Native`中编写组件样式最简单的一种方法,虽然它们通常并不是最佳方式
**注意：**`React Native`中内联样式的语法和浏览器上的`React` 是一样的
**优点：**简单粗暴,让你可以快速地调试
**缺点：**但是由于它们比较低效,一般情况下应该避免使用。内联样式对象会在每一个渲染周期都 被重新创建

```vbscript-html
<Text style={{fontWight: 'bold', color: '#000'}}>如果一个人愿意牺牲自由获取一点点保障，那么他既不配得到自由，也不配得到保障。</Text>
```
### 5.1.2 对象样式
**说明：**给`style`属性赋值`{对象名}`
```javascript
import React, { Component } from 'react';

import {
	Text,
	View
} from 'react-native';

import {
	Title
} from './common';

let italic = {
	fontStyle: 'italic',
};

let bold = {
	fontWeight: 'bold',
};

class StyleWithObjectDemo extends Component {
	render() {
		return (
			<View>
				<Title>5.1.2 对象样式</Title>
				<Text>
					<Text>The quick <Text style={italic}> brown </Text> fox jumped over the lazy <Text style={bold}>dog</Text>.</Text>
				</Text>
			</View>
		)
	}
}

export default StyleWithObjectDemo;
```

### 5.1.3 使用 `Stylesheet.create`
**说明：**`Stylesheet.Create` 其实只是提供保护措施的语法糖，是可选的,但有一些重要的优势
+ 它保证了值是不可变 的,并且通过将它们转换成指向内部表的纯数字,保持了代码的不透明性
+ 将它们放在文件的末尾可保证它们在应用中只会被创建一次,而不是每一次渲染周期 都被重新创建
+ 提供了通过 `propTypes` 校验属性 的能力

### 5.1.4 样式拼接
**说明：**`style` 属性可以接收一个`对象数组`来拼接以下成分
+ 样式对象
+ 内敛样式
+ 条件样式

**建议：**样式拼接是一种更 为受限的工具,但它也有一定的长处:它保持了逻辑的简洁性,并且更容易推导出元素使用了何种样式以及如何使用的

```javascript
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import {
	Title
} from './common';

class AccentButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			touching: true,
		};
	}
	render() {
		return (
			<View>
				<Title>5.1.4 样式拼接</Title>
				{/* 对象数组 */}
				<Text style={[styles.button, styles.accentText]}>对象数组</Text>
				{/* 混合內联样式 */}
				<Text style={[styles.button, styles.accentText, { color: '#FFF' }]}>可以混合内敛样式</Text>
				{/* 使用条件样式 */}
				<Text style={[styles.button, this.state.touching && styles.highlight]}>使用条件样式</Text>
			</View>
		)
	}	
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		backgroundColor: '#99ccff',
	},
	accentText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	highlight: {
		color: '#ff0000',
	},
});

export default AccentButton;
```

## 5.2 组织和继承
### 5.2.1 导出样式对象
**说明：**`组织`样式的方法以及如何`共享`和`继承`样式
**优先级：**样式数组中最右边的样式有最高优先权,并且空值(`false`、`null` 和 `undefined`)会被忽略

```bash
│   ├── SeparateStyles
│   │   ├── index.js # 主文件
│   │   └── styles.js # 分离出来的样式模块
```

*index.js*
```javascript
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import {
	Title
} from '../common';

import styles from './styles';

class Demo extends Component {
	render() {
		return (
			<View>
				<Title>5.2.1 导出样式对象</Title>
				<Text style={[styles.text, styles.bold]}>
					引用作为js模块分离出去的样式
				</Text>
			</View>
		);
	}
}
export default Demo;
```

*styles.js*
```javascript
import {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	text: {
		color: '#ff00ff',
		fontSize: 16,
	},
	bold: {
		fontWeight: 'bold',
	}
});

export default styles;
```

### 5.2.2 样式作为属性传递
**说明：**组件通过属性接收样式对象
**技巧：**通过把 `this.props.style` 放置在样式数组的末尾,我们确保可以重写默认属性

```javascript
import React, { Component } from 'react';

import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import {
	Title
} from './common';

class Demo extends Component {
	propTypes: {
		style: Text.propTypes.Style
	}

	defaultProps: {
		style: {}
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			/* 如果传递进来 style 属性，同样的样式会覆盖 */
			<Text style={[myStyles.text, this.props.style]}>Hello, world!</Text>
		);
	}

}

class CustomizableText extends Component {
	render() {
		return (
			<View>
				<Title>5.2.2 样式作为属性传递</Title>

				{/* 传递颜色 style 属性（会覆盖） */}
				<Demo style={{color: '#ff0000'}}/>
			</View>
		);
	}
}

const myStyles = StyleSheet.create({
	text: {
		color: '#000',
	}
});

export default CustomizableText;
```

### 5.2.3 复用和共享样式
**说明：**组件间共享样式，共享的样式应该放置 在组件目录之外。共享样式可以包含像调色板、字体、标准内外边距等信息
**注意：**怎样组织样式也成为了项目代码结构需要 考虑的一部分,但是这里没有唯一正确的方法
```javascript
- js
       |- components
          |- Button
             |- index.js
             |- styles.js
       |- styles
          |- styles.js # 所有共享的样式，导入了 colors fonts
          |- colors.js # 
          |- fonts.js
```

## 5.3 定位和设计布局
**说明：**`React Native` 的定位方案则更加专注,主要依赖于 `flexbox` 和绝对定位,结合一些诸如 `margin` 和 `padding` 这样的属性

### 5.3.1 使用 flexbox 布局
**Flexbox相关 MDN文档：**[https://developer.mozilla.org/en- US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes](https://developer.mozilla.org/en- US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

**在 Reacrt Native 中支持的 flexbox 的 css 属性**
+ flex：通过添加 flex 属性,我们明确地将空控件选为 flexbox 模式
+ flexDirection
+ flexWrap
+ alignSelf
+ alignItems：添加了 alignItems 属性,那么子元素将不再自动扩展填充水平和垂直两个方向上可用的空间

**其它可用的会影响 flexbox 的 css 属性**
+ height 
+ width
+ margin
+ border
+ padding

### 5.3.2 使用绝对定位
**说明：**`React Native`也支持绝对定位,其工作方式基本上与Web上的一致,你可以
通过设置 `position` 属性来启用绝对定位
**限制：**没有 `z-index` 属性，一般来说,一组视图的最后一个元素有最高的优先级

### 5.3.3 学以致用
![Alt text](http://cdn.mengqingshen.com/img/1474774560955.png)

*AbsoluteDemo/index.js*
```javascript
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import styles from './style';

class Mondrian extends Component {
	render() {
		return (
			<View style={styles.parent}>
				<View style={styles.topBlock}>
					<View style={styles.leftCol}>
						<View style={[styles.cellOne, styles.base]} />
						<View style={[styles.cellTwo, styles.base]} />
					</View>
					<View style={[styles.cellThree, styles.base]} />
				</View>

				<View style={styles.bottomBlock}>
					<View style={styles.bottomBlock}>
						<View style={[styles.cellFour, styles.base]} />
						<View style={[styles.cellFive, styles.base]} />
						<View style={[styles.bottomRight]}>
							<View style={[styles.cellSix, styles.base]} />
							<View style={[styles.cellSeven, styles.base]} />
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default Mondrian;
```

*AbsoluteDemo/style.js*
```javascript
import {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	parent: {
		flexDirection: 'column',
		position: 'absolute',
		top: 30,
		left: 0,
		right: 0,
		bottom: 0,
	},
	base: {
		borderColor: '#000',
		borderWidth: 5,
	},
	topBlock: {
		flexDirection: 'row',
		flex: 5,
	},
	leftCol: {
		flex: 2,
	},
	bottomBlock: {
		flex: 2,
		flexDirection: 'row',
	},
	bottomRight: {
		flexDirection: 'column',
		flex: 2,
	},
	cellOne: {
		flex: 1,
		borderBottomWidth: 15,
	},
	cellTwo: {
		flex: 3,
	},
	cellThree: {
		backgroundColor: '#f00',
		flex: 5,
	},
	cellFour: {
		flex: 3,
		backgroundColor: '#00f',
	},
	cellFive: {
		flex: 6,
	},
	cellSix: {
		flex: 1,
	},
	cellSeven: {
		flex: 1,
		backgroundColor: '#ff0',
	}
});

export default styles;
```

## 5.4 小结