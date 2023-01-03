"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
exports.__esModule = true;
exports.mainReducer = void 0;
/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
var createReducer_1 = require("app/lib/createReducer");
var types = require("app/store/actions/types");
var initialState = {
    runningText: ''
};
exports.mainReducer = createReducer_1["default"](initialState, (_a = {},
    _a[types.SET_RUNNING_TEXT] = function (state, action) {
        return __assign(__assign({}, state), { runningText: action.text });
    },
    _a));
