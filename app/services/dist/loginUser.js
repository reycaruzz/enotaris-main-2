"use strict";
exports.__esModule = true;
// import { apiClient } from 'app/services/client';
// import ApiConfig from 'app/config/api-config';
var apiUrl_1 = require("app/core/apiUrl");
function loginUser(username, password) {
    console.log(username, password);
    var loginData = new FormData();
    loginData.append('username', username);
    loginData.append('password', password);
    return fetch(apiUrl_1.apiUrl.api + 'login', {
        method: 'POST',
        body: loginData
    })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        return json;
    })["catch"](function (error) { return console.error(error); });
}
exports["default"] = loginUser;
