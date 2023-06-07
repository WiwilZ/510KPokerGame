"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var PlayerBankerCard = (function (_super) {
    tslib_1.__extends(PlayerBankerCard, _super);
    function PlayerBankerCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerBankerCard.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_change_banker_card', this.playerChangeBankerCardHandler);
        this.reset();
    };
    PlayerBankerCard.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_change_banker_card', this.playerChangeBankerCardHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    PlayerBankerCard.prototype.init = function () {
        var name = this.entity.transform2D.parent.entity.name;
        this.seat = (Databus_1.databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;
        this.sprite = this.entity.getComponent(engine_1.default.UISprite);
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerChangeBankerCardHandler = this.onPlayerChangeBankerCard.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    PlayerBankerCard.prototype.reset = function () {
        this.sprite.visible = false;
    };
    PlayerBankerCard.prototype.onPlayerExit = function () {
        this.reset();
    };
    PlayerBankerCard.prototype.onDeal = function (_a) {
        var banker_seat = _a.banker_seat, banker_card = _a.banker_card;
        if (banker_seat === this.seat) {
            this.sprite.spriteFrame = Databus_1.databus.cardSpriteFrames[banker_card];
            this.sprite.visible = true;
            engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
        }
        else {
            engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        }
    };
    PlayerBankerCard.prototype.onPlayerChangeBankerCard = function (_a) {
        var banker_card = _a.banker_card;
        Databus_1.databus.bankerCard = banker_card;
        if (this.sprite.visible) {
            this.sprite.spriteFrame = Databus_1.databus.cardSpriteFrames[banker_card];
        }
    };
    PlayerBankerCard.prototype.onPlayerPlay = function (_a) {
        var action = _a.action, from_seat = _a.from_seat;
        if (from_seat === this.seat && action.cards.includes(Databus_1.databus.bankerCard)) {
            this.sprite.spriteFrame = Databus_1.databus.cardSpriteFrames[Databus_1.databus.bankerCard];
            this.sprite.visible = true;
            engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
        }
    };
    PlayerBankerCard = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PlayerBankerCard")
    ], PlayerBankerCard);
    return PlayerBankerCard;
}(engine_1.default.Script));
exports.default = PlayerBankerCard;
//# sourceMappingURL=PlayerBankerCard.js.map
