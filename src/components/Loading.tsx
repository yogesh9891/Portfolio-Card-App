import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Loading = () => (
  <View style={[styles.container]}>
    <ActivityIndicator size="large" color="#E1AC4C" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#1A1824',
    flex: 1,
    height:heightPercentageToDP(100),
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
});

export default Loading;