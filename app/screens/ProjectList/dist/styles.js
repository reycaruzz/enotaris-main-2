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
        marginBottom: 30,
        resizeMode: 'contain',
        height: 120
    },
    imageBackground: {
        resizeMode: 'contain',
        flex: 0.35
    },
    background: {
        height: 220,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: theme_1.theme.colors.primary
    },
    headerMenuText: {
        fontSize: 18,
        fontFamily: 'RedHatDisplay-Bold',
        color: '#FFFFFF'
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'RedHatDisplay-Bold',
        color: '#263238'
    },
    titleHeaderText: {
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
        color: '#263238'
    },
    subHeaderText: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#515B60'
    },
    iconHeader: {
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginLeft: 10,
        borderWidth: 2
    },
    profileImageContainer: {
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        overflow: 'hidden',
        marginBottom: 20
    },
    profilImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover'
    },
    textContainerHeader: {
        paddingTop: 10,
        paddingHorizontal: 16,
        width: '100%',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        paddingVertical: 16,
        width: '100%',
        height: 70,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    bottomSheetContainer: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme_1.theme.colors.primary
    },
    sheetContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%'
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#263238',
        marginBottom: 10
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F6F8FA',
        marginTop: 10,
        borderRadius: 10,
        width: '100%'
    },
    iconInputContainer: {
        padding: 5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    searchIcon: {
        padding: 15
    },
    searchInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#F6F8FA',
        color: '#424242',
        borderRadius: 10,
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 5,
        alignItems: 'center',
        borderWidth: 1
    },
    searchbar: {
        borderRadius: 10,
        backgroundColor: '#F6F8FA',
        elevation: 0,
        shadowRadius: 0
    },
    searchbarInput: {
        fontSize: 14
    },
    searchbarContainer: {
        paddingHorizontal: 10,
        width: '100%'
    },
    emptyStateContainer: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    emptyStateTitle: {
        fontSize: 18,
        fontFamily: 'RedHatDisplay-Bold'
    },
    emptyStateText: {
        paddingTop: 10,
        fontSize: 12,
        fontFamily: 'Inter-Regular'
    },
    headingTextContainer: {
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: 20,
        paddingBottom: 10
    },
    serviceMenuContainer: {
        flexDirection: 'row',
        flex: 3,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        height: '100%'
    },
    serviceMenu: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginRight: 10,
        elevation: 5,
        shadowRadius: 5,
        shadowOpacity: 0.4
    },
    serviceImageContainer: {
        flex: 3,
        marginTop: 10,
        alignItems: 'center',
        padding: 8
    },
    serviceImageIconList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: -5
    },
    serviceImage: {
        flex: 1,
        width: 60,
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
    jobListContainer: {
        flex: 4,
        width: '100%',
        alignItems: 'center',
        paddingBottom: 10
    },
    titleListText: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 14
    },
    descriptionListText: {
        fontFamily: 'Inter-Regular',
        fontSize: 12
    },
    categoryListContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginHorizontal: 10
    },
    categoryPill: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        flex: 1,
        width: 120,
        marginRight: 10
    },
    categoryPillBordered: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        flex: 1,
        width: 120,
        marginRight: 10,
        borderWidth: 1,
        borderColor: theme_1.theme.colors.secondary
    },
    categoryText: {
        fontFamily: 'RedHatDisplay-Bold',
        color: theme_1.theme.colors.secondary,
        fontSize: 11
    },
    categoryItemContainer: {
        alignItems: 'center'
    },
    serviceImageList: {
        flex: 1,
        width: '90%',
        resizeMode: 'contain'
    },
    topListContainer: {
        width: 50,
        paddingHorizontal: 5
    },
    headerListContainer: {
        flex: 0.15,
        justifyContent: 'center',
        marginTop: 3
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
    modalContentContainer: {
        flex: 1,
        alignItems: 'center'
    },
    headerModalText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#263238'
    },
    subHeaderModalText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#263238'
    },
    muteHeaderModalText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#A8ADAF',
        paddingTop: 5
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
        height: 120
    },
    documentListContainer: {
        borderRadius: 4,
        width: '100%',
        borderWidth: 1,
        borderColor: '#A8ADAF',
        marginTop: 10,
        padding: 10
    },
    documentLabelContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
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
    deadlineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#A8ADAF',
        padding: 10,
        marginVertical: 5
    }
});
exports["default"] = styles;
