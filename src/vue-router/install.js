export default function install(Vue, options) {
  // Vue.mixin ===> mergeOptions ===> 生命周期合并为数组
  Vue.mixin({
    // 给所有组件的生命周期都增加beforeCreate方法
    beforeCreate() {
      // 根实例
      if (this.$options.router) {
        this._routerRoot = this; // 将根实例挂载到_routerRoot属性上
        this._router = this.$options.router; // 将当前router实例挂载在_router上
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    }
  })
}