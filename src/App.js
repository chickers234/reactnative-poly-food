import React from 'react';
import RootStack from './navigation/RootStack';
import StoreProvider from './utils/store';

export default function App() {
  return (
    <StoreProvider>
      <RootStack />
    </StoreProvider>
  );
}
