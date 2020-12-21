import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Fontisto from 'react-native-vector-icons/Fontisto';
import colors from '../../config/color';
import {formatMoney} from '../../utils/helper';
const {height, width} = Dimensions.get('window');

const NewsItem = ({code, type, value, image, date_start, date_end, number}) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{
          uri: image,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {code}
        </Text>

        <Text style={styles.subtitle} numberOfLines={1}>
          Loại: {type}
        </Text>

        {type === 'voucher' ? (
          <Text
            style={{...styles.title, color: 'black', marginVertical: 3}}
            numberOfLines={2}>
            Giá trị: {formatMoney(parseInt(value))} VNĐ
          </Text>
        ) : (
          <Text
            style={{...styles.title, color: 'black', marginVertical: 3}}
            numberOfLines={2}>
            Giá trị: {value}%
          </Text>
        )}

        {type === 'voucher' ? (
          <Text style={{...styles.subtitle, marginBottom: 3}} numberOfLines={3}>
            Mô tả: Giảm giá trực tiếp trên tổng hóa đơn
          </Text>
        ) : (
          <Text style={{...styles.subtitle, marginBottom: 3}} numberOfLines={3}>
            Mô tả: Giảm giá theo phần trăm (%) trên tổng hóa đơn
          </Text>
        )}

        {code.substr(0, 1) === 'D' ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Fontisto name="date" color={'#2E9AFE'} size={13} />
              <Text style={styles.time}>Ngày bắt đầu:</Text>
              <Text style={styles.time}>{date_start}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Fontisto name="date" color={'#2E9AFE'} size={13} />
              <Text style={styles.time}>Ngày kết thúc:</Text>
              <Text style={styles.time}>{date_end}</Text>
            </View>
          </View>
        ) : null}

        {code.substr(0, 1) === 'N' ? (
          <Text style={styles.subtitle} numberOfLines={4}>
            Số lượng mã: {number}
          </Text>
        ) : null}

        {code.substr(0, 1) === 'N' ? (
          <Text
            style={{...styles.subtitle, color: colors.green}}
            numberOfLines={2}>
            Lưu ý: Số lượng có hạn
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    borderRadius: 5,
  },
  image: {
    width: width * 0.22,
    height: width * 0.22,
    marginRight: 12,
    borderRadius: 5,
  },
  info: {
    width: width * 0.78 - 60,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: 'red',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: colors.gray,
  },
  time: {
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    color: '#2E9AFE',
    marginLeft: 5,
    marginBottom: 3,
  },
});
