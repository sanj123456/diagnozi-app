import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {fonts} from './fonts';
import {perfectSize} from '../core';

export const commonStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    // width:perfectSize(420),
    // maxWidth:'100%',
    backgroundColor: colors.primary,
  },
  flex: {
    flex: 1,
  },
  flexGrow: {flexGrow: 1},
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalCenterStyles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalBetweenStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  primaryButtonStyle: {
    // height: 50,
    paddingVertical: perfectSize(16),
    width: perfectSize(201),
    backgroundColor: colors.secondary,
    borderRadius: perfectSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonLabelStyles: {
    ...fonts.medium22,
    color: colors.white,
  },
  primaryHeaderStyles: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  errorText: {
    ...fonts.regular12,
    color: colors.red,
    marginTop: perfectSize(5),
    zIndex: -100,
  },
  primaryHeaderLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryHeaderMenuIcon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    marginRight: 15,
    color: 'red',
  },
  primaryHeaderBackIcon: {
    height: 25,
    width: 40,
    resizeMode: 'contain',
    marginRight: 15,
    // tintColor: 'black',
    backgroundColor: '#46B9A1',
    borderRadius: 20,
  },
  primaryHeaderLabelStyles: {
    ...fonts.heading46,
    color: colors.black,
    textAlign: 'center',
  },
  primaryHeaderRightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  normalIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  smallIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  extraSmallIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  verySmallIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
});
