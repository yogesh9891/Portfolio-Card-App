import React, { useState, useContext, useEffect } from "react";
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
  ActivityIndicator,
  useWindowDimensions
} from "react-native";
import Header from "../navigationheader/Header";
// import FontAwesome from "react-native-vector-icons/FontAwesome"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Entypo from "react-native-vector-icons/Entypo";
import { generateFilePath } from "../services/url.service";
import { TokenContext } from "../../context/TokenContext";
import { CardContext } from "../../context/CardContext";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { toastError } from "../utils/toastMessage";
import { getInsightsConnectionApi, getUserCoonectionApi } from "../services/connection.service";
import { useSelector } from "react-redux";

export default function Insight() {
  const mainFont = 'Montserrat-Regular'
  const { height, width } = useWindowDimensions()
  const navigate = useNavigation();
  const [defaultCard, setDefaultCard] = useContext(CardContext);
  const screenWidth = Dimensions.get("window").width;
  const [setinsightObj, setSetinsightObj] = useState<any>({});
  const [linkArr, setLinkArr] = useState<any>([]);
  const isFoucused = useIsFocused();
  const [tapThroughRate, setTapThroughRate] = useState<any>(0);
  const [cardArr, setcardArr] = useState('');
  const [isloading, setIsloading] = useState(false)
  const [clicked, setClicked] = useState(1)
  const [clickData, setClickData]=useState('all')




  // useEffect(() => {
  //   // getuserCard();
  //   // let parseData = JSON.parse(cardData)

  //   // let cardjson = JSON.stringify(cardData, null, 2)
  //   // 
  //   console.log( cardData[0]._id)
  //   setcardArr(cardData[0])
  //   console.log( cardArr)
  // }, []);

  const refreshNow =  async() => {
    await getinSightConnection()
  }


  const getinSightConnection = async () => {
    try {

      setIsloading(true)

      if(!defaultCard?._id){
      setIsloading(false)

        return 0
      }

      let qwe = `filter=${clickData}`
      let { data: res } = await getInsightsConnectionApi(defaultCard?._id, qwe);

      if (res.data) {

        // console.log(JSON.stringify(res.data, null, 2), "sadfadffsfsdfd", defaultCard?._id)
        setSetinsightObj(res.data)
        let ptap: number = res?.data?.profileTapCount ? res?.data?.profileTapCount : 1;
        let ltap: number = res?.data?.linkTapCount ? res?.data?.linkTapCount : 0;

        let ttap: any = (ltap / ptap) * 100;
        setTapThroughRate(ttap.toFixed(2))
        if (res.data?.linkArr?.length > 0) {
          setLinkArr(res.data?.linkArr[0]?.cardLinkArr)
        }
      }

      setIsloading(false)

    } catch (error) {

      toastError(error)
      setIsloading(false)

    }


  };

  useEffect(() => {
    console.log(setinsightObj)
    if (isFoucused) {
      getinSightConnection()
    }
  }, [isFoucused, clickData]);

  const renderSocialIcon = ({ item, inde }) => {
    return (
      <View style={insternalcss.boxtabs} key={inde}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: wp(10), height: hp(5) }}>
            <Image
              source={{ uri: generateFilePath(item.image) }}
              // source={require("../../assets/img/email.png")}
              style={insternalcss.smallimg}
              resizeMode="contain"
            />

          </View>
          <View style={{ marginHorizontal: wp(2) }}>
            <Text style={{ fontSize: wp(4), color: '#fff' }}>{item.name}</Text>
            <Text style={{ fontSize: wp(3), color: '#fff' }}>{item.value?.length > 20 ? `${item.value?.slice(0, 20)}...` : item.value}</Text>
          </View>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: wp(4), color: '#fff' }}>{item?.tapsCount ? item.tapsCount: 0} Taps</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={insternalcss.headertop}>
        <Pressable
        style={[insternalcss.rowflex,{alignItems:'center'}]}
          onPress={() => navigate.goBack()}>
          <Entypo name="chevron-thin-left" size={14} color="#fff" />
          <Text style={insternalcss.backtxt}>Insights</Text>
        </Pressable>

        <Pressable
          style={[insternalcss.rowflex,{paddingRight:wp(5)}]}
          onPress={() => refreshNow()}>
          <Feather name="refresh-ccw" size={18} color="#fff" />
        </Pressable>
      </View>
      <ScrollView style={{ backgroundColor: "#1A1824" }}>
        <View style={insternalcss.centerhei}>
          <View style={[insternalcss.addcardbtn]}>
            <Image
              source={require("../../assets/img/backgrounf.png")}
              style={insternalcss.imgresponsive}
            />
          </View>
          <View
            style={[
              insternalcss.userinfobox,
              { marginTop: hp(-18), position: "relative" },
            ]}>
            <View style={insternalcss.collg4}>
              <View
                style={{
                  width: wp(35),
                  borderRadius: wp(18),
                  height: wp(35),
                  borderWidth: 1,
                  marginTop: hp(-7.2),
                }}>
                {defaultCard?.image &&defaultCard?.image != "" ? (
                  <Image
                    source={{ uri: generateFilePath(defaultCard?.image) }}
                    style={insternalcss.profile}
                  />
                ) : (
                  <Image
                    source={require("../../assets/img/userimg.png")}
                    style={insternalcss.profile}
                  />
                )}
              </View>
            </View>

            <View style={insternalcss.collg8}>
              <View style={[insternalcss.rowflex, { marginTop: hp(3) }]}>
                {/* <FontAwesome name='user-o' size={14} color='#fff' /> */}
                <Text
                  style={[
                    insternalcss.detailname,
                    { fontSize: 18, fontWeight: "600", textAlign: "center" },
                  ]}>
                  {/* Tap Streak */}
                </Text>
              </View>
              {/* <View style={[insternalcss.rowflex, {marginTop:8}]}>
                        <Text style={[insternalcss.detailname, {fontSize:16, fontWeight:"400", textAlign:"center", color:"white"}]}>{defaultCard?.post} @  <Text style={{color:"#E1AC4C"}}>{defaultCard?.company}</Text></Text>
                    </View> */}
            </View>
          </View>
        </View>
        <View style={{ marginTop: hp(10), marginBottom: hp(2) }}>
          <Text
            style={{
              color: "#ffff",
              fontWeight: "500",
              fontSize: wp(5),
              marginLeft: wp(7),
              fontFamily: "Montserrat",
            }}>
            Your Insights
          </Text>
        </View>
        <View style={{ flexDirection: 'row', width: wp(95), alignSelf: 'center', marginBottom: hp(2) }}>
          <TouchableOpacity onPress={() =>{ setClicked(1); setClickData('all')}} style={{ height: hp(4), paddingRight: wp(4), paddingLeft: wp(4), borderColor: '#E1AC4C', borderWidth: clicked == 1 ? 0 : 0.7, borderRadius: wp(5), alignItems: 'center', justifyContent: 'center', backgroundColor: clicked == 1 ? '#E1AC4C' : null }}>
            <Text style={{ color: 'white', fontFamily: mainFont }}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {setClicked(2); setClickData('today')}} style={{ height: hp(4), paddingLeft: wp(4), paddingRight: wp(4), borderColor: '#E1AC4C', backgroundColor: clicked == 2 ? '#E1AC4C' : null, borderWidth: clicked == 2 ? 0 : 0.7, borderRadius: wp(5), marginLeft: wp(3), justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontFamily: mainFont }}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {setClicked(3); setClickData('week')}} style={{ height: hp(4), paddingLeft: wp(4), paddingRight: wp(4), borderColor: '#E1AC4C', backgroundColor: clicked == 3 ? '#E1AC4C' : null, borderWidth: clicked == 3 ? 0 : 0.7, borderRadius: wp(5), marginLeft: wp(3), justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontFamily: mainFont }}>Pre. Week</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setClicked(4); setClickData('month')}} style={{ height: hp(4), paddingLeft: wp(4), paddingRight: wp(4), borderColor: '#E1AC4C', backgroundColor: clicked == 4 ? '#E1AC4C' : null, borderWidth: clicked == 4 ? 0 : 0.7, borderRadius: wp(5), marginLeft: wp(3), justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontFamily: mainFont }}>Pre. Month</Text>
          </TouchableOpacity>
        </View>
        {isloading ? <ActivityIndicator style={{ marginTop: hp(10) }} /> : <View style={insternalcss.rowflex1}>
          <View style={insternalcss.coll9}>
            <View style={{ width: wp(35), position: "relative" }}>
              <View style={{ position: "absolute", top: hp(-2) }}>
                <Text
                  style={{
                    color: "#ffff",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: wp(6),
                    fontFamily: "Montserrat",
                  }}>
                  {setinsightObj?.profileTapCount ? setinsightObj?.profileTapCount: 0}
                </Text>
              </View>
              <Image
                source={require("../../assets/img/graph.png")}
                style={insternalcss.smallimg}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  color: "#ffff",
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: wp(4),
                  fontFamily: "Montserrat",
                }}>
                Profile Taps
              </Text>
            </View>
          </View>
          <View style={insternalcss.coll9}>
            <View style={{ width: wp(35), position: "relative" }}>
              <View style={{ position: "absolute", top: hp(-2) }}>
                <Text
                  style={{
                    color: "#ffff",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: wp(6),
                    fontFamily: "Montserrat",
                  }}>
                  {setinsightObj?.linkTapCount ? setinsightObj?.linkTapCount: 0}
                </Text>
              </View>
              <Image
                source={require("../../assets/img/graph.png")}
                style={insternalcss.smallimg}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  color: "#ffff",
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: wp(4),
                  fontFamily: "Montserrat",
                }}>
                Link Taps
              </Text>
            </View>
          </View>

          <View style={insternalcss.coll9}>
            <View style={{ width: wp(35), position: "relative" }}>
              <View style={{ position: "absolute", top: hp(-2) }}>
                <Text
                  style={{
                    color: "#ffff",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: wp(6),
                    fontFamily: "Montserrat",
                  }}>
                  {setinsightObj?.connectTapCount ? setinsightObj?.connectTapCount:0}
                </Text>
              </View>
              <Image
                source={require("../../assets/img/graph.png")}
                style={insternalcss.smallimg}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  color: "#ffff",
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: wp(4),
                  fontFamily: "Montserrat",
                }}>
                Connections
              </Text>
            </View>
          </View>

          <View style={insternalcss.coll9}>
            <View style={{ width: wp(35), position: "relative" }}>
              <View style={{ position: "absolute", top: hp(-2) }}>
                <Text
                  style={{
                    color: "#ffff",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: wp(6),
                    fontFamily: "Montserrat",
                  }}>
                  {tapThroughRate} %
                </Text>
              </View>
              <Image
                source={require("../../assets/img/graph.png")}
                style={insternalcss.smallimg}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  color: "#ffff",
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: wp(4),
                  fontFamily: "Montserrat",
                }}>
                Tap Through Rate
              </Text>
            </View>
          </View>
        </View>}
        {isloading ? <ActivityIndicator style={{ marginTop: hp(10) }} /> : <View
          style={{
            flex: 1,
            backgroundColor: "#1A1824",
            paddingVertical: 10,
            marginVertical: 10,
          }}>
          <FlatList data={linkArr} renderItem={renderSocialIcon} />
        </View>}
      </ScrollView>
    </>
  );
}
const insternalcss = StyleSheet.create({
  centerhei: {
    backgroundColor: "#1A1824",
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
  textblac: {
    color: "#fff",
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
  },
  listdic: {
    backgroundColor: "#272631",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  profile: {
    width: wp(35),
    borderRadius: wp(18),
    height: wp(35),
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
    alignItems: "center",
    flexDirection: "row",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(32),
  },
  logoContainer: {
    height: 120,
    width: 120,
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
    right: -60,
    borderRadius: 100,
    top: -70,
  },
  collg8: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  coll9: {
    height: hp(22),
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: 5,
    paddingVertical: hp(5),
    paddingHorizontal: hp(2),
    backgroundColor: "#484650",
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
  flexrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btninfo: {
    position: "absolute",
    top: 10,
    right: 5,
    width: 20,
    height: 20,
  },
  graphpg: {
    width: "90%",
    height: hp(15),
  },
  graphbox: {
    backgroundColor: "#f6f8fd",
    padding: 10,
    borderRadius: 12,
    position: "relative",
    marginBottom: 12,
  },
  yourins: {
    marginTop: 20,
    color: "#000",
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 20,
  },
  text1: {
    color: "#000",
    fontFamily: "Montserrat-SemiBold",
    // fontWeight:'Montserrat-SemiBold'
  },
  text2: {
    color: "#000",
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    marginTop: 8,
  },
  imgfluid: {
    width: wp(30),
    height: hp(15),
    borderRadius: 10,
    position: "absolute",
    top: -50,
  },
  container: {
    paddingHorizontal: 10,
  },
  stickboxbig: {
    backgroundColor: "#fdfbf6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: "20%",
    height: 150,
    borderRadius: 10,
  },
  text3: {
    color: "#000",
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
  },
  prog: {
    color: "#000",
    fontSize: 18,
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
    marginHorizontal: wp(4),
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
  collg4: {
    position: "absolute",
    // left:wp(50),

    // right:wp(50),
    // transform:[{translateX: -wp(50)}]
  },
  detailname: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontSize: 12,
  },
  userinfobox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: wp(0),
  },
  smallimg: {
    width: "100%",
    height: "100%",
  },
  rowflex1: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
