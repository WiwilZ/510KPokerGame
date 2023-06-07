"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UIProgressBar_1 = require("../progressbar/scripts/UIProgressBar");
var engine_1 = require("engine");
var ELoadStatus;
(function (ELoadStatus) {
    ELoadStatus[ELoadStatus["loading"] = 0] = "loading";
    ELoadStatus[ELoadStatus["success"] = 1] = "success";
    ELoadStatus[ELoadStatus["fail"] = 2] = "fail";
})(ELoadStatus || (ELoadStatus = {}));
var loadMainScenes = (function (_super) {
    tslib_1.__extends(loadMainScenes, _super);
    function loadMainScenes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.percent = 0;
        _this.finishLoading = false;
        _this.scene2dLoadingStatus = ELoadStatus.loading;
        _this.scene3dLoadingStatus = ELoadStatus.loading;
        return _this;
    }
    loadMainScenes.prototype.onAwake = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.loadMainScene();
                return [2];
            });
        });
    };
    loadMainScenes.prototype.loadMainScene = function () {
        var _this = this;
        var main3DsceneKey = GameGlobal.__main3DsceneKey;
        var main2DsceneKey = GameGlobal.__main2DsceneKey;
        if (!main3DsceneKey) {
            this.scene3dLoadingStatus = ELoadStatus.success;
        }
        else if (this.scene3dLoadingStatus !== ELoadStatus.success) {
            this.lt3d = engine_1.default.loader.load(main3DsceneKey);
            this.lt3d.promise.then(function (_game3dScene) {
                _this.game3dScene = _game3dScene;
                _this.scene3dLoadingStatus = ELoadStatus.success;
                _this.checkResult();
            }, function () {
                _this.scene3dLoadingStatus = ELoadStatus.fail;
                _this.checkResult();
            });
        }
        if (!main2DsceneKey) {
            this.scene2dLoadingStatus = ELoadStatus.success;
        }
        else if (this.scene2dLoadingStatus !== ELoadStatus.success) {
            this.lt2d = engine_1.default.loader.load(main2DsceneKey);
            this.lt2d.promise.then(function (_game2dScene) {
                _this.game3dScene = _game2dScene;
                _this.scene2dLoadingStatus = ELoadStatus.success;
                _this.checkResult();
            }, function () {
                _this.scene2dLoadingStatus = ELoadStatus.fail;
                _this.checkResult();
            });
        }
        this.checkResult();
    };
    loadMainScenes.prototype.checkResult = function () {
        if (this.scene2dLoadingStatus === ELoadStatus.loading || this.scene3dLoadingStatus === ELoadStatus.loading) {
            return;
        }
        if (this.scene2dLoadingStatus === ELoadStatus.fail || this.scene3dLoadingStatus === ELoadStatus.fail) {
            this.retry();
            return;
        }
        engine_1.default.game.clearScene(true, true);
        if (this.game2dScene) {
            engine_1.default.game.playScene(this.game2dScene);
        }
        if (this.game3dScene) {
            engine_1.default.game.playScene(this.game3dScene);
        }
    };
    loadMainScenes.prototype.retry = function () {
        if (this.retryBtn) {
            this.retryBtn.active = true;
        }
    };
    loadMainScenes.prototype.retryLoading = function () {
        this.loadMainScene();
    };
    loadMainScenes.prototype.onUpdate = function (dt) {
        var lt2dv = 0;
        var lt3dv = 0;
        if (!this.lt2d) {
            lt2dv = 1;
        }
        else {
            var p = this.lt2d.progress;
            lt2dv = p.current / p.total;
        }
        if (!this.lt3d) {
            lt3dv = 1;
        }
        else {
            var p = this.lt3d.progress;
            lt3dv = p.current / p.total;
        }
        this.percent = (lt2dv + lt3dv) * 0.5 * 100;
        var barComp = this.entity.getComponent(UIProgressBar_1.default);
        barComp.value = this.percent;
    };
    loadMainScenes.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Transform2D
        })
    ], loadMainScenes.prototype, "retryBtn", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], loadMainScenes.prototype, "percent", void 0);
    loadMainScenes = tslib_1.__decorate([
        engine_1.default.decorators.serialize("loadMainScenes")
    ], loadMainScenes);
    return loadMainScenes;
}(engine_1.default.Script));
exports.default = loadMainScenes;
//# sourceMappingURL=loadMainScenes.js.map
