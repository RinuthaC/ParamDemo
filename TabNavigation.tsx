import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TabNavigation = () => (
  <View style={styles.tabContainer}>
    <TouchableOpacity style={styles.tabButton}>
      <Text style={styles.tabText}>SOP</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tabButton}>
      <Text style={styles.tabText}>PREREQUISITE</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tabText: {
    color: '#A7A7A7',
    fontSize: 14,
  },
});

export default TabNavigation;
