import engine from "engine";
import { databus } from "./Databus";


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
    return new Promise((resolve, reject) => {
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

