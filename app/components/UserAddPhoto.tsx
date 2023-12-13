import React, {useState, memo, useCallback, FC, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {perfectSize} from '../core';
import UserAddPhotoContainer from './UserAddPhotoContainer';
import UserAddPhotoSlider from './UserAddPhotoSlider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createOrderAPI, updateOrderAPI} from '../services/commonServices';
import {UserAddPhotoProps} from '../types/components';

const UserAddPhoto: FC<UserAddPhotoProps> = props => {
  const {onAddValue, data, isEdit} = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [imageSlider, setImageSlider] = useState(false);
  const [imageData, setImageData] = useState<any>([]);

  const [editedImgData, setEditedImgData] = useState<any>([]);

  useEffect(() => {
    if (isEdit) {
      const array: any = [];
      data.files.map((ele: any) =>
        array.push({id: ele.id, uri: ele.full_file_path}),
      );
      setImageData(array);
    }
  }, [isEdit, data]);

  const pressHandler = useCallback(
    async (args?: any) => {
      if (currentPage == 1) {
        setCurrentPage(2);
      }
      if (currentPage === 2) {
        if (isEdit) {
          const result = await updateOrderAPI({
            ...editedImgData,
            service_order_id: data.id,
            ...args,
          });
          if (result === 1) {
            setImageSlider(false);
            onAddValue();
          }
        } else {
          const result = await createOrderAPI({...args, images: imageData});
          if (result === 1) {
            setCurrentPage(1);
            setImageData([]);
            onAddValue();
          }
        }
      }
    },
    [currentPage, onAddValue, imageData, editedImgData, data, isEdit],
  );

  const openImageSlider = useCallback(() => {
    setImageSlider(true);
  }, []);

  const closeImageSlider = useCallback((args?: any) => {
    if (args.editObj) {
      setEditedImgData(args.editObj);
    }
    setImageData(args.data);
    setImageSlider(false);
  }, []);

  return (
    <KeyboardAwareScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      extraScrollHeight={0}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={false}
      contentContainerStyle={styles.root}>
      {imageSlider === true ? (
        <UserAddPhotoSlider onPress={closeImageSlider} imageData={imageData} />
      ) : (
        <UserAddPhotoContainer
          onPressCamera={openImageSlider}
          currentPage={currentPage}
          onPress={pressHandler}
          backgroundImage={imageData[0]}
          data={data}
          isEdit={isEdit}
        />
      )}
    </KeyboardAwareScrollView>
  );
};
export default memo(UserAddPhoto);
const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: perfectSize(20),
  },
});
