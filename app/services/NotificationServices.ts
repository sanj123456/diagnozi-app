import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

interface Props {
  id: string;
  autoCancel: boolean;
  largeIcon: string;
  smallIcon: string;
  bigText: string;
  subText: string;
  vibrate: boolean;
  vibration: number;
  priority: string;
  importance: string;
  playSound: boolean;
  soundName: string;
  largeIconUrl: string;
  data: any;
}
class LocalPushNotification {
  configure = (onOpenNotification: any, onShowNotification: any) => {
    PushNotification.configure({
      onRegister: function () {
        //console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        if (!notification?.userInteraction) {
          onShowNotification(
            Platform.OS === 'ios' ? notification.data.item : notification.data,
          );
        } else {
          onOpenNotification(
            Platform.OS === 'ios' ? notification.data.item : notification.data,
          );
          if (Platform.OS === 'ios') {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }
        }
      },
      onAction: function (notification) {
        console.log('ACTION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.createChannel(
      {
        channelId: 'diagnozi_channel',
        channelName: 'My channel',
        channelDescription: 'A channel to categorize your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => {},
    );
  };
  unRegister = () => {
    PushNotification.unregister();
  };

  buildAndroidNotification = (
    id: string | number,
    title: string,
    message: string,
    data: any,
    option: any,
  ) => {
    return {
      id: id,
      autoCancel: true,
      largeIcon: option?.largeIcon || 'ic_launcher',
      smallIcon: option?.smallIcon || 'ic_notification',
      largeIconUrl: option?.largeIconUrl || '',
      bigText: message || '', // (optional) default: "message" prop
      subText: title || '',
      vibrate: option?.vibrate || true,
      vibration: option?.vibration || 300,
      priority: option?.priority || 'high', // (optional) set notification priority, default: high
      importance: option?.importance || 'high',
      data: data,
    };
  };
  buildIOSNotification = (
    id: string | number,
    title: string,
    message: string,
    data: any,
    option: any,
  ) => {
    return {
      alertAction: option.alertAction || 'view',
      category: option.category || '',
      userInfo: {
        id: id,
        item: data,
      },
    };
  };

  showNotification = (
    id: string | number,
    title: string,
    message: string,
    data: any,
    option: Partial<Props>,
  ) => {
    console.log(
      'Data in show notification Title',
      title,
      '   Message',
      message,
      '\n id',
      id,
    );
    PushNotification.localNotification({
      ...this.buildAndroidNotification(id, title, message, data, option),
      ...this.buildIOSNotification(id, title, message, data, option),
      channelId: 'my_ordering_app_channel',
      title: title || '', // (optional)
      message: message || '', // (required)
      //   playSound: option.playSound || true, // (optional) default: true
      //   soundName: option.soundName || 'ordergurunotification.mp3',
      ignoreInForeground: false,
      invokeApp: false,
    });
  };

  cancelAllLocalNotification = () => {
    PushNotification.cancelAllLocalNotifications();
  };
  removeDeliveredNotifications = (identifiers: string) => {
    PushNotification.removeDeliveredNotifications([identifiers]);
  };
  cancelLocalNotification = (identifier: string) => {
    PushNotification.cancelLocalNotification(identifier);
  };
}

export const notificationService = new LocalPushNotification();
