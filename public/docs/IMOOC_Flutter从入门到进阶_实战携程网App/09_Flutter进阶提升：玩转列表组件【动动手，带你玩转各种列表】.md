---
title: 第 9 章 Flutter进阶提升：玩转列表组件【动动手，带你玩转各种列表】
categories:
    - Flutter从入门到进阶_实战携程网App
tag:
    - Flutter
---

## 1 自测小作业 （带着5个问题去学习）

1. 如何自定义一个LoadMore widget？
2. 使用ListView实现水平滚动的列表有哪些需要注意的点？
3. 如何自定义ExpansionTile的标题样式？
4. 如何设置GridView每行显示多少列？
5. 如何为列表添加下拉刷新与上拉加载更多的功能？

## 2 基于ListView实现水平和垂直方式滚动的列表【边学边做】

[【重要】基于ListView实现水平和垂直方式滚动的列表-文档和源码](https://coding.imooc.com/learn/questiondetail/134653.html)

<img src="http://cdn.mengqingshen.com/2021-02-24-132832.png" alt="image-20210224212831541" style="zoom:25%;" />

+ ListView

```dart
import 'package:flutter/material.dart';
const CITY_NAMES = [ '北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨' ];

class TravelPage extends StatefulWidget {
  @override
  _TravelPageState createState() => _TravelPageState();
}

class _TravelPageState extends State<TravelPage> {
  @override
  Widget build(BuildContext context) {
    final title = 'Basic List';
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: ListView(
        children: _buildList(),
      ),
    );
  }

  List<Widget> _buildList() {
    return CITY_NAMES.map((city) => _item(city)).toList();
  }

  Widget _item(String city) {
    return Container(
      height: 80,
      margin: EdgeInsets.only(bottom: 5),
      alignment: Alignment.center,
      decoration: BoxDecoration(color: Colors.teal),
      child: Text(
        city,
        style: TextStyle(color: Colors.white, fontSize: 20),
      ),
    );
  }
}
```

+ ListView (scrollDirection: Axis.horizontal)
+ 如果要给 ListView 设置高度，需要在 ListView 外部容器设置

<img src="http://cdn.mengqingshen.com/2021-02-24-133223.png" alt="image-20210224213222589" style="zoom:25%;" />

```dart
import 'package:flutter/material.dart';

const CITY_NAMES = [ '北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨' ];

class MyPage extends StatefulWidget {
  @override
  _MyPageState createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  @override
  Widget build(BuildContext context) {
    final title = '水平';
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Container(
        height: 200, /// 设置外部容器的高度，就能约束 ListView 每个元素的高度
        child: ListView(
          scrollDirection: Axis.horizontal, /// 水平滚动
          children: _buildList(),
        ),
      ),
    );
  }

  List<Widget> _buildList() {
    return CITY_NAMES.map((city) => _item(city)).toList();
  }

  Widget _item(String city) {
    return Container(
      width: 160,
      margin: EdgeInsets.only(right: 5),
      alignment: Alignment.center,
      decoration: BoxDecoration(color: Colors.teal),
      child: Text(
        city,
        style: TextStyle(color: Colors.white, fontSize: 20),
      ),
    );
  }
}

```

## 3 基于ExpansionTile实现可展开的列表【列表还可以这样做】

[基于ExpansionTile实现可展开的列表](https://coding.imooc.com/learn/questiondetail/134654.html)

<img src="http://cdn.mengqingshen.com/2021-02-24-165118.png" alt="image-20210225005117672" style="zoom:25%;" />

+ ExpansionTile
+ FractionallySizedBox

```dart
import 'package:flutter/material.dart';

const CITY_NAMES = {
  '北京': ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '顺义区'],
  '上海': ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '闸北区', '虹口区'],
  '广州': ['越秀', '海珠', '荔湾', '天河', '白云', '黄埔', '南沙', '番禺'],
  '深圳': ['南山', '福田', '罗湖', '盐田', '龙岗', '宝安', '龙华'],
  '杭州': ['上城区', '下城区', '江干区', '拱墅区', '西湖区', '滨江区'],
  '苏州': ['姑苏区', '吴中区', '相城区', '高新区', '虎丘区', '工业园区', '吴江区']
};

class MyPage extends StatefulWidget {
  @override
  _MyPageState createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  @override
  Widget build(BuildContext context) {
    final title = '可折叠的列表';
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Container(
        child: ListView(
          children: _buildList(),
        ),
      ),
    );
  }

  List<Widget> _buildList() {
    List<Widget> widgets = [];
    CITY_NAMES.keys.forEach((key) {
      widgets.add(_item(key, CITY_NAMES[key]));
    });
    return widgets;
  }

  Widget _item(String city, List<String> subCities) {
    /// 用 ExpansionTile 实现可折叠
    return ExpansionTile(
      title: Text(
        city,
        style: TextStyle(color: Colors.black54, fontSize: 20),
      ),
      children: subCities.map((subCity) => _buildSub(subCity)).toList(),
    );
  }

  Widget _buildSub(String subCity) {
    /// 可以自动占满一行的元素
    return FractionallySizedBox(
        widthFactor: 1,
        child: Container(
          height: 50,
          margin: EdgeInsets.only(bottom: 5),
          decoration: BoxDecoration(color: Colors.lightBlueAccent),
          child: Text(subCity),
        ));
  }
}
```



## 4 基于GridView实现网格布局

[基于GridView实现网格布局](https://coding.imooc.com/learn/questiondetail/134655.html)

<img src="http://cdn.mengqingshen.com/2021-02-24-170131.png" alt="image-20210225010131388" style="zoom:25%;" />

+ GridView.count

```dart
import 'package:flutter/material.dart';

const CITY_NAMES = [ '北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨' ];

class MyPage extends StatefulWidget {
  @override
  _MyPageState createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  @override
  Widget build(BuildContext context) {
    final title = '网格布局';
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: GridView.count(
        crossAxisCount: 2,
        children: _buildList(),
      ),
    );
  }

  List<Widget> _buildList() {
    return CITY_NAMES.map((city) => _item(city)).toList();
  }

  Widget _item(String city) {
    return Container(
      height: 80,
      margin: EdgeInsets.only(bottom: 5),
      alignment: Alignment.center,
      decoration: BoxDecoration(color: Colors.teal),
      child: Text(
        city,
        style: TextStyle(color: Colors.white, fontSize: 20),
      ),
    );
  }
}
```

## 5 高级功能列表下拉刷新与上拉加载更多功能实现【列表拓展技能】

[高级功能列表下拉刷新与上拉加载更多功能实现](https://coding.imooc.com/learn/questiondetail/134656.html)

### 下拉刷新

<img src="http://cdn.mengqingshen.com/2021-02-25-011425.png" alt="image-20210225091424615" style="zoom:25%;" />

+ 下拉刷新：RefreshIndicator
+ 下拉加载更多：ScrollController

```dart
import 'package:flutter/material.dart';
List<String> cityNames = [ '北京', '上海', '广州', '深圳', '杭州', '苏州', '成都', '武汉', '郑州', '洛阳', '厦门', '青岛', '拉萨' ];

class MyPage extends StatefulWidget {
  @override
  _MyPageState createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  /// 列表滚动控制器实例（给 ListView 用）
  ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    /// 页面初始化的时候给列表滚动控制器设置监听
    _scrollController.addListener(() {
      /// 如果滚动到最下方
      if (_scrollController.position.pixels ==
          _scrollController.position.maxScrollExtent) {
        _loadData();
      }
    });

    super.initState();
  }

  @override
  void dispose() {
    /// 注意：页面退出后把监听撤销
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final title = 'Basic List';
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      /// 用 RefreshIndicator 使 ListView 具备刷新效果
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        child: ListView(
          controller: _scrollController, /// 将列表滚动控制器关联到 ListView
          children: _buildList(),
        ),
      ),
    );
  }

  /// 模拟加载更多
  _loadData() async {
    await Future.delayed(Duration(milliseconds: 200));
    setState(() {
      List<String> list = List<String>.from(cityNames);
      list.addAll(cityNames);
      cityNames = list;
    });
  }

  /// 模拟刷新数据
  Future<Null> _handleRefresh() async {
    await Future.delayed(Duration(seconds: 2));
    setState(() {
      cityNames = cityNames.reversed.toList();
    });
    return null;
  }

  List<Widget> _buildList() {
    return cityNames.map((city) => _item(city)).toList();
  }

  Widget _item(String city) {
    return Container(
      height: 80,
      margin: EdgeInsets.only(bottom: 5),
      alignment: Alignment.center,
      decoration: BoxDecoration(color: Colors.teal),
      child: Text(
        city,
        style: TextStyle(color: Colors.white, fontSize: 20),
      ),
    );
  }
}

```

## 6 本章小节（略）

