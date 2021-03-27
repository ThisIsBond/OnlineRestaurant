import React, { useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Animated,
    Alert
} from "react-native";

import { isIphoneX } from 'react-native-iphone-x-helper'
import InputSpinner from "react-native-input-spinner";
import { icons, COLORS, SIZES, FONTS } from '../constants'
import firebase from "@react-native-firebase/app";
import { tempUID } from './Login';
import { dynamicCartRef } from "./Login";
import { v4 as uuidv4 } from 'uuid';
import { cartDatafromDB } from './Login';
export var userID

const Recipe = ({ route, navigation }) => {

    const refUserOrders = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("users");

    const [state, setState] = React.useState({});
    const [temp, setTemp] = React.useState(null);
    const [tempPrice, setTempPrice] = React.useState(null);
    const [restaurant, setRestaurants] = React.useState(null);
    const [currentOrderId, setCurrentOrderId] = React.useState([])


    var docData = [];
    var DuplicateData = false


    React.useEffect(() => {

        let { item } = route.params;
        setRestaurants(item)

        return () => {
            setState({});
        };
    }, []);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50, paddingTop: 10 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                {/* Restaurent name Section */}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
                    <View
                        style={{

                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            backgroundColor: COLORS.lightGray3,
                            borderRadius: SIZES.radius

                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}> {restaurant?.name} </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.list}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderFoodInfo() {
        return (

            <View>
                <View style={{ height: SIZES.height * 0.35, paddingTop: 20 }}>

                    {/* Food Image */}

                    <Image
                        source={{ uri: restaurant?.imageFileName }}
                        resizeMode='cover'
                        style={{
                            width: SIZES.width,
                            height: "100%"
                        }}
                    />

                    {/* Quantity */}


                    {/* Name and Description */}
                    <View
                        style={{
                            flexDirection: 'row',
                            width: SIZES.width,
                            alignItems: 'flex-start',
                            marginTop: '17%',
                            paddingHorizontal: SIZES.padding * 2
                        }}
                    >

                        <Text style={{ ...FONTS.h3 }}>{restaurant?.name} - ₹{restaurant?.price}</Text>
                        <View
                            style={{
                                flexDirection: 'row',

                            }}>
                            <Text style={{
                                ...FONTS.h4
                            }}> ( </Text>
                            <Image
                                source={icons.fire}
                                style={{

                                    width: 20,
                                    height: 20,
                                    marginRight: 10
                                }}
                            />
                            <Text style={{

                                ...FONTS.h4, color: COLORS.darkgray
                            }}>{restaurant?.calories} cal. </Text>
                            <Text style={{
                                ...FONTS.h4
                            }}> ) </Text>
                        </View>

                    </View>
                    <View
                        style={{
                            paddingHorizontal: SIZES.padding * 2,
                            paddingTop: SIZES.padding
                        }}
                    >
                        <Text style={{ ...FONTS.body3, marginLeft: 10 }}>{restaurant?.description}</Text>
                    </View>




                    {/* Calories */}

                    {/* <View
                        style={{
                            alignItems: 'flex-end',
                            flexDirection: 'row',
                            marginTop:'-40%',
                            marginLeft: '74%'
                        }}
                    >
                   
                    </View> */}
                </View>
            </View>
        )
    }

    function renderOrder() {

        var uuid = uuidv4()

        const placeOrder = () => {

            let unmounted = false

            dynamicCartRef.get().then(snapshot => {

                snapshot.docs.forEach(doc => {

                    //docData = { ...doc.data().id, id: doc.id }
                    docData.push(doc.id)
                    setCurrentOrderId(docData)

                })
            }).then(() => {
                var TempCartData = [];
                // var temp = new Set(cartDatafromDB)
                // var hasUUID = temp.has(restaurant.uuid)
                var querytry = dynamicCartRef.where('uuid', '==', restaurant.uuid);
                querytry.get().then(snapshot => {
                    snapshot.forEach(item => {
                        if (item.data().uuid == restaurant.uuid) {
                            DuplicateData = true
                        }
                        else {
                            DuplicateData = false
                        }
                    })
                }).then(() => {
                    if (DuplicateData == true) {
                        console.log("Item already in cart");
                    } else {
                        dynamicCartRef
                            .doc(uuid)
                            .set({
                                id: uuid,
                                name: restaurant.name,
                                price: restaurant.price,
                                uuid: restaurant.uuid,
                                imageFileName: restaurant.imageFileName,
                                RecipeCount: 1
                            })
                    }
                })
            })




            unmounted = true

        }
        return (

            <View style={{
                paddingTop: '80%'
            }}>
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    {/* <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{
                            ...FONTS.h3
                        }}> Items in Cart </Text>

                        <Text
                            style={{ ...FONTS.h3 }}>
                            ₹ 45
                        </Text>
                    </View> */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3
                        }}

                    >
                        <View
                            style={{ flexDirection: 'row' }}
                        >
                            <Image
                                source={icons.pin}
                                resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Location</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.mastercard}
                                resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>8888</Text>
                        </View>
                    </View>
                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            onPress={placeOrder}
                        >
                            <Text style={{
                                color: COLORS.white, ...FONTS.h2
                            }}>  Add to Cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
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
    }
})
export default Recipe;