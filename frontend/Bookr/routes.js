import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './Components/Login/Login';
import SplashScreen from './Components/SplashScreen/SplashScreen';

const Routes = () => (
   <Router>
      <Scene key = "root">
        <Scene key = "/" component = {SplashScreen} title = "Home" initial ="true" />
      </Scene>
   </Router>
)
export default Routes
