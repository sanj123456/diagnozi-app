import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {View, TextInput, StyleSheet} from 'react-native';

import {colors, fonts} from '../styles';
import {images, perfectSize} from '../core';
import {strings} from '../i18n';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CommentInput = forwardRef<any, any>((props, ref) => {
  const {comment, onSend} = props;

  const inputRef = useRef<any>(null);
  const [text, setText] = useState(comment ? comment : '');

  useImperativeHandle(
    ref,
    () => ({
      getfocus: () => inputRef.current.focus(),
      setValue: (e: string) => setText(e),
      getValue: () => text,
    }),
    [text],
  );

  const onChangeText = useCallback((utext: string) => {
    setText(utext);
  }, []);

  const pressHandler = useCallback(() => {
    onSend(text);
  }, [text, onSend]);

  return (
    <View style={styles.root}>
      <TextInput
        ref={inputRef}
        multiline={true}
        textAlignVertical={'center'}
        placeholder={strings.enterText}
        value={text}
        onChangeText={onChangeText}
        blurOnSubmit={false}
        style={[styles.input]}
      />
      <TouchableOpacity
        disabled={text.trim().length === 0 ? true : false}
        style={[styles.sendPressable]}
        onPress={pressHandler}>
        <FastImage
          source={images.send}
          style={[styles.image, {opacity: text.trim().length === 0 ? 0.5 : 1}]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
});
export default memo(CommentInput);
const styles = StyleSheet.create({
  root: {
    // flex: 1,
    width: '100%',
    maxHeight: 120,
    flexDirection: 'row',
    backgroundColor: colors.secondaryWhite,
    alignItems: 'center',
    borderRadius: perfectSize(10),
    // marginTop: perfectSize(15),
  },
  input: {
    flex: 1,
    paddingHorizontal: perfectSize(20),

    ...fonts.medium15,
  },
  text: {
    ...fonts.regular16,
    lineHeight: perfectSize(21),
    marginBottom: perfectSize(15),
  },
  sendPressable: {
    marginBottom: 8,
    marginRight: 8,
    marginTop: 8,
  },
  image: {
    height: perfectSize(35),
    width: perfectSize(35),
  },
});
