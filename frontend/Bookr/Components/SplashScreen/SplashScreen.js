import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import axios from 'axios';

import Login from '../Login/Login';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: ''
   };
  }

  componentDidMount() {
    AsyncStorage.getItem('token',
    (value) => {
      this.setState({ token: value });
    });
    let token = this.state.token;
    if (token) {
      let header = {
        headers: {'Authorization': 'Bearer ' + token}
      };
      axios.get("http://localhost:8080/user/", header)
      .then((response) => {
        this.setState(isLoggedIn: true);
      })
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Text>Didier</Text>
      );
    }
    else {
      return <Login/>;
    }
  }
}
