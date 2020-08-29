import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {MerchantItem} from '../components/List';
import SearchBar from '../components/SearchBar';
import {FlatList} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import {getDistance} from 'geolib';
import {StoreContext} from '../utils/store';
import * as helper from '../utils/helper';
import common from '../themes/common';

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

export default function CategoryScreen({route}) {
  const tag = route.params.tag;
  const [data, setData] = useState([]);
  const {userLoc} = useContext(StoreContext);

  useEffect(() => {
    try {
      const onValueChange = database()
        .ref('/CuaHang')
        .on('value', (snapshot) => {
          let MerchantList = [];
          snapshot.forEach((child) => {
            let merchantItem = {
              id: child.val().macuahang,
              image: child.val().hinhanh,
              name: child.val().tencuahang,
              address: child.val().diachi,
              rating: child.val().rating,
              lat: child.val().latitude,
              long: child.val().longitude,
              dis: helper.getDistance(dis),
            };

            let dis = getDistance(
              {latitude: userLoc.userLoc.lat, longitude: userLoc.userLoc.long},
              {
                latitude: child.val().latitude,
                longitude: child.val().longitude,
              },
            );
            if (tag === 'TL08') {
              MerchantList.push(merchantItem);
            } else {
              if (child.val().matheloai === tag) {
                MerchantList.push(merchantItem);
              }
            }
          });
          setData(helper.sortByDistance(MerchantList));
        });

      return () => database().ref('/CuaHang').off('value', onValueChange);
    } catch (error) {}
  }, [tag, userLoc.userLoc.lat, userLoc.userLoc.long]);
  return (
    <View style={styles.container}>
      <SearchBar backTo="Main" />
      <View style={[common.body, {height: '95%'}]}>
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
    flex: 1,
  },
});
