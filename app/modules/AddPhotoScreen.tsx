import React, {FC, memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {UserAddPhoto} from '../components';
import {colors} from '../styles';
import {CommonNavigationProps} from '../types/navigationTypes';
import {screenName} from '../core';
import {myValueAPI} from '../services/commonServices';
const AddPhotoScreen: FC<CommonNavigationProps> = props => {
  const {navigation} = props;

  const addValueHandler = useCallback(() => {
    myValueAPI(1, 'isLoading');
    navigation.navigate(screenName.homeScreen);
  }, [navigation]);

  return (
    <View style={styles.root}>
      <UserAddPhoto onAddValue={addValueHandler} />
    </View>
  );
};
export default memo(AddPhotoScreen);
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
