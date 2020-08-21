import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import CategoryItem from '../components/CategoryItem';
import Slider from '../components/Slider';
import CategoryList from '../data/CategoryList';
import MerchantItem from '../components/MerchantItem';
import MerchantList from '../data/MerchantList';

const _renderItemCategoty = ({item}) => (
  <CategoryItem icon={item.icon} title={item.title} />
);

const _renderItemMerchant = ({item}) => (
  <MerchantItem
    image={item.image}
    name={item.name}
    address={item.address}
    rating={item.rating}
  />
);

export const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const numColumns = 4;

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2.5}
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
      <View style={{marginTop: width * 0.01}}>
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
          data={MerchantList}
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
    backgroundColor: 'white',
  },
  child: {
    height: 210,
    width: width,
  },
  body: {
    padding: width * 0.01,
  },
});
