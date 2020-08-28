import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import colors from '../config/color';
import common from '../themes/common';

export default function PhoneSignIn() {
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const user = () => {
    let obj = {
      address: '',
      birthday: '',
      email: '',
      name: '',
      phonenumber: '',
      uid: auth().currentUser.uid,
      token: '',
    };

    return obj;
  };

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Main');
        createUser();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createUser = async () => {
    await database()
      .ref(`/User/${auth().currentUser.uid}`)
      .set(user())
      .catch((error) => {
        console.log(error);
      });

    setConfirm(null);
    setNumber('');
    setCode('');
  };

  const signInWithPhoneNumber = async (phoneNumber) => {
    const confirmation = await auth().signInWithPhoneNumber(
      '+84' + phoneNumber,
    );
    setConfirm(confirmation);
    createUser();
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code).then(() => {
        console.log('uid: ' + auth().currentUser.uid);
      });
    } catch (error) {
      console.log(error);
      alert('Mã OTP không hợp lệ!');
    }
  };

  const Header = () => {
    return (
      <View>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <Image
          style={styles.logo}
          source={require('../assets/icons/logo.png')}
        />
      </View>
    );
  };

  if (!confirm) {
    return (
      <View style={styles.container}>
        <View style={styles.section1}>
          <Header />
        </View>
        <View style={styles.section2}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={[styles.flat, {flex: 1}]}
              source={require('../assets/icons/vietnam.png')}
            />
            <TextInput
              style={[styles.customTextInput, {flex: 5}]}
              value={number}
              onChangeText={(text) => setNumber(text)}
              keyboardType="numeric"
              textAlign={'center'}
              placeholder="Nhập số điện thoại"
            />
          </View>
          <Pressable
            style={styles.customButton}
            onPress={() => signInWithPhoneNumber(number)}>
            <Text style={[common.subtitle, {color: colors.white}]}>
              Đăng nhập
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <>
      <View style={styles.section1}>
        <Header />
      </View>
      <View style={styles.section2}>
        <TextInput
          style={styles.customTextInput}
          value={code}
          onChangeText={(text) => setCode(text)}
          keyboardType="numeric"
          textAlign={'center'}
          placeholder="Nhập mã OTP"
        />
        <Pressable style={styles.customButton} onPress={() => confirmCode()}>
          <Text style={[common.subtitle, {color: colors.white}]}>XÁC NHẬN</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  section2: {
    flex: 3,
    backgroundColor: colors.yellow,
    paddingHorizontal: 10,
    paddingTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logo: {
    height: 120,
    width: 120,
  },
  customTextInput: {
    height: 45,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    color: colors.black,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  customButton: {
    height: 40,
    backgroundColor: colors.black,
    color: colors.yellow,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  flat: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
});
