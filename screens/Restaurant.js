import React from 'react'
import {
    View,
    Button,
    TextInput,
    StyleSheet
} from 'react-native'

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

export default class SignUp extends React.Component {
    state = {
        username: '', password: '', email: '', phone_number: ''
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    signUp = async () => {
        const { username, password, email, phone_number } = this.state
        try {
            // here place your signup logic
            console.log('user successfully signed up!: ', success)
        } catch (err) {
            console.log('error signing up: ', err)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Price'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Rating'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('email', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Calories'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('phone_number', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Duration'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Discription'
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.secondary}
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <View style={{ margin: 10 }}>
                    <Button
                        title="Decrypt Data"
                        color={COLORS.primary}
                        accessibilityLabel="Tap to Decrypt Data"
                        onPress={() => {
                            Alert.alert('You tapped the Decrypt button!');
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})