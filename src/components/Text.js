import React from 'react';
import {Text, View} from 'react-native';
import colors from '../config/color';

export default function Title({text, color, fontFamily, size}) {
  const fontName = {
    bold: 'Roboto-Bold',
    regular: 'Roboto-Regular',
    thin: 'Roboto-Thin',
    light: 'Roboto-Light',
    italic: 'Roboto-Italic',
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: fontName[fontFamily] || 'Roboto-Regular',
          fontSize: size || 14,
          marginBottom: 5,
          color: color || colors.black,
        }}>
        {text}
      </Text>
    </View>
  );
}
