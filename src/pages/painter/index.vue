<template>
  <div class="painter">
    <poster-painter
      ref="PosterPainter"
      @imgUrl="handleChangeImgUrl"
    ></poster-painter>
    <button @click="handleClickSaveImg">保存图片至手机</button>
  </div>
</template>

<script>
import PosterPainter from '@common/painter/Poster'
import { saveImageToPhotosAlbum } from '@utils/weixin'
export default {
  name: 'Painter',
  components: {
    PosterPainter
  },
  data() {
    return {
      isSave: false,  //是否保存图片
      imagePath: '' //图片地址
    }
  },
  methods: {
    handleClickSaveImg() {  //保存图片
      let { imagePath, isSave } = this
      if (imagePath && typeof imagePath === 'string') {
        this.isSave = false
        saveImageToPhotosAlbum(imagePath)
      } else if (!isSave) {
        this.isSave = true
        this.$refs.PosterPainter.handleSaveImages() //生成默认图片
      }
    },
    handleChangeImgUrl(url) { //获取图片
      let { isSave } = this
      this.imagePath = url
      if (isSave) {
        this.handleClickSaveImg()
      }
    }
  }
}
</script>

<style lang="stylus" scoped></style>
