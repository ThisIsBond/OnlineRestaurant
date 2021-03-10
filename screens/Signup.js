// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth'


// export default class Signup extends Component {

//   constructor() {
//     super();

//     this.refUsers = firebase.firestore().collection("RestaurantData").doc('RestaurantData').collection('users');

//     this.state = {
//       displayName: '',
//       email: '',
//       password: '',
//       uid: '',
//       isLoading: true
//     }
//   }

//   updateInputVal = (key, val) => {
//     // prop, val
//     // const state = this.state;
//     // state[prop] = val;
//     // this.setState(state);
//     this.setState({ [key]: val })

//   }

//   signUp = async () => {
//     const { uid } = auth().currentUser;
//     this.setState({ isLoading: true })
//     const { email, displayName } = this.state
//     try {
//       // User Details is being pushed to firestore database while simultaniously after signin.
//       this.refUsers.add({
//         email: this.state.email,
//         displayName: this.state.displayName,
//         uid: uid,
//       }).then((res) => {
//         this.setState({
//           email: "",
//           displayName: "",
//           uid: "",
//           password:""
//         });
//       }).catch((err) => {
//         Alert.alert('Error');
//         console.error("Error found: ", err);
//         this.setState({
//           isLoading: false,
//         });
//       });
//     } catch (err) {
//       console.log('error signing up: ', err)
//     }
//   }


//   registerUser = () => {
//     if (this.state.email === '' && this.state.password === '') {
//       Alert.alert('Enter details to signup!')
//     } else {
//       this.setState({
//         isLoading: false,
//       })
//       auth()
//         .createUserWithEmailAndPassword(this.state.email, this.state.password)
//         .then((res) => {
//           res.user.updateProfile({
//             displayName: this.state.displayName
//           }).then(
//             this.signUp,
//           )
//           this.props.navigation.navigate('AuthStack', { screen: 'Login' })
//         })
//         .catch(error => this.setState({ errorMessage: error.message }))
//       console.log('User registered successfully!');
//     }
//   }

//   render() {
//     if (this.state.isLoading == false) {
//       return (
//         <View style={styles.preloader}>
//           <ActivityIndicator size="large" color="#9E9E9E" />
//         </View>
//       )
//     }
//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Name"
//           value={this.state.displayName}
//           onChangeText={(val) => this.updateInputVal('displayName', val)}
//         />
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Email"
//           value={this.state.email}
//           onChangeText={(val) => this.updateInputVal('email', val)}
//         />
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Password"
//           value={this.state.password}
//           onChangeText={(val) => this.updateInputVal('password', val)}
//           maxLength={15}
//           secureTextEntry={true}
//         />
//         <Button
//           color="#3740FE"
//           title="Signup"
//           onPress={() => this.registerUser()}
//         />

//         <Text
//           style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('AuthStack', { screen: 'Login' })}>
//           Already Registered? Click here to login
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     padding: 35,
//     backgroundColor: '#fff'
//   },
//   inputStyle: {
//     width: '100%',
//     marginBottom: 15,
//     paddingBottom: 15,
//     alignSelf: "center",
//     borderColor: "#ccc",
//     borderBottomWidth: 1
//   },
//   loginText: {
//     color: '#3740FE',
//     marginTop: 25,
//     textAlign: 'center'
//   },
//   preloader: {
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff'
//   }
// });










import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, ImageBackground, Image } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'
import { BasicButton } from '@phomea/react-native-buttons';
import { COLORS } from '../constants';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'rn-material-ui-textfield';

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
      // User Details is being pushed to firestore database while simultaniously after signin.
      this.refUsers.add({
        email: this.state.email,
        displayName: this.state.displayName,
        uid: uid,
      }).then((res) => {
        this.setState({
          email: "",
          displayName: "",
          uid: "",
          password: ""
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
          this.props.navigation.navigate('AuthStack', { screen: 'Login' })
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
        <ImageBackground source={require('../assets/images/AI_Sharpen.jpg')} style={{
          flex: 1,
          // width: 375,
          width: '107.5%',
          height: '375%',
          left: '-4.5%',
          top: '-5%',
          justifyContent: 'center'
        }}>
        </ImageBackground>
        <View
          style={{
            top: '-1%'
          }}
        >
          <Image
            style={styles.ImageStyleF}
            source={require('../assets/images/logo.png')}
          />
        </View>
        <View style={{
          //width: 323,
          right: -10,
          top: '-14%'
        }}>
          <View
            style={{
              top: '32.5%'
            }}
          >
            <Image source={require('../assets/icons/username.png')} style={styles.ImageStyle} />
          </View>
          <View
            style={{
              top: '9%'
            }}
          >
            <Image source={require('../assets/icons/email.png')} style={styles.ImageStyle} />
          </View>
          <View
            style={{
              top: '36%'
            }}
          >
            <Image source={require('../assets/icons/password.png')} style={styles.ImageStyle} />
          </View>
          <View

          >
            <TextField
              style={{
                borderColor: '#fb7b1a',
                borderBottomWidth: 1.3,
                marginBottom: -6
              }}
              maxLength={20}
              tintColor='#fb7b1a'
              label="Email"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal('email',val)}
            />

            <TextField
              style={{
                borderColor: '#fb7b1a',
                borderBottomWidth: 1.3,
                marginBottom: -6
              }}
              maxLength={20}
              tintColor='#fb7b1a'
              label="Username"
              value={this.state.displayName}
              onChangeText={(val) => this.updateInputVal('displayName',val)}
            />
          </View>
          {/* <View
            style={{
              top: '15.7%',
              borderBottomWidth: 1.3,
              borderColor: '#fb7b1a',
              marginBottom: 1,
            }}
          >
          </View> */}

          <TextField
            style={{
              borderColor: '#fb7b1a',
              borderBottomWidth: 1.3,
              marginBottom: -6
            }}
            label="Password"
            tintColor='#fb7b1a'
            value={this.state.password}
            maxLength={15}
            iconColor="#fb7b1a"
            iconSize={20}
            secureTextEntry={true}
            onChangeText={(val) => this.updateInputVal('password',val)} />

          <BasicButton
            buttonStyle={{
              backgroundColor: COLORS.primary,
              width: 95,
              marginTop: 30
            }}
            color='grey'
            title="Register"
            animation='bounce'
            onPress={() => this.registerUser()}
          />

          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('AuthStack', { screen: 'Login' })}>
            Already Registered? Click here to login
        </Text>
        </View>
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
    paddingLeft: 13,
    backgroundColor: '#f8f7fc'
  },
  ImageStyle: {
    top: '190%',
    left: '8.4%',
    marginTop: 5,
    height: 25,
    width: '178%',
    resizeMode: 'contain',
  },
  ImageStyleF: {
    top: '-150%',
    left: '-30.4%',
    marginTop: 5,
    height: 112,
    width: '165%',
    resizeMode: 'contain',
  },
  loginText: {
    color: '#fb7b1a',
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
  },
});


