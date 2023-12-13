import React, {FC, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import {CommonNavigationProps} from '../types/navigationTypes';
import {colors, fonts} from '../styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {perfectSize, screenName} from '../core';
import {strings} from '../i18n';
import PrimarySmallButton from '../components/PrimarySmallButton';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {membershipAPI} from '../services/commonServices';
import RenderHtml from 'react-native-render-html';

const SubscriptionPackage: FC<CommonNavigationProps> = props => {
  const {navigation} = props;
  const isLoading = useSelector<RootState>(
    state => state.generic.isLoading,
  ) as boolean;
  const membershipdata = useSelector<RootState>(
    state => state.generic.membership,
  ) as any;

  const windowDimensions = useWindowDimensions();
  const contentWidth = windowDimensions.width;

  useEffect(() => {
    membershipAPI();
  }, []);

  return (
    <KeyboardAwareScrollView
      bounces={false}
      nestedScrollEnabled={true}
      extraScrollHeight={0}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={membershipAPI} />
      }>
      <View style={styles.parentview}>
        {membershipdata?.map((md: any, index: number) => (
          <View key={`${index}_packages`} style={styles.ratingView}>
            <View>
              <Text style={styles.basicTxt}>{md?.title}</Text>
              <Text style={styles.priceTxt}>{md?.price} USD</Text>
              <View style={styles.htmlView}>
                <RenderHtml
                  contentWidth={contentWidth}
                  source={{html: md?.description}}
                  defaultTextProps={{
                    style: styles.uploadTxt,
                  }}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <PrimarySmallButton
                title={strings.buy}
                style={styles.smallbutton}
                onPress={() =>
                  navigation.navigate(screenName.subscriptionScreen, md)
                }
              />
            </View>
          </View>
        ))}
      </View>
    </KeyboardAwareScrollView>
  );
};
export default SubscriptionPackage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  parentview: {
    paddingBottom: perfectSize(15),
    marginTop: perfectSize(15),
    paddingHorizontal: perfectSize(18),
  },
  ddview: {
    marginTop: perfectSize(6),
  },
  planTxt: {
    ...fonts.medium10,
    color: colors.lightgrey,
    lineHeight: perfectSize(20),
  },
  balanceTxt: {
    ...fonts.heading20,
    color: colors.inputLabel,
  },
  packageTxt: {
    ...fonts.heading25,
    color: colors.appSloganText,
  },
  basicTxt: {
    ...fonts.semibold14,
    lineHeight: perfectSize(21),
    paddingLeft: perfectSize(4),
    color: colors.black,
  },
  addCardView: {
    paddingVertical: perfectSize(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: perfectSize(6),
    borderRadius: perfectSize(30),
    width: perfectSize(330),
  },
  smallbutton: {
    alignSelf: 'center',
    marginTop: perfectSize(25),
    borderRadius: perfectSize(30),
    paddingVertical: perfectSize(10),
    width: perfectSize(120),
    paddingHorizontal: perfectSize(6),
    marginBottom: perfectSize(20),
  },
  walletView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTxt: {
    paddingLeft: perfectSize(3),
    ...fonts.medium17,
    color: colors.appSloganText,
    paddingTop: perfectSize(3),
  },
  cycleView: {
    paddingVertical: perfectSize(10),
  },
  uploadTxt: {
    ...fonts.medium16,
    color: colors.textgrey,
    lineHeight: perfectSize(30),
    top: perfectSize(-6),
    paddingLeft: perfectSize(10),
  },
  backgroundImage: {
    height: perfectSize(150),
    width: '100%',
  },
  listView: {
    marginTop: perfectSize(10),
    paddingBottom: perfectSize(12),
  },
  buttonView: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    backgroundColor: colors.white,
    elevation: 2,
    borderRadius: perfectSize(20),
    paddingHorizontal: perfectSize(32),
    paddingVertical: perfectSize(18),
    marginBottom: perfectSize(3),
  },
  listItem: {
    marginTop: perfectSize(12),
  },
  wrapperStyle: {
    justifyContent: 'space-around',
  },
  contentContainer: {
    marginTop: perfectSize(10),
  },
  packageview: {
    marginTop: perfectSize(20),
  },
  ratingView: {
    backgroundColor: colors.white,
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(10),
    paddingBottom: perfectSize(5),
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
  htmlView: {
    marginLeft: perfectSize(-18),
    top: perfectSize(-6),
  },
});
