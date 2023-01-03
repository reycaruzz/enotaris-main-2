import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Text,
  IconButton,
  Provider,
  Portal,
  Modal,
  TextInput,
  Divider,
  Button,
} from 'react-native-paper';
import { theme } from 'app/core/theme';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/store/actions/loginActions';
import NavigationService from 'app/navigation/NavigationService';
//redux
import * as mainActions from 'app/store/actions/mainActions';

import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
const Profile: React.FC = ({ route }) => {
  //route params
  const show_button = route !== undefined ? route.params.show_button : null;
  //dispatch
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  //navigation service
  const onBack = () => NavigationService.goBack();
  const onReport = () => NavigationService.navigate('Report');
  //fetch data
  const userData = useSelector((state) => state.loginReducer.userData);

  //state hooks
  const [loader, setLoader] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  //form Hooks
  const [runningText, setRunningText] = React.useState('');

  const onSubmit = () => {
    setLoader(true);
    const data = new FormData();
    data.append('id_user', userData.iduser);
    data.append('text', runningText);
    fetch(apiUrl.api + 'welcometext', {
      method: 'POST',
      body: data,
    })
      .then((response) => {
        setLoader(false);
        response
          .json()
          .then((dataRes) => {
            if (dataRes.success == true) {
              Alert.alert('Submit Success', 'Teks Dashboard berhasil diubah', [
                {
                  text: 'OK',
                  onPress: () => {
                    setRunningText('');

                    setModalVisible(false);
                    dispatch(mainActions.setRunningText(runningText));
                  },
                },
              ]);
            }
          })
          .catch((error) => {
            Alert.alert('Submit Failed', 'Ada masalah pada server');
            console.error(error);
          })
          .finally(() => {});
      })
      .catch((error) => console.error('network error', error));
  };

  const populateData = () => {
    fetch(apiUrl.api + 'getwelcometext')
      .then((response) => {
        // console.log(response.text());
        response
          .json()
          .then((data) => {
            setRunningText(data.data[0].content);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    populateData();
    return () => {
      setRunningText('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {show_button ? (
            <View style={styles.iconHeader}>
              <IconButton
                icon="arrow-left"
                size={30}
                color={theme.colors.primary}
                onPress={() => onBack()}
              />
            </View>
          ) : (
            <View style={{ width: 10 }} />
          )}
          <View style={styles.textContainerHeader}>
            <Text
              style={
                Platform.OS === 'ios'
                  ? [styles.headerText, { fontWeight: 'bold' }]
                  : styles.headerText
              }>
              PROFIL
            </Text>
          </View>
        </View>
        <ScrollView
          style={{
            width: '100%',
          }}
          fadingEdgeLength={30}>
          <View style={styles.profileInfoContainer}>
            <View style={styles.profileImage}>
              <Image
                source={{
                  uri: userData.pic,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.biodataContainer}>
              <View style={styles.biodataInfo}>
                <View style={styles.biodataKeyContainer}>
                  <Text style={styles.biodataKeyText}>Nama Lengkap </Text>
                  <Text style={styles.biodataKeyText}>: </Text>
                </View>
                <View style={styles.biodataValueContainer}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.biodataValueText, { fontWeight: 'bold' }]
                        : styles.biodataValueText
                    }>
                    {userData.nama}
                  </Text>
                </View>
              </View>
              <View style={styles.biodataInfo}>
                <View style={styles.biodataKeyContainer}>
                  <Text style={styles.biodataKeyText}>Divisi </Text>
                  <Text style={styles.biodataKeyText}>: </Text>
                </View>
                <View style={styles.biodataValueContainer}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.biodataValueText, { fontWeight: 'bold' }]
                        : styles.biodataValueText
                    }>
                    {userData.nama_divisi}
                  </Text>
                </View>
              </View>
              <View style={styles.biodataInfo}>
                <View style={styles.biodataKeyContainer}>
                  <Text style={styles.biodataKeyText}>Jabatan </Text>
                  <Text style={styles.biodataKeyText}>: </Text>
                </View>
                <View style={styles.biodataValueContainer}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.biodataValueText, { fontWeight: 'bold' }]
                        : styles.biodataValueText
                    }>
                    {userData.roleuser}
                  </Text>
                </View>
              </View>
              <View style={styles.biodataInfo}>
                <View style={styles.biodataKeyContainer}>
                  <Text style={styles.biodataKeyText}>
                    Tempat Tanggal Lahir{' '}
                  </Text>
                  <Text style={styles.biodataKeyText}>: </Text>
                </View>
                <View style={styles.biodataValueContainer}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.biodataValueText, { fontWeight: 'bold' }]
                        : styles.biodataValueText
                    }>
                    {userData.tempat_lahir + ' ' + userData.tanggal_lahir}
                  </Text>
                </View>
              </View>
              <View style={styles.biodataInfo}>
                <View style={styles.biodataKeyContainer}>
                  <Text style={styles.biodataKeyText}>Email </Text>
                  <Text style={styles.biodataKeyText}>: </Text>
                </View>
                <View style={styles.biodataValueContainer}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.biodataValueText, { fontWeight: 'bold' }]
                        : styles.biodataValueText
                    }>
                    {userData.email}
                  </Text>
                </View>
              </View>
              <View style={styles.biodataInfo}>
                <View style={styles.biodataKeyContainer}>
                  <Text style={styles.biodataKeyText}>No Telp </Text>
                  <Text style={styles.biodataKeyText}>: </Text>
                </View>
                <View style={styles.biodataValueContainer}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.biodataValueText, { fontWeight: 'bold' }]
                        : styles.biodataValueText
                    }>
                    {userData.hp}
                  </Text>
                </View>
              </View>
              <View style={styles.biodataInfo}>
                <View style={styles.biodataKeyContainer}>
                  <Text style={styles.biodataKeyText}>Alamat </Text>
                  <Text style={styles.biodataKeyText}>: </Text>
                </View>
                <View style={styles.biodataValueContainer}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.biodataValueText, { fontWeight: 'bold' }]
                        : styles.biodataValueText
                    }>
                    {userData.alamat}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.menuContainer}>
            {show_button ? (
              <TouchableOpacity
                style={styles.listMenuContainer}
                onPress={() => {
                  Linking.openURL(
                    'https://docs.google.com/document/d/1uX3fOC9lH3qvGxuxtzjr3dZPsj4MfvSa/edit?usp=sharing&ouid=114640215295586583286&rtpof=true&sd=true',
                  );
                }}>
                <View style={styles.iconMenu}>
                  <IconButton icon="alert-circle" size={20} color="#DADADA" />
                </View>
                <View style={styles.textContainerHeader}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.menuText, { fontWeight: 'bold' }]
                        : styles.menuText
                    }>
                    Petunjuk Penggunaan
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {userData.role === '1' && (
              <TouchableOpacity
                style={styles.listMenuContainer}
                onPress={() => setModalVisible(true)}>
                <View style={styles.iconMenu}>
                  <IconButton icon="format-size" size={20} color="#DADADA" />
                </View>
                <View style={styles.textContainerHeader}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.menuText, { fontWeight: 'bold' }]
                        : styles.menuText
                    }>
                    Pengaturan Teks Dashboard
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {(userData.role === '1' ||
              userData.role === '6' ||
              userData.role === '3' ||
              userData.role === '4') && (
              <TouchableOpacity
                style={styles.listMenuContainer}
                onPress={() => {
                  onReport();
                }}>
                <View style={styles.iconMenu}>
                  <IconButton
                    icon="account-multiple"
                    size={20}
                    color="#DADADA"
                  />
                </View>
                <View style={styles.textContainerHeader}>
                  <Text
                    style={
                      Platform.OS === 'ios'
                        ? [styles.menuText, { fontWeight: 'bold' }]
                        : styles.menuText
                    }>
                    Kinerja Pegawai
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.logoutButtonContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <Text
                style={
                  Platform.OS === 'ios'
                    ? [styles.buttonLogoutLabel, { fontWeight: 'bold' }]
                    : styles.buttonLogoutLabel
                }>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
          }}
          contentContainerStyle={styles.modalContentContainer}>
          <>
            <View style={styles.textContainerHeader}>
              <Text style={styles.headerText}>Teks Dashboard</Text>
            </View>
            <View style={styles.formContainer}>
              <Divider />
              <TextInput
                label="Masukan teks dashboard"
                mode="outlined"
                style={styles.inputTextContainer}
                defaultValue={runningText}
                onChangeText={(text) => setRunningText(text)}
                autoCapitalize="sentences"
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
                    onSubmit();
                  }}>
                  {loader ? 'Mengirimkan..' : 'Simpan Teks'}
                </Button>
              </View>
            </View>
          </>
        </Modal>
      </Portal>
    </Provider>
  );
};
export default Profile;
