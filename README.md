# ReadHub-ImitationSite

> An Imitation Site of ReadHub, building upon the official API(https://api.readhub.cn/topic)

>一个借助ReadHub官方API实现的仿站 

## Build Setup
### Dev Environment（处于开发环境，未打包）

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
![预览](https://raw.githubusercontent.com/linbudu599/ReadHub-ImitationSite/master/preview/preview_01.gif)
### Problem to be solved: Page flashs when changing the plate.
### 切换板块时页面会闪烁 且暂时不知如何通过样式来解决 接下来会尝试修复

## 未能实现的功能：
>1. 后四个板块的下拉更新，官方获取更新内容的请求地址为api后跟上lastCursor=timeStamp（间隔时间戳），但这个时间戳是不固定的，并且没有规律。
>2. 招聘行情的侧边栏，显示各个职位较上一周的数量变化情况，但接口返回的数据只有最新的情报。
