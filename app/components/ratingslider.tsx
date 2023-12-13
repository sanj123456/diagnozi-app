import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Slider, SliderProps} from '@miblanchard/react-native-slider';
import {perfectSize} from '../core';
import {colors, fonts} from '../styles';

declare type linearProps = {
  sliderProps: SliderProps;
  showValue?: boolean;
};

const CustomThumb = () => null;

function RatingSlider(props: linearProps): JSX.Element {
  return (
    <View style={styles.backgroundStyle}>
      <Slider
        minimumTrackTintColor={colors.appSloganText}
        maximumTrackTintColor={colors.tintColor}
        thumbStyle={{backgroundColor: colors.appSloganText}}
        trackStyle={styles.track}
        containerStyle={styles.containerStyle}
        renderThumbComponent={CustomThumb}
        {...props.sliderProps}
      />
      {props.showValue && (
        <Text style={styles.textValue}>
          {`${props.sliderProps.value?.toString()}%`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brightThumb: {
    backgroundColor: colors.sliderThumb,
    borderRadius: perfectSize(25),
    height: perfectSize(25),
    width: perfectSize(25),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  track: {
    height: perfectSize(15),
    borderRadius: perfectSize(25),
  },
  textValue: {
    ...fonts.regular30,
    color: colors.black,
    marginLeft: perfectSize(7),
  },
  triangle: {
    top: perfectSize(10),
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: perfectSize(13),
    borderBottomWidth: perfectSize(20),
    borderLeftWidth: perfectSize(13),
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.triangle,
    borderLeftColor: 'transparent',
  },
  circleStyle: {
    top: 2,
  },
  containerStyle: {
    position: 'absolute',
    width: '100%',
  },
});

export default RatingSlider;
