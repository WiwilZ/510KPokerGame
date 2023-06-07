import engine from "engine";
import { databus } from "./Databus";
import MyHandCard from "./MyHandCard";
import { urlToSpriteFrame } from "./utils";


interface ActionModel {
    pattern: string,
    weight: number
}


/* bomb weight
负510K 0
正510K 1
0  3333 52
......
12 2222 64
0  33333 65
......
12 22222 25
card + 13 * count
*/


class CardHeap {
    public cardScriptList: MyHandCard[] = [];
    private cardCountList = Array(13).fill(0);
    private actionModel: ActionModel = null;

    public constructor() {

    }

    public get action() {
        return {
            model: this.actionModel,
            cards: this.sortedCardScriptList.map(scrit => scrit.cardIndex)
        };
    }


    public get sortedCardScriptList() {
        return this.cardScriptList.sort((a, b) => a.cardIndex - b.cardIndex);
    }

    public add(cardScript: MyHandCard) {
        this.cardScriptList.push(cardScript);
        this.cardCountList[cardScript.cardWeigt] += 1;
        this.actionModel = null;
        this.checkSingleRepeat() || this.checkSequence() || this.check510K();
    }

    public remove(cardScript: MyHandCard) {
        this.cardScriptList.splice(this.cardScriptList.indexOf(cardScript), 1);
        this.cardCountList[cardScript.cardWeigt] -= 1;
        this.actionModel = null;
        if (this.cardScriptList.length === 0) return;
        this.checkSingleRepeat() || this.checkSequence() || this.check510K();
    }

    public clear() {
        this.cardScriptList = [];
        this.cardCountList = Array(13).fill(0);
        this.actionModel = null;
    }

    public isGreaterThan(actionModel: ActionModel) {
        if (this.actionModel === null) return false;
        if (actionModel === null) return true;
        if (this.actionModel.pattern === actionModel.pattern) {
            return this.actionModel.weight > actionModel.weight;
        }
        return this.actionModel.pattern === 'bomb';
    }

    // single double triple non-510K bomb
    private checkSingleRepeat() {
        const weight = this.cardScriptList[0].cardWeigt;
        if (this.cardScriptList.every(v => v.cardWeigt === weight)) {
            const count = this.cardScriptList.length;
            if (count === 1) {
                this.actionModel = {
                    pattern: 'single',
                    weight
                };
            } else if (count === 2) {
                this.actionModel = {
                    pattern: 'double',
                    weight
                };
            } else if (count === 3) {
                this.actionModel = {
                    pattern: 'triple',
                    weight
                };
            } else {
                this.actionModel = {
                    pattern: 'bomb',
                    weight: weight + 13 * count
                };
            }
            return true;
        }
        return false;
    }

    // i_double i_triple
    private checkSequence() {
        // 不能含`2`
        if (this.cardCountList[12] > 0) return false;

        const firstCard = this.cardCountList.findIndex(v => v > 0);
        const count = this.cardCountList[firstCard];
        if (!(count === 2 || count === 3)) return false;

        const lastCard = (() => {
            for (let i = 11; i >= 0; i--) {
                if (this.cardCountList[i] > 0) {
                    return i;
                }
            }
        })();
        const seqLen = lastCard - firstCard + 1;
        if (seqLen < 2) return false;

        if (this.cardCountList.slice(firstCard + 1, lastCard + 1).every(v => v === count)) {
            this.actionModel = {
                pattern: `${seqLen}_${count === 2 ? 'double' : 'triple'}`,
                weight: firstCard
            };
            return true;
        }
        return false;
    }

    private check510K() {
        if (this.cardScriptList.length === 3 && this.cardCountList[2] === 1 && this.cardCountList[7] === 1 && this.cardCountList[10] === 1) {
            const suits = this.cardScriptList.map(v => v.cardSuit);
            this.actionModel = {
                pattern: '510K',
                weight: suits[0] === suits[1] && suits[1] === suits[2] ? 1 : 0
            };
            return true;
        }
        return false;
    }
}


@engine.decorators.serialize("Me")
export default class Me extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.UISprite
    })
    public avatarSprite: engine.UISprite;

    @engine.decorators.property({
        type: engine.TypeNames.UILabel
    })
    public nicknameLabel: engine.UILabel;

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

    @engine.decorators.property({
        type: engine.TypeNames.UILabel
    })
    public scoreLabel: engine.UILabel;


    private handCompList: {
        sprite: engine.UISprite,
        script: MyHandCard
    }[];
    private actionSpriteList: engine.UISprite[];

    private selectedActionCards = new CardHeap();
    private selectedBankerCard: MyHandCard = null;
    private lastActionModel: ActionModel = null;
    private myScore: number;
    private onClickHandler: (selected: boolean, script: MyHandCard) => void;

    private playerExitHandler;
    private dealHandler;
    private playerPlayHandler;

    public onAwake() {
        this.init();

        urlToSpriteFrame(databus.avatarUrl).then((spriteFrame: engine.SpriteFrame) => this.avatarSprite.spriteFrame = spriteFrame);
        this.nicknameLabel.text = databus.nickname;

        this.playTouchInput.onClick.add(this.play.bind(this));
        this.passTouchInput.onClick.add(this.pass.bind(this));
        this.changeTouchInput.onClick.add(this.change.bind(this));
        this.skipTouchInput.onClick.add(this.skip.bind(this));

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
        this.handCompList = this.myHandTrans.children.map(child => {
            return {
                sprite: child.entity.getComponent(engine.UISprite),
                script: child.entity.getComponent(engine.Script)
            }
        });
        this.actionSpriteList = this.myActionTrans.children.map(child => child.entity.getComponent(engine.UISprite));

        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    }

    private onPlayerExit() {
        this.reset();
    }

    private onDeal({ banker_seat, banker_card, can_change_banker_card, my_hand }) {
        this.handCompList.forEach(({ sprite, script }, i) => {
            script.cardIndex = my_hand[i];
            script.putBack();
            script.onClickCallback = selected => this.onClickHandler(selected, script);
            sprite.spriteFrame = databus.cardSpriteframes[script.cardIndex];
            sprite.entity.active = true;
        });
        if (banker_seat === databus.mySeat) {
            this.bankerCardSprite.spriteFrame = databus.cardSpriteframes[banker_card];
            this.bankerCardSprite.entity.active = true;
            if (can_change_banker_card) {
                this.onClickHandler = this.onSelectBankerCard;
                this.disableChange();
                this.showChangeButtonGroup();
            } else {
                this.onClickHandler = this.onSelectActionCards;
                this.disablePlay();
                this.playButton.entity.active = true;
            }
        } else {
            this.onClickHandler = this.onSelectActionCards;
            this.disablePlay();
        }
        this.scoreLabel.text = `score: ${this.myScore}`;
    }

    private onPlayerPlay(data) {
        if (data.scorer !== undefined) {
            this.lastActionModel = null;
            this.hideAction();
        } else if (data.action.model !== null) {
            this.lastActionModel = data.action.model;
        }
        if (data.scorer === databus.mySeat) {
            this.myScore += data.score;
            this.scoreLabel.text = `score: ${this.myScore}`;
        }
        if (data.next_seat === databus.mySeat) {
            this.playButton.entity.active = true;
            this.passButton.entity.active = data.scorer === undefined;
            this.hideAction();
        }
    }

    private onSelectActionCards(selected: boolean, script: MyHandCard) {
        if (selected) {
            this.selectedActionCards.add(script);
            console.log('add card', script.cardIndex);
        } else {
            this.selectedActionCards.remove(script);
            console.log('remove card', script.cardIndex);
        }
        if (this.selectedActionCards.isGreaterThan(this.lastActionModel)) {
            this.enablePlay();
        } else {
            this.disablePlay();
        }
    }

    private onSelectBankerCard(selected: boolean, script: MyHandCard) {
        if (selected) {
            this.selectedBankerCard?.putBack();
            this.selectedBankerCard = script;
            console.log('select banker card', script.cardIndex);
            this.enableChange();
        } else {
            this.selectedBankerCard = null;
            console.log('remove banker card');
            this.disableChange();
        }
    }

    private play() {
        console.log('play cards', this.selectedActionCards.action);
        engine.game.customEventEmitter.emit('play', {
            action: this.selectedActionCards.action
        }, () => {
            this.hideAction();
            this.selectedActionCards.sortedCardScriptList.forEach((script, i) => {
                script.entity.active = false;
                this.actionSpriteList[i].spriteFrame = databus.cardSpriteframes[script.cardIndex];
                this.actionSpriteList[i].entity.active = true;
            });
            this.selectedActionCards.clear();
            this.hidePlayButtonGroup();
        });
    }

    private pass() {
        console.log('play pass action');
        engine.game.customEventEmitter.emit('play', {
            action: {
                model: null,
                cards: []
            }
        }, () => {
            this.hideAction();
            this.passSprite.entity.active = true;
            this.selectedActionCards.cardScriptList.forEach(script => script.putBack());
            this.selectedActionCards.clear();
            this.hidePlayButtonGroup();
        });
    }

    private change() {
        console.log('change banker card', this.selectedBankerCard.cardIndex);
        engine.game.customEventEmitter.emit('change_banker_card', {
            banker_card: this.selectedBankerCard.cardIndex
        }, () => {
            this.bankerCardSprite.spriteFrame = databus.cardSpriteframes[this.selectedBankerCard.cardIndex];
            this.skip();
        });
    }

    private skip() {
        this.selectedBankerCard?.putBack();
        this.selectedBankerCard = null;
        this.hideChangeButtonGroup();
        this.playButton.entity.active = true;
        this.onClickHandler = this.onSelectActionCards;
    }


    private disablePlay() {
        this.playButton.disable = true;
        this.playTouchInput.active = false;
    }

    private enablePlay() {
        this.playButton.disable = false;
        this.playTouchInput.active = true;
    }

    private disableChange() {
        this.changeButton.disable = true;
        this.changeTouchInput.active = false;
    }

    private enableChange() {
        this.changeButton.disable = false;
        this.changeTouchInput.active = true;
    }

    private reset() {
        this.selectedActionCards.clear();
        this.selectedBankerCard = null;
        this.myScore = 0;
        this.scoreLabel.text = '';
        this.bankerCardSprite.entity.active = false;
        this.lastActionModel = null;
        this.hideAction();
        this.hideHand();
        this.hidePlayButtonGroup();
        this.hideChangeButtonGroup();
    }

    private hidePlayButtonGroup() {
        this.playButton.entity.active = false;
        this.passButton.entity.active = false;
    }

    private hideChangeButtonGroup() {
        this.changeButton.entity.active = false;
        this.skipButton.entity.active = false;
    }
    private showChangeButtonGroup() {
        this.changeButton.entity.active = true;
        this.skipButton.entity.active = true;
    }

    private hideHand() {
        this.handCompList.forEach(({ sprite }) => sprite.entity.active = false);
    }

    private hideAction() {
        this.actionSpriteList.forEach(sprite => sprite.entity.active = false);
        this.passSprite.entity.active = false;
    }
}
