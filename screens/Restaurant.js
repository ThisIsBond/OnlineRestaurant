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

// class Restaurant extends React.Component {

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
// export default Restaurant;

import React from "react"
import {
    View,
    Text
} from "react-native";

const Restaurant = () => {
    return(
        <View>
            <Text>Restaurant</Text>
        </View>
    )
}

export default Restaurant;