"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var MyHandCard = (function (_super) {
    tslib_1.__extends(MyHandCard, _super);
    function MyHandCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickCallback = null;
        return _this;
    }
    MyHandCard.prototype.onAwake = function () {
        this.button = this.getComponent(engine_1.default.UIButton);
    };
    MyHandCard.prototype.onTouchUp = function () {
        if (!this.selected) {
            this.entity.transform2D.positionY += 60;
        }
        else {
            this.entity.transform2D.positionY -= 60;
        }
        this.selected = !this.selected;
        this.onClickCallback && this.onClickCallback(this.selected);
        this.button.state = engine_1.default.UIButton.State.Normal;
    };
    MyHandCard.prototype.onTouchMove = function () {
        this.button.state = engine_1.default.UIButton.State.Pressed;
    };
    MyHandCard.prototype.onTouchOver = function () {
        this.button.state = engine_1.default.UIButton.State.Pressed;
    };
    MyHandCard.prototype.putBack = function () {
        if (this.selected) {
            this.entity.transform2D.positionY -= 60;
            this.selected = false;
        }
    };
    Object.defineProperty(MyHandCard.prototype, "cardWeigt", {
        get: function () {
            return this.cardIndex >> 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyHandCard.prototype, "cardSuit", {
        get: function () {
            return this.cardIndex & 3;
        },
        enumerable: false,
        configurable: true
    });
    MyHandCard = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MyHandCard")
    ], MyHandCard);
    return MyHandCard;
}(engine_1.default.Script));
exports.default = MyHandCard;
//# sourceMappingURL=MyHandCard.js.map
