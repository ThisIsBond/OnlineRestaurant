// import { categoriesDatafromDB } from "./Home"
// import React, { useState } from 'react'
// import {
//   View,
//   Button,
//   TextInput,
//   StyleSheet,
//   Alert,
//   Right,
//   SafeAreaView,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native'
// import { icons, images, SIZES, COLORS, FONTS } from '../constants'
// import firebase from "@react-native-firebase/app";
// import { Picker } from "@react-native-community/picker";
// import * as ImagePicker from 'react-native-image-picker';
// import { render } from "react-dom";
// import storage from '@react-native-firebase/storage';

// class OrderDelivery extends React.Component {

//   constructor() {
//     super();

//     this.menudbRef = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("menu");

//     //this.menudbRef = firestore().collection("RestaurantData").doc('menu')

//     // var documentId = firebase.firestore().collection("RestaurantData").doc("menu").documentId;

//     this.state = {
//       name: '',
//       price: '',
//       rating: '',
//       calories: '',
//       duration: '',
//       description: '',
//       imageUri: '',
//       PickerValue: '',
//       filePath: '',
//       tempFilePath: '',
//       imageFileName: '',
//     };
//   }

//   onChangeText = (key, val) => {
//     this.setState({ [key]: val })

//   }


//   signUp = async () => {

//     const { name, price, rating, calories, duration, description } = this.state
//     try {
//       // here place your signup logic
//       this.menudbRef.add({
//         name: this.state.name,
//         price: this.state.price,
//         rating: this.state.rating,
//         calories: this.state.calories,
//         duration: this.state.duration,
//         description: this.state.description,
//         categories: this.state.PickerValue,
//         filePath: "gs://onlinerestaurant-57cf5.appspot.com/gs:/" + this.state.tempFilePath.fileName,
//         imageFileName: this.state.imageFileName,
//       }).then((res) => {
//         this.setState({
//           name: "",
//           price: "",
//           rating: "",
//           calories: "",
//           duration: "",
//           description: "",
//           categories: "",
//           filePath: "",
//           imageFileName: "",
//           isLoading: false
//         });
//       }).catch((err) => {
//         Alert.alert('Error');
//         console.error("Error found: ", err);
//         this.setState({
//           isLoading: false,
//         });
//       });
//     } catch (err) {
//       console.log('error signing up: ', err)
//     }
//   }



//   // setFoodImage = (image) => {
//   //     this.state.imageUri.setState(image.uri);
//   // }
//   chooseFile = () => {

//     let options = {
//       title: 'Select Image',
//       // customButtons: [
//       //   {
//       //     name: 'customOptionKey',
//       //     title: 'Choose Photo from Custom Option'
//       //   },
//       // ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     ImagePicker.showImagePicker(options, (response) => {
//       console.log('Response = ', response.uri);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log(
//           'User tapped custom button: ',
//           response.customButton
//         );
//         alert(response.customButton);
//       } else {
//         let source = response;
//         // You can also display the image using data:
//         // let source = {
//         //   uri: 'data:image/jpeg;base64,' + response.data
//         // };


//         this.setState({ filePath: source.path })
//         this.setState({ tempFilePath: source })

//         //Firestore Image Upload 

//         firebase
//           .storage()
//           .ref("gs://" + source.fileName)
//           .putFile(source.path)
//           .then((snapshot) => {

//             console.log(`${source.fileName} has been uploaded successfully.`);
//           })
//           .catch((e) => console.log('error => ', e))

//         firebase
//           .storage()
//           .ref('gs://' + source.fileName)
//           .getDownloadURL()
//           .then((url) => {

//               this.setState({ imageFileName : url })
//           })
//           .catch((e) => console.log('getting downloadURL of image error => ', e))
//       }
//     });
//   };



//   render() {
//     return (

//       <ScrollView>

//         {/* Image Picker */}
//         <SafeAreaView style={{
//           padding: SIZES.padding,
//           flex: 1
//         }}>
//           <View style={styles.imagecontainer}>

//             <Image
//               value={this.state.tempFilePath.data}
//               source={{
//                 uri: 'data:image/jpeg;base64,' + this.state.tempFilePath.data,
//               }}
//               style={styles.imageStyle}
//             />
//             <View style={{
//               padding: 10
//             }}>
//               <Button
//                 title="Choose File"
//                 color={COLORS.secondary}
//                 accessibilityLabel="Choose File"
//                 onPress={this.chooseFile} />

//             </View>
//           </View>
//         </SafeAreaView>

//         <View style={styles.container}>
//           <TextInput
//             style={styles.input}
//             value={this.state.name}
//             placeholder='Name'
//             autoCapitalize="none"
//             maxLength={25}
//             placeholderTextColor={COLORS.secondary}
//             onChangeText={val => this.onChangeText('name', val)}
//           />
//           <TextInput
//             style={styles.input}
//             value={this.state.price}
//             keyboardType={'numeric'}
//             placeholder='Price'
//             autoCapitalize="none"
//             maxLength={4}
//             placeholderTextColor={COLORS.secondary}
//             onChangeText={val => this.onChangeText('price', val)}
//           />
//           <TextInput
//             style={styles.input}
//             value={this.state.rating}
//             keyboardType={'numeric'}
//             placeholder='Rating'
//             autoCapitalize="none"
//             placeholderTextColor={COLORS.secondary}
//             onChangeText={val => this.onChangeText('rating', val)}
//           />
//           <TextInput
//             style={styles.input}
//             value={this.state.calories}
//             keyboardType={'numeric'}
//             placeholder='Calories'
//             autoCapitalize="none"
//             placeholderTextColor={COLORS.secondary}
//             onChangeText={val => this.onChangeText('calories', val)}
//           />
//           <TextInput
//             style={styles.input}
//             value={this.state.duration}
//             keyboardType={'numeric'}
//             placeholder='Duration'
//             autoCapitalize="none"
//             placeholderTextColor={COLORS.secondary}
//             onChangeText={val => this.onChangeText('duration', val)}
//           />
//           <TextInput
//             style={styles.input}
//             value={this.state.description}
//             placeholder='Discription'
//             autoCapitalize="none"
//             placeholderTextColor={COLORS.secondary}
//             onChangeText={val => this.onChangeText('description', val)}
//           />

//           {/* <DropDownPicker
//                         style={styles.input}
//                         items={[
//                             { label: categoriesDatafromDB.name, value: categoriesDatafromDB.id },
//                         ]}
//                         onChangeItem={(itemValue, itemIndex) => this.setState ({ value : itemValue })}
//                         {categoriesDatafromDB.map(acct =>)}
//                         defaultIndex={0}
//                         containerStyle={{
//                             height: 75,
//                             style: styles.input
//                         }}
//                         onChangeItem={item => console.log(categoriesDatafromDB)}
//                     /> */}
//           <View
//             style={styles.rowContainer}

//           >
//             <Picker
//               style={{ width: '99%' }}
//               selectedValue={this.state.PickerValue}
//               onValueChange={(itemValue, itemIndex) => this.setState({ PickerValue: itemValue })}
//               placeholderTextColor={COLORS.secondary}
//             >
//               {categoriesDatafromDB.map(acct => <Picker.Item key={acct.id} label={acct.name} value={acct.id} />)}

//             </Picker>
//           </View>
//           <View style={{ margin: 10 }}>
//             <Button
//               padding={SIZES.padding}
//               title="Register"
//               color={COLORS.primary}
//               accessibilityLabel="Register"
//               onPress={this.signUp}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     )
//   }
// }

// const styles = StyleSheet.create({ // Created the custom stylesheet for manual change in design.
//   input: {
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
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   rowContainer: { // Specially created for the Picker to avoid the misalignment of text inside the picker.
//     width: 350,
//     backgroundColor: COLORS.white,
//     margin: 10,
//     padding: 8,
//     color: 'black',
//     borderRadius: 14,
//     fontSize: 18,
//     fontWeight: '500',
//     height: 55,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingLeft: 16,
//   },
//   titleText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingVertical: 20,
//   },
//   textStyle: {
//     padding: 0.5,
//     color: 'black',
//   },
//   buttonStyle: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     backgroundColor: '#DDDDDD',
//     padding: 5,
//   },
//   imageStyle: {
//     width: '70%',
//     height: 150,
//     borderWidth: 1,
//     borderColor: 'black',
//     backgroundColor: '#eee'
//   },
//   imagecontainer: {
//     width: '100%',
//     alignItems: 'center'
//   }
// })
// export default OrderDelivery;





// import React, { Component } from "react"

// import {
//     SafeAreaView,
//     StyleSheet,
//     TouchableOpacity,
//     FlatList,
//     Image,
//     View,
//     Text
// } from "react-native";

// import { icons, images, SIZES, COLORS, FONTS } from '../constants'

// console.log("main thread Home");

// const OrderDelivery = ({ navigation }) => {

//     // Dummy Datas

//     const initialCurrentLocation = {
//         streetName: "Kuching",
//         gps: {
//             latitude: 1.5496614931250685,
//             longitude: 110.36381866919922
//         }
//     }

//     const categoryData = [
//         {
//             id: 1,
//             name: "Rice",
//             icon: icons.rice_bowl,
//         },
//         {
//             id: 2,
//             name: "Noodles",
//             icon: icons.noodle,
//         },
//         {
//             id: 3,
//             name: "Hot Dogs",
//             icon: icons.hotdog,
//         },
//         {
//             id: 4,
//             name: "Salads",
//             icon: icons.salad,
//         },
//         {
//             id: 5,
//             name: "Burgers",
//             icon: icons.hamburger,
//         },
//         {
//             id: 6,
//             name: "Pizza",
//             icon: icons.pizza,
//         },
//         {
//             id: 7,
//             name: "Snacks",
//             icon: icons.fries,
//         },
//         {
//             id: 8,
//             name: "Sushi",
//             icon: icons.sushi,
//         },
//         {
//             id: 9,
//             name: "Desserts",
//             icon: icons.donut,
//         },
//         {
//             id: 10,
//             name: "Drinks",
//             icon: icons.drink,
//         },

//     ]

//     // price rating
//     const affordable = 1
//     const fairPrice = 2
//     const expensive = 3

//     const restaurantData = [
//         {
//             id: 1,
//             name: "ByProgrammers Burger",
//             rating: 4.8,
//             categories: [5, 7],
//             priceRating: affordable,
//             photo: images.burger_restaurant_1,
//             duration: "30 - 45 min",
//             location: {
//                 latitude: 1.5347282806345879,
//                 longitude: 110.35632207358996,
//             },
//             courier: {
//                 avatar: images.avatar_1,
//                 name: "Amy"
//             },
//             menu: [
//                 {
//                     menuId: 1,
//                     name: "Crispy Chicken Burger",
//                     photo: images.crispy_chicken_burger,
//                     description: "Burger with crispy chicken, cheese and lettuce",
//                     calories: 200,
//                     price: 10
//                 },
//                 {
//                     menuId: 2,
//                     name: "Crispy Chicken Burger with Honey Mustard",
//                     photo: images.honey_mustard_chicken_burger,
//                     description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
//                     calories: 250,
//                     price: 15
//                 },
//                 {
//                     menuId: 3,
//                     name: "Crispy Baked French Fries",
//                     photo: images.baked_fries,
//                     description: "Crispy Baked French Fries",
//                     calories: 194,
//                     price: 8
//                 }
//             ]
//         },
//         {
//             id: 2,
//             name: "ByProgrammers Pizza",
//             rating: 4.8,
//             categories: [2, 4, 6],
//             priceRating: expensive,
//             photo: images.pizza_restaurant,
//             duration: "15 - 20 min",
//             location: {
//                 latitude: 1.556306570595712,
//                 longitude: 110.35504616746915,
//             },
//             courier: {
//                 avatar: images.avatar_2,
//                 name: "Jackson"
//             },
//             menu: [
//                 {
//                     menuId: 4,
//                     name: "Hawaiian Pizza",
//                     photo: images.hawaiian_pizza,
//                     description: "Canadian bacon, homemade pizza crust, pizza sauce",
//                     calories: 250,
//                     price: 15
//                 },
//                 {
//                     menuId: 5,
//                     name: "Tomato & Basil Pizza",
//                     photo: images.pizza,
//                     description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
//                     calories: 250,
//                     price: 20
//                 },
//                 {
//                     menuId: 6,
//                     name: "Tomato Pasta",
//                     photo: images.tomato_pasta,
//                     description: "Pasta with fresh tomatoes",
//                     calories: 100,
//                     price: 10
//                 },
//                 {
//                     menuId: 7,
//                     name: "Mediterranean Chopped Salad ",
//                     photo: images.salad,
//                     description: "Finely chopped lettuce, tomatoes, cucumbers",
//                     calories: 100,
//                     price: 10
//                 }
//             ]
//         },
//         {
//             id: 3,
//             name: "ByProgrammers Hotdogs",
//             rating: 4.8,
//             categories: [3],
//             priceRating: expensive,
//             photo: images.hot_dog_restaurant,
//             duration: "20 - 25 min",
//             location: {
//                 latitude: 1.5238753474714375,
//                 longitude: 110.34261833833622,
//             },
//             courier: {
//                 avatar: images.avatar_3,
//                 name: "James"
//             },
//             menu: [
//                 {
//                     menuId: 8,
//                     name: "Chicago Style Hot Dog",
//                     photo: images.chicago_hot_dog,
//                     description: "Fresh tomatoes, all beef hot dogs",
//                     calories: 100,
//                     price: 20
//                 }
//             ]
//         },
//         {
//             id: 4,
//             name: "ByProgrammers Sushi",
//             rating: 4.8,
//             categories: [8],
//             priceRating: expensive,
//             photo: images.japanese_restaurant,
//             duration: "10 - 15 min",
//             location: {
//                 latitude: 1.5578068150528928,
//                 longitude: 110.35482523764315,
//             },
//             courier: {
//                 avatar: images.avatar_4,
//                 name: "Ahmad"
//             },
//             menu: [
//                 {
//                     menuId: 9,
//                     name: "Sushi sets",
//                     photo: images.sushi,
//                     description: "Fresh salmon, sushi rice, fresh juicy avocado",
//                     calories: 100,
//                     price: 50
//                 }
//             ]
//         },
//         {
//             id: 5,
//             name: "ByProgrammers Cuisine",
//             rating: 4.8,
//             categories: [1, 2],
//             priceRating: affordable,
//             photo: images.noodle_shop,
//             duration: "15 - 20 min",
//             location: {
//                 latitude: 1.558050496260768,
//                 longitude: 110.34743759630511,
//             },
//             courier: {
//                 avatar: images.avatar_4,
//                 name: "Muthu"
//             },
//             menu: [
//                 {
//                     menuId: 10,
//                     name: "Kolo Mee",
//                     photo: images.kolo_mee,
//                     description: "Noodles with char siu",
//                     calories: 200,
//                     price: 5
//                 },
//                 {
//                     menuId: 11,
//                     name: "Sarawak Laksa",
//                     photo: images.sarawak_laksa,
//                     description: "Vermicelli noodles, cooked prawns",
//                     calories: 300,
//                     price: 8
//                 },
//                 {
//                     menuId: 12,
//                     name: "Nasi Lemak",
//                     photo: images.nasi_lemak,
//                     description: "A traditional Malay rice dish",
//                     calories: 300,
//                     price: 8
//                 },
//                 {
//                     menuId: 13,
//                     name: "Nasi Briyani with Mutton",
//                     photo: images.nasi_briyani_mutton,
//                     description: "A traditional Indian rice dish with mutton",
//                     calories: 300,
//                     price: 8
//                 },

//             ]
//         },
//         {

//             id: 6,
//             name: "ByProgrammers Dessets",
//             rating: 4.9,
//             categories: [9, 10],
//             priceRating: affordable,
//             photo: images.kek_lapis_shop,
//             duration: "35 - 40 min",
//             location: {
//                 latitude: 1.5573478487252896,
//                 longitude: 110.35568783282145,
//             },
//             courier: {
//                 avatar: images.avatar_1,
//                 name: "Jessie"
//             },
//             menu: [
//                 {
//                     menuId: 12,
//                     name: "Teh C Peng",
//                     photo: images.teh_c_peng,
//                     description: "Three Layer Teh C Peng",
//                     calories: 100,
//                     price: 2
//                 },
//                 {
//                     menuId: 13,
//                     name: "ABC Ice Kacang",
//                     photo: images.ice_kacang,
//                     description: "Shaved Ice with red beans",
//                     calories: 100,
//                     price: 3
//                 },
//                 {
//                     menuId: 14,
//                     name: "Kek Lapis",
//                     photo: images.kek_lapis,
//                     description: "Layer cakes",
//                     calories: 300,
//                     price: 20
//                 }
//             ]

//         }


//     ]

//     const [categories, setCategories] = React.useState(categoryData)
//     const [selectedCategory, setSelectedCategory] = React.useState(null)
//     const [restaurants, setRestaurants] = React.useState(restaurantData)
//     const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)

//     function onSelectCategory(category) {
//         //filter restaurant
//         let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

//         setRestaurants(restaurantList)

//         setSelectedCategory(category)
//     }

//     function getCategoryNameById(id) {
//         let category = categories.filter(a => a.id == id)

//         if (category.length > 0)
//             return category[0].name

//         return "" // This Can create conflict when we add the realtime database 
//     }

//     function renderHeader() { //created the header part
//         return (
//             <View style={{ flexDirection: 'row', height: 50, paddingTop: 10 }}>
//                 <TouchableOpacity
//                     style={{
//                         width: 50,
//                         paddingLeft: SIZES.padding * 2,
//                         justifyContent: 'center'
//                     }}
//                 >
//                     <Image
//                         source={icons.nearby}
//                         resizeMode="contain"
//                         style={{
//                             width: 30,
//                             height: 30
//                         }}
//                     />
//                 </TouchableOpacity>
//                 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                     <View
//                         style={{
//                             width: '70%',
//                             height: '100%',
//                             backgroundColor: COLORS.lightGray3,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             borderRadius: SIZES.radius

//                         }}
//                     >
//                         <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
//                     </View>
//                 </View>
//                 <TouchableOpacity
//                     style={{
//                         width: 50,
//                         paddingRight: SIZES.padding * 2,
//                         justifyContent: 'center'
//                     }}
//                 >
//                     <Image
//                         source={icons.shopping_basket}
//                         resizeMode='contain'
//                         style={{
//                             width: 30,
//                             height: 30
//                         }}
//                     />
//                 </TouchableOpacity>
//             </View >
//         )
//     }

//     function renderMainCategories() {

//         const renderItem = ({ item }) => {
//             return (
//                 <TouchableOpacity
//                     style={{
//                         padding: SIZES.padding,
//                         paddingBottom: SIZES.padding * 2,
//                         backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
//                         borderRadius: SIZES.radius,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         marginRight: SIZES.padding,
//                         ...styles.shodow
//                     }}
//                     onPress={() => onSelectCategory(item)}
//                 >
//                     <View
//                         style={{
//                             width: 50,
//                             height: 50,
//                             borderRadius: 25,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
//                         }}
//                     >
//                         <Image
//                             source={item.icon}
//                             resizeMode='contain'
//                             style={{ width: 30, height: 30 }}
//                         />
//                     </View>
//                     <Text

//                         style={{
//                             marginTop: SIZES.padding,
//                             color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
//                             ...FONTS.body5
//                         }}
//                     >
//                         {item.name}
//                     </Text>
//                 </TouchableOpacity>
//             )
//         }


//         return (
//             <View style={{ padding: SIZES.padding * 2 }}>
//                 <Text style={{ ...FONTS.h1 }}>Main</Text>
//                 <Text style={{ ...FONTS.h1 }}>Catagories</Text>

//                 <FlatList
//                     data={categories}
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     keyExtractor={item => `${item.id}`}
//                     renderItem={renderItem}
//                     contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
//                 />
//             </View>
//         )
//     }

//     function renderRestaurantList() {
//         const renderItem = ({ item }) => (
//             <TouchableOpacity
//                 style={{ marginBottom: SIZES.padding * 2 }}
//                 // onPress -> Navigate to restaurant screen when pressed on recipe

//                 onPress={() => navigation.navigate("Restaurant", {
//                     item,
//                     currentLocation
//                 })}

//             >
//                 {/*image*/}

//                 <View
//                     style={{
//                         marginBottom: SIZES.padding
//                     }}
//                 >
//                     <Image
//                         source={item.photo}
//                         resizeMode="cover"
//                         style={{
//                             width: "100%",
//                             height: 200,
//                             borderRadius: SIZES.radius
//                         }}
//                     />
//                     <View
//                         style={{
//                             position: 'absolute',
//                             bottom: 0,
//                             height: 50,
//                             width: SIZES.width * 0.3,
//                             backgroundColor: COLORS.white,
//                             borderTopRightRadius: SIZES.radius,
//                             borderBottomLeftRadius: SIZES.radius,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             ...styles.shodow

//                         }}
//                     >
//                         <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
//                     </View>
//                 </View>

//                 {/* Restaurant Info */}
//                 <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

//                 <View
//                     style={{
//                         marginTop: SIZES.padding,
//                         flexDirection: 'row'
//                     }}
//                 >
//                     {/* Ratings */}
//                     <Image
//                         source={icons.star}
//                         style={{
//                             height: 20,
//                             width: 20,
//                             tintColor: COLORS.primary,
//                             marginRight: 10
//                         }}
//                     />
//                     <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

//                     {/* Categories */}
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             marginLeft: 10
//                         }}
//                     >
//                         {
//                             item.categories.map((categoryId) => {
//                                 return (
//                                     <View
//                                         style={{
//                                             flexDirection: 'row'
//                                         }}
//                                         key={categoryId}
//                                     >
//                                         <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
//                                         <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}> . </Text>
//                                     </View>
//                                 )
//                             })
//                         }
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         )

//         return (
//             <FlatList
//                 data={restaurants}
//                 keyExtractor={item => `${item.id}`}
//                 renderItem={renderItem}
//                 contentContainerStyle={{
//                     paddingHorizontal: SIZES.padding * 2,
//                     paddingBottom: 30
//                 }}
//             />
//         )
//     }

//     return (
//         <SafeAreaView
//             style={
//                 styles.container
//             }
//         >
//             {renderHeader()}
//             {renderMainCategories()}
//             {renderRestaurantList()}
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.lightGray4
//     },
//     shodow: {
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//         elevation: 1,
//     }
// })
// export default OrderDelivery;



import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { BasicButton } from '@phomea/react-native-buttons';
import { COLORS } from '../constants';
import { render } from 'react-dom';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { NavigationActions } from 'react-navigation';
import { tempUID } from './Login';

export default class OrderDelivery extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false

    }
  }

  userLogout = async (navigation) => {

    console.log("Logged out successfully")
    try {
      await firebase.auth().signOut()
      tempUID.splice
      this.props.navigation.navigate('AuthStack', { screen: 'Login' })
    } catch (e) {
      console.log("Error Logging Out" + e);

    }
    console.log("Logged out successfully")
    Alert.alert('Logut Successfull!')
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View>
        <Text>{tempUID.displayName}</Text>
        <BasicButton
          buttonStyle={{
            backgroundColor: COLORS.primary,
            width: 90,
            marginTop: 30
          }}
          color='grey'
          title="Logout"
          animation='bounce'
          onPress={() => this.userLogout()}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#f8f7fc'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
});



// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ImageBackground, Image } from 'react-native';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';
// import { NavigationContainer, CommonActions, StackActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationActions } from 'react-navigation';
// import { BasicButton } from '@phomea/react-native-buttons';
// import { COLORS } from '../constants';
// import PasswordInputText from 'react-native-hide-show-password-input';
// import { TextField, FilledTextField, OutlinedTextField } from 'rn-material-ui-textfield'



// export default class Login extends Component {

//   constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',
//       isLoading: false

//     }
//   }

//   updateInputVal = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   }

//   changeIcon = () => {
//     this.state.icon !== "eye-off"
//       ? (this.setState({ icon: 'eye-off' }), this.setState({ hidePassword: false }))
//       : (this.setState({ icon: 'eye' }), this.setState({ hidePassword: true }))
//   }


//   userLogin = (navigation) => {
//     if (this.state.email === '' && this.state.password === '') {
//       Alert.alert('Enter details to signin!')
//     } else {
//       this.setState({
//         isLoading: true,
//       })
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(this.state.email, this.state.password)
//         .then((res) => {
//           console.log(res)
//           console.log('User logged-in successfully!')
//           this.setState({
//             isLoading: false,
//             email: '',
//             password: ''
//           })
//           //this.props.navigation.navigate('Home')

//           // const resetAction = StackActions.push({
//           //     index: 0,
//           //     //key: null,
//           //     //actions: [NavigationActions.navigate({ routeName : 'Home' })]
//           //     routes:[{ name: 'Home'}]
//           // })
//           // this.props.navigation.dispatch(resetAction)


//           this.props.navigation.reset({
//             index: 0,
//             routes: [{ name: 'Home' }]
//           })
//         })
//         .catch(error => console.log(error.message))
//     }
//   }

//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={styles.preloader}>
//           <ActivityIndicator size="large" color="#9E9E9E" />
//         </View>
//       )
//     }
//     return (

//       <View style={styles.container}>
//         <ImageBackground source={require('../assets/images/Background.jpg')} style={{
//           flex: 1,
//           width: 375,
//           height: 812,
//           left: -17,
//           top: -40,
//           justifyContent: 'center'
//         }}>
//         </ImageBackground>
//         <View style={{
//           paddingTop: 200
//         }}>
//           <Image source={require('../assets/icons/email.png')} style={styles.ImageStyle} />
//         </View>
//         <View style={{
//           width: 323,
//           right: -10,
//           top: -80
//         }}>
//           <TextField
//             style={{
//               borderColor: '#fb7b1a',
//               borderBottomWidth: 1.3,
//               marginBottom: -6
//             }}
//             tintColor='#fb7b1a'
//             label="Email"
//             value={this.state.email}
//             onChangeText={(val) => this.updateInputVal(val, 'email')}
//           />
//           <PasswordInputText
//             style={{
//               borderColor: '#fb7b1a',
//               marginBottom: 5
//             }}
//             tintColor='#fb7b1a'
//             value={this.state.password}
//             maxLength={15}
//             iconColor="#fb7b1a"
//             iconSize={20}
//             onChangeText={(val) => this.updateInputVal(val, 'password')}
//           />

//           <BasicButton
//             buttonStyle={{
//               backgroundColor: COLORS.primary,
//               width: 90,
//               marginTop: 30
//             }}
//             color='grey'
//             title="Signin"
//             animation='bounce'
//             onPress={() => this.userLogin()}
//           />

//           <Text
//             style={styles.loginText}
//             onPress={() => this.props.navigation.navigate('Signup')}>
//             Don't have account? Click here to signup
//         </Text>
//         </View>
//       </View>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     padding: 35,
//     backgroundColor: '#f8f7fc'
//   },
//   ImageStyle: {
//     top: '-70%',
//     left: '3.5%',
//     marginTop: 5,
//     height: 25,
//     width: 625,
//     resizeMode: 'contain',
//   },
//   loginText: {
//     color: '#fb7b1a',
//     marginTop: 25,
//     textAlign: 'center'
//   },
//   inputStyleF: {
//     width: '100%',
//     marginBottom: 15,
//     paddingBottom: 15,
//     alignSelf: "center",
//     borderColor: "#ccc",
//     borderBottomWidth: 1
//   },
//   inputStyleS: {
//     width: '100%',
//     marginBottom: 15,
//     paddingBottom: 15,
//     alignSelf: "center",
//     borderColor: "#ccc",
//     borderBottomWidth: 1
//   },
//   preloader: {
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff'
//   },
//   image: {
//     flex: 1,
//     resizeMode: 'cover', // or 'stretch'
//   },
// });