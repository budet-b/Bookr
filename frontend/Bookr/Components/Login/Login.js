import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import axios from 'axios'

var t = require('tcomb-form-native');

var Form = t.form.Form;

var User = t.struct({
  username: t.String,
  password: t.String
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
    secureTextEntry: true
    }
  }
};


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        myKey: null
    }
    this.onPress = this.onPress.bind(this);
  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      this.setState({myKey: value});
      console.log(this.state.myKey);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      var user = User({
        username: value.username,
        password: value.password
      })
      console.log(user); // value here is an instance of Person
      axios.post("http://localhost:8080/login", {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        console.log(response);
        saveKey(response);
      }).catch((error) => {
        console.log(error)
      })
    } else {
      //
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={User}
          options={options}
          style={styles.form}
        />
      <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
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
