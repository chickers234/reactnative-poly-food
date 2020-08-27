import React, {useContext, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../config/color';
import common from '../../themes/common';
import {StoreContext} from '../../utils/store';
import * as helper from '../../utils/helper';

export const {width, height} = Dimensions.get('window');

export default function CartItem({id, image, name, price, count}) {
  const [total, setTotal] = useState(price);
  const {merchantId, cartList} = useContext(StoreContext);

  return (
    <Pressable>
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
            {helper.formatMoney(price)} VNĐ
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: colors.red,
                borderColor: colors.gray,
              },
            ]}>
            Số lượng: {count}
          </Text>
        </View>
      </View>
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
    fontSize: 20,
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
    fontSize: 16,
    color: colors.white,
  },
});
