"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var PlayerBattle = (function (_super) {
    tslib_1.__extends(PlayerBattle, _super);
    function PlayerBattle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerBattle.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    PlayerBattle.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    PlayerBattle.prototype.init = function () {
        var name = this.entity.name;
        this.seat = (Databus_1.databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;
        this.actionSpriteList = this.entity.transform2D.findChildByName('ActionCards').children.map(function (v) { return v.entity.getComponent(engine_1.default.UISprite); });
        this.passEntity = this.entity.transform2D.findChildByName('Pass').entity;
        this.clockEntity = this.entity.transform2D.findChildByName('Clock').entity;
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    PlayerBattle.prototype.reset = function () {
        this.hideAction();
        this.clockEntity.active = false;
    };
    PlayerBattle.prototype.onPlayerExit = function () {
        this.reset();
    };
    PlayerBattle.prototype.onDeal = function (_a) {
        var banker_seat = _a.banker_seat;
        if (banker_seat === this.seat) {
            this.clockEntity.active = true;
        }
    };
    PlayerBattle.prototype.onPlayerPlay = function (_a) {
        var _this = this;
        var action = _a.action, from_seat = _a.from_seat, next_seat = _a.next_seat, scorer = _a.scorer;
        if (from_seat === this.seat) {
            this.reset();
            var actionCards = action.cards;
            if (actionCards.length === 0) {
                this.passEntity.active = true;
            }
            else {
                actionCards.forEach(function (card, i) {
                    _this.actionSpriteList[i].spriteFrame = Databus_1.databus.cardSpriteFrames[card];
                    _this.actionSpriteList[i].entity.active = true;
                });
            }
        }
        if (scorer !== undefined) {
            setTimeout(function () {
                _this.hideAction();
                _this.clockEntity.active = next_seat === _this.seat;
            }, 1000);
            return;
        }
        if (next_seat === this.seat) {
            this.hideAction();
            this.clockEntity.active = true;
        }
    };
    PlayerBattle.prototype.hideAction = function () {
        this.actionSpriteList.forEach(function (v) { return v.entity.active = false; });
        this.passEntity.active = false;
    };
    PlayerBattle = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PlayerBattle")
    ], PlayerBattle);
    return PlayerBattle;
}(engine_1.default.Script));
exports.default = PlayerBattle;
//# sourceMappingURL=PlayerBattle.js.map
