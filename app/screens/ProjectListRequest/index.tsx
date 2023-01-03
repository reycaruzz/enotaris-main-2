import React, { useCallback, useMemo, useRef, useState } from 'react';

import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
import {
  View,
  Image,
  Text,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { List, Badge } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import NavigationService from 'app/navigation/NavigationService';
import { useSelector } from 'react-redux';
import { categoryService } from 'app/utils/constants';
import { ILoginState } from 'app/models/reducers/login';
import moment from 'moment';
import 'moment/locale/id';
import { IMainState } from 'app/models/reducers/main';
moment.locale('id');

var _ = require('lodash');

interface IState {
  loginReducer: ILoginState;
  mainReducer: IMainState;
}

const ProjectListRequest: React.FC = () => {
  //fetch user data
  const userData = useSelector((state: IState) => state.loginReducer.userData);
  //navigation service
  const onCreateRequest = (item) =>
    NavigationService.navigate('CreateRequest', { item: item });
  const onRequestList = (project_id, project_name, project_desc) =>
    NavigationService.navigate('RequestList', {
      project_id: project_id,
      project_name: project_name,
      project_desc: project_desc,
    });

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
  //bottom sheet logic
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [150, '100%'], []);

  //Hooks
  const [listVisible, setListVisible] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === 1) {
      setListVisible(true);
    } else {
      setListVisible(false);
    }
    // onRefresh();
  }, []);

  const populateData = () => {
    var postData = new FormData();
    postData.append('user_id', userData.iduser);
    postData.append('type', 'job');
    fetch(apiUrl.api + 'refservicetypecount', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            setServiceTypeList(data.data);
          })
          .catch((error) => console.error(error))
          .finally(() => setRefreshing(false));
      })
      .catch((error) => console.error(error));

    fetch(apiUrl.api + 'listrequestconfirm', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.data.length > 0) {
              bottomSheetRef.current.collapse();
            } else {
              bottomSheetRef.current.close();
            }
            setProjectList(data.data);
          })
          .catch((error) => console.error(error))
          .finally(() => setRefreshing(false));
      })
      .catch((error) => console.error(error));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    populateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setBadge = (id: string) => {
    switch (id) {
      case '1':
        if (requestPerbankanCount > 0) {
          return (
            <Badge style={styles.badgeNotification}>
              {requestPerbankanCount}
            </Badge>
          );
        }
        break;
      case '2':
        if (requestNotarisCount > 0) {
          return (
            <Badge style={styles.badgeNotification}>
              {requestNotarisCount}
            </Badge>
          );
        }
        break;
      case '3':
        if (requestPPATCount > 0) {
          return (
            <Badge style={styles.badgeNotification}>{requestPPATCount}</Badge>
          );
        }
    }
  };

  React.useEffect(() => {
    setRefreshing(true);
    populateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestCount]);

  const serviceResume = (services) => {
    return (
      <View style={styles.serviceMenuContainer}>
        {services.map((project, index) => (
          <TouchableOpacity
            key={project.id}
            style={styles.serviceMenu}
            onPress={() =>
              onRequestList(project.id, project.type_name, project.type_url)
            }>
            <View style={styles.serviceImageContainer}>
              {setBadge(project.id)}
              <Image
                source={{ uri: project.type_image }}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceText}>{project.type_name}</Text>
            </View>
            <View style={styles.serviceTextContainer}>
              <View style={styles.serviceResumeContainer}>
                <View style={styles.requestCountContainer}>
                  <Text style={styles.requestCount}>{project.jml_request}</Text>
                  <Text style={styles.titleServiceText}>Request</Text>
                </View>
                <View style={styles.detailServiceResumeContainer}>
                  <View
                    style={{
                      flex: 1,
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <View style={styles.statsServiceResumeContainer}>
                      <Text style={styles.subServiceTextBold}>
                        {project.resume_detail[0].requested}
                      </Text>
                      <Text style={styles.subServiceText}>Diajukan</Text>
                    </View>
                    <View style={styles.statsServiceResumeContainer}>
                      <Text style={styles.subServiceTextBold}>
                        {project.resume_detail[0].processed}
                      </Text>
                      <Text style={styles.subServiceText}>Diproses</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <View style={styles.statsServiceResumeContainer}>
                      <Text style={styles.subServiceTextBold}>
                        {project.resume_detail[0].done}
                      </Text>
                      <Text style={styles.subServiceText}>Selesai</Text>
                    </View>
                    <View style={styles.statsServiceResumeContainer}>
                      <Text style={styles.subServiceTextBold}>
                        {project.resume_detail[0].reject}
                      </Text>
                      <Text style={styles.subServiceText}>Ditolak</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <>
      <View style={styles.background}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainerHeader}>
            <Text style={styles.headerMenuText}>MENU REQUEST</Text>
          </View>
        </View>
      </View>
      <View style={styles.rowServiceMenuContainer}>
        <View style={styles.listContainer}>
          {serviceTypeList.length > 0
            ? serviceResume(serviceTypeList)
            : serviceResume(categoryService)}
        </View>
      </View>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.sheetContainer}>
          <Image
            source={require('../../assets/illustrasi-request-2.png')}
            style={styles.imageBackground}
          />
          <BottomSheet
            ref={bottomSheetRef}
            index={projectList.length > 0 ? 0 : -1}
            snapPoints={snapPoints}
            backdropComponent={(backdropProps) => (
              <BottomSheetBackdrop
                {...backdropProps}
                disappearsOnIndex={projectList.length > 0 ? -1 : 0}
                closeOnPress={false}
              />
            )}
            onChange={handleSheetChanges}>
            <View style={styles.jobListContainer}>
              <View style={styles.headingTextContainer}>
                <Text style={styles.titleHeaderText}>
                  {projectList.length > 0
                    ? 'Anda memiliki ' +
                      projectList.length +
                      ' request terproses'
                    : 'Anda belum memiliki request terproses'}
                </Text>
              </View>
              {listVisible ? (
                <>
                  <FlatList
                    fadingEdgeLength={30}
                    data={projectList}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ width: '100%' }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    ListEmptyComponent={
                      <View style={styles.emptyStateContainer}>
                        <Text style={styles.emptyStateTitle}>
                          Data tidak ditemukan
                        </Text>
                        <Text style={styles.emptyStateText}>
                          Anda tidak memiliki request terproses admin
                        </Text>
                      </View>
                    }
                    contentContainerStyle={{ paddingBottom: 100 }}
                    renderItem={({ item }) => (
                      <List.Item
                        titleStyle={
                          Platform.OS === 'ios'
                            ? [styles.titleListText, { fontWeight: 'bold' }]
                            : styles.titleListText
                        }
                        title={[item.request_client || 'Klien tidak tersedia']}
                        description={
                          <Text style={styles.descriptionListText}>
                            {'Request : ' +
                              [item.request_name || 'Request tidak tersedia'] +
                              '\nDiposting ' +
                              moment(item.created_at).format(
                                'DD-MM-YYYY kk:mm:ss',
                              ) +
                              '\n'}
                          </Text>
                        }
                        descriptionNumberOfLines={2}
                        key={item.id.toString()}
                        left={() => {
                          const service = _.find(serviceTypeList, [
                            'id',
                            item.request_service_id,
                          ]);
                          if (service !== undefined) {
                            return (
                              <View style={styles.serviceImageIconList}>
                                <Image
                                  source={{
                                    uri: service.type_image,
                                  }}
                                  style={styles.serviceImage}
                                />
                              </View>
                            );
                          }
                        }}
                        right={(props) => (
                          <List.Icon
                            {...props}
                            icon="chevron-right"
                            color="#D3DCE6"
                          />
                        )}
                        onPress={() => onCreateRequest(item)}
                      />
                    )}
                  />
                </>
              ) : (
                <Text style={styles.pullUpText}>
                  Tarik ke atas untuk melihat
                </Text>
              )}
            </View>
          </BottomSheet>
        </View>
      </View>
    </>
  );
};

export default ProjectListRequest;
