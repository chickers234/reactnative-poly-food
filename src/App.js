import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import RootStack from './navigation/RootStack';
import StoreProvider from './utils/store';
import NetInfo from '@react-native-community/netinfo';
import ConnectionStatusBar from './components/ConnectionStatusBar';

export default function App() {
  const [displayConnection, setDisplayConnection] = useState(false);
  const [connection, setConnection] = useState(false);
  const [firstConnect, setFirstConnect] = useState(true);

  useEffect(() => {
    setFirstConnect(false);
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnection(state.isInternetReachable);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!firstConnect) {
      if (connection) {
        setTimeout(() => {
          setDisplayConnection(false);
        }, 2000);
      }
      if (!connection) {
        setTimeout(() => {
          setDisplayConnection(true);
        }, 1000);
      }
    }
  }, [connection, firstConnect]);

  return (
    <StoreProvider>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <RootStack />
      <ConnectionStatusBar
        isConnected={connection}
        isDisplay={displayConnection}
      />
    </StoreProvider>
  );
}
