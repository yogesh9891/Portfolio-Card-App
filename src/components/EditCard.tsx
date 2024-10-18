import React, {useContext, useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {StatusBar} from "react-native";
import Header from "../navigationheader/Header";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {deleteCardByNoApi, getUserCardByNoApi, updateUserCardApi} from "../services/card.service";
import {toastError, toastSuccess} from "../utils/toastMessage";
import {CardContext} from "../../context/CardContext";
import {generateFilePath} from "../services/url.service";
import {launchImageLibrary} from "react-native-image-picker";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function EditCard(props: {route: {params: {cardNo: unknown}}}) {
  const [defaultCard, setDefaultCard] = useContext(CardContext);

  const navigate = useNavigation();
  const [userCardNo, setuserCardNo] = useState<any>();
  const [cardObj, setcardObj] = useState<any>();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getUserCardByNo = async (slug: any) => {
    let {data: res} = await getUserCardByNoApi(slug);

    if (res?.data) {
      setcardObj(res?.data);
      setname(res?.data?.name);
      setdescription(res?.data?.description);

      if (res?.data?.image) {
        setImage(res?.data?.image);
      }
    }
  };
  useEffect(() => {
    console.log(props.route.params, "props.route.paramsprops.route.params");
    if (props.route.params?.cardNo) {
      setuserCardNo(props.route.params?.cardNo);
      getUserCardByNo(props.route.params?.cardNo);
    }
  }, [props.route.params?.cardNo]);
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

  const handleUpdateCard = async () => {
    let obj: any = {
      name,
      image,
      description,
    };

    try {
      let {data: res} = await updateUserCardApi(cardObj?._id, obj);
      if (res.message) {
        toastSuccess("Success", res.message);

        if (res?.data) {
          setDefaultCard(res?.data);
        }
      }
    } catch (error) {
      toastError(error);
    }
  };

  const handleDeleteCard = async () => {
 
    try {
      let {data: res} = await deleteCardByNoApi(cardObj?._id);
      if (res.message) {
        toastSuccess("Success", res.message);

        navigate.navigate('Home')
      }
    } catch (error) {
      toastError(error);
    }
  };
  return (
    <>
      <View style={internalcss.headertop}>
        <Pressable
          style={[internalcss.rowflex,{alignItems:'center'}]}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={internalcss.backtxt}>Edit Card</Text>
        </Pressable>
      </View>
      <View style={internalcss.centerhei}>
      <Pressable
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#000",
                borderWidth: 1,
                marginBottom: 10,
                borderColor: "#fff",
                borderRadius: 12,
                marginVertical: 10,
              }}
              onPress={() => navigate.navigate("AddBusiness")}>
              <View
              >
               <AntDesign  name="pluscircle" color={"#484650"} size={23} />
              </View>

              <Text style={internalcss.btnbussiness}>Add Business</Text>
            </Pressable>
      <Text
              style={{
                color: "#fff",
                margin: 10,
                fontSize: 15,
                fontWeight: 500,
              }}>
              Profile Pic
            </Text>
        <View style={internalcss.profileimgcenter}>
          
          <Pressable onPress={() => handleUploadFrontCardImage()}>
            {/* <MaterialIcons name='insert-photo' size={35} color='#8b8b8b' /> */}
            {image != "" ? (
              !image.includes("base64") ? (
                <Image
                  source={{uri: generateFilePath(image)}}
                  style={internalcss.uploadiocn}
                />
              ) : (
                <Image source={{uri: image}} style={internalcss.uploadiocn} />
              )
            ) : (
              <Image
                source={require("../../assets/img/upload.png")}
                style={{width: 150, height: 150}}
              />
            )}

            <View style={{position: "absolute", top: 0, left: wp(30)}}>
              <Entypo name="pencil" size={25} color={"#e1ac4c"} />
            </View>
          </Pressable>
          <View style={{width: widthPercentageToDP(90)}}>
            <Text
              style={{
                color: "#fff",
                margin: 10,
                fontSize: 15,
                fontWeight: 500,
              }}>
              Edit Card Details
            </Text>
            <TextInput
              style={internalcss.formcontrol}
              placeholderTextColor="#fff"
              selectionColor="#fff"
              placeholder="Card holder Name"
              value={name}
              onChangeText={val => setname(val)}
            />
            <TextInput
              style={[internalcss.formcontrol]}
              placeholder="Card Description"
              numberOfLines={5}
              multiline
              placeholderTextColor="#fff"
              value={description}
              onChangeText={val => setdescription(val)}
            />
        
            <Pressable onPress={() => handleUpdateCard()}>
              <Text style={[internalcss.btnsave, {marginTop: 12}]}>Save</Text>
            </Pressable>
            {
         defaultCard  && (
          <Pressable onPress={() => setShowModal(true)}>
          <Text style={[internalcss.btnsave, {marginTop: 12}]}>Delete</Text>
        </Pressable>
         )

            }

            
        
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={internalcss.centeredView}>
          <View style={internalcss.modalView}>
            <Text style={internalcss.h2}>Delete Card</Text>
            <Text style={internalcss.pgr}>
              Are you sure you want to delete this card?
            </Text>
            <View   style={[internalcss.rowflex,{justifyContent:'center',alignItems:'center',gap:10}]}>
               <Pressable
              onPress={() => handleDeleteCard()}  style={{backgroundColor:'#000'}}>
             <Text style={{color:'#fff',paddingVertical:5,paddingHorizontal:15,borderRadius:10}}>Yes</Text> 
            </Pressable >
              <Pressable onPress={() => setShowModal(false)} style={{backgroundColor:'#000'}}><Text style={{color:'#fff',paddingVertical:5,paddingHorizontal:15,borderRadius:10}}>No</Text></Pressable>
            </View>
            <Pressable
              style={internalcss.btn_close}
              onPress={() => setShowModal(false)}>
             <Text style={{color:'#000'}}>X</Text> 
            </Pressable>
          </View>
        </View>
      </Modal>
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
  profileimgcenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  rowflex: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
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
  addcardbtn: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 10,
    borderColor: "#E1AC4C",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#484650",
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(30),
  },

  addbusinessImage: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    tintColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    borderWidth: 5,
    backgroundColor: "#484650",
  },
  btnbussiness: {
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
  imgresponsive: {
    width: "100%",
    height: "95%",
  },
  formcontrol: {
    color: "#fff",
    borderBottomWidth: 0.3,
    borderBottomColor: "#ffff",
    marginBottom: 10,
    backgroundColor: "#1A1824",
    margin: 0,
    padding: 0,
    minHeight: 40,
  },
  btnsave: {
    backgroundColor: "#e1ac4c",
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    textAlign: "center",
  },
  uploadiocn: {
    width: 150,
    height: 150,
    borderRadius: widthPercentageToDP(50),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    position: "relative",
    paddingHorizontal: 10,
    paddingVertical: 16,
    // textAlign:'center',
    width: wp(90),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn_close: {
    position: "absolute",
    top: 10,
    right: 15,
    color: "#000",
    fontWeight: "bold",
    zIndex: 9,
  },
  pgr: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    borderBlockColor: "#000",
    color:'#000',
    borderBottomWidth: 0.4,
    paddingBottom: 15,
    marginBottom: 10,
  },
  h2: {
    fontSize: 19,
    fontFamily: "Montserrat-SemiBold",
    color: "#000",
    paddingVertical: 14,
    // display:'flex',
    // alignItems:'center',
    // justifyContent:'center',
    textAlign: "center",
  },
});
