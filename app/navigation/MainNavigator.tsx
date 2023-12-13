import React, {FC, useCallback, useEffect, useRef} from 'react';
import {AppState, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenName} from '../core';
import {fonts} from '../styles';
import {useSelector} from 'react-redux';
import {dispatch, RootState} from '../redux';
import {navigationRef} from './RootNavigation';
import {setAppStateVisible} from '../redux/modules/genericSlice';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import FeedDetailScreen from '../modules/FeedDetailScreen';
import Deposit from '../modules/Deposit';

import WithdrawHistory from '../modules/WithdrawHistory';
import Webscreen from '../modules/Webscreen';
import BackButton from '../components/BackButton';
import NotificationButton from '../components/NotificationButton';
import {strings} from '../i18n';
import WithdrawRequest from '../modules/WithdrawRequest';
import CommentScreen from '../modules/CommentScreen';
import Subscription from '../modules/Subscription';
import NotificationList from '../modules/NotificationList';

const Stack = createNativeStackNavigator();

const MainNavigator: FC = ({}) => {
  /*********** Props and data destructuring ***********/

  /*********** Hooks Functions ***********/

  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      dispatch(setAppStateVisible(appState.current));
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const headerLeft = useCallback(() => {
    return <BackButton />;
  }, []);

  const headerRight = useCallback(() => {
    return <NotificationButton />;
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerLeft: headerLeft,
          headerRight: headerRight,
          headerTitleStyle: {...fonts.medium17},
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}>
        {profileData?.token && profileData?.user_type ? (
          <Stack.Group>
            <Stack.Screen
              name={screenName.drawerNavigator}
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={screenName.feedDetailScreen}
              component={FeedDetailScreen}
              options={{headerTitle: strings.details}}
            />
            <Stack.Screen
              name={screenName.depositScreen}
              component={Deposit}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={screenName.withdrawhistoryScreen}
              component={WithdrawHistory}
              options={{headerShown: false}}
            />
            <Stack.Screen
              component={Webscreen}
              name={screenName.webscreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              component={WithdrawRequest}
              name={screenName.withdrawRequest}
              options={{headerShown: true}}
            />
            <Stack.Screen
              component={CommentScreen}
              name={screenName.commentScreen}
              options={{headerTitle: strings.comments}}
            />
            <Stack.Screen
              component={Subscription}
              name={screenName.subscriptionScreen}
              options={{headerTitle: strings.subscription}}
            />
            <Stack.Screen
              component={NotificationList}
              name={screenName.notificationList}
              options={{
                headerTitle: strings.notificationList,
                headerRight: () => <View />,
              }}
            />
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
