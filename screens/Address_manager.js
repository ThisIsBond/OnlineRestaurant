import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import { BasicButton } from "@phomea/react-native-buttons";
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { SafeAreaView } from "react-navigation";
import { refUserAddressBook } from './Login';

const Address_manager = ({ navigation }) => {

    const [addressBookData, setAddressBookData] = useState({})

    function deleteAddress(item) {
        refUserAddressBook.doc(item).delete()
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
                        <Text style={{ ...FONTS.h3 }}> Address Manager </Text>
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

    function renderAddressfromDB() {



        const getAddressBook = () => {

            refUserAddressBook.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                    // restaurantDatafromDB.push(doc.data());
                });
                console.log(items);
                setAddressBookData(items)
            });

        }

        useEffect(() => {
            getAddressBook();
        }, []);

        const renderAddressBookItems = ({ item }) => (
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
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.secondary,

                        }}
                    >
                        Accommodation :
                    </Text>

                    <Text>  {item.accommodation_name}</Text>

                </View>


                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.secondary,

                        }}
                    >
                        Area :
                    </Text>

                    <Text>                        {item.area_name}</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.secondary,

                        }}
                    >
                        Landmark :
                    </Text>

                    <Text>              {item.landmark_name}</Text>
                </View>


                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.secondary,

                        }}
                    >
                        City :
                    </Text>
                    <Text>                         {item.city_name}</Text>
                </View>


                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.secondary,

                        }}
                    >
                        State :
                    </Text>
                    <Text>                      {item.selectedPickerValue}</Text>
                </View>

                <View
                    style={{
                        left: '80%'
                    }}
                >
                    <View
                        style={{
                            top: '80%',
                            height: '10%',
                            width: '100%',
                            backgroundColor: COLORS.secondary,
                            right: '80%'
                        }}
                    >
                    </View>
                </View>


                <View
                    style={{
                        left: '35%',
                        flexDirection: 'row'
                    }}
                >
                    <TouchableOpacity
                        style={{

                            right: '3%',
                            width: '30%',
                            height: '200%',
                            flexDirection: 'row',

                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            console.log(item.id);
                        }}
                        onPress={() => navigation.navigate("Address_edit", {
                            item
                        })}
                    >

                        <Text
                            style={{
                                alignSelf: 'center',
                                color: '#C0392B'
                            }}
                        >

                            Edit
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{

                            right: '3%',
                            width: '30%',
                            height: '200%',
                            flexDirection: 'row',
                            marginLeft: '10%',
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            deleteAddress(item.id)
                        }}
                    >

                        <Text
                            style={{
                                alignSelf: 'center',
                                color: '#C0392B'
                            }}
                        >

                            Remove
                        </Text>

                    </TouchableOpacity>
                </View>


            </View>


        )
        return (
            <View>
                <FlatList
                    data={addressBookData}
                    keyExtractor={(item, index) => `${item.id}` + index}
                    renderItem={renderAddressBookItems}
                    contentContainerStyle={{
                        padding: SIZES.padding,
                        paddingHorizontal: SIZES.padding * 2,
                        paddingBottom: 30
                    }}
                />
            </View>
        )
    }

    function renderAddButton() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: SIZES.padding
                }}>
                <BasicButton
                    buttonStyle={{
                        backgroundColor: COLORS.primary,
                        width: 120,

                    }}
                    color='grey'
                    title="Add Address"
                    animation='bounce'
                    onPress={() => {
                        navigation.navigate('Stack', { screen: 'Address_form' })
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView>
            {renderHeader()}
            {renderAddressfromDB()}
            {renderAddButton()}
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
export default Address_manager;