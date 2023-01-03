import React, { useCallback, useMemo, useRef, useState } from 'react';

import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
import {
  View,
  Image,
  Text,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import { List, Searchbar, Divider, Button } from 'react-native-paper';
import { ScrollView as ModalScrollView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import InsetShadow from 'react-native-inset-shadow';
import NavigationService from 'app/navigation/NavigationService';
import { theme } from 'app/core/theme';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  jobCategoryService as categoryService,
  jobCategoryDefault as categoryDefault,
} from 'app/utils/constants';
import { ILoginState } from 'app/models/reducers/login';
import moment from 'moment';
import 'moment/locale/id';
import * as mainActions from 'app/store/actions/mainActions';
import { IMainState } from 'app/models/reducers/main';
moment.locale('id');
var _ = require('lodash');

interface IState {
  loginReducer: ILoginState;
  mainReducer: IMainState;
}

const ProjectList: React.FC = ({ route }) => {
  //param data
  const job_data = route !== undefined ? route.params.job_data : null;

  //fetch user data
  const userData = useSelector((state: IState) => state.loginReducer.userData);
  const dispatch = useDispatch();
  //navigation service
  const onUploadPhoto = (item, id_kelengkapan, id_document, uri, isButton) => {
    NavigationService.navigate('UploadPhoto', {
      return: onSelect,
      item: item,
      id_kelengkapan: id_kelengkapan,
      id_document: id_document,
      uri: uri,
      referrer: 'ProjectList',
      isButton: isButton,
    });
  };

  const onSelect = (data) => {
    if (data && data.item) {
      data.item.dataKelengkapan.forEach((item) => {
        if (item.id === data.id_document) {
          item.checked = true;
          item.fileName = data.document_data.fileName;
          item.img64 = data.document_data.img64;
          item.tempUri = data.document_data.tempUri;
          item.isButton = true;
          var collectedDocument = reqDocument;
          collectedDocument.push(data.document_data);
          collectedDocument = _.uniqBy(
            _.filter(reqDocument, (o) => {
              return o.img64 !== null;
            }),
            'id',
          );
          setReqDocument(collectedDocument);
        }
      });
    }
    setJobModal(data.item);
    forceUpdate();
    // handlePresentModalPress(item_capture);
  };

  //bottom sheet logic
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scrollCategoryRef = useRef();

  // variables
  const modalSnapPoints = useMemo(() => ['80%', '80%'], []);

  //Hooks
  const [activeTab, setActiveTab] = useState(0);
  // const [visible, setVisible] = React.useState(true);
  // const [projectList, setProjectList] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);

  const [serviceTypeList, setServiceTypeList] = useState(categoryService);
  const [categoryList, setCategoryList] = useState(categoryDefault);

  const [categoryId, setCategoryId] = useState(0);

  const [allJob, setAllJob] = useState([]);
  const [selfTakenJob, setSelfTakenJob] = useState([]);
  const [finishedJob, setFinishedJob] = useState([]);

  const [jobList, setJobList] = useState(selfTakenJob);
  const [jobModal, setJobModal] = useState(null);

  const [reqDocument, setReqDocument] = React.useState([]);

  //callbacks
  //use to force re render
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const populateData = (state, category_id) => {
    var postData = new FormData();
    postData.append('user_id', userData.iduser);
    postData.append('type', 'job');

    var reqData = new FormData();
    reqData.append('user_id', userData.iduser);
    reqData.append('service_id', category_id);

    fetch(apiUrl.api + 'joblistproject', {
      method: 'POST',
      body: reqData,
    }).then((response) => {
      // console.log(response.text());
      response
        .json()
        .then((data) => {
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

  const setServiceTypeActive = (categoryIndex) => {
    const category = [...serviceTypeList];
    category.map((category, index) => {
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

  const onSubmit = () => {
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
                  [{ text: 'OK', onPress: () => onRefresh() }],
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

  const onChangeSearch = (query) => {
    const filteredArrays = allJob.filter(({ task_name, jobs }) => {
      return (
        task_name.toLowerCase().includes(query.toLowerCase()) ||
        jobs.some((item) =>
          item.project_name.toLowerCase().includes(query.toLowerCase()),
        )
      );
    });
    isActiveOrNot(0);
    setJobList(filteredArrays);
  };

  const handleModalSheetChanges = useCallback((index: number) => {}, []);

  const handlePresentModalPress = useCallback((item) => {
    setLoader(true);
    bottomSheetModalRef.current.present();
    const dataKelengkapan = [];
    item.job_document.forEach((element) => {
      dataKelengkapan.push({
        id: element.id,
        id_doc: element.job_dokumen_id,
        title: element.nama_dokumen,
        checked: item.is_done === '0' ? false : true,
        fileName: item.is_done === '0' ? null : element.job_dokumen_url,
        tempUri: item.is_done === null,
        isButton: item.is_done === '0' ? true : false,
      });
    });
    item['dataKelengkapan'] = dataKelengkapan;
    setJobModal(item);
    setTimeout(function () {
      setLoader(false);
    }, 1000);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    populateData(false, categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  React.useEffect(() => {
    dispatch(mainActions.setJobCount(0));
    setRefreshing(true);
    populateData(true, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //after capture logic
  React.useEffect(() => {}, [jobModal]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.background}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainerHeader}>
            <Text style={styles.headerMenuText}>MENU JOB</Text>
          </View>
        </View>
        <View style={styles.searchbarContainer}>
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
        </View>
        <ScrollView
          fadingEdgeLength={30}
          style={styles.categoryListContainer}
          horizontal={true}
          ref={scrollCategoryRef}
          showsHorizontalScrollIndicator={false}>
          {serviceTypeList.map((category, index) => {
            return (
              <TouchableOpacity
                style={
                  category.is_active
                    ? [
                        styles.categoryPill,
                        { borderWidth: 3, borderColor: theme.colors.secondary },
                      ]
                    : [styles.categoryPill]
                }
                key={category.id}
                onPress={() => {
                  setServiceTypeActive(index);
                }}
                underlayColor={theme.colors.secondary}>
                <View style={styles.categoryItemContainer} key={category.id}>
                  {index > 0 ? (
                    <Image
                      source={{ uri: category.img_url }}
                      style={styles.serviceImage}
                    />
                  ) : null}

                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.sheetContainer}>
          <Spinner
            visible={loader}
            // textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.jobListContainer}>
            <View style={styles.categoryListContainer}>
              {categoryList.map((category, index) => {
                return (
                  <TouchableOpacity
                    style={
                      category.is_active
                        ? [
                            styles.categoryPillBordered,
                            {
                              backgroundColor: 'rgba(249, 168, 38, 0.1)',
                            },
                          ]
                        : [styles.categoryPillBordered]
                    }
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
              })}
            </View>
            <FlatList
              fadingEdgeLength={30}
              data={jobList || []}
              keyExtractor={(item, index) => index.toString()}
              style={{ width: '100%', paddingHorizontal: 10 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateTitle}>
                    Data tidak ditemukan
                  </Text>
                  <Text style={styles.emptyStateText}>
                    Anda tidak memiliki job atau tugas
                  </Text>
                </View>
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
                              '\nProject : ' +
                              item.project_name +
                              '\n'}
                            {item.due_date && (
                              <Text style={{ fontWeight: 'bold' }}>
                                {'Deadline : ' +
                                  moment(item.due_date).format('DD-MM-YYYY') +
                                  '\n'}
                              </Text>
                            )}
                            <Text>
                              {'Diposting : ' +
                                moment(item.created_at).format('DD-MM-YYYY ')}
                            </Text>
                          </Text>
                        </>
                      }
                      descriptionNumberOfLines={4}
                      titleStyle={
                        Platform.OS === 'ios'
                          ? [styles.titleListText, { fontWeight: 'bold' }]
                          : styles.titleListText
                      }
                      key={'item' + item.id.toString()}
                      left={() => {
                        const service = categoryService[item.job_service_id];
                        return (
                          <>
                            <View style={styles.topListContainer}>
                              {[
                                item.is_done === '0' ? (
                                  <View
                                    key="headerlistcontainer"
                                    style={styles.headerListContainer}>
                                    <Text style={styles.statusListTextWarning}>
                                      Tugas
                                    </Text>
                                  </View>
                                ) : (
                                  <View
                                    key="headerlistcontainer"
                                    style={styles.headerListContainer}>
                                    <Text style={styles.statusListTextSuccess}>
                                      Selesai
                                    </Text>
                                  </View>
                                ),
                              ]}
                              <View style={styles.serviceImageIconList}>
                                <Image
                                  source={{
                                    uri: service.img_url,
                                  }}
                                  style={styles.serviceImageList}
                                />
                              </View>
                            </View>
                          </>
                        );
                      }}
                      right={(props) => (
                        <List.Icon
                          {...props}
                          icon="chevron-right"
                          color="#D3DCE6"
                        />
                      )}
                      onPress={() => {
                        handlePresentModalPress(item);
                      }}
                    />
                  ))}
                </List.Section>
              )}
            />
          </View>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={modalSnapPoints}
          backdropComponent={BottomSheetBackdrop}
          onChange={handleModalSheetChanges}>
          {jobModal ? (
            <View style={styles.modalContentContainer}>
              <View style={styles.textContainerHeader}>
                <Text style={[styles.sheetTitle, { fontSize: 18 }]}>
                  {jobModal.task_name}
                </Text>
                <Divider styles={{ width: '80%' }} />
                {jobModal.due_date && (
                  <View style={styles.deadlineContainer}>
                    <Text
                      style={[
                        styles.subHeaderModalText,
                        { fontFamily: 'Inter-Bold' },
                      ]}>
                      Deadline
                    </Text>
                    <Text
                      style={[
                        styles.subHeaderModalText,
                        { fontFamily: 'Inter-Bold' },
                      ]}>
                      {moment(jobModal.due_date).format('DD-MM-YYYY')}
                    </Text>
                  </View>
                )}

                <Text style={[styles.subHeaderModalText, { marginTop: 10 }]}>
                  {jobModal.project_name}
                </Text>
                <Text style={styles.muteHeaderModalText}>
                  {'Diposting pada ' +
                    moment(jobModal.created_at).format('DD-MM-YYYY HH:mm:ss')}
                </Text>
              </View>
              <Divider styles={{ width: '80%' }} />
              <View style={[styles.textContainerHeader, { marginTop: 20 }]}>
                <Text style={styles.headerModalText}>Permintaan Dokumen</Text>
              </View>
              <View style={styles.scrollListContainer}>
                <InsetShadow
                  left={false}
                  right={false}
                  top={false}
                  shadowRadius={20}
                  shadowOpacity={0.6}
                  elevation={20}>
                  <ModalScrollView
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
                  </ModalScrollView>
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
          ) : null}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default ProjectList;
