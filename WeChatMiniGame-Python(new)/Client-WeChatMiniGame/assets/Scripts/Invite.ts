import engine from "engine";
import { invite } from "./utils";


@engine.decorators.serialize("Invite")
export default class Invite extends engine.Script {
    public onClick() {
        invite();
    }
}
