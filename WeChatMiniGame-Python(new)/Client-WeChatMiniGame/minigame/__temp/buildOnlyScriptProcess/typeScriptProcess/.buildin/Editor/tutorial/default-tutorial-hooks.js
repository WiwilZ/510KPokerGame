"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EngineTutorial = window.__tutorial__;
var demoHooks = (function (_super) {
    tslib_1.__extends(demoHooks, _super);
    function demoHooks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    demoHooks.prototype.searchProject = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, hookArgs, gameEditor, searchStr;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ReferenceObjects, hookArgs = _a.hookArgs, gameEditor = _a.gameEditor;
                        searchStr = hookArgs.fileName;
                        gameEditor.assets.searchAsset(searchStr);
                        return [4, new Promise((function (resolve) {
                                setTimeout(function () {
                                    resolve({});
                                }, 100);
                            }))];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    demoHooks.prototype.searchEntity = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, hookArgs, gameEditor, searchStr;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ReferenceObjects, hookArgs = _a.hookArgs, gameEditor = _a.gameEditor;
                        searchStr = hookArgs.entityName;
                        gameEditor.hierarchy.searchEntity(searchStr);
                        return [4, new Promise((function (resolve) {
                                setTimeout(function () {
                                    resolve({});
                                }, 100);
                            }))];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    demoHooks.prototype.locateEntityByName = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, hookArgs, gameEditor, entityName;
            return tslib_1.__generator(this, function (_b) {
                _a = this.ReferenceObjects, hookArgs = _a.hookArgs, gameEditor = _a.gameEditor;
                entityName = hookArgs.entityName;
                gameEditor.hierarchy.locateEntityByName(entityName);
                return [2];
            });
        });
    };
    demoHooks.prototype.locateProjectFileByPath = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, hookArgs, gameEditor, filePath;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ReferenceObjects, hookArgs = _a.hookArgs, gameEditor = _a.gameEditor;
                        filePath = hookArgs.filePath;
                        return [4, gameEditor.assets.locateProjectFileByPath(filePath)];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    demoHooks.prototype.openFileBySystemDefaultProgramFromProjectPath = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, hookArgs, gameEditor, filePath;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.ReferenceObjects, hookArgs = _a.hookArgs, gameEditor = _a.gameEditor;
                        filePath = hookArgs.filePath || "";
                        return [4, gameEditor.project.openFileBySystemDefaultProgramFromProjectPath(filePath)];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
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
    return demoHooks;
}(EngineTutorial.Hooks));
exports.default = demoHooks;
//# sourceMappingURL=default-tutorial-hooks.js.map
