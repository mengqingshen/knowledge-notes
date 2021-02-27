---
title: 第 7 章 Flutter入门：Flutter 必备基础
categories:
    - Flutter从入门到进阶_实战携程网App
tag:
    - Flutter
---

## 1 自测小作业（带着5个问题去学习）

1. 如何自定义AppBar？
2. Scaffold都有哪些常见的用法？
3. Scaffold+PageView如何跳转到指定tab？
4. NotificationListener除了可以用来监听列表滚动之外，还可以用来做什么？
5. 列表滚动除了实现导航栏的渐变效果之外，还可以实现哪些有意思的效果？

## 2 APP首页框架搭建-Scaffold与PageView【搭了个框架】 

### APP首页框架搭建

- 实现首页导航需要哪些材料？
- 什么是Scaffold widget？
- 什么是PageView？
- 实现首页导航

### 实现首页导航需要哪些材料?

- Scaffold
  - BottomNavigationBar
- PageView
  - PageController

### 什么是Scaffold widget？

`Scaffold`是一个实现了基本的`material design`的布局结构。

```dart
class Scaffold extends StatefulWidget {
  /// Creates a visual scaffold for material design widgets.
  const Scaffold({
    Key key,
    this.appBar,
    this.body,
    this.floatingActionButton,
    this.floatingActionButtonLocation,
    this.floatingActionButtonAnimator,
    this.persistentFooterButtons,
    this.drawer,
    this.endDrawer,
    this.bottomNavigationBar,
    this.bottomSheet,
    this.backgroundColor,
    this.resizeToAvoidBottomPadding = true,
    this.primary = true,
  }) : assert(primary != null), super(key: key);
...

```

#### 顶部导航

![Tabbed AppBar](http://www.devio.org/io/flutter_app/img/blog/tabbed_app_bar_small.png)

```dart
import 'package:flutter/material.dart';

class TabbedAppBarSample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: DefaultTabController(
        length: choices.length,
        child: Scaffold(
          appBar: AppBar(
            title: const Text('Tabbed AppBar'),
            bottom: TabBar(
              isScrollable: true,
              tabs: choices.map((Choice choice) {
                return Tab(
                  text: choice.title,
                  icon: Icon(choice.icon),
                );
              }).toList(),
            ),
          ),
          body: TabBarView(
            children: choices.map((Choice choice) {
              return Padding(
                padding: const EdgeInsets.all(16.0),
                child: ChoiceCard(choice: choice),
              );
            }).toList(),
          ),
        ),
      ),
    );
  }
}

class Choice {
  const Choice({this.title, this.icon});

  final String title;
  final IconData icon;
}

const List<Choice> choices = const <Choice>[
  const Choice(title: 'CAR', icon: Icons.directions_car),
  const Choice(title: 'BICYCLE', icon: Icons.directions_bike),
  const Choice(title: 'BOAT', icon: Icons.directions_boat),
  const Choice(title: 'BUS', icon: Icons.directions_bus),
  const Choice(title: 'TRAIN', icon: Icons.directions_railway),
  const Choice(title: 'WALK', icon: Icons.directions_walk),
];

class ChoiceCard extends StatelessWidget {
  const ChoiceCard({Key key, this.choice}) : super(key: key);

  final Choice choice;

  @override
  Widget build(BuildContext context) {
    final TextStyle textStyle = Theme.of(context).textTheme.display1;
    return Card(
      color: Colors.white,
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Icon(choice.icon, size: 128.0, color: textStyle.color),
            Text(choice.title, style: textStyle),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(TabbedAppBarSample());
}
```

#### 底部导航菜单

![bottom_tabbar](http://www.devio.org/io/flutter_app/img/blog/bottom_tabbar.png)

```dart
import 'package:flutter/material.dart';
import 'package:flutter_app/pages/home_page.dart';
import 'package:flutter_app/pages/my_page.dart';
import 'package:flutter_app/pages/search_page.dart';
import 'package:flutter_app/pages/travel_page.dart';

class TabNavigator extends StatefulWidget {
  @override
  _TabNavigatorState createState() => _TabNavigatorState();
}

class _TabNavigatorState extends State<TabNavigator>
    with SingleTickerProviderStateMixin {
  final _defaultColor = Colors.grey;
  final _activeColor = Colors.blue;
  int _currentIndex = 0;
  var _controller = PageController(
    initialPage: 0,
  );

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _controller,
        children: <Widget>[HomePage(), SearchPage(), TravelPage(), MyPage()],
        physics: NeverScrollableScrollPhysics(),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          _controller.jumpToPage(index);
          setState(() {
            _currentIndex = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
              color: _defaultColor,
            ),
            activeIcon: Icon(
              Icons.home,
              color: _activeColor,
            ),
            title: Text(
              '首页',
              style: TextStyle(
                  color: _currentIndex != 0 ? _defaultColor : _activeColor),
            ),
          ),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.search,
                color: _defaultColor,
              ),
              activeIcon: Icon(
                Icons.search,
                color: _activeColor,
              ),
              title: Text(
                '搜索',
                style: TextStyle(
                    color: _currentIndex != 1 ? _defaultColor : _activeColor),
              )),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.camera_alt,
                color: _defaultColor,
              ),
              activeIcon: Icon(
                Icons.camera_alt,
                color: _activeColor,
              ),
              title: Text(
                '旅拍',
                style: TextStyle(
                    color: _currentIndex != 2 ? _defaultColor : _activeColor),
              )),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.account_circle,
                color: _defaultColor,
              ),
              activeIcon: Icon(
                Icons.account_circle,
                color: _activeColor,
              ),
              title: Text(
                '我的',
                style: TextStyle(
                    color: _currentIndex != 3 ? _defaultColor : _activeColor),
              )),
        ],
      ),
    );
  }
}
```

#### 侧拉栏菜单

![drawer](http://www.devio.org/io/flutter_app/img/blog/drawer.png)

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  final appTitle = 'Drawer Demo';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appTitle,
      home: MyHomePage(title: appTitle),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(child: Text('My Page!')),
      drawer: Drawer(
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the Drawer if there isn't enough vertical
        // space to fit everything.
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              child: Text('Drawer Header'),
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
            ),
            ListTile(
              title: Text('Item 1'),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: Text('Item 2'),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

### 什么是PageView？

`PageView`是一个可以完成页面之间滚动的widget。

```dart
class PageView extends StatefulWidget {
   PageView({
    Key key,
    this.scrollDirection = Axis.horizontal, //滚动的方向，支持水平和垂直两个方向
    this.reverse = false, //是否反方向滚动
    PageController controller, //PageView的控制类
    this.physics, //手势滚动逻辑，支持不滚动，总是滚动，与滚动到边缘时是否有bounce
    this.pageSnapping = true,//设置为false以禁用页面捕捉，对自定义滚动行为很有用。
    this.onPageChanged,//页面切换时调用
    List<Widget> children = const <Widget>[],
  }) : controller = controller ?? _defaultPageController,
       childrenDelegate = SliverChildListDelegate(children),
       super(key: key);
...
```

## 3 APP首页框架搭建-项目实践【搭了个框架】

<img src="http://cdn.mengqingshen.com/2021-02-17-111844.png" alt="image-20210217191844646" style="zoom:20%;" />

+ navigator/tab_navigator.dart

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test2/pages/home_page.dart';
import 'package:flutter_test2/pages/my_page.dart';
import 'package:flutter_test2/pages/search_page.dart';
import 'package:flutter_test2/pages/travel_page.dart';

class TabNavigator extends StatefulWidget {
  @override
  _TabNavigatorState createState() => _TabNavigatorState();
}

class _TabNavigatorState extends State<TabNavigator> {
  final _defaultColor = Colors.grey;

  final _activeColor = Colors.blue;

  int _currentIndex = 0;

  final PageController _controller = PageController(
    initialPage: 0,
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      /// 页面集合
      body: PageView(
        controller: _controller,
        children: <Widget>[
          HomePage(),
          SearchPage(),
          TravelPage(),
          MyPage()
        ],
      ),
      /// 底部导航入口（和页面集合一一对应）
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentIndex,
        onTap: (index) {
          /// 跳转到对应页面
          _controller.jumpToPage(index);
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
              color: _defaultColor,
            ),
            activeIcon: Icon(
              Icons.home,
              color: _activeColor,
            ),
            label: '首页',
            // title: Text(, style: TextStyle(
            //   color: _currentIndex != 0 ? _defaultColor : _activeColor,
            // )),
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.search,
              color: _defaultColor,
            ),
            activeIcon: Icon(
              Icons.search,
              color: _activeColor,
            ),
            label: '搜索',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.camera,
              color: _defaultColor,
            ),
            activeIcon: Icon(
              Icons.camera,
              color: _activeColor,
            ),
            label: '旅拍',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.account_circle,
              color: _defaultColor,
            ),
            activeIcon: Icon(
              Icons.account_circle,
              color: _activeColor,
            ),
            label: '我的',
          ),
        ],
      ),
    );
  }
}
```

## 4 轮播图Banner功能开发【使用轮子】

<img src="http://cdn.mengqingshen.com/2021-02-17-112017.png" alt="image-20210217192017209" style="zoom:20%;" />

Step 1：安装插件 `flutter_swiper`

```yaml
dependencies:
  flutter_swiper: ^1.1.6
```

Step 2：home_page.dart

```dart
import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';


class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List _imageUrls = [
    'http://cdn.mengqingshen.com/2021-02-12-165606.png',
    'http://cdn.mengqingshen.com/2021-02-12-180833.png',
    'http://cdn.mengqingshen.com/2021-02-12-184831.png'
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        height: 160,
        child: Swiper(
          itemCount: _imageUrls.length,
          autoplay: true,
          itemBuilder: (BuildContext context, int index) {
            return Image.network(
              _imageUrls[index],
              fit: BoxFit.fill,
            );
          },
          pagination: SwiperPagination(),
        )
      ),
    );
  }
}

```

## 5 自定义AppBar实现滚动渐变【另起炉灶】

<img src="http://cdn.mengqingshen.com/2021-02-17-133309.png" alt="image-20210217213308841" style="zoom:25%;" />

+ 通过 `MediaQuery.removePadding` 移除 ListView 顶部针对安全区设置的 `padding`
+ 设置自定义的吸顶 bar，因为 利用 Stack 设置吸顶效果（类似 html fixed 效果）
+ 利用 NotificationListener 监听滚动，注意需要过滤掉非滚动事件以及非目标元素的滚动，且需要处理边界情况

```dart
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

/// 滚动到 100 位置的时候不再透明
const APPBAR_SCROLL_OFFSET = 100;

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  /// 轮播图片
  List _imageUrls = [
    'http://cdn.mengqingshen.com/2021-02-12-165606.png',
    'http://cdn.mengqingshen.com/2021-02-12-180833.png',
    'http://cdn.mengqingshen.com/2021-02-12-184831.png'
  ];

  /// 透明度
  double appBarAlpha = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          MediaQuery.removePadding(
            removeTop: true,
            context: context,
            child: NotificationListener(
              onNotification: (scrollNotification) {
                /// 滚动且是列表滚动(ListView 在最外面，depth 为 0)
                if (scrollNotification is ScrollUpdateNotification && scrollNotification.depth == 0) {
                  _onScroll(scrollNotification.metrics.pixels);
                  return true;
                }
                return false;
              },
              child: ListView(
                children: [
                  Container(
                      height: 160,
                      child: Swiper(
                        itemCount: _imageUrls.length,
                        autoplay: true,
                        itemBuilder: (BuildContext context, int index) {
                          return Image.network(
                            _imageUrls[index],
                            fit: BoxFit.fill,
                          );
                        },
                        pagination: SwiperPagination(),
                      )
                  ),
                  Container(
                    height: 800,
                    child: ListTile(title: Text('啊哈'),),
                  )
                ],
              ),
            )
          ),
          Opacity(
            opacity: appBarAlpha,
            child: Container(
              height: 80,
              decoration: BoxDecoration(color: Colors.white),
              child: Center(
                child: Padding(
                  padding: EdgeInsets.only(top: 20),
                  child: Text('首页'),
                ),
              ),
            ),
          )
        ],

      )
    );
  }

  _onScroll(offset) {
    double alpha = offset / APPBAR_SCROLL_OFFSET;
    if (alpha < 0) {
      alpha = 0;
    } else if (alpha > 1) {
      alpha = 1;
    }
    setState(() {
      appBarAlpha = alpha;
    });
    print(appBarAlpha);
  }
}

```

## 6 小节（略）

