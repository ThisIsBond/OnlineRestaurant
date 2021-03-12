import React, { Component, useEffect } from "react"
import {
    View,
    Text,
    Alert,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import { FONTS, SIZES, COLORS, icons } from "../constants";
import { tempUID } from './Login';
import firebase from "@react-native-firebase/app";
import { currentUID } from "./Home";
import { cartDatafromDB } from './Login';

const refUserOrders = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("users");

const Cart = () => {

    function renderCart() {
        const renderCartItems = ({ item }) => (
            // <Fragment>
            // {loading ? <Text>Loading...</Text> : null}
            // {Restaurents.map((Restaurent,index) => (
            //     <View className="Restaurant" key={index}>
            //        <Text> {Restaurent.name} </Text>
            //        <Text> {Restaurent.duration} </Text>
            //        <Text> {Restaurent.calories} </Text>
            //        <Text> {Restaurent.price} </Text>
            //     </View>
            // ))}
            // </Fragment>
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                // // onPress -> Navigate to restaurant screen when pressed on recipe

                // onPress={() => navigation.navigate("Recipe", {
                //     item
                // })}
            >

                {/*image*/}

                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image
                        source={{
                            uri: item.restaurant.imageFileName
                        }}
                        resizeMode='cover'
                        style={{
                            flex: 1,
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shodow

                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>₹ {item.restaurant.price}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 }}>{item.restaurant.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Ratings */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.restaurant.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}></Text>
                        <Text style={{ ...FONTS.h4 }}>  Delivery under {item.restaurant.duration} minutes</Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={cartDatafromDB}
                keyExtractor={(item, index) => `${item.id}` + index}
                renderItem={renderCartItems}
                contentContainerStyle={{
                    padding: SIZES.padding,
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />

        )
    }
    return (
        renderCart()
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
export default Cart;