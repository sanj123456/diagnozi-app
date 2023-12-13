import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {images} from '../core/constants';
import {CommonNavigationProps} from '../types/navigationTypes';
import {perfectSize, screenName} from '../core';
import {strings} from '../i18n';
import {colors, commonStyles, fonts} from '../styles';
import {PrimaryButton, UserAddPhoto} from '../components';
import {useSelector} from 'react-redux';
import {
  feedDetailAPI,
  feedOrderCommentAPI,
  addCommentAPI,
  feedquestionsAPI,
  orderVoteAPI,
  deleteOrderAPI,
} from '../services/commonServices';
import {RootState} from '../redux';
import {FeedDataProps} from '../types/components';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import DoctorRangeSlider from '../components/DoctorRangeSlider';
import FeedCard from '../components/FeedCard';
import {findRange, isVerifiedDoctor, timeFromNow} from '../core/genericUtils';
import SwitchToggle from '../components/SwitchToggle';
import {Formik} from 'formik';
import {number, object, string} from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
interface IField {
  name: any;
  label: string;
  initialValue: any;
  type: any;
}

const FeedDetailScreen: FC<CommonNavigationProps> = props => {
  const {navigation} = props;

  const formikRef = useRef<any>(null);
  const route = useRoute() as {
    params: {service_order_id: string};
  };
  const feedDetail = useSelector<RootState>(
    state => state.generic.feedDetail,
  ) as FeedDataProps;

  const isLoading = useSelector<RootState>(
    state => state.generic.isLoading,
  ) as boolean;

  const feedQuestions = useSelector<RootState>(
    state => state.generic.feedQuestions,
  ) as any[];

  const [isEditFeed, setEditFeed] = useState(false);

  const fields: IField[] = feedQuestions?.map(fq => ({
    name: fq.id,
    label: fq.question_name,
    initialValue: fq.question_answer_options[0].id,
    type: number().required(strings.thisIsRequired),
  }));

  const initialValues = Object.fromEntries(
    fields.map(field => [field.name, field.initialValue]),
  );

  const SchemaObject = Object.fromEntries(
    fields.map(field => [field.name, field.type]),
  );

  const FeedDetailsSchema = object().shape({
    ...SchemaObject,
    notes: isVerifiedDoctor()
      ? string()
      : string().required(strings.thisIsRequired),
  });

  const fetchFeedDetailCodeApi = useCallback(async () => {
    feedDetailAPI({service_order_id: route?.params?.service_order_id});
    feedOrderCommentAPI({service_order_id: route?.params?.service_order_id}, 1);
  }, [route]);

  useEffect(() => {
    fetchFeedDetailCodeApi();
  }, [fetchFeedDetailCodeApi]);

  useEffect(() => {
    if (feedDetail?.category?.id) {
      feedquestionsAPI({category_id: feedDetail?.category?.id});
    }
  }, [feedDetail?.category?.id]);

  useFocusEffect(
    useCallback(() => formikRef.current?.resetForm(), [formikRef]),
  );

  const onSubmit = (values: any) => {
    if (isVerifiedDoctor()) {
      const questions_id = [];
      const questions_options_id = [];
      for (let i = 0; i < Object.keys(values).length; i++) {
        if (Object.keys(values)[i] != 'notes') {
          questions_id.push(Object.keys(values)[i]);
          questions_options_id.push(values[Object.keys(values)[i]]);
        }
      }
      orderVoteAPI({
        service_order_id: route?.params?.service_order_id,
        questions_id,
        questions_options_id,
      });
    }
    if (values.notes) {
      addCommentAPI({
        service_order_id: route?.params?.service_order_id,
        message: values.notes,
      });
      onCommentViewHandler();
    }
  };

  const editFeedHandler = useCallback(() => {
    setEditFeed(true);
  }, []);

  const closeEditFeedHandler = useCallback(() => {
    fetchFeedDetailCodeApi();
    setEditFeed(false);
  }, [fetchFeedDetailCodeApi]);

  const deleteFeedHandler = useCallback(async () => {
    const res = await deleteOrderAPI(feedDetail.id);
    if (res === 1) {
      navigation.navigate(screenName.homeScreen);
    }
  }, [navigation, feedDetail]);

  const onCommentViewHandler = useCallback(() => {
    navigation.navigate(screenName.commentScreen, {
      service_order_id: route?.params?.service_order_id,
    });
  }, [navigation, route]);

  return (
    <View style={styles.root}>
      {isEditFeed ? (
        <UserAddPhoto
          onAddValue={closeEditFeedHandler}
          data={feedDetail}
          isEdit
        />
      ) : (
        <KeyboardAwareScrollView
          bounces={false}
          nestedScrollEnabled={true}
          extraScrollHeight={0}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchFeedDetailCodeApi}
            />
          }>
          <Formik
            innerRef={formikRef}
            initialValues={{...initialValues, notes: ''}}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validationSchema={FeedDetailsSchema}>
            {({values, errors, setFieldValue, handleChange, handleSubmit}) => (
              <View style={styles.container}>
                <FeedCard
                  {...feedDetail}
                  onEdit={editFeedHandler}
                  onDelete={deleteFeedHandler}
                />
                <View style={styles.uploadView}>
                  <Text style={styles.commentTxt}>
                    {timeFromNow(feedDetail?.created_at)}
                  </Text>
                  <View style={styles.patcommentView}>
                    <Text style={styles.commentTxt}>
                      {feedDetail?.description}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.viewAll}
                  onPress={onCommentViewHandler}>
                  <Text
                    style={
                      styles.viewAllText
                    }>{`${strings.viewAll} ${feedDetail?.comment_count} ${strings.comments} `}</Text>
                </TouchableOpacity>

                {isVerifiedDoctor() && (
                  <>
                    <ImageBackground
                      style={styles.bgStyle}
                      source={images.backgroundImage}>
                      {feedQuestions?.map((fq: any, inx) => (
                        <View key={`${inx}_questions`}>
                          {fq?.type === 'radio' && (
                            <SwitchToggle
                              yes={fq?.question_answer_options?.[0]?.name}
                              no={fq?.question_answer_options?.[1]?.name}
                              value={
                                fq?.question_answer_options?.find(
                                  (fa: any) => fa.id == values[fq.id],
                                )?.id == fq?.question_answer_options?.[0]?.id
                              }
                              onChange={(value: boolean) =>
                                setFieldValue(
                                  fq.id,
                                  value
                                    ? fq?.question_answer_options?.[0]?.id
                                    : fq?.question_answer_options?.[1]?.id,
                                )
                              }
                            />
                          )}
                          {fq?.type === 'slider' && (
                            <DoctorRangeSlider
                              isSlider={true}
                              title={fq?.question_name}
                              value={
                                +fq?.question_answer_options?.find(
                                  (fa: any) => fa?.id == values[fq.id],
                                )?.name
                              }
                              {...findRange(fq?.question_answer_options)}
                              onChange={value => {
                                console.log(value);
                                setFieldValue(
                                  fq.id,
                                  fq?.question_answer_options?.find(
                                    (fa: any) => +fa?.name == value[0],
                                  )?.id,
                                );
                              }}
                            />
                          )}
                        </View>
                      ))}
                    </ImageBackground>
                    <View>
                      <TextInput
                        multiline
                        style={[styles.textinputtextstyle]}
                        value={values.notes}
                        onChangeText={handleChange('notes')}
                        placeholder={strings.pleaseAddYourComments}
                      />
                      {errors.notes && typeof errors.notes === 'string' && (
                        <Text style={commonStyles.errorText}>
                          {errors.notes}
                        </Text>
                      )}
                    </View>
                    <View style={styles.contentContainer}>
                      <PrimaryButton
                        style={styles.button}
                        textStyle={styles.buttonText}
                        title={strings.submit}
                        onPress={handleSubmit}
                      />
                    </View>
                  </>
                )}
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};
export default FeedDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: perfectSize(18),
    marginBottom: perfectSize(20),
    // paddingTop: perfectSize(50),
  },
  uploadDate: {
    ...fonts.regular28,
    color: colors.black,
  },
  commentText: {
    ...fonts.medium16,
    color: colors.black,
  },
  comment: {
    ...fonts.regular28,
    color: colors.black,
  },

  commentTxt: {
    ...fonts.regular26,
    color: colors.titleGrey,
    lineHeight: perfectSize(20),
  },
  button: {
    width: '100%',
    borderRadius: perfectSize(43),
    height: perfectSize(43),
    paddingVertical: perfectSize(12),
  },
  buttonText: {
    ...fonts.medium16,
    color: colors.white,
  },
  contentContainer: {
    marginTop: perfectSize(10),
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  // scrollContentStyle: {
  //   paddingBottom: perfectSize(100),
  // },
  uploadView: {
    marginTop: perfectSize(20),
  },
  patcommentView: {
    paddingTop: perfectSize(10),
  },
  bgStyle: {
    // height: perfectSize(250),
    // borderRadius: 5,
    paddingVertical: perfectSize(30),
    marginBottom: perfectSize(20),
  },
  viewAll: {
    marginTop: perfectSize(5),
    marginBottom: perfectSize(20),
  },
  viewAllText: {
    ...fonts.regular14,
  },
  textinputtextstyle: {
    textAlignVertical: 'top',
    height: perfectSize(102),
    borderRadius: perfectSize(12),
    backgroundColor: colors.commentInput,
    marginTop: perfectSize(15),
    padding: perfectSize(10),
    ...fonts.regular26,
  },
});
