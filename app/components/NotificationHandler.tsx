import React, {FC, Fragment, useEffect, useRef, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {constants, errorToast, screenName} from '../core';
import {
  fcmAddApi,
  getAsyncData,
  notificationService,
  setAsyncData,
} from '../services';
import {navigate} from '../navigation/RootNavigation';
import {RootState} from '../redux';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {notificationCountAPI} from '../services/commonServices';

const NotificationHandler: FC = ({}) => {
  // ******************** Hooks Functions ************************ //
  const delayTimeout = useRef<any>(null);

  // updating fcm token in server side
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );

  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    if (profileData && profileData?.token && fcmToken) {
      (async () => {
        const fcmTokenS = await getAsyncData(constants.asyncFcmToken);
        if (fcmTokenS) {
          console.log('updated fcm token', fcmTokenS);
          fcmAddApi({device_token: fcmTokenS});
        }
      })();
    }
  }, [profileData, fcmToken]);

  useEffect(() => {
    onComponentMount();
    notificationService.configure(onOpenNotification, onShowNotification);
    return () => {
      notificationService.unRegister();
      clearTimeout(delayTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ******************** Main Functions ************************ //

  const onShowNotification = () => {};

  const onOpenNotification = (notify: any) => {
    console.log('App  onOpenNotification:', notify);
    if (notify) {
      switch (notify.notification_type) {
        case constants.push_navigation_feed:
          delayTimeout.current = setTimeout(
            () =>
              navigate(screenName.feedDetailScreen, {
                service_order_id: notify.id_data,
              }),
            800,
          );

          break;

        default:
          break;
      }
    }
  };

  const onComponentMount = async () => {
    await checkPermission();
    await createNotificationListeners(); //add this line

    if (Platform.OS === 'ios') {
      PushNotificationIOS.getInitialNotification()
        .then(res => {
          console.log('notification handler compount mount', res);
          if (res) {
            // @ts-ignore
            onOpenNotification(res?._data?.item);
          }
        })
        .catch(e => console.log('iOS getInitialNotification ERROR', e));
    }

    messaging().onMessage(async remoteMessage => {
      const {notification, data} = remoteMessage;
      console.log('notification from component did mount', remoteMessage);
      const notificationId = Math.trunc(Math.random() * 10000);
      notificationService.showNotification(
        // @ts-ignore
        notificationId,
        // @ts-ignore
        notification.title,
        // @ts-ignore
        notification.body,
        data,
        {},
      );
      notificationCountAPI();
      // if (Platform.OS === 'ios' && data?.orderId) {
      //   onShowNotification(data);
      // }
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      const {data} = remoteMessage;
      onOpenNotification(data);
    });
  };

  const checkPermission = async () => {
    // authorizationStatus: 1=Authorized, 0=Denied, -1=Not Determined, 2=Provisional
    const authorizationStatus = await messaging().requestPermission({
      sound: true,
      alert: true,
      badge: true,
    });
    console.log('Permission status:', authorizationStatus);
    if (authorizationStatus === 1) {
      console.log('Permission status:-------------------', authorizationStatus);
      await getToken();
    } else if (authorizationStatus === 0) {
      console.log('User denied permissions request');
      errorToast(
        'Notification permissions are not allowed. Please update App notification permissions from settings',
      );
    }
  };

  const getToken = async () => {
    let fcmTokens = await getAsyncData(constants.asyncFcmToken);
    // await messaging().deleteToken();
    const fcmTokenNew = await messaging().getToken();
    console.log('FCM TOKEN async----', fcmTokens);
    console.log('FCM TOKEN NEW async----', fcmTokenNew);
    if (fcmTokens != fcmTokenNew) {
      console.log('FCM TOKEN null 1');
      fcmTokens = fcmTokenNew;
      console.log('FCM TOKEN null 2');
      console.log('FCM TOKEN firebase ----', fcmTokens);
      if (fcmTokens) {
        // user has a device token
        await setAsyncData(constants.asyncFcmToken, fcmTokens);
        console.log('FCM TOKEN AsyncStorageFirebase ----', fcmTokens);
      }
    }
    setFcmToken(fcmTokens);
  };

  const createNotificationListeners = async () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          const {data} = remoteMessage;
          onOpenNotification(data);
        }
      })
      .catch(e =>
        console.log(
          'Notification caused app to open from quit state Error:',
          e,
        ),
      );
  };

  return <Fragment />;
};

export default NotificationHandler;
