import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useContext} from 'react';
import {Dimensions, View} from 'react-native';
import {StoreContext} from '../../utils/store';
const Tab = createMaterialTopTabNavigator();
const {width, height} = Dimensions.get('window');
import PostsScreen from './PostsScreen';
import DiscountsScreen from './DiscountsScreen';

export default function ForYou() {
  const {settingApp} = useContext(StoreContext);

  return (
    <>
      <View
        style={{
          backgroundColor: settingApp.settingApp.backgroundColor,
          height: 35,
        }}
      />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 13,
            fontFamily: 'Roboto-Bold',
            color: settingApp.settingApp.colorText,
          },
          indicatorStyle: {backgroundColor: settingApp.settingApp.colorText},
          tabStyle: {width: width * 0.5},
          style: {backgroundColor: settingApp.settingApp.backgroundColor},
        }}>
        <Tab.Screen name="Tin tức" component={PostsScreen} />
        <Tab.Screen name="Khuyến mãi" component={DiscountsScreen} />
      </Tab.Navigator>
    </>
  );
}
