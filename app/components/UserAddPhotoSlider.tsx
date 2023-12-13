import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Dimensions,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {errorToast, images, perfectSize} from '../core';
import {colors} from '../styles';
import {strings} from '../i18n';
import {PrimaryButton} from '../components/index';
import {PERMISSIONS} from 'react-native-permissions';
import {CheckPermission} from '../core/CheckPermission';
import {RequestPermission} from '../core/RequestPermission';
import {
  // @ts-ignore
  openPicker,
} from '@baronha/react-native-multiple-image-picker';

const UserAddPhotoSlider = (props: any) => {
  const {onPress, imageData} = props;

  const width = Dimensions.get('window').width;
  const flatlistRef = useRef<any>();

  const [currentIndexButton, setCurrentIndexButton] = useState(0);
  const [data, setdata] = useState<any>(imageData);

  const [deletedImg, setDeletedImg] = useState<any>([]);

  const openImagePickerHandler = useCallback(() => {
    if (data.length >= 5) {
      errorToast(strings.maxi5Img, '', 'top');
      return;
    }
    const dataObj: any = [];
    openPicker({
      mediaType: 'image',
      isPreview: true,
    })
      .then((res: any) => {
        if (res.length > 5 || res.length + data.length > 5) {
          errorToast(strings.maxi5Img, '', 'top');
          return;
        }

        res.map((ele: any) => {
          dataObj.push({
            uuid: Math.floor(Math.random() * 10000),
            name: ele.fileName,
            type: ele.mime,
            uri: ele.path,
          });
        });
        setdata((prev: any) => [...prev, ...dataObj]);
      })
      .catch((error: any) => {
        console.log('ERRROR  :: ', error);
      });
  }, [data]);

  const showAlertHandler = useCallback(() => {
    Alert.alert('', strings.goToSetting, [
      {text: strings.cancel, style: 'cancel'},
      {
        text: strings.openSetting,
        style: 'default',
        onPress: () => Linking.openSettings(),
      },
    ]);
  }, []);

  const permissionHandler = useCallback(async () => {
    const permissionsArray =
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]
        : [
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          ];

    const result = await CheckPermission(permissionsArray);
    console.log('RESULT CHECK PERMISSIOM ', result);
    switch (result) {
      case 0:
        const result1 = await RequestPermission(permissionsArray);
        console.log('RESULT REquest PERMISSIOM ', result1);
        switch (result1) {
          case 0:
            showAlertHandler();
            break;

          case 1:
            // main action
            openImagePickerHandler();
            break;

          case -1:
            //BLOCKED

            break;
        }
        break;

      case 1:
        openImagePickerHandler();
        break;

      case -1:
        //BLOCKED

        break;
    }
  }, [showAlertHandler, openImagePickerHandler]);

  useEffect(() => {
    if (data.length === 0) {
      permissionHandler();
    }
  }, [permissionHandler, data]);

  const removeImageHandler = useCallback(
    (index: any) => {
      if (data[index].id) {
        setDeletedImg((prev: any) => [...prev, data[index].id]);
      }
      const array = [...data];
      array.splice(index, 1);
      setdata([...array]);
    },
    [data],
  );

  const renderItemHandler = useCallback(
    (item: any) => {
      return item.item.uri ? (
        <View style={[styles.imageView, {width: width - 50}]}>
          <FastImage
            source={{uri: item.item.uri}}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <Pressable
            style={styles.crossView}
            onPress={removeImageHandler.bind(null, item.index)}>
            <FastImage
              source={images.closeDrawer}
              style={styles.crossImage}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={[styles.imageView, {width: width - 50}]}
          onPress={permissionHandler}>
          <FastImage
            source={images.obCameraImage}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </Pressable>
      );
    },
    [width, removeImageHandler, permissionHandler],
  );

  const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
    setCurrentIndexButton(viewableItems[0]?.index);
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const getItemLayout = useCallback(
    (_: any, index: any) => ({
      length: data.length,
      offset: width * index,
      index,
    }),
    [width, data],
  );

  const buttonHandler = useCallback(
    (item: any, index: any) => {
      return (
        <View
          key={index}
          style={[
            styles.bulletButton,
            {
              backgroundColor:
                currentIndexButton === index
                  ? colors.appSloganText
                  : colors.primaryAppSloganText,
            },
          ]}
        />
      );
    },
    [currentIndexButton],
  );

  const ItemSeparatorComponentHandler = useCallback(() => {
    return <View style={styles.spacing} />;
  }, []);

  const pressHandler = useCallback(() => {
    if (imageData.length > 0) {
      const newImag: any = [];
      let array = data?.filter((item: any) => item.uuid);

      if (array.length > 0) {
        array.map((ele: any) =>
          newImag.push({name: ele.name, type: ele.type, uri: ele.uri}),
        );
      }
      if (newImag.length > 0 && deletedImg.length > 0) {
        onPress({
          editObj: {newImages: newImag, deletedImages: deletedImg},
          data: data,
        });
      } else if (newImag.length > 0) {
        onPress({editObj: {newImages: newImag}, data: data});
      } else if (deletedImg.length > 0) {
        onPress({editObj: {deletedImages: deletedImg}, data: data});
      } else {
        onPress({data: data});
      }
    } else {
      onPress({data: data});
    }
  }, [data, deletedImg, imageData, onPress]);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <FlatList
          ref={flatlistRef}
          data={data.length < 5 ? [...data, 'dummy'] : data}
          horizontal
          renderItem={renderItemHandler}
          pagingEnabled
          onViewableItemsChanged={onViewableItemsChanged}
          contentContainerStyle={styles.spacing}
          ItemSeparatorComponent={ItemSeparatorComponentHandler}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={viewabilityConfig}
          getItemLayout={getItemLayout}
        />
      </View>
      {data.length >= 1 && (
        <View style={[styles.buttonView, {width: width - 40}]}>
          {data.length >= 5
            ? data.map(buttonHandler)
            : [...data, 'Dummy'].map(buttonHandler)}
        </View>
      )}
      <PrimaryButton
        title={strings.continue}
        style={[styles.button, {opacity: data.length >= 1 ? 1 : 0.5}]}
        disabled={data.length >= 1 ? false : true}
        // onPress={onPress.bind(null, data)}
        onPress={pressHandler}
      />
    </View>
  );
};
export default UserAddPhotoSlider;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  spacing: {
    paddingHorizontal: perfectSize(8),
  },
  imageView: {
    borderRadius: perfectSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: perfectSize(25),

    overflow: 'hidden',
  },
  imageStyle: {
    width: perfectSize(184),
    height: perfectSize(155),
  },
  buttonView: {
    flexDirection: 'row',
    marginVertical: perfectSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletButton: {
    marginHorizontal: perfectSize(5),
    borderRadius: perfectSize(5),
    width: perfectSize(8),
    height: perfectSize(8),
  },
  button: {
    alignSelf: 'center',
    marginBottom: perfectSize(100),
  },
  crossView: {
    position: 'absolute',
    top: perfectSize(7),
    right: perfectSize(10),
    zIndex: perfectSize(1),
    padding: perfectSize(5),
  },
  crossImage: {
    height: perfectSize(20),
    width: perfectSize(20),
  },
});
