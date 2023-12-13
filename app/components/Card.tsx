import React, {FC} from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

import {CardProps} from '../types/components';
import {colors, fonts} from '../styles';
import {perfectSize} from '../core';

const Card: FC<CardProps> = ({
  title,
  description,
  backgroundColor,
  imageUrl,
  textColor,
}) => {
  const containerStyle: ViewStyle = {
    ...styles.card,
    backgroundColor,
  };
  const titleStyle: TextStyle = {
    ...styles.title,
    color: textColor,
  };

  const descriptionStyle: TextStyle = {
    ...styles.description,
    color: textColor,
  };

  const getImageSource = () => {
    return typeof imageUrl === 'string' ? {uri: imageUrl} : imageUrl;
  };

  return (
    <View style={containerStyle}>
      <View style={styles.cardview}>
        <FastImage
          style={styles.image}
          resizeMode="contain"
          source={getImageSource()}
        />

        <View style={styles.textView}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={descriptionStyle}>{description}</Text>
        </View>
      </View>
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.appSloganText,
    borderRadius: perfectSize(25),
    paddingVertical: perfectSize(40),
    paddingHorizontal: perfectSize(15),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  cardview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: perfectSize(80),
    width: perfectSize(80),
  },
  textView: {
    width: '70%',
    marginLeft: perfectSize(15),
  },
  title: {
    ...fonts.heading37,
    color: colors.white,
    lineHeight: perfectSize(21),
  },
  description: {
    ...fonts.regular12,
    color: colors.white,
    // width: perfectSize(179),
    lineHeight: perfectSize(15),
  },
});
