import React, { Component } from 'react';
import { Text, StyleSheet, View,TouchableOpacity,Image,  ScrollView, ListView, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Icon, SearchBar, Button } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit } from 'react-native-typography';

class Friend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: this.props.friend.picture
    };
  }

  onError() {
    this.setState({
      picture: "https://via.placeholder.com/200x200"
    })
  }

  saveFriendId(id) {
    this.props.screenProps.rootNavigation.navigate('FriendDetail', {friendId: id})
  }

  render() {
      return (
        <View style={styles.friend} >
        <TouchableOpacity style={styles.touch} onPress={() => this.saveFriendId(this.props.friend.id)}>
          <Image
            borderRadius={8}
            source={{uri: this.state.picture}}
            style={styles.thumbnail}
            onError={this.onError.bind(this)}
          />
          <View >
            <Text
            style={styles.title}
            numberOfLines={3}>{this.props.friend.firstname}</Text>
          </View>
        </TouchableOpacity>
        </View>
      );
  }
}

export default class FriendComponent extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderBookDisplay = this.renderBookDisplay.bind(this);
    this.renderUserFriendDisplay = this.renderUserFriendDisplay.bind(this);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: true,
      text: '',
      userFriends: ds,
      friendRequests: ds,
      pureFriendArray: [],
      pureUserFriendArray: [],
      dataSource: ds.cloneWithRows([{
        title: 'Book 1',
        img: 'https://via.placeholder.com/200x200',
        isbn: 1213,
        id: 1
      }, {
        title: 'Book 2',
        img: 'https://via.placeholder.com/200x200',
        isbn: 42,
        id: 2
      }, {
        title: 'Book 3',
        img: 'https://via.placeholder.com/200x200',
        isbn: 1213,
        id: 3
      }]),
    }
    this.arrayholder = [];
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item){
    const itemData = item.username.toUpperCase()
    const textData = text.toUpperCase()
    return itemData.indexOf(textData) > -1
    })
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newData),
        text: text
    })
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
    {
      this.props.navigation.navigate('Login')
      return;
    }
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };
    axios.get("http://localhost:8080/api/user/friends", header)
    .then((response) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        userFriends: ds.cloneWithRows(response.data),
        pureUserFriendArray: response.data
      })
    }).catch((error) => {
      console.log(error)
    })

    axios.get("http://localhost:8080/api/friends/received", header)
    .then((response) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        friendRequests: ds.cloneWithRows(response.data),
        pureFriendArray: response.data
      })
    }).catch((error) => {
      console.log(error)
    })

    axios.get("http://localhost:8080/api/users", header)
    .then((response) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(response.data)
      })
      this.arrayholder = response.data
    }).catch((error) => {
      console.log(error)
    })

    this.setState({
      isLoading: false
    })
  }

   GetListViewItem (rowData) {
     this.props.navigation.navigate('FriendDetail', {friendId: rowData.id})
   }

   renderBookDisplay() {
     if (this.state.pureFriendArray.length> 0) {
       return (
         <View style={{
          flex:1,
         }}>
         <Text style={styles.head}>Friend Requests</Text>
         <View
           style={{
             borderBottomColor: '#E8E8E8',
             borderBottomWidth: 1,
           }}
         />
         <ScrollView
         horizontal={true}
         >
           <ListView contentContainerStyle={styles.list}
           dataSource={this.state.friendRequests}
           renderRow={(data) => this.renderItem(data)}
           />
           </ScrollView>
          </View>
       );
     } else {
        return;
      }
   }

   renderUserFriendDisplay() {
     if (this.state.pureUserFriendArray.length > 0) {
       return (
         <View >
         <Text style={styles.head}>My Friends</Text>
         <View
           style={{
             borderBottomColor: '#E8E8E8',
             borderBottomWidth: 1,
           }}
         />
         <ScrollView
         horizontal={true}
         >
           <ListView contentContainerStyle={styles.list}
           dataSource={this.state.userFriends}
           renderRow={(data) => this.renderItem(data)}
           />
           </ScrollView>
           </View>
       )
     } else {
       return;
     }
   }

  ListViewItemSeparator = () => {
  return (
    <View
      style={{
        height: .5,
        width: "100%",
        backgroundColor: "#000",
      }}
      />
    );
  }

  render() {
    let friendRequestsDisplay = this.renderBookDisplay();
    let userFriendDisplay = this.renderUserFriendDisplay();
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>
        {userFriendDisplay}
        {friendRequestsDisplay}
        <View style={{
         flex:1,
        }}>
        <Text style={styles.head}>Search Friend</Text>
        <View
          style={{
            borderBottomColor: '#E8E8E8',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.MainContainer}>

        <TextInput
         style={styles.TextInputStyleClass}
         onChangeText={(text) => this.SearchFilterFunction(text)}
         value={this.state.text}
         underlineColorAndroid='transparent'
         placeholder="Search Here"
          />
          <ListView
            dataSource={this.state.dataSource}
            renderSeparator= {this.ListViewItemSeparator}
            renderRow={(rowData) => <Text style={styles.rowViewContainer}
            onPress={this.GetListViewItem.bind(this, rowData)} >{rowData.username}</Text>}
            enableEmptySections={true}
            style={{marginTop: 10}}
          />
        </View>

        </View>

      </View>
    );
  }
  renderItem(item) {
    return <Friend friend={item} screenProps={{ rootNavigation: this.props.navigation.state.params.screenProps }}/>
  }
}

const styles = StyleSheet.create({
  head: {
  ...iOSUIKit.largeTitleEmphasizedObject,
    marginHorizontal: 0,
    textAlign: 'left',
    paddingBottom: 5,
    paddingLeft: 8,
    paddingTop: 5
  },
 MainContainer :{
   backgroundColor: '#FFF',
  justifyContent: 'center',
  flex:1,
  paddingTop: 5
  },

 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },

  TextInputStyleClass:{
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#DEDEDE',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
 },
 list: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   alignItems: 'flex-start',
   paddingTop: 3

 },
 thumbnail: {
   borderWidth:1,
   borderColor:'rgba(0,0,0,0.2)',
   alignItems:'center',
   justifyContent:'center',
   backgroundColor:'#fff',
   borderRadius:32,
   width: 64,
   height: 64,
   justifyContent: 'flex-end'
 },
 touch: {
   alignItems: 'center',
 },
 friend: {
 height: 200,
 flex: 1,
 alignItems: 'center',
 flexDirection: 'column',
 paddingLeft: 10,
 paddingRight: 10
},
title: {
  fontSize: 10,
  marginBottom: 8,
  width: 90,
  textAlign: 'center',
},

});
