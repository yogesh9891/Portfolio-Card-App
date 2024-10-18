import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import Login from "../../components/Login";
import OtpVerfiy from "../../components/OtpVerify";
import {AuthorisedStackStackNavigatorParamList} from "../../types/Authorised.types";
import Home from "../../components/Home";
import BottomTabNav from "../tab/BottomTabNav";
import AddBusiness from "../../components/AddBusiness";
import LinkStore from "../../components/LinkStore";
import Preview from "../../components/Preview";
import CardList from "../../components/CardList";
import EditCard from "../../components/EditCard";
import AddCard from "../../components/AddCard";
import CopyCard from "../../components/CopyCard";
import HowToTap from "../../components/HowtoTap";
import Setting from "../../components/Setting";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import EditProfile from "../../components/EditProfile";
import CameraCard from "../../components/CameraCard";
import AddConnection from "../../components/AddConnection";
import ViewConnection from "../../components/ViewConnection";
import ToIphone from "../../components/ToIphone";
import OldIphone from "../../components/OldIphone";
import AndroidPhone from "../../components/AndroidPhone";
import QRCode from "../../components/QRCode";
import DeleteList from "../../components/DeleteList";
import Verfication from "../../components/Verfication";
import LinkPage from "../../components/LinkPage";

const AuthorisedRootStack =
  createNativeStackNavigator<AuthorisedStackStackNavigatorParamList>();
export default function AuthorisedStack() {
  return (
    <AuthorisedRootStack.Navigator screenOptions={{
      animation:"none" 
  }} initialRouteName="BottomTabNav">
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="BottomTabNav"
        component={BottomTabNav}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="Home"
        component={Home}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="AddBusiness"
        component={AddBusiness}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="Verfication"
        component={Verfication}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="LinkStore"
        component={LinkStore}
      />

      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="Preview"
        component={Preview}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
          animationEnabled:false,
        }}
        name="CardList"


        component={CardList}
      />
  
  <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="EditProfile"
        component={EditProfile}
        initialParams={{cardNo: ""}}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="EditCard"
        component={EditCard}
        initialParams={{cardNo: ""}}
      />

      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="AddCard"
        component={AddCard}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="CopyCard"
        component={CopyCard}
        initialParams={{cardNo: ""}}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="HowToTap"
        component={HowToTap}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="Setting"
        component={Setting}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="CameraCard"
        component={CameraCard}
      />
       <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="IntoIphone"
        component={ToIphone}
      />
       <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="OldIphone"
        component={OldIphone}
      />
       <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="AndroidPhone"
        component={AndroidPhone}
      />
       <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="QRCode"
        component={QRCode}
      />
       <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="LinkPage"
        component={LinkPage}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="AddConnection"
        component={AddConnection}
        initialParams={{cardData: {  emailArr: [],
          phoneArr: [],
          post: "",
          name: "",
          image: ""}}}
      />
      <AuthorisedRootStack.Screen
        options={{
          headerShown: false,
          gestureDirection: "horizontal",
        }}
        name="ViewConnection"
        component={ViewConnection}
        initialParams={{cardData: {  email: "",
        mobile:"",
          post: "",
          name: "",
          image: ""}}}
      />
    </AuthorisedRootStack.Navigator>
  );
}
