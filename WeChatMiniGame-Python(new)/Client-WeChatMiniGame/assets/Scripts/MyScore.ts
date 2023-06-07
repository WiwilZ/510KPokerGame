import engine from "engine";
import { databus } from "./Databus";


@engine.decorators.serialize("MyScore")
export default class MyScore extends engine.Script {
    private label: engine.UILabel;

    private myScore: number;

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
        this.label = this.entity.getComponent(engine.UILabel);

        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    }

    private reset() {
        this.myScore = 0;
        this.label.text = '';
    }

    private onPlayerExit() {
        this.reset();
    }

    private onDeal() {
        this.showScore();
    }

    private onPlayerPlay({ scorer, score }) {
        if (scorer === databus.mySeat) {
            this.myScore += score;
            this.showScore();
        }
    }

    private showScore() {
        this.label.text = `score: ${this.myScore}`;
    }
}
