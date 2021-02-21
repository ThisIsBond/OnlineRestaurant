import Home from './Home'
import Restaurant from './Restaurant'
import OrderDelivery from './OrderDelivery'
import Test from './Test'
import Recipe from './Recipe'
import ImagePickerTest from './ImagePickerTest';
import firebase from "@react-native-firebase/app";
import { firebaseConfig } from "../firebaseDb"
import {categoriesDatafromDB} from "./Home"


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    console.log(categoriesDatafromDB);
    // const getCategory = () => {
    //     refCategory.onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //             categoriesDatafromDB.push(doc.data())
    //         });
    //         setCategory(items);
    //         setLoading(false)
    //     });
    // }
    // return(
    //     {getCategory}
    // )
    //console.log(categoriesDatafromDB);
    
export {
    Home,
    Restaurant,
    OrderDelivery,
    Test,
    Recipe,
    ImagePickerTest
}