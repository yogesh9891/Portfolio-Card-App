import { View, Text, useWindowDimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from "@react-navigation/native";

const OldIphone = () => {
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
                <Text style={{ fontSize: hp(1.8), color: '#fff', fontFamily: mainFont }}>Old iphone</Text>
            </View>
            <FlatList
                data={[]}
                renderItem={null}
                contentContainerStyle={{ paddingBottom: hp(5) }}
                ListHeaderComponent={<>

                    <View>

                        <View style={{ width: wp(95), alignSelf: 'center' }}>

                            <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Tap to Older iPhone</Text>
                            <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Tap to Older iPhone 6, 7, 8, X</Text>
                            <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>To share to older iPhones, we recommend using your Tap QR code. This will work for any iPhone. You can also share by having them tap the NFC widget in their control center..</Text>
                            <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Important!</Text>
                        </View>
                        <Image source={require('../../assets/img/img3.png')}
                            style={{ width: width, height: hp(60), resizeMode: 'contain', marginTop: hp(5) }} />
                        <View style={{ width: wp(95), alignSelf: 'center' }}>
                        <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Important!</Text>
                            <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Their screen must be on, their airplane mode must be off, and their camera must not be open</Text>
                            <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Custom QR Codes</Text>
                            <Text style={{ fontSize: hp(1.5), color: '#fff', fontFamily: mainFont, marginTop: hp(2) }}>Did you know you can create your own branded QR code right in Tap? Create your own, save to camera roll, then print on flyers, cards, signs, windows and more Tap here to create your own</Text>
                            <Image source={require('../../assets/img/img4.png')}
                            style={{ width: wp(80), height: hp(45), resizeMode: 'contain', marginTop: hp(5), alignSelf:'center' }} />
                             <Text style={{ fontSize: hp(2), color: '#fff', fontFamily: mainFont, marginTop: hp(3) }}>You Always Have a Backup</Text>
                            <Text style={{ fontSize: hp(1.5), color: '#FFFFFF', fontFamily: mainFont, marginTop: hp(2) }}>If you've tried everything and your The Brand Card device is still not working, you can always use your The Brand Card QR code to share your profile! Your The Brand Card QR code can be found in the share tab at the bottom center of your screen</Text>
                        </View>
                    </View>
                </>}
            />
        </View>
  )
}

export default OldIphone