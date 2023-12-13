import React, {FC, useRef, useCallback, useEffect, memo} from 'react';
import {Text, Keyboard, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {colors, commonStyles} from '../styles';
import {Formik} from 'formik';
import {withdrawRequestSchema} from '../core/formikValidationSchema';
import {FieldInput, PrimaryButton} from '../components';
import {strings} from '../i18n';
import {perfectSize} from '../core';
import {CommonNavigationProps} from '../types/navigationTypes';

import {fontFamily} from '../styles/fonts';
import {withdrawRequestAPI} from '../services/commonServices';

const initialValues = {
  withdrawRequest: '',
  reason: '',
};

const WithdrawRequest: FC<CommonNavigationProps> = props => {
  const {navigation} = props;

  const formikRef = useRef<any>(null);
  const withdrawRequestRef = useRef<any>(null);
  const reasonRef = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (formikRef?.current) {
        formikRef.current.resetForm();
        formikRef.current.setErrors({});
      }
    });
    return unsubscribe;
  }, [navigation]);

  const sumbitHandler = useCallback(
    async (args: any) => {
      const res = await withdrawRequestAPI({
        amount: args.withdrawRequest,
        reason: args.reason,
      });
      console.log('res :: ', res);

      if (res === 1) {
        navigation.goBack();
      }
    },
    [navigation],
  );

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={withdrawRequestSchema}
      onSubmit={sumbitHandler}>
      {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          style={styles.root}>
          <FieldInput
            ref={withdrawRequestRef}
            label={strings.inputWithdrawRequestLabel}
            value={values.withdrawRequest}
            onChangeText={handleChange('withdrawRequest')}
            onBlur={handleBlur('withdrawRequest')}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              withdrawRequestRef.current.getfocus();
            }}
          />
          {errors.withdrawRequest && touched.withdrawRequest && (
            <Text style={commonStyles.errorText}>{errors.withdrawRequest}</Text>
          )}

          <FieldInput
            ref={reasonRef}
            label={strings.inputEnterReasonLabel}
            value={values.reason}
            onChangeText={handleChange('reason')}
            onBlur={handleBlur('reason')}
            blurOnSubmit={true}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
          {errors.reason && touched.reason && (
            <Text style={commonStyles.errorText}>{errors.reason}</Text>
          )}

          <PrimaryButton
            style={styles.button}
            textStyle={styles.textStyle}
            title={strings.obSubmit}
            onPress={handleSubmit}
          />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};
export default memo(WithdrawRequest);
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
    marginTop: perfectSize(40),
    height: perfectSize(45),
    borderRadius: perfectSize(22),
    paddingVertical: perfectSize(4),
    width: perfectSize(135),
    paddingHorizontal: perfectSize(10),
  },
  textStyle: {
    fontSize: 14,
    fontFamily: fontFamily.poppinsRegular,
    lineHeight: perfectSize(21),
  },
});
