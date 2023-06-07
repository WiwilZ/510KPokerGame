"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var LRUCache_1 = require("./LRUCache");
var GameServer_1 = require("./GameServer");
var GameManager = (function (_super) {
    tslib_1.__extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerTransList = [];
        _this.playerCompList = [];
        _this.avatarCache = new LRUCache_1.default(4);
        _this.isInBattle = false;
        _this.userInfo = {
            nickname: '',
            avatarUrl: '',
            openid: ''
        };
        _this.hasUserInfo = false;
        _this.APPID = 'wx76fd3cf02125f9e2';
        _this.SECRET = '445898eda089aa3a1357a6e40d7d1cda';
        return _this;
    }
    GameManager.prototype.onAwake = function () {
        var _this = this;
        console.log(this.cardAtlas.spriteframes);
        this.resetRoomInfo();
        this.createRoomTouchInput.onClick.add(this.createRoom.bind(this));
        this.exitRoomTouchInput.onClick.add(this.exitRoom.bind(this));
        this.getReadyTouchInput.onClick.add(function () {
            if (!_this.getReadyButton.disable) {
                _this.updateReadyStatus();
                _this.getReadyButton.disable = true;
            }
        });
        this.initPlayerCompList();
        wx.onShow(function (_a) {
            var query = _a.query;
            console.log('onShow query', query);
            if (_this.hasUserInfo) {
                _this.gameServer.reconnect();
                _this.launchWithRoomNo(query);
            }
            else {
                _this.getUserInfo().then(function () {
                    _this.gameServer = new GameServer_1.default(_this.userInfo, _this.onMessage.bind(_this));
                    _this.launchWithRoomNo(query);
                });
            }
        });
    };
    GameManager.prototype.onStart = function () {
        var _this = this;
        wx.showLoading({
            title: '加载中...',
            mask: true
        }).then(function () {
            _this.getUserInfo().then(function () {
                _this.gameServer = new GameServer_1.default(_this.userInfo, _this.onMessage.bind(_this));
            }).finally(function () {
                wx.hideLoading();
            });
        });
    };
    GameManager.prototype.getUserInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getUserProfile().then(function () {
                _this.getOpenid().then(function () {
                    _this.hasUserInfo = true;
                    resolve();
                }).catch(reject);
            }).catch(function () {
                wx.showToast({
                    title: "请允许获得授权",
                    icon: 'error',
                    duration: 1500
                });
                reject();
            });
        });
    };
    GameManager.prototype.getOpenid = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            wx.login().then(function (_a) {
                var code = _a.code;
                wx.request({
                    url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + _this.APPID + "&secret=" + _this.SECRET + "&js_code=" + code + "&grant_type=authorization_code",
                    success: function (_a) {
                        var data = _a.data;
                        _this.userInfo.openid = data.openid;
                        console.log('openid', data.openid);
                        resolve();
                    },
                    fail: function () {
                        reject();
                    }
                });
            }).catch(reject);
        });
    };
    GameManager.prototype.getUserProfile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            wx.getUserProfile({
                desc: "授权获取用户信息"
            }).then(function (_a) {
                var userInfo = _a.userInfo;
                if (userInfo) {
                    var nickName = userInfo.nickName, avatarUrl = userInfo.avatarUrl;
                    _this.userInfo.nickname = nickName;
                    _this.userInfo.avatarUrl = avatarUrl;
                    console.log('nickname', nickName);
                    console.log('avatarUrl', avatarUrl);
                    resolve();
                }
                else {
                    reject();
                }
            }).catch(reject);
        });
    };
    GameManager.prototype.onMessage = function (event) {
        var _this = this;
        console.log('receive event', event);
        switch (event.action) {
            case 'MATCH_ROOM':
            case 'CREATE_ROOM':
            case 'JOIN_ROOM':
                if (event.data.code) {
                    wx.hideLoading();
                    wx.showToast({
                        title: event.data.msg,
                        icon: 'error',
                        duration: 2000
                    });
                }
                else {
                    this.roomInfo.roomNo = event.data.room_no;
                    this.updateRoomInfoPlayerList(event.data).then(function () {
                        _this.enterRoom();
                        _this.showPlayerInfo();
                        wx.hideLoading();
                    });
                }
                break;
            case 'GET_PLAYERS_INFO':
            case 'ON_PLAYERS_INFO_UPDATE':
                console.log(event.action, event.data);
                this.updateRoomInfoPlayerList(event.data).then(function () {
                    if (_this.isInBattle) {
                        wx.showModal({
                            title: '温馨提示',
                            content: '有玩家退出游戏',
                            showCancel: false
                        }).then(function () {
                            _this.resetRoomScene();
                            _this.showPlayerInfo();
                        });
                    }
                    else {
                        _this.showPlayerInfo();
                        if (_this.roomInfo.playerList.length === 4 && _this.roomInfo.playerList.every(function (v) { return v.isReady; }) && _this.roomInfo.mySeat === 0) {
                            _this.gameServer.send({
                                event: 'START'
                            });
                        }
                    }
                });
                break;
            case 'START':
                this.roomInfo.playerList.forEach(function (player) {
                    player.isReady = false;
                });
                if (this.roomInfo.mySeat === 0) {
                    setTimeout(function () {
                        _this.gameServer.send({
                            event: 'DEAL'
                        });
                    }, 3000);
                }
                wx.showToast({
                    title: "游戏即将开始...",
                    icon: 'none',
                    duration: 3000
                });
                break;
            case 'DEAL':
            case 'CHANGE_BANKER_CARD':
            case 'PLAY':
        }
    };
    GameManager.prototype.launchWithRoomNo = function (query) {
        var roomNo = query.roomNo;
        console.log('roomNo: ', roomNo);
        if (!roomNo)
            return;
        roomNo = parseInt(roomNo);
        if (!this.roomInfo.roomNo) {
            this.roomInfo.roomNo = roomNo;
            this.joinRoom();
            return;
        }
        if (this.roomInfo.roomNo !== roomNo) {
            this.gameServer.send({
                action: 'EXIT_ROOM'
            });
            this.roomInfo.roomNo = roomNo;
            this.joinRoom();
        }
    };
    GameManager.prototype.resetRoomInfo = function () {
        this.roomInfo = {
            roomNo: null,
            mySeat: null,
            playerList: []
        };
    };
    GameManager.prototype.createRoom = function () {
        wx.showLoading({
            'title': '加载中...',
            mask: true
        });
        this.gameServer.send({
            action: 'CREATE_ROOM'
        });
    };
    GameManager.prototype.joinRoom = function () {
        this.gameServer.send({
            action: 'JOIN_ROOM',
            data: this.roomInfo.roomNo
        });
    };
    GameManager.prototype.exitRoom = function () {
        var _this = this;
        wx.showModal({
            title: '温馨提示',
            content: '确定离开房间吗？',
            showCancel: true
        }).then(function (res) {
            if (res.confirm) {
                _this.gameServer.send({
                    action: 'EXIT_ROOM'
                });
                _this.enterHome();
            }
        });
    };
    GameManager.prototype.enterHome = function () {
        this.room.entity.active = false;
        this.home.entity.active = true;
    };
    GameManager.prototype.enterRoom = function () {
        this.resetRoomScene();
        this.room.entity.active = true;
        this.home.entity.active = false;
    };
    GameManager.prototype.resetRoomScene = function () {
        var _this = this;
        this.getReadyButton.disable = false;
        this.getReadyButton.entity.active = true;
        this.playerCompList.forEach(function (comp, i) {
            comp.avatarSprite.spriteFrame = _this.defaultAvatar;
            comp.readySprite.visible = false;
            comp.nicknameLabel.text = '';
            if (i !== 0) {
                comp.nicknameLabel.text = '点击邀请好友';
                comp.inviteButton.disable = false;
            }
        });
    };
    GameManager.prototype.showPlayerInfo = function () {
        var _this = this;
        this.playerCompList.slice(1).forEach(function (comp) {
            comp.avatarSprite.spriteFrame = _this.defaultAvatar;
            comp.readySprite.visible = false;
            comp.nicknameLabel.text = '点击邀请好友';
            comp.inviteButton.disable = false;
        });
        this.roomInfo.playerList.forEach(function (_a, i) {
            var avatar = _a.avatar, nickname = _a.nickname, isReady = _a.isReady;
            var comp = _this.playerCompList[_this.indexFromMe(i)];
            comp.avatarSprite.spriteFrame = avatar;
            comp.readySprite.grayScale = !isReady;
            comp.readySprite.visible = true;
            comp.nicknameLabel.text = nickname;
            if (i !== _this.roomInfo.mySeat) {
                comp.inviteButton.disable = true;
            }
        });
    };
    GameManager.prototype.updateReadyStatus = function () {
        this.gameServer.send({
            action: 'UPDATE_READY_STATUS'
        });
    };
    GameManager.prototype.updateRoomInfoPlayerList = function (_a) {
        var _this = this;
        var players = _a.players, seat = _a.seat;
        this.roomInfo.mySeat = seat;
        return Promise.all(players.map(function (_a) {
            var nickname = _a.nickname, avatar_url = _a.avatar_url, is_ready = _a.is_ready;
            var avatar = _this.avatarCache.get(avatar_url);
            if (avatar) {
                return Promise.resolve({
                    avatar: avatar,
                    nickname: nickname,
                    isReady: is_ready
                });
            }
            return _this.urlToSpriteFrame(avatar_url).then(function (avatar) {
                _this.avatarCache.add(avatar_url, avatar);
                return Promise.resolve({
                    avatar: avatar,
                    nickname: nickname,
                    isReady: is_ready
                });
            });
        })).then(function (res) {
            _this.roomInfo.playerList = res;
            console.log('updateRoomInfoPlayerList', res);
            return Promise.resolve();
        });
    };
    GameManager.prototype.initPlayerCompList = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var playerTrans = this_1.playerTransList[i];
            var avatarTrans = playerTrans.findChildByName('Avatar');
            var comp = {
                avatarSprite: avatarTrans.entity.getComponent(engine_1.default.UISprite),
                readySprite: avatarTrans.children[0].entity.getComponent(engine_1.default.UISprite),
                nicknameLabel: playerTrans.findChildByName('Nickname').entity.getComponent(engine_1.default.UILabel)
            };
            if (i > 0) {
                comp.inviteButton = avatarTrans.entity.getComponent(engine_1.default.UIButton);
                avatarTrans.entity.getComponent(engine_1.default.TouchInputComponent).onClick.add(function () {
                    if (!comp.inviteButton.disable) {
                        _this.invite();
                    }
                });
            }
            this_1.playerCompList[i] = comp;
        };
        var this_1 = this;
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    };
    GameManager.prototype.indexFromMe = function (seat) {
        return (seat - this.roomInfo.mySeat + 4) % 4;
    };
    GameManager.prototype.urlToSpriteFrame = function (url) {
        return new Promise(function (resolve, reject) {
            var img = new engine_1.default.Image();
            img.onerror = function (err) {
                console.error(err);
                reject();
            };
            img.onload = function () {
                var texture = new engine_1.default.Texture2D();
                if (texture.initWithImage(img)) {
                    var spriteFrame = engine_1.default.SpriteFrame.createFromTexture(texture);
                    resolve(spriteFrame);
                }
                else {
                    reject();
                }
            };
            img.src = url;
        });
    };
    GameManager.prototype.invite = function () {
        var _this = this;
        engine_1.default.canvas.toTempFilePath({
            destWidth: 500,
            destHeight: 400
        }).then(function (res) {
            wx.shareAppMessage({
                title: '5 10 K',
                query: "roomNo=" + _this.roomInfo.roomNo,
                imageUrl: res.tempFilePath
            });
        });
    };
    GameManager.prototype.deal = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Transform2D,
            required: true
        })
    ], GameManager.prototype, "home", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Transform2D,
            required: true
        })
    ], GameManager.prototype, "room", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TouchInputComponent,
            required: true
        })
    ], GameManager.prototype, "createRoomTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TouchInputComponent,
            required: true
        })
    ], GameManager.prototype, "exitRoomTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.UIButton,
            required: true
        })
    ], GameManager.prototype, "getReadyButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TouchInputComponent,
            required: true
        })
    ], GameManager.prototype, "getReadyTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Atlas,
            required: true
        })
    ], GameManager.prototype, "cardAtlas", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.SpriteFrame,
            required: true
        })
    ], GameManager.prototype, "defaultAvatar", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: [engine_1.default.Transform2D],
            required: true
        })
    ], GameManager.prototype, "playerTransList", void 0);
    GameManager = tslib_1.__decorate([
        engine_1.default.decorators.serialize("GameManager")
    ], GameManager);
    return GameManager;
}(engine_1.default.Script));
exports.default = GameManager;
//# sourceMappingURL=GameManager.js.map
