import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../../config/color';
import ic_back from '../../assets/icons/back.png';
const {height, width} = Dimensions.get('window');

const DetailNewsScreen = ({route}) => {
  const navigation = useNavigation();
  const {title, time, picture, happy} = route.params;

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: picture,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <FastImage
          style={{height: 17, width: 17}}
          source={ic_back}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Pressable>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
          <Fontisto name="date" color={'gray'} size={14} />
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.happy}>{happy}</Text>
      </View>
    </View>
  );
};

export default DetailNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: width,
    height: width * 0.5,
    marginRight: 12,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    marginBottom: 8,
  },
  happy: {
    fontSize: 16,
    fontFamily: 'Roboto-Light',
  },
  time: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: colors.gray,
    marginLeft: 5,
  },
  back: {
    backgroundColor: 'black',
    padding: 6,
    position: 'absolute',
    top: 50,
    left: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
