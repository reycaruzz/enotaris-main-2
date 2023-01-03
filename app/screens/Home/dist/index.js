"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports["default"] = Home;
var react_1 = require("react");
var react_native_1 = require("react-native");
var theme_1 = require("app/core/theme");
var react_navigation_tabs_1 = require("react-navigation-tabs");
var react_navigation_1 = require("react-navigation");
var ProjectList_1 = require("../ProjectList");
var ProjectListRequest_1 = require("../ProjectListRequest");
var Dashboard_1 = require("../Dashboard");
var Announcements_1 = require("../Announcements");
var AddButton_1 = require("../../components/AddButton");
var react_redux_1 = require("react-redux");
var react_native_paper_1 = require("react-native-paper");
var Home = function () {
    // check isDark
    var isDark = react_redux_1.useSelector(function (state) { return state.themeReducer.isDark; });
    console.log(isDark);
    var TabBarComponent = function (props) { return react_1["default"].createElement(react_navigation_tabs_1.BottomTabBar, __assign({}, props)); };
    var TabNavigator = react_navigation_tabs_1.createBottomTabNavigator({
        DASHBOARD: {
            screen: Dashboard_1["default"],
            navigationOptions: {
                tabBarIcon: function (_a) {
                    var tintColor = _a.tintColor, size = _a.size;
                    return (react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "home-outline", color: tintColor, size: size }));
                },
                tabBarOptions: {
                    activeTintColor: theme_1.theme.colors.primary,
                    inactiveTintColor: '#DADADA',
                    labelStyle: {
                        fontSize: 9,
                        fontFamily: 'RedHatDisplay-Bold'
                    }
                }
            }
        },
        REQUEST: {
            screen: ProjectListRequest_1["default"],
            navigationOptions: {
                tabBarIcon: function (_a) {
                    var tintColor = _a.tintColor, size = _a.size;
                    return (react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "clipboard-check", color: tintColor, size: size }));
                },
                tabBarOptions: {
                    activeTintColor: theme_1.theme.colors.primary,
                    inactiveTintColor: '#DADADA',
                    labelStyle: {
                        fontSize: 9,
                        fontFamily: 'RedHatDisplay-Bold'
                    }
                }
            }
        },
        Add: {
            screen: ProjectListRequest_1["default"],
            navigationOptions: {
                tabBarIcon: react_1["default"].createElement(AddButton_1["default"], null),
                tabBarLabel: function () { }
            }
        },
        JOB: {
            screen: ProjectList_1["default"],
            navigationOptions: {
                tabBarIcon: function (_a) {
                    var tintColor = _a.tintColor, size = _a.size;
                    return (react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "clipboard-text", color: tintColor, size: size }));
                },
                tabBarOptions: {
                    activeTintColor: theme_1.theme.colors.primary,
                    inactiveTintColor: '#DADADA',
                    labelStyle: {
                        fontSize: 9,
                        fontFamily: 'RedHatDisplay-Bold'
                    }
                }
            }
        },
        NOTICE: {
            screen: Announcements_1["default"],
            navigationOptions: {
                tabBarIcon: function (_a) {
                    var tintColor = _a.tintColor, size = _a.size;
                    return (react_1["default"].createElement(react_native_paper_1.IconButton, { icon: "message-alert-outline", color: tintColor, size: size }));
                },
                tabBarOptions: {
                    activeTintColor: theme_1.theme.colors.primary,
                    inactiveTintColor: '#DADADA',
                    labelStyle: {
                        fontSize: 9,
                        fontFamily: 'RedHatDisplay-Bold'
                    }
                }
            }
        }
    }, {
        tabBarComponent: function (props) { return (react_1["default"].createElement(TabBarComponent, __assign({}, props, { 
            // eslint-disable-next-line react-native/no-inline-styles
            style: {
                height: react_native_1.Platform.OS === 'ios' ? 60 : 80,
                borderTopWidth: 0,
                paddingTop: 10,
                paddingBottom: react_native_1.Platform.OS === 'ios' ? 40 : 30,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 8
                },
                shadowOpacity: 0.46,
                shadowRadius: 11.14,
                elevation: 17
            } }))); }
    });
    var BottomNavigation = react_navigation_1.createAppContainer(TabNavigator);
    return react_1["default"].createElement(BottomNavigation, null);
};
exports["default"] = Home;
// import React, { useState, useRef } from 'react';
// import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { theme } from 'app/core/theme';
// import NavigationService from 'app/navigation/NavigationService';
// import ProjectList from '../ProjectList';
// import ProjectListRequest from '../ProjectListRequest';
// import Dashboard from '../Dashboard';
// import Announcement from '../Announcements';
// StatusBar.setBarStyle('dark-content');
// const Home = (props) => {
//   console.log('props', props);
//   const onRequestList = () =>
//     NavigationService.navigate('CreateRequest', { item: null });
//   const ref = useRef();
//   const [type, setType] = useState<'down' | 'up'>('down');
//   const onClickButton = () => {
//     if (type === 'up') {
//       setType('down');
//       alert('Change type curve down');
//     } else {
//       setType('up');
//       alert('Change type curve up');
//     }
//   };
//   const _renderIcon = (routeName: string, selectTab: string) => {
//     let icon = '';
//     switch (routeName) {
//       case 'title1':
//         icon = 'home-outline';
//         break;
//       case 'title2':
//         icon = 'checkbox-outline';
//         break;
//       case 'title3':
//         icon = 'document-text-outline';
//         break;
//       case 'title4':
//         icon = 'alert-circle-outline';
//         break;
//     }
//     return (
//       <Ionicons
//         name={icon}
//         size={23}
//         color={routeName === selectTab ? theme.colors.secondary : 'white'}
//       />
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <CurvedBottomBar.Navigator
//         ref={ref}
//         style={[type === 'down']}
//         type={type}
//         height={60}
//         circleWidth={55}
//         bgColor={theme.colors.primary}
//         borderTopLeftRight={true}
//         initialRouteName="dashboard"
//         renderCircle={({ selectTab, navigate }) => (
//           <TouchableOpacity
//             style={[type === 'down' ? styles.btnCircle : styles.btnCircleUp]}
//             onPress={onRequestList}>
//             <Ionicons color="white" name="create-outline" size={23} />
//           </TouchableOpacity>
//         )}
//         tabBar={({ routeName, selectTab, navigate }) => {
//           return (
//             <TouchableOpacity
//               onPress={() => navigate(routeName)}
//               style={{
//                 flex: 1,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               {_renderIcon(routeName, selectTab)}
//             </TouchableOpacity>
//           );
//         }}>
//         <CurvedBottomBar.Screen
//           name="title1"
//           position="left"
//           component={({ navigate }) => <Dashboard />}
//         />
//         <CurvedBottomBar.Screen
//           name="title2"
//           component={({ navigate }) => <ProjectListRequest />}
//           position="left"
//         />
//         <CurvedBottomBar.Screen
//           name="title3"
//           component={({ navigate }) => <ProjectList />}
//           position="right"
//         />
//         <CurvedBottomBar.Screen
//           name="title4"
//           component={({ navigate }) => <Announcement />}
//           position="right"
//         />
//       </CurvedBottomBar.Navigator>
//     </View>
//   );
// };
// export default Home;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 5,
//   },
//   btnCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: theme.colors.secondary,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 5,
//     bottom: 28,
//   },
//   btnCircleUp: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: theme.colors.secondary,
//     bottom: 18,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 5,
//   },
//   imgCircle: {
//     width: 30,
//     height: 30,
//     tintColor: '#48CEF6',
//   },
//   img: {
//     width: 30,
//     height: 30,
//   },
// });
