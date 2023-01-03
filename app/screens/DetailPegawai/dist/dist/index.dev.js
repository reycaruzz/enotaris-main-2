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

var react_native_1 = require("react-native");

var react_native_paper_1 = require("react-native-paper");

var react_native_gesture_handler_1 = require("react-native-gesture-handler");

var bottom_sheet_1 = require("@gorhom/bottom-sheet");

var theme_1 = require("app/core/theme");

var NavigationService_1 = require("app/navigation/NavigationService");

var react_native_loading_spinner_overlay_1 = require("react-native-loading-spinner-overlay");

var moment_1 = require("moment");

require("moment/locale/id");

moment_1["default"].locale('id');

var _ = require('lodash');

var styles_1 = require("./styles");

var Profile = function Profile(_a) {
  var route = _a.route; //route params

  var pegawai = route !== undefined ? route.params.item : null; //navigation service

  var onBack = function onBack() {
    return NavigationService_1["default"].goBack();
  }; // ref


  var bottomSheetModalRef = react_1.useRef(null);
  var modalSnapPoints = react_1.useMemo(function () {
    return ['80%', '80%'];
  }, []); //state hooks

  var _b = react_1["default"].useState(false),
      loader = _b[0],
      setLoader = _b[1];

  var _c = react_1.useState(false),
      refreshing = _c[0],
      setRefreshing = _c[1];

  var _d = react_1.useState(false),
      isFiltered = _d[0],
      setIsFiltered = _d[1];

  var _e = react_1.useState(0),
      offset = _e[0],
      setOffset = _e[1];

  var _f = react_1.useState([]),
      taskList = _f[0],
      setTaskList = _f[1];

  var _g = react_1.useState(null),
      userModal = _g[0],
      setUserModal = _g[1];

  var _h = react_1.useState(null),
      detailModal = _h[0],
      setDetailModal = _h[1];

  var _j = react_1.useState(null),
      allTask = _j[0],
      setAllTask = _j[1];

  var _k = react_1.useState(null),
      processedTask = _k[0],
      setProcessedTask = _k[1];

  var _l = react_1.useState(null),
      doneTask = _l[0],
      setDoneTask = _l[1];

  var _m = react_1.useState(null),
      doneTaskToday = _m[0],
      setDoneTaskToday = _m[1];

  var _o = react_1.useState(null),
      doneTaskMonth = _o[0],
      setDoneTaskMonth = _o[1];

  var _p = react_1.useState(null),
      overtimeTask = _p[0],
      setOvertimeTask = _p[1]; //form Hooks


  var _q = react_1.useState(),
      updateState = _q[1];

  var forceUpdate = react_1.useCallback(function () {
    return updateState({});
  }, []);
  var handleModalSheetChanges = react_1.useCallback(function (index) {
    if (index < 0) {
      setDetailModal(null);
    }
  }, []);
  var onRefresh = react_1["default"].useCallback(function () {
    setRefreshing(true);
    populateTaskList(pegawai.iduser, true); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handlePresentModalPress = react_1.useCallback(function (item) {
    var _a;

    setLoader(true);
    (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.present();
    setDetailModal(item);
    forceUpdate();
    setTimeout(function () {
      setLoader(false);
    }, 200); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var populateTaskList = function populateTaskList(iduser, init) {
    setLoader(true);
    var postData = new FormData();
    postData.append('id_user', iduser);
    postData.append('offset', offset);
    fetch(apiUrl.api + 'listtaskuser', {
      method: 'POST',
      body: postData
    }).then(function (response) {
      // console.log(response.text());
      response.json().then(function (data) {
        if (init) {
          setTaskList(data.data);
        } else {
          setOffset(offset + 10);
          setTaskList(__spreadArrays(taskList, data.data));
        }
      })["catch"](function (error) {
        return console.error(error);
      })["finally"](function () {
        setRefreshing(false);
        setLoader(false);
      });
    })["catch"](function (error) {
      return console.error(error);
    });
    fetch(apiUrl.api + 'alltaskuser', {
      method: 'POST',
      body: postData
    }).then(function (response) {
      // console.log(response.text());
      response.json().then(function (data) {
        setAllTask(data.data);
        setDoneTask(_.filter(data.data, ['task_due_date_done', '1']));
        setProcessedTask(_.filter(data.data, ['task_due_date_done', '0']));
        setDoneTaskToday(_.filter(data.data, function (o) {
          var today = moment_1["default"]().format('YYYY-MM-DD');
          var due = moment_1["default"](o.task_due_date_done_at).format('YYYY-MM-DD');

          if (o.task_due_date_done === '1' && due === today) {
            return o;
          }
        }));
        setOvertimeTask(_.filter(data.data, function (o) {
          if (o.task_due_date) {
            var today = moment_1["default"]().format('YYYY-MM-DD');
            var done = moment_1["default"](o.task_due_date_done_at).format('YYYY-MM-DD');
            var due = moment_1["default"](o.task_due_date).format('YYYY-MM-DD');

            if (o.task_due_date_done_at) {
              if (done > due) {
                return o;
              }
            } else {
              if (today > due) {
                return o;
              }
            }
          }
        }));
        setDoneTaskMonth(_.filter(data.data, function (o) {
          var today = moment_1["default"]().format('YYYY-MM');
          var due = moment_1["default"](o.task_due_date_done_at).format('YYYY-MM');

          if (o.task_due_date_done === '1' && due === today) {
            return o;
          }
        }));
      })["catch"](function (error) {
        return console.error(error);
      })["finally"](function () {
        setRefreshing(false);
        setLoader(false);
      });
    })["catch"](function (error) {
      return console.error(error);
    });
  };

  react_1["default"].useEffect(function () {
    if (pegawai) {
      setUserModal(pegawai);
      populateTaskList(pegawai.iduser, true);
      forceUpdate();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [pegawai, forceUpdate]); // React.useEffect(() => {
  //   populateData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  //jsx component

  var overtimeLabel = function overtimeLabel(item) {
    if (item.task_due_date) {
      var today = moment_1["default"]().format('YYYY-MM-DD');
      var done = moment_1["default"](item.task_due_date_done_at).format('YYYY-MM-DD');
      var due = moment_1["default"](item.task_due_date).format('YYYY-MM-DD');

      if (item.task_due_date_done_at) {
        if (done > due) {
          return react_1["default"].createElement(react_native_1.View, {
            style: styles_1["default"].statusListContainerDanger
          }, react_1["default"].createElement(react_native_paper_1.Text, {
            style: styles_1["default"].statusListTextDanger
          }, "Terlambat"));
        }
      } else {
        if (today > due) {
          return react_1["default"].createElement(react_native_1.View, {
            style: styles_1["default"].statusListContainerDanger
          }, react_1["default"].createElement(react_native_paper_1.Text, {
            style: styles_1["default"].statusListTextDanger
          }, "Terlambat"));
        }
      }
    }
  };

  var overtimeText = function overtimeText(item) {
    if (item.task_due_date) {
      var today = moment_1["default"]().format('YYYY-MM-DD');
      var done = moment_1["default"](item.task_due_date_done_at).format('YYYY-MM-DD');
      var due = moment_1["default"](item.task_due_date).format('YYYY-MM-DD');

      if (item.task_due_date_done_at) {
        if (done > due) {
          return react_1["default"].createElement(react_native_1.View, {
            style: {
              flex: 1
            }
          }, react_1["default"].createElement(react_native_paper_1.Text, {
            style: [styles_1["default"].biodataValueText, {
              color: '#FF616D'
            }]
          }, ' | ', "Terlambat"));
        }
      } else {
        if (today > due) {
          return react_1["default"].createElement(react_native_1.View, {
            style: {
              flex: 1
            }
          }, react_1["default"].createElement(react_native_paper_1.Text, {
            style: [styles_1["default"].biodataValueText, {
              color: '#FF616D'
            }]
          }, ' | ', "Terlambat"));
        }
      }
    }
  };

  return react_1["default"].createElement(bottom_sheet_1.BottomSheetModalProvider, null, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].container
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].headerContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].iconHeader
  }, react_1["default"].createElement(react_native_paper_1.IconButton, {
    icon: "arrow-left",
    size: 30,
    color: theme_1.theme.colors.primary,
    onPress: function onPress() {
      return onBack();
    }
  })), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].headerText, {
      fontWeight: 'bold',
      color: theme_1.theme.colors.primary
    }] : [styles_1["default"].headerText, {
      color: theme_1.theme.colors.primary
    }]
  }, "DETAIL PEGAWAI"))), userModal && react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].contentContainer
  }, react_1["default"].createElement(react_native_loading_spinner_overlay_1["default"], {
    visible: loader,
    // textContent={'Loading...'}
    textStyle: styles_1["default"].spinnerTextStyle
  }), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].formContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].resumeContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].profileContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].profileImage
  }, react_1["default"].createElement(react_native_1.Image, {
    source: {
      uri: userModal.pic ? userModal.pic : null
    },
    style: styles_1["default"].image,
    resizeMode: "cover"
  })), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].profileInfoContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].sheetTitle, {
      fontWeight: 'bold'
    }] : [styles_1["default"].sheetTitle]
  }, "Nama"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].userDetailText
  }, userModal.nama)), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].rowProfileInfo
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].sheetTitle, {
      fontWeight: 'bold'
    }] : [styles_1["default"].sheetTitle]
  }, "Divisi"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].userDetailText
  }, userModal.nama_divisi ? userModal.nama_divisi : '-')), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].sheetTitle, {
      fontWeight: 'bold'
    }] : [styles_1["default"].sheetTitle]
  }, "Role"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].userDetailText
  }, userModal.roleuser)))))), react_1["default"].createElement(react_native_1.View, {
    style: [styles_1["default"].resumeContainer, {
      height: 75,
      width: '100%'
    }]
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].resumeDetailTextContainer
  }, react_1["default"].createElement(react_native_paper_1.IconButton, {
    style: styles_1["default"].postDateIcon,
    icon: "clipboard-check",
    color: '#7b7e80',
    size: 14
  }), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, "Request")), react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, {
    horizontal: true,
    style: styles_1["default"].serviceMenuContainer,
    fadingEdgeLength: 30
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].resumeTextColumn
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].resumeDetailText
  }, "Diajukan"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, userModal.resume_detail[0].requested)), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].resumeTextColumn
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].resumeDetailText
  }, "Diproses"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, userModal.resume_detail[0].processed)), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].resumeTextColumn
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].resumeDetailText
  }, "Disetujui"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, userModal.resume_detail[0].done)), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].resumeTextColumn
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].resumeDetailText
  }, "Ditolak"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, userModal.resume_detail[0].reject)))), react_1["default"].createElement(react_native_1.View, {
    style: [styles_1["default"].resumeContainer, {
      height: 75,
      width: '100%'
    }]
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].resumeDetailTextContainer
  }, react_1["default"].createElement(react_native_paper_1.IconButton, {
    style: styles_1["default"].postDateIcon,
    icon: "checkbox-marked-outline",
    color: '#7b7e80',
    size: 14
  }), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, "Task")), react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, {
    horizontal: true,
    style: styles_1["default"].serviceMenuContainer,
    fadingEdgeLength: 30
  }, react_1["default"].createElement(react_native_1.TouchableOpacity, {
    style: styles_1["default"].resumeTextColumn,
    onPress: function onPress() {
      setTaskList(processedTask);
      setIsFiltered(true);
    }
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].resumeDetailText
  }, "Dikerjakan"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, userModal.task_detail[0].task_process)), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].verticleLine
  }), react_1["default"].createElement(react_native_1.TouchableOpacity, {
    style: styles_1["default"].resumeTextColumn,
    onPress: function onPress() {
      setTaskList(doneTask);
      setIsFiltered(true);
    }
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].resumeDetailText
  }, "Diselesaikan"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, userModal.task_detail[0].task_done)), react_1["default"].createElement(react_native_1.TouchableOpacity, {
    style: styles_1["default"].resumeTextColumn,
    onPress: function onPress() {
      setTaskList(doneTaskToday);
      setIsFiltered(true);
    }
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].resumeDetailText
  }, "(Hari ini)"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, userModal.task_detail[0].task_done_today)), react_1["default"].createElement(react_native_1.TouchableOpacity, {
    style: styles_1["default"].resumeTextColumn,
    onPress: function onPress() {
      setTaskList(doneTaskMonth);
      setIsFiltered(true);
    }
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].resumeDetailText
  }, "(Bulan ini)"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, userModal.task_detail[0].task_done_month)), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].verticleLine
  }), react_1["default"].createElement(react_native_1.TouchableOpacity, {
    style: styles_1["default"].resumeTextColumn,
    onPress: function onPress() {
      setTaskList(overtimeTask);
      setIsFiltered(true);
    }
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].resumeDetailText
  }, "Terlambat"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].resumeText, {
      fontWeight: 'bold'
    }] : [styles_1["default"].resumeText]
  }, userModal.task_detail[0].task_overtime))))), react_1["default"].createElement(react_native_1.View, {
    style: [styles_1["default"].textContainerHeader, {
      paddingLeft: 10
    }]
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Daftar Task")), taskList.length > 0 ? react_1["default"].createElement(react_native_1.View, {
    style: {
      flex: 1,
      width: '100%',
      marginTop: 10
    }
  }, react_1["default"].createElement(react_native_1.FlatList, {
    fadingEdgeLength: 30,
    data: taskList,
    keyExtractor: function keyExtractor(item, index) {
      return index.toString();
    },
    style: styles_1["default"].taskList,
    refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, {
      refreshing: refreshing,
      onRefresh: onRefresh
    }),
    renderItem: function renderItem(_a) {
      var item = _a.item,
          index = _a.index;
      return react_1["default"].createElement(react_native_1.TouchableOpacity, {
        key: 'task' + index,
        style: styles_1["default"].pengumumanContainer,
        onPress: function onPress() {
          handlePresentModalPress(item);
        }
      }, react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].pengumumanContentContainer
      }, react_1["default"].createElement(react_native_1.View, {
        style: {
          width: 120,
          flexDirection: 'row',
          justifyContent: 'flex-start'
        }
      }, item.task_due_date_done === '1' ? react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].statusListContainerSuccess
      }, react_1["default"].createElement(react_native_paper_1.Text, {
        style: styles_1["default"].statusListTextSuccess
      }, "Selesai")), overtimeLabel(item)) : react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.View, {
        style: styles_1["default"].statusListContainerWarning
      }, react_1["default"].createElement(react_native_paper_1.Text, {
        style: styles_1["default"].statusListTextWarning
      }, "Belum Selesai")), overtimeLabel(item))), react_1["default"].createElement(react_native_paper_1.Text, {
        style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].sheetTitle, {
          fontWeight: 'bold',
          fontSize: 12
        }] : [styles_1["default"].sheetTitle, {
          fontSize: 12
        }]
      }, item.task_name), react_1["default"].createElement(react_native_paper_1.Text, {
        style: styles_1["default"].descriptionListText
      }, item.stage_name), react_1["default"].createElement(react_native_paper_1.Text, {
        style: styles_1["default"].descriptionListText
      }, moment_1["default"](item.assign_member_at).format('DD-MM-yyyy HH:mm:ss'))), react_1["default"].createElement(react_native_1.View, {
        style: {
          width: 100,
          alignItems: 'flex-start'
        }
      }, react_1["default"].createElement(react_native_paper_1.Text, {
        style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].headerText, {
          fontWeight: 'bold',
          fontSize: 9,
          color: theme_1.theme.colors.primary
        }] : [styles_1["default"].headerText, {
          fontSize: 9,
          color: theme_1.theme.colors.primary
        }]
      }, item.project_name), react_1["default"].createElement(react_native_paper_1.Text, {
        style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].headerText, {
          fontWeight: 'bold',
          fontSize: 9
        }] : [styles_1["default"].headerText, {
          fontSize: 9
        }]
      }, item.project_client)));
    }
  }), react_1["default"].createElement(react_native_1.View, {
    style: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 5
    }
  }, react_1["default"].createElement(react_native_1.TouchableOpacity, {
    style: styles_1["default"].addJadwalButton,
    onPress: function onPress() {
      if (isFiltered) {
        populateTaskList(userModal.iduser, true);
      } else {
        populateTaskList(userModal.iduser);
      }
    }
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].addButtonText
  }, loader ? 'Memuat...' : [isFiltered ? 'Tampilkan Semua' : 'Tampilkan Lebih Banyak'])))) : react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].emptyStateContainer
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].emptyStateTitle
  }, "Pengguna tidak memiliki tugas"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].emptyStateText
  }, "List tugas kosong")))), react_1["default"].createElement(bottom_sheet_1.BottomSheetModal, {
    ref: bottomSheetModalRef,
    index: 1,
    snapPoints: modalSnapPoints,
    backdropComponent: bottom_sheet_1.BottomSheetBackdrop,
    onChange: handleModalSheetChanges
  }, detailModal ? react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].contentContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].modalTitle, {
      fontWeight: 'bold'
    }] : styles_1["default"].modalTitle
  }, "Detail Task")), react_1["default"].createElement(react_native_paper_1.Divider, null), react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, {
    fadingEdgeLength: 30,
    style: styles_1["default"].formContainer
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].headerModalText
  }, "Nama Task"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      marginBottom: 10
    }]
  }, detailModal.task_name), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].headerModalText
  }, "Nama Project"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      marginBottom: 10
    }]
  }, detailModal.project_name), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].headerModalText
  }, "Nama Klien"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      marginBottom: 10
    }]
  }, detailModal.project_client), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].headerModalText
  }, "Nama Stage"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      marginBottom: 10
    }]
  }, detailModal.stage_name), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].headerModalText
  }, "Status Task"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      marginTop: 10
    }]
  }, detailModal.task_due_date_done === '1' ? react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.View, {
    style: {
      flex: 1
    }
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].biodataValueText, {
      fontWeight: 'bold',
      color: theme_1.theme.colors.primary
    }] : [styles_1["default"].biodataValueText, {
      color: theme_1.theme.colors.primary
    }]
  }, "Selesai")), overtimeText(detailModal)) : react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.View, {
    style: {
      flex: 1
    }
  }, react_1["default"].createElement(react_native_paper_1.Text, {
    style: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].biodataValueText, {
      fontWeight: 'bold',
      color: theme_1.theme.colors.secondary
    }] : [styles_1["default"].biodataValueText, {
      color: theme_1.theme.colors.secondary
    }]
  }, "Belum Selesai")), overtimeText(detailModal))), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].headerModalText
  }, "Catatan"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      marginBottom: 10
    }]
  }, detailModal.task_notes || 'Tidak ada catatan'), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].headerModalText
  }, "Batas Waktu Pengerjaan"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      marginBottom: 10
    }]
  }, moment_1["default"](detailModal.task_due_date).format('DD-MM-yyyy') || 'Tidak ada catatan'), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].headerModalText
  }, "Histori"), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].muteHeaderModalText
  }, '• Task diberikan pada ' + moment_1["default"](detailModal.assign_member_at).format('DD-MM-yyyy HH:mm:ss')), react_1["default"].createElement(react_native_paper_1.Text, {
    style: styles_1["default"].muteHeaderModalText
  }, detailModal.task_due_date_done === '1' && '• Task selesai pada ' + moment_1["default"](detailModal.task_due_date_done_at).format('DD-MM-yyyy HH:mm:ss'), detailModal.task_due_date_done === '1' && '\n• Task diselesaikan oleh ' + detailModal.selesai_oleh))) : null));
};

exports["default"] = Profile;