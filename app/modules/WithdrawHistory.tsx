import React, {FC, memo, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import {images, perfectSize, screenName} from '../core';
import {colors, fonts} from '../styles';
import {strings} from '../i18n';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {CommonNavigationProps} from '../types/navigationTypes';
import {creditAPI, withdrawHistoryAPI} from '../services/commonServices';
import {PrimaryButton, PrimaryHeader} from '../components';
import PrimarySmallButton from '../components/PrimarySmallButton';
import {dateTimeFormat} from '../core/genericUtils';
import {useFocusEffect} from '@react-navigation/native';

const WithdrawHistory: FC<CommonNavigationProps> = props => {
  const {navigation} = props;
  const approved = 'Approved';
  const pending = 'Pending';
  const {
    isLoading,
    credit: userCredit,
    withdrawHistory,
  } = useSelector((state: RootState) => state.generic);

  const fetchWithdrawHistoryApi = useCallback(async () => {
    creditAPI();
    withdrawHistoryAPI();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchWithdrawHistoryApi();
    }, [fetchWithdrawHistoryApi]),
  );

  return (
    <>
      <PrimaryHeader left={'back'} title={'Withdraw History'} />

      <View style={styles.container}>
        <View style={styles.parentview}>
          <View style={styles.ddview}>
            <Text style={styles.balanceTxt}>{strings.availableBalance}</Text>
          </View>
          <View style={styles.walletView}>
            <View>
              <Text style={styles.priceTxt}>$ {userCredit?.credit}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <PrimarySmallButton
                title={strings.deposit}
                style={styles.button}
                onPress={() => navigation.navigate(screenName.depositScreen)}
              />
            </View>
          </View>

          <View style={styles.contentContainer}>
            <PrimaryButton
              style={styles.withdrawbutton}
              textStyle={styles.withdrawtxt}
              title={strings.withdraw}
              onPress={() => navigation.navigate(screenName.withdrawRequest)}
            />
          </View>
          <View style={styles.subsview}>
            <Text style={styles.subscriptionTxt}>
              {strings.withdrawHistory}
            </Text>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={withdrawHistory}
          keyExtractor={(_item, index) => index.toString()}
          style={styles.flatlist}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchWithdrawHistoryApi}
            />
          }
          renderItem={({item}: any) => (
            <View style={styles.ratingView}>
              <View style={styles.basicView}>
                <View style={styles.startedView}>
                  <Image
                    style={styles.eyeIcon}
                    source={images.icCalendar}
                    resizeMode="contain"
                  />
                  <Text style={styles.date}>
                    {dateTimeFormat(item?.created_at)}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.priceTxt1,
                      {
                        color:
                          item?.status == approved
                            ? colors.appSloganText
                            : item?.status == pending
                            ? colors.stripeColor
                            : colors.darkred,
                      },
                    ]}>
                    {item?.amount} {item?.currency}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionView}>
                <View>
                  <Text style={styles.type}>{strings.reason}</Text>
                </View>
                <View style={styles.statusView}>
                  <Text
                    style={[
                      styles.paymentStatus,
                      {
                        color:
                          item?.status == approved
                            ? colors.appSloganText
                            : item?.status == pending
                            ? colors.stripeColor
                            : colors.darkred,
                      },
                    ]}>
                    {item?.status}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.paidTxt}>{item?.reason}</Text>
              </View>
              {item?.admin_note && (
                <>
                  <View style={styles.noteView}>
                    <Text style={styles.type}>{strings.adminNote}</Text>
                  </View>
                  <View>
                    <Text style={styles.paidTxt}>{item?.admin_note}</Text>
                  </View>
                </>
              )}
            </View>
          )}
        />
      </View>
    </>
  );
};
export default memo(WithdrawHistory);
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
    ...fonts.semibold,
    color: colors.appSloganText,
  },
  paymentStatus: {
    ...fonts.regular12,
    color: colors.darkred,
  },
  paidTxt: {
    ...fonts.medium13,
    color: colors.textgrey,
  },
  status: {
    ...fonts.regular12,
    color: colors.white,
  },
  balanceTxt: {
    ...fonts.semibold,
    color: colors.inputLabel,
  },
  ratingView: {
    backgroundColor: colors.white,
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(4),
    paddingBottom: perfectSize(10),
    paddingHorizontal: perfectSize(15),
    marginTop: perfectSize(12),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 2,
  },
  button: {
    marginTop: perfectSize(6),
    height: perfectSize(32),
    borderRadius: perfectSize(4),
    paddingVertical: perfectSize(4),
    width: perfectSize(100),
    paddingHorizontal: perfectSize(10),
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
  subscriptionTxt: {
    ...fonts.semibold,
    lineHeight: perfectSize(21),
    paddingLeft: perfectSize(8),
    color: colors.black,
    textAlign: 'center',
  },

  basicTxt: {
    ...fonts.semibold,
    lineHeight: perfectSize(21),
    paddingLeft: perfectSize(4),
    color: colors.black,
  },
  date: {
    ...fonts.medium10,
    lineHeight: perfectSize(24),
    color: colors.textgrey,
    paddingLeft: perfectSize(6),
  },
  type: {
    ...fonts.lightBold,
    color: colors.appSloganText,
  },
  stripeTxt: {
    ...fonts.lightBold,
    lineHeight: perfectSize(25),
    color: colors.stripeColor,
  },
  eyeIcon: {
    height: perfectSize(12),
    width: perfectSize(12),
  },

  contentContainer: {
    marginTop: perfectSize(10),
    alignSelf: 'center',
  },
  buttonText: {
    ...fonts.medium16,
    color: colors.white,
  },
  withdrawbutton: {
    marginTop: perfectSize(6),
    height: perfectSize(40),
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(4),
    width: perfectSize(135),
    paddingHorizontal: perfectSize(10),
  },

  withdrawtxt: {
    ...fonts.medium13,
    color: colors.white,
  },

  basicView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: perfectSize(2),
  },
  startedView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expView: {
    top: perfectSize(-2),
  },

  paidbyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: perfectSize(-6),
  },
  contentContainerStyle: {
    paddingBottom: perfectSize(20),
    paddingHorizontal: perfectSize(24),
  },
  flatlist: {
    top: perfectSize(-10),
  },
  subsview: {
    marginTop: perfectSize(20),
    paddingBottom: perfectSize(5),
  },
  noteView: {
    marginTop: perfectSize(10),
  },
  transactionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: perfectSize(5),
  },
  statusView: {
    top: perfectSize(-3),
  },
});
