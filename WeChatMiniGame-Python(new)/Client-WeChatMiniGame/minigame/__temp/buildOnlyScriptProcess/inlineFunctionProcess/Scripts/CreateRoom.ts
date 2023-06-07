import engine from "engine";


@engine.decorators.serialize("CreateRoom")
export default class CreateRoom extends engine.Script {
    
    public onAwake() {
        (this.getComponent(engine.TouchInputComponent) as engine.TouchInputComponent).onClick.add(() => {
            engine.game.customEventEmitter.emit('create_room');
        });
    }
}
