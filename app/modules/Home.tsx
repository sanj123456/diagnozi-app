import React, {memo, useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {HomeHeader, UserAddPhoto} from '../components';
import {constants, perfectSize, screenName} from '../core';
import {setHomeVerificationTitle} from '../redux/modules/profileSlice';
import VerificationScreen from './VerificationScreen';
import {
  categoryAPI,
  countriesAPI,
  creditAPI,
  myValueAPI,
  notificationCountAPI,
} from '../services/commonServices';
import {colors} from '../styles';
import MyValue from '../components/MyValue';
import Discover from '../components/Discover';
import {profileDataApi} from '../services/authServices';
import {subscribeAllTopics} from '../core/genericUtils';
import {RootState} from '../redux';

const Home = (props: any) => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const [tab, setTab] = useState(constants.tab1);

  const {homeVerificationTitle: verificationTitle, profileData} = useSelector(
    (state: RootState) => state.profile,
  );

  useEffect(() => {
    categoryAPI();
    creditAPI();
    countriesAPI();
    profileDataApi();
    notificationCountAPI();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setTab(constants.tab1);
      dispatch(setHomeVerificationTitle(false));
    });
    return unsubscribe;
  }, [dispatch, navigation]);

  useEffect(() => {
    if (verificationTitle == true && profileData.user_type === 3) {
      setTab(constants.tab2);
    }
    if (profileData) {
      subscribeAllTopics(profileData);
    }
  }, [verificationTitle, profileData]);

  const pressFirstTabHandler = useCallback(() => {
    setTab(constants.tab1);
    dispatch(setHomeVerificationTitle(false));
  }, [dispatch]);

  const pressSecondTabHandler = useCallback(() => {
    setTab(constants.tab2);
  }, []);

  const headerTitle = useCallback(() => {
    return (
      <HomeHeader
        tab={tab}
        onPressTab1={pressFirstTabHandler}
        onPressTab2={pressSecondTabHandler}
        verificationTitle={verificationTitle}
      />
    );
  }, [pressFirstTabHandler, tab, verificationTitle, pressSecondTabHandler]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
    });
  }, [headerTitle, navigation]);

  const addValueHandler = useCallback(() => {
    myValueAPI(1, 'isLoading');
    setTab(constants.tab1);
  }, []);

  const addNewValueHandler = useCallback(() => {
    if (profileData.user_type === 3) {
      navigation.navigate(screenName.AddPhotoScreen);
    }
    if (profileData.user_type === 4) {
      setTab(constants.tab2);
    }
  }, [navigation, profileData]);

  if (
    profileData.user_type === 3 &&
    verificationTitle === true &&
    (profileData.profile_status === 0 || profileData.profile_status === 2)
  ) {
    return <VerificationScreen isUpload={true} />;
  }

  return (
    <View style={styles.root}>
      {tab === constants.tab1 ? (
        <MyValue onAddYourValue={addNewValueHandler} />
      ) : profileData.user_type === 3 ? (
        <Discover />
      ) : (
        <UserAddPhoto onAddValue={addValueHandler} />
      )}
    </View>
  );
};
export default memo(Home);
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingBottom: perfectSize(120),
    paddingHorizontal: 20,
    minHeight: '100%',
  },
});
