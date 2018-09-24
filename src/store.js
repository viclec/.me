import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    color: '',
    repo: ''
  },
  mutations: {
    mutateRepo: function (state, payload) {
      state.repo = payload
   }
  },
  actions: {
    updateRepo: function ({commit}, payload) {
      console.log('feafae')
      commit('mutateRepo', payload)
    }
  }
})
