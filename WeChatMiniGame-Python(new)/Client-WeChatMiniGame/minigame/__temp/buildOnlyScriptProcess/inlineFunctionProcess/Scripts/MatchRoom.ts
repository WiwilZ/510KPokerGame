import engine from "engine";


@engine.decorators.serialize("MatchRoom")
export default class MatchRoom extends engine.Script {

    public onAwake() {
        (this.getComponent(engine.TouchInputComponent) as engine.TouchInputComponent).onClick.add(() => {
            engine.game.customEventEmitter.emit('match_room');
        });
    }
}
