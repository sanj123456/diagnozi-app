import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {images, perfectSize} from '../core';
import {colors} from '../styles';

const CheckBox = ({value, onChnage}: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.checkBoxView,
        value ? styles.activeView : styles.inActiveView,
      ]}
      onPress={() => onChnage(!value)}>
      {value && (
        <Image source={images.icTick} style={styles.icon} resizeMode="center" />
      )}
    </TouchableOpacity>
  );
};
export default CheckBox;
const styles = StyleSheet.create({
  checkBoxView: {
    width: perfectSize(18),
    height: perfectSize(18),
    justifyContent: 'center',
    borderRadius: perfectSize(5),
    overflow: 'hidden',
  },
  activeView: {backgroundColor: colors.appSloganText},
  inActiveView: {
    borderColor: colors.appSloganText,
    borderWidth: 1,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
