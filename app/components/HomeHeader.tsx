import React, {memo, FC} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

import {colors, fonts} from '../styles';
import {constants, images, perfectSize} from '../core';
import {strings} from '../i18n';
import {HomeHeaderProps} from '../types/components';
import {isTablet} from 'react-native-device-info';
import {RootState} from '../redux';

const HomeHeader: FC<HomeHeaderProps> = props => {
  const {onPressTab1, onPressTab2, tab, verificationTitle} = props;
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );

  return (
    <View style={styles.titleHeaderStyle}>
      <Pressable style={styles.titlePressable} onPress={onPressTab1}>
        <Text
          style={tab === constants.tab1 ? styles.selected : styles.unSelected}>
          {strings.homeTab1}
        </Text>
        {tab === constants.tab1 ? (
          <FastImage
            source={images.selectedTitle}
            style={styles.selectedImage}
            resizeMode="contain"
          />
        ) : null}
      </Pressable>

      <Pressable style={styles.titlePressable} onPress={onPressTab2}>
        <Text
          style={tab === constants.tab2 ? styles.selected : styles.unSelected}>
          {profileData.user_type === 3
            ? verificationTitle === true
              ? strings.verificationDrawerLabel
              : strings.homeTab2
            : strings.addPhoto}
        </Text>
        {tab === constants.tab2 ? (
          <FastImage
            source={images.selectedTitle}
            style={styles.selectedImage}
            resizeMode="contain"
          />
        ) : null}
      </Pressable>
    </View>
  );
};
export default memo(HomeHeader);
const styles = StyleSheet.create({
  selected: {
    ...fonts.medium17,
  },
  unSelected: {
    ...fonts.medium17,
    color: colors.titleGrey,
  },
  titleHeaderStyle: {
    flexDirection: 'row',
    justifyContent: isTablet() ? 'space-around' : 'space-between',
  },
  titlePressable: {
    padding: perfectSize(5),
    alignItems: 'center',
  },
  selectedImage: {
    height: perfectSize(10),
    width: perfectSize(20),
  },
});
