import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ExpandedView from './ExpandedView';

const ChecklistItem = ({ checkList, lineItems, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);
  const lineItem = lineItems.find(item => item.lineItemId === checkList.lineItemId);

  return lineItem ? (
    <View style={styles.checklistItem}>
      <TouchableOpacity style={styles.row} onPress={() => setExpanded(prev => !prev)}>
        {/* Display index number (index + 1 for 1-based numbering) */}
        <Text style={styles.index}>{index + 1}.</Text>
        
        {/* Task description */}
        <Text style={styles.description}>{lineItem.description}</Text>

        {/* Rounded CheckBox component */}
        <View>
          <CheckBox
            value={checked}
            onValueChange={() => setChecked(!checked)}
            tintColors={{ true: 'green', false: '#ccc' }}
            style={styles.roundedCheckbox}
          />
        </View>
      </TouchableOpacity>

      {/* Expand view if tapped */}
      {expanded && <ExpandedView checkList={checkList} lineItem={lineItem} />}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  checklistItem: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  index: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: 8, // Space between the index and description
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  roundedCheckbox: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 5,
  },
});

export default ChecklistItem;
