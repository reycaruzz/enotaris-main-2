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
        marginBottom: 12
    },
    background: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: theme_1.theme.colors.primary,
        paddingTop: 20
    },
    bottomSheetContainer: {
        flex: 7,
        backgroundColor: theme_1.theme.colors.primary,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sheetContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: '#FFFFFF',
        padding: 16,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        marginTop: 10,
        padding: 16,
        width: '100%',
        height: 100,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
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
        width: '100%',
        marginTop: 16,
        marginBottom: 10
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
        borderRadius: 14,
        width: '100%',
        justifyContent: 'center',
        borderColor: theme_1.theme.colors.secondary
    },
    buttonRetakeLabel: {
        color: theme_1.theme.colors.secondary,
        fontFamily: 'RedHatDisplay-Bold'
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
        marginBottom: 20
    },
    photoContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#263238',
        alignItems: 'center',
        borderRadius: 10
    },
    photoPreview: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 3
    },
    cameraIconPreview: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'center',
        width: '40%'
    }
});
exports["default"] = styles;
