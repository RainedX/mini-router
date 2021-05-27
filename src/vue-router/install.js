import View from './components/view'
import Link from './components/link'

export default function install(Vue, options) {
  // Vue.mixin ===> mergeOptions ===> 生命周期合并为数组
  // beforeCreate的调用是在mergeOptions之后
  // vm.$options = mergeOptions(vm.constructor.options || {}, options);
  // callHook(vm, 'beforeCreate')
  Vue.mixin({
    // 给所有组件的生命周期都增加beforeCreate方法
    beforeCreate() {
      // 根实例
      if (this.$options.router) {
        this._routerRoot = this; // 将根实例挂载到_routerRoot属性上
        this._router = this.$options.router; // 将当前router实例挂载在_router上
        
        // this._router是VueRouter的实例
        this._router.init(this);
        // 此时页面还没有渲染，在渲染之前把_route变成响应式，在router-view中使用$route 
        Vue.util.defineReactive(this, '_route', this._router.history.current); 
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
        // child可以通过this._routerRoot._router拿到router实例
      }
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
}