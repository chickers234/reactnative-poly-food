import {Dimensions, Platform, StyleSheet} from 'react-native';
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
  body: {
    padding: width * 0.01,
    height: height * 0.55,
    paddingBottom: Platform.OS === 'ios' ? 100 : 70,
  },
  header: {
    backgroundColor: colors.yellow,
    height: 40,
  },
});
