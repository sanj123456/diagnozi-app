import React, {FC, memo, useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {constants} from '../core/constants';
import {CommonNavigationProps} from '../types/navigationTypes';
import {perfectSize} from '../core';
import {strings} from '../i18n';
import {colors, fonts} from '../styles';
import {NoDataFound} from '../components';
import {screenName} from '../core';
import VerificationScreen from './VerificationScreen';
import {useDispatch, useSelector} from 'react-redux';
import {setIsUploadStart} from '../redux/modules/profileSlice';
import {setAsyncData} from '../services';
import {feedAPI} from '../services/commonServices';
import FeedCard from '../components/FeedCard';
import {RootState} from '../redux';
import DropDownPicker from 'react-native-dropdown-picker';
import FooterLoader from '../components/FooterLoader';
import {isTablet} from 'react-native-device-info';

const FeedScreen: FC<CommonNavigationProps> = props => {
  const {navigation} = props;
  const {
    data: feedData,
    feedPage: currentPage,
    lastPage: lastPage,
    isRefreshing: isRefreshing,
    loadMore: loadMore,
    message: message,
  } = useSelector((state: RootState) => state.feeds);

  const {category: categoryData, isLoading} = useSelector(
    (state: RootState) => state.generic,
  );
  const {profileData, isUploadStart} = useSelector(
    (state: RootState) => state.profile,
  );

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(setIsUploadStart(true));
      setAsyncData(constants.isUploadStart, true);
    });
    return unsubscribe;
  }, [dispatch, navigation]);

  const fetchData = useCallback(
    (page: number, type?: any) => {
      feedAPI(page, type, feedData, category);
    },
    [feedData, category],
  );

  const handleRefresh = useCallback(() => {
    fetchData(1, 'refreshing');
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (loadMore === false && currentPage < lastPage) {
      fetchData(
        currentPage + 1,
        currentPage === 0 ? 'refreshing' : 'load_more',
      );
    }
  }, [loadMore, currentPage, lastPage, fetchData]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const pressOnItemHandler = useCallback(
    (id: any) => {
      navigation.navigate(screenName.feedDetailScreen, {
        service_order_id: id,
      });
    },
    [navigation],
  );

  const emptyList = useCallback(() => {
    return (
      <>
        {isLoading === false && message.trim().length !== 0 && (
          <NoDataFound error={message} />
        )}
      </>
    );
  }, [message, isLoading]);

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={pressOnItemHandler.bind(null, item.id)}>
          <FeedCard {...item} />
        </TouchableOpacity>
      );
    },
    [pressOnItemHandler],
  );

  if (
    (isUploadStart === false &&
      profileData?.user_type === 3 &&
      profileData?.profile_status === 0) ||
    (isUploadStart === false &&
      profileData?.user_type === 3 &&
      profileData?.profile_status === 2)
  ) {
    return <VerificationScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.parentview}>
        <View style={styles.dropView}>
          <DropDownPicker
            style={styles.dropdownStyle}
            listItemContainerStyle={styles.itemContainerStyle}
            listChildContainerStyle={styles.childContainerStyle}
            dropDownContainerStyle={styles.dropdownContainerStyle}
            textStyle={styles.ddTxt}
            open={open}
            value={value}
            items={categoryData}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={val => setCategory(val)}
            hideSelectedItemIcon={false}
          />
        </View>

        <TouchableOpacity style={[styles.filterview]} onPress={handleRefresh}>
          <Text style={styles.filter}>{strings.filter}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={feedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        refreshing={isRefreshing}
        ListFooterComponent={<FooterLoader visible={loadMore} />}
        onRefresh={handleRefresh}
        ListEmptyComponent={emptyList}
        numColumns={isTablet() ? 2 : 1}
        {...(isTablet() && {
          columnWrapperStyle: {justifyContent: 'space-between'},
        })}
      />
    </View>
  );
};
export default memo(FeedScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: perfectSize(18),
    // paddingTop: perfectSize(50),
  },
  parentview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: perfectSize(99),
    paddingBottom: perfectSize(15),
    marginTop: perfectSize(15),
  },
  dropView: {flex: 1, marginRight: perfectSize(20)},
  filterview: {
    backgroundColor: colors.appSloganText,
    flex: 1,
    height: perfectSize(38),
    justifyContent: 'center',
    borderRadius: perfectSize(10),
    shadowColor: '#00000',
    shadowOffset: {
      width: 1,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 4,
  },
  filter: {
    ...fonts.regular12,
    alignSelf: 'center',
    color: colors.white,
  },
  ddTxt: {
    ...fonts.regular12,
    alignSelf: 'center',
    color: colors.grey,
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
  },
  userprofile: {},
  profilehead: {},
  more: {
    ...fonts.regular24,
    color: colors.white,
  },
  contentContainerStyle: {
    paddingBottom: perfectSize(180),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  commentCount: {
    ...fonts.regular28,
    color: colors.blackText,
    paddingLeft: perfectSize(5),
    top: perfectSize(-2),
  },
  dropDownstyle: {
    borderBottomWidth: perfectSize(1),
    borderRadius: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: colors.primaryGrey,
  },

  selectedItemStyle: {
    color: colors.white,
    borderRadius: perfectSize(3),
    width: '100%',
  },
  itemContainerStyle: {
    borderWidth: perfectSize(0),
  },
  childContainerStyle: {
    borderWidth: perfectSize(0),
  },
  dropdownStyle: {
    borderWidth: perfectSize(0),
    elevation: 2,
    minHeight: perfectSize(38),
    borderRadius: perfectSize(10),
    zIndex: perfectSize(100),
    shadowColor: '#00000',
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20.0,
    backgroundColor: '#FFF',
  },
  dropdownContainerStyle: {
    borderWidth: perfectSize(0),
  },
  item: {width: isTablet() ? '49%' : '100%'},
});
