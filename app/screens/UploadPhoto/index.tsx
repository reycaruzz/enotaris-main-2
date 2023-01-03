import React from 'react';

import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
import { theme } from 'app/core/theme';
import {
  View,
  Image,
  Text,
  Platform,
  PermissionsAndroid,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { IconButton, Button, ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import NavigationService from 'app/navigation/NavigationService';
import { ILoginState } from 'app/models/reducers/login';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SheetManager } from 'react-native-actions-sheet';

// Import Image Picker
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import moment
import { SafeAreaView } from 'react-native-safe-area-context';

var _ = require('lodash');

interface IState {
  loginReducer: ILoginState;
}

const UploadPhoto: React.FC = ({ route }) => {
  //route params
  const item = route !== undefined ? route.params.item : null;
  const id_kelengkapan =
    route !== undefined ? route.params.id_kelengkapan : null;
  const id_document = route !== undefined ? route.params.id_document : null;
  const desc = route !== undefined ? route.params.desc : null;
  const tempUri = route !== undefined ? route.params.uri : null;
  const referrer = route !== undefined ? route.params.referrer : null;
  const isButton = route !== undefined ? route.params.isButton : null;
  //route for serah terima layanan
  const id_layanan = route !== undefined ? route.params.id_layanan : null;
  const nama_layanan = route !== undefined ? route.params.nama_layanan : null;
  //user data
  const userData = useSelector((state: IState) => state.loginReducer.userData);
  //navigation service
  const onBack = () => NavigationService.goBack();
  const onList = (item, id_document, filePath) => {
    if (referrer === 'CreateRequest') {
      if (id_kelengkapan === 'bukti_pembayaran') {
        NavigationService.navigate('CreateRequest', {
          item: item,
          bukti_pembayaran: image,
          bukti_pembayaran_filename: filePath.fileName,
          bukti_pembayaran_uri: filePath.uri,
        });
      } else if (id_kelengkapan === 'ttd_pihak') {
        NavigationService.navigate('CreateRequest', {
          item: item,
          id_ttd: id_document,
          ttd_data: {
            id_ttd: id_document,
            id_user: userData.iduser,
            img64: image,
            latitude: latitude,
            longitude: longitude,
            timestamp: timestamp,
            fileName: filePath.fileName,
            tempUri: filePath.uri,
            desc: desc,
          },
        });
      } else {
        NavigationService.navigate('CreateRequest', {
          item: item,
          id_kelengkapan: id_kelengkapan,
          id_document: id_document,
          document_data: {
            id: id_kelengkapan,
            id_user: userData.iduser,
            id_document: id_document,
            img64: image,
            latitude: latitude,
            longitude: longitude,
            timestamp: timestamp,
            fileName: filePath.fileName,
            tempUri: filePath.uri,
            desc: desc,
          },
        });
      }
    } else if (referrer === 'JobList') {
      NavigationService.navigate('JobList', {
        item: item,
        id_kelengkapan: id_kelengkapan,
        id_document: id_document,
        document_data: {
          id: id_kelengkapan,
          id_user: userData.iduser,
          id_document: id_document,
          img64: image,
          latitude: latitude,
          longitude: longitude,
          timestamp: timestamp,
          fileName: filePath.fileName,
          tempUri: filePath.uri,
          desc: desc,
        },
      });
    } else if (referrer === 'RequestList') {
      NavigationService.navigate('RequestList', {
        item: item,
        subservice_data: {
          sub_service_id: id_layanan,
          sub_service_name: nama_layanan,
          id_user: userData.iduser,
          img64: image,
          latitude: latitude,
          longitude: longitude,
          timestamp: timestamp,
          fileName: filePath.fileName,
          tempUri: filePath.uri,
        },
      });
    } else if (referrer === 'ProjectList') {
      NavigationService.goBack();
      route.params.return({
        item: item,
        id_kelengkapan: id_kelengkapan,
        id_document: id_document,
        document_data: {
          id: id_kelengkapan,
          id_user: userData.iduser,
          id_document: id_document,
          img64: image,
          latitude: latitude,
          longitude: longitude,
          timestamp: timestamp,
          fileName: filePath.fileName,
          tempUri: filePath.uri,
          desc: desc,
        },
      });
    }
  };

  //hooks
  const [filePath, setFilePath] = React.useState({});
  const [image, setImage] = React.useState('');
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [timestamp, setTimestamp] = React.useState(null);

  const [imgModal, setImgModal] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  //check camera permission
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          Alert.alert('Camera Permission Denied');
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };
  //check write storage permission
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          Alert.alert('Write Permission Denied');
        }
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  //check location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          Alert.alert('Location Permission Denied');
        }
      } catch (err) {
        Alert.alert('Location permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 0.8,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    let isLocationPermitted = await requestLocationPermission();
    if (isCameraPermitted && isStoragePermitted && isLocationPermitted) {
      launchCamera(options, (response) => {
        if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('App have not been given a permission to use camera');
          return;
        } else if (response.errorCode == 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        let source = response.base64;
        setImage(source);
        setFilePath(response);
        // SheetManager.hideAll();
      });
    } else {
      Alert.alert(
        'Permission Denied',
        'Pastikan anda mengizinkan akses kamera, penyimpanan, dan lokasi',
      );
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 0.8,
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('App have not been given a permission to access storage');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      let source = response.base64;
      setImage(source);
      setFilePath(response);
    });
  };

  //after capture logic
  React.useEffect(() => {
    if (tempUri) {
      setFilePath({
        uri: tempUri,
      });
    } else if (item && id_document) {
      if (referrer === 'CreateRequest') {
        const containedItem = _.find(item.request_document, [
          'id',
          id_kelengkapan,
        ]);

        if (containedItem !== undefined && containedItem.request_dokumen_url) {
          setFilePath({
            uri: containedItem.request_dokumen_url.replace('//', 'http://'),
          });
        }

        // handlePresentModalPress(item_capture);
      } else if (referrer === 'JobList') {
        const containedItem = _.find(item.job_document, ['id', id_kelengkapan]);
        if (containedItem !== undefined && containedItem.job_dokumen_url) {
          setFilePath({
            uri: containedItem.job_dokumen_url.replace('//', 'http://'),
          });
        }
      }
    }
  }, [item, id_document, id_kelengkapan, tempUri, referrer]);

  React.useEffect(() => {
    if (id_kelengkapan === 'bukti_pembayaran') {
      if (tempUri) {
        setFilePath({
          uri: tempUri,
        });
      } else if (item) {
        if (item.request_payment_url) {
          setFilePath({
            uri: item.request_payment_url.replace('//', 'http://'),
          });
        }
      }
    }
  }, [id_kelengkapan, tempUri, item]);

  React.useEffect(() => {
    if (id_kelengkapan === 'ttd_pihak') {
      const containedItem = _.find(item.ttd_pihak, ['id', id_document]);
      if (tempUri) {
        setFilePath({
          uri: tempUri,
        });
      } else if (containedItem !== undefined && containedItem.request_ttd_url) {
        setFilePath({
          uri: containedItem.request_ttd_url.replace('//', 'http://'),
        });
      }
    }
  }, [id_kelengkapan, id_document, tempUri, item]);

  React.useEffect(() => {
    if (referrer === 'ProjectList') {
      // console.log(item);
      const containedItem = _.find(item.job_document, ['id', id_kelengkapan]);
      console.log('containedItem', containedItem);
      console.log('tempuri', tempUri);
      if (tempUri) {
        setFilePath({
          uri: tempUri,
        });
      } else if (containedItem !== undefined && containedItem.job_dokumen_url) {
        setFilePath({
          uri: containedItem.job_dokumen_url.replace('//', 'http://'),
        });
      }
    }
  }, [referrer, item, id_kelengkapan, tempUri]);

  React.useEffect(() => {
    if (id_layanan && nama_layanan) {
      const containedItem = _.find(item.subservices, [
        'sub_service_id',
        id_layanan,
      ]);
      if (tempUri) {
        setFilePath({
          uri: tempUri,
        });
      } else if (containedItem !== undefined && containedItem.image_url) {
        console.log(containedItem.image_url.replace('//', 'http://'));
        setFilePath({
          uri: containedItem.image_url.replace('//', 'http://'),
        });
      }
    }
  }, [id_layanan, nama_layanan, tempUri, item]);

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
          <Text style={styles.headerText}>Unggah Bukti Foto</Text>
        </View>
      </View>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.sheetContainer}>
          <View style={styles.photoContainer}>
            {filePath.uri ? (
              <TouchableOpacity
                style={styles.photoContainer}
                onPress={() => setImgModal(true)}>
                {loader ? (
                  <ActivityIndicator
                    style={styles.photoPreview}
                    animating={true}
                  />
                ) : null}
                <Image
                  source={{ uri: filePath.uri }}
                  style={styles.photoPreview}
                  onLoadStart={() => setLoader(true)}
                  onLoadEnd={() => setLoader(false)}
                />
              </TouchableOpacity>
            ) : (
              <Image
                source={require('../../assets/camera.png')}
                style={styles.cameraIconPreview}
              />
            )}
          </View>
          {filePath.uri ? (
            [
              item ? (
                [
                  _.find(item.request_document, ['id', id_kelengkapan]) !==
                    undefined ||
                  _.find(item.ttd_pihak, ['id', id_document]) !== undefined
                    ? [
                        image !== '' ? (
                          <View
                            style={[
                              styles.submitButtonContainer,
                              { marginTop: 10 },
                            ]}
                            key="ambilfoto">
                            <Button
                              mode="contained"
                              labelStyle={[styles.buttonSubmitLabel]}
                              style={styles.buttonSubmit}
                              onPress={() =>
                                onList(item, id_document, filePath)
                              }>
                              Pilih Gambar
                            </Button>
                          </View>
                        ) : null,
                      ]
                    : [
                        isButton ? (
                          <View
                            style={[
                              styles.submitButtonContainer,
                              { marginTop: 10 },
                            ]}
                            key="ambilfoto">
                            <Button
                              mode="contained"
                              labelStyle={[styles.buttonSubmitLabel]}
                              style={styles.buttonSubmit}
                              onPress={() =>
                                onList(item, id_document, filePath)
                              }>
                              Pilih Gambar
                            </Button>
                          </View>
                        ) : null,
                      ],
                ]
              ) : (
                <View
                  style={[styles.submitButtonContainer, { marginTop: 10 }]}
                  key="ambilfoto">
                  <Button
                    mode="contained"
                    labelStyle={[styles.buttonSubmitLabel]}
                    style={styles.buttonSubmit}
                    onPress={() => onList(item, id_document, filePath)}>
                    Pilih Gambar
                  </Button>
                </View>
              ),
            ]
          ) : (
            <>
              <View
                style={[styles.submitButtonContainer, , { marginTop: 10 }]}
                key="ambilfoto">
                <Button
                  mode="contained"
                  labelStyle={[styles.buttonSubmitLabel]}
                  style={styles.buttonSubmit}
                  onPress={() => captureImage('photo')}>
                  Ambil Foto
                </Button>
              </View>
              {id_kelengkapan === 'ttd_pihak' ? (
                <View
                  style={styles.submitButtonContainer}
                  key="ambilfotogaleri">
                  <Button
                    mode="outlined"
                    color={theme.colors.secondary}
                    labelStyle={[styles.buttonRetakeLabel]}
                    style={styles.buttonSubmit}
                    onPress={() => chooseFile('photo')}>
                    Pilih Foto Galeri
                  </Button>
                </View>
              ) : null}
            </>
          )}
          {filePath.uri && isButton ? (
            <>
              <View style={styles.submitButtonContainer} key="ambilfotoulang">
                <Button
                  mode="outlined"
                  color={theme.colors.secondary}
                  labelStyle={[styles.buttonRetakeLabel]}
                  style={styles.buttonSubmit}
                  onPress={() => captureImage('photo')}>
                  Ambil Foto Ulang
                </Button>
              </View>
              {id_kelengkapan === 'ttd_pihak' ? (
                <View
                  style={styles.submitButtonContainer}
                  key="ambilfotoulanggaleri">
                  <Button
                    mode="outlined"
                    color={theme.colors.secondary}
                    labelStyle={[styles.buttonRetakeLabel]}
                    style={styles.buttonSubmit}
                    onPress={() => chooseFile('photo')}>
                    Pilih Foto Galeri
                  </Button>
                </View>
              ) : null}
            </>
          ) : (
            <View style={styles.submitButtonContainer} key="ambilfotoulang">
              <Button
                mode="outlined"
                color={theme.colors.secondary}
                labelStyle={[styles.buttonRetakeLabel]}
                style={styles.buttonSubmit}
                onPress={() => onBack()}>
                Batal
              </Button>
            </View>
          )}
        </View>
      </View>
      <Modal
        visible={imgModal}
        transparent={true}
        onRequestClose={() => {
          setImgModal(false);
        }}
        animationType={'slide'}
        presentationStyle={'overFullScreen'}>
        <ImageViewer
          enableSwipeDown={true}
          onSwipeDown={() => {
            setImgModal(false);
          }}
          renderHeader={() => (
            <SafeAreaView>
              <IconButton
                icon="close"
                size={30}
                color="#ffffff"
                onPress={() => setImgModal(false)}
              />
            </SafeAreaView>
          )}
          imageUrls={[{ url: Image.resolveAssetSource(filePath).uri }]}
          renderImage={(props) => (
            <SafeAreaView
              style={{
                marginTop: -60,
              }}>
              <Image {...props} />
            </SafeAreaView>
          )}
        />
      </Modal>
    </View>
  );
};

export default UploadPhoto;
