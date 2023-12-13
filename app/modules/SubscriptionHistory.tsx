import React, {FC, memo, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {images, perfectSize, screenName} from '../core';
import {colors, fonts} from '../styles';
import {strings} from '../i18n';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {CommonNavigationProps} from '../types/navigationTypes';
import {
  subscriptionsWithoutPackageAPI,
  subscriptionshistoryAPI,
} from '../services/commonServices';
import {NoDataFound, PrimaryButton} from '../components';
import {formateDate} from '../core/genericUtils';
import {useFocusEffect} from '@react-navigation/native';
import FooterLoader from '../components/FooterLoader';

const SubscriptionHistory: FC<CommonNavigationProps> = props => {
  const {navigation} = props;
  const active = 'Active';
  const {
    withoutSubscription: userSubscription,
    withoutSubscriptionErrorMessage,
  } = useSelector((state: RootState) => state.generic);
  const {
    isLoading,
    isLoadingMore,
    data: subscriptionHistoryList,
    message: subscriptionHistoryErrorMessage,
    meta,
  } = useSelector((state: RootState) => state.subscriptionHistory);

  const fetchData = useCallback((page: number) => {
    subscriptionshistoryAPI(page);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore && meta.current_page < meta.last_page) {
      fetchData(+meta.current_page + 1);
    }
  }, [isLoadingMore, meta, fetchData]);

  const fetchSubscriptionApi = useCallback(async () => {
    subscriptionsWithoutPackageAPI();
    fetchData(1);
  }, [fetchData]);

  useFocusEffect(
    useCallback(() => {
      fetchSubscriptionApi();
    }, [fetchSubscriptionApi]),
  );

  return (
    <View style={styles.container}>
      {withoutSubscriptionErrorMessage === '' ? (
        <View style={styles.parentview}>
          <View style={styles.ddview}>
            <Text style={styles.balanceTxt}>
              {userSubscription?.status} {strings.activePlan}
            </Text>
          </View>
          <View style={styles.walletView}>
            <View>
              <Text style={styles.planTxt}>
                {`${strings.planExpiredOn} ${formateDate(
                  userSubscription?.end_date,
                )}`}
              </Text>
            </View>
          </View>
          <View style={styles.basicpackageview}>
            <Text style={styles.packageTxt}>
              {userSubscription?.package_name}
            </Text>
          </View>
          <View style={styles.walletView}>
            <View>
              <Text style={styles.planTxt}>
                {strings.remainingUpload}: {userSubscription?.remaining_upload}/
                {userSubscription?.no_of_upload}
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <PrimaryButton
              style={styles.upgradebutton}
              textStyle={styles.buttonText}
              title={strings.upgrade}
              onPress={() =>
                navigation.navigate(screenName.subscriptionpackageScreen)
              }
            />
          </View>
        </View>
      ) : (
        <View style={styles.parentview}>
          <View style={styles.errorContent}>
            <Text style={styles.errorMessage}>
              {withoutSubscriptionErrorMessage}
            </Text>
            <PrimaryButton
              style={styles.paybutton}
              textStyle={styles.buttonText}
              title={strings.payNow}
              onPress={() =>
                navigation.navigate(screenName.subscriptionpackageScreen)
              }
            />
          </View>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        data={subscriptionHistoryList}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatlist}
        refreshing={isLoading}
        onRefresh={fetchSubscriptionApi}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        ListFooterComponent={
          <FooterLoader
            visible={
              subscriptionHistoryList &&
              subscriptionHistoryList.length > 0 &&
              isLoadingMore
            }
          />
        }
        ListHeaderComponent={
          <View style={styles.subsview}>
            <Text style={styles.subscriptionTxt}>
              {strings.subscriptionsHistory}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View>
            {!isLoading && (
              <NoDataFound error={subscriptionHistoryErrorMessage} />
            )}
          </View>
        }
        renderItem={({item}: any) => (
          <View style={styles.ratingView}>
            <View style={styles.withPrice}>
              <View style={styles.packageview}>
                <Text style={styles.basicTxt}>{item?.package_name}</Text>
              </View>
              <View style={styles.packageview}>
                <Text
                  style={[
                    styles.priceTxt1,
                    {
                      color:
                        item?.status == active
                          ? colors.appSloganText
                          : colors.darkred,
                    },
                  ]}>
                  {item?.price} {item?.currency}
                </Text>
              </View>
            </View>
            <View style={styles.started}>
              <View style={styles.imageView}>
                <Text style={styles.date}>{item?.uploaded_post}</Text>
              </View>
              <View style={styles.packageview}>
                <Text
                  style={[
                    styles.priceTxt1,
                    {
                      color:
                        item?.status == active
                          ? colors.appSloganText
                          : colors.darkred,
                    },
                  ]}>
                  {item?.status}
                </Text>
              </View>
            </View>
            <View style={styles.expired}>
              <Image
                style={styles.eyeIcon}
                source={images.icCalendar}
                resizeMode="contain"
              />
              <Text style={styles.date}>
                {strings.expired} {formateDate(item?.end_date)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default memo(SubscriptionHistory);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  parentview: {
    paddingBottom: perfectSize(15),
    marginTop: perfectSize(15),
    paddingHorizontal: perfectSize(24),
  },
  ddview: {
    marginTop: perfectSize(6),
  },
  priceTxt: {
    ...fonts.heading35,
    color: colors.appSloganText,
  },
  priceTxt1: {
    ...fonts.regular12,
    color: colors.darkred,
  },
  balanceTxt: {
    ...fonts.semibold,
    color: colors.inputLabel,
  },
  errorMessage: {
    ...fonts.semibold,
    color: colors.inputLabel,
  },
  errorContent: {
    alignItems: 'center',
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
    paddingBottom: perfectSize(20),
    paddingHorizontal: perfectSize(24),
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
    backgroundColor: colors.white,
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(10),
    paddingHorizontal: perfectSize(15),
    marginTop: perfectSize(10),
    shadowColor: colors.black,
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
    width: perfectSize(80),
  },
  upgradebutton: {
    marginTop: perfectSize(6),
    borderRadius: perfectSize(30),
    paddingVertical: perfectSize(8),
    width: perfectSize(330),
  },
  paybutton: {
    marginTop: perfectSize(6),
    borderRadius: perfectSize(30),
    paddingVertical: perfectSize(8),
  },
  walletView: {
    flexDirection: 'row',
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
  subscriptionTxt: {
    ...fonts.semibold,
    lineHeight: perfectSize(21),
    paddingLeft: perfectSize(8),
    color: colors.black,
    textAlign: 'center',
  },
  subsview: {
    marginTop: perfectSize(20),
    paddingBottom: perfectSize(5),
  },
  packageview: {
    top: perfectSize(-3),
  },
  packageTxt: {
    ...fonts.heading25,
    color: colors.appSloganText,
  },
  basicTxt: {
    ...fonts.semibold14,
    lineHeight: perfectSize(21),
    // paddingLeft: perfectSize(4),
    color: colors.black,
  },
  date: {
    ...fonts.medium10,
    color: colors.textgrey,
    paddingLeft: perfectSize(8),
  },
  eyeIcon: {
    height: perfectSize(10),
    width: perfectSize(10),
    top: perfectSize(2),
  },
  withPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  started: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: perfectSize(3),
  },
  expired: {
    flexDirection: 'row',
  },
  imageView: {
    flexDirection: 'row',
    marginLeft: perfectSize(-8),
  },
  planTxt: {
    ...fonts.medium10,
    color: colors.lightgrey,
    lineHeight: perfectSize(20),
  },
  contentContainer: {
    marginTop: perfectSize(10),
  },
  buttonText: {
    ...fonts.regular12,
    color: colors.white,
  },
  basicpackageview: {
    marginTop: perfectSize(20),
  },
  flatlist: {
    top: perfectSize(-10),
  },
});
