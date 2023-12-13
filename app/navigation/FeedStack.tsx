import React, {FC} from 'react';
import {screenName} from '../core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import feedscreen from '../modules/FeedScreen';
import feedDetailScreen from '../modules/FeedDetailScreen';

const Stack = createNativeStackNavigator();

const FeedNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="feedDetailScreen"
      screenOptions={
        {
          // headerShown: false,
        }
      }>
      <Stack.Screen
        name={screenName.feedscreen}
        component={feedscreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screenName.feedDetailScreen}
        component={feedDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
