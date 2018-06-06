import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ListView, ScrollView, Image,TouchableOpacity, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit, human, material } from 'react-native-typography';

class Book extends Component {
  saveBookId(id, title, img, isbn) {
    this.props.screenProps.rootNavigation.navigate('BookDetail', {bookid: id, bookName: title, bookImg: img, bookIsbn: isbn})
  }

  render() {
      return (
        <View style={styles.book} >
        <TouchableOpacity style={styles.touch} onPress={()=> {this.saveBookId(this.props.book.id, this.props.book.title, this.props.book.img, this.props.book.isbn); }}>
          <Image
            borderRadius={8}
            source={{uri: this.props.book.img}}
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
    loaded: true,
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
    },  {
      title: 'Book 2',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 4
    }, {
      title: 'Book 3',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 5
    },  {
      title: 'Book 2',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 6
    }, {
      title: 'Book 3',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 7
    },{
      title: 'Book 3',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 8
    },{
      title: 'Book 2',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 9
    }, {
      title: 'Book 3',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 10
    }, {
      title: 'Book 2',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 11
    }, {
      title: 'Book 3',
      img: 'https://via.placeholder.com/200x200',
      isbn: 1213,
      id: 12
    }])
    }
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
      >Didier Didier</Text>
        <Image
          borderRadius={50}
          overflow="hidden"
          source={{uri: 'https://via.placeholder.com/200x200'}}
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
        dataSource={this.state.dataSource}
        renderRow={(data) => this.renderItem(data)}
        />
        </ScrollView>
        <View style={styles.center}>
        <TouchableOpacity
                  style={styles.manageButton}
                  underlayColor='#fff'>
                  <Text style={styles.manageButtonText}>Manage my friends</Text>
         </TouchableOpacity>
         <View style={styles.center2}>
         </View>
         <TouchableOpacity
                   style={styles.logoutButton}
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
      return <Book book={item} screenProps={{ rootNavigation: this.props.screenProps.rootNavigation }}/>
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
