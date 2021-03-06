import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StoreContext} from '../../utils/store';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(5);
  const [image, setImage] = useState('');
  const {settingApp} = useContext(StoreContext);

  useEffect(() => {
    const onValueChange = database()
      .ref('/Banner/Wellcome')
      .on('value', (snapshot) => {
        setImage(snapshot.val().banner);
      });

    return () => database().ref('/Banner/Wellcome').off('value', onValueChange);
  }, []);

  useEffect(() => {
    const onValueChange = database()
      .ref('/Mamau')
      .on('value', (snapshot) => {
        settingApp.setSettingApp(snapshot.val());
      });

    return () => database().ref('/Mamau').off('value', onValueChange);
  }, []);

  useEffect(() => {
    if (image) {
      const timer = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
          goHomeScreen();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time, image]);

  const goHomeScreen = useCallback(() => {
    if (settingApp.settingApp.backgroundColor) {
      navigation.reset({
        index: 0,
        routes: [{name: auth().currentUser ? 'Main' : 'PhoneSignIn'}],
      });
    }
  }, [time]);

  const _renderBanner = useMemo(
    () => () => (
      <FastImage
        style={{flex: 1}}
        source={{
          uri: image,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    ),
    [image],
  );

  if (image) {
    return (
      <View style={styles.container}>
        {_renderBanner()}
        <Pressable onPress={() => goHomeScreen()} style={styles.action}>
          <Text style={styles.text}>{time}</Text>
          <Text style={styles.text}>{'   |   '}</Text>
          <Text style={styles.text}>X</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator
        size="large"
        color={settingApp.settingApp.backgroundColor}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  action: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#000000',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E6E6E6',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
});
