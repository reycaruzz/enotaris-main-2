export default Home;

import React from 'react';
import { Platform, Dimensions, View, Text } from 'react-native';
import { theme } from 'app/core/theme';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import ProjectList from '../ProjectList';
import ProjectListRequest from '../ProjectListRequest';
import Dashboard from '../Dashboard';
import Announcement from '../Announcements';
import AddButton from '../../components/AddButton';
// import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
import { useSelector } from 'react-redux';
import { IconButton, Badge } from 'react-native-paper';

import { IThemeState } from 'app/models/reducers/theme';
import { IMainState } from 'app/models/reducers/main';
import styles from './styles';

interface IState {
  themeReducer: IThemeState;
  mainReducer: IMainState;
}
const Home: React.FC = () => {
  //*check dimension
  const { height, width } = Dimensions.get('window');
  const aspectRatio = height / width;
  // check isDark
  const requestCount = useSelector(
    (state: IState) => state.mainReducer.requestCount,
  );
  const jobCount = useSelector((state: IState) => state.mainReducer.jobCount);

  const TabBarComponent = (props) => <BottomTabBar {...props} />;
  const TabNavigator = createBottomTabNavigator(
    {
      DASHBOARD: {
        screen: Dashboard,
        navigationOptions: {
          tabBarIcon: ({ tintColor, size }) => (
            <IconButton icon="home-outline" color={tintColor} size={size} />
          ),
          tabBarOptions: {
            activeTintColor: theme.colors.primary,
            inactiveTintColor: '#DADADA',
            labelStyle: {
              fontSize: 9,
              fontFamily: 'RedHatDisplay-Bold',
            },
          },
        },
      },
      REQUEST: {
        screen: ProjectListRequest,
        navigationOptions: {
          tabBarIcon: ({ tintColor, size }) => (
            <View>
              {requestCount > 0 && (
                <Badge style={styles.badgeCounter}>{requestCount}</Badge>
              )}
              <IconButton
                icon="clipboard-check"
                color={tintColor}
                size={size}
              />
            </View>
          ),
          tabBarOptions: {
            activeTintColor: theme.colors.primary,
            inactiveTintColor: '#DADADA',
            labelStyle: {
              fontSize: 9,
              fontFamily: 'RedHatDisplay-Bold',
            },
          },
        },
      },
      Add: {
        screen: ProjectListRequest,
        navigationOptions: {
          tabBarIcon: <AddButton />,
          tabBarLabel: () => {},
        },
      },
      JOB: {
        screen: ProjectList,
        navigationOptions: {
          tabBarIcon: ({ tintColor, size }) => (
            <View>
              {jobCount > 0 && (
                <Badge style={styles.badgeCounter}>{jobCount}</Badge>
              )}
              <IconButton icon="clipboard-text" color={tintColor} size={size} />
            </View>
          ),
          tabBarOptions: {
            activeTintColor: theme.colors.primary,
            inactiveTintColor: '#DADADA',
            labelStyle: {
              fontSize: 9,
              fontFamily: 'RedHatDisplay-Bold',
            },
          },
        },
      },
      NOTICE: {
        screen: Announcement,
        navigationOptions: {
          tabBarIcon: ({ tintColor, size }) => (
            <IconButton
              icon="message-alert-outline"
              color={tintColor}
              size={size}
            />
          ),
          tabBarOptions: {
            activeTintColor: theme.colors.primary,
            inactiveTintColor: '#DADADA',
            labelStyle: {
              fontSize: 9,
              fontFamily: 'RedHatDisplay-Bold',
            },
          },
        },
      },
    },
    {
      tabBarComponent: (props) => {
        var tabHeight = 80;
        var tabPadBottom = 30;
        if (Platform.OS === 'ios') {
          if (aspectRatio > 1.8) {
            //*ipad
            tabHeight = 60;
            tabPadBottom = 40;
          } else {
            //*iphone
            tabHeight = 70;
            tabPadBottom = 20;
          }
        } else {
          tabHeight = 80;
          tabPadBottom = 30;
        }
        return (
          <TabBarComponent
            {...props}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: tabHeight,
              borderTopWidth: 0,
              paddingTop: 10,
              paddingBottom: tabPadBottom,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,
              elevation: 17,
            }}
          />
        );
      },
    },
  );

  const BottomNavigation = createAppContainer(TabNavigator);

  return <BottomNavigation />;
};

export default Home;

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
