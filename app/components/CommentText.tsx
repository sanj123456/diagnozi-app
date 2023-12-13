import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextStyle,
} from 'react-native';
import {colors, fonts} from '../styles';
import {perfectSize} from '../core';
import {strings} from '../i18n';

declare type commentTextProps = {
  numberOfLines: number;
  children: string;
  textStyle?: TextStyle;
};

function CommentText(props: commentTextProps): JSX.Element {
  const [loadMore, setLoadMore] = useState(false);
  const [numOfLines, setNumOfLines] = useState(0);

  const onTextLayout = useCallback(
    (e: any) => {
      if (numOfLines == 0) {
        setNumOfLines(e.nativeEvent.lines.length);
      }
    },
    [numOfLines],
  );

  const onLoadMoreToggle = () => {
    setLoadMore(!loadMore);
  };

  return (
    <View style={styles.container}>
      <Text
        numberOfLines={
          numOfLines == 0
            ? undefined
            : loadMore
            ? numOfLines
            : props.numberOfLines
        }
        onTextLayout={onTextLayout}
        style={[styles.bodyText, props.textStyle]}>
        {props.children}
      </Text>
      {numOfLines > props.numberOfLines && (
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={onLoadMoreToggle}>
            <Text style={styles.linkText}>
              {loadMore ? strings.less : strings.more}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  bodyText: {
    ...fonts.regular26,
    color: 'rgba(0, 0, 0, 0.7)',
    lineHeight: perfectSize(20),
    paddingHorizontal: perfectSize(20),
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  linkText: {
    ...fonts.regular12,
    color: colors.appSloganText,
  },
});
export default CommentText;
