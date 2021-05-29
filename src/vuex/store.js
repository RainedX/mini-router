import { applyMixin } from './mixin'

let Vue;

function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export class Store {
  constructor(options) {
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    const computed = {};
    // this.$store = this.$options.store = new Vuex.Store() ===> 这里的this;

    forEachValue(options.getters, (value, key) => {
      computed[key] = () => {
        return value.call(this, this.state)
      }

      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })
    this._vm = new Vue({
      data() {
        return {
          $$state: options.state
        }
      },
      computed
    })
    forEachValue(options.mutations, (value, key) => {
      this.mutations[key] = (payload) => {
        return value.call(this, this.state, payload)
      }
    })
    forEachValue(options.actions, (value, key) => {
      this.actions[key] = (payload) => {
        return value.call(this, this, payload)
      }
    })
  }
  get state() {
    return this._vm._data.$$state;
  }
  commit = (type, payload) => {
    this.mutations[type](payload)
  }
  dispatch = (type, payload) => {
    this.actions[type](payload)
  }
}

export const install = (_Vue) =>{
  Vue = _Vue;
  applyMixin(Vue);
}


// function Store() {
//   let { commit } = this;
//   this.commit = () => {
//     commit.call(this);
//   }
// }

// let { commit } = new Store()