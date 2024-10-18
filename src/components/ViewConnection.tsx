import React, {useContext, useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
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
import {getUserCardByNoApi, updateUserCardApi} from "../services/card.service";
import {toastError, toastSuccess} from "../utils/toastMessage";
import {CardContext} from "../../context/CardContext";
import { generateFilePath } from "../services/url.service";
import { addConnectionApi, addConnectionBycCardApi } from "../services/connection.service";

export type ConnectionData = {
  email: string;
  mobile: string;
  post: string;
  name: string;
  image: string;
};
export default function ViewConnection(props: {
  route: {params: {cardData: ConnectionData}};
}) {
  const [defaultCard, setDefaultCard] = useContext(CardContext);

  const navigate = useNavigation();
  const [userCardNo, setuserCardNo] = useState<any>();
  const [cardObj, setcardObj] = useState<any>();
  const [name, setname] = useState("");
  const [post, setPost] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [image, setimage] = useState("");

  useEffect(() => {
    if (props.route.params?.cardData) {

      let tempCardData = props.route.params?.cardData;
      console.log(tempCardData, "tempCardDatatempCardData");
      
      if(tempCardData?.email){
        setEmail(tempCardData?.email)
      }

      if(tempCardData?.name){
        setname(tempCardData?.name)
      }

      if(tempCardData?.post){
        setPost(tempCardData?.post)
      }

      if(tempCardData?.image){
        setimage(tempCardData?.image)
      }
      if(tempCardData?.mobile){
        setMobile(tempCardData?.mobile)
      }

    }
  }, [props.route.params?.cardData]);


  return (
    <>
      <View style={internalcss.headertop}>
        <Pressable
          style={internalcss.rowflex}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={internalcss.backtxt}>View Connection</Text>
        </Pressable>
      </View>

      <ScrollView style={{ backgroundColor: "#1A1824",}}>
     
      <View style={internalcss.centerhei}>
        <View style={internalcss.profileimgcenter}>
          {
            image && image!="" && (
              <View 
              style={[internalcss.addcardbtn,{position:'relative'}]}
         >
                 
                  <Image
                  source={{uri:generateFilePath(image)}}
                  style={internalcss.imgresponsive}
                  resizeMode="contain"
                />
     
            </View>
            )
          }
      
         
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={internalcss.name}>{name}</Text>
        <Text style={internalcss.name}>{post}</Text>
        <Text style={internalcss.name}>{email}</Text>
        <Text style={internalcss.name}>{mobile}</Text>

        </View>

      </View>
      </ScrollView>


    
    </>
  );
}

const internalcss = StyleSheet.create({
  centerhei: {
    backgroundColor: "#1A1824",
    justifyContent: "center",
    paddingHorizontal: 10,
    flex: 1,
  },
  name: {
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    fontSize: wp(4),
    marginVertical:hp(2)
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
    height: "100%",
  },
  formcontrol: {
    color: "#fff",
    borderBottomWidth: 0.3,
    borderBottomColor: "#ffff",
    marginBottom: 10,
    backgroundColor: "#1A1824",
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
