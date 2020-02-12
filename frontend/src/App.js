import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import PrivateRoute from './auth'
import Login from './components/Login'
import Dashboard from './components/DashBoard'
import Logout from './components/logout'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/admin" exact component={Dashboard} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
      <Redirect
        to={{
          pathname: '/',
          state: { mensaje: 'Usuario no autorizado' }
        }}
      />
    </Router>
  );
}
export default App;