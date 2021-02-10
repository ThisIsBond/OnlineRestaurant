import React from 'react'
import {
    View,
    Button,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native'

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import firebase from "@react-native-firebase/app";

import firestore from "@react-native-firebase/firestore"

class SignUp extends React.Component {

    constructor() {
        super();

        this.menudbRef = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("menu");

        //this.menudbRef = firestore().collection("RestaurantData").doc('menu')
        
        // var documentId = firebase.firestore().collection("RestaurantData").doc("menu").documentId;
        
        this.state = {
            name: '',
            price: '',
            rating: '',
            calories: '',
            duration: '',
            description: '',
        };
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
        
    }

   
        signUp = async () => {
            
            const { name, price ,rating ,calories, duration, description } = this.state
            try {
                // here place your signup logic
                this.menudbRef.add({
                    name: this.state.name,
                    price: this.state.price,
                    rating: this.state.rating,
                    calories: this.state.calories,
                    duration: this.state.duration,
                    description: this.state.description,
                }).then((res) => {
                    this.setState({
                        name: "",
                        price: "",
                        rating: "",
                        calories: "",
                        duration: "",
                        description: "",
                        isLoading: false
                    });
                    Alert.alert('Signup');
                })
                    .catch((err) => {
                        Alert.alert('Error');
                        console.error("Error found: ", err);
                        this.setState({
                            isLoading: false,
                        });
                    });
            } catch (err) {
                console.log('error signing up: ', err)
            }
        
        }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    //value={this.state.name}
                    placeholder='Name'
                    autoCapitalize="none"
                    maxLength={25}
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('name', val)}
                />
                <TextInput
                    style={styles.input}
                    //value={this.state.price}
                    keyboardType={'numeric'}
                    placeholder='Price'
                    autoCapitalize="none"
                    maxLength={4}
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('price', val)}
                />
                <TextInput
                    style={styles.input}
                    //value={this.state.rating}
                    keyboardType={'numeric'}
                    placeholder='Rating'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('rating', val)}
                />
                <TextInput
                    style={styles.input}
                    //value={this.state.calories}
                    keyboardType={'numeric'}
                    placeholder='Calories'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('calories', val)}
                />
                <TextInput
                    style={styles.input}
                    //value={this.state.duration}
                    keyboardType={'numeric'}
                    placeholder='Duration'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('duration', val)}
                />
                <TextInput
                    style={styles.input}
                    // value={this.state.description}
                    placeholder='Discription'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('description', val)}
                />
                <View style={{ margin: 10 }}>
                    <Button
                        title="Register"
                        color={COLORS.primary}
                        accessibilityLabel="Tap to Decrypt Data"
                        onPress={this.signUp}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: COLORS.white,
        margin: 10,
        padding: 8,
        color: 'black',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default SignUp;