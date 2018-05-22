import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

var t = require('tcomb-form-native');

var Form = t.form.Form;

var User = t.struct({
  username: t.String,
  password: t.String,
  rememberMe: t.Boolean
});

var options = {
  order: ['username', 'password'],
  fields: {
  username: {
    placeholder: 'rodrigue@rodrigue.com',
    error: 'Insert a valid email',
    keyboardType: 'email-address'
  },
  password: {
    secureTextEntry: 'true'
    }
  }
};


export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={User}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={() => console.log("press")} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
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
