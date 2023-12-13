import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../styles';
import {fontFamily} from '../styles/fonts';
import PrimarySmallButton from './PrimarySmallButton';
import {perfectSize} from '../core';
import {strings} from '../i18n';

const DialogBox = (props: any) => {
  const {modalVisible, onCancel, onConfirm, title, text} = props;

  return (
    <Modal transparent={true} visible={modalVisible} animationType="none">
      <View style={styles.root}>
        <View style={styles.modalContainer}>
          {title ? <Text style={styles.Title}>{title}</Text> : null}

          <Text>{text}</Text>
          <View style={styles.buttonLayout}>
            <PrimarySmallButton
              title={strings.okey}
              style={styles.confirmButton}
              textStyle={styles.confirmText}
              onPress={onConfirm}
            />
            <PrimarySmallButton
              title={strings.Cancel}
              style={styles.cancelButtonStyle}
              textStyle={styles.cancelStyle}
              onPress={onCancel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DialogBox;
const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primaryBlack,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: perfectSize(20),
    width: '100%',
  },
  modalContainer: {
    borderWidth: perfectSize(2),
    borderRadius: perfectSize(20),
    borderColor: colors.appSloganText,
    backgroundColor: colors.white,
    padding: perfectSize(20),
    width: '100%',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    marginRight: perfectSize(10),
    padding: perfectSize(5),
  },
  Title: {
    fontFamily: fontFamily.poppinsBold,
    fontSize: perfectSize(20),
    color: colors.appSloganText,
  },
  buttonLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: perfectSize(20),
    gap: perfectSize(20),
  },
  cancelButtonStyle: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: perfectSize(1),
    borderColor: colors.appSloganText,
  },
  confirmButton: {
    flex: 1,
  },
  confirmText: {
    fontFamily: fontFamily.primaryBold,
  },
  cancelStyle: {
    color: colors.appSloganText,
    fontFamily: fontFamily.primaryBold,
  },
});
