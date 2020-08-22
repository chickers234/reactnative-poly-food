import React, {useContext} from 'react';
import {StyleSheet, Image, Dimensions, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {StoreContext} from '../../utils/store';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapScreen() {
  const {userLat, userLong, merchantLat, merchantLong} = useContext(
    StoreContext,
  );
  const origin = {latitude: userLat.userLat, longitude: userLong.userLong};
  const destination = {
    latitude: merchantLat.merchantLat,
    longitude: merchantLong.merchantLong,
  };
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAI5He5yXpm2806AgEH3Mvy_aQk4hfzxV4';

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: userLat.userLat,
          longitude: userLong.userLong,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <Marker
          coordinate={{
            latitude: userLat.userLat,
            longitude: userLong.userLong,
          }}>
          <Image
            source={require('../../assets/icons/user_marker.png')}
            style={{height: 35, width: 35}}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: merchantLat.merchantLat,
            longitude: merchantLong.merchantLong,
          }}>
          <Image
            source={require('../../assets/icons/merchant_marker.png')}
            style={{height: 35, width: 35}}
          />
        </Marker>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#0080FF"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
