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
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { BasicButton } from "@phomea/react-native-buttons";
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { SafeAreaView } from "react-navigation";
import { refUserAddressBook } from './Login';
import { Picker } from "@react-native-community/picker";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { dynamicCartRef } from './Login';
import LinearGradient from "react-native-linear-gradient";
import GetLocation from 'react-native-get-location';
import { refUserOrderItems } from './Login';
import { v4 as uuidv4 } from 'uuid';
import { tempUID } from './Login';
import { Alert } from "react-native";
import RoundedCheckbox from "react-native-rounded-checkbox";

var addressDatafromDB = [];
var OrderData = [];
var newOrderData = [];


var defaultPicker = ["Select Address..."]

const Order = ({ route, navigation }) => {

    const [cart, setCart] = useState(null)
    const [amount, setAmount] = useState(null)
    const [addressData, setAddressData] = useState(null)
    const [pickerValue, setPickerValue] = useState(null)
    const [currentLocationLongitude, setCurrentLocationLongitude] = useState(null)
    const [currentLocationLatitude, setCurrentLocationLatitude] = useState(null)

    const [sunday, setSunday] = useState('-')
    const [monday, setMonday] = useState('-')
    const [tuesday, setTuesday] = useState('-')
    const [wednestday, setWednestday] = useState('-')
    const [thursday, setThursday] = useState('-')
    const [friday, setFriday] = useState('-')
    const [saturday, setSaturday] = useState('-')

    if (pickerValue == null || pickerValue == '') {
        setPickerValue("Empty")
    }

    useEffect(() => {

        let { sum } = route.params;
        setAmount(sum)

        return () => {
            setAmount({});
        };
    }, []);

    function placeFinalOrder() {

        const items = [];
        OrderData.forEach(result => {
            items.push(result.name + " x " + result.RecipeCount)
        })
        console.log(items);


        if (currentLocationLongitude != null && currentLocationLatitude != null) {
            var uuid = uuidv4()

            refUserOrderItems
                .doc(uuid)
                .set({
                    Order_id: uuid,
                    user_Name: tempUID.displayName,
                    email: tempUID.email,
                    user_Order: items,
                    total_Price: amount + (amount * 13 / 100),
                    user_Address: pickerValue,
                    user_Longitude: currentLocationLongitude,
                    user_Latitude: currentLocationLatitude,
                    orderDate: firebase.firestore.FieldValue.serverTimestamp()
                    
                }).then(() => {
                    firebase.firestore()
                        .collection("RestaurantData").doc('RestaurantData')
                        .collection("Admin").doc(uuid).set({
                            Order_id: uuid,
                            user_Name: tempUID.displayName,
                            email: tempUID.email,
                            user_Order: items,
                            total_Price: amount + (amount * 13 / 100),
                            user_Address: pickerValue,
                            user_Longitude: currentLocationLongitude,
                            user_Latitude: currentLocationLatitude,
                            orderDate: firebase.firestore.FieldValue.serverTimestamp(),
                            scheduled : [sunday,monday,tuesday,wednestday,thursday,friday,saturday]
                        })
                }).then(() => {
                    navigation.navigate('Stack', { screen: 'Home' })
                })
        }
        else {
            Alert.alert("Error", "currentLocationLongitude and currentLocationLatitude cannot be empty")
        }
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50, paddingTop: 10 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >

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
                        <Text style={{ ...FONTS.h3 }}> Order </Text>
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

    function renderAddressPicker() {

        const getAddressBook = () => {

            refUserAddressBook.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                    // restaurantDatafromDB.push(doc.data());
                });
                addressDatafromDB = items
                console.log(items);
                setAddressData(items)
            });
        }

        useEffect(() => {
            getAddressBook();
            return () => {
                setAddressData({});
            };
        }, []);


        const EmptyAddress = () => {
            return (
                <View>
                    <Text>No Addess Found.....</Text>
                </View>
            )
        }

        const AddressDataView = () => (
            <View>

                <Text
                    style={{
                        paddingTop: '5%',
                        alignSelf: 'center',
                        ...FONTS.h3
                    }}
                >
                    Select Address
                </Text>
                <View
                    style={{
                        alignSelf: 'center',
                        ...styles.rowContainer
                    }}

                >
                    <Picker
                        style={{ width: '99%', height: '100%' }}
                        mode='dropdown'

                        selectedValue={pickerValue}
                        placeholder="Select Address"
                        onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}
                        placeholderTextColor={COLORS.secondary}
                    >
                        {addressDatafromDB.map(acct => <Picker.Item key={acct.uuid} label={acct.accommodation_name +
                            " ," + acct.area_name
                            + " ," + acct.landmark_name
                            + " ," + acct.city_name
                            + " ," + acct.selectedPickerValue} value={acct.accommodation_name +
                                " ," + acct.area_name
                                + " ," + acct.landmark_name
                                + " ," + acct.city_name
                                + " ," + acct.selectedPickerValue} />)}

                    </Picker>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Stack', { screen: 'Address_form' })
                    }}
                >
                    <Text style={{
                        alignSelf: 'flex-end',
                        marginRight: '10%',
                        ...FONTS.body5
                    }}>
                        Add another address?
                </Text>
                </TouchableOpacity>
            </View>

        )
        return (
            <SafeAreaView>
                {AddressDataView()}
            </SafeAreaView>
        )
    }

    function renderOrderItems() {

        const getCart = () => {

            dynamicCartRef.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });
                OrderData = items
                setCart(items);

            });

        }

        useEffect(() => {
            getCart();
            return () => {
                setCart({}); // This worked for me
            };
        }, []);

        const renderEmpty = () => {
            return (
                <View>
                    <Text>
                        Empty
                    </Text>
                </View>
            )
        }

        const renderOrder = ({ item }) => (

            <View>

                <ScrollView
                    contentContainerStyle={{
                        alignSelf: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            marginTop: '2%',
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                alignSelf: 'center',
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>

                        <Text
                            style={{
                                alignSelf: 'center',
                                ...FONTS.h3
                            }}
                        > x {item.RecipeCount}</Text>

                    </View>
                </ScrollView>
            </View>
        )

        return (
            <View>
                <Text
                    style={{
                        paddingTop: '1%',
                        alignSelf: 'center',
                        ...FONTS.h3
                    }}
                >
                    Your Order Items
                </Text>
                <View
                    style={{
                        margin: 10,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white,
                        padding: SIZES.padding,
                        height: 180,
                        width: '95%',
                        borderRadius: 20,
                        ...styles.shodow

                    }}>
                    <FlatList
                        data={cart}
                        keyExtractor={(item, index) => `${item.id}` + index}
                        ListEmptyComponent={renderEmpty}
                        renderItem={renderOrder}
                        contentContainerStyle={{
                            padding: SIZES.padding,
                            paddingHorizontal: SIZES.padding * 2,
                            paddingBottom: 30
                        }}
                    />
                </View>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
                    margin: 10,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    padding: SIZES.padding,
                    height: 100,
                    width: '95%',
                    borderRadius: 20,
                    ...styles.shodow
                }} colors={['#ee0979', '#ff6a00']} >
                    < View
                        style={{
                            alignSelf: 'center',
                            marginBottom: 10,
                            justifyContent: 'center',
                            padding: SIZES.padding,
                            height: 120,
                            width: '100%',
                            ...styles.shodow
                        }}>
                        <View
                            style={{
                                marginTop: SIZES.padding,
                                alignItems: 'center',
                                padding: SIZES.padding,

                            }}
                        >
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.h1
                            }}>Grand Total : ₹ {amount + (amount * 13 / 100)}</Text>
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.body4
                            }}>(Tax : ₹ {(amount * 13 / 100)})</Text>
                        </View>
                    </ View>
                </LinearGradient>
            </View>
        )
    }
    function renderCurrentLocation() {

        const renderInputText = () => {

            const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

            if (granted) {
                GetLocation.getCurrentPosition({
                    enableHighAccuracy: false,
                    timeout: 1500,
                }).then(location => {
                    setCurrentLocationLongitude(location.longitude)
                    setCurrentLocationLatitude(location.latitude)
                    console.log(location.latitude);
                    console.log(location.longitude);
                })
                console.log("You can use the ACCESS_FINE_LOCATION")
            }
            else {
                console.log("ACCESS_FINE_LOCATION permission denied")
            }
        }

        const storeLocationData = () => (
            <View>
                <View
                    style={{
                        margin: 10,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white,
                        padding: SIZES.padding,
                        height: 90,
                        width: '95%',
                        borderRadius: 20,
                        ...styles.shodow

                    }}>
                    <Text
                        style={{
                            alignSelf: 'center',
                            ...FONTS.h4
                        }}
                    >Latitude : {currentLocationLatitude}</Text>
                    <Text style={{
                        alignSelf: 'center',
                        ...FONTS.h4
                    }}>Longitude : {currentLocationLongitude}</Text>
                </View>
                <BasicButton
                    title="Get Current Location"
                    onPress={() => renderInputText()}
                />
            </View>
        )
        return (
            <SafeAreaView>
                {storeLocationData()}
            </SafeAreaView>
        )
    }
    function renderPlaceOrderBtn() {
        return (
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
                        backgroundColor: '#f84232',
                        alignItems: 'center',
                        borderRadius: SIZES.radius
                    }}
                    onPress={() => {
                        placeFinalOrder()
                    }}
                >
                    <Text style={{
                        color: COLORS.white, ...FONTS.h2
                    }}> Confirm and Place Order </Text>
                </TouchableOpacity>
            </View>
        )
    }
    function renderScheduler() {
        return (
            <View
                style={{
                    padding: SIZES.padding,
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <RoundedCheckbox
                    text="S"
                    onPress={(checked) => {
                        if (checked == true) {
                            setSunday("Sunday")
                        } else if (checked == false) {
                            setSunday('-')
                        }
                    }}
                />
                <RoundedCheckbox
                    text="M"
                    onPress={(checked) => {
                        if (checked == true) {
                            setMonday("Monday")
                        } else if (checked == false) {
                            setMonday('-')
                        }
                    }}
                />
                <RoundedCheckbox
                    text="T"
                    onPress={(checked) => {
                        if (checked == true) {
                            setTuesday("Tuesday")
                        } else if (checked == false) {
                            setTuesday('-')
                        }
                    }}
                />
                <RoundedCheckbox
                    text="W"
                    onPress={(checked) => {
                        if (checked == true) {
                            setWednestday("Wednestday")
                        } else if (checked == false) {
                            setWednestday('-')
                        }
                    }}
                />
                <RoundedCheckbox
                    text="T"
                    onPress={(checked) => {
                        if (checked == true) {
                            setThursday("Thursday")
                        } else if (checked == false) {
                            setThursday('-')
                        }
                    }}
                />
                <RoundedCheckbox
                    text="F"
                    onPress={(checked) => {
                        if (checked == true) {
                            setFriday("Friday")
                        } else if (checked == false) {
                            setFriday('-')
                        }
                    }}
                />
                <RoundedCheckbox
                    text="S"
                    onPress={(checked) => {
                        if (checked == true) {
                            setSaturday("Saturday")
                        } else if (checked == false) {
                            setSaturday('-')
                        }
                    }}
                />
            </View>
        )
    }
    return (
        <SafeAreaView>
            {renderHeader()}
            {renderAddressPicker()}
            {renderCurrentLocation()}
            {renderScheduler()}
            {renderOrderItems()}
            {renderPlaceOrderBtn()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    rowContainer: { // Specially created for the Picker to avoid the misalignment of text inside the picker.
        width: 350,
        backgroundColor: COLORS.white,
        margin: 10,
        padding: 8,
        color: 'black',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
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
})
export default Order;