import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, Image } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import { iOSUIKit } from 'react-native-typography';
import { Slider } from 'react-native-usit-ui';

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: 0,
      bookName: '',
      bookImg: '',
      bookIsbn: 0,
      isLoading: true
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
        <Text style={styles.left}>Suspendisse id odio vehicula, maximus leo sed, placerat dolor. Proin eget fermentum turpis. Morbi magna massa, euismod et tempus non, pulvinar at nisi. Curabitur facilisis faucibus massa. Nullam ut nulla rutrum, pretium massa et, mollis augue. Vivamus vitae interdum justo.</Text>
        </View>
        <View>
        <Text style={styles.head}>Friends</Text>
        <View
          style={{
            borderBottomColor: '#E8E8E8',
            borderBottomWidth: 1,
          }}
        />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
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
