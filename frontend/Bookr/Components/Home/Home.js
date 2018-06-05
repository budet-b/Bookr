import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, TabBarIOS } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import axios from 'axios'

export default class Home extends Component {

  render() {
    return (
      <BottomTabBar item={0} {...this.props}/>
    );
  }
}
