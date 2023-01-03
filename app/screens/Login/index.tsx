import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
import { theme } from 'app/core/theme';
import { ILoginState } from 'app/models/reducers/login';
import { ILoading as ILoadingReducer } from 'app/models/reducers/loading';
// import NavigationService from 'app/navigation/NavigationService';
import VersionCheck from 'react-native-version-check';

interface IState {
  loginReducer: ILoginState;
  loadingReducer: ILoadingReducer;
}

const Login: React.FC = () => {
  const [latestVersion, setLatestVersion] = useState('Tidak diketahui');
  const currentVersion = VersionCheck.getCurrentVersion();

  React.useEffect(() => {
    if (Platform.OS !== 'ios') {
      VersionCheck.getLatestVersion() // Automatically choose profer provider using `Platform.select` by device platform.
        .then((version) => {
          setLatestVersion(version);
        });
    }
  }, []);

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loader, setLoader] = React.useState(false);
  const [visibility, setVisibility] = useState(true);
  const isLoading = useSelector(
    (state: IState) => state.loadingReducer.isLoginLoading,
  );
  const dispatch = useDispatch();
  const onLogin = () => {
    dispatch(loginActions.requestLogin(email.value, password.value));
    if (isLoading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.imageLogo}
              source={require('../../assets/logo-green.png')}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Selamat Datang!</Text>
            <Text style={styles.subHeaderText}>
              Masukkan username dan password untuk login.
            </Text>
          </View>
        </View>
        <View style={styles.illustrationContainer}>
          <Image
            style={styles.illustrationImage}
            source={require('../../assets/illustrasi-login.png')}
          />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formInput}
            label="Username"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            spellCheck={false}
            left={
              <TextInput.Icon
                icon="account-outline"
                color={theme.colors.primary}
                style={{ paddingTop: 5 }}
              />
            }
            theme={{
              colors: {
                placeholder: theme.colors.placeholder,
                primary: theme.colors.primary,
                underlineColor: theme.colors.primary,
                background: 'transparent',
              },
            }}
          />
          <TextInput
            style={styles.formInput}
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry={!visibility}
            autoCapitalize="none"
            spellCheck={false}
            left={
              <TextInput.Icon
                icon="lock-outline"
                color={theme.colors.primary}
                style={{ paddingTop: 5 }}
              />
            }
            right={
              <TextInput.Icon
                icon={visibility ? 'eye-off-outline' : 'eye-outline'}
                color={theme.colors.primary}
                style={{ paddingTop: 5 }}
                onPress={() => {
                  setVisibility(!visibility);
                }}
              />
            }
            theme={{
              colors: {
                placeholder: theme.colors.placeholder,
                primary: theme.colors.primary,
                underlineColor: theme.colors.primary,
                background: 'transparent',
              },
            }}
          />
          <Button
            mode="contained"
            labelStyle={
              Platform.OS === 'ios'
                ? [styles.buttonSubmitLabel, { fontWeight: 'bold' }]
                : styles.buttonSubmitLabel
            }
            style={styles.roundedButton}
            loading={loader ? true : false}
            onPress={onLogin}>
            {loader ? 'Harap Tunggu...' : 'Login'}
          </Button>
        </View>
        {Platform.OS === 'android'
          ? [
              currentVersion === latestVersion ? (
                <View key={'uptodate'} style={styles.footerContainer}>
                  <Text style={styles.footerText}>Up-to-date</Text>
                  <Text style={styles.footerText}>
                    {'E-Notaris ' + currentVersion}
                  </Text>
                </View>
              ) : (
                <View key={'needupdate'} style={styles.footerContainer}>
                  <Text style={styles.footerText}>Need Update</Text>
                  <Text style={styles.footerText}>
                    {'E-Notaris ' + currentVersion}
                  </Text>
                  <Text style={styles.footerText}>
                    {'Latest Version ' + latestVersion}
                  </Text>
                </View>
              ),
            ]
          : null}
      </KeyboardAvoidingView>
    </>
  );
};
export default Login;
