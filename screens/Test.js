import React, { Component } from "react"
import {
    View,
    Text
} from "react-native";
import { FONTS } from "../constants";


import firestore from "@react-native-firebase/firestore"

class FetchData extends Component {

    state = {

        user: {
            id: "",
            name: "",
            price: "",
            rating: "",
            calories: "",
            duration: "",
            description: "",
        }
    }

    constructor(props) {
        super(props);
        // this.getUser();
        this.subscriber = firestore().collection("RestaurantData").doc('menu').onSnapshot(doc => {
            this.setState({
                user: {
                    id: doc.data().id,
                    name: doc.data().name,
                    price: doc.data().price,
                    rating: doc.data().rating,
                    calories: doc.data().calories,
                    duration: doc.data().duration,
                    description: doc.data().description
                }
            })

        })
    }
    render() {

        return (
            <View>
                <Text>id : {this.state.user.id}</Text>
                <Text>Name : {this.state.user.name}</Text>
                <Text>Price : {this.state.user.price} ₹</Text>
                <Text>Ratings : {this.state.user.rating}</Text>
                <Text>Calories : {this.state.user.calories}</Text>
                <Text>Duration : {this.state.user.duration}</Text>
                <Text>Discription : {this.state.user.description}</Text>

            </View>
        );

    }
}
export default FetchData;