"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var utils_1 = require("./utils");
var CardHeap = (function () {
    function CardHeap() {
        this.cardScriptList = [];
        this.cardCountList = Array(13).fill(0);
        this.actionModel = null;
    }
    Object.defineProperty(CardHeap.prototype, "action", {
        get: function () {
            return {
                model: this.actionModel,
                cards: this.sortedCardScriptList.map(function (scrit) { return scrit.cardIndex; })
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardHeap.prototype, "sortedCardScriptList", {
        get: function () {
            return this.cardScriptList.sort(function (a, b) { return a.cardIndex - b.cardIndex; });
        },
        enumerable: false,
        configurable: true
    });
    CardHeap.prototype.add = function (cardScript) {
        this.cardScriptList.push(cardScript);
        this.cardCountList[cardScript.cardWeigt] += 1;
        this.actionModel = null;
        this.checkSingleRepeat() || this.checkSequence() || this.check510K();
    };
    CardHeap.prototype.remove = function (cardScript) {
        this.cardScriptList.splice(this.cardScriptList.indexOf(cardScript), 1);
        this.cardCountList[cardScript.cardWeigt] -= 1;
        this.actionModel = null;
        if (this.cardScriptList.length === 0)
            return;
        this.checkSingleRepeat() || this.checkSequence() || this.check510K();
    };
    CardHeap.prototype.clear = function () {
        this.cardScriptList = [];
        this.cardCountList = Array(13).fill(0);
        this.actionModel = null;
    };
    CardHeap.prototype.isGreaterThan = function (actionModel) {
        if (this.actionModel === null)
            return false;
        if (actionModel === null)
            return true;
        if (this.actionModel.pattern === actionModel.pattern) {
            return this.actionModel.weight > actionModel.weight;
        }
        return this.actionModel.pattern === 'bomb';
    };
    CardHeap.prototype.checkSingleRepeat = function () {
        var weight = this.cardScriptList[0].cardWeigt;
        if (this.cardScriptList.every(function (v) { return v.cardWeigt === weight; })) {
            var count = this.cardScriptList.length;
            if (count === 1) {
                this.actionModel = {
                    pattern: 'single',
                    weight: weight
                };
            }
            else if (count === 2) {
                this.actionModel = {
                    pattern: 'double',
                    weight: weight
                };
            }
            else if (count === 3) {
                this.actionModel = {
                    pattern: 'triple',
                    weight: weight
                };
            }
            else {
                this.actionModel = {
                    pattern: 'bomb',
                    weight: weight + 13 * count
                };
            }
            return true;
        }
        return false;
    };
    CardHeap.prototype.checkSequence = function () {
        var _this = this;
        if (this.cardCountList[12] > 0)
            return false;
        var firstCard = this.cardCountList.findIndex(function (v) { return v > 0; });
        var count = this.cardCountList[firstCard];
        if (!(count === 2 || count === 3))
            return false;
        var lastCard = (function () {
            for (var i = 11; i >= 0; i--) {
                if (_this.cardCountList[i] > 0) {
                    return i;
                }
            }
        })();
        var seqLen = lastCard - firstCard + 1;
        if (seqLen < 2)
            return false;
        if (this.cardCountList.slice(firstCard + 1, lastCard + 1).every(function (v) { return v === count; })) {
            this.actionModel = {
                pattern: seqLen + "_" + (count === 2 ? 'double' : 'triple'),
                weight: firstCard
            };
            return true;
        }
        return false;
    };
    CardHeap.prototype.check510K = function () {
        if (this.cardScriptList.length === 3 && this.cardCountList[2] === 1 && this.cardCountList[7] === 1 && this.cardCountList[10] === 1) {
            var suits = this.cardScriptList.map(function (v) { return v.cardSuit; });
            this.actionModel = {
                pattern: '510K',
                weight: suits[0] === suits[1] && suits[1] === suits[2] ? 1 : 0
            };
            return true;
        }
        return false;
    };
    return CardHeap;
}());
var Me = (function (_super) {
    tslib_1.__extends(Me, _super);
    function Me() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedActionCards = new CardHeap();
        _this.selectedBankerCard = null;
        _this.lastActionModel = null;
        return _this;
    }
    Me.prototype.onAwake = function () {
        var _this = this;
        this.init();
        utils_1.urlToSpriteFrame(Databus_1.databus.avatarUrl).then(function (spriteFrame) { return _this.avatarSprite.spriteFrame = spriteFrame; });
        this.nicknameLabel.text = Databus_1.databus.nickname;
        this.playTouchInput.onClick.add(this.play.bind(this));
        this.passTouchInput.onClick.add(this.pass.bind(this));
        this.changeTouchInput.onClick.add(this.change.bind(this));
        this.skipTouchInput.onClick.add(this.skip.bind(this));
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    Me.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    Me.prototype.init = function () {
        this.handCompList = this.myHandTrans.children.map(function (child) {
            return {
                sprite: child.entity.getComponent(engine_1.default.UISprite),
                script: child.entity.getComponent(engine_1.default.Script)
            };
        });
        this.actionSpriteList = this.myActionTrans.children.map(function (child) { return child.entity.getComponent(engine_1.default.UISprite); });
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    Me.prototype.onPlayerExit = function () {
        this.reset();
    };
    Me.prototype.onDeal = function (_a) {
        var _this = this;
        var banker_seat = _a.banker_seat, banker_card = _a.banker_card, can_change_banker_card = _a.can_change_banker_card, my_hand = _a.my_hand;
        this.handCompList.forEach(function (_a, i) {
            var sprite = _a.sprite, script = _a.script;
            script.cardIndex = my_hand[i];
            script.putBack();
            script.onClickCallback = function (selected) { return _this.onClickHandler(selected, script); };
            sprite.spriteFrame = Databus_1.databus.cardSpriteframes[script.cardIndex];
            sprite.entity.active = true;
        });
        if (banker_seat === Databus_1.databus.mySeat) {
            this.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteframes[banker_card];
            this.bankerCardSprite.entity.active = true;
            if (can_change_banker_card) {
                this.onClickHandler = this.onSelectBankerCard;
                this.disableChange();
                this.showChangeButtonGroup();
            }
            else {
                this.onClickHandler = this.onSelectActionCards;
                this.disablePlay();
                this.playButton.entity.active = true;
            }
        }
        else {
            this.onClickHandler = this.onSelectActionCards;
            this.disablePlay();
        }
        this.scoreLabel.text = "score: " + this.myScore;
    };
    Me.prototype.onPlayerPlay = function (data) {
        if (data.scorer !== undefined) {
            this.lastActionModel = null;
            this.hideAction();
        }
        else if (data.action.model !== null) {
            this.lastActionModel = data.action.model;
        }
        if (data.scorer === Databus_1.databus.mySeat) {
            this.myScore += data.score;
            this.scoreLabel.text = "score: " + this.myScore;
        }
        if (data.next_seat === Databus_1.databus.mySeat) {
            this.playButton.entity.active = true;
            this.passButton.entity.active = data.scorer === undefined;
            this.hideAction();
        }
    };
    Me.prototype.onSelectActionCards = function (selected, script) {
        if (selected) {
            this.selectedActionCards.add(script);
            console.log('add card', script.cardIndex);
        }
        else {
            this.selectedActionCards.remove(script);
            console.log('remove card', script.cardIndex);
        }
        if (this.selectedActionCards.isGreaterThan(this.lastActionModel)) {
            this.enablePlay();
        }
        else {
            this.disablePlay();
        }
    };
    Me.prototype.onSelectBankerCard = function (selected, script) {
        var _a;
        if (selected) {
            (_a = this.selectedBankerCard) === null || _a === void 0 ? void 0 : _a.putBack();
            this.selectedBankerCard = script;
            console.log('select banker card', script.cardIndex);
            this.enableChange();
        }
        else {
            this.selectedBankerCard = null;
            console.log('remove banker card');
            this.disableChange();
        }
    };
    Me.prototype.play = function () {
        var _this = this;
        console.log('play cards', this.selectedActionCards.action);
        engine_1.default.game.customEventEmitter.emit('play', {
            action: this.selectedActionCards.action
        }, function () {
            _this.hideAction();
            _this.selectedActionCards.sortedCardScriptList.forEach(function (script, i) {
                script.entity.active = false;
                _this.actionSpriteList[i].spriteFrame = Databus_1.databus.cardSpriteframes[script.cardIndex];
                _this.actionSpriteList[i].entity.active = true;
            });
            _this.selectedActionCards.clear();
            _this.hidePlayButtonGroup();
        });
    };
    Me.prototype.pass = function () {
        var _this = this;
        console.log('play pass action');
        engine_1.default.game.customEventEmitter.emit('play', {
            action: {
                model: null,
                cards: []
            }
        }, function () {
            _this.hideAction();
            _this.passSprite.entity.active = true;
            _this.selectedActionCards.cardScriptList.forEach(function (script) { return script.putBack(); });
            _this.selectedActionCards.clear();
            _this.hidePlayButtonGroup();
        });
    };
    Me.prototype.change = function () {
        var _this = this;
        console.log('change banker card', this.selectedBankerCard.cardIndex);
        engine_1.default.game.customEventEmitter.emit('change_banker_card', {
            banker_card: this.selectedBankerCard.cardIndex
        }, function () {
            _this.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteframes[_this.selectedBankerCard.cardIndex];
            _this.skip();
        });
    };
    Me.prototype.skip = function () {
        var _a;
        (_a = this.selectedBankerCard) === null || _a === void 0 ? void 0 : _a.putBack();
        this.selectedBankerCard = null;
        this.hideChangeButtonGroup();
        this.playButton.entity.active = true;
        this.onClickHandler = this.onSelectActionCards;
    };
    Me.prototype.disablePlay = function () {
        this.playButton.disable = true;
        this.playTouchInput.active = false;
    };
    Me.prototype.enablePlay = function () {
        this.playButton.disable = false;
        this.playTouchInput.active = true;
    };
    Me.prototype.disableChange = function () {
        this.changeButton.disable = true;
        this.changeTouchInput.active = false;
    };
    Me.prototype.enableChange = function () {
        this.changeButton.disable = false;
        this.changeTouchInput.active = true;
    };
    Me.prototype.reset = function () {
        this.selectedActionCards.clear();
        this.selectedBankerCard = null;
        this.myScore = 0;
        this.scoreLabel.text = '';
        this.bankerCardSprite.entity.active = false;
        this.lastActionModel = null;
        this.hideAction();
        this.hideHand();
        this.hidePlayButtonGroup();
        this.hideChangeButtonGroup();
    };
    Me.prototype.hidePlayButtonGroup = function () {
        this.playButton.entity.active = false;
        this.passButton.entity.active = false;
    };
    Me.prototype.hideChangeButtonGroup = function () {
        this.changeButton.entity.active = false;
        this.skipButton.entity.active = false;
    };
    Me.prototype.showChangeButtonGroup = function () {
        this.changeButton.entity.active = true;
        this.skipButton.entity.active = true;
    };
    Me.prototype.hideHand = function () {
        this.handCompList.forEach(function (_a) {
            var sprite = _a.sprite;
            return sprite.entity.active = false;
        });
    };
    Me.prototype.hideAction = function () {
        this.actionSpriteList.forEach(function (sprite) { return sprite.entity.active = false; });
        this.passSprite.entity.active = false;
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UISprite
        })
    ], Me.prototype, "avatarSprite", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Me.prototype, "nicknameLabel", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UISprite
        })
    ], Me.prototype, "bankerCardSprite", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], Me.prototype, "playButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], Me.prototype, "playTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], Me.prototype, "passButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], Me.prototype, "passTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], Me.prototype, "changeButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], Me.prototype, "changeTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], Me.prototype, "skipButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], Me.prototype, "skipTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Transform2D
        })
    ], Me.prototype, "myHandTrans", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Transform2D
        })
    ], Me.prototype, "myActionTrans", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UISprite
        })
    ], Me.prototype, "passSprite", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Me.prototype, "scoreLabel", void 0);
    Me = tslib_1.__decorate([
        engine_1.default.decorators.serialize("Me")
    ], Me);
    return Me;
}(engine_1.default.Script));
exports.default = Me;
//# sourceMappingURL=Me.js.map
