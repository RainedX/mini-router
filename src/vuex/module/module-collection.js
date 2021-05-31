import { forEachValue } from "../utils";
import Module from "./module";

export default class ModuleCollection {
  constructor(options) {
    this.root = null;
    this.register([], options);
  }

  register(path, rootModule) {
    let newModule = new Module(rootModule);

    if (path.length === 0) {
      this.root = newModule;
    } else {
      // 需要将当前模块定义到父模块上
      let parentList = path.slice(0, -1);
      let parent = parentList.reduce((memo, current) => {
        return memo.getChild(current)
      }, this.root)
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rootModule.modules) {
      forEachValue(rootModule.modules, (module, moduleName) => {
        this.register(path.concat(moduleName), module)
      })
    }
  }
}