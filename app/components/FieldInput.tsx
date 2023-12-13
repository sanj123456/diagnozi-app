import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  memo,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import {constants, images} from '../core/constants';
import {colors, fonts} from '../styles';
import {FieldInputProps} from '../types/components';
import {perfectSize} from '../core';

const FieldInput = forwardRef<any, FieldInputProps>((props, ref) => {
  const {
    inputStyles,
    inputViewStyles,
    onChangeText,
    onBlur,
    value,
    blurOnSubmit,
    maxLength,
    onSubmitEditing,
    type,
    label,
    keyboardType,
    inputProps,
  } = props;

  /********** Hooks Functions ***********/
  const [hidePassword, setHidePassword] = useState(
    type == 'password' ? true : false,
  );

  const [isFocused, setIsFocused] = useState(false);
  const [date, setDate] = useState<string>('');
  const [open, setOpen] = useState(false);

  const inputRef = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      getfocus: () => inputRef.current.focus(),
    }),
    [],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(
    (agrs: any) => {
      setIsFocused(false);
      onBlur(agrs);
    },
    [onBlur],
  );

  const passwordIconHandler = useCallback(() => {
    if (type == constants.password) {
      setHidePassword(prev => !prev);
    } else if (type === constants.calendar) {
      setOpen(true);
    }
  }, [type]);

  const datePickerOpenHandler = useCallback(() => {
    if (type === constants.calendar) {
      setOpen(true);
    }
  }, [type]);

  const datePickerHandler = useCallback(
    (str: string, datedata?: Date | undefined) => {
      if (str === 'confirm') {
        setDate(`${moment(datedata).format('DD/MM/yyyy')}`);
        onChangeText(`${moment(datedata).format('yyyy-MM-DD')}`);
      }
      setOpen(false);
    },
    [onChangeText],
  );

  return (
    <TouchableOpacity
      style={[
        styles.root,
        inputViewStyles,
        {
          borderBottomColor: isFocused
            ? colors.borderColor
            : colors.primaryGrey,
        },
      ]}
      onPress={datePickerOpenHandler}>
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={[styles.input, inputStyles]}
          secureTextEntry={hidePassword}
          autoCapitalize={'none'}
          onChangeText={onChangeText}
          value={date ? date : value}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit={blurOnSubmit}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="next"
          editable={type === constants.calendar ? false : true}
          {...inputProps}
        />
        {type === constants.password || type === constants.calendar ? (
          <TouchableOpacity
            style={styles.pressable}
            onPress={passwordIconHandler}>
            <FastImage
              style={styles.eyeIcon}
              source={
                type == constants.password
                  ? hidePassword
                    ? images.icOpenEye
                    : images.icCloseEye
                  : images.calendar
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
        <DatePicker
          modal
          mode="date"
          onConfirm={datePickerHandler.bind(null, 'confirm')}
          onCancel={datePickerHandler.bind(null, 'cancel')}
          open={open}
          date={new Date()}
        />
      </View>
    </TouchableOpacity>
  );
});

export default memo(FieldInput);
const styles = StyleSheet.create({
  root: {
    // flex: 1,
    borderBottomWidth: perfectSize(1),
    marginTop: perfectSize(20),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    ...fonts.medium15,
    height: perfectSize(50),
    paddingHorizontal: 0,
    paddingRight: perfectSize(5),
  },
  label: {
    ...fonts.medium13,
    color: colors.inputLabel,
  },
  pressable: {
    padding: perfectSize(3),
  },
  eyeIcon: {
    height: perfectSize(20),
    width: perfectSize(20),
  },
});
