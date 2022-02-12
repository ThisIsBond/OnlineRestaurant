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
// import { icons, images, SIZES, COLORS, FONTS } from '../constants'
// import {
//   View,
//   Text,
//   StyleSheet,
//   Button
// } from "react-native";
// import firestore from '@react-native-firebase/firestore';
// import { TextInput } from "react-native-gesture-handler";
// import { BasicButton } from "@phomea/react-native-buttons";
// import auth from '@react-native-firebase/auth';
// import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';

// var siteKey = '6LdVDpcaAAAAAErCWScTyvS5n7QJFiDDpdY4H2i7'
// var secretKey = '6LdVDpcaAAAAAMJ9lT3qBROQAXyinnNDKrNWfduA'

// com.onlinerestaurant

// class Restaurant extends React.Component {

//   constructor() {
//     super();

//     this.state = {
//       number: '',
//     }
//   }
//   onChangeText = (key, val) => {
//     this.setState({ [key]: val })

//   }
//   onMessage = event => {
//     if (event && event.nativeEvent.data) {
//       if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
//         this.captchaForm.hide();
//         return;
//       } else {
//         console.log('Verified code from Google', event.nativeEvent.data);
//         setTimeout(() => {
//           this.captchaForm.hide();
//           // do what ever you want here
//         }, 1500);
//       }
//     }
//   }
//   render() {
//     return (
//       <View style={{
//         ...styles.container
//       }}>
//         <TextInput
//           style={{
//             ...styles.input
//           }}
//           value={this.state.number}
//           keyboardType={'numeric'}
//           placeholder='Phone no.'
//           autoCapitalize="none"
//           maxLength={10}
//           placeholderTextColor={COLORS.secondary}
//           onChangeText={val => this.onChangeText('number', val)} />

//         <ConfirmGoogleCaptcha
//           ref={_ref => this.captchaForm = _ref}
//           siteKey={siteKey}
//           baseUrl='localhost'
//           languageCode='en'
//           onMessage={this.onMessage}
//         />
//         <View style={{ margin: 50 }}>
//           <Button
//             padding={SIZES.padding}
//             title="Register"
//             color={COLORS.primary}
//             accessibilityLabel="Register"
//             onPress={() => {
//               this.captchaForm.show();
//             }}
//           />
//         </View>
//       </View>
//     )
//   }
// }
// const styles = StyleSheet.create({ // Created the custom stylesheet for manual change in design.
//   input: {
//     alignSelf: 'center',
//     width: 350,
//     height: 55,
//     backgroundColor: COLORS.white,
//     margin: 10,
//     padding: 8,
//     color: 'black',
//     borderRadius: 14,
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   container: {
//     backgroundColor: COLORS.lightGray4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     paddingTop: 20 //this amount should be equal to the header height so that any items displayed inside the container will start after the absolute positioned header
//   },
// })
// export default Restaurant;


// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// // import React in our code
// import React, { useState, useEffect } from "react";

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   Text,
//   StyleSheet,
//   View,
//   FlatList
// } from 'react-native';
// import { SearchBar } from 'react-native-elements';
// import firebase from '@react-native-firebase/app';

// const ref = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("menu");

// const Test = () => {
//   const [search, setSearch] = useState('');
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [masterDataSource, setMasterDataSource] = useState([]);

//   useEffect(() => {
//     ref.onSnapshot((querySnapshot) => {
//       const items = [];
//       querySnapshot.forEach((doc) => {
//         items.push(doc.data());
//       });
//       setFilteredDataSource(items);
//       setMasterDataSource(items)
//     })
//   }, []);

//   const searchFilterFunction = (text) => {
//     // Check if searched text is not blank
//     if (text) {
//       // Inserted text is not blank
//       // Filter the masterDataSource
//       // Update FilteredDataSource
//       const newData = masterDataSource.filter(function (item) {
//         const itemData = item.name
//           ? item.name.toUpperCase()
//           : ''.toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setFilteredDataSource(newData);
//       setSearch(text);
//     } else {
//       // Inserted text is blank
//       // Update FilteredDataSource with masterDataSource
//       setFilteredDataSource(masterDataSource);
//       setSearch(text);
//     }
//   };

//   const ItemView = ({ item }) => {
//     return (
//       // Flat List Item
//       <Text
//         style={styles.itemStyle}
//         onPress={() => getItem(item)}>
//         {item.uuid}
//         {'.'}
//         {item.name.toUpperCase()}
//       </Text>
//     );
//   };

//   const ItemSeparatorView = () => {
//     return (
//       // Flat List Item Separator
//       <View
//         style={{
//           height: 0.5,
//           width: '100%',
//           backgroundColor: '#C8C8C8',
//         }}
//       />
//     );
//   };

//   const getItem = (item) => {
//     // Function for click on an item
//     alert('Id : ' + item.uuid + ' Title : ' + item.name);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <SearchBar
//           round
//           searchIcon={{ size: 24 }}
//           onChangeText={(text) => searchFilterFunction(text)}
//           onClear={(text) => searchFilterFunction('')}
//           placeholder="Type Here..."
//           value={search}
//         />
//         <FlatList
//           data={filteredDataSource}
//           keyExtractor={(item, index) => index.toString()}
//           ItemSeparatorComponent={ItemSeparatorView}
//           renderItem={ItemView}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//   },
//   itemStyle: {
//     padding: 10,
//   },
// });

// export default Test;

// import React in our code
import React, { useState, useEffect } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import { COLORS, SIZES } from "../constants";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const ref = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("menu");

const Test = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFilteredDataSource(items);
      setMasterDataSource(items)
    })
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <SafeAreaView>
        <ScrollView>
          {/* // Flat List Item */}
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
                    resizeMethod='scale'
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
                        color: COLORS.white
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
                          alignItems: 'center',
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
        </ScrollView>
      </SafeAreaView>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.uuid + ' Title : ' + item.name);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: COLORS.white
          }}
        >
          <SearchBar
            searchIcon={{ size: 24 }}
            placeholder='Search food...'
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction('')}
            value={search}
          />
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  itemStyle: {
    padding: 10,
  },
});

export default Test;