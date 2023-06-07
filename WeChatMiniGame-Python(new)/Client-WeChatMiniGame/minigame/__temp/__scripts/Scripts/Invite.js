"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var utils_1 = require("./utils");
var Invite = (function (_super) {
    tslib_1.__extends(Invite, _super);
    function Invite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Invite.prototype.onClick = function () {
        utils_1.invite();
    };
    Invite = tslib_1.__decorate([
        engine_1.default.decorators.serialize("Invite")
    ], Invite);
    return Invite;
}(engine_1.default.Script));
exports.default = Invite;
//# sourceMappingURL=Invite.js.map
