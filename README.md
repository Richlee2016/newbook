# newbook
[TOC]

---

## 下载安装
```js
$ git clone https://github.com/Richlee2016/newbook

$ cd newbook

$ npm install
```
## 启动
```js
$ npm run dev
```

## 项目结构
![vue书城](http://or1v1p7wl.bkt.clouddn.com/vuebook.png)

## 关于数据
```
1.利用Fiddler软件抓包，可以直接抓取到json文件(小米书城是单页面)，如果不想抓就查看servers/server文件。
2.利用http-proxy-middleware在 build/dev-server里边配置 server/proxy 文件，完成代理。
3.其中免费页面，阅读页面，搜索页面需要添加 header{cookie：xxx}才能获取到数据。
4.由于小米书城是收费得，所以进行了免费章节的爬取，选取了http://www.23us.cc/(顶点小说)作为爬取网站。
```

## 后续功能

- [ ] 阅读器
     - [x] 滑动加载下一章
     - [x] 阅读器操作(文字、背景)
     - [ ] 点击翻页
- [ ] 页面功能
     - [x] gifLoding(翻书)
     - [ ] 转场动画(vueg)
     - [ ] 图片缓动入场
- [ ] 免费阅读
     - [x] 爬取
     - [x] API
     - [ ] 功能转换
- [ ] 微信/qq登录(个人中心)
- [ ] 小说缓存
- [ ] 皮肤





