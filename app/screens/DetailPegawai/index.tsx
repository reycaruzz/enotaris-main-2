import React, { useCallback, useState, useMemo, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  RefreshControl,
  FlatList,
} from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { theme } from 'app/core/theme';
import NavigationService from 'app/navigation/NavigationService';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');
var _ = require('lodash');
import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';

const Profile: React.FC = ({ route }) => {
  //route params
  const pegawai = route !== undefined ? route.params.item : null;
  //navigation service
  const onBack = () => NavigationService.goBack();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const modalSnapPoints = useMemo(() => ['80%', '80%'], []);

  //state hooks
  const [loader, setLoader] = React.useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [offset, setOffset] = useState(0);
  const [taskList, setTaskList] = useState([{}]);
  const [userModal, setUserModal] = useState(null);
  const [detailModal, setDetailModal] = useState(null);

  const [processedTask, setProcessedTask] = useState(null);
  const [doneTask, setDoneTask] = useState(null);
  const [doneTaskToday, setDoneTaskToday] = useState(null);
  const [doneTaskMonth, setDoneTaskMonth] = useState(null);
  const [overtimeTask, setOvertimeTask] = useState(null);

  //form Hooks
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const handleModalSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      setDetailModal(null);
    }
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    populateTaskList(pegawai.iduser, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresentModalPress = useCallback((item) => {
    setLoader(true);
    bottomSheetModalRef.current?.present();
    setDetailModal(item);
    forceUpdate();
    setTimeout(function () {
      setLoader(false);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const populateTaskList = (iduser: string, init: boolean) => {
    setLoader(true);
    var postData = new FormData();
    postData.append('id_user', iduser);
    postData.append('offset', offset);

    fetch(apiUrl.api + 'listtaskuser', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        // console.log(response.text());
        response
          .json()
          .then((data) => {
            if (init) {
              setTaskList(data.data);
            } else {
              setOffset(offset + 10);
              setTaskList([...taskList, ...data.data]);
            }
          })
          .catch((error) => console.error(error))
          .finally(() => {
            setRefreshing(false);
            setLoader(false);
          });
      })
      .catch((error) => console.error(error));

    fetch(apiUrl.api + 'alltaskuser', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        // console.log(response.text());
        response
          .json()
          .then((data) => {
            setDoneTask(_.filter(data.data, ['task_due_date_done', '1']));
            setProcessedTask(_.filter(data.data, ['task_due_date_done', '0']));
            setDoneTaskToday(
              _.filter(data.data, function (o) {
                let today = moment().format('YYYY-MM-DD');
                let due = moment(o.task_due_date_done_at).format('YYYY-MM-DD');
                if (o.task_due_date_done === '1' && due === today) {
                  return o;
                }
              }),
            );
            setOvertimeTask(
              _.filter(data.data, function (o) {
                if (o.task_due_date) {
                  let today = moment().format('YYYY-MM-DD');
                  let done = moment(o.task_due_date_done_at).format(
                    'YYYY-MM-DD',
                  );
                  let due = moment(o.task_due_date).format('YYYY-MM-DD');
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
              }),
            );
            setDoneTaskMonth(
              _.filter(data.data, function (o) {
                let today = moment().format('YYYY-MM');
                let due = moment(o.task_due_date_done_at).format('YYYY-MM');
                if (o.task_due_date_done === '1' && due === today) {
                  return o;
                }
              }),
            );
          })
          .catch((error) => console.error(error))
          .finally(() => {
            setRefreshing(false);
            setLoader(false);
          });
      })
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    if (pegawai) {
      setUserModal(pegawai);
      populateTaskList(pegawai.iduser, true);
      forceUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pegawai, forceUpdate]);

  // React.useEffect(() => {
  //   populateData();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  //jsx component

  const overtimeLabel = (item) => {
    if (item.task_due_date) {
      let today = moment().format('YYYY-MM-DD');
      let done = moment(item.task_due_date_done_at).format('YYYY-MM-DD');
      let due = moment(item.task_due_date).format('YYYY-MM-DD');
      if (item.task_due_date_done_at) {
        if (done > due) {
          return (
            <View style={styles.statusListContainerDanger}>
              <Text style={styles.statusListTextDanger}>Terlambat</Text>
            </View>
          );
        }
      } else {
        if (today > due) {
          return (
            <View style={styles.statusListContainerDanger}>
              <Text style={styles.statusListTextDanger}>Terlambat</Text>
            </View>
          );
        }
      }
    }
  };

  const overtimeText = (item) => {
    if (item.task_due_date) {
      let today = moment().format('YYYY-MM-DD');
      let done = moment(item.task_due_date_done_at).format('YYYY-MM-DD');
      let due = moment(item.task_due_date).format('YYYY-MM-DD');
      if (item.task_due_date_done_at) {
        if (done > due) {
          return (
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.biodataValueText,
                  {
                    color: '#FF616D',
                  },
                ]}>
                {' | '}
                Terlambat
              </Text>
            </View>
          );
        }
      } else {
        if (today > due) {
          return (
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.biodataValueText,
                  {
                    color: '#FF616D',
                  },
                ]}>
                {' | '}
                Terlambat
              </Text>
            </View>
          );
        }
      }
    }
  };

  // const memorizedList = useMemo(() => renderItem, [taskList, renderItem]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={'task' + index}
        style={styles.pengumumanContainer}
        onPress={() => {
          handlePresentModalPress(item);
        }}>
        <View style={styles.pengumumanContentContainer}>
          <View
            style={{
              width: 120,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            {item.task_due_date_done === '1' ? (
              <>
                <View style={styles.statusListContainerSuccess}>
                  <Text style={styles.statusListTextSuccess}>Selesai</Text>
                </View>

                {overtimeLabel(item)}
              </>
            ) : (
              <>
                <View style={styles.statusListContainerWarning}>
                  <Text style={styles.statusListTextWarning}>
                    Belum Selesai
                  </Text>
                </View>
                {overtimeLabel(item)}
              </>
            )}
          </View>
          <Text
            style={
              Platform.OS === 'ios'
                ? [styles.sheetTitle, { fontWeight: 'bold', fontSize: 12 }]
                : [styles.sheetTitle, { fontSize: 12 }]
            }>
            {item.task_name}
          </Text>
          <Text style={styles.descriptionListText}>{item.stage_name}</Text>
          <Text style={styles.descriptionListText}>
            {moment(item.assign_member_at).format('DD-MM-yyyy HH:mm:ss')}
          </Text>
        </View>
        <View style={{ width: 100, alignItems: 'flex-start' }}>
          <Text
            style={
              Platform.OS === 'ios'
                ? [
                    styles.headerText,
                    {
                      fontWeight: 'bold',
                      fontSize: 9,
                      color: theme.colors.primary,
                    },
                  ]
                : [
                    styles.headerText,
                    {
                      fontSize: 9,
                      color: theme.colors.primary,
                    },
                  ]
            }>
            {item.project_name}
          </Text>
          <Text
            style={
              Platform.OS === 'ios'
                ? [styles.headerText, { fontWeight: 'bold', fontSize: 9 }]
                : [styles.headerText, { fontSize: 9 }]
            }>
            {item.project_client}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.iconHeader}>
            <IconButton
              icon="arrow-left"
              size={30}
              color={theme.colors.primary}
              onPress={() => onBack()}
            />
          </View>
          <View style={styles.textContainerHeader}>
            <Text
              style={
                Platform.OS === 'ios'
                  ? [
                      styles.headerText,
                      { fontWeight: 'bold', color: theme.colors.primary },
                    ]
                  : [styles.headerText, { color: theme.colors.primary }]
              }>
              DETAIL PEGAWAI
            </Text>
          </View>
        </View>
        {userModal && (
          <View style={styles.contentContainer}>
            <Spinner
              visible={loader}
              // textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.formContainer}>
              <View style={styles.resumeContainer}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileImage}>
                    <Image
                      source={
                        userModal.pic !== undefined
                          ? { uri: userModal.pic }
                          : require('../../assets/profile-placeholder.png')
                      }
                      // source={{
                      //   uri: userModal.pic ? userModal.pic : null,
                      // }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.profileInfoContainer}>
                    <View style={styles.textContainerHeader}>
                      <Text
                        style={
                          Platform.OS === 'ios'
                            ? [styles.sheetTitle, { fontWeight: 'bold' }]
                            : [styles.sheetTitle]
                        }>
                        Nama
                      </Text>
                      <Text style={styles.userDetailText}>
                        {userModal.nama}
                      </Text>
                    </View>
                    <View style={styles.rowProfileInfo}>
                      <View style={styles.textContainerHeader}>
                        <Text
                          style={
                            Platform.OS === 'ios'
                              ? [styles.sheetTitle, { fontWeight: 'bold' }]
                              : [styles.sheetTitle]
                          }>
                          Divisi
                        </Text>
                        <Text style={styles.userDetailText}>
                          {userModal.nama_divisi ? userModal.nama_divisi : '-'}
                        </Text>
                      </View>
                      <View style={styles.textContainerHeader}>
                        <Text
                          style={
                            Platform.OS === 'ios'
                              ? [styles.sheetTitle, { fontWeight: 'bold' }]
                              : [styles.sheetTitle]
                          }>
                          Role
                        </Text>
                        <Text style={styles.userDetailText}>
                          {userModal.roleuser}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[styles.resumeContainer, { height: 75 }]}>
                <View style={styles.resumeDetailTextContainer}>
                  <IconButton
                    style={styles.postDateIcon}
                    icon="clipboard-check"
                    color={'#7b7e80'}
                    size={14}
                  />
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.resumeText, { fontWeight: 'bold' }]
                        : [styles.resumeText]
                    }>
                    Request
                  </Text>
                </View>
                <ScrollView
                  horizontal={true}
                  style={styles.serviceMenuContainer}
                  fadingEdgeLength={30}>
                  <View style={styles.resumeTextColumn}>
                    <Text style={styles.resumeDetailText}>Diajukan</Text>
                    <Text
                      style={
                        Platform.OS === 'ios'
                          ? [styles.resumeText, { fontWeight: 'bold' }]
                          : [styles.resumeText]
                      }>
                      {userModal.resume_detail[0].requested}
                    </Text>
                  </View>
                  <View style={styles.resumeTextColumn}>
                    <Text style={styles.resumeDetailText}>Diproses</Text>
                    <Text
                      style={
                        Platform.OS === 'ios'
                          ? [styles.resumeText, { fontWeight: 'bold' }]
                          : [styles.resumeText]
                      }>
                      {userModal.resume_detail[0].processed}
                    </Text>
                  </View>
                  <View style={styles.resumeTextColumn}>
                    <Text style={styles.resumeDetailText}>Disetujui</Text>
                    <Text
                      style={
                        Platform.OS === 'ios'
                          ? [styles.resumeText, { fontWeight: 'bold' }]
                          : [styles.resumeText]
                      }>
                      {userModal.resume_detail[0].done}
                    </Text>
                  </View>
                  <View style={styles.resumeTextColumn}>
                    <Text style={styles.resumeDetailText}>Ditolak</Text>
                    <Text
                      style={
                        Platform.OS === 'ios'
                          ? [styles.resumeText, { fontWeight: 'bold' }]
                          : [styles.resumeText]
                      }>
                      {userModal.resume_detail[0].reject}
                    </Text>
                  </View>
                </ScrollView>
              </View>
              <View style={[styles.resumeContainer, { height: 75 }]}>
                <View style={styles.resumeDetailTextContainer}>
                  <IconButton
                    style={styles.postDateIcon}
                    icon="checkbox-marked-outline"
                    color={'#7b7e80'}
                    size={14}
                  />
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.resumeText, { fontWeight: 'bold' }]
                        : [styles.resumeText]
                    }>
                    Task
                  </Text>
                </View>
                <ScrollView
                  horizontal={true}
                  style={styles.serviceMenuContainer}
                  fadingEdgeLength={30}>
                  <TouchableOpacity
                    style={styles.resumeTextColumn}
                    onPress={() => {
                      setTaskList(processedTask);
                      setIsFiltered(true);
                    }}>
                    <Text style={styles.resumeDetailText}>Dikerjakan</Text>
                    <Text
                      style={
                        Platform.OS === 'ios'
                          ? [styles.resumeText, { fontWeight: 'bold' }]
                          : [styles.resumeText]
                      }>
                      {userModal.task_detail[0].task_process}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.verticleLine} />
                  <TouchableOpacity
                    style={styles.resumeTextColumn}
                    onPress={() => {
                      setTaskList(doneTask);
                      setIsFiltered(true);
                    }}>
                    <Text style={styles.resumeDetailText}>Diselesaikan</Text>
                    <Text
                      style={
                        Platform.OS === 'ios'
                          ? [styles.resumeText, { fontWeight: 'bold' }]
                          : [styles.resumeText]
                      }>
                      {userModal.task_detail[0].task_done}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resumeTextColumn}
                    onPress={() => {
                      setTaskList(doneTaskToday);
                      setIsFiltered(true);
                    }}>
                    <Text style={styles.resumeDetailText}>(Hari ini)</Text>
                    <Text
                      style={
                        Platform.OS === 'ios'
                          ? [styles.resumeText, { fontWeight: 'bold' }]
                          : [styles.resumeText]
                      }>
                      {userModal.task_detail[0].task_done_today}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resumeTextColumn}
                    onPress={() => {
                      setTaskList(doneTaskMonth);
                      setIsFiltered(true);
                    }}>
                    <Text style={styles.resumeDetailText}>(Bulan ini)</Text>
                    <Text
                      style={
                        Platform.OS === 'ios'
                          ? [styles.resumeText, { fontWeight: 'bold' }]
                          : [styles.resumeText]
                      }>
                      {userModal.task_detail[0].task_done_month}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.verticleLine} />
                  <TouchableOpacity
                    style={styles.resumeTextColumn}
                    onPress={() => {
                      setTaskList(overtimeTask);
                      setIsFiltered(true);
                    }}>
                    <Text style={styles.resumeDetailText}>Terlambat</Text>
                    <Text
                      style={
                        Platform.OS === 'ios'
                          ? [styles.resumeText, { fontWeight: 'bold' }]
                          : [styles.resumeText]
                      }>
                      {userModal.task_detail[0].task_overtime}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
            <View style={[styles.textContainerHeader, { paddingLeft: 10 }]}>
              <Text style={styles.sheetTitle}>Daftar Task</Text>
            </View>
            {taskList.length > 0 ? (
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  marginTop: 10,
                  paddingBottom: 20,
                }}>
                <FlatList
                  fadingEdgeLength={30}
                  data={taskList}
                  keyExtractor={(item) => item.id}
                  style={styles.taskList}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  renderItem={renderItem}
                />
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <TouchableOpacity
                    style={styles.addJadwalButton}
                    onPress={() => {
                      if (isFiltered) {
                        populateTaskList(userModal.iduser, true);
                      } else {
                        populateTaskList(userModal.iduser, false);
                      }
                    }}>
                    <Text style={styles.addButtonText}>
                      {loader
                        ? 'Memuat...'
                        : [
                            isFiltered
                              ? 'Tampilkan Semua'
                              : 'Tampilkan Lebih Banyak',
                          ]}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateTitle}>
                  Pengguna tidak memiliki tugas
                </Text>
                <Text style={styles.emptyStateText}>List tugas kosong</Text>
              </View>
            )}
          </View>
        )}
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={modalSnapPoints}
        backdropComponent={BottomSheetBackdrop}
        onChange={handleModalSheetChanges}>
        {detailModal ? (
          <View style={styles.contentContainer}>
            <View style={styles.textContainerHeader}>
              <Text
                style={
                  Platform.OS === 'ios'
                    ? [styles.modalTitle, { fontWeight: 'bold' }]
                    : styles.modalTitle
                }>
                Detail Task
              </Text>
            </View>
            <Divider />
            <ScrollView fadingEdgeLength={30} style={styles.formContainer}>
              <Text style={styles.headerModalText}>Nama Task</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.task_name}
              </Text>
              <Text style={styles.headerModalText}>Nama Project</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.project_name}
              </Text>
              <Text style={styles.headerModalText}>Nama Klien</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.project_client}
              </Text>
              <Text style={styles.headerModalText}>Nama Stage</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.stage_name}
              </Text>
              <Text style={styles.headerModalText}>Status Task</Text>
              <Text style={[styles.subHeaderModalText, { marginTop: 10 }]}>
                {detailModal.task_due_date_done === '1' ? (
                  <>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={
                          Platform.OS === 'ios'
                            ? [
                                styles.biodataValueText,
                                {
                                  fontWeight: 'bold',
                                  color: theme.colors.primary,
                                },
                              ]
                            : [
                                styles.biodataValueText,
                                {
                                  color: theme.colors.primary,
                                },
                              ]
                        }>
                        Selesai
                      </Text>
                    </View>

                    {overtimeText(detailModal)}
                  </>
                ) : (
                  <>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={
                          Platform.OS === 'ios'
                            ? [
                                styles.biodataValueText,
                                {
                                  fontWeight: 'bold',
                                  color: theme.colors.secondary,
                                },
                              ]
                            : [
                                styles.biodataValueText,
                                {
                                  color: theme.colors.secondary,
                                },
                              ]
                        }>
                        Belum Selesai
                      </Text>
                    </View>

                    {overtimeText(detailModal)}
                  </>
                )}
              </Text>
              <Text style={styles.headerModalText}>Catatan</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.task_notes || 'Tidak ada catatan'}
              </Text>
              <Text style={styles.headerModalText}>Batas Waktu Pengerjaan</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {moment(detailModal.task_due_date).format('DD-MM-yyyy') ||
                  'Tidak ada catatan'}
              </Text>
              <Text style={styles.headerModalText}>Histori</Text>
              <Text style={styles.muteHeaderModalText}>
                {'• Task diberikan pada ' +
                  moment(detailModal.assign_member_at).format(
                    'DD-MM-yyyy HH:mm:ss',
                  )}
              </Text>
              <Text style={styles.muteHeaderModalText}>
                {detailModal.task_due_date_done === '1' &&
                  '• Task selesai pada ' +
                    moment(detailModal.task_due_date_done_at).format(
                      'DD-MM-yyyy HH:mm:ss',
                    )}
                {detailModal.task_due_date_done === '1' &&
                  '\n• Task diselesaikan oleh ' + detailModal.selesai_oleh}
              </Text>
            </ScrollView>
          </View>
        ) : null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
export default Profile;
