"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var theme_1 = require("app/core/theme");
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 227.71,
        height: 150,
        marginBottom: 12,
        resizeMode: 'contain'
    },
    background: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: theme_1.theme.colors.primary
    },
    bottomSheetContainer: {
        flex: 5,
        backgroundColor: theme_1.theme.colors.primary,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headingTextContainer: {
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: 20
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Bold',
        color: '#ffffff'
    },
    subHeaderText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#ffffff'
    },
    iconHeader: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: -8,
        marginRight: 10,
        marginLeft: -12
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
        height: 80,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    sheetContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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
    },
    inputTextContainer: {
        marginTop: 6,
        width: '100%',
        marginBottom: 5
    },
    documentListContainer: {
        borderRadius: 4,
        width: '100%',
        borderWidth: 1,
        borderColor: '#A8ADAF',
        marginBottom: 20
    },
    checkboxDocumentLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#263238'
    },
    checkboxFileLabel: {
        fontSize: 12,
        color: '#A8ADAF',
        padding: 16
    },
    scrollListContainer: {
        width: '100%',
        flex: 1,
        paddingTop: 20,
        borderRadius: 10
    },
    documentScrollView: {
        width: '100%',
        flex: 1,
        marginBottom: 20,
        paddingBottom: 50,
        paddingTop: 20
    },
    buttonSubmit: {
        margin: 10,
        height: 45,
        width: '100%',
        justifyContent: 'center'
    },
    buttonSubmitLabel: {
        color: '#F6F8FA',
        fontWeight: '700'
    },
    submitButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        height: 50
    },
    pickerContainer: {
        marginTop: 10,
        marginBottom: 5,
        padding: 3,
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#A8ADAF',
        backgroundColor: '#F6F8FA'
    },
    typePicker: {
        width: '100%'
    },
    serviceMenuContainer: {
        flexDirection: 'row',
        height: 30,
        padding: 16,
        width: '100%'
    },
    serviceMenu: {
        flex: 1,
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginRight: 10,
        shadowRadius: 5,
        shadowOpacity: 0.4,
        shadowColor: theme_1.theme.colors.secondary
    },
    serviceMenuSelected: {
        flex: 1,
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginRight: 10,
        shadowRadius: 5,
        shadowOpacity: 0.4,
        shadowColor: theme_1.theme.colors.secondary,
        borderWidth: 3,
        borderColor: theme_1.theme.colors.secondary
    },
    serviceImageContainer: {
        flex: 1,
        padding: 10
    },
    serviceImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover'
    },
    serviceTextContainer: {
        alignItems: 'center',
        margin: 10
    },
    serviceText: {
        fontWeight: '700',
        fontSize: 12
    },
    addSubServiceButton: {
        marginTop: 10,
        borderColor: theme_1.theme.colors.secondary,
        width: '100%',
        borderWidth: 1,
        borderRadius: 14,
        borderStyle: 'dotted',
        alignItems: 'center',
        padding: 10
    },
    addSubServiceText: {
        color: theme_1.theme.colors.secondary,
        fontWeight: '700'
    },
    emptyStateContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '700'
    },
    emptyStateText: {
        paddingTop: 10,
        fontSize: 12
    },
    searchbar: {
        borderRadius: 10,
        backgroundColor: '#F6F8FA',
        elevation: 0,
        shadowRadius: 0
    },
    searchbarInput: {
        fontSize: 14,
        fontFamily: 'Inter-Regular'
    },
    listText: {
        fontFamily: 'RedHatDisplay-Regular'
    }
});
exports["default"] = styles;
