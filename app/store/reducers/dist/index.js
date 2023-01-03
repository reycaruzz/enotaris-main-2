"use strict";
exports.__esModule = true;
/*
 * combines all th existing reducers
 */
var loadingReducer = require("./loadingReducer");
var loginReducer = require("./loginReducer");
var themeReducer = require("./themeReducer");
var mainReducer = require("./mainReducer");
exports["default"] = Object.assign(loginReducer, loadingReducer, themeReducer, mainReducer);
