"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
var base_1 = require("./base");
var string = function () {
    var validator = [[base_1.filter(base_1.simpleTypeFilter("string"), "string")]];
    var composeOn = function (output, o) {
        base_1.push(validator, o);
        return output;
    };
    var m = {
        validator: validator,
        //Filters
        min: function (n) { return composeOn(m, base_1.filter(function (v) { return v.length >= n; }, "s-min")); },
        max: function (n) { return composeOn(m, base_1.filter(function (v) { return v.length <= n; }, "s-max")); },
        len: function (n) { return composeOn(m, base_1.filter(function (v) { return v.length == n; })); },
        includes: function (searchString, position) {
            if (position === void 0) { position = 0; }
            return composeOn(m, base_1.filter(function (v) { return v.includes(searchString, position); }));
        },
        startWith: function (searchString, length) {
            if (length === void 0) { length = undefined; }
            return composeOn(m, base_1.filter(function (v) { return v.startsWith(searchString, length); }));
        },
        endsWith: function (searchString, length) {
            if (length === void 0) { length = undefined; }
            return composeOn(m, base_1.filter(function (v) { return v.endsWith(searchString, length); }));
        },
        test: function (re) { return composeOn(m, base_1.filter(function (v) { return re.test(v); })); },
        //https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
        email: function () { return m.test(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/); },
        uuid_v4: function () { return m.test(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i); },
        //Mappings
        concat: function () {
            var strs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                strs[_i] = arguments[_i];
            }
            return composeOn(m, base_1.map(function (v) { return v.concat.apply(v, strs); }));
        },
        prepend: function () {
            var strs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                strs[_i] = arguments[_i];
            }
            return composeOn(m, base_1.map(function (v) {
                var _a;
                return (_a = String.prototype).concat.apply(_a, __spreadArrays(strs, [v]));
            }));
        },
        postpend: function () { return m.concat; },
        substring: function (indexStart, indexEnd) {
            if (indexEnd === void 0) { indexEnd = undefined; }
            return composeOn(m, base_1.map(function (v) { return v.substr(indexStart, indexEnd); }));
        },
        padEnd: function (targetLength, padString) {
            if (padString === void 0) { padString = "\U+0020"; }
            return composeOn(m, base_1.map(function (v) { return v.padEnd(targetLength, padString); }));
        },
        padStart: function (targetLength, padString) {
            if (padString === void 0) { padString = "\U+0020"; }
            return composeOn(m, base_1.map(function (v) { return v.padStart(targetLength, padString); }));
        },
        repeat: function (n) { return composeOn(m, base_1.map(function (v) { return v.repeat(n); })); },
        replace: function (searchFor, replaceWith) { return composeOn(m, base_1.map(function (v) { return v.replace(searchFor, replaceWith); })); },
        slice: function (beginIndex, endIndex) {
            if (endIndex === void 0) { endIndex = undefined; }
            return composeOn(m, base_1.map(function (v) { return v.slice(beginIndex, endIndex); }));
        },
        toLocaleLowerCase: function (locale) {
            if (locale === void 0) { locale = undefined; }
            return composeOn(m, base_1.map(function (v) { return v.toLocaleLowerCase(locale); }));
        },
        toLocaleUpperCase: function (locale) {
            if (locale === void 0) { locale = undefined; }
            return composeOn(m, base_1.map(function (v) { return v.toLocaleUpperCase(locale); }));
        },
        toLowerCase: function () { return composeOn(m, base_1.map(function (v) { return v.toLowerCase(); })); },
        toUpperCase: function () { return composeOn(m, base_1.map(function (v) { return v.toUpperCase(); })); },
        trim: function () { return composeOn(m, base_1.map(function (v) { return v.trim(); })); },
        trimStart: function () { return composeOn(m, base_1.map(function (v) { return v.trimStart(); })); },
        trimEnd: function () { return composeOn(m, base_1.map(function (v) { return v.trimEnd(); })); },
        trimLeft: function () { return composeOn(m, base_1.map(function (v) { return v.trimLeft(); })); },
        trimRight: function () { return composeOn(m, base_1.map(function (v) { return v.trimRight(); })); },
    };
    return m;
};
exports.string = string;
//# sourceMappingURL=string.js.map