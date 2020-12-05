import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import colors from '../config/color';
import MenuScreen from '../screens/DetailMerchant/MenuScreen';
import common from '../themes/common';
import {StoreContext} from '../utils/store';
const Tab = createMaterialTopTabNavigator();
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function DetailMerchantScreen({route, navigation}) {
  const {id, image, name, address} = route.params;
  const {userLoc, merchantLoc, settingApp} = useContext(StoreContext);
  const origin = {
    latitude: userLoc.userLoc.lat,
    longitude: userLoc.userLoc.long,
  };

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
        <View
          style={{
            position: 'absolute',
            bottom: 110,
            paddingLeft: 10,
            width: width * 0.8,
          }}>
          <Text style={[common.title, {color: colors.white}]}>{name}</Text>
          <Text
            style={[common.subtitle, {color: colors.white}]}
            numberOfLines={2}>
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

        <Pressable
          style={{
            height: 60,
            width: 60,
            position: 'absolute',
            right: 20,
            top: 40,
          }}
          onPress={() => {
            navigation.navigate('MapScreen');
          }}>
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker
              coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}>
              <Image
                source={require('../assets/icons/user_marker.png')}
                style={{height: 20, width: 20}}
              />
            </Marker>
          </MapView>
          <View
            style={{
              height: 60,
              width: 60,
              position: 'absolute',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          borderTopRightRadius: 100,
          marginTop: -100,
        }}>
        <MenuScreen />
      </View>

      {/* <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 13,
            fontFamily: 'Roboto-Bold',
            color: settingApp.settingApp.colorText,
          },
          tabStyle: {width: width * 0.5},
          style: {backgroundColor: settingApp.settingApp.backgroundColor},
        }}>
        <Tab.Screen name="Thực đơn" component={MenuScreen} />
        <Tab.Screen name="Bản đồ" component={MapScreen} />
      </Tab.Navigator> */}
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
    height: height * 0.4,
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
