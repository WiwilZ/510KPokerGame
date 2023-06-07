import engine from "engine";
import { databus } from "./Databus";
import GameServer from "./GameServer";
import { urlToSpriteFrame } from "./utils";


@engine.decorators.serialize("GlobalManager")
export default class GlobalManager extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.Scene,
        required: true
    })
    public homeScene: engine.Scene;

    @engine.decorators.property({
        type: engine.TypeNames.Scene,
        required: true
    })
    public roomScene: engine.Scene;

    @engine.decorators.property({
        type: engine.Atlas,
        required: true
    })
    public cardAtlas: engine.Atlas;

    private gameServer: GameServer = null;

    private APPID = 'wx76fd3cf02125f9e2';
    private SECRET = '445898eda089aa3a1357a6e40d7d1cda';


    public onAwake() {
        engine.game.markAsPersist(this.entity);
        wx.setEnableDebug({ enableDebug: true });

        wx.onHide(this.onHide.bind(this));
        wx.onShow(this.onShow.bind(this));

        this.getUserInfo().then(({ nickName, avatarUrl }) => {
            console.log('get nickname:', nickName);
            databus.nickname = nickName;
            databus.avatarUrl = avatarUrl;
            urlToSpriteFrame(avatarUrl);

            this.getOpenid().then(openid => {
                console.log('get openid:', openid);
                databus.openid = openid;

                this.gameServer = new GameServer(nickName, avatarUrl, openid, this.onMessage.bind(this));

                engine.game.playScene(this.homeScene);
                console.log(engine.game.activeScene2D.root.name);
            });
        });

        engine.game.customEventEmitter.on('match_room', this.matchRoom.bind(this));
        engine.game.customEventEmitter.on('create_room', this.createRoom.bind(this));
        engine.game.customEventEmitter.on('exit_room', this.exitRoom.bind(this));
        engine.game.customEventEmitter.on('change_banker_card', (data, success) => this.gameServer.sendMessage({ type: 'change_banker_card', data }).then(success));
        engine.game.customEventEmitter.on('play', (data, success) => this.gameServer.sendMessage({ type: 'play', data }).then(success));

        for (let i = 0; i < 52; i++) {
            databus.cardSpriteFrames[i] = this.cardAtlas.getSpriteframeByKey(`Sprites/Poker/${i}.png`);
        }
    }

    public onDestroy() {
        this.gameServer.close();
    }

    private onHide() {
        this.gameServer.isOpen && this.gameServer.sendMessage({ type: 'hide' });
    }

    private onShow(res) {
        const roomNo = res.query.roomNo;
        console.log('onShow roomNo:', roomNo);

        if (databus.roomNo === '') {
            roomNo !== undefined && this.joinRoom(roomNo);
        } else {
            if (roomNo === undefined || databus.roomNo === roomNo) {
                this.gameServer.sendMessage({ type: 'show' }).catch(this.reconnect.bind(this));
            } else {
                this.gameServer.sendMessage({ type: 'show' }).then(() => {
                    wx.showModal({
                        title: '提示',
                        content: '确定离开当前房间加入其他房间？',
                        success: res => {
                            res.confirm && this.gameServer.sendMessage({
                                type: 'join_room',
                                data: {
                                    room_no: roomNo
                                }
                            });
                        }
                    });
                }).catch(() => {
                    wx.showModal({
                        title: '提示',
                        content: '确定离开当前房间加入其他房间？',
                        success: res => {
                            if (res.confirm) {
                                this.joinRoom(roomNo);
                            } else {
                                this.reconnect();
                            }
                        }
                    });
                });
            }
        }
    }

    private getUserInfo() {
        return new Promise<{ nickName: string, avatarUrl: string }>((resolve, reject) => {
            wx.getUserInfo({
                success: res => resolve(res.userInfo),
                fail: () => wx.getUserProfile({
                    desc: '授权获取用户信息',
                    success: res => resolve(res.userInfo),
                    fail: err => reject(err)
                })
            });
        });
    }

    private getOpenid() {
        return new Promise<string>((resolve, reject) => {
            wx.login({
                success: res => wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session',
                    data: {
                        appid: this.APPID,
                        secret: this.SECRET,
                        js_code: res.code,
                        grant_type: 'authorization_code'
                    },
                    success: res => resolve(res.data.openid),
                    fail: err => reject(err)
                }),
                fail: err => reject(err)
            });
        });
    }

    private matchRoom() {
        wx.showLoading({
            title: '匹配房间中...',
            mask: true
        });
        this.gameServer.connect({ type: 'match_room' });
    }

    private createRoom() {
        wx.showLoading({
            title: '创建房间中...',
            mask: true
        });
        this.gameServer.connect({ type: 'create_room' });
    }

    private joinRoom(room_no: string) {
        wx.showLoading({
            title: '加入房间中...',
            mask: true
        });
        this.gameServer.connect({
            type: 'join_room',
            data: {
                room_no
            }
        });
    }

    private exitRoom() {
        engine.game.playScene(this.homeScene);
        this.gameServer.close();
        databus.roomNo = '';
        databus.playerInfoList = [];
    }

    private reconnect() {
        wx.showLoading({
            title: '重新连接中...',
            mask: true
        });
        this.gameServer.connect({ type: 'reconnect' });
    }

    private onMessage({ type, data }) {
        console.log('receive event', type, data);
        switch (type) {
            case 'match_room_result':
                databus.roomNo = data.room_no;
                databus.mySeat = data.my_seat;
                this.gameServer.sendMessage({ type: 'get_players_info' });
                break;
            case 'create_room_result':
                databus.roomNo = data.room_no;
                databus.mySeat = 0;
                this.gameServer.sendMessage({ type: 'get_players_info' });
                break;
            case 'join_room_result':
                if (data.error_msg) {
                    this.exitRoom();
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: data.error_msg,
                        showCancel: false
                    });
                } else {
                    databus.roomNo = data.room_no;
                    databus.mySeat = data.my_seat;
                    this.gameServer.sendMessage({ type: 'get_players_info' });
                }
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
                } else if (data.battle_state) {

                } else {
                    databus.mySeat = data.my_seat;
                    urlToSpriteFrame(databus.avatarUrl).then(avatar => {
                        databus.playerInfoList[databus.mySeat] = {
                            avatar,
                            nickname: databus.nickname
                        };
                        engine.game.customEventEmitter.emit('get_players_info', data);
                    });
                }
                break;

            case 'get_players_info_result':
                urlToSpriteFrame(databus.avatarUrl).then(avatar => {
                    databus.playerInfoList[databus.mySeat] = {
                        avatar,
                        nickname: databus.nickname
                    };
                    engine.game.playScene(this.roomScene);
                    engine.game.customEventEmitter.emit(type, data);
                    wx.hideLoading();
                    data.player_count === 4 && this.gameServer.sendMessage({ type: 'start' });
                });
                break;

            case 'player_enter':
            case 'player_exit':
            case 'player_change_banker_card':
            case 'player_play':
                engine.game.customEventEmitter.emit(type, data);
                break;

            case 'deal':
                wx.hideLoading();
                wx.showToast({
                    title: '游戏即将开始',
                    icon: 'loading',
                    duration: 1500,
                    mask: true
                });
                setTimeout(() => {
                    engine.game.customEventEmitter.emit(type, data);
                }, 1300);
                break;
        }
    }


}
