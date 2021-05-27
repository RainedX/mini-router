import createRouteMap from "./create-route-map"
import { createRoute } from "./history/base"

// 返回2个方法：match addRoutes
export default function createMatcher(routes) {
  let { pathMap } = createRouteMap(routes)
  // 动态添加路由
  function addRoutes(newRoutes) {
    createRouteMap(newRoutes, pathMap)
  }

  // 根据路径匹配路由
  function match(path) {
    let record = pathMap[path];

    return createRoute(record, {
      path
    });
  }

  return {
    addRoutes,
    match
  }
}