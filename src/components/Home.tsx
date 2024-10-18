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
  heightPercentageToDP,
  widthPercentageToDP,
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
import { toastError, toastSuccess } from "../utils/toastMessage";
import { useDispatch, useSelector } from "react-redux";
import { Add_Item, Remove_Item } from "../Redux/Action/ActionType";
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';
import { saveTokenToDatabase } from "../services/users.service";
import { addItemCart } from "../Redux/Action/Action";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { RoleContext } from "../../context/RoleContext";
import { rolesObj } from "../utils/constant";

const mainFont = 'Montserrat-Regular'
export default function Home() {
  const navigate = useNavigation();
  const [defaultCard, setDefaultCard] = useContext(CardContext);
  const isFoucused = useIsFocused();
  const [isloading, set5Isloading] = useState(true);
  const [roleName, setRoleName] = useContext(RoleContext);

  const [cardArr, setcardArr] = useState([]);
  const getuserCard = async () => {
    set5Isloading(true);

    try {
      let {data: res} = await getUserCardApi("");

      if (res?.data && res?.data?.length > 0) {
        console.log(res?.data.length, "res?.datares?.datares?.data");
        let cardObj: any = res?.data.find((el: any) => el.isActive == true);
        console.log(cardObj, "cardObjcardObj");
        setDefaultCard(cardObj);
        setcardArr(res?.data);
      }

      set5Isloading(false);
    } catch (error) {
      toastError(error);
      set5Isloading(false);
    }
  };
  useEffect(() => {
    if (isFoucused) {
      getuserCard();
    }
  }, [isFoucused]);

  const dispatch = useDispatch();

  const handleUpdateCard = async (cardObj: any) => {
    let obj: any = {
      isActive: true,
    };

    try {
      let {data: res} = await updateUserCardApi(cardObj?._id, obj);
      if (res.message) {
        toastSuccess("Success", res.message);

        setDefaultCard(cardObj)
        dispatch(addItemCart(cardObj));
        getuserCard();
      }
    } catch (error) {
      toastError(error);
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



  const renderCardList = ({item, index}) => {
    return (
      <Pressable
        key={index}
        onPress={() => navigate.navigate("LinkPage", {cardNo: item.slug})}
        style={[
          internalcss.addcardbtn,
          {
            position: "relative",
            borderColor: item.isActive ? "#E1AC4C" : "#484650",
          },
        ]}>
        <Pressable
          style={{
            position: "absolute",
            top: 10,
            right: -10,
            height: 50,
            width: 50,
            zIndex: 2,
          }}
          onPress={() => navigate.navigate("EditCard", {cardNo: item.slug})}>
          <Feather name="edit" color={"#fff"} size={20} />
        </Pressable>

        <Pressable
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            height: 50,
            width: 50,
            zIndex: 2,
          }}
          onPress={() => handleUpdateCard(item)}>
          <AntDesign name="checkcircle" color={item.isActive ? "#E1AC4C" : "#484650"} size={20} />
        </Pressable>
        <Image
          source={require("../../assets/img/card.png")}
          style={internalcss.imgresponsive}
        />

        <View style={{position: "absolute", top: hp(15), left: wp(5)}}>
          <Text style={{color: "#fff"}}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };
 
  return (
    <>
      <Header homescreen />
      <ScrollView style={[internalcss.container, { backgroundColor: "#1A1824" }]}>
      <View style={internalcss.profileimgcenter}>
        

          {isloading ? (
            <ActivityIndicator size={"large"} style={{marginTop: hp(30)}} />
          ) : (
            <FlatList
            ListHeaderComponent={  
                <>
               { roleName != rolesObj.EMPLOYEE  ?  (
                  <Pressable
                  style={internalcss.addcardbtn}
                  onPress={() => navigate.navigate("AddCard", {type: "card"})}>
                  <View style={{padding: 10}}>
                    <Image
                      source={require("../../assets/img/Plus.png")}
                      style={internalcss.addbusinessImage}
                    />
                  </View>
      
                  <Text style={internalcss.btnbussiness}>Add Card</Text>
                </Pressable>
                ) :(
                  <></>
                )
                }

                </>
            
          }
              data={cardArr}
              renderItem={renderCardList}
              style={{height: hp(84), paddingBottom: 80}}
            />
          )}
        </View>
      </ScrollView>

  

      
   
    </>
  );
}

const internalcss = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop:10
  },
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
    backgroundColor: "#484650",
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
  imgresponsive: {
    width: "100%",
    height: "95%",
  },
});

