import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Swiper from './Swiper';

export const {width, height} = Dimensions.get('window');

export default function SwiperList() {
  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={3}
      autoplayLoop
      index={0}
      showPagination>
      <View style={styles.child}>
        <Swiper image={require('../../assets/images/banner01.jpg')} />
      </View>
      <View style={styles.child}>
        <Swiper image={require('../../assets/images/banner02.jpg')} />
      </View>
      <View style={styles.child}>
        <Swiper image={require('../../assets/images/banner03.jpg')} />
      </View>
      <View style={styles.child}>
        <Swiper image={require('../../assets/images/banner04.jpg')} />
      </View>
    </SwiperFlatList>
  );
}

const styles = StyleSheet.create({
  child: {
    height: height * 0.25,
    width: width,
  },
});
