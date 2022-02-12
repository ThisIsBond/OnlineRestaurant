import React, { useState, useEffect, Fragment } from "react";
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { categoriesDatafromDB } from "./index";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  Text,
  BackHandler,
  ImageBackground,
  Button,
  Alert
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { NavigationContainer, CommonActions, useFocusEffect } from '@react-navigation/native';
import { NavigationActions, StackActions } from 'react-navigation';
import Restaurant from "./Restaurant";
import { tempUID } from './Login';
import { cartDatafromDB } from "./Login";
import { dynamicCartRef } from './Login';
import { setOrderRef } from './Login';
import { refUserLikedItems } from './Login';

var restaurantDatafromDB
export const currentUID = [];
var data = null
console.log("main thread Home ");

const RestaurantTest = ({ navigation }) => {


  const [restaurents, setRestaurents] = useState(null);
  const [categories, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [loading, setLoading] = useState(false);
  const [cartLength, setCartLength] = useState();
  const [liked, setLiked] = useState(false);

  const ref = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("menu");
  const refCategory = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("category");
  const refUsers = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection("users");

  // const navigateAction = NavigationActions.navigate({
  //     routeName: 'Home',

  //     params: {},

  //     action: NavigationActions.navigate('Home'),
  // });

  // navigation.dispatch(navigateAction);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);

    }, []));

  firebase.firestore()
    .collection("RestaurantData").doc('RestaurantData')
    .collection("users").doc(setOrderRef.id)
    .collection("Orders").doc("orders")
    .collection('cart').onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        // cartDatafromDB.push(doc.data())
      });
      setCartLength(items.length);
    });


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

    setRestaurents(null)
    data = restaurantDatafromDB.filter(restaurents => restaurents.categories == category.id)
    setRestaurents(data)
  
    // var checkUnique = [ ...new Set(data.map(isUnique => isUnique.name))]

    console.log("Data => " + data.length);

    // console.log(categoriesDatafromDB);

    // console.log({data});
    //filter restaurant
    // let restaurantList = restaurantdata.filter(a => a.categories.includes(category.id))

    // setRestaurentdata(restaurantList)

    setSelectedCategory(category) // this is helpful for making change in background color of category 

    // console.log({restaurantDatafromDB});
    // console.log({category});
    // console.log({categories});
    // console.log({restaurantdata});
  }

  function getCategoryNameById(id) {
    let category = categories.filter(a => a.id == id)

    if (category.length > 0) {
      return categories[0].id
    }
    // return "" // This Can create conflict when we add the realtime database 
  }

  function getIndex(category) {
    if (categoriesDatafromDB.findIndex(a => a.index) === category) {
      return a.name
    }
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
            <Text style={{ ...FONTS.h3 }}> Porbandar </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center'
          }}
          onPress={() => navigation.navigate('Stack', { screen: 'Cart' })}
        >
          <ImageBackground
            source={icons.shopping_basket}
            resizeMode='contain'
            style={{
              width: 30,
              height: 30
            }}
          >
            <View style={{
              top: '70%',

              alignContent: 'center',
              justifyContent: 'center',
              ...styles.CircleShapeView
            }}>
              <Text style={{
                alignSelf: 'center',
                ...FONTS.body5
              }}>{cartLength}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View >
    )
  }

  function renderCategory() {

    const getCategory = () => {

      let unmounted = false; // to fix memory leak in useEffect hook react

      refCategory.onSnapshot((querySnapshot) => {
        
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
          if (categoriesDatafromDB.length < 7) {
            categoriesDatafromDB = items
          }
          else {
            return ""
          }
        });
        setCategory(items);
        setLoading(false)
      });
      unmounted = true
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
              source={{ uri: item.image }}
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
        });
        restaurantDatafromDB = items
        setRestaurents(items);
        setLoading(false)
      });

    }

    useEffect(() => {
      getRestaurents();
    }, [])

    // function getFirebaseImage(ref) {
    //     console.log("Home   =>" + ref);
    //     firebase
    //         .storage()
    //         .ref('gs://' + ref )
    //         .getDownloadURL()
    //         .then((url) => {
    //             console.log("URL => " + url );
    //             return url
    //         })
    //         .catch((e) => console.log('getting downloadURL of image error => ', e))
    // }
    const onLikePress = (item) => {

      var DuplicateData = false

      var querytry = refUserLikedItems.where('uuid', '==', item.uuid);
      querytry.get().then(snapshot => {
        snapshot.forEach(item => {
          if (item.data().uuid == item.uuid) {
            DuplicateData = true
          }
          else {
            DuplicateData = false
          }
        })
      }).then(() => {
        if (DuplicateData == false) {
          refUserLikedItems.doc(item.uuid).set({
            id: item.uuid,
            name: item.name,
            price: item.price,
            uuid: item.uuid,
            calories: item.calories,
            description: item.description,
            duration: item.duration,
            imageFileName: item.imageFileName
          })
        } else {
          Alert.alert('Item Already Exist!!!!!!')
        }
      })
    }

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

        onPress={() => navigation.navigate("Recipe", {
          item
        })}
      >

        {/*image*/}

        <View
          style={{
            marginBottom: SIZES.padding
          }}
        >
          <Image
            source={{
              uri: item.imageFileName
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
            <Text style={{ ...FONTS.h4 }}>₹ {item.price}</Text>
          </View>
        </View>

        {/* Restaurant Info */}
        <View
          style={{
            flexDirection: 'row', justifyContent: 'space-between' // if we need multipal flex direction for same view component then justifyContent:'space:between is used'
          }}
        >
          <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

          {/* Like  */}
          <Button
            color='#fe7501'
            title="Like"
            onPress={() => onLikePress(item)}
          />
        </View>

        {/* Ratings */}
        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: 'row'
          }}
        >

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
            <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}></Text>
            <Text style={{ ...FONTS.h4 }}>  Delivery under {item.duration} minutes</Text>

          </View>
        </View>
      </TouchableOpacity>
    )
    return (
      <FlatList
        data={restaurents}
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
  },
  CircleShapeView: {
    width: 16,
    height: 16,
    borderRadius: 150 / 2,
    backgroundColor: '#fb7b1a'
  },
})
export default RestaurantTest;
