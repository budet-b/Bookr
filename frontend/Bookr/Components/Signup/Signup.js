import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import axios from 'axios'

var t = require('tcomb-form-native');

var Form = t.form.Form;

var User = t.struct({
  username: t.String,
  email: t.String,
  firstname: t.String,
  lastname: t.String,
  picture: t.String,
  password: t.String
});

var options = {
  order: ['username', 'email', 'firstname', 'lastname', 'picture', 'password'],
  fields: {
  username: {
    placeholder: 'pseudo',
    error: 'Insert a valid username',
  },
  email: {
    placeholder: 'rodrigue@rodrigue.com',
    error: 'Insert a valid email',
    keyboardType: 'email-address'
  },
  firstname: {
    placeholder: 'Rodrigue',
    error: 'Insert a valid firstname'
  },
  lastname: {
    placeholder: 'Rodrigue',
    error: 'Insert a valid lastname'
  },
  picture: {
    placeholder: 'http://via.placeholder.com/200x200'
  },
  password: {
    secureTextEntry: true
    }
  }
};


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        myKey: null
    }
    this.onPress = this.onPress.bind(this);
  }

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async getKey() {
    try {
      const value = await AsyncStorage.getItem('token');
      this.setState({myKey: value});
      console.log(this.state.myKey);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  errorPopup() {
    Alert.alert(
      'Erreur dans le signup',
      'Merci de vérifier vos information',
      [
        {text: 'Réessayer', style: 'cancel'}
      ],
      { cancelable: false }
    );
  }

  successPopup() {
    Alert.alert(
      'Création de compte réussi',
      'Vous pouvez maintenant vous connecter',
      [
        {text: 'Se connecter', onPress: this.props.navigation.navigate('Login')}
      ]
    )
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      var user = User({
        username: value.username,
        password: value.password,
        firstname: value.firstname,
        lastname: value.lastname,
        picture: value.picture,
        email: value.email
      })
      console.log(user);
      axios.post("http://localhost:8080/user/signup", {
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        picture: user.picture,
        email: user.email
      })
      .then((response) => {
        console.log(response);
        this.successPopup();
      }).catch((error) => {
        this.errorPopup();
        console.log(error)
      })
    } else {
      this.errorPopup();
    }
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Form
          ref="form"
          type={User}
          options={options}
          style={styles.form}
        />
      <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableHighlight>
        <View style={styles.bottomView}>
          <Text>You already have an account ? </Text>
          <TouchableHighlight style={styles.button}  onPress={() => this.props.navigation.navigate('Login')} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    bottomView:{
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 50
    },
  MainContainer:
    {
        flex: 1,
        paddingTop: ( Platform.OS === 'ios' ) ? 50 : 0
    },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
