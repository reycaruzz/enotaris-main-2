"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1
    },
    statsContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    statsBox: {
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontFamily: 'HelveticaNeue',
        color: '#52575D'
    },
    subText: {
        fontSize: 12,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    dashboardText: {
        fontSize: 16,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    profileScene: {
        backgroundColor: '#41444B'
    }
});
exports["default"] = styles;
