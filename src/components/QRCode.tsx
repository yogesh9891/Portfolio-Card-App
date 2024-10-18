import { View, Text, useWindowDimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from "@react-navigation/native";

const QRCode = () => {
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
        <Text style={{ fontSize: hp(1.8), color: '#fff', fontFamily: mainFont }}>QR Code</Text>
    </View>
    <FlatList
        data={[]}
        renderItem={null}
        contentContainerStyle={{ paddingBottom: hp(5) }}
        ListHeaderComponent={<>

            <View>

                <View style={{ width: wp(95), alignSelf: 'center' }}>

                    <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Connect with your QR code</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>All iPhone and android phone</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>To share with your The Brand Card QR code, open the The Brand Card app and tap the QR code symbol in the top left. Most devices don't need a QR scanner app to read your QR, just use the normal camera</Text>
                    <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Important!</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>You can add your QR code to your Apple or Google wallet. This allows you to share your The Brand Card smart business card faster than ever</Text>
                </View>
                <Image source={require('../../assets/img/img6.png')}
                    style={{ width: wp(87),alignSelf:'center', height: hp(45), resizeMode: 'contain', marginTop: hp(5) }} />
                <View style={{ width: wp(95), alignSelf: 'center' }}>
                    {/* <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>If it is not working, lock their phone, then unlock it and try again. This always helps</Text> */}
                    <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Custom QR Codes</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Did you know you can create your own branded QR code right in The Brand Card? Create your own, save to camera roll, then print on flyers, cards, signs, windows and more Tap here to create your own</Text>
                    {/* <Image source={require('../../assets/img/img2.png')}
                    style={{ width: wp(95), height: hp(45), resizeMode: 'contain', marginTop: hp(5) }} />
                     <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(3) }}>You Always Have a Backup</Text>
                    <Text style={{ fontSize: hp(1.5), color: '#FFFFFF', fontFamily: mainFont, marginTop: hp(2) }}>If you've tried everything and your The Brand Card device is still not working, you can always use your The Brand Card QR code to share your profile! Your The Brand Card QR code can be found in the share tab at the bottom center of your screen</Text> */}
                </View>
            </View>
        </>}
    />
</View>
  )
}

export default QRCode