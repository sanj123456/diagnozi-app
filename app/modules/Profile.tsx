import React, {FC, memo, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {images, perfectSize, screenName} from '../core';
import {colors, fonts} from '../styles';
import {strings} from '../i18n';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {CommonNavigationProps} from '../types/navigationTypes';
import {creditAPI, userProfileAPI} from '../services/commonServices';
import PrimarySmallButton from '../components/PrimarySmallButton';
import {formateDate} from '../core/genericUtils';

const Profile: FC<CommonNavigationProps> = props => {
  const {navigation} = props;
  const isLoading = useSelector<RootState>(
    state => state.generic.isLoading,
  ) as boolean;
  const userCredit = useSelector<RootState>(
    state => state.generic.credit,
  ) as any;
  const userProfile = useSelector<RootState>(
    state => state.generic.profile,
  ) as any;

  useEffect(() => {
    creditAPI();
    userProfileAPI();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            creditAPI();
            userProfileAPI();
          }}
        />
      }>
      <View style={styles.parentview}>
        <View style={styles.ddview}>
          <Text style={styles.balanceTxt}>{strings.availableBalance}</Text>
        </View>
        <View style={styles.walletView}>
          <View>
            <Text style={styles.priceTxt}>
              {strings.currency} {userCredit?.credit}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimarySmallButton
              title={strings.deposit}
              style={styles.button}
              onPress={() => navigation.navigate(screenName.depositScreen)}
            />
          </View>
        </View>
      </View>

      <View style={styles.ratingView}>
        <View style={styles.profileView}>
          <View style={styles.editView}>
            <View style={styles.userprofile}>
              <Image
                source={{
                  uri:
                    userProfile?.profile_image ||
                    Image.resolveAssetSource(images.userProfile).uri,
                }}
                style={styles.userStyle}
              />
            </View>
            <View>
              <View style={styles.profileNameView}>
                <Text style={styles.profileName}>{userProfile?.full_name}</Text>
              </View>
              <View style={styles.descView}>
                <Text style={styles.descTxt}>{userProfile?.email}</Text>
                <Text style={styles.descTxt}>{userProfile?.gender}</Text>
                <Text style={styles.descTxt}>{userProfile?.mobile}</Text>
                <Text style={styles.descTxt}>
                  {userProfile?.date_of_birth &&
                    formateDate(userProfile?.date_of_birth)}
                </Text>
                {userProfile?.about_me && userProfile?.company_name && (
                  <>
                    <Text style={styles.descTxt}>
                      {userProfile?.about_me && userProfile?.about_me}
                    </Text>
                    <Text style={styles.descTxt}>
                      {userProfile?.company_name && userProfile?.company_name}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenName.EditProfile)}>
              <Image source={images.edit} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default memo(Profile);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: perfectSize(24),
  },
  parentview: {
    paddingBottom: perfectSize(15),
    marginTop: perfectSize(15),
  },
  ddview: {
    marginTop: perfectSize(6),
  },
  priceTxt: {
    ...fonts.heading35,
    color: colors.appSloganText,
  },
  balanceTxt: {
    ...fonts.medium17,
    color: colors.inputLabel,
  },
  feeduser: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: perfectSize(13),
  },
  userStyle: {
    width: perfectSize(30),
    height: perfectSize(30),
    borderRadius: perfectSize(20),
  },
  userprofile: {},
  profilehead: {},
  profileName: {
    ...fonts.medium17,
    lineHeight: perfectSize(21),
    paddingLeft: perfectSize(8),
    color: colors.black,
  },
  descTxt: {
    ...fonts.medium15,
    paddingTop: perfectSize(5),
    color: colors.titleGrey,
  },
  comments: {
    width: perfectSize(15),
    height: perfectSize(15),
  },
  multirating: {
    width: perfectSize(245),
  },
  picker: {
    width: perfectSize(27),
  },
  contentContainerStyle: {
    paddingBottom: perfectSize(180),
  },
  commentCount: {
    ...fonts.regular28,
    color: colors.blackText,
    paddingLeft: perfectSize(5),
    top: perfectSize(-2),
  },
  profileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: perfectSize(5),
  },
  profileNameView: {
    paddingLeft: perfectSize(10),
  },

  descView: {
    marginLeft: perfectSize(15),
    marginTop: perfectSize(6),
    marginBottom: perfectSize(6),
  },
  pat: {
    flexDirection: 'row',
    paddingLeft: perfectSize(8),
  },
  avgView: {
    paddingRight: perfectSize(5),
    top: perfectSize(-3),
  },
  rangesliderView: {
    width: perfectSize(220),
    alignSelf: 'center',
    top: perfectSize(-4),
  },
  ratingView: {
    backgroundColor: '#FFFFFF',
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(10),
    paddingBottom: perfectSize(5),
    paddingHorizontal: perfectSize(15),
    marginTop: perfectSize(12),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  button: {
    alignSelf: 'center',
    marginTop: perfectSize(6),
    height: perfectSize(34),
    borderRadius: perfectSize(4),
    paddingVertical: perfectSize(4),
    width: perfectSize(100),
    paddingHorizontal: perfectSize(6),
  },
  walletView: {
    flexDirection: 'row',
    marginTop: perfectSize(10),
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editView: {
    flexDirection: 'row',
    flex: 1,
  },
});
