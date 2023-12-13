import moment from 'moment';
import {Dimensions} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {getStore} from '../redux';
import messaging from '@react-native-firebase/messaging';
import {constants} from './constants';

export const {width, height} = Dimensions.get('screen');

// These toast are used to show the message to replace alert message and for in app notification tray

export const errorToast = (
  description?: string,
  msg?: string,
  position?:
    | 'top'
    | 'bottom'
    | 'center'
    | {top?: number; left?: number; bottom?: number; right?: number},
) => {
  showMessage({
    message: msg ? msg : 'Error',
    description: description ? description : 'Oops! something went wrong',
    type: 'danger',
    position: position ?? 'bottom',
    icon: 'auto',
  });
};

export const successToast = (
  description: string,
  msg?: string,
  position?:
    | 'top'
    | 'bottom'
    | 'center'
    | {top?: number; left?: number; bottom?: number; right?: number},
) => {
  showMessage({
    message: msg ? msg : 'Success',
    description: description ? description : '',
    type: 'success',
    position: position ?? 'bottom',
    icon: 'auto',
  });
};

export const dateTimeComparison = (bigDate: any, smallDate: any) => {
  // console.log(
  //   'dateTimeComparison',
  //   moment(bigDate).format('YYYYMMDDHHmm'),
  //   moment(smallDate).format('YYYYMMDDHHmm'),
  //   !(
  //     moment(bigDate).format('YYYYMMDDHHmm') >=
  //     moment(smallDate).format('YYYYMMDDHHmm')
  //   ),
  // );
  return (
    moment(bigDate).format('YYYYMMDDHHmm') >=
    moment(smallDate).format('YYYYMMDDHHmm')
  );
};

export const dateFormat = (date: any) => {
  return moment.utc(date).format('DD.MM.YYYY');
};
export const formateDate = (date: any) => {
  return moment.utc(date).format('DD/MM/YYYY,');
};
export const dateTimeFormat = (date: any) => {
  return moment.utc(date).format('DD/MM/yyyy h:mm:ss');
};
export const timeFromNow = (date: any) => {
  return moment.utc(date).fromNow();
};

export const findRange = (data: any[]): {min: number; max: number} => {
  const arrayOfNumbers = data.map((d: any) => +d.name);
  return {
    min: Math.min(...arrayOfNumbers),
    max: Math.max(...arrayOfNumbers),
  };
};

export const isDoctor = (): boolean => {
  const profileData = getStore().profile.profileData;
  return profileData?.user_type == 3;
};

export const isVerifiedDoctor = (): boolean => {
  const profileData = getStore().profile.profileData;
  return profileData?.user_type == 3 && profileData?.profile_status == 1;
};

// const CURRENT_RESOLUTION = Math.sqrt(height * height + width * width);
const create = (designSize = {width: 414, height: 736}) => {
  if (
    !designSize ||
    !designSize.width ||
    !designSize.height ||
    typeof designSize.width !== 'number' ||
    typeof designSize.height !== 'number'
  ) {
    throw new Error(
      'create function | Invalid design size object! must have width and height fields of type Number.',
    );
  }
  // const DESIGN_RESOLUTION = Math.sqrt(
  //   designSize.height * designSize.height + designSize.width * designSize.width,
  // );
  // const RESOLUTIONS_PROPORTION = CURRENT_RESOLUTION / DESIGN_RESOLUTION;
  return (size: number) => size;
  // return (size: number) => RESOLUTIONS_PROPORTION * size;
};

const designResolution = {
  width: 375,
  height: 812,
}; //this size is the size that your design is made for (screen size)
export const perfectSize = create(designResolution);

export const subscribeTopic = async (topic: string) => {
  messaging()
    .subscribeToTopic(topic)
    .then(() => console.log('Subscribed to topic:', topic))
    .catch(e => {
      console.log(e);
    });
};

export const unsubscribeTopic = async (topic: string) => {
  messaging()
    .unsubscribeFromTopic(topic)
    .then(() => console.log('Unsubscribed fom the topic!', topic))
    .catch(e => {
      console.log(e);
    });
};

export const subscribeAllTopics = (profileData: any) => {
  subscribeTopic(profileData.uuid);
  profileData.user_type == 3 && subscribeTopic(constants.push_topic_doctor);
  profileData.user_type == 4 && subscribeTopic(constants.push_topic_user);
  profileData.user_type == 3 &&
    profileData?.category?.slug &&
    subscribeTopic(profileData.category.slug);
};
