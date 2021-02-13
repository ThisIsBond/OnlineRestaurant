import React, { useState, useEffect, Fragment } from "react";

import { useDocumentOnce } from 'react-firebase-hooks/firestore';

import firebase from "@react-native-firebase/app";


import {
    Loading,
    View,
    Text,
    Alert
} from "react-native";

function FirebaseDataRetrive(){

    const [Restaurents, setRestaurents] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("menu");

    function getRestaurents(){
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setRestaurents(items);
            setLoading(false)
        });
    }

    useEffect(() => {
        getRestaurents();
    },[])

    return(
        <Fragment>
        {loading ? <Text>Loading...</Text> : null}
        {Restaurents.map((Restaurent) => (
            <View className="Restaurant" key={Restaurent.id}>
               <Text> {Restaurent.name} </Text>
            </View>
        ))}
        </Fragment>
    );
}
export default FirebaseDataRetrive;