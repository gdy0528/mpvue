<template>
  <van-image 
    class="LazyImage" 
    lazy-load
    :show-error="showError"
    :error-icon="iconError"
    :show-loading="showLoading"
    :loading-icon="iconLoading"
    :round="round"
    :src="url">
  </van-image>
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    url: String,
    showError: {  
      type: Boolean,  
      default: true
    },
    iconError: {
      type: String,  
      default: "warning-o"
    }, 
    showLoading: {  
      type: Boolean,  
      default: true
    },
    iconLoading: {
      type: String,  
      default: "photo-o"
    }, 
    round: {  
      type: Boolean,  
      default: true
    }, 
  }
}
</script>

<style lang="stylus" scoped>
  .LazyImage
    width 100%
    height 100%
    display block
    background $bgLightGrayColor
    overflow hidden
    & >>> .van-image
      width 100%
      height 100%
      display block
</style>