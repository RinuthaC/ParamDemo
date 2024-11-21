import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon library
import ChecklistItem from './ChecklistItem';
import { CheckBox } from 'react-native-elements'; // Import CheckBox from react-native-elements


const AssetDropdown = ({ asset, tasks, lineItems, progress = 0.5 }) => {
  const [expandedSubAssetIndex, setExpandedSubAssetIndex] = useState(null);

  const handleSubAssetPress = (index) => {
    setExpandedSubAssetIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <View style={styles.assetDropdown}>
      <View style={styles.assetHeader}>
        <Text style={styles.assetText}>{asset.name}</Text>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={progress} // accepts values from 0 to 1
            color="green" // color of the progress bar
            unfilledColor="#ccc" // background color of the unfilled part
            borderWidth={0} // remove border if preferred
            width={60} // reduced width of the progress bar
            height={8} // set height of the progress bar
          />
          <Text style={styles.progressText}>{`${Math.round(progress * 100)}%`}</Text>
          <Icon name="keyboard-arrow-down" size={20} color="#A7A7A7" style={styles.dropdownIcon} />
        </View>
      </View>
      {tasks
        .filter(task => task.assetId === asset.id)
        .map((task, index) => (
          <View key={task.taskId}>
            {/* <TouchableOpacity onPress={() => handleSubAssetPress(index)}>
              <Text style={styles.assetToggle}>Tap to see more info...</Text>
            </TouchableOpacity> */}
            {expandedSubAssetIndex === index &&
              task.taskCheckLists.map(checkList => (
                <ChecklistItem
                  key={checkList.lineItemId}
                  checkList={checkList}
                  lineItems={lineItems}
                />
              ))}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  assetDropdown: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  assetText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  assetToggle: {
    color: '#A7A7A7',
    fontSize: 14,
    marginTop: 4,
  },
});

export default AssetDropdown;

