import React from 'react';
import {StatusBar} from 'react-native';
import RootStack from './navigation/RootStack';
import StoreProvider from './utils/store';

export default function App() {
  return (
    <StoreProvider>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <RootStack />
    </StoreProvider>
  );
}
