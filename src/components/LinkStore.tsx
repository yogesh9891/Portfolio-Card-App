import React, {useState, useEffect, useContext, useRef, useCallback} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Pressable,
  Modal,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  Button,
  Platform
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {TabView, SceneMap, TabBar} from "react-native-tab-view";
import Header from "../navigationheader/Header";
import Entypo from "react-native-vector-icons/Entypo";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {getUserCardApi, getUserCardByNoApi, updateUserCardApi} from "../services/card.service";
import {Switch} from "react-native-paper";
import {Alert} from "react-native";
import {toastError, toastSuccess} from "../utils/toastMessage";
import {getCategoryApi, getLinkApi} from "../services/category.service";
import {generateFilePath} from "../services/url.service";
import {CardContext} from "../../context/CardContext";
import {useDispatch, useSelector} from "react-redux";
import {addItemCart} from "../Redux/Action/Action";
import AntDesign from "react-native-vector-icons/AntDesign";
import {launchImageLibrary} from "react-native-image-picker";
import { MediaType } from "react-native-image-picker";
import { CameraType } from "react-native-image-picker";
import DocumentPicker from 'react-native-document-picker'
import * as ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
export default function LinkStore(props:any) {
  const layout = useWindowDimensions();
  const navigate = useNavigation();
  const [categoryArr, setCategoryArr] = useState([]);
  const [linkArr, setLinkArr] = useState([]);
  const [LinkAllArr, setLinkAllArr] = useState([]);
  const [defaultCard, setDefaultCard] = useContext(CardContext);
  const [index, setIndex] = React.useState(0);
  const [linkObj, setLinkObj] = useState<any>();
  const isFoucused = useIsFocused();
  const [userCardObj, setUserCardObj] = useState<any>("");

  const [modalVisible, setModalVisible] = useState(false);
  const [imageIcon, setImageIcon] = useState("");
  const [title, setTitle] = useState("");
  const [social, setSoclai] = useState("");
  const [link, setlink] = useState("");
  const [linkValue, setlinkValue] = useState("");
  const [selecedIndex, setSelecedIndex] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const inputRef = useRef();
  const [cardArr, setcardArr] = useState("");
  const [isloading, setIsloading] = useState(true);
  const [isinfo, setIslnfo] = useState(false);
  const dispatch = useDispatch();


  const getUserCardByNo = async (slug: any) => {

    try {
      let { data: res } = await getUserCardByNoApi(slug);
      if (res?.data) {
        setUserCardObj(res.data);
      }
    } catch (error) {
    }


  };



  useEffect(() => {
    console.log(props.route.params, "props.route.paramsprops.route.params");
    if (props.route.params?.cardNo && isFoucused) {
      getUserCardByNo(props.route.params?.cardNo);
    }
  }, [props.route.params?.cardNo,isFoucused]);

  const getCategoryCard = async () => {
    // const dispatch = useDispatch()

    // const functionn =(item:any)=>{
    //   dispatch(addItemCart(item))
    // }

    try {
      let {data: res} = await getCategoryApi("");

      if (res?.data && res?.data?.length > 0) {
        setCategoryArr(res?.data);
        setSelectedCategoryId(res?.data[0]._id);
        getLinkCard(res?.data._id);
        console.log(res?.data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  const getLinkCard = async (catId: string) => {
    try {
      let {data: res} = await getLinkApi("");

      if (res?.data && res?.data?.length > 0) {
        setLinkAllArr(res?.data);
        if (catId != "") {
          setLinkArr(res?.data.filter((el: any) => el.categoryId == catId));
          setIsloading(false);
        }
      }
    } catch (error) {
      toastError(error);
    }
  };
  useEffect(() => {
    if (isFoucused) {
      getCategoryCard();
    }
  }, [isFoucused]);

  useEffect(() => {
    if (selectedCategoryId && LinkAllArr?.length > 0) {
      setLinkArr(
        LinkAllArr.filter((el: any) => el.categoryId == selectedCategoryId),
      );
    }
  }, [selectedCategoryId, LinkAllArr]);

  const handleActivetab = (index, cateId) => {
    setSelecedIndex(index);
    setSelectedCategoryId(cateId);
  };

  const handleModal = item => {
    console.log(item, "itemitemitemitemitemitem");
    setlinkValue(item?.name);
    setLinkObj(item);
    setModalVisible(true);
  };
  const fetchImage = async (uri: string) => {
    const imageResponse = await fetch(uri);
    const imageBlob = await imageResponse.blob();
    const base64Data = await blobToBase64(imageBlob);
    console.log(base64Data,"base64Database64Database64Data")
  };

  const blobToBase64 = (blob: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(String(reader.result));
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleDocumentSelection = async ()  => {
    try {
     let file = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: DocumentPicker.types.allFiles,
      });
      if (file) {
        console.log(file, 'file');
        let base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
        if (base64) {
          console.log('SETTING BASE ^$', file);
          // let tempArr = imagesArr
          // tempArr[index].image = 
          console.log(`data:${file.type};base64,${base64}`,"aasds")
          setlink(`data:${file.type};base64,${base64}`)
        }
      }
    } 
    catch(err){
      toastError(err)
    }
  };
  const handelUpdate = async () => {
    try {
      let obj: any = {};


      let tempArr = [];

      if(userCardObj?.cardLinkArr) {
        tempArr  = userCardObj?.cardLinkArr;
      }
      console.log("sdfdsfsadfsdfsdfdsfdfasdfdsfds++++++++++++++++++++++",tempArr)

      let temoLoinObj = tempArr.find(el => el.link.value == linkObj._id);
      if (temoLoinObj && temoLoinObj?.name) {
        // toastSuccess("Success", "Link Add Successfully");
        return;
      }

      tempArr.push({
        link: {
          value: linkObj._id,
          label: linkObj.name,
        },
        name: linkValue,
        value: link,
        type: linkObj.linkType,
        isActive: true,
      });

      obj.cardLinkArr = [...tempArr];
      console.log(JSON.stringify(tempArr,null,2))

      console.log(obj, "temoLoinObjtemoLoinObjtemoLoinObj");
      console.log(userCardObj._id, "++++++++++++++++++++++++++++++");

      let {data: res} = await updateUserCardApi(userCardObj?._id, obj);
      if (res.message) {
        setModalVisible(!modalVisible);
        setLinkObj({});
        setlink("");
        toastSuccess("Success", "Link Add Successfully");
        if (res.data) {
          // setDefaultCard(res.data)
        }
      }
    } catch (error) {}
  };
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => handleActivetab(index, item._id)}
        key={index}
        style={{
          paddingLeft: wp(5),
          paddingRight: wp(5),
          height: hp(5),
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: index == selecedIndex ? 2 : 0,
          backgroundColor: "#1A1824",
          borderBottomColor: index == selecedIndex ? "#e1ac4c" : "#1A1824",
        }}>
        <Text
          style={{
            fontSize: hp(2),
            color: index == selecedIndex ? "#e1ac4c" : "#fff",
            textTransform: "capitalize",
          }}>
          {item.name}
        </Text>
      </Pressable>
    );
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
      setlink(
        `data:${results?.assets[0]?.type};base64,${results?.assets[0]?.base64}`,
      );
    }
  };

  const renderSocialIcon = ({item, inde}) => {
    return (
      <View style={internalcss.boxtabs} key={inde}>
        <View style={internalcss.rowflex}>
          <Image
            source={{uri: generateFilePath(item.image)}}
            style={internalcss.smallimg}
            resizeMode="contain"
          />
          <Text style={{color: "#fff"}}>{item.name}</Text>
        </View>
        <Pressable
          onPress={() => handleModal(item)}
          style={[internalcss.rowflex, internalcss.FloatingActionButtonStyle]}>
          {item?.isActive && item?.isActive != "" ? (
            <Image
              source={require("../../assets/img/Minus.png")}
              style={{width: wp(5), height: hp(5)}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/img/Plus.png")}
              style={{width: wp(5), height: hp(5)}}
              resizeMode="contain"
            />
          )}
        </Pressable>
      </View>
    );
  };
  return (
    <>
      <View style={internalcss.headertop}>
        <Pressable
         style={[internalcss.rowflex,{alignItems:'center'}]}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={internalcss.backtxt}>Link Store</Text>
        </Pressable>
      </View>
      <View style={{backgroundColor: "#1A1824", flex: 1}}>
        <View>
          <FlatList
            data={categoryArr}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View>

        {isloading ? (
          <ActivityIndicator size={"large"} style={{marginTop: hp(30)}} />
        ) : linkArr && linkArr?.length > 0 ? (
          <View
            style={{
              flex: 1,
              backgroundColor: "#1A1824",
              paddingVertical: 10,
              marginVertical: 10,
            }}>
            <FlatList data={linkArr} renderItem={renderSocialIcon} />
          </View>
        ) : (
          <View
            style={[
              internalcss.rowflex,
              {justifyContent: "center", height: hp(80)},
            ]}>
            <Text style={{color: "#ffff"}}>No Links Found</Text>
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        coverScreen={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={internalcss.centeredView}>
          <View style={internalcss.modalView}>
            <View
              style={{
                position: "absolute",
                alignItems: "flex-end",
                width: wp(85),
                marginTop: hp(2),
                height: wp(20),
              }}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="closecircle" color="#fff" size={wp(8)} />
              </Pressable>
            </View>
            {
              linkObj?.description && ( <View
                style={{
                  position: "absolute",
                  alignItems: "flex-start",
                  width: wp(85),
                  marginTop: hp(2),
                  height: wp(20),
                }}>
                <Pressable onPress={() => {
                     Alert.alert(
                      linkObj.name,
                      linkObj?.description,
                      [{text: 'Got It', onPress: () => console.log('OK Pressed')}],
                      {cancelable: false},
                    );
                }}>
                  <AntDesign name="infocirlce" color="#fff" size={wp(6)} />
                </Pressable>
                {isinfo && (
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#e1ac4c",
                      top: wp(-19),
                      left: 0,
                      minHeight:hp(10),
                      width: wp(60),
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{color: "#fff", fontSize: wp(2.5), padding: wp(2)}}>
                      {linkObj?.description}
                    </Text>
                  </View>
                )}
              </View>)
            }
           
            <View style={internalcss.uploadiocnImage}>
              {linkObj?.image != "" && (
                <Image
                  source={{uri: generateFilePath(linkObj?.image)}}
                  style={internalcss.uploadiocn}
                />
              )}
            </View>
            <View
              style={[
                internalcss.rowflex,
                {
                  gap: 30,
                  borderWidth: 1,
                  borderColor: "#e1ac4c",
                  padding: 0,
                  height: 45,
                  width: wp(58),
                  justifyContent: "center",
                  borderRadius: 9,
                  marginVertical: 10,
                },
              ]}>
              <Text style={{color: "#fff"}}>Name:</Text>
              <TextInput
                selectionColor="#fff"
                placeholderTextColor="#fff"
                value={linkValue}
                placeholder={
                  linkObj?.namePlaceholder
                    ? linkObj?.namePlaceholder
                    : linkObj?.name
                }
                style={internalcss.formcontrol}
                onChangeText={val => setlinkValue(val)}
              />
            </View>
            <View
              style={[
                internalcss.rowflex,
                {
                  gap: 30,
                  borderWidth: 1,
                  borderColor: "#e1ac4c",
                  padding: 0,
                  height: 45,
                  width: wp(58),
                  justifyContent: "center",
                  borderRadius: 9,
                },
              ]}>
              <Text style={{color: "#fff"}}>{linkObj?.linkLabelName ? linkObj?.linkLabelName :'Value'}:</Text>
              {
                 linkObj?.linkType == 'number' && (
                  <TextInput
                  selectionColor="#fff"
                  placeholderTextColor="#fff"
                  value={link}
                  autoFocus={true}
                  keyboardType='numeric'
                  placeholder={
                    linkObj?.valuePlaceholder
                      ? linkObj?.valuePlaceholder
                      : "Enter Value"
                  }
                  ref={inputRef}
                  onLayout={() => inputRef.current.focus()}
                  style={internalcss.formcontrol}
                  onChangeText={val => setlink(val)}
                />
                 )
              }
                {
                 linkObj?.linkType == 'text' && (
                  <TextInput
                  selectionColor="#fff"
                  placeholderTextColor="#fff"
                  value={link}
                  autoFocus={true}
                  placeholder={
                    linkObj?.valuePlaceholder
                      ? linkObj?.valuePlaceholder
                      : "Enter Value"
                  }
                  ref={inputRef}
                  onLayout={() => inputRef.current.focus()}
                  style={internalcss.formcontrol}
                  onChangeText={val => setlink(val)}
                />
                 )
              }
                {
                 linkObj?.linkType == 'file' && (
                  <Button title="Select 📑" onPress={()=>handleDocumentSelection()} />
                 )
              }
             
            </View>

            <Pressable
              style={[internalcss.button, {marginTop: 12}]}
              onPress={() => handelUpdate()}>
              <Text style={internalcss.textStyle}>Submit</Text>
            </Pressable>
          
          </View>
        </View>
      </Modal>
    </>
  );
}

const internalcss = StyleSheet.create({
  rowflex: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
    marginHorizontal: 10,
  },
  FloatingActionButtonStyle: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: "#1A1824",
    borderColor: "#000000",
    borderRadius: 200 / 2,
  },

  smallimg: {
    width: wp(10),
    height: hp(5),
  },

  centeredView: {
    justifyContent: "center",
    height: hp(100),
    width: wp(100),
    display: "flex",
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
    position: "relative",
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
    width: wp(60),
    marginBottom: hp(2),
  },
  button12: {
    backgroundColor: "#e1ac4c",
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    textAlign: "center",
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  uploadiocnImage: {
    width: wp(20),
    height: hp(10),
  },
  uploadiocn: {
    width: "100%",
    height: "100%",
  },
  formcontrol: {
    marginVertical: 10,
    color: "#fff",
    margin: 0,
    padding: 0,
    height: 40,
    width: wp(20),
  },
});
