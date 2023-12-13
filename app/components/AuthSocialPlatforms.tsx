import React, {FC, memo, useCallback, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {colors, fonts} from '../styles';
import {strings} from '../i18n';
import {constants, errorToast, images, perfectSize, screenName} from '../core';
import {
  facebookSignin,
  googleSignin,
  socialLoginAPI,
} from '../services/authServices';
import {RootState} from '../redux';
import {CommonNavigationProps} from '../types/navigationTypes';

const AuthSocialPlatforms: FC<CommonNavigationProps> = props => {
  const {navigation} = props;
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );

  const onPress = useCallback(async (provider_name: string) => {
    let data = null;
    switch (provider_name) {
      case constants.google:
        data = await googleSignin();
        break;
      case constants.facebook:
        data = await facebookSignin();
        break;
      default:
        errorToast(strings.socialLoginNotSupport, '', 'top');
        break;
    }
    data && (await socialLoginAPI(data));
  }, []);

  useEffect(() => {
    if (profileData?.user_type === '') {
      navigation.navigate(screenName.profileselectscreen);
    }
  }, [navigation, profileData]);

  return (
    <View style={styles.root}>
      {/* Or line design */}
      <View style={styles.orViewStyle}>
        <View style={styles.line} />
        <Text style={styles.orTextStyle}>{strings.orLabel}</Text>
        <View style={styles.line} />
      </View>

      {/* button container */}
      <View style={styles.container}>
        <Pressable
          style={styles.pressable}
          onPress={() => onPress(constants.google)}>
          <View style={styles.googleView}>
            <FastImage
              source={images.google}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => onPress(constants.facebook)}>
          <FastImage
            source={images.faceboook}
            style={styles.image1}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
};
export default memo(AuthSocialPlatforms);
const styles = StyleSheet.create({
  root: {
    marginTop: perfectSize(38),
  },
  orViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '28%',
    height: perfectSize(1),
    backgroundColor: colors.primaryGrey,
  },
  orTextStyle: {
    ...fonts.medium15,
    color: colors.primaryGrey,
    marginHorizontal: perfectSize(5),
  },
  container: {
    flexDirection: 'row',
    marginVertical: perfectSize(24),
    justifyContent: 'space-around',
    paddingHorizontal: '15%',
  },
  googleView: {
    backgroundColor: colors.primayWhite,
    height: perfectSize(60),
    width: perfectSize(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: perfectSize(100),
  },
  image: {
    height: perfectSize(32),
    width: perfectSize(32),
  },
  image1: {
    height: perfectSize(60),
    width: perfectSize(60),
  },
  pressable: {
    padding: perfectSize(5),
  },
});
