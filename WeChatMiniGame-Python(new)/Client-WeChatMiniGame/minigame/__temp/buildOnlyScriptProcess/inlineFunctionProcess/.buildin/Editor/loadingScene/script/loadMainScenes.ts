import UIProgressBar from '../progressbar/scripts/UIProgressBar'
import LoadTask from '!!Only Export Engine Module, Cant Use Internal Module：engine/assets/load-task';
import engine from "engine";

enum ELoadStatus {
  loading,
  success,
  fail,
}

@engine.decorators.serialize("loadMainScenes")
export default class loadMainScenes extends engine.Script {
  @engine.decorators.property({
    type: engine.Transform2D
  })
  public retryBtn: engine.Transform2D

  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public percent: number = 0

  public finishLoading: boolean = false
  private lt3d: LoadTask<unknown> | undefined
  private lt2d: LoadTask<unknown> | undefined
  private scene2dLoadingStatus: ELoadStatus = ELoadStatus.loading
  private scene3dLoadingStatus: ELoadStatus = ELoadStatus.loading
  private game2dScene: engine.Scene
  private game3dScene: engine.Scene

  public async onAwake() {
    this.loadMainScene()
  }

  public loadMainScene() {
    // @ts-ignore
    const main3DsceneKey = GameGlobal.__main3DsceneKey
    // @ts-ignore
    const main2DsceneKey = GameGlobal.__main2DsceneKey

    if (!main3DsceneKey) {
      this.scene3dLoadingStatus = ELoadStatus.success
    } else if (this.scene3dLoadingStatus !== ELoadStatus.success) {
      this.lt3d = engine.loader.load(main3DsceneKey)
      this.lt3d.promise.then((_game3dScene) => {
        this.game3dScene = _game3dScene as engine.Scene
        this.scene3dLoadingStatus = ELoadStatus.success
        this.checkResult()
      }, () => {
        this.scene3dLoadingStatus = ELoadStatus.fail
        this.checkResult()
      })
    }

    if (!main2DsceneKey) {
      this.scene2dLoadingStatus = ELoadStatus.success
    } else if (this.scene2dLoadingStatus !== ELoadStatus.success) {
      this.lt2d = engine.loader.load(main2DsceneKey)
      this.lt2d.promise.then((_game2dScene) => {
        this.game3dScene = _game2dScene as engine.Scene
        this.scene2dLoadingStatus = ELoadStatus.success
        this.checkResult()
      }, () => {
        this.scene2dLoadingStatus = ELoadStatus.fail
        this.checkResult()
      })
    }

    this.checkResult()
  }

  private checkResult() {
    if (this.scene2dLoadingStatus === ELoadStatus.loading || this.scene3dLoadingStatus === ELoadStatus.loading) {
      return
    }
    if (this.scene2dLoadingStatus === ELoadStatus.fail || this.scene3dLoadingStatus === ELoadStatus.fail) {
      this.retry()
      return
    }
    engine.game.clearScene(true, true)
    if (this.game2dScene) {
      engine.game.playScene(this.game2dScene)
    }
    if (this.game3dScene) {
      engine.game.playScene(this.game3dScene)
    }
  }

  public retry() {
    if (this.retryBtn) {
      this.retryBtn.active = true
    }
  }

  public retryLoading() {
    this.loadMainScene()
  }

  public onUpdate(dt) {
    // if (this.scene2dLoadingStatus !== ELoadStatus.loading && this.scene3dLoadingStatus !== ELoadStatus.loading) {
    //   return
    // }
    let lt2dv = 0
    let lt3dv = 0
    if (!this.lt2d) {
      lt2dv = 1
    } else {
      const p = this.lt2d.progress
      lt2dv = p.current / p.total
    }

    if (!this.lt3d) {
      lt3dv = 1
    } else {
      const p = this.lt3d.progress
      lt3dv = p.current / p.total
    }

    this.percent = (lt2dv + lt3dv) * 0.5 * 100
    const barComp = this.entity.getComponent<UIProgressBar>(UIProgressBar)
    barComp.value = this.percent
  }

  public onDestroy() {

  }
}
