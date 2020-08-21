import React from 'react';
import {Image, StyleSheet, Dimensions, StatusBar, View} from 'react-native';

export const {width, height} = Dimensions.get('window');

export default function Slider({image}) {
  return (
    <View>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <Image
        style={{height: height * 0.25, width: '100%'}}
        source={image}
        resizeMode="cover"
      />
    </View>
  );
}
