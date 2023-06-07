"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var utils_1 = require("./utils");
var Roommate = (function (_super) {
    tslib_1.__extends(Roommate, _super);
    function Roommate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerCompList = [];
        return _this;
    }
    Roommate.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('get_players_info_result', this.getPlayersInfoResultHandler);
        engine_1.default.game.customEventEmitter.on('player_enter', this.playerEnterHandler);
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_change_banker_card', this.playerChangeBankerCardHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    Roommate.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('get_players_info_result', this.getPlayersInfoResultHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_enter', this.playerEnterHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_change_banker_card', this.playerChangeBankerCardHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    Roommate.prototype.init = function () {
        for (var i = 1; i < 4; i++) {
            var playerTrans = this.entity.transform2D.findChildByName("Player" + i);
            var defaultTrans = playerTrans.findChildByName('Default');
            defaultTrans.findChildByName('CircleMask').entity.getComponent(engine_1.default.TouchInputComponent).onClick.add(utils_1.invite);
            var infoTrans = playerTrans.findChildByName('Info');
            this.playerCompList[i] = {
                defaultEntity: defaultTrans.entity,
                actionSpriteList: playerTrans.findChildByName('ActionCards').children.map(function (v) { return v.entity.getComponent(engine_1.default.UISprite); }),
                passSprite: playerTrans.findChildByName('Pass').entity.getComponent(engine_1.default.UISprite),
                avatarSprite: infoTrans.findChildByName('CircleMask').children[0].entity.getComponent(engine_1.default.UISprite),
                nicknameLabel: infoTrans.findChildByName('Nickname').entity.getComponent(engine_1.default.UILabel),
                bankerCardSprite: playerTrans.findChildByName('BankerCard').entity.getComponent(engine_1.default.UISprite),
                remainingCardCountLabel: playerTrans.findChildByName('RemainingCardCount').children[0].entity.getComponent(engine_1.default.UILabel),
                remainingCardCount: 26
            };
        }
        this.getPlayersInfoResultHandler = this.onGetPlayersInfoResult.bind(this);
        this.playerEnterHandler = this.onPlayerEnter.bind(this);
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerChangeBankerCardHandler = this.onPlayerChangeBankerCard.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    Roommate.prototype.reset = function () {
        var _this = this;
        this.playerCompList.slice(1).forEach(function (playerComp) {
            _this.hideAction(playerComp);
            playerComp.bankerCardSprite.entity.active = false;
            playerComp.remainingCardCountLabel.entity.transform2D.parent.entity.active = false;
            playerComp.remainingCardCount = 26;
        });
    };
    Roommate.prototype.onGetPlayersInfoResult = function (_a) {
        var _this = this;
        var player_list = _a.player_list;
        player_list.forEach(function (info, seat) {
            if (seat === Databus_1.databus.mySeat)
                return;
            var index = _this.indexFromMe(seat);
            var playerComp = _this.playerCompList[index];
            if (info) {
                _this.showInfo(playerComp, info);
            }
            else {
                _this.showDefault(playerComp);
            }
        });
    };
    Roommate.prototype.onPlayerEnter = function (_a) {
        var seat = _a.seat, info = _a.info;
        var index = this.indexFromMe(seat);
        this.showInfo(this.playerCompList[index], info);
    };
    Roommate.prototype.onPlayerExit = function (_a) {
        var seat = _a.seat;
        var index = this.indexFromMe(seat);
        this.showDefault(this.playerCompList[index]);
        this.reset();
    };
    Roommate.prototype.onDeal = function (_a) {
        var banker_seat = _a.banker_seat, banker_card = _a.banker_card;
        Databus_1.databus.bankerSeat = banker_seat;
        if (banker_seat === Databus_1.databus.mySeat)
            return;
        var index = this.indexFromMe(banker_seat);
        var playerComp = this.playerCompList[index];
        playerComp.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteframes[banker_card];
        playerComp.bankerCardSprite.entity.active = true;
    };
    Roommate.prototype.onPlayerChangeBankerCard = function (_a) {
        var banker_card = _a.banker_card;
        var index = this.indexFromMe(Databus_1.databus.bankerSeat);
        var playerComp = this.playerCompList[index];
        playerComp.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteframes[banker_card];
    };
    Roommate.prototype.onPlayerPlay = function (data) {
        var _this = this;
        if (data.from_seat !== Databus_1.databus.mySeat) {
            var playerComp_1 = this.playerCompList[this.indexFromMe(data.from_seat)];
            this.hideAction(playerComp_1);
            var actionCards = data.action.cards;
            playerComp_1.passSprite.entity.active = data.action.cards.length === 0;
            if (actionCards.length > 0) {
                playerComp_1.remainingCardCount -= actionCards.length;
                if (playerComp_1.remainingCardCount <= 5) {
                    playerComp_1.remainingCardCountLabel.entity.transform2D.parent.entity.active = true;
                    playerComp_1.remainingCardCountLabel.text = playerComp_1.remainingCardCount.toString();
                }
                actionCards.forEach(function (card, i) {
                    playerComp_1.actionSpriteList[i].spriteFrame = Databus_1.databus.cardSpriteframes[card];
                    playerComp_1.actionSpriteList[i].entity.active = true;
                });
            }
            if (data.next_seat !== Databus_1.databus.mySeat) {
                this.hideAction(this.playerCompList[this.indexFromMe(data.next_seat)]);
            }
        }
        if (data.scorer !== undefined) {
            wx.showToast({
                title: 'New Round',
                icon: 'none',
                duration: 1000
            });
            setTimeout(function () {
                _this.playerCompList.slice(1).forEach(function (v) { return _this.hideAction(v); });
            }, 1000);
        }
    };
    Roommate.prototype.showInfo = function (playerComp, _a) {
        var nickname = _a.nickname, avatar_url = _a.avatar_url;
        playerComp.nicknameLabel.text = nickname;
        utils_1.urlToSpriteFrame(avatar_url).then(function (spriteFrame) {
            playerComp.avatarSprite.spriteFrame = spriteFrame;
            playerComp.defaultEntity.active = false;
            playerComp.nicknameLabel.entity.transform2D.parent.entity.active = true;
        });
    };
    Roommate.prototype.showDefault = function (playerComp) {
        playerComp.defaultEntity.active = true;
        playerComp.nicknameLabel.entity.transform2D.parent.entity.active = false;
    };
    Roommate.prototype.indexFromMe = function (seat) {
        return (seat - Databus_1.databus.mySeat + 4) % 4;
    };
    Roommate.prototype.hideAction = function (playerComp) {
        playerComp.actionSpriteList.forEach(function (v) { return v.entity.active = false; });
        playerComp.passSprite.entity.active = false;
    };
    Roommate = tslib_1.__decorate([
        engine_1.default.decorators.serialize("Roommate")
    ], Roommate);
    return Roommate;
}(engine_1.default.Script));
exports.default = Roommate;
//# sourceMappingURL=Roommate.js.map
