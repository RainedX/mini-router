export function createRoute(record, location) {
  let res = [];

  while(record) {
    res.unshift(record)
    record = record.parent
  }
 
  return {
    location,
    matched: res
  }
}


export default class History {
  constructor(router) {
    this.router = router;
    // 将current变成响应式，current变化更新视图
    this.current = createRoute(null, {
      path: '/',
    });
  }
  // 根据路径进行组件渲染
  transitionTo(location, onComplete) {
    let route = this.router.match(location); // route = { path: '/about/a', matched: [{}, {}]  }
    this.current = route;
    this.cb(route);
    onComplete && onComplete();
  }

  listen(cb) {
    this.cb = cb
  }
}
