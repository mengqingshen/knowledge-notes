---
title: 1 数据处理
categories:
  - 极客学院_ios高级

---


## 1.1	操作plist数据

### 1.1.1	plist数据介绍
>**课程说明：**本课讲解`plist`数据格式以及如何编辑`plist`文件。


### 1.1.2	plist数组解析
>**课程说明：**本课讲解如何解析plist数组。

*TestArr.plist*
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-16%20%E4%B8%8B%E5%8D%8811.46.38.png)

*ViewController.swift*

```swift
// 取出plist中的数据（数组）
let arr = NSArray(contentsOfURL: NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource("TestArr", ofType: "plist")!));

print(arr)
```

```bash
Optional((
    human,
    bear,
    elephant,
    wolf,
    monkey,
    tiger
))
```


### 1.1.3	plist字典解析
>**课程说明：**本课讲解如何解析`plist`字典。

*TestDic.plist*
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/1460822236961.png)
*ViewController.swift*

```swift
let dict = NSDictionary(contentsOfURL: NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource("TestDic", ofType: "plist")!));

print(dict)
```

```bash
Optional({
    event = film;
    members =     (
        me,
        lili,
        xiaoli
    );
    time = "2016\U5e744\U670816\U65e5\U5468\U516d\U4e0b\U534811:54";
})
```

## 1.2	CoreData

### SQLite
>**官网：**http://sqlite.org/
>![案例| 200x150](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_coredata.gif)

### 1.2.1	创建使用`CoreData`的项目
>**课程说明：**本课介绍`SQLite`以及如何创建一个使用`CoreData`的项目。
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-17%20%E4%B8%8B%E5%8D%883.32.25.png)

```swift
// 操作sqlite的上下文环境
let context = (UIApplication.sharedApplication().delegate as! AppDelegate).managedObjectContext
```

### 1.2.2	设计数据结构
>**课程说明：**本课介绍如何使用`Xcode`设计数据库的结构。
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-17%20%E4%B8%8B%E5%8D%883.40.34.png)


### 1.2.3	插入数据 
>**课程说明：**本课介绍如何插入一条数据。

#### 1.2.3.1	插入数据
*ViewController.swift*

```swift
import UIKit
import CoreData
class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
     
        // 1. 获取操作sqlite的上下文环境
        let context = (UIApplication.sharedApplication().delegate as! AppDelegate).managedObjectContext
        // 2. 为 Users 表插入一行数据
        // 创建一行（字段为默认值）
        let row:AnyObject = NSEntityDescription.insertNewObjectForEntityForName("Users", inManagedObjectContext:context)
        // 设置 name 字段
        row.setValue("jikexueyuan", forKey:"name")
        // 设置 age 字段
        row.setValue(10, forKey: "age")
        
        //3. 持久化
        do {
            try context.save()
        }
        catch {
            print("Error")
        }
    }
}
```

#### 1.2.3.2	查看`SQLite`文件地址
![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202016-04-17%20%E4%B8%8B%E5%8D%886.00.14.png)
*AppDelegate.swift*

```swift
import UIKit
import CoreData

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
	...
	 lazy var persistentStoreCoordinator: NSPersistentStoreCoordinator = {
        let coordinator = NSPersistentStoreCoordinator(managedObjectModel: self.managedObjectModel)
        let url = self.applicationDocumentsDirectory.URLByAppendingPathComponent("SingleViewCoreData.sqlite")
        print(url)
		...
     }()
	...
}
```

```bash
file:///Users/tonyearth/Library/Developer/CoreSimulator/Devices/1041D05D-4C13-45A9-BD8C-B209722B59F2/data/Containers/Data/Application/AA16281E-DE67-4A56-859C-2C96834101CE/Documents/SingleViewCoreData.sqlite
```

### 1.2.4	读取数据
>**课程说明：**本课讲解如何读取`SQLite`的数据。

*UserTableViewController.swift*

```swift
...
let f = NSFetchRequest(entityName: "Users")
do {
    try dataArr = context.executeFetchRequest(f)
    tableView.reloadData()
}
catch {
    print("数据查询失败")
}
...
```

### 1.2.5	更新数据
>**课程说明：**本课讲解如何更新数据。

*UserContentViewController.swift*

```swift
import UIKit
import CoreData

class UserContentViewController: UIViewController {

    @IBOutlet weak var tfName: UITextField!// 姓名
    @IBOutlet weak var tfAge: UITextField!// 年龄
    var data:NSManagedObject!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        tfName.text = data.valueForKey("name") as? String
        let age:AnyObject! = data.valueForKey("age")
        tfAge.text = "\(age)"
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // 点击提交按钮
    @IBAction func submitBtnPressed(sender: AnyObject) {
	    // 更新数据
        data.setValue(tfName.text, forKey: "name")
        data.setValue(Int(tfAge.text!), forKey: "age")
        do {
            try data.managedObjectContext?.save()
            dismissViewControllerAnimated(true, completion: nil)
        }
        catch {
            print("save failed")
        }
    }
    
    // 点击取消按钮
    @IBAction func cancelBtnPressed(sender: AnyObject) {
        dismissViewControllerAnimated(true, completion: nil)
    }
}
```

### 1.2.6	删除数据
>**课程说明：**本课讲解如何删除数据。

*UserTableViewController.swift*

```swift
import UIKit
import CoreData

class UserTableViewController: UITableViewController {
    // 存放数据库信息
    var dataArr:Array<AnyObject> = []
    // 数据库上下文
    var context:NSManagedObjectContext!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        context = (UIApplication.sharedApplication().delegate as! AppDelegate).managedObjectContext
        refreshData()
    }
	...
	
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        // 删除 table 中的一个cell
        if editingStyle == .Delete {
            // 删除数据
            context.deleteObject(dataArr[indexPath.row] as! NSManagedObject)
            // 持久化
            do {
                try context.save()
            }
            catch {
                print("删除数据失败")
            }
            refreshData()
        }
        // 向 table 中插入一条 cell
        else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
	...
}
```

## 1.3	操作 JSON 数据

### 1.3.1	JSON数据介绍
>**课程说明：**本课时讲解 `JSON` 格式数据的语法。

### 1.3.2	Swift 解析 JSON 数据
>**课程说明：**本课时讲解如何使用 `Swift` 语言解析 `JSON` 格式的数据。

```swift
do {
    // 从json文件中读取 json 格式数据
    let json:AnyObject? = try NSJSONSerialization.JSONObjectWithData(NSData(contentsOfURL: NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource("obj", ofType: "json")!))!, options: NSJSONReadingOptions())
    
    // 索引 json 内容
    if let lang:AnyObject = json?.objectForKey("language") {
        print(lang)
    }
}
catch {
    print("json 文件读取失败")
}
```

### 1.3.3	Swift 生成 JSON 数据
>**课程说明：**本课时讲解如何使用 `Swift` 语言生成`JSON` 格式数据。

```swift
// 字典
let dict = ["name":"lixiangguo", "age": "-1"];
do {
    // 将字典转化为 json 格式的NSData
    let jsonData = try NSJSONSerialization.dataWithJSONObject(dict, options: NSJSONWritingOptions())
    // 将 NSData 转换为 NSString
    let jsonStr  = NSString(data: jsonData, encoding: NSUTF8StringEncoding)
    print(jsonStr)
}
catch {
    print("字典解析为json格式字符串失败")
}
```

## 1.4	操作XML数据

### 1.4.1	XML格式数据介绍
>**课程说明：**本课介绍XML格式数据的结构以及如何编写XML文件

### 1.4.2	Swift解析XML格式的数据
>**课程说明：**本课介绍如何使用Swift语言解析`XML`格式的数据
>1. 引入资源：xml 文件
>2. 采纳协议：`NSXMLParserDelegate`
>3. 获取资源并解析（通过代理）

*testData.xml*
>**说明：**待解析的 xml 文件

```xml
<data>
    <person age="25">mengqingshen</person>
    <person age="25">yixiaoli</person>
    <person age="0.3">mengxiang</person>
    <a>
        <b>
            <c>Data</c>
        </b>
    </a>
</data>
```
*ViewController.swift*

```swift
import UIKit

class ViewController: UIViewController, NSXMLParserDelegate {
    // 当前解析出的节点
    var currentNodeName:String!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // 通过 xml 文件获取 NSXMLParser
        let parser = NSXMLParser(contentsOfURL: NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource("testData", ofType: "xml")!))
        // 设置代理
        parser?.delegate = self
        // 解析数据
        parser?.parse()
    }
    
    /**
     @ 采纳协议
     每解析到一个节点的开标签时调用一次
     */
    func parser(parser: NSXMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [String : String]) {
        currentNodeName = elementName
        
        // 打印 person 节点的 age 属性
        if elementName == "person" {
            if let age:AnyObject = attributeDict["age"] {
                print("age:\(age)")
            }
        }
    }
    
    /**
     @ 采纳协议
     每发现一个叶子节点包裹的字符串时调用一次
     */
    func parser(parser: NSXMLParser, foundCharacters string: String) {
        let str = string.stringByTrimmingCharactersInSet(NSCharacterSet.whitespaceAndNewlineCharacterSet())
        
        // 过滤掉空白符号(包括换行符)
        if str != "" {
            print("current node: \(currentNodeName), value:\(str)")
        }
    }
    
}
```

### 1.4.3	选择题实例
>**课程说明：**本课用一个实例演示如何在程序中使用`XML`格式的数据
>1. （工程）引入 xml 文件
>2. （storyboard）编辑界面
>3. （ViewController.swift）绑定控件和注册事件


## 1.5	iOS用户首选项数据

### 1.5.1	用户首选项数据说明
>**课程说明：**本课讲解iOS首选项数据的概念及用途
>**说明：**用户首选项数据适合以下场景
>1. 数据量小
>2. 键值对形式存储
>3. 保存到首选项的数据在app关闭后不会被清空

### 1.5.2	存储用户首选项数据
>**课程说明：**本课讲解如何存储用户首选项数据
>![Alt text|200x350](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_shouxuanxiang.gif)

*ViewController.swift*

```swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var textView: UITextView!// 输入框
    var ud:NSUserDefaults!
    // 保存
    @IBAction func btnSavePressed(sender: AnyObject) {
        // 保存到首选项
        ud.setObject(textView.text, forKey: "data")
        print("saved")
        // 创建提示框
        let alert:UIAlertController = UIAlertController(title: "成功",
            message: "成功保存到首选项",
            preferredStyle: .ActionSheet)
        let ok:UIAlertAction = UIAlertAction(title: "OK", style: UIAlertActionStyle.Cancel, handler: nil)
        alert.addAction(ok)
        
        // 弹出提示框
        self.presentViewController(alert, animated: true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // 读取首选项数据初始化界面
        ud = NSUserDefaults.standardUserDefaults()
        if let value:AnyObject = ud.objectForKey("data") {
            textView.text = value as! String
        }
        else {
            textView.text = "No value"
        }
    }
}
```

### 1.5.3	读取用户首选项数据
>**课程说明：**本课讲解如何读取用户首选项数据


### 1.5.4	启动时小贴士实例
>**课程说明：**本课用一个小实例演示用户首选项数据的使用场景
>![Alt text](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_tip.gif)

```swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var mySwitch: UISwitch!
    var ud:NSUserDefaults!
    
    @IBAction func switchChangedHandler(sender: AnyObject) {
        ud.setBool(mySwitch.on, forKey: "showTips")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        ud = NSUserDefaults.standardUserDefaults()
        mySwitch.on = ud.boolForKey("showTips")
        if mySwitch.on {
            NSTimer.scheduledTimerWithTimeInterval(2,
                target: self,v  
                selector: "showTip",
                userInfo: nil,
                repeats: false)
            
        }
    }
    
    // 弹出提示窗
    func showTip() {
        let alert:UIAlertController = UIAlertController(title: "提示",
            message: "今天要下雨，出门要带雨具哦！",
            preferredStyle: .Alert)
        let ok:UIAlertAction = UIAlertAction(title: "OK", style: .Cancel, handler: nil)
        alert.addAction(ok)
        
        self.presentViewController(alert, animated: true, completion: nil)
    }
}
```

## 1.6	iOS文件存取
>**官方文档：**https://developer.apple.com/library/mac/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40010672-CH1-SW1

### 1.6.1	iOS应用沙盒
>**笔记参考：**http://blog.csdn.net/wzzvictory/article/details/18269713
>**沙盒机制：**出于安全考虑，iOS系统的沙盒机制规定每个应用都只能访问当前沙盒目录下面的文件（也有例外，比如系统通讯录能在用户授权的情况下被第三方应用访问）。

#### 1.6.1.1	app目录
>**说明：**每个应用的沙盒目录都是相似的，主要包如下所示的4个目录

```bash
.
├── MyApp.app# 应用程序本身
├── Documents# 应用程序的数据文件
│   └── Inbox#由外部应用请求当前应用程序打开的文件
├── Library# 默认设置或其它状态信息
│   ├── Caches#缓存文件
│   └── Preferences#应用程序的偏好设置文件
└── tmp# 临时文件
```

| 目录                    | 内容                           | 读写   | 是否会被iTunes同步        | 说明                                       |
| --------------------- | ---------------------------- | ---- | ------------------- | ---------------------------------------- |
| `MyApp.app`           | 应用程序本身的数据，包括`资源文件`和`可执行文件`等  | 只读   | 否                   |                                          |
| `Documents`           | 读写                           | 是    | 应用程序的数据文件保存在该目录下    | 数据类型仅限于`不可再生`的数据，`可再生`的数据文件应该存放在`Library/Cache`目录下。 |
| `Documents/Inbox`     | 用来保存由外部应用请求当前应用程序打开的文件       | 读写   | 是                   | 比如我们的应用叫`A`，向系统注册了几种可打开的文件格式，`B`应用有一个`A`支持的格式的文件`F`，并且申请调用`A`打开`F`。由于`F`当前是在`B`应用的沙盒中，我们知道，沙盒机制是不允许`A`访问`B`沙盒中的文件，因此苹果的解决方案是将`F`拷贝一份到`A`应用的`Documents/Inbox`目录下，再让`A`打开`F`。 |
| `Library`             | 苹果建议用来存放默认设置或其它状态信息          | 读写   | 是，但是要除了`Caches`子目录外 |                                          |
| `Library/Caches`      | 主要是缓存文件，用户使用过程中缓存都可以保存在这个目录中 | 读写   | 否                   | Documents目录用于保存不可再生的文件，那么这个目录就用于保存那些可再生的文件，比如网络请求的数据。鉴于此，应用程序通常还需要负责删除这些文件。 |
| `Library/Preferences` | 应用程序的偏好设置文件                  | 读写   | 是                   | 我们使用`NSUserDefaults`写的设置数据都会保存到该目录下的一个`plist`文件中，这就是所谓的写到`plist`中! |
| `tmp`                 | 各种临时文件，保存应用再次启动时不需要的文件       | 读写   | 否                   | 当应用不再需要这些文件时应该主动将其删除，因为该目录下的东西随时有可能被系统清理掉，目前已知的一种可能清理的原因是系统磁盘存储空间不足的时候。 |

#### 1.6.1.2	获取目录 API

##### NSSearchPathForDirectoriesInDomains方法
>**说明：**用于返回指定范围内的指定名称的目录的路径集合
>**注意：**使用`沙盒/Documents`目录要用该方法获取路径

```swift
/**
* 
* @param {enum} directory 表明我们要搜索的目录名称
* @param {enum} domainMask 指定搜索范围。
* @param {Bool} expandTilde 表示是否展开波浪线~
*/
public func NSSearchPathForDirectoriesInDomains(directory: NSSearchPathDirectory, _ domainMask: NSSearchPathDomainMask, _ expandTilde: Bool) -> [String]
```


### 1.6.2	写入文件

```swift
/*- 获取目录路径 -*/
let homePath = NSHomeDirectory()// 沙盒(home)
let appPath = NSBundle.mainBundle().bundlePath// MyApp.app
let tmpPath = NSTemporaryDirectory()// tmp
let documentPaths = NSSearchPathForDirectoriesInDomains(.DocumentationDirectory, .AllDomainsMask, true)
var documentPath:String = "";// Documents

if documentPaths.count > 0 {
    documentPath = documentPaths[0];
}

print("home:\(homePath)")
print("app:\(appPath)")
print("tmp:\(tmpPath)")
print("Documents\(documentPath)")

/*- 在 Documents 下创建文件 -*/
let url = NSURL(fileURLWithPath: "\(documentPath)/test.txt")

/*- 向文件中写入文本 -*/
let textData = NSMutableData()
textData.appendData("Hello Swift\n".dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: true)!)
textData.writeToFile(url.path!, atomically: true)

/*- 从文件中读取文本 -*/
do {
    print(url)
    let readedText = try NSString(contentsOfURL: url, encoding: NSUTF8StringEncoding)
    print(readedText)
}
catch {
    print("read failed")
}
```

### 1.6.3	读取文件

```swift
/*- 从文件中读取文本 -*/
do {
    print(url)
    let readedText = try NSString(contentsOfURL: url, encoding: NSUTF8StringEncoding)
    print(readedText)
}
catch {
    print("read failed")
}
```
