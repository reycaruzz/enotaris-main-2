"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 227.71,
        height: 150,
        marginBottom: 12
    },
    background: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#3E7BFA',
        paddingTop: 20
    },
    headerText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff'
    },
    subHeaderText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#ffffff'
    },
    iconHeader: {
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingLeft: 15
    },
    textContainerHeader: {
        paddingTop: 10,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        padding: 16,
        width: '100%',
        height: 100,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    sheetContainer: {
        padding: 16,
        flex: 1,
        alignItems: 'center'
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#263238'
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F6F8FA',
        marginTop: 10,
        borderRadius: 10
    },
    searchIcon: {
        padding: 10
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#F6F8FA',
        color: '#424242',
        borderRadius: 10
    },
    listContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 10
    }
});
exports["default"] = styles;
