import { StyleSheet } from 'react-native';
import { theme } from 'app/core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  background: {
    height: 130,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  bottomSheetContainer: {
    flex: 4,
    backgroundColor: theme.colors.primary,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'RedHatDisplay-Bold',
    color: '#ffffff',
  },
  subHeaderText: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff',
    width: '100%',
  },
  iconHeader: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: -8,
    marginRight: 10,
    marginLeft: -12,
  },
  titleScreen: {
    marginTop: 10,
    width: '100%',
  },
  textContainerHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 16,
    width: '100%',
    height: 70,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  sheetContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 16,
    flex: 1,
    alignItems: 'center',
  },
  innerSheetContainer: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#263238',
  },

  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F6F8FA',
    marginTop: 10,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#F6F8FA',
    color: '#424242',
    borderRadius: 10,
  },
  listContainer: {
    flex: 14,
    width: '100%',
    paddingTop: 10,
  },
  inputTextContainer: {
    marginTop: 6,
    width: '100%',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    height: 35,
  },
  documentListContainer: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#A8ADAF',
    marginBottom: 20,
  },
  checkboxDocumentLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#263238',
  },
  checkboxFileLabel: {
    fontSize: 12,
    color: '#A8ADAF',
    padding: 16,
  },
  scrollListContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  documentScrollView: {
    width: '100%',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
  },
  buttonSubmit: {
    marginBottom: 10,
    height: 40,
    borderRadius: 14,
    width: '100%',
    justifyContent: 'center',
  },
  buttonSubmitLabel: {
    color: '#F6F8FA',
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 12,
  },
  submitButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  categoryListContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  categoryPill: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    flex: 1,
    width: '100%',
    marginRight: 10,
  },
  categoryText: {
    fontFamily: 'RedHatDisplay-Bold',
    color: theme.colors.secondary,
    fontSize: 11,
  },
  modalContentContainer: {
    height: 900,
    flex: 1,
    alignItems: 'center',
  },
  headerModalText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#263238',
  },
  subHeaderModalText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#263238',
  },
  muteHeaderModalText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'grey',
    paddingTop: 5,
  },
  emptyStateContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  emptyStateText: {
    paddingTop: 10,
    fontSize: 12,
  },
  searchbar: {
    borderRadius: 10,
    backgroundColor: '#F6F8FA',
    elevation: 0,
    shadowRadius: 0,
  },
  searchbarInput: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  titleListText: {
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 14,
  },
  descriptionListText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 10,
  },
  statusListText: {
    borderRadius: 5,
    padding: 2,
    fontFamily: 'Inter-Regular',
    fontSize: 9.5,
    textAlign: 'center',
    overflow: 'hidden',
  },
  statusListTextWarning: {
    backgroundColor: '#FEEAD3',
    borderRadius: 5,
    padding: 2,
    fontFamily: 'Inter-Regular',
    fontSize: 9.5,
    color: theme.colors.secondary,
    textAlign: 'center',
    overflow: 'hidden',
  },
  statusListTextInfo: {
    backgroundColor: '#D8E5FE',
    borderRadius: 5,
    padding: 2,
    fontFamily: 'Inter-Regular',
    fontSize: 9.5,
    color: '#3E7BFA',
    textAlign: 'center',
    overflow: 'hidden',
  },
  statusListTextSuccess: {
    backgroundColor: '#D1EADC',
    borderRadius: 5,
    padding: 2,
    fontFamily: 'Inter-Regular',
    fontSize: 9.5,
    color: theme.colors.primary,
    textAlign: 'center',
    overflow: 'hidden',
  },
  statusListTextDanger: {
    backgroundColor: '#FCD8D4',
    borderRadius: 5,
    padding: 2,
    fontFamily: 'Inter-Regular',
    fontSize: 9.5,
    color: '#FF616D',
    textAlign: 'center',
    overflow: 'hidden',
  },
  statusListTextMute: {
    backgroundColor: '#E9EBEB',
    borderRadius: 5,
    padding: 2,
    fontFamily: 'Inter-Regular',
    fontSize: 9.5,
    color: '#A8ADAF',
    textAlign: 'center',
    overflow: 'hidden',
  },
  headerListContainer: {
    flex: 1,
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
    backgroundColor: '#E9EBEB',
  },
  postDateIcon: {},
  postDateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#677074',
  },
  topListContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -25,
  },
  topTextContainer: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  documentLabelContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollTextContainerHeader: {
    paddingRight: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  requestItem: {
    flex: 0.12,
    marginTop: 10,
    marginRight: 10,
  },
  headerModalContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  editButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  editButtonText: {
    fontFamily: 'RedHatDisplay-Bold',
    color: theme.colors.secondary,
    fontSize: 11,
  },
});

export default styles;
