import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import {StoreContext} from '../utils/store';
import BillScreen from './BillScreen';
import CartScreen from './CartScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainStack() {
  const navigation = useNavigation();
  const {token, user} = useContext(StoreContext);
  const [Popup, setPopup] = useState('');

  const userRef = {
    address: '',
    birthday: '',
    email: '',
    name: '',
    phonenumber: '',
    uid: auth().currentUser.uid,
    token: '',
  };

  const createUser = () => {
    database()
      .ref(`/User/${auth().currentUser.uid}`)
      .set(userRef)
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        'A new FCM message arrived!',
        JSON.stringify(remoteMessage.notification.body),
      );
      console.log(remoteMessage);
    });

    getFcmToken();

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      database()
        .ref(`/User/${auth().currentUser.uid}`)
        .on('value', (snapshot) => {
          if (snapshot.val() !== null) {
            user.setUser(snapshot.val());
          } else {
            createUser();
            user.setUser(userRef);
          }
        });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    database()
      .ref('/Banner/Popup')
      .once('value')
      .then((snapshot) => {
        setPopup(snapshot.val().url);
      })
      .then(() => {
        if (Popup) {
          navigation.navigate('Popup', {url: Popup});
        }
      });
  }, [Popup]);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      token.setToken(fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#FF4500',
        inactiveTintColor: '#BDBDBD',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({color, size}) => (
            <Foundation name="shopping-cart" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="BillScreen"
        component={BillScreen}
        options={{
          tabBarLabel: 'Hoá đơn',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="th-list" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="user-alt" color={color} size={21} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
