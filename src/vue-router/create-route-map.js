
function addRouteRecord(route, pathMap, parent) { // pathMap = { 路径： 记录 }
  // 儿子路径不是以 '/'开头
  let path = parent ? `${parent.path}/${route.path}` : route.path;

  let record = {
    path: path,
    parent,
    component: route.component,
    name: route.name,
    props: route.props,
    params: route.params || {},
    meta: route.mata
  }

  if (!pathMap[path]) {
    pathMap[path] = record;
  }

  if (route.children) {
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathMap, record)
    });
  }
}

// 一个参数是初始化
// 2个参数是动态添加路由
export default function createRouteMap(routes, oldPathMap) {
  let pathMap = oldPathMap || Object.create(null);

  routes.forEach(route => {
    addRouteRecord(route, pathMap, null);
  });

  return {
    pathMap
  }
}