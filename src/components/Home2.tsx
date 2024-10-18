import React, { useEffect, useState, useContext, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  ActivityIndicator
} from "react-native";
import Header from "../navigationheader/Header";
import { Switch } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Userprofile from "./Profile";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Product from "./Product";
import { getAuth } from "../utils/auth";
import {
  deleteCardLinkApi,
  getUserCardApi,
  getUserCardByNoApi,
  updateUserCardApi,
  userLinkActiveApi,
} from "../services/card.service";
import { CardContext } from "../../context/CardContext";
import { generateFilePath } from "../services/url.service";
import { toastSuccess } from "../utils/toastMessage";
import { useDispatch, useSelector } from "react-redux";
import { Add_Item, Remove_Item } from "../Redux/Action/ActionType";
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';
import { saveTokenToDatabase } from "../services/users.service";
import { addItemCart } from "../Redux/Action/Action";

const mainFont = 'Montserrat-Regular'
export default function Home() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [userCardObj, setUserCardObj] = useState<any>("");
  const [defaultCard, setDefaultCard] = useContext(CardContext);
  const [cardArr, setcardArr] = useState<any>([]);
  const isFoucused = useIsFocused();
  const [loadiongState, setloadiongState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [link, setlink] = useState("");
  const [isloading, set5Isloading] = useState(false)
  const [linkValue, setlinkValue] = useState("");
  const [selecedIndex, setSelecedIndex] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [linkObj, setLinkObj] = useState<any>();
  const inputRef = useRef();

  const data = [
    {
      txt: 'test text 1',
      txt2: 'test another text'
    },
    {
      txt: 'test text 2',
      txt2: 'test another text'
    },
    {
      txt: 'test text 3',
      txt2: 'test another text'
    },
    {
      txt: 'test text 4',
      txt2: 'test another text'
    },
  ]

  const sendData = (item: any) => {
    dispatch(addItemCart(item));
    console.log('called', item)
  }

  const cardData = useSelector((state) => state.reducer);

  const getUserCardByNo = async (slug: any) => {

    try {
      let { data: res } = await getUserCardByNoApi(slug);
      if (res?.data) {
        
        if (res?.data?.cardLinkArr && res?.data?.cardLinkArr?.length > 0) {
          setcardArr(res?.data?.cardLinkArr);
        } else {
          setcardArr([]);
  
        }
      }
    } catch (error) {
    }


  };
  useEffect(() => {
    if (userCardObj) {
        getUserCardByNo(userCardObj?.slug);
    }
  }, [userCardObj]);
  const getuserCard = async () => {
    
    setloadiongState(true);
    try {
      let { data: res } = await getUserCardApi("isActive=true");
      if (res?.data && res?.data?.length > 0) {
        let cardObj: any = res?.data.find((el: any) => el.isActive == true);
        console.log(cardObj, "cardObjcardObj");
        setUserCardObj(cardObj);
        setDefaultCard(cardObj);
        dispatch(addItemCart(cardObj));
  
      }
      set5Isloading(false)
    } catch (error) {
      set5Isloading(false)
      
    }

  };

  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
  }


  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });
    registerAppWithFCM();
  }, []);

  useEffect(() => {
    if (isFoucused) {
      getuserCard();
    }
  }, [isFoucused]);

  const Tab = createMaterialTopTabNavigator();

  const handleUpdateLink = async (cindex: number, card: any, value: boolean) => {

    let temcarArr = [...cardArr]
    console.log(temcarArr[cindex], "temcarArrtemcarArr",)
    temcarArr[cindex].isActive = value
    setcardArr(temcarArr)


    let obj: any = {
      linkId: card._id,
      isActive: value,
    };

    let { data: res } = await userLinkActiveApi(userCardObj?._id, obj);
    if (res.message) {
      // toastSuccess("Success", res.message);
      if (res.data) {
        // setUserCardObj(res.data);
        setDefaultCard(res.data);
        dispatch(addItemCart(res.data));
      }
    }
  };

  const renderSocialIcon = ({ item, index }) => {
    return (
      <View style={internalcss.boxtabs} key={index}>
        <Pressable style={internalcss.rowflex} onPress={() =>
          handleModal(item)
        }>
          <Image
            source={{ uri: generateFilePath(item.linkObj?.image) }}
            style={internalcss.smallimg}
            resizeMode="contain"
          />
          <Text style={{ color: "#fff" }}>{item.link.label}</Text>
        </Pressable>
        <Switch
          trackColor={{ true: "#F56D17", false: "#ACA9C9" }}
          thumbColor="#FFF"
          value={item.isActive}
          onValueChange={() => handleUpdateLink(index, item, !item.isActive)}
        />
      </View>
    );
  };


  const handleModal = (item) => {

    console.log(item, "itemitemitemitemitemitem")
    setlinkValue(item?.value)
    setlink(item?.name)
    setLinkObj(item)
    setModalVisible(true);
  };


  const handelDeleteLink = async (id: string) => {
    try {



      let obj = {
        linkId: id,
      }



      console.log(obj, "temoLoinObjtemoLoinObjtemoLoinObj")

      let { data: res } = await deleteCardLinkApi(cardData[0]?._id, obj);
      if (res.message) {
        toastSuccess("Success", "Link Delete Successfully")
        if (res.data) {
          setModalVisible(!modalVisible);
          setUserCardObj(res.data);
          setDefaultCard(res.data);
          dispatch(addItemCart(res.data));
        }
      }
    } catch (error) { }
  };
  const handelUpdate = async () => {
    try {


      let tempArr = [...cardData[0]?.cardLinkArr]

      let temoLoinObj = tempArr.find((el) => el.link.value == linkObj?.linkObj._id);

      console.log(temoLoinObj, "temoLoinObj")
      if (!temoLoinObj && !temoLoinObj?.name) {
        toastSuccess("Success", "Link Add Successfully")
        return

      }

      let obj = {
        linkId: temoLoinObj._id,
        link,
        linkValue,
        linkUpdate: true
      }



      console.log(obj, "temoLoinObjtemoLoinObjtemoLoinObj")

      let { data: res } = await userLinkActiveApi(cardData[0]?._id, obj);
      if (res.message) {
        setModalVisible(!modalVisible);
        setLinkObj({});
        setlink("");
        setlinkValue("");
        toastSuccess("Success", "Link Add Successfully")
        if (res.data) {
          setUserCardObj(res.data);
          // setDefaultCard(res.data);
          dispatch(addItemCart(res.data));
        }
      }
    } catch (error) { }
  };
  return (
    <>
      <Header homescreen />
      <ScrollView style={[internalcss.container, { backgroundColor: "#1A1824" }]}>
        <View>
          <View>
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
                style={{
                  backgroundColor: "#484650",
                  padding: 5,
                  borderRadius: 12,
                }}>
                <Image
                  source={require("../../assets/img/Plus.png")}
                  style={internalcss.addbusinessImage}
                />
              </View>

              <Text style={internalcss.btnbussiness}>Add Business</Text>
            </Pressable>
            {/* <Pressable
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#e1ac4c",
                borderWidth: 1,
                marginBottom: 10,
                borderColor: "#e1ac4c",
                borderRadius: 12,
                marginVertical: 10,
              }}
              onPress={() => navigate.navigate("LinkStore")}>
          

              <Text style={internalcss.btnbussiness}>Add Link</Text>
            </Pressable> */}
          </View>
          {isloading ? <ActivityIndicator size={'large'} style={{ marginTop: hp(30) }} /> : cardArr && cardArr?.length > 0 ? (
            <View
              style={{
                flex: 1,
                backgroundColor: "#1A1824",
                marginVertical: hp(1),
                marginHorizontal: wp(1),
                marginBottom:hp(8)
              }}>
              <FlatList data={cardArr} renderItem={renderSocialIcon} />
              {/* <FlatList
                data={data}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ width: wp(90), alignSelf: 'center', height: hp(10), backgroundColor: 'black', marginBottom: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: 'white' }}>{item.txt}</Text>
                      <Text style={{ color: 'white' }}>{item.txt2}</Text>
                      <TouchableOpacity onPress={() => sendData(item)}>
                        <Text style={{ color: 'white' }}>Press</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }}
              /> */}
            </View>
          ) : (
      
              <View
                style={[
                  internalcss.rowflex,
                  { justifyContent: "center", height: hp(80) },
                ]}>
                <Text style={{ color: "#ffff" }}>No Links Found</Text>
              </View>
            )
          }


        </View>
      </ScrollView>
      <Pressable
        onPress={() => navigate.navigate("LinkStore")}
        activeOpacity={0.7}
        style={internalcss.FloatingActionButtonStyle}>
        <Image
          source={require("../../assets/img/Plus.png")}
          style={internalcss.FloatingActionButtonImageStyle}
        />
      </Pressable>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={internalcss.centeredView}>
          <View style={internalcss.modalView}>
            <View style={{ position: 'absolute', alignItems: 'flex-end', width: wp(85), marginTop: hp(2), height: wp(20) }}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="closecircle" color="#fff" size={wp(8)} />
              </Pressable>
            </View>
            <View style={internalcss.uploadiocnImage}>
              {linkObj?.linkObj?.image != "" && (
                <Image source={{ uri: generateFilePath(linkObj?.linkObj?.image) }} style={internalcss.iocnimage} />
              )}
            </View>

            <TextInput
              selectionColor="#fff"
              placeholderTextColor="#fff"
              value={link}
              placeholder={linkObj?.linkObj?.name}
              style={internalcss.formcontrol2}
              onChangeText={val => setlink(val)}
            />
            <TextInput
              selectionColor="#fff"
              placeholderTextColor="#fff"
              value={linkValue}
              autoFocus={true}
              placeholder={"Enter Value"}
              ref={inputRef}
              onLayout={() => inputRef.current.focus()}
              style={internalcss.formcontrol2}
              onChangeText={val => setlinkValue(val)}


            />

            <View style={{ flexDirection: 'row', display: 'flex', gap: 5 }}>
              <Pressable
                style={internalcss.button}
                onPress={() => handelUpdate()}>
                <Text style={internalcss.textStyle}>Ok</Text>
              </Pressable>
              <Pressable
                style={internalcss.button}
                onPress={() => handelDeleteLink(linkObj._id)}>
                <Text style={internalcss.textStyle}>
                  <AntDesign name="delete" color={"#fff"} size={wp(5)} />
                </Text>
              </Pressable>
            </View>

            {/* <Pressable
              style={internalcss.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={internalcss.textStyle}>Close</Text>
            </Pressable> */}
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
  boxtabs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#484650",
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 20,
    marginBottom: hp(2),
    color: "#fff",
  },
  uploadiocnImage: {
    width: wp(20),
    height: hp(10),

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  smallimg: {
    width: wp(8),
    height: wp(8),
    borderRadius:wp(2)
  },
  rowflex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    color: "#fff",
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
    width: 70,
    height: 70,
    padding: 10,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: 100,
    marginTop: -30,
  },
  profileimgcenter: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  uploadiocn: {
    width: wp(6),
    height: hp(3),
    position: "absolute",
    bottom: -4,
    left: "53%",
  },
  iocnimage: {
    width: "100%",
    height: "100%",
  },
  formcontrol: {
    borderBottomWidth: 0.3,
    borderBottomColor: "#808080",
    marginBottom: 10,
    margin: 0,
    padding: 0,
    height: 40,
  },
  formcontrol2: {
    borderBottomWidth: 0.3,
    borderBottomColor: "#e1ac4c",
    marginVertical: 10,
    color: "#fff",
    margin: 0,
    padding: 0,
    height: 40,
    width: wp(60)
  },
  btnsave: {
    backgroundColor: "#e1ac4c",
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    textAlign: "center",
  },

  btnbussiness: {
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    textAlign: "center",
    fontFamily: 'Montserrat-Regular'
  },
  FloatingActionButtonStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 10,
    bottom: 10,
    marginTop: 30,
    backgroundColor: "#000",
    borderColor: "#000000",
    borderRadius: 200 / 2,
  },

  FloatingActionButtonImageStyle: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "#FFFFFF",
  },

  addbusinessImageIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderColor: "#484650",
    color: "#fff",
    borderRadius: 200 / 2,
  },

  addbusinessImage: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    tintColor: "#FFFFFF",
    backgroundColor: "#484650",
  },
  centeredView: {
    justifyContent: "center",
    height: hp(100),
    width: wp(100),
    display: 'flex',
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
  },
  modalView: {
    width: wp(90),
    height: wp(80),
    marginBottom: hp(20),
    backgroundColor: "#000",
    borderRadius: 20,
    zIndex: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    position: 'relative',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#e1ac4c",
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    textAlign: "center",
    width: wp(30),
  },
  button12: {
    backgroundColor: "#e1ac4c",
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    textAlign: "center",

  },

  // imgresponsive:{
  //     width:wp(95),
  //     height:hp(30),
  // }
});
