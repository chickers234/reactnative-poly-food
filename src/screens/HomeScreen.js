import database from '@react-native-firebase/database';
import {getDistance} from 'geolib';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import RNRestart from 'react-native-restart';
import {CategoryItem, MerchantItem} from '../components/List';
import MerchantHolder from '../components/Placeholder/MerchantHolder';
import {SwiperList} from '../components/Swiper';
import CategoryList from '../data/CategoryList';
import * as helper from '../utils/helper';
import {StoreContext} from '../utils/store';

const _renderItemCategoty = ({item}) => (
  <CategoryItem
    icon={item.icon}
    title={item.title}
    tag={item.tag}
    size={item.size}
  />
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
  const [loading, setLoading] = useState(true);
  const [latitude, setLat] = useState('');
  const [longitude, setLong] = useState('');
  const [data, setData] = useState([]);
  const {userLoc, userPos} = useContext(StoreContext);
  const numColumns = 4;

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    })
      .then((location) => {
        setLat(location.latitude);
        setLong(location.longitude);
        userLoc.setUserLoc({lat: location.latitude, long: location.longitude});

        Geocoder.init('AIzaSyAI5He5yXpm2806AgEH3Mvy_aQk4hfzxV4', {
          language: 'vi',
        });
        Geocoder.from(location.latitude, location.longitude)
          .then((json) => {
            userPos.setUserPos(json.results[0].formatted_address);
            //console.log(json.results[0].formatted_address);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert(
          'Thông báo',
          'Ứng dụng yêu cầu chia sẻ vị trí của bạn để tiếp tục.',
          [
            {
              text: 'Đồng ý',
              onPress: () => {},
            },
          ],
          {cancelable: true},
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const onValueChange = database()
        .ref('/CuaHang')
        .on('value', (snapshot) => {
          let MerchantList = [];
          snapshot.forEach((child) => {
            let dis = getDistance(
              {latitude: latitude, longitude: longitude},
              {
                latitude: child.val().latitude,
                longitude: child.val().longitude,
              },
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
          setLoading(false);
        });

      // Stop listening for updates when no longer required
      return () => database().ref('/CuaHang').off('value', onValueChange);
    } catch (error) {
      console.log(error)
    }
  }, [data, latitude, longitude]);

  const _renderList = () => {
    if (loading) {
      return (
        <>
          <MerchantHolder />
        </>
      );
    } else {
      if (data.length !== 0) {
        return (
          <>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={_renderItemMerchant}
            />
          </>
        );
      }
      return (
        <View style={styles.emptyCart}>
          <Pressable onPress={() => RNRestart.Restart()}>
            <Image
              style={styles.reloadIcon}
              source={require('../assets/icons/ic_reload.png')}
            />
          </Pressable>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
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
        {_renderList()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  body: {
    padding: width * 0.02,
    height: height * 0.55,
    paddingBottom: Platform.OS === 'ios' ? 100 : 70,
  },
  reloadIcon: {
    height: 30,
    width: 30,
  },
  emptyCart: {
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
