import React from 'react';
import {Text, View} from 'react-native';

export default function Title({text, color, fontFamily, size}) {
  const fontName = {
    bold: 'Roboto-Bold',
    regular: 'Roboto-Regular',
    thin: 'Roboto-Thin',
    light: 'Roboto-Light',
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: fontName[fontFamily],
          fontSize: size,
          marginBottom: 5,
          color: color,
        }}>
        {text}
      </Text>
    </View>
  );
}
