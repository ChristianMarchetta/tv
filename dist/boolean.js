"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolean = void 0;
var base_1 = require("./base");
var isInt = function (v) {
    return !isNaN(v) && v === Math.floor(v);
};
var boolean = function () {
    var validator = [[base_1.filter(base_1.simpleTypeFilter("boolean"), "boolean")]];
    var composeOn = function (output, o) {
        base_1.push(validator, o);
        return output;
    };
    var m = {
        validator: validator,
        //Filters  
        true: function () { return composeOn(m, base_1.equals(true)); },
        false: function () { return composeOn(m, base_1.equals(false)); },
        //Mappings
        not: function () { return composeOn(m, base_1.map(function (v) { return !v; })); }
    };
    return m;
};
exports.boolean = boolean;
//# sourceMappingURL=boolean.js.map