import React, {useRef, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../config/color';
import common from '../../themes/common';
import RBSheet from 'react-native-raw-bottom-sheet';

export const {width, height} = Dimensions.get('window');

export default function MenuItem({id, image, name, price}) {
  const refRBSheet = useRef();
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(price);

  const add = () => {
    setCount(count + 1);
    sum(count + 1);
  };

  const sub = () => {
    if (count >= 2) {
      setCount(count - 1);
      sum(count - 1);
    }
  };

  const sum = (num) => {
    setTotal(num * price);
  };

  return (
    <Pressable onPress={() => refRBSheet.current.open()}>
      <View style={styles.container}>
        <FastImage
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{justifyContent: 'space-around'}}>
          <Text style={common.title}>{name}</Text>
          <Text style={[common.subtitle, {color: colors.gray}]}>
            {price} VNĐ
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: colors.red,
                fontSize: 12,
                borderColor: colors.gray,
              },
            ]}>
            BEST SELLER
          </Text>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={250}
        animationType="fade"
        openDuration={200}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.3);',
            //backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.bottom}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{price} VNĐ</Text>
          <View style={styles.row}>
            <Pressable onPress={() => sub()}>
              <Text style={styles.button}>-</Text>
            </Pressable>
            <Text style={styles.name}>{count}</Text>
            <Pressable onPress={() => add()}>
              <Text style={styles.button}>+</Text>
            </Pressable>
          </View>
          <Pressable style={styles.buttonAdd}>
            <Text style={styles.add}>Thêm vào giỏ hàng - {total} VNĐ</Text>
          </Pressable>
        </View>
      </RBSheet>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 8,
  },
  bottom: {
    padding: 10,
  },
  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: colors.black,
  },
  price: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: colors.gray,
  },
  row: {
    marginTop: 25,
    paddingHorizontal: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    height: 30,
    width: 30,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: colors.white,
    backgroundColor: colors.black,
    textAlign: 'center',
    borderRadius: 5,
  },
  buttonAdd: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
    backgroundColor: colors.orange,
    borderRadius: 5,
  },
  add: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: colors.white,
  },
});
