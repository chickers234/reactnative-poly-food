import React from 'react';
import {Dimensions, StyleSheet, Text, Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../config/color';

export const {width, height} = Dimensions.get('window');

export default function MerchantItem({
  image,
  name,
  address,
  rating,
  long,
  lat,
  dis,
}) {
  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{justifyContent: 'space-between'}}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{address}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/icons/star.png')}
            style={styles.icon}
          />
          <Text style={styles.subtitle}>{rating}</Text>
          <Image
            source={require('../assets/icons/distance.png')}
            style={[styles.icon, {marginLeft: 100}]}
          />
          <Text style={styles.subtitle}>{dis} km</Text>
        </View>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.red,
              fontSize: 12,
              borderColor: colors.gray,
            },
          ]}>
          FREESHIP
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 8,
  },
  icon: {
    height: 14,
    width: 14,
    marginRight: 8,
    marginBottom: 2,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  subtitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: colors.gray,
  },
});
