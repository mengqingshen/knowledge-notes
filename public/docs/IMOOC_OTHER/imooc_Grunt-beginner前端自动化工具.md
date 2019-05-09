---
title: Grunt-beginner前端自动化工具
categories: [慕课网学习笔记]
tag:
    - grunt
date: 2015-05-02 23:01
---

# 第一章		课程介绍
## 1.1 课程目标和学习内容介绍
**前端集成解决方案**

☑ **什么是前端集成解决方案？**

+ 草根派：解决前端工程的根本问题。

+ 学院派：一套包含框架和工具，便于开发者快速构建美丽实用的web应用程序的工作流，同时这套工作流必须是健壮的。

☑ **解决哪些前端问题？**

+ 开发团队代码风格不同意，如何强制开发规范

+ 前期开发的组件库如何维护和使用

+  如何模块化前端项目

+  服务器部署前必须的压缩、检查流程如何简化，流程如何完善.


☑ **主流的方式有哪几种？**

+ Yeoman
+ Bower
+ Grount|Gulp
   CodeKit:https//inclient57.com/codekit/    ----仅限于os x
   FIS:http://fis.baidu.com/
   Spirit:http://alloyteam.github.io/Spirit

☑ **目前Grunt的竞争者？**

+ Buildy

+ jasy

+ Gmake

 ​

#  2 准备工作

## 2.1 nodejs简介
## 2.2 Yeoman,Bower,Grunt简介及安装

### Yeoman

简介：在Web项目的立项阶段，使用yeoman来生成项目的文件、代码结构。Yeoman自动将最佳实践和工具整合进来，大大加速和方便了后续的开发。
官方站点：http://yeoman.io/

```bash
sudo npm install -g yo
yo -v
```

### **Bower**
简介：跟踪管理web站点的框架 、库、公共部分等  
官方站点：http://bower.io/

```bash
sudo npm i -g bower
bower -v
```

### Grunt

**简介:**: Build tool，实现开发自动化（减少像压缩、编译、单元测试、代码校验这种重复且无业务关联的工作。）

**官方站点**: http://gruntjs.com

**优点**: 生态庞大

```bash
sudo npm i -g grunt-cli
```
# 第3章		Yeoman实践
## 3.1 	Yeoman实践
**Generator:**各式各样的模具

**安装模具：**`npm i -g generator-[框架或工具的名称]`

**案例：**angular项目

```bash
sudo npm install -g generator-angular    ----安装angular的模具
cd ~/Study/Grunt
mkdir -p yo-in-action/angular-in-action    ----创建项目目录
cd yo-in-action/angular-in-action
yo angular learnangular    ----受用angular模具初始化项目
tree -L 2
.
├── app    ----自己的代码
│   ├── 404.html
│   ├── favicon.ico
│   ├── images
│   ├── index.html
│   ├── robots.txt
│   ├── scripts
│   ├── styles
│   └── views
├── bower.json    ----bower以来管理配置文件
├── Gruntfile.js    ----Grunt配置文件
├── node_modules    ----node平台的依赖包安装位置
│   ├── grunt
│   ├── grunt-autoprefixer
│   ├── grunt-concurrent
│   ├── grunt-contrib-clean
│   ├── grunt-contrib-compass
│   ├── grunt-contrib-concat
│   ├── grunt-contrib-connect
│   ├── grunt-contrib-copy
│   ├── grunt-contrib-cssmin
│   ├── grunt-contrib-htmlmin
│   ├── grunt-contrib-imagemin
│   ├── grunt-contrib-jshint
│   ├── grunt-contrib-uglify
│   ├── grunt-contrib-watch
│   ├── grunt-filerev
│   ├── grunt-google-cdn
│   ├── grunt-newer
│   ├── grunt-ng-annotate
│   ├── grunt-svgmin
│   ├── grunt-usemin
│   ├── grunt-wiredep
│   ├── jshint-stylish
│   ├── load-grunt-tasks
│   └── time-grunt
├── package.json    ----npm配置文件（npm install）
├── README.md
└── test    ----测试
    ├── karma.conf.js
    └── spec
```

# 第4章    Bower实践
**基本使用：**bower install [框架和工具名 | github短写 | github仓库 | url]：会从bower服务器上下载

☑ 一般情况
   `bower install jquery`
☑ 通过github短写（github网站上显示的项目的github短语）
   `bower install jquery/jquery`
☑ 通过github完整仓库地址安装
   `bower install  https://github.com/jquery/jquery.git`
☑ 直接通过URL安装(使用的框架或组件，没有在github上的情况)
   `bower install http://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js`

```bash
mkdir bower-in-action && cd bower-in-action     ----bower测试目录
mkdir jquery-bootstrap-in-action &&cd jquery-bootstrap-in-action    ----测试项目
bower install jquery    ----安装jquery
bower配置文件
bower init    ----在当前目录生成bower.json配置文件（有点像package.json）
```

## 4.1 bower.json:配置项目依赖

```bash
$ bower install jquery    # 在没有配置文件的情况下先安装jquery
$ bower init 
$ cat bower.json
{
  "name": "bower-in-action",
  "version": "0.0.0",
  "authors": [
    "enter <eli01linux@aliyun.com>"
  ],
  "keywords": [
    "jquery"
  ],
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "jquery": "~2.1.3"
  }
}
$ bower install jquery --save-dev    ----安装并配置到bower.json的devDependences
{
    ...
    ...
  "dependencies": {
    "jquery": "~2.1.3"
  },
  "devDependencies": {
    "bootstrap": "~3.3.2"
  }
}
$ bower install angular --save    ----  安装angular并配置到bower.json的dependences
{
    ...
    ...
"dependencies": {
    "jquery": "~2.1.3",
    "angular": "~1.3.14"
  },
  "devDependencies": {
    "bootstrap": "~3.3.2"
  }
}
```

## 4.2    .bowerrc: bower本身相关的配置

```bash
$ vim .bowerrc
{
    "directory":"bower_components",    ----组件或框架的安装目录
    "proxy":"http://proxy.tencent.com:8080",    ----http代理
    "https-proxy":"https://proxy.tencent.com:8080",    ----https代理
    "timeout":60000    ----根据自己的网络情况调整
}
$ mkdir app && cd app
$ vim index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <!--结合grunt可以简化路径-->
    <script src="../bower_components/jquery.min/index.js"></script>
</body>
</html>
$ tree -L 2
.
├── app
│   └── index.html
├── bower_components
│   ├── angular
│   ├── bootstrap
│   └── jquery
└── bower.json
```

# 第5章 Grunt实践
## 5.1 Grunt的task,target和options
**命令：**
1. `grunt {task}:{target}`：执行某个`task`中的某个`target`
2. `grunt {task}`：执行整个`task`

**配置文件：**

+ `grunt.initConfig({Object})`：定义单个task
+ `grunt.registerTask({String}, {String}, {function})`或`grunt.registerTask({Array})`：组合已有的task集合为一个新的task

**案例：**配合Yeoman

```bash
$ mkdir -p grunt-in-action/grunt-by-yo && cd grunt-in-action/grunt-by-yo
$ sudo npm install generator-webapp
$ yo webapp grunt-by-yo
$ tree -L 2

$ brew install ruby
$ gem sources --remove https://rubygems.org/
$ gem sources -a https://ruby.taobao.org/
$ gem install sass
$ vim Gruntfile.js
'use strict';
module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  var config = {
    app: 'app',
    dist: 'dist'
  };
  grunt.initConfig({
	config: config,
	...
	sass: {
      options: {
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: 'dist/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },
  });
  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
	...
  });
  ...
};
$ grunt sass
```

## 5.2 从无到有构建grunt项目
`多少年的老规矩了。		----霸王别姬`

```bash
$ mkdir -p grunt-empty/js
$ cd grunt-empty
$ js/index.js
//生成package.json文件（npm包管理文件）
$ npm init
//安装Grunt和相关插件
$ npm install grunt --save-dev
$ vim package.json 
$ npm install load-grunt-tasks --save-dev
$ npm install time-grunt --save-dev
$ cat package.json 
//创建Gruntfile配置文件
$ touch Gruntfile.js
```

## 5.3 初识Grunt Files处理方式
### 5.3.1 初始化环境

```bash
$ npm install grunt-contrib-copy --save-dev    ----grunt复制文件的工具
$ npm install grunt-contrib-clean --save-dev    ----grunt删除文件的工具
$ mkdir app && mv js index.html app/    ----修正目录结构
$ tree -L 2
.
├── app
│   ├── index.html
│   └── js
├── Gruntfile.js
├── node_modules
│   ├── grunt
│   ├── grunt-contrib-clean
│   ├── grunt-contrib-copy
│   ├── load-grunt-tasks
│   └── time-grunt
└── package.json
```

### 5.3.2 编写Gruntfile
**在target中定义简单的task：**使用src、dest、files

**案例1:自定义复制和清除任务**

```bash
$ vim Gruntfile.js
```

```js
'use strict';
 
module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    require('time-grunt');
 
    //配置路径
    var config = {
        app:'app',
        dist:'dist'
    }
 
    grunt.initConfig({
        config:config,
        //target
        copy:{
            //task
            dist:{
                /**
                 * 源文件:可以引用config中的配置
                 * @type {string|array}
                 */
                src:'<%= config.app%>/index.html',
                /**
                 * 目标文件
                 * @type {string|array}
                 */
                dest:'<%= config.dist%>/index.html'
            }
        }
    });
}
```

```bash
$ grunt copy    ----测试copy这个task(文件复制)
$ tree -L 2
.
├── app
│   ├── index.html
│   └── js
├── dist
│   └── index.html
├── Gruntfile.js
├── node_modules
│   ├── grunt
│   ├── grunt-contrib-clean
│   ├── grunt-contrib-copy
│   ├── load-grunt-tasks
│   └── time-grunt
└── package.json
$ grunt clean
$ tree -L 2
.
├── app
│   ├── index.html
│   └── js
├── dist
├── Gruntfile.js
├── node_modules
│   ├── grunt
│   ├── grunt-contrib-clean
│   ├── grunt-contrib-copy
│   ├── load-grunt-tasks
│   └── time-grunt
└── package.json
```

 **案例2：在案例一的基础上细化任务**

```js
$ vim Gruntfile.js
'use strict';
 
module.exports = function(grunt){
    ...
    grunt.initConfig({
        config:config,
        //复制文件
        copy:{
            //复制html文件
            dist_html:{
                /**
                 * 源文件:可以引用config中的配置
                 * @type {string|array}
                 */
                src:'<%= config.app %>/index.html',
                /**
                 * 目标文件
                 * @type {string|array}
                 */
                dest:'<%= config.dist %>/index.html'
            },
            //复制js文件
            dist_js:{
                src:'<%= config.app %>/js/index.js',
                dest:'<%= config.dist %>/js/index.js'
            }
        },
        //清理文件
        clean:{
          ...
        }
    });
}
```

**案例3：在案例一的基础上使用files增加复制的文件，比案例二更精简**

**files：**成对设置原文件和目标文件（数组方式）

```js
vim Gruntfile.js
'use strict';
 
module.exports = function(grunt){
    ...
    grunt.initConfig({
        config:config,
        //复制文件
        copy:{
            dist:{
                files:[
                    {
                        src:'<%= config.app %>/index.html',
                        dest:'<%= config.dist %>/index.html'
                    },
                    {
                        src:'<%= config.app %>/js/index.js',
                        dest:'<%= config.dist %>/js/index.js'
                    }
                ]
            }
        },
        //清理文件
        clean:{
            ...
        }
    });
}

```

**案例4：在案例三的基础上使用{目标文件：源文件}的方式进一步改进，这种情况下不支持额外参数**
>**files：**成对设置原文件和目标文件（键值对方式）

```js
$ vim Gruntfile.js
'use strict';
 
module.exports = function(grunt){
    ...
    grunt.initConfig({
        config:config,
        //复制文件
        copy:{
            dist:{
                files:{
                    '<%= config.dist %>/index.html':'<%= config.app %>/index.html',
                    '<%= config.dist %>/js/index.js':'<%= config.app %>/js/index.js'
                }
            }
        },
        ...
    });
}
```

**案例五：使用通配符和其它options简化案例四**

```js
$ vim Gruntfile.js
 'use strict';
module.exports = function(grunt){
    ...
    grunt.initConfig({
       ...
        //清理文件
        clean:{
            dist:{
                src:[
	                //*:任意字符（/除外）
	                //**:任意数量的任意字符
	                //!:取反
                    '<%= config.dist%>/**/*'
                ],
                //不删除文件夹
                filter:'isFile'
            }
        }
    });
}
```
或

```js
vim Gruntfile.js
'use strict';
module.exports = function(grunt){
    ...
    grunt.initConfig({
       ...
        //清理文件
        clean:{
            dist:{
                src:[
                    '<%= config.dist%>/**/*'
                ],
                //不删除文件夹
                filter:function(filepath){
                    return !grunt.file.isDir(filepath)
                }
            }
        }
    });
}
```

**案例6：综合使用各种options**

**使用通配符和其它options**

| 序号                         |                    options |  功能  |
| :------------------------- | -------------------------: | :--: |
| filter                     |              指定过滤方式(可以是函数) |      |
| dot[Boolean]               |            true代表命中以.开头的文件 |      |
| matchBase[Boolean]         |        true代表只匹配路径的最后一级的名称 |      |
| expand[Boolean]            |    true代表动态处理src到desc的文件映射 |      |
| cwd[string]                |                     源文件根目录 |      |
| src[string]                |                      匹配源文件 |      |
| ext[string]                |                   修改源文件的后缀 |      |
| extDot[string]             | 从源文件的何处开始替换后缀（first\|last） |      |
| flatten[Boolean]           |                是否将中间各层目录去掉 |      |
| rename[Function(dest,src)] |            对生成的目标文件进一步进行处理 |      |

```js
vim Gruntfile.js
'use strict';
 
module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    require('time-grunt');
 
    //配置路径
    var config = {
        app:'app',
        dist:'dist'
    }
 
    grunt.initConfig({
        config:config,
        //target
        copy:{
            //task
            dist:{
                files:[
                    {
                        expand:true,//制定动态处理
                        cwd:'<%=config.app%>/',//在那个文件夹匹配
                        src:'*.html',//匹配文件
                        dest:'<%=config.dist%>/',//目标目录
                        ext:'.min.html',//修改文件后缀
                        extDot:'last',//first：第一个点后面都是后缀；last：最后一个点是后缀
                        flatten:true,//去除中间个层目录
                        rename:function(dest,src){
                            return dest+'js/'+src;／／添加被移除的中间目录
                        }
                    }
                ]
            }
        },
         //清理文件
        clean:{
            dist:{
                src:[
                    '<%= config.dist%>/**/*'
                ],
                //不删除文件夹
                filter:function(filepath){
                    return !grunt.file.isDir(filepath)
                }
            }
        }
    });
}
```

## 5.4-5.5	剖析Grunt Tasks-Grunt serve
`我，胡汉三，又回来啦！		----《闪闪的红星》`
**hostname配置项：**设置server的hostname(0.0.0.0代表允许外部访问)

**Grunt原子插件搜索**：https://github.com/search?utf8=%E2%9C%93&Q=GRUNT

**注意：**参数配置

1. **动态注入：**`grunt {task}:abc:def:ghi`：动态地在`{task}`的注册函数(`grunt.registerMultitask`除外)体内的`this`对象的`flags`对象中创建属性，相当于

```js
module.exports = function (grunt) {
  grunt.registerTask('{task}','...',funtion(task){
    this.flags = {
        abc:true,
        def:true,
        ghi:true
    }
    ...
  });
}
```
2. **参数访问优先级** 
   以`connect:dist:keepalive`为例：
+ connect task中的`this.flags.keepalive`
+ `options.keepalive`

3. `grunt.registerMultitask`：允许配置为多个task配置参数
4. 相关target的属性

| options  | 前提                      | 用途                |
| -------- | ----------------------- | ----------------- |
| `server` | 只能用于没有设置`dest`的`target` | 用于设置需要进行清理的文件夹的路径 |

```bash
$ mkdir grunt-yo-webapp && cd grunt-yo-webapp
$ yo webapp grunt-yo-webapp
//运行serve(组合task)：启动服务，运行项目并在浏览器中打开
$ grunt serve
//$ grunt serve --allow-remote	//允许远程访问
```

```js
$ cat Gruntfile.js
module.exports = function (grunt) {
  grunt.initConfig({
    ...
    // Watches files for changes and runs tasks based on the changed files
    watch: {
	  /**
	  *files:监听的文件
	  *tasks:被监听的文件发生变化时执行的task
	  */
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],//检查代码规范
        options: {
          livereload: true//代码发生变化则reload server
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']//使用grunt-newer插件，执行copy:styles这个target时只针对最新修改的文件进行
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        //以下文件发生变化时，触发load
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,//livereload占用的端口号
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'//web项目hostname配置项
      },
      //启动web server
      livereload: {
        options: {
	      /**
	      *type:{array|function}
	      *return {array}
	      */
          middleware: function(connect) {
            return [
              connect.static('.tmp'),//根路径匹配的文件夹
              connect().use('/bower_components', connect.static('./bower_components')),//为bower_components指定路径匹配
              connect.static(config.app)//根路径匹配的文件夹
            ];
          }
        }
      },
      ...
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false,
          keepalive:true//打开网页后是否关闭server
        }
      }
    },
    ...
    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,//去掉部分路径（因为当前的相对路径在经过其它task近一步处理后会发生变化，即被注入文件和bower component会在同一级目录下）
        src: ['<%= config.app %>/index.html'],//要注入到哪些html 文件
        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js'] //在注入的文件中排除部分文件
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],//注入到哪些sass文件
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },
    ...
    //serve task
	grunt.registerTask('serve', 'start the server and preview your app, -	-allow-remote for remote access', function (target) {
		//target:该组合task当前正在执行的的task成员
	    if (grunt.option('allow-remote')) {
		  //如果option中配置了allow-remote
	      grunt.config.set('connect.options.hostname', '0.0.0.0');
	    }
	    if (target === 'dist') {
		  //当执行dist这个task成员的时候
	      return grunt.task.run(['build', 'connect:dist:keepalive']);//测试完成后server不退出（在connect这个task中的dist中寻找keepalivez参数）
	    }	
	    grunt.task.run([
	      'clean:server',//清除server运行时产生的文件
	      'wiredep',//自动将Bower components注入到html
	      'concurrent:server',//并行处理不依赖其它task的task(编译sass文件并将编译好的css放在.tmp/style文件夹下)
	      'autoprefixer',//为css文件添加浏览器前缀
	      'connect:livereload',//在本地启动web server
	      'watch'
	    ]);
	  });
  });

```
## 5.6 剖析Grunt Tasks-grunt test
## 5.7 剖析Grunt Tasks-grunt build
## 5.8 剖析Grunt Tasks-grunt build
## 5.9 剖析Grunt Tasks-grunt build


