import React, {FC, useCallback, memo, useRef, useEffect} from 'react';
import {Keyboard, Platform, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';

import {
  AuthLayout,
  AuthSocialPlatforms,
  FieldInput,
  PrimaryButton,
} from '../components';
import {strings} from '../i18n';
import AuthFooter from '../components/AuthFooter';
import {CommonNavigationProps} from '../types/navigationTypes';
import {constants, perfectSize, screenName} from '../core';
import FieldDropDown from '../components/FieldDropDown';
import {commonStyles} from '../styles';
import {registerValidationSchema} from '../core/formikValidationSchema';
import {categoryAPI, countriesAPI, getAsyncData, signpAPI} from '../services';

const genderOptions = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

const initialValues = {
  fullName: '',
  email: '',
  callingCode: '',
  phoneNo: '',
  gender: '',
  dateOfBirth: '',
  category: '',
  hospitalName: '',
  password: '',
  confirmPassword: '',
};

const Signup: FC<CommonNavigationProps> = props => {
  const {navigation, route} = props;
  const routeParams = route.params;

  const fullnameRef = useRef<any>();
  const emailRef = useRef<any>();
  const phoneRef = useRef<any>();
  const hospitalNameRef = useRef<any>();
  const passwordRef = useRef<any>();
  const confirmPasswordRef = useRef<any>();
  const callingCodeData = useSelector<any>(state => state.generic.countries);
  const categoryData = useSelector<any>(state => state.generic.category);

  const formikRef = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (formikRef?.current) {
        formikRef.current.resetForm();
        formikRef.current.setErrors({});
      }
    });
    return unsubscribe;
  }, [navigation]);

  const signupHandler = useCallback(
    async (args: any) => {
      const fcmToken = await getAsyncData(constants.asyncFcmToken);
      signpAPI({
        user_type: routeParams.user_type,
        full_name: args.fullName,
        email: args.email,
        mobile: args.phoneNo,
        password: args.password,
        country_code: args.callingCode,
        company_name: args.hospitalName,
        gender: args.gender,
        date_of_birth: args.dateOfBirth,
        category: args.category,
        device_token: fcmToken,
        device_type:
          Platform.OS === 'android' ? 1 : Platform.OS === 'ios' ? 2 : 0,
      });
    },
    [routeParams],
  );

  const loginHandler = useCallback(() => {
    navigation.navigate(screenName.login);
  }, [navigation]);

  const fetchCallingCodeApi = useCallback(async () => {
    countriesAPI();
    categoryAPI();
  }, []);

  useEffect(() => {
    fetchCallingCodeApi();
  }, [fetchCallingCodeApi]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{...initialValues, user_type: routeParams.user_type}}
      validationSchema={registerValidationSchema}
      onSubmit={signupHandler}>
      {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
        <AuthLayout
          title={
            routeParams.user_type === 3
              ? strings.doctorSignUpMsg
              : strings.userSignUpMsg
          }
          style={styles.root}>
          <FieldInput
            ref={fullnameRef}
            label={strings.inputFullnameLabel}
            value={values.fullName}
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            blurOnSubmit={false}
            maxLength={35}
            onSubmitEditing={() => {
              emailRef.current.getfocus();
            }}
          />
          {errors.fullName && touched.fullName && (
            <Text style={commonStyles.errorText}>{errors.fullName}</Text>
          )}
          <FieldInput
            ref={emailRef}
            label={strings.inputEmailLabel}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            blurOnSubmit={false}
            maxLength={35}
            onSubmitEditing={() => {
              phoneRef.current.getfocus();
            }}
          />
          {errors.email && touched.email && (
            <Text style={commonStyles.errorText}>{errors.email}</Text>
          )}

          <FieldDropDown
            defaultValue={values.callingCode}
            data={callingCodeData}
            listMode="MODAL"
            onChangeValue={handleChange('callingCode')}
            searchable={true}
            searchPlaceholder={strings.dropdownSearchPlaceholderCallingCode}
            label={strings.inputCallingCodelabel}
          />
          {errors.callingCode && touched.callingCode && (
            <Text style={commonStyles.errorText}>{errors.callingCode}</Text>
          )}

          <FieldInput
            ref={phoneRef}
            label={strings.inputPhonelabel}
            value={values.phoneNo}
            onChangeText={handleChange('phoneNo')}
            onBlur={handleBlur('phoneNo')}
            keyboardType="numeric"
            blurOnSubmit={false}
            maxLength={15}
            onSubmitEditing={() => {
              hospitalNameRef.current.getfocus();
            }}
          />
          {errors.phoneNo && touched.phoneNo && (
            <Text style={commonStyles.errorText}>{errors.phoneNo}</Text>
          )}

          <View style={styles.container}>
            <View style={commonStyles.flex}>
              <FieldDropDown
                defaultValue={values.gender}
                data={genderOptions}
                onChangeValue={handleChange('gender')}
                searchable={false}
                label={strings.inputGenderlabel}
                listMode="SCROLLVIEW"
              />
              {errors.gender && touched.gender && (
                <Text style={commonStyles.errorText}>{errors.gender}</Text>
              )}
            </View>
            {routeParams.user_type !== 3 ? (
              <>
                <View style={commonStyles.flex}>
                  <FieldInput
                    label={strings.inputBirthdaylabel}
                    blurOnSubmit={false}
                    onChangeText={handleChange('dateOfBirth')}
                    type={constants.calendar}
                    onBlur={() => {}}
                  />
                  {errors.dateOfBirth && touched.dateOfBirth && (
                    <Text style={commonStyles.errorText}>
                      {errors.dateOfBirth}
                    </Text>
                  )}
                </View>
              </>
            ) : null}
          </View>
          {routeParams.user_type === 3 ? (
            <View>
              <FieldDropDown
                defaultValue={values.category}
                data={categoryData}
                listMode="MODAL"
                onChangeValue={handleChange('category')}
                searchable={true}
                searchPlaceholder={strings.dropdownSearchPlaceholderCategory}
                label={strings.inputCategorylabel}
              />
              {errors.category && touched.category && (
                <Text style={commonStyles.errorText}>{errors.category}</Text>
              )}
              <FieldInput
                ref={hospitalNameRef}
                label={strings.inputHospitalnameLabel}
                value={values.hospitalName}
                onChangeText={handleChange('hospitalName')}
                onBlur={handleBlur('hospitalName')}
                blurOnSubmit={false}
                maxLength={35}
                onSubmitEditing={() => {
                  passwordRef.current.getfocus();
                }}
              />
              {errors.hospitalName && touched.hospitalName && (
                <Text style={commonStyles.errorText}>
                  {errors.hospitalName}
                </Text>
              )}
            </View>
          ) : null}
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
          <View style={styles.contentContainer}>
            <PrimaryButton
              style={styles.button}
              title={strings.obSignUp}
              onPress={handleSubmit}
            />
            <AuthSocialPlatforms {...props} />
          </View>
          <AuthFooter type={constants.signup} onPress={loginHandler} />
        </AuthLayout>
      )}
    </Formik>
  );
};
export default memo(Signup);
const styles = StyleSheet.create({
  root: {
    paddingVertical: perfectSize(30),
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: perfectSize(50),
    marginBottom: perfectSize(20),
  },
  button: {
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    gap: perfectSize(30),
    justifyContent: 'space-between',
    zIndex: perfectSize(100),
    flex: 1,
  },
});
