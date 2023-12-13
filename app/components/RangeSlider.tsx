import React from 'react';
import {StyleSheet, View, Text, TextProps} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {Slider, SliderProps} from '@miblanchard/react-native-slider';
import {perfectSize} from '../core';
import {colors, fonts} from '../styles';

declare type LinearProps = {
  linearProps?: LinearGradientProps;
  sliderProps: SliderProps;
  showValue?: boolean;
  isSlider?: boolean;
  hideThumb?: boolean;
  valueStyle?: TextProps;
};

const CustomThumb = () => <View style={styles.triangle} />;

function RangeSlider(props: LinearProps): JSX.Element {
  const renderThumbComponent = props.showValue
    ? {
        renderThumbComponent: props.hideThumb ? () => null : CustomThumb,
      }
    : null;
  return (
    <View style={styles.sliderView}>
      <View style={styles.backgroundStyle}>
        {props.linearProps ? (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.linearGradient}
            {...props.linearProps}
          />
        ) : (
          <View style={styles.linearGradient} />
        )}
        <Slider
          minimumTrackTintColor={'transparent'}
          maximumTrackTintColor={'transparent'}
          thumbStyle={styles.brightThumb}
          trackStyle={styles.track}
          containerStyle={styles.slider}
          step={1}
          // renderThumbComponent={() => props.showValue && <CustomThumb />}
          {...props.sliderProps}
          {...renderThumbComponent}
        />
      </View>
      {props.showValue && (
        <Text style={{...styles.textValue, ...props.valueStyle}}>
          {`${props.sliderProps.value?.toString()}%`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    marginVertical: perfectSize(10),
    borderRadius: perfectSize(20),
    height: perfectSize(12),
    justifyContent: 'center',
    // overflow: 'visible',
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
    height: perfectSize(50),
  },
  textValue: {
    ...fonts.regular28,
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
  slider: {
    position: 'absolute',
    width: '100%',
  },
  sliderView: {flexDirection: 'row', alignItems: 'center'},
});

export default RangeSlider;
