"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var GameServer_1 = require("./GameServer");
var utils_1 = require("./utils");
var GlobalManager = (function (_super) {
    tslib_1.__extends(GlobalManager, _super);
    function GlobalManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameServer = null;
        _this.APPID = 'wx76fd3cf02125f9e2';
        _this.SECRET = '445898eda089aa3a1357a6e40d7d1cda';
        return _this;
    }
    GlobalManager.prototype.onAwake = function () {
        var _this = this;
        engine_1.default.game.markAsPersist(this.entity);
        wx.setEnableDebug({ enableDebug: true });
        console.log(this.cardAtlas.spriteframes);
        for (var i = 0; i < 52; i++) {
            Databus_1.databus.cardSpriteframes[i] = this.cardAtlas.getSpriteframeByKey("Sprites/Poker/" + i + ".png");
        }
        console.log(Databus_1.databus.cardSpriteframes);
        wx.onHide(this.onHide.bind(this));
        wx.onShow(this.onShow.bind(this));
        this.getUserInfo().then(function (_a) {
            var nickName = _a.nickName, avatarUrl = _a.avatarUrl;
            console.log('get nickname:', nickName);
            Databus_1.databus.nickname = nickName;
            Databus_1.databus.avatarUrl = avatarUrl;
            utils_1.urlToSpriteFrame(avatarUrl);
            _this.getOpenid().then(function (openid) {
                console.log('get openid:', openid);
                Databus_1.databus.openid = openid;
                _this.gameServer = new GameServer_1.default(nickName, avatarUrl, openid, _this.onMessage.bind(_this));
                engine_1.default.game.playScene(_this.homeScene);
                console.log(engine_1.default.game.activeScene2D.root.name);
            });
        });
        engine_1.default.game.customEventEmitter.on('match_room', this.matchRoom.bind(this));
        engine_1.default.game.customEventEmitter.on('create_room', this.createRoom.bind(this));
        engine_1.default.game.customEventEmitter.on('exit_room', this.exitRoom.bind(this));
        engine_1.default.game.customEventEmitter.on('change_banker_card', function (data, success) {
            _this.gameServer.sendMessage({ type: 'change_banker_card', data: data }).then(success);
        });
        engine_1.default.game.customEventEmitter.on('play', function (data, success) {
            _this.gameServer.sendMessage({ type: 'play', data: data }).then(success);
        });
    };
    GlobalManager.prototype.onDestroy = function () {
        this.gameServer.close();
    };
    GlobalManager.prototype.onHide = function () {
        this.gameServer.isOpen && this.gameServer.sendMessage({ type: 'hide' });
    };
    GlobalManager.prototype.onShow = function (res) {
        var _this = this;
        var roomNo = res.query.roomNo;
        console.log('onShow roomNo:', roomNo);
        if (Databus_1.databus.roomNo === '') {
            roomNo !== undefined && this.joinRoom(roomNo);
        }
        else {
            if (roomNo === undefined || Databus_1.databus.roomNo === roomNo) {
                this.gameServer.sendMessage({ type: 'show' }).catch(this.reconnect.bind(this));
            }
            else {
                this.gameServer.sendMessage({ type: 'show' }).then(function () {
                    wx.showModal({
                        title: '提示',
                        content: '确定离开当前房间加入其他房间？',
                        success: function (res) {
                            if (res.confirm) {
                                _this.gameServer.sendMessage({
                                    type: 'join_room',
                                    data: {
                                        room_no: roomNo
                                    }
                                });
                            }
                        }
                    });
                }).catch(function () {
                    wx.showModal({
                        title: '提示',
                        content: '确定离开当前房间加入其他房间？',
                        success: function (res) {
                            if (res.confirm) {
                                _this.joinRoom(roomNo);
                            }
                            else {
                                _this.reconnect();
                            }
                        }
                    });
                });
            }
        }
    };
    GlobalManager.prototype.getUserInfo = function () {
        return new Promise(function (resolve, reject) {
            wx.getUserInfo({
                success: function (res) { return resolve(res.userInfo); },
                fail: function () { return wx.getUserProfile({
                    desc: '授权获取用户信息',
                    success: function (res) { return resolve(res.userInfo); },
                    fail: function (err) { return reject(err); }
                }); }
            });
        });
    };
    GlobalManager.prototype.getOpenid = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (res) { return wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session',
                    data: {
                        appid: _this.APPID,
                        secret: _this.SECRET,
                        js_code: res.code,
                        grant_type: 'authorization_code'
                    },
                    success: function (res) { return resolve(res.data.openid); },
                    fail: function (err) { return reject(err); }
                }); },
                fail: function (err) { return reject(err); }
            });
        });
    };
    GlobalManager.prototype.matchRoom = function () {
        wx.showLoading({
            title: '匹配房间中...',
            mask: true
        });
        this.gameServer.connect({ type: 'match_room' });
    };
    GlobalManager.prototype.createRoom = function () {
        wx.showLoading({
            title: '创建房间中...',
            mask: true
        });
        this.gameServer.connect({ type: 'create_room' });
    };
    GlobalManager.prototype.joinRoom = function (room_no) {
        wx.showLoading({
            title: '加入房间中...',
            mask: true
        });
        this.gameServer.connect({
            type: 'join_room',
            data: {
                room_no: room_no
            }
        });
    };
    GlobalManager.prototype.exitRoom = function () {
        engine_1.default.game.playScene(this.homeScene);
        this.gameServer.close();
        Databus_1.databus.roomNo = '';
    };
    GlobalManager.prototype.reconnect = function () {
        wx.showLoading({
            title: '重新连接中...',
            mask: true
        });
        this.gameServer.connect({ type: 'reconnect' });
    };
    GlobalManager.prototype.onMessage = function (_a) {
        var type = _a.type, data = _a.data;
        console.log('receive event', type, data);
        switch (type) {
            case 'join_room_result':
                if (data.error_msg) {
                    this.exitRoom();
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: data.error_msg,
                        showCancel: false
                    });
                    break;
                }
            case 'match_room_result':
                Databus_1.databus.mySeat = data.my_seat;
            case 'create_room_result':
                Databus_1.databus.roomNo = data.room_no;
                this.gameServer.sendMessage({ type: 'get_players_info' });
                break;
            case 'reconnect_result':
                wx.hideLoading();
                if (data.error_msg) {
                    this.exitRoom();
                    wx.showModal({
                        title: '提示',
                        content: data.error_msg,
                        showCancel: false
                    });
                }
                else if (data.battle_state) {
                }
                else {
                    Databus_1.databus.mySeat = data.my_seat;
                    engine_1.default.game.customEventEmitter.emit('get_players_info', data);
                }
                break;
            case 'get_players_info_result':
                engine_1.default.game.playScene(this.roomScene);
                engine_1.default.game.customEventEmitter.emit(type, data);
                wx.hideLoading();
                console.log('curr player count', data.player_count);
                data.player_count === 4 && this.gameServer.sendMessage({ type: 'start' });
                break;
            case 'player_enter':
            case 'player_exit':
            case 'player_change_banker_card':
            case 'player_play':
                engine_1.default.game.customEventEmitter.emit(type, data);
                break;
            case 'deal':
                wx.hideLoading();
                wx.showToast({
                    title: '游戏即将开始',
                    icon: 'loading',
                    duration: 2000
                });
                setTimeout(function () {
                    engine_1.default.game.customEventEmitter.emit(type, data);
                }, 2000);
                break;
        }
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Scene,
            required: true
        })
    ], GlobalManager.prototype, "homeScene", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Scene,
            required: true
        })
    ], GlobalManager.prototype, "roomScene", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Atlas,
            required: true
        })
    ], GlobalManager.prototype, "cardAtlas", void 0);
    GlobalManager = tslib_1.__decorate([
        engine_1.default.decorators.serialize("GlobalManager")
    ], GlobalManager);
    return GlobalManager;
}(engine_1.default.Script));
exports.default = GlobalManager;
//# sourceMappingURL=GlobalManager.js.map
