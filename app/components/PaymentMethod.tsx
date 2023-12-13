import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View, Text} from 'react-native';
import {constants, images, perfectSize} from '../core';
import {colors, fonts} from '../styles';
import {strings} from '../i18n';

declare type paymentProps = {
  setPaymentMethod: (value: string) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
};

function PaymentMethod({setPaymentMethod, handleSubmit}: paymentProps) {
  return (
    <View style={styles.contentContainer}>
      <Text numberOfLines={1} style={styles.label}>
        {strings.payBy}
      </Text>
      <View style={styles.paymentItems}>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={async () => {
            setPaymentMethod(constants.stripe);
            await Promise.resolve();
            handleSubmit();
          }}>
          <Image
            style={styles.paymentImage}
            resizeMode="contain"
            source={images.icStripe}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={async () => {
            setPaymentMethod(constants.paypal);
            await Promise.resolve();
            handleSubmit();
          }}>
          <Image
            style={styles.paymentImage}
            resizeMode="contain"
            source={images.icPayPal}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: perfectSize(20),
    marginBottom: perfectSize(20),
  },
  paymentItems: {
    flexDirection: 'row',
    gap: perfectSize(20),
    paddingTop: perfectSize(10),
  },
  paymentImage: {width: perfectSize(73)},
  label: {
    ...fonts.medium13,
    color: colors.inputLabel,
  },
  paymentButton: {
    flex: 1,
    borderColor: colors.appSloganText,
    borderWidth: perfectSize(1),
    paddingVertical: perfectSize(10),
    borderRadius: perfectSize(25),
    alignItems: 'center',
  },
});

export default PaymentMethod;
