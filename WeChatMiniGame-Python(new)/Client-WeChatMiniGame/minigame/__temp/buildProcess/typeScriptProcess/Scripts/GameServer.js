"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameServer = (function () {
    function GameServer(nickname, avatarUrl, openid, onMessageCallback) {
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.openid = openid;
        this.onMessageCallback = onMessageCallback;
        this.socketTask = null;
        this.url = 'wss://wiwilz.cn';
    }
    Object.defineProperty(GameServer.prototype, "isOpen", {
        get: function () {
            return this.socketTask && this.socketTask.readyState === this.socketTask.OPEN;
        },
        enumerable: false,
        configurable: true
    });
    GameServer.prototype.connect = function (event) {
        var _this = this;
        this.socketTask = wx.connectSocket({
            url: this.url,
            header: {
                Authorization: JSON.stringify({
                    nickname: encodeURI(this.nickname),
                    avatar_url: this.avatarUrl,
                    openid: this.openid,
                    event: event
                })
            }
        });
        this.socketTask.onOpen(function (res) {
            console.log('WebSocket 连接开启', res);
        });
        this.socketTask.onError(function (res) {
            console.log('WebSocket 异常', res);
        });
        this.socketTask.onClose(function (res) {
            console.log('WebSocket 连接关闭', res);
            _this.socketTask = null;
        });
        this.socketTask.onMessage(function (res) {
            _this.onMessageCallback(JSON.parse(res.data));
        });
    };
    GameServer.prototype.sendMessage = function (msg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.socketTask === null) {
                console.log('send message fail');
                reject();
            }
            else {
                _this.socketTask.send({
                    data: JSON.stringify(msg),
                    success: function () {
                        console.log('send message:', msg);
                        resolve();
                    },
                    fail: function () {
                        console.log('send message fail');
                        reject();
                    }
                });
            }
        });
    };
    GameServer.prototype.close = function () {
        this.socketTask && this.socketTask.close({});
        this.socketTask = null;
        console.log('websocket close');
    };
    return GameServer;
}());
exports.default = GameServer;
//# sourceMappingURL=GameServer.js.map
