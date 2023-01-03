"use strict";
exports.__esModule = true;
var react_native_1 = require("react-native");
var theme_1 = require("app/core/theme");
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    text: {
        fontFamily: 'HelveticaNeue'
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover'
    },
    subText: {
        fontSize: 12,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    infoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    dividerContainer: {
        width: '85%',
        height: 20,
        borderBottomColor: '#E9EEF3',
        borderBottomWidth: 3
    },
    statsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 32,
        marginBottom: 10
    },
    statsBox: {
        alignItems: 'center',
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 10
    },
    settings: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 15,
        fontSize: 16
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: '#CABFAB',
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    button: {
        margin: 10,
        height: 45,
        justifyContent: 'center'
    },
    buttonLabel: {
        fontFamily: 'RedHatDisplay-Bold'
    },
    subHeaderText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
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
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        padding: 16,
        width: '100%',
        height: 60,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    menuContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 20
    },
    listMenuContainer: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 4, height: 2 },
        shadowRadius: 10,
        elevation: 2,
        backgroundColor: '#ffffff'
    },
    iconMenu: {
        paddingBottom: 5,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginRight: 10
    },
    menuText: {
        fontSize: 14,
        fontFamily: 'RedHatDisplay-Bold',
        color: '#515B60',
        paddingTop: 2
    },
    buttonLogout: {
        margin: 10,
        height: 45,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 40,
        borderWidth: 1
    },
    buttonLogoutLabel: {
        color: theme_1.theme.colors.secondary,
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 18
    },
    logoutButtonContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
        alignItems: 'center',
        marginBottom: 30
    },
    logoutButton: {
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: theme_1.theme.colors.secondary,
        paddingVertical: 10,
        alignItems: 'center'
    },
    biodataContainer: {
        flexDirection: 'column',
        flex: 1,
        width: '90%',
        justifyContent: 'flex-start'
    },
    biodataInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    biodataKeyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    biodataValueContainer: {
        flex: 1
    },
    biodataKeyText: {
        color: '#515B60',
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        marginBottom: 5
    },
    biodataValueText: {
        color: '#263238',
        fontSize: 12,
        fontFamily: 'Inter-Bold',
        marginBottom: 5
    },
    modalContentContainer: {
        elevation: 5,
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10
    },
    formContainer: {
        marginTop: 10
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
        height: 50
    },
    inputTextContainer: {
        marginTop: 10
    },
    resumeContainer: {
        height: 95,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal: 5,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#D3DCE6',
        overflow: 'hidden',
        marginHorizontal: 5
    },
    userDetailText: {
        fontSize: 10,
        fontFamily: 'Inter-Regular'
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 10,
        paddingHorizontal: 5
    },
    profileInfoContainer: {
        flex: 1,
        marginLeft: 10
    },
    taskList: {
        width: '100%'
    },
    rowProfileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    requestCountContainer: {
        alignItems: 'center',
        width: 50
    },
    resumeDetailText: {
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 12
    },
    resumeTextContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        paddingHorizontal: 5,
        paddingBottom: 5
    },
    resumeText: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 14
    },
    resumeDetailTextContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 20,
        marginHorizontal: 5
    },
    postDateIcon: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 2
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
    sheetTitle: {
        fontSize: 12,
        fontFamily: 'RedHatDisplay-Bold',
        color: '#263238'
    },
    headerText: {
        fontSize: 18,
        fontFamily: 'RedHatDisplay-Bold',
        color: '#263238'
    },
    pengumumanContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    pengumumanContentContainer: {
        flex: 1,
        minHeight: 30,
        justifyContent: 'center',
        paddingBottom: 5
    },
    pengumumanFooterContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-between'
    },
    pengumumanFooterText: {
        fontSize: 10,
        color: theme_1.theme.colors.placeholder
    },
    statusListContainerWarning: {
        paddingHorizontal: 5,
        backgroundColor: '#FEEAD3',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    statusListTextWarning: {
        // backgroundColor: '#FEEAD3',
        // borderBottomRightRadius: 5,
        // borderBottomLeftRadius: 5,
        padding: 2,
        fontFamily: 'Inter-Regular',
        fontSize: 10,
        color: theme_1.theme.colors.secondary,
        textAlign: 'center',
        overflow: 'hidden'
    },
    statusListContainerSuccess: {
        paddingHorizontal: 5,
        backgroundColor: '#D1EADC',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    statusListTextSuccess: {
        // backgroundColor: '#D1EADC',
        // borderBottomRightRadius: 5,
        // borderBottomLeftRadius: 5,
        padding: 2,
        fontFamily: 'Inter-Regular',
        fontSize: 10,
        color: theme_1.theme.colors.primary,
        textAlign: 'center',
        overflow: 'hidden'
    },
    statusListContainerDanger: {
        paddingHorizontal: 5,
        backgroundColor: '#FCD8D4',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    statusListTextDanger: {
        // backgroundColor: '#FCD8D4',
        // borderBottomRightRadius: 5,
        // borderBottomLeftRadius: 5,
        marginHorizontal: 2,
        padding: 2,
        fontFamily: 'Inter-Regular',
        fontSize: 9.5,
        color: '#FF616D',
        textAlign: 'center',
        overflow: 'hidden'
    },
    descriptionListText: {
        fontFamily: 'Inter-Light',
        fontSize: 10
    },
    addJadwalButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme_1.theme.colors.secondary,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    addButtonText: {
        fontFamily: 'RedHatDisplay-Bold',
        color: theme_1.theme.colors.secondary,
        fontSize: 11
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 16
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'RedHatDisplay-Bold',
        color: '#263238'
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
    serviceMenuContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        marginLeft: 5
    },
    resumeTextColumn: {
        height: 40,
        width: 100,
        justifyContent: 'space-between'
    },
    verticleLine: {
        height: '90%',
        width: 1,
        marginRight: 20,
        backgroundColor: '#909090'
    }
});
exports["default"] = styles;
