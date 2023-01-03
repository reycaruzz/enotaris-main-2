import React, { useState } from 'react';
import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
import { View, Text, Image, RefreshControl, FlatList } from 'react-native';
import { IconButton, Searchbar, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import NavigationService from 'app/navigation/NavigationService';
import Spinner from 'react-native-loading-spinner-overlay';

const SearchList: FC = ({ route }) => {
  //param config
  const item = route !== undefined ? route.params.item : null;
  const list_type = route !== undefined ? route.params.list_type : null;
  const type_id = route !== undefined ? route.params.type_id : null;
  const id_kelengkapan =
    route !== undefined ? route.params.id_kelengkapan : null;
  const title = route !== undefined ? route.params.title : null;
  //user data
  const userData = useSelector((state) => state.loginReducer.userData);
  //navigation service
  const onBack = () => NavigationService.goBack();
  const onCreateRequest = (item_id, item_name) => {
    if (list_type === 'sub-service') {
      NavigationService.navigate('CreateRequest', {
        sub_service: {
          sub_service_id: item_id,
          sub_service_name: item_name,
        },
      });
    } else if (list_type === 'document') {
      NavigationService.navigate('CreateRequest', {
        item: item,
        id_kelengkapan: id_kelengkapan,
        id_document: item_id,
        document_data: {
          id: id_kelengkapan,
          id_user: userData.iduser,
          id_document: item_id,
          document_name: item_name,
          img64: null,
          latitude: null,
          longitude: null,
          timestamp: null,
          fileName: null,
          desc: null,
        },
      });
    } else if (list_type === 'bank') {
      NavigationService.navigate('CreateRequest', {
        bank: {
          bank_id: item_id,
          bank_name: item_name,
        },
      });
    } else if (list_type === 'jenis_perbankan') {
      NavigationService.navigate('CreateRequest', {
        jenis: {
          jenis_id: item_id,
          jenis_name: item_name,
        },
      });
    } else if (list_type === 'order') {
      route.params.item({ order_id: item_id, order_item: item_name });
      onBack();
    } else if (list_type === 'appointment_bank') {
      route.params.item({ bank_id: item_id, bank_name: item_name });
      onBack();
    }
  };

  //Hooks
  const [refreshing, setRefreshing] = useState(false);
  const [allList, setAllList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [loader, setLoader] = React.useState(false);

  // callbacks

  const populateData = () => {
    setLoader(true);
    setRefreshing(true);
    var url = '';
    var reqData = new FormData();
    var postObj = null;
    if (list_type === 'sub-service') {
      reqData.append('type', type_id);
      url = apiUrl.api + 'servicedetail';
      postObj = {
        method: 'POST',
        body: reqData,
      };
    } else if (list_type === 'document') {
      reqData.append('service_id', type_id);
      url = apiUrl.api + 'refdokumen';
      postObj = {
        method: 'POST',
        body: reqData,
      };
    } else if (list_type === 'jenis_perbankan') {
      url = apiUrl.api + 'refjenisperbankan';
    } else if (list_type === 'order') {
      reqData.append('user_id', userData.iduser);
      url = apiUrl.api + 'listrequest';
      postObj = {
        method: 'POST',
        body: reqData,
      };
    } else if (list_type === 'bank' || list_type === 'appointment_bank') {
      url = apiUrl.api + 'refbank';
    }
    fetch(url, postObj).then((response) => {
      // console.log(response.text());
      response
        .json()
        .then((data) => {
          setAllList(data.data);
          setSearchList(data.data);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoader(false);
          setRefreshing(false);
        });
    });
  };

  const onChangeSearch = (query) => {
    var filteredArrays = [];
    if (list_type === 'sub-service') {
      filteredArrays = allList.filter(({ detail_name }) => {
        return detail_name.toLowerCase().includes(query.toLowerCase());
      });
    } else if (list_type === 'document') {
      filteredArrays = allList.filter(({ nama_dokumen }) => {
        return nama_dokumen.toLowerCase().includes(query.toLowerCase());
      });
    } else if (list_type === 'jenis_perbankan') {
      filteredArrays = allList.filter(({ nama }) => {
        return nama.toLowerCase().includes(query.toLowerCase());
      });
    } else if (list_type === 'order') {
      filteredArrays = allList.filter(({ nama_bank, request_client }) => {
        return (
          nama_bank.toLowerCase().includes(query.toLowerCase()) ||
          request_client.toLowerCase().includes(query.toLowerCase())
        );
      });
    } else if (list_type === 'bank' || list_type === 'appointment_bank') {
      filteredArrays = allList.filter(({ nama_bank }) => {
        return nama_bank.toLowerCase().includes(query.toLowerCase());
      });
    }

    setSearchList(filteredArrays);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    populateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setRefreshing(true);
    populateData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
        <View style={styles.textContainerHeader}>
          <Text style={styles.headerText}>Pilih {title}</Text>
        </View>
      </View>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.sheetContainer}>
          <Spinner
            visible={loader}
            // textContent={'Memuat data...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.listContainer}>
              <Searchbar
                placeholder={'Cari ' + title}
                style={styles.searchbar}
                inputStyle={styles.searchbarInput}
                onChangeText={onChangeSearch}
                theme={{
                  colors: {
                    placeholder: '#A8ADAF',
                    primary: '#3E7BFA',
                    underlineColor: '#3E7BFA',
                    background: '#F6F8FA',
                  },
                }}
              />
              {searchList.length > 0 ? (
                <FlatList
                  fadingEdgeLength={30}
                  data={searchList}
                  keyExtractor={(item) => item.id.toString()}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  renderItem={({ item }) => {
                    if (list_type === 'sub-service') {
                      return (
                        <List.Item
                          title={item.detail_name}
                          key={item.id.toString()}
                          onPress={() => {
                            onCreateRequest(item.id, item.detail_name);
                          }}
                          titleStyle={styles.listText}
                        />
                      );
                    } else if (list_type === 'document') {
                      return (
                        <List.Item
                          title={item.nama_dokumen}
                          key={item.id.toString()}
                          onPress={() => {
                            onCreateRequest(item.id, item.nama_dokumen);
                          }}
                          titleStyle={styles.listText}
                        />
                      );
                    } else if (list_type === 'jenis_perbankan') {
                      return (
                        <List.Item
                          title={item.nama}
                          key={item.id.toString()}
                          onPress={() => {
                            onCreateRequest(item.id, item.nama);
                          }}
                          titleStyle={styles.listText}
                        />
                      );
                    } else if (list_type === 'order') {
                      return (
                        <List.Item
                          title={item.request_client}
                          description={item.nama_bank}
                          key={item.id.toString()}
                          onPress={() => {
                            onCreateRequest(item.id, item);
                          }}
                          titleStyle={styles.listText}
                        />
                      );
                    } else if (
                      list_type === 'bank' ||
                      list_type === 'appointment_bank'
                    ) {
                      return (
                        <List.Item
                          title={item.nama_bank}
                          key={item.id.toString()}
                          onPress={() => {
                            onCreateRequest(item.id, item.nama_bank);
                          }}
                          titleStyle={styles.listText}
                        />
                      );
                    }
                  }}
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
                    List data belum tersedia
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchList;
