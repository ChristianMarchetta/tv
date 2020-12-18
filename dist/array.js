"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = void 0;
var base_1 = require("./base");
var array = function (items) {
    if (items === void 0) { items = undefined; }
    var first = [
        base_1.filter(base_1.simpleTypeFilter("object"), "object"),
        base_1.filter(function (o) { return o !== null; }, "not null"),
        base_1.filter(function (o) { return Array.isArray(o); }, "is Array")
    ];
    var then = [];
    if (items != undefined) {
        then.push(base_1.map(function (v) {
            for (var i = 0; i < v.length; i++) {
                v[i] = base_1.validate(v[i], items);
            }
            return v;
        }));
    }
    var validator = [then, first]; //validators are validated from the back
    var composeOn = function (output, o) {
        base_1.push(validator, o);
        return output;
    };
    var m = {
        validator: validator,
        //Filters
        min: function (n) { return composeOn(m, base_1.filter(function (v) { return v.length >= n; }, "Arr-min")); },
        max: function (n) { return composeOn(m, base_1.filter(function (v) { return v.length <= n; }, "Arr-max")); },
        len: function (n) { return composeOn(m, base_1.filter(function (v) { return v.length == n; })); },
        forAll: function (f) { return composeOn(m, base_1.filter(function (v) {
            for (var i = 0; i < v.length; i++) {
                if (!f(v[i], i, v))
                    return false;
            }
            return true;
        }, "For All")); },
        map: function (f) { return composeOn(m, base_1.map(function (v) {
            return v.map(f);
        })); },
        filter: function (f) { return composeOn(m, base_1.map(function (v) {
            return v.filter(f);
        })); }
    };
    return m;
};
exports.array = array;
//# sourceMappingURL=array.js.map