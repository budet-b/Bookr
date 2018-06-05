import React, { Component } from 'react';
import { AppRegistry, View, Text, AsyncStorage } from 'react-native';
import { Router } from 'react-router'
import Routes from './routes';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Books from './Components/Books/Books';
import Home from './Components/Home/Home';
import BookDetail from './Components/Books/BookDetail';
//import {getKey, saveKey} from './Components/Misc/Constant';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import { StackNavigator } from 'react-navigation';
import axios from 'axios'

const AppNavigator = StackNavigator({
  Home: { screen: Home },
  Books: { screen: Books,
    navigationOptions: {
      title: "Books"
    }
   }
});

console.disableYellowBox = true;
export default class App extends Component {
  constructor (props) {
    super();
    this.state = {
      selectedTab: 'Home',
      isLoggin: false,
      isLoading: true
    }
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

  async componentDidMount() {
    const res = await this.getToken()
    if (!res)
      return;
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };
    axios.get("http://localhost:8080/api/user/", header)
    .then((response) => {
      this.setState({isLoggin: true})
    })
    .catch((error) => {
      console.log(error);
    })
    this.setState({isLoading: false})
  }

  render() {
    var logged = this.state.isLoggin ? 'Home' : 'Login'
    var LoginNavigator = StackNavigator({
      Login: { screen: Login,
        navigationOptions: {
          title: "Bookr"
        }
      },
      Signup: { screen: Signup,
        navigationOptions: {
          title: "Bookr"
        }
      },
      Home: { screen: Home },
      BookDetail: { screen: BookDetail },
      Books: { screen: Books,
        navigationOptions: {
          title: "Books"
        }
      },
    }, {initialRouteName: logged});
    if (this.state.isLoading)
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    console.log(this.state.isLoggin)
    return <LoginNavigator/>
  }
}
