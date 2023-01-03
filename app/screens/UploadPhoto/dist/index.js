"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("./styles");
var theme_1 = require("app/core/theme");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var NavigationService_1 = require("app/navigation/NavigationService");
var react_native_image_zoom_viewer_1 = require("react-native-image-zoom-viewer");
// Import Image Picker
var react_native_image_picker_1 = require("react-native-image-picker");
var _ = require('lodash');
var UploadPhoto = function (_a) {
    var route = _a.route;
    //route params
    var item = route !== undefined ? route.params.item : null;
    var id_kelengkapan = route !== undefined ? route.params.id_kelengkapan : null;
    var id_document = route !== undefined ? route.params.id_document : null;
    var desc = route !== undefined ? route.params.desc : null;
    var tempUri = route !== undefined ? route.params.uri : null;
    var referrer = route !== undefined ? route.params.referrer : null;
    var isButton = route !== undefined ? route.params.isButton : null;
    //route for serah terima layanan
    var id_layanan = route !== undefined ? route.params.id_layanan : null;
    var nama_layanan = route !== undefined ? route.params.nama_layanan : null;
    //user data
    var userData = react_redux_1.useSelector(function (state) { return state.loginReducer.userData; });
    //navigation service
    var onBack = function () { return NavigationService_1["default"].goBack(); };
    var onList = function (item, id_document, filePath) {
        if (referrer === 'CreateRequest') {
            if (id_kelengkapan === 'bukti_pembayaran') {
                NavigationService_1["default"].navigate('CreateRequest', {
                    item: item,
                    bukti_pembayaran: image,
                    bukti_pembayaran_filename: filePath.fileName,
                    bukti_pembayaran_uri: filePath.uri
                });
            }
            else if (id_kelengkapan === 'ttd_pihak') {
                NavigationService_1["default"].navigate('CreateRequest', {
                    item: item,
                    id_ttd: id_document,
                    ttd_data: {
                        id_ttd: id_document,
                        id_user: userData.iduser,
                        img64: image,
                        latitude: latitude,
                        longitude: longitude,
                        timestamp: timestamp,
                        fileName: filePath.fileName,
                        tempUri: filePath.uri,
                        desc: desc
                    }
                });
            }
            else {
                NavigationService_1["default"].navigate('CreateRequest', {
                    item: item,
                    id_kelengkapan: id_kelengkapan,
                    id_document: id_document,
                    document_data: {
                        id: id_kelengkapan,
                        id_user: userData.iduser,
                        id_document: id_document,
                        img64: image,
                        latitude: latitude,
                        longitude: longitude,
                        timestamp: timestamp,
                        fileName: filePath.fileName,
                        tempUri: filePath.uri,
                        desc: desc
                    }
                });
            }
        }
        else if (referrer === 'JobList') {
            NavigationService_1["default"].navigate('JobList', {
                item: item,
                id_kelengkapan: id_kelengkapan,
                id_document: id_document,
                document_data: {
                    id: id_kelengkapan,
                    id_user: userData.iduser,
                    id_document: id_document,
                    img64: image,
                    latitude: latitude,
                    longitude: longitude,
                    timestamp: timestamp,
                    fileName: filePath.fileName,
                    tempUri: filePath.uri,
                    desc: desc
                }
            });
        }
        else if (referrer === 'RequestList') {
            NavigationService_1["default"].navigate('RequestList', {
                item: item,
                subservice_data: {
                    sub_service_id: id_layanan,
                    sub_service_name: nama_layanan,
                    id_user: userData.iduser,
                    img64: image,
                    latitude: latitude,
                    longitude: longitude,
                    timestamp: timestamp,
                    fileName: filePath.fileName,
                    tempUri: filePath.uri
                }
            });
        }
        else if (referrer === 'ProjectList') {
            NavigationService_1["default"].goBack();
            route.params["return"]({
                item: item,
                id_kelengkapan: id_kelengkapan,
                id_document: id_document,
                document_data: {
                    id: id_kelengkapan,
                    id_user: userData.iduser,
                    id_document: id_document,
                    img64: image,
                    latitude: latitude,
                    longitude: longitude,
                    timestamp: timestamp,
                    fileName: filePath.fileName,
                    tempUri: filePath.uri,
                    desc: desc
                }
            });
        }
    };
    //hooks
    var _b = react_1["default"].useState({}), filePath = _b[0], setFilePath = _b[1];
    var _c = react_1["default"].useState(''), image = _c[0], setImage = _c[1];
    var _d = react_1["default"].useState(null), latitude = _d[0], setLatitude = _d[1];
    var _e = react_1["default"].useState(null), longitude = _e[0], setLongitude = _e[1];
    var _f = react_1["default"].useState(null), timestamp = _f[0], setTimestamp = _f[1];
    var _g = react_1["default"].useState(false), imgModal = _g[0], setImgModal = _g[1];
    var _h = react_1["default"].useState(false), loader = _h[0], setLoader = _h[1];
    //check camera permission
    var requestCameraPermission = function () { return __awaiter(void 0, void 0, void 0, function () {
        var granted, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(react_native_1.Platform.OS === 'android')) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, react_native_1.PermissionsAndroid.request(react_native_1.PermissionsAndroid.PERMISSIONS.CAMERA, {
                            title: 'Camera Permission',
                            message: 'App needs camera permission'
                        })];
                case 2:
                    granted = _a.sent();
                    // If CAMERA Permission is granted
                    if (granted === react_native_1.PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        return [2 /*return*/, granted === react_native_1.PermissionsAndroid.RESULTS.GRANTED];
                    }
                    else {
                        alert('Camera Permission Denied');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.warn(err_1);
                    return [2 /*return*/, false];
                case 4: return [3 /*break*/, 6];
                case 5: return [2 /*return*/, true];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    //check write storage permission
    var requestExternalWritePermission = function () { return __awaiter(void 0, void 0, void 0, function () {
        var granted, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(react_native_1.Platform.OS === 'android')) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, react_native_1.PermissionsAndroid.request(react_native_1.PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                            title: 'External Storage Write Permission',
                            message: 'App needs write permission'
                        })];
                case 2:
                    granted = _a.sent();
                    // If WRITE_EXTERNAL_STORAGE Permission is granted
                    if (granted === react_native_1.PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        return [2 /*return*/, granted === react_native_1.PermissionsAndroid.RESULTS.GRANTED];
                    }
                    else {
                        alert('Write Permission Denied');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.warn(err_2);
                    alert('Write permission err', err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, false];
                case 5: return [2 /*return*/, true];
            }
        });
    }); };
    //check location permission
    var requestLocationPermission = function () { return __awaiter(void 0, void 0, void 0, function () {
        var granted, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(react_native_1.Platform.OS === 'android')) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, react_native_1.PermissionsAndroid.request(react_native_1.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location'
                        })];
                case 2:
                    granted = _a.sent();
                    if (granted === react_native_1.PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        return [2 /*return*/, granted === react_native_1.PermissionsAndroid.RESULTS.GRANTED];
                    }
                    else {
                        alert('Location Permission Denied');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    alert('Location permission err', err_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, false];
                case 5: return [2 /*return*/, true];
            }
        });
    }); };
    var captureImage = function (type) { return __awaiter(void 0, void 0, void 0, function () {
        var options, isCameraPermitted, isStoragePermitted, isLocationPermitted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = {
                        mediaType: type,
                        maxWidth: 1200,
                        maxHeight: 1200,
                        quality: 0.8,
                        videoQuality: 'low',
                        durationLimit: 30,
                        includeBase64: true
                    };
                    return [4 /*yield*/, requestCameraPermission()];
                case 1:
                    isCameraPermitted = _a.sent();
                    return [4 /*yield*/, requestExternalWritePermission()];
                case 2:
                    isStoragePermitted = _a.sent();
                    return [4 /*yield*/, requestLocationPermission()];
                case 3:
                    isLocationPermitted = _a.sent();
                    if (isCameraPermitted && isStoragePermitted && isLocationPermitted) {
                        react_native_image_picker_1.launchCamera(options, function (response) {
                            if (response.errorCode == 'camera_unavailable') {
                                alert('Camera not available on device');
                                return;
                            }
                            else if (response.errorCode == 'permission') {
                                alert('App have not been given a permission to use camera');
                                return;
                            }
                            else if (response.errorCode == 'others') {
                                alert(response.errorMessage);
                                return;
                            }
                            var source = response.base64;
                            setImage(source);
                            setFilePath(response);
                            //get location
                            // Geolocation.getCurrentPosition(
                            //   (info) => {
                            //     setLatitude(info.coords.latitude);
                            //     setLongitude(info.coords.longitude);
                            //     setTimestamp(moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss'));
                            //   },
                            //   (error) => console.log('Error', error.message),
                            //   {
                            //     enableHighAccuracy: false,
                            //     timeout: 10000,
                            //   },
                            // );
                        });
                    }
                    else {
                        react_native_1.Alert.alert('Permission Denied', 'Pastikan anda mengizinkan akses kamera, penyimpanan, dan lokasi');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var chooseFile = function (type) {
        var options = {
            mediaType: type,
            maxWidth: 1200,
            maxHeight: 1200,
            quality: 0.8,
            includeBase64: true
        };
        react_native_image_picker_1.launchImageLibrary(options, function (response) {
            if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            }
            else if (response.errorCode == 'permission') {
                alert('App have not been given a permission to access storage');
                return;
            }
            else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            var source = response.base64;
            setImage(source);
            setFilePath(response);
            // Geolocation.getCurrentPosition(
            //   (info) => {
            //     setLatitude(info.coords.latitude);
            //     setLongitude(info.coords.longitude);
            //     setTimestamp(moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss'));
            //   },
            //   (error) =>
            //     Alert.alert(
            //       'Error',
            //       'Gagal mendapatkan koordinat lokasi \n' + error.message,
            //     ),
            //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            // );
        });
    };
    //after capture logic
    react_1["default"].useEffect(function () {
        if (tempUri) {
            setFilePath({
                uri: tempUri
            });
        }
        else if (item && id_document) {
            if (referrer === 'CreateRequest') {
                var containedItem = _.find(item.request_document, [
                    'id',
                    id_kelengkapan,
                ]);
                if (containedItem !== undefined && containedItem.request_dokumen_url) {
                    setFilePath({
                        uri: containedItem.request_dokumen_url.replace('//', 'http://')
                    });
                }
                // handlePresentModalPress(item_capture);
            }
            else if (referrer === 'JobList') {
                var containedItem = _.find(item.job_document, ['id', id_kelengkapan]);
                if (containedItem !== undefined && containedItem.job_dokumen_url) {
                    setFilePath({
                        uri: containedItem.job_dokumen_url.replace('//', 'http://')
                    });
                }
            }
        }
    }, [item, id_document, id_kelengkapan, tempUri, referrer]);
    react_1["default"].useEffect(function () {
        if (id_kelengkapan === 'bukti_pembayaran') {
            if (tempUri) {
                setFilePath({
                    uri: tempUri
                });
            }
            else if (item) {
                if (item.request_payment_url) {
                    setFilePath({
                        uri: item.request_payment_url.replace('//', 'http://')
                    });
                }
            }
        }
    }, [id_kelengkapan, tempUri, item]);
    react_1["default"].useEffect(function () {
        if (id_kelengkapan === 'ttd_pihak') {
            var containedItem = _.find(item.ttd_pihak, ['id', id_document]);
            if (tempUri) {
                setFilePath({
                    uri: tempUri
                });
            }
            else if (containedItem !== undefined && containedItem.request_ttd_url) {
                setFilePath({
                    uri: containedItem.request_ttd_url.replace('//', 'http://')
                });
            }
        }
    }, [id_kelengkapan, id_document, tempUri, item]);
    react_1["default"].useEffect(function () {
        if (referrer === 'ProjectList') {
            console.log(item);
            var containedItem = _.find(item.job_document, ['id', id_kelengkapan]);
            console.log('containedItem', containedItem);
            console.log('tempuri', tempUri);
            if (tempUri) {
                setFilePath({
                    uri: tempUri
                });
            }
            else if (containedItem !== undefined && containedItem.job_dokumen_url) {
                setFilePath({
                    uri: containedItem.job_dokumen_url.replace('//', 'http://')
                });
            }
        }
    }, [referrer, item, id_kelengkapan, tempUri]);
    react_1["default"].useEffect(function () {
        if (id_layanan && nama_layanan) {
            var containedItem = _.find(item.subservices, [
                'sub_service_id',
                id_layanan,
            ]);
            if (tempUri) {
                setFilePath({
                    uri: tempUri
                });
            }
            else if (containedItem !== undefined && containedItem.image_url) {
                console.log(containedItem.image_url.replace('//', 'http://'));
                setFilePath({
                    uri: containedItem.image_url.replace('//', 'http://')
                });
            }
        }
    }, [id_layanan, nama_layanan, tempUri, item]);
    return (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].background },
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headerContainer },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].iconHeader },
                react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "arrow-left", size: 30, color: "#ffffff", onPress: function () { return onBack(); } })),
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerText }, "Unggah Bukti Foto"))),
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].bottomSheetContainer },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].sheetContainer },
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].photoContainer }, filePath.uri ? (react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles_1["default"].photoContainer, onPress: function () { return setImgModal(true); } },
                    loader ? (react_1["default"].createElement(react_native_paper_1.ActivityIndicator, { style: styles_1["default"].photoPreview, animating: true })) : null,
                    react_1["default"].createElement(react_native_1.Image, { source: { uri: filePath.uri }, style: styles_1["default"].photoPreview, onLoadStart: function () { return setLoader(true); }, onLoadEnd: function () { return setLoader(false); } }))) : (react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/camera.png'), style: styles_1["default"].cameraIconPreview }))),
                filePath.uri ? ([
                    item ? ([
                        _.find(item.request_document, ['id', id_kelengkapan]) !==
                            undefined ||
                            _.find(item.ttd_pihak, ['id', id_document]) !== undefined
                            ? [
                                image !== '' ? (react_1["default"].createElement(react_native_1.View, { style: [
                                        styles_1["default"].submitButtonContainer,
                                        { marginTop: 10 },
                                    ], key: "ambilfoto" },
                                    react_1["default"].createElement(react_native_paper_1.Button, { mode: "contained", labelStyle: [styles_1["default"].buttonSubmitLabel], style: styles_1["default"].buttonSubmit, onPress: function () {
                                            return onList(item, id_document, filePath);
                                        } }, "Pilih Gambar"))) : null,
                            ]
                            : [
                                isButton ? (react_1["default"].createElement(react_native_1.View, { style: [
                                        styles_1["default"].submitButtonContainer,
                                        { marginTop: 10 },
                                    ], key: "ambilfoto" },
                                    react_1["default"].createElement(react_native_paper_1.Button, { mode: "contained", labelStyle: [styles_1["default"].buttonSubmitLabel], style: styles_1["default"].buttonSubmit, onPress: function () {
                                            return onList(item, id_document, filePath);
                                        } }, "Pilih Gambar"))) : null,
                            ],
                    ]) : (react_1["default"].createElement(react_native_1.View, { style: [styles_1["default"].submitButtonContainer, { marginTop: 10 }], key: "ambilfoto" },
                        react_1["default"].createElement(react_native_paper_1.Button, { mode: "contained", labelStyle: [styles_1["default"].buttonSubmitLabel], style: styles_1["default"].buttonSubmit, onPress: function () { return onList(item, id_document, filePath); } }, "Pilih Gambar"))),
                ]) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(react_native_1.View, { style: [styles_1["default"].submitButtonContainer, , { marginTop: 10 }], key: "ambilfoto" },
                        react_1["default"].createElement(react_native_paper_1.Button, { mode: "contained", labelStyle: [styles_1["default"].buttonSubmitLabel], style: styles_1["default"].buttonSubmit, onPress: function () { return captureImage('photo'); } }, "Ambil Foto")),
                    id_kelengkapan === 'ttd_pihak' ? (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].submitButtonContainer, key: "ambilfotogaleri" },
                        react_1["default"].createElement(react_native_paper_1.Button, { mode: "outlined", color: theme_1.theme.colors.secondary, labelStyle: [styles_1["default"].buttonRetakeLabel], style: styles_1["default"].buttonSubmit, onPress: function () { return chooseFile('photo'); } }, "Pilih Foto Galeri"))) : null)),
                filePath.uri && isButton ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].submitButtonContainer, key: "ambilfotoulang" },
                        react_1["default"].createElement(react_native_paper_1.Button, { mode: "outlined", color: theme_1.theme.colors.secondary, labelStyle: [styles_1["default"].buttonRetakeLabel], style: styles_1["default"].buttonSubmit, onPress: function () { return captureImage('photo'); } }, "Ambil Foto Ulang")),
                    id_kelengkapan === 'ttd_pihak' ? (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].submitButtonContainer, key: "ambilfotoulanggaleri" },
                        react_1["default"].createElement(react_native_paper_1.Button, { mode: "outlined", color: theme_1.theme.colors.secondary, labelStyle: [styles_1["default"].buttonRetakeLabel], style: styles_1["default"].buttonSubmit, onPress: function () { return chooseFile('photo'); } }, "Pilih Foto Galeri"))) : null)) : (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].submitButtonContainer, key: "ambilfotoulang" },
                    react_1["default"].createElement(react_native_paper_1.Button, { mode: "outlined", color: theme_1.theme.colors.secondary, labelStyle: [styles_1["default"].buttonRetakeLabel], style: styles_1["default"].buttonSubmit, onPress: function () { return onBack(); } }, "Batal"))))),
        react_1["default"].createElement(react_native_1.Modal, { visible: imgModal, transparent: true, onRequestClose: function () {
                setImgModal(false);
            }, onBackButtonPress: function () {
                setImgModal(false);
            } },
            react_1["default"].createElement(react_native_image_zoom_viewer_1["default"], { enableSwipeDown: true, onSwipeDown: function () {
                    setImgModal(false);
                }, renderHeader: function () { return (react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "close", size: 30, color: "#ffffff", onPress: function () { return setImgModal(false); } })); }, imageUrls: [{ url: react_native_1.Image.resolveAssetSource(filePath).uri }] }))));
};
exports["default"] = UploadPhoto;
