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
  Platform,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  Searchbar,
  Divider,
  IconButton,
  Button,
  Snackbar,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
import InsetShadow from 'react-native-inset-shadow';
import NavigationService from 'app/navigation/NavigationService';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from '@react-navigation/native';
import NumberFormat from 'react-number-format';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import 'app/components/Sheet.js'; // sheet
import {
  emptyDetail,
  categoryService,
  categoryDefault,
} from 'app/utils/constants';
import { ILoginState } from 'app/models/reducers/login';
import moment from 'moment';
import 'moment/locale/id';
import { IMainState } from 'app/models/reducers/main';
import * as mainActions from 'app/store/actions/mainActions';
moment.locale('id');

var _ = require('lodash');

interface IState {
  loginReducer: ILoginState;
  mainReducer: IMainState;
}

function numberWithCommas(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '0';
  }
}

const RequestList: React.FC = ({ route }) => {
  //param data
  const project_id = route !== undefined ? route.params.project_id : null;
  const task_id = route !== undefined ? route.params.task_id : null;
  const service_name = categoryService.find((x) => x.id == project_id)
    ?.type_name;
  const project_name =
    route !== undefined
      ? route.params.project_name !== undefined
        ? route.params.project_name
        : project_id
        ? service_name
        : null
      : null;

  // const project_desc = route !== undefined ? route.params.project_desc : null;
  const item_capture = route !== undefined ? route.params.item : null;
  const subservice_data =
    route !== undefined ? route.params.subservice_data : null;

  const dispatch = useDispatch();
  //user data
  const userData = useSelector((state: IState) => state.loginReducer.userData);

  //mainstate
  const requestCount = useSelector(
    (state: IState) => state.mainReducer.requestCount,
  );
  const requestPerbankanCount = useSelector(
    (state: IState) => state.mainReducer.requestPerbankanCount,
  );
  const requestNotarisCount = useSelector(
    (state: IState) => state.mainReducer.requestNotarisCount,
  );
  const requestPPATCount = useSelector(
    (state: IState) => state.mainReducer.requestPPATCount,
  );

  //isfocused hook
  const isFocused = useIsFocused();

  //navigation service
  const onBack = () => NavigationService.goBack();
  const onCreateRequest = (item) =>
    NavigationService.navigate('CreateRequest', { item: item });

  const onUploadPhoto = (item, id, nama, uri, isButton) => {
    SheetManager.hide('detailrequest');
    NavigationService.navigate('UploadPhoto', {
      item: item,
      id_layanan: id,
      nama_layanan: nama,
      uri: uri,
      referrer: 'RequestList',
      isButton: isButton,
    });
  };
  //bottom sheet logic
  // ref
  const scrollCategoryRef = useRef();
  const actionSheetRef = useRef();

  //hooks
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = React.useState(true);
  const [isEditBiaya, setEditBiaya] = React.useState(false);

  const [categoryList, setCategoryList] = useState(categoryDefault);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = React.useState(false);
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(10);

  //form
  const [bpn, setBpn] = useState('');
  const [notaris, setNotaris] = useState('');

  const [allRequestList, setAllRequestList] = React.useState([]);
  const [requestedList, setRequestedList] = React.useState([]);
  const [processedList, setProcessedList] = React.useState([]);
  const [approvedList, setApprovedList] = React.useState([]);
  const [confirmedList, setConfirmedList] = React.useState([]);
  const [doneList, setDoneList] = React.useState([]);
  const [rejectedList, setRejectedList] = React.useState([]);

  const [requestList, setRequestList] = useState(requestedList);

  const [detailModal, setDetailModal] = useState(emptyDetail);
  const [subService, setSubService] = useState(emptyDetail.subservices);

  const [, updateState] = React.useState();

  // callbacks
  //use to force re render
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleModalSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      // setDetailModal(emptyDetail);
      // setSubService(emptyDetail.subservices);
      setEditBiaya(false);
    }
  }, []);

  const handlePresentModalPress = useCallback((item, tempSubservices) => {
    setLoader(true);
    setDetailModal(item);
    if (tempSubservices) {
      setSubService(tempSubservices);
    } else {
      setSubService(item.subservices);
    }

    forceUpdate();
    setLoader(false);
    // console.log(item);
    SheetManager.show('detailrequest');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeSearch = (query) => {
    const filteredArrays = allRequestList.filter(
      ({ request_client, subservices, nama_bank }) => {
        if (nama_bank) {
          return (
            request_client.toLowerCase().includes(query.toLowerCase()) ||
            nama_bank.toLowerCase().includes(query.toLowerCase()) ||
            subservices.some((item) =>
              item.sub_service_name.toLowerCase().includes(query.toLowerCase()),
            )
          );
        } else {
          return (
            request_client.toLowerCase().includes(query.toLowerCase()) ||
            subservices.some((item) =>
              item.sub_service_name.toLowerCase().includes(query.toLowerCase()),
            )
          );
        }
      },
    );
    isActiveOrNot(0);
    setRequestList(filteredArrays);
    scrollCategoryRef.current?.scrollTo({
      x: 0,
      animated: true,
    });
  };

  const isActiveOrNot = (categoryIndex: number) => {
    console.log(categoryIndex);
    setLoader(true);
    const category = [...categoryList];
    category.map((category, index) => {
      if (index === categoryIndex) {
        category.is_active = true;
        if (category.id === 0) {
          setRequestList(allRequestList);
          setActiveTab(0);
        } else if (category.id === 1) {
          setRequestList(requestedList);
          setActiveTab(1);
        } else if (category.id === 2) {
          setRequestList(processedList);
          setActiveTab(2);
        } else if (category.id === 3) {
          setRequestList(approvedList);
          setActiveTab(3);
        } else if (category.id === 4) {
          setRequestList(confirmedList);
          setActiveTab(4);
        } else if (category.id === 5) {
          setRequestList(doneList);
          setActiveTab(5);
        } else if (category.id === 6) {
          setRequestList(rejectedList);
          setActiveTab(6);
        }
      } else {
        category.is_active = false;
      }
      setLoader(false);
    });

    setCategoryList(category);
  };

  const populateData = (state, activeTab) => {
    // eslint-disable-next-line no-undef
    const abortController = new AbortController();
    if (requestList.length > 0) {
      setRefreshing(true);
    } else {
      setLoader(true);
    }
    var postData = new FormData();
    postData.append('service_type', project_id);
    postData.append('user_id', userData.iduser);
    postData.append('page', page);
    postData.append('perpage', perpage);
    fetch(apiUrl.api + 'listrequest_v2', {
      method: 'POST',
      body: postData,
      signal: abortController.signal,
    })
      .then((response) => response.json())
      .then((json) => {
        const requested = _.filter(json.data, ['is_approved', '0']);
        const processed = _.filter(json.data, ['project_status', '1']);
        const approved = _.filter(json.data, ['project_status', '2']);
        const confirmed = _.filter(json.data, function (item) {
          if (
            item.project_done === '1' &&
            item.project_status === '2' &&
            item.subservices.length > 0 &&
            item.subservices[0].image_url === null
          ) {
            return item;
          }
        });
        const rejected = _.filter(json.data, ['is_approved', '2']);
        const done = _.filter(json.data, function (item) {
          if (
            item.is_approved === '1' &&
            item.project_status === '2' &&
            item.subservices.length > 0 &&
            item.subservices[0].image_url
          ) {
            return item;
          }
        });

        setAllRequestList(allRequestList.concat(json.data));
        if (requested !== undefined) {
          setRequestedList(requestedList.concat(requested));
        } else {
          setRequestedList([]);
        }
        if (processed !== undefined) {
          setProcessedList(processedList.concat(processed));
        } else {
          setProcessedList([]);
        }
        if (approved !== undefined) {
          setApprovedList(approvedList.concat(approved));
        } else {
          setApprovedList([]);
        }
        if (confirmed !== undefined) {
          setConfirmedList(confirmedList.concat(confirmed));
        } else {
          setConfirmedList([]);
        }
        if (done !== undefined) {
          setDoneList(doneList.concat(done));
        } else {
          setDoneList([]);
        }
        if (rejected !== undefined) {
          setRejectedList(rejectedList.concat(rejected));
        } else {
          setRejectedList([]);
        }

        if (state) {
          setRequestList(json.data);
        } else {
          if (activeTab === 0) {
            setRequestList(json.data);
          } else if (activeTab === 1) {
            setRequestList(requested);
          } else if (activeTab === 2) {
            setRequestList(processed);
          } else if (activeTab === 3) {
            setRequestList(approved);
          } else if (activeTab === 4) {
            setRequestList(confirmed);
          } else if (activeTab === 5) {
            setRequestList(done);
          } else if (activeTab === 6) {
            setRequestList(rejected);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.name === 'AbortError') {
          return;
        }
        // if the query has been aborted, do nothing
        throw error;
      })
      .finally(() => {
        setVisible(false);
        setLoader(false);
        setRefreshing(false);
      });
    setRefreshing(false);
    return () => {
      abortController.abort();
      // stop the query by aborting on the AbortController on unmount
    };
  };

  const onRefresh = React.useCallback(() => {
    setVisible(false);
    populateData(null, activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const onApproval = () => {
    setLoader(true);
    const data = new FormData();
    if (detailModal) {
      data.append('id_req', detailModal.id);
      data.append('id_project', detailModal.project_id);
      data.append('id_user', userData.iduser);
      data.append('subservices', JSON.stringify(subService));
    }

    if (subService.length > 0) {
      fetch(apiUrl.api + 'serahterimadokumen', {
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
                  'Bukti serah terima berhasil dikirim',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        actionSheetRef.current?.hide();
                        setRefreshing(true);
                        populateData(true, activeTab);
                        isActiveOrNot(0);
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
        .catch((error) => {
          Alert.alert('Submit Failed', 'Ada masalah pada request');
          console.error('network error', error);
        });
    } else {
      setLoader(false);
      Alert.alert('Submit Failed', 'Anda belum menambahkan bukti serah terima');
    }
  };

  const onSubmitBiaya = () => {
    setLoader(true);
    const data = new FormData();
    if (detailModal) {
      data.append('id_req', detailModal.id);
      data.append('id_user', userData.iduser);
      data.append('subservices', JSON.stringify(subService));
      data.append('bea_notaris', notaris.replace(/\D/g, ''));
      data.append('bea_bpn', bpn.replace(/\D/g, ''));
    }
    fetch(apiUrl.api + 'biayaupdate', {
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
              Alert.alert('Submit Success', 'Ubahan Biaya berhasil diajukan', [
                {
                  text: 'OK',
                  onPress: () => {
                    actionSheetRef.current?.hide();
                    setRefreshing(true);
                    populateData(true, activeTab);
                    isActiveOrNot(0);
                  },
                },
              ]);
            }
          })
          .catch((error) => {
            Alert.alert('Submit Failed', 'Ada masalah pada server');
            console.error(error);
          });
      })
      .catch((error) => console.error('network error', error));
  };

  React.useEffect(() => {
    setRefreshing(true);
    populateData(true, activeTab);
    isActiveOrNot(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  React.useEffect(() => {
    populateData(true, 0);
    return () => {
      setAllRequestList([]);
      setRequestList([]);
      setProcessedList([]);
      setConfirmedList([]);
      setDoneList([]);
      setRejectedList([]);
      setApprovedList([]);
      setDetailModal(emptyDetail);
      setSubService(emptyDetail.subservices);
      setEditBiaya(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    populateData(false, activeTab);
  }, [page]);

  // after capture logic
  React.useEffect(() => {
    if (item_capture && subservice_data) {
      const tempSubservices = [];
      item_capture.subservices.forEach((item) => {
        if (item.sub_service_id === subservice_data.sub_service_id) {
          item = subservice_data;
        }
        tempSubservices.push(item);
      });
      item_capture.subservices = tempSubservices;
      setSubService(tempSubservices);
      setDetailModal(item_capture);
      forceUpdate();
      // console.log(item_capture);
      // console.log(subService);
      // console.log(subservice_data);
      // console.log(tempSubservices);

      handlePresentModalPress(item_capture, tempSubservices);
    } else {
      setSubService(emptyDetail.subservices);
      setDetailModal(emptyDetail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item_capture, subservice_data]);

  React.useEffect(() => {
    if (task_id) {
      const data = new FormData();
      data.append('id_req', task_id);
      data.append('id_user', userData.iduser);
      data.append('service_type', project_id);
      fetch(apiUrl.api + 'requestdetail', {
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
              setDetailModal(dataRes.data);
              setSubService(dataRes.data.subservices);
              // handlePresentModalPress(dataRes.data);
            })
            .catch((error) => {
              Alert.alert('Fetch Failed', 'Gagal mengambil data');
              console.error(error);
            });
        })
        .catch((error) => console.error('network error', error))
        .finally(() => {
          SheetManager.show('detailrequest');
        });
    }
  }, [task_id]);

  React.useEffect(() => {
    if (project_id) {
      switch (project_id) {
        case '1':
          dispatch(mainActions.setRequestPerbankanCount(0));
          dispatch(
            mainActions.setRequestCount(requestCount - requestPerbankanCount),
          );
          break;
        case '2':
          dispatch(mainActions.setRequestNotarisCount(0));
          dispatch(
            mainActions.setRequestCount(requestCount - requestNotarisCount),
          );
          break;
        case '3':
          dispatch(mainActions.setRequestPPATCount(0));
          dispatch(
            mainActions.setRequestCount(requestCount - requestPPATCount),
          );
      }
      setTimeout(function () {
        dispatch(mainActions.setRequestCount(0));
      }, 1500);
    }
  }, [project_id]);

  //jsx logic
  const getCashIcon = (payment) => {
    if (payment === '0') {
      return 'account-cash-outline';
    } else if (payment === '1') {
      return 'cash-multiple';
    } else if (payment === '2') {
      return 'cash-remove';
    }
  };

  const getStatusIcon = (item) => {
    if (item.is_approved === '0') {
      return {
        icon: 'clipboard-arrow-right-outline',
        color: theme.colors.secondary,
      };
    } else if (item.is_approved === '1') {
      if (item.project_status === '1') {
        return {
          icon: 'clipboard-arrow-up-outline',
          color: '#3E7BFA',
        };
      } else if (item.project_status === '2') {
        if (item.subservices.length > 0 && item.subservices[0].image_url) {
          return {
            icon: 'clipboard-file-outline',
            color: '#A8ADAF',
          };
        } else {
          return {
            icon: 'clipboard-check-outline',
            color: theme.colors.primary,
          };
        }
      }
    } else if (item.is_approved === '2') {
      return {
        icon: 'clipboard-arrow-left-outline',
        color: '#FF616D',
      };
    } else {
      return {
        icon: 'clipboard-arrow-right-outline',
        color: theme.colors.secondary,
      };
    }
  };

  const getStatusBadge = (item, index) => (
    <View
      style={styles.headerListContainer}
      key={'headerlist' + item.id.toString() + index}>
      {item.is_approved === '0' ? (
        <Text style={styles.statusListTextWarning}>Diajukan</Text>
      ) : null}
      {item.is_approved === '2' ? (
        <Text style={styles.statusListTextDanger}>Ditolak</Text>
      ) : null}
      {item.is_approved === '1' && item.project_status === '1' ? (
        <Text style={styles.statusListTextInfo}>Diproses</Text>
      ) : null}
      {(item.is_approved === '1' &&
        item.project_status === '2' &&
        item.subservices.length > 0 &&
        !item.subservices[0].image_url) ||
      (item.is_approved === '1' &&
        item.project_status === '2' &&
        !item.subservices.length > 0) ? (
        <Text style={styles.statusListTextSuccess}>Disetujui</Text>
      ) : null}
      {item.is_approved === '1' &&
      item.project_status === '2' &&
      item.subservices.length > 0 &&
      item.subservices[0].image_url ? (
        <Text style={styles.statusListTextMute}>Selesai</Text>
      ) : null}
    </View>
  );

  const getTopListContainer = (item, index) => (
    <View style={styles.topListContainer}>
      {getStatusBadge(item, index)}
      {project_id === '1' ? (
        <View
          style={styles.topTextContainer}
          key={'headertext' + item.id.toString() + index}>
          <IconButton
            style={styles.postDateIcon}
            icon="bank-outline"
            color={'#7b7e80'}
            size={14}
          />
          <Text style={styles.postDateText}>
            {item.nama_bank || 'Bank tidak tersedia'}
          </Text>
        </View>
      ) : (
        [
          item.request_payment ? (
            <View
              style={styles.topTextContainer}
              key={'headertext' + item.id.toString() + index}>
              <IconButton
                style={styles.postDateIcon}
                icon={getCashIcon(item.request_payment)}
                color={'#7b7e80'}
                size={14}
              />
              <Text style={styles.postDateText}>
                {item.request_payment === '0'
                  ? 'DP/Uang Muka'
                  : [
                      item.request_payment === '1'
                        ? 'Lunas'
                        : 'Belum melakukan pembayaran',
                    ]}
              </Text>
            </View>
          ) : null,
        ]
      )}
    </View>
  );

  const emptyList = () => (
    <View style={styles.emptyStateContainer}>
      <Image
        source={require('../../assets/empty_list_req.png')}
        style={styles.image}
      />
      <Text style={styles.emptyStateTitle}>Data tidak ditemukan</Text>
      <Text style={styles.emptyStateText}>
        Data pekerjaan belum tersedia untuk saat ini
      </Text>
    </View>
  );

  return (
    <>
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
            <Text style={styles.headerText}>Daftar Request</Text>
          </View>
        </View>
        <View style={styles.textContainerHeader}>
          <Text style={styles.headerText}>{project_name}</Text>
        </View>
      </View>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.sheetContainer}>
          <Spinner
            visible={loader}
            // textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={{ flex: 1, width: '100%' }}>
            <ScrollView
              fadingEdgeLength={30}
              style={styles.categoryListContainer}
              horizontal={true}
              ref={scrollCategoryRef}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}>
              {categoryList.map((category, index) => {
                return (
                  <TouchableOpacity
                    style={
                      category.is_active
                        ? [
                            styles.categoryPill,
                            { backgroundColor: 'rgba(249, 168, 38, 0.1)' },
                          ]
                        : [styles.categoryPill]
                    }
                    key={category.id}
                    onPress={() => {
                      isActiveOrNot(index);
                    }}>
                    <View key={category.id}>
                      <Text style={styles.categoryText}>{category.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.listContainer}>
              <Searchbar
                placeholder="Cari request"
                style={styles.searchbar}
                inputStyle={styles.searchbarInput}
                onChangeText={onChangeSearch}
                theme={{
                  colors: {
                    placeholder: theme.colors.placeholder,
                    primary: theme.colors.primary,
                    background: theme.colors.background,
                  },
                }}
              />
              <FlatList
                fadingEdgeLength={30}
                data={requestList}
                keyExtractor={(item, index) => index + item.id.toString()}
                ListEmptyComponent={emptyList}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => onRefresh()}
                  />
                }
                onEndReachedThreshold={0.001}
                onEndReached={() => {
                  if (activeTab === 0) {
                    setPage(page + 1);
                  }
                }}
                ListFooterComponent={() => {
                  if (requestList.length > 9) {
                    return (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                        }}>
                        <ActivityIndicator
                          animating={true}
                          color={theme.colors.secondary}
                        />
                      </View>
                    );
                  } else {
                    return null;
                  }
                }}
                renderItem={({ item, index }) => {
                  return (
                    <React.Fragment key={'status' + item.id.toString() + index}>
                      {getTopListContainer(item, index)}
                      <List.Item
                        key={'item' + item.id.toString() + index}
                        title={item.request_client || 'Klien tidak tersedia'}
                        description={
                          <>
                            <Text style={styles.descriptionListText}>
                              {[
                                item.subservices && item.subservices.length > 0
                                  ? item.subservices
                                      .map((doc) => doc.sub_service_name)
                                      .join('  •  ')
                                  : 'Layanan tidak tersedia',
                              ] +
                                '\nRequest : ' +
                                [
                                  item.request_name || 'Request tidak tersedia',
                                ] +
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
                        descriptionNumberOfLines={7}
                        titleStyle={
                          Platform.OS === 'ios'
                            ? [styles.titleListText, { fontWeight: 'bold' }]
                            : styles.titleListText
                        }
                        left={(props) => {
                          return (
                            <IconButton
                              {...props}
                              style={styles.requestItem}
                              icon={getStatusIcon(item).icon}
                              color={getStatusIcon(item).color}
                              size={28}
                            />
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
                          if (
                            item.project_status === '2' ||
                            item.is_approved === '2'
                          ) {
                            handlePresentModalPress(item);
                          } else {
                            onCreateRequest(item);
                          }
                        }}
                      />
                    </React.Fragment>
                  );
                }}
              />
            </View>
          </View>
        </View>
        <ActionSheet
          id="detailrequest"
          gestureEnabled={true}
          onClose={() => {
            setDetailModal(emptyDetail);
            setSubService(emptyDetail.subservices);
            setEditBiaya(false);
          }}
          ref={actionSheetRef}>
          <View style={{ height: '100%' }}>
            <View style={styles.modalContentContainer}>
              <View style={styles.scrollListContainer}>
                <ScrollView
                  fadingEdgeLength={30}
                  showsVerticalScrollIndicator={false}
                  contentContainerstyle={styles.documentScrollView}
                  nestedScrollEnabled={true}
                  onMomentumScrollEnd={() =>
                    actionSheetRef.current?.handleChildScrollEnd()
                  }>
                  <Text style={styles.headerModalText}>Nama Klien</Text>
                  <Text
                    style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                    {detailModal.request_client}
                  </Text>
                  <Text style={styles.headerModalText}>Kontak Klien</Text>
                  <Text
                    style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                    {detailModal.request_contact || 'Tidak ada kontak'}
                  </Text>
                  <Text style={styles.headerModalText}>Nama Bank</Text>
                  <Text
                    style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                    {detailModal.nama_bank || 'Tidak ada bank'}
                  </Text>
                  <Text style={styles.headerModalText}>Nama Order</Text>
                  <Text
                    style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                    {detailModal.request_name}
                  </Text>
                  <Text style={styles.headerModalText}>Catatan Order</Text>
                  <Text
                    style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                    {detailModal.keterangan || 'Tidak ada catatan'}
                  </Text>
                  <View style={styles.headerModalContainer}>
                    <Text style={styles.headerModalText}>Detail Biaya</Text>
                    {detailModal.request_service_id === '1' &&
                      detailModal.is_approved === '1' && (
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => {
                            if (isEditBiaya) {
                              setEditBiaya(false);
                            } else {
                              setEditBiaya(true);
                            }
                          }}>
                          <Text style={styles.editButtonText}>
                            {isEditBiaya ? 'Batal' : 'Edit Biaya'}
                          </Text>
                        </TouchableOpacity>
                      )}
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                      Biaya Order :
                    </Text>
                    <Text style={[styles.subHeaderModalText]}>
                      {detailModal.request_payment_amount
                        ? 'Rp ' +
                          numberWithCommas(detailModal.request_payment_amount)
                        : 'Tidak ada biaya'}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                      Biaya BPN :
                    </Text>
                    <Text style={[styles.subHeaderModalText]}>
                      {detailModal.request_payment_bpn
                        ? [
                            detailModal.request_payment_bpn_change
                              ? 'Rp ' +
                                numberWithCommas(
                                  detailModal.request_payment_bpn,
                                ) +
                                ' -> ' +
                                'Rp ' +
                                numberWithCommas(
                                  detailModal.request_payment_bpn_change,
                                )
                              : 'Rp ' +
                                numberWithCommas(
                                  detailModal.request_payment_bpn,
                                ),
                          ]
                        : [
                            detailModal.request_payment_bpn_change
                              ? 'Tidak ada biaya' +
                                ' -> ' +
                                'Rp ' +
                                numberWithCommas(
                                  detailModal.request_payment_bpn_change,
                                )
                              : 'Tidak ada biaya',
                          ]}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                      Biaya Notaris :
                    </Text>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={[styles.subHeaderModalText, { width: 150 }]}>
                      {detailModal.request_payment_notaris
                        ? [
                            detailModal.request_payment_notaris_change
                              ? 'Rp ' +
                                numberWithCommas(
                                  detailModal.request_payment_notaris,
                                ) +
                                ' -> ' +
                                'Rp ' +
                                numberWithCommas(
                                  detailModal.request_payment_notaris_change,
                                )
                              : 'Rp ' +
                                numberWithCommas(
                                  detailModal.request_payment_notaris,
                                ),
                          ]
                        : [
                            detailModal.request_payment_notaris_change
                              ? 'Tidak ada biaya' +
                                ' -> ' +
                                'Rp ' +
                                numberWithCommas(
                                  detailModal.request_payment_notaris_change,
                                )
                              : 'Tidak ada biaya',
                          ]}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                      Biaya Plafond Awal :
                    </Text>
                    <Text style={[styles.subHeaderModalText]}>
                      {detailModal.request_plafond_awal
                        ? 'Rp ' +
                          numberWithCommas(detailModal.request_plafond_awal)
                        : 'Tidak ada biaya'}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                      Biaya Plafond Akhir :
                    </Text>
                    <Text
                      style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                      {detailModal.request_plafond_akhir
                        ? 'Rp ' +
                          numberWithCommas(detailModal.request_plafond_akhir)
                        : 'Tidak ada biaya'}
                    </Text>
                  </View>
                  {isEditBiaya && (
                    <View>
                      <Text style={styles.headerModalText}>Biaya Baru</Text>
                      <NumberFormat
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp '}
                        value={bpn}
                        renderText={(value) => (
                          <TextInput
                            label="Masukkan biaya BPN baru"
                            mode="outlined"
                            key="pembayaraninput"
                            style={styles.inputTextContainer}
                            defaultValue={
                              detailModal.request_payment_bpn_change
                            }
                            value={value}
                            keyboardType="numeric"
                            theme={{
                              colors: {
                                placeholder: theme.colors.placeholder,
                                primary: theme.colors.secondary,
                                background: '#F6F8FA',
                              },
                            }}
                            onChangeText={(text) => {
                              setBpn(text);
                            }}
                          />
                        )}
                      />
                      <NumberFormat
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp '}
                        value={notaris}
                        renderText={(value) => (
                          <TextInput
                            label="Masukkan biaya Notaris baru"
                            mode="outlined"
                            key="pembayaraninput"
                            style={[
                              styles.inputTextContainer,
                              { marginBottom: 10 },
                            ]}
                            defaultValue={
                              detailModal.request_payment_notaris_change
                            }
                            value={value}
                            keyboardType="numeric"
                            theme={{
                              colors: {
                                placeholder: theme.colors.placeholder,
                                primary: theme.colors.secondary,
                                background: '#F6F8FA',
                              },
                            }}
                            onChangeText={(text) => {
                              setNotaris(text);
                            }}
                          />
                        )}
                      />
                      <View style={styles.submitButtonContainer}>
                        <Button
                          mode="contained"
                          labelStyle={
                            Platform.OS === 'ios'
                              ? [
                                  styles.buttonSubmitLabel,
                                  {
                                    fontWeight: 'bold',
                                  },
                                ]
                              : styles.buttonSubmitLabel
                          }
                          style={styles.buttonSubmit}
                          onPress={() => {
                            onSubmitBiaya();
                          }}>
                          {loader ? 'Mengirimkan..' : 'Ajukan Ubahan'}
                        </Button>
                      </View>
                    </View>
                  )}

                  <Text style={styles.headerModalText}>Histori</Text>
                  <Text style={styles.muteHeaderModalText}>
                    {'• Diposting pada ' + detailModal.created_at}
                  </Text>
                  <Text style={styles.muteHeaderModalText}>
                    {detailModal.is_approved === '2'
                      ? '• Ditolak pada ' + detailModal.approved_at
                      : '• Disetujui pada ' + detailModal.approved_at}
                  </Text>
                  <View style={{ height: 20 }} />
                </ScrollView>
              </View>
            </View>
            <View style={[styles.modalContentContainer, { flex: 1.5 }]}>
              <View style={styles.innerSheetContainer}>
                <View style={[styles.textContainerHeader]}>
                  <Text
                    style={[
                      styles.sheetTitle,
                      { color: 'white', marginTop: 10 },
                    ]}>
                    Jenis Layanan
                  </Text>
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
                      fadingEdgeLength={20}
                      style={styles.documentScrollView}
                      contentContainerStyle={{ flexGrow: 1 }}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                      nestedScrollEnabled={true}
                      onMomentumScrollEnd={() =>
                        actionSheetRef.current?.handleChildScrollEnd()
                      }>
                      {subService && [
                        subService.length > 0 && subService[0].image_url ? (
                          <View
                            key="scrolltextcontainer"
                            style={styles.scrollTextContainerHeader}>
                            <Text
                              style={[
                                styles.muteHeaderModalText,
                                { color: 'white' },
                              ]}>
                              Sudah melakukan serah terima
                            </Text>
                          </View>
                        ) : (
                          [
                            detailModal.project_done === '1' ? (
                              <View
                                key="scrolltextcontainerheader"
                                style={styles.scrollTextContainerHeader}>
                                <Text
                                  style={[
                                    styles.muteHeaderModalText,
                                    { color: 'white' },
                                  ]}>
                                  Ketuk nama layanan untuk menambah bukti serah
                                  terima
                                </Text>
                                <Text
                                  style={[
                                    styles.muteHeaderModalText,
                                    { color: 'white' },
                                  ]}>
                                  * Semua layanan harus memiliki bukti serah
                                  terima untuk dapat dikirim
                                </Text>
                              </View>
                            ) : (
                              <View
                                key="scrolltextcontainerheader"
                                style={styles.scrollTextContainerHeader}>
                                <Text
                                  style={[
                                    styles.muteHeaderModalText,
                                    { color: 'white' },
                                  ]}>
                                  Order ini belum bisa menerima upload bukti
                                  serah terima
                                </Text>
                              </View>
                            ),
                          ]
                        ),
                      ]}

                      {subService
                        ? subService.map((item, index) => (
                            <View
                              style={styles.documentListContainer}
                              key={'viewcontainer' + index}>
                              <TouchableOpacity
                                style={styles.documentLabelContainer}
                                key={
                                  'touch' +
                                  item.sub_service_id.toString() +
                                  index
                                }
                                onPress={() => {
                                  if (detailModal.is_approved === '1') {
                                    if (item.image_url) {
                                      onUploadPhoto(
                                        detailModal,
                                        item.sub_service_id,
                                        item.sub_service_name,
                                        item.tempUri,
                                        false,
                                      );
                                    } else {
                                      if (detailModal.project_done === '1') {
                                        onUploadPhoto(
                                          detailModal,
                                          item.sub_service_id,
                                          item.sub_service_name,
                                          item.tempUri,
                                          true,
                                        );
                                      } else {
                                        Alert.alert(
                                          'Peringatan',
                                          'Anda belum bisa mengupload bukti serah terima',
                                        );
                                      }
                                    }
                                  }
                                }}>
                                <Text
                                  key={
                                    'txt' +
                                    item.sub_service_id.toString() +
                                    index
                                  }
                                  style={styles.checkboxDocumentLabel}>
                                  {item.sub_service_name}
                                </Text>
                              </TouchableOpacity>
                              <Divider styles={{ width: '80%' }} />
                              <Text style={styles.checkboxFileLabel}>
                                {item.fileName || item.image_url
                                  ? item.fileName || item.image_url
                                  : '* Bukti serah terima belum tersedia'}
                              </Text>
                            </View>
                          ))
                        : null}
                    </ScrollView>
                  </InsetShadow>
                </View>
                {subService && [
                  _.filter(subService, (o) => {
                    return o.img64 !== undefined;
                  }).length === subService.length ? (
                    <View
                      key="kirimbuktibutton"
                      style={styles.submitButtonContainer}>
                      <Button
                        mode="contained"
                        onPress={onApproval}
                        labelStyle={[styles.buttonSubmitLabel]}
                        style={styles.buttonSubmit}>
                        {loader ? 'Mengirimkan..' : 'Kirim Bukti Serah Terima'}
                      </Button>
                    </View>
                  ) : null,
                ]}
              </View>
            </View>
          </View>
        </ActionSheet>
      </View>
      <Snackbar
        visible={visible}
        style={{ backgroundColor: '#F6F8FA' }}
        theme={{
          colors: { surface: '#263238', accent: theme.colors.primary },
        }}
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
    </>
  );
};

export default RequestList;
