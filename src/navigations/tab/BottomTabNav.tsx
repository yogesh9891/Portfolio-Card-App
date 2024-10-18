import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {Text, View} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import Connections from "../../components/Connections";
import Home from "../../components/Home";
import Insight from "../../components/Insight";
import Profile from "../../components/Profile";
import ShareScreen from "../../components/Share";
import DeleteList from "../../components/DeleteList";

const Tab = createBottomTabNavigator();
export default function BottomTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#272631",
        tabBarStyle: {
          height: hp(7),
          backgroundColor: "#484650",
          paddingRight: wp(6),
          paddingLeft: wp(6),
          position: "relative",
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: hp(7),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {focused ? (
                <Octicons name="home" color={"#E1AC4C"} size={15} />
              ) : (
                <Octicons name="home" color={"#fff"} size={15} />
              )}
              <Text
                style={{
                  color: focused ? "#E1AC4C" : "white",
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: focused ? hp(0.3) : 0,
                  fontSize: hp(1.2),
                }}>
                Home
              </Text>
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: hp(7),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {focused ? (
                <FontAwesome name="users" color={"#E1AC4C"} size={15} />
              ) : (
                <FontAwesome name="users" color={"#fff"} size={15} />
              )}
              <Text
                style={{
                  color: focused ? "#E1AC4C" : "white",
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: focused ? hp(0.3) : 0,
                  fontSize: hp(1.2),
                }}>
                Connections
              </Text>
            </View>
          ),
        }}
        name="Connections"
        component={Connections}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: 60,
                width: 60,
                position: "relative",
                top: -25,
                backgroundColor: "#E1AC4C",
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "#1A1824",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {/* <View style={{
              height: 3,
              backgroundColor: focused ? '#000' : null,
              width: 80,
              // paddingTop:10
          }}></View> */}

              <Entypo name="share" color={"white"} size={28} />
            </View>
          ),
        }}
        name="Share"
        component={ShareScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Insight",
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: hp(7),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {focused ? (
                <AntDesign name="barschart" color={"#E1AC4C"} size={15} />
              ) : (
                <AntDesign name="barschart" color={"#fff"} size={15} />
              )}
              <Text
                style={{
                  color: focused ? "#E1AC4C" : "white",
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: focused ? hp(0.3) : 0,
                  fontSize: hp(1.2),
                }}>
                Insight
              </Text>
            </View>
          ),
     
        }}
        name="Insight"
        component={Insight}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: hp(7),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {focused ? (
                <AntDesign name="user" color={"#E1AC4C"} size={15} />
              ) : (
                <AntDesign name="user" color={"#fff"} size={15} />
              )}
              <Text
                style={{
                  color: focused ? "#E1AC4C" : "white",
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: focused ? hp(0.3) : 0,
                  fontSize: hp(1.2),
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
