import Vue from 'vue'
import Vuex from 'vuex'

import eventObj from '@/store/eventObj'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    awesome: true
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    eventObj
  }
})
