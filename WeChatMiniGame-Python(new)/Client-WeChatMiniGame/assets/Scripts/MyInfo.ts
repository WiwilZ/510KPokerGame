import engine from "engine";
import { databus } from "./Databus";


@engine.decorators.serialize("MyInfo")
export default class MyInfo extends engine.Script {
    public onAwake() {
        const { avatar, nickname } = databus.playerInfoList[databus.mySeat];
        this.entity.transform2D.findChildByName('CircleMask').children[0].entity.getComponent<engine.UISprite>(engine.UISprite).spriteFrame = avatar;
        this.entity.transform2D.findChildByName('Nickname').entity.getComponent<engine.UILabel>(engine.UILabel).text = nickname;
    }
}
