// import React from "react"
// import {
//     View,
//     Text
// } from "react-native";

// const ImagePickerTest = () => {
//     return(
//         <View>
//             <Text>ImagePickerTest</Text>
//         </View>
//     )
// }

// import React, { useState, useEffect, Fragment } from "react";
// import {
//     StyleSheet,
//     View,
//     Button,
//     Image,
//     PermissionsAndroid,
//     Alert,
//     ActivityIndicator,
//     Platform,
//     SafeAreaView,
//     Text,
// } from "react-native";

// import ImagePicker from 'expo-image-picker';

// import * as Permissions from 'expo-permissions';

// //import { showImagePicker } from '../ui/FoodImagePicker'
// export default function ImagePickerTest() {

//     const [image, setImage] = useState(null);

//     useEffect(() => {
//         async function fetchdata() {
//             if (Platform.OS !== 'web') {
//                 const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//                 if (status !== 'granted') {
//                     alert("Permission denied!")
//                 }
//             }
//             console.log("Fetchdata");
//             try {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//                     {
//                         title: "Storage Permission",
//                         message: "App needs access to memory to download the file "

//                     }
//                 );
//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {

//                     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//                     Alert.alert("Permission granted", "Now you can download anything!");
//                 } else {
//                     Alert.alert(
//                         "Permission Denied!",
//                         "You need to give storage permission to download the file"
//                     );
//                 }
//             } catch (err) {
//                 console.warn(err);
//             }
//         }
//         fetchdata();
//     }, [])

//     const PickImage = async () => {

//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1
//         })
//         if (!result.cancelled) {
//             setImage(result.uri)
//         }
//     }

//     return (
//         <View style={styles.container}>
//             <Button title="Choose image" onPress={PickImage} />
//             {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#e6e6fa',
//     },
//     imgContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'absolute',
//         width: '100%',
//         height: '100%'
//     },
//     eightyWidthStyle: {
//         width: '80%',
//         margin: 2,
//     },
//     uploadImage: {
//         width: '80%',
//         height: 300,
//     },
// });


import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}