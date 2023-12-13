import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {perfectSize} from '../core';
import {colors, fonts} from '../styles';
import RenderHTML from 'react-native-render-html';

declare type switchToggleProps = {
  yes?: string;
  no?: string;
  value: boolean;
  radioViewStyle?: ViewStyle;
  toggleViewStyle?: ViewStyle;
  switchViewStyle?: ViewStyle;
  onChange: (value: boolean) => void;
};

function SwitchToggle(props: switchToggleProps): JSX.Element {
  const DropdownButton = useRef<any>();

  const windowDimensions = useWindowDimensions();
  const contentWidth = windowDimensions.width * 0.5;

  return (
    <View style={styles.center}>
      <View style={[styles.radioView, props.radioViewStyle]}>
        {props.yes != undefined && (
          <RenderHTML
            source={{html: props.yes || ''}}
            baseStyle={styles.yesTxt}
            contentWidth={contentWidth}
            defaultTextProps={{
              style: styles.yesTxt,
            }}
          />
        )}
        <View style={[styles.toggleView, props.toggleViewStyle]}>
          <TouchableOpacity
            ref={DropdownButton}
            activeOpacity={0.7}
            style={[
              styles.switchView,
              {
                backgroundColor: props.value
                  ? colors.toggleYesColor
                  : colors.toggleNoColor,
                justifyContent: props.value ? 'flex-start' : 'flex-end',
              },
              props.switchViewStyle,
            ]}
            onPress={() => props.onChange(!props.value)}>
            <View style={styles.switchBall} />
          </TouchableOpacity>
        </View>
        {props.no != undefined && (
          <RenderHTML
            source={{html: props.no || ''}}
            baseStyle={styles.notTxt}
            contentWidth={contentWidth}
            defaultTextProps={{
              style: styles.notTxt,
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {alignContent: 'center'},
  radioView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: perfectSize(10),
  },
  yesTxt: {
    ...fonts.regular12,
    color: colors.toggleYesTextColor,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  notTxt: {
    ...fonts.regular12,
    color: colors.toggleNoTextColor,
    flex: 1,
    flexWrap: 'wrap',
  },
  toggleView: {
    // flex: 1,
    width: perfectSize(93),
    // height: perfectSize(33),
    alignItems: 'center',
    paddingHorizontal: perfectSize(9),
  },
  switchView: {
    borderRadius: perfectSize(33),
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: perfectSize(33),
    paddingHorizontal: perfectSize(5),
  },
  switchBall: {
    height: perfectSize(26),
    width: perfectSize(26),
    backgroundColor: colors.white,
    borderRadius: perfectSize(20),
  },
});

export default SwitchToggle;
