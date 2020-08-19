<template>
  <div class="HealthyMain">
    <div class="HealthyContent">
      <healthy-list></healthy-list>
    </div>
    <CommonBottom />
    <AuthUser />
  </div>
</template>

<script>
import HealthyList from './components/List'
import CommonBottom from '@common/bottom/Bottom'
import AuthUser from '@common/popup/AuthUser'
export default {
  name: 'Healthy',
  components: {
    HealthyList,
    CommonBottom,
    AuthUser
  }
}
</script>

<style lang="stylus" scoped>
  .images
    width 100px
    height 100px
</style>
