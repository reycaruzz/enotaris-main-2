"use strict";
exports.__esModule = true;
exports.ActionCreators = void 0;
// export action creators
var loginActions = require("./loginActions");
var navigationActions = require("./navigationActions");
var themeActions = require("./themeActions");
var mainActions = require("./themeActions");
exports.ActionCreators = Object.assign({}, loginActions, navigationActions, themeActions, mainActions);
