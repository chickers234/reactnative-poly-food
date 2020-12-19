import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Dimensions, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StoreContext} from '../utils/store';
import BillScreen from './BillScreen';
import CartScreen from './CartScreen';
import HomeScreen from './HomeScreen';
import NewsScreen from './News/NewsScreen';
import ProfileScreen from './ProfileScreen';
const {height, width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

export default function MainStack() {
  const navigation = useNavigation();
  const {token, user} = useContext(StoreContext);
  const [Popup, setPopup] = useState('');
  const {settingApp} = useContext(StoreContext);
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const userRef = {
    address: '',
    birthday: '',
    email: '',
    name: '',
    phonenumber: '',
    uid: auth().currentUser.uid,
    token: token?.token,
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
        .once('value', (snapshot) => {
          if (snapshot.val() !== null) {
            database()
              .ref(`/User/${auth().currentUser.uid}/token`)
              .set(token?.token)
              .then(() => {
                user.setUser(snapshot.val());
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            createUser();
            user.setUser(userRef);
          }
        });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const onValueChange = database()
      .ref('/Banner/Popup')
      .on('value', (snapshot) => {
        setPopup(snapshot.val().url);
      });

    return () => database().ref('/Banner/Popup').off('value', onValueChange);
  }, []);

  useEffect(() => {
    if (Popup) {
      navigation.navigate('Popup', {url: Popup});
    }
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
      //console.log('Your Firebase Token is:', fcmToken);
      token.setToken(fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  //TODO: VIEWED COUNTER
  useEffect(() => {
    const onValueChange = database()
      .ref(`ViewedCount/${year}/${month}`)
      .once('value', (snapshot) => {
        database()
          .ref(`ViewedCount/${year}/${month}`)
          .set(snapshot.val() + 1)
          .catch((error) => {
            console.log(error);
          });
      });

    return () =>
      database().ref(`ViewCount/${year}`).off('value', onValueChange);
  }, [year, month]);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: settingApp.settingApp.backgroundColor,
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
        name="Tin tức"
        component={NewsScreen}
        options={{
          tabBarLabel: 'Tin tức',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-newspaper" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => {
            return (
              <View
                style={{
                  height:
                    color !== '#BDBDBD' ? width * 0.13 + 7 : width * 0.13 + 5,
                  width:
                    color !== '#BDBDBD' ? width * 0.13 + 7 : width * 0.13 + 5,
                  backgroundColor:
                    color === '#BDBDBD'
                      ? settingApp.settingApp.backgroundColor
                      : 'white',
                  borderRadius: (width * 0.15 + 5) / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: -10,
                }}>
                <View
                  style={{
                    height: width * 0.13,
                    width: width * 0.13,
                    backgroundColor:
                      color !== '#BDBDBD'
                        ? settingApp.settingApp.backgroundColor
                        : '#f2f2f2',
                    borderRadius: 65 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <MaterialIcons
                    name="shopping-basket"
                    color={color === '#BDBDBD' ? '#848484' : 'white'}
                    size={30}
                  />
                </View>
              </View>
            );
          },
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
