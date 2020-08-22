import {Dimensions, StyleSheet} from 'react-native';
import colors from '../config/color';

export const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  subtitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
  },
});
