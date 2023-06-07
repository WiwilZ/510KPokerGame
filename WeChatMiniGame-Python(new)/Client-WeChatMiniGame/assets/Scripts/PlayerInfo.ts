import engine from "engine";
import { databus } from "./Databus";
import { urlToSpriteFrame } from "./utils";


@engine.decorators.serialize("PlayerInfo")
export default class PlayerInfo extends engine.Script {
    private defaultEntity: engine.Entity;
    private avatarSprite: engine.UISprite;
    private nicknameLabel: engine.UILabel;

    private seat: number;

    private getPlayersInfoResultHandler;
    private playerEnterHandler;
    private playerExitHandler;


    public onAwake() {
        this.init();

        engine.game.customEventEmitter.on('get_players_info_result', this.getPlayersInfoResultHandler);
        engine.game.customEventEmitter.on('player_enter', this.playerEnterHandler);
        engine.game.customEventEmitter.on('player_exit', this.playerExitHandler);
    }

    private init() {
        const name = this.entity.name;
        this.seat = (databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;

        this.defaultEntity = this.entity.transform2D.findChildByName('Default').entity;

        const infoTrans = this.entity.transform2D.findChildByName('Info');
        this.avatarSprite = infoTrans.findChildByName('CircleMask').children[0].entity.getComponent(engine.UISprite);
        this.nicknameLabel = infoTrans.findChildByName('Nickname').entity.getComponent(engine.UILabel);

        this.getPlayersInfoResultHandler = this.onGetPlayersInfoResult.bind(this);
        this.playerEnterHandler = this.onPlayerEnter.bind(this);
        this.playerExitHandler = this.onPlayerExit.bind(this);
    }

    public onDestroy() {
        engine.game.customEventEmitter.removeListener('get_players_info_result', this.getPlayersInfoResultHandler);
        engine.game.customEventEmitter.removeListener('player_enter', this.playerEnterHandler);
        engine.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
    }

    private onGetPlayersInfoResult({ player_list }) {
        const info = player_list[this.seat];
        if (info) {
            this.showInfo(info);
        } else {
            this.showDefault();
        }
    }

    private onPlayerEnter({ seat, info }) {
        seat === this.seat && this.showInfo(info);
    }

    private onPlayerExit({ seat }) {
        seat === this.seat && this.showDefault();
    }

    private showInfo({ nickname, avatar_url }) {
        urlToSpriteFrame(avatar_url).then(avatar => {
            this.avatarSprite.spriteFrame = avatar;
            this.nicknameLabel.text = nickname;
            this.defaultEntity.active = false;
            this.nicknameLabel.entity.transform2D.parent.entity.active = true;

            databus.playerInfoList[this.seat] = {
                avatar,
                nickname
            };
        });
    }

    private showDefault() {
        this.defaultEntity.active = true;
        this.nicknameLabel.entity.transform2D.parent.entity.active = false;
    }
}
