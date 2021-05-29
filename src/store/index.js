import Vue from 'vue'
import Vuex from '../vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'rained',
    age: 29
  },
  getters: {
    myAge(state) {
      console.log(1111, 'ok');
      return state.age + 1
    }
  },
  mutations: {
    changeAge(state, payload) {
      state.age = state.age + payload
    }
  },
  actions: {
    asyncChangeAge({ commit }, payload) {
      setTimeout(() => {
        commit('changeAge', payload)
      }, 1000);
    }
  },
  modules: {
  }
})
