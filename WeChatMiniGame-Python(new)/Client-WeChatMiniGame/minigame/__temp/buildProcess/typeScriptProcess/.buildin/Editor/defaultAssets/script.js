"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var __DefaultEmptyScript = (function (_super) {
    tslib_1.__extends(__DefaultEmptyScript, _super);
    function __DefaultEmptyScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__missing = true;
        return _this;
    }
    __DefaultEmptyScript.prototype.onAwake = function () {
    };
    __DefaultEmptyScript.prototype.onUpdate = function (dt) {
    };
    __DefaultEmptyScript.prototype.onDestroy = function () {
    };
    __DefaultEmptyScript = tslib_1.__decorate([
        engine_1.default.decorators.serialize("__DefaultEmptyScript")
    ], __DefaultEmptyScript);
    return __DefaultEmptyScript;
}(engine_1.default.Script));
exports.default = __DefaultEmptyScript;
//# sourceMappingURL=script.js.map
