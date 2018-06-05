import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ListView, ScrollView, Image,TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit } from 'react-native-typography';

class Book extends Component {
  async saveBookId(value) {
    try {
      await AsyncStorage.setItem('bookId', JSON.stringify(value));
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  render() {
      return (
        <View style={styles.book} >
          <TouchableOpacity style={styles.touch} onPress={()=> this.saveBookId(this.props.book.id)}>
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

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.saveBookId = this.saveBookId.bind(this);
  }

  async saveBookId(value) {
    console.log("saving...")
    try {
      await AsyncStorage.setItem('bookId', JSON.stringify(value));
      this.props.screenProps.rootNavigation.navigate('BookDetail', {bookid: value})
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  render() {
      return (
        <View style={styles.AllbookDisplay}>
          <TouchableOpacity style={styles.touch} onPress={()=> {this.saveBookId(this.props.book.id); }}>
          <Image
            borderRadius={8}
            source={{uri: this.props.book.img}}
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
      <Text style={styles.head}>My Books</Text>
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
      return <Book book={item} screenProps={{ rootNavigation: this.props.screenProps.rootNavigation }}/>
  }

  renderAllItem(item) {
      return <AllBooks book={item} screenProps={{ rootNavigation: this.props.screenProps.rootNavigation }}/>
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
