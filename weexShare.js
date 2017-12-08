import Share from './weexShare.vue'
/**
 * 插件的install方法，用于安装插件
 * @param {Object} Vue - Vue类
 * @param {Object} options - weex分享的配置参数
 */
export default {
    install (Vue, options) {
        Vue.prototype.$weexShareOptions = options
        Vue.component('weexShare', Share)
    }
}
