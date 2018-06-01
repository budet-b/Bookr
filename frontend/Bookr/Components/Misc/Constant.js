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
