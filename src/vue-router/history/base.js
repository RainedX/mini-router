export function createRoute(record, location) {
  let res = [];

  while (record) {
    res.unshift(record);
    record = record.parent;
  }

  return {
    location,
    matched: res,
  };
}

function runQueue(queue, iterator, cb) {
  function step(index) {
    if(index >= queue.length) {
      cb()
    } else {
      let hook = queue[index]
      iterator(hook, () => {
        step(index+1)
      })
    }
  }

  step(0)
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
    if (
      location === this.current.path &&
      route.matched.length === this.current.matched.length
    ) {
      return;
    }

    let queue = [].concat(this.router.beforeHooks);

    const iterator = (hook, next) => {
      hook(route, this.current, () => {
        next();
      })
    }

    runQueue(queue, iterator, () => {
      this.updateRoute(route);
      onComplete && onComplete();
    });
  }

  listen(cb) {
    this.cb = cb;
  }
  updateRoute(route) {
    this.current = route;
    this.cb(route);
  }
}