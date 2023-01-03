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
        width: '90%',
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
        marginTop: 10
    },
    profilImage: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover'
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
        height: 75,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    headingTextContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    bottomSheetContainer: {
        flex: 1,
        backgroundColor: theme_1.theme.colors.primary,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sheetContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        flex: 1,
        alignItems: 'center'
    },
    sheetTitle: {
        fontSize: 13,
        fontFamily: 'Inter-Bold',
        color: '#263238'
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
        alignItems: 'center'
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
    calendarContainer: {
        height: 90,
        alignItems: 'flex-start',
        width: '100%',
        padding: 5,
        borderRadius: 15,
        backgroundColor: theme_1.theme.colors.primary
    },
    calendarStrip: {
        height: '100%',
        width: '100%'
    },
    calendarHeaderStyle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Bold'
    },
    dateNumberStyle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Bold'
    },
    dateNameStyle: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'RedHatDisplay-Regular'
    },
    highlightDateNumberStyle: {
        color: theme_1.theme.colors.secondary,
        fontSize: 18,
        fontFamily: 'RedHatDisplay-Bold'
    },
    highlightDateNameStyle: {
        color: theme_1.theme.colors.secondary,
        fontSize: 14,
        fontFamily: 'RedHatDisplay-Bold'
    },
    serviceMenuContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: theme_1.theme.colors.primary
    },
    serviceMenu: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
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
        flex: 0.12,
        marginLeft: 10,
        padding: 5
    },
    serviceImage: {
        flex: 1,
        width: '90%',
        resizeMode: 'contain'
    },
    serviceTextContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 5
    },
    serviceText: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 14
    },
    jobListContainer: {
        flex: 4,
        width: '100%',
        alignItems: 'center'
    },
    titleListText: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 12
    },
    descriptionListText: {
        fontFamily: 'Inter-Regular',
        color: '#424242',
        fontSize: 11
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
        margin: 10,
        paddingHorizontal: 5
    },
    resumeTextColumn: {
        marginRight: 16
    },
    resumeContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginRight: 10,
        elevation: 5,
        paddingVertical: 10,
        height: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    resumeText: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 16
    },
    addJadwalButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme_1.theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    fab: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme_1.theme.colors.secondary,
        position: 'absolute',
        bottom: 10,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    addButtonText: {
        fontFamily: 'RedHatDisplay-Bold',
        color: theme_1.theme.colors.secondary,
        fontSize: 11
    },
    modalStyle: {
        height: 100
    },
    modalContentContainer: {
        elevation: 5,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginHorizontal: 10,
        borderRadius: 10
    },
    formContainer: {
        marginTop: 10
    },
    inputTextContainer: {
        marginTop: 6,
        width: '100%',
        marginBottom: 5,
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        height: 35
    },
    inputTextContainerMultiline: {
        marginTop: 6,
        width: '100%',
        marginBottom: 5,
        fontFamily: 'Inter-Regular',
        fontSize: 12
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
    datetimeDescriptionContainer: {
        width: 120,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    textRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    hourContainer: {
        borderColor: theme_1.theme.colors.placeholder,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10
    },
    hourText: {
        fontFamily: 'Inter-Bold',
        fontSize: 12,
        color: '#263238'
    },
    appointmentContainer: {
        borderRadius: 10,
        borderColor: theme_1.theme.colors.placeholder,
        height: 65
    }
});
exports["default"] = styles;
