
import engine from "engine";
import loadMainScenes from './loadMainScenes'

@engine.decorators.serialize("retryBtn")
export default class retryBtn extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  @engine.decorators.property({
    type: loadMainScenes
  })
  public loadMainScenesComp: loadMainScenes

  public onClick() {
    this.entity.transform2D.active = false
    if (this.loadMainScenesComp) {
      this.loadMainScenesComp.retryLoading()
    }
  }
  
  public onAwake() {

  }
  public onUpdate(dt) {

  }
  public onDestroy() {

  }
}
