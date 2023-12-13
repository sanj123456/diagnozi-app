import React, {useCallback, memo, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import FeedCard from './FeedCard';
import {useSelector} from 'react-redux';
import {deleteOrderAPI, myValueAPI} from '../services/commonServices';
import NoDataFound from './NoDataFound';
import {perfectSize, screenName} from '../core';
import FooterLoader from './FooterLoader';
import {useNavigation} from '@react-navigation/native';
import UserAddPhoto from './UserAddPhoto';
import {isTablet} from 'react-native-device-info';
import {RootState} from '../redux';

const MyValue = (props: any) => {
  const {onAddYourValue} = props;

  const navigation = useNavigation<any>();
  const {
    data: myValueData,
    myValuePage: currentPage,
    lastPage: lastPage,
    isRefreshing: isRefreshing,
    loadMore: loadMore,
    message: message,
  } = useSelector((state: RootState) => state.myvalue);
  const isLoading = useSelector((state: RootState) => state.generic.isLoading);

  const [isEdit, setIsEdit] = useState<any>('');

  const pressItemHandler = useCallback(
    (id: string) => {
      navigation.navigate(screenName.feedDetailScreen, {
        service_order_id: id,
      });
    },
    [navigation],
  );

  const editHandler = useCallback((item: any) => {
    setIsEdit(item);
  }, []);

  const deleteFeedHandler = useCallback(async (id: any) => {
    await deleteOrderAPI(id);
  }, []);

  const renderItemHandler = useCallback(
    (item: any) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={pressItemHandler.bind(null, item.item.id)}>
          <FeedCard
            {...item.item}
            onEdit={editHandler.bind(null, item.item)}
            onDelete={deleteFeedHandler.bind(null, item.item.id)}
          />
        </TouchableOpacity>
      );
    },
    [pressItemHandler, editHandler, deleteFeedHandler],
  );

  const fetchData = useCallback(
    (page: number, type?: any) => {
      myValueAPI(page, type, myValueData);
    },
    [myValueData],
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

  const closeEditFeedHandler = useCallback(() => {
    fetchData(1, 'refreshing');
    setIsEdit('');
  }, [fetchData]);

  const emptyList = useCallback(() => {
    return (
      <>
        {isLoading === false && message.trim().length !== 0 && (
          <NoDataFound
            error={message}
            isMyValue={true}
            onPress={onAddYourValue}
          />
        )}
      </>
    );
  }, [onAddYourValue, message, isLoading]);

  return isEdit === '' ? (
    <FlatList
      data={myValueData}
      renderItem={renderItemHandler}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={item => item.id}
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
  ) : isEdit !== '' ? (
    <UserAddPhoto onAddValue={closeEditFeedHandler} data={isEdit} isEdit />
  ) : null;
};
export default memo(MyValue);
const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: perfectSize(120),
    paddingHorizontal: 20,
    minHeight: '100%',
  },
  item: {width: isTablet() ? '49%' : '100%'},
});
