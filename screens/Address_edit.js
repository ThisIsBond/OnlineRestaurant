import React, { useEffect, useState } from "react"
import {
    View,
    Button,
    TextInput,
    StyleSheet,
    Alert,
    Right,
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { refUserAddressBook } from './Login';
import { v4 as uuidv4 } from 'uuid';
import { BasicButton } from "@phomea/react-native-buttons";

var India_States = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
]

var idList
var data
var UpdataData = { "accommodation_name": "" }

const Address_edit = ({ route, navigation }) => {

    const [state, setState] = React.useState(null);
    // const [addressData, setAddressData] = useState(null);
    const [addressBookDatafromDB, setAddressBookDatafromDB] = useState(null);
    const [accommodation_name, setAccommodation_name] = useState('');
    const [area_name, setArea_name] = useState('');
    const [landmark_name, setLandmark_name] = useState('');
    const [city_name, setCity_name] = useState('');
    const [state_name, setState_name] = useState('');

    React.useEffect(() => {

        let { item } = route.params;
        // setAddressData(item)
        idList = item.id
        data = item

        return () => {
            setState({});
        };
    }, []);

    const update_address = (item) => {
        refUserAddressBook.doc(item).update({
            'accommodation_name' : accommodation_name,
            'area_name' : area_name,
            'city_name' : city_name,
            'landmark_name' : landmark_name,
            'selectedPickerValue' : state_name,

        }).then(() => 
            navigation.goBack()
        )
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50, paddingTop: 10, marginBottom: '2%' }}>
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
                        <Text style={{ ...FONTS.h3 }}> Address Manager</Text>
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

    function renderOldAddress() {

        const getAddressfmDB = () => {
            refUserAddressBook.doc(idList).get()
                .then(snapshot => {
                    setAddressBookDatafromDB(snapshot.data())
                });
        }

        useEffect(() => {
            getAddressfmDB();
        }, [])

        const renderAddressBookItems = () => (


            <View
                style={{
                    margin: 5,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.white,
                    padding: SIZES.padding,
                    height: 180,
                    width: '95%',
                    borderRadius: 20,
                    ...styles.shodow

                }}>
                <Text style={{
                    bottom: '5%',
                    padding: SIZES.padding,
                    alignSelf: 'center',
                    ...FONTS.h4
                }}> Old Address</Text>
                <View
                    style={{
                        bottom: '7%',
                        alignSelf: 'flex-start'
                    }}
                >
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

                        <Text>  {addressBookDatafromDB?.accommodation_name}</Text>

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

                        <Text>                        {addressBookDatafromDB?.area_name}</Text>
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

                        <Text>              {addressBookDatafromDB?.landmark_name}</Text>
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
                        <Text>                         {addressBookDatafromDB?.city_name}</Text>
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
                        <Text>                      {addressBookDatafromDB?.selectedPickerValue}</Text>
                    </View>
                </View>
            </View>


        )
        return (
            <SafeAreaView>
                {renderAddressBookItems()}
            </SafeAreaView>
        )
    }

    function renderForm() {

        const renderform = () => (
            <View>

                <View style={{
                    ...styles.container
                }}>
                    <Text
                        style={{
                            padding: SIZES.padding,
                            ...FONTS.h4
                        }}
                    >
                        Enter Updated Address
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={accommodation_name}
                        placeholder='House/Flat/Apartment Name'
                        autoCapitalize="none"
                        maxLength={25}
                        placeholderTextColor={COLORS.secondary}
                        onChangeText={val => setAccommodation_name(val)}

                    />
                    <TextInput
                        style={styles.input}
                        value={area_name}
                        placeholder='Area/Society'
                        autoCapitalize="none"
                        maxLength={25}
                        placeholderTextColor={COLORS.secondary}
                        onChangeText={val => setArea_name(val)}

                    />
                    <TextInput
                        style={styles.input}
                        value={landmark_name}
                        placeholder='Landmark'
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.secondary}
                        maxLength={25}
                        onChangeText={val => setLandmark_name(val)}
                    />
                    <TextInput
                        style={styles.input}
                        value={city_name}
                        maxLength={25}
                        placeholder='City'
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.secondary}
                        onChangeText={val => setCity_name(val)}

                    />

                    <View
                        style={styles.rowContainer}

                    >
                        <Picker
                            style={{ width: '99%' }}
                            selectedValue={state_name}
                            onValueChange={(itemValue, itemIndex) => setState_name(itemValue)}
                            placeholderTextColor={COLORS.secondary}
                        >
                            {India_States.map(acct => <Picker.Item key={acct} label={acct} value={acct} />)}


                        </Picker>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: SIZES.padding
                        }}>
                        <BasicButton
                            buttonStyle={{
                                backgroundColor: COLORS.primary,
                                width: 150,

                            }}
                            color='grey'
                            title="Update Address"
                            animation='bounce'
                            onPress={() => {
                               update_address(idList)
                            }}
                        />
                    </View>
                </View>
            </View >
        )
        return (
            <SafeAreaView>
                {renderform()}
            </SafeAreaView>
        )

    }

    return (
        <SafeAreaView>
            {renderHeader()}
            {renderOldAddress()}
            {renderForm()}
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({ // Created the custom stylesheet for manual change in design.
    input: {
        width: 350,
        height: 55,
        backgroundColor: COLORS.white,
        margin: 10,
        padding: 8,
        color: 'black',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',

    },
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
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        padding: 0.5,
        color: 'black',
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 5,
    },
    imageStyle: {
        width: '70%',
        height: 150,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee'
    },
    imagecontainer: {
        width: '100%',
        alignItems: 'center'
    }
})
export default Address_edit;





// import React, { useEffect, useState } from "react"
// import {
//     View,
//     Button,
//     TextInput,
//     StyleSheet,
//     Alert,
//     Right,
//     SafeAreaView,
//     Text,
//     Image,
//     TouchableOpacity,
//     ScrollView,
//     FlatList
// } from "react-native";
// import { Picker } from "@react-native-community/picker";
// import { icons, images, SIZES, COLORS, FONTS } from '../constants'
// import { refUserAddressBook } from './Login';
// import { v4 as uuidv4 } from 'uuid';

// var India_States = [
//     'Andhra Pradesh',
//     'Arunachal Pradesh',
//     'Assam',
//     'Bihar',
//     'Chhattisgarh',
//     'Goa',
//     'Gujarat',
//     'Haryana',
//     'Himachal Pradesh',
//     'Jharkhand',
//     'Karnataka',
//     'Kerala',
//     'Madhya Pradesh',
//     'Maharashtra',
//     'Manipur',
//     'Meghalaya',
//     'Mizoram',
//     'Nagaland',
//     'Odisha',
//     'Punjab',
//     'Rajasthan',
//     'Sikkim',
//     'Tamil Nadu',
//     'Telangana',
//     'Tripura',
//     'Uttar Pradesh',
//     'Uttarakhand',
//     'West Bengal'
// ]

// var addressData = [];
// const Address_edit = ({ route, navigation }) => {

//     const [state, setState] = useState();



//     React.useEffect(() => {

//         let { item } = route.params;
//         addressData = item

//     }, []);

//     const onChangeText = (key, val) => {
//         refUserAddressBook.doc(addressData.id).update({
//             val
//         })
//     }

//     function renderForm() {

//         console.log(addressData);

//         return (
//             <View>
//                 <View style={{ flexDirection: 'row', height: 50, paddingTop: 10, marginBottom: '35%' }}>
//                     <TouchableOpacity
//                         style={{
//                             width: 50,
//                             paddingLeft: SIZES.padding * 2,
//                             justifyContent: 'center'
//                         }}
//                         onPress={() => navigation.goBack()}
//                     >
//                         <Image
//                             source={icons.back}
//                             resizeMode="contain"
//                             style={{
//                                 width: 30,
//                                 height: 30
//                             }}
//                         />
//                     </TouchableOpacity>


//                     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
//                         <View
//                             style={{

//                                 height: 50,
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 paddingHorizontal: SIZES.padding * 3,
//                                 backgroundColor: COLORS.lightGray3,
//                                 borderRadius: SIZES.radius

//                             }}
//                         >
//                             <Text style={{ ...FONTS.h3 }}> Edit Your Address </Text>
//                         </View>
//                     </View>
//                     <TouchableOpacity
//                         style={{
//                             width: 50,
//                             paddingRight: SIZES.padding * 2,
//                             justifyContent: 'center'
//                         }}
//                     >
//                     </TouchableOpacity>
//                 </View>
//                 <View style={{
//                     ...styles.container
//                 }}>

//                     <TextInput
//                         style={styles.input}
//                         value={addressData?.accommodation_name}
//                         placeholder='House/Flat/Apartment Name'
//                         autoCapitalize="none"
//                         maxLength={20}
//                         placeholderTextColor={COLORS.secondary}
//                         onChangeText={val => onChangeText('accommodation_name', val)}

//                     />
//                     <TextInput
//                         style={styles.input}
//                         value={addressData?.area_name}
//                         placeholder='Area/Society'
//                         autoCapitalize="none"
//                         maxLength={20}
//                         placeholderTextColor={COLORS.secondary}
//                         onChangeText={val => onChangeText('area_name', val)}

//                     />
//                     <TextInput
//                         style={styles.input}
//                         value={addressData?.landmark_name}
//                         placeholder='Landmark'
//                         autoCapitalize="none"
//                         placeholderTextColor={COLORS.secondary}
//                         maxLength={20}
//                         onChangeText={val => onChangeText('landmark_name', val)}
//                     />
//                     <TextInput
//                         style={styles.input}
//                         value={addressData?.city_name}
//                         maxLength={20}
//                         placeholder='City'
//                         autoCapitalize="none"
//                         placeholderTextColor={COLORS.secondary}
//                         onChangeText={val => onChangeText('city_name', val)}

//                     />

//                     <View
//                         style={styles.rowContainer}

//                     >
//                         <Picker
//                             style={{ width: '99%' }}
//                             selectedValue={addressData?.selectedPickerValue}
//                             //onValueChange={(itemValue, itemIndex) => this.setState({ selectedPickerValue: itemValue })}
//                             placeholderTextColor={COLORS.secondary}
//                         >
//                             {India_States.map(acct => <Picker.Item key={acct} label={acct} value={acct} />)}


//                         </Picker>
//                     </View>
//                     <View style={{ margin: 10 }}>
//                         <Button
//                             padding={SIZES.padding}
//                             title="Register"
//                             color={COLORS.primary}
//                             accessibilityLabel="Register"
//                         //onPress={this.register_address}
//                         />
//                     </View>
//                 </View>
//             </View >
//         )
//     }

//     return (
//         <SafeAreaView>
//             {renderForm()}
//         </SafeAreaView>

//     )
// }
// const styles = StyleSheet.create({ // Created the custom stylesheet for manual change in design.
//     input: {
//         width: 350,
//         height: 55,
//         backgroundColor: COLORS.white,
//         margin: 10,
//         padding: 8,
//         color: 'black',
//         borderRadius: 14,
//         fontSize: 18,
//         fontWeight: '500',
//     },
//     container: {
//         alignItems: 'center',
//         justifyContent: 'center',

//     },
//     rowContainer: { // Specially created for the Picker to avoid the misalignment of text inside the picker.
//         width: 350,
//         backgroundColor: COLORS.white,
//         margin: 10,
//         padding: 8,
//         color: 'black',
//         borderRadius: 14,
//         fontSize: 18,
//         fontWeight: '500',
//         height: 55,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingLeft: 16,
//     },
//     titleText: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         paddingVertical: 20,
//     },
//     textStyle: {
//         padding: 0.5,
//         color: 'black',
//     },
//     buttonStyle: {
//         alignItems: 'center',
//         flexDirection: 'row',
//         backgroundColor: '#DDDDDD',
//         padding: 5,
//     },
//     imageStyle: {
//         width: '70%',
//         height: 150,
//         borderWidth: 1,
//         borderColor: 'black',
//         backgroundColor: '#eee'
//     },
//     imagecontainer: {
//         width: '100%',
//         alignItems: 'center'
//     }
// })
// export default Address_edit;