import React, { useState, useEffect } from 'react'
import Home from './Home'
import Restaurant from './Restaurant'
import OrderDelivery from './OrderDelivery'
import Test from './Test'
import Recipe from './Recipe'
import Login from './Login'
import Signup from './Signup';
import Cart from "./Cart";
import Admin_Create from './Admin_Create';
import ImagePickerTest from './ImagePickerTest';
import firebase from "@react-native-firebase/app";
import { firebaseConfig } from "../firebaseDb"
import { tempUID } from './Login';
import firestore from '@react-native-firebase/firestore';


export const setCategory = [];
export const categoriesDatafromDB = [];


const refCategory = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("category");
const refUsers = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("users");

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
console.log("Firebase Initialized");

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
    Admin_Create,
    Home,
    Restaurant,
    OrderDelivery,
    Test,
    Recipe,
    ImagePickerTest,
    Login,
    Signup,
    Cart,
    firebase
}