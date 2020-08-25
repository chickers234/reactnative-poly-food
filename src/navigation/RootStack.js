import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import CategoryScreen from '../screens/CategoryScreen';
import DetailMerchantScreen from '../screens/DetailMerchantScreen';
import Main from '../screens/Main';
import PhoneSignIn from '../screens/PhoneSignIn';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {auth().currentUser ? (
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
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="PhoneSignIn"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen
            name="DetailMerchantScreen"
            component={DetailMerchantScreen}
          />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
