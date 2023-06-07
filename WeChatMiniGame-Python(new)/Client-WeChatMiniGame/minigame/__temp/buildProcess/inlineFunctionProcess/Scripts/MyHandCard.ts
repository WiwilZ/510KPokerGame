import engine from "engine";


@engine.decorators.serialize("MyHandCard")
export default class MyHandCard extends engine.Script {
    private selected;
    private button: engine.UIButton;

    public cardIndex: number;
    public onClickCallback: (selected: boolean) => void = null;

    public onAwake() {
        this.button = this.getComponent(engine.UIButton);
    }

    public onTouchUp() {
        if (!this.selected) {
            this.entity.transform2D.positionY += 60;
        } else {
            this.entity.transform2D.positionY -= 60;
        }
        this.selected = !this.selected;
        this.onClickCallback && this.onClickCallback(this.selected);
        this.button.state = engine.UIButton.State.Normal;
    }

    public onTouchMove() {
        this.button.state = engine.UIButton.State.Pressed;
    }

    public onTouchOver() {
        this.button.state = engine.UIButton.State.Pressed;
    }

    public putBack() {
        if (this.selected) {
            this.entity.transform2D.positionY -= 60;
            this.selected = false;
        }
    }

    public get cardWeigt() {
        return this.cardIndex >> 2;
    }

    public get cardSuit() {
        return this.cardIndex & 3;
    }
}
