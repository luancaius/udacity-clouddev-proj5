import Vue from 'vue'
import Vuex from 'vuex'

import eventObj from '@/store/eventObj'
import group from '@/store/groups'

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
    eventObj,
    group
  }
})
