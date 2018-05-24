import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './routes';

export default class App extends Component {
  render() {
    return (
      <Routes/>
    );
  }
}

AppRegistry.registerComponent('Bookr', () => App)
