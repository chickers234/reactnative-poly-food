import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../config/color';
import CommentScreen from '../screens/DetailMerchant/CommentScreen';
import MapScreen from '../screens/DetailMerchant/MapScreen';
import MenuScreen from '../screens/DetailMerchant/MenuScreen';
import common from '../themes/common';

const Tab = createMaterialTopTabNavigator();

export const {width, height} = Dimensions.get('window');

export default function DetailMerchantScreen({route, navigation}) {
  const {id, image, name, address} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.image}
          source={{
            uri: image,
          }}>
          <View style={styles.overview} />
        </ImageBackground>
        <View style={{position: 'absolute', bottom: 10, paddingLeft: 10}}>
          <Text style={[common.title, {color: colors.white}]}>{name}</Text>
          <Text style={[common.subtitle, {color: colors.white}]}>
            {address}
          </Text>
        </View>

        <Pressable
          style={styles.back}
          onPress={() => navigation.navigate('Main')}>
          <Image
            source={require('../assets/icons/back.png')}
            style={styles.icon}
          />
          <Text style={[common.title, {color: colors.white}]}>Back</Text>
        </Pressable>
      </View>

      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 13,
            fontFamily: 'Roboto-Regular',
            color: colors.black,
          },
          tabStyle: {width: width * 0.33},
          style: {backgroundColor: colors.yellow},
        }}>
        <Tab.Screen name="Thực đơn" component={MenuScreen} />
        <Tab.Screen name="Bản đồ" component={MapScreen} />
        <Tab.Screen name="Đánh giá" component={CommentScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'relative',
  },
  image: {
    width: width,
    height: height * 0.25,
  },
  overview: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  linearGradient: {
    width: width,
    height: height * 0.25,
    backgroundColor: colors.black,
    position: 'absolute',
    opacity: 0.5,
  },
  back: {
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 5,
  },
});
