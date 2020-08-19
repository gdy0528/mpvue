<template>
  <div class="painter">
    <poster-painter @imgUrl="handleChangeImgUrl"></poster-painter>
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
      imagePath: '' //图片地址
    }
  },
  methods: {
    handleClickSaveImg() {  //保存图片
      let { imagePath } = this
      if (imagePath) {
        saveImageToPhotosAlbum(imagePath)
      }
    },
    handleChangeImgUrl(url) { //获取图片
      this.imagePath = url
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
