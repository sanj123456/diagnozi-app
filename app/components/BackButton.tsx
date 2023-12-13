import React, {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {images, perfectSize} from '../core';
import {colors} from '../styles';

const BackButton = () => {
  const navigation = useNavigation();

  const pressHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <TouchableOpacity style={styles.root} onPress={pressHandler}>
      <FastImage
        source={images.arrow}
        style={styles.arrow}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};
export default memo(BackButton);
const styles = StyleSheet.create({
  root: {
    height: perfectSize(35),
    width: perfectSize(63),
    backgroundColor: colors.appSloganText,
    // marginHorizontal: perfectSize(10),
    padding: perfectSize(5),
    borderRadius: perfectSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    height: perfectSize(14),
    width: perfectSize(20),
  },
});
