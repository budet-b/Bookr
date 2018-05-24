import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './Components/Login/Login';

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "/" component = {Login} title = "Home" initial = {true} />
      </Scene>
   </Router>
)
export default Routes
