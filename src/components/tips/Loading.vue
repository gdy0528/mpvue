<template>
  <div class="TipsLoading">
    <van-loading custom-class="loading-box">加载中...</van-loading>
  </div>
</template>

<script>
export default {
  name: 'TipsLoading'
}
</script>

<style lang="stylus" scoped>
  .TipsLoading
    & >>> .loading-box 
      width 100%
      padding 10px 0
      .van-loading__text
        font-size 12px
      .van-loading__spinner--circular 
        width 20px
        height 20px
</style>
