import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../styles';
import {perfectSize} from '../core';

const BulletButton = (props: any) => {
  const {currentPage} = props;
  return (
    <View style={styles.bulletButtonView}>
      <View
        style={[
          styles.bulletButton,
          {
            backgroundColor:
              currentPage === 1
                ? colors.appSloganText
                : colors.primaryAppSloganText,
          },
        ]}
      />
      <View
        style={[
          styles.bulletButton,
          {
            backgroundColor:
              currentPage === 2
                ? colors.appSloganText
                : colors.primaryAppSloganText,
          },
        ]}
      />
    </View>
  );
};
export default memo(BulletButton);
const styles = StyleSheet.create({
  bulletButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: perfectSize(25),
  },
  bulletButton: {
    height: perfectSize(4),
    width: perfectSize(60),
    marginHorizontal: perfectSize(8),
    borderRadius: perfectSize(5),
  },
});
