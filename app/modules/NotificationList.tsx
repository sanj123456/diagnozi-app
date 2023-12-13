import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {images, perfectSize} from '../core';
import {colors, commonStyles, fonts} from '../styles';
import {strings} from '../i18n';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {CommonNavigationProps} from '../types/navigationTypes';
import {
  categoryAPI,
  deleteNotificationAPI,
  notifcationListAPI,
  readNotificationAPI,
} from '../services/commonServices';
import {NoDataFound} from '../components';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import FooterLoader from '../components/FooterLoader';
import {timeFromNow} from '../core/genericUtils';
import DialogBox from '../components/DialogBox';
const NotificationList: FC<CommonNavigationProps> = () => {
  const [deleteDialogBox, setDeleteDialogBox] = useState('');
  const {
    isLoading,
    isLoadingMore,
    data: notification,
    message: notificationErrorMessage,
    meta,
  } = useSelector((state: RootState) => state.notifications);
  useEffect(() => categoryAPI(), []);

  const fetchData = useCallback((page: number) => {
    notifcationListAPI(page);
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchData(1);
      readNotificationAPI();
    }, [fetchData]),
  );

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore && meta.current_page < meta.last_page) {
      fetchData(+meta.current_page + 1);
    }
  }, [isLoadingMore, meta, fetchData]);

  const cancelDeleteHandler = useCallback(() => {
    setDeleteDialogBox('');
  }, []);
  const confirmDeleteHandler = useCallback(() => {
    deleteNotificationAPI(deleteDialogBox);
    setDeleteDialogBox('');
  }, [deleteDialogBox]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        data={notification}
        keyExtractor={(item, index) => index.toString()}
        refreshing={isLoading}
        onRefresh={() => fetchData(1)}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        ListEmptyComponent={
          <View>
            {!isLoading && <NoDataFound error={notificationErrorMessage} />}
          </View>
        }
        ListFooterComponent={
          <FooterLoader
            visible={notification && notification.length > 0 && isLoadingMore}
          />
        }
        renderItem={({item}: any) => (
          <View style={styles.notificationView}>
            <View style={commonStyles.flex}>
              <Text style={styles.time}>{timeFromNow(item?.created_at)}</Text>
              <Text style={styles.title}>{item?.title}</Text>
              <Text style={styles.subtitle}>{item?.message}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteIconView}
              onPress={() => setDeleteDialogBox(item?.id)}>
              <FastImage
                style={styles.deleteIcon}
                source={images.icTrash}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <DialogBox
        modalVisible={deleteDialogBox != ''}
        title={strings.deleteTitle}
        text={strings.deleteNotification}
        onConfirm={confirmDeleteHandler}
        onCancel={cancelDeleteHandler}
      />
    </View>
  );
};
export default memo(NotificationList);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    ...fonts.medium36,
  },
  time: {
    ...fonts.regular10,
  },
  subtitle: {
    ...fonts.regular30,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: perfectSize(10),
    paddingHorizontal: perfectSize(18),
  },
  notificationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(10),
    paddingHorizontal: perfectSize(15),
    marginVertical: perfectSize(5),
    shadowColor: colors.black,
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20.0,
    elevation: 2,
  },
  deleteIconView: {width: 16, height: 16},
  deleteIcon: {width: '100%', height: '100%'},
});
