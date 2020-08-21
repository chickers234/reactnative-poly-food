import React from 'react';
import {Image, StyleSheet, StatusBar, View} from 'react-native';

export default function Slider({image}) {
  return (
    <View style={styles.child}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <Image style={{height: 210, width: '100%'}} source={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  child: {
    height: 210,
    width: '100%',
  },
});
