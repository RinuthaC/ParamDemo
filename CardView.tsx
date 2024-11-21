import { StyleSheet, Text, View , Image, TouchableOpacity, SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';

const CardView = ({title,isSelected} :{
    title : string,
    isSelected : boolean
}) => {

    const [isClicked, setISClicked] = useState(isSelected)


  return (
    <SafeAreaView style={styles.bottomView}>
      <TouchableOpacity onPress={()=>setISClicked(!isClicked)}>
        <View style={{flexDirection : 'row', justifyContent :'space-between', padding : 20}}>
      <Text style={styles.title}>{title}</Text>
      <CheckBox
        value={isSelected}
        tintColors={{ true: 'blue', false: 'gray' }}
      />
      </View>
      </TouchableOpacity>
    
      {isClicked &&<View>
        <View style={{borderWidth: 0.3, borderColor : 'black', }}></View>
    
      </View>}
    </SafeAreaView>
  )
}

export default CardView

const styles = StyleSheet.create({
    title:{
        fontSize : 25,
        fontWeight : 'bold',
        textAlign : 'center',
        padding : 10
    },
    content:{
        fontSize : 25,
        // fontWeight : 'bold',
        textAlign : 'center',
        padding : 10
    },
    bottomView:{
        borderWidth: 1,
        borderColor : 'black',
        padding : 10,
        borderRadius : 10,
        margin : 10
    }
})