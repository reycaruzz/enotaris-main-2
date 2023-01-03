import React, {useRef, useState } from 'react';

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
  Platform,
} from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { theme } from 'app/core/theme';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import NavigationService from 'app/navigation/NavigationService';
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

function truncate(str, no_words) {
  return str.split(' ').splice(0, no_words).join(' ');
}

const Report: React.FC = ({}) => {
  //navigation service
  const onBack = () => NavigationService.goBack();
  const onDetail = (item) => {
    NavigationService.navigate('DetailPegawai', { item: item });
  };

  //fetch data
  const userData = useSelector((state) => state.loginReducer.userData);

  const populateData = () => {
    setLoader(true);
    const data = new FormData();
    data.append('id_user', userData.iduser);
    if (userData.role === '3' || userData.role === '4') {
      data.append('role', userData.role);
    }
    fetch(apiUrl.api + 'listrequestresume', {
      method: 'POST',
      body: data,
    })
      .then((response) => {
        // console.log(response.text());
        response
          .json()
          .then((data) => {
            // console.log(data.data);
            setAllUser(data.data);
            setUserList(data.data);
          })
          .catch((error) => console.error(error))
          .finally(() => {
            setLoader(false);
            setRefreshing(false);
          });
      })
      .catch((error) => console.error(error));
  };

  // ref
  const scrollCategoryRef = useRef();

  //Hooks

  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);

  const [serviceTypeList, setServiceTypeList] = useState(categoryService);

  const [categoryId, setCategoryId] = useState(0);

  const [allUser, setAllUser] = useState({});

  const [userList, setUserList] = useState([]);

  //callbacks

  const setServiceTypeActive = (categoryIndex) => {
    const category = [...serviceTypeList];
    category.map((category, index) => {
      if (index === categoryIndex) {
        // populateData(true, category.id);
        category.is_active = true;
        if (category.id === 0) {
          setUserList(allUser);
          setCategoryId(0);
        } else if (category.id === 1) {
          setUserList(_.filter(allUser, ['service_id', '1']));
          setCategoryId(1);
        } else if (category.id === 2) {
          setUserList(_.filter(allUser, ['service_id', '2']));
          setCategoryId(2);
        } else if (category.id === 3) {
          setUserList(_.filter(allUser, ['service_id', '3']));
          setCategoryId(3);
        }
      } else {
        category.is_active = false;
      }
    });

    setServiceTypeList(category);
  };

  const onChangeSearch = (query) => {
    setServiceTypeActive(0);
    const filteredArrays = allUser.filter(({ roleuser, nama }) => {
      return (
        nama.toLowerCase().includes(query.toLowerCase()) ||
        roleuser.toLowerCase().includes(query.toLowerCase())
      );
    });
    setUserList(filteredArrays);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    populateData(false, categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  React.useEffect(() => {
    setRefreshing(true);
    populateData();
    return () => {
      setAllUser({});
      setUserList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.background}>
        <View style={styles.headerContainer}>
          <View style={styles.iconHeader}>
            <IconButton
              icon="arrow-left"
              size={30}
              color={'#FFFFFF'}
              onPress={() => onBack()}
            />
          </View>
          <View
            style={[
              styles.textContainerHeader,
              { marginTop: 12, marginLeft: 8 },
            ]}>
            <Text
              style={
                Platform.OS === 'ios'
                  ? [styles.headerMenuText, { fontWeight: 'bold' }]
                  : styles.headerMenuText
              }>
              REPORT
            </Text>
          </View>
        </View>
        <View style={styles.searchbarContainer}>
          <Searchbar
            placeholder="Cari Pegawai"
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
              <Text style={styles.headerText}>Pegawai</Text>
            </View>
            {userList.length > 0 ? (
              <FlatList
                fadingEdgeLength={30}
                data={userList}
                keyExtractor={(item, index) => index.toString()}
                style={{ width: '100%', marginTop: 10 }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                renderItem={({ item, index }) => {
                  const service = categoryService[item.service_id];
                  return (
                    <TouchableOpacity
                      key={'pengumuman' + index}
                      style={styles.pengumumanContainer}
                      onPress={() => {
                        onDetail(item);
                      }}>
                      <View style={styles.imageRowContainer}>
                        <View style={styles.profileImageContainer}>
                          <Image
                            source={{
                              uri: item.pic ? item.pic : null,
                            }}
                            style={styles.profilImage}
                            resizeMode="cover"
                          />
                        </View>
                        <View style={styles.profileImageStatus}>
                          <Image
                            source={{ uri: service.img_url }}
                            style={styles.serviceIcon}
                          />
                        </View>
                      </View>

                      <View style={styles.pengumumanContentContainer}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={styles.titleHeaderText}>
                          {truncate(item.nama, 2)}
                        </Text>
                        <Text style={styles.descriptionListText}>
                          {item.roleuser}
                        </Text>
                      </View>
                      <View style={styles.requestCountContainer}>
                        <Text
                          style={[
                            styles.headerText,
                            { color: theme.colors.primary },
                          ]}>
                          {item.task_detail[0].task_done}
                        </Text>
                        <Text style={[styles.headerText, { fontSize: 9 }]}>
                          Task
                        </Text>
                      </View>
                      <View style={styles.requestCountContainer}>
                        <Text
                          style={[
                            styles.headerText,
                            { color: theme.colors.primary },
                          ]}>
                          {item.resume_detail[0].done}
                        </Text>
                        <Text style={[styles.headerText, { fontSize: 9 }]}>
                          Request
                        </Text>
                      </View>
                      {item.task_detail[0].task_done_today &&
                        item.task_detail[0].task_done_today !== '0' && (
                          <View style={styles.taskTodayStatusContainer}>
                            <Text style={styles.taskTodayStatus}>
                              {item.task_detail[0].task_done_today}
                            </Text>
                          </View>
                        )}
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateTitle}>Data tidak ditemukan</Text>
                <Text style={styles.emptyStateText}>
                  Anda tidak memiliki akses
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default Report;
