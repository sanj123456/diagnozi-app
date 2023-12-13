/**
 * @format
 */

import React from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import App from './app/index';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './app/redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MenuProvider} from 'react-native-popup-menu';

const MainApp = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <GestureHandlerRootView style={styles.container}>
          <App />
        </GestureHandlerRootView>
      </MenuProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent(appName, () => MainApp);
