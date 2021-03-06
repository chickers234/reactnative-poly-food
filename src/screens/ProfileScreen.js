import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useContext, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import RNRestart from 'react-native-restart';
import {Dialog} from 'react-native-simple-dialogs';
import ProfileDialog from '../components/Dialog/ProfileDialog';
import InfoRow from '../components/InfoRow';
import Text from '../components/Text';
import colors from '../config/color';
import {StoreContext} from '../utils/store';

export default function ProfileScreen() {
  const [dialog, setDialog] = useState(false);
  const {user, settingApp} = useContext(StoreContext);

  const hideDialog = () => {
    setDialog(false);
  };

  const logOut = async () => {
    await database()
      .ref(`/User/${auth().currentUser.uid}/token`)
      .set(false)
      .catch((error) => {
        console.log(error);
      });

    auth()
      .signOut()
      .then(
        () => {
          RNRestart.Restart();
        },
        (error) => {
          console.error('Sign Out Error', error);
        },
      );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: settingApp.settingApp.backgroundColor,
          height: 40,
        }}
      />
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            ...styles.header,
            backgroundColor: settingApp.settingApp.backgroundColor,
          }}>
          <Image
            style={styles.avatar}
            source={require('../assets/icons/SuBeeTeam.png')}
          />
        </View>
      </View>

      <View
        style={{
          flex: 3,
          backgroundColor: settingApp.settingApp.backgroundColor,
        }}>
        <View style={styles.body}>
          <ScrollView style={{flex: 1, paddingTop: 10}}>
            <Text text="Thông tin khách hàng" size={18} fontFamily="bold" />
            <InfoRow
              image={require('../assets/icons/ic_man.png')}
              title="Họ tên"
              text={user.user.name}
            />
            <InfoRow
              image={require('../assets/icons/ic_phone.png')}
              title="Số điện thoại"
              text={user.user.phonenumber}
            />
            <InfoRow
              image={require('../assets/icons/ic_email.png')}
              title="Email"
              text={user.user.email}
            />
            <InfoRow
              image={require('../assets/icons/ic_map.png')}
              title="Địa chỉ"
              text={user.user.address}
            />
            {/* <InfoRow
            image={require('../assets/icons/ic_crown.png')}
            title="Ngày sinh"
            text={user.user.birthday}
          /> */}
          </ScrollView>
          <Pressable
            style={[
              styles.customButton,
              {
                backgroundColor: settingApp.settingApp.backgroundColor,
                marginTop: 20,
              },
            ]}
            onPress={() => setDialog(true)}>
            <Text
              text="Cập nhật thông tin"
              color={settingApp.settingApp.colorText}
              size={16}
            />
          </Pressable>
          <Pressable
            style={[styles.customButton, {backgroundColor: '#151515'}]}
            onPress={() => logOut()}>
            <Text text="Đăng xuất" color={colors.white} size={16} />
          </Pressable>
        </View>
      </View>

      <Dialog
        contentStyle={styles.dialog}
        visible={dialog}
        title=""
        onTouchOutside={() => setDialog(false)}>
        <ProfileDialog hideDialog={hideDialog} />
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 120,
  },
  body: {
    flex: 3,
    padding: 10,
    borderTopRightRadius: 120,
    backgroundColor: 'white',
  },
  customButton: {
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    height: 120,
    width: 120,
  },
  dialog: {
    padding: 0,
  },
});
