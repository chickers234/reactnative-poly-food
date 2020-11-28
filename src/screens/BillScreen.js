import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useEffect, useState, useContext} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {BillItem} from '../components/List';
import Text from '../components/Text';
import colors from '../config/color';
import {StoreContext} from '../utils/store';

const {width, height} = Dimensions.get('window');

const _renderItem = ({item}) => (
  <BillItem id={item.id} time={item.time} status={item.status} />
);

export default function BillScreen() {
  const [data, setData] = useState([]);
  const {settingApp} = useContext(StoreContext);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/DonHang/User/${auth().currentUser.uid}`)
      .on('value', (snapshot) => {
        let BillList = [];
        snapshot.forEach((child) => {
          BillList.push({
            id: child.val().id,
            time: child.val().time,
            status: child.val().status,
          });
        });
        setData(BillList.reverse());
      });

    return () =>
      database()
        .ref(`/DonHang/User/${auth().currentUser.uid}`)
        .off('value', onValueChange);
  }, []);

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <View
          style={{backgroundColor: settingApp.settingApp.color, height: 40}}
        />
        <View style={styles.body}>
          <Text text="Lịch sử giao dịch trống" size={16} color={colors.gray} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{backgroundColor: settingApp.settingApp.color, height: 40}}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
