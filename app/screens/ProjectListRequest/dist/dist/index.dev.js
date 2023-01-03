"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__esModule = true;

var react_1 = require("react");

var styles_1 = require("./styles");

var apiUrl_1 = require("app/core/apiUrl");

var react_native_1 = require("react-native");

var react_native_paper_1 = require("react-native-paper");

var react_native_gesture_handler_1 = require("react-native-gesture-handler");

var bottom_sheet_1 = require("@gorhom/bottom-sheet");

var bottom_sheet_2 = require("@gorhom/bottom-sheet");

var NavigationService_1 = require("app/navigation/NavigationService");

var react_redux_1 = require("react-redux");

var moment_1 = require("moment");

require("moment/locale/id");

moment_1["default"].locale('id');

var _ = require('lodash');

var categoryService = [{
  id: 1,
  type_name: 'PERBANKAN',
  jml_request: '0',
  type_image: apiUrl.assets + 'img/bank.png',
  resume_detail: [{
    done: '0',
    processed: '0',
    reject: '0',
    requested: '0'
  }]
}, {
  id: 2,
  type_name: 'NOTARIS',
  jml_request: '0',
  type_image: apiUrl.assets + 'img/kumham.png',
  resume_detail: [{
    done: '0',
    processed: '0',
    reject: '0',
    requested: '0'
  }]
}, {
  id: 3,
  type_name: 'PPAT',
  jml_request: '0',
  type_image: apiUrl.assets + 'img/name.png',
  resume_detail: [{
    done: '0',
    processed: '0',
    reject: '0',
    requested: '0'
  }]
}];

var ProjectListRequest = function ProjectListRequest() {
  //fetch user data
  var userData = react_redux_1.useSelector(function (state) {
    return state.loginReducer.userData;
  }); //navigation service

  var onCreateRequest = function onCreateRequest(item) {
    return NavigationService_1["default"].navigate('CreateRequest', {
      item: item
    });
  };

  var onRequestList = function onRequestList(project_id, project_name, project_desc) {
    return NavigationService_1["default"].navigate('RequestList', {
      project_id: project_id,
      project_name: project_name,
      project_desc: project_desc
    });
  }; //bottom sheet logic
  // ref


  var bottomSheetRef = react_1.useRef(null); // variables

  var snapPoints = react_1.useMemo(function () {
    return [150, '100%'];
  }, []); //Hooks

  var _a = react_1.useState(false),
      listVisible = _a[0],
      setListVisible = _a[1];

  var _b = react_1.useState([]),
      projectList = _b[0],
      setProjectList = _b[1];

  var _c = react_1.useState([]),
      serviceTypeList = _c[0],
      setServiceTypeList = _c[1];

  var _d = react_1.useState(false),
      refreshing = _d[0],
      setRefreshing = _d[1];

  var handleSheetChanges = react_1.useCallback(function (index) {
    console.log('handleSheetChanges', index);

    if (index === 1) {
      setListVisible(true);
    } else {
      setListVisible(false);
    } // onRefresh();

  }, []);

  var populateData = function populateData() {
    var postData = new FormData();
    postData.append('user_id', userData.iduser);
    postData.append('type', 'job');
    fetch(apiUrl_1.apiUrl.api + 'refservicetypecount', {
      method: 'POST',
      body: postData
    }).then(function (response) {
      response.json().then(function (data) {
        setServiceTypeList(data.data);
      })["catch"](function (error) {
        return console.error(error);
      })["finally"](function () {
        return setRefreshing(false);
      });
    })["catch"](function (error) {
      return console.error(error);
    });
    fetch(apiUrl_1.apiUrl.api + 'listrequestconfirm', {
      method: 'POST',
      body: postData
    }).then(function (response) {
      response.json().then(function (data) {
        if (data.data.length > 0) {
          bottomSheetRef.current.collapse();
        } else {
          bottomSheetRef.current.close();
        }

        setProjectList(data.data);
      })["catch"](function (error) {
        return console.error(error);
      })["finally"](function () {
        return setRefreshing(false);
      });
    })["catch"](function (error) {
      return console.error(error);
    });
  };

  var onRefresh = react_1["default"].useCallback(function () {
    setRefreshing(true);
    populateData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  react_1["default"].useEffect(function () {
    setRefreshing(true);
    populateData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var serviceResume = function serviceResume(services) {
    return react_1["default"].createElement(react_native_1.View, {
      style: styles_1["default"].serviceMenuContainer
    }, services.map(function (project, index) {
      return react_1["default"].createElement(react_native_1.TouchableOpacity, {
        key: project.id,
        style: styles_1["default"].serviceMenu,
        onPress: function onPress() {
          return onRequestList(project.id, project.type_name, project.type_url);
        }
      }, react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].serviceImageContainer
      }, react_1["default"].createElement(react_native_1.Image, {
        source: {
          uri: project.type_image
        },
        style: styles_1["default"].serviceImage
      }), react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].serviceText
      }, project.type_name)), react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].serviceTextContainer
      }, react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].serviceResumeContainer
      }, react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].requestCountContainer
      }, react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].requestCount
      }, project.jml_request), react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].titleServiceText
      }, "Request")), react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].detailServiceResumeContainer
      }, react_1["default"].createElement(react_native_1.View, {
        style: {
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }
      }, react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].statsServiceResumeContainer
      }, react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].subServiceTextBold
      }, project.resume_detail[0].requested), react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].subServiceText
      }, "Diajukan")), react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].statsServiceResumeContainer
      }, react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].subServiceTextBold
      }, project.resume_detail[0].processed), react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].subServiceText
      }, "Diproses"))), react_1["default"].createElement(react_native_1.View, {
        style: {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }
      }, react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].statsServiceResumeContainer
      }, react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].subServiceTextBold
      }, project.resume_detail[0].done), react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].subServiceText
      }, "Selesai")), react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].statsServiceResumeContainer
      }, react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].subServiceTextBold
      }, project.resume_detail[0].reject), react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].subServiceText
      }, "Ditolak")))))));
    }));
  };

  return react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].background
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].headerContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerMenuText
  }, "MENU REQUEST")))), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].rowServiceMenuContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].listContainer
  }, serviceTypeList.length > 0 ? serviceResume(serviceTypeList) : serviceResume(categoryService))), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].bottomSheetContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].sheetContainer
  }, react_1["default"].createElement(react_native_1.Image, {
    source: require('../../assets/illustrasi-request-2.png'),
    style: styles_1["default"].imageBackground
  }), react_1["default"].createElement(bottom_sheet_1["default"], {
    ref: bottomSheetRef,
    index: projectList.length > 0 ? 0 : -1,
    snapPoints: snapPoints,
    backdropComponent: function backdropComponent(backdropProps) {
      return react_1["default"].createElement(bottom_sheet_2.BottomSheetBackdrop, __assign({}, backdropProps, {
        disappearsOnIndex: projectList.length > 0 ? -1 : 0,
        closeOnPress: false
      }));
    },
    onChange: handleSheetChanges
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].jobListContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].headingTextContainer
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].titleHeaderText
  }, projectList.length > 0 ? 'Anda memiliki ' + projectList.length + ' request terproses' : 'Anda belum memiliki request terproses')), listVisible ? react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_gesture_handler_1.FlatList, {
    fadingEdgeLength: 30,
    data: projectList,
    keyExtractor: function keyExtractor(item) {
      return item.id.toString();
    },
    style: {
      width: '100%'
    },
    refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, {
      refreshing: refreshing,
      onRefresh: onRefresh
    }),
    ListEmptyComponent: react_1["default"].createElement(react_native_1.View, {
      style: styles_1["default"].emptyStateContainer
    }, react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].emptyStateTitle
    }, "Data tidak ditemukan"), react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].emptyStateText
    }, "Anda tidak memiliki request terproses admin")),
    contentContainerStyle: {
      paddingBottom: 100
    },
    renderItem: function renderItem(_a) {
      var item = _a.item;
      return react_1["default"].createElement(react_native_paper_1.List.Item, {
        titleStyle: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].titleListText, {
          fontWeight: 'bold'
        }] : styles_1["default"].titleListText,
        title: [item.request_client || 'Klien tidak tersedia'],
        description: react_1["default"].createElement(react_native_1.Text, {
          style: styles_1["default"].descriptionListText
        }, 'Request : ' + [item.request_name || 'Request tidak tersedia'] + '\nDiposting ' + moment_1["default"](item.created_at).format('DD-MM-YYYY kk:mm:ss') + '\n'),
        descriptionNumberOfLines: 2,
        key: item.id.toString(),
        left: function left() {
          var service = _.find(serviceTypeList, ['id', item.request_service_id]);

          if (service !== undefined) {
            return react_1["default"].createElement(react_native_1.View, {
              style: styles_1["default"].serviceImageIconList
            }, react_1["default"].createElement(react_native_1.Image, {
              source: {
                uri: service.type_image
              },
              style: styles_1["default"].serviceImage
            }));
          }
        },
        right: function right(props) {
          return react_1["default"].createElement(react_native_paper_1.List.Icon, __assign({}, props, {
            icon: "chevron-right",
            color: "#D3DCE6"
          }));
        },
        onPress: function onPress() {
          return onCreateRequest(item);
        }
      });
    }
  })) : react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].pullUpText
  }, "Tarik ke atas untuk melihat"))))));
};

exports["default"] = ProjectListRequest;