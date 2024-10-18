import { View, Text, useWindowDimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from "@react-navigation/native";

const AndroidPhone = () => {
    const mainFont = 'Montserrat-Regular'
    const { height, width } = useWindowDimensions()
    const navigation = useNavigation()
  return (
    <View style={{ height: height, width: width, backgroundColor: '#1A1824' }}>
    <View style={{ width: width, height: hp(7), flexDirection: 'row', alignItems: "center", paddingLeft: wp(2) }}>
        <TouchableOpacity onPress={() => navigation.goBack()}
            style={{ width: wp(10) }}>
            <Image source={require('../../assets/img/back.png')}
                style={{ height: wp(6), width: wp(6) }} />
        </TouchableOpacity>
        <Text style={{ fontSize: hp(1.8), color: '#fff', fontFamily: mainFont }}>Android Phone</Text>
    </View>
    <FlatList
        data={[]}
        renderItem={null}
        contentContainerStyle={{ paddingBottom: hp(5) }}
        ListHeaderComponent={<>

            <View>

                <View style={{ width: wp(95), alignSelf: 'center' }}>

                    <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Tap to Androids</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Every Android with NFC (almost all)</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>To share to Androids, slide your The Brand Card around the center back area of their phone. Every Android has a slightly different spot for their NFC reader, but generally its near the center</Text>
                    <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Important!</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Unlike iPhones, Androids have the ability to turn NFC off in settings. Before Taping to an Android, make sure their NFC is turned on. To turn NFC on, search 'NFC' in the Android phone settings </Text>
                </View>
                <Image source={require('../../assets/img/img5.png')}
                    style={{ width: wp(80),alignSelf:'center', height: hp(45), resizeMode: 'contain', marginTop: hp(5) }} />
                <View style={{ width: wp(95), alignSelf: 'center' }}>
                    {/* <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>If it is not working, lock their phone, then unlock it and try again. This always helps</Text> */}
                    <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Perfect Technique</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Here's a demo of sharing to Androids</Text>
                    <Image source={require('../../assets/img/profile.png')}
                    style={{ width: wp(95), height: hp(45), resizeMode: 'contain', marginTop: hp(5) }} />
                     <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(3) }}>You Always Have a Backup</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#FFFFFF', fontFamily: mainFont, marginTop: hp(2) }}>If you've tried everything and your The Brand Card device is still not working, you can always use your The Brand Card QR code to share your profile! Your The Brand Card QR code can be found in the share tab at the bottom center of your screen</Text>
                </View>
            </View>
        </>}
    />
</View>
  )
}

export default AndroidPhone