import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, Image, ListView, ScrollView, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import { iOSUIKit, human, material, sanFranciscoWeights } from 'react-native-typography';
import { Slider } from 'react-native-usit-ui';
import config from '../Misc/Constant'

// Friend status:
// 0 : Friend
// 1 : Sent
// 2 : Received
// 3 : Not friend

export default class FriendDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendId: -1,
      email: '',
      firstname: '',
      lastname: '',
      picture: '',
      username: '',
      isLoading: true,
      friendType: 0
    }
    this.renderFriendStatus = this.renderFriendStatus.bind(this);
  }

  async componentWillMount() {

    const res = await this.getToken()
    if (!res)
    {
      return;
    }
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };
    this.setState({
      friendId: this.props.navigation.state.params.friendId
    })
    axios.get(config.user.FRIENDS + this.state.friendId, header)
    .then((response) => {
      this.setState({
        email: response.data.user.email,
        firstname: response.data.user.firstname,
        lastname: response.data.user.lastname,
        picture: response.data.user.picture,
        username: response.data.user.username,
        friendType: response.data.friend_type
      })
    }).catch((error) => {
      console.log(error)
    })
    this.setState({
      isLoading: false
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

  async acceptFriend() {
    const res = await this.getToken()
    if (!res)
    {
      this.props.navigation.navigate('Login')
      return;
    }
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };
    axios.put(config.user.ACCEPTFRIEND + this.state.friendId, {}, header)
    .then((response) => {
      this.setState({
        friendType: 0
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  async sendFriendRequest() {
    const res = await this.getToken()
    if (!res)
    {
      this.props.navigation.navigate('Login')
      return;
    }
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };
    axios.put(config.user.ADDFRIEND + this.state.friendId, {}, header)
    .then((response) => {
      this.setState({
        friendType: 1
      })
    }).catch((error) => {
      console.log(error)
    })
    console.log("send friend")
  }

  renderFriendStatus() {
    // Friend
    if (this.state.friendType === 0) {
      return (
        <View style={styles.bottomCentered}>
        <TouchableOpacity
                  style={{backgroundColor: '#7BC950', width: '60%', borderRadius: 30 }}
                  underlayColor='#fff'>
                  <Text style={styles.manageButtonText}>You are friend</Text>
         </TouchableOpacity>
          </View>
      )
    } else if (this.state.friendType === 1) {
      return (
      <View style={styles.bottomCentered}>
      <TouchableOpacity
                style={{backgroundColor: '#EE8434', width: '60%', borderRadius: 30 }}
                underlayColor='#fff'>
                <Text style={styles.manageButtonText}>Friend request sent</Text>
       </TouchableOpacity>
        </View>);
      //sent
    } else if (this.state.friendType === 2) {
      return (
      <View style={styles.bottomCentered}>
      <TouchableOpacity
                style={{backgroundColor: '#7BC950', width: '60%', borderRadius: 30 }}
                underlayColor='#fff'
                onPress={() => this.acceptFriend()}>
                <Text style={styles.manageButtonText}>Accept this friend ?</Text>
       </TouchableOpacity>
        </View> );
      //received
    } else if (this.state.friendType === 3) {
      return (
        <View style={styles.bottomCentered}>
        <TouchableOpacity
                  style={{backgroundColor: '#496DDB', width: '60%', borderRadius: 30 }}
                  underlayColor='#fff'
                  onPress={() => this.sendFriendRequest()}>
                  <Text style={styles.manageButtonText}>Add this friend</Text>
        </TouchableOpacity>
        </View>
      )
      //nothing
    }
  }

  onError() {
    this.setState({
      picture: "https://via.placeholder.com/200x200"
    })
  }

  render() {
    if (this.state.isLoading)
    {
      return(
        <View>
        <Text>Loading...</Text>
        </View>
      )
    }
    let friendDisplay = this.renderFriendStatus();
    return (
      <View style={{backgroundColor: "#FFF"}}>
      <Text style={styles.head2}>Friend detail</Text>
      <View
        style={{
          borderBottomColor: '#E8E8E8',
          borderBottomWidth: 1,
        }}
      />
      <View style={styles.center}>
      <Text
      style={styles.userNameStyle}
      >{this.state.firstname} {this.state.lastname}</Text>
        <Image
          borderRadius={50}
          overflow="hidden"
          source={{uri: this.state.picture}}
          onError={this.onError.bind(this)}
          style={styles.profilPic}
        />
      <Text
      style={styles.userNameStyle2}
      >{this.state.username}</Text>
      </View>
      {friendDisplay}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  buttonTextStart: {
    ...iOSUIKit.bodyObject,
    ...sanFranciscoWeights.medium,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 200
  },
  manageButtonText: {
      ...material.titleObject,
      color: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
  },
  userNameStyle: {
    ...iOSUIKit.bodyObject,
    ...sanFranciscoWeights.light,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 200
  },
  userNameStyle2: {
    ...iOSUIKit.bodyObject,
    ...sanFranciscoWeights.thin,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 200
  },
  profilPic: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    borderRadius: 64,
    width: 128,
    height: 128,
    justifyContent: 'flex-end'
  },
  head2: {
    ...material.display2Object,
    marginHorizontal: 0,
    textAlign: 'left',
    paddingBottom: 5,
    paddingLeft: 8,
    paddingTop: 5,
    color: '#000'
  },
  buttonStart: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7BC950',
    borderRadius: 8,
    padding: 15,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 3
  },
  descItem: {
    color: 'grey',
    margin: 1,
    width: 80,
    alignSelf: 'flex-end',
    textAlign: 'center'
  },
  item: {
    margin: 1,
    width: 80,
    alignSelf: 'flex-end',
    textAlign: 'center'
  },
  friend: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: 4,
    paddingRight: 4,
    height: 200
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
  left: {
    ...iOSUIKit.footnoteEmphasizedObject,
      marginHorizontal: 0,
      paddingBottom: 5,
      paddingLeft: 8,
      paddingTop: 5,
      textAlign: 'left'
  },
  desc: {
    ...iOSUIKit.footnoteEmphasizedObject,
      marginHorizontal: 0,
      paddingBottom: 5,
      paddingLeft: 8,
      paddingTop: 5
  },
  bottomCentered: {
      height: '90%',
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  image: {
    width: 130,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  head3: {
    ...material.display1Object,
    marginHorizontal: 0,
    textAlign: 'left',
    paddingBottom: 5,
    paddingLeft: 8,
    paddingTop: 5,
    color: '#000'
  },
  view: {
    backgroundColor: "#FFF",
  },
  head: {
  ...iOSUIKit.largeTitleEmphasizedObject,
    marginHorizontal: 0,
    textAlign: 'left',
    paddingBottom: 5,
    paddingLeft: 8,
    paddingTop: 5
  }
});
