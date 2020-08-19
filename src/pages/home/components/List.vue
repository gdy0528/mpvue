<template>
  <div class="HealthyList">
    <van-tabs
      :active="active"
      sticky
      :offset-top="0"
      line-height="4"
      color="#4CADF8"
      :border="false"
      line-width="70"
    >
      <van-tab
        v-for="(item, index) in tab"
        :key="index"
        :title="item.name"
      >
        <div
          style="height: 200px"
          v-for="(v, i) in list"
          :key="i"
          @click="handleClickPainter(v.path)"
        >
          {{i}}-{{v.name}}
        </div>
        <TipsLoading v-if="false" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TipsLoading from '@common/tips/Loading'
export default {
  name: 'HealthyList',
  components: {
    TipsLoading
  },
  data() {
    return {
      active: 0, //选中的索引
      tab: [  //tab选项
        {
          name: '药',
          type: 'A'
        },
        {
          name: '器械',
          type: 'B'
        }
      ],
      list: [
        {
          name: "canvas绘画",
          path: '/pages/painter/main'
        },
        {
          name: "日历签到",
          path: '/pages/calendar/main'
        }
      ]
    }
  },
  methods: {
    handleClickPainter(path) {
      this.$router.push(path)
    }
  },
  onReachBottom() {

  }
}
</script>

<style lang="stylus" scoped></style>