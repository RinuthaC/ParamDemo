import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardView from './CardView';

    const Task = ({task,lineItems} :{task:Task, lineItems : LineItem[]}) => {
  return (
    <View>
     <FlatList
  data={task.taskCheckLists}
  keyExtractor={(item) => item.lineItemId.toString()}
  renderItem={({ item }) => {
    const lineItem = lineItems.find(lineItem => lineItem.lineItemId === item.lineItemId);
    return <CardView title={lineItem?.description!!} isSelected={item.isCompleted}/>
  }}
/>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({})