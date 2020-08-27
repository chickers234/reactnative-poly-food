import React, {useContext, useState, useEffect} from 'react';
import {Image, StyleSheet, FlatList, Text, View} from 'react-native';
import Title from '../components/Title';
import colors from '../config/color';
import common from '../themes/common';
import * as helper from '../utils/helper';
import {StoreContext} from '../utils/store';
import {CartItem} from '../components/List';

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
  const {merchantId, cartList} = useContext(StoreContext);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(cartList.cartList);

  useEffect(() => {
    getTotal(cartList.cartList);
  }, [cartList.cartList]);

  function getTotal(data) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].soluong * data[i].gia;
    }
    setTotalPrice(total);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={[styles.section, {flex: 1.5}]}>
        <Title text="Địa điểm giao hàng" />
        <View style={styles.row}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/location.png')}
          />
          <Text style={common.subtitle}>{userPos.userPos}</Text>
        </View>
      </View>

      <View style={[styles.section, {flex: 9}]}>
        <Title text="Chi tiết đơn hàng" />
        <FlatList
          data={cartList.cartList}
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
        <Title text="Tổng hoá đơn:" color={colors.black} />
        <Title
          text={helper.formatMoney(totalPrice) + ' VNĐ'}
          color={colors.black}
        />
      </View>
      <View
        style={[
          styles.section,
          {
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.black,
          },
        ]}>
        <Title text={'Đặt Đơn'} color="#FFBF00" />
      </View>
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
  header: {
    backgroundColor: colors.yellow,
    height: 40,
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
