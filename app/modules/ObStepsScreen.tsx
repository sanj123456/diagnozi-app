import React, {FC, useState, useRef, memo} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {images} from '../core/constants';
import {CommonNavigationProps} from '../types/navigationTypes';
import {perfectSize, screenName} from '../core';
import {strings} from '../i18n';
import {colors, fonts} from '../styles';
import {PrimaryButton} from '../components';
import {navigate} from '../navigation/RootNavigation';
import {height} from '../core/genericUtils';

interface ListItem {
  id: string;
  step: string;
  description: string;
}

const ObStepsScreen: FC<CommonNavigationProps> = () => {
  const data: ListItem[] = [
    {
      id: '1',
      step: strings.obStepOne,
      description: strings.obDescriptionOfFirst,
    },
    {
      id: '2',
      step: strings.obStepTwo,
      description: strings.obDescriptionOfSecond,
    },
    {
      id: '3',
      step: strings.obStepThree,
      description: strings.obDescriptionOfThree,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const {width} = Dimensions.get('window');

  const scrollViewRef = useRef<any>(null);

  const handlePaginationPress = (index: any) => {
    scrollViewRef.current.scrollTo({x: index * width, animated: true});
    setCurrentIndex(index);
  };

  const handleButtonPress = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < data.length) {
      scrollViewRef.current.scrollTo({x: newIndex * width});
      setCurrentIndex(newIndex);
    }
  };

  const renderItem = ({item}: {item: ListItem}) => {
    return (
      <View style={styles.itemContainer} key={item.id}>
        <View style={styles.obimage}>
          <Image source={images.obCameraImage} />
        </View>
        <View style={styles.stephead}>
          <Text style={styles.steps}>{item.step}</Text>
        </View>
        <View style={styles.stepdesc}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / width);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={200}>
        {data.map((item: ListItem) => renderItem({item}))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index ? styles.paginationDotActive : null,
            ]}
            onPress={() => handlePaginationPress(index)}
          />
        ))}
      </View>
      <View style={styles.containerButton}>
        <PrimaryButton
          title={strings.obContinue}
          onPress={() => {
            currentIndex === 2
              ? navigate(screenName.login)
              : handleButtonPress();
          }}
        />
      </View>
    </View>
  );
};

export default memo(ObStepsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  obimage: {
    alignItems: 'center',
    marginBottom: height / 10,
  },
  stephead: {
    alignItems: 'center',
    marginBottom: perfectSize(20),
  },
  steps: {
    ...fonts.heading35,
    lineHeight: perfectSize(51),
  },
  stepdesc: {
    alignItems: 'center',
  },
  description: {
    ...fonts.light14,
    lineHeight: perfectSize(16),
    color: colors.obdescText,
  },
  containerButton: {
    paddingTop: perfectSize(38),
    alignItems: 'center',
    paddingBottom: perfectSize(50),
  },
  itemContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    marginBottom: height / 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: perfectSize(8),
    height: perfectSize(8),
    borderRadius: perfectSize(5),
    backgroundColor: colors.obdots,
    marginHorizontal: perfectSize(10),
  },
  paginationDotActive: {
    backgroundColor: colors.appSloganText,
  },
});
