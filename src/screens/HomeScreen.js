import database from '@react-native-firebase/database';
import {getDistance} from 'geolib';
import React, {useEffect, useContext, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import CategoryItem from '../components/CategoryItem';
import MerchantItem from '../components/MerchantItem';
import {SwiperList} from '../components/Swiper';
import CategoryList from '../data/CategoryList';
import * as helper from '../utils/helper';
import {StoreContext} from '../utils/store';

const _renderItemCategoty = ({item}) => (
  <CategoryItem icon={item.icon} title={item.title} />
);

const _renderItemMerchant = ({item}) => (
  <MerchantItem
    id={item.id}
    image={item.image}
    name={item.name}
    address={item.address}
    rating={item.rating}
    lat={item.lat}
    long={item.long}
    dis={item.dis}
    goTo="DetailMerchantScreen"
  />
);

export const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const [latitude, setLat] = useState('');
  const [longitude, setLong] = useState('');
  const [data, setData] = useState([]);
  const {userLat, userLong} = useContext(StoreContext);
  const numColumns = 4;

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setLat(location.latitude);
        setLong(location.longitude);
        userLat.setUserLat(location.latitude);
        userLong.setUserLong(location.longitude);
        //console.log('lat: ' + latitude + ' - long: ' + longitude);
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, [userLat, userLong]);

  useEffect(() => {
    let MerchantList = [];
    const onValueChange = database()
      .ref('/CuaHang')
      .on('value', (snapshot) => {
        snapshot.forEach((child) => {
          let dis = getDistance(
            {latitude: latitude, longitude: longitude},
            {latitude: child.val().latitude, longitude: child.val().longitude},
          );
          if (dis / 1000 < 5) {
            MerchantList.push({
              id: child.val().macuahang,
              image: child.val().hinhanh,
              name: child.val().tencuahang,
              address: child.val().diachi,
              rating: child.val().rating,
              lat: child.val().latitude,
              long: child.val().longitude,
              dis: helper.getDistance(dis),
            });
          }
        });
        setData(helper.sortByDistance(MerchantList));
      });

    // Stop listening for updates when no longer required
    return () => database().ref('/CuaHang').off('value', onValueChange);
  }, [data, latitude, longitude]);

  return (
    <View style={styles.container}>
      <View style={{height: height * 0.25}}>
        <SwiperList />
      </View>
      <View style={{marginTop: width * 0.01, height: height * 0.22}}>
        <FlatList
          numColumns={numColumns}
          data={CategoryList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItemCategoty}
        />
      </View>
      <View style={styles.body}>
        <Text
          style={{fontSize: 24, fontFamily: 'Roboto-Light', marginBottom: 10}}>
          Món ăn gần bạn
        </Text>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItemMerchant}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  body: {
    padding: width * 0.01,
    height: height * 0.55,
    paddingBottom: Platform.OS === 'ios' ? 100 : 70,
  },
});
