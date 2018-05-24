import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import SplashScreen from './Components/SplashScreen/SplashScreen';

const Routes = () => (
   <Router>
      <Scene key = "root">
        <Scene key = "/" component = {SplashScreen} title = "Home" initial = {true} />
        <Scene key = "/Login" component = {Login} title = "Login" initial ={false} />
        <Scene key = "/Signup" component = {Signup} title = "Signup" initial ={false} />
      </Scene>
   </Router>
)
export default Routes
