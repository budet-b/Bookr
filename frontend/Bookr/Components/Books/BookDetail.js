import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: 0
    }
  }

  componentDidMount() {
    this.setState({
      bookId: this.props.navigation.state.params.bookid
    })
  }

  render() {
    return (
      <View>
        <Text>{this.state.bookId}</Text>
      </View>
    );
  }
}
