import React, { Component } from 'react';
import { Text, StyleSheet, View, AsyncStorage, ListView, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Icon, SearchBar, Button } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import BottomTabBar from '../BottomTabBar/BottomTabBar';
import { iOSUIKit } from 'react-native-typography';
import config from '../Misc/Constant'

export default class SearchBook extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      text: '',
    }
    this.arrayholder = [];
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item){
    const itemData = item.title.toUpperCase()
    const textData = text.toUpperCase()
    return itemData.indexOf(textData) > -1
    })
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newData),
        text: text
    })
  }

  componentDidMount() {
    //ALLBOOKS
    axios.get(config.books.ALLBOOKS,)
    .then((response) => {
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        dataSource: ds.cloneWithRows(response.data),
        isLoading: false,
      })
      this.arrayholder = response.data
    }).catch((error) => {
      console.log(error)
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

   async GetListViewItem (rowData) {
     const res = await this.getToken()
     if (!res)
     {
       return;
     }

     let header = {
       headers: {'Authorization': 'Bearer ' + res}
     };

     let pos = 0;
     //USERBOOK
     axios.get(config.books.USERBOOK + rowData.id, header)
     .then((response) => {
       let pages = response.data.book.number_of_pages
       if (response.data.user.user_position) {
         pos = response.data.user.user_position
       }
       this.props.navigation.navigate('BookDetail', {bookid: rowData.id, bookName: rowData.title, bookImg: rowData.cover, bookIsbn: rowData.isbn, position: pos, nbrPage: pages})
     })
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
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>

      <TextInput
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
        />
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) => this.renderSearch(rowData)}

          enableEmptySections={true}
          style={{marginTop: 10}}
        />
      </View>
    );
  }

  GetListViewItem (rowData) {
    this.props.navigation.navigate('BookDetail', {bookid: rowData.id, bookName: rowData.title, bookImg: rowData.cover, bookIsbn: rowData.isbn, position: 0, nbrPage: rowData.number_of_pages})
  }

   renderSearch(item) {
    return(
      <View style={{
        flexDirection: 'row',
        alignItems: 'right',
        textAlign: 'right'
      }}>
      <TouchableOpacity onPress={()=> {this.GetListViewItem(item)}}>
      <View style={{height: 80, paddingTop:10, paddingLeft: 5}}>
        <Image
          borderRadius={8}
          source={{uri: item.cover}}
          style={styles.thumbnail}
        />
      </View>
      <View style={{height: 70, paddingLeft: 90}}>
        <Text
        style={{
          flex:1,
          textAlign: 'left',
          fontWeight: 'bold'
        }}
        >{item.title}</Text>
        <Text
        style={{
          flex:1,
          fontSize: 15,
          fontStyle: 'italic',
          textAlign: 'left'
        }}
        >{item.author_name}</Text>
        </View>
      </TouchableOpacity>
    </View>
    )
  }

}

const styles = StyleSheet.create({

 MainContainer :{
   backgroundColor: '#FFF',
  justifyContent: 'center',
  flex:1,
  paddingTop: 5
  },

 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },

  TextInputStyleClass:{
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#DEDEDE',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
 },
 thumbnail: {
   width: 80,
   height: 130,
   justifyContent: 'flex-end'
 },
});
