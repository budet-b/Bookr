import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ListView, ScrollView, Image,TouchableOpacity, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit, human, material } from 'react-native-typography';

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
            style={styles.title}
            numberOfLines={3}>{this.props.book.title}</Text>
            <Text style={styles.year}>{2001}</Text>
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
    loaded: false,
    firstname: '',
    lastname: '',
    picture: '',
    username: '',
    email: '',
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
      axios.get("http://localhost:8080/api/user/books", header)
      .then((response) => {
        console.log(response.data)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          userBooks: ds.cloneWithRows(response.data)
        })
      }).catch((error) => {
        console.log(error)
      })
      //USER
      axios.get("http://localhost:8080/api/user", header)
      .then((response) => {
        console.log(response.data.user)
        this.setState({
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          picture: response.data.user.picture,
          username: response.data.user.username,
          email: response.data.user.email
        })
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


  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={{backgroundColor: "#FFF"}}>
      <Text style={styles.head2}>Profil</Text>
      <View
        style={{
          borderBottomColor: '#E8E8E8',
          borderBottomWidth: 1,
        }}
      />
      <View style={styles.center}>
      <Text
      style={human.largeTitle}
      >{this.state.firstname} {this.state.lastname}</Text>
        <Image
          borderRadius={50}
          overflow="hidden"
          source={{uri: this.state.picture}}
          onError={this.onError.bind(this)}
          style={styles.profilPic}
        />
      </View>

      <Text style={styles.head3}>Finished Books</Text>
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
        dataSource={this.state.userBooks}
        renderRow={(data) => this.renderItem(data)}
        />
        </ScrollView>
        <View style={styles.center}>
        <TouchableOpacity
                  style={styles.manageButton}
                  underlayColor='#fff'
                  onPress= {() => this.friendPage()}
                  >
                  <Text style={styles.manageButtonText}>Manage my friends</Text>
         </TouchableOpacity>
         <View style={styles.center2}>
         </View>
         <TouchableOpacity
                   style={styles.logoutButton}
                   onPress={ () => this.logout()}
                   underlayColor='#fff'>
                   <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          <View style={{height: 50, backgroundColor: '#FFF'}}>
          </View>
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
  title: {
    fontSize: 10,
    marginBottom: 8,
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
    ...material.display1Object,
    marginHorizontal: 0,
    textAlign: 'left',
    paddingBottom: 5,
    paddingLeft: 8,
    paddingTop: 5,
    color: '#000'
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
