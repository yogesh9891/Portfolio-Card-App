import React, { useEffect, useState,useContext } from "react";
import { Image, StatusBar, StyleSheet, Text, Pressable, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CardContext } from "../../context/CardContext";
import { getAuth } from "../utils/auth";
import { generateFilePath } from "../services/url.service";
import Feather from 'react-native-vector-icons/Feather';
import { getuserbyIdApi } from "../services/users.service";
import { getUserCardApi } from "../services/card.service";
import { toastError } from "../utils/toastMessage";
import { RoleContext } from "../../context/RoleContext";

const mainFont = 'Montserrat-Regular'
export default function Header(props: any){
    const navigate = useNavigation()
    const [name, setNmae] = useState<any>("");
    const [image, setImage] = useState<any>("");
    const [userObj, setUserObj] = useState<any>();
  const [defaultCard, setDefaultCard] = useContext(CardContext);
  const [roleName, setRoleName] =  useContext(RoleContext);
  const [userId, setUserId] = useState<any>("");
  const isFocussed = useIsFocused();

    const authCheck = async () => {
        let tokenObj = await getAuth();
        console.log(tokenObj,"tokenObjtokenObj")
        if (tokenObj) {
            setUserId(tokenObj.user._id);
            setRoleName(tokenObj.user.role);
        } 
      };

      const getuserCard = async () => {
    
        try {
          let {data: res} = await getUserCardApi("");
    
          if (res?.data && res?.data?.length > 0) {
            let cardObj: any = res?.data.find((el: any) => el.isActive == true);
            setDefaultCard(cardObj);
          }
    
        } catch (error) {
          toastError(error);
        }
      };

      useEffect(() => {
        if(isFocussed){
        authCheck();
        getuserCard();
        }
      }, [isFocussed]);


      
  const getUser = async () => {
    let {data: res} = await getuserbyIdApi(userId);
    if (res?.data) {
      setUserObj(res?.data);
      console.log(res?.data, "res?.datares?.datares?.data");
    if(res?.data?.image){
        setImage(res?.data?.image)
    }

      
    }
  };
  useEffect(() => {
    if(userId && userId != ""){
    getUser();

    }
  }, [userId]);
    return(
        <>
      <StatusBar backgroundColor="#1A1824" barStyle='default' />

      <View style={internalcss.headertop}>

                { props.homescreen &&                
                    <Pressable   style={internalcss.rowflex}
                    onPress={() => navigate.navigate("EditCard", {cardNo: defaultCard.slug})}>
                        <View style={{width:widthPercentageToDP(10),height:heightPercentageToDP(5),marginRight:widthPercentageToDP(2)}}>  
                            {
                                image &&   image != "" ? (
                               <Image source={{uri:generateFilePath(defaultCard?.image)}} style={internalcss.userimg} />

                            ) :(
                             <Image source={require('../../assets/img/userimg.png')} style={internalcss.userimg} />

                            )
                    }
                        </View>
            
                            <Text style={internalcss.textblack}>Hi {defaultCard?.name ? defaultCard?.name: 'User'}
                            </Text>
                     
                            {/* <View style={{flexDirection:'row',marginLeft:wp(5)}}><Feather name="edit" color="#fff" size={wp(4)} /></View> */}
                          

                    </Pressable>
                }

               

                {
                    defaultCard?._id ? (
                        <Pressable style={internalcss.rowflex}  onPress={()=> navigate.navigate("Preview",{cardObj:defaultCard})}>
                              <Text style={internalcss.previewtxt}>Preview</Text>
                             </Pressable>
                    ) :(
                        <Pressable style={internalcss.rowflex}  onPress={()=> navigate.navigate("EditProfile",{cardObj:userObj})}>
                                  <Text style={internalcss.previewtxt}>Create Profile</Text>
                             </Pressable>
                    )
                }
         
                   
            </View>
        </>
    )
}

const internalcss = StyleSheet.create({
    rowflex:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
        
    },
    headertop:{
        borderBlockColor:'#1A1824',
        backgroundColor:'#1A1824',
        borderWidth:0.2,
        borderStyle:'solid',
        // backgroundColor:'red',
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:10,
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:10,
    },
    imaegPlcae:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:wp(12),
        height:hp(6),
        borderRadius:100,
        
    },
    userimg:{
        width:'100%',
        height:"100%",
        borderRadius:widthPercentageToDP(10)

    },
    textblack:{
        color:'#fff',
        fontFamily:'Montserrat-Medium',
        fontSize:13
    },
    backtxt:{
        color:'#000',
        fontSize:16,
        fontFamily:'Montserrat-SemiBold'
    },
    previewtxt:{
        color:'#fff',
        fontSize:15,
        padding:10,
        fontFamily:'Montserrat-SemiBold'
    }
})