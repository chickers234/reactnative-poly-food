import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import {Dimensions, FlatList, Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CartItem} from '../components/List';
import Text from '../components/Text';
import colors from '../config/color';
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

export default function DetailBillScreen({route}) {
  const id = route.params.id;
  const navigation = useNavigation();
  const [bill, setBill] = useState({});
  const [merchant, setMerchant] = useState();
  const {settingApp} = useContext(StoreContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const billRef = database()
          .ref(`/DonHang/User/${auth().currentUser.uid}/${id}`)
          .on('value', (snapshot) => {
            setBill(snapshot.val());
          });

        const merchantRef = database()
          .ref(`/CuaHang/${bill.macuahang}`)
          .on('value', (snapshot) => {
            setMerchant(snapshot.val());
          });

        if (merchant) {
          database()
            .ref(`/DonHang/User/${auth().currentUser.uid}/${id}`)
            .off('value', billRef);
          database()
            .ref(`/CuaHang/${bill.macuahang}`)
            .off('value', merchantRef);
        }
      } catch (error) {}
    };
    getData();
  }, [bill.macuahang, id, merchant]);

  if (!merchant) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: settingApp.settingApp.color, height: 40}} />
      <View style={styles.body}>
        <View style={{flexDirection: 'row', height: 45, alignItems: 'center'}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back-sharp" color="#172737" size={30} />
          </Pressable>
          <Text text="Chi tiết đơn hàng" color={colors.black} size={18} />
        </View>
        <View style={[styles.section, {flex: 1}]}>
          <Text text={merchant.tencuahang} size={16} fontFamily="bold" />
          <Text text={merchant.diachi} />
          <Text text={'Mã đơn hàng: ' + bill.id} />
          <View style={styles.line} />
          <Text text={'Trạng thái đơn hàng: ' + bill.status} size={14} />
        </View>
        <View style={[styles.section, {flex: 1}]}>
          <Text text="Thông tin nhận hàng" size={16} fontFamily="bold" />
          <Text text={'Người nhận: ' + bill.name} />
          <Text text={'Địa chỉ: ' + bill.address} />
          <Text text={'Số điện thoại: ' + bill.phonenumber} />
        </View>
        <View style={[styles.section, {flex: 2.5}]}>
          <Text text="Thông tin món ăn" size={16} fontFamily="bold" />
          <FlatList
            data={bill.gioHangList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
          />
        </View>
        <View style={[styles.section, {flex: 0.2, flexDirection: 'row'}]}>
          <Text text="Tổng cộng:" size={16} fontFamily="bold" />
          <Text
            text={helper.formatMoney(bill.total) + ' VNĐ'}
            size={16}
            fontFamily="bold"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },
  body: {
    padding: width * 0.02,
    flex: 1,
  },
  section: {
    padding: 10,
    borderWidth: 1.5,
    borderColor: colors.grey,
    borderRadius: 5,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    backgroundColor: colors.grey,
  },
});
