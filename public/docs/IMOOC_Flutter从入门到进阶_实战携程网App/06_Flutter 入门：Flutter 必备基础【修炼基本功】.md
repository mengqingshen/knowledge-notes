---
来自深渊 title: 第 6 章 Flutter入门：Flutter 必备基础
categories:
    - Flutter从入门到进阶_实战携程网App
tag:
    - Flutter
---

## 1. 自测小作业（带着 9 个问题去学习）

**想对你说的话：学习本章前，如果已有相关基础，可以先试着回答一下问题，当作对自己的一个小测验。如果还没有相关基础，也可以先浏览一遍问题，然后再带着问题，有目标的去学习本章内容，等学习完后，再回过头来尝试回答，作为对本章重难点内容的梳理和学习效果测验。**

**- 作业1：学习过Flutter官方实例项目你都有哪些收获？**

**- 作业2：如何为图片设置placeholder？**

**- 作业3：如何加载不同分辨率的项目中的图片？**

**- 作业4：如何加载手机存储中的图片？**

**- 作业5：实现一个动画都有哪些方式？**

**- 作业6：简述Hero动画都有哪些应用场景？**

**- 作业7：你从课程中Get到了哪些Flutter调试技巧？**

**- 作业8：如何调试Flutter项目中的Android代码？**

**- 作业9：如何调试Flutter项目中的iOS代码？**

## 2. 学习构建 Flutter 示例项目【他山之石可以功玉】

+ 官方实例项目：https://github.com/flutter/flutter/tree/master/examples（包含在 Flutter SDK 中，`~/Programs/flutter/examples`）
+ https://github.com/flutter/samples
+ https://github.com/nisrulz/flutter-examples
+ https://github.com/iampawan/FlutterExampleApps
+ https://github.com/flutter/gallery

## 3 图片控件开发详解-1【技能储备】

> 在线课件：https://coding.imooc.com/learn/questiondetail/134875.html

![image-20210124014058470](http://cdn.mengqingshen.com/2021-01-23-174059.png)

### 如何加载网络图片？

```dart
Image.network(
  'http://www.devio.org/img/avatar.png',
)
```

### 如何加载静态图片？

Step1: pubspec.yaml

```dart
assets:
 - images/my_icon.png
```

Step2

```dart
/// way 1
Image(
  height: 26,
  width: 26,
  image: AssetImage('images/my_icon.png'),
)
  
/// way 2
Image.asset('images/my_icon.png',
	width: 26,
	height: 26,
)
```

### 如何加载本地图片?

#### 完整路径

```dart
import 'dart:io';
Image.file(File('/sdcard/Download/Stack.png')),
```

#### 相对路径

Step1: pubspec.yaml

```yaml
dependencies:
	path_provider: ^1.6.27
```

Step2: 利用 getExternalStorageDirectory 获取存储卡前缀路径

```dart
import 'dart:io';
import 'package:path_provider/path_provider.dart';

// Image.file(File('/sdcard/Download/Stack.png')),
FutureBuilder(future: _getLocalFile("Download/Stack.png"),
  builder:  (BuildContext context, AsyncSnapshot<File> snapshot) {
    return snapshot.data != null ? Image.file(snapshot.data) : Container();
  })
)
// 获取SDCard的路径
 Future<File> _getLocalFile(String filename) async {
    String dir = (await getExternalStorageDirectory()).path;
    File f = new File('$dir/$filename');
    return f;
 }
```

## 4 图片控件开发详解-2【技能储备】

### 如何设置 placeholder？

Step1: pubspec.yaml（安装 [transparent_image](https://pub.dartlang.org/packages/transparent_image)插件 ）

该插件实现加载过程中，图片渐变显现的过程，通过这种方式实现对图片的占为

```yaml
dependencies:
	transparent_image: ^1.0.0
```

Step2: 使用 `kTransparentImage` 和 `FadeInImage.memoryNetwork` 这两个 API 实现渐变效果

```dart
import 'package:flutter/material.dart';
import 'package:transparent_image/transparent_image.dart';

void main() {
  runApp(ImagePage());
}

/// 图片控件开发详解
class ImagePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = "渐变 placeholder 效果";
    return new MaterialApp(
      title: '图片控件开发详解',
      theme: new ThemeData.fallback(),
      home: Scaffold(
        appBar: AppBar(title: Text(title)),
        body: Stack(
          children: [
            Center(
              child: CircularProgressIndicator(),
            ),
            Center(
              child: FadeInImage.memoryNetwork(placeholder: kTransparentImage, image: 'http://www.devio.org/img/avatar.png'),
            )
          ],
        )
      )
    );
  }
}
```

### 如何从本地资源加载图片？

Step1: pubspec.yaml

```dart
 flutter:
   assets:
	   - assets/loading.gif
```

Step2: `FadeInImage.assetNetwork`

```dart
FadeInImage.assetNetwork(
  placeholder: 'assets/loading.gif',
  image: 'http://www.devio.org/img/avatar.png',
);
```

### 如何配置图片缓存？

> 图片加载后会被放入缓存中，如果断网，下一次会从缓存中加载出来。

Step1: 安装插件 [cached_network_image](https://pub.dev/packages/cached_network_image)

```yaml
dependencies:
	cached_network_image: ^2.5.0
```

Step2：`CachedNetworkImage`

```yaml
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

void main() {
  runApp(ImagePage());
}

/// 图片控件开发详解
class ImagePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = "图片缓存";
    return new MaterialApp(
      title: '图片缓存',
      theme: new ThemeData.fallback(),
      home: Scaffold(
        appBar: AppBar(title: Text(title)),
        body: Center(
          child: CachedNetworkImage(
            placeholder: (context, url) => CircularProgressIndicator(),
            imageUrl: 'https://picsum.photos/250?image=9'
          ),
        ),
      ),
    );
  }
}
```

### 如何加载 Icon?

#### 官方图标（material_fonts，内置插件）

`Icon`

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(new MaterialApp(home: new MyApp()));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Icons"),
      ),
      body: new Center(
        child: new Icon(Icons.android,size: 100.0),
      ),
        );
  }
}
```

#### 自定义图标

Step1: 把自定义图标制作成字体文件 `fonts/devio.ttf`

Step2: pubspec.yaml

```yaml
fonts:
	- family: devio
	  fonts:
	    - asset: fonts/devio.ttf
```

Step3: `Icon` `IconData`

```dart
/// const IconData(
///  this.codePoint,//必填参数，fonticon对应的16进制Unicode {
///  this.fontFamily,//字体库系列
///  this.fontPackage,//字体在那个包中，不填仅在自己程序包中查找
///  this.matchTextDirection: false,图标是否按照图标绘制方向显示
/// });
child: new Icon(new IconData(0xf5566,fontFamily: "devio"),size: 100.0,color: Colors.blueAccent,)
```

## 5 动画Animation开发指南-动画基础类【理论熏陶】

![](http://assets.processon.com/chart_image/60116730e0b34d1f2ccd6dac.png)

> [在线课件地址](https://git.imooc.com/coding-321/flutter_trip/src/master/doc/动画Animation开发指南.md)

- [Animation](https://docs.flutter.io/flutter/animation/Animation-class.html)：是Flutter动画库中的一个核心类，它生成指导动画的值；
- [CurvedAnimation](https://docs.flutter.io/flutter/animation/CurvedAnimation-class.html)：Animation的一个子类，将过程抽象为一个非线性曲线；
- [AnimationController](https://docs.flutter.io/flutter/animation/AnimationController-class.html)：Animation的一个子类，用来管理Animation；
- [Tween](https://docs.flutter.io/flutter/animation/Tween-class.html)：在正在执行动画的对象所使用的数据范围之间生成值。例如，Tween可生成从红到蓝之间的色值，或者从0到255；

## 6 动画Animation开发指南-AnimatedWidget与AnimatedBuilder-1【跟着做】

> [在线课件地址](https://git.imooc.com/coding-321/flutter_trip/src/master/doc/动画Animation开发指南.md)

+ `AnimationController`
+ `Tween`
+ `..` 操作符（先赋值再执行，执行后的返回值不是最终赋的值）

```dart
import 'package:flutter/material.dart';

class LogoPage extends StatefulWidget {
  _LogoAppState createState() => _LogoAppState();
}

/// 混合 SingleTickerProviderStateMixin 后， 当前页面不活跃的时候会暂停动画
class _LogoAppState extends State<LogoPage> with SingleTickerProviderStateMixin {
  final textStyle = TextStyle(
    fontSize: 22,
    color: Colors.white,
    decoration: TextDecoration.none,
    inherit: false
  );

  Animation<double> animation;
  AnimationController controller;
  AnimationStatus animationStatus;
  double animationValue;

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    // 1. 初始化控制器（动画时常 2s）
    controller = AnimationController(vsync: this, duration: Duration(seconds: 2));

    // 2. 用控制器初始化 Tween 类型动画
    animation = Tween<double>(begin: 0, end: 300).animate(controller)
    /// 监听动画进度(动画每变化以下都会调用)
    ..addListener(() {
      setState(() {
        animationValue = animation.value;
      });
    })
    /// 监听动画状态变化
    ..addStatusListener((AnimationStatus state){
      setState(() {
        animationStatus = state;
      });
    });
  }

  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 50),
      child: Column(
        children: [
          GestureDetector(
            onTap: () {
              // 回到初始位置重新播放动画
              controller.reset();
              controller.forward();
            },
            child: Text('Start', style: textStyle),
          ),
          Text('State:' + animationStatus.toString(), style: textStyle),
          Text('Value:' + animationValue.toString(), style: textStyle),
          Container(
            height: animation.value,
            width: animation.value,
            child: FlutterLogo(),
          )
        ],
      ),
    );
  }
}
```

## 7 动画Animation开发指南-AnimatedWidget与AnimatedBuilder-2【跟着做】

[在线课件地址](https://git.imooc.com/coding-321/flutter_trip/src/master/doc/动画Animation开发指南.md)

+ AnimatedWidget

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LogoPage2 extends StatefulWidget {
  _LogoAppState createState() => _LogoAppState();
}

/// 1. 定义动画主体（继承 AnimatedWidget，能根据动画变化自动刷新）
class _AnimatedWidgetLogo extends AnimatedWidget {
  _AnimatedWidgetLogo({ Key key, Animation<double> animation})
    : super(key: key, listenable: animation);

  @override
  Widget build(BuildContext context) {
    final Animation<double> animation = listenable;
    return Center(
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 10),
        height: animation.value,
        width: animation.value,
        child: FlutterLogo(),
      )
    );
  }
}

// 混合 SingleTickerProviderStateMixin 后， 当前页面不活跃的时候会暂停动画
class _LogoAppState extends State<LogoPage2> with SingleTickerProviderStateMixin {
  final textStyle = TextStyle(
      fontSize: 22,
      color: Colors.white,
      decoration: TextDecoration.none,
      inherit: false
  );

  Animation<double> animation;
  AnimationController controller;

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    /// 2. 定义动画过程
    // 1. 初始化控制器（动画时常 2s）
    controller = AnimationController(vsync: this, duration: Duration(seconds: 2));

    // 2. 用控制器初始化 Tween 类型动画
    animation = Tween<double>(begin: 0, end: 300).animate(controller);

    // 3. 执行动画
    controller.forward();
  }

  Widget build(BuildContext context) {
    /// 3. 动画主体和动画过程结合
    return _AnimatedWidgetLogo(animation: animation,);
  }
}
```

## 8 动画Animation开发指南-AnimatedWidget与AnimatedBuilder-3【跟着做】

[在线课件地址](https://git.imooc.com/coding-321/flutter_trip/src/master/doc/动画Animation开发指南.md)

+ 利用 AnimatedBuilder 封装动画过程，解耦动画主体和动画行为

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LogoPage3 extends StatefulWidget {
  _LogoAppState createState() => _LogoAppState();
}

/// 1. 定义动画主体
class _LogoWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Container(
    margin: EdgeInsets.symmetric(vertical: 10),
    child: FlutterLogo(),
  );
}

/// 2. 组装动画主体和动画行为(利用 AnimatedBuilder)
class _GrowTransition extends StatelessWidget {
  final Widget child;
  final Animation<double> animation;

  _GrowTransition({ this.child, this.animation });

  Widget build(BuildContext context) => Center(
    child: AnimatedBuilder(
      animation: animation,
      builder: (context, child) => Container(
        height: animation.value,
        width: animation.value,
        child: child,
      ),
      child: child,
    ),
  );
}


/// 混合 SingleTickerProviderStateMixin 后， 当前页面不活跃的时候会暂停动画
class _LogoAppState extends State<LogoPage3> with SingleTickerProviderStateMixin {
  final textStyle = TextStyle(
      fontSize: 22,
      color: Colors.white,
      decoration: TextDecoration.none,
      inherit: false
  );

  Animation<double> animation;
  AnimationController controller;

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    // 1. 初始化控制器（动画时常 2s）
    controller = AnimationController(vsync: this, duration: Duration(seconds: 2));

    // 2. 用控制器初始化 Tween 类型动画
    animation = Tween<double>(begin: 0, end: 300).animate(controller);

    // 3. 执行动画
    controller.forward();
  }

  Widget build(BuildContext context) => _GrowTransition(
    child: _LogoWidget(),
    animation: animation,
  );
}
```

## 9 动画Animation开发指南-Hero动画-1

[Flutter Hero动画开发实用教程](http://www.imooc.com/article/285381)

+ Hero (两个 Hero 实例通过 tag 关联，tag 相同的 A - B 动画)
+ 修改默认动画延迟时间：package:flutter/scheduler.dart
+ const 将实例常量化

```dart
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' as sche;

/// 1. 定义要飞的组件
class _HeroPhoto extends StatelessWidget {
  final String photo;
  final VoidCallback onTap;
  final double width;

  const _HeroPhoto({ Key key, this.photo, this.onTap, this.width}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      child: Hero(
        tag: photo,
        child: Material(
          /// 背景透明的图片在两个页面中过渡更加自然
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            child: Image.network(photo, fit: BoxFit.contain,),
          ),
        ),
      ),
    );
  }
}

/// 2. 定义 A、B 两个页面
class _HeroAnimation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    sche.timeDilation = 10.0; // 动画速度
    return Scaffold(
      appBar: AppBar(
        title: const Text('A 页面'), /// 小技巧：将字符串编译为常量
      ),
      body: Center(
        child: _HeroPhoto(
          photo: 'https://picsum.photos/250?image=9',
          width: 300,
          onTap: () {
            Navigator.of(context).push(MaterialPageRoute<void>(
              builder: (BuildContext context) {
                return Scaffold(
                  appBar: AppBar(
                    title: const Text('B 页面'),
                  ),
                  body: Container(
                    color: Colors.lightBlueAccent,
                    padding: const EdgeInsets.all(16.0),
                    alignment: Alignment.topLeft,
                    child: _HeroPhoto(
                      photo: 'https://picsum.photos/250?image=9',
                      width: 100,
                      onTap: () {
                        /// 回到 A 页面
                        Navigator.of(context).pop();
                      },
                    ),
                  ),
                );
              }
            ));
          },
        ),
      ),
    );
  }
}

/// 3. 对外提供入口
class Hero1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: _HeroAnimation());
  }
}
```

## 10 动画Animation开发指南-Hero动画-2

+ ClipOval：制作剪切效果
+ Interval：差速器，描述具体动画速度变化
+ Hero：利用 createRectTween 配合 MaterialRectCenterArcTween 形成径向动画中外形变化

```dart
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart' as sche;
import 'dart:math' as math;

import 'package:flutter_test1/photo_app.dart';

/// 1. 定义要飞的组件
class _Photo extends StatelessWidget {
  final String photo;
  final VoidCallback onTap;

  const _Photo({ Key key, this.photo, this.onTap }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: Material(
        color: Theme.of(context).primaryColor.withOpacity(0.25),
          child: InkWell(
            onTap: onTap,
            child: LayoutBuilder(builder: (context, size) {
              return Image.network(
                photo,
                fit: BoxFit.contain,
              );
            },
          ),
        ),
      ),
    );
  }
}

/// 2. 要飞的组件外部框框形状
class _RadialExpansion extends StatelessWidget {
  final double maxRadius;
  final clipRectSize;
  final Widget child;

  _RadialExpansion({
    Key key,
    this.maxRadius,
    this.child,
  }) : clipRectSize = 2.0 * (maxRadius / math.sqrt2), super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipOval(
      child: Center(
        child: SizedBox(
          width: clipRectSize,
          height: clipRectSize,
          child: ClipRect(
            child: child,
          ),
        ),
      ),
    );
  }
}

class _RadialExpansionDemo extends StatelessWidget {
  // A 时的半径
  static const double kMinRadius = 32.0;

  // B 时的宽高
  static const double kMaxRadius = 128.0;

  // 差速器
  static const opacityCurve = const Interval(0.0, 0.75, curve: Curves.fastOutSlowIn);

  // A-B 之间过渡的形状变化效果（飞的过程中圆形和方形之间相互转化）
  static RectTween _createReactTween(Rect begin, Rect end) {
    return MaterialRectCenterArcTween(begin: begin, end: end);
  }

  /// B
  Widget _buildPage(BuildContext context, String imageName, String description) {
    return Container(
      color: Theme.of(context).canvasColor,
      child: Center(
        child: Card(
          elevation: 8,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                width: kMaxRadius * 2,
                height: kMaxRadius * 2,
                child: Hero(
                  tag: imageName, // 要飞的部分的唯一标识
                  child: _RadialExpansion(
                    maxRadius: kMaxRadius,
                    child: _Photo(
                      photo: imageName,
                      onTap: () {
                        Navigator.of(context).pop();
                      }
                    ),
                  ),
                ),
              ),
              Text(
                description,
                style: TextStyle(fontWeight: FontWeight.bold),
                textScaleFactor: 3.0,
              ),
              const SizedBox(height: 16,)
            ],
          ),
        ),
      ),
    );
  }

  /// A
  Widget _buildHero(BuildContext context, String imageName, String description) {
    return Container(
      width: kMinRadius * 2,
      height: kMinRadius * 2,
      child: Hero(
        createRectTween: _createReactTween, // tween 动画辅助函数
        tag: imageName, // 要飞的部分的唯一标识
        child: _RadialExpansion(
          maxRadius: kMaxRadius,
          child: _Photo(
            photo: imageName,
            onTap: () {
              Navigator.of(context).push(
                // PageRouteBuilder 生成一次性的路由
                PageRouteBuilder<void>(
                  pageBuilder: (BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation) {
                    return AnimatedBuilder(
                      animation: animation,
                      builder: (context, child) {
                        return Opacity(
                          opacity: opacityCurve.transform(animation.value), // 随动画进度表现淡入淡出的效果
                          child: _buildPage(context, imageName, description),
                        );
                      },
                    );
                  }
                )
              );
            },
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    sche.timeDilation = 5.0; // 动画速度
    return Scaffold(
      appBar: AppBar(
        title: const Text('径向页面'),
      ),
      body: Container(
        padding: EdgeInsets.all(32),
        alignment: FractionalOffset.bottomLeft,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _buildHero(context, 'https://raw.githubusercontent.com/flutter/website/master/examples/_animation/radial_Hero_animation/images/chair-alpha.png', 'Chair'),
            _buildHero(context, 'https://raw.githubusercontent.com/flutter/website/master/examples/_animation/radial_Hero_animation/images/binoculars-alpha.png', 'Binoculars'),
            _buildHero(context, 'https://raw.githubusercontent.com/flutter/website/master/examples/_animation/radial_Hero_animation/images/beachball-alpha.png', 'Beach ball'),
          ],
        ),
      ),
    );
  }
}


/// 3. 对外提供入口
class Hero2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: _RadialExpansionDemo());
  }
}
```



## 11 Flutter调试技巧【经验传授】

注意

+ 断点功能前置条件：1. 使用 Android Studio 或者 VSCode（依赖 Flutter 插件，能力较弱）；2. 通过 "debug" 模式启动
+ Flutter 调试有涉及 3 个方面代码：Dart 代码、Android 代码、iOS 代码

### 断点

+ Dart

![image-20210213000834231](http://cdn.mengqingshen.com/2021-02-12-160836.png)

+ Android：需要切换到 Android 项目模式
+ iOS：需要使用 Xcode 打开项目

### 设置表达式断点

![image-20210213022950213](http://cdn.mengqingshen.com/2021-02-12-182950.png)

### 利用断点查看变量值

3 种途径

![image-20210213024238028](http://cdn.mengqingshen.com/2021-02-12-184238.png)

### console

+ Dart

![image-20210213005410032](http://cdn.mengqingshen.com/2021-02-12-165410.png)

+ Java ：不需要切换 Android 项目模式

![image-20210213005605695](http://cdn.mengqingshen.com/2021-02-12-165606.png)

+ iOS

![image-20210213020832933](http://cdn.mengqingshen.com/2021-02-12-180833.png)

### 通过 Frames 回退

![image-20210213024830908](http://cdn.mengqingshen.com/2021-02-12-184831.png)

### 善用控制台

![image-20210213025917896](http://cdn.mengqingshen.com/2021-02-12-185918.png)

## 12 小节（略）

