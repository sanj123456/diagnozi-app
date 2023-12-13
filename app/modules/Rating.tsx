import React, {FC, memo, useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {images, perfectSize} from '../core';
import {colors, fonts} from '../styles';
import {strings} from '../i18n';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {CommonNavigationProps} from '../types/navigationTypes';
import {categoryAPI, ratingListAPI} from '../services/commonServices';
import {NoDataFound} from '../components';
import RangeSlider from '../components/RangeSlider';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import FooterLoader from '../components/FooterLoader';

const Rating: FC<CommonNavigationProps> = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const [selectedCat, setSelectedCat] = useState<string | null>();
  const categoryData = useSelector(
    (state: RootState) => state.generic.category,
  );

  const {
    isLoading,
    isLoadingMore,
    data: ratinglist,
    message,
    meta,
  } = useSelector((state: RootState) => state.ratings);

  const fetchData = useCallback((page: number, category_id?: string | null) => {
    ratingListAPI({category_id, page});
  }, []);

  const handleFilterBtnPress = useCallback(
    () => fetchData(1, selectedCat),
    [fetchData, selectedCat],
  );

  useFocusEffect(
    useCallback(() => {
      categoryAPI();
      handleFilterBtnPress();
    }, [handleFilterBtnPress]),
  );

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore && meta.current_page < meta.last_page) {
      fetchData(+meta.current_page + 1, selectedCat);
    }
  }, [selectedCat, isLoadingMore, meta, fetchData]);

  return (
    <View style={styles.container}>
      <View style={styles.parentview}>
        <View style={styles.dropView}>
          <DropDownPicker
            style={styles.dropdownStyle}
            listItemContainerStyle={styles.itemContainerStyle}
            listChildContainerStyle={styles.childContainerStyle}
            dropDownContainerStyle={styles.dropdownContainerStyle}
            // itemSeparator
            textStyle={styles.ddTxt}
            open={open}
            value={value}
            items={categoryData}
            setOpen={setOpen}
            setValue={setValue}
            hideSelectedItemIcon={false}
            onChangeValue={val => setSelectedCat(val)}
          />
        </View>

        <TouchableOpacity
          onPress={handleFilterBtnPress}
          style={[styles.filterview]}>
          <Text style={styles.filter}>{strings.filter}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={ratinglist}
          keyExtractor={(_item, index) => index.toString()}
          refreshing={isLoading}
          onRefresh={handleFilterBtnPress}
          onEndReachedThreshold={0.1}
          onEndReached={handleLoadMore}
          ListEmptyComponent={
            <View>{!isLoading && <NoDataFound error={message} />}</View>
          }
          ListFooterComponent={
            <FooterLoader
              visible={ratinglist && ratinglist.length > 0 && isLoadingMore}
            />
          }
          renderItem={({item}) => (
            <View style={styles.ratingView}>
              <View style={styles.profileView}>
                <View style={styles.userprofile}>
                  <Image
                    source={{
                      uri:
                        item.profile_image ||
                        Image.resolveAssetSource(images.userProfile).uri,
                    }}
                    style={styles.userStyle}
                  />
                </View>
                <View style={styles.profileNameView}>
                  <Text style={styles.profileName}>{item?.full_name} </Text>
                </View>
              </View>
              <View style={styles.userfooter}>
                <View style={styles.pat}>
                  <FastImage
                    resizeMode="contain"
                    source={images.comment}
                    style={styles.comments}
                  />
                  <Text style={styles.commentCount}>{item?.comment_count}</Text>
                </View>
                <View style={styles.rangesliderView}>
                  <RangeSlider
                    sliderProps={{
                      minimumTrackTintColor: colors.appSloganText,
                      maximumTrackTintColor: colors.tintColor,
                      animationType: 'spring',
                      minimumValue: 0,
                      maximumValue: 100,
                      value: item?.avg_vote || 0,
                      disabled: true,
                      trackStyle: {
                        height: perfectSize(15),
                        borderRadius: perfectSize(25),
                      },
                    }}
                    // isSlider={true}
                    showValue={true}
                    valueStyle={styles.avgStyles}
                    hideThumb={true}
                  />
                  {/* <RatingSlider
                    sliderProps={{
                      animationType: 'spring',
                      minimumValue: 0,
                      maximumValue: 100,
                      value: item?.avg_vote,
                      disabled: true,
                    }}
                  /> */}
                </View>
                {/* <View style={styles.avgView}>
                  <Text style={styles.avgStyles}>{item?.avg_vote}%</Text>
                </View> */}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default memo(Rating);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  parentview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: perfectSize(99),
    paddingBottom: perfectSize(15),
    marginTop: perfectSize(15),
    paddingHorizontal: perfectSize(18),
  },
  dropView: {flex: 1, marginRight: perfectSize(20)},
  ddview: {
    width: perfectSize(160),
  },
  filterview: {
    backgroundColor: colors.appSloganText,
    flex: 1,
    minHeight: perfectSize(38),
    justifyContent: 'center',
    borderRadius: perfectSize(10),
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 4,
  },
  filter: {
    ...fonts.regular12,
    alignSelf: 'center',
    color: colors.white,
  },
  ddTxt: {
    ...fonts.regular12,
    alignSelf: 'center',
    color: colors.grey,
  },
  feeduser: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: perfectSize(13),
  },
  userStyle: {
    width: perfectSize(30),
    height: perfectSize(30),
    borderRadius: perfectSize(20),
  },
  userprofile: {},
  profilehead: {},
  profileName: {
    marginTop: perfectSize(5),
    paddingLeft: perfectSize(8),
    ...fonts.medium17,
  },
  moreview: {
    width: perfectSize(78),
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appSloganText,
    paddingVertical: perfectSize(6),
    borderRadius: perfectSize(5),
  },
  more: {
    ...fonts.regular24,
    color: colors.white,
  },
  userfooter: {
    flexDirection: 'row',
    marginTop: perfectSize(15),
    justifyContent: 'space-between',
  },
  comments: {
    width: perfectSize(15),
    height: perfectSize(15),
  },
  multirating: {
    width: perfectSize(245),
  },
  picker: {
    width: perfectSize(27),
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: perfectSize(180),
    paddingHorizontal: perfectSize(18),
  },
  commentCount: {
    ...fonts.regular30,
    color: colors.titleGrey,
    lineHeight: perfectSize(20),
    paddingLeft: perfectSize(5),
  },
  dropDownstyle: {},
  selectedItemStyle: {
    color: colors.white,
    borderRadius: perfectSize(3),
    width: '100%',
  },
  itemContainerStyle: {
    borderWidth: perfectSize(0),
  },
  childContainerStyle: {
    borderWidth: perfectSize(0),
  },
  dropdownStyle: {
    borderWidth: perfectSize(0),
    elevation: 3,
    minHeight: perfectSize(38),
    borderRadius: perfectSize(10),
    zIndex: perfectSize(100),
    shadowColor: '#00000',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    backgroundColor: '#FFF',
  },
  dropdownContainerStyle: {
    borderWidth: perfectSize(0),
  },
  profileView: {
    flexDirection: 'row',
  },
  profileNameView: {
    paddingLeft: perfectSize(10),
  },
  pat: {
    flexDirection: 'row',
    // paddingLeft: perfectSize(8),
    alignItems: 'center',
    padding: perfectSize(5),
  },
  avgView: {
    paddingRight: perfectSize(5),
    // top: perfectSize(-3),
  },
  rangesliderView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ratingView: {
    backgroundColor: '#FFFFFF',
    borderRadius: perfectSize(20),
    paddingVertical: perfectSize(10),
    paddingBottom: perfectSize(10),
    paddingHorizontal: perfectSize(15),
    marginTop: perfectSize(12),
    shadowColor: '#00000',
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20.0,
    elevation: 2,
  },
  avgStyles: {
    ...fonts.lightBold,
  },
});
