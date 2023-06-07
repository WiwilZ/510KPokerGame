"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.getChildByName = function (entity, name) {
        var childrenCount = entity.transform2D.childrenCount;
        var childList = entity.transform2D.children;
        for (var i = 0; i < childrenCount; i++) {
            var child = childList[i].entity;
            if (child.name === name) {
                return child;
            }
        }
        var result = null;
        for (var i = 0; i < childrenCount; i++) {
            var child = childList[i].entity;
            result = this.getChildByName(child, name);
        }
        return result;
    };
    Utils.clamp = function (value, min, max) {
        if (value < min)
            value = min;
        else if (value > max)
            value = max;
        return value;
    };
    Utils.clamp01 = function (value) {
        if (isNaN(value)) {
            value = 0;
        }
        else if (value > 1) {
            value = 1;
        }
        else if (value < 0) {
            value = 0;
        }
        return value;
    };
    return Utils;
}());
exports.default = Utils;
//# sourceMappingURL=Utils.js.map
