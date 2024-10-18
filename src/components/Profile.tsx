import react, { useContext,useState,useEffect } from "react"
import { ScrollView, StyleSheet, Text,View, FlatList, TouchableOpacity,Image, TextInput, Pressable } from "react-native";
import Header from "../navigationheader/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native";
import { logoutUser } from "../utils/auth";
import { TokenContext } from "../../context/TokenContext";
import React from "react";
import Entypo from 'react-native-vector-icons/Entypo';
import { getUserCardApi, updateUserCardApi } from "../services/card.service";
import { generateFilePath } from "../services/url.service";
import { CardContext } from "../../context/CardContext";
import { Switch } from "react-native-paper";
import { toastError, toastSuccess } from "../utils/toastMessage";

export default function Profile(){
    const navigate = useNavigation()
    const [isAuthorised, setIsAuthorised] = useContext(TokenContext);
    const [defaultCard, setDefaultCard] = useContext(CardContext);
    const [isLocked, setIsLocked] = useState(false);

    const handleLogOut = async () => {
        await logoutUser()
        setIsAuthorised(false)
        setDefaultCard({})
    }


    // useEffect(()=>{
    //     if(defaultCard && defaultCard?._id){
    //             setIsLocked(defaultCard?.isLocked)
    //     }
    // },[defaultCard])


    const handleUpdateCard = async () => {

        let defcard = defaultCard
        setIsLocked(!isLocked)
        defcard.isLocked = !isLocked;

        let obj:any = {
            isLocked:!isLocked
        }

        console.log(obj,"objobjobjobj")
        setDefaultCard(defcard)
      
          try {
            let {data:res} =await  updateUserCardApi(defaultCard?._id,obj)

        console.log(res,"objobjobjobj")

        if(res.message){
        //   toastSuccess('Success',res.message)
      
          
      
        }
      
            
        } catch (error) {
            toastError(error)
        }
      }
    return(
        <>
         <View style={insternalcss.headertop}>
        <Pressable
          style={[insternalcss.rowflex,{alignItems:'center'}]}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={insternalcss.backtxt}>Back</Text>
        </Pressable>
      </View>
        <ScrollView style={{backgroundColor:'#1A1824'}} contentContainerStyle={{paddingTop:80}}>
        <View style={insternalcss.container}>
            <View style={[insternalcss.userinfobox, {marginTop:10, position:"relative"}]}>
                <View style={insternalcss.collg4}>
                    <View style={{position:"relative"}}>{
                        defaultCard?.image && defaultCard?.image!="" ? (
                            <Image source={{uri:generateFilePath(defaultCard?.image)}} style={insternalcss.imgresponsive} />
                        ) :(
                            <Image source={require('../../assets/img/userimg.png')} style={insternalcss.imgresponsive} />
                        )
                    }
                       
                        {defaultCard?.businessImage &&  defaultCard?.businessImage !=""  && (
                        <View style={insternalcss.logoContainer}>

                              <Image source={{uri:generateFilePath(defaultCard?.businessImage)}} style={{height:"100%", width:"100%", borderRadius:100}} />
                        </View>

                        )}
                      
                    </View>
                </View>
                
                <View style={insternalcss.collg8}>
                    <View style={[insternalcss.rowflex, {marginTop:10}]}>
                        {/* <FontAwesome name='user-o' size={14} color='#fff' /> */}
                        <Text style={[insternalcss.detailname, {fontSize:18, fontWeight:"600", textAlign:"center"}]}>{defaultCard?.name}</Text>
                    </View>
                    <View style={[insternalcss.rowflex, {marginTop:8}]}>
                        {/* <FontAwesome name='envelope-open-o' size={14} color='#fff' /> */}
                        <Text style={[insternalcss.detailname, {fontSize:16, fontWeight:"400", textAlign:"center", color:"white"}]}>{defaultCard?.post}  {defaultCard?.company ? '@':''} <Text style={{color:"#E1AC4C"}}>{defaultCard?.company}</Text></Text>
                    </View>
                    <View style={[insternalcss.rowflex, ]}>
                        {/* <Ionicons name='call-outline' size={17} color='#fff' /> */}
                        <Text style={[insternalcss.detailname, {marginTop:8,fontSize:12, fontWeight:"400", textAlign:"center", color:"white"}]}>
                            

                            {defaultCard?.description?.length > 50  ? (
                                 <Pressable >

                                    <Text>{ defaultCard?.description.substring(0,50)+'...' }</Text>
                                 </Pressable>
                            )   : (<Text>{defaultCard?.description}</Text>)}
                            
                            </Text>
                    </View>
                </View>

            </View>
{/* 
            <Pressable onPress={() => navigate.navigate('CardList')} style={insternalcss.listdic}>
                <Text style={insternalcss.textblac}>Manage Card</Text>
                <Feather name='chevron-right' color='#fff' size={20} />
            </Pressable> */}
            
            <Pressable onPress={() => navigate.navigate('HowToTap')} style={insternalcss.listdic}>
                <Text style={insternalcss.textblac}>How to tap</Text>
                <Feather name='chevron-right' color='#fff' size={20} />
            </Pressable>
            <Pressable style={insternalcss.listdic} onPress={() => navigate.navigate('Verfication')}>
                <Text style={insternalcss.textblac}>Request Verification</Text>
                <Feather name='chevron-right' color='#fff' size={20} />
            </Pressable>
         
         {
            defaultCard && defaultCard?._id && (
                <View style={[insternalcss.listdic,{alignItems:'center'}]}>
                <Text style={insternalcss.textblac}>Lock Card </Text>
                <Switch
                    trackColor={{true: "#F56D17", false: "#ACA9C9"}}
                    thumbColor="#FFF"
                    value={isLocked}
                    onChange={()=>handleUpdateCard()}
                    
                    />
            </View>
            )
         }
           
            <Pressable  onPress={() => navigate.navigate('Setting')} style={insternalcss.listdic}>
                <Text style={insternalcss.textblac}>Settings</Text>
                <Feather name='chevron-right' color='#fff' size={20} />
            </Pressable>
            <View style={insternalcss.btnsave}>
            <Pressable onPress={() => handleLogOut()}>
                        <Text style={insternalcss.btnsaveText}>Log Out</Text>
            </Pressable>
            </View>

        </View>
        </ScrollView>
        </>
    )
}

const insternalcss = StyleSheet.create({
    rowflex: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
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
    textblac:{
        color:'#fff',
        fontFamily:'Montserrat-Regular',
        fontSize:13,
    },
    collg8:{
        marginTop:50,
        display:"flex",
        flexDirection:"column",
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
    },
    listdic:{
        backgroundColor:'#272631',
        paddingHorizontal:10,
        paddingVertical:12,
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },
    btnsave:{
        backgroundColor:'#e1ac4c',
        padding:12,
        borderRadius:12,
        color:'#fff',
        textAlign:'center'
    },

    btnsaveText:{
        color:'#fff',
        textAlign:'center'
    },
    logoContainer:{
        height:45, 
        width:45, 
        borderWidth:2,
        borderColor:"white",
        backgroundColor:"red",
         position:"absolute",
         right:-10,
         borderRadius:100,
         bottom:-10
    },
    collg4:{
        width:wp(30),
        position:"absolute",
        top:-60,
        marginLeft:wp(34), 
        // left:wp(50),

        // right:wp(50),
        // transform:[{translateX: -wp(50)}]
    },
    userinfobox:{
        backgroundColor:'#272631',

        display:'flex',
        flexDirection:'row',
        justifyContent:"center",
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
        height:hp(15),
        borderColor:'#fff',
        borderRadius:100, 
        
    },
    detailname:{
        color:'#fff',
        fontFamily:'Lato-Regular',
        fontSize:12
    }
})