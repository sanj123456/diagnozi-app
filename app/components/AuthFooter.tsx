import React, {FC, memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {strings} from '../i18n';
import {AuthFooterProps} from '../types/components';
import {fontFamily} from '../styles/fonts';
import {colors} from '../styles';
import {constants, perfectSize} from '../core';

const AuthFooter: FC<AuthFooterProps> = props => {
  const {type, onPress} = props;
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        {type === constants.signup
          ? `${strings.haveAccount}`
          : `${strings.donthaveAccount}`}
      </Text>
      <Pressable onPress={onPress}>
        <Text style={styles.text1}>
          {type === constants.signup
            ? `${strings.loginIn}`
            : `${strings.signUp}`}
        </Text>
      </Pressable>
    </View>
  );
};
export default memo(AuthFooter);
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: 14,
    color: colors.inputLabel,
  },
  text1: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: 14,
    color: colors.appSloganText,
    marginLeft: perfectSize(5),
    textDecorationLine: 'underline',
  },
});
