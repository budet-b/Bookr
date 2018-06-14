import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, Image, ListView, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography';
import { Slider } from 'react-native-usit-ui';
import config from '../Misc/Constant'

class Friend extends Component {
  render() {
    return (
      <View style={styles.friend}>
        <Image
          borderRadius={50}
          overflow="hidden"
          source={{uri: this.props.friend.picture}}
          style={styles.thumbnail}
        />
          <Text
          style={styles.item}
          >{this.props.friend.username}</Text>
          <Text
          style={styles.descItem}
          >Page {this.props.friend.user_position}</Text>
      </View>
    )
  }
}

// Book status:
// 0 : not started
// 1 : started but not finished
// 2 : finished

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      bookId: 0,
      bookName: '',
      bookImg: '',
      bookIsbn: 0,
      bookPosition: 0,
      bookPage: 0,
      isLoading: true,
      currentPosition: 0,
      bookStatus: 0,
      pureFriendArray: [],
      dataSource: ds
    }
  }

  async componentWillMount() {
    this.setState({
      bookId: this.props.navigation.state.params.bookid,
      bookName: this.props.navigation.state.params.bookName,
      bookImg: this.props.navigation.state.params.bookImg,
      bookIsbn: this.props.navigation.state.params.bookIsbn,
      bookAuthor: this.props.navigation.state.params.author_name,
      bookPage: this.props.navigation.state.params.nbrPage,
      bookPosition: this.props.navigation.state.params.position,
      currentPosition: this.props.navigation.state.params.position
    })
    const res = await this.getToken()
    if (!res)
    {
      return;
    }
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };
    //USERBOOK
    axios.get(config.books.SPECIFIEDUSERBOOK + this.state.bookId, header)
    .then((response) => {
      if (response.data.user.user_position) {
          if (response.data.user.user_position >= response.data.book.number_of_pages) {
            this.setState({
              bookStatus: 2
            })
          } else {
            this.setState({
              bookStatus: 1
            })
          }
        this.setState({
          bookPosition: response.data.user.user_position,
          currentPosition: response.data.user.user_position,
          isLoading: false
        })
      }
      if (response.data.friends.length > 0) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          pureFriendArray: response.data.friends,
          dataSource: ds.cloneWithRows(response.data.friends)
        })
      }
    }).catch((error) => {
      console.log(error)
    })
    this.setState({
      isLoading: false
    })
  }

  changePosition(value) {
    this.setState({currentPosition: value});
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

  async componentWillUnmount() {
    if (this.state.currentPosition != this.state.bookPosition)
    {
      const res = await this.getToken()
      if (!res)
      {
        return;
      }
      let header = {
        headers: {'Authorization': 'Bearer ' + res}
      };
      //STARTBOOK
      axios.put(config.books.STARTBOOK + this.state.bookId +'/' + this.state.currentPosition, {}, header)
      .then((response) => {
        console.log("Ok");
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  async startBook() {
    const res = await this.getToken()
    if (!res)
    {
      return;
    }
    let header = {
      headers: {'Authorization': 'Bearer ' + res}
    };
    //STARTBOOK
    axios.put(config.books.STARTBOOK + this.state.bookId +'/' + '1', {}, header)
    .then((response) => {
      console.log("Ok");
    }).catch((error) => {
      console.log(error)
    })
    this.setState({
      bookStatus: 1,
      currentPosition: 1,
      bookPosition: 1
    })
  }

  updateCurrentPageValue(val) {
    if (this.state.currentPosition + val <= 0)
      console.log('fdp')
    else {
      this.setState({
        currentPosition: this.state.currentPosition + val
      })
    }
    if (this.state.currentPosition >= this.state.bookPage) {
      this.setState({
        bookStatus: 2
      })
    }
  }

  renderBookStatus() {
    if (this.state.bookStatus === 0) {
      return (
        <View style={{flexDirection: 'column', flex: 0, paddingTop: 20, alignItems: 'center'}}>
        <Text style={styles.left}>Suspendisse id odio vehicula, maximus leo sed, placerat dolor. Proin eget fermentum turpis. Morbi magna massa, euismod et tempus non, massa et, mollis augue. Vivamus vitae interdum justo.</Text>
        <TouchableHighlight style={styles.buttonStart}  onPress={() => this.startBook()} underlayColor='#7CE577'>
        <Text style={styles.buttonTextStart}>Start this book</Text>
        </TouchableHighlight>
        </View>

      );
    } else if (this.state.bookStatus === 1) {
      return (
        <View style={{flexDirection: 'column', flex: 0, paddingTop: 20}}>
        <Text style={[styles.bookName, {textAlign: 'center', fontSize: 20}]}>page {this.state.currentPosition}</Text>
        <Text style={styles.left}>Suspendisse id odio vehicula, maximus leo sed, placerat dolor. Proin eget fermentum turpis. Morbi magna massa, euismod et tempus non, massa et, mollis augue. Vivamus vitae interdum justo.</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', paddingTop: 30}}>
        <TouchableHighlight style={[styles.action2, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderColor: '#000', borderWidth: 1}]}  onPress={() => this.updateCurrentPageValue(-10)} underlayColor='#7CE577'>
          <Text style={{textAlign: 'center', fontSize: 18}}>
          -10
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.action}  onPress={() => this.updateCurrentPageValue(-5)} underlayColor='#7CE577'>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          -5
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.action}  onPress={() => this.updateCurrentPageValue(-1)} underlayColor='#7CE577'>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          -1
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.action}  onPress={() => this.updateCurrentPageValue(1)} underlayColor='#7CE577'>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          +1
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.action}  onPress={() => this.updateCurrentPageValue(5)} underlayColor='#7CE577'>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          +5
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.action2, {borderTopRightRadius: 5, borderBottomRightRadius: 5, borderColor: '#000', borderWidth: 1,}]} onPress={() => this.updateCurrentPageValue(10)} underlayColor='#7CE577'>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          +10
          </Text>
        </TouchableHighlight>
        </View>
        </View>
      )
     } else if (this.state.bookStatus === 2) {
       return (
        <View style={{flexDirection: 'column', flex: 0, paddingTop: 20, alignItems: 'center'}}>
        <Text style={styles.left}>Suspendisse id odio vehicula, maximus leo sed, placerat dolor. Proin eget fermentum turpis. Morbi magna massa, euismod et tempus non, massa et, mollis augue. Vivamus vitae interdum justo.</Text>
        <Text style={[styles.buttonTextStart, {fontSize: 30, paddingTop: 20}]}>You finished </Text>
        <Text style={[styles.buttonTextStart, {fontSize: 30, paddingTop: 10}]}>this book ! 🎉 </Text>
        </View>
      )
    }
  }

  renderFriendList() {
    if (this.state.pureFriendArray.length > 0) {
      return(
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
      );
    } else {
      return (
        <View style={styles.list2}>
        <Text style={styles.head}>Friends</Text>
        <View style={{
          flex: 1,

          flexWrap: 'wrap',
          flexDirection: 'column',
          height: 200
        }}/>
        <Text style={{paddingLeft: 10, fontSize: 23}}>No friends are reading this book 😭</Text>
        </View>
      )
    }
  }

  render() {
    let bookStatusDisplay = this.renderBookStatus()
    let friendDisplay = this.renderFriendList();
    if (this.state.isLoading)
    {
      return(
        <View>
        <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={{flexDirection: 'column', flex: 1, paddingTop: 10}}>
      <View style={{flexDirection: 'row', flex: 1, paddingTop: 10}}>
        <View style={{paddingLeft: 20}}>
        <Image
          borderRadius={8}
          source={{uri: this.state.bookImg}}
          style={styles.image}
          />
        </View>
          <View style={{paddingLeft: 10}}>
            <Text style={styles.bookName}>{this.state.bookName}</Text>
            <Text style={{fontSize: 18}}>by <Text style={styles.bookAuthor}> {this.state.bookName}</Text></Text>
            <Text style={{fontSize: 20}}>{this.state.bookPage} pages</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          {bookStatusDisplay}
        </View>
        <View>
        {friendDisplay}
        </View>
        </View>
    );
  }

  renderItem(item) {
      return <Friend friend={item}/>
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
  action: {
    textAlign: 'center',
    justifyContent: 'center',
    width: 50,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#FFF'
  },
  action2: {
    textAlign: 'center',
    justifyContent: 'center',
    width: 50,
    height: 40,
    backgroundColor: '#FFF'
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
  list2: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingBottom: 100
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
    ...sanFranciscoWeights.thin,
      marginHorizontal: 0,
      paddingBottom: 5,
      paddingLeft: 8,
      paddingTop: 10,
      textAlign: 'left'
  },
  leftImage: {
    flexDirection: 'column',
    borderColor:'blue',
    borderWidth:2
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
    width: 160,
    height: 250,
    justifyContent: 'left',
    alignItems: 'left',
    textAlign: 'left',
    paddingLeft: 30
  },
    item2:{
     borderColor:'black',
     borderWidth:2,
     flexDirection:'column',
   },
  view: {
    backgroundColor: "#FFF",
  },
  bookName: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    ...sanFranciscoWeights.heavy,
    fontSize: 20
  },
  bookAuthor: {
    ...iOSUIKit.largeTitleEmphasizedObject,
    ...sanFranciscoWeights.regular,
    fontSize: 18,
    fontStyle: 'italic'
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
