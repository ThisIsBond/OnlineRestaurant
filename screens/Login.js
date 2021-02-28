// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';
// import { NavigationContainer, CommonActions, StackActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationActions } from 'react-navigation';

// export default class Login extends Component {

//   constructor() {
//     super();
//     this.state = { 
//       email: '', 
//       password: '',
//       isLoading: false
//     }
//   }

//   updateInputVal = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   }

//   userLogin = ( navigation ) => {
//     if(this.state.email === '' && this.state.password === '') {
//       Alert.alert('Enter details to signin!')
//     } else {
//       this.setState({
//         isLoading: true,
//       })
//       firebase
//       .auth()
//       .signInWithEmailAndPassword(this.state.email, this.state.password)
//       .then((res) => {
//         console.log(res)
//         console.log('User logged-in successfully!')
//         this.setState({
//           isLoading: false,
//           email: '', 
//           password: ''
//         })
//         //this.props.navigation.navigate('Home')

//         // const resetAction = StackActions.push({
//         //     index: 0,
//         //     //key: null,
//         //     //actions: [NavigationActions.navigate({ routeName : 'Home' })]
//         //     routes:[{ name: 'Home'}]
//         // })
//         // this.props.navigation.dispatch(resetAction)


//         this.props.navigation.reset({
//             index: 0,
//             routes: [{ name: 'Home' }]
//        })
//       })
//       .catch(error => console.log(error.message))
//     }
//   }

//   render() {
//     if(this.state.isLoading){
//       return(
//         <View style={styles.preloader}>
//           <ActivityIndicator size="large" color="#9E9E9E"/>
//         </View>
//       )
//     }    
//     return (
//       <View style={styles.container}>  
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Email"
//           value={this.state.email}
//           onChangeText={(val) => this.updateInputVal(val, 'email')}
//         />
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Password"
//           value={this.state.password}
//           onChangeText={(val) => this.updateInputVal(val, 'password')}
//           maxLength={15}
//           secureTextEntry={true}
//         />   
//         <Button
//           color="#3740FE"
//           title="Signin"
//           onPress={() => this.userLogin()}
//         />   

//         <Text 
//           style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Signup')}>
//           Don't have account? Click here to signup
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
import auth from '@react-native-firebase/auth';
import { NavigationContainer, CommonActions, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationActions } from 'react-navigation';
import { BasicButton } from '@phomea/react-native-buttons';
import { COLORS } from '../constants';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField, FilledTextField, OutlinedTextField } from 'rn-material-ui-textfield'



export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false

    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  changeIcon = () => {
    this.state.icon !== "eye-off"
      ? (this.setState({ icon: 'eye-off' }), this.setState({ hidePassword: false }))
      : (this.setState({ icon: 'eye' }), this.setState({ hidePassword: true }))
  }


  userLogin = (navigation) => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res)
          console.log('User logged-in successfully!')
          this.setState({
            isLoading: false,
            email: '',
            password: ''
          })
          //this.props.navigation.navigate('Home')

          // const resetAction = StackActions.push({
          //     index: 0,
          //     //key: null,
          //     //actions: [NavigationActions.navigate({ routeName : 'Home' })]
          //     routes:[{ name: 'Home'}]
          // })
          // this.props.navigation.dispatch(resetAction)


          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
          })
        })
        .catch(error => console.log(error.message))
    }
  }

  render() {
    if (this.state.isLoading) {
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
          height: 812,
          left: '-4.5%',
          top: -40,
          justifyContent: 'center'
        }}>
        </ImageBackground>
        <View>
          <Image
            style={styles.ImageStyleF}
            source={require('../assets/images/logo.png')}
          />
        </View>
        <View style={{
          //width: 323,
          right: -10,
          top: '-20%'
        }}>
          <View>
            <Image source={require('../assets/icons/email.png')} style={styles.ImageStyle} />
          </View>
          <TextField
            style={{
              borderColor: '#fb7b1a',
              borderBottomWidth: 1.3,
              marginBottom: -6
            }}
            tintColor='#fb7b1a'
            label="Email"
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
          />
          <View
            style={{
              top: '23.2%',
              borderBottomWidth: 1.3,
              borderColor: '#fb7b1a',
              marginBottom: 5
            }}
          >
          </View>
          <PasswordInputText
            tintColor='#fb7b1a'
            value={this.state.password}
            maxLength={15}
            iconColor="#fb7b1a"
            iconSize={20}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
          />
          <BasicButton
            buttonStyle={{
              backgroundColor: COLORS.primary,
              width: 90,
              marginTop: 30
            }}
            color='grey'
            title="Signin"
            animation='bounce'
            onPress={() => this.userLogin()}
          />

          <Text
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Signup')}>
            Don't have account? Click here to signup
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
    top: '-190%',
    left: '-30.4%',
    marginTop: 5,
    height: 120,
    width: '165%',
    resizeMode: 'contain',
  },
  loginText: {
    color: '#fb7b1a',
    marginTop: 25,
    textAlign: 'center'
  },
  inputStyleF: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  inputStyleS: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
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
  image: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
});