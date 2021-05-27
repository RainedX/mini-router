export default {
  functional: true,
  name: 'RouterView',
  render(h, { data, parent }) {
    // 依赖收集
    let depth = 0;
    let route = parent.$route;
    let records = route.matched;

    data.routerView = true;

    while(parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }

      parent = parent.$parent;
    }

    if (!records[depth]) {
      return h();
    }

    return h(records[depth].component, data)
  }
}

// $vnode 组件的虚拟节点
// _vnode 组件渲染的内容虚拟节点