import React, {FC} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {PrimaryButtonProps} from '../types/components';
import PrimaryText from './PrimaryText';
import {perfectSize} from '../core';
import {colors, fonts} from '../styles';

const PrimarySmallButton: FC<PrimaryButtonProps> = ({
  style,
  title,
  addMargin,
  onPress,
  onPressIn,
  textStyle,
  onPressOut,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.root, {marginTop: addMargin ?? 0}, style]}>
      <PrimaryText style={[styles.text, textStyle]}>{title}</PrimaryText>
    </TouchableOpacity>
  );
};

export default PrimarySmallButton;
const styles = StyleSheet.create({
  root: {
    paddingVertical: perfectSize(12),
    width: perfectSize(180),
    backgroundColor: colors.secondary,
    borderRadius: perfectSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...fonts.medium13,
    color: colors.white,
  },
});
