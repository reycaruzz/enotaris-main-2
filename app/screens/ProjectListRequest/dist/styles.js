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
        backgroundColor: '#FFFFFF',
        borderColor: 'black',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minHeight: 180,
        maxHeight: '50%',
        paddingHorizontal: 15,
        marginBottom: 40
    },
    background: {
        height: 70,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: theme_1.theme.colors.primary,
        paddingBottom: 30
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
        fontSize: 14,
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
    bottomSheetContainer: {
        flex: 5,
        backgroundColor: theme_1.theme.colors.primary,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    sheetContainer: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: '#FFFFFF',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        flex: 2,
        width: '100%',
        alignItems: 'center',
        backgroundColor: theme_1.theme.colors.primary
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
    pullUpText: {
        paddingVertical: 10,
        fontSize: 12,
        fontFamily: 'RedHatDisplay-Bold'
    },
    headingTextContainer: {
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: 20,
        paddingBottom: 10
    },
    serviceMenuContainer: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        width: '100%'
    },
    serviceMenu: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.44,
        shadowRadius: 6.0,
        elevation: 16
    },
    serviceImageContainer: {
        flex: 2,
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
        width: 230,
        height: 52,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginRight: 5,
        paddingLeft: 10,
        backgroundColor: theme_1.theme.colors.secondary,
        borderRadius: 10
    },
    serviceResumeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    requestCountContainer: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    requestCount: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 22,
        color: '#FFFFFF'
    },
    serviceText: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 10
    },
    titleServiceText: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 11,
        color: '#FFFFFF'
    },
    subServiceText: {
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'left',
        flex: 1.6,
        width: '100%',
        paddingLeft: 3
    },
    subServiceTextBold: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'right',
        flex: 1
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
    imageContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    rowServiceMenuContainer: {
        height: 235,
        flexDirection: 'row',
        backgroundColor: theme_1.theme.colors.primary
    },
    detailServiceResumeContainer: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    statsServiceResumeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    urgentRequestContainer: {
        flexDirection: 'row',
        flex: 0.7,
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    urgentRequestItem: {
        borderRadius: 10,
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginRight: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    roundTextContainer: {
        backgroundColor: theme_1.theme.colors.primary,
        borderRadius: 100,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    roundTextTitle: {
        fontSize: 28,
        fontFamily: 'RedHatDisplay-Bold',
        color: '#FFFFFF'
    },
    headingResumeContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 15
    },
    headingResumeTitle: {
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
        color: '#FFFFFF'
    },
    backdropOpacity: {
        borderWidth: 1,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
});
exports["default"] = styles;
