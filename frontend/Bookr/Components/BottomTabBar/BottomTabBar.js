import React, { Component } from 'react';
import {  TabBarIOS, NavigatorIOS, View, Text, } from 'react-native';
import { Route, Redirect } from 'react-router'


export default class BottomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        myKey: null,
        signup: false
    }
  }

  render() {
    return (
      <TabBarIOS>
      <TabBarIOS.Item title="Home" icon="recents" selected={false}>
        this.props.navigation.replace('Home')
      </TabBarIOS.Item>
      <TabBarIOS.Item title="Books" icon="featured" selected={false}>
        this.props.navigation.replace('Home')
      </TabBarIOS.Item>
      <TabBarIOS.Item title="User" icon="contacts" selected={false}>
      this.props.navigation.replace('Home')
      </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}
