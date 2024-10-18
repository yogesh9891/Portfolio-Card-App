import React, { useContext,useEffect,useState } from "react"
import { ScrollView, StyleSheet, Text,View, FlatList, TouchableOpacity,Image, TextInput, Pressable } from "react-native";
import Header from "../navigationheader/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native";
import { logoutUser } from "../utils/auth";
import { TokenContext } from "../../context/TokenContext";
import { getUserCardApi } from "../services/card.service";
import { generateFilePath } from '../services/url.service';
import { CardContext } from "../../context/CardContext";
import Entypo from 'react-native-vector-icons/Entypo';

export default function HowToTap() {
    const navigate = useNavigation()





    return(
        <>
        <ScrollView style={{backgroundColor:'#1A1824'}}>
        <View style={{     paddingVertical: 10,marginVertical:10}}>
        <Pressable
          style={insternalcss.rowflex}
          onPress={() => navigate.goBack()}>
     
          <Text style={insternalcss.backtxt}>     <Entypo name="chevron-thin-left" size={14} color="#fff" /> How To Tap</Text>
        </Pressable>
      </View>
             <View style={insternalcss.centerhei}>
                <View style={{paddingVertical:10,height:heightPercentageToDP(10)}}>
                 <Text style={{color:'#ffff',textAlign:'center',fontWeight:"500",fontSize:16,fontFamily:'Montserrat'}}>Activate The Brand Card Device</Text>
                 <Text style={{color:'#ffff',textAlign:'center',fontSize:12,marginVertical:5}}>Choose the device you are activating</Text>

                </View>

              
            </View>
            <View style={insternalcss.rowflex1}>

          <TouchableOpacity onPress={()=>navigate.navigate('IntoIphone')}
           style={insternalcss.collg8}>
              <View style={{width:wp(37)}} >
              <Image
                source={require("../../assets/img/image2.png")}
                style={insternalcss.smallimg}
                resizeMode="contain"
              />
              </View>
              <View style={{marginTop:-10,marginBottom:10}}>
              <Text style={{color:'#ffff',textAlign:'center',fontWeight:"500",fontSize:11,fontFamily:'Montserrat'}}>The Brand card to iPhone</Text>
              <Text style={{color:'#ffff',textAlign:'center',fontSize:10,marginVertical:5}}>iPhone XR, XS, 11, 12, 13  </Text>

              </View>
            
          </TouchableOpacity >
          <TouchableOpacity onPress={()=>navigate.navigate('OldIphone')} style={insternalcss.collg8}>
              <View style={{width:wp(37),marginLeft:10}} >
              <Image
                source={require("../../assets/img/tap2.png")}
                style={insternalcss.smallimg}
                resizeMode="contain"
              />
              </View>
              <View style={{marginTop:-10,marginBottom:10}}>
              <Text style={{color:'#ffff',textAlign:'center',fontWeight:"500",fontSize:11,fontFamily:'Montserrat'}}>The Brand card to Old iPhone</Text>
              <Text style={{color:'#ffff',textAlign:'center',fontSize:10,marginVertical:5}}>iPhone 6, 7, 8, X  </Text>

              </View>
            
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigate.navigate('AndroidPhone')}  style={insternalcss.collg8}>
              <View style={{width:wp(37)}} >
              <Image
                source={require("../../assets/img/tap4.png")}
                style={insternalcss.smallimg}
                resizeMode="contain"
              />
              </View>
              <View style={{marginTop:-10,marginBottom:10}}>
              <Text style={{color:'#ffff',textAlign:'center',fontWeight:"500",fontSize:11,fontFamily:'Montserrat'}}>The Brand card to Android</Text>
              <Text style={{color:'#ffff',textAlign:'center',fontSize:10,marginVertical:5}}>Must have NFC on </Text>

              </View>
            
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigate.navigate('QRCode')} style={insternalcss.collg8}>
              <View style={{width:wp(37)}} >
              <Image
                source={require("../../assets/img/image5.png")}
                style={insternalcss.smallimg}
                resizeMode="contain"
              />
              </View>
              <View style={{marginTop:-10,marginBottom:10}}>
              <Text style={{color:'#ffff',textAlign:'center',fontWeight:"500",fontSize:11 ,fontFamily:'Montserrat'}}>The Brand card with QR code</Text>
              <Text style={{color:'#ffff',textAlign:'center',fontSize:10,marginVertical:5}}>All Phone  </Text>

              </View>
            
          </TouchableOpacity>

</View>
    
        </ScrollView>
        </>
    )
}

const insternalcss = StyleSheet.create({
    textblac:{
        color:'#000',
        fontFamily:'Montserrat-Regular',
        fontSize:13,
    },

    backtxt: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat-SemiBold",
      },
      rowflex1:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        marginVertical:10,
   
    },
    btnsave:{
        backgroundColor:'#e1ac4c',
        padding:12,
        borderRadius:12,
        color:'#fff',
        textAlign:'center'
    }  ,

    btnsaveText:{
        color:'#fff',
        textAlign:'center'
    }  ,
    rowflex:{
        display:'flex',
        flexDirection:'row',
        gap:7
    },
 
    collg4:{
        width:wp(30)
    },
    userinfobox:{
        backgroundColor:'#fdfbf6',
        display:'flex',
        flexDirection:'row',
        padding:10,
        gap:10,
        borderRadius:10,
        marginBottom:20,
    },
    container:{
        paddingHorizontal:10,
    },
    imgresponsive:{
        width:'100%',
        height:'100%',
    },
    detailname:{
        color:'#fff',
        fontFamily:'Lato-Regular',
        fontSize:12
    },
     centerhei: {
        flex: 1,
      },
      profileimgcenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      },
        addcardbtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#484650",
        width: wp(100),
        height: hp(30),
      },
       addcardbtn1: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#484650",
        width: wp(100),
        height: hp(20),
      },
   

      profile:{
        width:'100%',
         height:'100%',
         borderColor:'#fff',
        borderRadius:100, 
        
    },
    collg8:{
      height:hp(30),
      borderRadius:10,
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      margin:5,
      padding:15,
      backgroundColor:"#484650"
  },
     smallimg: {
    width: '100%',
    height: '100%',
  },
})