"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var loginActions = require("app/store/actions/loginActions");
var styles_1 = require("./styles");
var theme_1 = require("app/core/theme");
// import NavigationService from 'app/navigation/NavigationService';
var react_native_version_check_1 = require("react-native-version-check");
var Login = function () {
    var _a = react_1.useState('Tidak diketahui'), latestVersion = _a[0], setLatestVersion = _a[1];
    var currentVersion = react_native_version_check_1["default"].getCurrentVersion();
    react_1["default"].useEffect(function () {
        react_native_version_check_1["default"].getLatestVersion() // Automatically choose profer provider using `Platform.select` by device platform.
            .then(function (version) {
            setLatestVersion(version);
        });
    }, []);
    var _b = react_1.useState({ value: '', error: '' }), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState({ value: '', error: '' }), password = _c[0], setPassword = _c[1];
    var _d = react_1["default"].useState(false), loader = _d[0], setLoader = _d[1];
    var _e = react_1.useState(true), visibility = _e[0], setVisibility = _e[1];
    var isLoading = react_redux_1.useSelector(function (state) { return state.loadingReducer.isLoginLoading; });
    var dispatch = react_redux_1.useDispatch();
    var onLogin = function () {
        dispatch(loginActions.requestLogin(email.value, password.value));
        if (isLoading) {
            setLoader(true);
        }
        else {
            setLoader(false);
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.KeyboardAvoidingView, { behavior: react_native_1.Platform.OS === 'ios' ? 'padding' : 'padding', style: styles_1["default"].container },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headerContainer },
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].logoContainer },
                    react_1["default"].createElement(react_native_1.Image, { style: styles_1["default"].imageLogo, source: require('../../assets/logo-green.png') })),
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainer },
                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerText }, "Selamat Datang!"),
                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].subHeaderText }, "Masukkan username dan password untuk login."))),
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].illustrationContainer },
                react_1["default"].createElement(react_native_1.Image, { style: styles_1["default"].illustrationImage, source: require('../../assets/illustrasi-login.png') })),
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].formContainer },
                react_1["default"].createElement(react_native_paper_1.TextInput, { style: styles_1["default"].formInput, label: "Username", returnKeyType: "next", value: email.value, onChangeText: function (text) { return setEmail({ value: text, error: '' }); }, error: !!email.error, errorText: email.error, autoCapitalize: "none", spellCheck: false, left: react_1["default"].createElement(react_native_paper_1.TextInput.Icon, { icon: "account-outline", color: theme_1.theme.colors.primary, style: { paddingTop: 5 } }), theme: {
                        colors: {
                            placeholder: theme_1.theme.colors.placeholder,
                            primary: theme_1.theme.colors.primary,
                            underlineColor: theme_1.theme.colors.primary,
                            background: 'transparent'
                        }
                    } }),
                react_1["default"].createElement(react_native_paper_1.TextInput, { style: styles_1["default"].formInput, label: "Password", returnKeyType: "done", value: password.value, onChangeText: function (text) { return setPassword({ value: text, error: '' }); }, error: !!password.error, errorText: password.error, secureTextEntry: !visibility, autoCapitalize: "none", spellCheck: false, left: react_1["default"].createElement(react_native_paper_1.TextInput.Icon, { icon: "lock-outline", color: theme_1.theme.colors.primary, style: { paddingTop: 5 } }), right: react_1["default"].createElement(react_native_paper_1.TextInput.Icon, { icon: visibility ? 'eye-off-outline' : 'eye-outline', color: theme_1.theme.colors.primary, style: { paddingTop: 5 }, onPress: function () {
                            setVisibility(!visibility);
                        } }), theme: {
                        colors: {
                            placeholder: theme_1.theme.colors.placeholder,
                            primary: theme_1.theme.colors.primary,
                            underlineColor: theme_1.theme.colors.primary,
                            background: 'transparent'
                        }
                    } }),
                react_1["default"].createElement(react_native_paper_1.Button, { mode: "contained", labelStyle: react_native_1.Platform.OS === 'ios'
                        ? [styles_1["default"].buttonSubmitLabel, { fontWeight: 'bold' }]
                        : styles_1["default"].buttonSubmitLabel, style: styles_1["default"].roundedButton, loading: loader ? true : false, onPress: onLogin }, loader ? 'Harap Tunggu...' : 'Login')),
            react_native_1.Platform.OS === 'android'
                ? [
                    currentVersion === latestVersion ? (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].footerContainer },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].footerText }, "Up-to-date"),
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].footerText }, 'E-Notaris ' + currentVersion))) : (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].footerContainer },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].footerText }, "Need Update"),
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].footerText }, 'E-Notaris ' + currentVersion),
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].footerText }, 'Latest Version ' + latestVersion))),
                ]
                : null)));
};
exports["default"] = Login;
