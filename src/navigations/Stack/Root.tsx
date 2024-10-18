import {View, Text} from 'react-native';
import React, {useState, useEffect, useContext, useMemo} from 'react';
import {NavigationContainer,DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthorisedStack from './AuthorisedStack';
import UnAuthorisedStack from './UnAuthorisedStack';
// import Insight from '../components/Insight';
import Interoscreen from '../../components/Interoscreen';
import Connections from '../../components/Connections';
import Share from '../../components/Share';
import Testscreen from '../../components/Testscreen';
import Userprofile from '../../components/Profile';
import Insight from '../../components/Insight';
import Product from '../../components/Product';
import BrandProduct from '../../components/BrandProduct';
import Setting from '../../components/Setting';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import Home from '../../components/Home';
import { TokenContext } from '../../../context/TokenContext';
import { axiosApiInstance } from '../../../App';
import { getAuth } from '../../utils/auth';





const Stack = createNativeStackNavigator();

export default function Root() {
const [isAuthorised, setIsAuthorised] = useContext(TokenContext);

const authCheck = async () => {
  let tokenObj = await getAuth();
  if (tokenObj) {
    setIsAuthorised(true);
  } else {
    setIsAuthorised(false);
  }
};
useEffect(() => {
  authCheck();
}, []);
useMemo(() => {

  axiosApiInstance.interceptors.request.use(
    async config => {
      const token = await getAuth();
   

      if (token) {
        config.headers['authorization'] = 'Bearer ' + token?.token;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );
  axiosApiInstance.interceptors.response.use(
    res => {
      // Add configurations here
      return res;
    },
    async err => {
      console.log('INterceptor error++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log(JSON.stringify(err,null,2),"")
      console.log('INterceptor error__________________________________________________________________________________');

      // await logoutUser()

      return Promise.reject(err);
    },
  );
}, []);
    return (
      <NavigationContainer  >
      <Stack.Navigator screenOptions={{
          animation:"none" 
      }} >
        {isAuthorised ? (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
                gestureDirection: 'horizontal',
          
              }}
              name="AuthorisedStack"
              component={AuthorisedStack}
            />
          </>
        ) : (
          <Stack.Screen
            options={{
              headerShown: false,
              gestureDirection: 'horizontal',
            }}
            name="UnAuthorisedStack"
            component={UnAuthorisedStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
    )
}