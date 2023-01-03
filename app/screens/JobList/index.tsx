import React, { useCallback, useMemo, useRef, useState } from 'react';
import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
import { theme } from 'app/core/theme';
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  IconButton,
  List,
  Divider,
  Button,
  Searchbar,
  Snackbar,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import InsetShadow from 'react-native-inset-shadow';
import NavigationService from 'app/navigation/NavigationService';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

var _ = require('lodash');

interface IState {
  loginReducer: ILoginState;
}

const categoryDefault = [
  {
    id: 0,
    name: 'SEMUA',
    is_active: true,
  },
  {
    id: 1,
    name: 'TUGAS',
    is_active: false,
  },
  {
    id: 2,
    name: 'SELESAI',
    is_active: false,
  },
];

const JobList: React.FC = ({ route }) => {
  console.log(route);
  //param data
  const project_id =
    route.params !== undefined ? route.params.project_id : null;
  const project_name =
    route.params !== undefined ? route.params.project_name : null;
  const item_capture = route.params !== undefined ? route.params.item : null;
  const id_document =
    route.params !== undefined ? route.params.id_document : null;
  const document_data =
    route.params !== undefined ? route.params.document_data : null;
  const job_data = route.params !== undefined ? route.params.job_data : null;
  //user data
  const userData = useSelector((state) => state.loginReducer.userData);
  //navigation service
  const onBack = () => NavigationService.goBack();
  const onUploadPhoto = (item, id_kelengkapan, id_document, uri, isButton) => {
    NavigationService.navigate('UploadPhoto', {
      item: item,
      id_kelengkapan: id_kelengkapan,
      id_document: id_document,
      uri: uri,
      referrer: 'JobList',
      isButton: isButton,
    });
  };

  //bottom sheet logic
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['100%', '100%'], []);
  const modalSnapPoints = useMemo(() => ['80%', '80%'], []);

  //hooks
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = React.useState(true);

  const [categoryList, setCategoryList] = useState(categoryDefault);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = React.useState(false);

  const [allJob, setAllJob] = useState({});
  const [selfTakenJob, setSelfTakenJob] = useState({});
  const [finishedJob, setFinishedJob] = useState({});

  const [jobList, setJobList] = useState(selfTakenJob);
  const [jobModal, setJobModal] = useState(null);

  const [reqDocument, setReqDocument] = React.useState([]);

  const [, updateState] = React.useState();

  // callbacks
  //use to force re render
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handlePresentModalPress = useCallback((item) => {
    setLoader(true);
    const dataKelengkapan = [];
    if (item.is_done === '0') {
      item.job_document.forEach((element) => {
        dataKelengkapan.push({
          id: element.id,
          id_doc: element.job_dokumen_id,
          title: element.nama_dokumen,
          checked: false,
          fileName: null,
          tempUri: null,
          isButton: true,
        });
      });
    } else {
      item.job_document.forEach((element) => {
        dataKelengkapan.push({
          id: element.id,
          id_doc: element.job_dokumen_id,
          title: element.nama_dokumen,
          checked: true,
          fileName: element.job_dokumen_url,
          tempUri: null,
          isButton: false,
        });
      });
    }

    item['dataKelengkapan'] = dataKelengkapan;
    setJobModal(item);
    bottomSheetModalRef.current?.present();
    setTimeout(function () {
      setLoader(false);
    }, 1000);
  }, []);
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const handleModalSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index < 0) {
      setJobModal(null);
    }
  }, []);

  const onSubmit = () => {
    if (jobModal) {
      if (
        _.uniqBy(reqDocument, 'id_document').length === 0 &&
        jobModal.request_document.length === 0
      ) {
        Alert.alert('Submit Failed', 'Anda belum mengisi kelengkapan dokumen');
      } else {
        //setloader set form data
        setLoader(true);
        const data = new FormData();
        var url = apiUrl.api + 'jobupdate';
        data.append('id_job', jobModal.id);
        data.append('name', 'submit_job');
        data.append('id_user', userData.iduser);

        //kelengkapan array map to string
        data.append(
          'job_document',
          JSON.stringify(
            _.uniqBy(
              _.filter(reqDocument, function (o) {
                return o.img64 !== '';
              }),
              'id_document',
            ),
          ),
        );
        // api URL switch when update or insert then POST
        fetch(url, {
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            setLoader(false);
            response
              .json()
              .then((dataRes) => {
                if (dataRes.success == true) {
                  bottomSheetModalRef.current?.dismiss();
                  Alert.alert(
                    'Submit Success',
                    'Request berhasil disimpan, menunggu konfirmasi',
                    [{ text: 'OK', onPress: () => NavigationService.goBack() }],
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
    }
  };

  const onChangeSearch = (query) => {
    const filteredArrays = allJob.filter(({ task_name }) => {
      return task_name.toLowerCase().includes(query.toLowerCase());
    });
    isActiveOrNot(0);
    setJobList(filteredArrays);
  };

  const isActiveOrNot = (categoryIndex) => {
    const category = [...categoryList];
    onRefresh();
    category.map((category, index) => {
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

  const populateData = (state) => {
    var reqData = new FormData();
    reqData.append('user_id', userData.iduser);
    reqData.append('service_id', project_id);
    fetch(apiUrl.api + 'joblistproject', {
      method: 'POST',
      body: reqData,
    }).then((response) => {
      response
        .json()
        .then((data) => {
          // console.log(data.data);
          const alljobdata = _(data.data)
            .groupBy((x) => x.task_name)
            .map((value, key) => ({
              task_name: key,
              task_id: value[0].task_id,
              jobs: value,
            }))
            .value();
          const todojobdata = _(_.filter(data.data, ['is_done', '0']))
            .groupBy((x) => x.task_name)
            .map((value, key) => ({
              task_name: key,
              task_id: value[0].task_id,
              jobs: value,
            }))
            .value();
          const donejobdata = _(_.filter(data.data, ['is_done', '1']))
            .groupBy((x) => x.task_name)
            .map((value, key) => ({
              task_name: key,
              task_id: value[0].task_id,
              jobs: value,
            }))
            .value();

          if (state) {
            setJobList(alljobdata);
          }
          setAllJob(alljobdata);
          setSelfTakenJob(todojobdata);
          setFinishedJob(donejobdata);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          if (!job_data) {
            setLoader(false);
          }

          setRefreshing(false);
        });
    });
  };

  const onRefresh = React.useCallback(() => {
    setVisible(false);
    setRefreshing(true);
    populateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //interval snackbar
  React.useEffect(() => {
    setInterval(() => {
      if (!visible) {
        setVisible(true);
      }
    }, 60000);
  }, [visible]);

  React.useEffect(() => {
    setRefreshing(true);
    setLoader(true);
    populateData(true);
    isActiveOrNot(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //after capture logic
  React.useEffect(() => {
    if (item_capture && id_document && document_data) {
      item_capture.dataKelengkapan.forEach((item) => {
        if (item.id === id_document) {
          item.checked = true;
          item.fileName = document_data.fileName;
          item.img64 = document_data.img64;
          item.tempUri = document_data.tempUri;
          item.isButton = true;
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
      setJobModal(item_capture);
      forceUpdate();
      // handlePresentModalPress(item_capture);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item_capture, id_document, document_data, forceUpdate]);

  //job data process
  React.useEffect(() => {
    setLoader(true);
    if (job_data) {
      setJobModal(job_data);
      handlePresentModalPress(job_data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job_data, forceUpdate]);

  return (
    <BottomSheetModalProvider>
      <Spinner
        visible={loader}
        // textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.background}>
        <View style={styles.headerContainer}>
          <View style={styles.iconHeader}>
            <IconButton
              icon="arrow-left"
              size={30}
              color="#ffffff"
              onPress={() => onBack()}
            />
          </View>
          <View style={styles.titleScreen}>
            <Text style={styles.headerText}>Daftar Job</Text>
          </View>
        </View>
        <View style={styles.textContainerHeader}>
          <Text style={styles.headerText}>{project_name}</Text>
        </View>
      </View>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.sheetContainer}>
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.categoryListContainer}>
              {categoryList.map((category, index) => {
                if (category.is_active) {
                  return (
                    <View
                      key={category.id}
                      style={[
                        styles.categoryPill,
                        { backgroundColor: 'rgba(249, 168, 38, 0.1)' },
                      ]}>
                      <Text style={styles.categoryText}>{category.name}</Text>
                    </View>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={styles.categoryPill}
                      key={category.id}
                      onPress={() => {
                        isActiveOrNot(index);
                      }}
                      underlayColor={theme.colors.secondary}>
                      <View key={category.id}>
                        <Text style={styles.categoryText}>{category.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
            <View style={styles.listContainer}>
              <Searchbar
                placeholder="Cari job"
                style={styles.searchbar}
                inputStyle={styles.searchbarInput}
                onChangeText={onChangeSearch}
                theme={{
                  colors: {
                    placeholder: theme.colors.placeholder,
                    primary: theme.colors.primary,
                    underlineColor: theme.colors.underlineColor,
                    background: theme.colors.background,
                  },
                }}
              />
              {jobList.length > 0 ? (
                <FlatList
                  fadingEdgeLength={30}
                  data={jobList}
                  keyExtractor={(item) => item.task_id.toString()}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  renderItem={({ item, index }) => (
                    <List.Section key={'section' + index.toString()}>
                      <List.Subheader key={'subheader' + index.toString()}>
                        {item.task_name}
                      </List.Subheader>
                      {item.jobs.map((item) => (
                        <List.Item
                          title={item.task_name}
                          description={
                            <>
                              <Text style={styles.descriptionListText}>
                                {item.job_document
                                  .map((doc) => doc.nama_dokumen)
                                  .join('  •  ') +
                                  '\nProject:' +
                                  item.project_name +
                                  '\n'}
                                <Text style={{ fontWeight: 'bold' }}>
                                  {'Diposting : ' +
                                    moment(item.created_at).format(
                                      'DD-MM-YYYY kk:mm:ss',
                                    )}
                                </Text>
                              </Text>
                            </>
                          }
                          descriptionNumberOfLines={4}
                          titleStyle={styles.titleListText}
                          key={'item' + item.id.toString()}
                          left={(props) => (
                            <>
                              <View style={styles.topListContainer}>
                                {[
                                  item.is_done === '0' ? (
                                    <View
                                      key="headerlistcontainer"
                                      style={styles.headerListContainer}>
                                      <Text
                                        style={styles.statusListTextWarning}>
                                        Tugas
                                      </Text>
                                    </View>
                                  ) : (
                                    <View
                                      key="headerlistcontainer"
                                      style={styles.headerListContainer}>
                                      <Text
                                        style={styles.statusListTextSuccess}>
                                        Selesai
                                      </Text>
                                    </View>
                                  ),
                                ]}
                                <IconButton
                                  {...props}
                                  style={styles.iconStatus}
                                  icon={
                                    item.is_done === '0'
                                      ? 'clipboard-text-outline'
                                      : 'clipboard-check'
                                  }
                                  color={
                                    item.is_done === '0'
                                      ? theme.colors.secondary
                                      : theme.colors.primary
                                  }
                                  size={28}
                                />
                                {/* <List.Icon
                                  {...props}
                                  style={styles.iconStatus}
                                  icon={
                                    item.is_done === '0'
                                      ? 'clipboard-text-outline'
                                      : 'clipboard-check'
                                  }
                                  color={
                                    item.is_done === '0'
                                      ? theme.colors.secondary
                                      : theme.colors.primary
                                  }
                                /> */}
                              </View>
                            </>
                          )}
                          right={(props) => (
                            <List.Icon
                              {...props}
                              icon="chevron-right"
                              color="#D3DCE6"
                            />
                          )}
                          onPress={() => handlePresentModalPress(item)}
                        />
                      ))}
                    </List.Section>
                  )}
                />
              ) : (
                <View style={styles.emptyStateContainer}>
                  <Image
                    source={require('../../assets/empty_list_req.png')}
                    style={styles.image}
                  />
                  <Text style={styles.emptyStateTitle}>
                    Data tidak ditemukan
                  </Text>
                  <Text style={styles.emptyStateText}>
                    Data pekerjaan belum tersedia untuk saat ini
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {jobModal ? (
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={modalSnapPoints}
            backdropComponent={BottomSheetBackdrop}
            onChange={handleModalSheetChanges}>
            <View style={styles.modalContentContainer}>
              <View style={styles.textContainerHeader}>
                <Text style={styles.headerModalText}>{jobModal.task_name}</Text>
                <Text style={[styles.subHeaderModalText, { marginTop: 10 }]}>
                  {jobModal.project_name}
                </Text>
                <Text style={styles.muteHeaderModalText}>
                  {'Diposting pada ' + jobModal.created_at}
                </Text>
              </View>
              <View style={[styles.textContainerHeader, { marginTop: 20 }]}>
                <Text style={styles.sheetTitle}>Permintaan Dokumen</Text>
              </View>
              <View style={styles.scrollListContainer}>
                <InsetShadow
                  left={false}
                  right={false}
                  top={false}
                  shadowRadius={20}
                  shadowOpacity={0.6}
                  elevation={20}>
                  <ScrollView
                    fadingEdgeLength={30}
                    style={styles.documentScrollView}
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }>
                    {jobModal.dataKelengkapan
                      ? jobModal.dataKelengkapan.map((item, index) => (
                          <View
                            style={styles.documentListContainer}
                            key={index}>
                            <TouchableOpacity
                              style={styles.documentLabelContainer}
                              key={'touch' + item.id.toString() + index}
                              onPress={() =>
                                onUploadPhoto(
                                  jobModal,
                                  item.id,
                                  item.id_doc,
                                  item.tempUri,
                                  item.isButton,
                                )
                              }>
                              <Text
                                key={'txt' + item.id.toString() + index}
                                style={styles.checkboxDocumentLabel}>
                                {item.title}
                              </Text>
                            </TouchableOpacity>
                            <Divider styles={{ width: '80%' }} />
                            <Text style={styles.checkboxFileLabel}>
                              {item.fileName
                                ? item.fileName
                                : '* Bukti foto belum tersedia'}
                            </Text>
                          </View>
                        ))
                      : null}
                  </ScrollView>
                </InsetShadow>
              </View>
              {jobModal.is_done === '0' ? (
                <View style={styles.submitButtonContainer}>
                  <Button
                    mode="contained"
                    onPress={onSubmit}
                    labelStyle={[styles.buttonSubmitLabel]}
                    style={styles.buttonSubmit}>
                    {loader ? 'Mengirimkan..' : 'Kirim Dokumen'}
                  </Button>
                </View>
              ) : null}
            </View>
          </BottomSheetModal>
        ) : null}
      </View>
      <Snackbar
        visible={visible}
        style={{ backgroundColor: '#F6F8FA' }}
        theme={{ colors: { surface: '#263238', accent: theme.colors.primary } }}
        onDismiss={() => {
          setVisible(false);
        }}
        action={{
          label: 'Ok',
          onPress: () => {
            () => {
              onRefresh();
            };
          },
        }}>
        Tarik ke bawah untuk me-refresh daftar
      </Snackbar>
    </BottomSheetModalProvider>
  );
};

export default JobList;
