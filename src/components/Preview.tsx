import React, {useContext, useEffect, useState} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Linking,
} from "react-native";
import Header from "../navigationheader/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {getAuth, logoutUser} from "../utils/auth";
import {TokenContext} from "../../context/TokenContext";
import {getUserCardApi, getUserCardByNoApi} from "../services/card.service";
import {generateFilePath} from "../services/url.service";
import {CardContext} from "../../context/CardContext";
import { addaddLinkApi } from "../services/connection.service";
import Contacts from 'react-native-contacts';
import { useSelector, useDispatch,  } from 'react-redux'
export default function Preview(props: {route: {params: {cardObj: any}}}) {
  const navigate = useNavigation();
  const [isAuthorised, setIsAuthorised] = useContext(TokenContext);
  const [usercardObj, setcardObj] = useState<any>();
  const [cardArr, setcardArr] = useState<any>([]);
  const [userId, setUserID] = useState<any>("");
  const isFoucused = useIsFocused();
  const [businessImage, setBusinessImage] = useState("");
  const [businessCover, setBusinessCover] = useState("");
  const [loadiongState, setloadiongState] = useState(false);

  const DataItem = useSelector((state)=>state.reducer)

    const authCheck = async () => {
        let tokenObj = await getAuth();

        console.log(tokenObj,"tokenObjtokenObj")
        if (tokenObj) {
          setUserID(tokenObj.user?._id);
        } 
      };

      useEffect(() => {
        if(isFoucused){
        authCheck();

        }
      }, [isFoucused]);

  useEffect(() => {
    console.log(props.route.params, "props.route.paramsprops.route.params");
    if (props.route.params?.cardObj) {
      setloadiongState(false)
      getUserCardByNo(props.route.params?.cardObj?.slug);
    }
  }, [props.route.params?.cardObj]);

  const getUserCardByNo = async (slug: any) => {
    let {data: res} = await getUserCardByNoApi(slug);
    if (res?.data) {
      setcardObj(res?.data);
      setloadiongState(true)
      if (res?.data?.businessImage) {
        setBusinessImage(res?.data?.businessImage);
      }

      if (res?.data?.businessCover) {
        setBusinessCover(res?.data?.businessCover);
      }
      if(userId ! == res?.data.userId){
        handleAddPreivew(res?.data)

      }
      if (res?.data?.cardLinkArr && res?.data?.cardLinkArr?.length > 0) {

        setcardArr(res?.data?.cardLinkArr.filter((el:any) =>el.isActive));
      }
    }
  };

  
  const handleAddPreivew =async (card:any) => {

    let Obj = {
        linkType:"profile"
      }
      await addaddLinkApi(card.slug,Obj)
    }
  

  const handleAddTap =async (linkObj:any) => {

    let Obj = {
        linkId:linkObj?._id,
        link:linkObj?.name,
        linkType:"link"
      }
      
      await addaddLinkApi(usercardObj.slug,Obj)
    }


    const openContact = () => {
      let newPerson:any = {
        displayName: usercardObj?.name
      }

      if(usercardObj?.post){
        newPerson.jobTitle = usercardObj?.post
      }
      if(usercardObj?.company){
        newPerson.company = usercardObj?.company
      }
      if(usercardObj?.image){
        newPerson.thumbnailPath = generateFilePath(usercardObj?.image)
      }
      
      let emailObj = cardArr.find((el:any) =>el?.linkObj?.name== 'Email');

      if(emailObj){
      let emailAddresse = [{
          label: "personal",
          email: emailObj.value,
        }];
        newPerson.emailAddresses = emailAddresse
      }
      let phoneObj = cardArr.find((el:any) =>el?.linkObj?.name== 'Phone');

      console.log(phoneObj,"emailObjemailObj")
      if(phoneObj){
      let  phoneNumber= [{
        label: 'mobile',
        number: phoneObj?.value,
      }];
       newPerson.phoneNumbers = phoneNumber
      }
      console.log(newPerson,"emailObjemailObj")
      Contacts.openContactForm(newPerson).then(contact => {
        // contact has been saved
      })
    }
  

  return (
    <>
      <ScrollView style={{backgroundColor: "#1A1824"}}>
        <View style={insternalcss.centerhei}>
          <View style={[insternalcss.addcardbtn]}>

          {businessCover != "" ? (
                <Image
                  source={{uri: generateFilePath(businessCover)}}
                  style={insternalcss.imgresponsive}
                />
              ) : (
                  <Image
                    source={require("../../assets/img/card2.png")}
                    style={insternalcss.imgresponsive}
                  />
              )}
           
          </View>
          <View style={[insternalcss.addcardbtn1, {position: "relative"}]}>
            <View
              style={{
                width: wp(30),
                position: "absolute",
                left: wp(2),
                top: wp(-10),
                borderRadius: wp(15),
                height: wp(30),
                borderWidth: 1,
                borderColor: "#fff",
              }}>
              {usercardObj?.image && usercardObj?.image != "" ? (
                <Image
                  source={{uri: generateFilePath(usercardObj?.image)}}
                  style={insternalcss.profile}
                />
              ) : (
                <View>
                  <Image
                    source={require("../../assets/img/userimg.png")}
                    style={insternalcss.profile}
                  />
                </View>
              )}
            {
              businessImage!="" && (
                <View style={insternalcss.logoContainer}>
                <Image
                        source={{uri: generateFilePath(businessImage)}}
                  style={{height: "100%", width: "100%", borderRadius: 100}}
                />
              </View>
              )
            }
             
            </View>

            <View style={insternalcss.collg8}>
              <View style={[insternalcss.rowflex, {marginTop: wp(2), gap:1},]}>
                {/* <FontAwesome name='user-o' size={14} color='#fff' /> */}
                <Text
                  style={[
                    insternalcss.detailname,
                    {fontSize: wp(4.5), fontWeight: "600", textAlign: "center", },
                  ]}>
                  {usercardObj?.name} 
                  
                    { 
                  
                  usercardObj?.isVerfiy && (
                    <View>

                       <AntDesign name="checkcircle" color={'#e1ac4c'} size={18}  style={{paddingLeft:10}}/>
                    </View>

                      )
                    }
                </Text>
              </View>
              <View style={[insternalcss.rowflex, {marginTop: 8}]}>
                {/* <FontAwesome name='envelope-open-o' size={14} color='#fff' /> */}
                <Text
                  style={[
                    insternalcss.detailname,
                    {
                      fontSize: wp(3.8),
                      fontWeight: "400",
                      textAlign: "center",
                      color: "white",
                    },
                  ]}>
                  {usercardObj?.post} {usercardObj?.company ? '@ ':' '}
                  <Text style={{color: "#E1AC4C", fontSize: wp(3.5)}}>
                    {usercardObj?.company} 
                  </Text>
                </Text>
              </View>
              <View style={[insternalcss.rowflex]}>
                {/* <Ionicons name='call-outline' size={17} color='#fff' /> */}
                <Text
                  style={[
                    insternalcss.detailname,
                    {
                      marginVertical: hp(2),
                      marginLeft: wp(-30),
                      marginTop: wp(12),
                      fontSize: wp(3.5),
                      fontWeight: "400",
                      color: "white",
                    },
                  ]}>
                  {usercardObj?.description}
                </Text>
              </View>

              <View
                style={[
                  insternalcss.rowflex,
                  {
                    marginVertical: hp(2),
                    marginLeft: wp(-20),
                  },
                ]}>
                {/* <Ionicons name='call-outline' size={17} color='#fff' /> */}
                <View
                  style={{
                    width: wp(50),
                    height: 40,
                    backgroundColor: "#191724",
                    paddingVertical: 10,
                    borderRadius: 20,
                  }}>
                  <Text style={{color: "#fff", textAlign: "center"}}>
                    Connected
                  </Text>
                </View>
                <Pressable  onPress={()=>openContact()}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#191724",
                    borderRadius: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <AntDesign name="adduser" size={17} color="#fff" />
                </Pressable>
              </View>
            </View>
          </View>

          {cardArr && cardArr?.length > 0 ? (
            <View style={insternalcss.rowflex1}>
              {cardArr.map((el: any, cinde: number) => (
                <Pressable
                  style={{width:wp(31), display:'flex', alignItems:'center', justifyContent:'center'}}
                  onPress={async  () =>
                    {

                   if(userId !== usercardObj.userId){
                       await   handleAddTap(el.linkObj)
                   }
                     Linking.openURL(`${el.linkObj.link}${el.value}`)

                    }
                  }>
                    <View style={insternalcss.smallimgBox} >
                    <Image
                    source={{uri: generateFilePath(el?.linkObj?.image)}}
                    style={insternalcss.smallimg}
                    resizeMode="contain"
                  />
                    </View>
               
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 11,
                      padding: 5,
                      marginTop:1,
                    }}>
                    {el.name ? el.name : el.linkObj.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View>
              {/* {usercardObj && usercardObj?.slug && (
                <View style={insternalcss.rowflex1}>
                  {usercardObj?.email?.link != "" && (
                    <View>
                      <Image
                        source={require("../../assets/img/email.png")}
                        style={insternalcss.smallimg}
                        resizeMode="contain"
                      />
                      <Text style={{color: "#fff", textAlign: "center"}}>
                        Email
                      </Text>
                    </View>
                  )}

                  {usercardObj?.facebook?.link != "" && (
                    <View>
                      <Image
                        source={require("../../assets/img/facebook.png")}
                        style={insternalcss.smallimg}
                        resizeMode="contain"
                      />
                      <Text style={{color: "#fff", textAlign: "center"}}>
                        Facebook
                      </Text>
                    </View>
                  )}

                  {usercardObj?.twitter?.link != "" && (
                    <View>
                      <Image
                        source={require("../../assets/img/twitter.png")}
                        style={insternalcss.smallimg}
                        resizeMode="contain"
                      />
                      <Text style={{color: "#fff", textAlign: "center"}}>
                        Twitter
                      </Text>
                    </View>
                  )}

                  {usercardObj?.instagram?.link != "" && (
                    <View>
                      <Image
                        source={require("../../assets/img/insta.png")}
                        style={insternalcss.smallimg}
                        resizeMode="contain"
                      />
                      <Text style={{color: "#fff", textAlign: "center"}}>
                        Instagram
                      </Text>
                    </View>
                  )}

                  {usercardObj?.linkedIn?.link != "" && (
                    <View>
                      <Image
                        source={require("../../assets/img/linkdin.png")}
                        style={insternalcss.smallimg}
                        resizeMode="contain"
                      />
                      <Text style={{color: "#fff", textAlign: "center"}}>
                        Linkedin
                      </Text>
                    </View>
                  )}

                  {usercardObj?.whatsapp?.link != "" && (
                    <View>
                      <Image
                        source={require("../../assets/img/what.png")}
                        style={insternalcss.smallimg}
                        resizeMode="contain"
                      />
                      <Text style={{color: "#fff", textAlign: "center"}}>
                        Whatsapp
                      </Text>
                    </View>
                  )}
                </View>
              )} */}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const insternalcss = StyleSheet.create({
  textblac: {
    color: "#000",
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },
  listdic: {
    backgroundColor: "#fdfbf6",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  logoContainer: {
    height: 45,
    width: 45,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "red",
    position: "absolute",
    right: -10,
    borderRadius: 100,
    bottom: -10,
  },
  btnsave: {
    backgroundColor: "#e1ac4c",
    padding: 12,
    borderRadius: 12,
    color: "#fff",
    textAlign: "center",
  },

  btnsaveText: {
    color: "#fff",
    textAlign: "center",
  },
  rowflex: {
    display: "flex",
    flexDirection: "row",
    // gap: 7,
  },
  rowflex1: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 12,
    gap: 2,
    paddingHorizontal:10,
  },
  collg4: {
    width: wp(30),
  },
  userinfobox: {
    backgroundColor: "#fdfbf6",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  container: {
    paddingHorizontal: 10,
  },
  imgresponsive: {
    width: "100%",
    height: "100%",
  },
  detailname: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontSize: 12,
  },
  centerhei: {
    backgroundColor: "#1A1824",
    display: "flex",
    flexDirection: "column",
  },
  profileimgcenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  addcardbtn: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#484650",
    height: hp(30),
  },
  addcardbtn1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#272632",
    width: wp(95),
    paddingHorizontal: wp(10),
    marginLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: -20,
  },

  profile: {
    width: "100%",
    height: "100%",
    borderColor: "#fff",
    borderRadius: 100,
  },
  collg8: {
    marginLeft: wp(25),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  smallimg: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(5),
  },
  smallimgBox: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(5),

  },
});
