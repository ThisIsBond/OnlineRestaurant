import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ImageBackground, Image } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { NavigationContainer, CommonActions, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationActions } from 'react-navigation';
import { BasicButton } from '@phomea/react-native-buttons';
import { COLORS } from '../constants';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField, FilledTextField, OutlinedTextField } from 'rn-material-ui-textfield'


export var tempUID = [];
export var cartDatafromDB = [];
export var dynamicCartRef = [];
export var setOrderRef = [];
export var cartLengthfromLogin = [];
export var refUserAddressBook = [];
export var refUserLikedItems = [];
export var refUserOrderItems = [];

var docData

const refUserOrders = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("users");

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false
    }
  }


  updateInputVal = (val, prop) => {

    const state = this.state;
    state[prop] = val;
    this.setState(state);


  }

  userLogin = async (navigation) => {

    if (this.state.email == '' && this.state.password == '') {
      Alert.alert('Empty credentials', 'Email or password cannot be Empty')
    } else {
      this.setState({
        isLoading: false,
      })
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          this.setState({
            isLoading: false,
            password: "",
            email: ""
          })
          tempUID = auth().currentUser

          console.log("Display Name => " + tempUID.displayName);
          console.log("Display UID => " + tempUID.uid);

          // this.props.navigation.navigate('Stack', { screen: 'Home' });
          this.props.navigation.navigate('Stack', { screen: 'Home' })
        }).then(() => {

          cartDatafromDB.splice
          const uidFilter = tempUID.uid ? refUserOrders.where("uid", "==", tempUID.uid) : refUserOrders
          uidFilter.get().then(snapshot => {
            snapshot.docs.forEach(doc => {

              docData = { ...doc.data().id, id: doc.id }
              setOrderRef = docData

              console.log(" Inside " + setOrderRef.id);
            })
          }).then(() => {
            firebase.firestore()
              .collection("RestaurantData").doc('RestaurantData')
              .collection("users").doc(setOrderRef.id)
              .collection("Orders").doc("orders")
              .collection('cart').onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                  items.push(doc.data());
                  // cartDatafromDB.push(doc.data())
                });
                cartDatafromDB = items
                if (cartDatafromDB.length === items.length) {
                  console.log("perfect");
                } else {
                  cartDatafromDB.splice
                }
                console.log(items.length);
              });
          }).then(() => {
            var uidFilter = tempUID.uid ? refUserOrders.where("uid", "==", tempUID.uid) : refUserOrders
            uidFilter.get().then(snapshot => {
              snapshot.docs.forEach(doc => {
                docData = { ...doc.data().id, id: doc.id }
              })
            }).then(() => {

              dynamicCartRef = firebase.firestore()
                .collection("RestaurantData").doc('RestaurantData')
                .collection("users").doc(docData.id)
                .collection("Orders").doc("orders")
                .collection('cart')
            }).then(() => {

              refUserAddressBook = firebase.firestore()
                .collection("RestaurantData").doc('RestaurantData')
                .collection("users").doc(docData.id)
                .collection("AddressBook")

            }).then(() => {
              refUserLikedItems = firebase.firestore()
                .collection("RestaurantData").doc('RestaurantData')
                .collection("users").doc(docData.id)
                .collection("LikedItems")
            }).then(() => {
              refUserOrderItems = firebase.firestore()
                .collection("RestaurantData").doc('RestaurantData')
                .collection("users").doc(docData.id)
                .collection("OrderTracking")
            })
          })


        }).catch(error => Alert.alert("Error", error.message))
    }

  }

  render() {
    if (this.state.isLoading == true) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (

      <View style={styles.container}>
        <ImageBackground source={require('../assets/images/AI_Sharpen.jpg')} style={{
          flex: 1,
          // width: 375,
          width: '107.5%',
          height: '250%',
          left: '-4.5%',
          top: '-5%',
          justifyContent: 'center'
        }}>
        </ImageBackground>
        <View
          style={{
            top: '-5%'
          }}
        >
          <Image
            style={styles.ImageStyleF}
            source={require('../assets/images/logo.png')}
          />
        </View>
        <View style={{
          //width: 323,
          right: -10,
          top: '-20%'
        }}>
          <View
            style={{
              top: '11.7%'
            }}
          >
            <Image source={require('../assets/icons/email.png')} style={styles.ImageStyle} />
          </View>
          <View
            style={{
              top: '25%'
            }}
          >
            <Image source={require('../assets/icons/password.png')} style={styles.ImageStyle} />
          </View>
          <TextField
            style={{
              borderColor: '#fb7b1a',
              borderBottomWidth: 1.3,
              marginBottom: -6
            }}
            maxLength={20}
            tintColor='#fb7b1a'
            label="Email"
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
          />

          <TextField
            style={{
              borderColor: '#fb7b1a',
              borderBottomWidth: 1.3,
              marginBottom: -6
            }}
            label="Password"
            tintColor='#fb7b1a'
            value={this.state.password}
            maxLength={15}
            iconColor="#fb7b1a"
            iconSize={20}
            secureTextEntry={true}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
          />
          <BasicButton
            buttonStyle={{
              backgroundColor: COLORS.primary,
              width: 90,
              marginTop: 30
            }}
            color='grey'
            title="SignIn"
            animation='bounce'
            onPress={() => this.userLogin()}
          />

          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('AuthStack', { screen: 'Signup' })}>
            Don't have account? Click here to signup
        </Text>
          <Text style={{
            alignSelf: 'center',
            top: '2%'
          }}
            onPress={() => this.props.navigation.navigate('AdminStack', { screen: 'Admin_Create' })}>
            Admin
        </Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    paddingLeft: 12,
    backgroundColor: '#f8f7fc'
  },
  ImageStyle: {
    top: '190%',
    left: '8.4%',
    marginTop: 5,
    height: 25,
    width: '178%',
    resizeMode: 'contain',
  },
  ImageStyleF: {
    top: '-190%',
    left: '-30.4%',
    marginTop: 5,
    height: 120,
    width: '165%',
    resizeMode: 'contain',
  },
  loginText: {
    color: '#fb7b1a',
    marginTop: 25,
    textAlign: 'center'
  },
  inputStyleF: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  inputStyleS: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
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
  image: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
});