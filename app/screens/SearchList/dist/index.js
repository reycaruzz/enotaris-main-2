"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("./styles");
var apiUrl_1 = require("app/core/apiUrl");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var NavigationService_1 = require("app/navigation/NavigationService");
var react_native_loading_spinner_overlay_1 = require("react-native-loading-spinner-overlay");
var SearchList = function (_a) {
    var route = _a.route;
    //param config
    var item = route !== undefined ? route.params.item : null;
    var list_type = route !== undefined ? route.params.list_type : null;
    var type_id = route !== undefined ? route.params.type_id : null;
    var id_kelengkapan = route !== undefined ? route.params.id_kelengkapan : null;
    var title = route !== undefined ? route.params.title : null;
    //user data
    var userData = react_redux_1.useSelector(function (state) { return state.loginReducer.userData; });
    //navigation service
    var onBack = function () { return NavigationService_1["default"].goBack(); };
    var onCreateRequest = function (item_id, item_name) {
        if (list_type === 'sub-service') {
            NavigationService_1["default"].navigate('CreateRequest', {
                sub_service: {
                    sub_service_id: item_id,
                    sub_service_name: item_name
                }
            });
        }
        else if (list_type === 'document') {
            NavigationService_1["default"].navigate('CreateRequest', {
                item: item,
                id_kelengkapan: id_kelengkapan,
                id_document: item_id,
                document_data: {
                    id: id_kelengkapan,
                    id_user: userData.iduser,
                    id_document: item_id,
                    document_name: item_name,
                    img64: null,
                    latitude: null,
                    longitude: null,
                    timestamp: null,
                    fileName: null,
                    desc: null
                }
            });
        }
        else if (list_type === 'bank') {
            NavigationService_1["default"].navigate('CreateRequest', {
                bank: {
                    bank_id: item_id,
                    bank_name: item_name
                }
            });
        }
        else if (list_type === 'jenis_perbankan') {
            NavigationService_1["default"].navigate('CreateRequest', {
                jenis: {
                    jenis_id: item_id,
                    jenis_name: item_name
                }
            });
        }
        else if (list_type === 'order') {
            route.params.item({ order_id: item_id, order_item: item_name });
            onBack();
        }
        else if (list_type === 'appointment_bank') {
            route.params.item({ bank_id: item_id, bank_name: item_name });
            onBack();
        }
    };
    //Hooks
    var _b = react_1.useState(false), refreshing = _b[0], setRefreshing = _b[1];
    var _c = react_1.useState([]), allList = _c[0], setAllList = _c[1];
    var _d = react_1.useState([]), searchList = _d[0], setSearchList = _d[1];
    var _e = react_1["default"].useState(false), loader = _e[0], setLoader = _e[1];
    // callbacks
    var populateData = function () {
        setLoader(true);
        setRefreshing(true);
        var url = '';
        var reqData = new FormData();
        var postObj = null;
        if (list_type === 'sub-service') {
            reqData.append('type', type_id);
            url = apiUrl_1.apiUrl.api + 'servicedetail';
            postObj = {
                method: 'POST',
                body: reqData
            };
        }
        else if (list_type === 'document') {
            reqData.append('service_id', type_id);
            url = apiUrl_1.apiUrl.api + 'refdokumen';
            postObj = {
                method: 'POST',
                body: reqData
            };
        }
        else if (list_type === 'jenis_perbankan') {
            url = apiUrl_1.apiUrl.api + 'refjenisperbankan';
        }
        else if (list_type === 'order') {
            reqData.append('user_id', userData.iduser);
            url = apiUrl_1.apiUrl.api + 'listrequest';
            postObj = {
                method: 'POST',
                body: reqData
            };
        }
        else if (list_type === 'bank' || list_type === 'appointment_bank') {
            url = apiUrl_1.apiUrl.api + 'refbank';
        }
        fetch(url, postObj).then(function (response) {
            // console.log(response.text());
            response
                .json()
                .then(function (data) {
                setAllList(data.data);
                setSearchList(data.data);
            })["catch"](function (error) { return console.error(error); })["finally"](function () {
                setLoader(false);
                setRefreshing(false);
            });
        });
    };
    var onChangeSearch = function (query) {
        var filteredArrays = [];
        if (list_type === 'sub-service') {
            filteredArrays = allList.filter(function (_a) {
                var detail_name = _a.detail_name;
                return detail_name.toLowerCase().includes(query.toLowerCase());
            });
        }
        else if (list_type === 'document') {
            filteredArrays = allList.filter(function (_a) {
                var nama_dokumen = _a.nama_dokumen;
                return nama_dokumen.toLowerCase().includes(query.toLowerCase());
            });
        }
        else if (list_type === 'jenis_perbankan') {
            filteredArrays = allList.filter(function (_a) {
                var nama = _a.nama;
                return nama.toLowerCase().includes(query.toLowerCase());
            });
        }
        else if (list_type === 'order') {
            filteredArrays = allList.filter(function (_a) {
                var nama_bank = _a.nama_bank, request_client = _a.request_client;
                return (nama_bank.toLowerCase().includes(query.toLowerCase()) ||
                    request_client.toLowerCase().includes(query.toLowerCase()));
            });
        }
        else if (list_type === 'bank' || list_type === 'appointment_bank') {
            filteredArrays = allList.filter(function (_a) {
                var nama_bank = _a.nama_bank;
                return nama_bank.toLowerCase().includes(query.toLowerCase());
            });
        }
        setSearchList(filteredArrays);
    };
    var onRefresh = react_1["default"].useCallback(function () {
        setRefreshing(true);
        populateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    react_1["default"].useEffect(function () {
        setRefreshing(true);
        populateData(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].background },
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headerContainer },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].iconHeader },
                react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "arrow-left", size: 30, color: "#ffffff", onPress: function () { return onBack(); } })),
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerText },
                    "Pilih ",
                    title))),
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].bottomSheetContainer },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].sheetContainer },
                react_1["default"].createElement(react_native_loading_spinner_overlay_1["default"], { visible: loader, 
                    // textContent={'Memuat data...'}
                    textStyle: styles_1["default"].spinnerTextStyle }),
                react_1["default"].createElement(react_native_1.View, { style: { flex: 1, width: '100%' } },
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].listContainer },
                        react_1["default"].createElement(react_native_paper_1.Searchbar, { placeholder: 'Cari ' + title, style: styles_1["default"].searchbar, inputStyle: styles_1["default"].searchbarInput, onChangeText: onChangeSearch, theme: {
                                colors: {
                                    placeholder: '#A8ADAF',
                                    primary: '#3E7BFA',
                                    underlineColor: '#3E7BFA',
                                    background: '#F6F8FA'
                                }
                            } }),
                        searchList.length > 0 ? (react_1["default"].createElement(react_native_1.FlatList, { fadingEdgeLength: 30, data: searchList, keyExtractor: function (item) { return item.id.toString(); }, refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, { refreshing: refreshing, onRefresh: onRefresh }), renderItem: function (_a) {
                                var item = _a.item;
                                if (list_type === 'sub-service') {
                                    return (react_1["default"].createElement(react_native_paper_1.List.Item, { title: item.detail_name, key: item.id.toString(), onPress: function () {
                                            onCreateRequest(item.id, item.detail_name);
                                        }, titleStyle: styles_1["default"].listText }));
                                }
                                else if (list_type === 'document') {
                                    return (react_1["default"].createElement(react_native_paper_1.List.Item, { title: item.nama_dokumen, key: item.id.toString(), onPress: function () {
                                            onCreateRequest(item.id, item.nama_dokumen);
                                        }, titleStyle: styles_1["default"].listText }));
                                }
                                else if (list_type === 'jenis_perbankan') {
                                    return (react_1["default"].createElement(react_native_paper_1.List.Item, { title: item.nama, key: item.id.toString(), onPress: function () {
                                            onCreateRequest(item.id, item.nama);
                                        }, titleStyle: styles_1["default"].listText }));
                                }
                                else if (list_type === 'order') {
                                    return (react_1["default"].createElement(react_native_paper_1.List.Item, { title: item.request_client, description: item.nama_bank, key: item.id.toString(), onPress: function () {
                                            onCreateRequest(item.id, item);
                                        }, titleStyle: styles_1["default"].listText }));
                                }
                                else if (list_type === 'bank' ||
                                    list_type === 'appointment_bank') {
                                    return (react_1["default"].createElement(react_native_paper_1.List.Item, { title: item.nama_bank, key: item.id.toString(), onPress: function () {
                                            onCreateRequest(item.id, item.nama_bank);
                                        }, titleStyle: styles_1["default"].listText }));
                                }
                            } })) : (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].emptyStateContainer },
                            react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/empty_list_req.png'), style: styles_1["default"].image }),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].emptyStateTitle }, "Data tidak ditemukan"),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].emptyStateText }, "List data belum tersedia")))))))));
};
exports["default"] = SearchList;
