"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var DefaultScriptableAsset = (function (_super) {
    tslib_1.__extends(DefaultScriptableAsset, _super);
    function DefaultScriptableAsset() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__missing = true;
        return _this;
    }
    DefaultScriptableAsset_1 = DefaultScriptableAsset;
    DefaultScriptableAsset.DeserializeResource = function (content, meta) {
        var sa = new DefaultScriptableAsset_1();
        sa.__content = content;
        sa.__meta = meta;
        return sa;
    };
    DefaultScriptableAsset.prototype.changeUuid = function (uuid) {
        this.__meta._scriptuuid = uuid;
    };
    DefaultScriptableAsset.prototype.SerializeResource = function () {
        return {
            content: {
                content: this.__content,
                meta: this.__meta,
            },
            meta: {},
        };
    };
    var DefaultScriptableAsset_1;
    DefaultScriptableAsset = DefaultScriptableAsset_1 = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MissingScriptableAsset")
    ], DefaultScriptableAsset);
    return DefaultScriptableAsset;
}(engine_1.default.ScriptableAsset));
exports.default = DefaultScriptableAsset;
//# sourceMappingURL=scriptableasset.js.map
