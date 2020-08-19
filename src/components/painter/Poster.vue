<template>
  <div class="PosterPainter">
    <painter
      :customStyle="customStyle"
      @imgOK="handleChangeImgOk"
      :dancePalette="template"
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
      imagePath: '',  //图片路径
      customStyle: "margin-left:25rpx;margin-top:30rpx;",
      template: { //绘画模板
        width: '700rpx',
        height: '1000rpx',
        background: '#FFFFFF',
        borderRadius: '20rpx',
        views: [
          CTR.setImages('/static/img/painter-bg.jpg', 0, 0, {
            width: '700rpx',
            height: '1000rpx'
          }),
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
          CTR.setImages('/static/img/painter01.png', 50, 90, {
            width: '600rpx',
            height: '250rpx'
          })
        ]
      }
    }
  },
  methods: {
    handleChangeImgOk(e) {  //监听绘画的地址
      this.imagePath = e.mp.detail.path
      this.$emit('imgUrl', e.mp.detail.path)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
