// import React, { Component } from "react"
// import {
//     View,
//     Text,
//     Alert
// } from "react-native";
// import { FONTS } from "../constants";



// class FetchData extends Component {


//     state = {
//         users: []
//     }


//     constructor(props) {
//         super(props);


//         this.subscriber = firestore().collection("RestaurantData/RestaurantData/menu").onSnapshot(docs => {
//             docs.forEach(doc => {
//                 let users = []
//                 docs.forEach(doc => {
//                     users.push(doc.data())
//                 })
//                 this.setState({ users })

//             })

//         })
//     }
//     render() {

//         return (
//             <View>
//                 <View>
//                     {this.state.users.map((dosc,index) => <View key={index}>
//                         <Text>{dosc.name}</Text>
//                         <Text>{dosc.calories}</Text>
//                         <Text>₹ {dosc.price}</Text>
//                         <Text>{dosc.categories}</Text>
//                     </View>)}
//                 </View>
//            </View>
//         );

//     }
// }
// export default FetchData;


// import React,{useEffect} from "react"
// import {
//     View,
//     Text,
//     Permission,
//     PermissionsAndroid
// } from "react-native";
// import firestore, { firebase } from "@react-native-firebase/firestore";
// import MapboxGL from "@react-native-mapbox-gl/maps";

// MapboxGL.setAccessToken("pk.eyJ1IjoidGhpc2lzYm9uZCIsImEiOiJja2x6ZG9qdHcwd3FmMm5zMms4bnNnbjA5In0.jrfRUCOAyf6ZY6CzZB_Qdg");

// const Like = () => {

//     // const componentDidMount = async () => {
//     //     const permission = await PermissionsAndroid.requestMultiple([
//     //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//     //         console.log("Componented Mounted")
//     //     ]);

//     // }
//     // useEffect(() => {
//     //     componentDidMount();

//     // }, [])
//     const renderAnnotations = () => {
//         return (
//             <MapboxGL.PointAnnotation
//                 key="pointAnnotation"
//                 id="pointAnnotation"
//                 coordinate={[3.3362400, 6.5790100]}>
//                 <View style={{
//                     height: 30,
//                     width: 30,
//                     backgroundColor: '#00cccc',
//                     borderRadius: 50,
//                     borderColor: '#fff',
//                     borderWidth: 3
//                 }} />
//             </MapboxGL.PointAnnotation>
//         );
//     }

//     return (
//         <View style={{ flex: 1, height: "100%", width: "100%" }}>
//             <MapboxGL.MapView
//                 styleURL={MapboxGL.StyleURL.Street}
//                 zoomLevel={16}
//                 centerCoordinate={[3.3362400, 6.5790100]}
//                 style={{ flex: 1 }}>
//                 <MapboxGL.Camera
//                     zoomLevel={16}
//                     centerCoordinate={[3.3362400, 6.5790100]}
//                     animationMode={'flyTo'}
//                     animationDuration={0}
//                 >
//                 </MapboxGL.Camera>
//                 {renderAnnotations()}
//             </MapboxGL.MapView>
//         </View>
//     )
// }
// export default Like;


import React from "react"
import {
    View,
    Text
} from "react-native";
import firestore from '@react-native-firebase/firestore';

const Restaurant = () => {
    return(
        <View>
            <Text>Restaurant</Text>
        </View>
    )
}

export default Restaurant;