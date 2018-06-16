import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ListView, ScrollView, Image,TouchableOpacity } from 'react-native';
import { FormLabel,Icon, Button, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit, human, material, sanFranciscoWeights } from 'react-native-typography';
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
            style={styles.thumbnail2}
            onError={this.onError.bind(this)}
          />
          <View >
            <Text
            style={styles.title}>{this.props.friend.firstname}</Text>
          </View>
        </TouchableOpacity>
        </View>
      );
  }
}


class Book extends Component {
  saveBookId(id, title, img, isbn, position, nbrPage) {
    this.props.screenProps.rootNavigation.navigate('BookDetail', {bookid: id, bookName: title, bookImg: img, bookIsbn: isbn, position: position, nbrPage: nbrPage})
  }

  render() {
      return (
        <View style={styles.book} >
        <TouchableOpacity style={styles.touch} onPress={()=> {this.saveBookId(this.props.book.id, this.props.book.title, this.props.book.cover, this.props.book.isbn, this.props.user_position, this.props.book.number_of_pages); }}>
          <Image
            borderRadius={8}
            source={{uri: this.props.book.cover}}
            style={styles.thumbnail}
          />
          <View >
            <Text
            style={styles.title2}
            numberOfLines={3}>{this.props.book.title}</Text>
          </View>
        </TouchableOpacity>
        </View>
      );
  }
}

export default class ProfilPage extends Component {
  constructor(props) {
  super(props);
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: null,
    userFriends: ds,
    pureUserFriendArray: [],
    loaded: false,
    firstname: '',
    lastname: '',
    picture: "https://via.placeholder.com/200x200",
    username: '',
    email: '',
    pureFinishedBooks: [],
    userBooks: ds,
    dataSource: ds
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

      //User's books

      const res = await this.getToken()
      if (!res)
      {
        this.props.navigation.navigate('Login')
        return;
      }
      let header = {
        headers: {'Authorization': 'Bearer ' + res}
      };
      //USERBOOK
      axios.get(config.books.USERBOOK, header)
      .then((response) => {
        console.log(response.data)
        let booksFinished = response.data.filter(book => book.user_status === 1)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          userBooks: ds.cloneWithRows(booksFinished),
          pureFinishedBooks: booksFinished
        })
      }).catch((error) => {
        console.log(error)
      })

      //USER
      axios.get(config.user.USER, header)
      .then((response) => {
        console.log(response.data.user)
        this.setState({
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          username: response.data.user.username,
          email: response.data.user.email
        })
        console.log('PIC')
        if (response.data.user.picture) {
          this.setState({
            picture: response.data.user.picture
          })
        }

        //USERFRIENDS
        axios.get(config.user.USERFRIENDS, header)
        .then((response) => {
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            userFriends: ds.cloneWithRows(response.data),
            pureUserFriendArray: response.data
          })
        }).catch((error) => {
          console.log(error)
        })

        console.log(this.state.picture)
      }).catch((error) => {
        console.log(error)
      })

      this.props.screenProps.rootNavigation.setOptions({
        headerTitle: 'Profil',
        headerTintColor: '#000',
        headerLeft: (
          <View style={{paddingLeft: 10}}>
          <Image source={require('../Misc/logo.png')}
          style={{
            width: 40,
            height: 40
          }} />;
          </View>
        )
      });

      this.setState({
        loaded: true
      })
    }

    async saveKey(value) {
      try {
        await AsyncStorage.setItem('token', value);
      } catch (error) {
        console.log("Error saving data" + error);
      }
    }

    logout() {
      console.log('logout')
      this.saveKey('');
      this.props.screenProps.rootNavigation.replace('Login')
    }

    friendPage() {
      this.props.screenProps.rootNavigation.navigate('FriendComponent', {screenProps: this.props.screenProps.rootNavigation})
    }

    onError() {
      this.setState({
        picture: "https://via.placeholder.com/200x200"
      })
    }

  renderFinishedBooks() {
    if (this.state.pureFinishedBooks.length > 0) {
      return (
        <ScrollView
        horizontal={true}
        >
          <ListView contentContainerStyle={styles.list}
          dataSource={this.state.userBooks}
          renderRow={(data) => this.renderItem(data)}
          />
          </ScrollView>
      );
    } else {
      return (
        <View style ={{
          margin: 3,
          height: 100,
          alignSelf: 'center',
          textAlign: 'center'
        }}>
        <Text style={{fontSize: 20, paddingTop: 40}}>Still no finished books ? Keep reading ! </Text>
        </View>
      )
    }
  }

  renderUserFriends() {
    if (this.state.pureUserFriendArray.length > 0) {
      return (
        <ScrollView
        horizontal={true}
        >
          <ListView contentContainerStyle={styles.list}
          dataSource={this.state.userFriends}
          renderRow={(data) => this.renderItemFriend(data)}
          />
          </ScrollView>
      )
    } else {
      return (
        <Text>No friend ? Maybe you should add some... </Text>
      )
    }
  }


  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    this.props.screenProps.rootNavigation.setOptions({
      headerRight: (
        <View style={styles.rightHead}>
        <Button
        onPress={() => this.props.screenProps.rootNavigation.navigate('SearchFriendComponent', {screenProps: this.props.screenProps.rootNavigation})}
        textStyle={{color: '#000'}}
        backgroundColor = 'transparent'
        rightIcon={{name: 'add', color: '#000', size: 25}}
        underlayColor = 'transparent'
        />
        </View>
      )
    })
    let finishedBooks = this.renderFinishedBooks();
    let userFriends = this.renderUserFriends();
    return (
      <View style={{backgroundColor: "#FFF"}}>
      <View style={[styles.center, {paddingTop: 20, paddingBottom: 20}]}>

        <Image
          borderRadius={50}
          overflow="hidden"
          source={{uri: this.state.picture}}
          onError={this.onError.bind(this)}
          style={styles.profilPic}
        />
        <Text
        style={styles.head3}
        >{this.state.firstname} {this.state.lastname}</Text>
      </View>

      <Text style={styles.head3}>Finished books.</Text>

        {finishedBooks}
        <View style={{paddingBottom: 10}}>
        <Text style={styles.head3}>Friends.</Text>
        {userFriends}
        </View>

        <View style={[styles.center, {paddingBottom: 20}]}>
         <TouchableOpacity
                   style={styles.logoutButton}
                   onPress={ () => this.logout()}
                   underlayColor='#fff'>
                   <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View>
        <Text>
          Loading Profil...
        </Text>
      </View>
    );
  }

  renderItemFriend(item) {
    let picture = item.picture ? item.picture : "https://via.placeholder.com/200x200"
    item.picture = picture
    console.log(item)
    return <Friend friend={item} screenProps={{ rootNavigation: this.props.screenProps.rootNavigation }}/>
  }

  renderItem(item) {
    return <Book book={item.book} user={item.user_position} screenProps={{ rootNavigation: this.props.screenProps.rootNavigation }}/>
  }
}

var styles = StyleSheet.create({
  desc: {
    ...iOSUIKit.footnoteEmphasizedObject,
      marginHorizontal: 0,
      paddingBottom: 5,
      paddingLeft: 8,
      paddingTop: 5
  },
  touch: {
    alignItems: 'center',
  },
  AllbookDisplay: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      paddingBottom: 20,
      justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 10,
  },
  Allbook: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 380,
    justifyContent: 'center',

  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  center2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5
  },
  container:{
    flex: 0,
    paddingTop: 3
  },
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      paddingTop: 3

    },
    listAll: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
     justifyContent: 'center',
    },
    item: {
        margin: 3,
        width: 100,
        alignSelf: 'flex-end',
        textAlign: 'center'
    },
    book: {
    height: 200,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10
  },
  title2: {

    marginBottom: 8,
    fontSize: 10,
    width: 90,
    textAlign: 'center',
  },
  title: {
    ...iOSUIKit.bodyObject,
    ...sanFranciscoWeights.black,
    marginBottom: 8,
    fontSize: 13,
    width: 90,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
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
  thumbnail: {
    width: 80,
    height: 130,
    justifyContent: 'flex-end'
  },
  thumbnail2: {
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
  listView: {
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
  },
  head: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    marginHorizontal: 0,
    textAlign: 'left',
    paddingBottom: 5,
    paddingLeft: 8,
    paddingTop: 5
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
  head3: {
    ...iOSUIKit.bodyObject,
    ...sanFranciscoWeights.black,
    fontSize: 23,
    marginHorizontal: 0,
    textAlign: 'left',
    paddingBottom: 5,
    paddingLeft: 8,
    paddingTop: 5,
    color: '#000'
  },
  rightHead: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageButton:{
  marginRight:40,
  marginLeft:40,
  marginTop:5,
  paddingTop:5,
  paddingBottom:5,
  backgroundColor:'#FFCC01',
  borderRadius:30,
  width: '70%',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
},
friend: {
height: 90,
flex: 1,
alignItems: 'center',
flexDirection: 'column',
paddingLeft: 10,
paddingRight: 10
},
manageButtonText: {
    ...material.titleObject,
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
},
logoutButton:{
marginRight:40,
marginLeft:40,
marginTop:5,
paddingTop:5,
paddingBottom:5,
backgroundColor:'#F40A12',
borderRadius:30,
width: '70%',
justifyContent: 'center',
alignItems: 'center',
textAlign: 'center'
},
logoutButtonText: {
  ...material.titleObject,
  color: '#FFF',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
},
loginText:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }
});
