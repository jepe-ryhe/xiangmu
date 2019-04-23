// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import moment from 'moment'
import axios from 'axios'
import qs from 'qs'

// 绑定
Object.defineProperty(Vue.prototype, '$moment', { value: moment })
Object.defineProperty(Vue.prototype, '$axios', { value: axios })

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(ElementUI)

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://172.6.5.107:8090'
}
console.log(process.env.NODE_ENV)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 添加请求拦截器
axios.interceptors.request.use(function (config) { // 更改axios编码格式
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  if (store.state.token) {
    config.headers.common['Authentication-Token'] = store.state.token
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.defaults.headers.common['Authentication-Token'] = store.state.token
axios.interceptors.response.use(function (res) {
  let state = res.data.status
  if (state === 'fail') {
    let errCode = res.data.data.errCode
    // let errMsg = res.data.data.errMsg
    switch (errCode) {
      case 20003:
        this.$router.replace('/login')
        break
    }
    // Vue.prototype.$message.error(errMsg + 'from:prototype')
  }
  // 对响应数据做点什么
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    // 这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：表示进入该路由需要登陆
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
