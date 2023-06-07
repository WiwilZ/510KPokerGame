import engine from "engine";


@engine.decorators.serialize("ExitRoom")
export default class ExitRoom extends engine.Script {
    public onClick() {
        wx.showModal({
            title: '提示',
            content: '确定退出房间吗？',
            success: res => {
                res.confirm && engine.game.customEventEmitter.emit('exit_room');
            }
        });
    }
}
