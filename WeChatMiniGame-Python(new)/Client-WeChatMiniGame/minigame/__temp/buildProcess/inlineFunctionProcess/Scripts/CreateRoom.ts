import engine from "engine";


@engine.decorators.serialize("CreateRoom")
export default class CreateRoom extends engine.Script {
    public onClick() {
        engine.game.customEventEmitter.emit('create_room');
    }
}
