import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, Image, ListView, ScrollView, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import { iOSUIKit, human, material, sanFranciscoWeights } from 'react-native-typography';
import { Slider } from 'react-native-usit-ui';

// Friend status:
// 1 : Friend
// 2 : Pending
// 3 : Not friend

export default class FriendDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
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


  render() {
    if (this.state.isLoading)
    {
      return(
        <View>
        <Text>Loading...</Text>
        </View>
      )
    }
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
      >Didier Friend</Text>
        <Image
          borderRadius={50}
          overflow="hidden"
          source={{uri: 'https://via.placeholder.com/200x200'}}
          style={styles.profilPic}
        />
      <Text
      style={styles.userNameStyle2}
      >Didier</Text>
      </View>
        <View style={styles.center}>
        <TouchableOpacity
                  style={styles.manageButton}
                  underlayColor='#fff'>
                  <Text style={styles.manageButtonText}>Add this friend</Text>
         </TouchableOpacity>
          </View>
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
