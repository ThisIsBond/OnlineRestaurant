import React, { useState, useEffect, Fragment } from "react";

import firebase from "@react-native-firebase/app";


import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    View,
    Text
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const restaurantDatafromDB = [];
export const categoriesDatafromDB = [];
console.log("main thread Home ");
const Home = ({ navigation }) => {


    const [Restaurents, setRestaurents] = useState([]);
    const [categories, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [loading, setLoading] = useState(false);

    const ref = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("menu");
    const refCategory = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("category");



    function onSelectCategory(category) {

        // const filterCategory = selectedCategory ? ref.where("categories","==" , selectedCategory) : ref;

        // var data

        // ref
        // .where('categories', '==', selectedCategory)
        // .get()
        // .then(querySnapshot => {
        //     querySnapshot.forEach(doc => {
        //         data = doc.data().categories
        //     })
        // });

        // var data

        // filterCategory.get().then(snapshot => {
        //     snapshot.docs.forEach( doc => {
        //         data = { ...doc.data(), id: doc.id};
        //         console.log(data);
        //     })
        // });
        var data = restaurantDatafromDB.filter(restaurantDatafromDB => restaurantDatafromDB.categories == category.id)
        console.log(data);
        console.log(categoriesDatafromDB);
        // console.log({data});
        //filter restaurant
        // let restaurantList = restaurantdata.filter(a => a.categories.includes(category.id))

        // setRestaurentdata(restaurantList)

        setSelectedCategory(category)

        // console.log({restaurantDatafromDB});
        // console.log({category});
        // console.log({categories});
        // console.log({restaurantdata});
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return "" // This Can create conflict when we add the realtime database 
    }

    function renderHeader() { //created the header part
        return (
            <View style={{ flexDirection: 'row', height: 50, paddingTop: 10 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: '100%',
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius

                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}> Porbander </Text>
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
                        source={icons.shopping_basket}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View >
        )
    }

    function renderCategory() {

        const getCategory = () => {
            refCategory.onSnapshot((querySnapshot) => {

                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                    if (categoriesDatafromDB.length < 7) {
                        categoriesDatafromDB.push(doc.data())
                    }
                    else {
                        return ""
                    }
                });
                setCategory(items);
                setLoading(false)
            });
        }
        useEffect(() => {
            getCategory();
        }, [])


        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: SIZES.padding,
                        ...styles.shodow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={require('../assets/images/pizza.jpg')}
                            resizeMode='contain'
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                    <Text

                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1 }}>Main</Text>
                <Text style={{ ...FONTS.h1 }}>Catagories</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    function FirebaseDataRetrive() {
        const getRestaurents = () => {
            setLoading(true);
            ref.onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                    restaurantDatafromDB.push(doc.data());
                });
                setRestaurents(items);
                setLoading(false)
            });
        }

        useEffect(() => {
            getRestaurents();
        }, [])

        const renderRestaurent = ({ item }) => (
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
            // onPress -> Navigate to restaurant screen when pressed on recipe

            // onPress={() => navigation.navigate("Restaurent", {
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
                        source={require('../assets/images/pizza.jpg')}
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
                        <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

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
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            // item.categories.map((categoryId) => {
                            //     return (
                            //         <View
                            //             style={{
                            //                 flexDirection: 'row'
                            //             }}
                            //             key={categoryId}
                            //         >
                            //             <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                            //             <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}> . </Text>
                            //         </View>
                            //     )
                            // })
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={Restaurents}
                keyExtractor={(item, index) => `${item.id}` + index}
                renderItem={renderRestaurent}
                contentContainerStyle={{
                    padding: SIZES.padding,
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />

        )
    }
    return (
        <SafeAreaView
            style={
                styles.container
            }
        >
            {renderHeader()}
            {renderCategory()}
            {FirebaseDataRetrive()}


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
export default Home;