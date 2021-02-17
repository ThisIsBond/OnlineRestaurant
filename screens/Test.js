import React, { Component } from "react"
import {
    View,
    Text,
    Alert
} from "react-native";
import { FONTS } from "../constants";


import firestore, { firebase } from "@react-native-firebase/firestore"


class FetchData extends Component {


    // state = {

    //     user: {

    //         name: "",
    //         price: "",
    //         rating: "",
    //         calories: "",
    //         duration: "",
    //         description: "",
    //         users: []
    //     }
    // }

    state = {
        users: []
    }

  

    // _add = () => {
    //     let dataStorage = [{docs: this.state.docs}, ...this.state.user.dataStorage]
    //     console.log(dataStorage)
    //     this.setState({dataStorage})
    //   }

    constructor(props) {
        super(props);
        // this.getUser();        

        // this.users = auth(app = ReactNativeFirebase.FirebaseApp).currentUser.uid

        // firebase.firestore().collection("RestaurantData/RestaurantData/menu").get().then(function (querySnapshot) {
        //     querySnapshot.forEach(function (doc) {

        //         document_ids.push(doc.id)


        //     });
        // })


        // console.log(document_ids)
        // this.subscriber = firestore().collection("RestaurantData/RestaurantData/menu").doc('GGMnJN3OWZCQGk6sttxw').onSnapshot(doc => {
        //     this.setState({
        //         user: {
        //             name: doc.data().name,
        //             price: doc.data().price,
        //             rating: doc.data().rating,
        //             calories: doc.data().calories,
        //             duration: doc.data().duration,
        //             description: doc.data().description
        //         }
        //     })

        // })

        this.subscriber = firestore().collection("RestaurantData/RestaurantData/menu").onSnapshot(docs => {
            docs.forEach(doc => {
                let users = []
                docs.forEach(doc => {
                    users.push(doc.data())
                })
                this.setState({ users })
               
            })

        })
    }
    render() {

        return (
            <View>
                <View>
                    {this.state.users.map((dosc,index) => <View key={index}>
                        <Text>{dosc.name}</Text>
                        <Text>{dosc.calories}</Text>
                        <Text>₹ {dosc.price}</Text>
                        <Text>{dosc.categories}</Text>
                    </View>)}
                </View>
           </View>
        );

    }
}
export default FetchData;


// import React from "react"
// import {
//     View,
//     Text
// } from "react-native";

// const Like = () => {
//     return(
//         <View>
//             <Text>Like</Text>
//         </View>
//     )
// }

// export default Like;