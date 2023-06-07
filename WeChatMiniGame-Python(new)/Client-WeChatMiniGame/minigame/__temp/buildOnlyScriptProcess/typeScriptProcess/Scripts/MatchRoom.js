"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var MatchRoom = (function (_super) {
    tslib_1.__extends(MatchRoom, _super);
    function MatchRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatchRoom.prototype.onAwake = function () {
        this.getComponent(engine_1.default.TouchInputComponent).onClick.add(function () {
            engine_1.default.game.customEventEmitter.emit('match_room');
        });
    };
    MatchRoom = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MatchRoom")
    ], MatchRoom);
    return MatchRoom;
}(engine_1.default.Script));
exports.default = MatchRoom;
//# sourceMappingURL=MatchRoom.js.map
