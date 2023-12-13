import React, {FC, memo, useCallback, useEffect, useRef} from 'react';
import {Keyboard, Platform, StyleSheet, Text, View} from 'react-native';

import {
  AuthLayout,
  AuthSocialPlatforms,
  FieldInput,
  PrimaryButton,
} from '../components/index';
import {CommonNavigationProps} from '../types/navigationTypes';
import {strings} from '../i18n';
import AuthFooter from '../components/AuthFooter';
import {constants, perfectSize, screenName} from '../core';
import {Formik} from 'formik';
import {loginValidationSchema} from '../core/formikValidationSchema';
import {commonStyles} from '../styles';
import {getAsyncData, loginAPI} from '../services';

const initialValues = {
  email: '',
  password: '',
};

const Login: FC<CommonNavigationProps> = props => {
  const {navigation} = props;
  const formikRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (formikRef?.current) {
        formikRef.current.resetForm();
        formikRef.current.setErrors({});
      }
    });
    return unsubscribe;
  }, [navigation]);

  const loginHandler = useCallback(async (args: any) => {
    const fcmToken = await getAsyncData(constants.asyncFcmToken);
    loginAPI({
      phoneoremail: args.email,
      password: args.password,
      device_token: fcmToken,
      device_type:
        Platform.OS === 'android' ? 1 : Platform.OS === 'ios' ? 2 : 0,
    });
  }, []);

  const signHandler = useCallback(() => {
    navigation.navigate(screenName.profileselectscreen);
  }, [navigation]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={loginHandler}>
      {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
        <AuthLayout title={strings.loginMsg} style={styles.root}>
          <View style={commonStyles.flex}>
            <FieldInput
              ref={emailRef}
              label={strings.inputEmailLabel}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              blurOnSubmit={false}
              maxLength={35}
              onSubmitEditing={() => {
                passwordRef.current.getfocus();
              }}
            />
            {errors.email && touched.email && (
              <Text style={commonStyles.errorText}>{errors.email}</Text>
            )}
            <FieldInput
              ref={passwordRef}
              label={strings.inputPasswordLabel}
              type={constants.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              blurOnSubmit={true}
              maxLength={35}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
            {errors.password && touched.password && (
              <Text style={commonStyles.errorText}>{errors.password}</Text>
            )}
          </View>
          <View style={styles.contentContainer}>
            <PrimaryButton
              style={styles.button}
              title={strings.obLoginIn}
              onPress={handleSubmit}
            />
            <AuthSocialPlatforms {...props} />
          </View>
          <AuthFooter type="login" onPress={signHandler} />
        </AuthLayout>
      )}
    </Formik>
  );
};
export default memo(Login);
const styles = StyleSheet.create({
  root: {
    paddingVertical: perfectSize(30),
    flex: 1,
  },
  contentContainer: {
    marginTop: perfectSize(50),
    marginBottom: perfectSize(20),
    // flex: 1,
  },
  button: {
    alignSelf: 'center',
  },
});
