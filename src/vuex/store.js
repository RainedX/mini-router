import { applyMixin } from './mixin'

let Vue;

export class Store {
  constructor(options) {
    // this.$store = this.$options.store = new Vuex.Store() ===> 这里的this;
    this._vm = new Vue({
      data() {
        return {
          $$state: options.state
        }
      }
    })
  }
  get state() {
    return this._vm._data.$$state;
  }
}

export const install = (_Vue) =>{
  Vue = _Vue;
  applyMixin(Vue);
}