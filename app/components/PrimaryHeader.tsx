import {DrawerActions, useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import {images} from '../core';
import {colors, fonts} from '../styles';
import {PrimaryHeaderProps} from '../types/components';

const PrimaryHeader: FC<PrimaryHeaderProps> = ({title, left}) => {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.headerView}>
      <View style={styles.leftViewMain}>
        <TouchableOpacity
          style={left == 'menu' ? styles.menuView : styles.backView}
          onPress={() =>
            left == 'menu' ? handleOpenDrawer() : navigation.goBack()
          }>
          <Image
            style={styles.backIconStyles}
            source={left == 'menu' ? images.icMenu : images.icBack}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.centerView}>
        <View style={{}}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>

      <View style={styles.rightViewMain}>
        <View style={styles.rightView}>
          <Image
            style={styles.rightIconStyles}
            source={left == 'menu' ? images.notification : images.notification}
          />
        </View>
      </View>
    </View>
  );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
  separatorLine: {
    height: 50,
    width: 1,
    backgroundColor: colors.white,
  },
  switchButtonWrapper: {
    width: 110,
    borderRadius: 5,
    backgroundColor: colors.white,
    justifyContent: 'center',
    marginLeft: 15,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  switchButtonStyles: {
    paddingVertical: 4,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  switchButtonText: {
    ...fonts.regular26,
    color: colors.white,
  },
  headerView: {
    height: 60,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: 'row',
    // marginBottom: 10,
  },
  leftViewMain: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  backView: {
    height: 35,
    width: 65,
    // borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#46B9A1',
    marginLeft: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderColor: '#F0F2F5',
  },
  menuView: {
    height: 35,
    width: 65,
    // borderWidth: 1,
    // borderRadius: 25,
    // backgroundColor: '#46B9A1',
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderColor: '#F0F2F5',
  },
  rightViewMain: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightView: {
    height: 35,
    width: 70,
    // borderWidth: 1,
    borderRadius: 25,
    // backgroundColor: '#46B9A1',
    // borderColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: 10,
  },
  centerView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    ...fonts.medium17,
  },

  headerRightText: {
    textAlign: 'center',
    paddingTop: 5,
    ...fonts.regular12,
    color: '#677A8E',
  },
  backIconStyles: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: 6,
  },
  rightIconStyles: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
    // top: 6,
  },
});
