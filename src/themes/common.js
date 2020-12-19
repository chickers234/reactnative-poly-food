import {Dimensions, Platform, StyleSheet} from 'react-native';
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
    padding: width * 0.02,
    height: height * 0.95,
    paddingBottom: Platform.OS === 'ios' ? 100 : 70,
  },
});
