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
        height: 100,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: theme_1.theme.colors.primary
    },
    bottomSheetContainer: {
        flex: 7,
        backgroundColor: theme_1.theme.colors.primary,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headingTextContainer: {
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: 20,
        marginTop: 10
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
        height: 100,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    sheetContainer: {
        padding: 16,
        marginBottom: 20,
        flex: 1,
        alignItems: 'center'
    },
    sheetTitle: {
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Bold',
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
        width: '100%'
    },
    inputTextContainer: {
        marginTop: 6,
        width: '100%',
        marginBottom: 5,
        fontFamily: 'Inter-Regular',
        fontSize: 14
    },
    inputTextPlaceholder: {
        fontFamily: 'Inter-Regular',
        fontSize: 14
    },
    documentListContainer: {
        borderRadius: 4,
        width: '100%',
        borderWidth: 1,
        borderColor: '#A8ADAF',
        marginTop: 10,
        padding: 10
    },
    checkboxDocumentLabel: {
        fontSize: 14,
        fontFamily: 'RedHatDisplay-Regular',
        color: '#263238',
        padding: 5
    },
    checkboxFileLabel: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#A8ADAF',
        padding: 5
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
        borderRadius: 14,
        width: '100%',
        justifyContent: 'center'
    },
    buttonSubmitLabel: {
        color: '#F6F8FA',
        fontFamily: 'RedHatDisplay-Bold'
    },
    submitButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        height: 50,
        marginBottom: 10
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
        flex: 1,
        padding: 16,
        width: '100%'
    },
    serviceMenu: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginRight: 10,
        shadowRadius: 5,
        shadowOpacity: 0.4,
        shadowColor: theme_1.theme.colors.secondary
    },
    serviceMenuSelected: {
        flex: 1,
        backgroundColor: '#F6F8FA',
        borderRadius: 10,
        marginRight: 10,
        shadowRadius: 5,
        shadowOpacity: 0.4,
        shadowColor: theme_1.theme.colors.secondary,
        borderWidth: 3,
        borderColor: theme_1.theme.colors.secondary
    },
    serviceImageContainer: {
        flex: 3,
        marginTop: 10,
        padding: 10
    },
    serviceImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain'
    },
    serviceTextContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 10
    },
    serviceText: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 12
    },
    bottomSheetScrollView: {
        width: '100%',
        paddingBottom: 10
    },
    addSubServiceButton: {
        marginTop: 10,
        borderColor: theme_1.theme.colors.secondary,
        width: '100%',
        borderWidth: 1,
        borderRadius: 14,
        borderStyle: 'dotted',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10
    },
    addSubServiceText: {
        color: theme_1.theme.colors.secondary,
        fontFamily: 'Inter-Regular'
    },
    backgroundImageContainer: {
        flex: 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    backgroundImage: {
        marginBottom: 12,
        marginTop: 30,
        height: 300,
        resizeMode: 'contain'
    },
    subServiceListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        width: '100%',
        borderWidth: 1,
        borderColor: '#A8ADAF',
        marginTop: 10,
        padding: 10
    },
    subServiceText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#263238'
    },
    subServiceRemove: {
        padding: 0
    },
    inputImgTextContainer: {
        marginBottom: 5,
        padding: 5,
        fontSize: 12
    },
    documentLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    radioContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    radioInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 10,
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#A8ADAF'
    },
    buktiBayarContainer: {
        borderWidth: 1,
        borderColor: '#A8ADAF',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%'
    },
    buktiBayarHeaderText: {
        color: theme_1.theme.colors.placeholder,
        fontFamily: 'Inter-Bold',
        fontSize: 12
    },
    buktiBayarSubHeaderText: {
        color: theme_1.theme.colors.placeholder,
        fontFamily: 'Inter-Regular',
        fontSize: 10
    },
    spinnerTextStyle: {
        color: 'white',
        fontFamily: 'Inter-Thin',
        margin: 20,
        textAlign: 'center'
    }
});
exports["default"] = styles;
