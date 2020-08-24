import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import colors from '../config/color';
import HistoryBill from '../screens/DetailBill/HistoryBill';
import ProcessingBill from '../screens/DetailBill/ProcessingBill';

const Tab = createMaterialTopTabNavigator();
const {width, height} = Dimensions.get('window');

export default function BillScreen() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 13,
            fontFamily: 'Roboto-Regular',
            color: colors.black,
          },
          tabStyle: {width: width * 0.5, paddingTop: 40},
          style: {backgroundColor: colors.yellow},
        }}>
        <Tab.Screen name="Đang xử lý" component={HistoryBill} />
        <Tab.Screen name="Lịch sử giao dịch" component={ProcessingBill} />
      </Tab.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
});
