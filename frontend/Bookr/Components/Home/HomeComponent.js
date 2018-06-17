import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ListView, ScrollView, Image,TouchableOpacity, ActivityIndicator } from 'react-native';
import {Icon, Button, Badge } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit, human, material } from 'react-native-typography';
import config from '../Misc/Constant'
import Moment from 'moment';

class TimelineCell extends Component {
  constructor(props) {
    super(props)
    let pic = "https://via.placeholder.com/200x200"
    if (this.props.cell.user.picture !== undefined || this.props.cell.user.picture !== null) {
      pic = this.props.cell.user.picture
    } else {
      pic: "https://via.placeholder.com/200x200"
    }
    this.state = {
      picture: pic
    };
  }

  onError() {
    this.setState({
      picture: "https://via.placeholder.com/200x200"
    })
  }

  renderPage() {
    if (this.props.cell.user_position <= 1) {
      return (
        <Text style={styles.textBook}>{this.props.cell.user.username} just start {this.props.cell.book.title}</Text>
      )
    } else if (this.props.cell.user_position >= this.props.cell.book.number_of_pages) {
      return (
        <Text style={styles.textBook}>{this.props.cell.user.username} just finished {this.props.cell.book.title} 🎉</Text>
      )
    }
     else {
      return (
        <Text style={styles.textBook}>{this.props.cell.user.username} is now at page {this.props.cell.user_position} in {this.props.cell.book.title}</Text>
      )
    }
  }

  render() {
    let usr = this.props.cell.user.username ? this.props.cell.user.username : "username"
    Moment.locale('en');
    let date = Moment(this.props.cell.date_added).fromNow()
    let renderPage = this.renderPage();
    let pic = this.state.picture ? this.state.picture : "https://via.placeholder.com/200x200"
    return (
      <View style={{flexDirection: 'column', width: '100%', paddingTop: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: '#dedede', alignItems: 'center',justifyContent: 'flex-start'}}>
      <View style={{backgroundColor: '#FFF', borderWidth: 1, borderColor: '#dedede', borderRadius: 8, padding: 7,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,}}>
      <View style={{flexDirection: 'row'}}>
      <Image
        borderRadius={8}
        source={{uri: pic}}
        style={styles.thumbnail}
        onError={this.onError.bind(this)}
      />
      <Text style={styles.userDisplay}>{usr}</Text>
      <View style={{alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end', width: '60%'}}>
      <Text style={{alignItems: 'flex-end',paddingBottom: 6}}>{date}</Text>
      </View>
      </View>
      <View style={{flexDirection: 'row', width: '100%', textAlign: 'center', flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
      <Image
        borderRadius={8}
        source={{uri: this.props.cell.book.cover}}
        style={styles.thumbnail2}
      />
      <View style={{flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'flex-start'}}>
        {renderPage}
        <View
        style={{
          flex:0,
          justifyContent: 'flex-start',
          flexDirection: 'row'
        }}
        >
        </View>
      </View>
      </View>
      </View>
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
          backgroundColor: "transparent",
        }}
        />
      );
    }

    renderTimelineItem(item) {
      let pic = "https://via.placeholder.com/200x200"
      if (item.user.picture !== undefined || item.user.picture !== null) {
        pic = item.user.picture
      } else {
        pic: "https://via.placeholder.com/200x200"
      }
      console.log(item.user)
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
        return (
          <View style={styles.MainContainer}>
            <ListView
              dataSource={this.state.timelineDataSource}
              renderSeparator= {this.ListViewItemSeparator}
              renderRow={(rowData) => this.renderTimelineItem(rowData)}
              enableEmptySections={true}
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
      <View style={{flex: 1, width:'100%', paddingBottom: 50}}>
      {timeline}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  MainContainer :{
    backgroundColor: '#dedede',
    flex:1,
    width: '100%'
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
    borderRadius:20,
    width: 40,
    height: 40,
    justifyContent: 'flex-end'
  },
  textBook: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft: 5,
  },
  author: {
    fontWeight: 'bold',
    paddingTop: 10,
    fontSize: 18,
    fontStyle: 'italic'
  },
  userDisplay: {
    paddingTop: 10,
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems:'center',
    justifyContent:'center'
  },
  thumbnail2: {
    width: 110,
    height: 170,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  badgeStyle:{
    textAlign: 'right',
    position: 'absolute',
    backgroundColor: '#F40A12',
    justifyContent: 'flex-end',
  }
});
