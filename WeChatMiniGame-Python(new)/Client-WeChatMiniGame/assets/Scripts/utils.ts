import engine from "engine";
import { databus } from "./Databus";
import MyHandCard from "./MyHandCard";


class LRUCache<K, V> {
    private cache: Map<K, V>;

    public constructor(private capacity: number) {
        this.cache = new Map();
    }

    public get(key: K): V | undefined {
        const val = this.cache.get(key);
        if (val === undefined) return;

        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }

    public add(key: K, value: V): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }
}

const spriteFrameCache = new LRUCache<string, engine.SpriteFrame>(10);


export function urlToSpriteFrame(url: string) {
    return new Promise<engine.SpriteFrame>((resolve, reject) => {
        const spriteFrame = spriteFrameCache.get(url);
        if (spriteFrame) {
            return resolve(spriteFrame);
        }
        const img = new engine.Image();
        img.onerror = err => {
            console.error(err);
            reject();
        };
        img.onload = () => {
            const texture = new engine.Texture2D();
            if (texture.initWithImage(img)) {
                const spriteFrame = engine.SpriteFrame.createFromTexture(texture);
                spriteFrameCache.add(url, spriteFrame);
                resolve(spriteFrame);
            } else {
                reject();
            }
        }
        img.src = url;
    });
}


export function invite() {
    engine.canvas.toTempFilePath({
        destWidth: 500,
        destHeight: 400,
        success: res => {
            // wx.shareAppMessage({
            //     title: '5 10 K',
            //     query: `roomNo=${databus.roomNo}`,
            //     imageUrl: res.tempFilePath
            // });
        }
    });
}


export interface ActionModel {
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


export class CardHeap {
    public cardScriptList: MyHandCard[];
    private cardCountList: number[];
    private actionModel: ActionModel; //null -> None or invalid

    public constructor() {
        this.clear();
    }

    public get action() {
        return {
            model: this.actionModel,
            cards: this.sortedCardScriptList.map(scrit => scrit.cardIndex)
        };
    }

    public get cardList() {
        return this.cardScriptList.map(scrit => scrit.cardIndex);
    }

    public get sortedCardScriptList() {
        return this.cardScriptList.sort((a, b) => a.cardIndex - b.cardIndex);
    }

    public add(cardScript: MyHandCard) {
        this.cardScriptList.push(cardScript);
        this.cardCountList[cardScript.cardWeigt] += 1;
        this.check();
    }

    public remove(cardScript: MyHandCard) {
        this.cardScriptList.splice(this.cardScriptList.indexOf(cardScript), 1);
        this.cardCountList[cardScript.cardWeigt] -= 1;
        this.check();
    }

    public clear() {
        this.cardScriptList = [];
        this.cardCountList = Array(13).fill(0);
        this.actionModel = null;
    }

    public greaterThan(actionModel: ActionModel) {
        if (this.actionModel === null) return false;
        if (actionModel === null) return true;
        if (this.actionModel.pattern === actionModel.pattern) {
            return this.actionModel.weight > actionModel.weight;
        }
        return this.actionModel.pattern === 'bomb';
    }

    private check() {
        this.actionModel = null;
        if (this.cardScriptList.length === 0) return;
        this.checkSingleRepeat() || this.checkSequence() || this.check510K();
    }

    // single double triple non-510K bomb
    private checkSingleRepeat() {
        const weight = this.cardScriptList[0].cardWeigt;
        if (this.cardScriptList.every(v => v.cardWeigt === weight)) {
            const count = this.cardScriptList.length;
            switch (count) {
                case 1:
                    this.actionModel = {
                        pattern: 'single',
                        weight
                    };
                    break;
                case 2:
                    this.actionModel = {
                        pattern: 'double',
                        weight
                    };
                    break;
                case 3:
                    this.actionModel = {
                        pattern: 'triple',
                        weight
                    };
                    break;
                default:
                    this.actionModel = {
                        pattern: 'bomb',
                        weight: weight + 13 * count
                    };
                    break;
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
        if (count !== 2 && count !== 3) return false;

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
            const [a, b, c] = this.cardScriptList.map(v => v.cardSuit);
            this.actionModel = {
                pattern: 'bomb',
                weight: a === b && b === c ? 1 : 0
            };
            return true;
        }
        return false;
    }
}



export class SortedList<V> {
    private list: V[] = [];

    public constructor(private key: (arg: V) => any = a => a) {

    }
    public get array() {
        return this.list;
    }

    public get(i: number) {
        if (i < 0) {
            i += this.list.length;
        }
        return this.list[i];
    }


    public add(elem: V) {
        const idx = this.searchGreaterEqual(elem);
        this.list.splice(idx, 0, elem);
    }

    public remove(elem: V) {
        const idx = this.searchGreaterEqual(elem);
        if (this.list[idx] === elem) {
            this.list.splice(idx, 1);
        }
    }

    public clear() {
        this.list = [];
    }

    public contains(elem: V) {
        const idx = this.searchGreaterEqual(elem);
        return this.list[idx] === elem;
    }

    private searchGreaterEqual(target: V): number {
        let left = 0;
        let right = this.list.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            const midVal = this.key(this.list[mid]);
            const targetVal = this.key(target);
            if (midVal === targetVal) return mid;
            if (midVal > targetVal) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }

}

