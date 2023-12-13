import React, {FC, memo} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {colors, commonStyles} from '../styles';

const LoadingApp: FC = () => {
  return (
    <View
      style={{
        ...commonStyles.mainView,
        ...commonStyles.containerCenter,
        backgroundColor: colors.primary,
      }}>
      <ActivityIndicator size={'large'} color={colors.secondary} />
    </View>
  );
};

export default memo(LoadingApp);
