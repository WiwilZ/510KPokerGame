import engine from "engine";
import LRUCache from "./LRUCache";
import GameServer from "./GameServer"


interface UserInfo {
    nickname: string,
    avatarUrl: string,
    openid: string
}


interface PlayerInfo {
    avatar: engine.SpriteFrame,
    nickname: string,
    isReady: boolean,
}


interface RoomInfo {
    roomNo: number,
    mySeat: number,
    playerList: PlayerInfo[]
}


interface PlayerComp {
    avatarSprite: engine.UISprite,
    readySprite: engine.UISprite,
    nicknameLabel: engine.UILabel,
    inviteButton?: engine.UIButton
}


@engine.decorators.serialize("GameManager")
export default class GameManager extends engine.Script {
    @engine.decorators.property({
        type: engine.Transform2D,
        required: true
    })
    public home: engine.Transform2D;

    @engine.decorators.property({
        type: engine.Transform2D,
        required: true
    })
    public room: engine.Transform2D;


    @engine.decorators.property({
        type: engine.TouchInputComponent,
        required: true
    })
    public createRoomTouchInput: engine.TouchInputComponent;

    @engine.decorators.property({
        type: engine.TouchInputComponent,
        required: true
    })
    public exitRoomTouchInput: engine.TouchInputComponent;

    @engine.decorators.property({
        type: engine.UIButton,
        required: true
    })
    public getReadyButton: engine.UIButton;

    @engine.decorators.property({
        type: engine.TouchInputComponent,
        required: true
    })
    public getReadyTouchInput: engine.TouchInputComponent;

    @engine.decorators.property({
        type: engine.Atlas,
        required: true
    })
    public cardAtlas: engine.Atlas;

    @engine.decorators.property({
        type: engine.SpriteFrame,
        required: true
    })
    public defaultAvatar: engine.SpriteFrame;

    @engine.decorators.property({
        type: [engine.Transform2D],
        required: true
    })
    public playerTransList: engine.Transform2D[] = [];


    private playerCompList: PlayerComp[] = [];


    private gameServer: GameServer;

    private avatarCache = new LRUCache(4);
    private isInBattle = false;

    private userInfo: UserInfo = {
        nickname: '',
        avatarUrl: '',
        openid: ''
    };
    private hasUserInfo = false;
    private roomInfo: RoomInfo;

    private APPID = 'wx76fd3cf02125f9e2';
    private SECRET = '445898eda089aa3a1357a6e40d7d1cda';


    public onAwake() {
        console.log(this.cardAtlas.spriteframes);

        this.resetRoomInfo();

        this.createRoomTouchInput.onClick.add(this.createRoom.bind(this));
        this.exitRoomTouchInput.onClick.add(this.exitRoom.bind(this));
        this.getReadyTouchInput.onClick.add(() => {
            if (!this.getReadyButton.disable) {
                this.updateReadyStatus();
                this.getReadyButton.disable = true;
            }
        });

        this.initPlayerCompList();

        wx.onShow(({ query }) => {
            console.log('onShow query', query);

            if (this.hasUserInfo) {
                this.gameServer.reconnect();
                this.launchWithRoomNo(query);
            } else {
                this.getUserInfo().then(() => {
                    this.gameServer = new GameServer(this.userInfo, this.onMessage.bind(this));
                    this.launchWithRoomNo(query);
                });
            }
        });
    }

    public onStart() {
        wx.showLoading({
            title: '加载中...',
            mask: true
        }).then(() => {
            this.getUserInfo().then(() => {
                this.gameServer = new GameServer(this.userInfo, this.onMessage.bind(this));
            }).finally(() => {
                wx.hideLoading();
            });
        });
    }

    private getUserInfo() {
        return new Promise((resolve, reject) => {
            this.getUserProfile().then(() => {
                this.getOpenid().then(() => {
                    this.hasUserInfo = true;
                    resolve();
                }).catch(reject);
            }).catch(() => {
                wx.showToast({
                    title: "请允许获得授权",
                    icon: 'error',
                    duration: 1500
                });
                reject();
            });
        });
    }

    private getOpenid() {
        return new Promise((resolve, reject) => {
            wx.login().then(({ code }) => {
                wx.request({
                    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${this.APPID}&secret=${this.SECRET}&js_code=${code}&grant_type=authorization_code`,
                    success: ({ data }) => {
                        this.userInfo.openid = data.openid;
                        console.log('openid', data.openid);
                        resolve();
                    },
                    fail: () => {
                        reject();
                    }
                });
            }).catch(reject);
        });
    }

    private getUserProfile() {
        return new Promise((resolve, reject) => {
            wx.getUserProfile({
                desc: "授权获取用户信息"
            }).then(({ userInfo }) => {
                if (userInfo) {
                    const { nickName, avatarUrl } = userInfo;
                    this.userInfo.nickname = nickName
                    this.userInfo.avatarUrl = avatarUrl;
                    console.log('nickname', nickName);
                    console.log('avatarUrl', avatarUrl);
                    resolve();
                } else {
                    reject();
                }
            }).catch(reject);
        });
    }

    private onMessage(event) {
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
                } else {
                    this.roomInfo.roomNo = event.data.room_no;
                    this.updateRoomInfoPlayerList(event.data).then(() => {
                        this.enterRoom();
                        this.showPlayerInfo();
                        wx.hideLoading();
                    });
                }
                break;

            case 'GET_PLAYERS_INFO':
            case 'ON_PLAYERS_INFO_UPDATE':
                console.log(event.action, event.data);
                this.updateRoomInfoPlayerList(event.data).then(() => {
                    if (this.isInBattle) {
                        wx.showModal({
                            title: '温馨提示',
                            content: '有玩家退出游戏',
                            showCancel: false
                        }).then(() => {
                            this.resetRoomScene();
                            this.showPlayerInfo();
                        });
                    } else {
                        this.showPlayerInfo();
                        if (this.roomInfo.playerList.length === 4 && this.roomInfo.playerList.every(v => v.isReady) && this.roomInfo.mySeat === 0) {
                            this.gameServer.send({
                                event: 'START'
                            });
                        }
                    }
                });
                break;

            case 'START':
                this.roomInfo.playerList.forEach(player => {
                    player.isReady = false;
                });
                if (this.roomInfo.mySeat === 0) {
                    setTimeout(() => {
                        this.gameServer.send({
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
    }

    private launchWithRoomNo(query) {
        let roomNo = query.roomNo;
        console.log('roomNo: ', roomNo);

        if (!roomNo) return;
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
    }

    private resetRoomInfo() {
        this.roomInfo = {
            roomNo: null,
            mySeat: null,
            playerList: []
        };
    }

    private createRoom() {
        wx.showLoading({
            'title': '加载中...',
            mask: true
        });
        this.gameServer.send({
            action: 'CREATE_ROOM'
        });
    }

    private joinRoom() {
        this.gameServer.send({
            action: 'JOIN_ROOM',
            data: this.roomInfo.roomNo
        });
    }

    private exitRoom() {
        wx.showModal({
            title: '温馨提示',
            content: '确定离开房间吗？',
            showCancel: true
        }).then(res => {
            if (res.confirm) {
                this.gameServer.send({
                    action: 'EXIT_ROOM'
                });
                this.enterHome();
            }
        });
    }

    private enterHome() {
        this.room.entity.active = false;
        this.home.entity.active = true;
    }

    private enterRoom() {
        this.resetRoomScene();
        this.room.entity.active = true;
        this.home.entity.active = false;
    }

    private resetRoomScene() {
        this.getReadyButton.disable = false;
        this.getReadyButton.entity.active = true;

        this.playerCompList.forEach((comp, i) => {
            comp.avatarSprite.spriteFrame = this.defaultAvatar;
            comp.readySprite.visible = false;
            comp.nicknameLabel.text = '';
            if (i !== 0) {
                comp.nicknameLabel.text = '点击邀请好友';
                comp.inviteButton.disable = false;
            }
        });
    }

    private showPlayerInfo() {
        this.playerCompList.slice(1).forEach(comp => {
            comp.avatarSprite.spriteFrame = this.defaultAvatar;
            comp.readySprite.visible = false;
            comp.nicknameLabel.text = '点击邀请好友';
            comp.inviteButton.disable = false;
        });

        this.roomInfo.playerList.forEach(({ avatar, nickname, isReady }, i) => {
            const comp = this.playerCompList[this.indexFromMe(i)];
            comp.avatarSprite.spriteFrame = avatar;
            comp.readySprite.grayScale = !isReady;
            comp.readySprite.visible = true;
            comp.nicknameLabel.text = nickname;
            if (i !== this.roomInfo.mySeat) {
                comp.inviteButton.disable = true;
            }
        });
    }

    private updateReadyStatus() {
        this.gameServer.send({
            action: 'UPDATE_READY_STATUS'
        });
    }

    private updateRoomInfoPlayerList({ players, seat }) {
        this.roomInfo.mySeat = seat;

        return Promise.all<PlayerInfo>(
            players.map(({ nickname, avatar_url, is_ready }) => {
                const avatar = this.avatarCache.get(avatar_url);
                if (avatar) {
                    return Promise.resolve({
                        avatar,
                        nickname,
                        isReady: is_ready
                    });
                }
                return this.urlToSpriteFrame(avatar_url).then(avatar => {
                    this.avatarCache.add(avatar_url, avatar);
                    return Promise.resolve({
                        avatar,
                        nickname,
                        isReady: is_ready
                    });
                });
            })
        ).then(res => {
            this.roomInfo.playerList = res;
            console.log('updateRoomInfoPlayerList', res);
            return Promise.resolve();
        });
    }

    private initPlayerCompList() {
        for (let i = 0; i < 4; i++) {
            const playerTrans = this.playerTransList[i];
            const avatarTrans = playerTrans.findChildByName('Avatar');
            const comp: PlayerComp = {
                avatarSprite: avatarTrans.entity.getComponent(engine.UISprite),
                readySprite: avatarTrans.children[0].entity.getComponent(engine.UISprite),
                nicknameLabel: playerTrans.findChildByName('Nickname').entity.getComponent(engine.UILabel)
            };
            if (i > 0) {
                comp.inviteButton = avatarTrans.entity.getComponent(engine.UIButton);
                (avatarTrans.entity.getComponent(engine.TouchInputComponent) as engine.TouchInputComponent).onClick.add(() => {
                    if (!comp.inviteButton.disable) {
                        this.invite();
                    }
                });
            }
            this.playerCompList[i] = comp;
        }
    }

    private indexFromMe(seat: number) {
        return (seat - this.roomInfo.mySeat + 4) % 4;
    }

    private urlToSpriteFrame(url: string) {
        return new Promise((resolve, reject) => {
            const img = new engine.Image();
            img.onerror = err => {
                console.error(err);
                reject();
            };
            img.onload = () => {
                const texture = new engine.Texture2D();
                if (texture.initWithImage(img)) {
                    const spriteFrame = engine.SpriteFrame.createFromTexture(texture);
                    resolve(spriteFrame);
                } else {
                    reject();
                }
            }
            img.src = url;
        });
    }

    private invite() {
        engine.canvas.toTempFilePath({
            destWidth: 500,
            destHeight: 400
        }).then(res => {
            wx.shareAppMessage({
                title: '5 10 K',
                query: `roomNo=${this.roomInfo.roomNo}`,
                imageUrl: res.tempFilePath
            });
        });
    }

    private deal() {

    }
}
