import React, { useState, useEffect } from 'react'
import Home from './Home'
import Restaurant from './Restaurant'
import Test from './Test'
import Recipe from './Recipe'
import Login from './Login'
import Signup from './Signup';
import Cart from "./Cart";
import Like from './Like';
import Address_edit from './Address_edit';
import Address_manager from './Address_manager';
import Address_form from './Address_form';
import ImagePickerTest from './ImagePickerTest';
import Admin_Create from './Admin_Create';
import Admin_Orders from './Admin_Orders';
import Admin_Category from './Admin_Category';
import Admin_Update from './Admin_Update';
import Place_Order from './Place_Order';
import Order from './Order';
import NetworkUtils from './NetworkUtills';
import firebase from "@react-native-firebase/app";
import { firebaseConfig } from "../firebaseDb"
import { tempUID } from './Login';
import firestore from '@react-native-firebase/firestore';
import NetInfo from "@react-native-community/netinfo";
import { Alert,BackHandler } from 'react-native'
import Profile from './Profile'
import Profile_myOrders from './Profile_myOrders'
import Profile_SaveCards from './Profile_SaveCards'
import Profile_Main from './Profile_Main'

export const setCategory = [];
export const categoriesDatafromDB = [];


const refCategory = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("category");
const refUsers = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("users");


var hours = new Date().getHours();
console.log(hours);

/* RESTAURANT CLOSE LOGIC */

// if (hours <= 21 && hours >= 9) {
//     NetInfo.fetch().then(state => {
//         if (state.isConnected == true) {
//             if (!firebase.apps.length) {
//                 firebase.initializeApp(firebaseConfig);

//             }
//             console.log("Firebase Initialized");
//         } else {
//             Alert.alert(
//                 "No Internet!",
//                 "Check your internet connection",
//                 [
//                     { text: "OK", onPress: () => BackHandler.exitApp() }
//                 ]
//             );
//         }
//     });
// } else {
//     Alert.alert(
//         "Warning!",
//         "Restaurant Closed!",
//         [
//             { text: "OK", onPress: () => BackHandler.exitApp() }
//         ]
//     );
// }

/* ---------------------------------------------------------------------------------------------------- */

// console.log(categoriesDatafromDB);
// const getCategory = () => {
//     refCategory.onSnapshot((querySnapshot) => {
//         const items = [];
//         querySnapshot.forEach((doc) => {
//             items.push(doc.data());
//             categoriesDatafromDB.push(doc.data())
//         });
//         setCategory(items);
//         setLoading(false)
//     });
// }
// return(
//     {getCategory}
// )
//console.log(categoriesDatafromDB);

refCategory.onSnapshot((querySnapshot) => {

    const items = [];
    querySnapshot.forEach((doc) => {
        items.push(doc.data());
        if (categoriesDatafromDB.length < 7) {
            categoriesDatafromDB.push(doc.data())
        }
        else {
            return "No Categories"
        }
    });
    setCategory.push(items);
});

console.log("UID " + tempUID.uid);

// var uidFilter = tempUID.uid ? refUsers.where("uid", "==", tempUID.uid) : refUsers
// uidFilter.get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         var docData = { ...doc.data().id, id: doc.id }
//         setOrderRef = docData
//         console.log("Database ID => " + setOrderRef.id);
//     })
// })

export {
    NetworkUtils,
    Order,
    Place_Order,
    Admin_Category,
    Admin_Orders,
    Admin_Update,
    Admin_Create,
    Address_edit,
    Address_form,
    Address_manager,
    Home,
    Restaurant,
    Test,
    Recipe,
    ImagePickerTest,
    Login,
    Signup,
    Cart,
    Like,
    firebase,
    Profile,
    Profile_Main,
    Profile_SaveCards,
    Profile_myOrders
}