import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//For Card Details View
const tasks = [
    {
      id: '1',
      status: 'IN PROGRESS',
      time: '28 min',
      type: 'PM Preventive Maintenance',
      taskId: '2000005123 | FNT | B01 | WMS01',
      taskName: 'B01 | WMS01',
      frequency: 'WMS Fortnightly',
      progress: 0.3,
      inspection: {
        title: 'Visual Inspection',
        options: ['Yes', 'No', 'NA'],
      },
      inspection1: {
        title: 'Check Electrical connections',
        options: ['Yes', 'No', 'NA'],
      },
      inspection2: {
        title: 'Ensure cables free from physical damage',
        options: ['Yes', 'No', 'NA'],
        // image: 'https://example.com/image.jpg',
      },
    },
    // Add more tasks as needed
  ];
  
const TaskHeader = ({ task }) => (
 
  <View style={styles.taskHeader}>
  <View style={styles.statusContainer}>
    <Text style={styles.status}>{"IN PROGRESS"}</Text>
    <Text style={styles.time}>⏱️ {'28 min'}</Text>
  </View>
  <Text style={styles.taskType}>{'PM Preventive Maintenance'}</Text>
  <Text style={styles.taskId}>{'2000005123 | FNT | B01 | WMS01'}</Text>
  <Text style={styles.taskFrequency}>{'WMS Fortnightly'}</Text>
</View>
);

const styles = StyleSheet.create({
  taskHeader: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    backgroundColor: 'green',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  time: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  taskType: {
    color: '#A7A7A7',
    fontSize: 16,
    marginTop: 8,
  },
  taskId: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 4,
  },
  taskFrequency: {
    color: '#A7A7A7',
    fontSize: 14,
    marginTop: 4,
  },
});

export default TaskHeader;
