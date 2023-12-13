import React, {memo} from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {images, perfectSize} from '../core';
import {colors, fonts} from '../styles';

declare type popoverProps = {
  data: {
    value: string;
    label: string;
  }[];
  onSelect: (value: any) => void;
};

const Popover = ({data, onSelect}: popoverProps) => (
  <Menu onSelect={onSelect} renderer={renderers.NotAnimatedContextMenu}>
    <MenuTrigger>
      <Image source={images.threeDots} />
    </MenuTrigger>
    <MenuOptions optionsContainerStyle={styles.menu}>
      {data.map((d: any, inx: number) => (
        <MenuOption key={`${inx}_popover`} value={d.value}>
          <Text style={styles.menuoption}>{d.label}</Text>
        </MenuOption>
      ))}
    </MenuOptions>
  </Menu>
);

const styles = StyleSheet.create({
  menu: {
    marginTop: perfectSize(29),
    backgroundColor: colors.appSloganText,
    width: perfectSize(95),
    borderRadius: perfectSize(8),
    paddingVertical: perfectSize(9),
    paddingHorizontal: perfectSize(12),
  },
  menuoption: {
    ...fonts.semibold14,
    color: colors.white,
  },
});

export default memo(Popover);
