import engine from "engine";


@engine.decorators.serialize("ExitRoom")
export default class ExitRoom extends engine.Script {

    public onAwake() {
        (this.getComponent(engine.TouchInputComponent) as engine.TouchInputComponent).onClick.add(() => {
            wx.showModal({
                title: '提示',
                content: '确定退出房间吗？',
                success(res) {
                    if (res.confirm) {
                        engine.game.customEventEmitter.emit('exit_room');
                    }
                }
            });
        })
    }
}
