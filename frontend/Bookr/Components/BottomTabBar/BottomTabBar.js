import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, TabBarIOS } from 'react-native';
import { Route, Redirect } from 'react-router'
import Books from '../Books/Books';
import BooksComponent from '../Books/BooksComponent';

export default class BottomTabBar extends Component {
  propTypes: {
    item: React.PropTypes.number.isRequired
  }
  displayName: 'Editor'

  constructor(props) {
    super(props);
    self = this;
    this.state = {
      item: this.props.item
    }
    this.homeScene = this.homeScene.bind(this);
    this.booksScene = this.booksScene.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("test");
    this.setState({ item: nextProps.item });
  }

  ComponentWillMount() {
    console.log(this.item);
  }

  _renderContent (color: string, pageText: string, num?: number) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  }

  homeScene() {
    console.log(this.props)
    this.props.navigation.replace('Home')
  }

  booksScene() {
    console.log(this.props)
    this.props.navigation.replace('Books')
  }

  render() {
    return (
      <TabBarIOS
        tintColor="white"
        barTintColor="#F40A12">
        <TabBarIOS.Item
          title="Home"
          systemIcon="featured"
          selected={this.props.item === 0}
          onPress={this.homeScene}
          >
          <View>
          <Text>Didier</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Books"
          systemIcon="bookmarks"
          selected={this.props.item === 1}
          onPress={this.booksScene}
          >
          <BooksComponent/>
          </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Profil"
          systemIcon="contacts"
          selected={this.props.item === 2}
          onPress={this.homeScene}
          >

          <View>
          <Text>Didier</Text>
          </View>
          </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});
