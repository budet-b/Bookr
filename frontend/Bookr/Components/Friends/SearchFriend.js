import React, { Component } from 'react';
import { Text, StyleSheet, View,TouchableOpacity,Image,  ScrollView, ListView, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Icon, SearchBar, Button } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit,sanFranciscoWeights } from 'react-native-typography';
import config from '../Misc/Constant'

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

  async acceptFriend(id) {
    console.log(id)
    const res = await this.getToken()
    if (!res)
    {
      this.props.navigation.navigate('Login')
      return;
    }
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };

    axios.put(config.user.ACCEPTFRIEND + id, {}, header)
    .then((response) => {
      console.log(response)
      this.successPopup()
    }).catch((error) => {
      console.log(error)
    })
  }

  saveFriendId() {
    this.props.screenProps.rootNavigation.push('Home', {screenProps: this.props.screenProps.rootNavigation})
  }

  successPopup() {
    Alert.alert(
      'Succes !',
      'You have one new friend',
      [
        {text: 'Ok', onPress: this.props.screenProps.rootNavigation.push('Home', {screenProps: this.props.screenProps.rootNavigation})}
      ]
    )
  }

  render() {
      return (
        <View style={{flexDirection: 'column', paddingLeft: 20, paddingRight: 10, backgroundColor: '#FFF', paddingBottom: 10}}>
        <View style={{flexDirection: 'row', width: 200}}>
        <Image
          borderRadius={8}
          source={{uri: this.state.picture}}
          style={styles.thumbnail}
          onError={this.onError.bind(this)}
        />
        <Text style={{alignItems: 'flex-end',paddingBottom: 6, paddingLeft: 30, paddingTop: 20, paddingRight: 30,...iOSUIKit.bodyObject,
        ...sanFranciscoWeights.black}}>{this.props.friend.firstname} {this.props.friend.lastname}</Text>
        <View style={{alignItems: 'flex-end', paddingTop: 10}}>
        <TouchableOpacity
                  style={{backgroundColor: '#7BC950', width: 100, height: 40,paddingBottom: 6,  borderRadius: 10}}
                  underlayColor='#fff'
                  onPress={() => this.acceptFriend(this.props.friend.id)}>
                  <Text style={{textAlign: 'center', paddingTop: 8,
                    ...iOSUIKit.bodyObject,
                    ...sanFranciscoWeights.black, color:'white'}}>Accept</Text>
         </TouchableOpacity>
         </View>
         </View>


        <View style={{flexDirection: 'column', width: '20%'}}>

        </View>
        </View>
      );
  }
}

export default class SearchFriendComponent extends Component {
  constructor(props) {
    super(props);
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
    console.log(text)
    const newData = this.arrayholder.filter(function(item){
    const itemData = item.user.firstname.toUpperCase()
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
    //USERS
    axios.get(config.user.USERS, header)
    .then((response) => {
      console.log('Users list received')
      console.log(response.data)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(response.data),
        isLoading: false
      })
      this.arrayholder = response.data
    }).catch((error) => {
      console.log(error)
    })
  }

   GetListViewItem (rowData) {
     this.props.navigation.navigate('FriendDetail', {friendId: rowData.id})
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
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    console.log('here')

    return (
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
          renderRow={(rowData) => this.renderSearch(rowData)}

          enableEmptySections={true}
          style={{marginTop: 10}}
        />
      </View>
    );
  }

  async reloadData() {
    const res = await this.getToken()
    if (!res)
    {
      this.props.navigation.navigate('Login')
      return;
    }
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };
    //USERS
    axios.get(config.user.USERS, header)
    .then((response) => {
      console.log('Users list received')
      console.log(response.data)
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(response.data),
        isLoading: false
      })
      this.arrayholder = response.data
    }).catch((error) => {
      console.log(error)
    })
  }

  async sendFriendRequest(id) {
    const res = await this.getToken()
    if (!res)
    {
      this.props.navigation.navigate('Login')
      return;
    }
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };

    axios.put(config.user.ADDFRIEND + id, {}, header)
    .then((response) => {
      this.setState({
        isLoading: true
      })
      this.reloadData();
    }).catch((error) => {
      console.log(error)
    })
  }


  renderButton(status, id) {

    // Friend status:
    // 0 : Friend
    // 1 : Sent
    // 2 : Received
    // 3 : Not friend

    if (status === 0) {
      return (
        <TouchableOpacity
                  style={{backgroundColor: '#4cd964', width: 100, height: 40,paddingBottom: 6,  borderRadius: 10}}
                  underlayColor='#fff'
                  >
                  <Text style={{textAlign: 'center', paddingTop: 8,
                    ...iOSUIKit.bodyObject,
                    ...sanFranciscoWeights.black, color:'white'}}>Friend</Text>
         </TouchableOpacity>
      )
    } else if (status === 1) {
      return (
        <TouchableOpacity
                  style={{backgroundColor: '#ffcc00', width: 100, height: 40,paddingBottom: 6,  borderRadius: 10}}
                  underlayColor='#fff'
                  >
                  <Text style={{textAlign: 'center', paddingTop: 8,
                    ...iOSUIKit.bodyObject,
                    ...sanFranciscoWeights.black, color:'white'}}>Sent</Text>
         </TouchableOpacity>
      )
    } else if (status === 2) {
      return (
        <TouchableOpacity
                  style={{backgroundColor: '#ec199f', width: 100, height: 40,paddingBottom: 6,  borderRadius: 10}}
                  underlayColor='#fff'
                  >
                  <Text style={{textAlign: 'center', paddingTop: 8,
                    ...iOSUIKit.bodyObject,
                    ...sanFranciscoWeights.black, color:'white'}}>Received</Text>
         </TouchableOpacity>
      )
    } else if (status === 3) {
      return (
        <TouchableOpacity
                  style={{backgroundColor: '#5ac8fa', width: 100, height: 40,paddingBottom: 6,  borderRadius: 10}}
                  underlayColor='#fff'
                  onPress={() => this.sendFriendRequest(id)}
                  >
                  <Text style={{textAlign: 'center', paddingTop: 8,
                    ...iOSUIKit.bodyObject,
                    ...sanFranciscoWeights.black, color:'white'}}>Add</Text>
         </TouchableOpacity>
      )
    }
  }

  renderSearch(item) {
    if (item.user.picture === null)
      item.user.picture = 'https://via.placeholder.com/200x200'
    let butn = this.renderButton(item.friend_type, item.user.id);
    return(
      <View style={{flexDirection: 'column', paddingLeft: 20, paddingRight: 10, backgroundColor: '#FFF', paddingBottom: 10}}>
      <View style={{flexDirection: 'row', width: 200}}>
      <Image
        borderRadius={8}
        source={{uri: item.user.picture}}
        style={styles.thumbnail}
      />
      <Text style={{alignItems: 'flex-end',paddingBottom: 6, paddingLeft: 30, paddingTop: 20, paddingRight: 30,...iOSUIKit.bodyObject,
      ...sanFranciscoWeights.black}}>{item.user.firstname} {item.user.lastname}</Text>
      <View style={{alignItems: 'flex-end', paddingTop: 10}}>
      {butn}
       </View>
       </View>



      </View>
    )
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
   flexDirection: 'column',
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
   justifyContent: 'flex-start'
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
