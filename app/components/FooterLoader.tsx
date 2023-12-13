import React from 'react';
import {ActivityIndicator} from 'react-native';
import {colors} from '../styles';
const FooterLoader = (props: any) => {
  const {visible} = props;
  return visible === true ? (
    <ActivityIndicator size="large" color={colors.appSloganText} />
  ) : null;
};
export default FooterLoader;
