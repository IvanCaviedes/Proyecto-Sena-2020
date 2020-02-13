import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import PrivateRoute from './auth'
import Login from './components/Login'
import Dashboard from './components/DashBoard'
import Logout from './components/logout'
import Registro from './components/registro'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Registro} />
        <PrivateRoute path="/admin" exact component={Dashboard} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
    </Router>
  );
}
export default App;