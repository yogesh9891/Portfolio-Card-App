import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  TextInput,
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
import {useNavigation, useIsFocused} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {getUserCardApi, copyUserCardApi, updateUserCardApi, addNewCardApi} from "../services/card.service";
import {toastError, toastSuccess} from "../utils/toastMessage";
import { getAuth } from "../utils/auth";

export default function CopyCard(props: {route: {params: {cardNo: unknown}}}) {
  const navigate = useNavigation();
  const [userCardNo, setuserCardNo] = useState<any>();
  const [cardArr, setcardArr] = useState([]);
  const isFoucused = useIsFocused();
  const [document, setDocument] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [userId, setUserID] = useState<any>("");
  const [cardId, setcardId] = useState<any>("");

  const getuserCard = async () => {
    let {data: res} = await getUserCardApi("");

    if (res?.data && res?.data?.length > 0) {
      setcardArr(res?.data);
    }
  };


  const authCheck = async () => {
    let tokenObj = await getAuth();

    console.log(tokenObj,"tokenObjtokenObj")
    if (tokenObj) {
      setUserID(tokenObj.user?._id);
    } 
  };
  useEffect(() => {
    if (isFoucused) {
      getuserCard();
      authCheck()
    }
  }, [isFoucused]);

  useEffect(() => {
    console.log(props.route.params, "props.route.paramsprops.route.params");
    if (props.route.params?.cardNo) {
      setuserCardNo(props.route.params?.cardNo);
    }
  }, [props.route.params?.cardNo]);


  const handleSubmit  = async () => {
    if(cardId!=""){
      await handleCopyCard();
      return
    } else {
      await handleUpdateCard()
    }
  }

  const handleCopyCard = async () => {
    let obj: any = {
      cardId,
      name,
      description,
    };
    try {
      let {data: res} = await copyUserCardApi(userCardNo, obj);
      if (res.message) {
        toastSuccess("Success", res.message);
        navigate.navigate("Home");
      }
    } catch (error) {
      toastError(error);
    }
  };

  const handleUpdateCard = async () => {
    let obj: any = {
      name,
      description,
      userId,
    };
    try {
      let {data: res} = await addNewCardApi(userCardNo, obj);
      if (res.message) {
        toastSuccess("Success", res.message);
        navigate.navigate("Home");
      }
    } catch (error) {
      toastError(error);
    }
  };

  const dorpdownList = ({item, index}) => {
    return (
      <Pressable
        key={index}
        onPress={() => {
          setDocument(item.name);
          setname(item.name);
          setdescription(item.description)
          setcardId(item._id);
          setShowModal(!showModal);
        }}>
        <Text
          style={{
            padding: 5,
            borderBottomColor: "#333",
            borderBottomWidth: 0.3,
            borderStyle: "solid",
            color:'#000'
          }}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <>
      <View style={internalcss.headertop}>
        <Pressable
          style={internalcss.rowflex}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={internalcss.backtxt}>New Card</Text>
        </Pressable>
      </View>

      <View style={internalcss.centerhei}>
        <View style={{position: "relative", paddingHorizontal: 10}}> 
        { cardArr ?.length > 0 && ( 
        
         <View>
            <Text
              style={{
                color: "#fff",
                margin: 10,
                fontSize: 15,
              }}>
              Select Card for copy details into new Card
            </Text>
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
              }}
              onPress={() => setShowModal(!showModal)}>
              <Text style={{color: "#fff"}}>
                {document != "" ? document : "Select ..."}
              </Text>
              {showModal ? (
                <Entypo name="chevron-small-up" color="#fff" size={18} />
              ) : (
                <Entypo name="chevron-small-down" color="#fff" size={18} />
              )}
            </Pressable>
            {showModal && (
              <View
                style={{
                  position: "absolute",
                  top: hp(10.8),
                  borderRadius: 5,
                  width: wp(88),
                  overflow: "scroll",
                  padding: 10,
                  backgroundColor: "#fff",
                  zIndex: 99999,
                }}>
                <FlatList data={cardArr} renderItem={dorpdownList} />
              </View>
            )}
            <View style={{width: widthPercentageToDP(90)}}>
              <Text
                style={{
                  color: "#fff",
                  margin: 10,
                  fontSize: 20,
                  textAlign: "center",
                }}>
                Or
              </Text>
            </View>
            </View>
)}
            <Text
              style={{
                color: "#fff",
                margin: 10,
                fontSize: 15,
              }}>
              Add New Card
            </Text>
            <TextInput
              style={internalcss.formcontrol}
              placeholderTextColor="#fff"
              autoFocus={true}
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

            <Pressable onPress={()=>handleSubmit()}>
              <Text style={[internalcss.btnsave, {marginTop: 12}]}>Save</Text>
            </Pressable>
          </View>
        
      </View>
    </>
  );
}

const internalcss = StyleSheet.create({
  centerhei: {
    backgroundColor: "#1A1824",
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
    borderColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#484650",
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(20),
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
  boxtabs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#413f4b",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: widthPercentageToDP(90),
    marginHorizontal: 10,
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
});
