import React, {useState, useContext, useEffect, useCallback} from 'react';
import {StyleSheet, ActivityIndicator, View, Text} from 'react-native';
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
  const {settingApp} = useContext(StoreContext);
  const [data, setData] = useState([]);
  const {userLoc} = useContext(StoreContext);
  const [loadMoreSize, setLoadMoreSize] = useState(10);
  const [loading, setLoading] = useState(false);
  let size = 0;

  useEffect(() => {
    if (tag === 'TL08') {
      size = loadMoreSize;
    } else {
      size = 9999;
    }
    try {
      const onValueChange = database()
        .ref('/CuaHang')
        .limitToFirst(size)
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
          setLoading(false);
          setData(helper.sortByDistance(MerchantList));
        });

      return () => database().ref('/CuaHang').off('value', onValueChange);
    } catch (error) {
      console.log(error);
    }
  }, [tag, userLoc.userLoc.lat, userLoc.userLoc.long, loadMoreSize]);

  const _loadMore = useCallback(() => {
    if (loadMoreSize <= 40) {
      setLoading(true);
      setLoadMoreSize(loadMoreSize + 5);
    }
  }, [loading]);

  const _renderFooter = () => {
    return (
      <View>
        {loading === true ? (
          <ActivityIndicator
            size="large"
            color={settingApp.settingApp.backgroundColor}
            style={styles.activityIndicator}
          />
        ) : null}
      </View>
    );
  };

  if (!data.length) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size="large"
          color={settingApp.settingApp.backgroundColor}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar backTo="Main" />
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItemMerchant}
          onEndReachedThreshold={0.5}
          onEndReached={_loadMore}
          ListFooterComponent={_renderFooter}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    margin: 20,
  },
});
