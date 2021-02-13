import Home from './Home'
import Restaurant from './Restaurant'
import OrderDelivery from './OrderDelivery'
import Test from './Test'
import firebase from "@react-native-firebase/app";
import { firebaseConfig } from "../firebaseDb"


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {
    Home,
    Restaurant,
    OrderDelivery,
    Test,
}