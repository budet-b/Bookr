import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ListView, ScrollView, Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import {Icon, Button, Badge } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit, human, material } from 'react-native-typography';

export default class HomeComponent extends Component {
  constructor(props) {
  super(props);
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: null,
    isLoading: false,
    userBooks: [],
    pureFriendArray: [],
    dataSource: ds.cloneWithRows([{
      title: 'Book 1',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 1
    }, {
      title: 'Didier',
      img: 'https://via.placeholder.com/200x200',
      isbn: 42,
      id: 2
    }, {
      title: 'Book 3',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 3
    }])
    }
    this.friendPage = this.friendPage.bind(this);

  }

    async getKey() {
    try {
      const value = await AsyncStorage.getItem('token');
      return value
    } catch (error) {
      console.log("Error retrieving data" + error);
      return null
      }
    }

    async getToken() {
      let res = ''
      const token = await this.getKey()
      .then((response) => {
        res = response
      })
      .catch((error) => {
        console.log(error)
      });
      return res
    }

    friendPage() {
      console.log('friend page')
      this.props.screenProps.rootNavigation.navigate('FriendComponent', {screenProps: this.props.screenProps.rootNavigation})
    }

    async componentDidMount() {

      const res = await this.getToken()
      if (!res)
      {
        this.props.navigation.navigate('Login')
        return;
      }
      let header = {
        headers: {'Authorization': 'Bearer ' + res}
      };

      axios.get("http://localhost:8080/api/friends/received", header)
      .then((response) => {
        this.setState({
          pureFriendArray: response.data,
          isLoading: false
        })
      }).catch((error) => {
        console.log(error)
      })
    }

    async saveKey(value) {
      try {
        await AsyncStorage.setItem('token', value);
      } catch (error) {
        console.log("Error saving data" + error);
      }
    }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      this.props.screenProps.rootNavigation.setOptions({
        headerTitle: 'Home',
        headerTintColor: '#000',
        headerRight: (
          <View style={styles.rightHead}>
          <Badge
            containerStyle={styles.badgeStyle}
            value={this.state.pureFriendArray.length}
            textStyle={{ color: '#FFF'}}
          />
          <Button
          onPress={() => this.friendPage()}
          textStyle={{color: '#000'}}
          backgroundColor = 'transparent'
          rightIcon={{name: 'people', color: '#000', size: 25}}
          underlayColor = 'transparent'
          />
          </View>
        )
      });
    }
    return (
      <View>
      <Text> Didier 2 </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  rightHead: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeStyle:{
    textAlign: 'right',
    position: 'absolute',
    backgroundColor: '#F40A12'
  }

});
