import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
} from 'react-native';
import Comment from '../components/Comment';
import {
  addCommentAPI,
  deleteCommentAPI,
  feedDetailAPI,
  feedOrderCommentAPI,
  replyCommentAPI,
  updateCommentAPI,
} from '../services/commonServices';
import {colors, fonts} from '../styles';
import {perfectSize} from '../core';
import {isVerifiedDoctor} from '../core/genericUtils';
import {strings} from '../i18n';
import {NoDataFound, PrimaryButton} from '../components';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import FooterLoader from '../components/FooterLoader';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

const {StatusBarManager} = NativeModules;

let statusBarHeight = 0;
if (Platform.OS === 'ios') {
  StatusBarManager.getHeight((statusBarFrameData: any) => {
    statusBarHeight = statusBarFrameData.height;
  });
}

const IOS_OFFSET = 44;

const getVerticalOffset = () =>
  Platform.select({
    ios: statusBarHeight + IOS_OFFSET + 20,
    android: 150,
  });

const CommentScreen = (props: any) => {
  const {route} = props;
  const data = route.params;

  const {
    isLoading,
    isLoadingMore,
    data: commentsData,
    message,
    meta,
  } = useSelector((state: RootState) => state.comments);

  const {feedDetail} = useSelector((state: RootState) => state.generic);

  const [isEdit, setEdit] = useState('');
  const [isReply, setIsReply] = useState('');
  const [text, setText] = useState('');

  const fetchDetailsData = useCallback(() => {
    feedDetailAPI({service_order_id: data.service_order_id});
  }, [data]);

  useEffect(() => {
    fetchDetailsData();
  }, [fetchDetailsData]);

  const onEditCommentHandler = useCallback((id: any) => {
    setEdit(id);
  }, []);

  const onReplyCommentHandler = useCallback((id: any) => {
    setIsReply(id);
  }, []);

  const updateCommentHandler = useCallback(
    (dataObj: any) => {
      updateCommentAPI({
        service_order_id: data.service_order_id,
        data: dataObj,
      });
    },
    [data],
  );

  const deleteCommentHandler = useCallback(
    (commentId: any) => {
      setEdit('');
      deleteCommentAPI({
        service_order_id: data.service_order_id,
        commentId: commentId,
      });
    },
    [data],
  );

  const replyCommentHandler = useCallback(
    (dataObj: any) => {
      replyCommentAPI({
        service_order_id: data.service_order_id,
        data: dataObj,
      });
    },
    [data],
  );

  const commentHandler = useCallback(
    (item: any) => {
      return (
        <Comment
          key={item.item.id}
          {...item.item}
          isEdit={isEdit}
          onSelect={onEditCommentHandler}
          onSend={updateCommentHandler}
          onDelete={deleteCommentHandler}
          isReply={isReply}
          onPressReply={onReplyCommentHandler}
          onSendReply={replyCommentHandler}
        />
      );
    },
    [
      isReply,
      onEditCommentHandler,
      updateCommentHandler,
      deleteCommentHandler,
      isEdit,
      onReplyCommentHandler,
      replyCommentHandler,
    ],
  );

  const onChangeText = useCallback((str: string) => {
    setText(str);
  }, []);

  const fetchData = useCallback(
    (page: any) => {
      feedOrderCommentAPI({service_order_id: data.service_order_id}, page);
    },
    [data],
  );

  const handleRefresh = useCallback(() => {
    fetchData(1);
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore && meta.current_page < meta.last_page) {
      fetchData(+meta.current_page + 1);
    }
  }, [isLoadingMore, meta, fetchData]);

  const submitHandler = useCallback(() => {
    addCommentAPI({
      service_order_id: data.service_order_id,
      message: text,
    });
    setText('');
  }, [data, text]);

  return (
    <View style={styles.root}>
      <KeyboardAwareFlatList
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={false}
        data={commentsData}
        keyExtractor={item => item.id}
        renderItem={commentHandler}
        contentContainerStyle={styles.flatlistContextContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={handleLoadMore}
        refreshing={isLoading}
        ListFooterComponent={
          <FooterLoader
            visible={commentsData && commentsData.length > 0 && isLoadingMore}
          />
        }
        onRefresh={handleRefresh}
        ListEmptyComponent={() => !isLoading && <NoDataFound error={message} />}
      />

      {(isVerifiedDoctor() || feedDetail?.is_my_order == 1) &&
        isReply == '' && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={getVerticalOffset()}>
            <View style={styles.addView}>
              <Text style={styles.uploadDate}>{strings.addComments}</Text>
            </View>

            <TextInput
              multiline
              style={[styles.textinputtextstyle]}
              value={text}
              onChangeText={onChangeText}
              placeholder={strings.pleaseAddYourComments}
              onFocus={() => setIsReply('')}
            />
            <View style={styles.contentContainer}>
              <PrimaryButton
                style={[styles.button, {opacity: text.length === 0 ? 0.5 : 1}]}
                disabled={text.length === 0 ? true : false}
                textStyle={styles.buttonText}
                title={strings.submit}
                onPress={submitHandler}
              />
            </View>
          </KeyboardAvoidingView>
        )}
    </View>
  );
};
export default CommentScreen;
const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: perfectSize(20),
    paddingBottom: perfectSize(20),
  },
  addView: {
    paddingTop: perfectSize(20),
  },
  uploadDate: {
    ...fonts.regular28,
    color: colors.black,
  },
  flatlistContextContainer: {
    paddingVertical: perfectSize(10),
    flexGrow: 1,
  },
  textinputtextstyle: {
    textAlignVertical: 'top',
    height: perfectSize(102),
    borderRadius: perfectSize(12),
    backgroundColor: colors.commentInput,
    marginTop: perfectSize(15),
    padding: perfectSize(10),
    ...fonts.regular26,
  },
  contentContainer: {
    marginTop: perfectSize(10),
  },
  button: {
    width: '100%',
    borderRadius: perfectSize(43),
    height: perfectSize(43),
    paddingVertical: perfectSize(12),
  },
  buttonText: {
    ...fonts.medium16,
    color: colors.white,
  },
});
