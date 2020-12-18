"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object = void 0;
var base_1 = require("./base");
var fastAnd = function (arr, f) {
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var i = arr_1[_i];
        if (!f(i))
            return false;
    }
    return true;
};
var fastOr = function (arr, f) {
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var i = arr_2[_i];
        if (f(i))
            return true;
    }
    return false;
};
var fastXor = function (arr, f) {
    var found = false;
    for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
        var i = arr_3[_i];
        var b = f(i);
        if (found && b)
            return false;
        else if (!found && b)
            found = true;
    }
    return found;
};
var addValidators = function (validators) { return base_1.map(function (o) {
    for (var i in validators) {
        if (o[i] !== undefined)
            o[i] = base_1.validate(o[i], validators[i]);
    }
    return o;
}); };
var deleteAdditionalPropsAndValidate = function (validators) { return base_1.map(function (o) {
    for (var i in o) {
        if (validators[i] === undefined) {
            delete o[i];
        }
        else {
            o[i] = base_1.validate(o[i], validators[i]);
        }
    }
    return o;
}); };
var object = function (args, deleteAdditional) {
    // input is declared of type T because by doing so, and assigning it to m.subvalidators below, the toType function works properly.
    //however, we still need the any type to do the validations correctly
    if (deleteAdditional === void 0) { deleteAdditional = false; }
    var first = [
        base_1.filter(base_1.simpleTypeFilter("object"), "object"),
        base_1.filter(function (o) { return o !== null; }, "not null"),
        base_1.filter(function (o) { return !Array.isArray(o); }, "not Array")
    ];
    var then = [];
    if (deleteAdditional) {
        then.push(deleteAdditionalPropsAndValidate(args));
    }
    else {
        then.push(addValidators(args));
    }
    var validator = [then, first]; //validators are validated from the back
    var composeOn = function (output, o) {
        base_1.push(validator, o);
        return output;
    };
    var m = {
        validator: validator,
        //subValidators: args,
        anyOf: function () {
            var keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                keys[_i] = arguments[_i];
            }
            return composeOn(m, base_1.filter(function (o) { return fastOr(keys, function (k) { return o[k] !== undefined; }); }));
        },
        oneOf: function () {
            var keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                keys[_i] = arguments[_i];
            }
            return composeOn(m, base_1.filter(function (o) { return fastXor(keys, function (k) { return o[k] !== undefined; }); }));
        },
        required: function () {
            var keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                keys[_i] = arguments[_i];
            }
            return composeOn(m, base_1.filter(function (o) { return fastAnd(keys, function (k) { return o[k] !== undefined; }); }, "and"));
        },
        //if k is defined, then all the other keys must be defined
        needs: function (k) {
            var ks = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                ks[_i - 1] = arguments[_i];
            }
            return composeOn(m, base_1.filter(function (o) { return o[k] === undefined ? true : fastAnd(ks, function (k) { return o[k] !== undefined; }); }));
        }
    };
    return m;
};
exports.object = object;
//# sourceMappingURL=object.js.map