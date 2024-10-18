import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'react-native'
import styles from '../stylecomponents/style'
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { emailloginUser, getAuth } from '../utils/auth';
import { toastError, toastSuccess } from '../utils/toastMessage';
import { sendOtpApi } from '../services/users.service';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { TokenContext } from '../../context/TokenContext';
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '742074343977-mcgdhk143nnlqkairlnt2rbi95okekt7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export default function SingIn() {
  const navigate:any = useNavigation();


  const [mobile, setMobile] = useState<any>("")
  const [isAuthorised, setIsAuthorised] = useContext(TokenContext);


  

  const sendOtp = async () => {
    if (`${mobile}` == '' || `${mobile}`?.length != 10) {
      toastError("Please Enter Valid Mobile Number")
      return
    }
    try {
      let obj = {
        phone: mobile
      }    
      
      console.log(obj, "otpResponseotpResponseotpResponseotpResponse")
      let res = await sendOtpApi(obj);
      console.log(res?.data, "otpResponse")
      let otpResponse = res.data

      if (otpResponse && otpResponse.status == true) {
        toastSuccess("success",otpResponse.msg);
        navigate.navigate('OtpVerfiy', { mobile: mobile })

      } else {
        toastError(otpResponse.msg);
      }
    } catch (error) {
      console.error(error)
      toastError("Please Try Again");
    }
    return
  }


 const  signIn = async () => {
    try {
 
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo?.user,null,2),"userInfouserInfouserInfo")
      if(userInfo?.user){
        let loginStatus = await emailloginUser(userInfo?.user);
        if (loginStatus) {
          toastSuccess("success","Login Successfull");
          setIsAuthorised(true);
          navigate.navigate('AuthorisedStack');
          return 0
        } else {
          toastError('Please Resend Otp');
        }
      } else {
        toastError("Please try again after sometime")
      }
    
      // setState({ userInfo });
    } catch (error:any) {
      console.log(JSON.stringify(error,null,2),"errorerrorerrorerror")

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <>
      <StatusBar barStyle="default" backgroundColor="#3740AA"
      
      />
      <ScrollView>
      <View style={[internalcss.centerhei]}>
                <Image source={require('../../assets/img/logo-white.png')} style={[internalcss.logo]} />
        
          <View style={styles.pdlr}>
         

            <View style={[styles.inputnuber, styles.mttop10]}>
   
              <TextInput placeholder='Mobile Number' style={[styles.inputborder, styles.widhtinpu82]} keyboardType={'phone-pad'} maxLength={10} value={mobile} onChangeText={setMobile} />
            </View>
            <Pressable onPress={() => { sendOtp() }}>
              <View  style={[internalcss.subbtn, styles.mttop10]} >
                <Text style={[styles.textwhite, styles.textcenter]}>Sign In</Text>
              </View>
            </Pressable>
            <GoogleSigninButton  style={[internalcss.googlebtn, styles.mttop10]}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
            />

          </View>
          </View>

      </ScrollView>
   
    </>


  )
}

const internalcss = StyleSheet.create({
  centerhei:{
      backgroundColor:'#1A1824',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      height:heightPercentageToDP(100)
  },
  logo:{
      width:158,
      height:124,
      marginVertical:20

  },
  subbtn: {
    zIndex: 5,
    color: '#fff',
    textAlign: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor:'#E1AC4C'
},
googlebtn: {
  zIndex: 5,
  textAlign: 'center',
  padding: 15,
  borderRadius: 10,
  width:widthPercentageToDP(76),
  height:heightPercentageToDP(8)
},
heading:{
  color:'#fff',
fontFamily: 'Montserrat',
fontSize: 24,
fontWeight: 'normal',
lineHeight: 1,
letterSpacing: 0.48,
}

})
