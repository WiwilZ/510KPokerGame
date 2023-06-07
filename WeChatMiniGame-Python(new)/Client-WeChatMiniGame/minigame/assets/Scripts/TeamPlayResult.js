"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = exports.Player = void 0;
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var Player = (function () {
    function Player() {
    }
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UISprite
        })
    ], Player.prototype, "avatarSprite", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Player.prototype, "nicknameLabel", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Player.prototype, "orderLabel", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Player.prototype, "scoreLabel", void 0);
    Player = tslib_1.__decorate([
        engine_1.default.decorators.serialize("Player")
    ], Player);
    return Player;
}());
exports.Player = Player;
var Team = (function () {
    function Team() {
        this.playerList = [];
    }
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: [Player]
        })
    ], Team.prototype, "playerList", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Team.prototype, "finalScoreLabel", void 0);
    Team = tslib_1.__decorate([
        engine_1.default.decorators.serialize("Team")
    ], Team);
    return Team;
}());
exports.Team = Team;
var TeamPlayResult = (function (_super) {
    tslib_1.__extends(TeamPlayResult, _super);
    function TeamPlayResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.teamList = [];
        return _this;
    }
    TeamPlayResult.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    TeamPlayResult.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    TeamPlayResult.prototype.init = function () {
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    TeamPlayResult.prototype.reset = function () {
        this.entity.transform2D.children[0].entity.active = false;
    };
    TeamPlayResult.prototype.onPlayerExit = function () {
        this.reset();
    };
    TeamPlayResult.prototype.onPlayerPlay = function (_a) {
        var team_play_result = _a.team_play_result;
        if (team_play_result !== undefined) {
            this.teamList.forEach(function (team, i) {
                var _a = team_play_result[i], players = _a.players, team_score = _a.team_score, addition = _a.addition;
                team.playerList.forEach(function (player, j) {
                    var _a = players[j], seat = _a.seat, score = _a.score, order = _a.order;
                    var _b = Databus_1.databus.playerInfoList[seat], avatar = _b.avatar, nickname = _b.nickname;
                    player.avatarSprite.spriteFrame = avatar;
                    player.nicknameLabel.text = nickname;
                    switch (order) {
                        case 0:
                            player.orderLabel.text = '头游';
                            break;
                        case 1:
                            player.orderLabel.text = '二游';
                            break;
                        case 2:
                            player.orderLabel.text = '三游';
                            break;
                        case 3:
                            player.orderLabel.text = '尾游';
                            break;
                        default:
                            player.orderLabel.text = '';
                            break;
                    }
                    player.scoreLabel.text = score + "\u5206";
                });
                team.finalScoreLabel.text = (addition === 0 ? '' : addition > 0 ? "+<style|color=#FFFF00>" + addition + "</style> = " : "-<style|color=#FFFF00>" + -addition + "</style> = ") + "<style|color=#FF0000>" + team_score + "</style>\u5206";
            });
            this.entity.transform2D.children[0].entity.active = true;
        }
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: [Team]
        })
    ], TeamPlayResult.prototype, "teamList", void 0);
    TeamPlayResult = tslib_1.__decorate([
        engine_1.default.decorators.serialize("TeamPlayResult")
    ], TeamPlayResult);
    return TeamPlayResult;
}(engine_1.default.Script));
exports.default = TeamPlayResult;
//# sourceMappingURL=TeamPlayResult.js.map
