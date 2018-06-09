import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './Components/Misc/NotFound/NotFound';

const PropsRoute = ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={ props => <C {...props} {...cProps} /> } />
);

export default ({ props, childProps, language }) => (
  <Router {...props}>
  <Switch>
    {/* Landing Page routes */}
    <PropsRoute component={NotFound}/>
    </Switch>
  </Router>
);
