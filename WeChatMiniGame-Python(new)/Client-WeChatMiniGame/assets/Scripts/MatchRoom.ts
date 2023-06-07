import engine from "engine";


@engine.decorators.serialize("MatchRoom")
export default class MatchRoom extends engine.Script {
    public onClick() {
        engine.game.customEventEmitter.emit('match_room');
    }
}
