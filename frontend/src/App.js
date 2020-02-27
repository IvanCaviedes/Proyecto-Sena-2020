import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Admin from './components/admin'
import Logout from './components/logout'

import PrivateRoute from './auth'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/admin" exact component={Admin} />
        <PrivateRoute path="/logout" exact component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
