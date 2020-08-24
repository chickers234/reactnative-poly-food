import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../config/color';
import common from '../../themes/common';

export const {width, height} = Dimensions.get('window');

export default function MenuItem({id, image, name, price}) {
  return (
    <Pressable>
      <View style={styles.container}>
        <FastImage
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{justifyContent: 'space-around'}}>
          <Text style={common.title}>{name}</Text>
          <Text style={[common.subtitle, {color: colors.gray}]}>
            {price} VNĐ
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: colors.red,
                fontSize: 12,
                borderColor: colors.gray,
              },
            ]}>
            BEST SELLER
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
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 8,
  },
});
