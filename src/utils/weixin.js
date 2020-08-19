export function getStorageSync(key) {  //获取缓存值
  return mpvuePlatform === 'wx' ? wx.getStorageSync(key) : ''
}

export function setStorageSync(key, val) { //设置缓存值
  if (mpvuePlatform === 'wx') {
    wx.setStorageSync(key, val)
  }
}

export function removeStorage(key) { //删除对应缓存
  if (mpvuePlatform === 'wx') {
    wx.removeStorage(key)
  }
}

export function showLoading(data) {  //显示加载
  mpvue.showLoading({
    title: data,
    mask: true
  })
}

export function hideLoading() {  //隐藏加载
  mpvue.hideLoading()
}

export function showToast(title, icon = 'none') {  //显示提示
  mpvue.showToast({
    title, //提示的内容,
    icon, //图标,
    duration: 2000, //延迟时间,
    mask: true, //显示透明蒙层，防止触摸穿透,
  })
}

export function hideToast() {  //隐藏提示
  mpvue.hideToast()
}

export function showModal(data) {  //显示对话确认&取消
  return new Promise((resolve, reject) => {
    mpvue.showModal({
      title: data.title, //提示的标题,
      content: data.content, //提示的内容,
      showCancel: data.showCancel || true, //是否显示取消按钮,
      cancelText: data.cancelText || '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
      cancelColor: data.cancelColor || '#000000', //取消按钮的文字颜色,
      confirmText: data.confirmText || '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
      confirmColor: data.confirmColor || '#3CC51F', //确定按钮的文字颜色,
      success: res => {
        if (res.confirm) {
          resolve(res)
        } else if (res.cancel) {
          reject(res)
        }
      }
    })
  })
}

export function getSetting(scope) { //查看是否授权
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (res.authSetting[scope]) {
          resolve(res)
        } else {
          reject(res)
        }
      }
    })
  })
}

export function openSetting(scope) {  //已经向用户请求过的权限
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success(res) {
        if (res.authSetting[scope]) {
          resolve(res)
        } else {
          reject(res)
        }
      }
    })
  })
}

export function getUserInfo() {  //获取用户授权
  return new Promise((resolve) => {
    wx.getUserInfo({
      success: function (res) {
        resolve(res)
      }
    })
  })
}

export function authorize(scope) { //授权功能
  return new Promise((resolve, reject) => {
    wx.authorize({
      scope,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export function switchTab(url) {  //跳转非tabbar
  wx.switchTab({ url })
}

export function saveImageToPhotosAlbum(filePath) {  //保存图片至手机
  getSetting("scope.writePhotosAlbum").then(() => {
    wx.saveImageToPhotosAlbum({
      filePath, //图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径,
      success: res => {
        showToast('海报已保存，快去分享给好友吧')
      }
    })
  }).catch(() => {
    authorize("scope.writePhotosAlbum").then(() => {
      showToast('图片功能授权成功')
    }).catch(err => {
      if(err.errMsg != "authorize:fail auth deny") {  //第一次拒绝授权图片保存
        let data = {
          title: '提示',
          content: '若点击不授权，将无法使用保存图片功能',
          cancelText: '不授权',
          confirmText: '授权',
        }
        showModal(data).then(() => {
          openSetting("scope.writePhotosAlbum")
        }).catch(() => {
          console.log("用户点击不授权")
        })
      }
    })
  })
}
