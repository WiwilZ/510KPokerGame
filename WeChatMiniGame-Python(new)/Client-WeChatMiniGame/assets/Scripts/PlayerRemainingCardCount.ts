import engine from "engine";
import { databus } from "./Databus";


@engine.decorators.serialize("PlayerRemainingCardCount")
export default class PlayerRemainingCardCount extends engine.Script {
    private sprite: engine.UISprite;
    private label: engine.UILabel;

    private seat: number;
    private count: number;

    private playerExitHandler;
    private playerPlayHandler;


    public onAwake() {
        this.init();

        engine.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.on('player_play', this.playerPlayHandler);

        this.reset();
    }

    public onDestroy() {
        engine.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    }

    private init() {
        const name = this.entity.transform2D.parent.entity.name;
        this.seat = (databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;

        this.sprite = this.entity.getComponent(engine.UISprite);
        this.label = this.entity.transform2D.children[0].entity.getComponent(engine.UILabel);

        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    }

    private reset() {
        this.sprite.visible = false;
        this.label.text = '';
        this.count = 26;
    }

    private onPlayerExit() {
        this.reset();
    }

    private onPlayerPlay({ action, from_seat }) {
        if (from_seat === this.seat) {
            this.count -= action.cards.length;
            if (this.count <= 5) {
                this.sprite.visible = true;
                this.label.text = this.count.toString();
            }
        }
    }
}
