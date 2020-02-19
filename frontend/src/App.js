import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './auth'
import Login from './components/Login'
import Dashboard from './components/DashBoard'
import Logout from './components/logout'
import Registro from './components/Registro'
import Usuarios from './components/Usuarios'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Registro} />        
        <PrivateRoute path="/admin" exact component={Dashboard} />
        <Route path="/adusu" exact component={Usuarios}/>
        <Route path="/logout" exact component={Logout} />
      </Switch>
    </Router>
  );
}
export default App;