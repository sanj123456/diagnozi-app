import React, {useCallback} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {perfectSize, screenName} from '../core';
import TabNavigator from './TabNavigator';
import CustomDrawer from './CustomNavigator';
import {colors} from '../styles';
import {fonts} from '../styles/fonts';
import {strings} from '../i18n';
import ChangePassword from '../modules/ChangePassword';
import ReferralProgram from '../modules/ReferralProgram';

import BackButton from '../components/BackButton';
import NotificationButton from '../components/NotificationButton';
import SubscriptionPackage from '../modules/SubscriptionPackage';
import SubscriptionHistory from '../modules/SubscriptionHistory';
import EditProfile from '../modules/EditProfile';
import AddPhotoScreen from '../modules/AddPhotoScreen';
import {useSelector} from 'react-redux';
import MyTransactions from '../modules/MyTransactions';
import {RootState} from '../redux';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData,
  );

  const headerLeft = useCallback(() => {
    return <BackButton />;
  }, []);
  const headerRight = useCallback(() => {
    return <NotificationButton />;
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: colors.white,
        drawerInactiveBackgroundColor: colors.white,
        drawerInactiveTintColor: colors.black,
        drawerActiveTintColor: colors.black,
        drawerLabelStyle: {...fonts.medium15},
        headerLeft: headerLeft,
        headerRight: headerRight,
        headerTitleStyle: {...fonts.medium17},
        headerTitleAlign: 'center',
        headerLeftContainerStyle: {paddingLeft: perfectSize(15)},
        headerRightContainerStyle: {paddingRight: perfectSize(15)},
      }}>
      <Drawer.Screen
        component={TabNavigator}
        name={screenName.tabNavigator}
        options={{drawerLabel: strings.home, headerShown: false}}
      />
      {profileData.user_type === 3 ? (
        <Drawer.Screen
          component={AddPhotoScreen}
          name={screenName.AddPhotoScreen}
          options={{
            drawerLabel: strings.addPhoto,
            headerTitle: strings.addPhoto,
          }}
        />
      ) : null}
      <Drawer.Screen
        component={EditProfile}
        name={screenName.EditProfile}
        options={{
          drawerLabel: strings.EditProfile,
          headerTitle: strings.EditProfile,
        }}
      />
      <Drawer.Screen
        component={ChangePassword}
        name={screenName.changePassword}
        options={{
          drawerLabel: strings.changePassword,
          headerTitle: strings.changePassword,
        }}
      />

      <Drawer.Screen
        component={MyTransactions}
        name={screenName.myTransactions}
        options={{
          drawerLabel: strings.myTransactions,
          headerTitle: strings.myTransactions,
        }}
      />
      <Drawer.Screen
        component={SubscriptionHistory}
        name={screenName.mySubscriptionScreen}
        options={{
          drawerLabel: strings.subscriptionHistory,
          headerTitle: strings.mySubscription,
        }}
      />
      <Drawer.Screen
        component={ReferralProgram}
        name={screenName.referralProgram}
        options={{
          drawerLabel: strings.referralProgram,
          headerTitle: strings.referralProgram,
        }}
      />
      <Drawer.Screen
        component={SubscriptionPackage}
        name={screenName.subscriptionpackageScreen}
        options={{
          drawerLabel: strings.subscriptionPackage,
          headerTitle: strings.subscriptionPackage,
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
