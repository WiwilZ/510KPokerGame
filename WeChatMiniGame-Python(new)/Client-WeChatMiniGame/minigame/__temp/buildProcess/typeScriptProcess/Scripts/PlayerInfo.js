"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var utils_1 = require("./utils");
var PlayerInfo = (function (_super) {
    tslib_1.__extends(PlayerInfo, _super);
    function PlayerInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerInfo.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('get_players_info_result', this.getPlayersInfoResultHandler);
        engine_1.default.game.customEventEmitter.on('player_enter', this.playerEnterHandler);
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
    };
    PlayerInfo.prototype.init = function () {
        var name = this.entity.name;
        this.seat = (Databus_1.databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;
        this.defaultEntity = this.entity.transform2D.findChildByName('Default').entity;
        var infoTrans = this.entity.transform2D.findChildByName('Info');
        this.avatarSprite = infoTrans.findChildByName('CircleMask').children[0].entity.getComponent(engine_1.default.UISprite);
        this.nicknameLabel = infoTrans.findChildByName('Nickname').entity.getComponent(engine_1.default.UILabel);
        this.getPlayersInfoResultHandler = this.onGetPlayersInfoResult.bind(this);
        this.playerEnterHandler = this.onPlayerEnter.bind(this);
        this.playerExitHandler = this.onPlayerExit.bind(this);
    };
    PlayerInfo.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('get_players_info_result', this.getPlayersInfoResultHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_enter', this.playerEnterHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
    };
    PlayerInfo.prototype.onGetPlayersInfoResult = function (_a) {
        var player_list = _a.player_list;
        var info = player_list[this.seat];
        if (info) {
            this.showInfo(info);
        }
        else {
            this.showDefault();
        }
    };
    PlayerInfo.prototype.onPlayerEnter = function (_a) {
        var seat = _a.seat, info = _a.info;
        seat === this.seat && this.showInfo(info);
    };
    PlayerInfo.prototype.onPlayerExit = function (_a) {
        var seat = _a.seat;
        seat === this.seat && this.showDefault();
    };
    PlayerInfo.prototype.showInfo = function (_a) {
        var _this = this;
        var nickname = _a.nickname, avatar_url = _a.avatar_url;
        utils_1.urlToSpriteFrame(avatar_url).then(function (avatar) {
            _this.avatarSprite.spriteFrame = avatar;
            _this.nicknameLabel.text = nickname;
            _this.defaultEntity.active = false;
            _this.nicknameLabel.entity.transform2D.parent.entity.active = true;
            Databus_1.databus.playerInfoList[_this.seat] = {
                avatar: avatar,
                nickname: nickname
            };
        });
    };
    PlayerInfo.prototype.showDefault = function () {
        this.defaultEntity.active = true;
        this.nicknameLabel.entity.transform2D.parent.entity.active = false;
    };
    PlayerInfo = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PlayerInfo")
    ], PlayerInfo);
    return PlayerInfo;
}(engine_1.default.Script));
exports.default = PlayerInfo;
//# sourceMappingURL=PlayerInfo.js.map
