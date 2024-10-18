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
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  deleteCardByNoApi,
  getUserCardByNoApi,
  updateUserCardApi,
} from "../services/card.service";
import {toastError, toastSuccess} from "../utils/toastMessage";
import {CardContext} from "../../context/CardContext";
import {generateFilePath} from "../services/url.service";
import {launchImageLibrary} from "react-native-image-picker";
import { addVerfication } from "../services/verfication.service";

export default function Verfication() {
  const [defaultCard, setDefaultCard] = useContext(CardContext);

  const navigate = useNavigation();
  const [userCardNo, setuserCardNo] = useState<any>();
  const [cardObj, setcardObj] = useState<any>();
  const isFoucused = useIsFocused();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [document, setDocument] = useState("");
  const [designation, setDesignation] = useState("");
  const [brand, setBrand] = useState("");
  const [linkArr, setLinkArr] = useState([{
    link:""
  }]);
  const [documentArr, setdocumentArr] = useState([
    {
      name: "Aadhaar",
    },
    {
      name: "Passport",
    },
    {
      name: "Driver License",
    },
    {
      name: "PAN",
    },
    {
      name: "Recent Utility Bill",
    },
  ]);

  useEffect(()=>{
    if(isFoucused){
      if(defaultCard && defaultCard?._id){
        setname(defaultCard?.name)
      }
    }
  },[isFoucused])
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
        
        }
      }
    });


    if (results.assets !== undefined) {
      setImage(
        `data:${results?.assets[0]?.type};base64,${results?.assets[0]?.base64}`,
      );
    }
  };

  const handleUpdateCard = async () => {
  


    if(!name || name==""){
      toastError("Please Enter Your Name");
      return 
    }

    if(!document || document==""){
      toastError("Please select document type");
      return 
    }


    if(!image || image==""){
      toastError("Please Upload document");
      return 
    }

    if(!designation || designation==""){
      toastError("Please Enter Your Designation");
      return 
    }

    if(linkArr.length == 0 || linkArr.some((el) => el.link =="")){
      toastError("Please Enter All Your Link");
      return 
    }
    let obj: any = {
      name,
      documentType:document,
      image,designation,brand,linkArr,
      userId:defaultCard?.userId

    };
    try {
      let {data: res} = await addVerfication(defaultCard?._id, obj);
      if (res.message) {
        toastSuccess("Success", res.message);

        navigate.navigate("Profile");
      }
    } catch (error) {
      toastError(error);
    }
  };
  const handleAddLink = async () => {
    let temp = [...linkArr]

    temp.push({
      link:""
    })

    setLinkArr([...temp])
  }


  const handleLinkupdate = (index,value) => {
    let temp = [...linkArr]

    temp[index].link = value;
    setLinkArr([...temp])
  }

  const handleDeleteCard = async () => {
    try {
      let {data: res} = await deleteCardByNoApi(cardObj?._id);
      if (res.message) {
        toastSuccess("Success", res.message);

        navigate.navigate("CardList");
      }
    } catch (error) {
      toastError(error);
    }
  };

  const dorpdownList = ({item, index}) => {

    return (
      <Pressable key={index} onPress={()=>{setDocument(item.name);setShowModal(!showModal)}}>
         <Text 
      style={{
        padding: 5,
        color:'#000',
        borderBottomColor: "#333",
        borderBottomWidth: 0.3,
        borderStyle: "solid",
      }}>
      {item.name}
    </Text>
      </Pressable>
     
    )
 
  }

  const linkList = ({item, index}) => {

    return (
      <TextInput
      style={internalcss.formcontrol}
      placeholderTextColor="#fff"
      selectionColor="#fff"
      placeholder="Link"
      value={item.link}
      onChangeText={val => handleLinkupdate(index,val)}
    />
     
    )
 
  }
  return (
    <>
      <View style={internalcss.headertop}>
        <Pressable
          style={[internalcss.rowflex,{alignItems:'center'}]}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={internalcss.backtxt}>Request verification</Text>
        </Pressable>
      </View>
      <ScrollView>
        <View style={internalcss.centerhei}>
          <View style={internalcss.container}>
            <Text style={internalcss.backtxt}>Apply for Verification</Text>
            <Text style={internalcss.text1}>
              Verified accounts have blue ticks next to their names to show that
              Brand card has confirmed they're the real presence of the public
              figures, Founders and brands they represent.
            </Text>
          </View>

          <View style={internalcss.container}>
            <Text style={internalcss.backtxt}>
              Step 1: Confirm Authenticity
            </Text>
            <Text style={internalcss.text1}>
              Add 1-2 identification documents for yourself or your business.
            </Text>

            <TextInput
              style={internalcss.formcontrol}
              placeholderTextColor="#fff"
              selectionColor="#fff"
              placeholder="Full Name"
              value={name}
              onChangeText={val => setname(val)}
            />
            <View style={{position: "relative"}}>
              <Pressable
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  borderWidth: 0.7,
                  borderStyle: "solid",
                  borderColor: "#ccc",
                  borderRadius: 2,
                  padding: 8,
                }} onPress={()=>setShowModal(!showModal)} >
                <Text style={{color: "#fff"}}>{document!="" ? document : 'Select ...'}</Text>
                {
              
                showModal ?   <Entypo name="chevron-small-up" color="#fff" size={18} />  :    <Entypo name="chevron-small-down" color="#fff" size={18} />
                }
              </Pressable>
              {
                showModal && (
                  <View
                  style={{
                    position: "absolute",
                    top: 40,
                    borderRadius: 5,
                    width: wp(90),
                    overflow:'scroll',
                    padding: 10,
                    backgroundColor: "#fff",
                    zIndex: 99999,
                  }}>
                    <FlatList data={documentArr}   renderItem={dorpdownList} />
                </View>
                )
              }
       
            </View>
            <View  style={{marginTop:10}}>
              {
                image!="" && image.includes("base64") && (
                  <>
                    <Image source={{uri: image}} style={internalcss.uploadiocn} />
                    <Pressable
                    onPress={() => setImage("")}
                    style={{position: "absolute", top: hp(-2), left: wp(38)}}>
                    <FontAwesome name="remove" color="#FF0000" size={wp(8)} />
                  </Pressable>
                  </>
              

                )
              }

            </View>
            <Pressable onPress={() => handleUploadFrontCardImage()}>
              <Text style={[internalcss.btnsave2, {marginTop: 12}]}>
                Add File
              </Text>
            </Pressable>
          </View>

          <View style={internalcss.container}>
            <Text style={internalcss.backtxt}>Step 2: Confirm Notability</Text>
            <Text style={internalcss.text1}>
              Show that the public figure, Founder or brand your account
              represents is in the public interest & Authenticity.
            </Text>

            <TextInput
              style={internalcss.formcontrol}
              placeholderTextColor="#fff"
              selectionColor="#fff"
              placeholder="Designation"
              value={designation}
              onChangeText={val => setDesignation(val)}
            />

            <TextInput
              style={internalcss.formcontrol}
              placeholderTextColor="#fff"
              selectionColor="#fff"
              placeholder="Brand"
              value={brand}
              onChangeText={val => setBrand(val)}
            />
          </View>

          <View style={internalcss.container}>
            <Text style={internalcss.backtxt}>Links {linkArr?.length}</Text>
            <Text style={internalcss.text1}>
              Add articles, social media accounts and Company Website links that
              show your account is in the public interest.
            </Text>
            <FlatList data={linkArr}   renderItem={linkList} />
          
            <Pressable onPress={() => handleAddLink()}>
              <Text style={[internalcss.btnsave2, {marginTop: 12}]}>
                Add Links
              </Text>
            </Pressable>
            <Pressable onPress={() => handleUpdateCard()}>
              <Text style={[internalcss.btnsave, {marginTop: 12}]}>Save</Text>
            </Pressable>
            
          </View>
          {/* <View style={internalcss.profileimgcenter}>
          <Pressable onPress={() => handleUploadFrontCardImage()}>
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
       
        
          </View>
        </View> */}
        </View>
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
  container: {
    padding: 10,
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
  btnsave2: {
    borderColor: "#e1ac4c",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    color: "#e1ac4c",
    textAlign: "center",
  },
  uploadiocn: {
    width: 150,
    height: 150,
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
    borderBlockColor: "#f1f3f4",
    borderBottomWidth: 0.4,
    paddingBottom: 15,
    marginBottom: 10,
  },
  h2: {
    fontSize: 19,
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
    paddingVertical: 14,
    // display:'flex',
    // alignItems:'center',
    // justifyContent:'center',
    textAlign: "center",
  },
  text1: {
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
    color: "#fff",
    lineHeight: 15,
    textAlign: "justify",
    paddingVertical: hp(2),
  },
});
