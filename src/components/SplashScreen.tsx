import { View, Text, useWindowDimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Carousel, { Pagination } from 'react-native-snap-carousel';


const SplashScreen = () => {
    const mainFont = 'Montserrat-Regular'
    const { height, width } = useWindowDimensions()
    const navigation = useNavigation()

    const [activeSlide, setActiveSlide] = useState(0);
    const [subscriptionsArr, setSubscriptionsArr] = useState([
        // {
        //     image: require('../../assets/img/qr1.png'),
        //     //   textColor: "black",
        //     imgsizeheight:wp(50),
        //     text2: "Share your digital profile",
        //     text3: "with a QR code or a custom link",
        //     btn:'Next'
        // },
        {
            image: require('../../assets/img/dummy_card.png'),
            text2: "Share your profile",
            // textColor: "#DD2E67",
            imgsizeheight:hp(50),
            text3: "with a QR code or a Tap",
            btn:'Next'
        },
        {
            image: require('../../assets/img/img7.png'),
            // textColor: "#DD2E67",
            text2: "Your One Phygital card",
            imgsizeheight:hp(50),
            text3: "For all your networking needs",
            btn:'Next'
        },
        {
            image: require('../../assets/img/img8.png'),
            // textColor: "#DD2E67",
            text2: "Tap & connect",
            imgsizeheight:hp(50),
            text3: "Instantly with anyone, anywhere",
            btn:'Get Started'
        },
    ]);

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{marginTop:hp(5), width:wp(95), justifyContent:'center', alignItems:'center'}}>
                
              {/* {item.text1 &&  <View style={{position:'absolute', height:wp(35), width:wp(35), borderColor:'white', borderWidth:4, borderRadius:wp(19),  justifyContent:'center', alignItems:'center', marginTop:hp(32.45), marginLeft:wp(55.8)}}>
                <Text style={{ color: '#fff',textAlign: 'center', fontSize: hp(1.5),  fontFamily:mainFont,}}>{item.text3}</Text>
                </View>} */}
                <Image source={require('../../assets/img/logo1.png')}
                style={{height:hp(12), width:wp(30), resizeMode:'contain'}} />
                <Image source={item.image} style={{height:item.imgsizeheight, width:wp(80), alignSelf:'center', marginTop:item.link && hp(8),}} resizeMode='contain' />
                {
                    item.link && <View style={{height:hp(4.5), paddingLeft:wp(4), paddingRight:wp(4), marginTop:hp(8), borderColor:'#E1AC4C', borderWidth:0.8, borderRadius:wp(5), justifyContent:'center', marginBottom:hp(5)}}>
                        <Text style={{color:'white', fontFamily:mainFont, fontSize:hp(1.7)}}>
                            {item.link}
                        </Text>
                        </View>
                }

                <View style={{  width: wp(90), alignItems:'center', alignSelf:'center', marginTop:hp(2)}}>
                
                    <Text style={ { textAlign: "center", color:'#E1AC4C', fontSize: hp(2.5),  fontFamily:mainFont }}>{item.text2}</Text>
                    <Text style={ { textAlign: "center", color: 'white', fontSize: hp(2), paddingHorizontal: 20, fontWeight: "400",fontFamily:mainFont}}>{item.text3}</Text>
                </View>
              <TouchableOpacity onPress={() => { 
                
                    if(index == subscriptionsArr.length-1){
                        navigation.navigate('LoginEmail')
                    } else {
                        this._carousel.snapToNext();
                    }
                }} style={{width:wp(90), alignSelf:'center', backgroundColor:'#E1AC4C', height:hp(5.5), marginTop:hp(5), borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'white', fontFamily:mainFont, fontSize:hp(1.9)}}>{item.btn}
                        </Text></TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ height: height, width: width, backgroundColor: '#1A1824' }}>
            <View style={{ width: wp(95), height: height, alignSelf: 'center' }}>
                <TouchableOpacity onPress={()=>navigation.navigate('LoginEmail')} style={{ height: hp(6), justifyContent: 'center', width: wp(10), alignItems: 'center', alignSelf: 'flex-end', marginTop: hp(1) }}>
                    <Text style={{ color: 'white', fontSize: hp(2.2), fontFamily: mainFont }}>Skip</Text>
                </TouchableOpacity>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={subscriptionsArr}
                    renderItem={_renderItem}
                    sliderWidth={wp(95)}
                    style={{ height: hp(90), }}
                    // loop
                    // autoplay
                    // autoplayInterval={3000}
                    onSnapToItem={(index) => setActiveSlide(index)}
                    enableMomentum={false}
                    lockScrollWhileSnapping={true}
                    // autoplayDelay={1000}
                    itemWidth={wp(98)}
                    layout={'default'} />
            </View>
        </View>
    )
}

export default SplashScreen