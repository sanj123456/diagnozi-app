import React, {useCallback, useState, memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../styles';
import {images, perfectSize} from '../core';
import CommentText from './CommentText';
import {timeFromNow} from '../core/genericUtils';
import Popover from './Popover';
import CommentInput from './CommentInput';
import {useSelector} from 'react-redux';
import {strings} from '../i18n';
import DialogBox from './DialogBox';
import {RootState} from '../redux';

const options = [
  {
    label: 'Edit',
    value: 'edit',
  },
  {
    label: 'Delete',
    value: 'delete',
  },
];

function Comment(props: any) {
  const {
    user,
    message,
    updated_at,
    is_own,
    onSelect,
    isEdit,
    onDelete,
    onSend,
    onPressReply,
    onSendReply,
    isReply,
    id,
    replies,
  } = props;

  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );

  const [deleteDialogBox, setDeleteDialogBox] = useState(false);
  const [deleteID, setDeleteID] = useState(false);

  const cancelDeleteHandler = useCallback(() => {
    setDeleteDialogBox(false);
  }, []);

  const confirmDeleteHandler = useCallback(() => {
    onDelete(deleteID);
    setDeleteDialogBox(false);
  }, [onDelete, deleteID]);

  const selectHandler = useCallback(
    (sid: any, value: any) => {
      if (value === 'edit') {
        onSelect(sid);
      }

      if (value === 'delete') {
        setDeleteID(sid);
        setDeleteDialogBox(true);
      }
    },
    [onSelect],
  );

  const renderReplyCommentHandler = useCallback(
    (item: any) => {
      return (
        <View key={item.id}>
          <View style={styles.profileView}>
            <View style={styles.row}>
              <View style={styles.userprofile}>
                <Image
                  source={
                    item?.user?.profile_image
                      ? {uri: item.user.profile_image}
                      : images.userProfile
                  }
                  style={styles.userStyle}
                />
              </View>
              <View style={styles.profileNameView}>
                <Text style={styles.profileName}>{item.user.full_name}</Text>
              </View>
            </View>
            {item.is_own == 1 ? (
              <Popover
                data={options}
                onSelect={selectHandler.bind(null, item.id)}
              />
            ) : null}
          </View>
          <View style={styles.descView}>
            {isEdit === item.id ? (
              <CommentInput
                comment={item.message}
                onSend={(text: string) => onSend({id: item.id, text: text})}
              />
            ) : (
              <CommentText numberOfLines={3}>{item.message}</CommentText>
            )}
            <View style={styles.contain}>
              <Text style={styles.mintxt}>{timeFromNow(item.updated_at)}</Text>
            </View>
          </View>
        </View>
      );
    },
    [selectHandler, isEdit, onSend],
  );

  return (
    <>
      <View style={styles.profileView}>
        <View style={styles.row}>
          <View style={styles.userprofile}>
            <Image
              source={
                user.profile_image
                  ? {uri: user.profile_image}
                  : images.userProfile
              }
              style={styles.userStyle}
            />
          </View>
          <View style={styles.profileNameView}>
            <Text style={styles.profileName}>{user?.full_name}</Text>
          </View>
        </View>
        {is_own === 1 ? (
          <Popover data={options} onSelect={selectHandler.bind(null, id)} />
        ) : null}
      </View>
      <View style={styles.descView}>
        {isEdit === id ? (
          <CommentInput
            comment={message}
            onSend={(text: string) => onSend({id: id, text: text})}
          />
        ) : (
          <View>
            <CommentText numberOfLines={3}>{message}</CommentText>
            <View style={styles.contain}>
              {profileData.user_type === 3 || is_own === 1 ? (
                <TouchableOpacity
                  style={styles.replyPressable}
                  onPress={onPressReply.bind(null, id)}>
                  <Text style={styles.replyText}>{strings.reply}</Text>
                </TouchableOpacity>
              ) : null}

              <Text style={styles.mintxt}>{timeFromNow(updated_at)}</Text>
            </View>
            {isReply === id ? (
              <CommentInput
                onSend={(text: string) => onSendReply({id: id, text: text})}
              />
            ) : null}
          </View>
        )}
      </View>
      <View style={styles.tab}>{replies.map(renderReplyCommentHandler)}</View>
      <DialogBox
        modalVisible={deleteDialogBox}
        title={strings.deleteTitle}
        text={strings.deleteDes}
        onConfirm={confirmDeleteHandler}
        onCancel={cancelDeleteHandler}
      />
    </>
  );
}

export default memo(Comment);

const styles = StyleSheet.create({
  profileView: {
    flexDirection: 'row',
    marginTop: perfectSize(22),
    justifyContent: 'space-between',
  },
  userprofile: {},
  profileNameView: {
    paddingLeft: perfectSize(10),
  },
  profileName: {
    ...fonts.medium16,
    lineHeight: perfectSize(21),
    color: colors.black,
  },
  userStyle: {
    width: perfectSize(30),
    height: perfectSize(30),
    borderRadius: perfectSize(20),
  },
  descView: {
    paddingHorizontal: perfectSize(22),
  },
  mintxt: {
    ...fonts.regular10,
    color: ' rgba(0, 0, 0, 0.7)',
    lineHeight: perfectSize(15),
  },
  contain: {
    paddingTop: perfectSize(7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: perfectSize(20),
  },
  replyPressable: {
    marginRight: perfectSize(15),
    padding: 5,
  },
  replyText: {
    ...fonts.heading11,
    color: colors.appSloganText,
    lineHeight: perfectSize(15),
  },
  row: {flexDirection: 'row'},
  tab: {paddingLeft: 30},
});
