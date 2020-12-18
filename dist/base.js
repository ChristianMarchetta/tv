"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.push = exports.equals = exports.map = exports.filter = exports.simpleTypeFilter = exports.validate = void 0;
var simpleTypeFilter = function (s) { return (function (v) { var t = typeof v; return t === s; }); };
exports.simpleTypeFilter = simpleTypeFilter;
var filter = function (func, label) {
    if (label === void 0) { label = ""; }
    return ({ f: func, m: undefined, label: label });
};
exports.filter = filter;
var map = function (map, label) {
    if (label === void 0) { label = ""; }
    return ({ m: map, f: undefined, label: label });
};
exports.map = map;
var equals = function (c) { return filter(function (v) { return v === c; }, "equals"); };
exports.equals = equals;
var validate = function (x, schema) {
    var r = x;
    var vs = schema.validator;
    //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    for (var j = vs.length - 1; j >= 0; j--) {
        var v = vs[j];
        for (var i = 0; i < v.length; i++) {
            if (v[i].f) {
                //console.log("Input:", r, "Label:", v[i].label )
                if (!v[i].f(r))
                    throw new Error("Validator " + i + " failed - " + v[i].label);
            }
            else if (v[i].m) {
                var prev = r;
                r = v[i].m(r);
                //console.log("Input:", prev, "Mapping", r)
            }
        }
    }
    //console.log("Validation Result:", r)
    //console.log("||||||||||||||||||||||||||||||||")
    return r;
};
exports.validate = validate;
var push = function (v) {
    var _a;
    var ops = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        ops[_i - 1] = arguments[_i];
    }
    (_a = v[v.length - 1]).push.apply(_a, ops);
    return v;
};
exports.push = push;
//# sourceMappingURL=base.js.map