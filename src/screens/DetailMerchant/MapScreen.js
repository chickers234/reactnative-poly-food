import React, {useContext} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {StoreContext} from '../../utils/store';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapScreen() {
  const {userLoc, merchantLoc} = useContext(StoreContext);
  const origin = {
    latitude: userLoc.userLoc.lat,
    longitude: userLoc.userLoc.long,
  };
  const destination = {
    latitude: merchantLoc.merchantLoc.lat,
    longitude: merchantLoc.merchantLoc.long,
  };
  const GOOGLE_MAPS_APIKEY = 'AIzaSyAI5He5yXpm2806AgEH3Mvy_aQk4hfzxV4';
  //console.log({origin: origin});

  return (
    <View style={styles.container}>
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
            source={require('../../assets/icons/user_marker.png')}
            style={{height: 35, width: 35}}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
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
