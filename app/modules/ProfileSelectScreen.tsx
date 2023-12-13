import React, {FC, useCallback, useState} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';

import {images} from '../core/constants';
import {CommonNavigationProps} from '../types/navigationTypes';
import {perfectSize} from '../core';
import {strings} from '../i18n';
import {colors} from '../styles';
import {AuthLayout, PrimaryButton} from '../components';
import {screenName} from '../core';
import {navigate} from '../navigation/RootNavigation';
import Card from '../components/Card';
import {userTypeUpdateAPI} from '../services/authServices';

const ProfileSelectScreen: FC<CommonNavigationProps> = () => {
  const [selected, setIsSelected] = useState(3);
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );

  const buttonHandler = useCallback(() => {
    if (profileData?.user_type === '') {
      userTypeUpdateAPI({user_type: selected});
    } else {
      navigate(screenName.signUp, {user_type: selected});
    }
  }, [selected, profileData]);

  return (
    <AuthLayout title={strings.selectProfile}>
      <View style={styles.parentview}>
        <TouchableOpacity
          onPress={() => {
            setIsSelected(3);
          }}
          activeOpacity={1}>
          <Card
            backgroundColor={
              selected === 3 ? colors.appSloganText : colors.white
            }
            title={strings.doctor}
            description={strings.doctorDescription}
            textColor={selected === 3 ? colors.white : colors.appSloganText}
            imageUrl={selected === 3 ? images.whiteDoctor : images.greenDoctor}
          />
          {selected === 3 && (
            <View style={styles.selected}>
              <Image source={images.selected} resizeMode="contain" />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.userView}>
          <TouchableOpacity
            onPress={() => {
              setIsSelected(4);
            }}
            activeOpacity={4}>
            <Card
              backgroundColor={
                selected === 4 ? colors.appSloganText : colors.white
              }
              title={strings.user}
              description={strings.userDescription}
              textColor={selected === 4 ? colors.white : colors.appSloganText}
              imageUrl={selected === 4 ? images.whiteUser : images.greenUser}
            />
            {selected === 4 && (
              <View style={styles.selected}>
                <Image source={images.selected} resizeMode="contain" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerButton}>
        <PrimaryButton title={strings.confirm} onPress={buttonHandler} />
      </View>
    </AuthLayout>
  );
};
export default ProfileSelectScreen;

const styles = StyleSheet.create({
  containerButton: {
    marginTop: perfectSize(35),
    alignItems: 'center',
    paddingBottom: perfectSize(50),
  },
  parentview: {
    marginTop: perfectSize(59),
    marginHorizontal: perfectSize(5),
  },
  selected: {
    position: 'absolute',
    right: perfectSize(0),
    top: perfectSize(-45),
    width: perfectSize(90),
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  userView: {
    marginTop: perfectSize(30),
    marginBottom: perfectSize(50),
  },
});
