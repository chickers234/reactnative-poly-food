import React from 'react';
import {Text, View} from 'react-native';

export default function Title({text, color}) {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'Roboto-Regular',
          fontSize: 18,
          marginBottom: 5,
          color: color,
        }}>
        {text}
      </Text>
    </View>
  );
}
