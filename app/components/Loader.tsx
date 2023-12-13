import React, {FC} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {strings} from '../i18n';
import {RootState} from '../redux';
import {colors, fonts} from '../styles';
import {LoaderProps} from '../types/components';
import PrimaryText from './PrimaryText';
import {perfectSize} from '../core';

const Loader: FC<LoaderProps> = ({}) => {
  const isLoading = useSelector((state: RootState) => state.generic.isLoading);

  return (
    <Modal
      backdropOpacity={0.05}
      style={styles.modalStyles}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={isLoading}>
      <View style={styles.mainViewWrapper}>
        <ActivityIndicator size={'large'} color={colors.secondary} />

        <PrimaryText style={styles.text}>{strings.loading}</PrimaryText>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalStyles: {
    alignItems: 'center',
    zIndex: perfectSize(100),
  },
  mainViewWrapper: {
    backgroundColor: colors.white,
    paddingHorizontal: perfectSize(50),
    paddingVertical: perfectSize(30),
    borderRadius: perfectSize(20),
    alignItems: 'center',
  },
  mainImage: {
    height: perfectSize(220),
    width: perfectSize(220),
    resizeMode: 'contain',
  },
  text: {
    ...fonts.medium43,
    color: colors.blackText,
    marginTop: 15,
  },
});
