import React, {useState, memo, FC, useCallback, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {colors, commonStyles, fonts} from '../styles';
import {images, perfectSize} from '../core';
import {FieldDropDownProps} from '../types/components';
import FastImage from 'react-native-fast-image';

const FieldDropDown: FC<FieldDropDownProps> = props => {
  const {
    label,
    data,
    listMode,
    searchable,
    style,
    searchPlaceholder,
    onChangeValue,
    defaultValue,
  } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const valueHandler = useCallback(
    (val: any) => {
      onChangeValue(val);
    },
    [onChangeValue],
  );

  return (
    <View style={[styles.root, style]}>
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
      <DropDownPicker
        placeholder=""
        open={open}
        value={value}
        listMode={listMode}
        items={data}
        style={styles.dropDownstyle}
        dropDownDirection="BOTTOM"
        dropDownContainerStyle={styles.dropDownContainerStyle}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={valueHandler}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        searchTextInputStyle={styles.searchTextInputStyle}
        placeholderStyle={styles.label}
        showTickIcon={false}
        zIndex={100}
        zIndexInverse={100}
        labelStyle={styles.text}
        listItemLabelStyle={styles.text}
        selectedItemContainerStyle={{backgroundColor: colors.appSloganText}}
        selectedItemLabelStyle={styles.selectedItemStyle}
        ArrowUpIconComponent={({style: astyle}) => (
          <View style={astyle}>
            <FastImage
              style={commonStyles.flex}
              source={images.arrowUpIcon}
              resizeMode="contain"
            />
          </View>
        )}
        ArrowDownIconComponent={({style: astyle}) => (
          <View style={astyle}>
            <FastImage
              style={commonStyles.flex}
              source={images.arrowDownIcon}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};
export default memo(FieldDropDown);
const styles = StyleSheet.create({
  root: {
    marginTop: perfectSize(20),
    flex: 1,
  },
  dropDownstyle: {
    borderBottomWidth: perfectSize(1),
    borderRadius: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: colors.primaryGrey,
    paddingHorizontal: 0,
  },
  dropDownContainerStyle: {
    backgroundColor: colors.white,
    borderColor: colors.primaryGrey,
    borderWidth: perfectSize(1),
    flex: 1,
  },
  selectedItemStyle: {
    color: colors.white,
    borderRadius: perfectSize(3),
    width: '100%',
  },
  label: {
    ...fonts.medium13,
    color: colors.inputLabel,
  },
  searchTextInputStyle: {
    borderWidth: perfectSize(0),
    ...fonts.medium15,
  },
  text: {
    ...fonts.medium15,
  },
});
