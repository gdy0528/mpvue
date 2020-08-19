import Vue from 'vue'
import App from './App'
import store from './store'
import { getAction, postAction } from '@api/http'
import MpvueRouterPatch from 'mpvue-router-patch'
import Notify from '@vant/weapp/dist/notify/notify'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$Notify = Notify
Vue.prototype.$get = getAction
Vue.prototype.$post = postAction

const app = new Vue({
  ...App,
  store
})
app.$mount()
