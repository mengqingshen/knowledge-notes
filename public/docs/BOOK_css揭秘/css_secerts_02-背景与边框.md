---
title: 02 背景与边框(css secrets)
categories: [CSS揭秘]
toc: true
tag:
  - css
date: 2017-07-19 12:53
typora-copy-images-to: ipic
---

# 1 半透明边框

## 说明

**方案**：采用 `rgba()` 或者 `hsla()`,为边框设置半透明色。

```css
.bad {
  border: 10px solid hsla(0, 20%, 60%, .5);
  background: black;
}
```



**缺陷：**如果同时设置了 background-color，就会出现问题。因为默认情况下背景会延伸到边框所在的区域下层。



**终极方案**

从[背景与边框](http://w3.org/TR/css3-background)开始，我们可以通过 `background-clip` 属性来调整上述默认行为所带来的不便／

```
.good {
  border: 10px solid hsla(0, 20%, 60%, .5);
  background: black;
  background-clip: padding-box; /* 默认 border-box */
}
```



## 示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.box {
			height: 150px;
			width: 150px;
			color: white;
		}
		.good {
			border: 10px solid hsla(0, 20%, 60%, .5);
			background: black;
			background-clip: padding-box;
		}
		.bad {
			border: 10px solid hsla(0, 20%, 60%, .5);
			background: black;
		}
	</style>
</head>
<body>
	<div class="box bad">
		bad
	</div>
	<div class="box good">
		good
	</div>
</body>
</html>
```

![4E91B9E7-0BB0-4B03-B32E-91ED14FBCDFE](/var/folders/q4/q5g0qg7n3yv6tylnbzmcltk80000gn/T/abnerworks.Typora/4E91B9E7-0BB0-4B03-B32E-91ED14FBCDFE.png)



# 2 多重边框

