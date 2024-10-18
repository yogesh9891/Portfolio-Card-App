import React, { useEffect, useRef } from 'react'
import { View ,TouchableOpacity, Animated, Pressable, StyleSheet,Image} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { generateFilePath } from '../services/url.service';
export const ListItem = ({ item, index,onComponentOpen,onDelte }) => {
    const navigate = useNavigation();
    let ref= useRef<any>(null)
  console.log(JSON.stringify(item,null,2),"==================================")
 
  const swipeRight = (progress,dragX) =>{
    const scale = dragX.interpolate({
      inputRange:[-200,0],
      outputRange:[1,0.5],
      extrapolate:'clamp'
    })
    

    return(
      <View >
      <TouchableOpacity  onPress={()=>onDelte(item._id)} style={{backgroundColor:'#48222b',alignContent:'center', height:wp(12),width:wp(12),borderRadius:wp(8),justifyContent:'center',alignItems:'center',display:'flex'}}>
        <Foundation name="trash" size={20} color="red" />
      </TouchableOpacity>
      </View>
    )
  }



  useEffect(()=>{
    if(item.isOpen == false){
        ref.current.close()
    }
  })


    return (
      <Swipeable renderRightActions={swipeRight} ref={ref}   onSwipeableOpen={()=>{
        onComponentOpen(index)
        
      }} >
 
      <Animated.View>
     
        <Animated.View>
          {item.carrdObj?.isLocked ? (
            <Animated.View style={[internalcss.usercard, {
              transform: [{ translateX: translateX }],
            },]}>
              <View style={internalcss.imgcard}>

                {item.carrdObj?.image && item.carrdObj?.image != "" ? (
                  <Image
                    source={{ uri: generateFilePath(item?.carrdObj?.image) }}
                    style={internalcss.userimg}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("../../assets/img/userimg.png")}
                    style={internalcss.userimg}
                    resizeMode="contain"
                  />
                )}


                <View>
                  <Text style={internalcss.name}>{item?.carrdObj?.name}</Text>
                  {/*<Text style={internalcss.dicri}>{item.deci}</Text>*/}
                </View>
              </View>
              <View style={{marginTop:5}}>
              <MaterialCommunityIcons
                name="account-lock"
                color="#fff"
                size={21}
              />
              </View>

            </Animated.View>
          ) : (
            <Pressable
              onPress={() =>
                item.connectionType == "card" || item.connectionType == "profile"
                  ? navigate.navigate("ViewConnection", { cardData: item })
                  : navigate.navigate("Preview", { cardObj: item.carrdObj })
              }
              style={internalcss.usercard}>
              <View style={internalcss.imgcard}>
                {item.connectionType != "card" &&  item.connectionType != "profile" &&  (
                       item.carrdObj?.image && item.carrdObj?.image != "" ? (
                        <Image
                          source={{ uri: generateFilePath(item?.carrdObj?.image) }}
                          style={internalcss.userimg}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          source={require("../../assets/img/userimg.png")}
                          style={internalcss.userimg}
                          resizeMode="contain"
                        />
                      )
                )}
                
                {item.connectionType == "card" &&  (
                    <Foundation  name="web" size={25} color={'#fff'} />
                )}
                
                { item.connectionType == "profile" &&  (
                <AntDesign  name="idcard" size={25} color={'#fff'} />

                )}

                <View>
                  <Text style={internalcss.name}>
                    {item.connectionType == "card" || item.connectionType == "profile"
                      ? item?.name
                      : item?.carrdObj?.name} 
                  </Text>
                </View>
              </View>
              <View  style={{alignContent:'center',justifyContent:'center'}}>
              <AntDesign name="eye" color="#fff" size={21} />
              </View>
            </Pressable>
          )}
        </Animated.View>
      </Animated.View>
      
      {/* </PanGestureHandler> */}
      </Swipeable>
    );
  };
  const internalcss = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
    },
    rowflex: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    headertop: {
      borderBlockColor: "#1A1824",
      backgroundColor: "#1A1824",
      borderWidth: 0.2,
      borderStyle: "solid",
      // backgroundColor:'red',
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 10,
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    backtxt: {
      color: "#fff",
      fontSize: 16,
      fontFamily: "Montserrat-SemiBold",
    },
    userimg: {
      width: wp(10),
      height: hp(5),
      borderRadius: 100,
    },
    imgcard: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      paddingLeft:wp(1),
      alignItems: "center",
    },
    usercard: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#484650",
      paddingHorizontal: 10,
      paddingVertical: 13,
      borderRadius: 20,
      marginBottom: hp(2),
      color: "#fff",
    },
    name: {
      fontFamily: "Montserrat-Medium",
      color: "#fff",
      fontSize: 12,
    },
    dicri: {
      fontFamily: "Montserrat-Light",
      color: "#000",
      fontSize: 10,
    },
  });