import React, {FC, useEffect, useRef, useState, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import {DropDownProps} from '../types/components';
import {colors, fonts} from '../styles';
import {images, perfectSize} from '../core';

const DropDown: FC<DropDownProps> = ({
  label,
  data,
  value,
  onSelect,
  openTopSide,
  theme,
}) => {
  const DropdownButton = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(value);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropBoxViewHeight, setDropBoxViewHeight] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = useCallback(() => {
    DropdownButton.current.measure(
      ({
        _fx,
        _fy,
        _w,
        h,
        _px,
        py,
      }: {
        _fx: any;
        _fy: any;
        _w: any;
        h: any;
        _px: any;
        py: any;
      }) => {
        console.log(_fx, _fy, _w, h, _px, py, '_fx, _fy, _w, h, _px, py');
        openTopSide
          ? setDropdownTop(
              py + h - perfectSize(dropBoxViewHeight) - perfectSize(35) / 2,
            )
          : setDropdownTop(py + h - perfectSize(35) / 2);
        setDropdownLeft(_px);
      },
    );
    setVisible(true);
  }, [DropdownButton, dropBoxViewHeight, openTopSide]);

  useEffect(() => {
    if (dropBoxViewHeight > 0) {
      openDropdown();
    }
  }, [dropBoxViewHeight, openDropdown]);

  const onItemPress = ({item}: {item: any}) => {
    setSelected(item.value);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({item, index}: {item: any; index: any}) => (
    <TouchableOpacity
      style={{
        ...styles.item,
        borderBottomWidth: index === data.length - 1 ? 0 : perfectSize(2),
      }}
      onPress={() => onItemPress(item)}>
      <View style={styles.right}>
        {selected === item.value || value === item.label}
      </View>
      <Text style={{...styles.buttonText}}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View
            onLayout={event => {
              const {height} = event.nativeEvent.layout;
              setDropBoxViewHeight(height);
            }}
            style={[styles.dropdown, {top: dropdownTop, left: dropdownLeft}]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={[theme == 'round' ? styles.buttonR : styles.button]}
      onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={styles.buttonText}>{selected || value || label}</Text>
      {visible ? (
        <Image source={images.dropDown} style={styles.dropbutoon} />
      ) : (
        <Image source={images.dropDown} style={styles.dropbutoon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: perfectSize(34),
    borderBottomColor: colors.black,
    borderRadius: perfectSize(10),
    zIndex: 1,
    backgroundColor: colors.white,
    paddingVertical: perfectSize(20),
    width: perfectSize(180),
    elevation: perfectSize(3),
  },
  buttonR: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: perfectSize(0.3),
    borderColor: colors.black,
    height: perfectSize(35),
    paddingHorizontal: perfectSize(11),
    borderRadius: perfectSize(5),
    backgroundColor: colors.white,
    zIndex: 1,
  },
  buttonText: {
    ...fonts.regular22,
    flex: 1,
    color: colors.black,
    // textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    // maxWidth: perfectSize(250),
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    elevation: 2,
    padding: perfectSize(10),
    borderRadius: perfectSize(10),
    maxHeight: perfectSize(180),
    width: perfectSize(150),
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: perfectSize(10),
    // backgroundColor: 'blue',
    borderBottomColor: '#F6F6F6',
  },
  right: {
    width: perfectSize(20),
    // paddingRight: perfectSize(8),
  },
  dropbutoon: {
    width: perfectSize(20),
    height: perfectSize(8),
    marginRight: perfectSize(15),
  },
});

export default DropDown;
