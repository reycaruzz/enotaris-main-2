"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var theme_1 = require("app/core/theme");
var react_redux_1 = require("react-redux");
var loginActions = require("app/store/actions/loginActions");
var NavigationService_1 = require("app/navigation/NavigationService");
//redux
var mainActions = require("app/store/actions/mainActions");
var styles_1 = require("./styles");
var apiUrl_1 = require("app/core/apiUrl");
var Profile = function (_a) {
    var route = _a.route;
    //route params
    var show_button = route !== undefined ? route.params.show_button : null;
    //dispatch
    var dispatch = react_redux_1.useDispatch();
    var onLogout = function () { return dispatch(loginActions.logOut()); };
    //navigation service
    var onBack = function () { return NavigationService_1["default"].goBack(); };
    var onReport = function () { return NavigationService_1["default"].navigate('Report'); };
    //fetch data
    var userData = react_redux_1.useSelector(function (state) { return state.loginReducer.userData; });
    //state hooks
    var _b = react_1["default"].useState(false), loader = _b[0], setLoader = _b[1];
    var _c = react_1["default"].useState(false), modalVisible = _c[0], setModalVisible = _c[1];
    //form Hooks
    var _d = react_1["default"].useState(''), runningText = _d[0], setRunningText = _d[1];
    var onSubmit = function () {
        setLoader(true);
        var data = new FormData();
        data.append('id_user', userData.iduser);
        data.append('text', runningText);
        fetch(apiUrl_1.apiUrl.api + 'welcometext', {
            method: 'POST',
            body: data
        })
            .then(function (response) {
            setLoader(false);
            response
                .json()
                .then(function (dataRes) {
                if (dataRes.success == true) {
                    react_native_1.Alert.alert('Submit Success', 'Teks Dashboard berhasil diubah', [
                        {
                            text: 'OK',
                            onPress: function () {
                                setRunningText('');
                                setModalVisible(false);
                                dispatch(mainActions.setRunningText(runningText));
                            }
                        },
                    ]);
                }
            })["catch"](function (error) {
                react_native_1.Alert.alert('Submit Failed', 'Ada masalah pada server');
                console.error(error);
            })["finally"](function () { });
        })["catch"](function (error) { return console.error('network error', error); });
    };
    var populateData = function () {
        fetch(apiUrl_1.apiUrl.api + 'getwelcometext')
            .then(function (response) {
            // console.log(response.text());
            response
                .json()
                .then(function (data) {
                setRunningText(data.data[0].content);
            })["catch"](function (error) { return console.error(error); });
        })["catch"](function (error) { return console.error(error); });
    };
    react_1["default"].useEffect(function () {
        populateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (react_1["default"].createElement(react_native_paper_1.Provider, null,
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].container },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headerContainer },
                show_button ? (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].iconHeader },
                    react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "arrow-left", size: 30, color: theme_1.theme.colors.primary, onPress: function () { return onBack(); } }))) : (react_1["default"].createElement(react_native_1.View, { style: { width: 10 } })),
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                    react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                            ? [styles_1["default"].headerText, { fontWeight: 'bold' }]
                            : styles_1["default"].headerText }, "PROFIL"))),
            react_1["default"].createElement(react_native_1.ScrollView, { style: {
                    width: '100%'
                }, fadingEdgeLength: 30 },
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].profileInfoContainer },
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].profileImage },
                        react_1["default"].createElement(react_native_1.Image, { source: {
                                uri: userData.pic
                            }, style: styles_1["default"].image, resizeMode: "cover" })),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataContainer },
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataInfo },
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataKeyContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, "Nama Lengkap "),
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, ": ")),
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataValueContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].biodataValueText, { fontWeight: 'bold' }]
                                        : styles_1["default"].biodataValueText }, userData.nama))),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataInfo },
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataKeyContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, "Divisi "),
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, ": ")),
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataValueContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].biodataValueText, { fontWeight: 'bold' }]
                                        : styles_1["default"].biodataValueText }, userData.nama_divisi))),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataInfo },
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataKeyContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, "Jabatan "),
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, ": ")),
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataValueContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].biodataValueText, { fontWeight: 'bold' }]
                                        : styles_1["default"].biodataValueText }, userData.roleuser))),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataInfo },
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataKeyContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText },
                                    "Tempat Tanggal Lahir",
                                    ' '),
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, ": ")),
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataValueContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].biodataValueText, { fontWeight: 'bold' }]
                                        : styles_1["default"].biodataValueText }, userData.tempat_lahir + ' ' + userData.tanggal_lahir))),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataInfo },
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataKeyContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, "Email "),
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, ": ")),
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataValueContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].biodataValueText, { fontWeight: 'bold' }]
                                        : styles_1["default"].biodataValueText }, userData.email))),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataInfo },
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataKeyContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, "No Telp "),
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, ": ")),
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataValueContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].biodataValueText, { fontWeight: 'bold' }]
                                        : styles_1["default"].biodataValueText }, userData.hp))),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataInfo },
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataKeyContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, "Alamat "),
                                react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].biodataKeyText }, ": ")),
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].biodataValueContainer },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].biodataValueText, { fontWeight: 'bold' }]
                                        : styles_1["default"].biodataValueText }, userData.alamat))))),
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].menuContainer },
                    show_button ? (react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles_1["default"].listMenuContainer, onPress: function () {
                            react_native_1.Linking.openURL('https://docs.google.com/document/d/1uX3fOC9lH3qvGxuxtzjr3dZPsj4MfvSa/edit?usp=sharing&ouid=114640215295586583286&rtpof=true&sd=true');
                        } },
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].iconMenu },
                            react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "alert-circle", size: 20, color: "#DADADA" })),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                            react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                    ? [styles_1["default"].menuText, { fontWeight: 'bold' }]
                                    : styles_1["default"].menuText }, "Petunjuk Penggunaan")))) : null,
                    userData.role === '1' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles_1["default"].listMenuContainer, onPress: function () { return setModalVisible(true); } },
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].iconMenu },
                                react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "format-size", size: 20, color: "#DADADA" })),
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].menuText, { fontWeight: 'bold' }]
                                        : styles_1["default"].menuText }, "Pengaturan Teks Dashboard"))),
                        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles_1["default"].listMenuContainer, onPress: function () {
                                onReport();
                            } },
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].iconMenu },
                                react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "account-multiple", size: 20, color: "#DADADA" })),
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                                react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].menuText, { fontWeight: 'bold' }]
                                        : styles_1["default"].menuText }, "Kinerja Pegawai")))))),
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].logoutButtonContainer },
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles_1["default"].logoutButton, onPress: onLogout },
                        react_1["default"].createElement(react_native_paper_1.Text, { style: react_native_1.Platform.OS === 'ios'
                                ? [styles_1["default"].buttonLogoutLabel, { fontWeight: 'bold' }]
                                : styles_1["default"].buttonLogoutLabel }, "Logout"))))),
        react_1["default"].createElement(react_native_paper_1.Portal, null,
            react_1["default"].createElement(react_native_paper_1.Modal, { visible: modalVisible, onDismiss: function () {
                    setModalVisible(false);
                }, contentContainerStyle: styles_1["default"].modalContentContainer },
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_paper_1.Text, { style: styles_1["default"].headerText }, "Teks Dashboard")),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].formContainer },
                        react_1["default"].createElement(react_native_paper_1.Divider, null),
                        react_1["default"].createElement(react_native_paper_1.TextInput, { label: "Masukan teks dashboard", mode: "outlined", style: styles_1["default"].inputTextContainer, defaultValue: runningText, onChangeText: function (text) { return setRunningText(text); }, autoCapitalize: "sentences", multiline: true, theme: {
                                colors: {
                                    text: '#000000',
                                    placeholder: theme_1.theme.colors.placeholder,
                                    primary: theme_1.theme.colors.secondary,
                                    underlineColor: theme_1.theme.colors.secondary,
                                    background: '#F6F8FA'
                                }
                            } }),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].submitButtonContainer },
                            react_1["default"].createElement(react_native_paper_1.Button, { mode: "outlined", labelStyle: react_native_1.Platform.OS === 'ios'
                                    ? [
                                        styles_1["default"].buttonSubmitLabel,
                                        {
                                            fontWeight: 'bold',
                                            color: theme_1.theme.colors.secondary
                                        },
                                    ]
                                    : [
                                        styles_1["default"].buttonSubmitLabel,
                                        { color: theme_1.theme.colors.secondary },
                                    ], style: styles_1["default"].buttonSubmit, onPress: function () {
                                    onSubmit();
                                } }, loader ? 'Mengirimkan..' : 'Simpan Teks'))))))));
};
exports["default"] = Profile;
