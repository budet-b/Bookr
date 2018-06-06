import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, Image, ListView, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import { iOSUIKit } from 'react-native-typography';
import { Slider } from 'react-native-usit-ui';

class Friend extends Component {
  render() {
    return (
      <View style={styles.friend}>
        <Image
          borderRadius={50}
          overflow="hidden"
          source={{uri: this.props.friend.img}}
          style={styles.thumbnail}
        />
          <Text
          style={styles.item}
          >{this.props.friend.title}</Text>
          <Text
          style={styles.descItem}
          >Page {this.props.friend.page}</Text>
      </View>
    )
  }
}

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      bookId: 0,
      bookName: '',
      bookImg: '',
      bookIsbn: 0,
      isLoading: true,
      dataSource: ds.cloneWithRows([{
        title: 'Jane',
        img: 'https://via.placeholder.com/200x200',
        isbn: 1213,
        page: 30,
        id: 1
      }, {
        title: 'Stanislas',
        img: 'https://via.placeholder.com/200x200',
        isbn: 42,
        page: 50,
        id: 2
      }, {
        title: 'Didier',
        img: 'https://via.placeholder.com/200x200',
        isbn: 1213,
        page: 30,
        id: 3
      },  {
        title: 'Book 2',
        img: 'https://via.placeholder.com/200x200',
        isbn: 1213,
        page: 20,
        id: 4
      }, {
        title: 'Book 3',
        img: 'https://via.placeholder.com/200x200',
        isbn: 1213,
        page: 30,
        id: 12
      }])
    }
  }

  componentWillMount() {
    this.setState({
      bookId: this.props.navigation.state.params.bookid,
      bookName: this.props.navigation.state.params.bookName,
      bookImg: this.props.navigation.state.params.bookImg,
      bookIsbn: this.props.navigation.state.params.bookIsbn,
      isLoading: false
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
    return (
      <View style={styles.view}>
        <Text style={styles.head}>{this.state.bookName}</Text>
        <View
          style={{
            borderBottomColor: '#E8E8E8',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.center}>
        <Image
          borderRadius={8}
          source={{uri: this.state.bookImg}}
          style={styles.image}
        />
        <Text style={styles.desc}>Authors</Text>
        <Text style={styles.desc}>200 pages</Text>
        </View>
        <Text style={styles.left}>page 100</Text>
        <View style={styles.center}>
        <Slider initialValue={100} min={0} max={200} lineStyle={{backgroundColor: '#007AFF', height: 1}} markerStyle={{ width: 10, height: 10, borderRadius: 10 / 2, borderWidth: 1, color:'#F40A12', borderColor: '#F40A12'}} color='#F40A12'/>
        <Text style={styles.left}>Suspendisse id odio vehicula, maximus leo sed, placerat dolor. Proin eget fermentum turpis. Morbi magna massa, euismod et tempus non, massa et, mollis augue. Vivamus vitae interdum justo.</Text>
        </View>
        <View>
        <Text style={styles.head}>Friends</Text>
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
        </View>
      </View>
    );
  }

  renderItem(item) {
      return <Friend friend={item}/>
  }
}

var styles = StyleSheet.create({
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
