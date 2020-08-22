import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Main from '../screens/Main';
import DetailMerchantScreen from '../screens/DetailMerchantScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="DetailMerchantScreen"
          component={DetailMerchantScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
