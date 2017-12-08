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

Tips：weexShare要放在根组件最下面 以确保渲染在最上层

```
shareCallBack (data) {
	// 分享成功
	if (data.status === '0') {
		const platformList = ['微信好友', '微信朋友圈', 'QQ好友', 'QQ空间', '新浪微博', '复制链接']
		const platform = platformList[data.platform]
		this.eventGa(weex.config.deviceId, '分享产品库成功', this.el, platform)
	}
}
```