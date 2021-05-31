import { applyMixin } from './mixin';
import ModuleCollection from './module/module-collection';
import { forEachValue } from './utils';

let Vue;

const installModule = (store, path, module, rootState) => {
  let namespace = store._modules.getNamespace(path);
  // 将子模块的状态定义在根模块上
  if (path.length > 0) {
    let parentList = path.slice(0, -1);
    let parent = parentList.reduce((memo, current) => {
      return memo[current];
    }, rootState);
    Vue.set(parent, path[path.length - 1], module.state);
  }
  module.forEachMutation((mutation, key) => {
    store.mutations[namespace + key] = store.mutations[namespace + key] || [];
    store.mutations[namespace + key].push(payload =>
      mutation.call(store, module.state, payload),
    );
  });
  module.forEachAction((action, key) => {
    store.actions[namespace + key] = store.actions[namespace + key] || [];
    store.actions[namespace + key].push(payload => action.call(store, store, payload));
  });
  module.forEachChildren((childModule, key) => {
    installModule(store, path.concat(key), childModule, rootState);
  });
  module.forEachGetter((getter, key) => {
    store.wrappedGetters[namespace + key] = () => {
      return getter.call(store, module.state);
    };
  });
};

function resetStoreVM(store, state) {
  const computed = {};
  store.getters = {};
  const wrappedGetters = store.wrappedGetters;
  forEachValue(wrappedGetters, (fn, key) => {
    computed[key] = () => {
      return fn(store.state);
    };
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
    });
  });
  store._vm = new Vue({
    data: {
      $$state: state,
    },
    computed,
  });
}

export class Store {
  constructor(options) {
    this._modules = new ModuleCollection(options);
    this.mutations = {};
    this.actions = {};
    this.getters = {};
    this.wrappedGetters = {};

    let state = options.state;
    installModule(this, [], this._modules.root, state);
    resetStoreVM(this, state);
  }
  get state() {
    return this._vm._data.$$state;
  }
  commit = (type, payload) => {
    this.mutations[type] && this.mutations[type].forEach(fn => fn((this.state, payload)));
  }
  dispatch = (type, payload) => {
    this.actions[type] && this.actions[type].forEach(fn => fn((this, payload)));
  }
}

export const install = _Vue => {
  Vue = _Vue;
  applyMixin(Vue);
};

// function Store() {
//   let { commit } = this;
//   this.commit = () => {
//     commit.call(this);
//   }
// }

// let { commit } = new Store()

// 生成树结构

// let _root = {
//   _rawModule:{ state, mutations, getters, actions,.... },
//   _children: {
//     a: {
//       _rawModule: { state, mutations, getters, actions,.... },
//       _children: {
//         c: {
//           _rawModule: { state, mutations, getters, actions,.... },
//           _children: {},
//           state: { xxx }
//         }
//       },
//       state: aState
//     },
//     b: {
//       _rawModule: { state, mutations, getters, actions,.... },
//       _children: {
//         c: {
//           _rawModule: { state, mutations, getters, actions,.... },
//           _children: {},
//           state: { xxx }
//         }
//       },
//       state: bState
//     }
//   },
//   state: rootState
// }
