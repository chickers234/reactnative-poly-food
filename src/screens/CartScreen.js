import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {CartItem} from '../components/List';
import Title from '../components/Text';
import colors from '../config/color';
import common from '../themes/common';
import * as helper from '../utils/helper';
import {StoreContext} from '../utils/store';

const _renderItem = ({item}) => (
  <CartItem
    image={item.hinhanh}
    name={item.tenmonan}
    price={item.gia}
    count={item.soluong}
  />
);

export default function CartScreen() {
  const {userPos} = useContext(StoreContext);
  const {cartList} = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setData(cartList.cartList);
    getTotal(cartList.cartList);
  }, [cartList.cartList]);

  const getTotal = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].soluong * data[i].gia;
    }
    setTotalPrice(total);
  };

  const gioHangList = (key) => {
    let obj = {
      id: key,
      address: userPos.userPos,
      macuahang: cartList.cartList[0].macuahang,
      name: 'Tai',
      phonenumber: '0903997981',
      status: 'Chờ xử lý',
      time: helper.getNow(),
      total: totalPrice,
      uid: auth().currentUser.uid,
      gioHangList: cartList.cartList,
    };

    return obj;
  };

  const submit = async () => {
    try {
      const merchantRef = database()
        .ref(`/DonHang/CuaHang/${cartList.cartList[0].macuahang}`)
        .push();
      await merchantRef.set(gioHangList(merchantRef.key)).catch((error) => {
        console.log(error);
      });

      const userRef = database()
        .ref(`/DonHang/User/${auth().currentUser.uid}`)
        .push();
      await userRef.set(gioHangList(userRef.key)).catch((error) => {
        console.log(error);
      });

      cartList.setCartList([]);
      setData([]);
      setTotalPrice(0);
    } catch (error) {
      alert('Giỏ hàng trống!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={common.header} />
      <View style={[styles.section, {flex: 1.5}]}>
        <Title text="Địa điểm giao hàng" fontFamily="regular" size={18} />
        <View style={styles.row}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/location.png')}
          />
          <Text style={common.subtitle}>{userPos.userPos}</Text>
        </View>
      </View>

      <View style={[styles.section, {flex: 9}]}>
        <Title text="Chi tiết đơn hàng" fontFamily="regular" size={18} />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
        />
      </View>

      <View
        style={{
          flex: 0.6,
          width: '95%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <Title
          text="Tổng hoá đơn:"
          color={colors.black}
          fontFamily="regular"
          size={18}
        />
        <Title
          text={helper.formatMoney(totalPrice) + ' VNĐ'}
          color={colors.black}
          fontFamily="regular"
          size={18}
        />
      </View>

      <Pressable
        style={[
          styles.section,
          {
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.black,
          },
        ]}
        onPress={() => submit()}>
        <Title
          text={'Đặt Đơn'}
          color="#FFBF00"
          fontFamily="regular"
          size={18}
        />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgray,
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 10,
    shadowColor: colors.lightgray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 5,
    flex: 2,
    margin: 5,
    padding: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: '85%',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
