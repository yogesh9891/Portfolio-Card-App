import React, {Component, useState, useEffect, useContext} from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import {RNCamera} from "react-native-camera";
import {useNavigation} from "@react-navigation/native";
import {addConnectionApi} from "../services/connection.service";
import {toastError, toastSuccess} from "../utils/toastMessage";
import {CardContext} from "../../context/CardContext";
import {useSelector} from "react-redux";
export default function AddCard(props: {route: {params: {type: unknown}}}) {
  const [defaultCard, setDefaultCard] = useContext(CardContext);

  const [userCardNo, setuserCardNo] = useState<any>();
  const [cardType, setType] = useState<any>("");
  const navigate = useNavigation();
  const cardData = useSelector(state => state.reducer);
  const onSuccess = async (e: any) => {
    if (e.data && e.data.includes("profile")) {
      let linkArr = e.data.split("profile/");
      if (linkArr.length > 0) {
        setuserCardNo(linkArr[1]);

        console.log(JSON.stringify(e, null, 2), "qr");

        if (cardType === "card") {
          navigate.navigate("CopyCard", {cardNo: linkArr[1]});
        } else if (cardType == "connection") {
          console.log(cardType, "cardType");

          await handleAddConectiob(linkArr[1]);
        }
        return;
      }

      toastError("QrCode is InVallid");
      navigate.back();
      return 0;
    }
  };

  useEffect(() => {
    console.log(props.route.params, "props.route.paramsprops.route.params");
    if (props.route.params?.type) {
      setType(props.route.params?.type);
    }
  }, [props.route.params?.type]);
  const handleAddConectiob = async (cardId: string) => {
    console.log(
      cardId,
      "cardIdcardIdcardIdcardIdcardIdcardIdcardIdcardIdcardIdcardIdcardId",
    );
    try {
      let cardObj = {
        userCardId: defaultCard?._id,
      };
      let {data: res} = await addConnectionApi(cardId, cardObj);
      if (res.message) {
        toastSuccess("Success", res.message);
        navigate.navigate("Connections");
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <QRCodeScanner
      onRead={e => {
        onSuccess(e);
      }}
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
});
