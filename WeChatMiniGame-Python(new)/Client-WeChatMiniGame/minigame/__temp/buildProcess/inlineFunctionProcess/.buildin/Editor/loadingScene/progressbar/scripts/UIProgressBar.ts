import engine from 'engine'
import Utils from '../../common/Utils'

const TypeNames = engine.TypeNames

@engine.decorators.serialize('UIKitProgressBar')
export default class UIKitProgressBar extends engine.Script {
  private _min: number = 0;
  private _max: number = 100;
  private _value: number = 50;
  private _dirty = true;

  private _barMaxWidth: number = 0;
  private _barMaxWidthDelta: number = 0;
  private _bar: any = null;
  private _uiWidget: engine.UIWidget;

  @engine.decorators.property({
    type: TypeNames.Number,
  })
  public get min(): number {
    return this._min;
  }
  public set min(value: number) {
    if (this._min != value) {
      this._min = value;
      this._dirty = true;
    }
  }

  @engine.decorators.property({
    type: TypeNames.Number,
  })
  public get max(): number {
    return this._max;
  }
  public set max(value: number) {
    if (this._max != value) {
      this._max = value;
      this._dirty = true;
    }
  }

  @engine.decorators.property({
    type: TypeNames.Number,
  })
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    if (this._value != value) {
      this._value = value;
      this._dirty = true;
    }
  }

  public onAwake() {
    this._bar = Utils.getChildByName(this.entity, 'Progress_Bar')
    if (this._bar.transform2D.isRectTransform) {
      // isRectTransform 不添加uiwidget
    } else {
      let uiWidget = this._bar.getComponent(engine.UIWidget)
      if (!uiWidget) {
        uiWidget = this._bar.addComponent(engine.UIWidget)
        uiWidget.leftAnchor = 0
        uiWidget.topAnchor = 1
        uiWidget.rightAnchor = 1
        uiWidget.bottomAnchor = 0
      }
      this._uiWidget = uiWidget;
    }

    const barObjectHTransform = this._bar.transform2D;
    this._barMaxWidth = barObjectHTransform.sizeX;
    this._barMaxWidthDelta = this.entity.transform2D.sizeX - this._barMaxWidth;
    if (this._dirty) {
      this.update();
    }
  }

  public onUpdate() {
    if (this._dirty) {
      this.update();
    }
  }

  public update(): void {
    this.updateWithPercent((this._value - this._min) / (this._max - this._min));
  }

  private updateWithPercent(percent: number): void {
    this._dirty = false;
    percent = Utils.clamp01(percent)
    const bar = this._bar
    const fullWidth: number = this.entity.transform2D.sizeX - this._barMaxWidthDelta;
    if (bar.transform2D.isRectTransform) {
      bar.transform2D.rightOffset = -Math.round(fullWidth * (1 - percent));
    } else {
      if (this._uiWidget) {
        this._uiWidget.rightOffset = -Math.round(fullWidth * (1 - percent));
      }
    }
  }
}