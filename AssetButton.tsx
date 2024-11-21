import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';

const AssetButton = ({ index, onPress, progress = 0.5 }) => (
  <TouchableOpacity style={styles.assetButton} onPress={onPress}>
    <Progress.Circle
      size={40} // match button size
      progress={index === 3 ? 1 : progress} // 100% if it's the 4th button (index 3)
      color="green" // progress color, customize as needed
      thickness={4} // thickness of the progress circle
      style={styles.progressCircle}
      unfilledColor="#ccc" // background color of the unfilled part
    />
    <Text style={styles.assetButtonText}>{index + 1}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  assetButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginHorizontal: 5,
    position: 'relative',
  },
  progressCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  assetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AssetButton;