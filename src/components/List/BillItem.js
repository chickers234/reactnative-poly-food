import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import colors from '../../config/color';
import Text from '../Text';

export default function BillItem({id, time, status}) {
  const navigation = useNavigation();

  const Tags = {
    'Chờ xử lý': colors.lightred,
    'Đã xác nhận': colors.lightyellow,
    'Hoàn thành': colors.lightgreen,
  };

  return (
    <View style={[styles.container, {backgroundColor: Tags[status]}]}>
      <Pressable onPress={() => navigation.navigate('DetailBillScreen', {id})}>
        <View style={styles.row}>
          <Text text={id} fontFamily="bold" size={14} color={colors.dark} />
        </View>

        <View style={styles.row}>
          <Text text="Đặt vào lúc:" fontFamily="regular" size={14} />
          <Text text={time} fontFamily="regular" size={14} />
        </View>
        <View style={styles.row}>
          <Text text="Trạng thái:" fontFamily="regular" size={14} />
          <Text text={status} fontFamily="regular" size={14} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    shadowColor: colors.lightgray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 5,
    flex: 2,
    margin: 5,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
});
