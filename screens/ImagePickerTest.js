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


// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';

// export default function ImagePickerExample() {
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== 'web') {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//           alert('Sorry, we need camera roll permissions to make this work!');
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//     </View>
//   );
// }


// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/

// Import React
import React, { useState } from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';

// Import Image Picker
import * as ImagePicker from 'react-native-image-picker';

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const App = () => {
  const [filePath, setFilePath] = useState({});

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        setFilePath(source);
      }
    });
  };

  return (
    <SafeAreaView style={{
      padding: SIZES.padding,
      flex: 1
    }}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        />
        <View style={{
          padding : 10
        }}>
          <Button
            title="Choose File"
            onPress={chooseFile} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 2
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    width: '80%',
    height: 150,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee'
  },
});