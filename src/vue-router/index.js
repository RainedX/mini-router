import createMatcher from './create-matcher';
import HashHistory from './history/hash';
import BrowserHistory from './history/history';
import install from './install';

export default class VueRouter {
  constructor(options) {
    // 路由的核心：根据用户的路径配置 ===> 返回对应的组件 ===> 页面跳转时渲染组件
    this.matcher = createMatcher(options.routes || []);
    this.beforeHooks = []
    // 根据当前的mode创建不同的history管理策略
    let mode = options.mode || 'hash';
    switch (mode) {
      case 'hash':
        this.history = new HashHistory(this);
        break;
      case 'history':
        this.history = new BrowserHistory(this);
        break;
    }
  }
  match(location) {
    return this.matcher.match(location);
  }
  addRoutes(routes) {
    this.matcher.addRoutes(routes);
  }
  push(location) {
    this.history.push(location)
  }
  go(n) {
    this.history.go(n);
  }
  back() {
    this.go(-1);
  }
  forward() {
    this.go(1);
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn)
  }
  // app是根实例
  init(app) {
    // 路由初始化
    const history = this.history;
    const setupHashListener = () => {
      history.setupListener();
    };

    history.listen(route => {
      app._route = route;
    });
    // 跳转成功后注册路径监听，为视图更新做准备
    history.transitionTo(history.getCurrentLocation(), setupHashListener);
  }
}

VueRouter.install = install;
