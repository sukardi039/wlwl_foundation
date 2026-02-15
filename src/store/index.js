import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedinuser: {},
    paramdata: {},
    drilldata: {}
  },
  mutations: {
    setSignedinuser(state, usr){
      state.signedinuser = usr
    },
    setDrilldata(state, dat) {
      state.drilldata = dat
    },
    setParamdata(state, par) {
      state.paramdata = par
    }
  },
  actions: {
  },
  modules: {
  }
})
