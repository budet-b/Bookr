import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import Signup from '../Signup/Signup';
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
    if (value) {
      var user = User({
        username: value.username,
        password: value.password
      })
      console.log(user); // value here is an instance of Person
      axios.post("http://localhost:8080/api/user/login", {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        console.log(response.data);
        this.saveKey(response.data.token);
        this.setState({isLoggin: true})
      }).catch((error) => {
        this.errorPopup();
        console.log(error)
      })
    } else {
      this.errorPopup();
    }
  }

  signup() {
    console.log("route");
    this.setState({ signup: true})
    ;
  }

  render() {

    let options = {
      order: ['username', 'password'],
      fields: {
      username: {
        returnKeyType: "next",
        placeholder: 'rodrigue@rodrigue.com',
        error: 'Insert a valid email',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        onSubmitEditing: (event) => this.refs.form.getComponent('password').refs.input.focus()
      },
      password: {
        secureTextEntry: true,
        returnKeyType: "done"
        }
      }
    };
    if (this.state.isLoggin)
    {
      this.props.navigation.replace('Home')
    }
    return (
      <View style={styles.MainContainer}>
        <Form
          ref="form"
          type={User}
          options={options}
          style={styles.form}
        />
      <TouchableHighlight style={styles.button}  onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <View style={styles.bottomView}>
          <Text>No account ? Create one: </Text>
          <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Signup')} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableHighlight>
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
        paddingTop: ( Platform.OS === 'ios' ) ? 50 : 0
    },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
