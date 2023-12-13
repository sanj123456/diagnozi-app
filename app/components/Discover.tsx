import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import FeedCard from './FeedCard';
import {useSelector} from 'react-redux';
import {discoverAPI} from '../services/commonServices';
import NoDataFound from './NoDataFound';
import {perfectSize, screenName} from '../core';
import FooterLoader from './FooterLoader';
import {useNavigation} from '@react-navigation/native';
import {isTablet} from 'react-native-device-info';
import {RootState} from '../redux';

const Discover = () => {
  const navigation = useNavigation<any>();
  const {
    data: discoverData,
    discoverPage: currentPage,
    lastPage: lastPage,
    isRefreshing: isRefreshing,
    loadMore: loadMore,
    message: message,
  } = useSelector((state: RootState) => state.discover);
  const isLoading = useSelector((state: RootState) => state.generic.isLoading);

  useEffect(() => {
    discoverAPI(1, 'isLoading');
  }, []);

  const pressItemHandler = useCallback(
    (id: string) => {
      navigation.navigate(screenName.feedDetailScreen, {
        service_order_id: id,
      });
    },
    [navigation],
  );

  const renderItemHandler = useCallback(
    (item: any) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={pressItemHandler.bind(null, item.item.id)}>
          <FeedCard {...item.item} />
        </TouchableOpacity>
      );
    },
    [pressItemHandler],
  );

  const fetchData = useCallback(
    (page: number, type?: any) => {
      discoverAPI(page, type, discoverData);
    },
    [discoverData],
  );

  const handleRefresh = useCallback(() => {
    fetchData(1, 'refreshing');
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (message.length > 0) {
      return;
    }
    if (loadMore === false && currentPage < lastPage) {
      fetchData(
        currentPage + 1,
        currentPage === 0 ? 'refreshing' : 'load_more',
      );
    }
  }, [loadMore, currentPage, message, lastPage, fetchData]);

  const emptyList = useCallback(() => {
    return (
      <>
        {isLoading === false && message.trim().length !== 0 && (
          <NoDataFound error={message} />
        )}
      </>
    );
  }, [message, isLoading]);

  return (
    <FlatList
      data={discoverData}
      renderItem={renderItemHandler}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={0.2}
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
  );
};
export default Discover;
const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: perfectSize(120),
    paddingHorizontal: 20,
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {width: isTablet() ? '49%' : '100%'},
});
