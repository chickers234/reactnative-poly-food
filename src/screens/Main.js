import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import BillScreen from './BillScreen';
import CartScreen from './CartScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#E54028',
        inactiveTintColor: '#A4A4A4',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <Feather name="shopping-cart" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="BillScreen"
        component={BillScreen}
        options={{
          tabBarLabel: 'Bill',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="profile" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user-o" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
