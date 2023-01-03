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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("./styles");
var apiUrl_1 = require("app/core/apiUrl");
var theme_1 = require("app/core/theme");
var react_native_1 = require("react-native");
var react_redux_1 = require("react-redux");
var react_native_paper_1 = require("react-native-paper");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var bottom_sheet_1 = require("@gorhom/bottom-sheet");
var react_native_inset_shadow_1 = require("react-native-inset-shadow");
var NavigationService_1 = require("app/navigation/NavigationService");
var react_native_loading_spinner_overlay_1 = require("react-native-loading-spinner-overlay");
var native_1 = require("@react-navigation/native");
var moment_1 = require("moment");
require("moment/locale/id");
moment_1["default"].locale('id');
var _ = require('lodash');
var categoryDefault = [
    {
        id: 0,
        name: 'SEMUA',
        is_active: true
    },
    {
        id: 1,
        name: 'DIAJUKAN',
        is_active: false
    },
    {
        id: 2,
        name: 'DIPROSES',
        is_active: false
    },
    {
        id: 3,
        name: 'DISETUJUI',
        is_active: false
    },
    {
        id: 4,
        name: 'SERAH TERIMA',
        is_active: false
    },
    {
        id: 5,
        name: 'SELESAI',
        is_active: false
    },
    {
        id: 6,
        name: 'DITOLAK',
        is_active: false
    },
];
var RequestList = function (_a) {
    var route = _a.route;
    //param data
    var project_id = route !== undefined ? route.params.project_id : null;
    var project_name = route !== undefined ? route.params.project_name : null;
    // const project_desc = route !== undefined ? route.params.project_desc : null;
    var item_capture = route !== undefined ? route.params.item : null;
    var subservice_data = route !== undefined ? route.params.subservice_data : null;
    //user data
    var userData = react_redux_1.useSelector(function (state) { return state.loginReducer.userData; });
    //isfocused hook
    var isFocused = native_1.useIsFocused();
    //navigation service
    var onBack = function () { return NavigationService_1["default"].goBack(); };
    var onCreateRequest = function (item) {
        return NavigationService_1["default"].navigate('CreateRequest', { item: item });
    };
    var onUploadPhoto = function (item, id, nama, uri, isButton) {
        NavigationService_1["default"].navigate('UploadPhoto', {
            item: item,
            id_layanan: id,
            nama_layanan: nama,
            uri: uri,
            referrer: 'RequestList',
            isButton: isButton
        });
    };
    //bottom sheet logic
    // ref
    var bottomSheetModalRef = react_1.useRef(null);
    var scrollCategoryRef = react_1.useRef();
    // variables
    var modalSnapPoints = react_1.useMemo(function () { return ['90%', '90%']; }, []);
    //hooks
    var _b = react_1.useState(0), activeTab = _b[0], setActiveTab = _b[1];
    var _c = react_1["default"].useState(true), visible = _c[0], setVisible = _c[1];
    var _d = react_1.useState(categoryDefault), categoryList = _d[0], setCategoryList = _d[1];
    var _e = react_1.useState(false), refreshing = _e[0], setRefreshing = _e[1];
    var _f = react_1["default"].useState(false), loader = _f[0], setLoader = _f[1];
    var _g = react_1["default"].useState({}), allRequestList = _g[0], setAllRequestList = _g[1];
    var _h = react_1["default"].useState({}), requestedList = _h[0], setRequestedList = _h[1];
    var _j = react_1["default"].useState({}), processedList = _j[0], setProcessedList = _j[1];
    var _k = react_1["default"].useState({}), approvedList = _k[0], setApprovedList = _k[1];
    var _l = react_1["default"].useState({}), confirmedList = _l[0], setConfirmedList = _l[1];
    var _m = react_1["default"].useState({}), doneList = _m[0], setDoneList = _m[1];
    var _o = react_1["default"].useState({}), rejectedList = _o[0], setRejectedList = _o[1];
    var _p = react_1.useState(requestedList), requestList = _p[0], setRequestList = _p[1];
    var _q = react_1.useState(null), detailModal = _q[0], setDetailModal = _q[1];
    var _r = react_1.useState(null), subService = _r[0], setSubService = _r[1];
    var _s = react_1["default"].useState(), updateState = _s[1];
    // callbacks
    //use to force re render
    var forceUpdate = react_1["default"].useCallback(function () { return updateState({}); }, []);
    var handleModalSheetChanges = react_1.useCallback(function (index) {
        if (index < 0) {
            setDetailModal(null);
            setSubService(null);
        }
    }, []);
    var handlePresentModalPress = react_1.useCallback(function (item) {
        var _a;
        console.log(item);
        setLoader(true);
        (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.present();
        setDetailModal(item);
        setSubService(item.subservices);
        forceUpdate();
        setTimeout(function () {
            setLoader(false);
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var onChangeSearch = function (query) {
        var _a;
        var filteredArrays = allRequestList.filter(function (_a) {
            var request_client = _a.request_client, subservices = _a.subservices, nama_bank = _a.nama_bank;
            if (nama_bank) {
                return (request_client.toLowerCase().includes(query.toLowerCase()) ||
                    nama_bank.toLowerCase().includes(query.toLowerCase()) ||
                    subservices.some(function (item) {
                        return item.sub_service_name.toLowerCase().includes(query.toLowerCase());
                    }));
            }
            else {
                return (request_client.toLowerCase().includes(query.toLowerCase()) ||
                    subservices.some(function (item) {
                        return item.sub_service_name.toLowerCase().includes(query.toLowerCase());
                    }));
            }
        });
        isActiveOrNot(0);
        setRequestList(filteredArrays);
        (_a = scrollCategoryRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
            x: 0,
            animated: true
        });
    };
    var isActiveOrNot = function (categoryIndex) {
        var category = __spreadArrays(categoryList);
        category.map(function (category, index) {
            if (index === categoryIndex) {
                category.is_active = true;
                if (category.id === 0) {
                    setRequestList(allRequestList);
                    setActiveTab(0);
                }
                else if (category.id === 1) {
                    setRequestList(requestedList);
                    setActiveTab(1);
                }
                else if (category.id === 2) {
                    setRequestList(processedList);
                    setActiveTab(2);
                }
                else if (category.id === 3) {
                    setRequestList(approvedList);
                    setActiveTab(3);
                }
                else if (category.id === 4) {
                    setRequestList(confirmedList);
                    setActiveTab(4);
                }
                else if (category.id === 5) {
                    setRequestList(doneList);
                    setActiveTab(5);
                }
                else if (category.id === 6) {
                    setRequestList(rejectedList);
                    setActiveTab(6);
                }
            }
            else {
                category.is_active = false;
            }
        });
        setCategoryList(category);
    };
    var populateData = function (state, activeTab) {
        if (requestList.length > 0) {
            setRefreshing(true);
        }
        else {
            setLoader(true);
        }
        var postData = new FormData();
        postData.append('service_type', project_id);
        postData.append('user_id', userData.iduser);
        fetch(apiUrl_1.apiUrl.api + 'listrequest', {
            method: 'POST',
            body: postData
        })
            .then(function (response) { return response.json(); })
            .then(function (json) {
            var requested = _.filter(json.data, ['is_approved', '0']);
            var processed = _.filter(json.data, ['project_status', '1']);
            var approved = _.filter(json.data, ['project_status', '2']);
            var confirmed = _.filter(json.data, function (item) {
                if (item.project_done === '1' &&
                    item.project_status === '2' &&
                    item.subservices.length > 0 &&
                    item.subservices[0].image_url === null) {
                    return item;
                }
            });
            var rejected = _.filter(json.data, ['is_approved', '2']);
            var done = _.filter(json.data, function (item) {
                if (item.is_approved === '1' &&
                    item.project_status === '2' &&
                    item.subservices.length > 0 &&
                    item.subservices[0].image_url) {
                    return item;
                }
            });
            setAllRequestList(json.data);
            if (requested !== undefined) {
                setRequestedList(requested);
            }
            else {
                setRequestedList([]);
            }
            if (processed !== undefined) {
                setProcessedList(processed);
            }
            else {
                setProcessedList([]);
            }
            if (approved !== undefined) {
                setApprovedList(approved);
            }
            else {
                setApprovedList([]);
            }
            if (confirmed !== undefined) {
                setConfirmedList(confirmed);
            }
            else {
                setConfirmedList([]);
            }
            if (done !== undefined) {
                setDoneList(done);
            }
            else {
                setDoneList([]);
            }
            if (rejected !== undefined) {
                setRejectedList(rejected);
            }
            else {
                setRejectedList([]);
            }
            if (state) {
                setRequestList(json.data);
            }
            else {
                if (activeTab === 0) {
                    setRequestList(json.data);
                }
                else if (activeTab === 1) {
                    setRequestList(requested);
                }
                else if (activeTab === 2) {
                    setRequestList(processed);
                }
                else if (activeTab === 3) {
                    setRequestList(approved);
                }
                else if (activeTab === 4) {
                    setRequestList(confirmed);
                }
                else if (activeTab === 5) {
                    setRequestList(done);
                }
                else if (activeTab === 6) {
                    setRequestList(rejected);
                }
            }
        })["catch"](function (error) { return console.error(error); })["finally"](function () {
            setVisible(false);
            setLoader(false);
            setRefreshing(false);
        });
    };
    var onRefresh = react_1["default"].useCallback(function () {
        setVisible(false);
        populateData(null, activeTab);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);
    var onApproval = function () {
        setLoader(true);
        var data = new FormData();
        data.append('id_req', detailModal.id);
        data.append('id_project', detailModal.project_id);
        data.append('id_user', userData.iduser);
        data.append('subservices', JSON.stringify(subService));
        if (subService.length > 0) {
            fetch(apiUrl_1.apiUrl.api + 'serahterimadokumen', {
                method: 'POST',
                body: data,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(function (response) {
                setLoader(false);
                // console.log(response.text());
                response
                    .json()
                    .then(function (dataRes) {
                    if (dataRes.success == true) {
                        react_native_1.Alert.alert('Submit Success', 'Dokumen telah berhasil ditandatangani', [
                            {
                                text: 'OK',
                                onPress: function () {
                                    var _a;
                                    (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.dismiss();
                                    setRefreshing(true);
                                    populateData(true);
                                    isActiveOrNot(0);
                                }
                            },
                        ]);
                    }
                })["catch"](function (error) {
                    react_native_1.Alert.alert('Submit Failed', 'Ada masalah pada server');
                    console.error(error);
                });
            })["catch"](function (error) { return console.error('network error', error); });
        }
        else {
            setLoader(false);
            react_native_1.Alert.alert('Submit Failed', 'Anda belum menambahkan bukti serah terima');
        }
    };
    react_1["default"].useEffect(function () {
        setRefreshing(true);
        populateData(true);
        isActiveOrNot(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);
    // after capture logic
    react_1["default"].useEffect(function () {
        if (item_capture && subservice_data) {
            var tempSubservices_1 = [];
            subService.map(function (item) {
                if (item.sub_service_id === subservice_data.sub_service_id) {
                    item = subservice_data;
                }
                tempSubservices_1.push(item);
            });
            setSubService(tempSubservices_1);
            setDetailModal(item_capture);
            // forceUpdate();
            // handlePresentModalPress(item_capture);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item_capture, subservice_data]);
    //jsx logic
    var getCashIcon = function (payment) {
        if (payment === '0') {
            return 'account-cash-outline';
        }
        else if (payment === '1') {
            return 'cash-multiple';
        }
        else if (payment === '2') {
            return 'cash-remove';
        }
    };
    var getStatusIcon = function (item) {
        if (item.is_approved === '0') {
            return {
                icon: 'clipboard-arrow-right-outline',
                color: theme_1.theme.colors.secondary
            };
        }
        else if (item.is_approved === '1') {
            if (item.project_status === '1') {
                return {
                    icon: 'clipboard-arrow-up-outline',
                    color: '#3E7BFA'
                };
            }
            else if (item.project_status === '2') {
                if (item.subservices.length > 0 && item.subservices[0].image_url) {
                    return {
                        icon: 'clipboard-file-outline',
                        color: '#A8ADAF'
                    };
                }
                else {
                    return {
                        icon: 'clipboard-check-outline',
                        color: theme_1.theme.colors.primary
                    };
                }
            }
        }
        else if (item.is_approved === '2') {
            return {
                icon: 'clipboard-arrow-left-outline',
                color: '#FF616D'
            };
        }
        else {
            return {
                icon: 'clipboard-arrow-right-outline',
                color: theme_1.theme.colors.secondary
            };
        }
    };
    return (react_1["default"].createElement(bottom_sheet_1.BottomSheetModalProvider, null,
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].background },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headerContainer },
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].iconHeader },
                    react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "arrow-left", size: 30, color: "#ffffff", onPress: function () { return onBack(); } })),
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].titleScreen },
                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerText }, "Daftar Request"))),
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerText }, project_name))),
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].bottomSheetContainer },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].sheetContainer },
                react_1["default"].createElement(react_native_loading_spinner_overlay_1["default"], { visible: loader, 
                    // textContent={'Loading...'}
                    textStyle: styles_1["default"].spinnerTextStyle }),
                react_1["default"].createElement(react_native_1.View, { style: { flex: 1, width: '100%' } },
                    react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, { fadingEdgeLength: 30, style: styles_1["default"].categoryListContainer, horizontal: true, ref: scrollCategoryRef, pagingEnabled: true, showsHorizontalScrollIndicator: false }, categoryList.map(function (category, index) {
                        return (react_1["default"].createElement(react_native_1.TouchableOpacity, { style: category.is_active
                                ? [
                                    styles_1["default"].categoryPill,
                                    { backgroundColor: 'rgba(249, 168, 38, 0.1)' },
                                ]
                                : [styles_1["default"].categoryPill], key: category.id, onPress: function () {
                                isActiveOrNot(index);
                            }, underlayColor: theme_1.theme.colors.secondary },
                            react_1["default"].createElement(react_native_1.View, { key: category.id },
                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].categoryText }, category.name))));
                    })),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].listContainer },
                        react_1["default"].createElement(react_native_paper_1.Searchbar, { placeholder: "Cari request", style: styles_1["default"].searchbar, inputStyle: styles_1["default"].searchbarInput, onChangeText: onChangeSearch, theme: {
                                colors: {
                                    placeholder: theme_1.theme.colors.placeholder,
                                    primary: theme_1.theme.colors.primary,
                                    underlineColor: theme_1.theme.colors.underlineColor,
                                    background: theme_1.theme.colors.background
                                }
                            } }),
                        requestList.length > 0 ? (react_1["default"].createElement(react_native_1.FlatList, { fadingEdgeLength: 30, data: requestList, keyExtractor: function (item) { return item.id.toString(); }, enabled: true, refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, { refreshing: refreshing, onRefresh: function () { return onRefresh(); } }), renderItem: function (_a) {
                                var item = _a.item, index = _a.index;
                                return (react_1["default"].createElement(react_1["default"].Fragment, { key: 'status' + item.id.toString() + index },
                                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].topListContainer },
                                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headerListContainer, key: 'headerlist' + item.id.toString() + index },
                                            item.is_approved === '0' ? (react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].statusListTextWarning }, "Diajukan")) : null,
                                            item.is_approved === '2' ? (react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].statusListTextDanger }, "Ditolak")) : null,
                                            item.is_approved === '1' &&
                                                item.project_status === '1' ? (react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].statusListTextInfo }, "Diproses")) : null,
                                            (item.is_approved === '1' &&
                                                item.project_status === '2' &&
                                                item.subservices.length > 0 &&
                                                !item.subservices[0].image_url) ||
                                                (item.is_approved === '1' &&
                                                    item.project_status === '2' &&
                                                    !item.subservices.length > 0) ? (react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].statusListTextSuccess }, "Disetujui")) : null,
                                            item.is_approved === '1' &&
                                                item.project_status === '2' &&
                                                item.subservices.length > 0 &&
                                                item.subservices[0].image_url ? (react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].statusListTextMute }, "Selesai")) : null),
                                        project_id === '1' ? (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].topTextContainer, key: 'headertext' + item.id.toString() + index },
                                            react_1["default"].createElement(react_native_paper_1.IconButton, { style: styles_1["default"].postDateIcon, icon: "bank-outline", color: '#7b7e80', size: 14 }),
                                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].postDateText }, item.nama_bank || 'Bank tidak tersedia'))) : ([
                                            item.request_payment ? (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].topTextContainer, key: 'headertext' + item.id.toString() + index },
                                                react_1["default"].createElement(react_native_paper_1.IconButton, { style: styles_1["default"].postDateIcon, icon: getCashIcon(item.request_payment), color: '#7b7e80', size: 14 }),
                                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].postDateText }, item.request_payment === '0'
                                                    ? 'DP/Uang Muka'
                                                    : [
                                                        item.request_payment === '1'
                                                            ? 'Lunas'
                                                            : 'Belum melakukan pembayaran',
                                                    ]))) : null,
                                        ])),
                                    react_1["default"].createElement(react_native_paper_1.List.Item, { key: 'item' + item.id.toString() + index, title: item.request_client || 'Klien tidak tersedia', description: react_1["default"].createElement(react_1["default"].Fragment, null,
                                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText },
                                                [
                                                    item.subservices &&
                                                        item.subservices.length > 0
                                                        ? item.subservices
                                                            .map(function (doc) { return doc.sub_service_name; })
                                                            .join('  •  ')
                                                        : 'Layanan tidak tersedia',
                                                ] +
                                                    '\nRequest : ' +
                                                    [
                                                        item.request_name ||
                                                            'Request tidak tersedia',
                                                    ] +
                                                    '\n',
                                                react_1["default"].createElement(react_native_1.Text, { style: { fontWeight: 'bold' } }, 'Diposting : ' +
                                                    moment_1["default"](item.created_at).format('DD-MM-YYYY kk:mm:ss')))), descriptionNumberOfLines: 7, titleStyle: react_native_1.Platform.OS === 'ios'
                                            ? [styles_1["default"].titleListText, { fontWeight: 'bold' }]
                                            : styles_1["default"].titleListText, left: function (props) {
                                            return (react_1["default"].createElement(react_native_paper_1.IconButton, __assign({}, props, { style: styles_1["default"].requestItem, icon: getStatusIcon(item).icon, color: getStatusIcon(item).color, size: 28 })));
                                        }, right: function (props) { return (react_1["default"].createElement(react_native_paper_1.List.Icon, __assign({}, props, { icon: "chevron-right", color: "#D3DCE6" }))); }, onPress: function () {
                                            if (item.project_status === '2' ||
                                                item.is_approved === '2') {
                                                handlePresentModalPress(item);
                                            }
                                            else {
                                                onCreateRequest(item);
                                            }
                                        } })));
                            } })) : (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].emptyStateContainer },
                            react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/empty_list_req.png'), style: styles_1["default"].image }),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].emptyStateTitle }, "Data tidak ditemukan"),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].emptyStateText }, "Data pekerjaan belum tersedia untuk saat ini")))))),
            react_1["default"].createElement(bottom_sheet_1.BottomSheetModal, { ref: bottomSheetModalRef, index: 1, snapPoints: modalSnapPoints, backdropComponent: bottom_sheet_1.BottomSheetBackdrop, onChange: handleModalSheetChanges }, detailModal ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].modalContentContainer },
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].scrollListContainer },
                        react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, { fadingEdgeLength: 30, contentContainerstyle: styles_1["default"].documentScrollView },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerModalText }, "Nama Klien"),
                            react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { marginBottom: 10 }] }, detailModal.request_client),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerModalText }, "Kontak Klien"),
                            react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { marginBottom: 10 }] }, detailModal.request_contact || 'Tidak ada kontak'),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerModalText }, "Nama Bank"),
                            react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { marginBottom: 10 }] }, detailModal.nama_bank || 'Tidak ada bank'),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerModalText }, "Nama Order"),
                            react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { marginBottom: 10 }] }, detailModal.request_name),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerModalText }, "Catatan Order"),
                            react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { marginBottom: 10 }] }, detailModal.keterangan || 'Tidak ada catatan'),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerModalText }, "Detail Biaya"),
                            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                                react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { width: 150 }] }, "Biaya Order :"),
                                react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText] }, detailModal.request_payment_amount
                                    ? 'Rp ' + detailModal.request_payment_amount
                                    : 'Tidak ada biaya')),
                            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                                react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { width: 150 }] }, "Biaya BPN :"),
                                react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText] }, detailModal.request_payment_amount
                                    ? 'Rp ' + detailModal.request_payment_amount
                                    : 'Tidak ada biaya')),
                            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                                react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { width: 150 }] }, "Biaya Notaris :"),
                                react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText] }, detailModal.request_payment_amount
                                    ? 'Rp ' + detailModal.request_payment_amount
                                    : 'Tidak ada biaya')),
                            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                                react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { width: 150 }] }, "Biaya Plafond Awal :"),
                                react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText] }, detailModal.request_payment_amount
                                    ? 'Rp ' + detailModal.request_payment_amount
                                    : 'Tidak ada biaya')),
                            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row' } },
                                react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].subHeaderModalText, { width: 150 }] }, "Biaya Plafond Akhir :"),
                                react_1["default"].createElement(react_native_1.Text, { style: [
                                        styles_1["default"].subHeaderModalText,
                                        { marginBottom: 10 },
                                    ] }, detailModal.request_payment_amount
                                    ? 'Rp ' + detailModal.request_payment_amount
                                    : 'Tidak ada biaya')),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerModalText }, "Histori"),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].muteHeaderModalText }, '• Diposting pada ' + detailModal.created_at),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].muteHeaderModalText }, detailModal.is_approved === '2'
                                ? '• Ditolak pada ' + detailModal.approved_at
                                : '• Disetujui pada ' + detailModal.approved_at),
                            react_1["default"].createElement(react_native_1.View, { style: { height: 20 } })))),
                react_1["default"].createElement(react_native_1.View, { style: [styles_1["default"].modalContentContainer, { flex: 1.5 }] },
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].innerSheetContainer },
                        react_1["default"].createElement(react_native_1.View, { style: [styles_1["default"].textContainerHeader] },
                            react_1["default"].createElement(react_native_1.Text, { style: [
                                    styles_1["default"].sheetTitle,
                                    { color: 'white', marginTop: 10 },
                                ] }, "Jenis Layanan")),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].scrollListContainer },
                            react_1["default"].createElement(react_native_inset_shadow_1["default"], { left: false, right: false, top: false, shadowRadius: 20, shadowOpacity: 0.6, elevation: 20 },
                                react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, { fadingEdgeLength: 20, style: styles_1["default"].documentScrollView, contentContainerStyle: { flexGrow: 1 }, refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, { refreshing: refreshing, onRefresh: onRefresh }) },
                                    subService.length > 0 && subService[0].image_url ? (react_1["default"].createElement(react_native_1.View, { key: "scrolltextcontainer", style: styles_1["default"].scrollTextContainerHeader },
                                        react_1["default"].createElement(react_native_1.Text, { style: [
                                                styles_1["default"].muteHeaderModalText,
                                                { color: 'white' },
                                            ] }, "Sudah melakukan serah terima"))) : ([
                                        detailModal.project_done === '1' ? (react_1["default"].createElement(react_native_1.View, { key: "scrolltextcontainerheader", style: styles_1["default"].scrollTextContainerHeader },
                                            react_1["default"].createElement(react_native_1.Text, { style: [
                                                    styles_1["default"].muteHeaderModalText,
                                                    { color: 'white' },
                                                ] }, "Ketuk nama layanan untuk menambah bukti serah terima"),
                                            react_1["default"].createElement(react_native_1.Text, { style: [
                                                    styles_1["default"].muteHeaderModalText,
                                                    { color: 'white' },
                                                ] }, "* Semua layanan harus memiliki bukti serah terima untuk dapat dikirim"))) : (react_1["default"].createElement(react_native_1.View, { key: "scrolltextcontainerheader", style: styles_1["default"].scrollTextContainerHeader },
                                            react_1["default"].createElement(react_native_1.Text, { style: [
                                                    styles_1["default"].muteHeaderModalText,
                                                    { color: 'white' },
                                                ] }, "Order ini belum bisa menerima upload bukti serah terima"))),
                                    ]),
                                    subService
                                        ? subService.map(function (item, index) { return (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].documentListContainer, key: 'viewcontainer' + index },
                                            react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles_1["default"].documentLabelContainer, key: 'touch' +
                                                    item.sub_service_id.toString() +
                                                    index, onPress: function () {
                                                    if (item.image_url) {
                                                        onUploadPhoto(detailModal, item.sub_service_id, item.sub_service_name, item.tempUri, false);
                                                    }
                                                    else {
                                                        if (detailModal.project_done === '1') {
                                                            onUploadPhoto(detailModal, item.sub_service_id, item.sub_service_name, item.tempUri, true);
                                                        }
                                                        else {
                                                            react_native_1.Alert.alert('Peringatan', 'Anda belum bisa mengupload bukti serah terima');
                                                        }
                                                    }
                                                } },
                                                react_1["default"].createElement(react_native_1.Text, { key: 'txt' +
                                                        item.sub_service_id.toString() +
                                                        index, style: styles_1["default"].checkboxDocumentLabel }, item.sub_service_name)),
                                            react_1["default"].createElement(react_native_paper_1.Divider, { styles: { width: '80%' } }),
                                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].checkboxFileLabel }, item.fileName || item.image_url
                                                ? item.fileName || item.image_url
                                                : '* Bukti serah terima belum tersedia'))); })
                                        : null))),
                        _.filter(subService, function (o) {
                            return o.img64 !== undefined;
                        }).length === subService.length ? (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].submitButtonContainer },
                            react_1["default"].createElement(react_native_paper_1.Button, { mode: "contained", onPress: onApproval, labelStyle: [styles_1["default"].buttonSubmitLabel], style: styles_1["default"].buttonSubmit }, loader ? 'Mengirimkan..' : 'Kirim Bukti Serah Terima'))) : null)))) : null)),
        react_1["default"].createElement(react_native_paper_1.Snackbar, { visible: visible, style: { backgroundColor: '#F6F8FA' }, theme: { colors: { surface: '#263238', accent: theme_1.theme.colors.primary } }, onDismiss: function () {
                setVisible(false);
            }, action: {
                label: 'Ok',
                onPress: function () {
                    (function () {
                        onRefresh();
                    });
                }
            } }, "Tarik ke bawah untuk me-refresh daftar")));
};
exports["default"] = RequestList;
