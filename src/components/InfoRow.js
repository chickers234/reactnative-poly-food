import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import colors from '../config/color';

export default function InfoRow({image, title, text}) {
  return (
    <View>
      <View style={styles.row}>
        <Image style={styles.icon} source={image} />
        <View>
          <Text text={title} fontFamily="bold" />
          <Text text={text} />
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  icon: {
    height: 35,
    width: 35,
    marginRight: 15,
  },
  line: {
    height: 1,
    backgroundColor: colors.grey,
  },
});
