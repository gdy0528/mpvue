//painter插件 https://github.com/Kujiale-Mobile/Painter
// 拉取插件 git clone https://github.com/Kujiale-Mobile/PainterCore.git （路径）
// 更新插件 git submodule add https://github.com/Kujiale-Mobile/PainterCore.git （路径）

/**
 * @name: canvas绘制文字
 * @test: test font
 * @msg: 这是由Guody创建.
 * @param {
    common: {
      fontSize	字体大小	20rpx
      color	字体颜色	black
      maxLines	最大行数	不限，根据 width 来
      lineHeight	行高（上下两行文字baseline的距离）	fontSize 大小
      fontWeight	字体粗细。仅支持 normal, bold	normal
      textDecoration	文本修饰，支持 underline、 overline、 line-through，也可组合使用	无效果
      textStyle	fill： 填充样式，stroke：镂空样式	fill
      fontFamily	字体，如需加载网络字体，前提前使用 wx.loadFontFace 进行加载（https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html）	sans-serif
      background	文字背景颜色	无
      padding	文字背景颜色边际与文字间距	0rpx
      textAlign	文字的对齐方式，分为 left, center, right，view 的对齐方式请看 align 属性	left
    }
  } 
 */
export function setText(text, x, y, fontSize = 20, common = {}) {
  return ({
    type: 'text',
    text,
    css: [{
      left: `${x}rpx`,
      top: `${y}rpx`,
      fontSize: `${fontSize}rpx`
    }, common]
  })
}

/**
 * @name: 绘制图片
 * @test: test font
 * @msg: 这是由Guody创建.
 * @param {
    common: {
      width	image的宽度	auto
      height	image的高度	auto
      mode	图片裁剪、缩放的模式	aspectFill
      scaleToFill：不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
      aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
      注：mode 属性和小程序 image 的 mode 属性功能一致，只是支持的类型只有两种，且默认值不同。 当 width 或 height 属性设置为 auto 时，mode 属性失效
    }
  } 
 */
export function setImages(url, x, y, common = {}) {
  return ({
    type: 'image',
    url,
    css: [{
      left: `${x}rpx`,
      top: `${y}rpx`
    }, common]
  })
}

/**
 * @name: 绘制二维码
 * @test: test font
 * @msg: 这是由Guody创建.
 * @param {} 
 */
export function setQrcode(content, x, y, common = {}) {
  return ({
    type: 'qrcode',
    content,
    css: [{
      left: `${x}rpx`,
      top: `${y}rpx`
    }, common]
  })
}

/**
 * @name: 绘制矩形
 * @test: test font
 * @msg: 这是由Guody创建.
 * @param {} 
 */
export function serRect(width, height, x, y, common = {}) {
  return ({
    type: 'rect',
    css: [{
      width: `${width}rpx`,
      height: `${height}rpx`,
      left: `${x}rpx`,
      top: `${y}rpx`
    }, common]
  })
}