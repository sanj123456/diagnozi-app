import React, {FC} from 'react';
import {screenName} from '../core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../modules/OnboardingScreen';
import Login from '../modules/Login';
import Signup from '../modules/Signup';
import ProfileSelectScreen from '../modules/ProfileSelectScreen';
import ObStepsScreen from '../modules/ObStepsScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screenName.onboarding} component={OnboardingScreen} />
      <Stack.Screen name={screenName.obstepsscreen} component={ObStepsScreen} />
      <Stack.Screen name={screenName.login} component={Login} />
      <Stack.Screen name={screenName.signUp} component={Signup} />
      <Stack.Screen
        name={screenName.profileselectscreen}
        component={ProfileSelectScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
