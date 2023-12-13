import React, {FC, useState, useCallback} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import ImageSlider from './ImageSlider';
import {FeedDataProps} from '../types/components';
import {images, perfectSize, screenName} from '../core';
import {colors, fonts} from '../styles';
import RangeSlider from './RangeSlider';
import Popover from './Popover';
import DialogBox from './DialogBox';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {strings} from '../i18n';

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

const FeedCard: FC<FeedDataProps> = props => {
  const {
    id,
    title,
    user,
    is_my_order,
    files,
    comment_count,
    answer_data,
    onDelete,
    onEdit,
  } = props;

  const navigation = useNavigation<any>();

  const [deleteDialogBox, setDeleteDialogBox] = useState(false);

  const cancelDeleteHandler = useCallback(() => {
    setDeleteDialogBox(false);
  }, []);
  const confirmDeleteHandler = useCallback(() => {
    onDelete();
    setDeleteDialogBox(false);
  }, [onDelete]);

  const selectHandler = useCallback(
    (value: any) => {
      if (value === 'edit') {
        onEdit();
      }
      if (value === 'delete') {
        setDeleteDialogBox(true);
      }
    },
    [onEdit],
  );

  const onCommentViewHandler = useCallback(() => {
    navigation.navigate(screenName.commentScreen, {
      service_order_id: id,
    });
  }, [navigation, id]);

  return (
    <View>
      <View style={styles.feeduser}>
        <View style={styles.commentView}>
          <View style={styles.userprofile}>
            <FastImage
              source={{
                uri:
                  user?.profile_image ||
                  Image.resolveAssetSource(images.userProfile).uri,
              }}
              style={styles.userStyle}
            />
          </View>
          <View style={styles.profilehead}>
            <Text style={styles.profileName}>{title}</Text>
          </View>
        </View>

        {is_my_order == 1 && (
          <Popover data={options} onSelect={selectHandler} />
        )}
      </View>

      {files && (
        <View style={styles.fileView}>
          <ImageSlider files={files} />
        </View>
      )}

      <View style={styles.userfooter}>
        <TouchableOpacity
          style={styles.commentView}
          onPress={onCommentViewHandler}>
          <FastImage
            resizeMode="contain"
            source={images.comment}
            style={styles.comments}
          />
          <Text style={styles.commentTxt}>{comment_count}</Text>
        </TouchableOpacity>
        <View style={styles.rangeSliderContainer}>
          <RangeSlider
            linearProps={{
              colors: colors.linear,
            }}
            sliderProps={{
              animationType: 'spring',
              minimumValue: 0,
              maximumValue: 100,
              value:
                answer_data?.find((a: any) => a.type === 'slider')?.avg_vote ||
                0,
              disabled: true,
            }}
            showValue={true}
          />
        </View>
      </View>
      <DialogBox
        modalVisible={deleteDialogBox}
        title={strings.deleteTitle}
        text={strings.deleteDes}
        onConfirm={confirmDeleteHandler}
        onCancel={cancelDeleteHandler}
      />
    </View>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  parentview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ddview: {
    width: perfectSize(160),
    backgroundColor: colors.white,
    paddingVertical: perfectSize(13),
    borderRadius: perfectSize(10),
  },
  filterview: {
    backgroundColor: colors.appSloganText,
    width: perfectSize(160),
    paddingVertical: perfectSize(13),
    borderRadius: perfectSize(10),
  },
  filter: {
    ...fonts.regular24,
    alignSelf: 'center',
    color: colors.white,
  },
  ddTxt: {
    ...fonts.regular24,
    alignSelf: 'center',
    color: colors.blackText,
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
    ...fonts.regular28,
    lineHeight: perfectSize(21),

    paddingLeft: perfectSize(8),
  },
  moreview: {
    width: perfectSize(78),
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appSloganText,
    paddingVertical: perfectSize(6),
    borderRadius: perfectSize(5),
  },
  more: {
    ...fonts.regular24,
    color: colors.white,
  },
  userfooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  dot: {
    backgroundColor: 'black',
    width: perfectSize(20),
    height: perfectSize(20),
    borderRadius: perfectSize(4),
    marginHorizontal: perfectSize(4),
  },
  activeDot: {
    backgroundColor: '#333',
    width: perfectSize(12),
    height: perfectSize(12),
    borderRadius: perfectSize(6),
    marginHorizontal: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: perfectSize(8),
  },
  paginationItem: {
    width: perfectSize(8),
    height: perfectSize(8),
    borderRadius: perfectSize(4),
    backgroundColor: '#ccc',
    marginHorizontal: perfectSize(4),
  },
  activePaginationItem: {
    backgroundColor: '#333',
  },
  commentTxt: {
    ...fonts.regular30,
    color: colors.titleGrey,
    lineHeight: perfectSize(20),
    paddingLeft: perfectSize(5),
  },
  commentView: {
    flexDirection: 'row',
    // paddingLeft: perfectSize(8),
    alignItems: 'center',
    padding: perfectSize(5),
  },
  fileView: {
    marginTop: perfectSize(10),
    marginBottom: perfectSize(10),
  },

  avgView: {
    paddingRight: perfectSize(5),
    top: perfectSize(-3),
  },
  rangeSliderContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
