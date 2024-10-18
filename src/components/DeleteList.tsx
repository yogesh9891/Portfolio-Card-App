import React, { useState } from 'react'
import {
 SafeAreaView,
 StyleSheet,
 View,
 Text,
 StatusBar,
 FlatList,
 Animated,
 TouchableOpacity
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather';

const mockDataList = [
 { id: '1', text: 'Swipe me left!' },
 { id: '2', text: 'Swipe me right!' },
 { id: '3', text: 'Try swiping in both directions' }
]






const DeleteList = () => {
  const Separator = () => <View style={styles.itemSeparator} />

  const handleDelte = (id) => {
    setdata(prevState => prevState.filter(e => e.id !== id));
  }


const ListItem = ({ text ,id}) => {

  const swipeRight = (progress,dragX) =>{
    const scale = dragX.interpolate({
      inputRange:[-200,0],
      outputRange:[1,0.5],
      extrapolate:'clamp'
    })


    return(
      <View style={{backgroundColor:'red',height:100,justifyContent:'center'}}>
      <TouchableOpacity style={{height:100,width:100,backgroundColor:'red',justifyContent:'center',alignItems:'center'}} onPress={()=>handleDelte(id)}>
        <Feather name="trash-2" size={15} color={"#fff"} />
      </TouchableOpacity>
      </View>
    )
  }

  const height = new Animated.Value(70)
const animatedDelete=() => {
    Animated.timing(height,{
        toValue: 0,
        duration: 350,
        useNativeDriver:false
    }).start(() =>handleDelte(id))
}

  return (
    <Swipeable renderRightActions={swipeRight} >
      <Animated.View style={{flex:1,flexDirection:'row', height:70, alignItems:'center',borderBottomWidth:1,backgroundColor:'white'}}>
        <View style={{overflow:'visible'}}>
          <Text>Subject: {text}</Text>
        </View>
      </Animated.View>
    </Swipeable>
  )
}

  
const [data, setdata] = useState(mockDataList);

 return (
   <>
     <StatusBar barStyle='dark-content' />
     <SafeAreaView style={styles.container}>
       <FlatList
         data={data}
         keyExtractor={item => item.id}
         renderItem={({ item }) => <ListItem {...item} />}
       />
     </SafeAreaView>
   </>
 )
}

const styles = StyleSheet.create({
 container: {
   flex: 1
 },
 itemSeparator: {
   flex: 1,
   height: 1,
   backgroundColor: '#444'
 }
})

export default DeleteList