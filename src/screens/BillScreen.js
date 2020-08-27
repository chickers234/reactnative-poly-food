import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {BillItem} from '../components/List';
import common from '../themes/common';

const {width, height} = Dimensions.get('window');

const _renderItem = ({item}) => (
  <BillItem id={item.id} time={item.time} status={item.status} />
);

export default function BillScreen() {
  const [data, setData] = useState();

  useEffect(() => {
    let BillList = [];
    const onValueChange = database()
      .ref(`/DonHang/User/${auth().currentUser.uid}`)
      .on('value', (snapshot) => {
        snapshot.forEach((child) => {
          BillList.push({
            id: child.val().id,
            time: child.val().time,
            status: child.val().status,
          });
        });
        setData(BillList);
      });

    return () =>
      database()
        .ref(`/DonHang/User/${auth().currentUser.uid}`)
        .off('value', onValueChange);
  }, []);

  return (
    <View style={styles.container}>
      <View style={common.header} />
      <View style={styles.body}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: width * 0.01,
  },
});
