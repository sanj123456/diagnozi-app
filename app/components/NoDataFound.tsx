import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images, perfectSize} from '../core';
import {colors, fonts} from '../styles';
import PrimaryButton from './PrimaryButton';
import {strings} from '../i18n';

const NoDataFound = (props: any) => {
  const {isMyValue, onPress, error} = props;

  return (
    <View style={styles.root}>
      <FastImage
        source={images.noDatafound}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.text}>{error}</Text>
      {isMyValue && (
        <PrimaryButton
          title={strings.addYourDisease}
          style={styles.buttonStyle}
          onPress={onPress}
        />
      )}
    </View>
  );
};
export default NoDataFound;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: perfectSize(150),
    width: perfectSize(100),
  },
  text: {
    ...fonts.regular20,
    color: colors.noDataText,
  },
  buttonStyle: {
    width: perfectSize(300),
    marginTop: perfectSize(20),
  },
});
