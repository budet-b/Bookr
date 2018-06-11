import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import config from '../Misc/Constant'

var t = require('tcomb-form-native');

var Form = t.form.Form;

var User = t.struct({
  username: t.String,
  email: t.String,
  firstname: t.String,
  lastname: t.String,
  picture:  t.maybe(t.String),
  password: t.String
});



export default class Signup extends Component {
  constructor(props) {
    super(props);
    self = this;
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
      //SIGNUP
      axios.post(config.user.SIGNUP, {
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

      let options = {
        order: ['username', 'email', 'firstname', 'lastname', 'picture', 'password'],
        fields: {
        username: {
          placeholder: 'pseudo',
          error: 'Insert a valid username',
          onSubmitEditing: (event) => self.refs.form.getComponent('email').refs.input.focus(),
          returnKeyType: "next",
          autoCapitalize: 'none'
        },
        email: {
          placeholder: 'rodrigue@rodrigue.com',
          error: 'Insert a valid email',
          keyboardType: 'email-address',
          returnKeyType: "next",
          autoCapitalize: 'none',
          onSubmitEditing: (event) => self.refs.form.getComponent('firstname').refs.input.focus()
        },
        firstname: {
          placeholder: 'Rodrigue',
          error: 'Insert a valid firstname',
          returnKeyType: "next",
          onSubmitEditing: (event) => self.refs.form.getComponent('lastname').refs.input.focus()
        },
        lastname: {
          placeholder: 'Rodrigue',
          error: 'Insert a valid lastname',
          returnKeyType: "next",
          onSubmitEditing: (event) => self.refs.form.getComponent('picture').refs.input.focus()
        },
        picture: {
          placeholder: 'Url vers l\'image',
          returnKeyType: "next",
          autoCapitalize: 'none',
          onSubmitEditing: (event) => self.refs.form.getComponent('password').refs.input.focus()
        },
        password: {
          secureTextEntry: true,
          autoCapitalize: 'none',
          returnKeyType: "done"
          }
        }
      };
    return (
      <View style={styles.MainContainer}>
        <KeyboardAwareScrollView>
        <Form
          ref="form"
          type={User}
          options={options}
          style={styles.form}
        />
        </KeyboardAwareScrollView>
        <View style={styles.bottom}>
      <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableHighlight>
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
  bottom:{
    paddingTop: '5%',
    paddingBottom: '10%'
  },
  fields: {
    width: '80%'
  },
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
      paddingLeft: 10,
      paddingRight: 10,
      flex: 1,
      paddingTop: 50
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
  },
  contentContainer: {
    paddingVertical: 20
  }
});
