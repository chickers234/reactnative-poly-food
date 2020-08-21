import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import colors from '../config/color';

export const {width, height} = Dimensions.get('window');

export default function CategoryItem({icon, title}) {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={{fontFamily: 'Roboto-Light', fontSize: 12}}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.01,
    backgroundColor: colors.lightgray,
    width: width * 0.23,
    height: 80,
    borderRadius: 5,
  },
  icon: {
    height: 38,
    width: 38,
    marginBottom: 8,
  },
});
