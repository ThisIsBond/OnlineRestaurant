import React, { Component } from "react"
import {
    View,
    Text
} from "react-native";

import firestore from "@react-native-firebase/firestore"


class FirebaseApp extends Component {

    state = {
        user: {
            name: ""
        }
    }

    constructor(props) {
        super(props);
        this.getUser();
        this.subscriber = firestore().collection("users").doc('NgVRAPVLDsz6AaGl7ldo').onSnapshot(doc => {
            this.setState({
                user: {
                    name: doc.data().name
                }
            })

        })
        firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                console.log('Total users:',querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID:', documentSnapshot.id,documentSnapshot.data());
                })
            })
    }
    getUser = async () => {
        const userDocument = await firestore().collection("users").doc('NgVRAPVLDsz6AaGl7ldo').get()
        console.log(userDocument)


    }
    render() {
        return (
            <View>
                <Text>Name : {this.state.user.name}</Text>
            </View>
        );
    }
}
export default FirebaseApp;