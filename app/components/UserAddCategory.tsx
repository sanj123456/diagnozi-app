import React, {useState, memo, FC, useCallback, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {colors, fonts} from '../styles';
import {perfectSize} from '../core';
import {FieldDropDownProps} from '../types/components';

const UserAddCategory: FC<FieldDropDownProps> = props => {
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
  const [value, setValue] = useState<any>('');

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
      />
    </View>
  );
};
export default memo(UserAddCategory);
const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginBottom: perfectSize(15),
  },
  dropDownstyle: {
    width: '100%',
    backgroundColor: colors.secondaryWhite,
    paddingHorizontal: perfectSize(20),
    borderRadius: perfectSize(10),
    height: perfectSize(40),
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  dropDownContainerStyle: {
    backgroundColor: colors.white,
    borderColor: colors.primaryGrey,
    borderWidth: perfectSize(1),
    zIndex: perfectSize(100),
    flex: 1,
  },
  selectedItemStyle: {
    color: colors.white,
    borderRadius: perfectSize(3),
    width: '100%',
  },
  label: {
    ...fonts.regular16,
    lineHeight: perfectSize(21),
    marginBottom: perfectSize(15),
  },
  searchTextInputStyle: {
    borderWidth: 0,
    ...fonts.medium15,
  },
  text: {
    ...fonts.medium15,
  },
});
