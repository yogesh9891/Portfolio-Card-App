import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../../components/Login';
import OtpVerfiy from '../../components/OtpVerify';
import { UnAuthorisedStackStackNavigatorParamList } from '../../types/UnAuthorised.types';
import LoginEmail from '../../components/LoginEmail';
import OtpVerfiyEmail from '../../components/OtpVerifyEmail';
import SplashScreen from '../../components/SplashScreen';

const UnAuthorisedRootStack = createNativeStackNavigator<UnAuthorisedStackStackNavigatorParamList>();
export default function UnAuthorisedStack() {
    return (

        <UnAuthorisedRootStack.Navigator  initialRouteName="Splash">
            <UnAuthorisedRootStack.Screen
                options={{
                    headerShown: false,
                    gestureDirection: 'horizontal',
                }}
                name="Splash" component={SplashScreen}
            /> 
            <UnAuthorisedRootStack.Screen
                options={{
                    headerShown: false,
                    gestureDirection: 'horizontal',
                }}
                name="LoginEmail" component={LoginEmail}
            />
            <UnAuthorisedRootStack.Screen
                options={{
                    headerShown: false,
                    gestureDirection: 'horizontal',
                }}
                name="Login" component={Login}
            />

            <UnAuthorisedRootStack.Screen
                options={{
                    headerShown: false,
                    gestureDirection: 'horizontal',
                }}
                name="OtpVerfiy"   component={OtpVerfiy}   initialParams={{ mobile: "" }} />

                <UnAuthorisedRootStack.Screen
                options={{
                    headerShown: false,
                    gestureDirection: 'horizontal',
                }}
                name="OtpVerfiyEmail"   component={OtpVerfiyEmail}   initialParams={{ email: "" }} />
                
        </UnAuthorisedRootStack.Navigator>
    )
};