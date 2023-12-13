import React, {FC, memo, useCallback, useEffect} from 'react';
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
import {creditAPI, transactionAPI} from '../services/commonServices';
import {PrimaryButton} from '../components';
import PrimarySmallButton from '../components/PrimarySmallButton';
import {dateTimeFormat} from '../core/genericUtils';

const MyTransactions: FC<CommonNavigationProps> = props => {
  const {navigation} = props;
  const succeeded = 'SUCCEEDED';
  const {
    isLoading,
    credit: userCredit,
    transaction: transactionList,
  } = useSelector((state: RootState) => state.generic);

  const fetchTransactionApi = useCallback(async () => {
    creditAPI();
    transactionAPI();
  }, []);

  useEffect(() => {
    fetchTransactionApi();
  }, [fetchTransactionApi]);

  return (
    <>
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
          <View style={styles.withdrawView}>
            <View style={styles.contentContainer}>
              <PrimaryButton
                style={styles.withdrawbutton}
                textStyle={styles.withdrawtxt}
                title={strings.withdraw}
                onPress={() => navigation.navigate(screenName.withdrawRequest)}
              />
            </View>
            <View style={styles.contentContainer}>
              <PrimaryButton
                style={styles.withdrawhistorybutton}
                textStyle={styles.withdrawtxt}
                title={strings.withdrawhistory}
                onPress={() =>
                  navigation.navigate(screenName.withdrawhistoryScreen)
                }
              />
            </View>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={transactionList}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatlist}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchTransactionApi}
            />
          }
          renderItem={({item}: any) => (
            <View style={styles.ratingView}>
              <View style={styles.basicView}>
                <View>
                  <Text style={styles.basicTxt}>{item?.package_name}</Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.priceTxt1,
                      {
                        color:
                          item?.payment_status == succeeded
                            ? colors.appSloganText
                            : colors.darkred,
                      },
                    ]}>
                    {item?.amount} {item?.currency}
                  </Text>
                </View>
              </View>
              <View style={styles.withdrawView}>
                <View style={styles.startedView}>
                  <Image
                    style={styles.eyeIcon}
                    source={images.icCalendar}
                    resizeMode="contain"
                  />
                  <Text style={styles.date}>
                    {dateTimeFormat(item?.transaction_date)}
                  </Text>
                </View>
                <View style={styles.expView}>
                  <Text
                    style={[
                      styles.paymentStatus,
                      {
                        color:
                          item?.payment_status == succeeded
                            ? colors.appSloganText
                            : colors.darkred,
                      },
                    ]}>
                    {item?.payment_status}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionView}>
                <View>
                  <Text style={styles.type}>{strings.transactionType}</Text>
                </View>
                <View>
                  <Text style={styles.paidTxt}>{strings.paidBy}</Text>
                </View>
              </View>
              <View style={styles.paidbyView}>
                <View>
                  <Text style={styles.paidTxt}>{item?.payment_id}</Text>
                </View>
                <View>
                  <Text style={styles.stripeTxt}>{item?.paid_by}</Text>
                </View>
              </View>
              <View style={styles.paytypebutton}>
                <Text style={styles.status}>{item?.payment_type}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};
export default memo(MyTransactions);
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
  },
  paidTxt: {
    ...fonts.regular12,
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
    paddingVertical: perfectSize(10),
    paddingBottom: perfectSize(15),
    paddingHorizontal: perfectSize(15),
    marginTop: perfectSize(12),
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
    paddingLeft: perfectSize(3),
  },
  payIcon: {
    height: perfectSize(15),
    width: perfectSize(15),
    top: perfectSize(8),
    paddingLeft: perfectSize(3),
  },
  paytypebutton: {
    backgroundColor: colors.appSloganText,
    paddingHorizontal: perfectSize(10),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    borderRadius: perfectSize(10),
  },
  contentContainer: {
    marginTop: perfectSize(10),
  },
  buttonText: {
    ...fonts.medium16,
    color: colors.white,
  },
  withdrawbutton: {
    marginTop: perfectSize(6),
    marginRight: perfectSize(6),
    height: perfectSize(40),
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(4),
    width: perfectSize(135),
    paddingHorizontal: perfectSize(10),
  },
  withdrawhistorybutton: {
    marginTop: perfectSize(6),
    marginLeft: perfectSize(6),
    height: perfectSize(40),
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(4),
    width: perfectSize(180),
    paddingHorizontal: perfectSize(10),
  },
  withdrawtxt: {
    ...fonts.medium13,
    color: colors.white,
  },
  withdrawView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: perfectSize(5),
  },
  basicView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: perfectSize(4),
  },
  startedView: {
    flexDirection: 'row',
    paddingLeft: perfectSize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  expView: {
    top: perfectSize(-2),
  },
  transactionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: perfectSize(8),
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
});
