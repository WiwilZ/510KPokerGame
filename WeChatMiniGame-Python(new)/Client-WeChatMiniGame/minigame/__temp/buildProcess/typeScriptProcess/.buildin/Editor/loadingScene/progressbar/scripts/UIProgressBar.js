"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Utils_1 = require("../../common/Utils");
var TypeNames = engine_1.default.TypeNames;
var UIKitProgressBar = (function (_super) {
    tslib_1.__extends(UIKitProgressBar, _super);
    function UIKitProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._min = 0;
        _this._max = 100;
        _this._value = 50;
        _this._dirty = true;
        _this._barMaxWidth = 0;
        _this._barMaxWidthDelta = 0;
        _this._bar = null;
        return _this;
    }
    Object.defineProperty(UIKitProgressBar.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            if (this._min != value) {
                this._min = value;
                this._dirty = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIKitProgressBar.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            if (this._max != value) {
                this._max = value;
                this._dirty = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIKitProgressBar.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value != value) {
                this._value = value;
                this._dirty = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    UIKitProgressBar.prototype.onAwake = function () {
        this._bar = Utils_1.default.getChildByName(this.entity, 'Progress_Bar');
        if (this._bar.transform2D.isRectTransform) {
        }
        else {
            var uiWidget = this._bar.getComponent(engine_1.default.UIWidget);
            if (!uiWidget) {
                uiWidget = this._bar.addComponent(engine_1.default.UIWidget);
                uiWidget.leftAnchor = 0;
                uiWidget.topAnchor = 1;
                uiWidget.rightAnchor = 1;
                uiWidget.bottomAnchor = 0;
            }
            this._uiWidget = uiWidget;
        }
        var barObjectHTransform = this._bar.transform2D;
        this._barMaxWidth = barObjectHTransform.sizeX;
        this._barMaxWidthDelta = this.entity.transform2D.sizeX - this._barMaxWidth;
        if (this._dirty) {
            this.update();
        }
    };
    UIKitProgressBar.prototype.onUpdate = function () {
        if (this._dirty) {
            this.update();
        }
    };
    UIKitProgressBar.prototype.update = function () {
        this.updateWithPercent((this._value - this._min) / (this._max - this._min));
    };
    UIKitProgressBar.prototype.updateWithPercent = function (percent) {
        this._dirty = false;
        percent = Utils_1.default.clamp01(percent);
        var bar = this._bar;
        var fullWidth = this.entity.transform2D.sizeX - this._barMaxWidthDelta;
        if (bar.transform2D.isRectTransform) {
            bar.transform2D.rightOffset = -Math.round(fullWidth * (1 - percent));
        }
        else {
            if (this._uiWidget) {
                this._uiWidget.rightOffset = -Math.round(fullWidth * (1 - percent));
            }
        }
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: TypeNames.Number,
        })
    ], UIKitProgressBar.prototype, "min", null);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: TypeNames.Number,
        })
    ], UIKitProgressBar.prototype, "max", null);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: TypeNames.Number,
        })
    ], UIKitProgressBar.prototype, "value", null);
    UIKitProgressBar = tslib_1.__decorate([
        engine_1.default.decorators.serialize('UIKitProgressBar')
    ], UIKitProgressBar);
    return UIKitProgressBar;
}(engine_1.default.Script));
exports.default = UIKitProgressBar;
//# sourceMappingURL=UIProgressBar.js.map
