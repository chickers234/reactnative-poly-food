import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('window');

export default function Popup({route}) {
  const url = route.params.url;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{height: width, width: width * 0.7}}>
        <FastImage
          style={styles.image}
          source={{uri: url}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 35 / 2,
            position: 'absolute',
            top: -15,
            right: -15,
          }}>
          <FastImage
            source={require('../../assets/icons/ic_close.png')}
            style={{width: 15, height: 15}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.7,
    height: width,
    position: 'absolute',
  },
});
