import React, {useEffect} from "react";
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Interoscreen(){

    const navigation = useNavigation();
    useEffect(()=>{
      setTimeout(()=>{
        navigation.navigate('Home')
      }, 1000)
    },[])

    return(
        <>
        <StatusBar backgroundColor="black" barStyle="#fff" />
        <ScrollView >
            <View style={[internalcss.centerhei]}>
                <Image source={require('../../assets/img/logo.png')} style={[internalcss.logo]} />
            </View>
        </ScrollView>
        </>
    )
}

const internalcss = StyleSheet.create({
    centerhei:{
        backgroundColor:'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:hp(100)
    },
    logo:{
        width:wp(100),
        height:hp(50)
    }
})

