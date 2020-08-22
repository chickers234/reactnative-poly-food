import React from 'react';
import {Dimensions, Image, StatusBar, View} from 'react-native';

export const {width, height} = Dimensions.get('window');

export default function Swiper({image}) {
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
