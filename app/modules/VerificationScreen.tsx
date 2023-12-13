import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {useNavigation} from '@react-navigation/native';

import {images} from '../core/constants';
import {perfectSize, screenName} from '../core';
import {strings} from '../i18n';
import {colors, fonts} from '../styles';
import {PrimaryButton} from '../components';
import {setHomeVerificationTitle} from '../redux/modules/profileSlice';
import {doctorDocumentVerificationAPI} from '../services/authServices';
import {RootState} from '../redux';

const VerificationScreen = (props: any) => {
  const {isUpload} = props;

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const verificationStatus = useSelector(
    (state: RootState) => state.profile.verificationStatus,
  );

  const pressHandler = useCallback(async () => {
    if (isUpload) {
      try {
        const dataObj: any = [];
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
          allowMultiSelection: true,
        });
        res.map(ele => {
          dataObj.push({name: ele.name, type: ele.type, uri: ele.uri});
        });

        doctorDocumentVerificationAPI(dataObj);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('ON CANCLE ERROR ', err);
        } else {
          console.log('ERROR :: ', err);
          throw err;
        }
      }
    }
    if (!isUpload) {
      dispatch(setHomeVerificationTitle(true));
      navigation.navigate(screenName.homeScreen);
    }
  }, [isUpload, navigation, dispatch]);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.obimage}
        resizeMode="contain"
        source={images.obCameraImage}
      />
      <Text style={styles.steps}>
        {isUpload === true ? strings.uploadDoc : strings.youDontHave}
      </Text>

      {verificationStatus?.message ? (
        <Text style={styles.message}>{verificationStatus.message}</Text>
      ) : null}

      <View style={styles.containerButton}>
        <PrimaryButton
          title={isUpload ? strings.upload : strings.start}
          onPress={pressHandler}
        />
      </View>
    </View>
  );
};
export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: perfectSize(20),
  },
  obimage: {
    marginBottom: perfectSize(20),
    height: perfectSize(200),
    width: perfectSize(200),
  },
  steps: {
    ...fonts.heading25,
    marginBottom: perfectSize(10),
    textAlign: 'center',
  },

  description: {
    ...fonts.light14,
    lineHeight: perfectSize(51),
    color: colors.obdescText,
  },
  message: {
    ...fonts.light14,
    lineHeight: perfectSize(20),
    color: colors.red,
    textAlign: 'center',
  },
  containerButton: {
    alignItems: 'center',
    marginTop: perfectSize(30),
    paddingBottom: perfectSize(50),
  },
});
