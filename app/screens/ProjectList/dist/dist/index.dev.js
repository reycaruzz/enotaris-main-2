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

var apiUrl_1 = require("app/core/apiUrl");

var react_native_1 = require("react-native");

var react_native_paper_1 = require("react-native-paper");

var react_native_gesture_handler_1 = require("react-native-gesture-handler");

var bottom_sheet_1 = require("@gorhom/bottom-sheet");

var react_native_inset_shadow_1 = require("react-native-inset-shadow");

var NavigationService_1 = require("app/navigation/NavigationService");

var theme_1 = require("app/core/theme");

var react_redux_1 = require("react-redux");

var react_native_loading_spinner_overlay_1 = require("react-native-loading-spinner-overlay");

var moment_1 = require("moment");

require("moment/locale/id");

moment_1["default"].locale('id');

var _ = require('lodash');

var categoryService = [{
  id: 0,
  name: 'SEMUA',
  is_active: true
}, {
  id: 1,
  name: 'PERBANKAN',
  is_active: false,
  img_url: apiUrl.assets + 'img/bank.png'
}, {
  id: 2,
  name: 'NOTARIS',
  is_active: false,
  img_url: apiUrl.assets + 'img/kumham.png'
}, {
  id: 3,
  name: 'PPAT',
  is_active: false,
  img_url: apiUrl.assets + 'img/name.png'
}];
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

var ProjectList = function ProjectList(_a) {
  var route = _a.route; //param data

  var job_data = route !== undefined ? route.params.job_data : null; //fetch user data

  var userData = react_redux_1.useSelector(function (state) {
    return state.loginReducer.userData;
  }); //navigation service

  var onUploadPhoto = function onUploadPhoto(item, id_kelengkapan, id_document, uri, isButton) {
    NavigationService_1["default"].navigate('UploadPhoto', {
      "return": onSelect,
      item: item,
      id_kelengkapan: id_kelengkapan,
      id_document: id_document,
      uri: uri,
      referrer: 'ProjectList',
      isButton: isButton
    });
  };

  var onSelect = function onSelect(data) {
    if (data && data.item) {
      data.item.dataKelengkapan.forEach(function (item) {
        if (item.id === data.id_document) {
          item.checked = true;
          item.fileName = data.document_data.fileName;
          item.img64 = data.document_data.img64;
          item.tempUri = data.document_data.tempUri;
          item.isButton = true;
          var collectedDocument = reqDocument;
          collectedDocument.push(data.document_data);
          collectedDocument = _.uniqBy(_.filter(reqDocument, function (o) {
            return o.img64 !== null;
          }), 'id');
          setReqDocument(collectedDocument);
        }
      });
    }

    setJobModal(data.item);
    forceUpdate(); // handlePresentModalPress(item_capture);
  }; //bottom sheet logic
  // ref


  var bottomSheetModalRef = react_1.useRef(null);
  var scrollCategoryRef = react_1.useRef(); // variables

  var modalSnapPoints = react_1.useMemo(function () {
    return ['80%', '80%'];
  }, []); //Hooks

  var _b = react_1.useState(0),
      activeTab = _b[0],
      setActiveTab = _b[1]; // const [visible, setVisible] = React.useState(true);
  // const [projectList, setProjectList] = useState([]);


  var _c = react_1.useState(false),
      refreshing = _c[0],
      setRefreshing = _c[1];

  var _d = react_1.useState(false),
      loader = _d[0],
      setLoader = _d[1];

  var _e = react_1.useState(categoryService),
      serviceTypeList = _e[0],
      setServiceTypeList = _e[1];

  var _f = react_1.useState(categoryDefault),
      categoryList = _f[0],
      setCategoryList = _f[1];

  var _g = react_1.useState(0),
      categoryId = _g[0],
      setCategoryId = _g[1];

  var _h = react_1.useState([]),
      allJob = _h[0],
      setAllJob = _h[1];

  var _j = react_1.useState([]),
      selfTakenJob = _j[0],
      setSelfTakenJob = _j[1];

  var _k = react_1.useState([]),
      finishedJob = _k[0],
      setFinishedJob = _k[1];

  var _l = react_1.useState(selfTakenJob),
      jobList = _l[0],
      setJobList = _l[1];

  var _m = react_1.useState(null),
      jobModal = _m[0],
      setJobModal = _m[1];

  var _o = react_1["default"].useState([]),
      reqDocument = _o[0],
      setReqDocument = _o[1]; //callbacks
  //use to force re render


  var _p = react_1["default"].useState(),
      updateState = _p[1];

  var forceUpdate = react_1["default"].useCallback(function () {
    return updateState({});
  }, []);

  var populateData = function populateData(state, category_id) {
    var postData = new FormData();
    postData.append('user_id', userData.iduser);
    postData.append('type', 'job');
    var reqData = new FormData();
    reqData.append('user_id', userData.iduser);
    reqData.append('service_id', category_id);
    fetch(apiUrl_1.apiUrl.api + 'joblistproject', {
      method: 'POST',
      body: reqData
    }).then(function (response) {
      // console.log(response.text());
      response.json().then(function (data) {
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

  var setServiceTypeActive = function setServiceTypeActive(categoryIndex) {
    var category = __spreadArrays(serviceTypeList);

    category.map(function (category, index) {
      if (index === categoryIndex) {
        populateData(true, category.id);
        category.is_active = true;

        if (category.id === 0) {
          // setJobList(allJob);
          setCategoryId(0);
        } else if (category.id === 1) {
          // setJobList(selfTakenJob);
          setCategoryId(1);
        } else if (category.id === 2) {
          // setJobList(finishedJob);
          setCategoryId(2);
        } else if (category.id === 3) {
          // setJobList(finishedJob);
          setCategoryId(3);
        }
      } else {
        category.is_active = false;
      }
    });
    setServiceTypeList(category);
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
                return onRefresh();
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
      var task_name = _a.task_name,
          jobs = _a.jobs;
      return task_name.toLowerCase().includes(query.toLowerCase()) || jobs.some(function (item) {
        return item.project_name.toLowerCase().includes(query.toLowerCase());
      });
    });
    isActiveOrNot(0);
    setJobList(filteredArrays);
  };

  var handleModalSheetChanges = react_1.useCallback(function (index) {}, []);
  var handlePresentModalPress = react_1.useCallback(function (item) {
    setLoader(true);
    bottomSheetModalRef.current.present();
    var dataKelengkapan = [];
    item.job_document.forEach(function (element) {
      dataKelengkapan.push({
        id: element.id,
        id_doc: element.job_dokumen_id,
        title: element.nama_dokumen,
        checked: item.is_done === '0' ? false : true,
        fileName: item.is_done === '0' ? null : element.job_dokumen_url,
        tempUri: item.is_done === null,
        isButton: item.is_done === '0' ? true : false
      });
    });
    item['dataKelengkapan'] = dataKelengkapan;
    setJobModal(item);
    setTimeout(function () {
      setLoader(false);
    }, 1000);
  }, []);
  var onRefresh = react_1["default"].useCallback(function () {
    setRefreshing(true);
    populateData(false, categoryId); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);
  react_1["default"].useEffect(function () {
    setRefreshing(true);
    populateData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //after capture logic

  react_1["default"].useEffect(function () {}, [jobModal]);
  return react_1["default"].createElement(bottom_sheet_1.BottomSheetModalProvider, null, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].background
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].headerContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerMenuText
  }, "MENU JOB"))), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].searchbarContainer
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
    style: styles_1["default"].categoryListContainer
  }, categoryList.map(function (category, index) {
    return react_1["default"].createElement(react_native_1.TouchableOpacity, {
      style: category.is_active ? [styles_1["default"].categoryPillBordered, {
        backgroundColor: 'rgba(249, 168, 38, 0.1)'
      }] : [styles_1["default"].categoryPillBordered],
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
  })), react_1["default"].createElement(react_native_1.FlatList, {
    fadingEdgeLength: 30,
    data: jobList || [],
    keyExtractor: function keyExtractor(item, index) {
      return index.toString();
    },
    style: {
      width: '100%',
      paddingHorizontal: 10
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
    }, "Anda tidak memiliki job atau tugas")),
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
          }).join('  •  ') + '\nProject : ' + item.project_name + '\n', item.due_date && react_1["default"].createElement(react_native_1.Text, {
            style: {
              fontWeight: 'bold'
            }
          }, 'Deadline : ' + moment_1["default"](item.due_date).format('DD-MM-YYYY') + '\n'), react_1["default"].createElement(react_native_1.Text, null, 'Diposting : ' + moment_1["default"](item.created_at).format('DD-MM-YYYY ')))),
          descriptionNumberOfLines: 4,
          titleStyle: react_native_1.Platform.OS === 'ios' ? [styles_1["default"].titleListText, {
            fontWeight: 'bold'
          }] : styles_1["default"].titleListText,
          key: 'item' + item.id.toString(),
          left: function left() {
            var service = categoryService[item.job_service_id];
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
            }, "Selesai"))], react_1["default"].createElement(react_native_1.View, {
              style: styles_1["default"].serviceImageIconList
            }, react_1["default"].createElement(react_native_1.Image, {
              source: {
                uri: service.img_url
              },
              style: styles_1["default"].serviceImageList
            }))));
          },
          right: function right(props) {
            return react_1["default"].createElement(react_native_paper_1.List.Icon, __assign({}, props, {
              icon: "chevron-right",
              color: "#D3DCE6"
            }));
          },
          onPress: function onPress() {
            handlePresentModalPress(item);
          }
        });
      }));
    }
  }))), react_1["default"].createElement(bottom_sheet_1.BottomSheetModal, {
    ref: bottomSheetModalRef,
    index: 1,
    snapPoints: modalSnapPoints,
    backdropComponent: bottom_sheet_1.BottomSheetBackdrop,
    onChange: handleModalSheetChanges
  }, jobModal ? react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].modalContentContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: [styles_1["default"].sheetTitle, {
      fontSize: 18
    }]
  }, jobModal.task_name), react_1["default"].createElement(react_native_paper_1.Divider, {
    styles: {
      width: '80%'
    }
  }), jobModal.due_date && react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].deadlineContainer
  }, react_1["default"].createElement(react_native_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      fontFamily: 'Inter-Bold'
    }]
  }, "Deadline"), react_1["default"].createElement(react_native_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      fontFamily: 'Inter-Bold'
    }]
  }, moment_1["default"](jobModal.due_date).format('DD-MM-YYYY'))), react_1["default"].createElement(react_native_1.Text, {
    style: [styles_1["default"].subHeaderModalText, {
      marginTop: 10
    }]
  }, jobModal.project_name), react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].muteHeaderModalText
  }, 'Diposting pada ' + moment_1["default"](jobModal.created_at).format('DD-MM-YYYY HH:mm:ss'))), react_1["default"].createElement(react_native_paper_1.Divider, {
    styles: {
      width: '80%'
    }
  }), react_1["default"].createElement(react_native_1.View, {
    style: [styles_1["default"].textContainerHeader, {
      marginTop: 20
    }]
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerModalText
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
  }, loader ? 'Mengirimkan..' : 'Kirim Dokumen')) : null) : null)));
};

exports["default"] = ProjectList;