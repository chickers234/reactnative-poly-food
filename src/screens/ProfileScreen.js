import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../config/color';
import common from '../themes/common';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const logOut = async () => {
    auth()
      .signOut()
      .then(
        () => {
          console.log('Signed Out');
          navigation.navigate('PhoneSignIn');
        },
        (error) => {
          console.error('Sign Out Error', error);
        },
      );
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.customButton} onPress={() => logOut()}>
        <Text style={[common.subtitle, {color: colors.white}]}>Đăng xuất</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
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
});
