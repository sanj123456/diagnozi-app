import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {commonStyles} from '../styles';
import {images, perfectSize} from '../core';
import {fonts} from '../styles/fonts';
import {backgroundProps} from '../types/components';

const AuthLayout = (props: backgroundProps) => {
  const {children, style, title} = props;
  const safeArea = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      bounces={false}
      nestedScrollEnabled={true}
      extraScrollHeight={0}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainerStyle,
        {paddingTop: safeArea.top, paddingBottom: safeArea.bottom},
      ]}
      style={commonStyles.mainView}
      showsVerticalScrollIndicator={false}>
      <FastImage
        source={images.LOGO}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <View style={style}>{children}</View>
    </KeyboardAwareScrollView>
  );
};
export default memo(AuthLayout);
const styles = StyleSheet.create({
  contentContainerStyle: {
    minHeight: '100%',
    marginHorizontal: perfectSize(33),
  },
  logo: {
    height: perfectSize(43),
    width: perfectSize(60),

    marginTop: perfectSize(34),
  },
  title: {
    ...fonts.heading33,
    marginTop: perfectSize(20),
  },
});
