"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EngineTutorial = window.__tutorial__;
var SkyboxCriterion = (function (_super) {
    tslib_1.__extends(SkyboxCriterion, _super);
    function SkyboxCriterion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkyboxCriterion.prototype.evaluateCompletion = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var gameEditor, settings, isCompleted;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gameEditor = this.ReferenceObjects.gameEditor;
                        return [4, gameEditor.scene.getSceneSettings()];
                    case 1:
                        settings = _a.sent();
                        isCompleted = settings.ambientMode === 0 && (settings.skyBox && settings.skyBox.resourceID === "599fefR-48c774E-522080S-c79bc3R");
                        this.completed = isCompleted;
                        return [2];
                }
            });
        });
    };
    SkyboxCriterion = tslib_1.__decorate([
        EngineTutorial.decorators.Criterion('skyBoxCriterion', "engineIDEView", {})
    ], SkyboxCriterion);
    return SkyboxCriterion;
}(EngineTutorial.Criterion));
exports.default = SkyboxCriterion;
//# sourceMappingURL=skybox-criterion.js.map
