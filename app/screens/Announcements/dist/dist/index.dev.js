"use strict";

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

exports.__esModule = true;

var react_1 = require("react");

var styles_1 = require("./styles");

var apiUrl_1 = require("app/core/apiUrl");

var react_native_1 = require("react-native");

var react_native_paper_1 = require("react-native-paper");

var react_native_gesture_handler_1 = require("react-native-gesture-handler");

var bottom_sheet_1 = require("@gorhom/bottom-sheet");

var theme_1 = require("app/core/theme");

var react_redux_1 = require("react-redux");

var react_native_loading_spinner_overlay_1 = require("react-native-loading-spinner-overlay");

var react_native_paper_dropdown_1 = require("react-native-paper-dropdown");

var moment_1 = require("moment");

require("moment/locale/id");

moment_1["default"].locale('id');

var _ = require('lodash');

var categoryService = [{
  id: 0,
  name: 'SEMUA',
  is_active: true,
  label: 'Semua',
  value: 0
}, {
  id: 1,
  name: 'PERBANKAN',
  is_active: false,
  img_url: apiUrl.assets + 'img/bank.png',
  label: 'Perbankan',
  value: 1
}, {
  id: 2,
  name: 'NOTARIS',
  is_active: false,
  img_url: apiUrl.assets + 'img/kumham.png',
  label: 'Notaris',
  value: 2
}, {
  id: 3,
  name: 'PPAT',
  is_active: false,
  img_url: apiUrl.assets + 'img/name.png',
  label: 'PPAT',
  value: 3
}];
var categorySelect = [{
  label: 'Semua',
  value: 0
}, {
  label: 'Perbankan',
  value: 1
}, {
  label: 'Notaris',
  value: 2
}, {
  label: 'PPAT',
  value: 3
}];

var Announcement = function Announcement(_a) {
  //fetch user data
  var userData = react_redux_1.useSelector(function (state) {
    return state.loginReducer.userData;
  }); //navigation service

  var populateData = function populateData() {
    var postData = new FormData();
    postData.append('id_user', userData.iduser);

    if (userData.role === '2' || userData.role === '5') {
      postData.append('service_id', userData.service_id);
    }

    fetch(apiUrl_1.apiUrl.api + 'listannouncement', {
      method: 'POST',
      body: postData
    }).then(function (response) {
      // console.log(response.text());
      response.json().then(function (data) {
        setAllPengumuman(data.data);
        setPengumumanList(data.data);
      })["catch"](function (error) {
        return console.error(error);
      })["finally"](function () {
        return setRefreshing(false);
      });
    })["catch"](function (error) {
      return console.error(error);
    });
  }; //bottom sheet logic
  // ref


  var bottomSheetModalRef = react_1.useRef(null);
  var scrollCategoryRef = react_1.useRef(); // variables

  var modalSnapPoints = react_1.useMemo(function () {
    return ['80%', '80%'];
  }, []); //Hooks

  var _b = react_1["default"].useState(true),
      visible = _b[0],
      setVisible = _b[1];

  var _c = react_1.useState(false),
      showDropDown = _c[0],
      setShowDropDown = _c[1];

  var _d = react_1.useState(false),
      refreshing = _d[0],
      setRefreshing = _d[1];

  var _e = react_1.useState(false),
      loader = _e[0],
      setLoader = _e[1];

  var _f = react_1.useState(categoryService),
      serviceTypeList = _f[0],
      setServiceTypeList = _f[1];

  var _g = react_1.useState(0),
      categoryId = _g[0],
      setCategoryId = _g[1];

  var _h = react_1.useState({}),
      allPengumuman = _h[0],
      setAllPengumuman = _h[1];

  var _j = react_1.useState([]),
      pengumumanList = _j[0],
      setPengumumanList = _j[1];

  var _k = react_1.useState(null),
      pengumumanModal = _k[0],
      setPengumumanModal = _k[1]; //formHooks


  var _l = react_1.useState(''),
      judul = _l[0],
      setJudul = _l[1];

  var _m = react_1.useState(''),
      konten = _m[0],
      setKonten = _m[1];

  var _o = react_1.useState(),
      service = _o[0],
      setService = _o[1]; //callbacks


  var setServiceTypeActive = function setServiceTypeActive(categoryIndex) {
    var category = __spreadArrays(serviceTypeList);

    category.map(function (category, index) {
      if (index === categoryIndex) {
        // populateData(true, category.id);
        category.is_active = true;

        if (category.id === 0) {
          setPengumumanList(allPengumuman);
          setCategoryId(0);
        } else if (category.id === 1) {
          setPengumumanList(_.filter(allPengumuman, ['service_id', '1']));
          setCategoryId(1);
        } else if (category.id === 2) {
          setPengumumanList(_.filter(allPengumuman, ['service_id', '2']));
          setCategoryId(2);
        } else if (category.id === 3) {
          setPengumumanList(_.filter(allPengumuman, ['service_id', '3']));
          setCategoryId(3);
        }
      } else {
        category.is_active = false;
      }
    });
    setServiceTypeList(category);
  };

  var onSubmit = function onSubmit() {
    setLoader(true);
    var data = new FormData();
    data.append('id_user', userData.iduser);
    data.append('title', judul);
    data.append('content', konten);
    data.append('service_id', service);

    if (judul !== '' || konten !== '' || service) {
      fetch(apiUrl_1.apiUrl.api + 'announcement', {
        method: 'POST',
        body: data
      }).then(function (response) {
        setLoader(false); // console.log(response.text());

        response.json().then(function (dataRes) {
          if (dataRes.success == true) {
            react_native_1.Alert.alert('Submit Success', 'Notice berhasil ditambahkan', [{
              text: 'OK',
              onPress: function onPress() {
                setJudul('');
                setKonten('');
                setService();
                setVisible(false);
                bottomSheetModalRef.current.close();
              }
            }]);
          }
        })["catch"](function (error) {
          return console.error(error);
        });
      })["catch"](function (error) {
        return console.error('network error', error);
      });
    } else {
      setLoader(false);
      react_native_1.Alert.alert('Submit Failed', 'Anda belum mencantumkan data dengan lengkap');
    }
  };

  var onCancel = function onCancel(id) {
    var data = new FormData();
    data.append('id', id);
    data.append('id_user', userData.iduser);
    react_native_1.Alert.alert('Konfirmasi', 'Hapus notice?', [{
      text: 'Ok',
      onPress: function onPress() {
        setLoader(true);
        fetch(apiUrl_1.apiUrl.api + 'cancelannouncement', {
          method: 'POST',
          body: data
        }).then(function (response) {
          setLoader(false); // console.log(response.text());

          response.json().then(function (dataRes) {
            if (dataRes.success == true) {
              react_native_1.Alert.alert('Submit Success', 'Notice berhasil dibatalkan', [{
                text: 'OK',
                onPress: function onPress() {
                  setJudul('');
                  setKonten('');
                  setService();
                  setVisible(false);
                  bottomSheetModalRef.current.close();
                  populateData();
                }
              }]);
            }
          })["catch"](function (error) {
            return console.error(error);
          });
        })["catch"](function (error) {
          return console.error('network error', error);
        });
      },
      style: 'destructive'
    }, {
      text: 'Kembali',
      onPress: function onPress() {
        setLoader(false);
        bottomSheetModalRef.current.close();
        populateData();
      },
      style: 'cancel'
    }], {
      cancelable: true,
      onDismiss: function onDismiss() {
        setLoader(false);
        bottomSheetModalRef.current.close();
        populateData();
      }
    });
  };

  var onChangeSearch = function onChangeSearch(query) {
    setServiceTypeActive(0);
    var filteredArrays = allPengumuman.filter(function (_a) {
      var title = _a.title,
          nama_pembuat = _a.nama_pembuat;
      return title.toLowerCase().includes(query.toLowerCase()) || nama_pembuat.toLowerCase().includes(query.toLowerCase());
    });
    setPengumumanList(filteredArrays);
  };

  var handleModalSheetChanges = react_1.useCallback(function (index) {}, []);
  var handlePresentModalPress = react_1.useCallback(function (item) {
    setLoader(true);
    bottomSheetModalRef.current.present();
    setPengumumanModal(item);
    setTimeout(function () {
      setLoader(false);
    }, 500);
  }, []);
  var onRefresh = react_1["default"].useCallback(function () {
    setRefreshing(true);
    populateData(false, categoryId);
    setServiceTypeActive(0); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);
  react_1["default"].useEffect(function () {
    setRefreshing(true);
    populateData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //after capture logic

  react_1["default"].useEffect(function () {}, [pengumumanModal]);
  return react_1["default"].createElement(bottom_sheet_1.BottomSheetModalProvider, null, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].background
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].headerContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerMenuText
  }, "NOTICE"))), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].searchbarContainer
  }, react_1["default"].createElement(react_native_paper_1.Searchbar, {
    placeholder: "Cari Notice",
    style: styles_1["default"].searchbar,
    inputStyle: styles_1["default"].searchbarInput,
    onChangeText: onChangeSearch,
    theme: {
      colors: {
        placeholder: theme_1.theme.colors.placeholder,
        primary: theme_1.theme.colors.primary,
        underlineColor: theme_1.theme.colors.underlineColor,
        background: theme_1.theme.colors.background
      }
    }
  })), react_1["default"].createElement(react_native_1.ScrollView, {
    fadingEdgeLength: 30,
    style: styles_1["default"].categoryListContainer,
    horizontal: true,
    ref: scrollCategoryRef,
    showsHorizontalScrollIndicator: false
  }, serviceTypeList.map(function (category, index) {
    return react_1["default"].createElement(react_native_1.TouchableOpacity, {
      style: category.is_active ? [styles_1["default"].categoryPill, {
        borderWidth: 3,
        borderColor: theme_1.theme.colors.secondary
      }] : [styles_1["default"].categoryPill],
      key: category.id,
      onPress: function onPress() {
        setServiceTypeActive(index);
      },
      underlayColor: theme_1.theme.colors.secondary
    }, react_1["default"].createElement(react_native_1.View, {
      style: styles_1["default"].categoryItemContainer,
      key: category.id
    }, index > 0 ? react_1["default"].createElement(react_native_1.Image, {
      source: {
        uri: category.img_url
      },
      style: styles_1["default"].serviceImage
    }) : null, react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].categoryText
    }, category.name)));
  }))), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].bottomSheetContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].sheetContainer
  }, react_1["default"].createElement(react_native_loading_spinner_overlay_1["default"], {
    visible: loader,
    // textContent={'Loading...'}
    textStyle: styles_1["default"].spinnerTextStyle
  }), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].jobListContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].headingTextContainer
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerText
  }, "Daftar Notice"), userData.role === '1' || userData.role === '3' || userData.role === '4' || userData.role === '6' ? react_1["default"].createElement(react_native_1.TouchableOpacity, {
    style: styles_1["default"].addJadwalButton,
    onPress: function onPress() {
      handlePresentModalPress();
    }
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].addButtonText
  }, "Buat Notice")) : null), react_1["default"].createElement(react_native_1.FlatList, {
    data: pengumumanList,
    fadingEdgeLength: 30,
    keyExtractor: function keyExtractor(item, index) {
      return index.toString();
    },
    style: {
      width: '100%',
      marginTop: 10
    },
    refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, {
      refreshing: refreshing,
      onRefresh: onRefresh
    }),
    contentContainerStyle: {
      paddingBottom: 100
    },
    ListEmptyComponent: react_1["default"].createElement(react_native_1.View, {
      style: styles_1["default"].emptyStateContainer
    }, react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].emptyStateTitle
    }, "Data tidak ditemukan"), react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].emptyStateText
    }, "Anda tidak memiliki notice")),
    renderItem: function renderItem(_a) {
      var item = _a.item,
          index = _a.index;
      var service = categoryService[item.service_id];
      return react_1["default"].createElement(react_native_1.TouchableOpacity, {
        key: 'pengumuman' + index,
        style: styles_1["default"].pengumumanContainer,
        onPress: function onPress() {
          handlePresentModalPress(item);
        }
      }, react_1["default"].createElement(react_native_1.View, null, react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].headerText
      }, service.id !== 0 ? react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.Image, {
        source: {
          uri: service.img_url
        },
        style: styles_1["default"].serviceIcon
      }), '  ') : null, item.title)), react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].pengumumanContentContainer
      }, react_1["default"].createElement(react_native_1.Text, {
        numberOfLines: 6,
        ellipsizeMode: "tail",
        style: styles_1["default"].descriptionListText
      }, item.content)), react_1["default"].createElement(react_native_paper_1.Divider, null), react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].pengumumanFooterContainer
      }, react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].pengumumanFooterText
      }, item.nama_pembuat), react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].pengumumanFooterText
      }, moment_1["default"](item.created_at).format('dddd DD-MM-YYYY kk:mm'))));
    }
  }))), react_1["default"].createElement(bottom_sheet_1.BottomSheetModal, {
    ref: bottomSheetModalRef,
    index: 1,
    snapPoints: modalSnapPoints,
    backdropComponent: bottom_sheet_1.BottomSheetBackdrop,
    onChange: handleModalSheetChanges
  }, react_1["default"].createElement(react_native_1.KeyboardAvoidingView, {
    key: 'bsviewcontainer',
    behavior: react_native_1.Platform.OS === 'ios' ? 'padding' : 'height',
    keyboardVerticalOffset: 40,
    style: styles_1["default"].modalContentContainer
  }, react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, {
    style: {
      width: '100%'
    }
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, pengumumanModal ? react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].modalTitle
  }, "Detail") : react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].modalTitle
  }, "Buat Notice")), react_1["default"].createElement(react_native_1.SafeAreaView, {
    style: styles_1["default"].formContainer
  }, react_1["default"].createElement(react_native_paper_1.Divider, null), pengumumanModal ? react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].pengumumanContentContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Divisi")), react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].descriptionListText
  }, pengumumanModal.divisi ? pengumumanModal.divisi : 'Semua')) : react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Divisi")), react_1["default"].createElement(react_native_paper_dropdown_1["default"], {
    label: 'Tentukan divisi',
    mode: 'outlined',
    visible: showDropDown,
    showDropDown: function showDropDown() {
      return setShowDropDown(true);
    },
    onDismiss: function onDismiss() {
      return setShowDropDown(false);
    },
    value: service,
    setValue: setService,
    list: categorySelect
  })), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Judul")), pengumumanModal ? react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].descriptionListText
  }, pengumumanModal.title) : react_1["default"].createElement(react_native_paper_1.TextInput, {
    label: "Masukkan judul notice",
    mode: "outlined",
    style: styles_1["default"].inputTextContainer,
    defaultValue: judul,
    onChangeText: function onChangeText(text) {
      return setJudul(text);
    },
    autoCapitalize: "words",
    theme: {
      colors: {
        text: '#000000',
        placeholder: theme_1.theme.colors.placeholder,
        primary: theme_1.theme.colors.secondary,
        underlineColor: theme_1.theme.colors.secondary,
        background: '#F6F8FA'
      }
    }
  }), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Konten")), pengumumanModal ? react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].descriptionListText
  }, pengumumanModal.content) : react_1["default"].createElement(react_native_paper_1.TextInput, {
    label: "Masukkan konten pengumuman",
    mode: "outlined",
    style: styles_1["default"].inputTextContainer,
    defaultValue: konten,
    onChangeText: function onChangeText(text) {
      return setKonten(text);
    },
    multiline: true,
    theme: {
      colors: {
        text: '#000000',
        placeholder: theme_1.theme.colors.placeholder,
        primary: theme_1.theme.colors.secondary,
        underlineColor: theme_1.theme.colors.secondary,
        background: '#F6F8FA'
      }
    }
  }), pengumumanModal ? react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].pengumumanContentContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Pembuat")), react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].descriptionListText
  }, pengumumanModal.nama_pembuat), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Tanggal Buat")), react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].descriptionListText
  }, moment_1["default"](pengumumanModal.created_at).format('dddd DD-MM-YYYY kk:mm'))) : null)), pengumumanModal ? react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].submitButtonContainer
  }, userData.role === '1' || userData.role === '3' || userData.role === '4' || userData.role === '6' ? react_1["default"].createElement(react_native_paper_1.Button, {
    mode: "outlined",
    onPress: function onPress() {
      onCancel(pengumumanModal.id);
    },
    labelStyle: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].buttonSubmitLabel, {
      fontWeight: 'bold',
      color: theme_1.theme.colors.secondary
    }] : [styles_1["default"].buttonSubmitLabel, {
      color: theme_1.theme.colors.secondary
    }],
    style: styles_1["default"].buttonSubmit
  }, loader ? 'Memproses..' : 'Hapus Notice') : null) : react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].submitButtonContainer
  }, react_1["default"].createElement(react_native_paper_1.Button, {
    mode: "contained",
    onPress: onSubmit,
    labelStyle: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].buttonSubmitLabel, {
      fontWeight: 'bold'
    }] : [styles_1["default"].buttonSubmitLabel],
    style: styles_1["default"].buttonSubmit
  }, loader ? 'Memproses..' : 'Submit Entri'))))));
};

exports["default"] = Announcement;