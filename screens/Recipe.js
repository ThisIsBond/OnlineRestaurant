import React from "react"
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Animated
} from "react-native";

import { isIphoneX } from 'react-native-iphone-x-helper'

import { icons, COLORS, SIZES, FONTS } from '../constants'

const Recipe = ({ route, navigation }) => {

    const [restaurant, setRestaurants] = React.useState(null);

    React.useEffect(() => {
        let { item } = route.params;

        setRestaurants(item)
    })

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
        console.log(restaurant?.imageFileName);
        return (

            <View>
                <View style={{ height: SIZES.height * 0.35 , paddingTop:20}}>

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

                    <View
                        style={{
                            position: 'absolute',
                            bottom: -20,
                            width: SIZES.width,
                            height: 50,
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 50,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopLeftRadius: 25,
                                borderBottomLeftRadius: 25
                            }}

                        >
                            <Text style={{ ...FONTS.body1 }}>-</Text>
                        </TouchableOpacity>

                        <View
                            style={{
                                width: 50,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{ ...FONTS.h2 }}>
                                5
                        </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 50,
                                backgroundColor: COLORS.white,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25
                            }}
                        >
                            <Text style={{ ...FONTS.body1 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Name and Description */}
                <View
                    style={{
                        width: SIZES.width,
                        alignItems: 'center',
                        marginTop: 15,
                        paddingHorizontal: SIZES.padding * 2
                    }}
                >
                    <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}> {restaurant?.name} - ₹ {restaurant?.price}</Text>
                    <Text style={{ ...FONTS.body3 }}>{restaurant?.description}</Text>
                </View>

                {/* Calories */}

                <View
                    style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop: 10
                    }}
                >
                    <Image
                        source={icons.fire}
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 10
                        }}
                    />
                    <Text style={{
                        ...FONTS.body3, color: COLORS.darkgray
                    }}>{restaurant?.calories} cal </Text>
                </View>
            </View>
        )
    }

    function renderOrder() {
        return (

            <View style={{
                paddingTop: 130
            }}>
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
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
                    </View>
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
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4}}>8888</Text>
                        </View>
                    </View>
                    {/* Order Button */}
                    <View
                     style= {{
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
                        >
                            <Text style={{
                                color: COLORS.white, ...FONTS.h2
                            }}>  Order </Text>
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