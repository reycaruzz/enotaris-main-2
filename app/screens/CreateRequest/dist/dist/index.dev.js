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

var theme_1 = require("app/core/theme");

var apiUrl_1 = require("app/core/apiUrl");

var react_native_1 = require("react-native");

var react_native_paper_1 = require("react-native-paper");

var react_redux_1 = require("react-redux");

var react_native_gesture_handler_1 = require("react-native-gesture-handler");

var bottom_sheet_1 = require("@gorhom/bottom-sheet");

var react_native_loading_spinner_overlay_1 = require("react-native-loading-spinner-overlay");

var NavigationService_1 = require("app/navigation/NavigationService");

var react_number_format_1 = require("react-number-format");

var _ = require('lodash');

var CreateRequest = function CreateRequest(_a) {
  var route = _a.route; //param data

  var item_capture = route !== undefined ? route.params.item : null;
  var id_kelengkapan = route !== undefined ? route.params.id_kelengkapan : null;
  var id_document = route !== undefined ? route.params.id_document : null;
  var document_data = route !== undefined ? route.params.document_data : null;
  var sub_service = route !== undefined ? route.params.sub_service : null;
  var bank_data = route !== undefined ? route.params.bank : null;
  var jenis_data = route !== undefined ? route.params.jenis : null; //route bukti pembayaran

  var bukti_pembayaran = route !== undefined ? route.params.bukti_pembayaran : null;
  var bukti_pembayaran_filename = route !== undefined ? route.params.bukti_pembayaran_filename : null;
  var bukti_pembayaran_uri = route !== undefined ? route.params.bukti_pembayaran_uri : null; //route ttd pihak

  var id_ttd = route !== undefined ? route.params.id_ttd : null;
  var ttd_data = route !== undefined ? route.params.ttd_data : null; //user data

  var userData = react_redux_1.useSelector(function (state) {
    return state.loginReducer.userData;
  }); //navigation service

  var onBack = function onBack() {
    return NavigationService_1["default"].goBack();
  };

  var onRequestList = function onRequestList(project_id, project_name, project_desc) {
    return NavigationService_1["default"].navigate('RequestList', {
      project_id: project_id,
      project_name: project_name,
      project_desc: project_desc
    });
  };

  var onProjectRequestList = function onProjectRequestList() {
    return NavigationService_1["default"].navigate('Home', {
      onRefresh: true
    });
  };

  var onSearchList = function onSearchList(item, listType, id, title) {
    return NavigationService_1["default"].navigate('SearchList', {
      item: item,
      list_type: listType,
      type_id: serviceType,
      id_kelengkapan: id,
      title: title
    });
  };

  var onUploadPhoto = function onUploadPhoto(item, id, id_doc, desc, uri, isButton) {
    NavigationService_1["default"].navigate('UploadPhoto', {
      item: item,
      id_kelengkapan: id,
      id_document: id_doc,
      desc: desc,
      uri: uri,
      referrer: 'CreateRequest',
      isButton: isButton
    });
  }; //bottom sheet logic
  // ref


  var bottomSheetRef = react_1.useRef(null); // variables

  var snapPoints = react_1.useMemo(function () {
    return ['65%', '100%'];
  }, []); //Hooks
  //form data

  var _b = react_1.useState(null),
      requestData = _b[0],
      setRequestData = _b[1];

  var _c = react_1.useState(''),
      bank = _c[0],
      setBank = _c[1];

  var _d = react_1.useState(''),
      jenis = _d[0],
      setJenis = _d[1];

  var _e = react_1.useState(''),
      klien = _e[0],
      setKlien = _e[1];

  var _f = react_1.useState(''),
      kontak = _f[0],
      setKontak = _f[1];

  var _g = react_1.useState(''),
      nama = _g[0],
      setNama = _g[1];

  var _h = react_1.useState(''),
      keterangan = _h[0],
      setKeterangan = _h[1];

  var _j = react_1.useState(2),
      jenisPembayaran = _j[0],
      setJenisPembayaran = _j[1];

  var _k = react_1.useState(''),
      pembayaran = _k[0],
      setPembayaran = _k[1];

  var _l = react_1.useState(''),
      detailPembayaran = _l[0],
      setDetailPembayaran = _l[1];

  var _m = react_1.useState(''),
      beanotaris = _m[0],
      setBeanotaris = _m[1];

  var _o = react_1.useState(''),
      beabpn = _o[0],
      setBeabpn = _o[1];

  var _p = react_1.useState(''),
      plafondAwal = _p[0],
      setPlafondAwal = _p[1];

  var _q = react_1.useState(''),
      plafondAkhir = _q[0],
      setPlafondAkhir = _q[1];

  var _r = react_1.useState(null),
      buktiPembayaran = _r[0],
      setBuktiPembayaran = _r[1];

  var _s = react_1.useState(0),
      serviceType = _s[0],
      setServiceType = _s[1];

  var _t = react_1.useState([]),
      reqDocument = _t[0],
      setReqDocument = _t[1];

  var _u = react_1.useState([]),
      oldReqDocument = _u[0],
      setOldReqDocument = _u[1]; //updated reqdocument


  var _v = react_1.useState([]),
      deletedReqDocument = _v[0],
      setDeletedReqDocument = _v[1];

  var _w = react_1.useState([]),
      addedReqDocument = _w[0],
      setAddedReqDocument = _w[1];

  var _x = react_1.useState([]),
      ttdPihak = _x[0],
      setTtdPihak = _x[1];

  var _y = react_1.useState([]),
      subService = _y[0],
      setSubService = _y[1];

  var _z = react_1.useState(false),
      refreshing = _z[0],
      setRefreshing = _z[1];

  var _0 = react_1.useState(false),
      loader = _0[0],
      setLoader = _0[1];

  var _1 = react_1.useState(),
      updateState = _1[1]; //refs


  var bankInput = react_1.useRef(null);
  var klienInput = react_1.useRef(null);
  var kontakInput = react_1.useRef(null);
  var namaInput = react_1.useRef(null);
  var keteranganInput = react_1.useRef(null); //picker logic

  var _2 = react_1.useState([]),
      listServiceType = _2[0],
      setListServiceType = _2[1]; //checkbox logic


  var _3 = react_1.useState([]),
      listKelengkapan = _3[0],
      setListKelengkapan = _3[1]; // eslint-disable-next-line @typescript-eslint/no-unused-vars


  var _4 = react_1.useState(listKelengkapan),
      kelengkapan = _4[0],
      setKelengkapan = _4[1]; // callbacks
  //use to force re render


  var forceUpdate = react_1.useCallback(function () {
    return updateState({});
  }, []);
  var handleSheetChanges = react_1.useCallback(function (index) {
    console.log('handleSheetChanges', index);
  }, []);

  var onSubmit = function onSubmit() {
    if (klien === '') {
      react_native_1.Alert.alert('Submit Failed', 'Anda belum mengisi kolom isian nama klien');
    } else {
      if (serviceType === '1') {
        if (bank === '') {
          react_native_1.Alert.alert('Submit Failed', 'Anda belum mengisi kolom isian bank');
        } else {
          postData();
        }
      } else {
        setBank('');
        postData();
      }
    }
  };

  var postData = function postData() {
    if (nama === '') {
      namaInput.current.focus();
    } else if (!requestData && reqDocument.length === 0) {
      react_native_1.Alert.alert('Submit Failed', 'Anda belum mengisi bukti kelengkapan dokumen');
    } else if (!requestData && reqDocument.length !== addedReqDocument.length) {
      react_native_1.Alert.alert('Submit Failed', 'Ada dokumen yang belum memiliki bukti foto');
    } else if (requestData && reqDocument.length !== addedReqDocument.length) {
      react_native_1.Alert.alert('Submit Failed', 'Ada dokumen yang belum memiliki bukti foto');
    } else if (subService.length === 0) {
      react_native_1.Alert.alert('Submit Failed', 'Anda belum mengisi jenis layanan');
    } else {
      //setloader set form data
      setLoader(true);
      var data = new FormData();
      var apiUrl = 'http://trans.my.id/notarisdev/api/request_v3';

      if (item_capture) {
        data.append('id_req', requestData.id);
        data.append('name', 'request_update');
        apiUrl = 'http://trans.my.id/notarisdev/api/new_requestupdate';
      } else {
        data.append('name', 'request_create');
      }

      data.append('id_user', userData.iduser);
      data.append('request_service_id', serviceType);
      data.append('bank', bank.bank_id);
      data.append('kredit', jenis.jenis_id);
      data.append('plafond_awal', plafondAwal.replace(/\D/g, ''));
      data.append('plafond_akhir', plafondAkhir.replace(/\D/g, ''));
      data.append('klien', titleCase(klien));
      data.append('kontak', kontak);
      data.append('request_name', nama.replace(/[&/\\#+$~%'":*?<>{}!@^]/g, ''));
      data.append('keterangan', keterangan);
      data.append('jenis_pembayaran', jenisPembayaran);
      data.append('pembayaran', pembayaran.replace(/\D/g, ''));
      data.append('detail_pembayaran', detailPembayaran);
      data.append('bea_notaris', beanotaris.replace(/\D/g, ''));
      data.append('bea_bpn', beabpn.replace(/\D/g, ''));
      data.append('bukti_pembayaran', buktiPembayaran); //sub-service array map to string

      data.append('sub_services', JSON.stringify(_.uniqBy(subService, 'sub_service_id'))); //assign deleted req document

      data.append('deleted_request_document', JSON.stringify(deletedReqDocument)); //kelengkapan array map to string

      data.append('request_document', JSON.stringify(_.uniqBy(_.filter(reqDocument, function (o) {
        return o.img64 !== null;
      }), 'id'))); // console.log('reqdocument sent', reqDocument);
      // console.log('deletedreqdocument sent', deletedReqDocument);
      // console.log(data);
      // api URL switch when update or insert then POST

      fetch(apiUrl, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        setLoader(false); // console.log(response.text());

        response.json().then(function (dataRes) {
          if (dataRes.success == true) {
            react_native_1.Alert.alert('Submit Success', 'Request berhasil disimpan, menunggu konfirmasi', [{
              text: 'OK',
              onPress: function onPress() {
                bottomSheetRef.current.close();
                onProjectRequestList();
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

  var onApproval = function onApproval() {
    setLoader(true);
    var data = new FormData();
    data.append('id_req', requestData.id);
    data.append('id_user', userData.iduser);
    data.append('ttd_pihak', JSON.stringify(ttdPihak));

    if (ttdPihak.length > 0) {
      fetch(apiUrl_1.apiUrl.api + 'confirmproject', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        setLoader(false); // console.log(response.text());

        response.json().then(function (dataRes) {
          if (dataRes.success == true) {
            react_native_1.Alert.alert('Submit Success', 'Dokumen telah berhasil ditandatangani', [{
              text: 'OK',
              onPress: function onPress() {
                return onRequestList(serviceType, _.find(listServiceType, ['id', serviceType]).type_name, null);
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
      react_native_1.Alert.alert('Submit Failed', 'Anda belum menambahkan bukti tanda tangan pihak');
    }
  };

  var updateReqDocument = function updateReqDocument(prop, value, id) {
    var clone = __spreadArrays(reqDocument);

    var listClone = __spreadArrays(listKelengkapan);

    clone.forEach(function (item) {
      if (item.id === id) {
        item.desc = value;
      }
    });
    listClone.forEach(function (item) {
      if (item.id === id) {
        item.desc = value;
      }
    });
    setReqDocument(clone);
    setListKelengkapan(listClone);
  };

  var updateTtdPihak = function updateTtdPihak(prop, value, id) {
    var clone = __spreadArrays(ttdPihak);

    clone.forEach(function (item) {
      if (item.id_ttd === id) {
        item.desc = value;
      }
    });
    setTtdPihak(clone);
  }; //should update useEffect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //fetch list dokumen checklist


  react_1["default"].useEffect(function () {
    setRefreshing(true);
    setLoader(true);
    fetch(apiUrl_1.apiUrl.api + 'servicetype').then(function (response) {
      response.json().then(function (data) {
        setListServiceType(data.data);
      })["catch"](function (error) {
        return console.error(error);
      })["finally"](function () {
        setLoader(false);
        setRefreshing(false);
      });
    });
  }, []); //set subservice list option

  react_1["default"].useEffect(function () {
    if (serviceType !== 0 && item_capture === null) {
      bottomSheetRef.current.snapTo(1);
      setSubService([]);
      setListKelengkapan([]);
    } else {
      bottomSheetRef.current.close();
    }
  }, [item_capture, serviceType]);
  react_1["default"].useEffect(function () {
    if (sub_service) {
      bottomSheetRef.current.expand();
      setSubService(function (oldArray) {
        return __spreadArrays(oldArray, [sub_service]);
      });
    }

    forceUpdate();
  }, [sub_service, forceUpdate]);
  react_1["default"].useEffect(function () {
    if (bank_data) {
      bottomSheetRef.current.expand();
      setBank(bank_data);
    }

    forceUpdate();
  }, [bank_data, forceUpdate]);
  react_1["default"].useEffect(function () {
    if (jenis_data) {
      bottomSheetRef.current.expand();
      setJenis(jenis_data);
    }

    forceUpdate();
  }, [jenis_data, forceUpdate]); //add request document array

  react_1["default"].useEffect(function () {
    if (item_capture && id_document && document_data) {
      listKelengkapan.forEach(function (item) {
        if (item.id === id_kelengkapan) {
          item.checked = true;
          item.fileName = document_data.fileName;
          var collectedDocument = reqDocument;
          collectedDocument.push(document_data);
          collectedDocument = _.uniqBy(_.filter(reqDocument, function (o) {
            return o.img64 !== null;
          }), 'id');
          setReqDocument(collectedDocument);
        }
      });
      setListKelengkapan(listKelengkapan);
      setRequestData(item_capture);
      setServiceType(item_capture.request_service_id);
      forceUpdate(); // handlePresentModalPress(item_capture);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [item_capture, id_kelengkapan, id_document, document_data, listKelengkapan, forceUpdate]); // create request take photo logic

  react_1["default"].useEffect(function () {
    if (id_document && document_data) {
      // console.log('after capture', id_document, document_data);
      if (document_data.fileName) {
        listKelengkapan.forEach(function (item) {
          if (item.id === id_kelengkapan) {
            item.checked = true;
            item.fileName = document_data.fileName;
            item.img64 = document_data.img64;
            item.tempUri = document_data.tempUri;
            var collectedDocument = reqDocument;
            collectedDocument.push(document_data);
            collectedDocument = _.uniqBy(_.filter(reqDocument, function (o) {
              return o.img64 !== null;
            }), 'id');
            setReqDocument(collectedDocument);
          }
        });

        var addedDoc = __spreadArrays(addedReqDocument);

        addedDoc.push(document_data);
        addedDoc = _.uniqBy(addedDoc, 'id');
        setListKelengkapan(listKelengkapan); // setAddedReqDocument((oldArray) => [...oldArray, document_data]);

        setAddedReqDocument(addedDoc);
      } else {
        var kelengkapanObj_1 = {
          id: listKelengkapan.length,
          id_doc: id_document,
          title: document_data.document_name,
          checked: false,
          fileName: null,
          desc: document_data.desc
        };
        console.log('add kelengkapan', kelengkapanObj_1);

        var addedDoc = __spreadArrays(addedReqDocument);

        addedDoc.push(kelengkapanObj_1);
        addedDoc = _.uniqBy(addedDoc, 'id');
        setListKelengkapan(function (oldArray) {
          return __spreadArrays(oldArray, [kelengkapanObj_1]);
        });
        setAddedReqDocument(addedDoc);
      }

      forceUpdate(); // handlePresentModalPress(item_capture);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [id_kelengkapan, id_document, document_data, forceUpdate]);
  react_1["default"].useEffect(function () {
    if (id_ttd && ttd_data) {
      console.log('after ttd capture', id_ttd, ttd_data);

      if (ttd_data.fileName) {
        var collectedTtd = ttdPihak;
        collectedTtd.push(ttd_data);
        setTtdPihak(collectedTtd);
      }

      forceUpdate(); // handlePresentModalPress(item_capture);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [id_ttd, ttd_data, forceUpdate]);
  react_1["default"].useEffect(function () {
    if (bukti_pembayaran && bukti_pembayaran_filename) {
      setBuktiPembayaran(bukti_pembayaran);
      forceUpdate();
    }
  }, [bukti_pembayaran, bukti_pembayaran_filename, forceUpdate]);
  react_1["default"].useEffect(function () {
    if (item_capture) {
      console.log('cek detail', item_capture);
      bottomSheetRef.current.snapTo(1);
      setRequestData(item_capture);
      setNama(item_capture.request_name);
      setKeterangan(item_capture.keterangan);
      setKlien(item_capture.request_client);
      setKontak(item_capture.request_contact);

      if (item_capture.request_kredit_id && item_capture.nama_kredit) {
        setJenis({
          jenis_id: item_capture.request_kredit_id,
          jenis_name: item_capture.nama_kredit
        });
      }

      setBeabpn(item_capture.request_payment_bpn);
      setBeanotaris(item_capture.request_payment_notaris);
      setPlafondAwal(item_capture.request_plafond_awal);
      setPlafondAkhir(item_capture.request_plafond_akhir);
      setJenisPembayaran(parseInt(item_capture.request_payment));
      setPembayaran(item_capture.request_payment_amount);
      setDetailPembayaran(item_capture.request_payment_detail);
      setBuktiPembayaran(item_capture.request_payment_url);

      if (item_capture.ttd_pihak) {
        setTtdPihak(item_capture.ttd_pihak);
      }

      setServiceType(item_capture.request_service_id);
      setSubService(item_capture.subservices);

      if (item_capture.id_bank && item_capture.nama_bank) {
        setBank({
          bank_id: item_capture.id_bank,
          bank_name: item_capture.nama_bank
        });
      } //generate document list


      var dataKelengkapan_1 = [];
      var tempOldReqDocument_1 = [];

      if (item_capture.request_document !== undefined) {
        item_capture.request_document.forEach(function (element) {
          dataKelengkapan_1.push({
            id: element.id,
            id_doc: element.request_dokumen_id,
            title: element.nama_dokumen,
            checked: true,
            fileName: 'Bukti foto tersedia',
            desc: element.request_dokumen_desc
          });
          element.img64 = null;
          tempOldReqDocument_1.push(element);
        });
      }

      setOldReqDocument(tempOldReqDocument_1); // setReqDocument(tempOldReqDocument);

      setListKelengkapan(dataKelengkapan_1);
      forceUpdate();
    }
  }, [item_capture, forceUpdate]);
  react_1["default"].useEffect(function () {
    // setReqDocument(item_capture.request_document);
    forceUpdate();
  }, [listKelengkapan, forceUpdate]); //jsx component

  var removeLayananButton = function removeLayananButton(item) {
    return react_1["default"].createElement(react_native_paper_1.IconButton, {
      style: styles_1["default"].subServiceRemove,
      icon: "close",
      color: theme_1.theme.colors.secondary,
      key: 'remove_layanan' + item.sub_service_id.toString(),
      onPress: function onPress() {
        var editedArray = _.remove(subService, function (obj) {
          return obj !== item;
        });

        setSubService(editedArray);
      }
    });
  };

  var removeDocumentButton = function removeDocumentButton(item) {
    return react_1["default"].createElement(react_native_paper_1.IconButton, {
      style: styles_1["default"].subServiceRemove,
      icon: "close",
      color: theme_1.theme.colors.secondary,
      key: 'removedoc' + item.id.toString(),
      onPress: function onPress() {
        var editedArray = _.remove(listKelengkapan, function (obj) {
          return obj !== item;
        });

        var editedReqArray = [];

        if (reqDocument.length > 0) {
          editedReqArray = _.remove(reqDocument, function (obj) {
            return obj.id !== item.id;
          });
        }

        if (requestData) {
          if (requestData.is_approved === '0') {
            var editedAddedArray = _.remove(addedReqDocument, function (obj) {
              return obj !== item;
            });

            var deletedObj_1 = _.find(requestData.request_document, {
              id: item.id
            });

            if (deletedObj_1 !== undefined && deletedObj_1 !== null) {
              setDeletedReqDocument(function (oldArray) {
                return __spreadArrays(oldArray, [deletedObj_1]);
              });
            }

            setAddedReqDocument(editedAddedArray);
          }
        }

        setListKelengkapan(editedArray);
        setReqDocument(editedReqArray);
        forceUpdate();
      }
    });
  };

  var setDisabled = function setDisabled(requestData) {
    if (requestData) {
      if (requestData.is_approved === '0') {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  var addLayananButton = function addLayananButton(requestData) {
    return react_1["default"].createElement(react_native_1.TouchableOpacity, {
      key: "tambahjenislayanan",
      style: styles_1["default"].addSubServiceButton,
      onPress: function onPress() {
        onSearchList(requestData, 'sub-service', null, 'Sub-Layanan');
      }
    }, react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].addSubServiceText
    }, "Tambah Jenis Layanan"));
  };

  var addDocumentButton = function addDocumentButton(requestData, reqDocument) {
    return react_1["default"].createElement(react_native_1.TouchableOpacity, {
      key: "touchtambahdokumen",
      style: styles_1["default"].addSubServiceButton,
      onPress: function onPress() {
        onSearchList(requestData, 'document', reqDocument.length, 'Dokumen');
      }
    }, react_1["default"].createElement(react_native_1.Text, {
      key: "texttambahdokumen",
      style: styles_1["default"].addSubServiceText
    }, "Tambah Dokumen"));
  };

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');

    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    } // Directly return the joined string


    return splitStr.join(' ');
  }

  return react_1["default"].createElement(react_1["default"].Fragment, {
    key: 'containerviewfragment'
  }, react_1["default"].createElement(react_native_1.View, {
    key: "containerview",
    style: styles_1["default"].background
  }, react_1["default"].createElement(react_native_loading_spinner_overlay_1["default"], {
    visible: loader,
    textContent: 'Mohon tunggu ...',
    textStyle: styles_1["default"].spinnerTextStyle
  }), react_1["default"].createElement(react_native_1.View, {
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
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerText
  }, "Buat Request")))), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].bottomSheetContainer
  }, react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].headingTextContainer
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].headerText
  }, "Pilih Jenis Layanan")), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].listContainer
  }, listServiceType.length > 0 ? react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].serviceMenuContainer
  }, listServiceType.map(function (project) {
    return react_1["default"].createElement(react_native_1.TouchableOpacity, {
      key: 'touchservice' + project.id,
      style: project.id === serviceType ? styles_1["default"].serviceMenuSelected : styles_1["default"].serviceMenu,
      onPress: function onPress() {
        if (!item_capture) {
          setServiceType(project.id);
        }
      }
    }, react_1["default"].createElement(react_1["default"].Fragment, {
      key: 'servicefragment' + project.id
    }, react_1["default"].createElement(react_native_1.View, {
      key: 'viewcontainer1' + project.id,
      style: styles_1["default"].serviceImageContainer
    }, react_1["default"].createElement(react_native_1.Image, {
      key: 'img' + project.id,
      source: {
        uri: project.type_image
      },
      style: styles_1["default"].serviceImage
    })), react_1["default"].createElement(react_native_1.View, {
      key: 'viewcontainer2' + project.id,
      style: styles_1["default"].serviceTextContainer
    }, react_1["default"].createElement(react_native_1.Text, {
      key: 'txt' + project.id,
      style: styles_1["default"].serviceText
    }, project.type_name))));
  })) : null), react_1["default"].createElement(react_native_1.View, {
    style: styles_1["default"].backgroundImageContainer
  }, react_1["default"].createElement(react_native_1.Image, {
    source: require('../../assets/illustrasi-create-3.png'),
    style: styles_1["default"].backgroundImage
  })), react_1["default"].createElement(bottom_sheet_1["default"], {
    ref: bottomSheetRef,
    index: -1,
    snapPoints: snapPoints,
    onChange: handleSheetChanges
  }, react_1["default"].createElement(react_native_1.KeyboardAvoidingView, {
    key: 'bsviewcontainer',
    behavior: react_native_1.Platform.OS === 'ios' ? 'padding' : 'height',
    style: styles_1["default"].sheetContainer
  }, react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, {
    fadingEdgeLength: 30,
    style: styles_1["default"].bottomSheetScrollView
  }, react_1["default"].createElement(react_1["default"].Fragment, {
    key: 'namaklienfragment'
  }, react_1["default"].createElement(react_native_1.View, {
    key: "klienheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Nama Klien")), react_1["default"].createElement(react_native_paper_1.TextInput, {
    label: "Masukkan nama klien",
    mode: "outlined",
    key: "klieninput",
    style: styles_1["default"].inputTextContainer,
    ref: klienInput,
    defaultValue: klien,
    value: klien,
    onChangeText: function onChangeText(text) {
      return setKlien(text);
    },
    disabled: setDisabled(requestData),
    onSubmitEditing: function onSubmitEditing() {
      klienInput.current.focus();
    },
    autoCapitalize: "words",
    theme: {
      colors: {
        placeholder: theme_1.theme.colors.placeholder,
        primary: theme_1.theme.colors.secondary,
        underlineColor: theme_1.theme.colors.secondary,
        background: '#F6F8FA'
      }
    }
  })), react_1["default"].createElement(react_1["default"].Fragment, {
    key: 'kontakklienfragment'
  }, react_1["default"].createElement(react_native_1.View, {
    key: "klienheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Kontak Klien")), react_1["default"].createElement(react_native_paper_1.TextInput, {
    label: "Masukkan kontak klien",
    mode: "outlined",
    key: "kontakinput",
    style: styles_1["default"].inputTextContainer,
    ref: kontakInput,
    defaultValue: kontak,
    value: kontak,
    onChangeText: function onChangeText(text) {
      return setKontak(text);
    },
    disabled: setDisabled(requestData),
    keyboardType: "numeric",
    onSubmitEditing: function onSubmitEditing() {
      namaInput.current.focus();
    },
    autoCapitalize: "words",
    theme: {
      colors: {
        placeholder: theme_1.theme.colors.placeholder,
        primary: theme_1.theme.colors.secondary,
        underlineColor: theme_1.theme.colors.secondary,
        background: '#F6F8FA'
      }
    }
  })), serviceType === '1' ? react_1["default"].createElement(react_1["default"].Fragment, {
    key: 'banklistfragment'
  }, react_1["default"].createElement(react_native_1.View, {
    key: "bankheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Nama Bank")), react_1["default"].createElement(react_native_paper_1.TextInput, {
    label: "Masukkan nama bank",
    mode: "outlined",
    key: "bankinput",
    style: styles_1["default"].inputTextContainer,
    ref: bankInput,
    value: bank.bank_name || '',
    disabled: setDisabled(requestData),
    onFocus: function onFocus() {
      if (requestData) {
        if (requestData.is_approved === '0') {
          onSearchList(requestData, 'bank', null, 'Bank');
        }
      } else {
        onSearchList(requestData, 'bank', null, 'Bank');
      }
    },
    theme: {
      colors: {
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
  }, "Jenis Kredit")), react_1["default"].createElement(react_native_paper_1.TextInput, {
    label: "Pilih Jenis Kredit",
    mode: "outlined",
    key: "jenisinput",
    style: styles_1["default"].inputTextContainer,
    value: jenis.jenis_name || '',
    disabled: setDisabled(requestData),
    onFocus: function onFocus() {
      if (requestData) {
        if (requestData.is_approved === '0') {
          onSearchList(requestData, 'jenis_perbankan', null, 'Jenis Kredit');
        }
      } else {
        onSearchList(requestData, 'jenis_perbankan', null, 'Jenis Kredit');
      }
    },
    theme: {
      colors: {
        placeholder: theme_1.theme.colors.placeholder,
        primary: theme_1.theme.colors.secondary,
        underlineColor: theme_1.theme.colors.secondary,
        background: '#F6F8FA'
      }
    }
  }), react_1["default"].createElement(react_native_1.View, {
    key: "plafondheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Plafond")), react_1["default"].createElement(react_number_format_1["default"], {
    displayType: 'text',
    thousandSeparator: true,
    prefix: 'Rp ',
    key: "plafondaawalinput",
    value: plafondAwal,
    renderText: function renderText(value) {
      return react_1["default"].createElement(react_native_paper_1.TextInput, {
        label: "Masukkan biaya plafond awal",
        mode: "outlined",
        style: styles_1["default"].inputTextContainer,
        defaultValue: plafondAwal,
        value: value,
        keyboardType: "numeric",
        disabled: setDisabled(requestData),
        theme: {
          colors: {
            placeholder: theme_1.theme.colors.placeholder,
            primary: theme_1.theme.colors.secondary,
            underlineColor: theme_1.theme.colors.secondary,
            background: '#F6F8FA'
          }
        },
        onChangeText: function onChangeText(text) {
          setPlafondAwal(text);
        }
      });
    }
  }), jenis !== '' && [jenis.jenis_id === '2' || jenis.jenis_id === '3' ? react_1["default"].createElement(react_number_format_1["default"], {
    displayType: 'text',
    thousandSeparator: true,
    prefix: 'Rp ',
    key: "plafondakhirinput",
    value: plafondAkhir,
    renderText: function renderText(value) {
      return react_1["default"].createElement(react_native_paper_1.TextInput, {
        label: "Masukkan biaya plafond akhir",
        mode: "outlined",
        style: styles_1["default"].inputTextContainer,
        defaultValue: plafondAkhir,
        value: value,
        keyboardType: "numeric",
        disabled: setDisabled(requestData),
        theme: {
          colors: {
            placeholder: theme_1.theme.colors.placeholder,
            primary: theme_1.theme.colors.secondary,
            underlineColor: theme_1.theme.colors.secondary,
            background: '#F6F8FA'
          }
        },
        onChangeText: function onChangeText(text) {
          setPlafondAkhir(text);
        }
      });
    }
  }) : null]) : null, react_1["default"].createElement(react_native_1.View, {
    key: "judulheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Nama Order")), react_1["default"].createElement(react_native_paper_1.TextInput, {
    label: "Masukkan nama order",
    mode: "outlined",
    key: "namainput",
    style: styles_1["default"].inputTextContainer,
    ref: namaInput,
    defaultValue: nama,
    value: nama,
    onChangeText: function onChangeText(text) {
      return setNama(text);
    },
    disabled: setDisabled(requestData),
    onSubmitEditing: function onSubmitEditing() {
      keteranganInput.current.focus();
    },
    theme: {
      colors: {
        placeholder: theme_1.theme.colors.placeholder,
        primary: theme_1.theme.colors.secondary,
        underlineColor: theme_1.theme.colors.secondary,
        background: '#F6F8FA'
      }
    }
  }), react_1["default"].createElement(react_native_1.View, {
    key: "deskripsiheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Catatan Order")), react_1["default"].createElement(react_native_paper_1.TextInput, {
    mode: "outlined",
    style: [styles_1["default"].inputTextContainer, styles_1["default"].inputTextArea],
    label: "Masukkan catatan order",
    key: "deskripsiinput",
    ref: keteranganInput,
    defaultValue: keterangan,
    value: keterangan,
    disabled: setDisabled(requestData),
    onChangeText: function onChangeText(text) {
      return setKeterangan(text);
    },
    theme: {
      colors: {
        placeholder: theme_1.theme.colors.placeholder,
        primary: theme_1.theme.colors.secondary,
        underlineColor: theme_1.theme.colors.secondary,
        background: '#F6F8FA'
      }
    },
    multiline: true
  }), serviceType !== '1' ? react_1["default"].createElement(react_1["default"].Fragment, {
    key: 'detailpembayaranfragment'
  }, react_1["default"].createElement(react_native_1.View, {
    key: "pembayaranheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    key: "detailpembayarantext",
    style: styles_1["default"].sheetTitle
  }, "Detail Pembayaran (Opsional)")), react_1["default"].createElement(react_1["default"].Fragment, {
    key: 'radiocontainerfragment'
  }, react_1["default"].createElement(react_native_1.View, {
    key: "radiocontainer ",
    style: styles_1["default"].radioContainer
  }, react_1["default"].createElement(react_native_1.TouchableOpacity, {
    key: "radiodp",
    style: [styles_1["default"].radioInputContainer, {
      marginRight: 5
    }],
    onPress: function onPress() {
      return setJenisPembayaran(0);
    }
  }, react_1["default"].createElement(react_native_paper_1.RadioButton, {
    value: 0,
    status: jenisPembayaran === 0 ? 'checked' : 'unchecked',
    disabled: setDisabled(requestData),
    color: theme_1.theme.colors.secondary,
    onPress: function onPress() {
      return setJenisPembayaran(0);
    }
  }), react_1["default"].createElement(react_native_1.Text, null, "DP/Uang Muka")), react_1["default"].createElement(react_native_1.TouchableOpacity, {
    key: "radiolunas",
    style: styles_1["default"].radioInputContainer,
    onPress: function onPress() {
      return setJenisPembayaran(1);
    }
  }, react_1["default"].createElement(react_native_paper_1.RadioButton, {
    value: 1,
    status: jenisPembayaran === 1 ? 'checked' : 'unchecked',
    disabled: setDisabled(requestData),
    color: theme_1.theme.colors.secondary,
    onPress: function onPress() {
      return setJenisPembayaran(1);
    }
  }), react_1["default"].createElement(react_native_1.Text, null, "Lunas"))), react_1["default"].createElement(react_number_format_1["default"], {
    displayType: 'text',
    thousandSeparator: true,
    prefix: 'Rp ',
    value: pembayaran,
    renderText: function renderText(value) {
      return react_1["default"].createElement(react_native_paper_1.TextInput, {
        label: "Masukkan besar pembayaran",
        mode: "outlined",
        key: "pembayaraninput",
        style: styles_1["default"].inputTextContainer,
        defaultValue: pembayaran,
        value: value,
        keyboardType: "numeric",
        disabled: setDisabled(requestData),
        theme: {
          colors: {
            placeholder: theme_1.theme.colors.placeholder,
            primary: theme_1.theme.colors.secondary,
            underlineColor: theme_1.theme.colors.secondary,
            background: '#F6F8FA'
          }
        },
        onChangeText: function onChangeText(text) {
          setPembayaran(text);
        }
      });
    }
  }), react_1["default"].createElement(react_native_paper_1.TextInput, {
    label: "Masukkan detail pembayaran",
    mode: "outlined",
    key: "pembayaraninput",
    style: styles_1["default"].inputTextContainer,
    defaultValue: detailPembayaran,
    disabled: setDisabled(requestData),
    theme: {
      colors: {
        placeholder: theme_1.theme.colors.placeholder,
        primary: theme_1.theme.colors.secondary,
        underlineColor: theme_1.theme.colors.secondary,
        background: '#F6F8FA'
      }
    },
    onChangeText: function onChangeText(text) {
      setDetailPembayaran(text);
    },
    multiline: true
  }), react_1["default"].createElement(react_1["default"].Fragment, {
    key: 'buktibayarcontainerfragment'
  }, requestData ? [buktiPembayaran && requestData.request_payment !== '2' ? react_1["default"].createElement(react_native_1.View, {
    key: "buktibayarcontainer",
    style: styles_1["default"].buktiBayarContainer
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].buktiBayarHeaderText
  }, "Bukti Pembayaran Tersedia"), react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].buktiBayarSubHeaderText
  }, bukti_pembayaran_filename)) : null] : [bukti_pembayaran_uri || bukti_pembayaran_uri !== undefined ? react_1["default"].createElement(react_native_1.View, {
    key: "buktibayarcontainer",
    style: styles_1["default"].buktiBayarContainer
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].buktiBayarHeaderText
  }, "Bukti Pembayaran Terpilih"), react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].buktiBayarSubHeaderText
  }, bukti_pembayaran_filename)) : null], react_1["default"].createElement(react_native_1.TouchableOpacity, {
    style: styles_1["default"].addSubServiceButton,
    onPress: function onPress() {
      var flag = true;

      if (requestData) {
        if (requestData.is_approved === '0') {
          flag = true;
        } else {
          flag = false;
        }
      }

      onUploadPhoto(requestData, 'bukti_pembayaran', null, null, bukti_pembayaran_uri, flag);
    }
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].addSubServiceText
  }, requestData ? [requestData.is_approved === '0' ? [bukti_pembayaran_uri || bukti_pembayaran_uri !== undefined ? 'Ubah Bukti Pembayaran' : 'Tambah Bukti Bayar'] : 'Lihat Bukti Bayar'] : [bukti_pembayaran_uri || bukti_pembayaran_uri !== undefined ? 'Ubah Bukti Pembayaran' : 'Tambah Bukti Bayar']))))) : react_1["default"].createElement(react_1["default"].Fragment, null, react_1["default"].createElement(react_native_1.View, {
    key: "pembayaranbankheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Detail Pembayaran")), react_1["default"].createElement(react_number_format_1["default"], {
    displayType: 'text',
    thousandSeparator: true,
    prefix: 'Rp ',
    value: beanotaris,
    renderText: function renderText(value) {
      return react_1["default"].createElement(react_native_paper_1.TextInput, {
        label: "Masukkan besar biaya Notaris",
        mode: "outlined",
        key: "pembayaraninput",
        style: styles_1["default"].inputTextContainer,
        defaultValue: beanotaris,
        value: value,
        keyboardType: "numeric",
        disabled: setDisabled(requestData),
        theme: {
          colors: {
            placeholder: theme_1.theme.colors.placeholder,
            primary: theme_1.theme.colors.secondary,
            underlineColor: theme_1.theme.colors.secondary,
            background: '#F6F8FA'
          }
        },
        onChangeText: function onChangeText(text) {
          setBeanotaris(text);
        }
      });
    }
  }), react_1["default"].createElement(react_number_format_1["default"], {
    displayType: 'text',
    thousandSeparator: true,
    prefix: 'Rp ',
    value: beabpn,
    renderText: function renderText(value) {
      return react_1["default"].createElement(react_native_paper_1.TextInput, {
        label: "Masukkan besar biaya BPN (Opsional)",
        mode: "outlined",
        key: "pembayaraninput",
        style: styles_1["default"].inputTextContainer,
        defaultValue: beabpn,
        value: value,
        keyboardType: "numeric",
        disabled: setDisabled(requestData),
        theme: {
          colors: {
            placeholder: theme_1.theme.colors.placeholder,
            primary: theme_1.theme.colors.secondary,
            underlineColor: theme_1.theme.colors.secondary,
            background: '#F6F8FA'
          }
        },
        onChangeText: function onChangeText(text) {
          setBeabpn(text);
        }
      });
    }
  })), react_1["default"].createElement(react_native_1.View, {
    key: "layananheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Jenis Layanan")), subService.length > 0 ? _.uniqBy(subService, 'sub_service_id').map(function (item, index) {
    return react_1["default"].createElement(react_native_1.View, {
      style: styles_1["default"].subServiceListContainer,
      key: item.sub_service_id.toString() + index
    }, react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].checkboxDocumentLabel,
      key: 'text' + item.sub_service_id.toString() + index
    }, item.sub_service_name), requestData ? [requestData.is_approved === '0' ? removeLayananButton(item) : null] : removeLayananButton(item));
  }) : null, requestData ? [requestData.is_approved === '0' ? addLayananButton(requestData) : react_1["default"].createElement(react_native_1.View, {
    key: "notambahjenis",
    style: {
      height: 10
    }
  })] : addLayananButton(requestData), react_1["default"].createElement(react_native_1.View, {
    key: "syaratheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Syarat Dokumen")), listKelengkapan.length > 0 ? listKelengkapan.map(function (item, index) {
    return react_1["default"].createElement(react_native_1.View, {
      style: styles_1["default"].documentListContainer,
      key: item.id.toString() + index
    }, react_1["default"].createElement(react_native_1.TouchableOpacity, {
      style: styles_1["default"].documentLabelContainer,
      key: 'touch' + item.id.toString() + index,
      onPress: function onPress() {
        if (requestData && requestData.is_approved === '1') {
          onUploadPhoto(requestData, item.id, item.id_doc, item.desc, item.tempUri, false);
        } else {
          onUploadPhoto(requestData, item.id, item.id_doc, item.desc, item.tempUri, true);
        }
      }
    }, react_1["default"].createElement(react_native_1.Text, {
      key: 'txt' + item.id.toString() + index,
      style: styles_1["default"].checkboxDocumentLabel
    }, item.title), requestData ? [requestData.is_approved === '0' ? removeDocumentButton(item) : null] : removeDocumentButton(item)), react_1["default"].createElement(react_native_paper_1.Divider, {
      key: 'divider' + index,
      styles: {
        width: '80%'
      }
    }), react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].checkboxFileLabel,
      key: 'text' + item.id.toString()
    }, item.fileName ? item.fileName : '* Bukti foto belum tersedia'), item.img64 ? react_1["default"].createElement(react_native_paper_1.TextInput, {
      style: styles_1["default"].inputImgTextContainer,
      label: "Keterangan dokumen",
      defaultValue: item.desc,
      mode: "outlined",
      dense: true,
      key: 'textinput' + item.id.toString(),
      onChangeText: function onChangeText(text) {
        updateReqDocument('desc', text, item.id);
      },
      onEndEditing: function onEndEditing(e) {
        updateReqDocument('desc', e.nativeEvent.text, item.id);
      },
      theme: {
        colors: {
          placeholder: theme_1.theme.colors.placeholder,
          primary: theme_1.theme.colors.secondary,
          underlineColor: theme_1.theme.colors.secondary,
          background: theme_1.theme.colors.background
        }
      }
    }) : react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].inputImgTextContainer
    }, item.desc));
  }) : null, requestData ? [requestData.is_approved === '0' ? addDocumentButton(requestData, reqDocument) : react_1["default"].createElement(react_native_1.View, {
    key: "notambahdokumen",
    style: {
      height: 10
    }
  })] : addDocumentButton(requestData, reqDocument), requestData ? [requestData.is_approved === '1' && requestData.project_status === '1' ? react_1["default"].createElement(react_1["default"].Fragment, {
    key: 'ttdcontainerfragment'
  }, react_1["default"].createElement(react_native_1.View, {
    key: "ttdheader",
    style: styles_1["default"].textContainerHeader
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].sheetTitle
  }, "Tanda Tangan para Pihak")), ttdPihak !== undefined && ttdPihak.length > 0 ? react_1["default"].createElement(react_1["default"].Fragment, {
    key: 'ttdpihakfragment'
  }, ttdPihak.map(function (item, index) {
    return react_1["default"].createElement(react_native_1.View, {
      style: styles_1["default"].documentListContainer,
      key: 'ttdcontainer' + item.id_ttd.toString() + index
    }, react_1["default"].createElement(react_native_1.TouchableOpacity, {
      style: styles_1["default"].documentLabelContainer,
      key: 'touchttd' + item.id_ttd.toString() + index,
      onPress: function onPress() {
        onUploadPhoto(requestData, 'ttd_pihak', item.id_ttd, null, item.tempUri, true);
      }
    }, react_1["default"].createElement(react_native_1.Text, {
      key: 'txtttd' + item.id_ttd.toString() + index,
      style: styles_1["default"].checkboxDocumentLabel
    }, 'Tanda Tangan ' + (index + 1)), requestData ? react_1["default"].createElement(react_native_paper_1.IconButton, {
      style: styles_1["default"].subServiceRemove,
      icon: "close",
      color: theme_1.theme.colors.secondary,
      key: 'removettf' + item.id_ttd.toString() + index,
      onPress: function onPress() {
        var editedReqArray = _.remove(ttdPihak, function (obj) {
          return obj.id_ttd !== item.id_ttd;
        });

        setTtdPihak(editedReqArray);
      }
    }) : null), react_1["default"].createElement(react_native_paper_1.Divider, {
      key: 'divider' + index,
      styles: {
        width: '80%'
      }
    }), react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].checkboxFileLabel,
      key: 'textttdfilename' + item.id_ttd.toString()
    }, item.fileName ? item.fileName : '* Bukti foto belum tersedia'), item.img64 ? react_1["default"].createElement(react_native_paper_1.TextInput, {
      style: styles_1["default"].inputImgTextContainer,
      label: "Keterangan tanda tangan",
      defaultValue: item.desc,
      mode: "outlined",
      dense: true,
      key: 'textinputttd' + item.id_ttd.toString(),
      onChangeText: function onChangeText(text) {
        updateTtdPihak('desc', text, item.id_ttd);
      },
      onEndEditing: function onEndEditing(e) {
        updateTtdPihak('desc', e.nativeEvent.text, item.id_ttd);
      },
      theme: {
        colors: {
          placeholder: theme_1.theme.colors.placeholder,
          primary: theme_1.theme.colors.secondary,
          underlineColor: theme_1.theme.colors.secondary,
          background: theme_1.theme.colors.background
        }
      }
    }) : react_1["default"].createElement(react_native_1.Text, {
      style: styles_1["default"].inputImgTextContainer
    }, item.desc));
  })) : null, react_1["default"].createElement(react_native_1.TouchableOpacity, {
    style: styles_1["default"].addSubServiceButton,
    onPress: function onPress() {
      onUploadPhoto(requestData, 'ttd_pihak', ttdPihak.length + 1, null, null, true);
    }
  }, react_1["default"].createElement(react_native_1.Text, {
    style: styles_1["default"].addSubServiceText
  }, "Tambah Tanda Tangan"))) : react_1["default"].createElement(react_native_1.View, {
    key: "nottdpihak",
    style: {
      height: 20,
      marginTop: 20
    }
  })] : null), react_1["default"].createElement(react_native_1.View, {
    key: "submitcontainer",
    style: styles_1["default"].submitButtonContainer
  }, react_1["default"].createElement(react_native_paper_1.Button, {
    mode: "contained",
    onPress: function onPress() {
      requestData ? [requestData.is_approved === '0' ? onSubmit() : [requestData.is_approved === '1' && requestData.project_status === '1' ? onApproval() : onSubmit()]] : onSubmit();
    },
    labelStyle: [styles_1["default"].buttonSubmitLabel],
    loading: loader ? true : false,
    disabled: loader ? true : false,
    style: styles_1["default"].buttonSubmit
  }, loader ? 'Mengirimkan..' : [requestData ? [requestData.is_approved === '0' ? 'Perbarui Request' : [requestData.is_approved === '1' && requestData.project_status === '1' ? 'Konfirmasi Tanda Tangan' : 'Perbarui Request']] : 'Ajukan Request']))))));
};

exports["default"] = CreateRequest;