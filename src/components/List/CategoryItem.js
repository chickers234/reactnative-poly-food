import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../config/color';

export const {width, height} = Dimensions.get('window');

export default function CategoryItem({icon, title, tag}) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('CategoryScreen', {tag})}>
      <View style={styles.container}>
        <Image source={icon} style={styles.icon} />
        <Text style={{fontFamily: 'Roboto-Light', fontSize: 12}}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.01,
    backgroundColor: colors.lightgray,
    width: width * 0.23,
    height: height * 0.1,
    borderRadius: 5,
  },
  icon: {
    height: 38,
    width: 38,
    marginBottom: 8,
  },
});
