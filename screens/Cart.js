import React, { Component, useEffect, useState } from "react"
import {
    View,
    Text,
    Alert,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { FONTS, SIZES, COLORS, icons } from "../constants";
import { cartLengthfromLogin, tempUID } from './Login';
import firebase from "@react-native-firebase/app";
import InputSpinner from 'react-native-input-spinner';
import { currentUID } from "./Home";
import { cartDatafromDB } from './Login';
import { setOrderRef } from "./Login";
import { userID } from './Recipe';
import { ScrollView } from "react-native-gesture-handler";
import { dynamicCartRef } from "./Login";


const refUserOrders = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("users");

var docData

export var cartLengthfromCart = cartDatafromDB.length


const Cart = ({ navigation }) => {
    var total = 0

    const [cartData, setCartData] = useState({})
    const [inputSpinnerData, setInputSpinnerData] = useState({})

    for (var i = 0; i < cartDatafromDB.length; i++) {
        total += parseInt(cartDatafromDB[i].price)

    }

    console.log(total);

    console.log(cartDatafromDB);



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
                        <Text style={{ ...FONTS.h3 }}> Cart </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                </TouchableOpacity>
            </View>
        )
    }

    function renderCart() {

        const getCart = () => {

            dynamicCartRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                    // restaurantDatafromDB.push(doc.data());
                });
                setCartData(items);
            });

        }

        useEffect(() => {
            getCart();
        }, []);

        const cartDelete = (item) => {

            console.log("First => " + item);


            var cartDeletequery = refUserOrders.doc(setOrderRef.id).collection("Orders").doc("orders").collection('cart');

            const idFilter = item ? cartDeletequery.where("id", "==", item) : cartDeletequery
            idFilter.get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    console.log(doc);
                    docData = { ...doc.data().id, id: doc.id }
                    doc.ref.delete();
                });
            });

            // var setOrderRef

            // var cartFilterUUID = cartDatafromDB.filter(cartDatafromDB => cartDatafromDB.uuid == item)

            // console.log(" => " + cartFilterUUID);

            // 1

            // console.log(dynamicCartRef._collectionPath); 


            // cartDeletequery.get().then(function (querySnapshot) {
            //     querySnapshot.forEach(function (doc) {

            //         if(doc.ref.id === 'rAASrRBzxEEqdRlCGjES'){
            //             doc.ref.delete();
            //         }else{
            //             console.log("Doesn't exist");
            //         }
            //     });
            // });

            //1.1

            // cartDeletequery.onSnapshot((res) => {
            //     const todos = [];
            //     res.forEach((todo) => {
            //         todos.push(todo.data());
            //     })
            // })

            // 2

            // var uidFilter = refUserOrders.doc(userID).collection("Orders").doc("orders").collection('cart', ref => ref.where("uuid", "==", item))

            // uidFilter.get().then(snapshot => {
            //     snapshot.docs.forEach(doc => {

            //         var docData = { ...doc.data().id, id: doc.id }
            //         // doc.ref.delete()
            //         setOrderRef = docData

            //         console.log(" Inside " + setOrderRef.id);

            //     });
            // });

            // 3

            // console.log("UserID => " + userID);
            // console.log(item);
            // var datatoDel = refUserOrders.doc(userID)
            //     .collection("Orders").doc("orders")
            //     .collection('cart', ref => ref.where("uuid", "==", item))

            //     datatoDel.get().then(datatoDel => datatoDel.forEach( doc => doc.ref.delete()));
            //     console.log("Delete Successfull");


            // 4

            // const deletlist = refUserOrders.doc(userID).collection("Orders").doc("orders").collection('cart', ref => ref.where("uuid", "==", item))
            // deletlist.get().then(delitems => delitems.forEach(doc => doc.ref.delete()));
            // alert('record erased');
        }

        function updateSpinnerDB(spinnerVal, docID) {
            dynamicCartRef.doc(docID).update({
                RecipeCount: spinnerVal
            })
        }

        const renderCartItems = ({ item }) => (
            // Circuler border rectangle
            <View
                style={{
                    alignSelf: 'center',
                    marginBottom: 10,
                    justifyContent: 'center',
                    backgroundColor: COLORS.white,
                    padding: SIZES.padding,
                    height: 180,
                    width: '105%',
                    borderRadius: 20,
                    ...styles.shodow
                }}>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            width:'40%'
                        }}
                    >
                        <Image
                            source={{
                                uri: item.imageFileName
                            }}
                            resizeMethod='scale'
                            style={{
                                justifyContent: 'center',
                                padding: SIZES.padding,
                                height: 150,
                                width: '105%',
                                borderRadius: 20,
                                right: '5%'
                            }}
                        />
                    </View>
                    {/* Two Lines that seperates image and text */}
                    <View
                        style={{
                            bottom: '4%',
                            height: '120%',
                            width: 1.4,
                            backgroundColor: COLORS.secondary,
                            marginLeft: '0.5%'
                        }}
                    >
                    </View>

                    <View
                        style={{
                            bottom: '4%',
                            height: '120%',
                            width: 1.4,
                            backgroundColor: COLORS.secondary,
                            marginLeft: '0.3%'
                        }}
                    >
                    </View>

                    <View
                        style={{
                            left: '10%',
                            bottom: '1%'
                        }}
                    >
                        <Text style={{ ...FONTS.body3 }}>
                            {item.name}
                        </Text>
                        <Text
                            style={{
                                paddingTop: SIZES.padding / 2,
                                ...FONTS.body3
                            }}>
                            ₹ {item.price} x {item.RecipeCount} = {item.price * item.RecipeCount}
                        </Text>
                        <View
                            style={{
                                position: 'absolute',
                                height: '100%',
                                justifyContent: 'center',
                                top: '7%',
                            }}
                        >

                            <InputSpinner

                                skin='square'
                                max={10}
                                min={1}
                                step={1}
                                width={115}
                                height={45}
                                color={COLORS.white}
                                value={item.RecipeCount}
                                //colorPress={COLORS.secondary}
                                buttonPressTextColor={COLORS.primary}
                                onChange={(num) => {
                                    updateSpinnerDB(num, item.id)
                                }}
                            />

                        </View>
                        <TouchableOpacity

                            style={{
                                right: '13%',
                                top: '30%',
                                width: '90%',
                                height: '37%',
                                alignContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                            onPress={() => { cartDelete(item.id) }}
                        >
                            <Image
                                source={require('../assets/icons/noun_Delete.png')}
                                style={{
                                    height: '60%',
                                    width: '20%',
                                }}
                            />
                            <Text style={{
                                ...FONTS.h4
                            }}>Remove from cart?</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        )
        return (

            <View>
                <FlatList
                    data={cartData}
                    keyExtractor={(item, index) => `${item.id}` + index}
                    renderItem={renderCartItems}
                    contentContainerStyle={{
                        padding: SIZES.padding,
                        paddingHorizontal: SIZES.padding * 2,
                        paddingBottom: 30
                    }}
                />
                {/* <View></View>
        <View
          style={{
            borderBottomWidth: 5,
            marginBottom: 1,
          }}
        >
        </View>
        <Text style={{
          ...FONTS.h1
        }}>Total items in cart : {cartDatafromDB.length}</Text>
        <View
          style={{
            marginTop: SIZES.padding,
            alignItems: 'flex-end',
            padding: SIZES.padding,

          }}
        >
          <Text style={{
            ...FONTS.h1
          }}>Total : {total}</Text>
        </View> */}
            </View>

        )
    }
    return (
        <SafeAreaView>
            {renderHeader()}
            {renderCart()}
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
export default Cart;