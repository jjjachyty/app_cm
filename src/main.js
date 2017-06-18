// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import filter from './filter'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css' // 使用 teal 主题
import vueFinger from 'vue-finger'

Vue.use(MuseUI)
import VueECharts from 'vue-echarts'
Vue.component('chart', VueECharts)

import Tree from 'hsy-vue-tree'

Vue.use(Tree)
Vue.use(vueFinger)

import axios from 'axios'
Vue.prototype.$http = axios

router.beforeEach(({ meta, path }, from, next) => {
    //var { auth = true } = meta
    var isLogin = Boolean(sessionStorage.getItem('sid')) //true用户已登录， false用户未登录
    console.log("登录验证SID",sessionStorage.getItem('sid'))

    if ( !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    if (isLogin && path == '/login') {
        return next({ path: '/main' })
    }
    next()
})


/* eslint-disable no-new */
new Vue({
        el: '#app',
        store,
        router,
        filter,
        template: '<App/>',
        components: {
            App
        }
    })
    //Vue.prototype.$http = axios
window.router = router
    // window.store = store