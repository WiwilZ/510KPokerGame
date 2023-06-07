
// import EngineTutorial from 'EngineTutorial'
// @ts-ignore
const EngineTutorial = window.__tutorial__

interface IHookArgs {
  [key: string]: any
}

export default class demoHooks extends EngineTutorial.Hooks {

  @EngineTutorial.decorators.Hooks('searchProject', "engineIDEView", {
    args: ["fileName"]
  })
  async searchProject() {
    // @ts-ignore
    const { hookArgs, gameEditor } = this.ReferenceObjects
    const searchStr =  hookArgs.fileName
    gameEditor.assets.searchAsset(searchStr)
    // 延迟下，等搜索查询完成
    await new Promise((resolve => {
      setTimeout(() => {
        resolve({})
      }, 100)
    }))
  }

  @EngineTutorial.decorators.Hooks('searchEntity', "engineIDEView", {
    args: ["entityName"]
  })
  async searchEntity() {
    // @ts-ignore
    const { hookArgs, gameEditor } = this.ReferenceObjects
    const searchStr = hookArgs.entityName
    gameEditor.hierarchy.searchEntity(searchStr)
    // 延迟下，等搜索查询完成
    await new Promise((resolve => {
      setTimeout(() => {
        resolve({})
      }, 100)
    }))
  }

  @EngineTutorial.decorators.Hooks('locateHierarchyEntityByName', "engineIDEView", {
    args: ["entityName"]
  })
  async locateEntityByName() {
    // @ts-ignore
    const { hookArgs, gameEditor } = this.ReferenceObjects
    const entityName = hookArgs.entityName
    gameEditor.hierarchy.locateEntityByName(entityName)
  }

  @EngineTutorial.decorators.Hooks('locateProjectFileByPath', "engineIDEView", {
    args: ["filePath"]
  })
  async locateProjectFileByPath() {
    // @ts-ignore
    const { hookArgs, gameEditor } = this.ReferenceObjects
    const filePath = hookArgs.filePath
    await gameEditor.assets.locateProjectFileByPath(filePath)
  }

  @EngineTutorial.decorators.Hooks('openFileBySystemDefaultProgramFromProjectPath', "engineIDEView", {
    args: ["filePath"]
  })
  async openFileBySystemDefaultProgramFromProjectPath() {
    // @ts-ignore
    const { hookArgs, gameEditor } = this.ReferenceObjects
    const filePath = hookArgs.filePath || ""
    await gameEditor.project.openFileBySystemDefaultProgramFromProjectPath(filePath)
  }

}
