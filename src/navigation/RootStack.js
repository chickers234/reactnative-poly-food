import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Popup from '../screens/Banner/Popup';
import WelcomeScreen from '../screens/Banner/WelcomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import DetailBillScreen from '../screens/DetailBillScreen';
import DetailMerchantScreen from '../screens/DetailMerchantScreen';
import Main from '../screens/Main';
import PhoneSignIn from '../screens/PhoneSignIn';
import DetailNewsScreen from '../screens/News/DetailNewsScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const _route = (value) => {
    if (value) {
      return (
        <>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} />
        </>
      );
    }
    return (
      <>
        <Stack.Screen name="PhoneSignIn" component={PhoneSignIn} />
        <Stack.Screen name="Main" component={Main} />
      </>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        {_route(auth().currentUser)}
        <Stack.Screen
          name="DetailMerchantScreen"
          component={DetailMerchantScreen}
        />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="DetailBillScreen" component={DetailBillScreen} />
        <Stack.Screen name="DetailNewsScreen" component={DetailNewsScreen} />
        <Stack.Screen
          name="Popup"
          component={Popup}
          options={{
            animationEnabled: false,
            cardStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
