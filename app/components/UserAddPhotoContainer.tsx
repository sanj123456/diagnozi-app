import React, {FC, useCallback, useRef} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';

import {perfectSize} from '../core';
import BulletButton from './BulletButton';
import PrimaryButton from './PrimaryButton';
import {strings} from '../i18n';
import {colors, commonStyles, fonts} from '../styles';
import UserAddPhotoImage from './UserAddPhotoImage';
import UserAddCommentInput from './UserAddCommentInput';
import UserAddCategory from './UserAddCategory';
import {userAddPhotoFormSchema} from '../core/formikValidationSchema';
import {UserAddPhotoContainerProps} from '../types/components';
import {useFocusEffect} from '@react-navigation/native';

const initialValues = {
  category: '',
  title: '',
  body: '',
};

const UserAddPhotoContainer: FC<UserAddPhotoContainerProps> = props => {
  const {currentPage, onPressCamera, onPress, backgroundImage, data, isEdit} =
    props;

  const categoryData = useSelector<any>(state => state.generic.category);
  const formikRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const bodyRef = useRef<any>(null);

  useFocusEffect(
    useCallback(() => {
      if (formikRef?.current) {
        formikRef.current.resetForm();
        formikRef.current.setErrors({});
        if (isEdit) {
          formikRef.current.setFieldValue(
            'category',
            `${data.category.id}`,
            true,
          );
          formikRef.current.setFieldValue('title', data.title, true);
          formikRef.current.setFieldValue('body', data.description, true);
        }
      }
      return () => {};
    }, [data, isEdit]),
  );

  const pressHandler = useCallback(
    (values?: any) => {
      if (currentPage === 1) {
        onPress();
      }
      if (currentPage === 2) {
        onPress(values);
      }
    },
    [onPress, currentPage],
  );

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={userAddPhotoFormSchema}
      onSubmit={pressHandler}>
      {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
        <View style={styles.root}>
          <Text style={styles.headingStyle}>
            {currentPage === 1
              ? isEdit
                ? strings.editYourPhoto
                : strings.addYourPhoto
              : isEdit
              ? strings.editYourComment
              : strings.addYourComment}
          </Text>

          <Text style={styles.textStyle}>
            {currentPage === 1 ? strings.takePhoto : strings.writeInDetail}
            {currentPage === 1 && (
              <Text style={[styles.textStyle, {color: colors.appSloganText}]}>
                {strings.dermatoscope}
              </Text>
            )}
          </Text>

          <View style={styles.containContainer}>
            {currentPage === 1 ? (
              <UserAddPhotoImage
                backgroundImage={backgroundImage}
                onPressCamera={onPressCamera}
              />
            ) : (
              <View>
                <UserAddCategory
                  defaultValue={values.category}
                  data={categoryData}
                  listMode="MODAL"
                  onChangeValue={handleChange('category')}
                  searchable={true}
                  searchPlaceholder={strings.dropdownSearchPlaceholderCategory}
                  label={strings.categoryInputlabel}
                />
                {errors.category && touched.category && (
                  <Text style={commonStyles.errorText}>{errors.category}</Text>
                )}
                <UserAddCommentInput
                  ref={titleRef}
                  label={strings.bodyPartInputlabel}
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  blurOnSubmit={false}
                  maxLength={35}
                  onSubmitEditing={() => {
                    bodyRef.current.getfocus();
                  }}
                />
                {errors.title && touched.title && (
                  <Text style={commonStyles.errorText}>{errors.title}</Text>
                )}
                <UserAddCommentInput
                  ref={bodyRef}
                  label={strings.worryInputlabel}
                  multiline={true}
                  value={values.body}
                  onChangeText={handleChange('body')}
                  onBlur={handleBlur('body')}
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
                {errors.body && touched.body && (
                  <Text style={commonStyles.errorText}>{errors.body}</Text>
                )}
              </View>
            )}
          </View>
          <BulletButton currentPage={currentPage} />
          <PrimaryButton
            title={currentPage === 1 ? strings.continue : strings.finish}
            style={[styles.button, {opacity: backgroundImage?.uri ? 1 : 0.5}]}
            onPress={currentPage === 1 ? pressHandler : handleSubmit}
            disabled={backgroundImage?.uri ? false : true}
          />
        </View>
      )}
    </Formik>
  );
};
export default UserAddPhotoContainer;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  containContainer: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    marginBottom: perfectSize(100),
  },
  headingStyle: {
    ...fonts.heading35,
  },
  textStyle: {
    ...fonts.regular12,
    marginTop: perfectSize(20),
    marginBottom: perfectSize(30),
  },
});
