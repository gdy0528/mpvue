import { getStorageSync, showLoading, hideLoading, showToast } from '@utils/weixin'

const PROD_SERVICE = '' //线上环境
const DEV_SERVICE = 'http://tehf.junyuenk.vip/sc/api/'  //测试环境

let Fly = require('flyio/dist/npm/wx')
let fly = mpvuePlatform === 'wx' ? new Fly() : ''

// 设置超时
fly.config.timeout = 7000

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  if (request.loading) { showLoading("加载中...") }
  // 给所有请求添加自定义header
  const token = getStorageSync('token')
  request.headers['token'] = token
  return request
})

//添加响应拦截器
fly.interceptors.response.use((response) => {
  if (response.request.loading) { hideLoading() }
  if (response.data.code != 200 && response.request.toast) {
    showToast(res.data.msg)
  }
  return response.data
}, (error) => {
  if (response.request.loading) { hideLoading() }
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        console.log('错误请求')
        break;
      case 401:
        console.log('未授权，请重新登录')
        break;
      case 403:
        console.log('拒绝访问')
        break;
      case 404:
        console.log('请求错误,未找到该资源')
        break;
      case 405:
        console.log('请求方法未允许')
        break;
      case 408:
        console.log('请求超时')
        break;
      case 500:
        console.log('服务器端出错')
        break;
      case 501:
        console.log('网络未实现')
        break;
      case 502:
        console.log('网络错误')
        break;
      case 503:
        console.log('服务不可用')
        break;
      case 504:
        console.log('网络超时')
        break;
      case 505:
        console.log('http版本不支持该请求')
        break;
      default:
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    console.log('连接到服务器失败')
  }
  return error
}
)

function getSerive() {  //请求地址
  if (process.env.NODE_ENV === 'production') {
    return PROD_SERVICE
  } else {
    return DEV_SERVICE
  }
}

function getAction(url, params = {}, loading = true, toast = true) {
  if (fly) {
    fly.config.loading = loading
    fly.config.toast = toast
    return new Promise((resolve, reject) => {
      fly.get(getSerive() + url, params).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

function postAction(url, params = {}, loading = true, toast = true) {
  if (fly) {
    fly.config.loading = loading
    fly.config.toast = toast
    return new Promise((resolve, reject) => {
      fly.post(getSerive() + url, params).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export {
  getAction,
  postAction
}