"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var PlayerRemainingCardCount = (function (_super) {
    tslib_1.__extends(PlayerRemainingCardCount, _super);
    function PlayerRemainingCardCount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerRemainingCardCount.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    PlayerRemainingCardCount.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    PlayerRemainingCardCount.prototype.init = function () {
        var name = this.entity.transform2D.parent.entity.name;
        this.seat = (Databus_1.databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;
        this.sprite = this.entity.getComponent(engine_1.default.UISprite);
        this.label = this.entity.transform2D.children[0].entity.getComponent(engine_1.default.UILabel);
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    PlayerRemainingCardCount.prototype.reset = function () {
        this.sprite.visible = false;
        this.label.text = '';
        this.count = 26;
    };
    PlayerRemainingCardCount.prototype.onPlayerExit = function () {
        this.reset();
    };
    PlayerRemainingCardCount.prototype.onPlayerPlay = function (_a) {
        var action = _a.action, from_seat = _a.from_seat;
        if (from_seat === this.seat) {
            this.count -= action.cards.length;
            if (this.count <= 5) {
                this.sprite.visible = true;
                this.label.text = this.count.toString();
            }
        }
    };
    PlayerRemainingCardCount = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PlayerRemainingCardCount")
    ], PlayerRemainingCardCount);
    return PlayerRemainingCardCount;
}(engine_1.default.Script));
exports.default = PlayerRemainingCardCount;
//# sourceMappingURL=PlayerRemainingCardCount.js.map
