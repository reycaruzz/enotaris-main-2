"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("./styles");
var apiUrl_1 = require("app/core/apiUrl");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var theme_1 = require("app/core/theme");
var NavigationService_1 = require("app/navigation/NavigationService");
var react_redux_1 = require("react-redux");
var react_native_calendar_strip_1 = require("react-native-calendar-strip");
var react_native_simple_time_picker_1 = require("react-native-simple-time-picker");
var react_native_text_ticker_1 = require("react-native-text-ticker");
var react_native_switch_selector_1 = require("react-native-switch-selector");
var moment_1 = require("moment");
require("moment/locale/id");
moment_1["default"].locale('id');
//redux
var mainActions = require("app/store/actions/mainActions");
var resume = [
    { id: 0, name: 'Request', icon: 'clipboard-check' },
    { id: 1, name: 'Job', icon: 'clipboard-text' },
];
var Dashboard = function (_a) {
    var dispatch = react_redux_1.useDispatch();
    //fetch user data
    var userData = react_redux_1.useSelector(function (state) { return state.loginReducer.userData; });
    var runningTextData = react_redux_1.useSelector(function (state) { return state.mainReducer.runningText; });
    //refs
    var bankInput = react_1.useRef(null);
    var orderInput = react_1.useRef(null);
    //navigation service
    var onProfile = function (show_button) {
        return NavigationService_1["default"].navigate('Profile', {
            show_button: show_button
        });
    };
    var onSelect = function (data) {
        bankInput.current.blur();
        if (bankInput.current.isFocused()) {
            bankInput.current.blur();
        }
        setBank({
            bank_id: data.bank_id,
            bank_name: data.bank_name
        });
    };
    var onSelectOrder = function (data) {
        orderInput.current.blur();
        if (orderInput.current.isFocused()) {
            orderInput.current.blur();
        }
        setOrderId(data.order_id);
        setOrder({
            order_id: data.order_id,
            order_item: data.order_item,
            order_name: data.order_item.request_name,
            request_service_name: data.order_item.request_service_name,
            request_service_id: data.order_item.request_service_id,
            request_kredit_id: data.order_item.request_kredit_id,
            nama_kredit: data.order_item.nama_kredit,
            request_plafond_awal: data.order_item.request_plafond_awal,
            request_plafond_akhir: data.order_item.request_plafond_akhir
        });
        setBank({
            bank_id: data.order_item.id_bank,
            bank_name: data.order_item.nama_bank
        });
        setKlien(data.order_item.request_client);
    };
    var onSearchList = function (item, listType, id, title) {
        var select = onSelect;
        if (listType === 'appointment_bank') {
            select = onSelect;
        }
        else if (listType === 'order') {
            select = onSelectOrder;
        }
        NavigationService_1["default"].navigate('SearchList', {
            item: select,
            list_type: listType,
            type_id: null,
            id_kelengkapan: id,
            title: title
        });
    };
    //bottom sheet logic
    //refs
    var calendarStripRef = react_1.useRef(null);
    //state hooks
    var _b = react_1["default"].useState(false), loader = _b[0], setLoader = _b[1];
    var _c = react_1["default"].useState(false), visible = _c[0], setVisible = _c[1];
    var _d = react_1["default"].useState(false), detailVisible = _d[0], setDetailVisible = _d[1];
    var _e = react_1.useState(false), refreshing = _e[0], setRefreshing = _e[1];
    var _f = react_1.useState(true), isOrder = _f[0], setIsOrder = _f[1];
    //data hooks
    var _g = react_1.useState([]), appointmentList = _g[0], setAppointmentList = _g[1];
    var _h = react_1.useState([]), markedDates = _h[0], setMarkedDates = _h[1];
    var _j = react_1.useState([]), requestResume = _j[0], setRequestResume = _j[1];
    var _k = react_1.useState([]), jobResume = _k[0], setJobResume = _k[1];
    //formHooks
    var _l = react_1.useState(), tanggal = _l[0], setTanggal = _l[1];
    var _m = react_1.useState(''), orderId = _m[0], setOrderId = _m[1];
    var _o = react_1.useState(''), klien = _o[0], setKlien = _o[1];
    var _p = react_1.useState(''), catatan = _p[0], setCatatan = _p[1];
    var _q = react_1.useState({
        bank_id: null,
        bank_name: null
    }), bank = _q[0], setBank = _q[1];
    var _r = react_1.useState({
        order_id: null,
        order_name: null
    }), order = _r[0], setOrder = _r[1];
    var _s = react_1.useState({ hour: 0, minute: 0 }), jam = _s[0], setJam = _s[1];
    var _t = react_1.useState(), detailJadwal = _t[0], setDetailJadwal = _t[1];
    var onSubmit = function () {
        setLoader(true);
        var data = new FormData();
        data.append('id_user', userData.iduser);
        data.append('klien', titleCase(klien));
        data.append('id_order', orderId);
        data.append('bank', bank.bank_id);
        data.append('catatan', catatan);
        data.append('time', tanggal + ' ' + jam.hour + ':' + jam.minute + ':00');
        if (klien !== '' || tanggal !== '') {
            fetch(apiUrl_1.apiUrl.api + 'appointment', {
                method: 'POST',
                body: data
            })
                .then(function (response) {
                setLoader(false);
                response
                    .json()
                    .then(function (dataRes) {
                    if (dataRes.success == true) {
                        react_native_1.Alert.alert('Submit Success', 'Jadwal berhasil ditambahkan', [
                            {
                                text: 'OK',
                                onPress: function () {
                                    setKlien('');
                                    setBank({
                                        bank_id: null,
                                        bank_name: null
                                    });
                                    setOrder({
                                        order_id: null,
                                        order_name: null
                                    });
                                    setIsOrder(true);
                                    setOrderId('');
                                    calendarStripRef.current.setSelectedDate(tanggal);
                                    setCatatan('');
                                    populateList(tanggal);
                                    populateMarkedDates();
                                    setVisible(false);
                                }
                            },
                        ]);
                    }
                })["catch"](function (error) { return console.error(error); });
            })["catch"](function (error) { return console.error('network error', error); });
        }
        else {
            setLoader(false);
            react_native_1.Alert.alert('Submit Failed', 'Anda belum mencantumkan klien');
        }
    };
    var onCancel = function (id) {
        var data = new FormData();
        data.append('id', id);
        data.append('id_user', userData.iduser);
        react_native_1.Alert.alert('Konfirmasi', 'Hapus dan batalkan jadwal?', [
            {
                text: 'Ok',
                onPress: function () {
                    setLoader(true);
                    fetch(apiUrl_1.apiUrl.api + 'cancelappointment', {
                        method: 'POST',
                        body: data
                    })
                        .then(function (response) {
                        setLoader(false);
                        // console.log(response.text());
                        response
                            .json()
                            .then(function (dataRes) {
                            if (dataRes.success == true) {
                                react_native_1.Alert.alert('Submit Success', 'Jadwal berhasil dibatalkan', [
                                    {
                                        text: 'OK',
                                        onPress: function () {
                                            setKlien('');
                                            setBank({
                                                bank_id: null,
                                                bank_name: null
                                            });
                                            calendarStripRef.current.setSelectedDate(tanggal);
                                            setCatatan('');
                                            populateList(tanggal);
                                            populateMarkedDates();
                                            setDetailVisible(false);
                                        }
                                    },
                                ]);
                            }
                        })["catch"](function (error) {
                            react_native_1.Alert.alert('Submit Failed', 'Ada masalah pada server');
                            console.error(error);
                        });
                    })["catch"](function (error) { return console.error('network error', error); });
                },
                style: 'destructive'
            },
            { text: 'Kembali', onPress: function () { return setLoader(false); }, style: 'cancel' },
        ], {
            cancelable: true,
            onDismiss: function () { return setLoader(false); }
        });
    };
    var populateData = function () {
        var postData = new FormData();
        postData.append('user_id', userData.iduser);
        postData.append('type', 'job');
        fetch(apiUrl_1.apiUrl.api + 'requestresume', {
            method: 'POST',
            body: postData
        })
            .then(function (response) {
            // console.log(response.text());
            response
                .json()
                .then(function (data) {
                setRequestResume(data.data[0]);
            })["catch"](function (error) { return console.error(error); })["finally"](function () { return setRefreshing(false); });
        })["catch"](function (error) { return console.error(error); });
        fetch(apiUrl_1.apiUrl.api + 'jobresume', {
            method: 'POST',
            body: postData
        })
            .then(function (response) {
            response
                .json()
                .then(function (data) {
                setJobResume(data.data[0]);
            })["catch"](function (error) { return console.error(error); })["finally"](function () { return setRefreshing(false); });
        })["catch"](function (error) { return console.error(error); });
        fetch(apiUrl_1.apiUrl.api + 'getwelcometext')
            .then(function (response) {
            // console.log(response.text());
            response
                .json()
                .then(function (data) {
                dispatch(mainActions.setRunningText(data.data[0].content));
            })["catch"](function (error) { return console.error(error); });
        })["catch"](function (error) { return console.error(error); });
    };
    var populateList = function (date) {
        var postData = new FormData();
        postData.append('tanggal', date);
        postData.append('id_user', userData.iduser);
        postData.append('role', userData.role);
        // postData.append('service_id', userData.service_id);
        fetch(apiUrl_1.apiUrl.api + 'listappointment', {
            method: 'POST',
            body: postData
        })
            .then(function (response) {
            // console.log(response.text());
            response
                .json()
                .then(function (data) {
                console.log(data.data);
                setAppointmentList(data.data);
            })["catch"](function (error) { return console.error(error); })["finally"](function () { return setRefreshing(false); });
        })["catch"](function (error) { return console.error(error); });
    };
    var populateMarkedDates = function () {
        var postData = new FormData();
        postData.append('id_user', userData.iduser);
        postData.append('role', userData.role);
        // postData.append('service_id', userData.service_id);
        fetch(apiUrl_1.apiUrl.api + 'getappointmentahead', {
            method: 'POST',
            body: postData
        })
            .then(function (response) {
            // console.log(response.text());
            response
                .json()
                .then(function (data) {
                var markedDatesArray = [];
                data.data.map(function (row) {
                    markedDatesArray.push({
                        date: moment_1["default"](row.date, 'YYYY-MM-DD'),
                        dots: [
                            {
                                color: theme_1.theme.colors.secondary
                            },
                        ]
                    });
                });
                setMarkedDates(markedDatesArray);
            })["catch"](function (error) { return console.error(error); })["finally"](function () { return setRefreshing(false); });
        })["catch"](function (error) { return console.error(error); });
    };
    var onRefresh = function (date) {
        setRefreshing(true);
        populateData();
        populateList(date);
        populateMarkedDates();
    };
    var setCurrentDate = function () {
        var date = new Date();
        var offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - offset * 60 * 1000);
        return date.toISOString().split('T')[0];
    };
    function numberWithCommas(x) {
        if (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        else {
            return '0';
        }
    }
    react_1["default"].useEffect(function () {
        setRefreshing(true);
        populateData();
        populateList(setCurrentDate());
        setTanggal(setCurrentDate());
        populateMarkedDates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] =
                splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }
    return (react_1["default"].createElement(react_native_paper_1.Provider, null,
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].background },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headerContainer },
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerMenuText, ellipsizeMode: "tail", numberOfLines: 1 }, 'Halo, ' + userData.nama),
                    react_1["default"].createElement(react_native_text_ticker_1["default"], { style: [
                            styles_1["default"].headerMenuText,
                            {
                                width: 280,
                                fontFamily: 'RedHatDisplay-Regular',
                                fontSize: 14
                            },
                        ], duration: runningTextData ? runningTextData.length * 150 : 10000, loop: true, bounce: true, repeatSpacer: 50 }, runningTextData || '')),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles_1["default"].profileImageContainer, onPress: function () {
                        onProfile(true);
                    } },
                    react_1["default"].createElement(react_native_1.Image, { source: {
                            uri: userData.pic
                        }, style: styles_1["default"].profilImage, resizeMode: "cover" }))),
            react_1["default"].createElement(react_native_1.ScrollView, { style: styles_1["default"].serviceMenuContainer, horizontal: true, fadingEdgeLength: 30, showsHorizontalScrollIndicator: false }, resume.map(function (item, index) { return (react_1["default"].createElement(react_1["default"].Fragment, { key: index },
                react_1["default"].createElement(react_native_1.TouchableOpacity, { key: item.id, style: styles_1["default"].resumeContainer },
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].serviceTextContainer },
                        react_1["default"].createElement(react_native_paper_1.IconButton, { style: styles_1["default"].postDateIcon, icon: item.icon, color: '#7b7e80', size: 24 }),
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].resumeText }, item.name)),
                    item.id === 0 ? (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].resumeTextContainer },
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].resumeTextColumn },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].resumeDetailText }, "Diajukan"),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].serviceText }, requestResume.requested)),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].resumeTextColumn },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].resumeDetailText }, "Diproses"),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].serviceText }, requestResume.processed)),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].resumeTextColumn },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].resumeDetailText }, "Disetujui"),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].serviceText }, requestResume.done)),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].resumeTextColumn },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].resumeDetailText }, "Ditolak"),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].serviceText }, requestResume.reject)))) : (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].resumeTextContainer },
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].resumeTextColumn },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].resumeDetailText }, "Dikerjakan"),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].serviceText }, jobResume.tugas)),
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].resumeTextColumn },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].resumeDetailText }, "Selesai"),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].serviceText }, jobResume.done))))),
                react_1["default"].createElement(react_native_1.View, { style: { width: 10 } }))); }))),
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].bottomSheetContainer },
            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].sheetContainer },
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].jobListContainer },
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].headingTextContainer },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerText }, "Jadwal"),
                        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles_1["default"].addJadwalButton, onPress: function () {
                                setVisible(true);
                            } },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].addButtonText }, "Tambah Jadwal"))),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].calendarContainer },
                        react_1["default"].createElement(react_native_calendar_strip_1["default"], { ref: calendarStripRef, scrollable: true, numDaysInWeek: 6, style: styles_1["default"].calendarStrip, calendarAnimation: { type: 'sequence', duration: 30 }, daySelectionAnimation: {
                                type: 'border',
                                duration: 200,
                                borderHighlightColor: 'white'
                            }, calendarHeaderStyle: styles_1["default"].calendarHeaderStyle, calendarColor: theme_1.theme.colors.primary, dayComponentHeight: 100, dateNumberStyle: styles_1["default"].dateNumberStyle, dateNameStyle: styles_1["default"].dateNameStyle, highlightDateNumberStyle: styles_1["default"].highlightDateNumberStyle, highlightDateNameStyle: styles_1["default"].highlightDateNameStyle, disabledDateNameStyle: { color: 'grey' }, disabledDateNumberStyle: { color: 'grey' }, iconContainer: { flex: 0.1 }, selectedDate: tanggal || new Date(), markedDates: markedDates, onDateSelected: function (date) {
                                setTanggal(date.format('YYYY-MM-DD'));
                                populateList(date.format('YYYY-MM-DD'));
                            }, scrollToOnSetSelectedDate: false })),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].listContainer },
                        react_1["default"].createElement(react_native_1.FlatList, { data: appointmentList, fadingEdgeLength: 30, keyExtractor: function (item) { return item.id.toString(); }, style: { width: '100%' }, contentContainerStyle: { paddingBottom: 100 }, ListEmptyComponent: react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].emptyStateContainer },
                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].emptyStateTitle }, "Data tidak ditemukan"),
                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].emptyStateText }, "Anda tidak memiliki jadwal untuk tanggal ini")), refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, { refreshing: refreshing, onRefresh: function () { return onRefresh(tanggal); } }), renderItem: function (_a) {
                                var item = _a.item, index = _a.index;
                                return (react_1["default"].createElement(react_native_paper_1.List.Item, { key: 'jadwal' + index, title: [item.client_name || 'Klien tidak tersedia'], description: react_1["default"].createElement(react_1["default"].Fragment, null,
                                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText, numberOfLines: 1, ellipsizeMode: "clip" }, 'Oleh : ' + item.nama_pembuat + '\n'),
                                        item.id_order === '0' ? (react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText, numberOfLines: 2, ellipsizeMode: "head" }, item.catatan)) : ([
                                            item.request_plafond_awal !== '0' ? (react_1["default"].createElement(react_native_1.Text, { key: 'plafond' + index, style: styles_1["default"].descriptionListText, numberOfLines: 2, ellipsizeMode: "head" },
                                                "Plafond :",
                                                ' ',
                                                numberWithCommas(item.request_plafond_awal))) : (react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText, numberOfLines: 2, ellipsizeMode: "head" },
                                                "Catatan : ",
                                                item.catatan)),
                                        ])), right: function () { return (react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].datetimeDescriptionContainer },
                                        react_1["default"].createElement(react_native_1.Text, { numberOfLines: 1, ellipsizeMode: "tail", style: [
                                                styles_1["default"].descriptionListText,
                                                {
                                                    color: theme_1.theme.colors.primary,
                                                    fontFamily: 'RedHatDisplay-Bold'
                                                },
                                            ] }, [item.nama_bank || 'Bank tidak tersedia']),
                                        react_1["default"].createElement(react_native_1.Text, { style: [
                                                styles_1["default"].descriptionListText,
                                                { fontFamily: 'Inter-Bold' },
                                            ] }, moment_1["default"](item.time).format('dddd kk:mm')))); }, style: styles_1["default"].appointmentContainer, descriptionNumberOfLines: 3, descriptionEllipsizeMode: 'tail', titleStyle: react_native_1.Platform.OS === 'ios'
                                        ? [styles_1["default"].titleListText, { fontWeight: 'bold' }]
                                        : styles_1["default"].titleListText, theme: {
                                        colors: {
                                            text: '#000000'
                                        }
                                    }, onPress: function () {
                                        setDetailVisible(true);
                                        setDetailJadwal(item);
                                    } }));
                            } }))))),
        react_1["default"].createElement(react_native_paper_1.Portal, null,
            react_1["default"].createElement(react_native_paper_1.Modal, { visible: visible, onDismiss: function () {
                    setVisible(false);
                }, style: styles_1["default"].modalStyle, contentContainerStyle: styles_1["default"].modalContentContainer },
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerText }, "Buat Jadwal")),
                react_1["default"].createElement(react_native_1.ScrollView, { style: [styles_1["default"].formContainer, { maxHeight: '75%' }] },
                    react_1["default"].createElement(react_native_switch_selector_1["default"], { initial: 0, onPress: function (value) {
                            setIsOrder(value);
                            if (!value) {
                                setOrderId(null);
                            }
                        }, textColor: theme_1.theme.colors.secondary, selectedColor: "white", buttonColor: theme_1.theme.colors.secondary, borderColor: theme_1.theme.colors.secondary, hasPadding: true, options: [
                            { label: 'Berdasarkan Order', value: true },
                            { label: 'Diluar Order', value: false },
                        ] }),
                    isOrder ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Nama Order")),
                        react_1["default"].createElement(react_native_paper_1.TextInput, { label: "Pilih Order", mode: "outlined", style: styles_1["default"].inputTextContainer, value: order.order_name || '', ref: orderInput, onFocus: function () {
                                onSearchList(null, 'order', null, 'Order');
                            }, theme: {
                                colors: {
                                    text: '#000000',
                                    placeholder: theme_1.theme.colors.placeholder,
                                    primary: theme_1.theme.colors.secondary,
                                    underlineColor: theme_1.theme.colors.secondary,
                                    background: '#F6F8FA'
                                }
                            } }),
                        order.request_service_name && (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Jenis Order")),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, order.request_service_name))),
                        order.request_service_id === '1' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Jenis Kredit")),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, order.nama_kredit),
                            order.request_plafond_awal &&
                                order.request_plafond_awal !== '0' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Plafond")),
                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, numberWithCommas(order.request_plafond_awal)))),
                            order.request_plafond_akhir &&
                                (order.request_service_id === '2' ||
                                    order.request_service_id === '3') &&
                                order.request_plafond_akhir !== '0' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Plafond Akhir")),
                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, numberWithCommas(order.request_plafond_akhir)))))))) : null,
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Nama Klien")),
                    react_1["default"].createElement(react_native_paper_1.TextInput, { label: "Masukkan nama klien", mode: "outlined", style: styles_1["default"].inputTextContainer, value: klien, onChangeText: function (text) { return setKlien(text); }, autoCapitalize: "words", theme: {
                            colors: {
                                text: '#000000',
                                placeholder: theme_1.theme.colors.placeholder,
                                primary: theme_1.theme.colors.secondary,
                                underlineColor: theme_1.theme.colors.secondary,
                                background: '#F6F8FA'
                            }
                        } }),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Nama Bank")),
                    react_1["default"].createElement(react_native_paper_1.TextInput, { label: "Masukkan nama bank (opsional)", mode: "outlined", style: styles_1["default"].inputTextContainer, value: bank.bank_name || '', ref: bankInput, onFocus: function () {
                            onSearchList(null, 'appointment_bank', null, 'Bank');
                        }, theme: {
                            colors: {
                                text: '#000000',
                                placeholder: theme_1.theme.colors.placeholder,
                                primary: theme_1.theme.colors.secondary,
                                underlineColor: theme_1.theme.colors.secondary,
                                background: '#F6F8FA'
                            }
                        } }),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Catatan (Opsional)")),
                    react_1["default"].createElement(react_native_paper_1.TextInput, { label: "Masukkan catatan (opsional)", mode: "outlined", style: styles_1["default"].inputTextContainerMultiline, value: catatan, onChangeText: function (text) { return setCatatan(text); }, autoCapitalize: "sentences", multiline: true, numberOfLines: 2, theme: {
                            colors: {
                                text: '#000000',
                                placeholder: theme_1.theme.colors.placeholder,
                                primary: theme_1.theme.colors.secondary,
                                underlineColor: theme_1.theme.colors.secondary,
                                background: '#F6F8FA'
                            }
                        } }),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Waktu")),
                    react_1["default"].createElement(react_native_simple_time_picker_1.TimePicker, { zeroPadding: true, selectedHours: jam.hour, selectedMinutes: jam.minute, onChange: function (time) {
                            var hours = time.hours.toString().length < 2
                                ? '0' + time.hours
                                : time.hours;
                            var minutes = time.minutes.toString().length < 2
                                ? '0' + time.minutes
                                : time.minutes;
                            setJam({
                                hour: hours,
                                minute: minutes
                            });
                        } })),
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].submitButtonContainer },
                    react_1["default"].createElement(react_native_paper_1.Button, { mode: "contained", labelStyle: react_native_1.Platform.OS === 'ios'
                            ? [styles_1["default"].buttonSubmitLabel, { fontWeight: 'bold' }]
                            : styles_1["default"].buttonSubmitLabel, style: styles_1["default"].buttonSubmit, theme: {
                            colors: {
                                placeholder: theme_1.theme.colors.placeholder,
                                primary: theme_1.theme.colors.secondary,
                                underlineColor: theme_1.theme.colors.secondary,
                                background: '#F6F8FA'
                            }
                        }, onPress: onSubmit }, loader ? 'Mengirimkan..' : 'Submit'))),
            react_1["default"].createElement(react_native_paper_1.Modal, { visible: detailVisible, onDismiss: function () {
                    setDetailVisible(false);
                }, contentContainerStyle: styles_1["default"].modalContentContainer }, detailJadwal && (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].headerText }, "Detail Jadwal")),
                react_1["default"].createElement(react_native_1.ScrollView, { style: [styles_1["default"].formContainer, { maxHeight: '75%' }] },
                    react_1["default"].createElement(react_native_paper_1.Divider, null),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: [
                                styles_1["default"].sheetTitle,
                                { color: theme_1.theme.colors.secondary },
                            ] }, detailJadwal.id_order !== '0'
                            ? 'Berdasarkan Order'
                            : 'Diluar Order')),
                    detailJadwal.request_service_name && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Nama Order")),
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, detailJadwal.request_name))),
                    detailJadwal.request_service_name && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Jenis Order")),
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, detailJadwal.request_service_name))),
                    detailJadwal.request_service_id === '1' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Jenis Kredit")),
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, detailJadwal.nama_kredit),
                        detailJadwal.request_plafond_awal &&
                            detailJadwal.request_plafond_awal !== '0' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Plafond")),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, 'Rp. ' +
                                numberWithCommas(detailJadwal.request_plafond_awal)))),
                        detailJadwal.request_plafond_akhir &&
                            (detailJadwal.request_service_id === '2' ||
                                detailJadwal.request_service_id === '3') &&
                            detailJadwal.request_plafond_akhir !== '0' && (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                                react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Plafond Akhir")),
                            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, 'Rp. ' +
                                numberWithCommas(detailJadwal.request_plafond_akhir)))))),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Nama Klien")),
                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, detailJadwal.client_name),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Nama Bank")),
                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, detailJadwal.nama_bank),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Catatan (Opsional)")),
                    react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, detailJadwal.catatan),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Waktu")),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textRowContainer },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].descriptionListText }, moment_1["default"](detailJadwal.time, 'YYYY-MM-DD kk:mm').format('dddd, DD MMMM YYYY')),
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].hourText }, moment_1["default"](detailJadwal.time).format('kk:mm'))),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textContainerHeader },
                        react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].sheetTitle }, "Diposting")),
                    react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].textRowContainer },
                        react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].descriptionListText, { fontSize: 11 }] }, detailJadwal.nama_pembuat),
                        react_1["default"].createElement(react_native_1.View, null,
                            react_1["default"].createElement(react_native_1.Text, { style: [styles_1["default"].descriptionListText, { fontSize: 11 }] }, moment_1["default"](detailJadwal.created_at, 'YYYY-MM-DD kk:mm').format('DD-MM-YYYY kk:mm'))))),
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
                            onCancel(detailJadwal.id);
                        } }, loader ? 'Mengirimkan..' : 'Batalkan Jadwal'))))))));
};
exports["default"] = Dashboard;
