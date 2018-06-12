import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ListView, ScrollView, Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import {Icon, Button, Badge } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit, human, material } from 'react-native-typography';
import config from '../Misc/Constant'

class TimelineCell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: this.props.cell.user.picture
    };
  }

  onError() {
    this.setState({
      picture: "https://via.placeholder.com/200x200"
    })
  }

  render() {
    console.log(this.props.cell.user)
    return (
      <View style={{flexDirection: 'row'}}>
      <Image
        borderRadius={8}
        source={{uri: "https://via.placeholder.com/200x200"}}
        style={styles.thumbnail}
        onError={this.onError.bind(this)}
      />
      <Text>{this.props.cell.book.title}</Text>
      </View>
    )
  }
}


export default class HomeComponent extends Component {
  constructor(props) {
  super(props);
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
      isLoading: true,
      userBooks: [],
      pureFriendArray: [],
      timeline: [],
      timelineDataSource: ds
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
      //FRIENDSRECEIVED
      axios.get(config.user.FRIENDSRECEIVED, header)
      .then((response) => {
        this.setState({
          pureFriendArray: response.data
        })
      }).catch((error) => {
        console.log(error)
      })

      axios.get(config.user.TIMELINE, header)
      .then((response) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          timeline: response.data,
          timelineDataSource: ds.cloneWithRows(response.data),
          isLoading: false
        })
      })
      .catch((error) => {
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

    renderTimelineItem(item) {
      let picture = item.picture ? item.picture : "https://via.placeholder.com/200x200"
      item.picture = picture
      console.log(item.picture)
      return <TimelineCell cell={item} screenProps={{ rootNavigation: this.props.screenProps.rootNavigation}}/>
    }

    renderTimeline() {
       if (this.state.timeline.length === 0) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
          <Text>
            Sorry, please add some friend to have activity.
          </Text>
          </View>
        )
      } else {
        console.log(this.state.timeline)
        return (
          <View style={styles.MainContainer}>
            <ListView
              dataSource={this.state.timelineDataSource}
              renderSeparator= {this.ListViewItemSeparator}
              renderRow={(rowData) => this.renderTimelineItem(rowData)}
              enableEmptySections={true}
              style={{marginTop: 10}}
            />
          </View>
        )
      }
    }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    this.props.screenProps.rootNavigation.setOptions({
      headerTitle: 'Home',
      headerTintColor: '#000',
      headerLeft: (
        <View style={{paddingLeft: 10}}>
        <Image source={require('../Misc/logo.png')}
        style={{
          width: 40,
          height: 40
        }} />;
        </View>
      ),
      headerRight: (
        <View style={styles.rightHead}>
        <View style={{paddingBottom: 15, justifyContent: 'flex-end'}}>
        <Badge
          containerStyle={styles.badgeStyle}
          value={this.state.pureFriendArray.length}
          textStyle={{ color: '#FFF'}}
        />
        </View>
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
    let timeline = this.renderTimeline()
    return (
      <View style={{flex: 1, paddingTop: 20}}>
      {timeline}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  MainContainer :{
    backgroundColor: '#FFF',
    justifyContent: 'center',
    flex:1,
    paddingTop: 5
  },
  rightHead: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
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
  badgeStyle:{
    textAlign: 'right',
    position: 'absolute',
    backgroundColor: '#F40A12',
    justifyContent: 'flex-end',
  }

});
