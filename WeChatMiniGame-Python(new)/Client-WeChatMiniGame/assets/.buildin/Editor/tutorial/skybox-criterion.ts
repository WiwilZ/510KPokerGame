// import EngineTutorial from 'EngineTutorial'
// @ts-ignore
const EngineTutorial = window.__tutorial__
@EngineTutorial.decorators.Criterion('skyBoxCriterion', "engineIDEView", {})
export default class SkyboxCriterion extends EngineTutorial.Criterion {

  async evaluateCompletion() {
    // @ts-ignore
    const { gameEditor }  = this.ReferenceObjects
    // 设置天空盒材质
    const settings = await gameEditor.scene.getSceneSettings()
    const isCompleted = settings.ambientMode === 0 && (settings.skyBox && settings.skyBox.resourceID === "599fefR-48c774E-522080S-c79bc3R")
    this.completed = isCompleted
  }

}

