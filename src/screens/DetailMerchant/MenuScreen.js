import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import MenuItem from '../../components/MenuItem';

const _renderItem = ({item}) => (
  <MenuItem image={item.image} name={item.name} price={item.price} />
);

export const {width, height} = Dimensions.get('window');

export default function MenuScreen() {
  const id = 'CH02';
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    let MenuList = [];
    const onValueChange = database()
      .ref(`/Menu/${id}`)
      .on('value', (snapshot) => {
        snapshot.forEach((child) => {
          MenuList.push({
            id: child.val().mamonan,
            image: child.val().hinhanh,
            name: child.val().tenmonan,
            price: child.val().gia,
          });
        });
        setMenu(MenuList);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/Menu/${id}`).off('value', onValueChange);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});
