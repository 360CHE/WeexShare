<template>
    <div class="mask" @click="hide" v-if="showShare">
        <div class="main" ref="main">
            <div class="header">
                <text class="header-text">分享</text>
                <image :src="imgPath + 'share-close.png'" class="close" @click="hide"></image>
            </div>
            <div class="list">
                <div class="block" v-for="(data, index) in list" @click="share(index)">
                    <image :src="imgPath + data.icon" class="block-icon"></image>
                    <div class="block-name">
                        <text class="block-name-text">{{data.name}}</text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    const thaw = weex.requireModule('THAW')
    const globalEvent = weex.requireModule('globalEvent')
    const animation = weex.requireModule('animation')
    const clipboard = weex.requireModule('clipboard')
    const modal = weex.requireModule('modal')
    export default {
        // shareParams = {
        //     "platform": [0,1,2,3,4], // 显示分享到有哪些平台，0-微信，1-朋友圈，2-QQ，3-qq空间，4-新浪 5-复制链接
        //     "title": "", // 分享标题
        //     "desc": "", // 分享描述
        //     "link": "", // 分享链接
        //     "imgUrl": "" // 分享图标
        // }
        props: ['shareParams', 'showShare'],
        data () {
            return {
                // 图片前缀
                imgPath: 'https://s.kcimg.cn/wap/images/detail/productApp/',
                list: [],
                totalList: [
                    {
                        name: '微信好友',
                        icon: 'share-weixin.png'
                    },
                    {
                        name: '微信朋友圈',
                        icon: 'share-moment.png'
                    },
                    {
                        name: 'QQ好友',
                        icon: 'share-qq.png'
                    },
                    {
                        name: 'QQ空间',
                        icon: 'share-qqspace.png'
                    },
                    {
                        name: '新浪微博',
                        icon: 'share-weibo.png'
                    },
                    {
                        name: '复制链接',
                        icon: 'share-link.png'
                    }
                ]
            }
        },
        created () {
            // 默认为全功能
            let platform = [0,1,2,3,4,5]
            // 根据配置 更新platform
            if (this.$weexShareOptions) platform = this.$weexShareOptions.func
            // 设置this.list
            platform.forEach( idx => {
                this.list.push(this.totalList[idx])
            })
        },
        methods: {
            show () {
                animation.transition(this.$refs.main, {
                    styles: {
                        transform: 'translateY(0px)',
                        opacity: 1
                    },
                    duration: 300,
                    timingFunction: 'ease-out',
                    needLayout:false,
                    delay: 0,
                })
            },
            hide () {
                animation.transition(this.$refs.main, {
                    styles: {
                        transform: 'translateY(498px)',
                        opacity: 0
                    },
                    duration: 300,
                    timingFunction: 'ease-out',
                    needLayout:false,
                    delay: 0,
                }, () => {
                    // TODO: 这是一个不好的操作 这里封装的插件只是为了减少使用者的复杂度 所以子组件改变了父组件的状态 正常应该使用事件通知
                    this.$parent.showShare = false
                })
            },
            share (index) {
                // 复制对应m端url到剪切板
                if (index === 5) {
                    clipboard.setString(this.shareParams.link)
                    modal.toast({
                        message: '复制链接成功',
                        duration: 0.3
                    })
                    this.callBack({platform: 5, status: '0'})
                } else {
                    let shareParams = Object.assign({}, this.shareParams)
                    shareParams.platform = String(index)
                    thaw.onShowSharePlatfrom(shareParams, this.callBack.bind(this))
                }
            },
            // 回调处理
            callBack (data) {
                // this.alert('callback is ' + JSON.stringify(data))
                // data 是 { platform, status }
                this.$emit('shareCallBack', data)
            }
        },
        watch: {
            showShare: function (val) {
                if (val) {
                    setTimeout(() => {
                        this.show()
                    }, 100)
                }
            }
        }
    }
</script>

<style scoped>
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .main {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 750px;
        height: 498px;
        background-color: #fff;
        transform: translateY(498px);
        opacity: 0;
    }
    .header {
        height: 96px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgba(23, 24, 26, 0.12);
        justify-content: center;
        align-items: center;
    }
    .header-text {
        font-size: 32px;
        color: #17181A;
    }
    .close {
        position: absolute;
        right: 32px;
        top: 34px;
        width: 28px;
        height: 28px;
    }
    .list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .block {
        /*min-width: 250px;*/
        width: 250px;
        /*flex: 1;*/
        align-items: center;
        padding-top: 40px;
    }
    .block-icon {
        width: 88px;
        height: 88px;
    }
    .block-name {
        margin-top: 16px;
        height: 36px;
        line-height: 36px;
        justify-content: center;
        align-items: center;
    }
    .block-name-text {
        font-size: 24px;
        color: #5C6066;
    }
</style>
