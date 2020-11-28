import auth from '@react-native-firebase/auth';
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
        style={{backgroundColor: settingApp.settingApp.color, height: 40}}
      />
      <View
        style={{
          ...styles.header,
          backgroundColor: settingApp.settingApp.color,
        }}>
        <Image
          style={styles.avatar}
          source={require('../assets/icons/SuBeeTeam.png')}
        />
      </View>
      <View style={styles.body}>
        <ScrollView>
          <Text text="Thông tin khách hàng" size={20} fontFamily="bold" />
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
          <InfoRow
            image={require('../assets/icons/ic_crown.png')}
            title="Ngày sinh"
            text={user.user.birthday}
          />
          <Pressable
            style={[
              styles.customButton,
              {backgroundColor: settingApp.settingApp.color, marginTop: 20},
            ]}
            onPress={() => setDialog(true)}>
            <Text text="Cập nhật thông tin" color={colors.white} size={18} />
          </Pressable>
          <Pressable
            style={[styles.customButton, {backgroundColor: colors.grey}]}
            onPress={() => logOut()}>
            <Text text="Đăng xuất" color={colors.black} size={18} />
          </Pressable>
        </ScrollView>
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
  },
  body: {
    flex: 3,
    padding: 10,
  },
  customButton: {
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    height: 130,
    width: 130,
  },
  dialog: {
    padding: 0,
  },
});
