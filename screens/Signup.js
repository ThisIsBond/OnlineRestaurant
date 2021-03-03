import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'


export default class Signup extends Component {

  constructor() {
    super();

    this.refUsers = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection('users');

    this.state = {
      displayName: '',
      email: '',
      password: '',
      uid: '',
      isLoading: true
    }
  }

  updateInputVal = (key, val) => {
    // prop, val
    // const state = this.state;
    // state[prop] = val;
    // this.setState(state);
    this.setState({ [key]: val })

  }

  signUp = async () => {
    const { uid } = auth().currentUser;
    this.setState({ isLoading: true })
    const { email, displayName } = this.state
    try {
      // here place your signup logic
      this.refUsers.add({
        email: this.state.email,
        displayName: this.state.displayName,
        uid: uid,
      }).then((res) => {
        this.setState({
          email: "",
          displayName: "",
          uid: "",
          password:""
        });
      }).catch((err) => {
        Alert.alert('Error');
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }


  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: false,
      })
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName
          }).then(
            this.signUp,
          )
          this.props.navigation.navigate('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
      console.log('User registered successfully!');
    }
  }

  render() {
    if (this.state.isLoading == false) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal('displayName', val)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal('email', val)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal('password', val)}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.registerUser()}
        />

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});