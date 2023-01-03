"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
/**
 * React Native App
 * Everything starts from the entrypoint
 */

var react_1 = require("react");

var react_native_1 = require("react-native");

var react_redux_1 = require("react-redux");

var react_2 = require("redux-persist/es/integration/react");

var messaging_1 = require("@react-native-firebase/messaging");

var react_native_paper_1 = require("react-native-paper");

var native_1 = require("@react-navigation/native");

var NavigationService_1 = require("app/navigation/NavigationService");

var react_native_version_check_1 = require("react-native-version-check");

var navigation_1 = require("app/navigation");

var store_1 = require("app/store");

var fontConfig = {
  web: {
    regular: {
      fontFamily: 'RedHatDisplay-Regular',
      fontWeight: 'normal'
    },
    bold: {
      fontFamily: 'RedHatDisplay-Bold',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'RedHatDisplay-Medium',
      fontWeight: 'normal'
    },
    black: {
      fontFamily: 'RedHatDisplay-Black',
      fontWeight: 'normal'
    },
    italic: {
      fontFamily: 'RedHatDisplay-Italic',
      fontWeight: 'normal'
    }
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
      fontWeight: 'normal'
    },
    bold: {
      fontFamily: 'RedHatDisplay-Bold',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'RedHatDisplay-Medium',
      fontWeight: 'normal'
    },
    black: {
      fontFamily: 'RedHatDisplay-Black',
      fontWeight: 'normal'
    },
    italic: {
      fontFamily: 'RedHatDisplay-Italic',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'Inter-Light',
      fontWeight: 'normal'
    },
    thin: {
      fontFamily: 'Inter-Thin',
      fontWeight: 'normal'
    }
  }
};

var PaperThemeDefault = __assign(__assign({}, react_native_paper_1.DefaultTheme), {
  colors: __assign(__assign({}, react_native_paper_1.DefaultTheme.colors), {
    primary: '#F9A826'
  }),
  fonts: react_native_paper_1.configureFonts(fontConfig)
});

var PaperThemeDark = __assign(__assign({}, react_native_paper_1.DarkTheme), {
  colors: __assign(__assign({}, react_native_paper_1.DarkTheme.colors), {
    primary: '#F9A826'
  }),
  fonts: react_native_paper_1.configureFonts(fontConfig)
});

var CombinedDefaultTheme = __assign(__assign(__assign({}, react_native_paper_1.DefaultTheme), native_1.DefaultTheme), {
  fonts: react_native_paper_1.configureFonts(fontConfig)
});

var CombinedDarkTheme = __assign(__assign(__assign({}, react_native_paper_1.DarkTheme), native_1.DarkTheme), {
  colors: __assign(__assign({}, native_1.DarkTheme.colors), {
    background: '#303030',
    card: '#222222',
    text: '#ffffff',
    textInput: '#222222'
  }),
  fonts: react_native_paper_1.configureFonts(fontConfig)
});

var _a = store_1["default"](),
    persistor = _a.persistor,
    store = _a.store;

var RootNavigation = function RootNavigation() {
  var isDark = react_redux_1.useSelector(function (state) {
    return state.themeReducer.isDark;
  });
  var paperTheme = isDark ? PaperThemeDark : PaperThemeDefault;
  var combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme; //fetch user data

  var userData = react_redux_1.useSelector(function (state) {
    return state.loginReducer.userData;
  });
  react_1["default"].useEffect(function () {
    var backAction = function backAction() {
      react_native_1.Alert.alert('Keluar aplikasi', 'Apakah anda yakin untuk keluar dari aplikasi?', [{
        text: 'BATAL',
        onPress: function onPress() {
          return null;
        },
        style: 'cancel'
      }, {
        text: 'YA',
        onPress: function onPress() {
          return react_native_1.BackHandler.exitApp();
        }
      }]);
      return true;
    };

    var backHandler = react_native_1.BackHandler.addEventListener('hardwareBackPress', backAction);
    return function () {
      return backHandler.remove();
    };
  }, []);
  react_1["default"].useEffect(function () {
    // Get the device token
    messaging_1["default"]().getToken().then(function (token) {
      saveTokenToDatabase(token);
    }); // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }
    // Listen to whether the token changes

    return messaging_1["default"]().onTokenRefresh(function (token) {
      saveTokenToDatabase(token);
    });
  }, [userData]);
  react_1["default"].useEffect(function () {
    var unsubscribe = messaging_1["default"]().onMessage(function (remoteMessage) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          react_native_1.Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
          return [2
          /*return*/
          ];
        });
      });
    });
    return unsubscribe;
  }, []);
  messaging_1["default"]().setBackgroundMessageHandler(function (remoteMessage) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        console.log('Message handled in the background!', remoteMessage);
        return [2
        /*return*/
        ];
      });
    });
  });
  react_1["default"].useEffect(function () {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging_1["default"]().onNotificationOpenedApp(function (remoteMessage) {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
      NavigationService_1["default"].navigate('Home');
    }); // Check whether an initial notification is available

    messaging_1["default"]().getInitialNotification().then(function (remoteMessage) {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        NavigationService_1["default"].navigate('Home');
      }
    });
  }, []);
  react_1["default"].useEffect(function () {
    checkVersion();
  }, []);

  var checkVersion = function checkVersion() {
    return __awaiter(void 0, void 0, void 0, function () {
      var updateNeeded_1, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , react_native_version_check_1["default"].needUpdate()];

          case 1:
            updateNeeded_1 = _a.sent();

            if (updateNeeded_1.isNeeded) {
              react_native_1.Alert.alert('Silakan Update Aplikasi', 'Anda perlu mengupdate aplikasi E-Notaris untuk terus melanjutkan', [{
                text: 'Update',
                onPress: function onPress() {
                  react_native_1.BackHandler.exitApp();
                  react_native_1.Linking.openURL(updateNeeded_1.storeUrl);
                }
              }], {
                cancelable: false
              });
            }

            return [3
            /*break*/
            , 3];

          case 2:
            error_1 = _a.sent();
            return [3
            /*break*/
            , 3];

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var saveTokenToDatabase = function saveTokenToDatabase(token) {
    var postData = new FormData();
    postData.append('user_id', userData.iduser);
    postData.append('fcm_token', token);
    fetch(apiUrl.api + 'setToken', {
      method: 'POST',
      body: postData
    })["catch"](function (error) {
      return console.error(error);
    });
  };

  return react_1["default"].createElement(react_native_paper_1.Provider, {
    theme: paperTheme
  }, react_1["default"].createElement(navigation_1["default"], {
    theme: combinedTheme
  }));
};

var Entrypoint = function Entrypoint() {
  return react_1["default"].createElement(react_redux_1.Provider, {
    store: store
  }, react_1["default"].createElement(react_2.PersistGate, {
    loading: react_1["default"].createElement(react_native_1.ActivityIndicator, null),
    persistor: persistor
  }, react_1["default"].createElement(RootNavigation, null)));
};

exports["default"] = Entrypoint;