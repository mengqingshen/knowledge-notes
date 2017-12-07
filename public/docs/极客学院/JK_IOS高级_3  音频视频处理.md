---
title: 3 音频视频处理
categories:
  - 极客学院_ios高级
toc: true
---


## 3.1	iOS API视频的播放和录制
>**注意：**`MPMoviePlayerViewController`在`iOS9中`过时了

### 3.1.1	播放视频
![Alt text|200x350](http://o6ul1xz4z.bkt.clouddn.com/img/JK_IOS_video1.gif)

```swift
import UIKit
import MediaPlayer

class ViewController: UIViewController {
    
    var pc:MPMoviePlayerViewController!

    @IBAction func playVideoBtnClicked(sender: AnyObject) {
        
        pc = MPMoviePlayerViewController(contentURL: NSBundle.mainBundle().URLForResource("video", withExtension: "mp4"))
        presentViewController(pc, animated: true, completion: nil)
    }
}
```

### 3.1.2	录制视频
>**注意：** xcode 的虚拟机不支持使用相机，模拟使用相机只能选择真机！
>**技巧：**调试时可以通过`window->Devices`，在设备管理面板选择要管理的设备进行操作（比如截屏）。

```swift
import UIKit
import MobileCoreServices// 录制视频使用到的库
import MediaPlayer// 播放视频用到的库

class ViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    // 图片选择器
    var picker:UIImagePickerController!// 可以选择从图库或摄像头中选择图片或视频（源为摄像头意味着拍照或视频）
    
    var videoUrl:NSURL?
    var player:MPMoviePlayerViewController!
    
    // 开始录制
    @IBAction func recVideoBtnClicked(sender: AnyObject) {
        picker = UIImagePickerController()
        picker.mediaTypes = [kUTTypeMovie as String]
        picker.sourceType = UIImagePickerControllerSourceType.Camera// 设置源通过摄像头
        picker.cameraCaptureMode = UIImagePickerControllerCameraCaptureMode.Video// 设置摄像头为录制视频模式
        picker.delegate = self
        presentViewController(picker, animated: true, completion: nil)
    }
    
    // 开始播放
    @IBAction func playVideoBtnClicked(sender: AnyObject) {
        if let url = videoUrl {
            player = MPMoviePlayerViewController(contentURL: url)
            presentViewController(player, animated: true, completion: nil)
        }
    }
    
    // 选中了视频时（录制完成后）被调用
    func imagePickerController(picker: UIImagePickerController, didFinishPickingImage image: UIImage, editingInfo: [String : AnyObject]?) {
        // 获取录制好的视频资源的url地址
        videoUrl = editingInfo![UIImagePickerControllerMediaURL] as? NSURL
        // 关闭录制视频的视图控制器
        picker.dismissViewControllerAnimated(true, completion: nil)
    }
    
    // 取消录制视频时被调用
    func imagePickerControllerDidCancel(picker: UIImagePickerController) {
        // 关闭录制视频的视图控制器
        picker.dismissViewControllerAnimated(true, completion: nil)
    }
}
```

## 3.2	iOS音频相关 API 的使用

### 3.2.1	播放声音
>**说明：**给出两种方式
>+ 使用`AVAudioPlayer`播放音乐文件
>+ 使用`MediaPlayer`播放音乐

```swift
import UIKit
import AVFoundation
import MediaPlayer

class ViewController: UIViewController {

    var aPlayer:AVAudioPlayer!
    // 播放
    @IBAction func playBtnClicked(sender: AnyObject) {
        aPlayer.play()
    }
    // 暂定
    @IBAction func pauseBtnClicked(sender: AnyObject) {
        aPlayer.pause()// 暂停后音乐仍然处在准备播放的状态
    }
    
    // 停止
    @IBAction func stopBtnClicked(sender: AnyObject) {
        aPlayer.stop()// 通知后音乐不会处在准备播放状态，但会记住停止时的位置
        aPlayer.currentTime = 0
    }
    
    // 另一种方式播放音乐
    @IBAction func playSongBtnClicked(sender: AnyObject) {
        // 初始化播放控制器
        let p = MPMoviePlayerViewController(contentURL: NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource("sound", ofType: "mp3")!))
        // 开始播放
        presentViewController(p, animated: true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        do {
            // 初始化 AVAudioPlayer
            aPlayer = try AVAudioPlayer(contentsOfURL: NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource("sound", ofType: "mp3")!))
        }
        catch {
            print("failed")
        }       
    }
}
```


### 3.2.2	播放乐库音乐
>**说明：**要点如下
>1. （`ViewController`）采纳`MPMediaPickerControllerDelegate`协议
>2. 初始化媒体选择控制器（`MPMediaPickerController`）和音乐播放控制器（`MPMusicPlayerController`）
>3. 实现采纳协议的相关方法

>**注意：**在虚拟机中是不能使用音乐库的

```swift
import UIKit
import MediaPlayer

class ViewController: UIViewController, MPMediaPickerControllerDelegate {
    var picker:MPMediaPickerController!// 选择音乐控制器
    var player:MPMusicPlayerController!// 播放音乐控制器
    
    // 选择音乐
    @IBAction func btnSelectMusicClicked(sender: AnyObject) {
        presentViewController(picker, animated: true, completion: nil)
    }
    
    // 选择音乐完成后调用
    func mediaPicker(mediaPicker: MPMediaPickerController, didPickMediaItems mediaItemCollection: MPMediaItemCollection) {
        // 关闭视频选择控制器
        mediaPicker.dismissViewControllerAnimated(true, completion: nil)
        // 将选中的音乐加入到播放列表
        player.setQueueWithItemCollection(mediaItemCollection)
        // 开始播放
        player.play()
        
        // 获取选中的第一首歌的名字
        let firstName:AnyObject = mediaItemCollection.items[0].valueForProperty(MPMediaItemPropertyTitle)!
        print("\(firstName)")
    }
    
    // 取消播放时调用
    func mediaPickerDidCancel(mediaPicker: MPMediaPickerController) {
        print("Cancel")
        mediaPicker.dismissViewControllerAnimated(true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        picker = MPMediaPickerController(mediaTypes: MPMediaType.Music)
        picker.allowsPickingMultipleItems = true// 可以选择多个
        picker.delegate = self
        
        player = MPMusicPlayerController.systemMusicPlayer()// 创建全局音乐播放器(程序退出后仍可以播放)
    }
}
```

### 3.2.3	录制声音
>**疑问：**下面程序找到的`Documents`文件夹路径不可用，竟然在`Library`下面，但下面其实没有`Documents`

```bash
#file:///Users/tonyearth/Library/Developer/CoreSimulator/Devices/5A05DBF7-F5EC-4B5B-ABF0-EA396DA417DB/data/Containers/Data/Application/3483064B-0B9F-4E73-B193-D0829300D43E/Library/Documentation/

$cd /Users/tonyearth/Library/Developer/CoreSimulator/Devices/5A05DBF7-F5EC-4B5B-ABF0-EA396DA417DB/data/Containers/Data/Application/3483064B-0B9F-4E73-B193-D0829300D43E

$ tree
.
├── Documents
├── Library
│   ├── Caches
│   │   └── Snapshots
│   │       └── com.earth.L0204-----
│   │           ├── 50998B49-4017-4DAA-A8BB-49F0A32325DD@2x.png
│   │           └── C0EB8483-DCD1-41F9-8F4D-1AADC05666E1@2x.png
│   └── Preferences
└── tmp


```

```swift
import UIKit
import AVFoundation

class ViewController: UIViewController {
    var avRec:AVAudioRecorder!// 录音器
    var audioFileUrl:NSURL!// 保存地址
    var avPlayer:AVAudioPlayer!// 播放器
    
    // 开始录音
    @IBAction func startRectBtnClicked(sender: AnyObject) {
        print("start rec")
        avRec.record()
    }
    
    // 停止录音
    @IBAction func stopRecBtnClicked(sender: AnyObject) {
        print("stop rec")
        avRec.stop()
    }
    
    // 播放音乐
    @IBAction func playRectBtnClicked(sender: AnyObject) {
        print("play rec：\(audioFileUrl)")
        avPlayer = try? AVAudioPlayer(contentsOfURL: audioFileUrl)
        avPlayer.prepareToPlay()
        avPlayer.play()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        audioFileUrl = (NSFileManager.defaultManager().URLsForDirectory(NSSearchPathDirectory.DocumentationDirectory, inDomains: NSSearchPathDomainMask.AllDomainsMask)[0] as NSURL).URLByAppendingPathComponent("rec")
        avRec = try? AVAudioRecorder(URL: audioFileUrl,
                                        settings: [:])
        avRec.prepareToRecord()
// 查看文件路径
        let sp = NSFileManager.defaultManager().URLsForDirectory(NSSearchPathDirectory.DocumentationDirectory, inDomains: NSSearchPathDomainMask.AllDomainsMask)
        for item in sp {
            print("\(item)")
        }
    }
}
```

