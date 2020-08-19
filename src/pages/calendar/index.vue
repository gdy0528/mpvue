<template>
  <div class="Calendar">
    <Calendar
      ref="calendar"
      :now="now"
      :tileContent="tileContent"
      @select="select"
      @selectYear="selectYear"
      @selectMonth="selectMonth"
      @prev="prev"
      @next="next"
    />
  </div>
</template>

<script>
import Calendar from 'mpvue-calendar'
import 'mpvue-calendar/src/style.css'
import { showToast } from '@utils/weixin'
import moment from 'moment'
export default {
  name: 'Calendar',
  components: {
    Calendar
  },
  data() {
    return {
      year: '', //当前年份
      month: '',  //当前月份
      now: false, //不显示当前日期的字
      signList: ['2020-8-13', '2020-8-14', '2020-8-16'], //签到日期
      tileContent: []  //日期备注
    }
  },
  methods: {
    select(val, obj) {  //日期回调
      let { signList } = this
      let TimevalueOf = moment(moment().format('YYYY-M-D'),'YYYY-M-D').valueOf()
      let cureentTimeValueOf = moment(obj.date,'YYYY-M-D').valueOf()
      if (obj.content) {
        showToast("已签到过,请勿重复签到")
      } else if (TimevalueOf < cureentTimeValueOf) {
        showToast("还没到签到时间")
      } else if (TimevalueOf > cureentTimeValueOf) {
        showToast("错过签到时间")
      } else {
        showToast("签到成功","suceess")
        this.handleSignList(signList, obj.date)
      }
    },
    selectYear(year) {  //选择年份
      this.year = year
    },
    selectMonth(month, year) {  //选择年月份
      this.year = year
      this.month = month
    },
    prev(year, month, weekIndex) {  //上一个月
      this.year = year
      this.month = month
    },
    next(year, month, weekIndex) {  //下一个月
      this.year = year
      this.month = month
    },
    renderer(year, month) { //重新渲染
      let { signList } = this
      this.$refs.calendar.renderer(year, month)
      this.handleSignList(signList) //处理签到日期
    },
    getDate() {  //获取当前年月份
      let year = moment().format('YYYY')
      let month = moment().format('M')
      this.renderer(year, month)
    },
    handleSignList(arr1, arr2 = []) {  //处理签到日期
      let signArray = arr1.concat(arr2)
      let tileContent = []  //定义空数组
      this.signList = signArray
      for (let i in signArray) {
        tileContent.push({
          date: signArray[i],
          className: 'holiday',
          content: '已签到'
        })
      }
      this.tileContent = tileContent
    }
  },
  mounted() {
    this.getDate()  //获取当前年月份
  }
}
</script>

<style lang="stylus" scoped>
  .Calendar
    & >>> .holiday
      .slot-element
        margin-top -10px
        font-size $fontMiniMumSize
        color $fontMainColor
</style>