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
var React = require("react");
var native_1 = require("@react-navigation/native");
var stack_1 = require("@react-navigation/stack");
var react_redux_1 = require("react-redux");
var NavigationService_1 = require("./NavigationService");
var Login_1 = require("app/screens/Login");
var Home_1 = require("app/screens/Home");
var JobList_1 = require("app/screens/JobList");
var ProjectListRequest_1 = require("app/screens/ProjectListRequest");
var ProjectList_1 = require("app/screens/ProjectList");
var RequestList_1 = require("app/screens/RequestList");
var UploadPhoto_1 = require("app/screens/UploadPhoto");
var CreateRequest_1 = require("app/screens/CreateRequest");
var Profile_1 = require("app/screens/Profile");
var SearchList_1 = require("app/screens/SearchList");
var Report_1 = require("app/screens/Report");
var DetailPegawai_1 = require("app/screens/DetailPegawai");
// import ThemeController from '../components/ThemeController';
var react_native_1 = require("react-native");
var Stack = stack_1.createStackNavigator();
var AuthStack = stack_1.createStackNavigator();
var LoggedInStack = stack_1.createStackNavigator();
var homeOptions = {
    title: 'Home',
    headerTitleStyle: {
        fontWeight: 'bold'
    }
};
var detailOptions = function (_a) {
    var navigation = _a.navigation;
    return ({
        title: 'Detail',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerLeft: function (props) { return (React.createElement(stack_1.HeaderBackButton, __assign({}, props, { onPress: function () { return navigation.goBack(null); } }))); }
    });
};
var createOptions = function (_a) {
    var navigation = _a.navigation;
    return ({
        title: 'Create Request',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerLeft: function (props) { return (React.createElement(stack_1.HeaderBackButton, __assign({}, props, { onPress: function () { return navigation.goBack(null); } }))); }
    });
};
var profileOptions = function (_a) {
    var navigation = _a.navigation;
    return ({
        title: 'Profile',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerLeft: function (props) { return (React.createElement(stack_1.HeaderBackButton, __assign({}, props, { onPress: function () { return navigation.goBack(null); } }))); }
    });
};
var AuthNavigator = function () {
    var isLoggedIn = react_redux_1.useSelector(function (state) { return state.loginReducer.isLoggedIn; });
    return (React.createElement(AuthStack.Navigator, { screenOptions: { headerShown: false } },
        React.createElement(Stack.Screen, { name: "Login", component: Login_1["default"], options: {
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: isLoggedIn ? 'push' : 'pop'
            } })));
};
var LoggedInNavigator = function () { return (React.createElement(LoggedInStack.Navigator, { screenOptions: { headerShown: false } },
    React.createElement(Stack.Screen, { name: "Home", component: Home_1["default"], options: homeOptions }),
    React.createElement(Stack.Screen, { name: "CreateRequest", component: CreateRequest_1["default"], options: createOptions }),
    React.createElement(Stack.Screen, { name: "JobList", component: JobList_1["default"], options: detailOptions }),
    React.createElement(Stack.Screen, { name: "RequestList", component: RequestList_1["default"], options: detailOptions }),
    React.createElement(Stack.Screen, { name: "ProjectListRequest", component: ProjectListRequest_1["default"], options: detailOptions }),
    React.createElement(Stack.Screen, { name: "ProjectList", component: ProjectList_1["default"], options: detailOptions }),
    React.createElement(Stack.Screen, { name: "UploadPhoto", component: UploadPhoto_1["default"], options: detailOptions }),
    React.createElement(Stack.Screen, { name: "Profile", component: Profile_1["default"], options: profileOptions }),
    React.createElement(Stack.Screen, { name: "SearchList", component: SearchList_1["default"], options: detailOptions }),
    React.createElement(Stack.Screen, { name: "Report", component: Report_1["default"], options: detailOptions }),
    React.createElement(Stack.Screen, { name: "DetailPegawai", component: DetailPegawai_1["default"], options: detailOptions }))); };
var App = function (props) {
    var theme = props.theme;
    var isLoggedIn = react_redux_1.useSelector(function (state) { return state.loginReducer.isLoggedIn; });
    return (React.createElement(native_1.NavigationContainer, { ref: NavigationService_1.navigationRef, theme: theme },
        React.createElement(react_native_1.StatusBar, { barStyle: theme.dark ? 'light-content' : 'dark-content', hidden: false, translucent: true, backgroundColor: "transparent" }),
        React.createElement(Stack.Navigator, { screenOptions: { headerShown: false } }, isLoggedIn ? (React.createElement(Stack.Screen, { name: "Home", component: LoggedInNavigator })) : (React.createElement(Stack.Screen, { name: "Login", component: AuthNavigator, options: {
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: isLoggedIn ? 'push' : 'pop'
            } })))));
};
exports["default"] = App;
