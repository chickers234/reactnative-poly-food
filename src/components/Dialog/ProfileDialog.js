import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useContext, useState} from 'react';
import {Image, Pressable, StyleSheet, TextInput, View} from 'react-native';
import colors from '../../config/color';
import {StoreContext} from '../../utils/store';
import Text from '../Text';

export default function ProfileDialog({hideDialog}) {
  const {token, user} = useContext(StoreContext);
  const [name, setName] = useState(user.user.name);
  const [phonenumber, setPhonenumber] = useState(user.user.phonenumber);
  const [address, setAddress] = useState(user.user.address);
  const [email, setEmail] = useState(user.user.email);

  const updateUser = async () => {
    const newUser = {
      address: address,
      birthday: '',
      email: email,
      name: name,
      phonenumber: phonenumber,
      token: token.token,
      uid: auth().currentUser.uid,
    };
    user.setUser(newUser);
    await database().ref(`/User/${auth().currentUser.uid}`).set(newUser);
    hideDialog();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../../assets/icons/SuBeeTeam.png')}
        />
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => setPhonenumber(text)}
          value={phonenumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(text) => setAddress(text)}
          value={address}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <View style={styles.line} />
        <Pressable style={styles.customButton} onPress={() => updateUser()}>
          <Text text="Xác nhận" color={colors.white} size={16} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: colors.yellow,
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
    marginTop: -20,
  },
  avatar: {
    height: 110,
    width: 110,
  },
  body: {
    padding: 10,
  },
  input: {
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
  },
  line: {
    height: 1,
    backgroundColor: colors.grey,
  },
  customButton: {
    height: 40,
    backgroundColor: colors.black,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
