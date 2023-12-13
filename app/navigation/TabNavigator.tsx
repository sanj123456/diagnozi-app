import React, {FC, useCallback} from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {images, perfectSize, screenName} from '../core';
import {colors, fonts} from '../styles';

import FeedScreen from '../modules/FeedScreen';
import Home from '../modules/Home';
import Rating from '../modules/Rating';
import Profile from '../modules/Profile';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import NotificationButton from '../components/NotificationButton';
import {RootState} from '../redux';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const TabBarBackground = () => {
  return (
    <LinearGradient
      colors={['rgba(0, 0, 0, 0.20)', 'rgba(0, 0, 0, 0.00)']}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      style={{
        height: perfectSize(105),
        marginHorizontal: -perfectSize(24),
      }}>
      <View
        style={{
          backgroundColor: colors.white,
          height: perfectSize(70),
          borderRadius: perfectSize(20),
          marginTop: perfectSize(10),
          marginHorizontal: perfectSize(24),
        }}
      />
    </LinearGradient>
  );
};

const TabNavigator: FC = (props: any) => {
  const {navigation} = props;

  const {profileData, isUploadStart} = useSelector(
    (state: RootState) => state.profile,
  );

  const iconHandler = useCallback((values: any) => {
    const {focused, children} = values;
    switch (children) {
      case 'first':
        return (
          <View style={focused ? styles.tabbg : styles.tabbgwhite}>
            <Image
              source={focused ? images.homeWhite : images.home}
              style={focused ? styles.feeds : styles.feed}
            />
          </View>
        );

      case 'second':
        return (
          <View style={focused ? styles.tabbg : styles.tabbgwhite}>
            <Image
              source={focused ? images.feedWhite : images.feed}
              style={focused ? styles.feeds : styles.feed}
            />
          </View>
        );

      case 'third':
        return (
          <View style={focused ? styles.tabbg : styles.tabbgwhite}>
            <Image
              source={focused ? images.chartWhite : images.chart}
              style={focused ? styles.feeds : styles.feed}
            />
          </View>
        );
      case 'fourth':
        return (
          <View style={focused ? styles.tabbg : styles.tabbgwhite}>
            <Image
              source={focused ? images.userWhite : images.user}
              style={focused ? styles.feeds : styles.feed}
            />
          </View>
        );
    }
  }, []);

  const drawerHandler = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  const headerLeft = useCallback(() => {
    return (
      <Pressable onPress={drawerHandler} style={styles.drawerPressable}>
        <FastImage
          resizeMode="contain"
          source={images.drawer}
          style={styles.icon}
        />
      </Pressable>
    );
  }, [drawerHandler]);

  const headerRight = useCallback(() => {
    return <NotificationButton />;
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={
        (isUploadStart === false &&
          profileData.user_type === 3 &&
          profileData.profile_status === 0) ||
        (isUploadStart === false &&
          profileData.user_type === 3 &&
          profileData.profile_status === 2)
          ? screenName.feedscreen
          : screenName.homeScreen
      }
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerTitleStyle: {...fonts.medium17},
        headerTitleAlign: 'center',
        headerLeft: headerLeft,
        headerRight: headerRight,
        tabBarActiveTintColor: colors.appSloganText,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: TabBarBackground,

        // tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarShowLabel: false,

        // tabBarItemStyle: styles.tabBarItemStyle,
      }}>
      <Tab.Screen
        name={screenName.homeScreen}
        component={Home}
        options={{
          tabBarIcon: data => iconHandler({...data, children: 'first'}),
          headerTitleContainerStyle: {
            width: '100%',
          },
        }}
      />
      <Tab.Screen
        name={screenName.feedscreen}
        component={FeedScreen}
        options={{
          tabBarIcon: data => iconHandler({...data, children: 'second'}),
        }}
      />
      <Tab.Screen
        name={screenName.ratingScreen}
        component={Rating}
        options={{
          tabBarIcon: data => iconHandler({...data, children: 'third'}),
        }}
      />
      <Tab.Screen
        name={screenName.profileScreen}
        component={Profile}
        options={{
          tabBarIcon: data => iconHandler({...data, children: 'fourth'}),
          headerTitle: screenName.profileScreen,
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
const styles = StyleSheet.create({
  drawerPressable: {
    marginHorizontal: perfectSize(8),
    padding: perfectSize(5),
  },
  icon: {
    height: perfectSize(21),
    width: perfectSize(20),
  },

  feed: {
    width: perfectSize(24),
    height: perfectSize(24),
  },
  feeds: {
    width: perfectSize(24),
    height: perfectSize(24),
    position: 'relative',
    // bottom: perfectSize(5),
  },
  tabbg: {
    position: 'absolute',
    backgroundColor: colors.appSloganText,
    paddingHorizontal: perfectSize(10),
    height: perfectSize(56),
    // justifyContent: 'center',
    borderTopEndRadius: perfectSize(100),
    borderTopStartRadius: perfectSize(100),
    // marginTop: perfectSize(14),
    paddingTop: perfectSize(9),
    top: perfectSize(14),
  },
  tabbgwhite: {
    position: 'absolute',
    backgroundColor: colors.white,
    paddingTop: perfectSize(9),
    top: perfectSize(14),
    // marginTop: perfectSize(14),
  },
  tabBarStyle: {
    height: perfectSize(70),
    // borderRadius: perfectSize(20),
    position: 'absolute',
    bottom: perfectSize(34),
    paddingTop: perfectSize(10),
    marginHorizontal: perfectSize(24),
    elevation: 0,
    shadowOpacity: 0,
    borderTopWidth: 0,
    // backgroundColor: colors.white,
    // elevation: perfectSize(10),
    // shadowColor: colors.appSloganText,
  },
  tabBarLabelStyle: {
    bottom: 0,
    fontSize: perfectSize(12),
    lineHeight: perfectSize(12),
    paddingBottom: perfectSize(5),
  },
  tabBarIconStyle: {
    backgroundColor: colors.white,
  },
  tabBarItemStyle: {
    bottom: 0,
    borderRightWidth: perfectSize(1),
    borderColor: colors.appSloganText,
    marginVertical: perfectSize(12),
  },
});
