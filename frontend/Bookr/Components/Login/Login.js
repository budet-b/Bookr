import React, { Component } from 'react';
import { Text, Image, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import Signup from '../Signup/Signup';
import config from '../Misc/Constant'
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography';
import bootstrap from 'tcomb-form-native/lib/stylesheets/bootstrap.js';
import { LinearGradient } from 'expo';

var t = require('tcomb-form-native');

var Form = t.form.Form;

var User = t.struct({
  username: t.String,
  password: t.String
});



export default class Login extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
        isLoading: false,
        myKey: null,
        signup: false,
        isLoggin: false
    }
    this.onPress = this.onPress.bind(this);
  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async getKey() {
    try {
      const value = await AsyncStorage.getItem('token');
      this.setState({myKey: value});
      console.log(this.state.myKey);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  errorPopup() {
    Alert.alert(
      'Erreur dans le login',
      'Merci de vérifier vos information',
      [
        {text: 'Réessayer', style: 'cancel'}
      ],
      { cancelable: false }
    );
  }

  onPress() {
    var value = this.refs.form.getValue();
    this.setState({
      isLoading: true
    })
    if (value) {
      var user = User({
        username: value.username,
        password: value.password
      })
      console.log(user); // value here is an instance of Person
      //LOGIN
      console.log("url")
      console.log(config.user.LOGIN)
      axios.post(config.user.LOGIN, {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        console.log(response.data);
        this.saveKey(response.data.token);
        this.setState({isLoggin: true, isLoading: false})
      }).catch((error) => {
        this.errorPopup();
        console.log(error)
      })
    } else {
      this.errorPopup();
      this.setState({
        isLoading: false
      })
    }
  }

  signup() {
    this.setState({ signup: true});
  }

  render() {
    if (this.state.isLoading) {
      return (
      <View style={[styles.containerActivity, styles.horizontal]}>
       <ActivityIndicator size="large" color="#2999f3" />
     </View>
      )
    }
    let options = {
      stylesheet : bootstrap,
      order: ['username', 'password'],
      fields: {
      username: {
        returnKeyType: "next",
        placeholder: 'username',
        error: 'Insert a valid username',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        onSubmitEditing: (event) => this.refs.form.getComponent('password').refs.input.focus()
      },
      password: {
        placeholder: 'my-super-password',
        secureTextEntry: true,
        returnKeyType: "done"
        }
      }
    };
    options.stylesheet.textbox.normal = {
      color: '#000',
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderWidth: 0,
      marginBottom: 5,
      width: 230
    };
    if (this.state.isLoggin)
    {
      this.props.navigation.replace('Home')
    }
    return (
      <View style={styles.MainContainer}>
      <Text style={styles.title}> Book'R </Text>
      <Image
      source={require('../Misc/logo.png')}
        style={{
          width: 150,
          height: 150
        }}
        />
        <Form
          ref="form"
          type={User}
          options={options}
          style={styles.form}
        />
        <LinearGradient
          colors={['#2ec9f9', '#2a9df4', '#2572ee']}
          style={{ alignItems: 'center', borderRadius: 10 }}>
          <TouchableHighlight style={styles.button}  onPress={this.onPress} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
        </LinearGradient>

        <View style={styles.bottomView}>
          <Text style={[styles.buttonText, {color: '#000'}]}>No account ? Create one: </Text>
          <LinearGradient
            colors={['#ffe70b', '#ff8305', '#ff3401']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{ alignItems: 'center', borderRadius: 10 }}>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Signup')} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableHighlight>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    bottomView:{
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 50
    },
  MainContainer:
    {
        flex: 1,
        alignItems:'center',
        backgroundColor: '#FFF'
    },
    form: {
      width: 200,
    },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'transparent'
  },
  title: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    ...sanFranciscoWeights.heavy,
    fontSize: 30,
    alignSelf: 'center',
  },
  buttonText: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    ...sanFranciscoWeights.medium,
    borderWidth: 0,
    borderColor: 'transparent',
    fontSize: 18,
    color: '#FFF',
    alignSelf: 'center'
  },
  containerActivity: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  button: {
    width: 200,
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'transparent'
  }
});
