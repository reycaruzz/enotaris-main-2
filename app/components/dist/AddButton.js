"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var NavigationService_1 = require("app/navigation/NavigationService");
var theme_1 = require("app/core/theme");
var AddButton = /** @class */ (function (_super) {
    __extends(AddButton, _super);
    function AddButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //navigation services
        _this.onRequestList = function () { return NavigationService_1["default"].navigate('CreateRequest'); };
        _this.mode = new react_native_1.Animated.Value(0);
        _this.buttonSize = new react_native_1.Animated.Value(1);
        _this.handlePress = function (id) {
            react_native_1.Animated.sequence([
                react_native_1.Animated.timing(_this.buttonSize, {
                    toValue: 0.95,
                    duration: 10,
                    useNativeDriver: true
                }),
                react_native_1.Animated.timing(_this.buttonSize, {
                    toValue: 1,
                    useNativeDriver: true
                }),
                react_native_1.Animated.timing(_this.mode, {
                    toValue: _this.mode._value === 0 ? 1 : 0,
                    useNativeDriver: true
                }),
            ]).start();
            NavigationService_1["default"].navigate('CreateRequest', { item: null });
        };
        return _this;
    }
    AddButton.prototype.render = function () {
        var _this = this;
        var sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };
        return (react_1["default"].createElement(react_native_1.View, { style: { position: 'absolute', alignItems: 'center' } },
            react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return _this.handlePress(); }, underlayColor: "#ffffff", style: [styles.button, sizeStyle] },
                react_1["default"].createElement(react_native_1.Animated.View, null,
                    react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "plus", color: theme_1.theme.colors.primary })))));
    };
    return AddButton;
}(react_1["default"].Component));
exports["default"] = AddButton;
var styles = react_native_1.StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 36,
        backgroundColor: '#ffffff',
        shadowColor: 'white',
        shadowRadius: 2,
        shadowOffset: { height: -3 },
        shadowOpacity: 0.6,
        borderWidth: 3,
        borderColor: theme_1.theme.colors.primary,
        elevation: 17
    },
    secondaryButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F99823'
    }
});
