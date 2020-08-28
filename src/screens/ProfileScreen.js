import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import ProfileDialog from '../components/Dialog/ProfileDialog';
import InfoRow from '../components/InfoRow';
import Text from '../components/Text';
import colors from '../config/color';
import common from '../themes/common';
import {StoreContext} from '../utils/store';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [dialog, setDialog] = useState(false);
  const {user} = useContext(StoreContext);

  const hideDialog = () => {
    setDialog(false);
  };

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
      <View style={common.header} />
      <View style={styles.header}>
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
              {backgroundColor: colors.yellow, marginTop: 20},
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
      <Dialog visible={dialog} title="" onTouchOutside={() => setDialog(false)}>
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
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 3,
    padding: 10,
  },
  customButton: {
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    height: 140,
    width: 140,
  },
});
