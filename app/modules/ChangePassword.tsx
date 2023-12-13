import React, {FC, useRef, useCallback, useEffect, memo} from 'react';
import {Text, Keyboard, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {colors, commonStyles} from '../styles';
import {Formik} from 'formik';
import {changePasswordSchema} from '../core/formikValidationSchema';
import {FieldInput, PrimaryButton} from '../components';
import {strings} from '../i18n';
import {constants, perfectSize} from '../core';
import {CommonNavigationProps} from '../types/navigationTypes';
import {changePasswordAPI} from '../services/authServices';

const initialValues = {
  currentPassword: '',
  password: '',
  confirmPassword: '',
};

const ChangePassword: FC<CommonNavigationProps> = props => {
  const {navigation} = props;

  const formikRef = useRef<any>(null);
  const currentPasswordRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (formikRef?.current) {
        formikRef.current.resetForm();
        formikRef.current.setErrors({});
      }
    });
    return unsubscribe;
  }, [navigation]);

  const changePasswordHandler = useCallback(async (args: any) => {
    const result = await changePasswordAPI({
      old_password: args.currentPassword,
      new_password: args.password,
    });
    if (result === 1) {
      formikRef.current.resetForm();
      formikRef.current.setErrors({});
    }
  }, []);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={changePasswordSchema}
      onSubmit={changePasswordHandler}>
      {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          style={styles.root}>
          <FieldInput
            ref={currentPasswordRef}
            label={strings.inputCurrentPasswordLabel}
            type={constants.password}
            value={values.currentPassword}
            onChangeText={handleChange('currentPassword')}
            onBlur={handleBlur('currentPassword')}
            blurOnSubmit={false}
            maxLength={35}
            onSubmitEditing={() => {
              passwordRef.current.getfocus();
            }}
          />
          {errors.currentPassword && touched.currentPassword && (
            <Text style={commonStyles.errorText}>{errors.currentPassword}</Text>
          )}

          <FieldInput
            ref={passwordRef}
            label={strings.inputPasswordLabel}
            type={constants.password}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            blurOnSubmit={false}
            maxLength={35}
            onSubmitEditing={() => {
              confirmPasswordRef.current.getfocus();
            }}
          />
          {errors.password && touched.password && (
            <Text style={commonStyles.errorText}>{errors.password}</Text>
          )}
          <FieldInput
            ref={confirmPasswordRef}
            type={constants.password}
            label={strings.inputConfirmPasswordLabel}
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            blurOnSubmit={true}
            maxLength={35}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Text style={commonStyles.errorText}>{errors.confirmPassword}</Text>
          )}
          <PrimaryButton
            style={styles.button}
            title={strings.obSubmit}
            onPress={handleSubmit}
          />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};
export default memo(ChangePassword);
const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: perfectSize(33),
    paddingTop: perfectSize(70),
    paddingBottom: perfectSize(100),
  },
  button: {
    alignSelf: 'center',
    marginTop: perfectSize(40),
  },
});
