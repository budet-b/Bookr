import React, { Component } from 'react';

export default class Constants extends Component {
  export async saveKey(value) {
  try {
    await AsyncStorage.setItem('token', value);
    } catch (error) {
    console.log("Error saving data" + error);
    }
  }

  export function async getKey() {
  try {
    const value = await AsyncStorage.getItem('token');
    return value
  } catch (error) {
    console.log("Error retrieving data" + error);
    return null
    }
  }
}
