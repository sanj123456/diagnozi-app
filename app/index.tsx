import React, {FC, Fragment, useCallback, useEffect, useState} from 'react';
import {NativeModules, Platform, SafeAreaView} from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import {colors, commonStyles} from './styles';
import FlashMessage from 'react-native-flash-message';
import {Loader} from './components';
import {useDispatch} from 'react-redux';
import {getAsyncData} from './services';
import {constants} from './core';
import {setIsUploadStart, setProfileData} from './redux/modules/profileSlice';
import DummySplash from './modules/DummySplash';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {apiKeys} from './core/constants';
import {checkVerificationStatusAPI} from './services/authServices';
import {StripeProvider} from '@stripe/stripe-react-native';
import NotificationHandler from './components/NotificationHandler';

const App: FC = ({}) => {
  const dispatch = useDispatch();

  const [state, setState] = useState(false);

  const getUser = useCallback(async () => {
    const status = await getAsyncData(constants.isUploadStart);

    dispatch(setIsUploadStart(status));

    const user = await getAsyncData(constants.userData);
    if (user) {
      dispatch(setProfileData(user));

      if (user.user_type === 3) {
        checkVerificationStatusAPI();
      }
    }
  }, [dispatch]);

  useEffect(() => {
    getUser().then(() => {
      setState(true);
    });
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId: apiKeys.google.webClientId,
      iosClientId: apiKeys.google.iosClientId,
    });
  }, [getUser]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NativeModules.SplashScreenModule.hide();
    }
  }, []);

  return (
    <SafeAreaView style={commonStyles.mainView}>
      <StripeProvider
        publishableKey={apiKeys.stripe.publishableKey}
        threeDSecureParams={{
          backgroundColor: colors.white, // iOS only
          timeout: 5,
          label: {
            headingTextColor: colors.black,
            headingFontSize: 13,
          },
          navigationBar: {
            headerText: '3d secure',
          },
          footer: {
            // iOS only
            backgroundColor: colors.white,
          },
          submitButton: {
            backgroundColor: colors.black,
            borderRadius: 12,
            textColor: colors.white,
            textFontSize: 14,
          },
        }}>
        {state ? (
          <Fragment>
            <MainNavigator />
            <NotificationHandler />
          </Fragment>
        ) : (
          <DummySplash />
        )}
        <Loader />
      </StripeProvider>
      <FlashMessage duration={4000} color={colors.white} />
    </SafeAreaView>
  );
};

export default App;
