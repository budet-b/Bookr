import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Router } from 'react-router'
import Routes from './routes';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import { StackNavigator } from 'react-navigation';

const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup }
});

export default class App extends Component {
  render() {
    return (
        <AppNavigator />

    );
  }
}

AppRegistry.registerComponent('Bookr', () => App)
