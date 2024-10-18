import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../components/Home';
import Connections from '../../components/Connections';
// import Home from '../../components/Home';
const Stack = createNativeStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName='Connections'>
      <Stack.Screen
        name="Connections"
        component={Connections}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}