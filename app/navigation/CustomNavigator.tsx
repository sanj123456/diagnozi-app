import React, {useCallback} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fontFamily, fonts} from '../styles/fonts';
import {colors} from '../styles';
import PrimarySmallButton from '../components/PrimarySmallButton';
import {strings} from '../i18n';
import {constants, images, perfectSize, screenName} from '../core';

import FastImage from 'react-native-fast-image';
import {
  profileReset,
  setHomeVerificationTitle,
  setIsUploadStart,
} from '../redux/modules/profileSlice';
import {removeAsyncData, setAsyncData} from '../services';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
import {myValueReset} from '../redux/modules/MyValueSlice';
import {setInitialValues} from '../redux/modules/genericSlice';
import {RootState} from '../redux';
import {resetComments} from '../redux/modules/CommentSlice';
import {discoverReset} from '../redux/modules/DiscoverSlice';
import {unsubscribeTopic} from '../core/genericUtils';

const CustomDrawer = (props: any) => {
  const {navigation} = props;
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );

  const dispatch = useDispatch();

  const pressHandler = useCallback(() => {
    setAsyncData(constants.isUploadStart, true);
    dispatch(setIsUploadStart(true));
    dispatch(setHomeVerificationTitle(true));
    navigation.navigate(screenName.homeScreen);
  }, [navigation, dispatch]);

  const closeDrawerHandler = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);

  const logOut = useCallback(async () => {
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    if (profileData?.provider_name === constants.facebook) {
      LoginManager.logOut();
    }
    unsubscribeTopic(profileData.uuid);
    profileData.user_type == 3 && unsubscribeTopic(constants.push_topic_doctor);
    profileData.user_type == 4 && unsubscribeTopic(constants.push_topic_user);
    profileData?.category?.slug && unsubscribeTopic(profileData.category.slug);
    await removeAsyncData(constants.userData);

    dispatch(setInitialValues());
    dispatch(profileReset());
    dispatch(myValueReset());
    dispatch(resetComments());
    dispatch(discoverReset());

    setAsyncData(constants.isUploadStart, false);
  }, [dispatch, profileData]);

  return (
    <View style={styles.root}>
      <DrawerContentScrollView
        {...props}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.container}>
          <Pressable style={styles.closeView} onPress={closeDrawerHandler}>
            <FastImage
              source={images.closeDrawer}
              style={styles.imageSize}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.userFullName}>{profileData.full_name}</Text>
          <Text style={styles.text}>
            {strings.credit}
            {strings.currency} {profileData.real_credit}
          </Text>
          <PrimarySmallButton
            title={strings.depositNow}
            style={styles.button1}
            onPress={() => navigation.navigate(screenName.depositScreen)}
          />
        </View>
        <DrawerItemList {...props} />
        {(profileData.user_type === 3 && profileData.profile_status === 0) ||
        (profileData.user_type === 3 && profileData.profile_status === 2) ? (
          <DrawerItem
            label={strings.verificationDrawerLabel}
            inactiveBackgroundColor={colors.white}
            activeBackgroundColor={colors.white}
            activeTintColor={colors.black}
            inactiveTintColor={colors.black}
            labelStyle={fonts.medium15}
            onPress={pressHandler}
          />
        ) : null}
        <View style={styles.border} />
        <DrawerItem
          label={strings.aboutUsDrawerLabel}
          inactiveBackgroundColor={colors.white}
          activeBackgroundColor={colors.white}
          activeTintColor={colors.black}
          inactiveTintColor={colors.black}
          labelStyle={fonts.medium15}
          onPress={() =>
            navigation.navigate(screenName.webscreen, {
              screen: 'WebAbout',
            })
          }
        />
        <DrawerItem
          label={strings.contactUsDrawerLabel}
          inactiveBackgroundColor={colors.white}
          activeBackgroundColor={colors.white}
          activeTintColor={colors.black}
          inactiveTintColor={colors.black}
          labelStyle={fonts.medium15}
          onPress={() =>
            navigation.navigate(screenName.webscreen, {
              screen: 'WebContact',
            })
          }
        />
        <DrawerItem
          label={strings.serviceDrawerLabel}
          inactiveBackgroundColor={colors.white}
          activeBackgroundColor={colors.white}
          activeTintColor={colors.black}
          inactiveTintColor={colors.black}
          labelStyle={fonts.medium15}
          onPress={() =>
            navigation.navigate(screenName.webscreen, {
              screen: 'WebServices',
            })
          }
        />
        <PrimarySmallButton
          title={strings.logout}
          style={styles.button2}
          onPress={logOut}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  scrollViewContentContainer: {
    flexGrow: 1,
    paddingVertical: perfectSize(25),
  },
  container: {
    paddingLeft: perfectSize(18),
    marginBottom: perfectSize(55),
  },
  userFullName: {
    fontFamily: fontFamily.primaryBold,
    color: colors.appSloganText,
    fontSize: 22,
  },

  text: {
    fontFamily: fontFamily.primaryMedium,
    color: colors.blackText,
    fontSize: 16,
    marginTop: perfectSize(16),
  },
  closeView: {
    padding: 5,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  imageSize: {
    height: perfectSize(22),
    width: perfectSize(22),
  },
  border: {
    backgroundColor: colors.primaryGrey1,
    marginVertical: 20,
    alignSelf: 'center',
    height: 2,
    width: '90%',
  },
  button1: {
    marginTop: 15,
  },
  button2: {
    marginLeft: 18,
    marginTop: 40,
  },
});
