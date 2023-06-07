import engine from "engine";
import { databus } from "./Databus";
import { urlToSpriteFrame, invite } from "./utils";



interface PlayerComp {
    defaultEntity: engine.Entity
    actionSpriteList: engine.UISprite[],
    passSprite: engine.UISprite,
    avatarSprite: engine.UISprite,
    nicknameLabel: engine.UILabel,
    bankerCardSprite: engine.UISprite,
    remainingCardCountLabel: engine.UILabel,
    remainingCardCount: number
}


@engine.decorators.serialize("Roommate")
export default class Roommate extends engine.Script {
    private playerCompList: PlayerComp[] = [];

    private getPlayersInfoResultHandler;
    private playerEnterHandler;
    private playerExitHandler;
    private dealHandler;
    private playerChangeBankerCardHandler;
    private playerPlayHandler;

    public onAwake() {
        this.init();

        engine.game.customEventEmitter.on('get_players_info_result', this.getPlayersInfoResultHandler);
        engine.game.customEventEmitter.on('player_enter', this.playerEnterHandler);
        engine.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.on('deal', this.dealHandler);
        engine.game.customEventEmitter.on('player_change_banker_card', this.playerChangeBankerCardHandler);
        engine.game.customEventEmitter.on('player_play', this.playerPlayHandler);

        this.reset();
    }

    public onDestroy() {
        engine.game.customEventEmitter.removeListener('get_players_info_result', this.getPlayersInfoResultHandler);
        engine.game.customEventEmitter.removeListener('player_enter', this.playerEnterHandler);
        engine.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine.game.customEventEmitter.removeListener('player_change_banker_card', this.playerChangeBankerCardHandler);
        engine.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    }

    private init() {
        for (let i = 1; i < 4; i++) {
            const playerTrans = this.entity.transform2D.findChildByName(`Player${i}`);
            const defaultTrans = playerTrans.findChildByName('Default');
            (defaultTrans.findChildByName('CircleMask').entity.getComponent(engine.TouchInputComponent) as engine.TouchInputComponent).onClick.add(invite);
            const infoTrans = playerTrans.findChildByName('Info');
            this.playerCompList[i] = {
                defaultEntity: defaultTrans.entity,
                actionSpriteList: playerTrans.findChildByName('ActionCards').children.map(v => v.entity.getComponent(engine.UISprite)),
                passSprite: playerTrans.findChildByName('Pass').entity.getComponent(engine.UISprite),
                avatarSprite: infoTrans.findChildByName('CircleMask').children[0].entity.getComponent(engine.UISprite),
                nicknameLabel: infoTrans.findChildByName('Nickname').entity.getComponent(engine.UILabel),
                bankerCardSprite: playerTrans.findChildByName('BankerCard').entity.getComponent(engine.UISprite),
                remainingCardCountLabel: playerTrans.findChildByName('RemainingCardCount').children[0].entity.getComponent(engine.UILabel),
                remainingCardCount: 26
            };
        }

        this.getPlayersInfoResultHandler = this.onGetPlayersInfoResult.bind(this);
        this.playerEnterHandler = this.onPlayerEnter.bind(this);
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerChangeBankerCardHandler = this.onPlayerChangeBankerCard.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    }

    private reset() {
        this.playerCompList.slice(1).forEach(playerComp => {
            this.hideAction(playerComp);
            playerComp.bankerCardSprite.entity.active = false;
            playerComp.remainingCardCountLabel.entity.transform2D.parent.entity.active = false;
            playerComp.remainingCardCount = 26;
        });
    }

    private onGetPlayersInfoResult({ player_list }) {
        player_list.forEach((info, seat) => {
            if (seat === databus.mySeat) return;
            const index = this.indexFromMe(seat);
            const playerComp = this.playerCompList[index];
            if (info) {
                this.showInfo(playerComp, info);
            } else {
                this.showDefault(playerComp);
            }
        });
    }

    private onPlayerEnter({ seat, info }) {
        const index = this.indexFromMe(seat);
        this.showInfo(this.playerCompList[index], info);
    }

    private onPlayerExit({ seat }) {
        const index = this.indexFromMe(seat);
        this.showDefault(this.playerCompList[index]);
        this.reset();
    }

    private onDeal({ banker_seat, banker_card }) {
        databus.bankerSeat = banker_seat;
        if (banker_seat === databus.mySeat) return;
        const index = this.indexFromMe(banker_seat);
        const playerComp = this.playerCompList[index];
        playerComp.bankerCardSprite.spriteFrame = databus.cardSpriteframes[banker_card];
        playerComp.bankerCardSprite.entity.active = true;
    }

    private onPlayerChangeBankerCard({ banker_card }) {
        const index = this.indexFromMe(databus.bankerSeat);
        const playerComp = this.playerCompList[index];
        playerComp.bankerCardSprite.spriteFrame = databus.cardSpriteframes[banker_card];
    }

    private onPlayerPlay(data) {
        if (data.from_seat !== databus.mySeat) {
            const playerComp = this.playerCompList[this.indexFromMe(data.from_seat)];
            this.hideAction(playerComp);
            const actionCards = data.action.cards;
            playerComp.passSprite.entity.active = data.action.cards.length === 0;
            if (actionCards.length > 0) {
                playerComp.remainingCardCount -= actionCards.length;
                if (playerComp.remainingCardCount <= 5) {
                    playerComp.remainingCardCountLabel.entity.transform2D.parent.entity.active = true;
                    playerComp.remainingCardCountLabel.text = playerComp.remainingCardCount.toString();
                }
                actionCards.forEach((card, i) => {
                    playerComp.actionSpriteList[i].spriteFrame = databus.cardSpriteframes[card];
                    playerComp.actionSpriteList[i].entity.active = true;
                });
            }
            if (data.next_seat !== databus.mySeat) {
                this.hideAction(this.playerCompList[this.indexFromMe(data.next_seat)]);
            }
        }
        if (data.scorer !== undefined) {
            wx.showToast({
                title: 'New Round',
                icon: 'none',
                duration: 1000
            });
            setTimeout(() => {
                this.playerCompList.slice(1).forEach(v => this.hideAction(v));
            }, 1000);
        }
    }

    private showInfo(playerComp: PlayerComp, { nickname, avatar_url }) {
        playerComp.nicknameLabel.text = nickname;
        urlToSpriteFrame(avatar_url).then((spriteFrame: engine.SpriteFrame) => {
            playerComp.avatarSprite.spriteFrame = spriteFrame;
            playerComp.defaultEntity.active = false;
            playerComp.nicknameLabel.entity.transform2D.parent.entity.active = true;
        });
    }

    private showDefault(playerComp: PlayerComp) {
        playerComp.defaultEntity.active = true;
        playerComp.nicknameLabel.entity.transform2D.parent.entity.active = false;
    }

    private indexFromMe(seat: number) {
        return (seat - databus.mySeat + 4) % 4;
    }

    private hideAction(playerComp: PlayerComp) {
        playerComp.actionSpriteList.forEach(v => v.entity.active = false);
        playerComp.passSprite.entity.active = false;
    }
}
