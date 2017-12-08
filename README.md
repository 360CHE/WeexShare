# WeexShare
## weex的卡家分享组件

# 使用方法

>import weexShare from '../src/components/weexShare.js'
Vue.use(weexShare)

需要使用weex分享的页面直接把weexShare注入根组件

><weexShare :shareParams="shareData" :showShare="showShare" @shareCallBack="shareCallBack"></weexShare>

分享所需数据
```
shareData: {
	title: "", // 分享标题
	desc: "",  // 分享描述
	link: "",  // 分享链接
	imgUrl: "" // 分享图标
}
```
控制分享显示
```
showShare
```
分享后的回调
```
shareCallBack: {
	platform, // 分享平台
	status    // 分享状态 '0' 成功
}
```