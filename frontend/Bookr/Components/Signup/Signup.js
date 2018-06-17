import React, { Component } from 'react';
import { Text, AppRegistry, StyleSheet, View, TouchableHighlight, AsyncStorage, Alert, Platform, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import config from '../Misc/Constant'
import bootstrap from 'tcomb-form-native/lib/stylesheets/bootstrap.js';
import { LinearGradient } from 'expo';
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography';

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
        stylesheet : bootstrap,
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
          placeholder: 'email@email.com',
          error: 'Insert a valid email',
          keyboardType: 'email-address',
          returnKeyType: "next",
          autoCapitalize: 'none',
          onSubmitEditing: (event) => self.refs.form.getComponent('firstname').refs.input.focus()
        },
        firstname: {
          placeholder: 'my firstname',
          error: 'Insert a valid firstname',
          returnKeyType: "next",
          onSubmitEditing: (event) => self.refs.form.getComponent('lastname').refs.input.focus()
        },
        lastname: {
          placeholder: 'my lastname',
          error: 'Insert a valid lastname',
          returnKeyType: "next",
          onSubmitEditing: (event) => self.refs.form.getComponent('picture').refs.input.focus()
        },
        picture: {
          placeholder: 'my super profil picture url',
          returnKeyType: "next",
          autoCapitalize: 'none',
          onSubmitEditing: (event) => self.refs.form.getComponent('password').refs.input.focus()
        },
        password: {
          placeholder: 'my-super-password',
          secureTextEntry: true,
          autoCapitalize: 'none',
          returnKeyType: "done"
          }
        }
      };

      options.stylesheet.textbox.normal = {
        color: '#000',
        height: 36,
        padding: 7,
        borderRadius: 4,
        borderWidth: 0,
        marginBottom: 5,
        width: 230
      };
    return (
      <View style={styles.MainContainer}>
        <KeyboardAwareScrollView style={{paddingTop: 15}}>
        <Form
          ref="form"
          type={User}
          options={options}
          style={styles.form}
        />
        </KeyboardAwareScrollView>
        <View style={styles.bottom}>
      <LinearGradient
        colors={['#ffe70b', '#ff8305', '#ff3401']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={{ alignItems: 'center', borderRadius: 10 }}>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight>
      </LinearGradient>

          <Text style={[styles.buttonText, {color: '#000'}]}>You already have an account ? </Text>
          <LinearGradient
            colors={['#2ec9f9', '#2a9df4', '#2572ee']}
            style={{ alignItems: 'center', borderRadius: 10 }}>
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Login')} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableHighlight>
          </LinearGradient>
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

      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 50
    },
  MainContainer:
    {
      backgroundColor: '#FFF',
      alignItems:'center',
      flex: 1,
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
    ...iOSUIKit.largeTitleEmphasizedObject,
    ...sanFranciscoWeights.medium,
    borderWidth: 0,
    borderColor: 'transparent',
    fontSize: 18,
    color: '#FFF',
    alignSelf: 'center'
  },
  button: {
    width: 100,
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  contentContainer: {
    paddingVertical: 20
  }
});
