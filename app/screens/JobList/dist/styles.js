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
        width: '100%',
        marginBottom: 20,
        resizeMode: 'contain'
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
        flex: 4,
        backgroundColor: theme_1.theme.colors.primary,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    titleScreen: {
        marginTop: 10
    },
    textContainerHeader: {
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        padding: 16,
        width: '100%',
        height: 70,
        alignSelf: 'flex-start',
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
        width: '100%',
        marginTop: 16,
        marginBottom: 10
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
        paddingLeft: 20,
        paddingRight: 20
    },
    documentScrollView: {
        width: '100%',
        flex: 1,
        paddingBottom: 50,
        paddingTop: 20,
        height: 60
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
        fontWeight: '700'
    },
    submitButtonContainer: {
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15
    },
    categoryListContainer: {
        flexDirection: 'row',
        height: 30,
        width: '100%'
    },
    categoryPill: {
        borderWidth: 1,
        borderColor: theme_1.theme.colors.secondary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        flex: 1,
        width: '100%',
        marginRight: 10
    },
    categoryText: {
        fontFamily: 'RedHatDisplay-Bold',
        color: theme_1.theme.colors.secondary
    },
    modalContentContainer: {
        flex: 1,
        alignItems: 'center'
    },
    headerModalText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#263238'
    },
    subHeaderModalText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#263238'
    },
    muteHeaderModalText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#A8ADAF',
        paddingTop: 5
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
    statusContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700'
    },
    documentLabelContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleListText: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 14
    },
    descriptionListText: {
        fontFamily: 'Inter-Regular',
        fontSize: 12
    },
    headerListContainer: {
        flex: 0.15,
        justifyContent: 'center',
        marginTop: 5
    },
    statusListTextWarning: {
        backgroundColor: '#FEEAD3',
        borderRadius: 5,
        padding: 2,
        fontFamily: 'Inter-Regular',
        fontSize: 10,
        color: theme_1.theme.colors.secondary,
        textAlign: 'center',
        overflow: 'hidden'
    },
    statusListTextInfo: {
        backgroundColor: '#D8E5FE',
        borderRadius: 5,
        padding: 2,
        fontFamily: 'Inter-Regular',
        fontSize: 10,
        color: '#3E7BFA',
        textAlign: 'center',
        overflow: 'hidden'
    },
    statusListTextSuccess: {
        backgroundColor: '#D1EADC',
        borderRadius: 5,
        padding: 2,
        fontFamily: 'Inter-Regular',
        fontSize: 10,
        color: theme_1.theme.colors.primary,
        textAlign: 'center',
        overflow: 'hidden'
    },
    iconStatus: {
        alignItems: 'center'
    },
    postDateTextContainer: {
        flex: 1,
        height: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        paddingRight: 10,
        borderRadius: 7,
        backgroundColor: '#E9EBEB'
    },
    postDateIcon: {
        marginRight: 0
    },
    postDateText: {
        fontFamily: 'Inter-Regular',
        fontSize: 11,
        color: '#677074'
    }
});
exports["default"] = styles;
