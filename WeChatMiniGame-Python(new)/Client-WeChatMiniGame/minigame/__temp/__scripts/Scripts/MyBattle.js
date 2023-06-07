"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var utils_1 = require("./utils");
var MyBattle = (function (_super) {
    tslib_1.__extends(MyBattle, _super);
    function MyBattle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedActionCards = new utils_1.CardHeap();
        return _this;
    }
    MyBattle.prototype.onAwake = function () {
        this.init();
        this.changeTouchInput.onClick.add(this.change.bind(this));
        this.skipTouchInput.onClick.add(this.skip.bind(this));
        this.playTouchInput.onClick.add(this.play.bind(this));
        this.passTouchInput.onClick.add(this.pass.bind(this));
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    MyBattle.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    MyBattle.prototype.init = function () {
        var _this = this;
        this.handCompList = this.myHandTrans.children.map(function (v) {
            var script = v.entity.getComponent(engine_1.default.Script);
            script.onClickCallback = function (selected) { return _this.onClickHandCard(selected, script); };
            return {
                sprite: v.entity.getComponent(engine_1.default.UISprite),
                script: script
            };
        });
        this.actionSpriteList = this.myActionTrans.children.map(function (v) { return v.entity.getComponent(engine_1.default.UISprite); });
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    MyBattle.prototype.reset = function () {
        this.bankerCardSprite.visible = false;
        this.selectedActionCards.clear();
        this.selectedBankerCard = null;
        this.lastActionModel = null;
        this.hideHand();
        this.hideAction();
        this.hideChangeSkip();
        this.disableChange();
        this.hidePlayPass();
        this.disablePlay();
    };
    MyBattle.prototype.onPlayerExit = function () {
        this.reset();
    };
    MyBattle.prototype.onDeal = function (_a) {
        var banker_seat = _a.banker_seat, banker_card = _a.banker_card, my_hand = _a.my_hand;
        Databus_1.databus.bankerCard = banker_card;
        this.handCompList.forEach(function (_a, i) {
            var sprite = _a.sprite, script = _a.script;
            script.cardIndex = my_hand[i];
            sprite.spriteFrame = Databus_1.databus.cardSpriteFrames[script.cardIndex];
            sprite.entity.active = true;
        });
        if (banker_seat === Databus_1.databus.mySeat) {
            this.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteFrames[banker_card];
            this.bankerCardSprite.visible = true;
            this.changeButton.entity.active = true;
            this.skipButton.entity.active = true;
            this.onClickHandCard = this.onSelectBankerCard;
        }
        else {
            this.onClickHandCard = this.onSelectActionCards;
        }
    };
    MyBattle.prototype.onPlayerPlay = function (_a) {
        var _this = this;
        var action = _a.action, next_seat = _a.next_seat, scorer = _a.scorer;
        if (scorer !== undefined) {
            this.lastActionModel = null;
            this.checkPlay();
            wx.showToast({
                title: 'New Round',
                icon: 'none',
                duration: 1000,
                mask: true
            });
            setTimeout(function () {
                _this.hideAction();
                _this.playButton.entity.active = next_seat === Databus_1.databus.mySeat;
            }, 1000);
            return;
        }
        if (action.model !== null) {
            this.lastActionModel = action.model;
            this.checkPlay();
        }
        if (next_seat === Databus_1.databus.mySeat) {
            this.hideAction();
            this.playButton.entity.active = true;
            this.passButton.entity.active = true;
        }
    };
    MyBattle.prototype.onSelectBankerCard = function (selected, script) {
        var _a;
        if (selected) {
            (_a = this.selectedBankerCard) === null || _a === void 0 ? void 0 : _a.putBack();
            this.selectedBankerCard = script;
            this.enableChange();
        }
        else {
            this.selectedBankerCard = null;
            this.disableChange();
        }
    };
    MyBattle.prototype.onSelectActionCards = function (selected, script) {
        if (selected) {
            this.selectedActionCards.add(script);
        }
        else {
            this.selectedActionCards.remove(script);
        }
        this.checkPlay();
    };
    MyBattle.prototype.change = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.emit('change_banker_card', {
            banker_card: this.selectedBankerCard.cardIndex
        }, function () {
            _this.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteFrames[_this.selectedBankerCard.cardIndex];
            _this.skip();
        });
    };
    MyBattle.prototype.skip = function () {
        var _a;
        (_a = this.selectedBankerCard) === null || _a === void 0 ? void 0 : _a.putBack();
        this.selectedBankerCard = null;
        this.hideChangeSkip();
        this.playButton.entity.active = true;
        this.onClickHandCard = this.onSelectActionCards;
    };
    MyBattle.prototype.play = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.emit('play', {
            action: this.selectedActionCards.action
        }, function () {
            _this.selectedActionCards.sortedCardScriptList.forEach(function (script, i) {
                script.entity.active = false;
                _this.actionSpriteList[i].spriteFrame = Databus_1.databus.cardSpriteFrames[script.cardIndex];
                _this.actionSpriteList[i].entity.active = true;
            });
            if (!_this.bankerCardSprite.visible && _this.selectedActionCards.cardList.includes(Databus_1.databus.bankerCard)) {
                _this.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteFrames[Databus_1.databus.bankerCard];
                _this.bankerCardSprite.visible = true;
            }
            _this.selectedActionCards.clear();
            _this.hidePlayPass();
        });
    };
    MyBattle.prototype.pass = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.emit('play', {
            action: {
                model: null,
                cards: []
            }
        }, function () {
            _this.selectedActionCards.cardScriptList.forEach(function (v) { return v.putBack(); });
            _this.passSprite.visible = true;
            _this.selectedActionCards.clear();
            _this.hidePlayPass();
        });
    };
    MyBattle.prototype.checkPlay = function () {
        if (this.selectedActionCards.greaterThan(this.lastActionModel)) {
            this.enablePlay();
        }
        else {
            this.disablePlay();
        }
    };
    MyBattle.prototype.disableChange = function () {
        this.changeButton.disable = true;
        this.changeTouchInput.active = false;
    };
    MyBattle.prototype.enableChange = function () {
        this.changeButton.disable = false;
        this.changeTouchInput.active = true;
    };
    MyBattle.prototype.disablePlay = function () {
        this.playButton.disable = true;
        this.playTouchInput.active = false;
    };
    MyBattle.prototype.enablePlay = function () {
        this.playButton.disable = false;
        this.playTouchInput.active = true;
    };
    MyBattle.prototype.hideChangeSkip = function () {
        this.changeButton.entity.active = false;
        this.skipButton.entity.active = false;
    };
    MyBattle.prototype.hidePlayPass = function () {
        this.playButton.entity.active = false;
        this.passButton.entity.active = false;
    };
    MyBattle.prototype.hideHand = function () {
        this.handCompList.forEach(function (_a) {
            var sprite = _a.sprite, script = _a.script;
            sprite.entity.active = false;
            script.putBack();
        });
    };
    MyBattle.prototype.hideAction = function () {
        this.actionSpriteList.forEach(function (sprite) { return sprite.entity.active = false; });
        this.passSprite.visible = false;
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UISprite
        })
    ], MyBattle.prototype, "bankerCardSprite", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], MyBattle.prototype, "playButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], MyBattle.prototype, "playTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], MyBattle.prototype, "passButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], MyBattle.prototype, "passTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], MyBattle.prototype, "changeButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], MyBattle.prototype, "changeTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], MyBattle.prototype, "skipButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], MyBattle.prototype, "skipTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Transform2D
        })
    ], MyBattle.prototype, "myHandTrans", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Transform2D
        })
    ], MyBattle.prototype, "myActionTrans", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UISprite
        })
    ], MyBattle.prototype, "passSprite", void 0);
    MyBattle = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MyBattle")
    ], MyBattle);
    return MyBattle;
}(engine_1.default.Script));
exports.default = MyBattle;
//# sourceMappingURL=MyBattle.js.map
