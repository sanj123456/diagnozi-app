import React, {FC, useEffect, memo} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {colors, fonts} from '../styles';
import {images, perfectSize} from '../core';
import {CommonNavigationProps} from '../types/navigationTypes';
import {useSelector} from 'react-redux';
import {referralAPI} from '../services/commonServices';
import {RootState} from '../redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {ShareDialog} from 'react-native-fbsdk-next';

const ReferralProgram: FC<CommonNavigationProps> = () => {
  const referralContent = useSelector<RootState>(
    state => state.generic.referral,
  ) as any;

  useEffect(() => {
    referralAPI();
  }, []);

  const shareLinkToFacebook = async () => {
    const shareLinkContent: any = {
      contentType: 'link',
      contentUrl: `${referralContent?.url}`,
    };

    const canShow = await ShareDialog.canShow(shareLinkContent);

    if (canShow) {
      try {
        const result = await ShareDialog.show(shareLinkContent);
        if (result.isCancelled) {
          console.log('Sharing cancelled');
        } else {
          console.log('Link shared successfully');
        }
      } catch (error) {
        console.log('Error sharing link:', error);
      }
    }
  };

  const shareLinkToTwitter = async () => {
    const url = `${referralContent?.url}`;

    try {
      const twitterUrl = `twitter://post?message=${encodeURIComponent(url)}`;
      const supported = await Linking.canOpenURL(twitterUrl);

      if (supported) {
        await Linking.openURL(twitterUrl);
      } else {
        throw new Error('Twitter app is not installed.');
      }
    } catch (error) {
      console.log('Error sharing on Twitter:', error);
      // Fallback behavior: Open Twitter in a browser
      const fallbackUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url,
      )}`;
      await Linking.openURL(fallbackUrl);
    }
  };

  const shareLinkToVK = async () => {
    const url = `${referralContent?.url}`;

    try {
      const vkAppURL = `vk://share?link=${encodeURIComponent(url)}`;
      const supported = await Linking.canOpenURL(vkAppURL);

      if (supported) {
        await Linking.openURL(vkAppURL);
      } else {
        throw new Error('VK app is not installed.');
      }
    } catch (error) {
      console.log('Error sharing on VK:', error);
      // Fallback behavior: Open Twitter in a browser
      const fallbackUrl = `https://vk.com/share.php?url=${encodeURIComponent(
        url,
      )}`;
      await Linking.openURL(fallbackUrl);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.shareTxt}>{referralContent?.content} </Text>
      </View>
      <View style={styles.imageView}>
        <TouchableOpacity style={styles.iconView} onPress={shareLinkToFacebook}>
          <FastImage
            resizeMode="contain"
            source={images.fb}
            style={styles.iconStyles}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconView} onPress={shareLinkToTwitter}>
          <FastImage
            resizeMode="contain"
            source={images.twitter}
            style={styles.iconStyles}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconView} onPress={shareLinkToVK}>
          <FastImage
            resizeMode="contain"
            source={images.icon}
            style={styles.iconStyles}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.linkView}>
        <Text style={[styles.linkTxt]}>Copy Link and Share Now!</Text>
      </View>
      <View>
        <Text style={styles.urlTxt} selectable={true}>
          {referralContent?.url}
        </Text>
      </View>
    </View>
  );
};
export default memo(ReferralProgram);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    marginTop: perfectSize(40),
  },
  shareTxt: {
    ...fonts.regular26,
    color: colors.blackText,
    textAlign: 'center',
    lineHeight: perfectSize(20),
  },
  linkTxt: {
    ...fonts.semibold,
    alignSelf: 'center',
    color: colors.blackText,
    lineHeight: perfectSize(40),
  },
  urlTxt: {
    ...fonts.regular26,
    alignSelf: 'center',
    color: colors.url,
    lineHeight: perfectSize(25),
  },
  imageView: {
    flexDirection: 'row',
    marginTop: perfectSize(38),
  },
  iconView: {
    marginHorizontal: perfectSize(10),
  },
  iconStyles: {
    height: perfectSize(54),
    width: perfectSize(54),
  },
  textView: {
    paddingHorizontal: perfectSize(60),
  },
  linkView: {
    marginTop: perfectSize(22),
  },
});
