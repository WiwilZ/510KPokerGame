import engine from 'engine'

export default class Utils {

  public static getChildByName(entity: engine.Entity, name: string): engine.Entity {
    const childrenCount = entity.transform2D.childrenCount;
    const childList = entity.transform2D.children;
    for (let i = 0; i < childrenCount; i++) {
      let child = childList[i].entity;
      if (child.name === name) {
        return child;
      }
    }
    let result = null
    for (let i = 0; i < childrenCount; i++) {
      let child = childList[i].entity;
      result = this.getChildByName(child, name)
    }
    return result
  }

  public static clamp(value: number, min: number, max: number): number {
    if (value < min)
      value = min;
    else if (value > max)
      value = max;
    return value;
  }

  public static clamp01(value: number): number {
    if (isNaN(value)) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}