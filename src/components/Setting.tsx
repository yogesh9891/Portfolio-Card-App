import { ScrollView,Modal, StyleSheet, Text,View, FlatList, TouchableOpacity,Image, TextInput, Pressable } from "react-native";
import Header from "../navigationheader/Header";
// import FontAwesome from "react-native-vector-icons/FontAwesome"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Feather from "react-native-vector-icons/Feather"
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React ,{useContext, useEffect, useState}  from "react";
import Entypo from 'react-native-vector-icons/Entypo';
import { getAuth, logoutUser } from "../utils/auth";
import { toastError, toastSuccess } from "../utils/toastMessage";
import { getdeleteUserApi } from "../services/users.service";
import { TokenContext } from "../../context/TokenContext";
import { CardContext } from "../../context/CardContext";
export default function Setting(){
    const navigate = useNavigation()
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const isFoucused = useIsFocused();
    const [userId, setUserId] = useState<any>("");
    const [isAuthorised, setIsAuthorised] = useContext(TokenContext);
    const [defaultCard, setDefaultCard] = useContext(CardContext);

    const authCheck = async () => {
        let tokenObj = await getAuth();
    
        console.log(tokenObj, "tokenObjtokenObj");
        if (tokenObj) {
          setUserId(tokenObj.user?._id);
        }
      };
    
      useEffect(() => {
        if(isFoucused){
              authCheck();
        }
      }, [isFoucused]);



      const handleDelete = async() => {
        try {

            let {data:res} = await getdeleteUserApi(userId);

            if(res.message){
                toastSuccess("Success",res.message);
                setShowModal(false)
                await logoutUser()
                setIsAuthorised(false)
                setDefaultCard({})
            }
            
        } catch (error) {
            toastError(error)
        }
      }
      return(
        <>
            <ScrollView style={{backgroundColor:'#1A1824'}}>
            <View style={{     paddingVertical: 10,marginVertical:10}}>
                <Pressable
                style={insternalcss.rowflex1}
                onPress={() => navigate.goBack()}>
              
                <Text style={insternalcss.backtxt}>   <Entypo name="chevron-thin-left" size={14} color="#fff" /> Setting</Text>
                </Pressable>
            </View>
             <View style={[insternalcss.container, {marginTop:19}]}>
                <Pressable onPress={() => navigate.navigate('PrivacyPolicy')} style={insternalcss.listdic}>
                    <Text style={insternalcss.textblac}>Privacy Policy</Text>
                    <Feather name='chevron-right' color='#fff' size={20} />
                </Pressable>
                <Pressable style={insternalcss.listdic} onPress={() => setShowModal(true)}>
                    <Text style={insternalcss.textblac}>Delete Account</Text>
                    <Feather name='chevron-right' color='#fff' size={20} />
                </Pressable>
                {/* <Pressable style={insternalcss.listdic} onPress={() => setShowModal1(true)}>
                    <Text style={insternalcss.textblac}>Deactivate Account</Text>
                    <Feather name='chevron-right' color='#fff' size={20} />
                </Pressable> */}
              
            </View>
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}>
                <View style={insternalcss.centeredView}>
                    <View style={insternalcss.modalView}>
                        <Text style={insternalcss.h2}>Delete Account</Text>
                        <Text style={insternalcss.pgr}>Are you sure you want to delete this account?</Text>
                            <View style={insternalcss.rowflex}>
                                <Pressable   onPress={() => handleDelete()}><Text>OK</Text></Pressable>
                                <Pressable   onPress={() => setShowModal(false)}><Text>Cancel</Text></Pressable>
                            </View>

                        <Pressable
                            style={insternalcss.btn_close}
                            onPress={() => setShowModal(false)}>
                           <Text>X</Text> 
                        </Pressable>
                    </View>
                </View>
            </Modal>
{/* modal dicactive */}
            {/* <Modal
                animationType="fade"
                transparent={true}
                visible={showModal1}
                onRequestClose={() => {
                    setShowModal(!showModal1);
                }}>
                <View style={insternalcss.centeredView}>
                    <View style={insternalcss.modalView}>
                        <Text style={insternalcss.h2}>Deactivate Account</Text>
                        <Text style={insternalcss.pgr}>Are you sure you want to deactivate this account?</Text>
                            <View style={insternalcss.rowflex}>
                                <Text>OK</Text>
                                <Text>Cancle</Text>
                            </View>

                        <Text
                            style={insternalcss.btn_close}
                            onPress={() => setShowModal1(false)}>
                            X
                        </Text>
                    </View>
                </View>
            </Modal>


            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal2}
                onRequestClose={() => {
                    setShowModal(!showModal2);
                }}>
                <View style={insternalcss.centeredView}>
                    <View style={insternalcss.modalView}>
                        <Text style={insternalcss.h2}>Logout</Text>
                        <Text style={insternalcss.pgr}>Are you sure you want to logout?</Text>
                            <View style={insternalcss.rowflex}>
                                <Text>OK</Text>
                                <Text>Cancle</Text>
                            </View>

                        <Text
                            style={insternalcss.btn_close}
                            onPress={() => setShowModal2(false)}>
                            X
                        </Text>
                    </View>
                </View>
            </Modal> */}



        </>
    )
}

const insternalcss = StyleSheet.create({
    rowflex:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        paddingVertical:5
    },
    rowflex1: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
      },
    backtxt: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat-SemiBold",
      },
    pgr:{
        fontSize:15,
        textAlign:'center',
        fontFamily:'Montserrat-Medium',
        borderBlockColor:'#f1f3f4',
        borderBottomWidth:0.4,
        paddingBottom:15,
        marginBottom:10,

    },
    h2:{
        fontSize:19,
        fontFamily:'Montserrat-SemiBold',
        color:'#000',
        paddingVertical:14,
        // display:'flex',
        // alignItems:'center',
        // justifyContent:'center',
        textAlign:'center'
    },
    textbla2c:{
        color:'#000',
        fontFamily:'Montserrat-Regular',
        fontSize:15,
       
    },
    textblac:{
        color:'#fff',
        fontFamily:'Montserrat-Regular',
        fontSize:15,
    },
    listdic:{
        backgroundColor:'#272631',
        paddingHorizontal:10,
        paddingVertical:15,
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15
    },
    container:{
        paddingHorizontal:10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'relative',
        paddingHorizontal:10,
        paddingVertical:16,
        // textAlign:'center',
        width: wp(90),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      btn_close: {
        position: 'absolute',
        top: 0,
        right: 10,
        color: '#000',
        fontWeight: 'bold',
        zIndex: 9,
      },
    
})