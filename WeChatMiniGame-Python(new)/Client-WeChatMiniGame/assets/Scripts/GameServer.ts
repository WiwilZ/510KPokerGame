export default class GameServer {
    private socketTask: WechatMinigame.SocketTask = null;
    private url = 'wss://wiwilz.cn';

    public constructor(private nickname, private avatarUrl, private openid, private onMessageCallback) {
    }

    public get isOpen() {
        return this.socketTask && this.socketTask.readyState === this.socketTask.OPEN;
    }

    public connect(event) {
        this.socketTask = wx.connectSocket({
            url: this.url,
            header: {
                Authorization: JSON.stringify({
                    nickname: encodeURI(this.nickname),
                    avatar_url: this.avatarUrl,
                    openid: this.openid,
                    event
                })
            }
        });
        this.socketTask.onOpen(res => {
            console.log('WebSocket 连接开启', res);
        });
        this.socketTask.onError(res => {
            console.log('WebSocket 异常', res);
        });
        this.socketTask.onClose(res => {
            console.log('WebSocket 连接关闭', res);
            this.socketTask = null;
        });
        this.socketTask.onMessage(res => {
            this.onMessageCallback(JSON.parse(res.data as string));
        });
    }

    public sendMessage(msg) {
        return new Promise((resolve, reject) => {
            if (this.socketTask === null) {
                console.log('send message fail');
                reject();
            } else {
                this.socketTask.send({
                    data: JSON.stringify(msg),
                    success: () => {
                        console.log('send message:', msg);
                        resolve();
                    },
                    fail: () => {
                        console.log('send message fail');
                        reject();
                    }
                });
            }
        });
    }

    public close() {
        this.socketTask && this.socketTask.close({});
        this.socketTask = null;
        console.log('websocket close');
    }
}