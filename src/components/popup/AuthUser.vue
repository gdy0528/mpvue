<template>
  <van-popup
    :show="show"
    :close-on-click-overlay="false"
  >
    <div class="AuthUser">
      <button
        class="auth-btns"
        open-type="getUserInfo"
        @getuserinfo="handleClickUserInfo"
      >授权登录</button>
    </div>
  </van-popup>
</template>

<script>
import { getSetting, getUserInfo } from '@utils/weixin'
import { mapMutations } from 'vuex'
export default {
  name: 'AuthUser',
  data() {
    return {
      show: false
    }
  },
  methods: {
    ...mapMutations([
      'SET_WX_USER_INFO'
    ]),
    handleAuthUser() {  //判断是否授权
      let self = this
      getSetting("scope.userInfo").then(res => {
        getUserInfo().then(res => {
          // console.log(res)
          self.SET_WX_USER_INFO(res.userInfo)
        })
      }).catch(err => {
        self.show = true
      })
    },
    handleClickUserInfo(event) {  //点击授权
      let self = this
      let res = event.mp.detail
      if (res.userInfo) {
        self.show = false
        self.SET_WX_USER_INFO(res.userInfo)
      }
    }
  },
  mounted() {
    this.handleAuthUser() //判断是否授权
  },
}
</script>

<style lang="stylus" scoped>
.AuthUser
  width 300px
  padding 15px
  display flex
  flex-direction column
  justify-content center
  align-items center
  .auth-btns
    width 100%
    height 35px
    font-size $fontSize
    color $fontWhiteColor
    border-radius 17px
    background $bgMainColor
</style>
