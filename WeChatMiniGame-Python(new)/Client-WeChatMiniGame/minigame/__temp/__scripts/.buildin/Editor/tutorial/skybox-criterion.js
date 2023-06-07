"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EngineTutorial = window.__tutorial__;
let SkyboxCriterion = class SkyboxCriterion extends EngineTutorial.Criterion {
    async evaluateCompletion() {
        const { gameEditor } = this.ReferenceObjects;
        const settings = await gameEditor.scene.getSceneSettings();
        const isCompleted = settings.ambientMode === 0 && (settings.skyBox && settings.skyBox.resourceID === "599fefR-48c774E-522080S-c79bc3R");
        this.completed = isCompleted;
    }
};
SkyboxCriterion = tslib_1.__decorate([
    EngineTutorial.decorators.Criterion('skyBoxCriterion', "engineIDEView", {})
], SkyboxCriterion);
exports.default = SkyboxCriterion;
//# sourceMappingURL=skybox-criterion.js.map
