// import React, { useEffect, useState } from "react"
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Image,
//     FlatList,
//     PermissionsAndroid,
//     ToastAndroid,
//     SafeAreaView,
// } from "react-native";
// import { COLORS, FONTS, SIZES, icons } from '../constants';
// import firebase from '@react-native-firebase/app';
// import { ScrollView } from "react-native-gesture-handler";
// import { tempUID } from "./Login";

// var AdminDatafromDB = [];
// var userOrder = [];
// var userAddress = [];

// const Admin_Orders = () => {

//     const [adminData, setAdminData] = useState()
//     const [userData, setUserData] = useState(userOrder)

//     AdminDatafromDB.forEach(result => {
//         userOrder.push(result.user_Order)
//     })

//     AdminDatafromDB.forEach(result => {
//         userAddress.push(result.user_Address)
//     })

//     console.log(userAddress);

//     function fetchOrders() {

//         const getOrders = () => {

//             firebase.firestore()
//                 .collection("RestaurantData").doc('RestaurantData')
//                 .collection("Admin").onSnapshot((querySnapshot) => {
//                     const items = [];
//                     querySnapshot.forEach((doc) => {
//                         items.push(doc.data());
//                     });
//                     AdminDatafromDB = items
//                     setAdminData(items);
//                 });

//         }

//         useEffect(() => {
//             getOrders()
//             return (() => {
//                 setAdminData({});
//             })
//         }, [])

//         const renderOrder = ({ item }) => (
//             <View>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}
//                 >email : {item.email}</Text>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}
//                 >Username : {item.user_Name}</Text>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}>Latitude : {item.user_Latitude}</Text>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}>Longitude : {item.user_Longitude}</Text>
//             </View>
//         )
//         return (
//             <FlatList
//                 data={adminData}
//                 keyExtractor={(item, index) => item.id + index}
//                 renderItem={renderOrder}
//                 contentContainerStyle={{
//                     padding: SIZES.padding,
//                     paddingHorizontal: SIZES.padding * 2,
//                     paddingBottom: 10
//                 }}
//             />
//         )
//     }
//     function showData() {
//         const renderData = ({ item }) => (
//             <View>
//                 <Text style={{
//                     alignSelf: 'flex-start',
//                     ...FONTS.h3
//                 }}>ORDERED ITEMS WITH QUANTITY</Text>
//                 <ScrollView>
//                     <Text
//                         style={{
//                             marginTop: '5%',
//                             alignSelf: 'flex-start',
//                             ...FONTS.h4
//                         }}
//                     >{item.map(result => {
//                         return result + "\n"
//                     })}</Text>
//                 </ScrollView>
//             </View>
//         )
//         return (
//             <FlatList
//                 data={userOrder}
//                 keyExtractor={(item, index) => `${item.id}` + index}
//                 renderItem={renderData}
//                 contentContainerStyle={{
//                     padding: SIZES.padding,
//                     paddingHorizontal: SIZES.padding * 2,
//                     paddingBottom: 30
//                 }}
//             />
//         )
//     }
//     function showAddress() {
//         const renderAddress = () => (
//             <View>
//                 <Text style={{
//                     alignSelf: 'flex-start',
//                     ...FONTS.h3
//                 }}>ADDRESS</Text>
//                 <Text
//                     style={{
//                         marginTop: '2%',
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}
//                 >{userAddress.map(result => {
//                     return result.accommodation_name + ""
//                 })}</Text>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}
//                 >{userAddress.map(result => {
//                     return result.area_name + ""
//                 })}</Text>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}
//                 >{userAddress.map(result => {
//                     return result.landmark_name + ""
//                 })}</Text>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}
//                 >{userAddress.map(result => {
//                     return result.city_name + ""
//                 })}</Text>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}
//                 >{userAddress.map(result => {
//                     return result.selectedPickerValue + ""
//                 })}</Text>

//             </View>
//         )
//         return (
//             <FlatList
//                 data={userAddress}
//                 keyExtractor={(item, index) => item.id + index}
//                 renderItem={renderAddress}
//                 contentContainerStyle={{
//                     padding: SIZES.padding,
//                     paddingHorizontal: SIZES.padding * 2,
//                     paddingBottom: 10
//                 }}
//             />
//         )
//     }
//     return (
//         <SafeAreaView>
//             <View
//                 style={{
//                     margin: 10,
//                     alignSelf: 'center',
//                     justifyContent: 'center',
//                     backgroundColor: COLORS.white,
//                     padding: SIZES.padding,
//                     height: 450,
//                     width: '95%',
//                     borderRadius: 20,
//                     ...styles.shodow
//                 }}
//             >
//                 {fetchOrders()}
//                 {showData()}
//                 {showAddress()}
//             </View>
//         </SafeAreaView>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         backgroundColor: '#fb7b1a',
//         padding: SIZES.padding,
//         height: 180,
//         width: '100%',
//         borderRadius: 20
//     },
//     paragraph: {
//         margin: 24,
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         borderRadius: 20
//     },
//     shodow: {
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//         elevation: 1,
//     },
//     CircleShapeView: {
//         width: 16,
//         height: 16,
//         borderRadius: 150 / 2,
//         backgroundColor: '#fb7b1a'
//     },
// })
// export default Admin_Orders;



import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    PermissionsAndroid,
    ToastAndroid,
    SafeAreaView,
} from "react-native";
import { COLORS, FONTS, SIZES, icons } from '../constants';
import firebase from '@react-native-firebase/app';
import { ScrollView } from "react-native-gesture-handler";
import { tempUID } from "./Login";
import { BasicButton } from "@phomea/react-native-buttons";

var AdminDatafromDB = [];
var docData

const Admin_Orders = () => {

    const [adminData, setAdminData] = useState()
    const [adminOrder, setAdminOrder] = useState()

    function fetchOrders() {

        const removeOrder = (item) => {
            console.log("Removed", item.Order_id);
            var Deletequery = firebase.firestore()
                .collection("RestaurantData").doc('RestaurantData')
                .collection("Admin");

            const idFilter = item.Order_id ? Deletequery.where("Order_id", "==", item.Order_id) : Deletequery

            idFilter.get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    docData = { ...doc.data().id, id: doc.id }
                    doc.ref.delete();
                });
            });

        }

        const getOrders = () => {

            firebase.firestore()
                .collection("RestaurantData").doc('RestaurantData')
                .collection("Admin").onSnapshot((querySnapshot) => {
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        items.push(doc.data());
                    });
                    AdminDatafromDB = items
                    // console.log(userOrderTemp);
                    // console.log(userAddressTemp);
                    setAdminData(items);
                });

        }

        useEffect(() => {
            getOrders()
            return (() => {
                setAdminData({});
            })
        }, [])

        const renderOrder = ({ item }) => (
            <ScrollView>
                <View
                    style={{
                        margin: 10,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white,
                        padding: SIZES.padding,
                        height: '100%',
                        width: '95%',
                        borderRadius: 20,
                        ...styles.shodow
                    }}
                >
                    <View
                        style={{
                            right: '2.5%',
                            width: '105%',
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    >
                        <View
                            style={{
                                padding: SIZES.padding
                            }}
                        >
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    ...FONTS.h4
                                }}
                            >Order id : {item.Order_id}</Text>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    ...FONTS.h4
                                }}
                            >Date and Time : {item.orderDate.toDate().toString()}</Text>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    ...FONTS.h4
                                }}
                            >Email : {item.email}</Text>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    ...FONTS.h4
                                }}
                            >Username : {item.user_Name}</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            right: '2.5%',
                            width: '105%',
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}>
                        <View
                            style={{
                                padding: SIZES.padding
                            }}
                        >
                            <Text style={{
                                alignSelf: 'flex-start',
                                ...FONTS.h3
                            }}>ADDRESS</Text>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    ...FONTS.h4
                                }}>Latitude : {item.user_Latitude}</Text>
                            <Text
                                style={{
                                    alignSelf: 'flex-start',
                                    ...FONTS.h4
                                }}>Longitude : {item.user_Longitude}</Text>

                            <Text
                                style={{
                                    paddingTop: '2%',
                                    alignSelf: 'flex-start',
                                    ...FONTS.h4
                                }}>{item.user_Address}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            right: '2.5%',
                            width: '105%',
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                        }}
                    >
                        <View
                            style={{
                                padding: SIZES.padding
                            }}
                        >
                            <Text style={{
                                alignSelf: 'flex-start',
                                ...FONTS.h3
                            }}>ORDERED ITEMS WITH QUANTITY</Text>

                            <Text
                                style={{
                                    marginTop: '5%',
                                    alignSelf: 'flex-start',
                                    ...FONTS.h4
                                }}
                            >{item.user_Order.map(result => {
                                return result + "\n"

                            })}</Text>
                            <View
                                style={{
                                    right: '2.5%',
                                    width: '105%',
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            ></View>
                            <Text style={{
                                paddingTop:SIZES.padding,
                                alignSelf: 'flex-start',
                                ...FONTS.h3
                            }}>SCHEDULED ON</Text>
                            <Text
                                style={{
                                    marginTop: '5%',
                                    alignSelf: 'flex-start',
                                    ...FONTS.h4
                                }}
                            >{item.scheduled.map(result => {
                                return result + ", "
                            })}</Text>
                        </View>

                    </View>
                    <Text
                        style={{
                            alignSelf: 'flex-start',
                            ...FONTS.h4
                        }}>Grand Total : ₹ {item.total_Price}</Text>
                    <View
                        style={{
                            alignSelf: 'center',
                            padding: SIZES.padding
                        }}
                    >
                        <BasicButton
                            title="Delivered"
                            onPress={() => {
                                removeOrder(item)
                            }}
                        /></View>
                </View >
            </ScrollView>
        )
        return (
            <FlatList
                data={adminData}
                keyExtractor={(item, index) => item.id + index}
                renderItem={renderOrder}
                contentContainerStyle={{
                    padding: SIZES.padding,
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 10
                }}
            />
        )
    }
    return (
        <SafeAreaView>
            <View
                style={{
                    alignSelf: 'center',
                    padding: SIZES.padding
                }}
            >
                <Text style={{
                    ...FONTS.h2
                }}>
                    Orders
                </Text>
            </View>
            {fetchOrders()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fb7b1a',
        padding: SIZES.padding,
        height: 180,
        width: '100%',
        borderRadius: 20
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 20
    },
    shodow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    CircleShapeView: {
        width: 16,
        height: 16,
        borderRadius: 150 / 2,
        backgroundColor: '#fb7b1a'
    },
})
export default Admin_Orders;




// import React, { useEffect, useState } from "react"
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Image,
//     FlatList,
//     PermissionsAndroid,
//     ToastAndroid,
//     SafeAreaView,
// } from "react-native";
// import { COLORS, FONTS, SIZES, icons } from '../constants';
// import firebase from '@react-native-firebase/app';
// import { ScrollView } from "react-native-gesture-handler";
// import { setOrderRef, tempUID } from "./Login";

// const Admin_Orders = () => {

//     var AdminDatafromDB = [];
//     var userOrder = [];
//     var userAddress = [];

//     const [adminData, setAdminData] = useState(null)
//     const [userData, setUserData] = useState(null)
//     const [address, setAddress] = useState(null)
//     const [order, setOrder] = useState(null)

//     AdminDatafromDB.forEach(result => {
//         userOrder.push(result.user_Order)
//     })
//     setOrder(userOrder)

//     AdminDatafromDB.forEach(result => {
//         userAddress.push(result.user_Address)
//     })
//     setAddress(userAddress)


//     function fetchOrders() {

//         const getOrders = () => {

//             firebase.firestore()
//                 .collection("RestaurantData").doc('RestaurantData')
//                 .collection("Admin").onSnapshot((querySnapshot) => {
//                     const items = [];
//                     querySnapshot.forEach((doc) => {
//                         items.push(doc.data());
//                     });
//                     AdminDatafromDB = items
//                     setAdminData(items);
//                 });
//         }

//         useEffect(() => {
//             getOrders()
//             return (() => {
//                 setAdminData({});
//             })
//         }, [])

//         const renderOrder = ({ item }) => (
//             <View>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.body3
//                     }}
//                 > id : {item.Order_id}</Text>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}
//                 > email : {item.email}</Text>
//                 <Text
//                     style={{
//                         alignSelf: 'flex-start',
//                         ...FONTS.h4
//                     }}
//                 > Username : {item.user_Name}</Text>


//                 <View>
//                     <Text style={{
//                         marginTop: '5%',
//                         alignSelf: 'flex-start',
//                         ...FONTS.h3
//                     }}>ORDERED ITEMS WITH QUANTITY</Text>
//                     <ScrollView>
//                         <Text
//                             style={{
//                                 marginTop: '5%',
//                                 alignSelf: 'flex-start',
//                                 ...FONTS.h4
//                             }}
//                         >{order.map(result => {
//                             return result + "\n"
//                         })}</Text>
//                     </ScrollView>
//                 </View>

//                 <View>
//                     <Text style={{
//                         marginTop: '5%',
//                         alignSelf: 'flex-start',
//                         ...FONTS.h3
//                     }}>ADDRESS</Text>
//                     <Text
//                         style={{
//                             marginTop: '2%',
//                             alignSelf: 'flex-start',
//                             ...FONTS.h4
//                         }}
//                     >{address.map(result => {
//                         return result.accommodation_name + ""
//                     })}</Text>
//                     <Text
//                         style={{
//                             alignSelf: 'flex-start',
//                             ...FONTS.h4
//                         }}
//                     >{address.map(result => {
//                         return result.area_name + ""
//                     })}</Text>
//                     <Text
//                         style={{
//                             alignSelf: 'flex-start',
//                             ...FONTS.h4
//                         }}
//                     >{address.map(result => {
//                         return result.landmark_name + ""
//                     })}</Text>
//                     <Text
//                         style={{
//                             alignSelf: 'flex-start',
//                             ...FONTS.h4
//                         }}
//                     >{address.map(result => {
//                         return result.city_name + ""
//                     })}</Text>
//                     <Text
//                         style={{
//                             alignSelf: 'flex-start',
//                             ...FONTS.h4
//                         }}
//                     >{address.map(result => {
//                         return result.selectedPickerValue + ""
//                     })}</Text>
//                     <Text
//                         style={{
//                             alignSelf: 'flex-start',
//                             ...FONTS.h4
//                         }}>Latitude : {item.user_Latitude}</Text>
//                     <Text
//                         style={{
//                             alignSelf: 'flex-start',
//                             ...FONTS.h4
//                         }}>Longitude : {item.user_Longitude}</Text>
//                 </View>
//             </View>
//         )
//         return (

//             <SafeAreaView
//                 style={{
//                     padding: SIZES.padding,
//                     marginTop: '10%'
//                 }}
//             >
//                 <FlatList
//                     data={adminData}
//                     keyExtractor={(item, index) => item.id + index}
//                     renderItem={renderOrder}
//                     contentContainerStyle={{
//                         padding: SIZES.padding,
//                         paddingHorizontal: SIZES.padding * 2,
//                         paddingBottom: '20%'
//                     }}
//                 />
//             </SafeAreaView>
//         )
//     }


//     return (
//         <SafeAreaView>
//             {fetchOrders()}
//         </SafeAreaView>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         backgroundColor: '#fb7b1a',
//         padding: SIZES.padding,
//         height: 180,
//         width: '100%',
//         borderRadius: 20
//     },
//     paragraph: {
//         margin: 24,
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         borderRadius: 20
//     },
//     shodow: {
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//         elevation: 1,
//     },
//     CircleShapeView: {
//         width: 16,
//         height: 16,
//         borderRadius: 150 / 2,
//         backgroundColor: '#fb7b1a'
//     },
// })
// export default Admin_Orders;