import React, {FC, memo} from 'react';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {WebViewProps} from '../types/components';
import {useNavigation} from '@react-navigation/native';
import {callbackPayPalAPI} from '../services/paymentService';
import {errorToast} from '../core';
import {strings} from '../i18n';
import {commonStyles} from '../styles';

const WebViewUrl: FC<WebViewProps> = ({url, returnurl}) => {
  const navigation = useNavigation<any>();
  const removeHeaderAndFooterScript = `
  // Remove header
  var header = document.querySelector('header');
  if (header) {
    header.style.display = 'none';
  }

  // Remove footer
  var footer = document.querySelector('footer');
  if (footer) {
    footer.style.display = 'none';
  }
`;

  const onNavigationStateChange = async (webViewState: WebViewNavigation) => {
    console.log('webViewState', webViewState);
    if (
      webViewState.url.includes('https://diagnozi.com/') &&
      (webViewState.loading || webViewState.canGoBack)
    ) {
      if (webViewState.url.includes('success')) {
        try {
          navigation.goBack();
          const regexp = /[?&]([^=#]+)=([^&#]*)/g;
          let params: any = {};
          let check;
          while ((check = regexp.exec(webViewState.url))) {
            params[check[1]] = check[2];
          }
          await callbackPayPalAPI({
            payment_token: params.token,
          });

          returnurl ? navigation.navigate(returnurl) : navigation.goBack();
        } catch (err) {}
      }
      if (webViewState.url.includes('cancel')) {
        navigation.goBack();
        errorToast(strings.yourPaymentCancelled, '', 'top');
      }
    }
  };
  return (
    <WebView
      injectedJavaScript={removeHeaderAndFooterScript}
      source={{uri: url}}
      style={commonStyles.flex}
      // javaScriptEnabled={true}
      // domStorageEnabled={true}
      // startInLoadingState={false}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};
export default memo(WebViewUrl);
