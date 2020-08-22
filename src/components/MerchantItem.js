import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../config/color';
import common from '../themes/common';
import {useNavigation} from '@react-navigation/native';

export const {width, height} = Dimensions.get('window');

export default function MerchantItem({
  id,
  image,
  name,
  address,
  rating,
  dis,
  goTo,
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate(goTo, {id, image, name, address, rating})
      }>
      <View style={styles.container}>
        <FastImage
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{justifyContent: 'space-between'}}>
          <Text style={common.title}>{name}</Text>
          <Text style={[common.subtitle, {color: colors.gray}]}>{address}</Text>
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
    </Pressable>
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
});
