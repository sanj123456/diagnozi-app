import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {perfectSize} from '../core';

export const fontFamily = {
  primaryBold: 'Montserrat-Bold',
  primarySemiBold: 'Montserrat-SemiBold',
  primaryExtraBold: 'Montserrat-Black',
  primaryRegular: 'Montserrat-Regular',
  primaryMedium: 'Montserrat-Medium',
  primaryLight: 'Montserrat-Light',
  primaryItalic: 'Montserrat-Italic',

  poppinsBold: 'Poppins-Bold',
  poppinsExtraBold: 'Poppins-Black',
  poppinsRegular: 'Poppins-Regular',
  poppinsMedium: 'Poppins-Medium',
  poppinsLight: 'Poppins-Light',
  poppinsItalic: 'Poppins-Italic',

  juraBold: 'Jura-Bold',
  juraSemiBold: 'Jura-SemiBold',
  juraRegular: 'Jura-Regular',
  juraMedium: 'Jura-Medium',
  juraLight: 'Jura-Light',
  juraItalic: 'Jura-Italic',
};

const headingFont = {
  fontFamily: fontFamily.primaryBold,
  color: colors.black,
};

const mediumFont = {
  fontFamily: fontFamily.primaryMedium,
  color: colors.black,
};

const regularFont = {
  fontFamily: fontFamily.primaryRegular,
  color: colors.black,
};

const italicFont = {
  fontFamily: fontFamily.primaryItalic,
  color: colors.black,
};

const lightFont = {
  fontFamily: fontFamily.primaryLight,
  color: colors.black,
};

const semiBoldFont = {
  fontFamily: fontFamily.primarySemiBold,
  color: colors.black,
};

/**
 *
 * The font size is handled according to UI and device resolution.
 * The size defined in figma is not working same in device so it may vary
 * size:46 in figma is size:26 in device
 *
 * */

export const fonts = StyleSheet.create({
  // Bold
  // in Use
  heading45: {
    ...headingFont,
    fontSize: 45,
    lineHeight: perfectSize(46),
  },
  heading33: {
    ...headingFont,
    fontSize: 33,
    lineHeight: perfectSize(42),
  },
  medium10: {
    ...mediumFont,
    fontSize: 12,
  },
  medium13: {
    ...mediumFont,
    fontSize: 14,
  },
  medium15: {
    ...mediumFont,
    fontSize: 15,
    lineHeight: perfectSize(18.29),
  },
  regular12: {
    ...mediumFont,
    fontSize: 12,
    lineHeight: perfectSize(20.85),
  },
  regular24: {
    ...mediumFont,
    fontSize: 24,
    lineHeight: perfectSize(20.85),
  },
  light14: {
    ...lightFont,
    fontSize: 14,
  },
  medium22: {
    ...mediumFont,
    fontSize: 22,
    lineHeight: perfectSize(27),
  },
  medium17: {
    ...mediumFont,
    fontSize: 17,
    lineHeight: perfectSize(22),
  },
  medium16: {
    ...mediumFont,
    fontSize: 16,
    lineHeight: perfectSize(20),
  },
  light28: {
    ...lightFont,
    fontSize: 28,
  },
  light13: {
    ...lightFont,
    fontSize: 13,
  },
  semibold: {
    ...headingFont,
    fontSize: 16,
  },
  lightBold: {
    ...headingFont,
    fontSize: 12,
  },
  regular16: {
    ...regularFont,
    fontSize: 16,
    lineHeight: perfectSize(46),
  },
  regular16s: {
    ...headingFont,
    fontSize: 16,
  },
  // Regular
  regular40: {
    ...regularFont,
    fontSize: 40,
    lineHeight: perfectSize(46),
  },
  regular14: {
    ...regularFont,
    fontSize: 14,
    lineHeight: perfectSize(46),
  },

  heading51: {
    ...headingFont,
    fontSize: 28,
  },
  heading46: {
    ...headingFont,
    fontSize: 26,
  },
  heading37: {
    ...headingFont,
    fontSize: 18,
  },
  heading36: {
    ...headingFont,
    fontSize: 17.5,
  },
  heading35: {
    ...headingFont,
    fontSize: 35,
  },
  heading30: {
    ...headingFont,
    fontSize: 30,
  },
  heading28: {
    ...headingFont,
    fontSize: 28,
  },
  heading25: {
    ...headingFont,
    fontSize: 25,
  },
  heading20: {
    ...headingFont,
    fontSize: 20,
  },
  heading11: {
    ...headingFont,
    fontSize: 11,
  },
  // medium
  medium51: {
    ...mediumFont,
    fontSize: 27,
  },
  medium48: {
    ...mediumFont,
    fontSize: 24,
  },
  medium46: {
    ...mediumFont,
    fontSize: 23,
  },
  medium43: {
    ...mediumFont,
    fontSize: 21.5,
  },
  medium36: {
    ...mediumFont,
    fontSize: 19,
  },
  medium32: {
    ...mediumFont,
    fontSize: 16,
  },
  medium28: {
    ...mediumFont,
    fontSize: 14,
  },

  // Regular

  regular43: {
    ...regularFont,
    fontSize: 43,
  },
  regular38: {
    ...regularFont,
    fontSize: 19,
  },
  regular36: {
    ...regularFont,
    fontSize: 18,
  },
  regular22: {
    ...regularFont,
    fontSize: 18,
  },
  regular30: {
    ...regularFont,
    fontSize: 15,
  },
  regular28: {
    // Used in CustomText component
    ...regularFont,
    fontSize: 16,
  },
  regular26: {
    ...regularFont,
    fontSize: 14,
  },

  regular22s: {
    ...regularFont,
    fontSize: 11,
  },
  regular20: {
    ...regularFont,
    fontSize: 20,
  },
  regular10: {
    ...regularFont,
    fontSize: 10,
  },

  // Light
  light40: {
    ...lightFont,
    fontSize: 20,
  },

  // Italic
  italic32: {
    ...italicFont,
    fontSize: 18,
  },

  semibold14: {
    ...semiBoldFont,
    fontSize: 14,
  },
});
