// useState is a react native hook.
// useEffect is also react native hook.
import React, { useState, useEffect, Fragment } from "react";

import * as ImagePicker from 'react-native-image-picker';

import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    View,
    Text,
    Button
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'


const FoodImagePicker = ({ image, onImagePicked }) => {

    const [selectedImage, setSelectedImage] = useState();

    useEffect(() => {
        console.log("useEffect: "+ image);
        setSelectedImage({uri: image})
    }, [image])

    pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
            (response) => {
                if (response.error) {
                    console.log("Image Error");
                } else {
                    console.log("image: " + response.uri);
                    setSelectedImage({ uri: response.uri })
                    onImagePicked({ uri: response.uri });
                }
            }
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={ selectedImage }
                />
            </View>
            <View style={styles.button}>
                <Button title="Pick Image" onPress={pickImageHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    }
})
export default FoodImagePicker;