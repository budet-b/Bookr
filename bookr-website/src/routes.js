import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './Components/Misc/NotFound/NotFound';
import HomePageScene from './Scenes/Home/Home';
import BooksPageScene from './Scenes/Books/Books';
import FriendsPageScene from './Scenes/Friends/Friends';
import ProfilPageScene from './Scenes/Profil/Profil';

const PropsRoute = ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={ props => <C {...props} {...cProps} /> } />
);

export default ({ props, childProps, language }) => (
  <Router {...props}>
  <Switch>
    {/* Landing Page routes */}
    <PropsRoute exact path='/profil' component={() => <ProfilPageScene/> }/>
    <PropsRoute exact path='/friends' component={() => <FriendsPageScene/> }/>
    <PropsRoute exact path='/books' component={() => <BooksPageScene/> }/>
    <PropsRoute exact path='/' component={() => <HomePageScene/> }/>
    <PropsRoute component={NotFound}/>
    </Switch>
  </Router>
);
