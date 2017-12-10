import 'babel-polyfill'

import a from './config/c-book-c-programming-a-modern-approach'
import b from './config/c-imooc'
import p from './config/c-qt-jk'
import c from './config/database-book-mongodb-guide'
import d from './config/database-imooc'
import e from './config/database-brother'
import f from './config/design-imooc'
import g from './config/design-jk'
import i from './config/go-imooc'
import j from './config/ios-book-object-c-2'
import k from './config/ios-book-the-swift-program-language-2'
import l from './config/ios-imooc'
import m from './config/ios-jk'
import q from './config/rn-book-react-native-guide'
import r from './config/rn-imooc'
import s from './config/rn-jk'
import o from './config/server-book-software-build-systems-principles-and-experience'
import t from './config/server-book-linux-command-line-and-shell-scripting-bible'
import u from './config/server-book-niaoge-linux-base'
import v from './config/server-book-niaoge-linux-server'
import w from './config/server-imooc'
import x from './config/server-other'
import y from './config/web-book-es6'
import z from './config/web-book-professional-javascript-for-web-3'
import A from './config/web-imooc'

window.docute.init({
  url: '.',
  routerMode: 'hash',
  sidebar: true,
  disableSidebarToggle: false,
  tocVisibleDepth: 3,
  // landing: {
  //   source: './README.md'
  // },
  nav: [
    {
      title: 'c/c++',
      type: 'dropdown',
      items: [
        ...a,
        ...b,
        ...p
      ]
    },
    {
      title: '数据库',
      type: 'dropdown',
      items: [
        ...c,
        ...d,
        ...e
      ]
    },
    {
      title: '设计',
      type: 'dropdown',
      items: [
        ...f,
        ...g
      ]
    },
    {
      title: 'go',
      type: 'dropdown',
      items: [
        ...i
      ]
    },
    {
      title: 'iOS',
      type: 'dropdown',
      items: [
        ...j,
        ...k,
        ...l,
        ...m
      ]
    },
    {
      title: '服务器',
      type: 'dropdown',
      items: [
        ...o,
        ...t,
        ...u,
        ...v,
        ...x,
        ...w
      ]
    },
    {
      title: 'WEB前端',
      type: 'dropdown',
      items: [
        ...y,
        ...z,
        ...A
      ]
    },
    {
      title: 'ReactNative',
      type: 'dropdown',
      items: [
        ...q,
        ...r,
        ...s
      ]
    }
  ]
})
