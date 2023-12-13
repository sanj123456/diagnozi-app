import React, {FC, memo} from 'react';
import {TouchableOpacity} from 'react-native';

import {commonStyles} from '../styles';
import {PrimaryButtonProps} from '../types/components';
import PrimaryText from './PrimaryText';

const PrimaryButton: FC<PrimaryButtonProps> = ({
  style,
  textStyle,
  title,
  addMargin,
  onPress,
  onPressIn,
  onPressOut,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        commonStyles.primaryButtonStyle,
        {
          marginTop: addMargin ?? 0,
        },
        style,
      ]}>
      <PrimaryText
        style={{...commonStyles.primaryButtonLabelStyles, ...textStyle}}>
        {title}
      </PrimaryText>
    </TouchableOpacity>
  );
};

export default memo(PrimaryButton);
