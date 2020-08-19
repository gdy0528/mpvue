import moment from 'moment'
import { showToast } from '@utils/weixin'

//判断是否为空
export function insEmpty(val, desc) {
  //为空或全部为空格
  if (val.length < 1 || val.match(/^[ ]*$/)) {
    showToast(desc)
    return
  }
  return true
}

//判断姓名
export function insName(name) {
  if (name.length < 0 || name == "") {
    showToast('姓名不能为空')
    return
  } else if (/[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g.test(name)) {
    showToast('姓名格式存在特殊符号')
    return
  } else if (name.length > 6) {
    showToast('姓名最多为6位')
    return
  } else {
    return true
  }
}

//判断中文
export function insChinese(val, desc) {
  if (val.length < 1 || val.match(/^[ ]*$/)) {
    showToast(`${desc}不能为空`)
    return
  } else if (!/^[\u4e00-\u9fa5]+$/.test(val)) {
    showToast(`${desc}必须为中文汉字`)
    return
  }
  return true
}

//判断密码
export function insPwd(pwd) {
  if (pwd.length < 0 || pwd == "") {
    showToast('密码不能为空')
    return
  } else if (!/^[0-9A-Za-z]{6,12}$/.test(pwd)) {
    showToast('密码必须为6-12字母数字组合')
    return
  } else {
    return true
  }
}

//判断手机号码
export function insPhone(phone) {
  if (phone.length < 0 || phone == "") {
    showToast('手机号不能为空')
    return
  } else if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)) {
    showToast('手机号码格式有误')
    return
  } else {
    return true
  }
}

//判断银行卡号
export function insBankCard(bank) {
  if (bank.length < 0 || bank == "") {
    showToast('银行卡号不能为空')
    return
  } else if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(bank)) {
    showToast('请输入正确的银行卡号')
    return
  } else {
    return true
  }
}

//判断银行卡开户支行
export function insBranch(branch) {
  if (branch.length < 0 || branch == "") {
    showToast('开户支行不能为空')
    return
  } else if (branch.length > 20) {
    showToast('开户支行上限为21位')
    return
  } else if (!/^[\u4e00-\u9fa5]+$/.test(branch)) {
    showToast('开户支行必须为中文汉字')
    return
  } else {
    return true
  }
}

//咨询消息列表时间规则
export function timeRule(date) {
  let dateVal = moment(date).format('YYYY-MM-DD')  //得出后台时间年月日
  let currentDate = moment().format('YYYY-MM-DD')  //获取当天年月日
  let yearVal = moment(date).format('YYYY')  //得出后台的年份
  let currentYear = moment().format('YYYY')  //获取当天年份
  let hourMinute = moment(date).format('HH:mm') //时分
  let monthDate = moment(date).format('MM-DD')  //月日
  if (dateVal == currentDate) {
    //判断是否为今天，当天的显示（时分
    return hourMinute
  } else {
    //判断是否今年  当年的显示（月日）, 不是今年 未来时间与往年的显示（年月日）
    return yearVal == currentYear ? monthDate : dateVal
  }
}

//拿上一条消息的时间与新的消息时间做对比
export function sendTimeRule(lastTime, newTime) {
  let moment = require('moment')
  let timeOut = 5 * 60 * 1000   //5分钟的毫秒
  let sendStamp = moment(lastTime).valueOf()  //发送的时间戳
  let currentStamp = moment(newTime).valueOf()   //当前时间戳
  let hourMinute = moment(newTime).format('HH:mm') //时分
  //是否大于5分钟 返回最新的时间 （时分）,否则不返回
  return currentStamp - sendStamp > timeOut ? hourMinute : false
}

//计算消息前后时间(上一条时间，下一条时间)
export function computedNewMsgTime(last, next) {
  let moment = require('moment')
  let lastTime = moment(last)
  let nextTime = moment(next)
  if (nextTime.diff(lastTime, 'minute') >= 5) {
    return true
  } else {
    return false
  }
}

//聊天消息时间规则
export function msgTimeRule(date) {
  let moment = require('moment')
  let dateVal = moment(date).format('YYYY-MM-DD')  //得出后台时间年月日
  let currentDate = moment().format('YYYY-MM-DD')  //获取当天年月日
  let yearVal = moment(date).format('YYYY')  //得出后台的年份
  let currentYear = moment().format('YYYY')  //获取当天年份
  let hourMinute = moment(date).format('HH:mm') //时分
  let monthDate = moment(date).format('MM-DD HH:mm')  //月日
  let ymd = moment(date).format('YYYY-MM-DD HH:mm')  //月日
  if (dateVal == currentDate) {
    //判断是否为今天，当天的显示（时分
    return hourMinute
  } else {
    //判断是否今年  当年的显示（月日时分）, 不是今年 未来时间与往年的显示（年月日）
    return yearVal == currentYear ? monthDate : ymd
  }
}

//判断两个对象是否相等
export function diffObj(obj1, obj2) {
  let o1 = obj1 instanceof Object
  let o2 = obj2 instanceof Object
  if (!o1 || !o2) {/*  判断不是对象  */
    return obj1 === obj2
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }
  for (let attr in obj1) {
    let t1 = obj1[attr] instanceof Object
    let t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}

//计算字符长度，包括中英文
export function strLength(str) {
  let realLength = 0,
    len = str.length,
    charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    charCode > 0 && charCode <= 128 ? realLength += 1 : realLength += 2
  }
  return realLength
}

//截取字符长度，包含中英文字符，中文字符算俩个，英文字符算一个
export function cutStr(str, len) {
  let char_length = 0
  for (let i = 0; i < str.length; i++) {
    let son_str = str.charCodeAt(i)
    son_str > 0 && son_str <= 128 ? char_length += 1 : char_length += 2
    if (char_length >= len) {
      return str.substr(0, i + 1) + "..."
    }
  }
}
