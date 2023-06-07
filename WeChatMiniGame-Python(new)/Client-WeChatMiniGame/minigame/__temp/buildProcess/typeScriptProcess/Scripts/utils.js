"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedList = exports.CardHeap = exports.invite = exports.urlToSpriteFrame = void 0;
var engine_1 = require("engine");
var LRUCache = (function () {
    function LRUCache(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    LRUCache.prototype.get = function (key) {
        var val = this.cache.get(key);
        if (val === undefined)
            return;
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    };
    LRUCache.prototype.add = function (key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        else if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    };
    return LRUCache;
}());
var spriteFrameCache = new LRUCache(10);
function urlToSpriteFrame(url) {
    return new Promise(function (resolve, reject) {
        var spriteFrame = spriteFrameCache.get(url);
        if (spriteFrame) {
            return resolve(spriteFrame);
        }
        var img = new engine_1.default.Image();
        img.onerror = function (err) {
            console.error(err);
            reject();
        };
        img.onload = function () {
            var texture = new engine_1.default.Texture2D();
            if (texture.initWithImage(img)) {
                var spriteFrame_1 = engine_1.default.SpriteFrame.createFromTexture(texture);
                spriteFrameCache.add(url, spriteFrame_1);
                resolve(spriteFrame_1);
            }
            else {
                reject();
            }
        };
        img.src = url;
    });
}
exports.urlToSpriteFrame = urlToSpriteFrame;
function invite() {
    engine_1.default.canvas.toTempFilePath({
        destWidth: 500,
        destHeight: 400,
        success: function (res) {
        }
    });
}
exports.invite = invite;
var CardHeap = (function () {
    function CardHeap() {
        this.clear();
    }
    Object.defineProperty(CardHeap.prototype, "action", {
        get: function () {
            return {
                model: this.actionModel,
                cards: this.sortedCardScriptList.map(function (scrit) { return scrit.cardIndex; })
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardHeap.prototype, "cardList", {
        get: function () {
            return this.cardScriptList.map(function (scrit) { return scrit.cardIndex; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardHeap.prototype, "sortedCardScriptList", {
        get: function () {
            return this.cardScriptList.sort(function (a, b) { return a.cardIndex - b.cardIndex; });
        },
        enumerable: false,
        configurable: true
    });
    CardHeap.prototype.add = function (cardScript) {
        this.cardScriptList.push(cardScript);
        this.cardCountList[cardScript.cardWeigt] += 1;
        this.check();
    };
    CardHeap.prototype.remove = function (cardScript) {
        this.cardScriptList.splice(this.cardScriptList.indexOf(cardScript), 1);
        this.cardCountList[cardScript.cardWeigt] -= 1;
        this.check();
    };
    CardHeap.prototype.clear = function () {
        this.cardScriptList = [];
        this.cardCountList = Array(13).fill(0);
        this.actionModel = null;
    };
    CardHeap.prototype.greaterThan = function (actionModel) {
        if (this.actionModel === null)
            return false;
        if (actionModel === null)
            return true;
        if (this.actionModel.pattern === actionModel.pattern) {
            return this.actionModel.weight > actionModel.weight;
        }
        return this.actionModel.pattern === 'bomb';
    };
    CardHeap.prototype.check = function () {
        this.actionModel = null;
        if (this.cardScriptList.length === 0)
            return;
        this.checkSingleRepeat() || this.checkSequence() || this.check510K();
    };
    CardHeap.prototype.checkSingleRepeat = function () {
        var weight = this.cardScriptList[0].cardWeigt;
        if (this.cardScriptList.every(function (v) { return v.cardWeigt === weight; })) {
            var count = this.cardScriptList.length;
            switch (count) {
                case 1:
                    this.actionModel = {
                        pattern: 'single',
                        weight: weight
                    };
                    break;
                case 2:
                    this.actionModel = {
                        pattern: 'double',
                        weight: weight
                    };
                    break;
                case 3:
                    this.actionModel = {
                        pattern: 'triple',
                        weight: weight
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
    };
    CardHeap.prototype.checkSequence = function () {
        var _this = this;
        if (this.cardCountList[12] > 0)
            return false;
        var firstCard = this.cardCountList.findIndex(function (v) { return v > 0; });
        var count = this.cardCountList[firstCard];
        if (count !== 2 && count !== 3)
            return false;
        var lastCard = (function () {
            for (var i = 11; i >= 0; i--) {
                if (_this.cardCountList[i] > 0) {
                    return i;
                }
            }
        })();
        var seqLen = lastCard - firstCard + 1;
        if (seqLen < 2)
            return false;
        if (this.cardCountList.slice(firstCard + 1, lastCard + 1).every(function (v) { return v === count; })) {
            this.actionModel = {
                pattern: seqLen + "_" + (count === 2 ? 'double' : 'triple'),
                weight: firstCard
            };
            return true;
        }
        return false;
    };
    CardHeap.prototype.check510K = function () {
        if (this.cardScriptList.length === 3 && this.cardCountList[2] === 1 && this.cardCountList[7] === 1 && this.cardCountList[10] === 1) {
            var _a = this.cardScriptList.map(function (v) { return v.cardSuit; }), a = _a[0], b = _a[1], c = _a[2];
            this.actionModel = {
                pattern: 'bomb',
                weight: a === b && b === c ? 1 : 0
            };
            return true;
        }
        return false;
    };
    return CardHeap;
}());
exports.CardHeap = CardHeap;
var SortedList = (function () {
    function SortedList(key) {
        if (key === void 0) { key = function (a) { return a; }; }
        this.key = key;
        this.list = [];
    }
    Object.defineProperty(SortedList.prototype, "array", {
        get: function () {
            return this.list;
        },
        enumerable: false,
        configurable: true
    });
    SortedList.prototype.get = function (i) {
        if (i < 0) {
            i += this.list.length;
        }
        return this.list[i];
    };
    SortedList.prototype.add = function (elem) {
        var idx = this.searchGreaterEqual(elem);
        this.list.splice(idx, 0, elem);
    };
    SortedList.prototype.remove = function (elem) {
        var idx = this.searchGreaterEqual(elem);
        if (this.list[idx] === elem) {
            this.list.splice(idx, 1);
        }
    };
    SortedList.prototype.clear = function () {
        this.list = [];
    };
    SortedList.prototype.contains = function (elem) {
        var idx = this.searchGreaterEqual(elem);
        return this.list[idx] === elem;
    };
    SortedList.prototype.searchGreaterEqual = function (target) {
        var left = 0;
        var right = this.list.length;
        while (left < right) {
            var mid = (left + right) >> 1;
            var midVal = this.key(this.list[mid]);
            var targetVal = this.key(target);
            if (midVal === targetVal)
                return mid;
            if (midVal > targetVal) {
                right = mid;
            }
            else {
                left = mid + 1;
            }
        }
        return left;
    };
    return SortedList;
}());
exports.SortedList = SortedList;
//# sourceMappingURL=utils.js.map
