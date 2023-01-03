/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {
  configureFonts,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import NavigationService from 'app/navigation/NavigationService';

import VersionCheck from 'react-native-version-check';
import notifee, { AndroidImportance } from '@notifee/react-native';

import * as mainActions from 'app/store/actions/mainActions';
import { IMainState } from 'app/models/reducers/main';
import { ILoginState } from 'app/models/reducers/login';
import Navigator from 'app/navigation';
import configureStore from 'app/store';
import { IThemeState } from 'app/models/reducers/theme';
import { apiUrl } from 'app/core/apiUrl';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'RedHatDisplay-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'RedHatDisplay-Bold',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'RedHatDisplay-Medium',
      fontWeight: 'normal',
    },
    black: {
      fontFamily: 'RedHatDisplay-Black',
      fontWeight: 'normal',
    },
    italic: {
      fontFamily: 'RedHatDisplay-Italic',
      fontWeight: 'normal',
    },
    // light: {
    //   fontFamily: 'Inter-Light',
    //   fontWeight: 'normal',
    // },
    // thin: {
    //   fontFamily: 'Inter-Thin',
    //   fontWeight: 'normal',
    // },
  },
  // ios: {
  //   regular: {
  //     fontFamily: 'RedHatDisplay-Regular',
  //     fontWeight: 'normal',
  //   },
  //   bold: {
  //     fontFamily: 'RedHatDisplay-Bold',
  //     fontWeight: 'normal',
  //   },
  //   medium: {
  //     fontFamily: 'RedHatDisplay-Medium',
  //     fontWeight: 'normal',
  //   },
  //   black: {
  //     fontFamily: 'RedHatDisplay-Black',
  //     fontWeight: 'normal',
  //   },
  //   italic: {
  //     fontFamily: 'RedHatDisplay-Italic',
  //     fontWeight: 'normal',
  //   },
  //   light: {
  //     fontFamily: 'Inter Light',
  //     fontWeight: 'normal',
  //   },
  //   thin: {
  //     fontFamily: 'Inter Thin',
  //     fontWeight: 'normal',
  //   },
  // },
  android: {
    regular: {
      fontFamily: 'RedHatDisplay-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'RedHatDisplay-Bold',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'RedHatDisplay-Medium',
      fontWeight: 'normal',
    },
    black: {
      fontFamily: 'RedHatDisplay-Black',
      fontWeight: 'normal',
    },
    italic: {
      fontFamily: 'RedHatDisplay-Italic',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Inter-Thin',
      fontWeight: 'normal',
    },
  },
};

const PaperThemeDefault = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#F9A826',
  },
  fonts: configureFonts(fontConfig),
};

const PaperThemeDark = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#F9A826',
  },
  fonts: configureFonts(fontConfig),
};

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  fonts: configureFonts(fontConfig),
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#303030',
    card: '#222222',
    text: '#ffffff',
    textInput: '#222222',
  },
  fonts: configureFonts(fontConfig),
};

const { persistor, store } = configureStore();

interface IState {
  themeReducer: IThemeState;
  mainReducer: IMainState;
  loginReducer: ILoginState;
}

const RootNavigation: React.FC = () => {
  const isDark = useSelector((state: IState) => state.themeReducer.isDark);
  const paperTheme = isDark ? PaperThemeDark : PaperThemeDefault;
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;
  //fetch user data
  const userData = useSelector((state: IState) => state.loginReducer.userData);
  const dispatch = useDispatch();

  const onRequestList = (project_id, task_id) =>
    NavigationService.navigate('RequestList', {
      project_id: project_id,
      task_id: task_id,
    });

  const onJobList = (project_id) =>
    NavigationService.navigate('ProjectList', {
      project_id: project_id,
    });

  const getServiceType = async (id_request: number) => {
    const data = new FormData();
    data.append('id_req', id_request);
    const response = await fetch(apiUrl.api + 'getservicetypebyrequest', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    const { id_service, success } = await response.json();
    if (success === true) {
      return id_service;
    } else {
      const error = new Error('Gagal mengambil data jenis service');
      return Promise.reject(error);
    }
  };

  const updateState = (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    service_id: string | null,
  ) => {
    if (remoteMessage.data) {
      if (service_id === null) {
        dispatch(mainActions.addJobCount());
      } else {
        dispatch(mainActions.addRequestCount());
        //     dispatch(mainActions.addRequestList(remoteMessage.notification?.body));
        switch (service_id) {
          case '1':
            dispatch(mainActions.addRequestPerbankanCount());
            break;
          case '2':
            dispatch(mainActions.addRequestNotarisCount());
            break;
          case '3':
            dispatch(mainActions.addRequestPPATCount());
        }
      }
    }
  };

  React.useEffect(() => {
    const backAction = () => {
      // handle the index we get
      if (NavigationService.currentRoute()?.canGoBack()) {
        NavigationService.goBack();
      } else {
        Alert.alert(
          'Keluar aplikasi',
          'Apakah anda yakin untuk keluar dari aplikasi?',
          [
            {
              text: 'BATAL',
              onPress: () => null,
              style: 'cancel',
            },
            { text: 'YA', onPress: () => BackHandler.exitApp() },
          ],
        );
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //notifee and fcm

  React.useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        saveTokenToDatabase(token);
      })
      .catch((error) => console.error(error));

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      saveTokenToDatabase(token);
    });
  }, [userData]);

  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      })
      .catch((error) => console.error(error));
    //notifee config
    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === 1) {
        if (detail.notification && detail.notification !== undefined) {
          if (detail.notification.data !== undefined) {
            if (
              detail.notification.data.type !== undefined &&
              detail.notification.data.type === 'job'
            ) {
              onJobList(null);
            } else {
              let id_request = detail.notification.data.id;
              let id_service = await getServiceType(parseInt(id_request))
                .then((data) => {
                  return data;
                })
                .catch((error) => {
                  console.error(error);
                });

              onRequestList(id_service, id_request);
            }
          }
        }
      }
    });

    //check version
    if (Platform.OS !== 'ios') {
      checkVersion();
    }

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Request permissions (required for iOS)
      await notifee.requestPermission();

      // Create a channƒel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'important',
        name: 'Important Notifications',
        importance: AndroidImportance.HIGH,
      });
      //redux add notif
      if (remoteMessage.data) {
        if (
          remoteMessage.data.type !== undefined &&
          remoteMessage.data.type === 'job'
        ) {
          updateState(remoteMessage, null);
        } else {
          let id_request = remoteMessage.data.id;
          let id_service = await getServiceType(parseInt(id_request))
            .then((data) => {
              return data;
            })
            .catch((error) => {
              console.error(error);
            });
          updateState(remoteMessage, id_service);
        }
      }
      // Display a notification
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          fullScreenAction: {
            id: 'default',
          },
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    });

    return unsubscribe;
  }, []);

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const checkVersion = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded.isNeeded) {
        Alert.alert(
          'Silakan Update Aplikasi',
          'Anda perlu mengupdate aplikasi E-Notaris untuk terus melanjutkan',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          { cancelable: false },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTokenToDatabase = (token) => {
    var postData = new FormData();
    postData.append('user_id', userData.iduser);
    postData.append('fcm_token', token);
    fetch(apiUrl.api + 'setToken', {
      method: 'POST',
      body: postData,
    }).catch((error) => console.error(error));
  };

  return (
    <PaperProvider theme={paperTheme}>
      <Navigator theme={combinedTheme} />
    </PaperProvider>
  );
};

const Entrypoint: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default Entrypoint;
