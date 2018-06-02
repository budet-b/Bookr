import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Router } from 'react-router'
import Routes from './routes';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Books from './Components/Books/Books';
import Home from './Components/Home/Home';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import { StackNavigator } from 'react-navigation';

const AppNavigator = StackNavigator({
  //Login: { screen: Login },
  //Signup: { screen: Signup },
  Home: { screen: Home },
  Books: { screen: Books }
});

export default class App extends Component {
  constructor (props) {
    super();
    this.state = {
      selectedTab: 'Home',
    }
  }

  render() {
    return (
        <AppNavigator />

    );
  }
}

AppRegistry.registerComponent('Bookr', () => App)
