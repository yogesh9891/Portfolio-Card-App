import React, { useState, useEffect, useContext,useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Animated,
  Platform,PermissionsAndroid,Alert, ActivityIndicator
} from "react-native";
import Header from "../navigationheader/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useIsFocused, } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import { getConnectionDeleteApi, getConnectionDownloadApi, getUserCoonectionApi } from "../services/connection.service";
import { toastError, toastSuccess } from "../utils/toastMessage";
import { generateFilePath } from "../services/url.service";
import { CardContext } from "../../context/CardContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import { Modal } from "react-native/Libraries/Modal/Modal";
import { Swipeable } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import RNFetchBlob from "rn-fetch-blob";
import Feather from 'react-native-vector-icons/Feather';
import { ListItem } from "./ListItem";

export default function Connections() {
  const navigate = useNavigation();
  const [pricedate, setPricedate] = useState([]);
  const [defaultCard, setDefaultCard] = useContext(CardContext);
  const [share, setShare] = useState(false)
  const [fileUrl, setFileUrl] = useState("");
  const isFoucused = useIsFocused();
  const { config, fs } = RNFetchBlob;
  const downloads = fs.dirs.DownloadDir;
  const [isloading, set5Isloading] = useState(false)
 

    const translateX = useRef(new Animated.Value(0)).current;


    const handleGesture = Animated.event(
      [{ nativeEvent: { translationX: translateX } }],
      { useNativeDriver: true }
    );

    const handleRelease = (event:any) => {
      if (event.nativeEvent.translationX < -100) {
        Animated.timing(translateX, {
          toValue: -500,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          // Perform delete operation here after animation completion
          // For example, remove the item from the list or database
          console.log('Item deleted');
        });
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    };

  const getuserConnection = async () => {
    set5Isloading(true)
    try {
      let { data: res } = await getUserCoonectionApi(
        "userCardId=" + defaultCard?._id,
      );

      if (res?.data && res?.data?.length > 0) {
        console.log(
          JSON.stringify(res?.data, null, 2),
          "csdafsdfdddddddddddddddddddddd",
        );
        setPricedate(res?.data.map((el:any) => {
          el.isOpen =false;
          return el;
        }));

      } else {
        setPricedate([])
      }
      set5Isloading(false)

    } catch (error) {
      toastError(error);
      set5Isloading(false)

    }
  };
  useEffect(() => {
    if (isFoucused && defaultCard && defaultCard._id) {
      getuserConnection();
    }
  }, [isFoucused, defaultCard]);

  // const rightSwipe = () => (
  //   <TouchableOpacity onPress={() => handleDelete(item.id)}>
  //     <View style={{}}>
  //       <Text style={{}}>Delete</Text>
  //     </View>
  //   </TouchableOpacity>
  // );


  const handleDelte =async (id) => {
    try {

        let {data:res} = await getConnectionDeleteApi(id);

        if(res.message) {
          toastSuccess("success",res.message)
          getuserConnection()
        }


    }catch(err){

    }
  }

  const handleComponentOpen = (ind:number) => {
    let temp:any = pricedate;
    temp = temp.map((el:any,nidex:number) => {
      if(nidex == ind){
        el.isOpen == true
      } else {
        el.isOpen == false
      }

      return el
    })

    setPricedate(temp)
  }

 

  const Swipegesture = () => {
    return (
      <TouchableOpacity style={{ height: hp(5), width: wp(10), backgroundColor: '#C70039' }}>

      </TouchableOpacity>
    )
  }
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


    const getExcelurl = async () => {
      let url = "";

      try {
        let { data: res } = await getConnectionDownloadApi(defaultCard?._id,"");
          
        if (res?.data && res?.data) {
          url = res?.data

          setFileUrl(res?.data)
          return url

        }

        return url

      } catch (error) {
        toastError(error);
        return url
      }
    }

    const handleSendBuGmail = async () => {
      let url = "";

      try {
        let { data: res } = await getConnectionDownloadApi(defaultCard?._id,"type=gmail");
          
        if (res?.data && res?.data) {
          url = res?.data
          setShare(false)
          toastSuccess("Success","Mail Sent Successfully")

        }

        return url

      } catch (error) {
        toastError(error);
        return url
      }
    }
  
  const  handleDownload = async () => {
    // if device is android you have to ensure you have permission
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    }


    let fileu =await  getExcelurl();

      RNFetchBlob.config({
        fileCache : true,
          addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path:  downloads + '/connection.xlsx',
      }
      })

      
        .fetch('GET', `${fileu}`)
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

  return (
    <>
      <View style={internalcss.headertop}>
        <Pressable
          style={internalcss.rowflex}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={internalcss.backtxt}>Connections</Text>
        </Pressable>

        <View style={internalcss.rowflex}>
          <TouchableOpacity onPress={() => setShare(true)} >
            <Image source={require('../../assets/img/share.png')}
              style={{ height: wp(5), width: wp(5) ,marginRight:7}} />
          </TouchableOpacity>

          <Pressable onPress={() => navigate.navigate("CameraCard")}>
            <View style={{ padding: 10 }}>
              <MaterialCommunityIcons
                name="credit-card-scan-outline"
                color="#fff"
                size={21}
              />
            </View>
          </Pressable>

          <Pressable
            style={internalcss.rowflex}
            onPress={() => navigate.navigate("AddCard", { type: "connection" })}>
            <View style={{ padding: 10 }}>
              <MaterialCommunityIcons
                name="data-matrix-scan"
                color="#fff"
                size={21}
              />
            </View>
          </Pressable>
        </View>
      </View>
      <ScrollView style={[internalcss.container, { backgroundColor: "#1A1824" }]}>

      {  isloading ? <ActivityIndicator size={'large'} style={{ marginTop: hp(30) }} /> :( 
        pricedate && pricedate?.length > 0 ? (
          <FlatList
            data={pricedate}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item,index})=>{
              return <ListItem item={item} index={index} onComponentOpen={ (x:number)=> handleComponentOpen(x)}  onDelte={(x:number)=>handleDelte(x)} />

            }}
            contentContainerStyle={{ paddingVertical: 15 }}
          />
        ) : (
          <View
            style={[
              internalcss.rowflex,
              { justifyContent: "center", height: hp(80) },
            ]}>
            <Text style={{ color: "#ffff" }}>No Connections Found</Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        isVisible={share}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        style={{ marginLeft: 0, marginBottom: 0, bottom: 0, }}
      >
        <View style={{ width: wp(100), height: hp(30), backgroundColor: 'white', bottom: -hp(37), borderTopRightRadius: wp(5), borderTopLeftRadius: wp(5), paddingLeft: wp(7), paddingRight: wp(4) }}>
          <TouchableOpacity
            onPress={() => setShare(false)}
            style={{ marginTop: hp(2), alignSelf: 'flex-end' }}>
            <Image source={require('../../assets/img/close.png')}
              style={{ height: wp(5), width: wp(5), tintColor: 'black' }} />
          </TouchableOpacity>
          <Text style={{fontWeight:'500',color:'#000'}}>Export Connections to:</Text>

          <View style={{ flexDirection: 'row', marginTop: hp(5), width: wp(70), justifyContent: 'space-evenly', alignSelf: 'center', }}>
            <TouchableOpacity onPress={()=>handleSendBuGmail()}>
              <Image source={require('../../assets/img/gmail.png')}
                style={{ height: wp(15), width: wp(15) }} />
                <Text style={{color:'#000'}}>Gmail</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>handleDownload()}>
              <Image source={require('../../assets/img/excel.png')}
                style={{ height: wp(15), width: wp(15) }} />
                <Text style={{color:'#000'}}>Excel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const internalcss = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  rowflex: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  headertop: {
    borderBlockColor: "#1A1824",
    backgroundColor: "#1A1824",
    borderWidth: 0.2,
    borderStyle: "solid",
    // backgroundColor:'red',
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  backtxt: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },
  userimg: {
    width: wp(10),
    height: hp(5),
    borderRadius: 100,
  },
  imgcard: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingLeft:wp(1),
    alignItems: "center",
  },
  usercard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#484650",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: hp(2),
    color: "#fff",
  },
  name: {
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    fontSize: 12,
  },
  dicri: {
    fontFamily: "Montserrat-Light",
    color: "#000",
    fontSize: 10,
  },
});
