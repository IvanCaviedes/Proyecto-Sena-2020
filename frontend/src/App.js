import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Admin from './components/Dashboard/admin'
import Users from './components/Dashboard/users'
import Productos from './components/Dashboard/productos'
import Profile from './components/Dashboard/profile'
import Logout from './components/logout'
import Recuperar from './components/CambioContra'
import Cliente from './components/loginCliente'
import Mascotas from './components/Dashboard/mascotas/mascotas'
import Proveedor from './components/Dashboard/proveedor/proveedor'

import PrivateRoute from './auth'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cliente" exact component={Cliente} />
        <Route path="/Recuperar" exact component={Recuperar} />
        <PrivateRoute path="/admin" exact component={Admin} />
        <PrivateRoute path="/users" exact component={Users} />
        <PrivateRoute path="/productos" exact component={Productos} />
        <PrivateRoute path="/mascotas" exact component={Mascotas} />
        <PrivateRoute path="/proveedor" exact component={Proveedor} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/logout" exact component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
