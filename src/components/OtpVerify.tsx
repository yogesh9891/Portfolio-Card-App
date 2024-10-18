import {FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {StatusBar} from 'react-native';
import styles from '../stylecomponents/style'
import {useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {loginUser} from '../utils/auth';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { toastError, toastSuccess } from '../utils/toastMessage';
import { sendOtpApi, verifyOtpApi } from '../services/users.service';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { TokenContext } from '../../context/TokenContext';
import { ActivityIndicator } from 'react-native-paper';

export default function OtpVerfiy(props: { route: { params: { mobile: unknown; }; }; }) {
  const [isAuthorised, setIsAuthorised] = useContext(TokenContext);


  const navigate:any = useNavigation();
  const [mobileNum, setMobileNum] = useState<any>('');
  const [loading, setloading] = useState(false);
  const [code, setcode] = useState('');
  if (!props.route.params?.mobile) {
    navigate.navigate('/Login');
    return;
  }
  useEffect(() => {
    console.log(props.route.params,"props.route.paramsprops.route.params")
    if (props.route.params?.mobile) {
      setMobileNum(props.route.params?.mobile);
    }
  }, [props.route.params?.mobile]);

  const verifyOtp = async () => {
    //test otp
    // alert("asd")

  
    console.log(props.route.params?.mobile, 'dfuhffhasdfjdhj',code);

    // let testOtp = mobileNum.substring(0, 6);
    // setcode(testOtp);
    if (`${code}` == '') {
      toastError('Please Enter Otp');
      return;
    }
    setloading(true)
    try {
      let obj = {
        phone: mobileNum,
        otp: code,
      };
      console.log(obj, 'dfuhffhasdfjdhj++++++');

      // VerfyOtp  Api
      let {data:res} = await verifyOtpApi(obj);
      console.log(res, 'otpResponse');
      let otpResponse = res.data;

      if (otpResponse && otpResponse.status == true) {
        // After VerfyOtp  Api  Login Api
        let loginStatus = await loginUser(obj);
        if (loginStatus) {
          toastSuccess("success",otpResponse.msg);
          setIsAuthorised(true);

          navigate.navigate('AuthorisedStack');
        } else {
          toastError('Please Resend Otp');
        }
      } else {
        toastError(otpResponse.msg);
      }
    setloading(false)

    } catch (error) {
      toastError('Please Try Again');
      setloading(false)

    }

    return;
  };

  const resendOtp = async () => {
    if (`${mobileNum}` == '' || `${mobileNum}`?.length != 10) {
      //   toastError("Please Enter Valid Mobile Number")
      return;
    }
    try {
      let obj = {
        phone: mobileNum,
      };
      let res = await sendOtpApi(obj);
      console.log(res?.data, 'otpResponse');
      let otpResponse = res.data;

      if (otpResponse && otpResponse.status == true) {
        toastSuccess("success",otpResponse.msg);
        return;
      } else {
        toastError(otpResponse.msg);
      }
    } catch (error) {
      toastError('Please Try Again');
    }
    return;
  };

  return (
    <>
      <StatusBar barStyle="default" backgroundColor="#3740AA"  />
      <ScrollView>
      <View style={[internalcss.centerhei]}>
                <Image source={require('../../assets/img/logo-white.png')} style={[internalcss.logo]} />
        
          <View style={styles.pdlr}>
         

          <View style={internalcss.containerForTextInput}>
          {/* <TextInput placeholder='Mobile Number' style={internalcss.forcontrol} keyboardType={'phone-pad'} maxLength={10} value={code} onChangeText={setcode} /> */}

            <OTPInputView
              style={{height: 70, zIndex: 1500, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
              pinCount={6}
              autoFocusOnLoad={false}
              editable
              codeInputHighlightStyle={{}}
              codeInputFieldStyle={internalcss.input}
              onCodeFilled={code => {
                setcode(code);
                console.log(code);
              }}
            />
          </View>

          {
              
              loading ? (
          
             <Pressable >
             <View  style={[internalcss.subbtn, styles.mttop10]} >
             <ActivityIndicator size={"small"} color={'#fff'} />
             </View>
           </Pressable>
           ):(
            <Pressable onPress={() => {verifyOtp() }}>
            <View  style={[internalcss.subbtn, styles.mttop10]}>
              <Text style={[styles.textwhite, styles.textcenter]}>Verify Otp</Text>
            </View>
          </Pressable>
           )
         }
           
            <Pressable onPress={() => resendOtp()}>
            <View style={styles.mttop10}>
              <Text style={[styles.textcenter, styles.textwhite]}>Didn’t get it?</Text>
              <Text style={[styles.textcenter,internalcss.resendBtn]}>Send OTP again</Text>
            </View>
          </Pressable>
          </View>
          </View>

      </ScrollView>
    </>
  );
}
const internalcss = StyleSheet.create({
    centerhei:{
        backgroundColor:'#1A1824',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:heightPercentageToDP(100)
    },
    forcontrol:{
      color:'#fff',
      borderBottomWidth: 0.3,
      borderBottomColor: "#ffff",
      marginBottom: 10,
      backgroundColor:"#1A1824",
      margin: 0,
      padding: 0,
      height: 40,
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
  
  heading:{
    color:'#fff',
  fontFamily: 'Montserrat',
  fontSize: 24,
  fontWeight: 'normal',
  lineHeight: 1,
  letterSpacing: 0.48,
  },
  containerForTextInput: {
    width: wp(92),
  },
  input: {
    zIndex: 1500,
  },
  
  resendBtn:{color: '#C4C4C4', marginTop: 12, fontWeight: '600'}
  
  })
