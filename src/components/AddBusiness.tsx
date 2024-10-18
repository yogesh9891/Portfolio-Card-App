import React, {useState, useEffect, useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import {StatusBar} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Button} from "react-native-paper";
import Header from "../navigationheader/Header";
import {useNavigation} from "@react-navigation/native";
import {launchImageLibrary} from "react-native-image-picker";
import * as ImagePicker from "react-native-image-picker";
import {toastError, toastSuccess} from "../utils/toastMessage";
import {getAuth} from "../utils/auth";
import {getuserbyIdApi, userUpdateApi} from "../services/users.service";
import {generateFilePath} from "../services/url.service";
import {MediaType} from "react-native-image-picker";
import {CameraType} from "react-native-image-picker";
import Entypo from "react-native-vector-icons/Entypo";
import {CardContext} from "../../context/CardContext";
import {updateUserCardApi} from "../services/card.service";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function AddBusiness() {
  const navigate = useNavigation();
  const [image, setImage] = useState("");
  const [businessImage, setBusinessImage] = useState("");
  const [businessCover, setBusinessCover] = useState("");
  const [businessName, setbusinessName] = useState("");
  const [designation, setdesignation] = useState("");
  const [userId, setUserId] = useState<any>("");
  const [userObj, setUserObj] = useState<any>("");
  const [defaultCard, setDefaultCard] = useContext(CardContext);

  const authCheck = async () => {
    let tokenObj = await getAuth();

    if (tokenObj) {
      setUserId(tokenObj?.userId);
    }
  };
 

  useEffect(() => {
    authCheck();
  }, []);

  useEffect(() => {
    if (defaultCard && defaultCard?._id) {

      console.log(JSON.stringify(defaultCard,null,2))

      if (defaultCard?.company) {
        setbusinessName(defaultCard?.company);
      }
      if (defaultCard?.post) {
        setdesignation(defaultCard?.post);
      }
      if (defaultCard?.businessImage) {
        setBusinessImage(defaultCard?.businessImage);
      }

      if (defaultCard?.businessCover) {
        setBusinessCover(defaultCard?.businessCover);
      }
    }
  }, [defaultCard]);

  const handleUploadFrontCardImage = async () => {
    let optiones = {
      // mediaType: type,
      maxWidth: 300,
      includeBase64: true,
      maxHeight: 550,
      quality: 1,
      base64: true,
    };
    const options = {
      maxWidth: 400,
      maxHeight: 400,
      mediaType: "photo" as MediaType,
      cameraType: "back" as CameraType,
      saveToPhotos: false,
      includeBase64: true,
    };

    const results = await launchImageLibrary(options, result => {
      if (result.didCancel) {
        console.log("Image canceled");
      } else if (result.errorCode) {
        console.log(result.errorCode, "err");
      } else {
        if (result.assets !== undefined) {
          // console.log(result.assets[0].base64);
          // setImage(
          //       `data:${result?.assets[0]?.type};base64,${result?.assets[0]?.base64}`
          //     );
        }
      }
    });
    // let resposei =  await ImagePicker.launchImageLibrary((options:any, response:any) => {
    //     if (response.didCancel) {
    //       console.log("Cancelled By user")
    //       return;
    //     }
    //     console.log( `data:${response?.assets[0]?.type};base64,${response?.assets[0]?.base64}`,"+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

    //   //   handleFileSet(`data:${response?.assets[0]?.type};base64,${response?.assets[0]?.base64}`)

    //   });
    //   setImage(
    //     `data:${resposei?.assets[0]?.type};base64,${resposei?.assets[0]?.base64}`
    //   );
    // console.log(JSON.stringify(results,null,2),"resposeiresposeiresposei")
    // setImage(results?.)

    if (results.assets !== undefined) {
      setBusinessImage(
        `data:${results?.assets[0]?.type};base64,${results?.assets[0]?.base64}`,
      );
    }
  };

  const handleUploadFrontCardCover = async () => {
    let optiones = {
      // mediaType: type,
      maxWidth: 300,
      includeBase64: true,
      maxHeight: 550,
      quality: 1,
      base64: true,
    };
    const options = {
      maxWidth: 400,
      maxHeight: 400,
      mediaType: "photo" as MediaType,
      cameraType: "back" as CameraType,
      saveToPhotos: false,
      includeBase64: true,
    };

    const results = await launchImageLibrary(options, result => {
      if (result.didCancel) {
        console.log("Image canceled");
      } else if (result.errorCode) {
        console.log(result.errorCode, "err");
      } else {
        if (result.assets !== undefined) {
          // console.log(result.assets[0].base64);
          // setImage(
          //       `data:${result?.assets[0]?.type};base64,${result?.assets[0]?.base64}`
          //     );
        }
      }
    });
    // let resposei =  await ImagePicker.launchImageLibrary((options:any, response:any) => {
    //     if (response.didCancel) {
    //       console.log("Cancelled By user")
    //       return;
    //     }
    //     console.log( `data:${response?.assets[0]?.type};base64,${response?.assets[0]?.base64}`,"+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

    //   //   handleFileSet(`data:${response?.assets[0]?.type};base64,${response?.assets[0]?.base64}`)

    //   });
    //   setImage(
    //     `data:${resposei?.assets[0]?.type};base64,${resposei?.assets[0]?.base64}`
    //   );
    // console.log(JSON.stringify(results,null,2),"resposeiresposeiresposei")
    // setImage(results?.)

    if (results.assets !== undefined) {
      setBusinessCover(
        `data:${results?.assets[0]?.type};base64,${results?.assets[0]?.base64}`,
      );
    }
  };

  const handleUpdateBusines = async () => {
    let obj: any = {
      company: businessName,
      post: designation,
      businessImage,
      businessCover
    };

    let {data: res} = await updateUserCardApi(defaultCard._id, obj);

    if (res.message) {
      toastSuccess("Success", res.message);
      navigate.navigate("Home");
    }

    try {
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <>
      <View style={internalcss.headertop}>
        <Pressable
          style={internalcss.rowflex}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={internalcss.backtxt}>Add Business</Text>
        </Pressable>
      </View>
      <ScrollView style={internalcss.centerhei}>
        <View style={internalcss.profileimgCover}>
          <Pressable>
            {/* <MaterialIcons name='insert-photo' size={35} color='#8b8b8b' /> */}
            <View  style={{position:'absolute',alignItems:'flex-end',width:wp(85),zIndex:5,marginTop:hp(2),height:wp(20)}}>
              <Pressable  onPress={() => handleUploadFrontCardCover()} >
                <Feather name="edit" color="#fff" size={wp(8)} />
              </Pressable>
              {
                businessCover != "" && (
                  <Pressable  onPress={() => setBusinessCover("")} >
                  <FontAwesome name="remove" color="#FF0000" size={wp(8)} />
                </Pressable>
                )
              }
             
            </View>
            <View
              style={{
                backgroundColor: "#484650",
                width: wp(90),
                height: hp(30),
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#E1AC4C",
              }}>

                <View>

               
                </View>
                {businessCover != "" ? (
              !businessCover.includes("base64") ? (
                <Image
                  source={{uri: generateFilePath(businessCover)}}
                  style={internalcss.bannerCover}
                />
              ) : (
                <Image source={{uri: businessCover}} style={internalcss.bannerCover} />
              )
            ) : (
              <></>
              // <Image
              //   source={require("../../assets/img/upload.png")}
              //   style={internalcss.bannerCover}
              // />
            )}
              
            </View>
          </Pressable>
        </View>
        <View style={internalcss.profileimgcenter}>
          <Pressable onPress={() => handleUploadFrontCardImage()}>
            {businessImage != "" ? (
              !businessImage.includes("base64") ? (
                <Image
                  source={{uri: generateFilePath(businessImage)}}
                  style={internalcss.uploadiocn}
                />
              ) : (
                <Image source={{uri: businessImage}} style={internalcss.uploadiocn} />
              )
            ) : (
              <Image
                source={require("../../assets/img/upload.png")}
                style={{width: wp(30),
                  height: wp(30),}}
              />
            )}
          </Pressable>
          {
            businessImage != ""  && (
              <Pressable  onPress={() => setBusinessImage("")} style={{position:'absolute',top:hp(9),left:wp(59)}} >
              <FontAwesome name="remove" color="#FF0000" size={wp(8)} />
             </Pressable>
            )
          }
             
        </View>

        <TextInput
          style={internalcss.formcontrol}
          placeholder="Organization name"
          placeholderTextColor="#fff"
          selectionColor="#fff"
          value={businessName}
          onChangeText={val => setbusinessName(val)}
        />
        <TextInput
          style={internalcss.formcontrol}
          placeholder="Business Designation"
          placeholderTextColor="#fff"
          selectionColor="#fff"
          value={designation}
          onChangeText={val => setdesignation(val)}
        />

        <Pressable onPress={() => handleUpdateBusines()}>
          <Text style={[internalcss.btnsave, {marginTop: 12}]}>Save</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const internalcss = StyleSheet.create({
  centerhei: {
    backgroundColor: "#1A1824",
    paddingHorizontal: 10,
    flex: 1,
  },
  rowflex: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
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
  imgboxbig: {
    width: "100%",
    height: 180,
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  smallimguser: {
    backgroundColor: "#eaeaea",
    width: 150,
    height: 150,
    padding: 10,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 30,
  },
  profileimgcenter: {
    marginTop: hp(-10),
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius:50,
 
  },
  profileimgCover: {
    marginTop: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerCover: {
    width: "100%",
    height: "100%",
  },
  uploadiocn: {
    width: wp(30),
    height: wp(30),
    borderRadius:wp(30)
  },
  formcontrol: {
    borderBottomWidth: 0.3,
    borderBottomColor: "#ffff",
    marginBottom: 10,
    backgroundColor: "#1A1824",
    color: "#fff",
    margin: 0,
    padding: 0,
    height: 40,
  },
  btnsave: {
    backgroundColor: "#e1ac4c",
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    textAlign: "center",
  },
});
