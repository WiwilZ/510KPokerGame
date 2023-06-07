"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var MyInfo = (function (_super) {
    tslib_1.__extends(MyInfo, _super);
    function MyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyInfo.prototype.onAwake = function () {
        var _a = Databus_1.databus.playerInfoList[Databus_1.databus.mySeat], avatar = _a.avatar, nickname = _a.nickname;
        this.entity.transform2D.findChildByName('CircleMask').children[0].entity.getComponent(engine_1.default.UISprite).spriteFrame = avatar;
        this.entity.transform2D.findChildByName('Nickname').entity.getComponent(engine_1.default.UILabel).text = nickname;
    };
    MyInfo = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MyInfo")
    ], MyInfo);
    return MyInfo;
}(engine_1.default.Script));
exports.default = MyInfo;
//# sourceMappingURL=MyInfo.js.map
