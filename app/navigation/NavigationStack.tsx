import * as React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import Login from 'app/screens/Login';
import Home from 'app/screens/Home';
import JobList from 'app/screens/JobList';
import ProjectListRequest from 'app/screens/ProjectListRequest';
import ProjectList from 'app/screens/ProjectList';
import RequestList from 'app/screens/RequestList';
import UploadPhoto from 'app/screens/UploadPhoto';
import CreateRequest from 'app/screens/CreateRequest';
import Profile from 'app/screens/Profile';
import SearchList from 'app/screens/SearchList';
import Report from 'app/screens/Report';
import DetailPegawai from 'app/screens/DetailPegawai';

// import ThemeController from '../components/ThemeController';
import { StatusBar } from 'react-native';
import { ILoginState } from 'app/models/reducers/login';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

const homeOptions = {
  title: 'Home',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const detailOptions = ({ navigation }) => ({
  title: 'Detail',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: (props) => (
    <HeaderBackButton {...props} onPress={() => navigation.goBack(null)} />
  ),
});

const createOptions = ({ navigation }) => ({
  title: 'Create Request',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: (props) => (
    <HeaderBackButton {...props} onPress={() => navigation.goBack(null)} />
  ),
});

const profileOptions = ({ navigation }) => ({
  title: 'Profile',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: (props) => (
    <HeaderBackButton {...props} onPress={() => navigation.goBack(null)} />
  ),
});

interface IState {
  loginReducer: ILoginState;
}

interface IProps {
  theme: Theme;
}

const AuthNavigator = () => {
  const isLoggedIn = useSelector(
    (state: IState) => state.loginReducer.isLoggedIn,
  );
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => (
  <LoggedInStack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} options={homeOptions} />
    <Stack.Screen
      name="CreateRequest"
      component={CreateRequest}
      options={createOptions}
    />
    <Stack.Screen name="JobList" component={JobList} options={detailOptions} />
    <Stack.Screen
      name="RequestList"
      component={RequestList}
      options={detailOptions}
    />
    <Stack.Screen
      name="ProjectListRequest"
      component={ProjectListRequest}
      options={detailOptions}
    />
    <Stack.Screen
      name="ProjectList"
      component={ProjectList}
      options={detailOptions}
    />
    <Stack.Screen
      name="UploadPhoto"
      component={UploadPhoto}
      options={detailOptions}
    />
    <Stack.Screen name="Profile" component={Profile} options={profileOptions} />
    <Stack.Screen
      name="SearchList"
      component={SearchList}
      options={detailOptions}
    />
    <Stack.Screen name="Report" component={Report} options={detailOptions} />
    <Stack.Screen
      name="DetailPegawai"
      component={DetailPegawai}
      options={detailOptions}
    />
  </LoggedInStack.Navigator>
);

const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isLoggedIn = useSelector(
    (state: IState) => state.loginReducer.isLoggedIn,
  );

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        hidden={false}
        translucent
        backgroundColor="transparent"
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={LoggedInNavigator} />
        ) : (
          <Stack.Screen
            name="Login"
            component={AuthNavigator}
            options={{
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
