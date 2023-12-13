import React, {FC, memo, useRef, useCallback, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';

import {FieldInput, PrimaryButton} from '../components';
import {strings} from '../i18n';
import {CommonNavigationProps} from '../types/navigationTypes';
import {constants, perfectSize} from '../core';
import FieldDropDown from '../components/FieldDropDown';
import {colors, commonStyles} from '../styles';
import {EditProfileValidationSchema} from '../core/formikValidationSchema';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {updateProfileAPI} from '../services/authServices';
import moment from 'moment';
import {
  // @ts-ignore
  openPicker,
} from '@baronha/react-native-multiple-image-picker';
import {PERMISSIONS} from 'react-native-permissions';
import {CheckPermission} from '../core/CheckPermission';
import {RequestPermission} from '../core/RequestPermission';
import FastImage from 'react-native-fast-image';
import {RootState} from '../redux';
import {useFocusEffect} from '@react-navigation/native';

const genderOptions = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

const initialValues = {
  full_name: '',
  email: '',
  country_code: '',
  mobile: '',
  gender: '',
  date_of_birth: '',
  category_id: '',
  company_name: '',
  about_me: '',
};
const fields = [
  'full_name',
  'email',
  'country_code',
  'mobile',
  'gender',
  'date_of_birth',
  'category_id',
  'company_name',
  'about_me',
];

const EditProfile: FC<CommonNavigationProps> = () => {
  const formikRef = useRef<any>(null);

  const fullnameRef = useRef<any>();
  const emailRef = useRef<any>();
  const phoneRef = useRef<any>();
  const hospitalNameRef = useRef<any>();
  const aboutMeRef = useRef<any>();

  const {countries: callingCodeData, category: categoryData} = useSelector(
    (state: RootState) => state.generic,
  );
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );
  const [image, setImage] = useState<any>('');

  useFocusEffect(
    useCallback(() => {
      setImage(profileData.profile_image);
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field === 'category_id' && profileData[field] === 0) {
          if (profileData[field] === 0) {
            initialValues.category_id = '';
          } else {
            initialValues.category_id = `${profileData[field]}`;
          }
        }
        if (field === 'date_of_birth' && profileData[field]) {
          const date = new Date(profileData[field]);
          initialValues.date_of_birth = `${moment(date).format('DD/MM/yyyy')}`;
        } else {
          initialValues[field] = profileData[field];
        }
      }
      formikRef.current.setValues(initialValues);
      // console.log('initialValues', initialValues);
      // console.log('profileData', profileData);
    }, [formikRef, profileData]),
  );

  const openImagePickerHandler = useCallback(() => {
    openPicker({
      mediaType: 'image',
      singleSelectedMode: true,
    })
      .then((res: any) => {
        setImage({name: res.fileName, type: res.mime, uri: res.path});
      })
      .catch((error: any) => {
        console.log('ERRROR  :: ', error);
      });
  }, []);

  const showAlertHandler = useCallback(() => {
    Alert.alert('', strings.goToSetting, [
      {text: strings.cancel, style: 'cancel'},
      {
        text: strings.openSetting,
        style: 'default',
        onPress: () => Linking.openSettings(),
      },
    ]);
  }, []);

  const permissionHandler = useCallback(async () => {
    const permissionsArray =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : [
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          ];

    const result = await CheckPermission(permissionsArray);
    console.log('RESULT CHECK PERMISSIOM ', result);
    switch (result) {
      case 0:
        const result1 = await RequestPermission(permissionsArray);
        console.log('RESULT REquest PERMISSIOM ', result1);
        switch (result1) {
          case 0:
            showAlertHandler();
            break;

          case 1:
            // main action
            openImagePickerHandler();
            break;

          case -1:
            //BLOCKED

            break;
        }
        break;

      case 1:
        openImagePickerHandler();
        break;

      case -1:
        //BLOCKED

        break;
    }
  }, [showAlertHandler, openImagePickerHandler]);

  const submitHandler = useCallback(
    (args: any) => {
      if (image) {
        updateProfileAPI({...args, profile_image: image});
      } else {
        updateProfileAPI(args);
      }
    },
    [image],
  );

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{...initialValues, user_type: profileData.user_type}}
      enableReinitialize={true}
      validationSchema={EditProfileValidationSchema}
      onSubmit={submitHandler}>
      {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          extraScrollHeight={0}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={false}
          contentContainerStyle={styles.root}>
          <Pressable onPress={permissionHandler} style={styles.profile}>
            {image ? (
              <FastImage
                source={{uri: image.uri ? image.uri : image}}
                style={styles.image}
                resizeMode="cover"
              />
            ) : null}
          </Pressable>

          {profileData.user_type === 3 ? (
            <View>
              <FieldDropDown
                defaultValue={values.category_id.toString()}
                data={categoryData}
                listMode="MODAL"
                onChangeValue={handleChange('category_id')}
                searchable={true}
                searchPlaceholder={strings.dropdownSearchPlaceholderCategory}
                label={strings.inputCategorylabel}
              />
              {errors.category_id && touched.category_id && (
                <Text style={commonStyles.errorText}>{errors.category_id}</Text>
              )}
            </View>
          ) : null}
          <FieldInput
            ref={fullnameRef}
            label={strings.inputFullnameLabel}
            value={values.full_name}
            onChangeText={handleChange('full_name')}
            onBlur={handleBlur('full_name')}
            blurOnSubmit={false}
            maxLength={35}
            onSubmitEditing={() => {
              emailRef.current.getfocus();
            }}
          />
          {errors.full_name && touched.full_name && (
            <Text style={commonStyles.errorText}>{errors.full_name}</Text>
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
            defaultValue={values.country_code}
            data={callingCodeData}
            listMode="MODAL"
            onChangeValue={handleChange('country_code')}
            searchable={true}
            searchPlaceholder={strings.dropdownSearchPlaceholderCallingCode}
            label={strings.inputCallingCodelabel}
          />
          {errors.country_code && touched.country_code && (
            <Text style={commonStyles.errorText}>{errors.country_code}</Text>
          )}

          <FieldInput
            ref={phoneRef}
            label={strings.inputPhonelabel}
            value={values.mobile}
            onChangeText={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            keyboardType="numeric"
            blurOnSubmit={false}
            maxLength={15}
            onSubmitEditing={() => {
              hospitalNameRef.current.getfocus();
            }}
          />
          {errors.mobile && touched.mobile && (
            <Text style={commonStyles.errorText}>{errors.mobile}</Text>
          )}

          <View style={{zIndex: perfectSize(100)}}>
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
          {profileData.user_type !== 3 ? (
            <>
              <FieldInput
                value={`${values.date_of_birth}`}
                label={strings.inputBirthdaylabel}
                blurOnSubmit={false}
                onChangeText={handleChange('date_of_birth')}
                type={constants.calendar}
                onBlur={() => {}}
              />
              {errors.date_of_birth && touched.date_of_birth && (
                <Text style={commonStyles.errorText}>
                  {errors.date_of_birth}
                </Text>
              )}
            </>
          ) : null}

          {profileData.user_type === 3 ? (
            <View>
              <FieldInput
                ref={hospitalNameRef}
                label={strings.inputHospitalnameLabel}
                value={values.company_name}
                onChangeText={handleChange('company_name')}
                onBlur={handleBlur('company_name')}
                blurOnSubmit={false}
                maxLength={35}
                onSubmitEditing={() => {
                  aboutMeRef.current.getfocus();
                }}
              />
              {errors.company_name && touched.company_name && (
                <Text style={commonStyles.errorText}>
                  {errors.company_name}
                </Text>
              )}
              <FieldInput
                ref={aboutMeRef}
                label={strings.inputAboutMeLabel}
                value={values.about_me}
                onChangeText={handleChange('about_me')}
                onBlur={handleBlur('about_me')}
                blurOnSubmit={true}
                maxLength={35}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
              />
              {errors.about_me && touched.about_me && (
                <Text style={commonStyles.errorText}>{errors.about_me}</Text>
              )}
            </View>
          ) : null}

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
export default memo(EditProfile);
const styles = StyleSheet.create({
  root: {
    paddingVertical: perfectSize(30),
    paddingHorizontal: perfectSize(20),
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    marginTop: perfectSize(50),
    marginBottom: perfectSize(20),
  },
  button: {
    alignSelf: 'center',
    marginTop: 50,
  },
  container: {
    flexDirection: 'row',
    gap: perfectSize(30),
    justifyContent: 'space-between',
    zIndex: perfectSize(100),
    flex: 1,
  },
  profile: {
    height: perfectSize(140),
    width: perfectSize(140),
    backgroundColor: colors.primaryGrey2,
    borderRadius: perfectSize(200),
    alignSelf: 'center',
    marginBottom: perfectSize(40),
  },
  image: {height: '100%', width: '100%', borderRadius: perfectSize(200)},
});
