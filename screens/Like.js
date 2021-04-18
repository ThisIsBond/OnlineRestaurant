// import React, { Component } from "react"
// import {
//     View,
//     Text,
//     Alert
// } from "react-native";
// import { FONTS } from "../constants";



// class FetchData extends Component {


//     state = {
//         users: []
//     }


//     constructor(props) {
//         super(props);


//         this.subscriber = firestore().collection("RestaurantData/RestaurantData/menu").onSnapshot(docs => {
//             docs.forEach(doc => {
//                 let users = []
//                 docs.forEach(doc => {
//                     users.push(doc.data())
//                 })
//                 this.setState({ users })

//             })

//         })
//     }
//     render() {

//         return (
//             <View>
//                 <View>
//                     {this.state.users.map((dosc,index) => <View key={index}>
//                         <Text>{dosc.name}</Text>
//                         <Text>{dosc.calories}</Text>
//                         <Text>₹ {dosc.price}</Text>
//                         <Text>{dosc.categories}</Text>
//                     </View>)}
//                 </View>
//            </View>
//         );

//     }
// }
// export default FetchData;


// import React, { useEffect } from "react"
// import {
//     View,
//     Text,
//     Permission,
//     PermissionsAndroid
// } from "react-native";
// import firestore, { firebase } from "@react-native-firebase/firestore";
// import MapboxGL from "@react-native-mapbox-gl/maps";

// MapboxGL.setAccessToken("pk.eyJ1IjoidGhpc2lzYm9uZCIsImEiOiJja2x6ZG9qdHcwd3FmMm5zMms4bnNnbjA5In0.jrfRUCOAyf6ZY6CzZB_Qdg");

// const Like = () => {

//     // const componentDidMount = async () => {
//     //     const permission = await PermissionsAndroid.requestMultiple([
//     //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//     //         console.log("Componented Mounted")
//     //     ]);

//     // }
//     // useEffect(() => {
//     //     componentDidMount();

//     // }, [])
//     const renderAnnotations = () => {
//         return (
//             <MapboxGL.PointAnnotation
//                 key="pointAnnotation"
//                 id="pointAnnotation"
//                 coordinate={[3.3362400, 6.5790100]}>
//                 <View style={{
//                     height: 30,
//                     width: 30,
//                     backgroundColor: '#00cccc',
//                     borderRadius: 50,
//                     borderColor: '#fff',
//                     borderWidth: 3
//                 }} />
//             </MapboxGL.PointAnnotation>
//         );
//     }

//     return (
//         <View style={{ flex: 1, height: "100%", width: "100%" }}>
//             <MapboxGL.MapView

//                 styleURL={MapboxGL.StyleURL.Street}
//                 zoomLevel={16}

//                 style={{ flex: 1 }}>
//                 <MapboxGL.Camera
//                     zoomLevel={16}

//                     animationMode={'flyTo'}
//                     animationDuration={0}
//                 >
//                 </MapboxGL.Camera>
//                 {renderAnnotations()}
//             </MapboxGL.MapView>
//         </View>
//     )
// }
// export default Like;


// import React, {Component} from 'react';
// import {StyleSheet, View} from 'react-native';
// import MapboxGL from '@react-native-mapbox-gl/maps';

// MapboxGL.setAccessToken(
//     'pk.eyJ1IjoidGhpc2lzYm9uZCIsImEiOiJja2x6ZG9qdHcwd3FmMm5zMms4bnNnbjA5In0.jrfRUCOAyf6ZY6CzZB_Qdg',
// );

// export default class Like extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       coordinates: [72.558643,23.025773],
//     };
//   }

//   render() {
//     return (
//       <View style={styles.page}>
//         <View style={styles.container}>
//           <MapboxGL.MapView style={styles.map}>
//             <MapboxGL.Camera
//               zoomLevel={8}
//               centerCoordinate={this.state.coordinates}
//             />
//             <MapboxGL.PointAnnotation coordinate={this.state.coordinates} />
//           </MapboxGL.MapView>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//   },
//   container: {
//     height: '100%',
//     width: '100%',
//     backgroundColor: 'blue',
//   },
//   map: {
//     flex: 1,
//   },
// });


// import React from "react"
// import {
//     View,
//     Text
// } from "react-native";
// import firestore from '@react-native-firebase/firestore';

// const Restaurant = () => {
//     return(
//         <View>
//             <Text>Restaurant</Text>
//         </View>
//     )
// }

// export default Restaurant;


import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import { BasicButton } from "@phomea/react-native-buttons";
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { SafeAreaView } from "react-navigation";
import { refUserAddressBook } from './Login';
import { refUserLikedItems } from './Login';
import LinearGradient from "react-native-linear-gradient";


const Like = ({ navigation }) => {

  const [userLikedItems, setUserLikedItems] = useState(null)

  function deleteAddress(item) {
    refUserLikedItems.doc(item).delete()
  }


  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', height: 50, paddingTop: 10 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center'
          }}
        >

        </TouchableOpacity>

        {/* Restaurent name Section */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
          <View
            style={{

              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              backgroundColor: COLORS.lightGray3,
              borderRadius: SIZES.radius

            }}
          >
            <Text style={{ ...FONTS.h3 }}> Favourites </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center'
          }}
        >
        </TouchableOpacity>
      </View>
    )
  }

  function renderAddressfromDB() {



    const getLikedItems = () => {

      refUserLikedItems.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
          // restaurantDatafromDB.push(doc.data());
        });
        console.log(items);
        setUserLikedItems(items)
      });

    }

    useEffect(() => {
      getLikedItems();
      return () => {
        setUserLikedItems({}); // This worked for me
      };
    }, []);

    const renderLikedItems = ({ item }) => (

      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
        margin: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,
        height: 180,
        width: '95%',
        borderRadius: 20,
        ...styles.shodow

      }} colors={['#fec23e', '#fe7501']} >
        <View
        >
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                width: '40%',
                flexDirection: 'column',
                height: 150,
                width: '45%',
                borderRadius: 20,
              }}
            >
              <Image
                source={{
                  uri: item.imageFileName
                }}
                resizeMethod='resize'
                style={{
                  height: 150,
                  width: '100%'
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: '5%'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,

                  }}
                >Name :</Text>

                <Text>  {item.name}</Text>

              </View>


              <View
                style={{
                  flexDirection: 'row',

                }}
              >
                <Text
                  style={{
                    color: COLORS.white,

                  }}
                >Price :</Text>

                <Text>   ₹ {item.price}</Text>
              </View>

              <View
                style={{
                  top: '30%',
                  marginBottom: '10%'
                }}
              >
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <TouchableOpacity
                    style={{

                      right: '30%',
                      width: '43%',
                      height: '100%'
                    }}
                    onPress={() => {
                      deleteAddress(item.id)
                    }}
                  >

                    <Text
                      style={{
                        width: 60,
                        color: '#FF0000'
                      }}
                    >Remove</Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      right: '100%',
                      width: '33%',
                      height: '100%',

                    }}
                    onPress={() => navigation.navigate("Recipe", {
                      item
                    })}
                  >

                    <Text
                      style={{
                        width: '100%'
                      }}
                    >View</Text>

                  </TouchableOpacity>


                </View>
              </View>
            </View>
          </View>
        </View >
      </LinearGradient>


    )
    return (
      <View>
        <FlatList
          data={userLikedItems}
          keyExtractor={(item, index) => `${item.id}` + index}
          renderItem={renderLikedItems}
          contentContainerStyle={{
            padding: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            paddingBottom: 30
          }}
        />
      </View>
    )
  }

  return (
    <SafeAreaView>
      {renderHeader()}
      {renderAddressfromDB()}

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fb7b1a',
    padding: SIZES.padding,
    height: 180,
    width: '100%',
    borderRadius: 20
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 20
  },
  shodow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  CircleShapeView: {
    width: 16,
    height: 16,
    borderRadius: 150 / 2,
    backgroundColor: '#fb7b1a'
  },
})
export default Like;