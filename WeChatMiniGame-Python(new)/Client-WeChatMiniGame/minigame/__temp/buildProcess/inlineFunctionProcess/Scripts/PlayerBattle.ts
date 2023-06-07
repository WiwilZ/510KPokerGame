import engine from "engine";
import { databus } from "./Databus";


@engine.decorators.serialize("PlayerBattle")
export default class PlayerBattle extends engine.Script {
    private seat: number;

    private actionSpriteList: engine.UISprite[];
    private passEntity: engine.Entity;
    private clockEntity: engine.Entity;

    private playerExitHandler;
    private dealHandler;
    private playerPlayHandler;


    public onAwake() {
        this.init();

        engine.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.on('deal', this.dealHandler);
        engine.game.customEventEmitter.on('player_play', this.playerPlayHandler);

        this.reset();
    }

    public onDestroy() {
        engine.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    }

    private init() {
        const name = this.entity.name;
        this.seat = (databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;

        this.actionSpriteList = this.entity.transform2D.findChildByName('ActionCards').children.map(v => v.entity.getComponent(engine.UISprite));
        this.passEntity = this.entity.transform2D.findChildByName('Pass').entity;
        this.clockEntity = this.entity.transform2D.findChildByName('Clock').entity;

        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    }

    private reset() {
        this.hideAction();
        this.clockEntity.active = false;
    }

    private onPlayerExit() {
        this.reset();
    }

    private onDeal({ banker_seat }) {
        if (banker_seat === this.seat) {
            this.clockEntity.active = true;
        }
    }

    private onPlayerPlay({ action, from_seat, next_seat, scorer }) {
        if (from_seat === this.seat) {
            this.reset();
            const actionCards = action.cards;
            if (actionCards.length === 0) {
                this.passEntity.active = true;
            } else {
                actionCards.forEach((card, i) => {
                    this.actionSpriteList[i].spriteFrame = databus.cardSpriteFrames[card];
                    this.actionSpriteList[i].entity.active = true;
                });
            }
        }

        if (scorer !== undefined) {
            setTimeout(() => {
                this.hideAction();
                this.clockEntity.active = next_seat === this.seat;
            }, 1000);
            return;
        }

        if (next_seat === this.seat) {
            this.hideAction();
            this.clockEntity.active = true;
        }
    }

    private hideAction() {
        this.actionSpriteList.forEach(v => v.entity.active = false);
        this.passEntity.active = false;
    }
}
