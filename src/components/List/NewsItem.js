import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../../config/color';
const {height, width} = Dimensions.get('window');

const NewsItem = ({happy, picture, time, title}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('DetailNewsScreen', {title, time, picture, happy})
      }>
      <FastImage
        style={styles.image}
        source={{
          uri: picture,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Fontisto name="date" color={'gray'} size={13} />
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.happy} numberOfLines={4}>
          {happy}
        </Text>
      </View>
    </Pressable>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    borderRadius: 5,
  },
  image: {
    width: width * 0.22,
    height: width * 0.22,
    marginRight: 12,
    borderRadius: 5,
  },
  info: {
    width: width * 0.78 - 60,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 5,
  },
  happy: {
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    color: colors.gray,
  },
  time: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    color: colors.gray,
    marginLeft: 5,
  },
});
