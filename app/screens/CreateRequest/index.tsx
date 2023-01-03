import React, { useCallback, useMemo, useRef, useState } from 'react';

import styles from './styles';
import { theme } from 'app/core/theme';
import { apiUrl as api } from 'app/core/apiUrl';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  IconButton,
  TextInput,
  Divider,
  Button,
  RadioButton,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import Spinner from 'react-native-loading-spinner-overlay';
import NavigationService from 'app/navigation/NavigationService';
import NumberFormat from 'react-number-format';

var _ = require('lodash');

interface IState {
  loginReducer: ILoginState;
}

const CreateRequest: FC = ({ route }) => {
  //param data
  const item_capture = route !== undefined ? route.params.item : null;
  const id_kelengkapan =
    route !== undefined ? route.params.id_kelengkapan : null;
  const id_document = route !== undefined ? route.params.id_document : null;
  const document_data = route !== undefined ? route.params.document_data : null;
  const sub_service = route !== undefined ? route.params.sub_service : null;
  const bank_data = route !== undefined ? route.params.bank : null;
  const jenis_data = route !== undefined ? route.params.jenis : null;
  //route bukti pembayaran
  const bukti_pembayaran =
    route !== undefined ? route.params.bukti_pembayaran : null;
  const bukti_pembayaran_filename =
    route !== undefined ? route.params.bukti_pembayaran_filename : null;
  const bukti_pembayaran_uri =
    route !== undefined ? route.params.bukti_pembayaran_uri : null;
  //route ttd pihak
  const id_ttd = route !== undefined ? route.params.id_ttd : null;
  const ttd_data = route !== undefined ? route.params.ttd_data : null;
  //user data
  const userData = useSelector((state) => state.loginReducer.userData);

  //navigation service
  const onBack = () => NavigationService.goBack();
  const onRequestList = (project_id, project_name, project_desc) =>
    NavigationService.navigate('RequestList', {
      project_id: project_id,
      project_name: project_name,
      project_desc: project_desc,
    });
  const onProjectRequestList = () =>
    NavigationService.navigate('Home', {
      onRefresh: true,
    });
  const onSearchList = (item, listType, id, title) =>
    NavigationService.navigate('SearchList', {
      item: item,
      list_type: listType,
      type_id: serviceType,
      id_kelengkapan: id,
      title: title,
    });
  const onUploadPhoto = (item, id, id_doc, desc, uri, isButton) => {
    NavigationService.navigate('UploadPhoto', {
      item: item,
      id_kelengkapan: id,
      id_document: id_doc,
      desc: desc,
      uri: uri,
      referrer: 'CreateRequest',
      isButton: isButton,
    });
  };

  //bottom sheet logic
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['65%', '100%'], []);

  //Hooks
  //form data
  const [requestData, setRequestData] = useState(null);
  const [bank, setBank] = useState('');
  const [jenis, setJenis] = useState('');
  const [klien, setKlien] = useState('');
  const [kontak, setKontak] = useState('');
  const [nama, setNama] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const [jenisPembayaran, setJenisPembayaran] = useState(2);
  const [pembayaran, setPembayaran] = useState('');
  const [detailPembayaran, setDetailPembayaran] = useState('');
  const [beanotaris, setBeanotaris] = useState('');
  const [beabpn, setBeabpn] = useState('');
  const [plafondAwal, setPlafondAwal] = useState('');
  const [plafondAkhir, setPlafondAkhir] = useState('');
  const [buktiPembayaran, setBuktiPembayaran] = useState(null);

  const [serviceType, setServiceType] = useState(0);

  const [reqDocument, setReqDocument] = useState([]);
  const [oldReqDocument, setOldReqDocument] = useState([]);
  //updated reqdocument
  const [deletedReqDocument, setDeletedReqDocument] = useState([]);
  const [addedReqDocument, setAddedReqDocument] = useState([]);

  const [ttdPihak, setTtdPihak] = useState([]);

  const [subService, setSubService] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [, updateState] = useState();

  //refs
  const bankInput = useRef(null);
  const klienInput = useRef(null);
  const jenisKreditInput = useRef(null);
  const kontakInput = useRef(null);
  const namaInput = useRef(null);
  const keteranganInput = useRef(null);

  //picker logic
  const [listServiceType, setListServiceType] = useState([]);
  //checkbox logic
  const [listKelengkapan, setListKelengkapan] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [kelengkapan, setKelengkapan] = useState(listKelengkapan);

  // callbacks
  //use to force re render
  const forceUpdate = useCallback(() => updateState({}), []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const onSubmit = () => {
    if (klien === '') {
      Alert.alert('Submit Failed', 'Anda belum mengisi kolom isian nama klien');
    } else if (kontak === '') {
      Alert.alert('Submit Failed', 'Anda belum mengisi kolom kontak klien');
    } else {
      if (serviceType === '1') {
        if (bank === '') {
          Alert.alert('Submit Failed', 'Anda belum mengisi kolom isian bank');
        } else {
          postData();
        }
      } else {
        setBank('');
        postData();
      }
    }
  };

  const postData = () => {
    if (nama === '') {
      namaInput.current.focus();
    } else if (kontak === '') {
      kontakInput.current.focus();
    } else if (!requestData && reqDocument.length === 0) {
      Alert.alert(
        'Submit Failed',
        'Anda belum mengisi bukti kelengkapan dokumen',
      );
    } else if (!requestData && reqDocument.length !== addedReqDocument.length) {
      Alert.alert(
        'Submit Failed',
        'Ada dokumen yang belum memiliki bukti foto',
      );
    } else if (requestData && reqDocument.length !== addedReqDocument.length) {
      Alert.alert(
        'Submit Failed',
        'Ada dokumen yang belum memiliki bukti foto',
      );
    } else if (subService.length === 0) {
      Alert.alert('Submit Failed', 'Anda belum mengisi jenis layanan');
    } else {
      //setloader set form data
      setLoader(true);
      const data = new FormData();
      var apiUrl = api.api + 'request_v3';
      if (item_capture) {
        data.append('id_req', requestData.id);
        data.append('name', 'request_update');
        apiUrl = api.api + 'new_requestupdate';
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
      data.append('request_name', nama.replace(/[^\w\s.,/]/gi, ''));
      data.append('keterangan', keterangan);

      data.append('jenis_pembayaran', jenisPembayaran);
      data.append('pembayaran', pembayaran.replace(/\D/g, ''));
      data.append('detail_pembayaran', detailPembayaran);
      data.append('bea_notaris', beanotaris.replace(/\D/g, ''));
      data.append('bea_bpn', beabpn.replace(/\D/g, ''));
      data.append('bukti_pembayaran', buktiPembayaran);
      //sub-service array map to string
      data.append(
        'sub_services',
        JSON.stringify(_.uniqBy(subService, 'sub_service_id')),
      );
      //assign deleted req document
      data.append(
        'deleted_request_document',
        JSON.stringify(deletedReqDocument),
      );
      //kelengkapan array map to string
      data.append(
        'request_document',
        JSON.stringify(
          _.uniqBy(
            _.filter(reqDocument, (o) => {
              return o.img64 !== null;
            }),
            'id',
          ),
        ),
      );
      // console.log('reqdocument sent', reqDocument);
      // console.log('deletedreqdocument sent', deletedReqDocument);
      // console.log(data);
      // api URL switch when update or insert then POST
      fetch(apiUrl, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          setLoader(false);
          // console.log(response.text());
          response
            .json()
            .then((dataRes) => {
              if (dataRes.success == true) {
                Alert.alert(
                  'Submit Success',
                  'Request berhasil disimpan, menunggu konfirmasi',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        bottomSheetRef.current.close();
                        onProjectRequestList();
                      },
                    },
                  ],
                );
              }
            })
            .catch((error) => {
              Alert.alert('Submit Failed', 'Ada masalah pada server');
              console.error(error);
            });
        })
        .catch((error) => console.error('network error', error));
    }
  };

  const onApproval = () => {
    setLoader(true);
    const data = new FormData();
    data.append('id_req', requestData.id);
    data.append('id_user', userData.iduser);
    data.append('ttd_pihak', JSON.stringify(ttdPihak));
    console.log(ttdPihak);
    if (ttdPihak.length > 0) {
      fetch(api.api + 'confirmproject', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          setLoader(false);
          // console.log(response.text());
          response
            .json()
            .then((dataRes) => {
              if (dataRes.success == true) {
                Alert.alert(
                  'Submit Success',
                  'Dokumen telah berhasil ditandatangani',
                  [
                    {
                      text: 'OK',
                      onPress: () =>
                        onRequestList(
                          serviceType,
                          _.find(listServiceType, ['id', serviceType])
                            .type_name,
                          null,
                        ),
                    },
                  ],
                );
              }
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error('network error', error));
    } else {
      setLoader(false);
      Alert.alert(
        'Submit Failed',
        'Anda belum menambahkan bukti tanda tangan pihak',
      );
    }
  };

  const updateReqDocument = (prop, value, id) => {
    const clone = [...reqDocument];
    const listClone = [...listKelengkapan];
    clone.forEach((item) => {
      if (item.id === id) {
        item.desc = value;
      }
    });
    listClone.forEach((item) => {
      if (item.id === id) {
        item.desc = value;
      }
    });
    setReqDocument(clone);
    setListKelengkapan(listClone);
  };

  const updateTtdPihak = (prop, value, id) => {
    const clone = [...ttdPihak];
    clone.forEach((item) => {
      if (item.id_ttd === id) {
        item.desc = value;
      }
    });
    setTtdPihak(clone);
  };

  //should update useEffect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //fetch list dokumen checklist
  React.useEffect(() => {
    const abortController = new AbortController();
    setRefreshing(true);
    setLoader(true);
    fetch(api.api + 'servicetype', { signal: abortController.signal }).then(
      (response) => {
        response
          .json()
          .then((data) => {
            setListServiceType(data.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.name === 'AbortError') return;
            // if the query has been aborted, do nothing
            throw error;
          })
          .finally(() => {
            setLoader(false);
            setRefreshing(false);
          });
      },
    );
    return () => {
      abortController.abort();
      setReqDocument([]);
      setListServiceType([]);
      // stop the query by aborting on the AbortController on unmount
    };
  }, []);

  //set subservice list option
  React.useEffect(() => {
    if (serviceType !== 0 && item_capture === null) {
      bottomSheetRef.current.snapTo(1);
      setSubService([]);
      setListKelengkapan([]);
    } else {
      bottomSheetRef.current.close();
    }
  }, [item_capture, serviceType]);

  React.useEffect(() => {
    if (sub_service) {
      bottomSheetRef.current.expand();
      setSubService((oldArray) => [...oldArray, sub_service]);
    }
    forceUpdate();
  }, [sub_service, forceUpdate]);

  React.useEffect(() => {
    if (bank_data) {
      bottomSheetRef.current.expand();
      setBank(bank_data);
      bankInput.current.blur();
      if (bankInput.current.isFocused()) {
        bankInput.current.blur();
      }
    }
    forceUpdate();
  }, [bank_data, forceUpdate]);

  React.useEffect(() => {
    if (jenis_data) {
      jenisKreditInput.current.blur();
      bottomSheetRef.current.expand();
      setJenis(jenis_data);
      if (jenisKreditInput.current.isFocused()) {
        jenisKreditInput.current.blur();
      }
    }
    forceUpdate();
  }, [jenis_data, forceUpdate]);

  //add request document array
  React.useEffect(() => {
    if (item_capture && id_document && document_data) {
      listKelengkapan.forEach((item) => {
        if (item.id === id_kelengkapan) {
          item.checked = true;
          item.fileName = document_data.fileName;
          var collectedDocument = reqDocument;
          collectedDocument.push(document_data);
          collectedDocument = _.uniqBy(
            _.filter(reqDocument, (o) => {
              return o.img64 !== null;
            }),
            'id',
          );
          setReqDocument(collectedDocument);
        }
      });
      setListKelengkapan(listKelengkapan);
      setRequestData(item_capture);
      setServiceType(item_capture.request_service_id);
      forceUpdate();
      // handlePresentModalPress(item_capture);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    item_capture,
    id_kelengkapan,
    id_document,
    document_data,
    listKelengkapan,
    forceUpdate,
  ]);

  // create request take photo logic
  React.useEffect(() => {
    if (id_document && document_data) {
      // console.log('after capture', id_document, document_data);
      if (document_data.fileName) {
        listKelengkapan.forEach((item) => {
          if (item.id === id_kelengkapan) {
            item.checked = true;
            item.fileName = document_data.fileName;
            item.img64 = document_data.img64;
            item.tempUri = document_data.tempUri;
            var collectedDocument = reqDocument;
            collectedDocument.push(document_data);
            collectedDocument = _.uniqBy(
              _.filter(reqDocument, (o) => {
                return o.img64 !== null;
              }),
              'id',
            );
            setReqDocument(collectedDocument);
          }
        });
        var addedDoc = [...addedReqDocument];
        addedDoc.push(document_data);
        addedDoc = _.uniqBy(addedDoc, 'id');
        setListKelengkapan(listKelengkapan);
        // setAddedReqDocument((oldArray) => [...oldArray, document_data]);
        setAddedReqDocument(addedDoc);
      } else {
        const kelengkapanObj = {
          id: listKelengkapan.length,
          id_doc: id_document,
          title: document_data.document_name,
          checked: false,
          fileName: null,
          desc: document_data.desc,
        };
        // console.log('add kelengkapan', kelengkapanObj);
        var addedDoc = [...addedReqDocument];
        addedDoc.push(kelengkapanObj);
        addedDoc = _.uniqBy(addedDoc, 'id');
        setListKelengkapan((oldArray) => [...oldArray, kelengkapanObj]);
        setAddedReqDocument(addedDoc);
      }

      forceUpdate();
      // handlePresentModalPress(item_capture);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_kelengkapan, id_document, document_data, forceUpdate]);

  React.useEffect(() => {
    if (id_ttd && ttd_data) {
      // console.log('after ttd capture', id_ttd, ttd_data);
      if (ttd_data.fileName) {
        var collectedTtd = ttdPihak;
        collectedTtd.push(ttd_data);
        setTtdPihak(collectedTtd);
      }

      forceUpdate();
      // handlePresentModalPress(item_capture);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_ttd, ttd_data, forceUpdate]);

  React.useEffect(() => {
    if (bukti_pembayaran && bukti_pembayaran_filename) {
      setBuktiPembayaran(bukti_pembayaran);
      forceUpdate();
    }
  }, [bukti_pembayaran, bukti_pembayaran_filename, forceUpdate]);

  React.useEffect(() => {
    if (item_capture) {
      // console.log('cek detail', item_capture);
      bottomSheetRef.current.snapTo(1);
      setRequestData(item_capture);
      setNama(item_capture.request_name);
      setKeterangan(item_capture.keterangan);
      setKlien(item_capture.request_client);
      setKontak(item_capture.request_contact);

      if (item_capture.request_kredit_id && item_capture.nama_kredit) {
        setJenis({
          jenis_id: item_capture.request_kredit_id,
          jenis_name: item_capture.nama_kredit,
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
          bank_name: item_capture.nama_bank,
        });
      }
      //generate document list
      var dataKelengkapan = [];
      var tempOldReqDocument = [];
      if (item_capture.request_document !== undefined) {
        item_capture.request_document.forEach((element) => {
          dataKelengkapan.push({
            id: element.id,
            id_doc: element.request_dokumen_id,
            title: element.nama_dokumen,
            checked: true,
            fileName: 'Bukti foto tersedia',
            desc: element.request_dokumen_desc,
          });
          element.img64 = null;
          tempOldReqDocument.push(element);
        });
      }
      setOldReqDocument(tempOldReqDocument);
      // setReqDocument(tempOldReqDocument);
      setListKelengkapan(dataKelengkapan);
      setLoader(false);
      forceUpdate();
    }
  }, [item_capture, forceUpdate]);

  React.useEffect(() => {
    // setReqDocument(item_capture.request_document);
    forceUpdate();
  }, [listKelengkapan, forceUpdate]);

  //jsx component
  const removeLayananButton = (item) => {
    return (
      <IconButton
        style={styles.subServiceRemove}
        icon="close"
        color={theme.colors.secondary}
        key={'remove_layanan' + item.sub_service_id.toString()}
        onPress={() => {
          const editedArray = _.remove(subService, (obj) => {
            return obj !== item;
          });
          setSubService(editedArray);
        }}
      />
    );
  };

  const removeDocumentButton = (item) => {
    return (
      <IconButton
        style={styles.subServiceRemove}
        icon="close"
        color={theme.colors.secondary}
        key={'removedoc' + item.id.toString()}
        onPress={() => {
          const editedArray = _.remove(listKelengkapan, (obj) => {
            return obj !== item;
          });
          var editedReqArray = [];
          if (reqDocument.length > 0) {
            editedReqArray = _.remove(reqDocument, (obj) => {
              return obj.id !== item.id;
            });
          }

          if (requestData) {
            if (requestData.is_approved === '0') {
              const editedAddedArray = _.remove(addedReqDocument, (obj) => {
                return obj !== item;
              });

              const deletedObj = _.find(requestData.request_document, {
                id: item.id,
              });
              if (deletedObj !== undefined && deletedObj !== null) {
                setDeletedReqDocument((oldArray) => [...oldArray, deletedObj]);
              }

              setAddedReqDocument(editedAddedArray);
            }
          }

          setListKelengkapan(editedArray);
          setReqDocument(editedReqArray);
          forceUpdate();
        }}
      />
    );
  };

  const setDisabled = (requestData) => {
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

  const addLayananButton = (requestData) => {
    return (
      <TouchableOpacity
        key="tambahjenislayanan"
        style={styles.addSubServiceButton}
        onPress={() => {
          onSearchList(requestData, 'sub-service', null, 'Sub-Layanan');
        }}>
        <Text style={styles.addSubServiceText}>Tambah Jenis Layanan</Text>
      </TouchableOpacity>
    );
  };
  const addDocumentButton = (requestData, reqDocument) => {
    return (
      <TouchableOpacity
        key="touchtambahdokumen"
        style={styles.addSubServiceButton}
        onPress={() => {
          onSearchList(requestData, 'document', reqDocument.length, 'Dokumen');
        }}>
        <Text key="texttambahdokumen" style={styles.addSubServiceText}>
          Tambah Dokumen
        </Text>
      </TouchableOpacity>
    );
  };

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

  return (
    <React.Fragment key={'containerviewfragment'}>
      <View key="containerview" style={styles.background}>
        <Spinner
          visible={loader}
          textContent={'Mohon tunggu ...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.headerContainer}>
          <View style={styles.iconHeader}>
            <IconButton
              icon="arrow-left"
              size={30}
              color="#ffffff"
              onPress={() => onBack()}
            />
          </View>
          <View style={styles.textContainerHeader}>
            <Text style={styles.headerText}>Buat Request</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.headingTextContainer}>
          <Text style={styles.headerText}>Pilih Jenis Layanan</Text>
        </View>
        <View style={styles.listContainer}>
          {listServiceType.length > 0 ? (
            <View style={styles.serviceMenuContainer}>
              {listServiceType.map((project) => {
                return (
                  <TouchableOpacity
                    key={'touchservice' + project.id}
                    style={
                      project.id === serviceType
                        ? styles.serviceMenuSelected
                        : styles.serviceMenu
                    }
                    onPress={() => {
                      if (!item_capture) {
                        setServiceType(project.id);
                      }
                    }}>
                    <React.Fragment key={'servicefragment' + project.id}>
                      <View
                        key={'viewcontainer1' + project.id}
                        style={styles.serviceImageContainer}>
                        <Image
                          key={'img' + project.id}
                          source={{ uri: project.type_image }}
                          style={styles.serviceImage}
                        />
                      </View>
                      <View
                        key={'viewcontainer2' + project.id}
                        style={styles.serviceTextContainer}>
                        <Text
                          key={'txt' + project.id}
                          style={styles.serviceText}>
                          {project.type_name}
                        </Text>
                      </View>
                    </React.Fragment>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        <View style={styles.backgroundImageContainer}>
          <Image
            source={require('../../assets/illustrasi-create-3.png')}
            style={styles.backgroundImage}
          />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <KeyboardAvoidingView
            key={'bsviewcontainer'}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.sheetContainer}>
            <ScrollView
              fadingEdgeLength={30}
              style={styles.bottomSheetScrollView}>
              <React.Fragment key={'namaklienfragment'}>
                <View key="klienheader" style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Nama Klien</Text>
                </View>
                <TextInput
                  label="Masukkan nama klien"
                  mode="outlined"
                  key="klieninput"
                  style={styles.inputTextContainer}
                  ref={klienInput}
                  defaultValue={klien}
                  value={klien}
                  onChangeText={(text) => setKlien(text)}
                  disabled={setDisabled(requestData)}
                  onSubmitEditing={() => {
                    klienInput.current.focus();
                  }}
                  autoCapitalize="words"
                  theme={{
                    colors: {
                      placeholder: theme.colors.placeholder,
                      primary: theme.colors.secondary,
                      underlineColor: theme.colors.secondary,
                      background: '#F6F8FA',
                    },
                  }}
                />
              </React.Fragment>
              <React.Fragment key={'kontakklienfragment'}>
                <View key="klienheader" style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Kontak Klien</Text>
                </View>
                <TextInput
                  label="Masukkan kontak klien (Nomor HP)"
                  mode="outlined"
                  key="kontakinput"
                  style={styles.inputTextContainer}
                  ref={kontakInput}
                  defaultValue={kontak}
                  value={kontak}
                  onChangeText={(text) => setKontak(text)}
                  disabled={setDisabled(requestData)}
                  keyboardType="numeric"
                  onSubmitEditing={() => {
                    namaInput.current.focus();
                  }}
                  autoCapitalize="words"
                  theme={{
                    colors: {
                      placeholder: theme.colors.placeholder,
                      primary: theme.colors.secondary,
                      underlineColor: theme.colors.secondary,
                      background: '#F6F8FA',
                    },
                  }}
                />
              </React.Fragment>
              {serviceType === '1' ? (
                <React.Fragment key={'banklistfragment'}>
                  <View key="bankheader" style={styles.textContainerHeader}>
                    <Text style={styles.sheetTitle}>Nama Bank</Text>
                  </View>
                  <TextInput
                    label="Masukkan nama bank"
                    mode="outlined"
                    key="bankinput"
                    style={styles.inputTextContainer}
                    ref={bankInput}
                    value={bank.bank_name || ''}
                    disabled={setDisabled(requestData)}
                    onFocus={() => {
                      if (requestData) {
                        if (requestData.is_approved === '0') {
                          onSearchList(requestData, 'bank', null, 'Bank');
                        }
                      } else {
                        onSearchList(requestData, 'bank', null, 'Bank');
                      }
                    }}
                    theme={{
                      colors: {
                        placeholder: theme.colors.placeholder,
                        primary: theme.colors.secondary,
                        underlineColor: theme.colors.secondary,
                        background: '#F6F8FA',
                      },
                    }}
                  />
                  <View style={styles.textContainerHeader}>
                    <Text style={styles.sheetTitle}>Jenis Kredit</Text>
                  </View>
                  <TextInput
                    label="Pilih Jenis Kredit"
                    mode="outlined"
                    key="jenisinput"
                    ref={jenisKreditInput}
                    style={styles.inputTextContainer}
                    value={jenis.jenis_name || ''}
                    disabled={setDisabled(requestData)}
                    onFocus={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setTimeout(() => {
                        if (requestData) {
                          if (requestData.is_approved === '0') {
                            onSearchList(
                              requestData,
                              'jenis_perbankan',
                              null,
                              'Jenis Kredit',
                            );
                          }
                        } else {
                          onSearchList(
                            requestData,
                            'jenis_perbankan',
                            null,
                            'Jenis Kredit',
                          );
                        }
                      }, 500);
                    }}
                    theme={{
                      colors: {
                        placeholder: theme.colors.placeholder,
                        primary: theme.colors.secondary,
                        underlineColor: theme.colors.secondary,
                        background: '#F6F8FA',
                      },
                    }}
                  />
                  <View key="plafondheader" style={styles.textContainerHeader}>
                    <Text style={styles.sheetTitle}>Plafond</Text>
                  </View>
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp '}
                    key="plafondaawalinput"
                    value={plafondAwal}
                    renderText={(value) => (
                      <TextInput
                        label="Masukkan biaya plafond awal"
                        mode="outlined"
                        style={styles.inputTextContainer}
                        defaultValue={plafondAwal}
                        value={value}
                        keyboardType="numeric"
                        disabled={setDisabled(requestData)}
                        theme={{
                          colors: {
                            placeholder: theme.colors.placeholder,
                            primary: theme.colors.secondary,
                            underlineColor: theme.colors.secondary,
                            background: '#F6F8FA',
                          },
                        }}
                        onChangeText={(text) => {
                          setPlafondAwal(text);
                        }}
                      />
                    )}
                  />
                  {jenis !== '' && [
                    jenis.jenis_id === '2' || jenis.jenis_id === '3' ? (
                      <NumberFormat
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp '}
                        key="plafondakhirinput"
                        value={plafondAkhir}
                        renderText={(value) => (
                          <TextInput
                            label="Masukkan biaya plafond akhir"
                            mode="outlined"
                            style={styles.inputTextContainer}
                            defaultValue={plafondAkhir}
                            value={value}
                            keyboardType="numeric"
                            disabled={setDisabled(requestData)}
                            theme={{
                              colors: {
                                placeholder: theme.colors.placeholder,
                                primary: theme.colors.secondary,
                                underlineColor: theme.colors.secondary,
                                background: '#F6F8FA',
                              },
                            }}
                            onChangeText={(text) => {
                              setPlafondAkhir(text);
                            }}
                          />
                        )}
                      />
                    ) : null,
                  ]}
                </React.Fragment>
              ) : null}

              <View key="judulheader" style={styles.textContainerHeader}>
                <Text style={styles.sheetTitle}>Nama Order</Text>
              </View>
              <TextInput
                label="Masukkan nama order"
                mode="outlined"
                key="namainput"
                style={styles.inputTextContainer}
                ref={namaInput}
                defaultValue={nama}
                value={nama}
                onChangeText={(text) => setNama(text)}
                disabled={setDisabled(requestData)}
                onSubmitEditing={() => {
                  keteranganInput.current.focus();
                }}
                theme={{
                  colors: {
                    placeholder: theme.colors.placeholder,
                    primary: theme.colors.secondary,
                    underlineColor: theme.colors.secondary,
                    background: '#F6F8FA',
                  },
                }}
              />
              <View key="deskripsiheader" style={styles.textContainerHeader}>
                <Text style={styles.sheetTitle}>Catatan Order</Text>
              </View>
              <TextInput
                mode="outlined"
                style={[styles.inputTextContainer, styles.inputTextArea]}
                label="Masukkan catatan order"
                key="deskripsiinput"
                ref={keteranganInput}
                defaultValue={keterangan}
                value={keterangan}
                disabled={setDisabled(requestData)}
                onChangeText={(text) => setKeterangan(text)}
                theme={{
                  colors: {
                    placeholder: theme.colors.placeholder,
                    primary: theme.colors.secondary,
                    underlineColor: theme.colors.secondary,
                    background: '#F6F8FA',
                  },
                }}
                multiline
              />
              {serviceType !== '1' ? (
                <React.Fragment key={'detailpembayaranfragment'}>
                  <View
                    key="pembayaranheader"
                    style={styles.textContainerHeader}>
                    <Text key="detailpembayarantext" style={styles.sheetTitle}>
                      Detail Pembayaran (Opsional)
                    </Text>
                  </View>
                  <React.Fragment key={'radiocontainerfragment'}>
                    <View key="radiocontainer " style={styles.radioContainer}>
                      <TouchableOpacity
                        key="radiodp"
                        style={[styles.radioInputContainer, { marginRight: 5 }]}
                        onPress={() => setJenisPembayaran(0)}>
                        <RadioButton
                          value={0}
                          status={
                            jenisPembayaran === 0 ? 'checked' : 'unchecked'
                          }
                          disabled={setDisabled(requestData)}
                          color={theme.colors.secondary}
                          onPress={() => setJenisPembayaran(0)}
                        />
                        <Text>DP/Uang Muka</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        key="radiolunas"
                        style={styles.radioInputContainer}
                        onPress={() => setJenisPembayaran(1)}>
                        <RadioButton
                          value={1}
                          status={
                            jenisPembayaran === 1 ? 'checked' : 'unchecked'
                          }
                          disabled={setDisabled(requestData)}
                          color={theme.colors.secondary}
                          onPress={() => setJenisPembayaran(1)}
                        />
                        <Text>Lunas</Text>
                      </TouchableOpacity>
                    </View>
                    <NumberFormat
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp '}
                      value={pembayaran}
                      renderText={(value) => (
                        <TextInput
                          label="Masukkan besar pembayaran"
                          mode="outlined"
                          key="pembayaraninput"
                          style={styles.inputTextContainer}
                          defaultValue={pembayaran}
                          value={value}
                          keyboardType="numeric"
                          disabled={setDisabled(requestData)}
                          theme={{
                            colors: {
                              placeholder: theme.colors.placeholder,
                              primary: theme.colors.secondary,
                              underlineColor: theme.colors.secondary,
                              background: '#F6F8FA',
                            },
                          }}
                          onChangeText={(text) => {
                            setPembayaran(text);
                          }}
                        />
                      )}
                    />
                    <TextInput
                      label="Masukkan detail pembayaran"
                      mode="outlined"
                      key="pembayaraninput"
                      style={styles.inputTextContainer}
                      defaultValue={detailPembayaran}
                      disabled={setDisabled(requestData)}
                      theme={{
                        colors: {
                          placeholder: theme.colors.placeholder,
                          primary: theme.colors.secondary,
                          underlineColor: theme.colors.secondary,
                          background: '#F6F8FA',
                        },
                      }}
                      onChangeText={(text) => {
                        setDetailPembayaran(text);
                      }}
                      multiline
                    />
                    <React.Fragment key={'buktibayarcontainerfragment'}>
                      {requestData
                        ? [
                            buktiPembayaran &&
                            requestData.request_payment !== '2' ? (
                              <View
                                key="buktibayarcontainer"
                                style={styles.buktiBayarContainer}>
                                <Text style={styles.buktiBayarHeaderText}>
                                  Bukti Pembayaran Tersedia
                                </Text>
                                <Text style={styles.buktiBayarSubHeaderText}>
                                  {bukti_pembayaran_filename}
                                </Text>
                              </View>
                            ) : null,
                          ]
                        : [
                            bukti_pembayaran_uri ||
                            bukti_pembayaran_uri !== undefined ? (
                              <View
                                key="buktibayarcontainer"
                                style={styles.buktiBayarContainer}>
                                <Text style={styles.buktiBayarHeaderText}>
                                  Bukti Pembayaran Terpilih
                                </Text>
                                <Text style={styles.buktiBayarSubHeaderText}>
                                  {bukti_pembayaran_filename}
                                </Text>
                              </View>
                            ) : null,
                          ]}
                      <TouchableOpacity
                        style={styles.addSubServiceButton}
                        onPress={() => {
                          var flag = true;
                          if (requestData) {
                            if (requestData.is_approved === '0') {
                              flag = true;
                            } else {
                              flag = false;
                            }
                          }
                          onUploadPhoto(
                            requestData,
                            'bukti_pembayaran',
                            null,
                            null,
                            bukti_pembayaran_uri,
                            flag,
                          );
                        }}>
                        <Text style={styles.addSubServiceText}>
                          {requestData
                            ? [
                                requestData.is_approved === '0'
                                  ? [
                                      bukti_pembayaran_uri ||
                                      bukti_pembayaran_uri !== undefined
                                        ? 'Ubah Bukti Pembayaran'
                                        : 'Tambah Bukti Bayar',
                                    ]
                                  : 'Lihat Bukti Bayar',
                              ]
                            : [
                                bukti_pembayaran_uri ||
                                bukti_pembayaran_uri !== undefined
                                  ? 'Ubah Bukti Pembayaran'
                                  : 'Tambah Bukti Bayar',
                              ]}
                        </Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  </React.Fragment>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <View
                    key="pembayaranbankheader"
                    style={styles.textContainerHeader}>
                    <Text style={styles.sheetTitle}>Detail Pembayaran</Text>
                  </View>
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp '}
                    value={beanotaris}
                    renderText={(value) => (
                      <TextInput
                        label="Masukkan besar biaya Notaris"
                        mode="outlined"
                        key="pembayaraninput"
                        style={styles.inputTextContainer}
                        defaultValue={beanotaris}
                        value={value}
                        keyboardType="numeric"
                        disabled={setDisabled(requestData)}
                        theme={{
                          colors: {
                            placeholder: theme.colors.placeholder,
                            primary: theme.colors.secondary,
                            underlineColor: theme.colors.secondary,
                            background: '#F6F8FA',
                          },
                        }}
                        onChangeText={(text) => {
                          setBeanotaris(text);
                        }}
                      />
                    )}
                  />
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp '}
                    value={beabpn}
                    renderText={(value) => (
                      <TextInput
                        label="Masukkan besar biaya BPN (Opsional)"
                        mode="outlined"
                        key="pembayaraninput"
                        style={styles.inputTextContainer}
                        defaultValue={beabpn}
                        value={value}
                        keyboardType="numeric"
                        disabled={setDisabled(requestData)}
                        theme={{
                          colors: {
                            placeholder: theme.colors.placeholder,
                            primary: theme.colors.secondary,
                            underlineColor: theme.colors.secondary,
                            background: '#F6F8FA',
                          },
                        }}
                        onChangeText={(text) => {
                          setBeabpn(text);
                        }}
                      />
                    )}
                  />
                </React.Fragment>
              )}
              <View key="layananheader" style={styles.textContainerHeader}>
                <Text style={styles.sheetTitle}>Jenis Layanan</Text>
              </View>
              {subService.length > 0
                ? _.uniqBy(subService, 'sub_service_id').map((item, index) => (
                    <View
                      style={styles.subServiceListContainer}
                      key={item.sub_service_id.toString() + index}>
                      <Text
                        style={styles.checkboxDocumentLabel}
                        key={'text' + item.sub_service_id.toString() + index}>
                        {item.sub_service_name}
                      </Text>
                      {requestData
                        ? [
                            requestData.is_approved === '0'
                              ? removeLayananButton(item)
                              : null,
                          ]
                        : removeLayananButton(item)}
                    </View>
                  ))
                : null}
              {requestData
                ? [
                    requestData.is_approved === '0' ? (
                      addLayananButton(requestData)
                    ) : (
                      <View key="notambahjenis" style={{ height: 10 }}></View>
                    ),
                  ]
                : addLayananButton(requestData)}
              <View key="syaratheader" style={styles.textContainerHeader}>
                <Text style={styles.sheetTitle}>Syarat Dokumen</Text>
              </View>
              {listKelengkapan.length > 0
                ? listKelengkapan.map((item, index) => (
                    <View
                      style={styles.documentListContainer}
                      key={item.id.toString() + index}>
                      <TouchableOpacity
                        style={styles.documentLabelContainer}
                        key={'touch' + item.id.toString() + index}
                        onPress={() => {
                          if (requestData && requestData.is_approved === '1') {
                            onUploadPhoto(
                              requestData,
                              item.id,
                              item.id_doc,
                              item.desc,
                              item.tempUri,
                              false,
                            );
                          } else {
                            onUploadPhoto(
                              requestData,
                              item.id,
                              item.id_doc,
                              item.desc,
                              item.tempUri,
                              true,
                            );
                          }
                        }}>
                        <Text
                          key={'txt' + item.id.toString() + index}
                          style={styles.checkboxDocumentLabel}>
                          {item.title}
                        </Text>
                        {requestData
                          ? [
                              requestData.is_approved === '0'
                                ? removeDocumentButton(item)
                                : null,
                            ]
                          : removeDocumentButton(item)}
                      </TouchableOpacity>
                      <Divider
                        key={'divider' + index}
                        styles={{ width: '80%' }}
                      />
                      <Text
                        style={styles.checkboxFileLabel}
                        key={'text' + item.id.toString()}>
                        {item.fileName
                          ? item.fileName
                          : '* Bukti foto belum tersedia'}
                      </Text>
                      {item.img64 ? (
                        <TextInput
                          style={styles.inputImgTextContainer}
                          label="Keterangan dokumen"
                          defaultValue={item.desc}
                          mode="outlined"
                          dense={true}
                          key={'textinput' + item.id.toString()}
                          onChangeText={(text) => {
                            updateReqDocument('desc', text, item.id);
                          }}
                          onEndEditing={(e) => {
                            updateReqDocument(
                              'desc',
                              e.nativeEvent.text,
                              item.id,
                            );
                          }}
                          theme={{
                            colors: {
                              placeholder: theme.colors.placeholder,
                              primary: theme.colors.secondary,
                              underlineColor: theme.colors.secondary,
                              background: theme.colors.background,
                            },
                          }}
                        />
                      ) : (
                        <Text style={styles.inputImgTextContainer}>
                          {item.desc}
                        </Text>
                      )}
                    </View>
                  ))
                : null}
              {requestData
                ? [
                    requestData.is_approved === '0' ? (
                      addDocumentButton(requestData, reqDocument)
                    ) : (
                      <View key="notambahdokumen" style={{ height: 10 }}></View>
                    ),
                  ]
                : addDocumentButton(requestData, reqDocument)}

              {requestData
                ? [
                    requestData.is_approved === '1' &&
                    requestData.project_status === '1' ? (
                      <React.Fragment key={'ttdcontainerfragment'}>
                        <View
                          key="ttdheader"
                          style={styles.textContainerHeader}>
                          <Text style={styles.sheetTitle}>
                            Tanda Tangan para Pihak
                          </Text>
                        </View>
                        {ttdPihak !== undefined && ttdPihak.length > 0 ? (
                          <React.Fragment key={'ttdpihakfragment'}>
                            {ttdPihak.map((item, index) => (
                              <View
                                style={styles.documentListContainer}
                                key={
                                  'ttdcontainer' +
                                  item.id_ttd.toString() +
                                  index
                                }>
                                <TouchableOpacity
                                  style={styles.documentLabelContainer}
                                  key={
                                    'touchttd' + item.id_ttd.toString() + index
                                  }
                                  onPress={() => {
                                    onUploadPhoto(
                                      requestData,
                                      'ttd_pihak',
                                      item.id_ttd,
                                      null,
                                      item.tempUri,
                                      true,
                                    );
                                  }}>
                                  <Text
                                    key={
                                      'txtttd' + item.id_ttd.toString() + index
                                    }
                                    style={styles.checkboxDocumentLabel}>
                                    {'Tanda Tangan ' + (index + 1)}
                                  </Text>
                                  {requestData ? (
                                    <IconButton
                                      style={styles.subServiceRemove}
                                      icon="close"
                                      color={theme.colors.secondary}
                                      key={
                                        'removettf' +
                                        item.id_ttd.toString() +
                                        index
                                      }
                                      onPress={() => {
                                        const editedReqArray = _.remove(
                                          ttdPihak,
                                          (obj) => {
                                            return obj.id_ttd !== item.id_ttd;
                                          },
                                        );
                                        setTtdPihak(editedReqArray);
                                      }}
                                    />
                                  ) : null}
                                </TouchableOpacity>
                                <Divider
                                  key={'divider' + index}
                                  styles={{ width: '80%' }}
                                />
                                <Text
                                  style={styles.checkboxFileLabel}
                                  key={
                                    'textttdfilename' + item.id_ttd.toString()
                                  }>
                                  {item.fileName
                                    ? item.fileName
                                    : '* Bukti foto belum tersedia'}
                                </Text>
                                {item.img64 ? (
                                  <TextInput
                                    style={styles.inputImgTextContainer}
                                    label="Keterangan tanda tangan"
                                    defaultValue={item.desc}
                                    mode="outlined"
                                    dense={true}
                                    key={
                                      'textinputttd' + item.id_ttd.toString()
                                    }
                                    onChangeText={(text) => {
                                      updateTtdPihak('desc', text, item.id_ttd);
                                    }}
                                    onEndEditing={(e) => {
                                      updateTtdPihak(
                                        'desc',
                                        e.nativeEvent.text,
                                        item.id_ttd,
                                      );
                                    }}
                                    theme={{
                                      colors: {
                                        placeholder: theme.colors.placeholder,
                                        primary: theme.colors.secondary,
                                        underlineColor: theme.colors.secondary,
                                        background: theme.colors.background,
                                      },
                                    }}
                                  />
                                ) : (
                                  <Text style={styles.inputImgTextContainer}>
                                    {item.desc}
                                  </Text>
                                )}
                              </View>
                            ))}
                          </React.Fragment>
                        ) : null}
                        <TouchableOpacity
                          style={styles.addSubServiceButton}
                          onPress={() => {
                            onUploadPhoto(
                              requestData,
                              'ttd_pihak',
                              ttdPihak.length + 1,
                              null,
                              null,
                              true,
                            );
                          }}>
                          <Text style={styles.addSubServiceText}>
                            Tambah Tanda Tangan
                          </Text>
                        </TouchableOpacity>
                      </React.Fragment>
                    ) : (
                      <View
                        key="nottdpihak"
                        style={{ height: 20, marginTop: 20 }}
                      />
                    ),
                  ]
                : null}
            </ScrollView>

            <View key="submitcontainer" style={styles.submitButtonContainer}>
              <Button
                mode="contained"
                onPress={() => {
                  requestData
                    ? [
                        requestData.is_approved === '0'
                          ? onSubmit()
                          : [
                              requestData.is_approved === '1' &&
                              requestData.project_status === '1'
                                ? onApproval()
                                : onSubmit(),
                            ],
                      ]
                    : onSubmit();
                }}
                labelStyle={
                  Platform.OS === 'ios'
                    ? [styles.buttonSubmitLabel, { fontWeight: 'bold' }]
                    : styles.buttonSubmitLabel
                }
                loading={loader ? true : false}
                disabled={loader ? true : false}
                style={styles.buttonSubmit}>
                {loader
                  ? 'Mengirimkan..'
                  : [
                      requestData
                        ? [
                            requestData.is_approved === '0'
                              ? 'Perbarui Request'
                              : [
                                  requestData.is_approved === '1' &&
                                  requestData.project_status === '1'
                                    ? 'Konfirmasi Tanda Tangan'
                                    : 'Perbarui Request',
                                ],
                          ]
                        : 'Ajukan Request',
                    ]}
              </Button>
            </View>
          </KeyboardAvoidingView>
        </BottomSheet>
      </View>
    </React.Fragment>
  );
};

export default CreateRequest;
