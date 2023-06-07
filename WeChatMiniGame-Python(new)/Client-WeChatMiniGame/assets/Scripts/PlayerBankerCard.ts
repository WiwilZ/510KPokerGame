import engine from "engine";
import { databus } from "./Databus";


@engine.decorators.serialize("PlayerBankerCard")
export default class PlayerBankerCard extends engine.Script {
    private sprite: engine.UISprite;

    private seat: number;

    private playerExitHandler;
    private dealHandler;
    private playerChangeBankerCardHandler;
    private playerPlayHandler;


    public onAwake() {
        this.init();

        engine.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.on('deal', this.dealHandler);
        engine.game.customEventEmitter.on('player_change_banker_card', this.playerChangeBankerCardHandler);

        this.reset();
    }

    public onDestroy() {
        engine.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine.game.customEventEmitter.removeListener('player_change_banker_card', this.playerChangeBankerCardHandler);
        engine.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    }

    private init() {
        const name = this.entity.transform2D.parent.entity.name;
        this.seat = (databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;

        this.sprite = this.entity.getComponent(engine.UISprite);

        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerChangeBankerCardHandler = this.onPlayerChangeBankerCard.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    }

    private reset() {
        this.sprite.visible = false;
    }

    private onPlayerExit() {
        this.reset();
    }

    private onDeal({ banker_seat, banker_card }) {
        if (banker_seat === this.seat) {
            this.sprite.spriteFrame = databus.cardSpriteFrames[banker_card];
            this.sprite.visible = true;
            engine.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
        } else {
            engine.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        }
    }

    private onPlayerChangeBankerCard({ banker_card }) {
        databus.bankerCard = banker_card;
        if (this.sprite.visible) {
            this.sprite.spriteFrame = databus.cardSpriteFrames[banker_card];
        }
    }

    private onPlayerPlay({ action, from_seat }) {
        if (from_seat === this.seat && action.cards.includes(databus.bankerCard)) {
            this.sprite.spriteFrame = databus.cardSpriteFrames[databus.bankerCard];
            this.sprite.visible = true;
            engine.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
        }
    }
}
