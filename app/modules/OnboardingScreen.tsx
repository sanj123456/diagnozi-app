import React, {FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {images} from '../core/constants';
import {CommonNavigationProps} from '../types/navigationTypes';
import {perfectSize} from '../core';
import {strings} from '../i18n';
import {colors, commonStyles, fonts} from '../styles';
import {PrimaryButton} from '../components';
import {screenName} from '../core';
import {navigate} from '../navigation/RootNavigation';
import {height} from '../core/genericUtils';

const OnboardingScreen: FC<CommonNavigationProps> = () => {
  return (
    <View style={styles.container}>
      <View style={commonStyles.flexGrow}>
        <View style={styles.containerLogo}>
          <FastImage
            source={images.LOGO}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.containerWelcome}>
          <Text style={styles.welcome}>{strings.obWelcomeTo}</Text>
          <Text style={styles.appname}>{strings.obDiagnozi}</Text>
        </View>
        <View style={styles.containerAppSlogan}>
          <Text style={styles.appslogan}>{strings.obAppslogan}</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <PrimaryButton
          title={strings.obGetStarted}
          onPress={() => navigate(screenName.obstepsscreen)}
        />
      </View>
    </View>
  );
};

export default memo(OnboardingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerLogo: {
    paddingTop: height / 4,
    alignItems: 'center',
  },
  logo: {
    width: perfectSize(115),
    height: perfectSize(100),
  },
  containerWelcome: {
    marginTop: height / 22,
    alignItems: 'center',
  },
  welcome: {
    ...fonts.heading45,
    color: colors.titleText,
  },
  appname: {
    ...fonts.regular40,
    color: colors.appNameText,
  },
  containerAppSlogan: {
    marginTop: height / 40,
    alignItems: 'center',
  },
  appslogan: {
    ...fonts.medium13,
    color: colors.appSloganText,
  },
  containerButton: {
    marginTop: perfectSize(38),
    alignItems: 'center',
    paddingBottom: perfectSize(50),
  },
});
