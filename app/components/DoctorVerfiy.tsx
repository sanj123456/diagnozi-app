import React, {FC, memo} from 'react';
import {View, Image, Text, StyleSheet, TextStyle} from 'react-native';

import {DoctorVerifyProps} from '../types/components';
import {colors, fonts} from '../styles';
import {perfectSize} from '../core';

const DoctorVerify: FC<DoctorVerifyProps> = ({
  title,
  description,
  imageUrl,
  textColor,
}) => {
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
    <View style={styles.verify}>
      <View style={styles.cardview}>
        <View>
          <Image style={styles.image} source={getImageSource()} />
        </View>
        <View>
          <Text style={titleStyle}>{title}</Text>
          <Text style={descriptionStyle}>{description}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  verify: {
    flex: 1,
  },
  cardview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {},
  title: {
    ...fonts.heading37,
    color: colors.white,
    lineHeight: perfectSize(21),
  },
  description: {
    ...fonts.regular24,
    color: colors.white,
    width: perfectSize(179),
    lineHeight: perfectSize(15),
  },
});
export default memo(DoctorVerify);
