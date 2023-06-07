
import engine from "engine";
@engine.decorators.serialize("__DefaultEmptyScript")
export default class __DefaultEmptyScript extends engine.Script {
  // public onDeserialized(data: any, context: any, builtContext: any): void {
  //   this.__jsonData = data;
  // }

  // public onSerialized(this: any/*SerializedObject*/, dataJson) {
  //   if (this.targetObject.__jsonData) {
  //     Object.keys(this.targetObject.__jsonData).forEach((key) => {
  //       dataJson[key] = this.targetObject.__jsonData[key];
  //     })
  //   }
  // }

  public __missing = true;
  // public __jsonData = null;

  public onAwake() {

  }
  public onUpdate(dt) {

  }
  public onDestroy() {

  }
}
