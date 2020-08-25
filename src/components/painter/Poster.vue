<template>
  <div class="PosterPainter">
    <painter
      :customStyle="customStyle"
      @imgOK="handleChangeImgOk"
      :dancePalette="dancePalette"
      :palette="paintPallette"
      use2D
    />
  </div>
</template>

<script>
import * as CTR from '@utils/PosterCanvas'
export default {
  name: 'PosterPainter',
  data() {
    return {
      customStyle: "margin-left:25rpx;margin-top:30rpx;",
      paintPallette: '',  //保存图片模板
      dancePalette: { //绘画模板
        width: '700rpx',
        height: '1000rpx',
        background: '#FFFFFF',
        borderRadius: '20rpx',
        views: [
          // CTR.setImages(require('@img/banner.jpg'), 0, 0, {
          //   width: '700rpx',
          //   height: '1000rpx'
          // }),
          CTR.setText("程序开发", 135, 57, 22, {
            color: "#FFFFFF"
          }),
          CTR.serRect(20, 20, 101, 58, {
            color: '#FFFFFF'
          }),
          CTR.setText("IT开发", 344, 57, 22, {
            color: "#FFFFFF"
          }),
          CTR.serRect(20, 20, 314, 58, {
            color: '#FFFFFF'
          }),
          CTR.setText("小程序", 531, 57, 22, {
            color: "#FFFFFF"
          }),
          CTR.serRect(20, 20, 497, 58, {
            color: '#FFFFFF'
          }),
          // CTR.setImages(require('@img/title.png'), 50, 90, {
          //   width: '600rpx',
          //   height: '250rpx'
          // }),
          // CTR.setImages(require('@img/left.png'), 50, 400, {
          //   width: '160rpx',
          //   height: '53rpx'
          // }),
          // CTR.setImages(require('@img/right.png'), 500, 400, {
          //   width: '160rpx',
          //   height: '53rpx'
          // })
        ]
      }
    }
  },
  methods: {
    handleChangeImgOk(e) {  //监听绘画的地址
      this.$emit('imgUrl', e.mp.detail.path)
    },
    handleSaveImages() {   //生成默认图片
      this.paintPallette = this.dancePalette
    }
  },
  onUnload() {  //监听页面卸载
    this.paintPallette = ""
  }
}
</script>

<style lang="stylus" scoped></style>
