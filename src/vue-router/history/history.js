import History from "./base";

export default class BrowserHistory extends History {
  constructor(router) {
    super(router);
  }
  getCurrentLocation() {
    return window.location.pathname + window.location.search + window.location.hash;
  }
  setupListener() {
    //  popstate可以监听到浏览器的前进后退，但是页面的点击监听不到
    window.addEventListener('popstate', () => {
      this.transitionTo(this.getCurrentLocation())
    })
  }
  push(location) {
    // 跳转的时候不会调用popstate
    this.transitionTo(location, () => {
      window.history.pushState({}, null, location)
    })
  }
}