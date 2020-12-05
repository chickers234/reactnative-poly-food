import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width, height} = Dimensions.get('window');

export default function MenuHolder() {
  return (
    <View style={{flex: 1, marginBottom: 120}}>
      <SkeletonPlaceholder>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.block1} />
            <View style={{...styles.block2, borderTopRightRadius: 100}} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.block1} />
            <View style={styles.block2} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.block1} />
            <View style={styles.block2} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.block1} />
            <View style={styles.block2} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.block1} />
            <View style={styles.block2} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.block1} />
            <View style={styles.block2} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.block1} />
            <View style={styles.block2} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * 0.01,
  },
  block1: {
    borderRadius: 5,
    width: width * 0.24,
    height: 80,
    marginRight: width * 0.02,
  },
  block2: {
    borderRadius: 5,
    width: width * 0.66,
    height: 80,
  },
});
