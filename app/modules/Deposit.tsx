import React, {FC, useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CommonNavigationProps} from '../types/navigationTypes';
import {colors, commonStyles, fonts} from '../styles';
import {constants, perfectSize, screenName} from '../core';
import {strings} from '../i18n';
import {FieldInput, PrimaryHeader} from '../components';
import {Formik} from 'formik';
import {walletFormSchema} from '../core/formikValidationSchema';
import PaymentMethod from '../components/PaymentMethod';
import {
  initializePayPal,
  initializeStripe,
  selectPaymentOption,
} from '../core/payment';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';

const initialValues = {
  amount: '',
  paymentMethod: '',
};

const prices = ['100', '200', '500', '1000', '2000'];

const Deposit: FC<CommonNavigationProps> = props => {
  const {navigation} = props;

  const userCredit = useSelector<RootState>(
    state => state.generic.credit,
  ) as any;

  const walletHandler = useCallback(
    async (values: any) => {
      try {
        switch (values.paymentMethod) {
          case constants.stripe:
            await initializeStripe(values.amount);
            await selectPaymentOption(values.paymentMethod);
            navigation.navigate(screenName.myTransactions);
            break;
          case constants.paypal:
            const result = await initializePayPal(values.amount);
            navigation.navigate(screenName.webscreen, {
              screen: 'PayPal',
              url: result.url,
              returnurl: screenName.myTransactions,
            });
            break;
        }
      } catch (error) {}
    },
    [navigation],
  );

  return (
    <>
      <PrimaryHeader left={'back'} title={'Deposit'} />
      <View style={styles.container}>
        <View style={styles.ddview}>
          <Text style={styles.balanceTxt}>{strings.availableBalance}</Text>
        </View>
        <View style={styles.walletView}>
          <View>
            <Text style={styles.priceTxt}>
              {strings.currency} {userCredit?.credit}
            </Text>
          </View>
        </View>

        <Formik
          initialValues={initialValues}
          validationSchema={walletFormSchema}
          onSubmit={walletHandler}>
          {({
            values,
            errors,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
          }) => (
            <View style={styles.parentview}>
              <View style={styles.subsview}>
                <Text style={styles.subscriptionTxt}>
                  {strings.addMoneytoWallet}
                </Text>
              </View>
              <FieldInput
                label={strings.loadBalance}
                value={values.amount}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                blurOnSubmit={false}
                inputProps={{keyboardType: 'number-pad'}}
              />
              {errors.amount && (
                <Text style={commonStyles.errorText}>{errors.amount}</Text>
              )}
              <View style={styles.pricesItems}>
                {prices.map((price, i) => (
                  <TouchableOpacity
                    key={`${i}_price_keys`}
                    style={styles.pricesBadge}
                    onPress={() => setFieldValue('amount', price)}>
                    <Text
                      style={styles.pricesBadgeText}
                      adjustsFontSizeToFit={true}>
                      {price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.parentview}>
                <PaymentMethod
                  setPaymentMethod={text =>
                    setFieldValue('paymentMethod', text)
                  }
                  handleSubmit={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};
export default Deposit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: perfectSize(18),
  },
  parentview: {
    paddingBottom: perfectSize(15),
    marginTop: perfectSize(15),
  },
  pricesItems: {
    flexDirection: 'row',
    paddingTop: perfectSize(15),
    justifyContent: 'space-between',
  },
  pricesBadge: {
    paddingVertical: perfectSize(3),
    paddingHorizontal: perfectSize(15),
    borderRadius: perfectSize(15),
    borderWidth: 1,
    borderColor: colors.appSloganText,
  },
  pricesBadgeText: {
    ...fonts.regular12,
    color: colors.appSloganText,
  },
  ddview: {
    marginTop: perfectSize(6),
  },
  balanceTxt: {
    ...fonts.medium17,
    color: colors.inputLabel,
  },
  walletView: {
    flexDirection: 'row',
    marginTop: perfectSize(10),
    justifyContent: 'space-between',
  },
  priceTxt: {
    ...fonts.heading35,
    color: colors.appSloganText,
  },
  subsview: {
    marginTop: perfectSize(20),
    paddingBottom: perfectSize(5),
  },
  subscriptionTxt: {
    ...fonts.semibold,
    lineHeight: perfectSize(21),
    color: colors.black,
  },
});
