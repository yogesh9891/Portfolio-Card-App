import React, {useState} from "react"
import { ScrollView, StyleSheet, Text,View, FlatList, TouchableOpacity,Image, TextInput, Pressable } from "react-native";
import Header from "../navigationheader/Header";
// import FontAwesome from "react-native-vector-icons/FontAwesome"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function PrivacyPolicy(){
    const navigate = useNavigation()

    return(
        <>
       
            <ScrollView style={{backgroundColor:'#1A1824'}}>
            <View style={{padding: 20,marginVertical:10}}>
                <Pressable
                style={insternalcss.rowflex1}
                onPress={() => navigate.goBack()}>
              
                <Text style={insternalcss.backtxt}>   <Entypo name="chevron-thin-left" size={14} color="#fff" /> Pivacy Policy</Text>
                </Pressable>
            </View>
            <View style={insternalcss.container}>
                <Text style={insternalcss.text1}>We are committed to safeguarding your privacy, and this privacy policy explains how and why Frugle Enterprises Pvt. Ltd. (“We”, “Us”, “C&C”) collects and uses any personal information or data when someone (“You”, “Your”, “User”, “Cardholder/Cardmember”), uses the BrandCard App or website.</Text>
                <Text style={insternalcss.h2}>Information provided by you</Text>
                <Text style={insternalcss.text1}>We are committed to safeguarding your privacy, and this privacy policy explains how and why Frugle Enterprises Pvt. Ltd. (“We”, “Us”, “C&C”) collects and uses any personal information or data when someone (“You”, “Your”, “User”, “Cardholder/Cardmember”), uses the BrandCard App or website.</Text>
                <View style={{marginTop:10}}>
                    <Text style={insternalcss.text11}>Your name</Text>
                    <Text style={insternalcss.text11}>Email address</Text>
                    <Text style={insternalcss.text11}>Mobile number</Text>
                    <Text style={insternalcss.text11}>Date of Birth</Text>
                    <Text style={insternalcss.text11}>Gender</Text>
                    <Text style={insternalcss.text11}>Address</Text>
                    <Text style={insternalcss.text11}>Images</Text>
                    <Text style={insternalcss.text11}>Contact list</Text>
                </View>

                <Text style={insternalcss.text1}>We may require you to provide additional details, as and when required, in order to comply with any applicable regulatory requirement or for additional services/products via the App/Website, as and when offered, and may also utilise data lawfully obtained from third party service providers authorised by you.</Text>

                
                <Text style={insternalcss.h2}>Express Consent</Text>
                <Text style={insternalcss.text1}> While providing your details/documents via the App/Website, including but not limited to personal information as mentioned herein above, you expressly consent to C&C (including its marketing channels and business partners) to contact you through SMS, call and/or e-mail and to follow up with regard to the services provided through the App/Website, for imparting product knowledge, offering promotional offers running on the App/Website & various other offers/services by our business partners.</Text>

                
            </View>
            </ScrollView>
        </>
    )
}
const insternalcss = StyleSheet.create({
    container:{
        padding:10
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
    h2:{
        fontSize:17,
        fontFamily:'Montserrat-Medium',
        color:'#fff',
        paddingVertical:14
    },
    text1:{
        fontFamily:'Montserrat-Regular',
        fontSize:11,
        color:'#fff',
        lineHeight:18,
        textAlign:"justify"
    },
    text11:{
        fontFamily:'Montserrat-Medium',
        fontSize:11,
        color:'#fff',
        marginBottom:5,
        // lineHeight:18,
        textAlign:"justify"
    }
})