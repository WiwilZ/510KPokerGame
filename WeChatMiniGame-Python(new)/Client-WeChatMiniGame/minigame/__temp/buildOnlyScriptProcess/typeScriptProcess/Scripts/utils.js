"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedList = exports.invite = exports.urlToSpriteFrame = void 0;
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
