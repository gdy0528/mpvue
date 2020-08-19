import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import creatPersistedState from 'vuex-persistedstate'
import { setStorageSync, getStorageSync } from '@utils/weixin'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  plugins: [
    creatPersistedState({
      storage: {
        getItem: key => getStorageSync(key),
        setItem: (key, value) => setStorageSync(key, value),
        removeItem: () => {}
      }
    })
  ]
})
