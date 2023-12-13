import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {perfectSize} from '../core';
import {colors, fonts} from '../styles';
import RangeSlider from './RangeSlider';
import {strings} from '../i18n';
import {SliderOnChangeCallback} from '@miblanchard/react-native-slider/lib/types';

declare type doctorProps = {
  title: string;
  value: number;
  min: number;
  max: number;
  onChange: SliderOnChangeCallback;
  isSlider?: boolean;
};

function DoctorRangeSlider(props: doctorProps): JSX.Element {
  return (
    <View>
      <View style={styles.sliderView}>
        <Text style={styles.toggleTxt}>{props.title}</Text>
      </View>
      <View style={styles.percentView}>
        <Pressable
          onPress={() => {
            if (props.value === props.min) {
              return;
            }
            props.onChange([+props.value - 1]);
          }}>
          <Text style={styles.plusIcon}>-</Text>
        </Pressable>
        <Text style={styles.plusIcon}>{`${props.value} %`}</Text>
        <Pressable
          onPress={() => {
            if (props.value === props.max) {
              return;
            }
            props.onChange([+props.value + 1]);
          }}>
          <Text style={styles.plusIcon}>+</Text>
        </Pressable>
      </View>
      <View style={styles.rangesliderView}>
        <RangeSlider
          isSlider={props.isSlider}
          linearProps={{
            colors: colors.linear,
          }}
          sliderProps={{
            animationType: 'spring',
            minimumValue: props.min,
            maximumValue: props.max,
            value: props.value,
            onValueChange: props.onChange,
          }}
        />
      </View>
      <View style={styles.catView}>
        <View>
          <Text style={styles.toggleTxt}>{strings.clear}</Text>
        </View>
        <View>
          <Text style={styles.toggleTxt}>{strings.attention}</Text>
        </View>
        <View style={styles.toggleTxt}>
          <Text style={styles.uploadDate}>{strings.problem}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderView: {
    paddingTop: perfectSize(40),
    paddingLeft: perfectSize(10),
  },
  toggleTxt: {
    ...fonts.regular28,
    color: colors.black,
    flexWrap: 'wrap',
    paddingRight: perfectSize(15),
  },
  percentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: perfectSize(16),
    paddingBottom: perfectSize(13),
    paddingHorizontal: perfectSize(8),
  },
  plusIcon: {
    ...fonts.regular43,
    color: colors.black,
    // paddingLeft: perfectSize(15),
    // lineHeight: perfectSize(18),
  },
  rangesliderView: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: perfectSize(8),
  },
  catView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: perfectSize(10),
    paddingLeft: perfectSize(10),
  },
  uploadDate: {
    ...fonts.regular28,
    color: colors.black,
  },
});

export default DoctorRangeSlider;
