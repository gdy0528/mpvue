<template>
  <div class="CommonBottom">
    <van-tabbar
      class="tabBar"
      :active="selected"
      :border="false"
      @change="handleChangeTabBar"
    >
      <van-tabbar-item
        v-for="(item, index) in tabBar"
        :key="index"
      >
        <span
          class="icon-text"
          :class="{'select_text' : item.path === route}"
        >{{item.name}}</span>
        <img
          class="icon-img"
          slot="icon"
          :src="item.normal"
        >
        <img
          class="icon-img"
          slot="icon-active"
          :src="item.active"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { switchTab } from '@utils/weixin'
export default {
  name: 'CommonBottom',
  data() {
    return {
      route: this.$root._route.path,
      tabBar: [	//底部导航
        {
          path: '/pages/home/main',
          name: '首页',
          normal: require('@img/ic-tabbar-home-off.png'),
          active: require('@img/ic-tabbar-home-on.png')
        },
        {
          path: '/pages/personal/main',
          name: '我的',
          normal: require('@img/ic-tabbar-mine-off.png'),
          active: require('@img/ic-tabbar-mine-on.png')
        },
      ]
    }
  },
  computed: {
    selected() {
      let { tabBar, route } = this
      return tabBar.findIndex(item => item.path == route)
    }
  },
  methods: {
    handleChangeTabBar(event) {	//当前选中的tab
      const index = event.mp.detail
      const { tabBar } = this
      let url = tabBar[index].path
      switchTab(url)
    }
  }
}
</script>

<style lang="stylus" scoped>
.CommonBottom
  height 0
  padding-bottom $bottomHeight
  overflow hidden
  & >>> .tabBar
    height $bottomHeight
    box-shadow 0px -11px 20px rgba(0, 0, 0, 0.04)
    .van-tabbar-item__icon
      margin-bottom 2px
    .icon-text
      font-size $fontMiniMumSize
      color $fontBlackColor
      &.select_text
        color $fontMainColor
    .icon-img
      width 24px
      height 24px
      display block
</style>
