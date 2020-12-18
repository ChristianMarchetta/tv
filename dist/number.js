"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = void 0;
var base_1 = require("./base");
var isInt = function (v) {
    return !isNaN(v) && v === Math.floor(v);
};
var number = function () {
    var validator = [[base_1.filter(base_1.simpleTypeFilter("number"), "number")]];
    var composeOn = function (output, o) {
        base_1.push(validator, o);
        return output;
    };
    var m = {
        validator: validator,
        //Filters  
        min: function (n) { return composeOn(m, base_1.filter(function (v) { return v >= n; }, "Min")); },
        max: function (n) { return composeOn(m, base_1.filter(function (v) { return v <= n; }, "Max")); },
        integer: function () { return composeOn(m, base_1.filter(isInt)); },
        float: function () { return composeOn(m, base_1.filter(function (v) { return !isInt(v); })); },
        positive: function () { return composeOn(m, base_1.filter(function (v) { return v > 0; })); },
        natural: function () { return composeOn(m, base_1.filter(function (v) { return v >= 0; })); },
        negative: function () { return composeOn(m, base_1.filter(function (v) { return v < 0; })); },
        negative0: function () { return composeOn(m, base_1.filter(function (v) { return v <= 0; })); },
        //Mappings
        add: function (n) { return composeOn(m, base_1.map(function (v) { return v + n; })); },
        sub: function (n) { return composeOn(m, base_1.map(function (v) { return v - n; })); },
        times: function (n) { return composeOn(m, base_1.map(function (v) { return v * n; })); },
        divideby: function (n) { return composeOn(m, base_1.map(function (v) { return v / n; })); },
        divides: function (n) { return composeOn(m, base_1.map(function (v) { return n / v; })); },
        mod: function (n) { return composeOn(m, base_1.map(function (v) { return v % n; })); },
        //reverse of mod
        dom: function (n) { return composeOn(m, base_1.map(function (v) { return n % v; })); },
        atan2: function (x) { return composeOn(m, base_1.map(function (y) { return Math.atan2(y, x); })); },
        nata2: function (y) { return composeOn(m, base_1.map(function (x) { return Math.atan2(y, x); })); },
        hypot: function () {
            var ns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                ns[_i] = arguments[_i];
            }
            return composeOn(m, base_1.map(function (v) { return Math.hypot.apply(Math, __spreadArrays([v], ns)); }));
        },
        imul: function (n) { return composeOn(m, base_1.map(function (v) { return Math.imul(v, n); })); },
        upperBound: function (n) { return composeOn(m, base_1.map(function (v) { return v > n ? n : v; })); },
        lowerBound: function (n) { return composeOn(m, base_1.map(function (v) { return v < n ? n : v; })); },
        pow: function (exp) { return composeOn(m, base_1.map(function (base) { return Math.pow(base, exp); })); },
        //the reverse of pow
        wop: function (base) { return composeOn(m, base_1.map(function (exp) { return Math.pow(base, exp); })); },
        abs: function () { return composeOn(m, base_1.map(Math.abs)); },
        acos: function () { return composeOn(m, base_1.map(Math.acos)); },
        acosh: function () { return composeOn(m, base_1.map(Math.acosh)); },
        asin: function () { return composeOn(m, base_1.map(Math.asin)); },
        asinh: function () { return composeOn(m, base_1.map(Math.asinh)); },
        atan: function () { return composeOn(m, base_1.map(Math.atan)); },
        atanh: function () { return composeOn(m, base_1.map(Math.atanh)); },
        cbrt: function () { return composeOn(m, base_1.map(Math.cbrt)); },
        ceil: function () { return composeOn(m, base_1.map(Math.ceil)); },
        clz32: function () { return composeOn(m, base_1.map(Math.clz32)); },
        cos: function () { return composeOn(m, base_1.map(Math.cos)); },
        cosh: function () { return composeOn(m, base_1.map(Math.cosh)); },
        exp: function () { return composeOn(m, base_1.map(Math.exp)); },
        expm1: function () { return composeOn(m, base_1.map(Math.expm1)); },
        floor: function () { return composeOn(m, base_1.map(Math.floor)); },
        fround: function () { return composeOn(m, base_1.map(Math.fround)); },
        log: function () { return composeOn(m, base_1.map(Math.log)); },
        log1p: function () { return composeOn(m, base_1.map(Math.log1p)); },
        log10: function () { return composeOn(m, base_1.map(Math.log10)); },
        log2: function () { return composeOn(m, base_1.map(Math.log2)); },
        round: function () { return composeOn(m, base_1.map(Math.round)); },
        sign: function () { return composeOn(m, base_1.map(Math.sign)); },
        sin: function () { return composeOn(m, base_1.map(Math.sin)); },
        sinh: function () { return composeOn(m, base_1.map(Math.sinh)); },
        sqrt: function () { return composeOn(m, base_1.map(Math.sqrt)); },
        tan: function () { return composeOn(m, base_1.map(Math.tan)); },
        tanh: function () { return composeOn(m, base_1.map(Math.tanh)); },
        trunc: function () { return composeOn(m, base_1.map(Math.trunc)); }
    };
    return m;
};
exports.number = number;
//# sourceMappingURL=number.js.map