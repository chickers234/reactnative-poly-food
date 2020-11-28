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

export default function CategoryItem({icon, title, tag, size}) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('CategoryScreen', {tag})}>
      <View style={styles.image}>
        <Image
          source={icon}
          resizeMode="stretch"
          style={{height: size, width: size, marginBottom: 8}}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
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
  image: {
    justifyContent: 'center',
    height: height * 0.07,
  },
  title: {
    fontFamily: 'Roboto-Light',
    fontSize: 12,
    textAlign: 'center',
  },
});
