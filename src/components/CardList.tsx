import React, {useEffect, useState, useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
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
import {getUserCardApi, updateUserCardApi} from "../services/card.service";
import {toastError, toastSuccess} from "../utils/toastMessage";
import {CardContext} from "../../context/CardContext";
import {useSelector, useDispatch} from "react-redux";
import {addItemCart} from "../Redux/Action/Action";

export default function CardList() {
  const navigate = useNavigation();
  const cardData = useSelector(state => state.reducer);
  const [defaultCard, setDefaultCard] = useContext(CardContext);
  const isFoucused = useIsFocused();
  const [isloading, set5Isloading] = useState(true);

  const [cardArr, setcardArr] = useState([]);
  const getuserCard = async () => {
    set5Isloading(true);

    try {
      let {data: res} = await getUserCardApi("");

      if (res?.data && res?.data?.length > 0) {
        console.log(res?.data.length, "res?.datares?.datares?.data");
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

        // setDefaultCard(cardObj)
        dispatch(addItemCart(cardObj));
        getuserCard();
      }
    } catch (error) {
      toastError(error);
    }
  };

  const renderCardList = ({item, index}) => {
    return (
      <Pressable
        key={index}
        onPress={() => handleUpdateCard(item)}
        style={[
          internalcss.addcardbtn,
          {
            position: "relative",
            borderColor: item.isActive ? "#E1AC4C" : "#fff",
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
          <FontAwesome name="pencil" color={"#E1AC4C"} size={20} />
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
      <View style={internalcss.headertop}>
        <Pressable
          style={[internalcss.rowflex,{alignItems:'center'}]}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={internalcss.backtxt}>Card</Text>
        </Pressable>
      </View>

      <View style={internalcss.centerhei}>
        <View style={internalcss.profileimgcenter}>
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

          {isloading ? (
            <ActivityIndicator size={"large"} style={{marginTop: hp(30)}} />
          ) : (
            <FlatList
              data={cardArr}
              renderItem={renderCardList}
              style={{height: hp(74), paddingBottom: 80}}
            />
          )}
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
  imgresponsive: {
    width: "100%",
    height: "95%",
  },
});
