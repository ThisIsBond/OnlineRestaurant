import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"

import Svg, { Path } from 'react-native-svg'; // Plugin needed for hover effect in navigation bar

import { Home, Restaurant, Test, OrderDelivery, Recipe } from "../screens";

import { COLORS, icons } from "../constants";
import { isIphoneX } from 'react-native-iphone-x-helper';

const Tab = createBottomTabNavigator(); //calling function and assigning it to a variable Tab

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => { // Spicified 3 perimeters 
    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg //Creating the transperent curve from the reference image file
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>
                <TouchableOpacity // Navigation button floting when clicked
                    style={{
                        top: -22,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.white
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>

        )
    } else {
        return (
            <TouchableOpacity // Ordinary button if not clicked
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => { // creating a functional component for fixing navigation bar for Ios
    if (isIphoneX()) { //This only executes if the app. is running in iPhoneX model.
        return( // Fixed the bug where the navigation tab is always moving slightly upwards in iPhoneX devices
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white

                    }}
                >
                </View>
                <BottomTabBar {...props.props} />
            </View>
        )
    }else{
        return(
        <BottomTabBar {...props.props} />
        )
    }
}

//Whatever a function component returns is rendered as a React element. React elements let you describe what you want to see on the screen.

const Tabs = () => { // creating a functional component for the floating button transition
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false, // Hide Lables
                style: {
                    height: 60,
                    backgroundColor: 'transparent',
                    elevation: 0 //This is necessary for android otherwise the transparency wouldn't be achieved.
                }
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen // Ceating a tab
                name="Home" // Assigning a identifier
                component={Home} // Spicified the component
                options={{
                    tabBarIcon: ({ focused }) => ( //Logic for changing Color when tab is Focused 
                        <Image
                            source={icons.cutlery}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary //ternary if statement
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            //Most components can be customized when they are created, with different parameters. These created parameters are called props, short for properties.
                            {...props}
                        />
                    )
                }}

            />
            <Tab.Screen // Ceating a tab
                name="Search" // Assigning a identifier
                component={Restaurant} // Spicified the component
                options={{
                    tabBarIcon: ({ focused }) => ( //Logic for changing Color when tab is Focused 
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary //ternary if statement
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            //Most components can be customized when they are created, with different parameters. These created parameters are called props, short for properties.
                            {...props}
                        />
                    )
                }}

            />
            <Tab.Screen // Ceating a tab
                name="Test" // Assigning a identifier
                component={Test} // Spicified the component
                options={{
                    tabBarIcon: ({ focused }) => ( //Logic for changing Color when tab is Focused 
                        <Image
                            source={icons.like}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary //ternary if statement
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            //Most components can be customized when they are created, with different parameters. These created parameters are called props, short for properties.
                            {...props}
                        />
                    )
                }}

            />
            <Tab.Screen // Ceating a tab
                name="User" // Assigning a identifier
                component={OrderDelivery} // Spicified the component
                options={{
                    tabBarIcon: ({ focused }) => ( //Logic for changing Color when tab is Focused 
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary //ternary if statement
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            //Most components can be customized when they are created, with different parameters. These created parameters are called props, short for properties.
                            {...props}
                        />
                    )
                }}

            />
        </Tab.Navigator>
    )
}

export default Tabs;