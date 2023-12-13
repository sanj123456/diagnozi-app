import React, {memo, FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import {images, perfectSize} from '../core';
import {colors} from '../styles';
import {fontFamily} from '../styles/fonts';
import {strings} from '../i18n';

const DummySplash: FC = () => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <FastImage
          source={images.LOGO}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{strings.obDiagnozi}</Text>
        <Text style={styles.subTitle}>{strings.obAppslogan}</Text>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.bottomText1}>{strings.securedby}</Text>
        <Text style={styles.bottomText2}>{strings.obDiagnozi1}</Text>
      </View>
    </View>
  );
};
export default memo(DummySplash);
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: perfectSize(115),
    height: perfectSize(100),
  },
  title: {
    marginTop: perfectSize(18),
    fontFamily: fontFamily.juraRegular,
    fontSize: perfectSize(58),
    color: colors.appSloganText,
  },
  subTitle: {
    fontFamily: fontFamily.juraRegular,
    fontSize: perfectSize(13),
    color: colors.appSloganText,
    marginTop: perfectSize(4),
    textTransform: 'uppercase',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: perfectSize(38),
    gap: perfectSize(3),
  },
  bottomText1: {
    fontFamily: fontFamily.primaryRegular,
    fontSize: perfectSize(16),
    color: colors.inputLabel,
  },
  bottomText2: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: perfectSize(16),
    color: colors.appSloganText,
  },
});
