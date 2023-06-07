import engine from "engine";
import { databus } from "./Databus";
import MyHandCard from "./MyHandCard";
import { ActionModel, CardHeap } from "./utils";



@engine.decorators.serialize("MyBattle")
export default class MyBattle extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.UISprite
    })
    public bankerCardSprite: engine.UISprite;

    @engine.decorators.property({
        type: engine.TypeNames.UIButton
    })
    public playButton: engine.UIButton;
    @engine.decorators.property({
        type: engine.TypeNames.TouchInput
    })
    public playTouchInput: engine.TouchInputComponent;

    @engine.decorators.property({
        type: engine.TypeNames.UIButton
    })
    public passButton: engine.UIButton;
    @engine.decorators.property({
        type: engine.TypeNames.TouchInput
    })
    public passTouchInput: engine.TouchInputComponent;

    @engine.decorators.property({
        type: engine.TypeNames.UIButton
    })
    public changeButton: engine.UIButton;
    @engine.decorators.property({
        type: engine.TypeNames.TouchInput
    })
    public changeTouchInput: engine.TouchInputComponent;

    @engine.decorators.property({
        type: engine.TypeNames.UIButton
    })
    public skipButton: engine.UIButton;
    @engine.decorators.property({
        type: engine.TypeNames.TouchInput
    })
    public skipTouchInput: engine.TouchInputComponent;

    @engine.decorators.property({
        type: engine.TypeNames.Transform2D
    })
    public myHandTrans: engine.Transform2D;

    @engine.decorators.property({
        type: engine.TypeNames.Transform2D
    })
    public myActionTrans: engine.Transform2D;

    @engine.decorators.property({
        type: engine.TypeNames.UISprite
    })
    public passSprite: engine.UISprite;


    private handCompList: {
        sprite: engine.UISprite,
        script: MyHandCard
    }[];
    private actionSpriteList: engine.UISprite[];

    private selectedActionCards = new CardHeap();
    private selectedBankerCard: MyHandCard;
    private lastActionModel: ActionModel;

    private onClickHandCard: (selected: boolean, script: MyHandCard) => void;

    private playerExitHandler;
    private dealHandler;
    private playerPlayHandler;


    public onAwake() {
        this.init();

        this.changeTouchInput.onClick.add(this.change.bind(this));
        this.skipTouchInput.onClick.add(this.skip.bind(this));
        this.playTouchInput.onClick.add(this.play.bind(this));
        this.passTouchInput.onClick.add(this.pass.bind(this));

        engine.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.on('deal', this.dealHandler);
        engine.game.customEventEmitter.on('player_play', this.playerPlayHandler);

        this.reset();
    }

    public onDestroy() {
        engine.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    }

    private init() {
        this.handCompList = this.myHandTrans.children.map(v => {
            const script = v.entity.getComponent<MyHandCard>(engine.Script);
            script.onClickCallback = selected => this.onClickHandCard(selected, script);
            return {
                sprite: v.entity.getComponent(engine.UISprite),
                script
            };
        });
        this.actionSpriteList = this.myActionTrans.children.map(v => v.entity.getComponent(engine.UISprite));

        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    }

    private reset() {
        this.bankerCardSprite.visible = false;

        this.selectedActionCards.clear();
        this.selectedBankerCard = null;
        this.lastActionModel = null;

        this.hideHand();
        this.hideAction();

        this.hideChangeSkip();
        this.disableChange();

        this.hidePlayPass();
        this.disablePlay();
    }

    private onPlayerExit() {
        this.reset();
    }

    private onDeal({ banker_seat, banker_card, my_hand }) {
        databus.bankerCard = banker_card;
        this.handCompList.forEach(({ sprite, script }, i) => {
            script.cardIndex = my_hand[i];
            sprite.spriteFrame = databus.cardSpriteFrames[script.cardIndex];
            sprite.entity.active = true;
        });

        if (banker_seat === databus.mySeat) {
            this.bankerCardSprite.spriteFrame = databus.cardSpriteFrames[banker_card];
            this.bankerCardSprite.visible = true;

            this.changeButton.entity.active = true;
            this.skipButton.entity.active = true;
            this.onClickHandCard = this.onSelectBankerCard;
        } else {
            this.onClickHandCard = this.onSelectActionCards;
        }
    }

    private onPlayerPlay({ action, next_seat, scorer }) {
        if (scorer !== undefined) {
            this.lastActionModel = null;
            this.checkPlay();

            wx.showToast({
                title: 'New Round',
                icon: 'none',
                duration: 1000,
                mask: true
            });
            setTimeout(() => {
                this.hideAction();
                this.playButton.entity.active = next_seat === databus.mySeat;
            }, 1000);
            return;
        }

        if (action.model !== null) {
            this.lastActionModel = action.model;
            this.checkPlay();
        }

        if (next_seat === databus.mySeat) {
            this.hideAction();
            this.playButton.entity.active = true;
            this.passButton.entity.active = true;
        }
    }

    private onSelectBankerCard(selected: boolean, script: MyHandCard) {
        if (selected) {
            this.selectedBankerCard?.putBack();
            this.selectedBankerCard = script;
            this.enableChange();
        } else {
            this.selectedBankerCard = null;
            this.disableChange();
        }
    }

    private onSelectActionCards(selected: boolean, script: MyHandCard) {
        if (selected) {
            this.selectedActionCards.add(script);
        } else {
            this.selectedActionCards.remove(script);
        }
        this.checkPlay();
    }

    private change() {
        engine.game.customEventEmitter.emit('change_banker_card', {
            banker_card: this.selectedBankerCard.cardIndex
        }, () => {
            this.bankerCardSprite.spriteFrame = databus.cardSpriteFrames[this.selectedBankerCard.cardIndex];
            this.skip();
        });
    }

    private skip() {
        this.selectedBankerCard?.putBack();
        this.selectedBankerCard = null;
        this.hideChangeSkip();
        this.playButton.entity.active = true;
        this.onClickHandCard = this.onSelectActionCards;
    }

    private play() {
        engine.game.customEventEmitter.emit('play', {
            action: this.selectedActionCards.action
        }, () => {
            this.selectedActionCards.sortedCardScriptList.forEach((script, i) => {
                script.entity.active = false;
                this.actionSpriteList[i].spriteFrame = databus.cardSpriteFrames[script.cardIndex];
                this.actionSpriteList[i].entity.active = true;
            });

            if (!this.bankerCardSprite.visible && this.selectedActionCards.cardList.includes(databus.bankerCard)) {
                this.bankerCardSprite.spriteFrame = databus.cardSpriteFrames[databus.bankerCard];
                this.bankerCardSprite.visible = true;
            }

            this.selectedActionCards.clear();
            this.hidePlayPass();
        });
    }

    private pass() {
        engine.game.customEventEmitter.emit('play', {
            action: {
                model: null,
                cards: []
            }
        }, () => {
            this.selectedActionCards.cardScriptList.forEach(v => v.putBack());
            this.passSprite.visible = true;
            this.selectedActionCards.clear();
            this.hidePlayPass();
        });
    }

    private checkPlay() {
        if (this.selectedActionCards.greaterThan(this.lastActionModel)) {
            this.enablePlay();
        } else {
            this.disablePlay();
        }
    }

    private disableChange() {
        this.changeButton.disable = true;
        this.changeTouchInput.active = false;
    }

    private enableChange() {
        this.changeButton.disable = false;
        this.changeTouchInput.active = true;
    }

    private disablePlay() {
        this.playButton.disable = true;
        this.playTouchInput.active = false;
    }

    private enablePlay() {
        this.playButton.disable = false;
        this.playTouchInput.active = true;
    }

    private hideChangeSkip() {
        this.changeButton.entity.active = false;
        this.skipButton.entity.active = false;
    }

    private hidePlayPass() {
        this.playButton.entity.active = false;
        this.passButton.entity.active = false;
    }

    private hideHand() {
        this.handCompList.forEach(({ sprite, script }) => {
            sprite.entity.active = false;
            script.putBack();
        });
    }

    private hideAction() {
        this.actionSpriteList.forEach(sprite => sprite.entity.active = false);
        this.passSprite.visible = false;
    }
}
