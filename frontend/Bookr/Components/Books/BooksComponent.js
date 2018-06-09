import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ListView, ScrollView, Image,TouchableOpacity, Modal } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Icon, SearchBar, Button } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit } from 'react-native-typography';

class Book extends Component {
  saveBookId(id, title, img, isbn, position, nbrPage) {
    this.props.screenProps.rootNavigation.navigate('BookDetail', {bookid: id, bookName: title, bookImg: img, bookIsbn: isbn, position: position, nbrPage: nbrPage})
  }

  render() {
      return (
        <View style={styles.book} >
        <TouchableOpacity style={styles.touch} onPress={()=> {this.saveBookId(this.props.book.id, this.props.book.title, this.props.book.cover, this.props.book.isbn, this.props.user, this.props.book.number_of_pages); }}>
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

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.saveBookId = this.saveBookId.bind(this);
  }

  saveBookId(id, title, img, isbn, position, nbrPage) {
    this.props.screenProps.rootNavigation.navigate('BookDetail', {bookid: id, bookName: title, bookImg: img, bookIsbn: isbn, position: position, nbrPage: nbrPage})
  }

  render() {
      return (
        <View style={styles.AllbookDisplay}>
        <TouchableOpacity style={styles.touch} onPress={()=> {this.saveBookId(this.props.book.id, this.props.book.title, this.props.book.cover, this.props.book.isbn, this.props.user, this.props.book.number_of_pages); }}>
          <Image
            borderRadius={8}
            source={{uri: this.props.book.cover}}
            style={styles.thumbnail}
          />
            <Text
            style={styles.item}
            >{this.props.book.title}</Text>
          </TouchableOpacity>
        </View>
      );
  }
}


export default class BooksComponent extends Component {
  constructor(props) {
  super(props);
  this.renderItem = this.renderItem.bind(this);
  this.renderAllItem = this.renderAllItem.bind(this);
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: null,
    loaded: false,
    modalVisible: false,
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
    userBooks: []
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
  setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

  async componentDidMount() {

    // All books

    axios.get("http://localhost:8080/api/books",)
    .then((response) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(response.data),
      })
    }).catch((error) => {
      console.log(error)
    })

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

    axios.get("http://localhost:8080/api/user/books", header)
    .then((response) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        userBooks: ds.cloneWithRows(response.data),
        loaded: true
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  onClickSearch() {
    this.props.screenProps.rootNavigation.navigate('SearchBook')
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={{backgroundColor: "#FFF"}}>
      <View style={{flexDirection: "row"}}>
      <Text style={styles.head}>My Books</Text>
      <Button
      textStyle={{color: '#000'}}
      onPress={() => this.onClickSearch()}
      backgroundColor = 'transparent'
      rightIcon={{name: 'search', color: '#000', size: 30}}
      title= 'Search a book'
      underlayColor = '#FFF'
        />
      </View>
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
        <Text style={styles.head}>All Books</Text>
          <View
            style={{
              borderBottomColor: '#E8E8E8',
              borderBottomWidth: 1,
              paddingTop: 1,
              paddingBottom: 5
            }}
          />
        <ScrollView
        horizontal={false}
        contentContainerStyle={styles.container}
        >
        <View style={styles.Allbook}>
          <ListView contentContainerStyle={styles.listAll}
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderAllItem(data)}
          />
        </View>
          </ScrollView>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View>
        <Text>
          Loading Books...
        </Text>
      </View>
    );
  }

  renderItem(item) {
      return <Book book={item.book} user={item.user_position} screenProps={{ rootNavigation: this.props.screenProps.rootNavigation }}/>
  }

  renderAllItem(item) {
      return <AllBooks book={item} user={item.user_position} screenProps={{ rootNavigation: this.props.screenProps.rootNavigation }}/>
  }

}

var styles = StyleSheet.create({
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
  }
});
