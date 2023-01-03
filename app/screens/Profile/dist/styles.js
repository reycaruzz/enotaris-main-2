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
    profileInfoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 50,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 4, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: '#ffffff',
        paddingBottom: 20
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#D3DCE6',
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: -50
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
    headerText: {
        fontSize: 18,
        fontFamily: 'RedHatDisplay-Bold',
        color: theme_1.theme.colors.primary
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
    }
});
exports["default"] = styles;
