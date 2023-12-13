import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

import {colors, fonts} from '../styles';
import {perfectSize} from '../core';
import {strings} from '../i18n';
import {FieldInputProps} from '../types/components';

const UserAddCommentInput = forwardRef<any, FieldInputProps>((props, ref) => {
  const {
    label,
    multiline,
    value,
    blurOnSubmit,
    maxLength,
    onSubmitEditing,
    onChangeText,
  } = props;

  const inputRef = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      getfocus: () => inputRef.current.focus(),
    }),
    [],
  );

  return (
    <View style={styles.root}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        ref={inputRef}
        multiline={multiline ? true : false}
        textAlignVertical={multiline ? 'top' : 'center'}
        placeholder={strings.enterText}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
        blurOnSubmit={blurOnSubmit}
        returnKeyType="next"
        style={[
          styles.input,
          {height: multiline ? perfectSize(100) : perfectSize(60)},
        ]}
      />
    </View>
  );
});
export default memo(UserAddCommentInput);
const styles = StyleSheet.create({
  root: {
    marginTop: perfectSize(15),
  },
  input: {
    width: '100%',
    backgroundColor: colors.secondaryWhite,
    paddingHorizontal: perfectSize(20),
    borderRadius: perfectSize(10),
    ...fonts.medium15,
  },
  text: {
    ...fonts.regular16,
    lineHeight: perfectSize(21),
    marginBottom: perfectSize(15),
  },
});
