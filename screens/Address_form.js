import React from "react"
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
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { refUserAddressBook } from './Login';
import { v4 as uuidv4 } from 'uuid';

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
class Address_form extends React.Component {


    constructor() {
        super();



        //this.menudbRef = firestore().collection("RestaurantData").doc('menu')

        // var documentId = firebase.firestore().collection("RestaurantData").doc("menu").documentId;

        this.state = {
            accommodation_name: '',
            area_name: '',
            landmark_name: '',
            city_name: '',
            selectedPickerValue: ''
        };
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })

    }

    register_address = async ({ navigation }) => {

        const { name, price, rating, calories, duration, description } = this.state
        var uuid = uuidv4();
        console.log(refUserAddressBook);
        try {
            // here place your signup logic
            refUserAddressBook.doc(uuid).set({
                id: uuid,
                accommodation_name: this.state.accommodation_name,
                area_name: this.state.area_name,
                landmark_name: this.state.landmark_name,
                city_name: this.state.city_name,
                selectedPickerValue: this.state.selectedPickerValue,
            }).then((res) => {
                this.setState({
                    accommodation_name: '',
                    area_name: '',
                    landmark_name: '',
                    city_name: '',
                    selectedPickerValue: ''
                });
            }).catch((err) => {
                Alert.alert('Error');
                console.error("Error found: ", err);
                uuid = null
            });
            this.props.navigation.navigate('Stack', { screen: 'Address_manager' })
        } catch (err) {
            console.log('error signing up: ', err)
        }
    }

    render() {
        return (
            <View>

                <View style={{ flexDirection: 'row', height: 50, paddingTop: 10, marginBottom: '35%' }}>
                    <TouchableOpacity
                        style={{
                            width: 50,
                            paddingLeft: SIZES.padding * 2,
                            justifyContent: 'center'
                        }}
                        onPress={() => this.props.navigation.goBack()}
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
                            <Text style={{ ...FONTS.h3 }}> Add New Address </Text>
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
                <View style={{
                    ...styles.container
                }}>

                    <TextInput
                        style={styles.input}
                        value={this.state.accommodation_name}
                        placeholder='House/Flat/Apartment Name'
                        autoCapitalize="none"
                        maxLength={20}
                        placeholderTextColor={COLORS.secondary}
                        onChangeText={val => this.onChangeText('accommodation_name', val)}

                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.area_name}
                        placeholder='Area/Society'
                        autoCapitalize="none"
                        maxLength={20}
                        placeholderTextColor={COLORS.secondary}
                        onChangeText={val => this.onChangeText('area_name', val)}

                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.landmark_name}
                        placeholder='Landmark'
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.secondary}
                        maxLength={20}
                        onChangeText={val => this.onChangeText('landmark_name', val)}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.city_name}
                        maxLength={20}
                        placeholder='City'
                        autoCapitalize="none"
                        placeholderTextColor={COLORS.secondary}
                        onChangeText={val => this.onChangeText('city_name', val)}

                    />

                    <View
                        style={styles.rowContainer}

                    >
                        <Picker
                            style={{ width: '99%' }}
                            selectedValue={this.state.selectedPickerValue}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedPickerValue: itemValue })}
                            placeholderTextColor={COLORS.secondary}
                        >
                            {India_States.map(acct => <Picker.Item key={acct} label={acct} value={acct} />)}


                        </Picker>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            padding={SIZES.padding}
                            title="Register"
                            color={COLORS.primary}
                            accessibilityLabel="Register"
                            onPress={this.register_address}
                        />
                    </View>
                </View>
            </View >

        )
    }


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
export default Address_form;