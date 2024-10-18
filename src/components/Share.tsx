import React,{useContext,useState,useEffect} from "react";
import { ScrollView, StyleSheet, Text,View, TouchableOpacity,Image, TextInput, Pressable ,Share, Linking,Platform,PermissionsAndroid,Alert} from "react-native";
import Header from "../navigationheader/Header";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { CardContext } from "../../context/CardContext";
import { getQrCodeApi } from "../services/users.service";
import { toastError, toastSuccess } from "../utils/toastMessage";
import { generateFilePath ,frontEndUrl,url} from "../services/url.service";
import RNFetchBlob from "rn-fetch-blob";

export default function ShareScreen(){
    const navigate = useNavigation()
    const [defaultCard, setDefaultCard] = useContext(CardContext);
    const [profileUrl, setProfileUrl] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [msg, setmsg] = useState("");
  const [userCardqrode, setuserqrode] = useState<any>();
  const { config, fs } = RNFetchBlob;
  const downloads = fs.dirs.DownloadDir;
  useEffect(() => {
    getuserCard();
  }, []);


 const  getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        'Save remote Image',
        'Grant Me Permission to save Image',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } catch (err:any) {
      Alert.alert(
        'Save remote Image',
        'Failed to save Image: ' + err.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

 const  handleDownload = async () => {
    // if device is android you have to ensure you have permission
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    }

    RNFetchBlob.config({
      fileCache : true,
        addAndroidDownloads : {
      useDownloadManager : true,
      notification : true,
      path:  downloads + '/QRCOE.png',
    }
    })
      .fetch('GET', `${url}/${userCardqrode}`)
      .then(res => {
        console.log('The file saved to ', res.path())
        Alert.alert(
          'Save remote Image',
          'Image Saved Successfully',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      })
      .catch(error => {
  
        Alert.alert(
          'Save remote Image',
          'Failed to save Image: ' + error.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };
  useEffect(() => {
    if(defaultCard?.slug){
      let url = `${frontEndUrl}/profile/${defaultCard.slug}`
      let msg1 =`Tap into professional growth. Discover my Brand Card profile:
      ${url}
      Elevate our careers together. Let's connect for success.`
      setmsg(msg1)
      setProfileUrl(url);
    }

    if(defaultCard?.email){
      setEmail(defaultCard?.email)
    } else {
      setEmail("info@thebrandcard.com")
    }
    if(defaultCard?.phone){
      setPhone(defaultCard?.phone)
    } else {
      setEmail("9999999999")
    }
  }, [defaultCard]);


  

    const onShare = async () => {
      try {
        
      
        const result = await Share.share({
          message:msg,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error: any) {
      console.log(error.message);
      }
    };


  const getuserCard = async () => {

    try{

      let url = `${frontEndUrl}/profile/${defaultCard.slug}`
      console.log(url,"++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
       let {data:res} = await getQrCodeApi(`url=${url}`);
    console.log(res,"setuserqrodesetuserqrode")


    if (res?.file && res.file.fileName) {
    
      setuserqrode(res.file.fileName.replace("",""))
      // setuserqrode(res?.data)
    }
    } catch (error){
      toastError(error)
    }

   
  };

    const shareMessage = () => {
      //Here is the Share API
      Share.share({
        message: "test",
      })
        //after successful share return result
        .then((result) => console.log(result))
        //If any thing goes wrong it comes here
        .catch((errorMsg) => console.log(errorMsg));
    };
  
    return(
        <>
            <ScrollView style={[internalcss.container, {paddingTop:10, backgroundColor:'#1A1824'}]}>
              <View style={{display:'flex', alignItems:'center',marginVertical:10}}>
              {
                userCardqrode && userCardqrode!="" && (
                  <Image source={{uri:`${url}/${userCardqrode}`}} style={internalcss.qrimg} resizeMode="contain" />
                  )
              }
                <Text style={internalcss.scansize}>Scan this OR code to share your profile.</Text>
              </View>

              <Pressable onPress={onShare}  style={[internalcss.sharecard, {marginTop:10}]}>
                <Image source={require('../../assets/img/share_icon.png')} style={internalcss.userimg}  />
                <Text style={internalcss.sharbtn}>Share profile link</Text>
              </Pressable>

              <Pressable onPress={()=> Linking.openURL(`mailto:${email}?subject=ShareProfile&body=${msg}`)} style={[internalcss.sharecard,]}>
                <Image source={require('../../assets/img/Mail.png')} style={internalcss.userimg}  />
                <Text style={internalcss.sharbtn}>Share profile link via email</Text>
              </Pressable>

              <Pressable  onPress={()=> Linking.openURL(`sms:${phone}?subject=ShareProfile&body=${msg}`)} style={[internalcss.sharecard,]}>
                <Image source={require('../../assets/img/Message_square.png')} style={internalcss.userimg}  />
                <Text style={internalcss.sharbtn}>Share profile link via message</Text>
              </Pressable>

              <Pressable style={[internalcss.sharecard,]} onPress={()=>handleDownload()}>
                <Image source={require('../../assets/img/Chart.png')} style={internalcss.userimg}  />
                <Text style={internalcss.sharbtn}>Save QR code to phone</Text>
              </Pressable>
              {/* <View style={[internalcss.sharecard,]}>
                <Image source={require('../../assets/img/Scanner.png')} style={internalcss.userimg}  />
                <Text style={internalcss.sharbtn}>Activate QR Code</Text>
              </View> */}

            </ScrollView>
        </>
    )
}
const internalcss = StyleSheet.create({
    container:{
        paddingHorizontal:10,
    },
    sharbtn:{
        fontFamily:'Montserrat-Regular',
        color:'#fff',
        fontSize:13,
    },
    qrimg:{
        width:wp(50),
        height:hp(30),
    },
    sharecard:{
        backgroundColor:'#484650',
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        paddingHorizontal:6,
        paddingVertical:10,
        borderRadius:10,
        marginBottom:10,
    },
    scansize:{
        fontSize:13,
        marginTop:7,
        color:'#fff',
        fontFamily:'Montserrat-Regular'
    },
    userimg:{
        width:wp(6),
        height:hp(3),
        borderRadius:100,

    },
})