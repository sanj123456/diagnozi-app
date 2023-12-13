import React, {FC, memo, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {constants, perfectSize, screenName} from '../core';
import {colors, fonts} from '../styles';
import {strings} from '../i18n';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {CommonNavigationProps} from '../types/navigationTypes';
import {creditAPI} from '../services/commonServices';
import {Formik} from 'formik';
import {subscriptionFormSchema} from '../core/formikValidationSchema';
import {
  initializeSubscriptionStripe,
  initializeSubscriptionPayPal,
  selectPaymentOption,
} from '../core/payment';
import PaymentMethod from '../components/PaymentMethod';
import CheckBox from '../components/CheckBox';
import {useFocusEffect} from '@react-navigation/native';

const initialValues = {
  use_wallet: false,
  paymentMethod: '',
};

const Subscription: FC<CommonNavigationProps> = props => {
  const {navigation, route} = props;
  const {params} = route;

  const {credit: userCredit} = useSelector((state: RootState) => state.generic);

  useFocusEffect(
    useCallback(() => {
      creditAPI();
    }, []),
  );

  const subscriptionHandler = useCallback(
    async (values: any) => {
      try {
        switch (values.paymentMethod) {
          case constants.stripe:
            const isSuccess = await initializeSubscriptionStripe(
              params.id,
              values.use_wallet,
            );
            if (!isSuccess) {
              await selectPaymentOption(values.paymentMethod);
            }
            navigation.navigate(screenName.mySubscriptionScreen);
            break;
          case constants.paypal:
            const result = await initializeSubscriptionPayPal(
              params.id,
              values.use_wallet,
            );
            result.url &&
              navigation.navigate(screenName.webscreen, {
                screen: 'PayPal',
                url: result.url,
                returnurl: screenName.mySubscriptionScreen,
              });
            break;
        }
      } catch (error) {}
    },
    [navigation, params],
  );

  return (
    <View style={styles.container}>
      <View style={styles.parentview}>
        <View style={styles.ddview}>
          <Text style={styles.balanceTxt}>{params?.title}</Text>
        </View>
        <View style={styles.walletView}>
          <View>
            <Text style={styles.planTxt}>
              {strings.numberOfUpload}: {params?.no_of_upload}
            </Text>
            <Text style={styles.planTxt}>
              {strings.price}: {strings.currency} {params?.price}
            </Text>
          </View>
        </View>
        <View style={styles.basicpackageview}>
          <Text style={styles.balanceTxt}>{strings.availableBalance}</Text>
          <Text style={styles.apriceTxt}>
            {strings.currency} {userCredit?.credit}
          </Text>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={subscriptionFormSchema}
          onSubmit={subscriptionHandler}>
          {({values, setFieldValue, handleSubmit}) => (
            <View style={styles.basicpackageview}>
              <View style={styles.withPrice}>
                <Text style={styles.label}>{strings.useYourWalletBalance}</Text>
                <CheckBox
                  value={values.use_wallet}
                  onChnage={(val: boolean) => setFieldValue('use_wallet', val)}
                />
              </View>
              <PaymentMethod
                setPaymentMethod={text => setFieldValue('paymentMethod', text)}
                handleSubmit={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};
export default memo(Subscription);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  parentview: {
    paddingBottom: perfectSize(15),
    marginTop: perfectSize(15),
    paddingHorizontal: perfectSize(24),
  },
  ddview: {
    marginTop: perfectSize(6),
  },
  priceTxt: {
    ...fonts.heading35,
    color: colors.appSloganText,
  },
  priceTxt1: {
    ...fonts.regular12,
    color: colors.darkred,
  },
  balanceTxt: {
    ...fonts.semibold,
    color: colors.inputLabel,
  },
  apriceTxt: {
    ...fonts.semibold,
    color: colors.appSloganText,
  },
  errorMessage: {
    ...fonts.semibold,
    color: colors.inputLabel,
  },
  errorContent: {
    alignItems: 'center',
  },
  feeduser: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: perfectSize(13),
  },
  userStyle: {
    width: perfectSize(30),
    height: perfectSize(30),
    borderRadius: perfectSize(20),
  },
  userprofile: {},
  profilehead: {},
  profileName: {
    ...fonts.medium17,
    lineHeight: perfectSize(21),
    paddingLeft: perfectSize(8),
    color: colors.black,
  },
  descTxt: {
    ...fonts.medium15,
    paddingTop: perfectSize(5),
    color: colors.titleGrey,
  },
  comments: {
    width: perfectSize(15),
    height: perfectSize(15),
  },
  multirating: {
    width: perfectSize(245),
  },
  picker: {
    width: perfectSize(27),
  },
  contentContainerStyle: {
    paddingBottom: perfectSize(20),
    paddingHorizontal: perfectSize(24),
  },
  commentCount: {
    ...fonts.regular28,
    color: colors.blackText,
    paddingLeft: perfectSize(5),
    top: perfectSize(-2),
  },
  profileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: perfectSize(5),
  },
  profileNameView: {
    paddingLeft: perfectSize(10),
  },

  descView: {
    marginLeft: perfectSize(15),
    marginTop: perfectSize(6),
    marginBottom: perfectSize(6),
  },
  pat: {
    flexDirection: 'row',
    paddingLeft: perfectSize(8),
  },
  avgView: {
    paddingRight: perfectSize(5),
    top: perfectSize(-3),
  },
  rangesliderView: {
    width: perfectSize(220),
    alignSelf: 'center',
    top: perfectSize(-4),
  },
  ratingView: {
    backgroundColor: colors.white,
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(10),
    paddingHorizontal: perfectSize(15),
    marginTop: perfectSize(10),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  button: {
    alignSelf: 'center',
    marginTop: perfectSize(6),
    height: perfectSize(34),
    borderRadius: perfectSize(4),
    paddingVertical: perfectSize(4),
    width: perfectSize(80),
  },
  upgradebutton: {
    marginTop: perfectSize(6),
    borderRadius: perfectSize(30),
    paddingVertical: perfectSize(8),
    width: perfectSize(330),
  },
  paybutton: {
    marginTop: perfectSize(6),
    borderRadius: perfectSize(30),
    paddingVertical: perfectSize(8),
  },
  walletView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: perfectSize(5),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editView: {
    flexDirection: 'row',
    flex: 1,
  },
  subscriptionTxt: {
    ...fonts.semibold,
    lineHeight: perfectSize(21),
    paddingLeft: perfectSize(8),
    color: colors.black,
    textAlign: 'center',
  },
  subsview: {
    marginTop: perfectSize(20),
    paddingBottom: perfectSize(5),
  },
  packageview: {
    top: perfectSize(-3),
  },
  packageTxt: {
    ...fonts.heading25,
    color: colors.appSloganText,
  },
  basicTxt: {
    ...fonts.semibold14,
    lineHeight: perfectSize(21),
    paddingLeft: perfectSize(4),
    color: colors.black,
  },
  date: {
    ...fonts.medium10,
    color: colors.textgrey,
    paddingLeft: perfectSize(8),
  },
  eyeIcon: {
    height: perfectSize(10),
    width: perfectSize(10),
    top: perfectSize(2),
  },
  withPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  started: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: perfectSize(3),
  },
  expired: {
    flexDirection: 'row',
  },
  imageView: {
    flexDirection: 'row',
  },
  planTxt: {
    ...fonts.medium10,
    color: colors.lightgrey,
    lineHeight: perfectSize(20),
  },
  contentContainer: {
    marginTop: perfectSize(10),
  },
  buttonText: {
    ...fonts.regular12,
    color: colors.white,
  },
  basicpackageview: {
    marginTop: perfectSize(20),
  },
  flatlist: {
    top: perfectSize(-10),
  },
  label: {
    ...fonts.medium13,
    color: colors.inputLabel,
  },
});
