import PropTypes from 'prop-types';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
const {width} = Dimensions.get('window');

const ConnectionStatusBar = ({isConnected, isDisplay}) => {
  if (!isDisplay) {
    return null;
  }

  const offline = () => {
    return (
      <>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width,
            height: 2000,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              backgroundColor: '#424242',
              height: 33,
              position: 'absolute',
              bottom: 0,
              fontFamily: 'Roboto-Light',
              fontSize: 13,
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 7,
              marginBottom: 70,
            }}>
            Vui lòng kiểm tra kết nối mạng!
          </Text>
        </View>
      </>
    );
  };

  return <View>{isConnected ? null : offline()}</View>;
};

export default ConnectionStatusBar;

ConnectionStatusBar.propTypes = {
  isConnect: PropTypes.bool,
  isDisplay: PropTypes.bool,
};
