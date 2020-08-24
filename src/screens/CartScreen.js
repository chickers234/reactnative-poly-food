import React, {useContext} from 'react';
import {Text, Image, StyleSheet, StatusBar, View} from 'react-native';
import {StoreContext} from '../utils/store';
import Title from '../components/Title';
import common from '../themes/common';
import colors from '../config/color';

export default function CartScreen() {
  const {userPos} = useContext(StoreContext);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

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

      <View style={[styles.section, {flex: 10}]}>
        <Title text="Chi tiết đơn hàng" />
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
        <Title text="Đặt Đơn" color="#FFBF00" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 5,
    backgroundColor: colors.lightgray,
  },
  section: {
    padding: 10,
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
