"use strict";
exports.__esModule = true;
exports.setRunningText = void 0;
/*
 * Reducer actions related with login
 */
var types = require("./types");
function setRunningText(value) {
    return {
        type: types.SET_RUNNING_TEXT,
        text: value
    };
}
exports.setRunningText = setRunningText;
