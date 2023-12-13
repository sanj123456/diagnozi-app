import React, {FC, memo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import {ImageSliderProps} from '../types/components';
import {images, perfectSize} from '../core';
import {colors} from '../styles';
import FastImage from 'react-native-fast-image';

const ImageSlider: FC<ImageSliderProps> = ({files}) => {
  const _files = [...files];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        index={activeIndex}
        paginationStyle={styles.paginationStyle}
        onIndexChanged={index => setActiveIndex(index)}
        showsButtons={true}
        nextButton={
          <FastImage
            source={images.rightImg}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        }
        prevButton={
          <FastImage
            source={images.leftImg}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        }>
        {_files?.map((file, index) => (
          <View key={index}>
            <FastImage
              key={index}
              source={{
                uri: file.full_file_path,
              }}
              style={styles.image}
            />
          </View>
        ))}
      </Swiper>
      {/* {_files?.length - 1 ? (
        <View style={styles.arrowContainer}>
          <TouchableOpacity style={styles.arrowButton} onPress={handlePrev}>
            <Image
              source={images.leftImg}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
            <Image
              source={images.rightImg}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.appSloganText,
    width: '100%',
    aspectRatio: 1 / 0.66,
    borderRadius: perfectSize(8),
    overflow: 'hidden',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    // flex: 1,
  },
  slide: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: perfectSize(150),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dot: {
    width: perfectSize(8),
    height: perfectSize(8),
    borderRadius: perfectSize(8),
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  activeDot: {
    width: perfectSize(8),
    height: perfectSize(8),
    borderRadius: perfectSize(8),
    overflow: 'hidden',
    backgroundColor: colors.appSloganText,
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
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: perfectSize(1),
    marginTop: perfectSize(8),
    // backgroundColor: 'red',
    bottom: '55%',
  },
  arrowButton: {
    padding: perfectSize(8),
  },
  arrowIcon: {
    width: perfectSize(24),
    height: perfectSize(24),
  },

  paginationStyle: {bottom: perfectSize(16)},
});
export default memo(ImageSlider);
