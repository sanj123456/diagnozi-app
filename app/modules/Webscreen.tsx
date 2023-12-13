import React, {FC, useEffect, memo} from 'react';
import {constants} from '../core';
import {CommonNavigationProps} from '../types/navigationTypes';
import WebView from '../components/WebView';

const AboutUs: FC<CommonNavigationProps> = props => {
  const {navigation, route} = props;
  const aboutUs = 'About Us';
  const contact = 'Contact';
  const services = 'Services';
  const payPal = 'PayPal';

  const routeParams =
    (route.params.screen as 'WebAbout') ||
    'WebContact' ||
    'WebServices' ||
    'PayPal';

  useEffect(() => {
    navigation.setOptions({
      headerTitle:
        route.params.screen == 'PayPal'
          ? payPal
          : route.params.screen == 'WebAbout'
          ? aboutUs
          : route.params.screen == 'WebContact'
          ? contact
          : services,
    });
  });

  return (
    <WebView
      url={
        route.params.screen == 'PayPal'
          ? route.params.url
          : constants[routeParams]
      }
      returnurl={route.params?.returnurl}
    />
  );
};
export default memo(AboutUs);
