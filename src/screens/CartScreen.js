import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CartItem} from '../components/List';
import Title from '../components/Text';
import colors from '../config/color';
import common from '../themes/common';
import * as helper from '../utils/helper';
import {StoreContext} from '../utils/store';

export const {width, height} = Dimensions.get('window');

const _renderItem = ({item}) => (
  <CartItem
    image={item.hinhanh}
    name={item.tenmonan}
    price={item.gia}
    count={item.soluong}
  />
);

export default function CartScreen() {
  const navigation = useNavigation();
  const {userPos, cartList, user, settingApp} = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setData(cartList.cartList);
    getTotal(cartList.cartList);
  }, [cartList.cartList]);

  const getTotal = (list) => {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
      total += list[i].soluong * list[i].gia;
    }
    setTotalPrice(total);
  };

  const gioHangList = (key) => {
    let obj = {
      id: key,
      address: userPos.userPos,
      macuahang: cartList.cartList[0].macuahang,
      name: user.user.name,
      phonenumber: user.user.phonenumber,
      status: 'Chờ xử lý',
      time: helper.getNow(),
      total: totalPrice,
      uid: auth().currentUser.uid,
      gioHangList: cartList.cartList,
    };

    return obj;
  };

  const submit = () => {
    if (user.user.name === '' || user.user.phonenumber === '') {
      Alert.alert(
        'Thông báo',
        'Vui lòng cập nhật đầy đủ thông tin trước khi giao dịch. Bạn có muốn tiếp tục?',
        [
          {
            text: 'Đồng ý',
            onPress: () => {
              navigation.navigate('ProfileScreen');
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
    } else {
      Alert.alert(
        'Thông báo',
        'Xác nhận thanh toán đơn hàng. Bạn có muốn tiếp tục?',
        [
          {
            text: 'Đồng ý',
            onPress: async () => {
              try {
                const merchantRef = database()
                  .ref(`/DonHang/CuaHang/${cartList.cartList[0].macuahang}`)
                  .push();
                await merchantRef
                  .set(gioHangList(merchantRef.key))
                  .catch((error) => {
                    console.log(error);
                  });

                await database()
                  .ref(
                    `/DonHang/User/${auth().currentUser.uid}/${
                      merchantRef.key
                    }`,
                  )
                  .set(gioHangList(merchantRef.key))
                  .catch((error) => {
                    console.log(error);
                  });

                cartList.setCartList([]);
                setData([]);
                setTotalPrice(0);
              } catch (error) {
                alert('Giỏ hàng trống!');
              }
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
    }
  };

  const renderCartView = () => {
    if (cartList.cartList.length === 0) {
      return (
        <>
          <Title text="Chi tiết đơn hàng" fontFamily="regular" size={18} />
          <Image
            style={styles.cart}
            source={require('../assets/icons/ic_empty_list.gif')}
            resizeMode="contain"
          />
        </>
      );
    }
    return (
      <>
        <Title text="Chi tiết đơn hàng" fontFamily="regular" size={18} />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: settingApp.settingApp.backgroundColor,
          height: 40,
        }}
      />
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
      <View style={[styles.section, {flex: 9}]}>{renderCartView()}</View>
      <View style={styles.footer}>
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
        <Title text={'Đặt Đơn'} color="white" fontFamily="regular" size={18} />
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
  footer: {
    flex: 0.6,
    width: '95%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
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
  cart: {
    height: height * 0.25,
    width: height * 0.25,
    alignSelf: 'center',
    marginTop: height * 0.15,
  },
});
