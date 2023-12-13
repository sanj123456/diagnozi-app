import React, {FC} from 'react';
import {Pressable, StyleSheet, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';

import {images, perfectSize} from '../core';
import {UserAddPhotoImageProps} from '../types/components';

const UserAddPhotoImage: FC<UserAddPhotoImageProps> = props => {
  const {onPressCamera, backgroundImage} = props;

  return (
    <Pressable style={styles.imageView} onPress={onPressCamera}>
      {backgroundImage?.uri ? (
        <ImageBackground
          resizeMode="cover"
          source={{uri: backgroundImage.uri}}
          style={styles.backgroundImage}>
          <FastImage
            source={images.obCameraImage}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </ImageBackground>
      ) : (
        <FastImage
          source={images.obCameraImage}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      )}
    </Pressable>
  );
};
export default UserAddPhotoImage;
const styles = StyleSheet.create({
  imageView: {
    width: '100%',
    flex: 1,
    borderRadius: perfectSize(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: perfectSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageStyle: {
    width: perfectSize(184),
    height: perfectSize(155),
  },
});
