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
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { Searchbar, Divider, Button, TextInput } from 'react-native-paper';
import { ScrollView as ModalScrollView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { theme } from 'app/core/theme';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDown from 'react-native-paper-dropdown';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');
var _ = require('lodash');

interface IState {
  loginReducer: ILoginState;
}

const categoryService = [
  {
    id: 0,
    name: 'SEMUA',
    is_active: true,
    label: 'Semua',
    value: 0,
  },
  {
    id: 1,
    name: 'PERBANKAN',
    is_active: false,
    img_url: apiUrl.assets + 'img/bank.png',
    label: 'Perbankan',
    value: 1,
  },
  {
    id: 2,
    name: 'NOTARIS',
    is_active: false,
    img_url: apiUrl.assets + 'img/kumham.png',
    label: 'Notaris',
    value: 2,
  },
  {
    id: 3,
    name: 'PPAT',
    is_active: false,
    img_url: apiUrl.assets + 'img/name.png',
    label: 'PPAT',
    value: 3,
  },
];

const categorySelect = [
  {
    label: 'Semua',
    value: 0,
  },
  {
    label: 'Perbankan',
    value: 1,
  },
  {
    label: 'Notaris',
    value: 2,
  },
  {
    label: 'PPAT',
    value: 3,
  },
];

const Announcement: React.FC = ({}) => {
  //fetch user data
  const userData = useSelector((state) => state.loginReducer.userData);
  //navigation service

  const populateData = () => {
    var postData = new FormData();
    postData.append('id_user', userData.iduser);
    if (userData.role === '2' || userData.role === '5') {
      postData.append('service_id', userData.service_id);
    }
    fetch(apiUrl.api + 'listannouncement', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        // console.log(response.text());
        response
          .json()
          .then((data) => {
            setAllPengumuman(data.data);
            setPengumumanList(data.data);
          })
          .catch((error) => console.error(error))
          .finally(() => setRefreshing(false));
      })
      .catch((error) => console.error(error));
  };

  //bottom sheet logic
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scrollCategoryRef = useRef();

  // variables
  const modalSnapPoints = useMemo(() => ['80%', '80%'], []);

  //Hooks
  const [visible, setVisible] = React.useState(true);
  const [showDropDown, setShowDropDown] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);

  const [serviceTypeList, setServiceTypeList] = useState(categoryService);

  const [categoryId, setCategoryId] = useState(0);

  const [allPengumuman, setAllPengumuman] = useState({});

  const [pengumumanList, setPengumumanList] = useState([]);
  const [pengumumanModal, setPengumumanModal] = useState(null);

  //formHooks
  const [judul, setJudul] = useState('');
  const [konten, setKonten] = useState('');
  const [service, setService] = useState();

  //callbacks

  const setServiceTypeActive = (categoryIndex) => {
    const category = [...serviceTypeList];
    category.map((category, index) => {
      if (index === categoryIndex) {
        // populateData(true, category.id);
        category.is_active = true;
        if (category.id === 0) {
          setPengumumanList(allPengumuman);
          setCategoryId(0);
        } else if (category.id === 1) {
          setPengumumanList(_.filter(allPengumuman, ['service_id', '1']));
          setCategoryId(1);
        } else if (category.id === 2) {
          setPengumumanList(_.filter(allPengumuman, ['service_id', '2']));
          setCategoryId(2);
        } else if (category.id === 3) {
          setPengumumanList(_.filter(allPengumuman, ['service_id', '3']));
          setCategoryId(3);
        }
      } else {
        category.is_active = false;
      }
    });

    setServiceTypeList(category);
  };

  const onSubmit = () => {
    setLoader(true);
    const data = new FormData();
    data.append('id_user', userData.iduser);
    data.append('title', judul);
    data.append('content', konten);
    data.append('service_id', service);
    if (judul !== '' || konten !== '' || service) {
      fetch(apiUrl.api + 'announcement', {
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
                Alert.alert('Submit Success', 'Notice berhasil ditambahkan', [
                  {
                    text: 'OK',
                    onPress: () => {
                      setJudul('');
                      setKonten('');
                      setService();
                      setVisible(false);
                      bottomSheetModalRef.current.close();
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
      Alert.alert(
        'Submit Failed',
        'Anda belum mencantumkan data dengan lengkap',
      );
    }
  };

  const onCancel = (id) => {
    const data = new FormData();
    data.append('id', id);
    data.append('id_user', userData.iduser);
    Alert.alert(
      'Konfirmasi',
      'Hapus notice?',
      [
        {
          text: 'Ok',
          onPress: () => {
            setLoader(true);
            fetch(apiUrl.api + 'cancelannouncement', {
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
                        'Notice berhasil dibatalkan',
                        [
                          {
                            text: 'OK',
                            onPress: () => {
                              setJudul('');
                              setKonten('');
                              setService();
                              setVisible(false);
                              bottomSheetModalRef.current.close();
                              populateData();
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
        {
          text: 'Kembali',
          onPress: () => {
            setLoader(false);
            bottomSheetModalRef.current.close();
            populateData();
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          setLoader(false);
          bottomSheetModalRef.current.close();
          populateData();
        },
      },
    );
  };

  const onChangeSearch = (query) => {
    setServiceTypeActive(0);
    const filteredArrays = allPengumuman.filter(({ title, nama_pembuat }) => {
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        nama_pembuat.toLowerCase().includes(query.toLowerCase())
      );
    });
    setPengumumanList(filteredArrays);
  };

  const handleModalSheetChanges = useCallback((index: number) => {}, []);

  const handlePresentModalPress = useCallback((item) => {
    setLoader(true);
    bottomSheetModalRef.current.present();

    setPengumumanModal(item);
    setTimeout(function () {
      setLoader(false);
    }, 500);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    populateData(false, categoryId);
    setServiceTypeActive(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  React.useEffect(() => {
    setRefreshing(true);
    populateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //after capture logic
  React.useEffect(() => {}, [pengumumanModal]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.background}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainerHeader}>
            <Text style={styles.headerMenuText}>NOTICE</Text>
          </View>
        </View>
        <View style={styles.searchbarContainer}>
          <Searchbar
            placeholder="Cari Notice"
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
                        {
                          borderWidth: 3,
                          borderColor: theme.colors.secondary,
                        },
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
            <View style={styles.headingTextContainer}>
              <Text style={styles.headerText}>Daftar Notice</Text>
              {userData.role === '1' ||
              userData.role === '3' ||
              userData.role === '4' ||
              userData.role === '6' ? (
                <TouchableOpacity
                  style={styles.addJadwalButton}
                  onPress={() => {
                    handlePresentModalPress();
                  }}>
                  <Text style={styles.addButtonText}>Buat Notice</Text>
                </TouchableOpacity>
              ) : null}
            </View>

            <FlatList
              data={pengumumanList}
              fadingEdgeLength={30}
              keyExtractor={(item, index) => index.toString()}
              style={{ width: '100%', marginTop: 10 }}
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
                    Anda tidak memiliki notice
                  </Text>
                </View>
              }
              renderItem={({ item, index }) => {
                const service = categoryService[item.service_id];
                return (
                  <TouchableOpacity
                    key={'pengumuman' + index}
                    style={styles.pengumumanContainer}
                    onPress={() => {
                      handlePresentModalPress(item);
                    }}>
                    <View>
                      <Text style={styles.headerText}>
                        {service.id !== 0 ? (
                          <>
                            <Image
                              source={{ uri: service.img_url }}
                              style={styles.serviceIcon}
                            />
                            {'  '}
                          </>
                        ) : null}
                        {item.title}
                      </Text>
                    </View>
                    <View style={styles.pengumumanContentContainer}>
                      <Text
                        numberOfLines={6}
                        ellipsizeMode="tail"
                        style={styles.descriptionListText}>
                        {item.content}
                      </Text>
                    </View>

                    <Divider />
                    <View style={styles.pengumumanFooterContainer}>
                      <Text style={styles.pengumumanFooterText}>
                        {item.nama_pembuat}
                      </Text>
                      <Text style={styles.pengumumanFooterText}>
                        {moment(item.created_at).format(
                          'dddd DD-MM-YYYY kk:mm',
                        )}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={modalSnapPoints}
          backdropComponent={BottomSheetBackdrop}
          onChange={handleModalSheetChanges}>
          <KeyboardAvoidingView
            key={'bsviewcontainer'}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={40}
            style={styles.modalContentContainer}>
            <ModalScrollView style={{ width: '100%' }}>
              <View style={styles.textContainerHeader}>
                {pengumumanModal ? (
                  <Text style={styles.modalTitle}>Detail</Text>
                ) : (
                  <Text style={styles.modalTitle}>Buat Notice</Text>
                )}
              </View>
              <SafeAreaView style={styles.formContainer}>
                <Divider />
                {pengumumanModal ? (
                  <View style={styles.pengumumanContentContainer}>
                    <View style={styles.textContainerHeader}>
                      <Text style={styles.sheetTitle}>Divisi</Text>
                    </View>
                    <Text style={styles.descriptionListText}>
                      {pengumumanModal.divisi
                        ? pengumumanModal.divisi
                        : 'Semua'}
                    </Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.textContainerHeader}>
                      <Text style={styles.sheetTitle}>Divisi</Text>
                    </View>
                    <DropDown
                      label={'Tentukan divisi'}
                      mode={'outlined'}
                      visible={showDropDown}
                      showDropDown={() => setShowDropDown(true)}
                      onDismiss={() => setShowDropDown(false)}
                      value={service}
                      setValue={setService}
                      list={categorySelect}
                    />
                  </>
                )}

                <View style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Judul</Text>
                </View>
                {pengumumanModal ? (
                  <Text style={styles.descriptionListText}>
                    {pengumumanModal.title}
                  </Text>
                ) : (
                  <TextInput
                    label="Masukkan judul notice"
                    mode="outlined"
                    style={styles.inputTextContainer}
                    defaultValue={judul}
                    onChangeText={(text) => setJudul(text)}
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
                )}

                <View style={styles.textContainerHeader}>
                  <Text style={styles.sheetTitle}>Konten</Text>
                </View>
                {pengumumanModal ? (
                  <Text style={styles.descriptionListText}>
                    {pengumumanModal.content}
                  </Text>
                ) : (
                  <TextInput
                    label="Masukkan konten pengumuman"
                    mode="outlined"
                    style={styles.inputTextContainer}
                    defaultValue={konten}
                    onChangeText={(text) => setKonten(text)}
                    multiline={true}
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
                )}
                {pengumumanModal ? (
                  <View style={styles.pengumumanContentContainer}>
                    <View style={styles.textContainerHeader}>
                      <Text style={styles.sheetTitle}>Pembuat</Text>
                    </View>
                    <Text style={styles.descriptionListText}>
                      {pengumumanModal.nama_pembuat}
                    </Text>
                    <View style={styles.textContainerHeader}>
                      <Text style={styles.sheetTitle}>Tanggal Buat</Text>
                    </View>
                    <Text style={styles.descriptionListText}>
                      {moment(pengumumanModal.created_at).format(
                        'dddd DD-MM-YYYY kk:mm',
                      )}
                    </Text>
                  </View>
                ) : null}
              </SafeAreaView>
            </ModalScrollView>
            {pengumumanModal ? (
              <View style={styles.submitButtonContainer}>
                {userData.role === '1' ||
                userData.role === '3' ||
                userData.role === '4' ||
                userData.role === '6' ? (
                  <Button
                    mode="outlined"
                    onPress={() => {
                      onCancel(pengumumanModal.id);
                    }}
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
                    style={styles.buttonSubmit}>
                    {loader ? 'Memproses..' : 'Hapus Notice'}
                  </Button>
                ) : null}
              </View>
            ) : (
              <View style={styles.submitButtonContainer}>
                <Button
                  mode="contained"
                  onPress={onSubmit}
                  labelStyle={
                    Platform.OS === 'ios'
                      ? [styles.buttonSubmitLabel, { fontWeight: 'bold' }]
                      : [styles.buttonSubmitLabel]
                  }
                  style={styles.buttonSubmit}>
                  {loader ? 'Memproses..' : 'Submit Entri'}
                </Button>
              </View>
            )}
          </KeyboardAvoidingView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Announcement;
