import react, {useState} from "react"
import { ScrollView, StyleSheet, Text,View, FlatList, TouchableOpacity,Image, TextInput, Pressable } from "react-native";
import Header from "../navigationheader/Header";
// import FontAwesome from "react-native-vector-icons/FontAwesome"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";


export default function Product(){
    const navigate = useNavigation()
    const [producthdate, setProducthdate] = useState([
        {
            productimg: require('../../assets/img/product.png'),
            productname: 'The Brand card to iphone',
            productsize: 'iphone XR, XS, 11, 12, 13'
            
        },
        {
            productimg: require('../../assets/img/product.png'),
            productname: 'The Brand card to iphone',
            productsize: 'iphone XR, XS, 11, 12, 13'
            
        },
        {
            productimg: require('../../assets/img/product.png'),
            productname: 'The Brand card to iphone',
            productsize: 'iphone XR, XS, 11, 12, 13'
            
        },
        {
            productimg: require('../../assets/img/product.png'),
            productname: 'The Brand card to iphone',
            productsize: 'iphone XR, XS, 11, 12, 13'
            
        },
        {
            productimg: require('../../assets/img/product.png'),
            productname: 'The Brand card to iphone',
            productsize: 'iphone XR, XS, 11, 12, 13'
            
        },
        {
            productimg: require('../../assets/img/product.png'),
            productname: 'The Brand card to iphone',
            productsize: 'iphone XR, XS, 11, 12, 13'
            
        },
        {
            productimg: require('../../assets/img/product.png'),
            productname: 'The Brand card to iphone',
            productsize: 'iphone XR, XS, 11, 12, 13'
            
        },
        {
            productimg: require('../../assets/img/product.png'),
            productname: 'The Brand card to iphone',
            productsize: 'iphone XR, XS, 11, 12, 13'
            
        },
      
       
       
    ]);


    const renderProduct = ({ item, index }) => {
        return (
            <Pressable onPress={() => navigate.navigate('BrandProduct')}  style={insternalcss.productcard}>
                <Image source={item.productimg}  style={insternalcss.imgfluid} resizeMode="contain" />
                <Text style={insternalcss.h2}>{item.productname}</Text>
                <Text style={insternalcss.h4}>{item.productsize}</Text>
            </Pressable>
        )
    }
    return(
        <>
            <Header backbtn sharebtn />
            <ScrollView style={[insternalcss.container, {backgroundColor:'#fff'}]}>
            <View style={insternalcss.texcenter}>
                <Text style={insternalcss.text1}>Activate The Brand Card Device</Text>
                <Text style={insternalcss.text2}>Choose the device you are activating</Text>
            </View>


                <FlatList
                    data={producthdate}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderProduct}
                    numColumns={2}
                    style={{width:'100%', }}
                    columnWrapperStyle={{justifyContent:'space-between'}}
                    contentContainerStyle={{paddingHorizontal:0}}
                    // contentContainerStyle={{ paddingVertical: 15 }}
                />

</ScrollView>
           
        </>
    )
}

const insternalcss = StyleSheet.create({
    container:{
        paddingHorizontal:10,

    },
    imgfluid:{
        width:'100%',
        height:hp(14)
    },
    h2:{
        fontFamily:'Lato-Regular',
        fontSize:12,
        color:'#000',
        marginTop:5,
        textAlign:'center',
        // display:'flex',
        // alignItems:'center',
        // justifyContent:'center'
    },
    h4:{
        textAlign:'center',

        fontFamily:'Lato-Light',
        fontSize:10,
        color:'#000',
        marginTop:-5,
    },
    productcard:{
        backgroundColor:'#fdfbf6',
        borderRadius:10,
        paddingHorizontal:5,
        paddingVertical:15,
        display: 'flex',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        gap: 10,
        width:'48%',
        marginBottom:10,

    },
    texcenter:{
        display:'flex',
        alignItems:'center',
        marginVertical:20,
    },
    text1:{
        fontFamily:'Lato-Regular',
        color:'#000',
        fontSize:17
    },
    text2:{
        fontFamily:'Lato-Light',
        color:'#000',
        fontSize:13,
        marginTop:5
    }
})