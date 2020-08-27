import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Title from '../../components/Title';
import colors from '../../config/color';
import {useNavigation} from '@react-navigation/native';

export default function BillItem({id, time, status}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('DetailBillScreen', {id})}>
        <View style={styles.row}>
          <Title text={id} fontFamily="bold" size={14} color={colors.red} />
        </View>

        <View style={styles.row}>
          <Title text="Đặt vào lúc:" fontFamily="regular" size={14} />
          <Title text={time} fontFamily="regular" size={14} />
        </View>
        <View style={styles.row}>
          <Title text="Trạng thái:" fontFamily="regular" size={14} />
          <Title text={status} fontFamily="regular" size={14} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
