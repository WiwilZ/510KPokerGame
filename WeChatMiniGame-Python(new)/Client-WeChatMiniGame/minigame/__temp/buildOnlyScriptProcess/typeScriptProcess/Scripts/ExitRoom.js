"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var ExitRoom = (function (_super) {
    tslib_1.__extends(ExitRoom, _super);
    function ExitRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExitRoom.prototype.onAwake = function () {
        this.getComponent(engine_1.default.TouchInputComponent).onClick.add(function () {
            wx.showModal({
                title: '提示',
                content: '确定退出房间吗？',
                success: function (res) {
                    if (res.confirm) {
                        engine_1.default.game.customEventEmitter.emit('exit_room');
                    }
                }
            });
        });
    };
    ExitRoom = tslib_1.__decorate([
        engine_1.default.decorators.serialize("ExitRoom")
    ], ExitRoom);
    return ExitRoom;
}(engine_1.default.Script));
exports.default = ExitRoom;
//# sourceMappingURL=ExitRoom.js.map
