import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {images, perfectSize, screenName} from '../core';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {colors} from '../styles';

const NotificationButton = () => {
  const navigation = useNavigation<any>();

  const notificationCount = useSelector(
    (state: RootState) => state.generic.notificationCount,
  );

  console.log('notificationCount', notificationCount);

  return (
    <TouchableOpacity
      style={styles.drawerPressable}
      onPress={() => navigation.navigate(screenName.notificationList)}>
      <FastImage
        resizeMode="contain"
        source={images.notification}
        style={styles.icon}
      />
      {notificationCount > 0 && <View style={styles.notiDot} />}
    </TouchableOpacity>
  );
};
export default memo(NotificationButton);
const styles = StyleSheet.create({
  drawerPressable: {
    marginHorizontal: perfectSize(10),
    padding: perfectSize(5),
  },
  icon: {
    height: perfectSize(21),
    width: perfectSize(20),
  },
  notiDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: colors.appSloganText,
    position: 'absolute',
    top: 8,
    right: 4,
  },
});
