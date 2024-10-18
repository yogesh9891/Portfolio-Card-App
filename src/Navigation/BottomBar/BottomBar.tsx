// import React from 'react';

// import {
//   Alert,
//   Animated,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// // import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import { CurvedBottomBar } from 'react-native-curved-bottom-bar';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';

// import Userprofile from '../../components/Profile';
// import Home from '../../components/Home';
// import Connections from '../../components/Connections';
// import Insight from '../../components/Insight';
// // import Userprofile from '../../components/Userprofile';

// export default function BottomBar({ state, descriptors, navigation }) {
//   const navigation = useNavigation<any>()
//   const _renderIcon = (routeName: any, selectedTab: any) => {
//     let icon = '';
//     let type = '';
//     let name = ''

//     switch (routeName) {
//       case 'title1':
//         icon = 'home';
//         type = 'home'
//         name = 'Home'
//         break;
//       case 'title2':
//         type = 'AntDesign'
//         icon = 'barschart';
//         name = 'Insights'
//         break;
//       case 'title3':
//         type = 'AntDesign'
//         icon = 'user';
//         name = 'Profile';
//         break;

//       case 'title4':
//         type = 'FontAwesome'
//         icon = 'users';
//         name = 'Connections';
//         break;

//     }


//     return (
//       <>
//         {type == 'ionicons' ?
//           <Ionicons
//             name={icon}
//             size={16}
//             color={routeName === selectedTab ? 'black' : 'gray'}
//           />

//           :
//           type == 'FontAwesome' ?

//             <FontAwesome
//               name={icon}
//               size={16}
//               color={routeName === selectedTab ? 'black' : 'gray'}
//             />
//             :

//             <AntDesign
//               name={icon}
//               size={16}
//               color={routeName === selectedTab ? 'black' : 'gray'}
//             />


//         }

//         <Text style={{ fontSize: 10, marginTop: 2, }}>{name}</Text>


//       </>

//     )


//     if (type == 'ionicons') {


//       return (
//         <Ionicons
//           name={icon}
//           size={25}
//           color={routeName === selectedTab ? 'black' : 'gray'}
//         />
//       );
//     }
//     else if ('Fontisto') {

//       return (
//         <Fontisto
//           name={icon}
//           size={25}
//           color={routeName === selectedTab ? 'black' : 'gray'}
//         />
//       );
//     }
//   };
//   interface TabBarParams {
//     routeName: string;
//     selectedTab: string;
//     navigate: (route: string) => void;
//   }


//   const renderTabBar = ({ routeName, selectedTab, navigate }: TabBarParams) => {
//     return (
//       <TouchableOpacity
//         onPress={() => navigate(routeName)}
//         style={styles.tabbarItem}
//       >
//         {_renderIcon(routeName, selectedTab)}
//       </TouchableOpacity>
//     );
//   };


//   return (
//     <>
//       {/* <NavigationContainer> */}
//       <CurvedBottomBar.Navigator
//         // type="DOWN"
//         style={[styles.bottomBar,]}
//         shadowStyle={styles.shawdow}
        
//         // height={45}
//         // circleWidth={45}
//         bgColor="#fafafa"
//         screenOptions={{ headerShown: false }}
//         initialRouteName="title1"
//         borderTopLeftRight
//         renderCircle={({ selectedTab, navigate }) => (
//           <Animated.View style={styles.btnCircleUp}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate('Userprofile',)}
//             >
//               <Entypo name={'share'} color="#fff" size={20} />
//             </TouchableOpacity>
//           </Animated.View>
//         )}
//         tabBar={renderTabBar}
//       >
//         <CurvedBottomBar.Screen
//           name="title1"
//           position="LEFT"

//           component={() => <Home />}
//         />
//         <CurvedBottomBar.Screen
//           name="title4"
//           position="LEFT"
//           component={() => <Connections />
//           }
//         />
//         <CurvedBottomBar.Screen
//           name="title2"
//           component={() => <Insight />}
//           position="RIGHT"
//         />
//         <CurvedBottomBar.Screen
//           name="title3"
//           component={() => <Userprofile />}
//           position="RIGHT"
//         />
//       </CurvedBottomBar.Navigator>
//       {/* </NavigationContainer> */}
//     </>
//   );
// }
// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   shawdow: {
//     // backgroundColor:'red',
//     shadowColor: '#DDDDDD',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 5,
//   },
//   button: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   bottomBar: {
//     // backgroundColor:'#fafafa'
//   },
//   btnCircleUp: {
//     width: 50,
//     height: 50,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#e1ac4c',
//     bottom: 18,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 1,
//   },
//   imgCircle: {
//     width: 30,
//     height: 30,
//     tintColor: 'gray',
//   },
//   tabbarItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   img: {
//     width: 30,
//     height: 30,
//   },
//   screen1: {
//     flex: 1,
//     backgroundColor: '#BFEFFF',
//   },
//   screen2: {
//     flex: 1,
//     backgroundColor: '#FFEBCD',
//   },
// });







// import { View, Text, Image, Dimensions } from 'react-native'
// import React, { useContext } from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



// const { height, width } = Dimensions.get('window')
// const Botmtab = createBottomTabNavigator();

// const BottamTab = () => {
//     const Orange = '#C29A51'
//     return (
//         <Botmtab.Navigator screenOptions={{


//             tabBarStyle: { height: hp(7), backgroundColor: '#000', borderTopLeftRadius: wp(5), borderTopRightRadius: wp(5), paddingRight:wp(6), paddingLeft:wp(6), },
//             tabBarShowLabel: false,
//             headerShown: false,

//         }}>
//             <Botmtab.Screen name='Home' component={NewAboutUs}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={{
//                             height: hp(7)
//                         }}>

//                             {/* <View style={{
//                                 height: hp(1),
//                                 backgroundColor: focused ? '#000' : null,
//                                 width: 80,
//                             }}></View> */}
//                             {focused ?
//                                 <View style={{ height: hp(6), marginTop: hp(-2.1) }}>
//                                     <Image source={require('../../../assets/image/tab.png')}
//                                         style={{
//                                             height: wp(4),
//                                             width: wp(10),
//                                             alignSelf: 'center',
//                                             marginTop: hp(0.8), resizeMode: 'contain'
//                                         }}
//                                     />
//                                     < View style={{ height: wp(5), width: wp(5), backgroundColor: 'black', borderRadius: wp(5), alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center', marginTop: hp(-2.8) }}>
//                                         <Image source={require('../../../assets/image/aboutus.png')}
//                                             style={{
//                                                 height: wp(2),
//                                                 width: wp(2),
//                                                 alignSelf: 'center',
//                                             }}
//                                         />
//                                     </View>
//                                 </View>
//                                 : <Image source={require('../../../assets/image/aboutus.png')}
//                                     style={{
//                                         height: wp(2),
//                                         width: wp(2),
//                                         alignSelf: 'center',
//                                         marginTop: hp(1.5)
//                                     }}
//                                 />}
//                             <Text style={{
//                                 color: 'white',
//                                 alignSelf: 'center',
//                                 width: wp(10),
//                                 textAlign: 'center',
//                                 marginTop: focused ? hp(0.3) : 0,
//                                 fontSize: hp(1.6)

//                                 // marginTop:focused ? hp(1):0
//                             }}>
//                                 About Us
//                             </Text>

//                         </View>
//                     )
//                 }}
//             />
//             <Botmtab.Screen name='Project' component={ProjectStack}
//                 options={{

//                     // {focs?<StatusBar barStyle="light-content" backgroundColor="black" />:null},

//                     tabBarIcon: ({ focused }) => (

//                         <View style={{
//                             height: hp(7)
//                         }}>
//                             {/* {focused?<StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />:null} */}

//                             {/* <View style={{
//                                 height: 3,
//                                 backgroundColor: focused ? '#000' : null,
//                                 width: 80,
//                                 // justifyContent:'center'
//                             }}></View> */}
//                             {focused ?
//                                 <View style={{ height: hp(6), marginTop: hp(-2.1) }}>
//                                     <Image source={require('../../../assets/image/tab.png')}
//                                         style={{
//                                             height: wp(4),
//                                             width: wp(10),
//                                             alignSelf: 'center',
//                                             marginTop: hp(0.8), resizeMode: 'contain'
//                                         }}
//                                     />
//                                     < View style={{ height: wp(5), width: wp(5), backgroundColor: 'black', borderRadius: wp(5), alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center', marginTop: hp(-2.8) }}>
//                                         <Image source={require('../../../assets/image/project.png')}
//                                             style={{
//                                                 height: wp(2),
//                                                 width: wp(2),
//                                                 alignSelf: 'center',
//                                             }}
//                                         />
//                                     </View>
//                                 </View>
//                                 : <Image source={require('../../../assets/image/project.png')}
//                                     style={{
//                                         height: wp(2),
//                                         width: wp(2),
//                                         alignSelf: 'center',
//                                         marginTop: hp(1.5)
//                                     }}
//                                 />}
//                             <Text style={{
//                                 color: 'white',
//                                 alignSelf: 'center',
//                                 textAlign: 'center',
//                                 marginTop: focused ? hp(0.3) : 0, width: wp(10),
//                                 fontSize: hp(1.6)
//                             }}>
//                                 Projects
//                             </Text>



//                         </View>
//                     )
//                 }}
//             />
//             <Botmtab.Screen name='Guide' component={GuideStack}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={
//                             { height: hp(7) }
//                         }>

//                             {/* <View style={{
//                                 height: 3,
//                                 backgroundColor: focused ? '#000' : null,
//                                 width: 80,
//                                 // paddingTop:10
//                             }}></View> */}
//                             {focused ?
//                                 <View style={{ height: hp(6), marginTop: hp(-2.1) }}>
//                                     <Image source={require('../../../assets/image/tab.png')}
//                                         style={{
//                                             height: wp(4),
//                                             width: wp(10),
//                                             alignSelf: 'center',
//                                             marginTop: hp(0.8), resizeMode: 'contain'
//                                         }}
//                                     />
//                                     < View style={{ height: wp(5), width: wp(5), backgroundColor: 'black', borderRadius: wp(5), alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center', marginTop: hp(-2.8) }}>
//                                         <Image source={require('../../../assets/image/guidde.png')}
//                                             style={{
//                                                 height: wp(2),
//                                                 width: wp(2),
//                                                 alignSelf: 'center',
//                                             }}
//                                         />
//                                     </View>
//                                 </View>
//                                 :
//                                 <Image source={require('../../../assets/image/guidde.png')}
//                                     style={{
//                                         height: wp(2),
//                                         width: wp(2),
//                                         alignSelf: 'center',
//                                         marginTop: hp(1.5)
//                                     }}
//                                 />
//                             }
//                             <Text style={{
//                                 color: 'white',
//                                 width: wp(10),
//                                 alignSelf: 'center',
//                                 textAlign: 'center',
//                                 marginTop: focused ? hp(0.3) : 0,
//                                 fontSize: hp(1.6)
//                             }}>
//                                 Guide
//                             </Text>

//                         </View>
//                     )
//                 }}
//             />
//             <Botmtab.Screen name='QRCode' component={QrCode}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={
//                             { height: hp(7) }
//                         }>

//                             {/* <View style={{
//                                 height: 3,
//                                 backgroundColor: focused ? '#000' : null,
//                                 width: 80,
//                                 // paddingTop:10
//                             }}></View> */}
//                             {focused ?
//                                 <View style={{ height: hp(6), marginTop: hp(-2.1) }}>
//                                     <Image source={require('../../../assets/image/tab.png')}
//                                         style={{
//                                             height: wp(4),
//                                             width: wp(10),
//                                             alignSelf: 'center',
//                                             marginTop: hp(0.8), resizeMode: 'contain'
//                                         }}
//                                     />
//                                     < View style={{ height: wp(5), width: wp(5), backgroundColor: 'black', borderRadius: wp(5), alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center', marginTop: hp(-2.8) }}>
//                                         <Image source={require('../../../assets/image/scanner.png')}
//                                             style={{
//                                                 height: wp(2),
//                                                 width: wp(2),
//                                                 alignSelf: 'center',
//                                             }}
//                                         />
//                                     </View>
//                                 </View>
//                                 :
//                                 <Image source={require('../../../assets/image/scanner.png')}
//                                     style={{
//                                         height: wp(2),
//                                         width: wp(2),
//                                         alignSelf: 'center',
//                                         marginTop: hp(1.5)
//                                     }}
//                                 />}
//                             <Text style={{
//                                 color: 'white',
//                                 width: wp(10),
//                                 alignSelf: 'center',
//                                 textAlign: 'center',
//                                 marginTop: focused ? hp(0.3) : 0, fontSize: hp(1.6)
//                             }}>
//                                 Scan QR Code
//                             </Text>

//                         </View>
//                     )
//                 }}
//             />
//             <Botmtab.Screen name='Catalog' component={CatalogStack}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={
//                             { height: hp(7) }
//                         }>

//                             {/* <View style={{
//                                 height: 3,
//                                 backgroundColor: focused ? '#000' : null,
//                                 width: 80,
//                                 // paddingTop:10
//                             }}></View> */}
//                             {focused ?
//                                 <View style={{ height: hp(6), marginTop: hp(-2.1) }}>
//                                     <Image source={require('../../../assets/image/tab.png')}
//                                         style={{
//                                             height: wp(4),
//                                             width: wp(10),
//                                             alignSelf: 'center',
//                                             marginTop: hp(0.8), resizeMode: 'contain'
//                                         }}
//                                     />
//                                     < View style={{ height: wp(5), width: wp(5), backgroundColor: 'black', borderRadius: wp(5), alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center', marginTop: hp(-2.8) }}>
//                                         <Image source={require('../../../assets/image/catalog.png')}
//                                             style={{
//                                                 height: wp(2),
//                                                 width: wp(2),
//                                                 alignSelf: 'center',
//                                             }}
//                                         />
//                                     </View>
//                                 </View>
//                                 :
//                                 <Image source={require('../../../assets/image/catalog.png')}
//                                     style={{
//                                         height: wp(2),
//                                         width: wp(2),
//                                         alignSelf: 'center',
//                                         marginTop: hp(1.5)
//                                     }}
//                                 />}
//                             <Text style={{
//                                 color: 'white',
//                                 width: wp(10),
//                                 alignSelf: 'center',
//                                 textAlign: 'center',
//                                 marginTop: focused ? hp(0.3) : 0,
//                                 fontSize: hp(1.6)
//                             }}>
//                                 Catalog
//                             </Text>

//                         </View>
//                     )
//                 }}
//             />
//             <Botmtab.Screen name='Look Book' component={LookBookStack}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style={{ height: hp(7) }}>
//                             {/* <View style={{
//                                 height: 3,
//                                 backgroundColor: focused ? '#000' : null,
//                                 width: 80,
//                                 // paddingTop:10
//                             }}></View> */}
//                             {focused ?

//                                 <View style={{ height: hp(6), marginTop: hp(-2.1) }}>
//                                     <Image source={require('../../../assets/image/tab.png')}
//                                         style={{
//                                             height: wp(4),
//                                             width: wp(10),
//                                             alignSelf: 'center',
//                                             marginTop: hp(0.8), resizeMode: 'contain'
//                                         }}
//                                     />
//                                     < View style={{ height: wp(5), width: wp(5), backgroundColor: 'black', borderRadius: wp(5), alignItems: 'center', justifyContent: 'center', position: 'absolute', alignSelf: 'center', marginTop: hp(-2.8) }}>
//                                         <Image source={require('../../../assets/image/lookbook.png')}
//                                             style={{
//                                                 height: wp(2),
//                                                 width: wp(2),
//                                                 alignSelf: 'center',
//                                             }}
//                                         />
//                                     </View>
//                                 </View> :
//                                 <Image source={require('../../../assets/image/lookbook.png')}
//                                     style={{
//                                         height: wp(2),
//                                         width: wp(2),
//                                         // tintColor: 'grey',
//                                         alignSelf: 'center',
//                                         marginTop: hp(1.5)
//                                     }}
//                                 />}
//                             <Text style={{
//                                 color: 'white',
//                                 width: wp(10),
//                                 alignSelf: 'center',
//                                 textAlign: 'center',
//                                 marginTop: focused ? hp(0.3) : 0,
//                                 fontSize: hp(1.6)
//                             }}>
//                                 Look Book
//                             </Text>

//                         </View>
//                     )
//                 }}
//             />
//         </Botmtab.Navigator>

//     )
// }

// export default BottamTab