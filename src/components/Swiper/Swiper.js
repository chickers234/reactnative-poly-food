import React from 'react';
import {Dimensions, Image, View} from 'react-native';

export const {width, height} = Dimensions.get('window');

export default function Swiper({image}) {
  return (
    <View>
      <Image
        style={{height: height * 0.25, width: '100%'}}
        source={image}
        resizeMode="cover"
      />
    </View>
  );
}
