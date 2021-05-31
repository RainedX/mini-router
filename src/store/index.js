import Vue from 'vue';
import Vuex from '../vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: 'rained',
    age: 29,
  },
  getters: {
    myAge(state) {
      return state.age + 1;
    },
  },
  mutations: {
    changeAge(state, payload) {
      state.age = state.age + payload;
    },
  },
  actions: {
    asyncChangeAge({ commit }, payload) {
      setTimeout(() => {
        commit('changeAge', payload);
      }, 1000);
    },
  },
  modules: {
    a: {
      namespaced: true,
      state: {
        name: 'rained-A',
        age: 9,
      },
      getters: {
        myAge(state) {
          return state.age + 100;
        },
      },
      mutations: {
        changeAge(state, payload) {
          state.age = state.age + payload;
        },
      },
      modules: {
        c: {
          namespaced: true,
          state: {
            name: 'rained-C',
            age: 9,
          },
          mutations: {
            changeAge(state, payload) {
              state.age = state.age + payload;
            },
          },
          actions: {
            asyncChangeAge({ commit }, payload) {
              setTimeout(() => {
                commit('changeAge', payload);
              }, 1000);
            },
          },
        },
      },
    },
    b: {
      namespaced: true,
      state: {
        name: 'rained-B',
        age: 10,
      },
      mutations: {
        changeAge(state, payload) {
          state.age = state.age + payload;
        },
      },
    },
  },
});

export default store;
