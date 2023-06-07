"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var MyScore = (function (_super) {
    tslib_1.__extends(MyScore, _super);
    function MyScore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyScore.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    MyScore.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    MyScore.prototype.init = function () {
        this.label = this.entity.getComponent(engine_1.default.UILabel);
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    MyScore.prototype.reset = function () {
        this.myScore = 0;
        this.label.text = '';
    };
    MyScore.prototype.onPlayerExit = function () {
        this.reset();
    };
    MyScore.prototype.onDeal = function () {
        this.showScore();
    };
    MyScore.prototype.onPlayerPlay = function (_a) {
        var scorer = _a.scorer, score = _a.score;
        if (scorer === Databus_1.databus.mySeat) {
            this.myScore += score;
            this.showScore();
        }
    };
    MyScore.prototype.showScore = function () {
        this.label.text = "score: " + this.myScore;
    };
    MyScore = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MyScore")
    ], MyScore);
    return MyScore;
}(engine_1.default.Script));
exports.default = MyScore;
//# sourceMappingURL=MyScore.js.map
