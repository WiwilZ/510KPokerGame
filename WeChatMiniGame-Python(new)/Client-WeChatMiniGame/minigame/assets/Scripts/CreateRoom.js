"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var CreateRoom = (function (_super) {
    tslib_1.__extends(CreateRoom, _super);
    function CreateRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateRoom.prototype.onClick = function () {
        engine_1.default.game.customEventEmitter.emit('create_room');
    };
    CreateRoom = tslib_1.__decorate([
        engine_1.default.decorators.serialize("CreateRoom")
    ], CreateRoom);
    return CreateRoom;
}(engine_1.default.Script));
exports.default = CreateRoom;
//# sourceMappingURL=CreateRoom.js.map
