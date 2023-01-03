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

var theme_1 = require("app/core/theme");

var react_native_1 = require("react-native");

var react_native_gesture_handler_1 = require("react-native-gesture-handler");

var react_native_paper_1 = require("react-native-paper");

var react_redux_1 = require("react-redux");

var bottom_sheet_1 = require("@gorhom/bottom-sheet");

var react_native_inset_shadow_1 = require("react-native-inset-shadow");

var NavigationService_1 = require("app/navigation/NavigationService");

var react_native_loading_spinner_overlay_1 = require("react-native-loading-spinner-overlay");

var moment_1 = require("moment");

require("moment/locale/id");

moment_1["default"].locale('id');

var _ = require('lodash');

var categoryDefault = [{
  id: 0,
  name: 'SEMUA',
  is_active: true
}, {
  id: 1,
  name: 'TUGAS',
  is_active: false
}, {
  id: 2,
  name: 'SELESAI',
  is_active: false
}];

var JobList = function JobList(_a) {
  var route = _a.route; //param data

  var project_id = route !== undefined ? route.params.project_id : null;
  var project_name = route !== undefined ? route.params.project_name : null;
  var item_capture = route !== undefined ? route.params.item : null;
  var id_document = route !== undefined ? route.params.id_document : null;
  var document_data = route !== undefined ? route.params.document_data : null;
  var job_data = route !== undefined ? route.params.job_data : null; //user data

  var userData = react_redux_1.useSelector(function (state) {
    return state.loginReducer.userData;
  }); //navigation service

  var onBack = function onBack() {
    return NavigationService_1["default"].goBack();
  };

  var onUploadPhoto = function onUploadPhoto(item, id_kelengkapan, id_document, uri, isButton) {
    NavigationService_1["default"].navigate('UploadPhoto', {
      item: item,
      id_kelengkapan: id_kelengkapan,
      id_document: id_document,
      uri: uri,
      referrer: 'JobList',
      isButton: isButton
    });
  }; //bottom sheet logic
  // ref


  var bottomSheetRef = react_1.useRef(null);
  var bottomSheetModalRef = react_1.useRef(null); // variables

  var snapPoints = react_1.useMemo(function () {
    return ['100%', '100%'];
  }, []);
  var modalSnapPoints = react_1.useMemo(function () {
    return ['80%', '80%'];
  }, []); //hooks

  var _b = react_1.useState(0),
      activeTab = _b[0],
      setActiveTab = _b[1];

  var _c = react_1["default"].useState(true),
      visible = _c[0],
      setVisible = _c[1];

  var _d = react_1.useState(categoryDefault),
      categoryList = _d[0],
      setCategoryList = _d[1];

  var _e = react_1.useState(false),
      refreshing = _e[0],
      setRefreshing = _e[1];

  var _f = react_1["default"].useState(false),
      loader = _f[0],
      setLoader = _f[1];

  var _g = react_1.useState({}),
      allJob = _g[0],
      setAllJob = _g[1];

  var _h = react_1.useState({}),
      selfTakenJob = _h[0],
      setSelfTakenJob = _h[1];

  var _j = react_1.useState({}),
      finishedJob = _j[0],
      setFinishedJob = _j[1];

  var _k = react_1.useState(selfTakenJob),
      jobList = _k[0],
      setJobList = _k[1];

  var _l = react_1.useState(null),
      jobModal = _l[0],
      setJobModal = _l[1];

  var _m = react_1["default"].useState([]),
      reqDocument = _m[0],
      setReqDocument = _m[1];

  var _o = react_1["default"].useState(),
      updateState = _o[1]; // callbacks
  //use to force re render


  var forceUpdate = react_1["default"].useCallback(function () {
    return updateState({});
  }, []);
  var handlePresentModalPress = react_1.useCallback(function (item) {
    var _a;

    setLoader(true);
    var dataKelengkapan = [];

    if (item.is_done === '0') {
      item.job_document.forEach(function (element) {
        dataKelengkapan.push({
          id: element.id,
          id_doc: element.job_dokumen_id,
          title: element.nama_dokumen,
          checked: false,
          fileName: null,
          tempUri: null,
          isButton: true
        });
      });
    } else {
      item.job_document.forEach(function (element) {
        dataKelengkapan.push({
          id: element.id,
          id_doc: element.job_dokumen_id,
          title: element.nama_dokumen,
          checked: true,
          fileName: element.job_dokumen_url,
          tempUri: null,
          isButton: false
        });
      });
    }

    item['dataKelengkapan'] = dataKelengkapan;
    setJobModal(item);
    (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.present();
    setTimeout(function () {
      setLoader(false);
    }, 1000);
  }, []);
  var handleSheetChanges = react_1.useCallback(function (index) {
    console.log('handleSheetChanges', index);
  }, []);
  var handleModalSheetChanges = react_1.useCallback(function (index) {
    console.log('handleSheetChanges', index);

    if (index < 0) {
      setJobModal(null);
    }
  }, []);

  var onSubmit = function onSubmit() {
    if (_.uniqBy(reqDocument, 'id_document').length === 0 && jobModal.request_document.length === 0) {
      react_native_1.Alert.alert('Submit Failed', 'Anda belum mengisi kelengkapan dokumen');
    } else {
      //setloader set form data
      setLoader(true);
      var data = new FormData();
      var apiUrl = apiUrl.api + 'jobupdate';
      data.append('id_job', jobModal.id);
      data.append('name', 'submit_job');
      data.append('id_user', userData.iduser); //kelengkapan array map to string

      data.append('job_document', JSON.stringify(_.uniqBy(_.filter(reqDocument, function (o) {
        return o.img64 !== '';
      }), 'id_document'))); // api URL switch when update or insert then POST

      fetch(apiUrl, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        setLoader(false);
        response.json().then(function (dataRes) {
          var _a;

          if (dataRes.success == true) {
            (_a = bottomSheetModalRef.current) === null || _a === void 0 ? void 0 : _a.dismiss();
            react_native_1.Alert.alert('Submit Success', 'Request berhasil disimpan, menunggu konfirmasi', [{
              text: 'OK',
              onPress: function onPress() {
                return NavigationService_1["default"].goBack();
              }
            }]);
          }
        })["catch"](function (error) {
          return console.error(error);
        });
      })["catch"](function (error) {
        return console.error('network error', error);
      });
    }
  };

  var onChangeSearch = function onChangeSearch(query) {
    var filteredArrays = allJob.filter(function (_a) {
      var task_name = _a.task_name;
      return task_name.toLowerCase().includes(query.toLowerCase());
    });
    isActiveOrNot(0);
    setJobList(filteredArrays);
  };

  var isActiveOrNot = function isActiveOrNot(categoryIndex) {
    var category = __spreadArrays(categoryList);

    onRefresh();
    category.map(function (category, index) {
      if (index === categoryIndex) {
        category.is_active = true;

        if (category.id === 0) {
          setJobList(allJob);
          setActiveTab(0);
        } else if (category.id === 1) {
          setJobList(selfTakenJob);
          setActiveTab(1);
        } else if (category.id === 2) {
          setJobList(finishedJob);
          setActiveTab(2);
        }
      } else {
        category.is_active = false;
      }
    });
    setCategoryList(category);
  };

  var populateData = function populateData(state) {
    var reqData = new FormData();
    reqData.append('user_id', userData.iduser);
    reqData.append('service_id', project_id);
    fetch(apiUrl.api + 'joblistproject', {
      method: 'POST',
      body: reqData
    }).then(function (response) {
      response.json().then(function (data) {
        // console.log(data.data);
        var alljobdata = _(data.data).groupBy(function (x) {
          return x.task_name;
        }).map(function (value, key) {
          return {
            task_name: key,
            task_id: value[0].task_id,
            jobs: value
          };
        }).value();

        var todojobdata = _(_.filter(data.data, ['is_done', '0'])).groupBy(function (x) {
          return x.task_name;
        }).map(function (value, key) {
          return {
            task_name: key,
            task_id: value[0].task_id,
            jobs: value
          };
        }).value();

        var donejobdata = _(_.filter(data.data, ['is_done', '1'])).groupBy(function (x) {
          return x.task_name;
        }).map(function (value, key) {
          return {
            task_name: key,
            task_id: value[0].task_id,
            jobs: value
          };
        }).value();

        if (state) {
          setJobList(alljobdata);
        }

        setAllJob(alljobdata);
        setSelfTakenJob(todojobdata);
        setFinishedJob(donejobdata);
      })["catch"](function (error) {
        return console.error(error);
      })["finally"](function () {
        if (!job_data) {
          setLoader(false);
        }

        setRefreshing(false);
      });
    });
  };

  var onRefresh = react_1["default"].useCallback(function () {
    setVisible(false);
    setRefreshing(true);
    populateData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //interval snackbar

  react_1["default"].useEffect(function () {
    setInterval(function () {
      if (!visible) {
        setVisible(true);
      }
    }, 60000);
  }, [visible]);
  react_1["default"].useEffect(function () {
    setRefreshing(true);
    setLoader(true);
    populateData(true);
    isActiveOrNot(0); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //after capture logic

  react_1["default"].useEffect(function () {
    if (item_capture && id_document && document_data) {
      item_capture.dataKelengkapan.forEach(function (item) {
        if (item.id === id_document) {
          item.checked = true;
          item.fileName = document_data.fileName;
          item.img64 = document_data.img64;
          item.tempUri = document_data.tempUri;
          item.isButton = true;
          var collectedDocument = reqDocument;
          collectedDocument.push(document_data);
          collectedDocument = _.uniqBy(_.filter(reqDocument, function (o) {
            return o.img64 !== null;
          }), 'id');
          setReqDocument(collectedDocument);
        }
      });
      setJobModal(item_capture);
      forceUpdate(); // handlePresentModalPress(item_capture);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [item_capture, id_document, document_data, forceUpdate]); //job data process

  react_1["default"].useEffect(function () {
    setLoader(true);

    if (job_data) {
      setJobModal(job_data);
      handlePresentModalPress(job_data);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [job_data, forceUpdate]);
  return react_1["default"].createElement(bottom_sheet_1.BottomSheetModalProvider, null, react_1["default"].createElement(react_native_loading_spinner_overlay_1["default"], {
    visible: loader,
    // textContent={'Loading...'}
    textStyle: styles_1["default"].spinnerTextStyle
  }), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].background
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].headerContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].iconHeader
  }, react_1["default"].createElement(react_native_paper_1.IconButton, {
    icon: "arrow-left",
    size: 30,
    color: "#ffffff",
    onPress: function onPress() {
      return onBack();
    }
  })), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].titleScreen
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerText
  }, "Daftar Job"))), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerText
  }, project_name))), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].bottomSheetContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].sheetContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: {
      flex: 1,
      width: '100%'
    }
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].categoryListContainer
  }, categoryList.map(function (category, index) {
    if (category.is_active) {
      return react_1["default"].createElement(react_native_1.View, {
        key: category.id,
        style: [styles_1["default"].categoryPill, {
          backgroundColor: 'rgba(249, 168, 38, 0.1)'
        }]
      }, react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].categoryText
      }, category.name));
    } else {
      return react_1["default"].createElement(react_native_1.TouchableOpacity, {
        style: styles_1["default"].categoryPill,
        key: category.id,
        onPress: function onPress() {
          isActiveOrNot(index);
        },
        underlayColor: theme_1.theme.colors.secondary
      }, react_1["default"].createElement(react_native_1.View, {
        key: category.id
      }, react_1["default"].createElement(react_native_1.Text, {
        style: styles_1["default"].categoryText
      }, category.name)));
    }
  })), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].listContainer
  }, react_1["default"].createElement(react_native_paper_1.Searchbar, {
    placeholder: "Cari job",
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
  }), jobList.length > 0 ? react_1["default"].createElement(react_native_1.FlatList, {
    fadingEdgeLength: 30,
    data: jobList,
    keyExtractor: function keyExtractor(item) {
      return item.task_id.toString();
    },
    refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, {
      refreshing: refreshing,
      onRefresh: onRefresh
    }),
    renderItem: function renderItem(_a) {
      var item = _a.item,
          index = _a.index;
      return react_1["default"].createElement(react_native_paper_1.List.Section, {
        key: 'section' + index.toString()
      }, react_1["default"].createElement(react_native_paper_1.List.Subheader, {
        key: 'subheader' + index.toString()
      }, item.task_name), item.jobs.map(function (item) {
        return react_1["default"].createElement(react_native_paper_1.List.Item, {
          title: item.task_name,
          description: react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.Text, {
            style: styles_1["default"].descriptionListText
          }, item.job_document.map(function (doc) {
            return doc.nama_dokumen;
          }).join('  •  ') + '\nProject:' + item.project_name + '\n', react_1["default"].createElement(react_native_1.Text, {
            style: {
              fontWeight: 'bold'
            }
          }, 'Diposting : ' + moment_1["default"](item.created_at).format('DD-MM-YYYY kk:mm:ss')))),
          descriptionNumberOfLines: 4,
          titleStyle: styles_1["default"].titleListText,
          key: 'item' + item.id.toString(),
          left: function left(props) {
            return react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.View, {
              style: styles_1["default"].topListContainer
            }, [item.is_done === '0' ? react_1["default"].createElement(react_native_1.View, {
              key: "headerlistcontainer",
              style: styles_1["default"].headerListContainer
            }, react_1["default"].createElement(react_native_1.Text, {
              style: styles_1["default"].statusListTextWarning
            }, "Tugas")) : react_1["default"].createElement(react_native_1.View, {
              key: "headerlistcontainer",
              style: styles_1["default"].headerListContainer
            }, react_1["default"].createElement(react_native_1.Text, {
              style: styles_1["default"].statusListTextSuccess
            }, "Selesai"))], react_1["default"].createElement(react_native_paper_1.IconButton, __assign({}, props, {
              style: styles_1["default"].iconStatus,
              icon: item.is_done === '0' ? 'clipboard-text-outline' : 'clipboard-check',
              color: item.is_done === '0' ? theme_1.theme.colors.secondary : theme_1.theme.colors.primary,
              size: 28
            }))));
          },
          right: function right(props) {
            return react_1["default"].createElement(react_native_paper_1.List.Icon, __assign({}, props, {
              icon: "chevron-right",
              color: "#D3DCE6"
            }));
          },
          onPress: function onPress() {
            return handlePresentModalPress(item);
          }
        });
      }));
    }
  }) : react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].emptyStateContainer
  }, react_1["default"].createElement(react_native_1.Image, {
    source: require('../../assets/empty_list_req.png'),
    style: styles_1["default"].image
  }), react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].emptyStateTitle
  }, "Data tidak ditemukan"), react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].emptyStateText
  }, "Data pekerjaan belum tersedia untuk saat ini"))))), jobModal ? react_1["default"].createElement(bottom_sheet_1.BottomSheetModal, {
    ref: bottomSheetModalRef,
    index: 1,
    snapPoints: modalSnapPoints,
    backdropComponent: bottom_sheet_1.BottomSheetBackdrop,
    onChange: handleModalSheetChanges
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].modalContentContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerModalText
  }, jobModal.task_name), react_1["default"].createElement(react_native_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      marginTop: 10
    }]
  }, jobModal.project_name), react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].muteHeaderModalText
  }, 'Diposting pada ' + jobModal.created_at)), react_1["default"].createElement(react_native_1.View, {
    style: [styles_1["default"].textContainerHeader, {
      marginTop: 20
    }]
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Permintaan Dokumen")), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].scrollListContainer
  }, react_1["default"].createElement(react_native_inset_shadow_1["default"], {
    left: false,
    right: false,
    top: false,
    shadowRadius: 20,
    shadowOpacity: 0.6,
    elevation: 20
  }, react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, {
    fadingEdgeLength: 30,
    style: styles_1["default"].documentScrollView,
    contentContainerStyle: {
      flexGrow: 1
    },
    refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, {
      refreshing: refreshing,
      onRefresh: onRefresh
    })
  }, jobModal.dataKelengkapan ? jobModal.dataKelengkapan.map(function (item, index) {
    return react_1["default"].createElement(react_native_1.View, {
      style: styles_1["default"].documentListContainer,
      key: index
    }, react_1["default"].createElement(react_native_1.TouchableOpacity, {
      style: styles_1["default"].documentLabelContainer,
      key: 'touch' + item.id.toString() + index,
      onPress: function onPress() {
        return onUploadPhoto(jobModal, item.id, item.id_doc, item.tempUri, item.isButton);
      }
    }, react_1["default"].createElement(react_native_1.Text, {
      key: 'txt' + item.id.toString() + index,
      style: styles_1["default"].checkboxDocumentLabel
    }, item.title)), react_1["default"].createElement(react_native_paper_1.Divider, {
      styles: {
        width: '80%'
      }
    }), react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].checkboxFileLabel
    }, item.fileName ? item.fileName : '* Bukti foto belum tersedia'));
  }) : null))), jobModal.is_done === '0' ? react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].submitButtonContainer
  }, react_1["default"].createElement(react_native_paper_1.Button, {
    mode: "contained",
    onPress: onSubmit,
    labelStyle: [styles_1["default"].buttonSubmitLabel],
    style: styles_1["default"].buttonSubmit
  }, loader ? 'Mengirimkan..' : 'Kirim Dokumen')) : null)) : null), react_1["default"].createElement(react_native_paper_1.Snackbar, {
    visible: visible,
    style: {
      backgroundColor: '#F6F8FA'
    },
    theme: {
      colors: {
        surface: '#263238',
        accent: theme_1.theme.colors.primary
      }
    },
    onDismiss: function onDismiss() {
      setVisible(false);
    },
    action: {
      label: 'Ok',
      onPress: function onPress() {
        (function () {
          onRefresh();
        });
      }
    }
  }, "Tarik ke bawah untuk me-refresh daftar"));
};

exports["default"] = JobList;