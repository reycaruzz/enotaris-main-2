import { StyleSheet } from 'react-native';
import { theme } from 'app/core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    flex: 1.5,
  },
  formContainer: {
    flex: 3,
    width: '80%',
    backgroundColor: '#FFFFFF',
  },
  formInput: {
    fontWeight: 'normal',
    fontFamily: 'RedHatDisplay-Bold',
  },
  logoContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
  },
  imageLogo: {
    height: '100%',
    resizeMode: 'contain',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'RedHatDisplay-Bold',
  },
  subHeaderText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  illustrationImage: {
    resizeMode: 'contain',
    flex: 1,
    marginBottom: 10,
  },
  roundedButton: {
    borderRadius: 12,
    marginTop: 20,
    height: 45,
    width: '100%',
    justifyContent: 'center',
  },
  buttonSubmitLabel: {
    color: '#F6F8FA',
    fontFamily: 'RedHatDisplay-Bold',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: theme.colors.placeholder,
  },
});

export default styles;
