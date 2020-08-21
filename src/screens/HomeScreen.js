import database from '@react-native-firebase/database';
import {getDistance} from 'geolib';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import SwiperFlatList from 'react-native-swiper-flatlist';
import CategoryItem from '../components/CategoryItem';
import MerchantItem from '../components/MerchantItem';
import Slider from '../components/Slider';
import CategoryList from '../data/CategoryList';
import * as helper from '../utils/helper';

const _renderItemCategoty = ({item}) => (
  <CategoryItem icon={item.icon} title={item.title} />
);

const _renderItemMerchant = ({item}) => (
  <MerchantItem
    image={item.image}
    name={item.name}
    address={item.address}
    rating={item.rating}
    dis={item.dis}
  />
);

export const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [data, setData] = useState([]);
  const numColumns = 4;

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setLat(location.latitude);
        setLong(location.longitude);
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, [lat, long]);

  useEffect(() => {
    let MerchantList = [];
    database()
      .ref('/CuaHang')
      .once('value', (snapshot) => {
        snapshot.forEach((child) => {
          let dis = getDistance(
            {latitude: lat, longitude: long},
            {latitude: child.val().latitude, longitude: child.val().longitude},
          );
          if (dis / 1000 < 5) {
            if (child.val().diachi.length > 30) {
              MerchantList.push({
                image: child.val().hinhanh,
                name: child.val().tencuahang,
                address: child.val().diachi.substring(0, 30) + ' ...',
                rating: child.val().rating,
                lat: child.val().latitude,
                long: child.val().longitude,
                dis: helper.getDistance(dis),
              });
            }
          }
        });
        setData(MerchantList);
      });
  }, [data, lat, long]);

  return (
    <View style={styles.container}>
      <View style={{height: height * 0.25}}>
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          index={0}
          showPagination>
          <View style={styles.child}>
            <Slider image={require('../assets/images/banner01.jpg')} />
          </View>
          <View style={styles.child}>
            <Slider image={require('../assets/images/banner02.jpg')} />
          </View>
          <View style={styles.child}>
            <Slider image={require('../assets/images/banner03.jpg')} />
          </View>
          <View style={styles.child}>
            <Slider image={require('../assets/images/banner04.jpg')} />
          </View>
        </SwiperFlatList>
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
  child: {
    height: height * 0.25,
    width: width,
  },
  body: {
    padding: width * 0.01,
    height: height * 0.55,
    paddingBottom: Platform.OS === 'ios' ? 100 : 70,
  },
});
