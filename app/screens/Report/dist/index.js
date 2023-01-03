"use strict";
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
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var theme_1 = require("app/core/theme");
var react_native_loading_spinner_overlay_1 = require("react-native-loading-spinner-overlay");
var NavigationService_1 = require("app/navigation/NavigationService");
var moment_1 = require("moment");
require("moment/locale/id");
moment_1["default"].locale('id');
var _ = require('lodash');
var categoryService = [
    {
        id: 0,
        name: 'SEMUA',
        is_active: true,
        label: 'Semua',
        value: 0
    },
    {
        id: 1,
        name: 'PERBANKAN',
        is_active: false,
        img_url: apiUrl_1.apiUrl.assets + 'img/bank.png',
        label: 'Perbankan',
        value: 1
    },
    {
        id: 2,
        name: 'NOTARIS',
        is_active: false,
        img_url: apiUrl_1.apiUrl.assets + 'img/kumham.png',
        label: 'Notaris',
        value: 2
    },
    {
        id: 3,
        name: 'PPAT',
        is_active: false,
        img_url: apiUrl_1.apiUrl.assets + 'img/name.png',
        label: 'PPAT',
        value: 3
    },
];
function truncate(str, no_words) {
    return str.split(' ').splice(0, no_words).join(' ');
}
var Report = function (_a) {
    //navigation service
    var onBack = function () { return NavigationService_1["default"].goBack(); };
    var onDetail = function (item) {
        NavigationService_1["default"].navigate('DetailPegawai', { item: item });
    };
    var populateData = function () {
        setLoader(true);
        fetch(apiUrl_1.apiUrl.api + 'listrequestresume')
            .then(function (response) {
            // console.log(response.text());
            response
                .json()
                .then(function (data) {
                // console.log(data.data);
                setAllUser(data.data);
                setUserList(data.data);
            })["catch"](function (error) { return console.error(error); })["finally"](function () {
                setLoader(false);
                setRefreshing(false);
            });
        })["catch"](function (error) { return console.error(error); });
    };
    // ref
    var scrollCategoryRef = react_1.useRef();
    //Hooks
    var _b = react_1.useState(false), refreshing = _b[0], setRefreshing = _b[1];
    var _c = react_1.useState(false), loader = _c[0], setLoader = _c[1];
    var _d = react_1.useState(categoryService), serviceTypeList = _d[0], setServiceTypeList = _d[1];
    var _e = react_1.useState(0), categoryId = _e[0], setCategoryId = _e[1];
    var _f = react_1.useState({}), allUser = _f[0], setAllUser = _f[1];
    var _g = react_1.useState([]), userList = _g[0], setUserList = _g[1];
    //callbacks
    var setServiceTypeActive = function (categoryIndex) {
        var category = __spreadArrays(serviceTypeList);
        category.map(function (category, index) {
            if (index === categoryIndex) {
                // populateData(true, category.id);
                category.is_active = true;
                if (category.id === 0) {
                    setUserList(allUser);
                    setCategoryId(0);
                }
                else if (category.id === 1) {
                    setUserList(_.filter(allUser, ['service_id', '1']));
                    setCategoryId(1);
                }
                else if (category.id === 2) {
                    setUserList(_.filter(allUser, ['service_id', '2']));
                    setCategoryId(2);
                }
                else if (category.id === 3) {
                    setUserList(_.filter(allUser, ['service_id', '3']));
                    setCategoryId(3);
                }
            }
            else {
                category.is_active = false;
            }
        });
        setServiceTypeList(category);
    };
    var onChangeSearch = function (query) {
        setServiceTypeActive(0);
        var filteredArrays = allUser.filter(function (_a) {
            var roleuser = _a.roleuser, nama = _a.nama;
            return (nama.toLowerCase().includes(query.toLowerCase()) ||
                roleuser.toLowerCase().includes(query.toLowerCase()));
        });
        setUserList(filteredArrays);
    };
    var onRefresh = react_1["default"].useCallback(function () {
        setRefreshing(true);
        populateData(false, categoryId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);
    react_1["default"].useEffect(function () {
        setRefreshing(true);
        populateData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].background },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headerContainer },
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].iconHeader },
                    react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "arrow-left", size: 30, color: '#FFFFFF', onPress: function () { return onBack(); } })),
                react_1["default"].createElement(react_native_1.View, { style: [
                        styles_1["default"].textContainerHeader,
                        { marginTop: 12, marginLeft: 8 },
                    ] },
                    react_1["default"].createElement(react_native_1.Text, { style: react_native_1.Platform.OS === 'ios'
                            ? [styles_1["default"].headerMenuText, { fontWeight: 'bold' }]
                            : styles_1["default"].headerMenuText }, "REPORT"))),
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].searchbarContainer },
                react_1["default"].createElement(react_native_paper_1.Searchbar, { placeholder: "Cari Pegawai", style: styles_1["default"].searchbar, inputStyle: styles_1["default"].searchbarInput, onChangeText: onChangeSearch, theme: {
                        colors: {
                            placeholder: theme_1.theme.colors.placeholder,
                            primary: theme_1.theme.colors.primary,
                            underlineColor: theme_1.theme.colors.underlineColor,
                            background: theme_1.theme.colors.background
                        }
                    } })),
            react_1["default"].createElement(react_native_1.ScrollView, { fadingEdgeLength: 30, style: styles_1["default"].categoryListContainer, horizontal: true, ref: scrollCategoryRef, showsHorizontalScrollIndicator: false }, serviceTypeList.map(function (category, index) {
                return (react_1["default"].createElement(react_native_1.TouchableOpacity, { style: category.is_active
                        ? [
                            styles_1["default"].categoryPill,
                            {
                                borderWidth: 3,
                                borderColor: theme_1.theme.colors.secondary
                            },
                        ]
                        : [styles_1["default"].categoryPill], key: category.id, onPress: function () {
                        setServiceTypeActive(index);
                    }, underlayColor: theme_1.theme.colors.secondary },
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].categoryItemContainer, key: category.id },
                        index > 0 ? (react_1["default"].createElement(react_native_1.Image, { source: { uri: category.img_url }, style: styles_1["default"].serviceImage })) : null,
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].categoryText }, category.name))));
            }))),
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].bottomSheetContainer },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].sheetContainer },
                react_1["default"].createElement(react_native_loading_spinner_overlay_1["default"], { visible: loader, 
                    // textContent={'Loading...'}
                    textStyle: styles_1["default"].spinnerTextStyle }),
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].jobListContainer },
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headingTextContainer },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerText }, "Pegawai")),
                    userList.length > 0 ? (react_1["default"].createElement(react_native_1.FlatList, { fadingEdgeLength: 30, data: userList, keyExtractor: function (item, index) { return index.toString(); }, style: { width: '100%', marginTop: 10 }, refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, { refreshing: refreshing, onRefresh: onRefresh }), renderItem: function (_a) {
                            var item = _a.item, index = _a.index;
                            var service = categoryService[item.service_id];
                            return (react_1["default"].createElement(react_native_1.TouchableOpacity, { key: 'pengumuman' + index, style: styles_1["default"].pengumumanContainer, onPress: function () {
                                    onDetail(item);
                                } },
                                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].imageRowContainer },
                                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].profileImageContainer },
                                        react_1["default"].createElement(react_native_1.Image, { source: {
                                                uri: item.pic ? item.pic : null
                                            }, style: styles_1["default"].profilImage, resizeMode: "cover" })),
                                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].profileImageStatus },
                                        react_1["default"].createElement(react_native_1.Image, { source: { uri: service.img_url }, style: styles_1["default"].serviceIcon }))),
                                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].pengumumanContentContainer },
                                    react_1["default"].createElement(react_native_1.Text, { numberOfLines: 1, ellipsizeMode: "tail", style: styles_1["default"].titleHeaderText }, truncate(item.nama, 2)),
                                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, item.roleuser)),
                                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].requestCountContainer },
                                    react_1["default"].createElement(react_native_1.Text, { style: [
                                            styles_1["default"].headerText,
                                            { color: theme_1.theme.colors.primary },
                                        ] }, item.task_detail[0].task_done),
                                    react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].headerText, { fontSize: 9 }] }, "Task")),
                                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].requestCountContainer },
                                    react_1["default"].createElement(react_native_1.Text, { style: [
                                            styles_1["default"].headerText,
                                            { color: theme_1.theme.colors.primary },
                                        ] }, item.resume_detail[0].done),
                                    react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].headerText, { fontSize: 9 }] }, "Request")),
                                item.task_detail[0].task_done_today &&
                                    item.task_detail[0].task_done_today !== '0' && (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].taskTodayStatusContainer },
                                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].taskTodayStatus }, item.task_detail[0].task_done_today)))));
                        } })) : (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].emptyStateContainer },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].emptyStateTitle }, "Data tidak ditemukan"),
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].emptyStateText }, "Anda tidak memiliki akses"))))))));
};
exports["default"] = Report;
