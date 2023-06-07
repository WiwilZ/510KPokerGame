"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EngineTutorial = window.__tutorial__;
class demoHooks extends EngineTutorial.Hooks {
    async searchProject() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const searchStr = hookArgs.fileName;
        gameEditor.assets.searchAsset(searchStr);
        await new Promise((resolve => {
            setTimeout(() => {
                resolve({});
            }, 100);
        }));
    }
    async searchEntity() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const searchStr = hookArgs.entityName;
        gameEditor.hierarchy.searchEntity(searchStr);
        await new Promise((resolve => {
            setTimeout(() => {
                resolve({});
            }, 100);
        }));
    }
    async locateEntityByName() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const entityName = hookArgs.entityName;
        gameEditor.hierarchy.locateEntityByName(entityName);
    }
    async locateProjectFileByPath() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const filePath = hookArgs.filePath;
        await gameEditor.assets.locateProjectFileByPath(filePath);
    }
    async openFileBySystemDefaultProgramFromProjectPath() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const filePath = hookArgs.filePath || "";
        await gameEditor.project.openFileBySystemDefaultProgramFromProjectPath(filePath);
    }
}
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('searchProject', "engineIDEView", {
        args: ["fileName"]
    })
], demoHooks.prototype, "searchProject", null);
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('searchEntity', "engineIDEView", {
        args: ["entityName"]
    })
], demoHooks.prototype, "searchEntity", null);
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('locateHierarchyEntityByName', "engineIDEView", {
        args: ["entityName"]
    })
], demoHooks.prototype, "locateEntityByName", null);
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('locateProjectFileByPath', "engineIDEView", {
        args: ["filePath"]
    })
], demoHooks.prototype, "locateProjectFileByPath", null);
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('openFileBySystemDefaultProgramFromProjectPath', "engineIDEView", {
        args: ["filePath"]
    })
], demoHooks.prototype, "openFileBySystemDefaultProgramFromProjectPath", null);
exports.default = demoHooks;
//# sourceMappingURL=default-tutorial-hooks.js.map
