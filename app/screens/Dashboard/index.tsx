import React, { useState, useRef } from 'react';

import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
import {
  View,
  Image,
  Text,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  List,
  IconButton,
  Provider,
  Portal,
  Modal,
  TextInput,
  Button,
  Divider,
} from 'react-native-paper';
import { theme } from 'app/core/theme';
import NavigationService from 'app/navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import CalendarStrip from 'react-native-calendar-strip';
import { TimePicker } from 'react-native-simple-time-picker';
import TextTicker from 'react-native-text-ticker';
import SwitchSelector from 'react-native-switch-selector';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');
//redux
import * as mainActions from 'app/store/actions/mainActions';

interface IState {
  loginReducer: ILoginState;
  mainReducer: IMainState;
}

const resume = [
  { id: 0, name: 'Request', icon: 'clipboard-check' },
  { id: 1, name: 'Job', icon: 'clipboard-text' },
];

const Dashboard: React.FC = ({}) => {
  const dispatch = useDispatch();
  //fetch user data
  const userData = useSelector((state) => state.loginReducer.userData);
  const runningTextData = useSelector((state) => state.mainReducer.runningText);

  //refs
  const bankInput = useRef(null);
  const orderInput = useRef(null);

  //navigation service
  const onProfile = (show_button) =>
    NavigationService.navigate('Profile', {
      show_button: show_button,
    });

  const onSelect = (data) => {
    bankInput.current.blur();
    if (bankInput.current.isFocused()) {
      bankInput.current.blur();
    }

    setBank({
      bank_id: data.bank_id,
      bank_name: data.bank_name,
    });
  };

  const onSelectOrder = (data) => {
    orderInput.current.blur();
    if (orderInput.current.isFocused()) {
      orderInput.current.blur();
    }
    setOrderId(data.order_id);
    setOrder({
      order_id: data.order_id,
      order_item: data.order_item,
      order_name: data.order_item.request_name,
      request_service_name: data.order_item.request_service_name,
      request_service_id: data.order_item.request_service_id,
      request_kredit_id: data.order_item.request_kredit_id,
      nama_kredit: data.order_item.nama_kredit,
      request_plafond_awal: data.order_item.request_plafond_awal,
      request_plafond_akhir: data.order_item.request_plafond_akhir,
    });
    setBank({
      bank_id: data.order_item.id_bank,
      bank_name: data.order_item.nama_bank,
    });
    setKlien(data.order_item.request_client);
  };

  const onSearchList = (item, listType, id, title) => {
    var select = onSelect;
    if (listType === 'appointment_bank') {
      select = onSelect;
    } else if (listType === 'order') {
      select = onSelectOrder;
    }
    NavigationService.navigate('SearchList', {
      item: select,
      list_type: listType,
      type_id: null,
      id_kelengkapan: id,
      title: title,
    });
  };

  //bottom sheet logic
  //refs
  const calendarStripRef = useRef<CalendarStrip>(null);

  //state hooks
  const [loader, setLoader] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [detailVisible, setDetailVisible] = React.useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isOrder, setIsOrder] = useState(true);

  //data hooks
  const [appointmentList, setAppointmentList] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [requestResume, setRequestResume] = useState([]);
  const [jobResume, setJobResume] = useState([]);

  //formHooks
  const [tanggal, setTanggal] = useState();
  const [orderId, setOrderId] = useState('');
  const [klien, setKlien] = useState('');
  const [catatan, setCatatan] = useState('');
  const [bank, setBank] = useState({
    bank_id: null,
    bank_name: null,
  });
  const [order, setOrder] = useState({
    order_id: null,
    order_name: null,
  });
  const [jam, setJam] = useState({ hour: 0, minute: 0 });

  const [detailJadwal, setDetailJadwal] = useState();

  const onSubmit = () => {
    setLoader(true);
    const data = new FormData();
    data.append('id_user', userData.iduser);
    data.append('klien', titleCase(klien));
    data.append('id_order', orderId);
    data.append('bank', bank.bank_id);
    data.append('catatan', catatan);
    data.append('time', tanggal + ' ' + jam.hour + ':' + jam.minute + ':00');
    if (klien !== '' || tanggal !== '') {
      fetch(apiUrl.api + 'appointment', {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          setLoader(false);
          response
            .json()
            .then((dataRes) => {
              if (dataRes.success == true) {
                Alert.alert('Submit Success', 'Jadwal berhasil ditambahkan', [
                  {
                    text: 'OK',
                    onPress: () => {
                      setKlien('');
                      setBank({
                        bank_id: null,
                        bank_name: null,
                      });
                      setOrder({
                        order_id: null,
                        order_name: null,
                      });
                      setIsOrder(true);
                      setOrderId('');
                      calendarStripRef.current.setSelectedDate(tanggal);
                      setCatatan('');
                      populateList(tanggal);
                      populateMarkedDates();
                      setVisible(false);
                    },
                  },
                ]);
              }
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error('network error', error));
    } else {
      setLoader(false);
      Alert.alert('Submit Failed', 'Anda belum mencantumkan klien');
    }
  };

  const onCancel = (id) => {
    const data = new FormData();
    data.append('id', id);
    data.append('id_user', userData.iduser);
    Alert.alert(
      'Konfirmasi',
      'Hapus dan batalkan jadwal?',
      [
        {
          text: 'Ok',
          onPress: () => {
            setLoader(true);
            fetch(apiUrl.api + 'cancelappointment', {
              method: 'POST',
              body: data,
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
                        'Jadwal berhasil dibatalkan',
                        [
                          {
                            text: 'OK',
                            onPress: () => {
                              setKlien('');
                              setBank({
                                bank_id: null,
                                bank_name: null,
                              });
                              calendarStripRef.current.setSelectedDate(tanggal);
                              setCatatan('');
                              populateList(tanggal);
                              populateMarkedDates();
                              setDetailVisible(false);
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
          },
          style: 'destructive',
        },
        { text: 'Kembali', onPress: () => setLoader(false), style: 'cancel' },
      ],
      {
        cancelable: true,
        onDismiss: () => setLoader(false),
      },
    );
  };

  const populateData = () => {
    var postData = new FormData();
    postData.append('user_id', userData.iduser);
    postData.append('type', 'job');
    fetch(apiUrl.api + 'requestresume', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        // console.log(response.text());
        response
          .json()
          .then((data) => {
            setRequestResume(data.data[0]);
          })
          .catch((error) => console.error(error))
          .finally(() => setRefreshing(false));
      })
      .catch((error) => console.error(error));

    fetch(apiUrl.api + 'jobresume', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            setJobResume(data.data[0]);
          })
          .catch((error) => console.error(error))
          .finally(() => setRefreshing(false));
      })
      .catch((error) => console.error(error));

    fetch(apiUrl.api + 'getwelcometext')
      .then((response) => {
        // console.log(response.text());
        response
          .json()
          .then((data) => {
            dispatch(mainActions.setRunningText(data.data[0].content));
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const populateList = (date) => {
    var postData = new FormData();
    postData.append('tanggal', date);
    postData.append('id_user', userData.iduser);
    postData.append('role', userData.role);
    // postData.append('service_id', userData.service_id);
    fetch(apiUrl.api + 'listappointment', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        // console.log(response.text());
        response
          .json()
          .then((data) => {
            // console.log(data.data);
            setAppointmentList(data.data);
          })
          .catch((error) => console.error(error))
          .finally(() => setRefreshing(false));
      })
      .catch((error) => console.error(error));
  };

  const populateMarkedDates = () => {
    var postData = new FormData();
    postData.append('id_user', userData.iduser);
    postData.append('role', userData.role);
    // postData.append('service_id', userData.service_id);
    fetch(apiUrl.api + 'getappointmentahead', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        // console.log(response.text());
        response
          .json()
          .then((data) => {
            let markedDatesArray = [];
            data.data.map((row) => {
              markedDatesArray.push({
                date: moment(row.date, 'YYYY-MM-DD'),
                dots: [
                  {
                    color: theme.colors.secondary,
                  },
                ],
              });
            });
            setMarkedDates(markedDatesArray);
          })
          .catch((error) => console.error(error))
          .finally(() => setRefreshing(false));
      })
      .catch((error) => console.error(error));
  };

  const onRefresh = (date) => {
    setRefreshing(true);
    populateData();
    populateList(date);
    populateMarkedDates();
  };

  const setCurrentDate = () => {
    var date = new Date();
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  function numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '0';
    }
  }

  React.useEffect(() => {
    setRefreshing(true);
    populateData();
    populateList(setCurrentDate());
    setTanggal(setCurrentDate());
    populateMarkedDates();
    return () => {
      setRequestResume([]);
      setJobResume([]);
      setAppointmentList([]);
      setMarkedDates([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Provider>
      <View style={styles.background}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainerHeader}>
            <Text
              style={styles.headerMenuText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {'Halo, ' + userData.nama}
            </Text>
            <TextTicker
              style={[
                styles.headerMenuText,
                {
                  width: 280,
                  fontFamily: 'RedHatDisplay-Regular',
                  fontSize: 14,
                },
              ]}
              duration={runningTextData ? runningTextData.length * 150 : 10000}
              loop
              bounce
              repeatSpacer={50}>
              {runningTextData || ''}
            </TextTicker>
          </View>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={() => {
              onProfile(true);
            }}>
            <Image
              source={{
                uri: userData.pic,
              }}
              style={styles.profilImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.serviceMenuContainer}
          horizontal={true}
          fadingEdgeLength={30}
          showsHorizontalScrollIndicator={false}>
          {resume.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity key={item.id} style={styles.resumeContainer}>
                <View style={styles.serviceTextContainer}>
                  <IconButton
                    style={styles.postDateIcon}
                    icon={item.icon}
                    color={'#7b7e80'}
                    size={24}
                  />
                  <Text style={styles.resumeText}>{item.name}</Text>
                </View>
                {item.id === 0 ? (
                  <View style={styles.resumeTextContainer}>
                    <View style={styles.resumeTextColumn}>
                      <Text style={styles.resumeDetailText}>Diajukan</Text>
                      <Text style={styles.serviceText}>
                        {requestResume.requested}
                      </Text>
                    </View>
                    <View style={styles.resumeTextColumn}>
                      <Text style={styles.resumeDetailText}>Diproses</Text>
                      <Text style={styles.serviceText}>
                        {requestResume.processed}
                      </Text>
                    </View>
                    <View style={styles.resumeTextColumn}>
                      <Text style={styles.resumeDetailText}>Disetujui</Text>
                      <Text style={styles.serviceText}>
                        {requestResume.done}
                      </Text>
                    </View>
                    <View style={styles.resumeTextColumn}>
                      <Text style={styles.resumeDetailText}>Ditolak</Text>
                      <Text style={styles.serviceText}>
                        {requestResume.reject}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.resumeTextContainer}>
                    <View style={styles.resumeTextColumn}>
                      <Text style={styles.resumeDetailText}>Dikerjakan</Text>
                      <Text style={styles.serviceText}>{jobResume.tugas}</Text>
                    </View>
                    <View style={styles.resumeTextColumn}>
                      <Text style={styles.resumeDetailText}>Selesai</Text>
                      <Text style={styles.serviceText}>{jobResume.done}</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
              <View style={{ width: 10 }}></View>
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.sheetContainer}>
          <View style={styles.jobListContainer}>
            <View style={styles.headingTextContainer}>
              <Text style={styles.headerText}>Jadwal</Text>
              <TouchableOpacity
                style={styles.addJadwalButton}
                onPress={() => {
                  setVisible(true);
                }}>
                <Text style={styles.addButtonText}>Tambah Jadwal</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.calendarContainer}>
              <CalendarStrip
                ref={calendarStripRef}
                scrollable
                numDaysInWeek={6}
                style={styles.calendarStrip}
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{
                  type: 'border',
                  duration: 200,
                  borderHighlightColor: 'white',
                }}
                calendarHeaderStyle={styles.calendarHeaderStyle}
                calendarColor={theme.colors.primary}
                dayComponentHeight={100}
                dateNumberStyle={styles.dateNumberStyle}
                dateNameStyle={styles.dateNameStyle}
                highlightDateNumberStyle={styles.highlightDateNumberStyle}
                highlightDateNameStyle={styles.highlightDateNameStyle}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
                iconContainer={{ flex: 0.1 }}
                selectedDate={tanggal || new Date()}
                markedDates={markedDates}
                onDateSelected={(date) => {
                  setTanggal(date.format('YYYY-MM-DD'));
                  populateList(date.format('YYYY-MM-DD'));
                }}
                scrollToOnSetSelectedDate={false}
              />
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={appointmentList}
                fadingEdgeLength={30}
                keyExtractor={(item) => item.id.toString()}
                style={{ width: '100%' }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={
                  <View style={styles.emptyStateContainer}>
                    <Text style={styles.emptyStateTitle}>
                      Data tidak ditemukan
                    </Text>
                    <Text style={styles.emptyStateText}>
                      Anda tidak memiliki jadwal untuk tanggal ini
                    </Text>
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(tanggal)}
                  />
                }
                renderItem={({ item, index }) => (
                  <List.Item
                    key={'jadwal' + index}
                    title={[item.client_name || 'Klien tidak tersedia']}
                    description={
                      <>
                        <Text
                          key={'author' + index}
                          style={styles.descriptionListText}
                          numberOfLines={1}
                          ellipsizeMode="clip">
                          {'Oleh : ' + item.nama_pembuat + '\n'}
                        </Text>
                        {item.id_order === '0' ? (
                          <Text
                            key={'catatan' + index}
                            style={styles.descriptionListText}
                            numberOfLines={2}
                            ellipsizeMode="head">
                            {item.catatan}
                          </Text>
                        ) : (
                          [
                            item.request_plafond_awal !== '0' ? (
                              <Text
                                key={'plafond' + index}
                                style={styles.descriptionListText}
                                numberOfLines={2}
                                ellipsizeMode="head">
                                Plafond :{' '}
                                {numberWithCommas(item.request_plafond_awal)}
                              </Text>
                            ) : (
                              <Text
                                key={'catatan' + index}
                                style={styles.descriptionListText}
                                numberOfLines={2}
                                ellipsizeMode="head">
                                Catatan : {item.catatan}
                              </Text>
                            ),
                          ]
                        )}
                        {/* <Text
                          style={styles.descriptionListText}
                          numberOfLines={2}
                          ellipsizeMode="head">
                          {item.catatan}
                        </Text> */}
                      </>
                    }
                    right={() => (
                      <View style={styles.datetimeDescriptionContainer}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={[
                            styles.descriptionListText,
                            {
                              color: theme.colors.primary,
                              fontFamily: 'RedHatDisplay-Bold',
                            },
                          ]}>
                          {[item.nama_bank || 'Bank tidak tersedia']}
                        </Text>
                        <Text
                          style={[
                            styles.descriptionListText,
                            { fontFamily: 'Inter-Bold' },
                          ]}>
                          {moment(item.time).format('dddd kk:mm')}
                        </Text>
                      </View>
                    )}
                    style={styles.appointmentContainer}
                    descriptionNumberOfLines={3}
                    descriptionEllipsizeMode={'tail'}
                    titleStyle={
                      Platform.OS === 'ios'
                        ? [styles.titleListText, { fontWeight: 'bold' }]
                        : styles.titleListText
                    }
                    theme={{
                      colors: {
                        text: '#000000',
                      },
                    }}
                    onPress={() => {
                      setDetailVisible(true);
                      setDetailJadwal(item);
                    }}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
          style={styles.modalStyle}
          contentContainerStyle={styles.modalContentContainer}>
          <View style={styles.textContainerHeader}>
            <Text style={styles.headerText}>Buat Jadwal</Text>
          </View>
          <ScrollView style={[styles.formContainer, { maxHeight: '75%' }]}>
            <SwitchSelector
              initial={0}
              onPress={(value) => {
                setIsOrder(value);
                if (!value) {
                  setOrderId(null);
                }
              }}
              textColor={theme.colors.secondary}
              selectedColor="white"
              buttonColor={theme.colors.secondary}
              borderColor={theme.colors.secondary}
              hasPadding
              options={[
                { label: 'Berdasarkan Order', value: true },
                { label: 'Diluar Order', value: false },
              ]}
            />
            {isOrder ? (
              <>
                <View style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Nama Order</Text>
                </View>
                <TextInput
                  label="Pilih Order"
                  mode="outlined"
                  style={styles.inputTextContainer}
                  value={order.order_name || ''}
                  ref={orderInput}
                  onFocus={() => {
                    onSearchList(null, 'order', null, 'Order');
                  }}
                  theme={{
                    colors: {
                      text: '#000000',
                      placeholder: theme.colors.placeholder,
                      primary: theme.colors.secondary,
                      underlineColor: theme.colors.secondary,
                      background: '#F6F8FA',
                    },
                  }}
                />
                {order.request_service_name && (
                  <>
                    <View style={styles.textContainerHeader}>
                      <Text style={styles.sheetTitle}>Jenis Order</Text>
                    </View>
                    <Text style={styles.descriptionListText}>
                      {order.request_service_name}
                    </Text>
                  </>
                )}

                {order.request_service_id === '1' && (
                  <>
                    <View style={styles.textContainerHeader}>
                      <Text style={styles.sheetTitle}>Jenis Kredit</Text>
                    </View>
                    <Text style={styles.descriptionListText}>
                      {order.nama_kredit}
                    </Text>
                    {order.request_plafond_awal &&
                      order.request_plafond_awal !== '0' && (
                        <>
                          <View style={styles.textContainerHeader}>
                            <Text style={styles.sheetTitle}>Plafond</Text>
                          </View>
                          <Text style={styles.descriptionListText}>
                            {numberWithCommas(order.request_plafond_awal)}
                          </Text>
                        </>
                      )}
                    {order.request_plafond_akhir &&
                      (order.request_service_id === '2' ||
                        order.request_service_id === '3') &&
                      order.request_plafond_akhir !== '0' && (
                        <>
                          <View style={styles.textContainerHeader}>
                            <Text style={styles.sheetTitle}>Plafond Akhir</Text>
                          </View>
                          <Text style={styles.descriptionListText}>
                            {numberWithCommas(order.request_plafond_akhir)}
                          </Text>
                        </>
                      )}
                  </>
                )}
              </>
            ) : null}
            <View style={styles.textContainerHeader}>
              <Text style={styles.sheetTitle}>Nama Klien</Text>
            </View>
            <TextInput
              label="Masukkan nama klien"
              mode="outlined"
              style={styles.inputTextContainer}
              value={klien}
              onChangeText={(text) => setKlien(text)}
              autoCapitalize="words"
              theme={{
                colors: {
                  text: '#000000',
                  placeholder: theme.colors.placeholder,
                  primary: theme.colors.secondary,
                  underlineColor: theme.colors.secondary,
                  background: '#F6F8FA',
                },
              }}
            />
            <View style={styles.textContainerHeader}>
              <Text style={styles.sheetTitle}>Nama Bank</Text>
            </View>
            <TextInput
              label="Masukkan nama bank (opsional)"
              mode="outlined"
              style={styles.inputTextContainer}
              value={bank.bank_name || ''}
              ref={bankInput}
              onFocus={() => {
                onSearchList(null, 'appointment_bank', null, 'Bank');
              }}
              theme={{
                colors: {
                  text: '#000000',
                  placeholder: theme.colors.placeholder,
                  primary: theme.colors.secondary,
                  underlineColor: theme.colors.secondary,
                  background: '#F6F8FA',
                },
              }}
            />
            <View style={styles.textContainerHeader}>
              <Text style={styles.sheetTitle}>Catatan (Opsional)</Text>
            </View>
            <TextInput
              label="Masukkan catatan (opsional)"
              mode="outlined"
              style={styles.inputTextContainerMultiline}
              value={catatan}
              onChangeText={(text) => setCatatan(text)}
              autoCapitalize="sentences"
              multiline={true}
              numberOfLines={2}
              theme={{
                colors: {
                  text: '#000000',
                  placeholder: theme.colors.placeholder,
                  primary: theme.colors.secondary,
                  underlineColor: theme.colors.secondary,
                  background: '#F6F8FA',
                },
              }}
            />
            <View style={styles.textContainerHeader}>
              <Text style={styles.sheetTitle}>Waktu</Text>
            </View>
            <TimePicker
              zeroPadding={true}
              selectedHours={jam.hour}
              selectedMinutes={jam.minute}
              onChange={(time) => {
                const hours =
                  time.hours.toString().length < 2
                    ? '0' + time.hours
                    : time.hours;
                const minutes =
                  time.minutes.toString().length < 2
                    ? '0' + time.minutes
                    : time.minutes;
                setJam({
                  hour: hours,
                  minute: minutes,
                });
              }}
            />
          </ScrollView>
          <View style={styles.submitButtonContainer}>
            <Button
              mode="contained"
              labelStyle={
                Platform.OS === 'ios'
                  ? [styles.buttonSubmitLabel, { fontWeight: 'bold' }]
                  : styles.buttonSubmitLabel
              }
              style={styles.buttonSubmit}
              theme={{
                colors: {
                  placeholder: theme.colors.placeholder,
                  primary: theme.colors.secondary,
                  underlineColor: theme.colors.secondary,
                  background: '#F6F8FA',
                },
              }}
              onPress={onSubmit}>
              {loader ? 'Mengirimkan..' : 'Submit'}
            </Button>
          </View>
        </Modal>
        <Modal
          visible={detailVisible}
          onDismiss={() => {
            setDetailVisible(false);
          }}
          contentContainerStyle={styles.modalContentContainer}>
          {detailJadwal && (
            <>
              <View style={styles.textContainerHeader}>
                <Text style={styles.headerText}>Detail Jadwal</Text>
              </View>

              <ScrollView style={[styles.formContainer, { maxHeight: '75%' }]}>
                <Divider />
                <View style={styles.textContainerHeader}>
                  <Text
                    style={[
                      styles.sheetTitle,
                      { color: theme.colors.secondary },
                    ]}>
                    {detailJadwal.id_order !== '0'
                      ? 'Berdasarkan Order'
                      : 'Diluar Order'}
                  </Text>
                </View>
                {detailJadwal.request_service_name && (
                  <>
                    <View style={styles.textContainerHeader}>
                      <Text style={styles.sheetTitle}>Nama Order</Text>
                    </View>
                    <Text style={styles.descriptionListText}>
                      {detailJadwal.request_name}
                    </Text>
                  </>
                )}
                {detailJadwal.request_service_name && (
                  <>
                    <View style={styles.textContainerHeader}>
                      <Text style={styles.sheetTitle}>Jenis Order</Text>
                    </View>
                    <Text style={styles.descriptionListText}>
                      {detailJadwal.request_service_name}
                    </Text>
                  </>
                )}

                {detailJadwal.request_service_id === '1' && (
                  <>
                    <View style={styles.textContainerHeader}>
                      <Text style={styles.sheetTitle}>Jenis Kredit</Text>
                    </View>
                    <Text style={styles.descriptionListText}>
                      {detailJadwal.nama_kredit}
                    </Text>
                    {detailJadwal.request_plafond_awal &&
                      detailJadwal.request_plafond_awal !== '0' && (
                        <>
                          <View style={styles.textContainerHeader}>
                            <Text style={styles.sheetTitle}>Plafond</Text>
                          </View>
                          <Text style={styles.descriptionListText}>
                            {'Rp. ' +
                              numberWithCommas(
                                detailJadwal.request_plafond_awal,
                              )}
                          </Text>
                        </>
                      )}
                    {detailJadwal.request_plafond_akhir &&
                      (detailJadwal.request_service_id === '2' ||
                        detailJadwal.request_service_id === '3') &&
                      detailJadwal.request_plafond_akhir !== '0' && (
                        <>
                          <View style={styles.textContainerHeader}>
                            <Text style={styles.sheetTitle}>Plafond Akhir</Text>
                          </View>
                          <Text style={styles.descriptionListText}>
                            {'Rp. ' +
                              numberWithCommas(
                                detailJadwal.request_plafond_akhir,
                              )}
                          </Text>
                        </>
                      )}
                  </>
                )}
                <View style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Nama Klien</Text>
                </View>
                <Text style={styles.descriptionListText}>
                  {detailJadwal.client_name}
                </Text>
                <View style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Nama Bank</Text>
                </View>
                <Text style={styles.descriptionListText}>
                  {detailJadwal.nama_bank}
                </Text>
                <View style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Catatan (Opsional)</Text>
                </View>
                <Text style={styles.descriptionListText}>
                  {detailJadwal.catatan}
                </Text>
                <View style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Waktu</Text>
                </View>
                <View style={styles.textRowContainer}>
                  <Text style={styles.descriptionListText}>
                    {moment(detailJadwal.time, 'YYYY-MM-DD kk:mm').format(
                      'dddd, DD MMMM YYYY',
                    )}
                  </Text>
                  <Text style={styles.hourText}>
                    {moment(detailJadwal.time).format('kk:mm')}
                  </Text>
                </View>
                <View style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Diposting</Text>
                </View>
                <View style={styles.textRowContainer}>
                  <Text style={[styles.descriptionListText, { fontSize: 11 }]}>
                    {detailJadwal.nama_pembuat}
                  </Text>
                  <View>
                    <Text
                      style={[styles.descriptionListText, { fontSize: 11 }]}>
                      {moment(
                        detailJadwal.created_at,
                        'YYYY-MM-DD kk:mm',
                      ).format('DD-MM-YYYY kk:mm')}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.submitButtonContainer}>
                <Button
                  mode="outlined"
                  labelStyle={
                    Platform.OS === 'ios'
                      ? [
                          styles.buttonSubmitLabel,
                          {
                            fontWeight: 'bold',
                            color: theme.colors.secondary,
                          },
                        ]
                      : [
                          styles.buttonSubmitLabel,
                          { color: theme.colors.secondary },
                        ]
                  }
                  style={styles.buttonSubmit}
                  onPress={() => {
                    onCancel(detailJadwal.id);
                  }}>
                  {loader ? 'Mengirimkan..' : 'Batalkan Jadwal'}
                </Button>
              </View>
            </>
          )}
        </Modal>
      </Portal>
    </Provider>
  );
};

export default Dashboard;
