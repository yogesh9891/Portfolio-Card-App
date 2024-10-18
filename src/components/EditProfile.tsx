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
import {addCard, updateUserCardApi} from "../services/card.service";
import Loading from "./Loading";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function EditProfile() {
  const navigate = useNavigation();
  const [image, setImage] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [description, setdesription] = useState("");
  const [email, setemail] = useState<any>("");
  const [userId, setUserId] = useState<any>("");
  const [defaultCard, setDefaultCard] = useContext(CardContext);
  const [userObj, setUserObj] = useState<any>();
  const [loadiongState, setloadiongState] = useState(false);

  const authCheck = async () => {
    let tokenObj = await getAuth();

    console.log(tokenObj, "tokenObjtokenObj");
    if (tokenObj) {
      setUserId(tokenObj.user?._id);
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  const getUser = async () => {
    let {data: res} = await getuserbyIdApi(userId);
    if (res?.data) {
      setUserObj(res?.data);
      console.log(res?.data, "res?.datares?.datares?.data");
      if (res?.data?.name) {
        setname(res?.data?.name);
      }

      if (res?.data?.email) {
        setemail(res?.data?.email);
      }
      if (res?.data?.phone) {
        setphone(res?.data?.phone);
      }
      if (res?.data?.image) {
        setImage(res?.data?.image);
      }
    }
  };
  useEffect(() => {
    if (userId && userId != "") {
      getUser();
    }
  }, [userId]);

  // useEffect(() => {
  //      if(defaultCard && defaultCard?._id){
  //       setname(defaultCard.name)
  //       setdesription(defaultCard.description)
  //       setemail(defaultCard.email)
  //       setImage(defaultCard.image)
  //     }
  //   }, [defaultCard]);

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
      setImage(
        `data:${results?.assets[0]?.type};base64,${results?.assets[0]?.base64}`,
      );
    }
  };

  const handleUpdateBusines = async () => {
    let obj: any = {
      name,
      image,
      phone,
      email,
    };
    try {
      setloadiongState(true);
      if (defaultCard && defaultCard?._id) {
        obj.designation = obj.description;
        let {data: res} = await userUpdateApi(userId, obj);
        if (res.message) {
          toastSuccess("Success", res.message);
          setloadiongState(false);

          navigate.navigate("BottomTabNav");
        }
      } else {
        obj.userId = userId;
        let {data: res} = await userUpdateApi(userId, obj);
        if (res.message) {
          let {data: res} = await addCard(obj);
          if (res.message) {
            toastSuccess("Success", res.message);
            setloadiongState(false);
            navigate.navigate("BottomTabNav");
          }
        }
      }
    } catch (error) {
      toastError(error);
    }
  };
  return loadiongState ? (
    <Loading />
  ) : (
    <>
      <View style={internalcss.headertop}>
        <Pressable
          style={[internalcss.rowflex, {alignItems: "center"}]}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={internalcss.backtxt}>Edit Profile</Text>
        </Pressable>
      </View>
      <View style={internalcss.centerhei}>
        <View style={internalcss.profileimgcenter}>
          {/* <View style={internalcss.imgboxbig}>
                <Ionicons name='camera-outline' size={60} color='#8b8b8b' />
                <Text>Upload Cover</Text>
            </View> */}
          <Pressable onPress={() => handleUploadFrontCardImage()}>
            {image != "" ? (
              !image.includes("base64") ? (
                <Image
                  source={{uri: generateFilePath(image)}}
                  style={internalcss.uploadiocn1}
                />
              ) : (
                <Image source={{uri: image}} style={internalcss.uploadiocn1} />
              )
            ) : (
              <Image
                source={require("../../assets/img/upload.png")}
                style={internalcss.uploadiocn}
              />
            )}
          </Pressable>
          {image != "" && (
            <Pressable
              onPress={() => setImage("")}
              style={{position: "absolute", top: hp(1), left: wp(59)}}>
              <FontAwesome name="remove" color="#FF0000" size={wp(8)} />
            </Pressable>
          )}
        </View>

        <TextInput
          style={internalcss.formcontrol}
          placeholder="Name"
          placeholderTextColor="#fff"
          selectionColor="#fff"
          value={name}
          onChangeText={val => setname(val)}
        />
        <TextInput
          style={internalcss.formcontrol}
          placeholder="Phone"
          placeholderTextColor="#fff"
          selectionColor="#fff"
          value={phone}
          onChangeText={val => setphone(val)}
        />
        <TextInput
          style={internalcss.formcontrol}
          placeholder="Email"
          editable={false}
          placeholderTextColor="#fff"
          selectionColor="#fff"
          value={email}
          onChangeText={val => setemail(val)}
        />

        <Pressable onPress={() => handleUpdateBusines()}>
          <Text style={[internalcss.btnsave, {marginTop: 12}]}>Save</Text>
        </Pressable>
      </View>
    </>
  );
}

const internalcss = StyleSheet.create({
  centerhei: {
    backgroundColor: "#1A1824",
    height: heightPercentageToDP(100),
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
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  uploadiocn: {
    width: wp(33),
    height: wp(33),
  },
  uploadiocn1: {
    width: wp(33),
    height: wp(33),
    borderRadius: wp(33),
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
