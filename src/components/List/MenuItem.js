import React, {useContext, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../config/color';
import common from '../../themes/common';
import * as helper from '../../utils/helper';
import {StoreContext} from '../../utils/store';
export const {width, height} = Dimensions.get('window');

export default function MenuItem({id, image, name, price}) {
  const refRBSheet = useRef();
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(price);
  const {merchantId, cartList} = useContext(StoreContext);
  const {settingApp} = useContext(StoreContext);

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

  const addToCart = () => {
    let oder = {
      tenmonan: name,
      gia: price,
      hinhanh: image,
      macuahang: merchantId.merchantId,
      mamonan: id,
      soluong: count,
    };
    try {
      if (oder.macuahang === cartList.cartList[0].macuahang) {
        let exist = false;
        for (let i = 0; i < cartList.cartList.length; i++) {
          if (oder.mamonan === cartList.cartList[i].mamonan) {
            exist = true;
            cartList.cartList[i].soluong =
              cartList.cartList[i].soluong + oder.soluong;
            cartList.setCartList(cartList.cartList.concat([]));
          }
        }
        if (!exist) {
          cartList.setCartList(cartList.cartList.concat(oder));
        }
      } else {
        setTimeout(() => {
          Alert.alert(
            //title
            'Thông báo',
            //body
            'Đặt món ăn trên sẽ xoá giỏ hàng hiện tại. Bạn có muốn tiếp tục?',
            [
              {
                text: 'Xác nhận',
                onPress: () => {
                  let orders = [];
                  cartList.setCartList(orders.concat(oder));
                },
              },
              {
                text: 'Huỷ',
                onPress: () => console.log('Huỷ'),
                style: 'cancel',
              },
            ],
            {cancelable: true},
          );
        }, 500);
      }
    } catch (error) {
      console.log(error);
      cartList.setCartList(cartList.cartList.concat(oder));
    }
    refRBSheet.current.close();
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
            {helper.formatMoney(price)} VNĐ
          </Text>
          <Text
            style={[
              common.subtitle,
              {
                // color: settingApp.settingApp.backgroundColor,
                color: 'red',
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            //backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.bottom}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{helper.formatMoney(price)} VNĐ</Text>
          <View style={styles.row}>
            <Pressable onPress={() => sub()}>
              <Text style={styles.button}>-</Text>
            </Pressable>
            <Text style={styles.name}>{count}</Text>
            <Pressable onPress={() => add()}>
              <Text style={styles.button}>+</Text>
            </Pressable>
          </View>
          <Pressable
            style={{
              ...styles.buttonAdd,
              backgroundColor: settingApp.settingApp.backgroundColor,
            }}
            onPress={() => addToCart()}>
            <Text style={styles.add}>
              Thêm vào giỏ hàng - {helper.formatMoney(total)} VNĐ
            </Text>
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
    borderRadius: 5,
  },
  add: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: colors.white,
  },
});
