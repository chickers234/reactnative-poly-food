import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MenuItem} from '../../components/List';
import MenuHolder from '../../components/Placeholder/MenuHolder';
import colors from '../../config/color';
import {StoreContext} from '../../utils/store';

const _renderItem = ({item}) => (
  <MenuItem
    image={item.image}
    name={item.name}
    price={item.price}
    id={item.id}
  />
);

export const {width, height} = Dimensions.get('window');

export default function MenuScreen() {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const {merchantId, settingApp} = useContext(StoreContext);
  const navigation = useNavigation();

  const goToCart = () => {
    navigation.navigate('Main', {screen: 'CartScreen'});
  };

  useEffect(() => {
    try {
      const onValueChange = database()
        .ref(`/Menu/${merchantId.merchantId}`)
        .on('value', (snapshot) => {
          let MenuList = [];
          snapshot.forEach((child) => {
            MenuList.push({
              id: child.val().mamonan,
              image: child.val().hinhanh,
              name: child.val().tenmonan,
              price: child.val().gia,
            });
          });
          setMenu(MenuList);
          setLoading(false);
        });

      // Stop listening for updates when no longer required
      return () =>
        database()
          .ref(`/Menu/${merchantId.merchantId}`)
          .off('value', onValueChange);
    } catch (error) {}
  }, [merchantId.merchantId]);

  const _renderList = () => {
    if (loading) {
      return (
        <>
          <MenuHolder />
        </>
      );
    }
    return (
      <>
        <FlatList
          data={menu}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      {_renderList()}
      <Pressable
        style={{
          ...styles.buttonAdd,
          backgroundColor: settingApp.settingApp.backgroundColor,
        }}
        onPress={() => goToCart()}>
        <Text style={{...styles.add, color: settingApp.settingApp.colorText}}>
          Xem giỏ hàng
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  buttonAdd: {
    width: '100%',
    height: 45,
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
